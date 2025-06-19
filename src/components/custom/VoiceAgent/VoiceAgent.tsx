"use client";

import React, { useState, useRef, useEffect } from "react";
import type { NextPage } from "next";

// Client event types
interface SessionUpdateEvent {
  type: "session.update";
  session: {
    voice: string;
    input_audio_format: "pcm16";
    output_audio_format: "pcm16";
    turn_detection: {
      type: "server_vad";
      prefix_padding_ms: number;
      silence_duration_ms: number;
      create_response: boolean;
    };
  };
}
interface InputAudioBufferAppendEvent {
  type: "input_audio_buffer.append";
  audio: string;
}
interface InputAudioBufferCommitEvent {
  type: "input_audio_buffer.commit";
}
interface ResponseCreateEvent {
  type: "response.create";
}

// Server event types
interface ServerEventBase {
  type: string;
}
interface TextDeltaEvent extends ServerEventBase {
  type: "response.text.delta";
  delta: string;
}
interface AudioDeltaEvent extends ServerEventBase {
  type: "response.audio.delta";
  delta: string;
}
interface AudioDoneEvent extends ServerEventBase {
  type: "response.audio.done";
}
interface ResponseDoneEvent extends ServerEventBase {
  type: "response.done";
}
interface ErrorEvent extends ServerEventBase {
  type: "error";
  message: string;
  code?: string;
}

type ServerEvent =
  | TextDeltaEvent
  | AudioDeltaEvent
  | AudioDoneEvent
  | ResponseDoneEvent
  | ErrorEvent
  | { [key: string]: unknown };

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY!;
const OPENAI_ORG_ID = process.env.NEXT_PUBLIC_OPENAI_ORG_ID;
const OPENAI_PROJECT_ID = process.env.NEXT_PUBLIC_OPENAI_PROJECT_ID;

const VoiceChatRealtime: NextPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiText, setAiText] = useState("");
  const [wsReady, setWsReady] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const pcmNodeRef = useRef<AudioWorkletNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const audioChunks = useRef<string[]>([]);

  // Init WS & session
  const initWebSocket = () => {
    if (wsRef.current) return;
    const protocols = [
      "realtime",
      `openai-insecure-api-key.${OPENAI_API_KEY}`,
      OPENAI_ORG_ID && `openai-organization.${OPENAI_ORG_ID}`,
      OPENAI_PROJECT_ID && `openai-project.${OPENAI_PROJECT_ID}`,
      "openai-beta.realtime-v1",
    ].filter(Boolean) as string[];
    const ws = new WebSocket("wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17", protocols);
    wsRef.current = ws;
    ws.onopen = () => {
      const initEvt: SessionUpdateEvent = {
        type: "session.update",
        session: {
          voice: "alloy",
          input_audio_format: "pcm16",
          output_audio_format: "pcm16",
          turn_detection: {
            type: "server_vad",
            prefix_padding_ms: 300,
            silence_duration_ms: 200,
            create_response: true,
          },
        },
      };
      ws.send(JSON.stringify(initEvt));
      setWsReady(true);
    };
    ws.onmessage = ({ data }: MessageEvent<string>) => {
      let evt: ServerEvent;
      try {
        evt = JSON.parse(data);
      } catch {
        return;
      }
      switch (evt.type) {
        case "response.text.delta":
          setAiText((t) => t + (evt as TextDeltaEvent).delta);
          break;
        case "response.audio.delta":
          setIsSpeaking(true);
          audioChunks.current.push((evt as AudioDeltaEvent).delta);
          break;
        case "response.audio.done":
          playAudioBuffer();
          setIsSpeaking(false);
          break;
        default:
          if (evt.type === "error") console.error((evt as ErrorEvent).message);
      }
    };
  };

  // Play PCM16 as WAV
  const playAudioBuffer = async () => {
    const arrays = audioChunks.current.map((b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));
    const total = arrays.reduce((sum, a) => sum + a.length, 0);
    const pcm = new Uint8Array(total);
    let off = 0;
    for (const a of arrays) {
      pcm.set(a, off);
      off += a.length;
    }
    audioChunks.current = [];
    const wav = buildWav(pcm, 1, 24000, 16);
    const audio = new Audio(URL.createObjectURL(new Blob([wav], { type: "audio/wav" })));
    audio.volume = isMuted ? 0 : 1;
    await audio.play();
  };

  const buildWav = (samples: Uint8Array, channels: number, sampleRate: number, bitsPerSample: number): ArrayBuffer => {
    const blockAlign = (channels * bitsPerSample) / 8;
    const byteRate = sampleRate * blockAlign;
    const buf = new ArrayBuffer(44 + samples.length);
    const dv = new DataView(buf);
    let p = 0;
    const wstr = (s: string) => {
      for (let i = 0; i < s.length; i++) dv.setUint8(p++, s.charCodeAt(i));
    };
    wstr("RIFF");
    dv.setUint32(p, 36 + samples.length, true);
    p += 4;
    wstr("WAVEfmt ");
    dv.setUint32(p, 16, true);
    p += 4;
    dv.setUint16(p, 1, true);
    p += 2;
    dv.setUint16(p, channels, true);
    p += 2;
    dv.setUint32(p, sampleRate, true);
    p += 4;
    dv.setUint32(p, byteRate, true);
    p += 4;
    dv.setUint16(p, blockAlign, true);
    p += 2;
    dv.setUint16(p, bitsPerSample, true);
    p += 2;
    wstr("data");
    dv.setUint32(p, samples.length, true);
    p += 4;
    new Uint8Array(buf, 44).set(samples);
    return buf;
  };

  // Start via AudioWorklet
  const startStreaming = async () => {
    initWebSocket();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new AudioContext({ sampleRate: 24000 });
    audioCtxRef.current = audioCtx;

    // Worklet code
    const workletCode = `
      class PCMProcessor extends AudioWorkletProcessor {
        process(inputs) {
          const buf = inputs[0][0];
          if (buf) {
            const pcm = new Int16Array(buf.length);
            for (let i = 0; i < buf.length; i++) {
              const s = Math.max(-1, Math.min(1, buf[i]));
              pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
            }
            this.port.postMessage(pcm.buffer, [pcm.buffer]);
          }
          return true;
        }
      }
      registerProcessor('pcm-processor', PCMProcessor);
    `;
    const mod = URL.createObjectURL(new Blob([workletCode], { type: "application/javascript" }));
    await audioCtx.audioWorklet.addModule(mod);

    const source = audioCtx.createMediaStreamSource(stream);
    sourceRef.current = source;
    const pcmNode = new AudioWorkletNode(audioCtx, "pcm-processor");
    pcmNodeRef.current = pcmNode;

    pcmNode.port.onmessage = (e) => {
      const b64 = btoa(String.fromCharCode(...new Uint8Array(e.data as ArrayBuffer)));
      wsRef.current?.send(
        JSON.stringify({ type: "input_audio_buffer.append", audio: b64 } as InputAudioBufferAppendEvent)
      );
    };

    source.connect(pcmNode).connect(audioCtx.destination);
    setIsRecording(true);
  };

  const stopStreaming = () => {
    setIsRecording(false);
    pcmNodeRef.current?.disconnect();
    sourceRef.current?.disconnect();
    audioCtxRef.current?.close();
    wsRef.current?.send(JSON.stringify({ type: "input_audio_buffer.commit" } as InputAudioBufferCommitEvent));
    wsRef.current?.send(JSON.stringify({ type: "response.create" } as ResponseCreateEvent));
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopStreaming();
    } else {
      startStreaming();
    }
  };
  const toggleMute = () => setIsMuted((m) => !m);

  useEffect(() => {
    if (!isRecording && wsReady) setAiText("");
  }, [isRecording, wsReady]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>AI Voice Chat (Realtime)</h1>
      <div className="visualizer">
        {isRecording && <span className="mic-pulse">🎤</span>}
        {!isRecording && isSpeaking && (
          <div className="dot-pulse">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <div>
        <button onClick={toggleRecording} style={btnStyle} className="control-btn">
          {isRecording ? "⏹️" : "▶️"}
        </button>
        <button
          onClick={toggleMute}
          style={{ ...btnStyle, color: isRecording && !isMuted ? "red" : undefined }}
          className="control-btn"
        >
          {isMuted ? "🔇" : "🎤"}
        </button>
      </div>

      <div style={{ marginTop: "2rem", fontSize: "1.1rem", minHeight: "1.2em" }}>
        <strong>AI:</strong> {aiText || <em>(waiting…)</em>}
      </div>

      <style jsx>{`
        .control-btn {
          font-size: 2rem;
          margin: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
        }
        .visualizer {
          height: 4rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .mic-pulse {
          font-size: 4rem;
          animation: pulse 1s infinite;
          color: red;
        }
        .dot-pulse span {
          display: inline-block;
          width: 0.8rem;
          height: 0.8rem;
          margin: 0 0.2rem;
          background: currentColor;
          border-radius: 50%;
          animation: bounce 1.2s infinite ease-in-out;
        }
        .dot-pulse span:nth-child(1) {
          animation-delay: 0s;
        }
        .dot-pulse span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot-pulse span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0.6);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

const btnStyle: React.CSSProperties = { margin: "0.5rem", padding: "0.5rem", cursor: "pointer" };

export default VoiceChatRealtime;
