"use client";

import { useEffect } from "react";
import { useSimulationStore } from "@/lib/state/simulationStore";

export function useReducedMotion() {
  const { prefersReducedMotion, setPrefersReducedMotion } = useSimulationStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [setPrefersReducedMotion]);

  return prefersReducedMotion;
}
