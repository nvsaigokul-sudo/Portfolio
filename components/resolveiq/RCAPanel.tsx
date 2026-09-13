"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Activity,
  FileCode,
  GitBranch,
  ShieldCheck,
  Server,
  Zap,
  Info,
  Layers,
} from "lucide-react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { resolveiqData } from "@/lib/content/projects/resolveiq";
import { useSimulationStore } from "@/lib/state/simulationStore";
import { cn } from "@/lib/utils/cn";

export function RCAPanel() {
  const { currentSimulationStep, isSimulating, isSimulationCompleted } = useSimulationStore();
  const [activeEvidenceTab, setActiveEvidenceTab] = useState<"metrics" | "logs" | "traces">("metrics");
  const [isEngineerVerified, setIsEngineerVerified] = useState(false);

  const rca = resolveiqData.sampleRCA;

  // Render progressively during simulation steps or when completed
  const showRCA = !isSimulating || currentSimulationStep >= 10 || isSimulationCompleted;
  const showConfidence = !isSimulating || currentSimulationStep >= 11 || isSimulationCompleted;
  const showVerification = !isSimulating || currentSimulationStep >= 12 || isSimulationCompleted || isEngineerVerified;
  const showMitigation = !isSimulating || currentSimulationStep >= 13 || isSimulationCompleted;

  if (!showRCA) {
    return (
      <div className="p-8 rounded-2xl bg-[#0D1117]/60 border border-white/5 text-center text-slate-500 font-mono text-xs">
        [RCA PANEL STANDBY // TRIGGER SIMULATION OR EXPLORE TO GENERATE DIAGNOSTIC PAYLOAD]
      </div>
    );
  }

  return (
    <section id="rca" className="py-8 relative">
      <GlassPanel
        variant="cyan"
        glow={true}
        className="p-6 sm:p-10 border-cyan-500/40 bg-[#0A0F17]/95 relative overflow-hidden"
      >
        {/* Top RCA Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="green" size="sm">
                  ROOT CAUSE ANALYSIS // RESOLVED
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  {rca.incidentId}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
                {rca.title}
              </h3>
            </div>
          </div>

          {/* Verification Badge / Action */}
          <div className="flex items-center gap-3">
            {showVerification ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ENGINEER VERIFIED // SIGNED OFF</span>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsEngineerVerified(true)}
                className="font-mono text-xs"
              >
                Sign Off & Verify
              </Button>
            )}
          </div>
        </div>

        {/* Confidence Meter & Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Animated Confidence Meter (PRD Section 23) */}
          <div className="lg:col-span-4 p-6 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-slate-400 uppercase">
                  Confidence Score
                </span>
                <span className="text-[10px] font-mono text-amber-400">
                  DEMO METRIC
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-5xl font-extrabold font-mono text-cyan-300">
                  {rca.demoConfidenceScore}%
                </span>
                <span className="text-xs font-mono text-emerald-400">HIGH CERTAINTY</span>
              </div>

              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-1000 rounded-full"
                  style={{ width: `${rca.demoConfidenceScore}%` }}
                />
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Calculated across 8 supporting telemetry streams with 0 contradictory hardware faults.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 text-[11px] font-mono text-slate-500">
              Severity: <span className="text-red-400 font-bold">{rca.severity}</span>
            </div>
          </div>

          {/* Root Cause Synthesized Narrative */}
          <div className="lg:col-span-8 p-6 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase mb-2">
                // Synthesized Diagnostic Root Cause
              </div>
              <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed mb-6">
                {rca.rootCause}
              </p>
            </div>

            {/* Affected Services Chips */}
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase mb-2">
                Affected Services:
              </div>
              <div className="flex flex-wrap gap-2">
                {rca.affectedServices.map((service, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 flex items-center gap-1.5"
                  >
                    <Server className="w-3 h-3 text-cyan-400" />
                    <span>{service}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Supporting vs. Counter Evidence (PRD Section 23 Credibility Requirement) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Supporting Evidence Tabs */}
          <div className="lg:col-span-7 p-6 rounded-xl bg-black/60 border border-white/10">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-mono text-cyan-300 font-bold uppercase">
                // Supporting Evidence Streams
              </span>

              {/* Tab Selector */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-black/80 border border-white/10">
                <button
                  onClick={() => setActiveEvidenceTab("metrics")}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-mono transition-all",
                    activeEvidenceTab === "metrics"
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  Metrics
                </button>
                <button
                  onClick={() => setActiveEvidenceTab("logs")}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-mono transition-all",
                    activeEvidenceTab === "logs"
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  Logs
                </button>
                <button
                  onClick={() => setActiveEvidenceTab("traces")}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-mono transition-all",
                    activeEvidenceTab === "traces"
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  Traces
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {rca.supportingEvidence[activeEvidenceTab].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-black/40 border border-cyan-500/20 text-xs font-mono text-slate-300 flex items-start gap-2.5 leading-relaxed"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Counter Evidence Box (Crucial Credibility Signal - PRD Section 23) */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-amber-950/10 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-amber-300 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>// EVALUATED COUNTER-EVIDENCE</span>
            </div>
            <p className="text-xs text-slate-400 font-sans mb-4">
              Hypotheses challenged and ruled out during agent cross-examination to eliminate confirmation bias:
            </p>

            <div className="space-y-2.5">
              {rca.counterEvidence.map((counter, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-black/40 border border-amber-500/20 text-xs font-mono text-amber-200/90 flex items-start gap-2 leading-relaxed"
                >
                  <span className="text-amber-400 font-bold shrink-0">✕</span>
                  <span>{counter}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Mitigation Callout (PRD Section 23) */}
        {showMitigation && (
          <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/40 mb-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-emerald-300 font-bold">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>// RECOMMENDED MITIGATION ACTION</span>
            </div>
            <p className="text-sm text-white font-mono font-medium mb-3">
              {rca.recommendedMitigation}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-emerald-500/20 text-xs font-mono text-slate-400">
              <span>Runbook Execution: Ready for on-call engineer dispatch</span>
              <span className="text-emerald-400">Status: Validated</span>
            </div>
          </div>
        )}

        {/* Persistent Data Honesty Caption (PRD Section 23) */}
        <div className="text-center font-mono text-[11px] text-slate-500 pt-4 border-t border-white/5">
          {rca.disclaimer}
        </div>
      </GlassPanel>
    </section>
  );
}
