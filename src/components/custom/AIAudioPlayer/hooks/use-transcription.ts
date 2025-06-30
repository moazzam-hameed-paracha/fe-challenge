import { useState, useRef, useEffect, useCallback } from "react";

export interface TurnDetectionOptions {
  type: "server_vad";
  threshold?: number;
  prefixPaddingMs?: number;
  silenceDurationMs?: number;
}

export interface NoiseReductionOptions {
  type: "near_field" | "far_field";
}

export interface UseTranscriptionOptions {
  /** Your OpenAI API key */
  apiKey: string;
  /** Optional organization ID */
  orgId?: string;
  /** Optional project ID */
  projectId?: string;
  /** Model to use for transcription */
  model?: string;
  /** Initial prompt to bias the transcription */
  prompt?: string;
  /** Language hint (e.g. 'en', 'es') */
  language?: string;
  turnDetection?: TurnDetectionOptions;
  noiseReduction?: NoiseReductionOptions;
}

export interface TranscriptionResult {
  /** Full transcript so far */
  transcript: string;
  /** Connection status */
  connected: boolean;
  /** Any error encountered */
  error: Error | null;
}

export function useTranscription(options: UseTranscriptionOptions) {
  const {
    apiKey,
    model = "whisper-1",
    prompt = "Transcribe my audio as is.",
    language = "en",
    turnDetection = {
      type: "server_vad",
      threshold: 0.5,
      prefixPaddingMs: 300,
      silenceDurationMs: 500,
    },
    noiseReduction = { type: "near_field" },
  } = options;

  const wsRef = useRef<WebSocket | null>(null);
  const queueRef = useRef<string[]>([]);

  const [connected, setConnected] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current) return;

    const url = "wss://api.openai.com/v1/realtime?intent=transcription";
    const protocols = ["realtime", `openai-insecure-api-key.${apiKey}`, "openai-beta.realtime-v1"].filter(
      Boolean
    ) as string[];

    const ws = new WebSocket(url, protocols);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      const initPayload = {
        type: "transcription_session.update",
        session: {
          input_audio_format: "pcm16",
          input_audio_transcription: { model, prompt, language },
          turn_detection: {
            type: turnDetection.type,
            threshold: turnDetection.threshold,
            prefix_padding_ms: turnDetection.prefixPaddingMs,
            silence_duration_ms: turnDetection.silenceDurationMs,
          },
          input_audio_noise_reduction: noiseReduction,
        },
      };
      ws.send(JSON.stringify(initPayload));

      // flush any queued audio chunks
      queueRef.current.forEach((b64) => {
        ws.send(JSON.stringify({ type: "input_audio_buffer.append", audio: b64 }));
      });
      queueRef.current = [];
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "conversation.item.input_audio_transcription.delta") {
          setTranscript((prev) => prev + (data.delta || ""));
        }
      } catch (e) {
        console.error("WS message parse error", e);
      }
    };

    ws.onerror = () => {
      setError(new Error("WebSocket error"));
      setConnected(false);
    };

    ws.onclose = () => {
      setConnected(false);
      wsRef.current = null;
      queueRef.current = [];
    };
  }, [apiKey, model, prompt, language, turnDetection, noiseReduction]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setConnected(false);
    queueRef.current = [];
  }, []);

  const appendAudio = useCallback((audioBase64: string) => {
    const ws = wsRef.current;
    const message = JSON.stringify({
      type: "input_audio_buffer.append",
      audio: audioBase64,
    });
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      queueRef.current.push(audioBase64);
    }
  }, []);

  const commitAudio = useCallback(() => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: "input_audio_buffer.commit" }));
  }, []);

  const createResponse = useCallback(() => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: "response.create" }));
  }, []);

  useEffect(() => {
    return disconnect;
  }, [disconnect]);

  const clearTranscript = () => setTranscript("");

  return {
    connect,
    disconnect,
    appendAudio,
    commitAudio,
    createResponse,
    transcript,
    connected,
    error,
    clearTranscript,
  } as TranscriptionResult & {
    connect: () => void;
    disconnect: () => void;
    commitAudio: () => void;
    createResponse: () => void;
    clearTranscript: () => void;
    appendAudio: (audioBase64: string) => void;
  };
}
