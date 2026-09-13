"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSimulationStore } from "@/lib/state/simulationStore";

export type PacketType = "metrics" | "logs" | "traces" | "deployment" | "config" | "threat";

interface DataPacketProps {
  start: [number, number, number];
  end: [number, number, number];
  type?: PacketType;
  speed?: number;
  offset?: number;
}

export function DataPacket({
  start,
  end,
  type = "metrics",
  speed = 0.5,
  offset = 0,
}: DataPacketProps) {
  const packetRef = useRef<THREE.Group>(null);
  const { prefersReducedMotion } = useSimulationStore();

  const vStart = new THREE.Vector3(...start);
  const vEnd = new THREE.Vector3(...end);
  const mid = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);
  mid.y += 0.4;
  const curve = new THREE.QuadraticBezierCurve3(vStart, mid, vEnd);

  // Styling based on telemetry type (PRD Section 11 & 20)
  const packetStyles = {
    metrics: { color: "#3DDBFF", shape: "box" },
    logs: { color: "#00C2FF", shape: "cylinder" },
    traces: { color: "#5B8CFF", shape: "sphere" },
    deployment: { color: "#10B981", shape: "diamond" },
    config: { color: "#F59E0B", shape: "cylinder" },
    threat: { color: "#EF4444", shape: "box" },
  };

  const style = packetStyles[type] || packetStyles.metrics;

  useFrame((state) => {
    if (prefersReducedMotion || !packetRef.current) return;
    const t = ((state.clock.getElapsedTime() * speed + offset) % 1);
    const pos = curve.getPoint(t);
    packetRef.current.position.copy(pos);
    packetRef.current.rotation.x += 0.05;
    packetRef.current.rotation.y += 0.05;
  });

  return (
    <group ref={packetRef}>
      {style.shape === "box" && (
        <mesh>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshBasicMaterial color={style.color} />
        </mesh>
      )}

      {style.shape === "sphere" && (
        <mesh>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshBasicMaterial color={style.color} />
        </mesh>
      )}

      {style.shape === "diamond" && (
        <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshBasicMaterial color={style.color} />
        </mesh>
      )}

      {style.shape === "cylinder" && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.22, 8]} />
          <meshBasicMaterial color={style.color} />
        </mesh>
      )}
    </group>
  );
}
