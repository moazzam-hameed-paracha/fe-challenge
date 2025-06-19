"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";

/**
 * Demo Video Section Component
 * Embeds a YouTube demo inside a styled container matching our border theme
 */
export function DemoVideoSection() {
  return (
    <AnimatedSection className="py-20 px-6">
      <div className="container mx-auto">
        <div className="relative max-w-4xl mx-auto">
          {/* Top gradient border: thicker at center tapering to edges */}
          <div
            className="absolute top-0 left-0 w-full h-[2px]"
            style={{
              background: "linear-gradient(to right, transparent, #70befa, transparent)",
            }}
          />

          {/* Padded border container */}
          <div className="border border-white/20 rounded-lg overflow-hidden shadow-xl p-4">
            <motion.div
              className="rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Embedded YouTube video */}
              <div className="aspect-video bg-gray-800">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/U2lWqpPqs7w"
                  title="Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video overlay info */}
              <div className="absolute bottom-4 left-4 bg-gray-950/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-800/50">
                <p className="text-sm text-gray-300">How we can help you succeed</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
