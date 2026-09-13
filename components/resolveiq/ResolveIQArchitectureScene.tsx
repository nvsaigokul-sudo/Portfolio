"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvasWrapper } from "@/components/three/SceneCanvasWrapper";
import { NodeMesh } from "@/components/three/NodeMesh";
import { ConnectionLine } from "@/components/three/ConnectionLine";
import { DataPacket } from "@/components/three/DataPacket";
import { ParticleField } from "@/components/three/ParticleField";
import { ResolveIQFallbackDiagram } from "@/components/resolveiq/ResolveIQFallbackDiagram";
import { resolveiqData } from "@/lib/content/projects/resolveiq";
import { useSimulationStore } from "@/lib/state/simulationStore";
import { usePerformanceTier } from "@/lib/hooks/usePerformanceTier";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Button } from "@/components/common/Button";
import { ChevronLeft, ChevronRight, Layers, Info } from "lucide-react";

// Generate 3D coordinates for all 13 stages in a readable serpentine path
const stagePositions: [number, number, number][] = [
  [-6.0, 2.2, 0],   // 1. Applications
  [-4.0, 2.2, 0.5], // 2. OpenTelemetry
  [-2.0, 2.2, 0],   // 3. Apache Kafka
  [-0.0, 2.2, -0.5],// 4. Detection Engine
  [2.0, 1.8, 0],    // 5. Correlation Engine
  [4.0, 1.2, 0.5],  // 6. Evidence Collection
  [4.0, -0.4, 0],   // 7. Spring AI Agent
  [2.0, -0.4, -0.5],// 8. RAG
  [0.0, -0.4, 0],   // 9. Historical Incidents
  [-2.0, -0.4, 0.5],// 10. Evidence Evaluation
  [-4.0, -1.8, 0],  // 11. Root Cause Analysis
  [-1.5, -2.0, 0.5],// 12. Engineer Verification
  [1.5, -2.0, 0],   // 13. Mitigation / Lifecycle
];

function ArchitectureSceneContent() {
  const { activeArchitectureStage, setActiveArchitectureStage, prefersReducedMotion } =
    useSimulationStore();
  const { camera } = useThree();
  const stages = resolveiqData.architectureStages;

  useFrame(() => {
    if (prefersReducedMotion) return;
    // Camera dolly toward active node position (PRD Section 20 & 43)
    const targetNodePos = stagePositions[activeArchitectureStage - 1] || stagePositions[0];
    const targetCamX = THREE.MathUtils.clamp(targetNodePos[0] * 0.65, -3.5, 3.5);
    const targetCamY = THREE.MathUtils.clamp(targetNodePos[1] * 0.65, -1.5, 1.5);
    const targetCamZ = 6.8;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.05);
  });

  return (
    <group>
      <ParticleField color="#3DDBFF" countOverride={350} />

      {/* Nodes */}
      {stages.map((stage, idx) => {
        const isSelected = activeArchitectureStage === stage.step;
        return (
          <NodeMesh
            key={stage.id}
            id={stage.id}
            position={stagePositions[idx]}
            label={`${stage.step}. ${stage.name}`}
            status={isSelected ? "verified" : "normal"}
            isSelected={isSelected}
            onClick={() => setActiveArchitectureStage(stage.step)}
            size={0.42}
          />
        );
      })}

      {/* Sequential Connections */}
      {stages.slice(0, -1).map((stage, idx) => {
        const start = stagePositions[idx];
        const end = stagePositions[idx + 1];
        const isPathActive = activeArchitectureStage >= stage.step;

        return (
          <React.Fragment key={`conn-group-${stage.id}`}>
            <ConnectionLine
              start={start}
              end={end}
              status={isPathActive ? "active" : "normal"}
            />
            <DataPacket
              start={start}
              end={end}
              type={stage.packetType}
              speed={0.4}
              offset={idx * 0.15}
            />
          </React.Fragment>
        );
      })}
    </group>
  );
}

export function ResolveIQArchitectureScene() {
  const tier = usePerformanceTier();
  const { activeArchitectureStage, setActiveArchitectureStage, nextArchitectureStage, prevArchitectureStage } =
    useSimulationStore();

  const stages = resolveiqData.architectureStages;
  const currentStage = stages[activeArchitectureStage - 1] || stages[0];

  if (tier === "no-webgl" || tier === "low") {
    return <ResolveIQFallbackDiagram />;
  }

  return (
    <div className="relative w-full rounded-2xl bg-[#0D1117] border border-white/10 overflow-hidden shadow-2xl">
      {/* Top HUD Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-b from-[#0A0E14]/90 via-[#0A0E14]/60 to-transparent flex flex-wrap items-center justify-between gap-4 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-white block">
              13-STAGE ARCHITECTURE VISUALIZATION
            </span>
            <span className="text-[11px] font-mono text-cyan-400">
              STAGE {currentStage.step} OF 13: {currentStage.name.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Step-Through Exploration Controls (PRD Section 20) */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <Button
            size="sm"
            variant="secondary"
            onClick={prevArchitectureStage}
            aria-label="Previous architecture stage"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-mono">Prev</span>
          </Button>

          <span className="text-xs font-mono text-slate-400 px-2">
            {currentStage.step} / 13
          </span>

          <Button
            size="sm"
            variant="primary"
            onClick={nextArchitectureStage}
            aria-label="Next architecture stage"
          >
            <span className="hidden sm:inline font-mono">Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 3D Canvas Canvas Height */}
      <div className="w-full h-[520px] sm:h-[600px]">
        <SceneCanvasWrapper cameraPosition={[0, 0, 7]}>
          <ArchitectureSceneContent />
        </SceneCanvasWrapper>
      </div>

      {/* Bottom Floating Glass Card for Active Stage (PRD Section 20) */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-20 pointer-events-none">
        <GlassPanel
          variant="cyan"
          glow={false}
          className="p-4 sm:p-5 pointer-events-auto bg-[#0D1117]/90 backdrop-blur-xl border border-cyan-500/30"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 uppercase">
                  {currentStage.category}
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {currentStage.step}. {currentStage.name}
                </span>
                <span className="text-[11px] font-mono text-slate-500 hidden md:inline">
                  (Telemetry: {currentStage.packetType})
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {currentStage.detailedDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 shrink-0">
              {currentStage.technicalDetails.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
