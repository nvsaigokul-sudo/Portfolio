import React from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SectionProgressRail, type NavRailItem } from "@/components/navigation/SectionProgressRail";
import { CyberSentinelOverview } from "@/components/cyber-sentinel/CyberSentinelOverview";
import { CyberSentinelFallbackDiagram } from "@/components/cyber-sentinel/CyberSentinelFallbackDiagram";
import { ThreatSimulationControls } from "@/components/cyber-sentinel/ThreatSimulationControls";
import { ThreatLaneVisualization } from "@/components/cyber-sentinel/ThreatLaneVisualization";
import { CyberSentinelStack } from "@/components/cyber-sentinel/CyberSentinelStack";
import { CyberSentinelDecisions } from "@/components/cyber-sentinel/CyberSentinelDecisions";

const CyberSentinelArchitectureScene = dynamic(
  () =>
    import("@/components/cyber-sentinel/CyberSentinelArchitectureScene").then(
      (mod) => mod.CyberSentinelArchitectureScene
    ),
  {
    ssr: false,
    loading: () => <CyberSentinelFallbackDiagram />,
  }
);

export const metadata: Metadata = {
  title: "Cyber Sentinel — Secure Real-Time Communication Platform | N V Sai Gokul",
  description:
    "Explore Cyber Sentinel: A secure real-time messaging architecture combining Spring Boot, Redis Pub/Sub, STOMP WebSockets, K-Means anomaly detection, and Google Gemini AI threat analysis.",
  keywords: [
    "Cyber Sentinel",
    "Real-Time Messaging",
    "Spring Boot",
    "WebSocket",
    "STOMP",
    "Redis Pub/Sub",
    "K-Means Clustering",
    "Gemini AI",
    "Threat Detection",
    "Cybersecurity",
  ],
};

const navRailItems: NavRailItem[] = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "simulation", label: "Threat Sim" },
  { id: "stack", label: "Tech Stack" },
  { id: "decisions", label: "Decisions" },
];

export default function CyberSentinelPage() {
  return (
    <div className="relative min-h-screen">
      {/* In-Project Navigation Rail */}
      <SectionProgressRail items={navRailItems} backLink="/#work" backText="Back to Portfolio" />

      {/* Main Narrative Container */}
      <div className="xl:pl-56">
        <CyberSentinelOverview />

        {/* Section 2: Dual-Lane Architecture Scene */}
        <section id="architecture" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="text-xs font-mono text-red-400 uppercase tracking-wider mb-1">
              // DUAL-LANE TOPOLOGY
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans">
              Messaging & Threat Mitigation Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl font-sans">
              Parallel inspection isolating legitimate WebSocket/STOMP traffic from edge threats before backend message propagation.
            </p>
          </div>

          <CyberSentinelArchitectureScene />
        </section>

        {/* Section 3: Live Threat Simulation & K-Means/Gemini Visualization */}
        <section id="simulation" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="mb-6">
            <div className="text-xs font-mono text-red-400 uppercase tracking-wider mb-1">
              // ATTACK SIMULATION HUD
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans">
              Simulated Threat Ingress & Edge Interception
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl font-sans">
              Trigger high-frequency API floods, brute-force dictionary attacks, volumetric spikes, or protocol fuzzing to inspect automated mitigation.
            </p>
          </div>

          <ThreatSimulationControls />
          <ThreatLaneVisualization />
        </section>

        {/* Section 4: Technology Stack */}
        <CyberSentinelStack />

        {/* Section 5: Engineering Decisions */}
        <CyberSentinelDecisions />
      </div>
    </div>
  );
}
