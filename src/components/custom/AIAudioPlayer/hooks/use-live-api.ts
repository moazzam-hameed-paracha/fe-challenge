"use client";

import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GenAILiveClient } from "../lib/genai-live-client";
import { LiveClientOptions } from "../types";
import { AudioStreamer } from "../lib/audio-streamer";
import { audioContext } from "../lib/utils";
import VolMeterWorket from "../lib/worklets/vol-meter";
import { LiveConnectConfig } from "@google/genai";
import { TranscriptionResult, useTranscription } from "./use-transcription";

export type UseLiveAPIResults = {
  client: GenAILiveClient;
  setConfig: (config: LiveConnectConfig) => void;
  config: LiveConnectConfig;
  model: string;
  setModel: (model: string) => void;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  volume: number;
  /** Transcripts of incoming bot audio */
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

export function useLiveAPI(options: LiveClientOptions): UseLiveAPIResults {
  const client = useMemo(() => new GenAILiveClient(options), [options]);
  const audioStreamerRef = useRef<AudioStreamer | null>(null);

  const [model, setModel] = useState("models/gemini-2.0-flash-exp");
  const [config, setConfig] = useState<LiveConnectConfig>({});
  const [connected, setConnected] = useState(false);
  const [volume, setVolume] = useState(0);
  const [transcriptions, setTranscriptions] = useState<{ content: string; type: "bot" | "user" }[]>([]);

  // transcription for incoming audio
  const transcription = useTranscription({
    model: "whisper-1",
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
    turnDetection: {
      type: "server_vad",
      threshold: 0.5,
      prefixPaddingMs: 100,
      silenceDurationMs: 300,
    },
  });

  // helper: ArrayBuffer → base64
  function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  // setup output audio + vumeter
  useEffect(() => {
    if (audioStreamerRef.current) return;
    audioContext({ id: "audio-out" }).then((audioCtx) => {
      const streamer = new AudioStreamer(audioCtx);
      audioStreamerRef.current = streamer;
      streamer
        .addWorklet("vumeter-out", VolMeterWorket, (ev) => {
          setVolume(ev.data.volume);
        })
        .catch(console.error);
    });
  }, []);

  // wire client events — re-bind only when `client` or `transcription` changes
  useEffect(() => {
    const onOpen = () => {
      setConnected(true);
      transcription.connect();
    };
    const onClose = () => {
      setConnected(false);
      transcription.disconnect();
      audioStreamerRef.current?.stop();
    };
    const onError = (err: ErrorEvent) => console.error("LiveAPI error:", err);
    const onAudio = (data: ArrayBuffer) => {
      // play the audio
      audioStreamerRef.current?.addPCM16(new Uint8Array(data));

      // send it off to transcription
      const b64 = arrayBufferToBase64(data);
      transcription.appendAudio(b64);
    };

    client
      .on("open", onOpen)
      .on("close", onClose)
      .on("error", onError)
      .on("interrupted", () => audioStreamerRef.current?.stop())
      .on("audio", onAudio);

    return () => {
      // only remove listeners — do NOT disconnect()
      client
        .off("open", onOpen)
        .off("close", onClose)
        .off("error", onError)
        .off("interrupted", () => audioStreamerRef.current?.stop())
        .off("audio", onAudio);
    };
  }, [client, transcription]);

  // collect finished transcripts
  useEffect(() => {
    if (!transcription.transcript.length) return;

    setTranscriptions((prev) => {
      return [
        ...prev,
        {
          content: transcription.transcript,
          type: "bot",
        },
      ];
    });
    transcription.clearTranscript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcription.transcript]);

  // connect: open the GenAI socket (transcription starts in onOpen)
  const connect = useCallback(async () => {
    if (!config) throw new Error("config has not been set");
    await client.connect(model, config);
  }, [client, config, model]);

  // disconnect: tear down both
  const disconnect = useCallback(async () => {
    transcription.disconnect();
    client.disconnect();
    setConnected(false);
  }, [client, transcription]);

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
    transcriptions,
    setTranscriptions,
    transcription,
  };
}
