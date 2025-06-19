"use client";

import React, { useEffect, useRef, useState, Ref } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export type LogoItem = {
  name: string;
  src: string;
};

export type DualInfiniteScrollGridProps = {
  firstRow: LogoItem[];
  secondRow: LogoItem[];
};

/**
 * Dual Infinite Scroll Grid Component
 * Creates two rows of logos scrolling in opposite directions continuously
 * Accepts logo arrays as props and measures width to ensure seamless loop
 */
export function DualInfiniteScrollGrid({ firstRow, secondRow }: DualInfiniteScrollGridProps) {
  // Using non-null assertion to match Ref<HTMLDivElement> type
  const firstRef = useRef<HTMLDivElement>(null!);
  const secondRef = useRef<HTMLDivElement>(null!);
  const [firstWidth, setFirstWidth] = useState(0);
  const [secondWidth, setSecondWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (firstRef.current) {
        const total = firstRef.current.scrollWidth;
        setFirstWidth(total / 2);
      }
      if (secondRef.current) {
        const total = secondRef.current.scrollWidth;
        setSecondWidth(total / 2);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [firstRow, secondRow]);

  // Helper to render a row
  const renderRow = (items: LogoItem[], width: number, ref: Ref<HTMLDivElement>, reverse = false) => (
    <div className="relative h-16 overflow-hidden">
      <motion.div
        ref={ref}
        className="flex space-x-4 absolute"
        animate={{ x: reverse ? [-width, 0] : [0, -width] }}
        transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}
      >
        {[...items, ...items].map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-16 h-16 bg-[#0f0f0f] border border-[#222] rounded-lg overflow-hidden flex items-center justify-center"
          >
            <div className="relative w-8 h-8 opacity-30">
              <Image src={logo.src} alt={logo.name} fill className="object-contain" sizes="2rem" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-4">
      {renderRow(firstRow, firstWidth, firstRef, false)}
      {renderRow(secondRow, secondWidth, secondRef, true)}
    </div>
  );
}
