"use client";

import React from "react";
import { Shield, Radio, Server, Database, MessageSquare, AlertTriangle, Cpu, Zap } from "lucide-react";
import { cyberSentinelData } from "@/lib/content/projects/cyberSentinel";
import { useSimulationStore } from "@/lib/state/simulationStore";
import { cn } from "@/lib/utils/cn";

export function CyberSentinelFallbackDiagram() {
  const { activeThreat, threatStep, isThreatSimulating } = useSimulationStore();
  const selectedThreat =
    cyberSentinelData.threatTypes.find((t) => t.id === activeThreat) ||
    cyberSentinelData.threatTypes[0];

  return (
    <div className="w-full rounded-2xl bg-[#0D1117] border border-white/10 p-6 sm:p-8 console-grid-bg">
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <span className="font-mono text-xs font-bold text-slate-200 flex items-center gap-2">
          <Shield className="w-4 h-4 text-red-400" />
          DUAL-LANE SECURITY & MESSAGING ARCHITECTURE // 2D SCHEMATIC
        </span>
        <span className="font-mono text-xs text-red-400">
          THREAT STATE: {isThreatSimulating ? "INTERCEPTING..." : "MONITORING"}
        </span>
      </div>

      {/* Lane 1: Authorized Messaging Path */}
      <div className="p-5 rounded-xl bg-black/50 border border-cyan-500/30 mb-6">
        <div className="text-xs font-mono text-cyan-400 font-bold mb-4 flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span>LANE 1: AUTHORIZED REAL-TIME MESSAGING (STOMP / REDIS PUB-SUB)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          {cyberSentinelData.messagingLane.stages.map((stage, idx) => (
            <div key={stage.id} className="p-3 rounded-lg bg-black/40 border border-white/10">
              <span className="text-[10px] font-mono text-slate-500 block mb-1">
                STAGE 0{idx + 1}
              </span>
              <div className="font-mono text-xs font-bold text-white mb-1">
                {stage.name}
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                {stage.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lane 2: Threat Detection & Mitigation Lane */}
      <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/40">
        <div className="text-xs font-mono text-red-400 font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          <span>LANE 2: ANOMALY DETECTION & AUTOMATED MITIGATION PIPELINE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-lg bg-black/60 border border-red-500/30">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">01. INGRESS</span>
            <div className="font-mono text-xs font-bold text-white mb-1">
              {selectedThreat.name}
            </div>
            <p className="text-[11px] text-red-300 font-mono">
              {selectedThreat.badge}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-red-500/30">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">02. K-MEANS</span>
            <div className="font-mono text-xs font-bold text-white mb-1">
              Statistical Clustering
            </div>
            <p className="text-[11px] text-slate-300 font-mono">
              {selectedThreat.kMeansOutlierProfile.cluster}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-red-500/30">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">03. GEMINI AI</span>
            <div className="font-mono text-xs font-bold text-white mb-1">
              Context Reasoning
            </div>
            <p className="text-[11px] text-slate-300 font-mono">
              Pattern Identified
            </p>
          </div>

          <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/60">
            <span className="text-[10px] font-mono text-red-400 block mb-1">04. MITIGATION</span>
            <div className="font-mono text-xs font-bold text-emerald-300 mb-1">
              Connection Severed
            </div>
            <p className="text-[11px] text-slate-300 font-mono">
              Edge Filter Applied
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
