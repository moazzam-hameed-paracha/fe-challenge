import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AudioStreamer } from "../lib/audio-streamer";
import { audioContext } from "../lib/utils";
import VolMeterWorket from "../lib/worklets/vol-meter";
import { GPTRealtimeClient } from "../lib/gpt-realtime-client";
import { TranscriptionResult, useTranscription } from "./use-transcription";

/**
 * Configuration for GPT Realtime connection.
 * Shape should match the session.update payload.
 */
export interface GPTConnectConfig {
  modalities?: ("text" | "audio")[];
  instructions?: string;
  voice?: string;
  input_audio_format?: "pcm16";
  output_audio_format?: "pcm16";
  turn_detection?: {
    type: "server_vad";
    prefix_padding_ms: number;
    silence_duration_ms: number;
    create_response: boolean;
  };
}

export type UseGPTRealtimeResults = {
  client: GPTRealtimeClient;
  config: GPTConnectConfig;
  setConfig: (cfg: GPTConnectConfig) => void;
  model: string;
  setModel: (m: string) => void;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  volume: number;
  aiText: string;
  clearText: () => void;
  speaking: boolean;
  /** Transcripts of incoming audio */
  transcriptions: { content: string; type: "bot" | "user" }[];
  setTranscriptions: Dispatch<
    SetStateAction<
      {
        content: string;
        type: "bot" | "user";
      }[]
    >
  >;
  transcription: TranscriptionResult & {
    connect: () => void;
    disconnect: () => void;
    appendAudio: (audioBase64: string) => void;
    commitAudio: () => void;
    createResponse: () => void;
    clearTranscript: () => void;
  };
};

export function useGPTRealtime(apiKey: string, orgId?: string, projectId?: string): UseGPTRealtimeResults {
  const client = useMemo(() => new GPTRealtimeClient({ apiKey, orgId, projectId }), [apiKey, orgId, projectId]);
  const audioStreamerRef = useRef<AudioStreamer | null>(null);

  const [model, setModel] = useState<string>("gpt-4o-realtime-preview-2024-12-17");
  const [config, setConfig] = useState<GPTConnectConfig>({
    voice: "alloy",
    input_audio_format: "pcm16",
    output_audio_format: "pcm16",
    turn_detection: {
      type: "server_vad",
      prefix_padding_ms: 300,
      silence_duration_ms: 200,
      create_response: true,
    },
  });
  const [connected, setConnected] = useState(false);
  const [volume, setVolume] = useState(0);
  const [aiText, setAiText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [transcriptions, setTranscriptions] = useState<
    {
      content: string;
      type: "bot" | "user";
    }[]
  >([]);

  // transcription for incoming audio
  const transcription = useTranscription({
    model: "whisper-1",
    apiKey,
  });

  // helper to convert ArrayBuffer to base64
  function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  // Setup audio streamer for server -> speakers and vumeter
  useEffect(() => {
    if (!audioStreamerRef.current) {
      audioContext({ id: "audio-out" }).then((audioCtx) => {
        const streamer = new AudioStreamer(audioCtx);
        audioStreamerRef.current = streamer;
        streamer.addWorklet("vumeter-out", VolMeterWorket, (ev) => setVolume(ev.data.volume)).catch(console.error);
      });
    }
  }, []);

  // Wire up client events
  useEffect(() => {
    const onOpen = () => {
      setConnected(true);
      // start transcription on open
      if (!transcription.connected) transcription.connect();
    };
    const onClose = () => {
      setConnected(false);
      audioStreamerRef.current?.stop();
      transcription.disconnect();
    };
    const onError = (err: ErrorEvent) => console.error("GPTRealtime error", err);
    const onText = (delta: string) => setAiText((t) => t + delta);
    const onAudio = (data: ArrayBuffer) => {
      setSpeaking(true);
      // play audio
      audioStreamerRef.current?.addPCM16(new Uint8Array(data));
      // transcribe audio
      const b64 = arrayBufferToBase64(data);
      transcription.appendAudio(b64);
    };
    const onAudioDone = () => {
      audioStreamerRef.current?.stop();
      setSpeaking(false);
    };

    client
      .on("open", onOpen)
      .on("close", onClose)
      .on("error", onError)
      .on("text.delta", onText)
      .on("audio", onAudio)
      .on("audio.done", onAudioDone);

    return () => {
      client
        .off("open", onOpen)
        .off("close", onClose)
        .off("error", onError)
        .off("text.delta", onText)
        .off("audio", onAudio)
        .off("audio.done", onAudioDone)
        .disconnect();
      transcription.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  // collect finished transcripts of incoming audio
  useEffect(() => {
    if (transcription.transcript.length) {
      setTranscriptions((prev) => [...prev, { content: transcription.transcript, type: "bot" }]);
      transcription.clearTranscript();
    }
  }, [transcription.transcript, transcription]);

  const connect = useCallback(async () => {
    client.disconnect();
    await client.connect(model, config);
    // transcription.connect() happens in onOpen
  }, [client, model, config]);

  const disconnect = useCallback(async () => {
    client.disconnect();
    setConnected(false);
    transcription.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const clearText = useCallback(() => setAiText(""), []);

  return {
    client,
    config,
    setConfig,
    model,
    setModel,
    connected,
    connect,
    disconnect,
    volume,
    aiText,
    clearText,
    speaking,
    transcriptions,
    setTranscriptions,
    transcription,
  };
}
