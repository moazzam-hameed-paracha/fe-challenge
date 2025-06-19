"use client";

import React from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import { AudioPulse } from "../AudioPulse";

const AudioVisualizer = () => {
  const { clientType, gptAPI, liveAPI } = useLiveAPIContext();

  const { connected, volume } = React.useMemo(() => {
    if (clientType === "gemini") {
      return { connected: liveAPI.connected, volume: liveAPI.volume };
    }
    return { connected: gptAPI.connected, volume: gptAPI.volume };
  }, [clientType, gptAPI, liveAPI]);

  return (
    <div className="mx-auto flex items-center justify-center w-72 h-72">
      <AudioPulse volume={volume} active={connected} hover={false} size={12} />
    </div>
  );
};

export default AudioVisualizer;
