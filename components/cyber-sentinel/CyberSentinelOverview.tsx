import React from "react";
import Link from "next/link";
import { Shield, Lock, Radio, Github, AlertOctagon, Terminal } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Button } from "@/components/common/Button";
import { cyberSentinelData } from "@/lib/content/projects/cyberSentinel";

export function CyberSentinelOverview() {
  return (
    <section id="overview" className="pt-28 pb-16 relative">
      {/* Decorative Red/Crimson Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Badge variant="red" size="md">
              SECURITY PLATFORM // 02
            </Badge>
            <span className="text-xs font-mono text-red-300">
              {cyberSentinelData.status}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {cyberSentinelData.githubUrl ? (
              <a href={cyberSentinelData.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repo</span>
                </Button>
              </a>
            ) : (
              <div className="relative group">
                <Button variant="outline" size="sm" disabled className="opacity-50">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <span className="text-[10px] font-mono text-slate-500">(Pending URL)</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="max-w-4xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-400/40 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.25)]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
                {cyberSentinelData.title}
              </h1>
              <p className="text-base sm:text-xl font-mono text-red-400 font-medium">
                {cyberSentinelData.subtitle}
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed text-balance">
            {cyberSentinelData.overview}
          </p>
        </div>

        {/* Key Platform Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GlassPanel variant="red" className="p-6">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-red-400 font-bold">
              <Radio className="w-4 h-4" />
              <span>// REAL-TIME CORE</span>
            </div>
            <h3 className="text-base font-bold text-white font-sans mb-2">
              Spring Boot & STOMP WebSockets
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Full-duplex bidirectional communication with Redis Pub/Sub broadcast and TTL-based ephemeral room reclamation.
            </p>
          </GlassPanel>

          <GlassPanel variant="red" className="p-6">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-red-400 font-bold">
              <AlertOctagon className="w-4 h-4" />
              <span>// STATISTICAL ML PRE-FILTER</span>
            </div>
            <h3 className="text-base font-bold text-white font-sans mb-2">
              K-Means Anomaly Clustering
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              High-speed Euclidean outlier distance calculation flagging volumetric traffic surges and protocol anomalies in microseconds.
            </p>
          </GlassPanel>

          <GlassPanel variant="red" className="p-6">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-red-400 font-bold">
              <Lock className="w-4 h-4" />
              <span>// LLM THREAT REASONING</span>
            </div>
            <h3 className="text-base font-bold text-white font-sans mb-2">
              Google Gemini AI Analysis
            </h3>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Synthesizes packet signatures, user agent distributions, and request entropy to execute automated edge mitigations.
            </p>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
