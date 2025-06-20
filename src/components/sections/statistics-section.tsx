"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { useTranslations } from "next-intl";

/**
 * Statistics Section Component
 * Displays key business metrics with gradient numbers and no descriptions
 * Responsive: 1 column on mobile/tablet, 4 on desktop
 */
export function StatisticsSection() {
  const t = useTranslations("StatisticsSection");
  const statistics = t.raw("statistics");

  return (
    <AnimatedSection className="py-20 px-6">
      <div className="container mx-auto" id="statistics">
        {/* Section title */}
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-left mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GradientText>{t("title")}</GradientText>
          </motion.h2>
        </div>

        {/* Statistics grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {statistics.map((stat: { number: string; label: string }, idx: number) => (
            <motion.div
              key={idx}
              className="relative h-full"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Left gradient border */}
              <div
                className="absolute top-0 left-0 h-full w-1"
                style={{
                  background: "linear-gradient(to bottom, transparent, #70befa, transparent)",
                }}
              />

              {/* Card wrapper with theme border */}
              <div className="border border-white/20 rounded-lg overflow-hidden shadow-xl">
                <Card className="bg-gray-900/50 border-none backdrop-blur-sm rounded-none h-full">
                  <CardContent className="p-8 text-center">
                    {/* Gradient number */}
                    <div className="text-7xl md:text-8xl font-bold mb-4">
                      <GradientText>{stat.number}</GradientText>
                    </div>

                    {/* Statistic label */}
                    <h3 className="text-2xl font-semibold text-white">{stat.label}</h3>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
