"use client";

import { cn } from "@/utils";
import "./audio-pulse.scss";
import { useEffect, useRef } from "react";

export type AudioPulseProps = {
  active: boolean;
  volume: number;
  hover?: boolean;
  size?: number; // New prop: scaling factor for the entire component. Default is 1.
  lineColor?: string; // Default inactive color. e.g. "#404547"
  activeLineColor?: string; // Default active color. e.g. "#c3c6c7"
  lineCount?: number; // New prop: number of lines. Default is 3.
};

export default function AudioPulse({
  active,
  volume,
  hover,
  size = 1,
  lineColor = "#404547",
  lineCount = 3,
  activeLineColor,
}: AudioPulseProps) {
  const lines = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let timeout: number | null = null;
    // Initialize a random index for even line count
    let bigIndex = Math.floor(Math.random() * lineCount);
    let bigIndexInterval: number | null = null;

    // For even lineCount, update the big index every 2 seconds
    if (lineCount % 2 === 0) {
      bigIndexInterval = window.setInterval(() => {
        bigIndex = Math.floor(Math.random() * lineCount);
      }, 2000);
    }

    const update = () => {
      lines.current.forEach((line, i) => {
        const baseHeight = 4 * size;
        // Determine dynamic multiplier based on even/odd line count.
        const dynamicMultiplier =
          lineCount % 2 !== 0
            ? // For odd, use the middle line
              i === Math.floor(lineCount / 2)
              ? 400 * size
              : 60 * size
            : // For even, use the randomized index
              i === bigIndex
              ? 400 * size
              : 60 * size;

        const dynamicHeight = volume * dynamicMultiplier;
        const maxHeight = 24 * size;
        line.style.height = `${Math.min(maxHeight, baseHeight + dynamicHeight)}px`;
      });
      timeout = window.setTimeout(update, 100);
    };

    update();

    return () => {
      clearTimeout(timeout as number);
      if (bigIndexInterval !== null) {
        clearInterval(bigIndexInterval);
      }
    };
  }, [volume, size, lineCount]);

  return (
    <div
      className={cn("audioPulse", { active, hover })}
      style={{
        // The container's width scales (default 24px becomes 24 * size)
        width: `${24 * size}px`,
        height: "auto", // Allow container height to be dictated by its children
      }}
    >
      {Array(lineCount)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              lines.current[i] = el!;
            }}
            style={{
              animationDelay: `${i * 133}ms`,
              // Each line's width scales (default 4px becomes 4 * size)
              width: `${4 * size}px`,
              backgroundColor: active ? activeLineColor : lineColor,
              margin: `0 ${(2 * size) / 2}px`, // Horizontal margin scales (default 2px becomes 2 * size)
            }}
          />
        ))}
    </div>
  );
}
