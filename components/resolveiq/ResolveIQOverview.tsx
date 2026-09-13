import React from "react";
import Link from "next/link";
import { ArrowLeft, Cpu, Shield, AlertTriangle, CheckCircle, Github, Terminal } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Button } from "@/components/common/Button";
import { resolveiqData } from "@/lib/content/projects/resolveiq";

export function ResolveIQOverview() {
  return (
    <section id="overview" className="pt-28 pb-16 relative">
      {/* Decorative Cyan Radial Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Badge variant="cyan" size="md">
              FLAGSHIP PROJECT // 01
            </Badge>
            <span className="text-xs font-mono text-cyan-300">
              {resolveiqData.status}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {resolveiqData.githubUrl ? (
              <a href={resolveiqData.githubUrl} target="_blank" rel="noopener noreferrer">
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

        {/* Project Title & Tagline */}
        <div className="max-w-4xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(61,219,255,0.25)]">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
                {resolveiqData.title}
              </h1>
              <p className="text-base sm:text-xl font-mono text-cyan-400 font-medium">
                {resolveiqData.subtitle}
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed text-balance">
            {resolveiqData.tagline}
          </p>
        </div>

        {/* Problem vs. Solution Cards (PRD Section 19) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Problem Card */}
          <GlassPanel variant="amber" className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-amber-400 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>// THE CHALLENGE</span>
              </div>
              <h3 className="text-xl font-bold text-white font-sans mb-3">
                {resolveiqData.problem.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                {resolveiqData.problem.summary}
              </p>

              <div className="space-y-2.5">
                {resolveiqData.problem.painPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>

          {/* Solution Card */}
          <GlassPanel variant="cyan" glow={true} className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-cyan-400 font-bold">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>// THE ARCHITECTURAL SOLUTION</span>
              </div>
              <h3 className="text-xl font-bold text-white font-sans mb-3">
                {resolveiqData.solution.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                {resolveiqData.solution.summary}
              </p>

              <div className="space-y-2.5">
                {resolveiqData.solution.coreComponents.map((component, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{component}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
