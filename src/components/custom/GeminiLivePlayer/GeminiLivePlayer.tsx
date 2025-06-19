"use client";

import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import { Altair } from "./components/altair/Altair";
import ControlTray from "./components/control-tray/ControlTray";
import { LiveClientOptions } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const apiOptions: LiveClientOptions = {
  apiKey: API_KEY,
};

function App() {
  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  // either the screen capture, the video or null, if null we hide it
  return (
    <LiveAPIProvider options={apiOptions}>
      <Altair />
      <ControlTray enableEditingSettings={true}>{/* put your own buttons here */}</ControlTray>
    </LiveAPIProvider>
  );
}

export default App;
