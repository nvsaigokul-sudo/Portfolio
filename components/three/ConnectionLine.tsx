"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSimulationStore } from "@/lib/state/simulationStore";

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  status?: "normal" | "warning" | "active" | "severed";
  colorOverride?: string;
}

export function ConnectionLine({
  start,
  end,
  status = "normal",
  colorOverride,
}: ConnectionLineProps) {
  const lineRef = useRef<THREE.Line>(null);
  const { prefersReducedMotion } = useSimulationStore();

  const statusColors = {
    normal: "#3DDBFF",
    warning: "#F59E0B",
    active: "#00C2FF",
    severed: "#EF4444",
  };

  const color = colorOverride || statusColors[status];

  const points = useMemo(() => {
    const vStart = new THREE.Vector3(...start);
    const vEnd = new THREE.Vector3(...end);
    // Add subtle arc
    const mid = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);
    mid.y += 0.4;
    const curve = new THREE.QuadraticBezierCurve3(vStart, mid, vEnd);
    return curve.getPoints(20);
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  useFrame((state) => {
    if (prefersReducedMotion || !lineRef.current) return;
    const material = lineRef.current.material as THREE.LineBasicMaterial;
    if (status === "warning") {
      material.opacity = 0.5 + Math.sin(state.clock.getElapsedTime() * 6) * 0.4;
    } else if (status === "severed") {
      material.opacity = 0.15;
    } else {
      material.opacity = 0.4 + Math.sin(state.clock.getElapsedTime() * 2) * 0.15;
    }
  });

  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: status === "severed" ? 0.15 : 0.45,
      blending: THREE.AdditiveBlending,
    }))} ref={lineRef} />
  );
}
