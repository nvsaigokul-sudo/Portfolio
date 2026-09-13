"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneCanvasWrapper } from "@/components/three/SceneCanvasWrapper";
import { NodeMesh } from "@/components/three/NodeMesh";
import { ConnectionLine } from "@/components/three/ConnectionLine";
import { DataPacket } from "@/components/three/DataPacket";
import { ParticleField } from "@/components/three/ParticleField";
import { usePointerPosition } from "@/lib/hooks/usePointerPosition";
import { useSimulationStore } from "@/lib/state/simulationStore";

// Distributed system topology nodes per PRD Section 17
const heroNodes = [
  { id: "api-gateway", name: "API Gateway", pos: [-3.5, 1.2, 0] as [number, number, number], type: "normal" as const },
  { id: "auth-security", name: "Security / OAuth2", pos: [-2.0, 2.5, -1] as [number, number, number], type: "normal" as const },
  { id: "core-service", name: "Spring Microservices", pos: [-0.5, 0.4, 1] as [number, number, number], type: "normal" as const },
  { id: "kafka-stream", name: "Event Stream / Kafka", pos: [1.8, 1.8, -0.5] as [number, number, number], type: "normal" as const },
  { id: "ai-agent", name: "Spring AI Agent", pos: [3.4, 0.2, 0.8] as [number, number, number], type: "normal" as const },
  { id: "pgvector-db", name: "PostgreSQL + pgvector", pos: [2.2, -1.8, -0.8] as [number, number, number], type: "normal" as const },
  { id: "telemetry", name: "OpenTelemetry Ingestion", pos: [-1.2, -2.0, 0] as [number, number, number], type: "normal" as const },
];

const heroConnections = [
  { start: heroNodes[0].pos, end: heroNodes[1].pos, packetType: "config" as const },
  { start: heroNodes[0].pos, end: heroNodes[2].pos, packetType: "traces" as const },
  { start: heroNodes[1].pos, end: heroNodes[2].pos, packetType: "config" as const },
  { start: heroNodes[2].pos, end: heroNodes[3].pos, packetType: "logs" as const },
  { start: heroNodes[3].pos, end: heroNodes[4].pos, packetType: "traces" as const },
  { start: heroNodes[4].pos, end: heroNodes[5].pos, packetType: "metrics" as const },
  { start: heroNodes[2].pos, end: heroNodes[6].pos, packetType: "metrics" as const },
  { start: heroNodes[6].pos, end: heroNodes[3].pos, packetType: "logs" as const },
  { start: heroNodes[5].pos, end: heroNodes[2].pos, packetType: "deployment" as const },
];

function HeroTopology() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = usePointerPosition();
  const { prefersReducedMotion } = useSimulationStore();

  useFrame(() => {
    if (prefersReducedMotion || !groupRef.current) return;
    // Bounded cursor-reactive parallax tilt per PRD Section 17 & 42
    const targetRotX = -pointer.y * 0.15;
    const targetRotY = pointer.x * 0.2;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
  });

  return (
    <group ref={groupRef}>
      <ParticleField color="#3DDBFF" />

      {/* Nodes */}
      {heroNodes.map((node) => (
        <NodeMesh
          key={node.id}
          id={node.id}
          position={node.pos}
          label={node.name}
          status={node.type}
          size={0.45}
        />
      ))}

      {/* Connecting Edges */}
      {heroConnections.map((conn, idx) => (
        <ConnectionLine
          key={`hero-conn-${idx}`}
          start={conn.start}
          end={conn.end}
        />
      ))}

      {/* Animated Traveling Data Packets */}
      {heroConnections.map((conn, idx) => (
        <DataPacket
          key={`hero-packet-${idx}`}
          start={conn.start}
          end={conn.end}
          type={conn.packetType}
          speed={0.35 + (idx % 3) * 0.15}
          offset={idx * 0.22}
        />
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <SceneCanvasWrapper cameraPosition={[0, 0, 8.5]}>
      <HeroTopology />
    </SceneCanvasWrapper>
  );
}
