"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";

/**
 * Applications Section Component
 * Showcases different AI application use cases with images and CTAs
 */
export function ApplicationsSection() {
  const applications = [
    {
      title: "AI HR",
      description: "Intelligent personal assistant that helps with daily tasks and decision making.",
      imageSrc: "/ai-hr.webp",
    },
    {
      title: "AI Data Scientist",
      description: "24/7 customer support with natural language understanding and problem resolution.",
      imageSrc: "/ai-data-scientist.webp",
    },
    {
      title: "AI O&G Specialist",
      description: "Advanced analytics and insights powered by artificial intelligence.",
      imageSrc: "/ai-o-g-specialist.webp",
    },
  ];

  return (
    <AnimatedSection className="py-20 px-6 bg-transparent">
      <div className="container mx-auto max-w-6xl" id="applications">
        {/* Section title: left-aligned, larger */}
        <motion.h2
          className="text-6xl md:text-7xl font-bold text-left mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientText>Applications</GradientText>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {applications.map((app, idx) => (
            <motion.div
              key={idx}
              className="relative h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Top gradient border */}
              <div
                className="absolute top-0 left-0 w-full h-2"
                style={{ background: "linear-gradient(to right, transparent, #70befa, transparent)" }}
              />

              {/* Outer container with theme border */}
              <div className="border border-white/20 rounded-lg overflow-hidden">
                {/* Placeholder image */}
                <div className="relative w-full aspect-video mb-6">
                  <img src={app.imageSrc} alt={app.title} className="w-full h-full object-cover rounded-t-lg" />
                </div>
                <div className="px-8 flex flex-col h-full">
                  <h4 className="text-2xl">
                    <GradientText>0{idx + 1}</GradientText> {app.title}
                  </h4>
                </div>
                {/* Content Card */}
                <div className="p-8 flex flex-col h-full">
                  <p className="text-gray-400 flex-1 leading-relaxed mb-6">{app.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
