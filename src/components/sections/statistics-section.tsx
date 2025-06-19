"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";

/**
 * Statistics Section Component
 * Displays key business metrics and achievements
 * Features responsive grid layout with animated counters
 */
export function StatisticsSection() {
  const statistics = [
    {
      number: "20+",
      label: "Projects completed",
      description: "We've successfully completed 20+ top-tier projects.",
      color: "text-[#70befa]",
    },
    {
      number: "95%",
      label: "Satisfied customers",
      description: "We ensure a 95% satisfaction level for our clients.",
      color: "text-[#70befa]",
    },
    {
      number: "3h",
      label: "Hours saved per day",
      description: "Our solutions save our clients an average of 3 hours of work per day.",
      color: "text-[#70befa]",
    },
    {
      number: "80k",
      label: "Cost saved per month",
      description: "Our solutions save our clients an average of $80,000 per month.",
      color: "text-[#70befa]",
    },
  ];

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
          <GradientText>Our statistics</GradientText>
        </motion.h2>

        {/* Statistics grid - responsive: 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm h-full hover:border-gray-700/50 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  {/* Statistic number */}
                  <div className={`text-6xl font-bold ${stat.color} mb-4`}>{stat.number}</div>

                  {/* Statistic label */}
                  <h3 className="text-xl font-semibold mb-4 text-white">{stat.label}</h3>

                  {/* Statistic description */}
                  <p className="text-gray-400 text-sm leading-relaxed">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
