"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import { AudioRecorder } from "../../lib/audio-recorder";
import { cn } from "@/utils";
import { Mic, MicOff, Pause, Play } from "lucide-react";

function ControlTray() {
  const [inVolume, setInVolume] = useState(0);
  const [audioRecorder] = useState(() => new AudioRecorder());
  const [muted, setMuted] = useState(false);
  const connectButtonRef = useRef<HTMLButtonElement>(null);

  const { clientType, gptAPI, liveAPI, transcription: userTranscription } = useLiveAPIContext();

  const { client, connected, connect, disconnect, transcription, setTranscriptions } = useMemo(() => {
    if (clientType === "gemini") {
      return {
        client: liveAPI.client,
        connected: liveAPI.connected,
        connect: liveAPI.connect,
        disconnect: liveAPI.disconnect,
        transcription: liveAPI.transcription,
        setTranscriptions: liveAPI.setTranscriptions,
      };
    }

    return {
      client: gptAPI.client,
      connected: gptAPI.connected,
      connect: gptAPI.connect,
      disconnect: gptAPI.disconnect,
      transcription: gptAPI.transcription,
      setTranscriptions: gptAPI.setTranscriptions,
    };
  }, [clientType, gptAPI, liveAPI]);

  // Send transcript to liveAPI when updated
  useEffect(() => {
    if (!userTranscription.transcript) return;

    setTranscriptions((prev) => {
      return [
        ...prev,
        {
          content: userTranscription.transcript,
          type: "user",
        },
      ];
    });
    userTranscription.clearTranscript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTranscription]);

  useEffect(() => {
    if (!connected && connectButtonRef.current) {
      connectButtonRef.current.focus();
    }
  }, [connected]);

  // compute ripple metrics from volume
  const ringOffset = Math.max(5, Math.min(inVolume * 200, 8));
  const ringSize = 48 + ringOffset * 2;

  const ringProps = {
    className: "absolute bg-[#ff4600] opacity-30 rounded-[18px] transition-all duration-20",
    style: {
      width: ringSize - 5,
      height: ringSize - 5,
      top: -ringOffset + 2,
      left: -ringOffset + 2,
    } as React.CSSProperties,
  };

  useEffect(() => {
    const onData = (b64: string) => {
      client.sendRealtimeInput([{ mimeType: "audio/pcm;rate=16000", data: b64 }]);
      userTranscription.appendAudio(b64);
    };

    if (connected && !muted) {
      if (!transcription.connected) {
        transcription.connect();
      }
      if (!userTranscription.connected) {
        userTranscription.connect();
      }
      audioRecorder.on("data", onData).on("volume", setInVolume).start();
    } else {
      if (transcription.connected) {
        transcription.disconnect();
      }
      if (userTranscription.connected) {
        userTranscription.disconnect();
      }
      audioRecorder.stop();
    }

    return () => {
      audioRecorder.off("data", onData).off("volume", setInVolume);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, client, muted, audioRecorder]);

  const handleConnect = useCallback(() => {
    connect();
    transcription.connect();
    userTranscription.connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDisconnect = useCallback(() => {
    disconnect();
    transcription.disconnect();
    userTranscription.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full flex justify-center items-start gap-2">
      <nav
        className={cn(
          "bg-[#181a1b] border border-[#404547] rounded-[27px] flex gap-3 items-center overflow-hidden p-2.5 transition-opacity duration-300",
          { "opacity-50": !connected }
        )}
      >
        <button
          ref={connectButtonRef}
          onClick={() => setMuted((prev) => !prev)}
          className={cn(
            "relative flex items-center justify-center w-12 h-12 lowercase text-xl leading-7 rounded-[18px] border transition-colors duration-200",
            muted
              ? "bg-[#2a2f31] border-[#2a2f31] text-neutral-400 hover:border-[#2a2f31]"
              : "bg-[#ff4600] text-black hover:bg-[#ff9c7a]",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4600]"
          )}
        >
          <span {...ringProps} />
          {!muted ? <Mic className="relative z-10" /> : <MicOff className="relative z-10" />}
        </button>
      </nav>

      <div className="flex flex-col items-center gap-1">
        <div className="rounded-[27px] border border-[#404547] bg-[#181a1b] p-2.5">
          <button
            onClick={connected ? handleDisconnect : handleConnect}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-[18px] border transition-colors duration-200",
              connected ? "bg-[#0f3557] text-[#80c1ff] hover:border-[#80c1ff]" : "bg-[#80c1ff] text-[#181a1b]",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c3c6c7]"
            )}
          >
            {connected ? <Pause /> : <Play />}
          </button>
        </div>
      </div>
    </section>
  );
}

export default memo(ControlTray);
