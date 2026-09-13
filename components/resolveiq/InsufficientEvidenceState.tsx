"use client";

import React from "react";
import { ShieldAlert, Lock, AlertCircle, Info, Sparkles, Check } from "lucide-react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { resolveiqData } from "@/lib/content/projects/resolveiq";
import { useSimulationStore } from "@/lib/state/simulationStore";

export function InsufficientEvidenceState() {
  const { isInsufficientEvidence, clearInsufficientEvidence } = useSimulationStore();
  const data = resolveiqData.insufficientEvidenceDemo;

  if (!isInsufficientEvidence) {
    return null;
  }

  return (
    <div className="w-full mb-12 animate-fadeIn">
      <GlassPanel
        variant="amber"
        glow={true}
        className="p-8 sm:p-10 border-amber-500/50 bg-[#14100A]/90 relative overflow-hidden"
      >
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="amber" size="sm">
                  SAFETY GATE ACTIVATED
                </Badge>
                <span className="text-xs font-mono text-amber-300 font-bold">
                  DETERMINISTIC UNCERTAINTY HANDLING
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                RCA generation intentionally blocked to prevent hallucination
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={clearInsufficientEvidence}
            className="text-amber-300 hover:text-white"
          >
            Dismiss Safety State
          </Button>
        </div>

        {/* Main State Banner */}
        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-black font-mono text-amber-300 tracking-tight mb-2 flex items-center gap-2">
            <Lock className="w-6 h-6 text-amber-400" />
            {data.headline}
          </h3>
          <p className="text-base font-semibold text-slate-200 font-sans mb-3">
            {data.subheadline}
          </p>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-3xl">
            {data.explanation}
          </p>
        </div>

        {/* Confidence Meter in Insufficient State */}
        <div className="p-4 rounded-xl bg-black/50 border border-amber-500/30 mb-8 max-w-xl">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-amber-300 font-bold">CALCULATED CONFIDENCE SCORE:</span>
            <span className="text-amber-400 font-bold">{data.confidenceScore}% (THRESHOLD: 75%)</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-500 rounded-full"
              style={{ width: `${data.confidenceScore}%` }}
            />
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-2">
            Status: Confidence level below threshold. Automated root-cause synthesis blocked.
          </div>
        </div>

        {/* Scenarios that trigger this state */}
        <div className="space-y-3 mb-8">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            // Triggering Scenarios:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {data.scenarios.map((scenario, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-black/40 border border-amber-500/20 text-xs text-slate-300 font-sans leading-relaxed flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{scenario}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Positioning Callout ("Why this matters" - PRD Section 24) */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200 font-sans flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold font-mono uppercase mr-2">// WHY THIS MATTERS:</span>
            <span>
              {data.philosophyReason} Production incident responders require verifiable truth, not plausible guesses.
            </span>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
