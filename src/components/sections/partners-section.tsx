"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";

/**
 * Partners Section Component
 * Displays partner logos with title and brief description
 * Responsive: single column on mobile/tablet, two columns on desktop
 */
export function PartnersSection() {
  const partners = [
    {
      name: "Epsilla",
      description: "AI-powered vector database platform",
      imageSrc: "/Q9Q0oH9p33Izf2B5l5XNrEGgXVc.webp",
    },
    {
      name: "Jobright",
      description: "AI-powered job search career platform",
      imageSrc: "/GWmK9SDZ5Q3LQzfpC9PErI9LYOk.webp",
    },
  ];

  return (
    <AnimatedSection className="py-20 px-6">
      <div className="container mx-auto max-w-6xl" id="partners">
        {/* Section title aligned with content */}
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-6xl md:text-7xl font-bold text-left mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GradientText>Our partners</GradientText>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center">
          {partners.map((p, idx) => (
            <motion.div
              key={idx}
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Wrapper with top gradient border */}
              <div className="relative">
                <div
                  className="absolute top-0 left-0 w-full h-2"
                  style={{ background: "linear-gradient(to right, transparent, #70befa, transparent)" }}
                />
                {/* Outer container with border */}
                <div className="border border-white/20 rounded-lg overflow-hidden shadow-xl mx-auto w-64 h-[360px]">
                  <Card className="bg-gray-900/50 border-none backdrop-blur-sm rounded-none h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      {/* Partner logo */}
                      <div className="w-32 h-32 mb-4 relative">
                        <Image src={p.imageSrc} alt={p.name} fill className="object-contain" />
                      </div>

                      {/* Partner name */}
                      <h3 className="text-2xl font-semibold mb-2 text-white">{p.name}</h3>

                      {/* Small description */}
                      <p className="text-gray-400 text-sm">{p.description}</p>
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
