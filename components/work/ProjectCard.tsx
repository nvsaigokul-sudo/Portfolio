import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Shield, Layers, Activity } from "lucide-react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { cn } from "@/lib/utils/cn";

interface ProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  status: string;
  href: string;
  isPrimary?: boolean;
  accentColor: "cyan" | "red";
  highlights: string[];
  techStack: string[];
}

export function ProjectCard({
  id,
  title,
  subtitle,
  tagline,
  status,
  href,
  isPrimary = false,
  accentColor,
  highlights,
  techStack,
}: ProjectCardProps) {
  const isCyan = accentColor === "cyan";

  return (
    <GlassPanel
      variant={isCyan ? "cyan" : "red"}
      glow={isPrimary}
      className={cn(
        "group relative overflow-hidden flex flex-col justify-between transition-all duration-300 p-8 sm:p-10",
        isPrimary ? "lg:col-span-12" : "lg:col-span-12"
      )}
    >
      {/* Decorative gradient corner glow */}
      <div
        className={cn(
          "absolute -right-24 -top-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 transition-opacity group-hover:opacity-35",
          isCyan ? "bg-cyan-400" : "bg-red-500"
        )}
      />

      <div>
        {/* Header row: Badge + Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Badge variant={isCyan ? "cyan" : "red"} size="sm">
              {isPrimary ? "FLAGSHIP PROJECT" : "SECONDARY PROJECT"}
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              {status}
            </span>
          </div>

          <span className="text-xs font-mono text-slate-500">
            // {isPrimary ? "01_INCIDENT_INTEL" : "02_THREAT_DETECTION"}
          </span>
        </div>

        {/* Title and Subtitle */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center border transition-all",
                isCyan
                  ? "bg-cyan-500/10 border-cyan-400/30 text-cyan-400 group-hover:border-cyan-400"
                  : "bg-red-500/10 border-red-400/30 text-red-400 group-hover:border-red-400"
              )}
            >
              {isCyan ? <Cpu className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans group-hover:text-cyan-300 transition-colors">
              {title}
            </h3>
          </div>
          <p className="text-base sm:text-lg font-mono text-slate-300 font-medium mb-3">
            {subtitle}
          </p>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed font-sans">
            {tagline}
          </p>
        </div>

        {/* Key Architectural Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-start"
            >
              <div className="text-xs font-mono text-slate-500 mb-1">
                FEATURE // 0{idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-snug">
                {highlight}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: Tech Stack + Deep Dive CTA */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-1.5 max-w-xl">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={href}
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-mono tracking-wide transition-all duration-200 shrink-0",
            isCyan
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(61,219,255,0.3)]"
              : "bg-red-500/20 text-red-300 border border-red-400/40 hover:bg-red-500/30 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
          )}
        >
          <span>Explore Architecture & Simulation</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </GlassPanel>
  );
}
