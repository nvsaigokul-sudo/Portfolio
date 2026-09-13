"use client";

import React, { useEffect, useState } from "react";
import { useSimulationStore } from "@/lib/state/simulationStore";
import { resolveiqData } from "@/lib/content/projects/resolveiq";

export function LiveRegion() {
  const { isSimulating, currentSimulationStep, isInsufficientEvidence, activeThreat, threatStep } =
    useSimulationStore();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (isInsufficientEvidence) {
      setAnnouncement("Safety gate activated: Insufficient evidence state reached. RCA generation blocked to prevent hallucination.");
    } else if (isSimulating) {
      const stepData = resolveiqData.simulationSteps[currentSimulationStep - 1];
      if (stepData) {
        setAnnouncement(`Simulation step ${stepData.step} of 13: ${stepData.title}. ${stepData.description}`);
      }
    }
  }, [isSimulating, currentSimulationStep, isInsufficientEvidence]);

  useEffect(() => {
    if (activeThreat !== "none") {
      setAnnouncement(`Threat simulation triggered: ${activeThreat.replace('_', ' ')}. Step ${threatStep} of 5.`);
    }
  }, [activeThreat, threatStep]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}
