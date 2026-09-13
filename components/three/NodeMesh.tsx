"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useSimulationStore } from "@/lib/state/simulationStore";

interface NodeMeshProps {
  id: string;
  position: [number, number, number];
  label: string;
  category?: string;
  status?: "normal" | "warning" | "verified" | "danger";
  isSelected?: boolean;
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  size?: number;
}

export function NodeMesh({
  id,
  position,
  label,
  category,
  status = "normal",
  isSelected = false,
  onClick,
  onPointerOver,
  onPointerOut,
  size = 0.5,
}: NodeMeshProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { prefersReducedMotion } = useSimulationStore();

  const statusColors = {
    normal: "#3DDBFF",
    warning: "#F59E0B",
    verified: "#10B981",
    danger: "#EF4444",
  };

  const nodeColor = statusColors[status];

  useFrame((state) => {
    if (prefersReducedMotion || !meshRef.current) return;
    // Gentle hovering / breathing animation
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.08;
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onPointerOver?.();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onPointerOut?.();
      }}
    >
      {/* Central Core Sphere */}
      <mesh>
        <sphereGeometry args={[size * 0.7, 16, 16]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={hovered || isSelected ? 2.5 : 1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Wireframe Octahedron */}
      <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <octahedronGeometry args={[size * 1.3, 0]} />
        <meshBasicMaterial
          color={nodeColor}
          wireframe
          transparent
          opacity={hovered || isSelected ? 0.9 : 0.35}
        />
      </mesh>

      {/* Outer Pulse Ring if selected or warning */}
      {(isSelected || status === "warning") && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 1.6, 24]} />
          <meshBasicMaterial
            color={nodeColor}
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* DOM-in-3D Label via Drei Html */}
      <Html
        position={[0, -size * 1.8, 0]}
        center
        distanceFactor={15}
        className="pointer-events-none select-none"
      >
        <div
          className={`px-2 py-0.5 rounded text-[11px] font-mono tracking-wider whitespace-nowrap transition-all duration-200 border ${
            hovered || isSelected
              ? "bg-black/90 text-white border-cyan-400 shadow-[0_0_12px_rgba(61,219,255,0.4)]"
              : status === "warning"
              ? "bg-amber-950/80 text-amber-300 border-amber-500/50"
              : status === "verified"
              ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/50"
              : status === "danger"
              ? "bg-red-950/80 text-red-300 border-red-500/50"
              : "bg-black/70 text-slate-300 border-white/10"
          }`}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}
