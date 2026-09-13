"use client";

import { useEffect } from "react";
import { useSimulationStore, type PerformanceTier } from "@/lib/state/simulationStore";

export function usePerformanceTier() {
  const { performanceTier, setPerformanceTier } = useSimulationStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if WebGL is supported
    let webglSupported = false;
    try {
      const canvas = document.createElement("canvas");
      webglSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      webglSupported = false;
    }

    if (!webglSupported) {
      setPerformanceTier("no-webgl");
      return;
    }

    const width = window.innerWidth;
    const concurrency = navigator.hardwareConcurrency || 4;

    // Mobile viewport threshold (< 768px) per PRD Section 34 & 37
    if (width < 768) {
      setPerformanceTier("low");
    } else if (width < 1280 || concurrency < 6) {
      setPerformanceTier("standard");
    } else {
      setPerformanceTier("high");
    }
  }, [setPerformanceTier]);

  return performanceTier;
}
