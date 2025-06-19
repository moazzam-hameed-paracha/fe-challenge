"use client";

import { cn } from "@/utils";
import React, { useEffect, useRef } from "react";

const lineCount = 3;

export type AudioPulseProps = {
  active: boolean;
  volume: number;
  hover?: boolean;
};

export default function AudioPulse({ active, volume, hover }: AudioPulseProps) {
  const lines = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let timeout: number;
    const update = () => {
      lines.current.forEach((line, i) => {
        const height = Math.min(40, 8 + volume * (i === 1 ? 600 : 90));
        line.style.height = `${height}px`;
      });
      timeout = window.setTimeout(update, 100);
    };

    update();
    return () => clearTimeout(timeout);
  }, [volume]);

  return (
    <div
      className={cn("flex w-full h-full justify-evenly items-end", {
        "opacity-100": active,
        "opacity-50": !active,
        "animate-audio-hover": hover,
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
            className="bg-white rounded-full w-2 transition-[height] duration-100"
            style={{ animationDelay: `${i * 133}ms` }}
          />
        ))}
    </div>
  );
}
