"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvasWrapper } from "@/components/three/SceneCanvasWrapper";
import { NodeMesh } from "@/components/three/NodeMesh";
import { ConnectionLine } from "@/components/three/ConnectionLine";
import { DataPacket } from "@/components/three/DataPacket";
import { ParticleField } from "@/components/three/ParticleField";
import { CyberSentinelFallbackDiagram } from "@/components/cyber-sentinel/CyberSentinelFallbackDiagram";
import { cyberSentinelData } from "@/lib/content/projects/cyberSentinel";
import { useSimulationStore } from "@/lib/state/simulationStore";
import { usePerformanceTier } from "@/lib/hooks/usePerformanceTier";

// Positions for Lane 1 (Authorized Messaging - Top)
const messagingLanePositions: [number, number, number][] = [
  [-4.5, 1.2, 0], // Users
  [-2.2, 1.2, 0], // WebSocket
  [0.0, 1.2, 0.4], // Gateway
  [2.2, 1.2, 0], // Redis
  [4.5, 1.2, 0], // Messaging
];

// Positions for Lane 2 (Threat Inspection & ML - Bottom)
const threatLanePositions: [number, number, number][] = [
  [-4.5, -1.4, 0], // Ingress Threat
  [-2.2, -1.4, 0], // Detection
  [0.0, -1.4, -0.4], // K-Means Clustering
  [2.2, -1.4, 0], // Gemini AI
  [4.5, -1.4, 0], // Mitigation Severed
];

function CyberSentinelSceneContent() {
  const { activeThreat, threatStep, isThreatSimulating, prefersReducedMotion } =
    useSimulationStore();
  const sceneRef = useRef<THREE.Group>(null);

  const isMitigated = threatStep >= 5;

  useFrame((state) => {
    if (prefersReducedMotion || !sceneRef.current) return;
    const t = state.clock.getElapsedTime();
    sceneRef.current.rotation.y = Math.sin(t * 0.2) * 0.08;
  });

  return (
    <group ref={sceneRef}>
      <ParticleField color="#EF4444" countOverride={250} />

      {/* LANE 1: Messaging Lane Nodes (Cyan) */}
      {cyberSentinelData.messagingLane.stages.map((stage, idx) => (
        <NodeMesh
          key={`msg-node-${stage.id}`}
          id={stage.id}
          position={messagingLanePositions[idx]}
          label={stage.name}
          status="normal"
          size={0.4}
        />
      ))}

      {/* LANE 1: Connections & Calm Packets */}
      {messagingLanePositions.slice(0, -1).map((pos, idx) => (
        <React.Fragment key={`msg-conn-${idx}`}>
          <ConnectionLine
            start={pos}
            end={messagingLanePositions[idx + 1]}
            status="normal"
            colorOverride="#3DDBFF"
          />
          <DataPacket
            start={pos}
            end={messagingLanePositions[idx + 1]}
            type="logs"
            speed={0.4}
            offset={idx * 0.2}
          />
        </React.Fragment>
      ))}

      {/* LANE 2: Threat Lane Nodes (Red/Crimson) */}
      {threatLanePositions.map((pos, idx) => {
        const isStepActive = isThreatSimulating && threatStep >= idx + 1;
        const labels = [
          activeThreat !== "none" ? activeThreat.toUpperCase() : "THREAT INGRESS",
          "Detection Engine",
          "K-Means ML Outlier",
          "Gemini AI Reasoning",
          isMitigated ? "SEVERED & BLOCKED" : "Mitigation Filter",
        ];

        return (
          <NodeMesh
            key={`threat-node-${idx}`}
            id={`threat-${idx}`}
            position={pos}
            label={labels[idx]}
            status={isMitigated && idx === 4 ? "verified" : isStepActive ? "danger" : "normal"}
            isSelected={isStepActive}
            size={0.42}
          />
        );
      })}

      {/* LANE 2: Threat Connections & Spiky Threat Packets */}
      {threatLanePositions.slice(0, -1).map((pos, idx) => {
        const isSevered = isMitigated && idx >= 3;
        const isStepActive = isThreatSimulating && threatStep >= idx + 1;

        return (
          <React.Fragment key={`threat-conn-${idx}`}>
            <ConnectionLine
              start={pos}
              end={threatLanePositions[idx + 1]}
              status={isSevered ? "severed" : isStepActive ? "warning" : "normal"}
              colorOverride={isSevered ? "#64748B" : "#EF4444"}
            />
            {isThreatSimulating && !isSevered && (
              <DataPacket
                start={pos}
                end={threatLanePositions[idx + 1]}
                type="threat"
                speed={0.7}
                offset={idx * 0.25}
              />
            )}
          </React.Fragment>
        );
      })}

      {/* Cross-Link from Gateway (Lane 1) to Threat Detection (Lane 2) */}
      <ConnectionLine
        start={messagingLanePositions[2]}
        end={threatLanePositions[1]}
        status={isThreatSimulating ? "warning" : "normal"}
        colorOverride={isThreatSimulating ? "#EF4444" : "#334155"}
      />
    </group>
  );
}

export function CyberSentinelArchitectureScene() {
  const tier = usePerformanceTier();

  if (tier === "no-webgl" || tier === "low") {
    return <CyberSentinelFallbackDiagram />;
  }

  return (
    <div className="relative w-full rounded-2xl bg-[#0D1117] border border-red-500/30 overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-b from-[#0A0E14]/90 to-transparent flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="font-mono text-xs font-bold text-white tracking-wider">
            DUAL-LANE 3D SECURITY TOPOLOGY // REAL-TIME INSPECTION
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono">
          <span className="text-cyan-300">● Top: Clean Messaging Lane</span>
          <span className="text-red-400">● Bottom: Threat Mitigation Lane</span>
        </div>
      </div>

      <div className="w-full h-[520px] sm:h-[580px]">
        <SceneCanvasWrapper cameraPosition={[0, 0, 7.5]}>
          <CyberSentinelSceneContent />
        </SceneCanvasWrapper>
      </div>
    </div>
  );
}
