"use client";

import { useEffect, useRef } from "react";
import { useSimulationStore } from "@/lib/state/simulationStore";

export function useSimulationSequence() {
  const {
    isSimulating,
    isSimulationPaused,
    currentSimulationStep,
    setSimulationStep,
    isThreatSimulating,
    threatStep,
    setThreatStep,
  } = useSimulationStore();

  const resolveiqTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cyberSentinelTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ResolveIQ 13-step Simulation Driver
  useEffect(() => {
    if (!isSimulating || isSimulationPaused) {
      if (resolveiqTimerRef.current) {
        clearTimeout(resolveiqTimerRef.current);
        resolveiqTimerRef.current = null;
      }
      return;
    }

    if (currentSimulationStep >= 13) {
      return;
    }

    resolveiqTimerRef.current = setTimeout(() => {
      setSimulationStep(currentSimulationStep + 1);
    }, 1900); // ~24.7s total sequence

    return () => {
      if (resolveiqTimerRef.current) {
        clearTimeout(resolveiqTimerRef.current);
      }
    };
  }, [isSimulating, isSimulationPaused, currentSimulationStep, setSimulationStep]);

  // Cyber Sentinel 5-step Threat Simulation Driver
  useEffect(() => {
    if (!isThreatSimulating) {
      if (cyberSentinelTimerRef.current) {
        clearTimeout(cyberSentinelTimerRef.current);
        cyberSentinelTimerRef.current = null;
      }
      return;
    }

    if (threatStep >= 5) {
      return;
    }

    cyberSentinelTimerRef.current = setTimeout(() => {
      setThreatStep(threatStep + 1);
    }, 1800);

    return () => {
      if (cyberSentinelTimerRef.current) {
        clearTimeout(cyberSentinelTimerRef.current);
      }
    };
  }, [isThreatSimulating, threatStep, setThreatStep]);
}
