"use client";

import React from "react";
import { Play, Pause, RotateCcw, FastForward, ShieldAlert, AlertOctagon } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { useSimulationStore } from "@/lib/state/simulationStore";
import { useSimulationSequence } from "@/lib/hooks/useSimulationSequence";
import { resolveiqData } from "@/lib/content/projects/resolveiq";

export function IncidentSimulationControls() {
  useSimulationSequence(); // Activates automatic timed sequence
  const {
    isSimulating,
    currentSimulationStep,
    isSimulationPaused,
    isSimulationCompleted,
    isInsufficientEvidence,
    startSimulation,
    pauseSimulation,
    resumeSimulation,
    resetSimulation,
    skipSimulationToEnd,
    triggerInsufficientEvidence,
    clearInsufficientEvidence,
  } = useSimulationStore();

  const currentStepData = resolveiqData.simulationSteps[currentSimulationStep - 1];

  return (
    <div className="w-full rounded-2xl bg-[#0D1117] border border-white/10 p-6 shadow-xl mb-8">
      {/* Top Banner: Persistent Label required by PRD Section 21 & 22 */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-wider text-amber-300">
            SIMULATED INCIDENT // PORTFOLIO DEMONSTRATION
          </span>
        </div>

        <span className="text-[11px] font-mono text-slate-400">
          All metrics & telemetry are synthetic demonstrations
        </span>
      </div>

      {/* Control Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {!isSimulating || isSimulationCompleted ? (
            <Button
              variant="amber"
              size="md"
              onClick={startSimulation}
              className="font-mono"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isSimulationCompleted ? "Replay Simulation" : "Simulate Incident"}</span>
            </Button>
          ) : isSimulationPaused ? (
            <Button
              variant="amber"
              size="md"
              onClick={resumeSimulation}
              className="font-mono"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Resume</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="md"
              onClick={pauseSimulation}
              className="font-mono"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={resetSimulation}
            disabled={!isSimulating && currentSimulationStep === 1 && !isInsufficientEvidence}
            title="Reset to idle baseline"
            className="font-mono text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </Button>

          {isSimulating && !isSimulationCompleted && (
            <Button
              variant="secondary"
              size="sm"
              onClick={skipSimulationToEnd}
              title="Fast-forward directly to RCA output"
              className="font-mono text-xs"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Skip to RCA</span>
            </Button>
          )}
        </div>

        {/* Independent Safety State Trigger (PRD Section 24) */}
        <div className="flex items-center gap-3">
          <Button
            variant={isInsufficientEvidence ? "danger" : "outline"}
            size="sm"
            onClick={() => {
              if (isInsufficientEvidence) {
                clearInsufficientEvidence();
              } else {
                triggerInsufficientEvidence();
              }
            }}
            className="font-mono text-xs border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {isInsufficientEvidence ? "Close Safety State" : "Try: Insufficient Evidence"}
            </span>
          </Button>
        </div>
      </div>

      {/* Live Simulation Stepper Bar */}
      {isSimulating && !isInsufficientEvidence && (
        <div className="mt-6 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="text-cyan-400 font-bold">
              STEP {currentSimulationStep} OF 13: {currentStepData?.phase.toUpperCase()}
            </span>
            <span>{Math.round((currentSimulationStep / 13) * 100)}% COMPLETE</span>
          </div>

          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${(currentSimulationStep / 13) * 100}%` }}
            />
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-cyan-500/20 flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 animate-ping" />
            <div>
              <div className="font-mono text-xs font-bold text-white mb-0.5">
                {currentStepData?.title}
              </div>
              <p className="font-sans text-xs text-slate-300">
                {currentStepData?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
