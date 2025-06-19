"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { DualInfiniteScrollGrid, LogoItem } from "@/components/ui/dual-infinite-scroll-grid";

/**
 * Core Features Section Component
 * Showcases main product features with interactive demos
 * Responsive: single column on mobile/tablet, three columns on desktop
 * First feature includes a central overlay badge over the carousel
 */
export function CoreFeaturesSection() {
  const features = [
    {
      title: "Agentic Workflow",
      description: "Intelligent automation that adapts to your business processes and makes decisions autonomously.",
      hasScroll: true,
    },
    {
      title: "Data Engineering",
      description: "Advanced data processing and analysis capabilities for better insights and decision making.",
      imageSrc: "/data-engineering.webp",
    },
    {
      title: "Conversational Reasoning",
      description: "Natural language processing that understands context and provides intelligent responses.",
      imageSrc: "/continuous-learning.webp",
    },
  ];

  // sample logos for scroll demo
  const firstRow: LogoItem[] = [
    { name: "Chrome", src: "/logos/chrome.png" },
    { name: "Microsoft", src: "/logos/microsoft.png" },
    { name: "Apple", src: "/logos/apple.png" },
    { name: "Google", src: "/logos/google.png" },
    { name: "Amazon", src: "/logos/amazon.png" },
    { name: "Netflix", src: "/logos/netflix.png" },
  ];
  const secondRow: LogoItem[] = [
    { name: "IBM", src: "/logos/ibm.png" },
    { name: "Spotify", src: "/logos/spotify.png" },
    { name: "Microsoft", src: "/logos/microsoft.png" },
    { name: "Apple", src: "/logos/apple.png" },
    { name: "Chrome", src: "/logos/chrome.png" },
    { name: "Google", src: "/logos/google.png" },
  ];

  return (
    <AnimatedSection className="py-20 px-6">
      <div className="container mx-auto" id="features">
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientText>Core features</GradientText>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              className="h-full"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative">
                {/* Gradient top border */}
                <div
                  className="absolute top-0 left-0 w-full h-2"
                  style={{
                    background: "linear-gradient(to right, transparent, #70befa, transparent)",
                  }}
                />
                <div className="border border-white/20 rounded-lg overflow-hidden shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                  <Card className="bg-gray-900/50 border-none backdrop-blur-sm rounded-none h-full">
                    <CardContent className={`px-8 pb-8 flex flex-col ${index === 0 ? "pt-0" : "pt-8"}`}>
                      <div className="relative aspect-video bg-gray-800/50 rounded-lg border border-gray-700/50 mb-6 overflow-hidden">
                        {feature.hasScroll ? (
                          <>
                            {/* Carousel behind badge */}
                            <DualInfiniteScrollGrid firstRow={firstRow} secondRow={secondRow} />
                            {/* Central badge overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-32 h-32 rounded-full border-2 border-[#70befa] flex flex-col items-center justify-center bg-slate-800 bg-opacity-50">
                                <span className="text-3xl font-bold text-white">100+</span>
                                <span className="text-sm text-gray-300">Automations</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <img src={feature.imageSrc!} alt={feature.title} className="w-full h-full object-cover" />
                        )}
                      </div>

                      <h3 className="text-2xl font-semibold mb-4">
                        <GradientText>{feature.title}</GradientText>
                      </h3>
                      <p className="text-gray-400 leading-relaxed flex-1">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
