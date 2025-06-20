"use client";

import { useEffect, memo, useMemo } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import { Modality } from "@google/genai";

function AltairComponent() {
  const { clientType, gptAPI, liveAPI } = useLiveAPIContext();

  // Pick client, setConfig, setModel based on clientType
  const { setConfig, setModel } = useMemo(() => {
    if (clientType === "gemini") {
      return {
        setConfig: liveAPI.setConfig,
        setModel: liveAPI.setModel,
      };
    } else {
      return {
        setConfig: gptAPI.setConfig,
        setModel: gptAPI.setModel,
      };
    }
  }, [clientType, liveAPI, gptAPI]);

  // Initialize model & config when clientType changes
  useEffect(() => {
    if (clientType === "gemini") {
      setModel("models/gemini-2.0-flash-exp");
      setConfig({
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
        },
        systemInstruction: {
          parts: [
            {
              text: "You are my helpful assistant. Do your best to answer my questions.",
            },
          ],
        },
        tools: [{ googleSearch: {} }],
      });
    } else {
      setModel("gpt-4o-realtime-preview-2024-12-17");
      setConfig({
        instructions: "You are my helpful assistant. Do your best to answer my questions.",
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
    }
  }, [clientType, setConfig, setModel]);

  return <></>;
}

const Altair = memo(AltairComponent);

export default Altair;
