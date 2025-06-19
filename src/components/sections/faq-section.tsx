"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";

/**
 * FAQ Section Component
 * Interactive FAQ with expandable questions and answers
 * Features responsive grid layout and smooth animations
 */
export function FAQSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is an AI Agent and how does it work?",
      a: "An AI agent is an intelligent system that can perceive its environment, make decisions, and take actions autonomously to achieve specific goals. Our AI agents use advanced machine learning algorithms, natural language processing, and contextual understanding to analyze data, learn from interactions, and execute complex tasks without constant human supervision.",
    },
    {
      q: "How secure is your AI platform?",
      a: "Security is our top priority. We implement enterprise-grade security measures including end-to-end encryption, secure API endpoints, regular security audits, and compliance with industry standards like SOC 2, GDPR, and HIPAA. Your data is processed in secure, isolated environments and we never use your data to train our models without explicit consent.",
    },
    {
      q: "Can I customize the AI agent for my specific business needs?",
      a: "Our platform offers extensive customization options including custom workflows, industry-specific templates, API integrations, and the ability to train the AI on your specific data and processes. Our Professional and Enterprise plans include dedicated support to help you tailor the solution to your exact requirements.",
    },
    {
      q: "What kind of support do you provide?",
      a: "We offer comprehensive support across all plans. Starter plan includes email support with 24-48 hour response time. Professional plan includes priority support with live chat and phone support. Enterprise customers get a dedicated account manager, custom onboarding, and 24/7 priority support with guaranteed response times.",
    },
    {
      q: "How does pricing work and can I change plans?",
      a: "Our pricing is transparent and flexible. You can choose between monthly or annual billing (with 2 months free on annual plans). You can upgrade, downgrade, or cancel your plan at any time. Usage is tracked in real-time, and we'll notify you before you approach your plan limits. Enterprise pricing is custom-tailored to your specific needs and usage patterns.",
    },
    {
      q: "Do you offer enterprise-level integrations?",
      a: "Yes, we provide comprehensive enterprise integrations including REST APIs, webhooks, SSO authentication, and custom connectors for popular business tools like Salesforce, HubSpot, Slack, and Microsoft Teams. Our Enterprise plan includes dedicated integration support and custom API development.",
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
          <GradientText>Answers</GradientText>
        </motion.h2>

        {/* FAQ grid - responsive: 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Card
                className={`bg-gray-900/50 backdrop-blur-sm transition-all duration-300 h-full ${
                  expandedFaq === index ? "border-[#70befa]/50" : "border-gray-800/50 hover:border-gray-700/50"
                }`}
              >
                <CardContent className="p-0">
                  {/* FAQ question button */}
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold pr-4">
                      <GradientText>{faq.q}</GradientText>
                    </h3>
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#70befa] flex items-center justify-center transition-all duration-200 ${
                        expandedFaq === index ? "bg-[#70befa]" : ""
                      }`}
                    >
                      {expandedFaq === index ? (
                        <Minus className="w-3 h-3 text-white" />
                      ) : (
                        <Plus className="w-3 h-3 text-[#70befa]" />
                      )}
                    </div>
                  </button>

                  {/* FAQ answer with animation */}
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
