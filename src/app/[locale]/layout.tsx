import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CursorFollower } from "@/components/custom";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Energent.ai - AI Agent helps you think and do",
  description:
    "Energent.ai is the AI teammate who gets things done on a real desktop, accurately, fast without complaining. You can watch, pause, or take over any time.",
  keywords: [
    "AI agent",
    "automation",
    "desktop AI",
    "data extraction",
    "contract parsing",
    "AI assistant",
    "workflow automation",
    "enterprise AI",
  ],
  openGraph: {
    title: "Energent.ai - AI Agent helps you think and do",
    description:
      "Energent.ai is the AI teammate who gets things done on a real desktop, accurately, fast without complaining. You can watch, pause, or take over any time.",
    url: "https://fe-challenge-beryl.vercel.app",
    siteName: "Energent.ai",
    images: [
      {
        url: "/site-ss.png",
        width: 1200,
        height: 630,
        alt: "Energent.ai - AI Agent",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Energent.ai - AI Agent helps you think and do",
    description:
      "Energent.ai is the AI teammate who gets things done on a real desktop, accurately, fast without complaining. You can watch, pause, or take over any time.",
    images: ["/site-ss.png"],
  },
  themeColor: "#171717",
  icons: {
    icon: "../favicon.ico",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* Custom cursor follower for enhanced interactivity */}
          <CursorFollower />

          {/* Provide the NextIntl context for internationalization */}
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
