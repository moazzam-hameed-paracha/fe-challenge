"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";

/**
 * Applications Section Component
 * Showcases different AI application use cases
 * Features numbered cards with descriptions and CTAs
 */
export function ApplicationsSection() {
  const applications = [
    {
      number: "01",
      title: "AI 助手",
      subtitle: "Personal AI Assistant",
      description: "Intelligent personal assistant that helps with daily tasks and decision making.",
      bgColor: "bg-[#70befa]/10",
      borderColor: "border-[#70befa]/30",
    },
    {
      number: "02",
      title: "AI 客服",
      subtitle: "AI Customer Service",
      description: "24/7 customer support with natural language understanding and problem resolution.",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-700/30",
    },
    {
      number: "03",
      title: "AI 分析",
      subtitle: "AI Analytics",
      description: "Advanced analytics and insights powered by artificial intelligence.",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-700/30",
    },
  ];

  return (
    <AnimatedSection className="py-20 px-6 bg-gray-900/30">
      <div className="container mx-auto">
        {/* Section title */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientText>Applications</GradientText>
        </motion.h2>

        {/* Applications grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {applications.map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className={`${app.bgColor} ${app.borderColor} border backdrop-blur-sm hover:border-opacity-50 transition-all duration-300 h-full`}
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Application header */}
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-[#70befa] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      {app.number}
                    </div>
                    <div className="text-2xl font-bold text-[#70befa]">{app.title}</div>
                  </div>

                  {/* Application title */}
                  <h3 className="text-2xl font-semibold mb-4">
                    <GradientText>{app.subtitle}</GradientText>
                  </h3>

                  {/* Application description */}
                  <p className="text-gray-400 leading-relaxed flex-grow">{app.description}</p>

                  {/* CTA section */}
                  <div className="mt-6 pt-4 border-t border-gray-700/50">
                    <AnimatedBorderButton className="text-sm">
                      Learn More <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </AnimatedBorderButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
