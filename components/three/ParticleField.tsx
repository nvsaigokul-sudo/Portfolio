"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSimulationStore } from "@/lib/state/simulationStore";

interface ParticleFieldProps {
  color?: string;
  countOverride?: number;
}

export function ParticleField({ color = "#3DDBFF", countOverride }: ParticleFieldProps) {
  const { performanceTier, prefersReducedMotion } = useSimulationStore();
  const meshRef = useRef<THREE.Points>(null);

  const particleCount = useMemo(() => {
    if (countOverride) return countOverride;
    if (prefersReducedMotion) return 50;
    switch (performanceTier) {
      case "high":
        return 900;
      case "standard":
        return 450;
      case "low":
        return 120;
      default:
        return 100;
    }
  }, [performanceTier, prefersReducedMotion, countOverride]);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      spd[i * 3] = (Math.random() - 0.5) * 0.005;
      spd[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, spd];
  }, [particleCount]);

  useFrame(() => {
    if (prefersReducedMotion || !meshRef.current) return;
    const geometry = meshRef.current.geometry;
    const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      array[i * 3 + 1] += speeds[i * 3 + 1];

      // Wrap around bounds
      if (array[i * 3 + 1] > 12) array[i * 3 + 1] = -12;
      if (array[i * 3 + 1] < -12) array[i * 3 + 1] = 12;
    }
    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
