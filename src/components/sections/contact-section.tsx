"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";

/**
 * Contact Section Component
 * Two-column layout with office information and contact form
 * Features responsive design and form adjustments
 */
export function ContactSection() {
  return (
    <AnimatedSection className="py-20 px-6">
      <div className="container max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start" id="contact">
        {/* Left column - Header and Office information */}
        <div className="flex flex-col justify-between h-full space-y-6">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GradientText>Let&apos;s talk!</GradientText>
          </motion.h2>

          <div>
            <h3 className="text-2xl font-bold mb-4">
              <GradientText>Office:</GradientText>
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">Abu Dhabi Office:</h4>
                <p className="text-gray-400">Al Khatem Tower, Al Maryah Island, Abu Dhabi</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">Silicon Valley Office:</h4>
                <p className="text-gray-400">3101 Park Blvd. Palo Alto, CA</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-700/50 my-6" />

          {/* Email contact at bottom */}
          <div>
            <h3 className="text-2xl font-bold mb-2">
              <GradientText>Email:</GradientText>
            </h3>
            <p className="text-3xl font-bold text-white">admin@energent.ai</p>
          </div>
        </div>

        {/* Right column - Contact form */}
        <Card className="border border-gray-800/50 backdrop-blur-sm bg-transparent">
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
              <AnimatedBorderButton type="submit" className="px-8 py-2">
                Submit
              </AnimatedBorderButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
