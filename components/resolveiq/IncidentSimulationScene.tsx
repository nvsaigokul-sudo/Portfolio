"use client";

import React from "react";
import { useSimulationStore } from "@/lib/state/simulationStore";
import { resolveiqData } from "@/lib/content/projects/resolveiq";
import { cn } from "@/lib/utils/cn";
import { Activity, AlertTriangle, Cpu, Database, Network, Search, CheckCircle2, ShieldAlert } from "lucide-react";

export function IncidentSimulationScene() {
  const { currentSimulationStep, isSimulating } = useSimulationStore();
  const step = currentSimulationStep;

  // Active state flags derived from current step 1-13
  const isAnomalyTriggered = isSimulating && step >= 3;
  const isDetectionActive = isSimulating && step >= 4;
  const isCorrelationActive = isSimulating && step >= 5;
  const isEvidenceCollected = isSimulating && step >= 6;
  const isAgentActive = isSimulating && step >= 7;
  const isRAGRetrieved = isSimulating && step >= 8;
  const isEvaluating = isSimulating && step >= 10;
  const isRCAComplete = isSimulating && step >= 11;
  const isVerified = isSimulating && step >= 12;

  const simulationPipeline = [
    {
      id: "ingestion",
      name: "Kafka Ingestion",
      icon: Activity,
      active: isSimulating,
      status: isAnomalyTriggered ? "alert" : "normal",
      metric: isAnomalyTriggered ? "14.2k events/s (+120%)" : "6.4k events/s (Normal)",
    },
    {
      id: "detection",
      name: "Detection Engine",
      icon: AlertTriangle,
      active: isDetectionActive,
      status: isDetectionActive ? "alert" : "idle",
      metric: isDetectionActive ? "p99 Latency > 4800ms" : "Thresholds nominal",
    },
    {
      id: "correlation",
      name: "Correlation Graph",
      icon: Network,
      active: isCorrelationActive,
      status: isCorrelationActive ? "alert" : "idle",
      metric: isCorrelationActive ? "3 Services Isolated" : "No active clusters",
    },
    {
      id: "evidence",
      name: "Evidence Collector",
      icon: Database,
      active: isEvidenceCollected,
      status: isEvidenceCollected ? "active" : "idle",
      metric: isEvidenceCollected ? "HikariCP Stack Bundle" : "Standby",
    },
    {
      id: "agent",
      name: "Spring AI Agent",
      icon: Cpu,
      active: isAgentActive,
      status: isAgentActive ? "active" : "idle",
      metric: isAgentActive ? "Read-Only Tools Booted" : "Dormant",
    },
    {
      id: "rag",
      name: "Hybrid RAG Engine",
      icon: Search,
      active: isRAGRetrieved,
      status: isRAGRetrieved ? "verified" : "idle",
      metric: isRAGRetrieved ? "RB-304 Matched (0.96)" : "Cache Warm",
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#0B0F17] border border-white/10 p-6 mb-8 relative overflow-hidden console-grid-bg">
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <span className="font-mono text-xs font-bold text-slate-300">
          SYSTEM TOPOLOGY & SIGNAL CONVERGENCE HUD
        </span>
        <span className="font-mono text-[11px] text-cyan-400">
          INCIDENT ID: INC-8492-DEMO
        </span>
      </div>

      {/* Grid of Simulation Service Nodes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {simulationPipeline.map((node) => {
          const Icon = node.icon;
          const isNodeAlert = node.status === "alert";
          const isNodeActive = node.status === "active";
          const isNodeVerified = node.status === "verified";

          return (
            <div
              key={node.id}
              className={cn(
                "p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between",
                isNodeAlert
                  ? "bg-amber-950/30 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : isNodeVerified
                  ? "bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  : isNodeActive
                  ? "bg-cyan-950/30 border-cyan-500/50 shadow-[0_0_15px_rgba(61,219,255,0.2)]"
                  : "bg-black/40 border-white/5 opacity-50"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center border",
                    isNodeAlert
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : isNodeVerified
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : isNodeActive
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                      : "bg-white/5 text-slate-500 border-white/10"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    isNodeAlert
                      ? "bg-amber-400 animate-ping"
                      : isNodeVerified
                      ? "bg-emerald-400"
                      : isNodeActive
                      ? "bg-cyan-400 animate-pulse"
                      : "bg-slate-700"
                  )}
                />
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-white mb-1">
                  {node.name}
                </h4>
                <p className="font-mono text-[10px] text-slate-400 truncate">
                  {node.metric}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
