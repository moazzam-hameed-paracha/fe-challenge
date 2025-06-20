import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AudioStreamer } from "../lib/audio-streamer";
import { audioContext } from "../lib/utils";
import VolMeterWorket from "../lib/worklets/vol-meter";
import { GPTRealtimeClient } from "../lib/gpt-realtime-client";

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
};

export function useGPTRealtime(apiKey: string, orgId?: string, projectId?: string): UseGPTRealtimeResults {
  const client = useMemo(() => new GPTRealtimeClient({ apiKey, orgId, projectId }), [apiKey, orgId, projectId]);
  const audioStreamerRef = useRef<AudioStreamer | null>(null);

  const [model, setModel] = useState<string>("gpt-4o-realtime-preview-2024-12-17");
  const [config, setConfig] = useState<GPTConnectConfig>({
    voice: "alloy",
    input_audio_format: "pcm16",
    output_audio_format: "pcm16",
    turn_detection: { type: "server_vad", prefix_padding_ms: 300, silence_duration_ms: 200, create_response: true },
  });
  const [connected, setConnected] = useState(false);
  const [volume, setVolume] = useState(0);
  const [aiText, setAiText] = useState("");
  const [speaking, setSpeaking] = useState(false);

  // Setup audio streamer for server -> speakers
  useEffect(() => {
    if (!audioStreamerRef.current) {
      audioContext({ id: "audio-out" }).then((audioCtx) => {
        audioStreamerRef.current = new AudioStreamer(audioCtx);
        audioStreamerRef.current
          .addWorklet("vumeter-out", VolMeterWorket, (ev) => setVolume(ev.data.volume))
          .catch(console.error);
      });
    }
  }, []);

  // Wire up client events
  useEffect(() => {
    const onOpen = () => setConnected(true);
    const onClose = () => {
      setConnected(false);
      audioStreamerRef.current?.stop();
    };
    const onError = (err: ErrorEvent) => console.error("GPTRealtime error", err);
    const onText = (delta: string) => setAiText((t) => t + delta);
    const onAudio = (data: ArrayBuffer) => {
      setSpeaking(true);
      audioStreamerRef.current?.addPCM16(new Uint8Array(data));
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
    };
  }, [client]);

  const connect = useCallback(async () => {
    client.disconnect();
    await client.connect(model, config);
  }, [client, model, config]);

  const disconnect = useCallback(async () => {
    client.disconnect();
    setConnected(false);
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
  };
}
