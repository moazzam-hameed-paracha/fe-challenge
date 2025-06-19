"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";

/**
 * Contact Section Component
 * Two-column layout with office information and contact form
 * Features responsive design and form validation
 */
export function ContactSection() {
  return (
    <AnimatedSection className="py-20 px-6">
      <div className="container mx-auto" id="contact">
        {/* Section title */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientText>Let&apos;s talk!</GradientText>
        </motion.h2>

        {/* Two-column layout */}
        <motion.div
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Left column - Office information */}
          <div className="space-y-8">
            {/* Office locations */}
            <div>
              <h3 className="text-2xl font-bold mb-6">
                <GradientText>Office:</GradientText>
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Abu Dhabi Office:</h4>
                  <p className="text-gray-400">Al Khatem Tower, Al Maryah Island, Abu Dhabi</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Silicon Valley Office:</h4>
                  <p className="text-gray-400">3101 Park Blvd. Palo Alto, CA</p>
                </div>
              </div>
            </div>

            {/* Email contact */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <GradientText>Email:</GradientText>
              </h3>
              <p className="text-3xl font-bold text-white">admin@energent.ai</p>
            </div>
          </div>

          {/* Right column - Contact form */}
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <form className="space-y-6">
                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-[#70befa] focus:ring-[#70befa]"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-[#70befa] focus:ring-[#70befa]"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-[#70befa] focus:ring-[#70befa]"
                    placeholder="+31 (0) 20 343 9223"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-[#70befa] focus:ring-[#70befa] resize-none"
                    placeholder="Hi team Energent.ai! I'm reaching out for..."
                  />
                </div>

                {/* Submit button */}
                <AnimatedBorderButton type="submit" className="w-full">
                  Submit
                </AnimatedBorderButton>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
