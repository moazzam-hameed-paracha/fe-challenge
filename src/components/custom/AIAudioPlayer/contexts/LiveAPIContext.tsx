import React, { createContext, FC, ReactNode, useContext } from "react";
import { LiveClientOptions } from "../types";
import { useLiveAPI, UseLiveAPIResults } from "../hooks/use-live-api";
import { useGPTRealtime, UseGPTRealtimeResults } from "../hooks/use-gpt-api";
import { TranscriptionResult, useTranscription } from "../hooks/use-transcription";

/**
 * Combined context value exposing both Gemini Live API and GPT Realtime API clients.
 * Includes which client is currently active.
 */
export interface LiveAPIContextValue {
  liveAPI: UseLiveAPIResults;
  gptAPI: UseGPTRealtimeResults;
  clientType: string;
  transcription: TranscriptionResult & {
    connect: () => void;
    disconnect: () => void;
    appendAudio: (audioBase64: string) => void;
    commitAudio: () => void;
    createResponse: () => void;
    clearTranscript: () => void;
  };
}

const LiveAPIContext = createContext<LiveAPIContextValue | undefined>(undefined);

export type LiveAPIProviderProps = {
  children: ReactNode;
  options: LiveClientOptions;
};

/**
 * Provides both the Gemini live client and the GPT realtime client to descendants,
 * along with the active client indicator from options.
 */
export const LiveAPIProvider: FC<LiveAPIProviderProps> = ({ options, children }) => {
  const liveAPI = useLiveAPI(options);
  const gptAPI = useGPTRealtime(options.apiKey);

  // transcription for incoming audio
  const transcription = useTranscription({
    model: "whisper-1",
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY as string,
  });

  return (
    <LiveAPIContext.Provider value={{ transcription, liveAPI, gptAPI, clientType: options.clientType }}>
      {children}
    </LiveAPIContext.Provider>
  );
};

/**
 * Hook to access the combined Live API context.
 * @throws if used outside LiveAPIProvider
 */
export const useLiveAPIContext = (): LiveAPIContextValue => {
  const context = useContext(LiveAPIContext);
  if (!context) {
    throw new Error("useLiveAPIContext must be used within a LiveAPIProvider");
  }
  return context;
};
