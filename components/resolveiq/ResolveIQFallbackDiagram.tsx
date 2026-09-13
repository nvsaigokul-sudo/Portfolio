"use client";

import React from "react";
import { resolveiqData, type ArchitectureStage } from "@/lib/content/projects/resolveiq";
import { useSimulationStore } from "@/lib/state/simulationStore";
import { cn } from "@/lib/utils/cn";
import { ChevronRight, Layers, ArrowRight } from "lucide-react";

export function ResolveIQFallbackDiagram() {
  const { activeArchitectureStage, setActiveArchitectureStage } = useSimulationStore();
  const stages = resolveiqData.architectureStages;
  const currentStage = stages[activeArchitectureStage - 1] || stages[0];

  return (
    <div className="w-full rounded-2xl bg-[#0D1117] border border-white/10 p-6 sm:p-8 console-grid-bg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold text-slate-200">
            13-STAGE ARCHITECTURAL PIPELINE // 2D SCHEMATIC
          </span>
        </div>
        <span className="font-mono text-xs text-cyan-400">
          STAGE {currentStage.step} OF 13
        </span>
      </div>

      {/* Horizontal / Scrollable stage pill selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
        {stages.map((stage) => {
          const isCurrent = stage.step === activeArchitectureStage;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveArchitectureStage(stage.step)}
              className={cn(
                "px-3 py-1.5 rounded-lg font-mono text-xs whitespace-nowrap transition-all duration-200 cursor-pointer border",
                isCurrent
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(61,219,255,0.3)]"
                  : "bg-black/40 text-slate-400 border-white/5 hover:border-white/20 hover:text-slate-200"
              )}
            >
              {stage.step}. {stage.name}
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-xl bg-black/60 border border-cyan-500/30">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
              {currentStage.category}
            </span>
            <span className="text-xs font-mono text-slate-500">
              PACKET TYPE: {currentStage.packetType.toUpperCase()}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white font-sans mb-2">
            {currentStage.name}
          </h3>
          <p className="text-sm text-slate-300 font-sans leading-relaxed mb-4">
            {currentStage.detailedDescription}
          </p>

          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Key Technical Primitives:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentStage.technicalDetails.map((detail, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10"
                >
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
          <div className="text-xs font-mono text-slate-400">
            <span className="text-slate-500">SUMMARY:</span> {currentStage.shortDescription}
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
            <button
              onClick={() =>
                setActiveArchitectureStage(activeArchitectureStage > 1 ? activeArchitectureStage - 1 : 13)
              }
              className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1"
            >
              ← Prev Stage
            </button>
            <button
              onClick={() =>
                setActiveArchitectureStage(activeArchitectureStage < 13 ? activeArchitectureStage + 1 : 1)
              }
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 px-2 py-1 font-semibold flex items-center gap-1"
            >
              Next Stage →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
