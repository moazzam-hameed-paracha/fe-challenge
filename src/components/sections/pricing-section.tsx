"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";

/**
 * Pricing Section Component
 * Displays subscription plans with billing toggle
 * Features detailed plan comparison and interactive pricing
 */
export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  const pricingPlans = [
    {
      name: "Admin",
      description:
        "Ideal for simple routine workflow, such as data entry, in HR, Finance, Operation, and any Admin department.",
      monthlyPrice: "$199",
      annualPrice: "$1990",
      metrics: [
        { number: "20k", label: "agent credits", sublabel: "with unlimited workflows" },
        { number: "2k", label: "pages of document reading", sublabel: "and unlimited webpages reading" },
      ],
      hosting: "Hosted by Energent.ai",
      features: [
        "Basic workflow automation",
        "Document processing",
        "Email integration",
        "Standard support",
        "Basic analytics",
      ],
      popular: false,
    },
    {
      name: "Executive",
      description: "Functional as a team of Engineers, Analysts and Admins to get work done",
      monthlyPrice: "$499",
      annualPrice: "$4990",
      metrics: [
        { number: "100k", label: "agent credits", sublabel: "with unlimited workflows" },
        { number: "10k", label: "pages of document reading", sublabel: "and unlimited webpages reading" },
      ],
      hosting: "Hosted by Energent.ai",
      features: [
        "Advanced workflow automation",
        "Team collaboration tools",
        "Priority support",
        "Advanced analytics",
        "Custom integrations",
        "API access",
      ],
      popular: false,
    },
    {
      name: "Enterprise",
      description: "Ideal for businesses with strict security and performance requirements",
      monthlyPrice: "Contact us",
      annualPrice: "Contact us",
      metrics: [
        { number: "up to ∞", label: "workflow executions", sublabel: "with unlimited steps" },
        { number: "up to ∞", label: "active workflows and", sublabel: "unlimited test ones" },
      ],
      hosting: "Self-hosted (or hosted by Energent.ai)",
      features: [
        "Unlimited everything",
        "Custom deployment",
        "Dedicated support",
        "SLA guarantee",
        "White-label solutions",
        "Advanced security",
        "Custom development",
      ],
      popular: false,
    },
  ];

  return (
    <AnimatedSection className="py-20 px-6">
      <div className="container mx-auto max-w-6xl" id="pricing">
        {/* Section title */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientText>Pricing</GradientText>
        </motion.h2>

        {/* Billing toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-black bg-opacity-60 border border-gray-700/50 rounded-lg p-1 flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                billingCycle === "monthly" ? "border-[#70befa] border text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle("annually")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                billingCycle === "annually" ? "border-[#70befa] border text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Annual billing
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Card wrapper with top gradient border */}
              <div className="relative">
                <div
                  className="absolute top-0 left-0 w-full h-1"
                  style={{ background: "linear-gradient(to right, transparent, #70befa, transparent)" }}
                />
                <div
                  className={`${plan.popular ? "border-[#70befa]/50" : "border-white/20"} border rounded-lg overflow-hidden`}
                >
                  <Card className="bg-transparent border-none backdrop-blur-sm rounded-none h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Plan header */}
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-4 text-white">{plan.name}</h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{plan.description}</p>

                        {/* Pricing display */}
                        <div className="mb-6">
                          <div className="text-4xl font-bold mb-2 text-white">
                            {plan.monthlyPrice !== "Contact us" ? (
                              <>
                                {billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                                <span className="text-lg text-gray-400">
                                  {" "}
                                  per {billingCycle === "monthly" ? "month" : "year"}
                                </span>
                              </>
                            ) : (
                              <GradientText>Contact us</GradientText>
                            )}
                          </div>
                        </div>

                        {/* Plan metrics */}
                        <div className="space-y-4 mb-6">
                          {plan.metrics.map((metric, metricIndex) => (
                            <div key={metricIndex} className="flex items-start">
                              <div className="mr-4">
                                <div className="text-3xl font-bold text-[#70befa]">{metric.number}</div>
                              </div>
                              <div className="flex-1">
                                <div className="text-white font-medium">{metric.label}</div>
                                <div className="text-gray-400 text-sm">{metric.sublabel}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Hosting information */}
                        <div className="flex items-center text-gray-400 text-sm mb-6">
                          <div className="w-4 h-4 bg-gray-600 rounded mr-2"></div>
                          {plan.hosting}
                        </div>

                        {/* CTA button */}
                        <AnimatedBorderButton className="w-full mb-6">
                          {plan.name === "Enterprise" ? "Contact us" : "Start free trial"}
                        </AnimatedBorderButton>
                      </div>

                      {/* Plan features */}
                      <ul className="space-y-3 flex-grow">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex gap-3 items-center">
                            <Image
                              src="/icons/tick.png"
                              alt="tick"
                              width={15}
                              height={11.25}
                              className="h-[11.25px] w-[15px] flex-shrink-0"
                            />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
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
