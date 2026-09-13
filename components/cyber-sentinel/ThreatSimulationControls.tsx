"use client";

import React from "react";
import { ShieldAlert, Play, RotateCcw, Flame, Key, Activity, FileWarning } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { useSimulationStore, type ThreatType } from "@/lib/state/simulationStore";
import { useSimulationSequence } from "@/lib/hooks/useSimulationSequence";
import { cyberSentinelData } from "@/lib/content/projects/cyberSentinel";
import { cn } from "@/lib/utils/cn";

export function ThreatSimulationControls() {
  useSimulationSequence(); // Activates automated threat step sequencing
  const { activeThreat, threatStep, isThreatSimulating, startThreatSimulation, resetThreatSimulation } =
    useSimulationStore();

  const threatTypes = cyberSentinelData.threatTypes;

  const getThreatIcon = (id: string) => {
    switch (id) {
      case "api_flood":
        return Flame;
      case "brute_force":
        return Key;
      case "traffic_spike":
        return Activity;
      case "suspicious_activity":
        return FileWarning;
      default:
        return ShieldAlert;
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#0D1117] border border-red-500/30 p-6 shadow-xl mb-8">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-wider text-red-300">
            SIMULATE REAL-TIME THREAT ATTACK // LIVE GATEWAY MITIGATION
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Select a threat signature to trigger ML clustering & AI interception
        </span>
      </div>

      {/* Threat Type Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {threatTypes.map((threat) => {
          const Icon = getThreatIcon(threat.id);
          const isSelected = activeThreat === threat.id;

          return (
            <button
              key={threat.id}
              onClick={() => startThreatSimulation(threat.id as ThreatType)}
              className={cn(
                "p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between",
                isSelected
                  ? "bg-red-950/40 border-red-400 text-white shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                  : "bg-black/40 border-white/5 text-slate-300 hover:border-red-500/30 hover:bg-red-500/5"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Icon className={cn("w-4 h-4", isSelected ? "text-red-400" : "text-slate-400")} />
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-400/10 text-red-300 border border-red-400/20">
                    {threat.badge}
                  </span>
                </div>
                <h4 className="font-mono text-xs font-bold text-white mb-1">
                  {threat.name}
                </h4>
                <p className="text-[11px] text-slate-400 font-sans line-clamp-2">
                  {threat.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                <span className={isSelected ? "text-red-300 font-bold" : "text-slate-500"}>
                  {isSelected ? "Simulating Attack" : "Click to Test"}
                </span>
                <Play className="w-3 h-3 text-red-400" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Simulation Step Indicator */}
      {isThreatSimulating && (
        <div className="p-4 rounded-xl bg-black/60 border border-red-500/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <div className="text-xs font-mono text-slate-300">
              <span className="text-red-400 font-bold mr-2">STEP {threatStep} / 5:</span>
              <span>
                {threatStep === 1 && "Threat Ingress: Malicious packet frames entering edge network"}
                {threatStep === 2 && "Gateway Intercept: Spring Cloud Gateway flags rate / auth violation"}
                {threatStep === 3 && "K-Means Outlier: Weka clustering isolates distance from centroid"}
                {threatStep === 4 && "Gemini AI Reasoning: Multi-dimensional contextual reasoning pass"}
                {threatStep >= 5 && "Mitigation: Client socket severed, IP throttled, key invalidated"}
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={resetThreatSimulation}
            className="text-xs font-mono text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Threat</span>
          </Button>
        </div>
      )}
    </div>
  );
}
