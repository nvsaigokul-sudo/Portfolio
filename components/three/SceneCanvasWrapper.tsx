"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { usePerformanceTier } from "@/lib/hooks/usePerformanceTier";
import { useSimulationStore } from "@/lib/state/simulationStore";

interface SceneCanvasWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  cameraPosition?: [number, number, number];
  className?: string;
  enableControls?: boolean;
}

export function SceneCanvasWrapper({
  children,
  fallback,
  cameraPosition = [0, 0, 10],
  className = "w-full h-full",
}: SceneCanvasWrapperProps) {
  const tier = usePerformanceTier();
  const { prefersReducedMotion } = useSimulationStore();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className={`relative ${className} bg-[#0A0E14]`} />;
  }

  // If WebGL is not supported, render fallback component per PRD Section 35 & 37
  if (tier === "no-webgl" && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        dpr={tier === "high" ? [1, 1.8] : [1, 1.2]}
        gl={{
          antialias: tier !== "low",
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
