"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ArrowDown, Code2, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { ResumeButton } from "@/components/contact/ResumeButton";
import { HeroFallback } from "@/components/hero/HeroFallback";
import { profileData } from "@/lib/content/profile";
import { usePerformanceTier } from "@/lib/hooks/usePerformanceTier";

// Dynamic import of 3D Scene with ssr: false for code-splitting (PRD Section 37)
const HeroScene = dynamic(
  () => import("@/components/hero/HeroScene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => <HeroFallback />,
  }
);

export function Hero() {
  const tier = usePerformanceTier();

  const handleScrollToWork = () => {
    const el = document.getElementById("work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Background 3D Scene or 2D Fallback */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {tier === "no-webgl" || tier === "low" ? (
          <HeroFallback />
        ) : (
          <HeroScene />
        )}
        {/* Subtle Radial Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-transparent to-[#0A0E14]/70 pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
        {/* Terminal status badge */}
        <div className="inline-flex items-center gap-2 mb-6 pointer-events-auto">
          <Badge variant="cyan" size="md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>SYSTEM CONSOLE // ONLINE</span>
          </Badge>
        </div>

        {/* Engineer Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-md">
          {profileData.name}
        </h1>

        {/* Role Line */}
        <div className="flex items-center justify-center gap-3 text-lg sm:text-2xl font-mono text-cyan-300 font-semibold mb-6">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span>{profileData.role}</span>
        </div>

        {/* One-Sentence Positioning Statement (PRD Section 7) */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans mb-10 text-balance">
          {profileData.positioningStatement}
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <Button
            size="lg"
            variant="primary"
            onClick={handleScrollToWork}
            className="group"
          >
            <span>View Work</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </Button>

          <ResumeButton size="lg" variant="secondary" />
        </div>

        {/* Subtle scroll cue indicator */}
        <div className="mt-16 sm:mt-24 flex flex-col items-center justify-center gap-2 text-slate-500 font-mono text-xs pointer-events-auto">
          <span>SCROLL TO EXPLORE ARCHITECTURE</span>
          <div className="w-4 h-7 border border-slate-700 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
