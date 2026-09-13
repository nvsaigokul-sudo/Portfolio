import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { LiveRegion } from "@/components/a11y/LiveRegion";
import { profileData } from "@/lib/content/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "N V Sai Gokul — Backend / AI-ML Engineer Portfolio",
  description:
    "Engineering portfolio of N V Sai Gokul specializing in Java, Spring Boot, distributed systems, Apache Kafka, pgvector RAG pipelines, and autonomous AI incident intelligence.",
  keywords: [
    "N V Sai Gokul",
    "Backend Engineer",
    "AI-ML Engineer",
    "Spring Boot",
    "Java",
    "ResolveIQ",
    "Cyber Sentinel",
    "Distributed Systems",
    "RAG",
    "Apache Kafka",
  ],
  authors: [{ name: "N V Sai Gokul" }],
  creator: "N V Sai Gokul",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "N V Sai Gokul — Backend / AI-ML Engineer",
    description:
      "Explore interactive 3D architectures and incident intelligence platforms built by N V Sai Gokul.",
    siteName: "N V Sai Gokul Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "N V Sai Gokul — Backend / AI-ML Engineer",
    description:
      "Explore interactive 3D architectures and incident intelligence platforms built by N V Sai Gokul.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Person Schema per PRD Section 36
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.name,
    jobTitle: profileData.role,
    email: profileData.email,
    telephone: profileData.phone,
    description: profileData.positioningStatement,
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0A0E14] text-slate-100 flex flex-col antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Skip to Content for Accessibility (PRD Section 35) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyan-500 text-black font-mono font-bold rounded shadow-lg"
        >
          Skip to main content
        </a>

        {/* Global polite screen-reader announcement container */}
        <LiveRegion />

        {/* Sticky Console Navbar */}
        <Navbar />

        {/* Main Content Landmark */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* System Footer */}
        <Footer />
      </body>
    </html>
  );
}
