"use client";

import React from "react";
import { Cpu, ShieldCheck, AlertOctagon, Terminal, Flame, Sparkles, CheckCircle2 } from "lucide-react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { useSimulationStore } from "@/lib/state/simulationStore";
import { cyberSentinelData } from "@/lib/content/projects/cyberSentinel";
import { cn } from "@/lib/utils/cn";

export function ThreatLaneVisualization() {
  const { activeThreat, threatStep, isThreatSimulating } = useSimulationStore();
  const selectedThreat =
    cyberSentinelData.threatTypes.find((t) => t.id === activeThreat) ||
    cyberSentinelData.threatTypes[0];

  const showKMeans = isThreatSimulating && threatStep >= 3;
  const showGemini = isThreatSimulating && threatStep >= 4;
  const showMitigation = isThreatSimulating && threatStep >= 5;

  return (
    <div className="space-y-8 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: K-Means Anomaly Clustering Visualization (PRD Section 26) */}
        <div className="lg:col-span-6">
          <GlassPanel
            variant={showKMeans ? "red" : "default"}
            className="p-6 sm:p-8 h-full flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono text-red-400 font-bold flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4" />
                  // K-MEANS STATISTICAL CLUSTERING
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  WEKA ML PIPELINE
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-sans mb-2">
                Unsupervised Outlier Centroid Isolation
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                Traffic vectors projected across request frequency, entropy variance, and socket persistence metrics.
              </p>

              {/* 2D Cluster Visualization Plot */}
              <div className="relative w-full h-48 bg-black/60 rounded-xl border border-white/10 p-4 overflow-hidden mb-6 flex items-center justify-center">
                {/* Cluster 1: Normal User Traffic (Cyan points) */}
                <div className="absolute left-1/4 top-1/3 flex flex-wrap w-20 h-20 gap-1 opacity-70">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span
                      key={`c1-${i}`}
                      className="w-2 h-2 rounded-full bg-cyan-400"
                      title="Normal user session"
                    />
                  ))}
                  <span className="text-[9px] font-mono text-cyan-300 w-full mt-1">
                    Cluster C1 (Normal)
                  </span>
                </div>

                {/* Cluster 2: Background Admin / Service Traffic */}
                <div className="absolute right-1/4 top-1/4 flex flex-wrap w-16 h-16 gap-1 opacity-60">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span
                      key={`c2-${i}`}
                      className="w-2 h-2 rounded-full bg-slate-400"
                    />
                  ))}
                  <span className="text-[9px] font-mono text-slate-400 w-full mt-1">
                    Cluster C2
                  </span>
                </div>

                {/* Highlighted Outlier Cluster for current simulated threat */}
                {showKMeans && (
                  <div className="absolute right-8 bottom-6 p-2 rounded-lg bg-red-950/80 border border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-bounce">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                      <span className="text-[10px] font-mono text-red-300 font-bold">
                        OUTLIER DETECTED
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-300 block">
                      {selectedThreat.kMeansOutlierProfile.cluster}
                    </span>
                  </div>
                )}
              </div>

              {/* Cluster Statistics */}
              <div className="space-y-1.5 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Euclidean Distance:</span>
                  <span className="text-red-400 font-bold">
                    {selectedThreat.kMeansOutlierProfile.distanceToCentroid}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Signature:</span>
                  <span className="text-slate-200 truncate max-w-[240px]">
                    {selectedThreat.telemetrySignature}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/5 flex flex-wrap gap-1.5">
              {selectedThreat.kMeansOutlierProfile.features.map((f, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                >
                  {f}
                </span>
              ))}
            </div>
          </GlassPanel>
        </div>

        {/* Right Column: Google Gemini AI Reasoning & Edge Mitigation (PRD Section 26) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Gemini AI Diagnostic Card */}
          <GlassPanel
            variant={showGemini ? "red" : "default"}
            className="p-6 sm:p-8 flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono text-red-300 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-400" />
                  // GOOGLE GEMINI AI REASONING PASS
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  CONTEXTUAL EVALUATION
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-sans mb-3">
                Automated Threat Synthesis & Intent Classification
              </h3>

              <div className="p-4 rounded-xl bg-black/60 border border-red-500/20 text-xs text-slate-200 font-mono leading-relaxed mb-4">
                {selectedThreat.geminiReasoning}
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500">
              Inference Latency: 142ms // Confidence: High
            </div>
          </GlassPanel>

          {/* Mitigation Severance Card */}
          <GlassPanel
            variant={showMitigation ? "green" : "default"}
            className="p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>// AUTOMATED EDGE FILTER MITIGATION</span>
            </div>

            <h4 className="text-sm font-bold text-white font-mono mb-2">
              Spring Cloud Gateway Action Executed
            </h4>

            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
              {selectedThreat.mitigationAction}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400">
              <span>Socket Status: <strong className="text-red-400">TERMINATED</strong></span>
              <span className="text-emerald-400 font-bold">Traffic Normalized</span>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
