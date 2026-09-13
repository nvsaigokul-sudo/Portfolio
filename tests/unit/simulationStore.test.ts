import { describe, it, expect, beforeEach } from "vitest";
import { useSimulationStore } from "@/lib/state/simulationStore";

describe("Simulation Store State Machine (PRD Sections 20-24, 26)", () => {
  beforeEach(() => {
    useSimulationStore.getState().resetSimulation();
    useSimulationStore.getState().resetThreatSimulation();
    useSimulationStore.getState().setActiveArchitectureStage(1);
  });

  it("handles ResolveIQ simulation lifecycle transitions correctly", () => {
    const store = useSimulationStore.getState();
    expect(store.isSimulating).toBe(false);
    expect(store.currentSimulationStep).toBe(1);

    // Start simulation
    store.startSimulation();
    expect(useSimulationStore.getState().isSimulating).toBe(true);
    expect(useSimulationStore.getState().currentSimulationStep).toBe(1);

    // Step progression
    useSimulationStore.getState().setSimulationStep(5);
    expect(useSimulationStore.getState().currentSimulationStep).toBe(5);

    // Fast-forward to end
    useSimulationStore.getState().skipSimulationToEnd();
    expect(useSimulationStore.getState().currentSimulationStep).toBe(13);
    expect(useSimulationStore.getState().isSimulationCompleted).toBe(true);

    // Reset
    useSimulationStore.getState().resetSimulation();
    expect(useSimulationStore.getState().isSimulating).toBe(false);
    expect(useSimulationStore.getState().currentSimulationStep).toBe(1);
  });

  it("triggers and clears Insufficient Evidence safety state independently", () => {
    const store = useSimulationStore.getState();
    expect(store.isInsufficientEvidence).toBe(false);

    store.triggerInsufficientEvidence();
    expect(useSimulationStore.getState().isInsufficientEvidence).toBe(true);
    expect(useSimulationStore.getState().isSimulating).toBe(false);

    store.clearInsufficientEvidence();
    expect(useSimulationStore.getState().isInsufficientEvidence).toBe(false);
  });

  it("controls architecture stage stepping (1 to 13)", () => {
    const store = useSimulationStore.getState();
    expect(store.activeArchitectureStage).toBe(1);

    store.nextArchitectureStage();
    expect(useSimulationStore.getState().activeArchitectureStage).toBe(2);

    store.setActiveArchitectureStage(13);
    expect(useSimulationStore.getState().activeArchitectureStage).toBe(13);

    // Wrap around or clamp
    store.nextArchitectureStage();
    expect(useSimulationStore.getState().activeArchitectureStage).toBe(1);
  });

  it("manages Cyber Sentinel threat simulations", () => {
    const store = useSimulationStore.getState();
    expect(store.activeThreat).toBe("none");
    expect(store.isThreatSimulating).toBe(false);

    store.startThreatSimulation("api_flood");
    expect(useSimulationStore.getState().activeThreat).toBe("api_flood");
    expect(useSimulationStore.getState().isThreatSimulating).toBe(true);
    expect(useSimulationStore.getState().threatStep).toBe(1);

    store.setThreatStep(5);
    expect(useSimulationStore.getState().threatStep).toBe(5);

    store.resetThreatSimulation();
    expect(useSimulationStore.getState().activeThreat).toBe("none");
    expect(useSimulationStore.getState().isThreatSimulating).toBe(false);
  });
});
