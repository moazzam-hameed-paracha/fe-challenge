"use client";

import { Altair, AudioVisualizer, ControlTray } from "./components";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import { LiveClientOptions } from "./types";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
const GPT_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY as string;

const apiOptions: LiveClientOptions = {
  apiKey: GEMINI_API_KEY || GPT_API_KEY,
  clientType: GEMINI_API_KEY ? "gemini" : "gpt",
};
/**
 * Audio Player Component
 * This component provides a user interface for controlling audio playback.
 */
function AIAudioPlayer() {
  return (
    <LiveAPIProvider options={apiOptions}>
      <div className="flex flex-col items-center justify-center gap-10">
        <Altair />
        <AudioVisualizer />
        <ControlTray />
      </div>
    </LiveAPIProvider>
  );
}

export default AIAudioPlayer;
