import { create } from "zustand";

export type PerformanceTier = "high" | "standard" | "low" | "no-webgl";
export type ThreatType = "none" | "api_flood" | "brute_force" | "traffic_spike" | "suspicious_activity";

export interface SimulationState {
  // Performance & Accessibility
  performanceTier: PerformanceTier;
  setPerformanceTier: (tier: PerformanceTier) => void;
  prefersReducedMotion: boolean;
  setPrefersReducedMotion: (reduced: boolean) => void;

  // ResolveIQ Architecture Explorer
  activeArchitectureStage: number; // 1 to 13
  setActiveArchitectureStage: (stage: number) => void;
  nextArchitectureStage: () => void;
  prevArchitectureStage: () => void;
  isExploreMode: boolean;
  setIsExploreMode: (active: boolean) => void;

  // ResolveIQ Incident Simulation
  isSimulating: boolean;
  currentSimulationStep: number; // 1 to 13
  isSimulationPaused: boolean;
  isSimulationCompleted: boolean;
  isInsufficientEvidence: boolean;
  startSimulation: () => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  resetSimulation: () => void;
  skipSimulationToEnd: () => void;
  setSimulationStep: (step: number) => void;
  triggerInsufficientEvidence: () => void;
  clearInsufficientEvidence: () => void;

  // Cyber Sentinel Threat Simulation
  activeThreat: ThreatType;
  threatStep: number; // 1: Entrance, 2: Gateway Intercept, 3: K-Means Cluster, 4: Gemini AI Pulse, 5: Mitigation Severed
  isThreatSimulating: boolean;
  startThreatSimulation: (threat: ThreatType) => void;
  setThreatStep: (step: number) => void;
  resetThreatSimulation: () => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  performanceTier: "high",
  setPerformanceTier: (tier) => set({ performanceTier: tier }),
  prefersReducedMotion: false,
  setPrefersReducedMotion: (reduced) => set({ prefersReducedMotion: reduced }),

  // Architecture Stage (1 to 13)
  activeArchitectureStage: 1,
  setActiveArchitectureStage: (stage) => set({ activeArchitectureStage: Math.max(1, Math.min(13, stage)) }),
  nextArchitectureStage: () =>
    set((state) => ({
      activeArchitectureStage: state.activeArchitectureStage < 13 ? state.activeArchitectureStage + 1 : 1,
    })),
  prevArchitectureStage: () =>
    set((state) => ({
      activeArchitectureStage: state.activeArchitectureStage > 1 ? state.activeArchitectureStage - 1 : 13,
    })),
  isExploreMode: false,
  setIsExploreMode: (active) => set({ isExploreMode: active }),

  // ResolveIQ Incident Simulation
  isSimulating: false,
  currentSimulationStep: 1,
  isSimulationPaused: false,
  isSimulationCompleted: false,
  isInsufficientEvidence: false,

  startSimulation: () =>
    set({
      isSimulating: true,
      currentSimulationStep: 1,
      isSimulationPaused: false,
      isSimulationCompleted: false,
      isInsufficientEvidence: false,
    }),
  pauseSimulation: () => set({ isSimulationPaused: true }),
  resumeSimulation: () => set({ isSimulationPaused: false }),
  resetSimulation: () =>
    set({
      isSimulating: false,
      currentSimulationStep: 1,
      isSimulationPaused: false,
      isSimulationCompleted: false,
      isInsufficientEvidence: false,
    }),
  skipSimulationToEnd: () =>
    set({
      isSimulating: true,
      currentSimulationStep: 13,
      isSimulationPaused: false,
      isSimulationCompleted: true,
      isInsufficientEvidence: false,
    }),
  setSimulationStep: (step) =>
    set({
      currentSimulationStep: Math.max(1, Math.min(13, step)),
      isSimulationCompleted: step >= 13,
    }),
  triggerInsufficientEvidence: () =>
    set({
      isSimulating: false,
      isInsufficientEvidence: true,
      isSimulationCompleted: false,
    }),
  clearInsufficientEvidence: () => set({ isInsufficientEvidence: false }),

  // Cyber Sentinel Threat Simulation
  activeThreat: "none",
  threatStep: 1,
  isThreatSimulating: false,
  startThreatSimulation: (threat) =>
    set({
      activeThreat: threat,
      threatStep: 1,
      isThreatSimulating: true,
    }),
  setThreatStep: (step) => set({ threatStep: step }),
  resetThreatSimulation: () =>
    set({
      activeThreat: "none",
      threatStep: 1,
      isThreatSimulating: false,
    }),
}));
