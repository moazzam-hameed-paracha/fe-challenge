"use client";

import type React from "react";

import { motion } from "framer-motion";

interface InfiniteCarouselProps {
  children: React.ReactNode[];
  speed?: number;
}

/**
 * Infinite Carousel Component
 * Creates a continuously scrolling horizontal carousel
 * Used for team members, reviews, and other repeating content
 */
export function InfiniteCarousel({ children, speed = 50 }: InfiniteCarouselProps) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex space-x-6"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {/* Duplicate children for seamless loop */}
        {[...children, ...children].map((child, index) => (
          <div key={index} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
