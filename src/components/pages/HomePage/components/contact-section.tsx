"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import { useTranslations } from "next-intl";
import { z } from "zod";

/**
 * Contact Section Component
 * Two-column layout with office information and contact form
 * Features responsive design, form adjustments, and user-facing validation messages
 * Form does not submit to server; displays validation errors client-side
 */

// Zod schema for form validation
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Enter a valid phone number"),
  message: z.string().min(1, "Message is required"),
});

export function ContactSection() {
  const t = useTranslations("ContactSection");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { name, email, phone, message };
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        newErrors[issue.path[0] as keyof typeof errors] = issue.message;
      }
      setErrors(newErrors);
      setSubmitted(false);
      return;
    }
    setErrors({});
    setSubmitted(true);
    // Optionally clear fields or show success
    console.log("Form valid: ", formData);
  };

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
            <GradientText>{t("title")}</GradientText>
          </motion.h2>

          <div>
            <h3 className="text-2xl font-bold mb-4">
              <GradientText>{t("officeTitle")}</GradientText>
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">{t("abuDhabiOffice.title")}</h4>
                <p className="text-gray-400">{t("abuDhabiOffice.address")}</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-1">{t("siliconValleyOffice.title")}</h4>
                <p className="text-gray-400">{t("siliconValleyOffice.address")}</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-700/50 my-6" />

          {/* Email contact at bottom */}
          <div>
            <h3 className="text-2xl font-bold mb-2">
              <GradientText>{t("emailTitle")}</GradientText>
            </h3>
            <p className="text-3xl font-bold text-white">{t("email")}</p>
          </div>
        </div>

        {/* Right column - Contact form */}
        <Card className="border border-gray-800/50 backdrop-blur-sm bg-transparent">
          <CardContent className="p-8">
            {submitted ? (
              <div className="text-center">
                <p className="text-green-400 text-lg">
                  {t("form.successMessage") || "Thank you! Your message has been received."}
                </p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    {t("form.name.label")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`bg-gray-800/50 border ${errors.name ? "border-red-400" : "border-gray-700/50"} text-white placeholder-gray-400 focus:border-[#70befa] focus:ring-[#70befa]`}
                    placeholder={t("form.name.placeholder")}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {t("form.email.label")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-gray-800/50 border ${errors.email ? "border-red-400" : "border-gray-700/50"} text-white placeholder-gray-400 focus:border-[#70befa] focus:ring-[#70befa]`}
                    placeholder={t("form.email.placeholder")}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>

                {/* Phone field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    {t("form.phone.label")}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`bg-gray-800/50 border ${errors.phone ? "border-red-400" : "border-gray-700/50"} text-white placeholder-gray-400 focus:border-[#70befa] focus:ring-[#70befa]`}
                    placeholder={t("form.phone.placeholder")}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    {t("form.message.label")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className={`bg-gray-800/50 border ${errors.message ? "border-red-400" : "border-gray-700/50"} text-white placeholder-gray-400 focus:border-[#70befa] focus:ring-[#70befa] resize-none`}
                    placeholder={t("form.message.placeholder")}
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <AnimatedBorderButton type="submit" className="px-8 py-2">
                  {t("form.submit")}
                </AnimatedBorderButton>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
