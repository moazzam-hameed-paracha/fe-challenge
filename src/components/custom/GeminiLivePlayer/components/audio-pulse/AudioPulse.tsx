"use client";

import { cn } from "@/utils";
import React from "react";
import { useEffect, useRef } from "react";

const lineCount = 3;

export type AudioPulseProps = {
  active: boolean;
  volume: number;
  hover?: boolean;
};

export default function AudioPulse({ active, volume, hover }: AudioPulseProps) {
  const lines = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let timeout: number | null = null;
    const update = () => {
      lines.current.forEach((line, i) => (line.style.height = `${Math.min(24, 4 + volume * (i === 1 ? 400 : 60))}px`));
      timeout = window.setTimeout(update, 100);
    };

    update();

    return () => clearTimeout((timeout as number)!);
  }, [volume]);

  return (
    <div
      className={cn("flex w-6 justify-evenly items-center h-1 transition-opacity duration-[333ms]", {
        "opacity-100": active,
        "opacity-50": !active,
      })}
    >
      {Array(lineCount)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              lines.current[i] = el!;
            }}
            className={cn("rounded-full w-1 min-h-1 transition-[height] duration-100", {
              "bg-slate-400": !active,
              "bg-slate-300": active,
              "animate-audio-hover": hover,
            })}
            style={{ animationDelay: `${i * 133}ms` }}
          />
        ))}
    </div>
  );
}
