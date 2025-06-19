"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { GeminiLivePlayer } from "../custom";

/**
 * AI Integration Hub Section Component
 * Interactive demo showing AI chatbot with audio controls
 * Features simulated conversation and audio visualizer
 */
export function AIIntegrationHubSection() {
  return (
    <AnimatedSection className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section title */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientText>AI Integration Hub</GradientText>
          <p className="text-gray-400 text-2xl mt-3">Experience our AI agent in real-time conversation</p>
        </motion.h2>

        {/* Demo interface with custom border styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto relative">
            {/* Top gradient border: thicker at center tapering to edges */}
            <div
              className="absolute top-0 left-0 w-full h-2"
              style={{
                background: "linear-gradient(to right, transparent, #70befa, transparent)",
              }}
            />
            {/* Main border container with external shadow */}
            <div className="border border-white/20 rounded-lg overflow-hidden shadow-xl">
              <Card className="bg-gray-900/50 border-none backdrop-blur-sm rounded-none">
                <CardContent className="p-0">
                  <GeminiLivePlayer />
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
