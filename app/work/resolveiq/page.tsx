import React from "react";
import type { Metadata } from "next";
import { SectionProgressRail, type NavRailItem } from "@/components/navigation/SectionProgressRail";
import { ResolveIQOverview } from "@/components/resolveiq/ResolveIQOverview";
import { ResolveIQArchitectureScene } from "@/components/resolveiq/ResolveIQArchitectureScene";
import { IncidentSimulationControls } from "@/components/resolveiq/IncidentSimulationControls";
import { IncidentSimulationScene } from "@/components/resolveiq/IncidentSimulationScene";
import { InsufficientEvidenceState } from "@/components/resolveiq/InsufficientEvidenceState";
import { RAGVisualization } from "@/components/resolveiq/RAGVisualization";
import { RCAPanel } from "@/components/resolveiq/RCAPanel";
import { ResolveIQStack } from "@/components/resolveiq/ResolveIQStack";
import { ResolveIQDecisions } from "@/components/resolveiq/ResolveIQDecisions";
import { ResolveIQSecurity } from "@/components/resolveiq/ResolveIQSecurity";
import { ResolveIQTesting } from "@/components/resolveiq/ResolveIQTesting";

export const metadata: Metadata = {
  title: "ResolveIQ — Incident Intelligence Platform | N V Sai Gokul",
  description:
    "Explore ResolveIQ: An autonomous incident intelligence platform combining OpenTelemetry, Apache Kafka, deterministic graph correlation, Spring AI investigation agents, and hybrid pgvector+BM25 RAG.",
  keywords: [
    "ResolveIQ",
    "Incident Intelligence",
    "OpenTelemetry",
    "Apache Kafka",
    "Spring AI",
    "RAG",
    "pgvector",
    "Root Cause Analysis",
    "SRE",
  ],
};

const navRailItems: NavRailItem[] = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "simulation", label: "Incident Sim" },
  { id: "rag", label: "Hybrid RAG" },
  { id: "rca", label: "RCA Output" },
  { id: "stack", label: "Tech Stack" },
  { id: "decisions", label: "Decisions" },
  { id: "security", label: "Security" },
  { id: "testing", label: "Testing" },
];

export default function ResolveIQPage() {
  return (
    <div className="relative min-h-screen">
      {/* In-Project Sticky Sub-Nav / Progress Rail (PRD Section 11) */}
      <SectionProgressRail items={navRailItems} backLink="/#work" backText="Back to Portfolio" />

      {/* Main Narrative Container */}
      <div className="xl:pl-56">
        <ResolveIQOverview />

        {/* Section 2: 13-Stage Architecture (3D Scene + Standalone Explore Mode) */}
        <section id="architecture" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              // 3D SYSTEM ARCHITECTURE
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans">
              13-Stage Incident Intelligence Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl font-sans">
              From application telemetry ingestion through deterministic correlation, autonomous Spring AI agent tools, to human engineer sign-off.
            </p>
          </div>
          <ResolveIQArchitectureScene />
        </section>

        {/* Section 3: Interactive Incident Simulation & Insufficient Evidence Safety State */}
        <section id="simulation" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="mb-6">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
              // LIVE INCIDENT SIMULATION
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans">
              Simulated Incident Lifecycle & Safety Verification
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl font-sans">
              Test how ResolveIQ responds to a simulated database connection starvation incident, or trigger the deliberate Insufficient Evidence safety state.
            </p>
          </div>

          <IncidentSimulationControls />
          <InsufficientEvidenceState />
          <IncidentSimulationScene />
        </section>

        {/* Section 4: Dual-Path Hybrid RAG Visualization */}
        <RAGVisualization />

        {/* Section 5: Evidence-Backed RCA Glass Panel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RCAPanel />
        </div>

        {/* Section 6: Categorized Technology Stack */}
        <ResolveIQStack />

        {/* Section 7: Key Engineering Decisions & Rationale */}
        <ResolveIQDecisions />

        {/* Section 8: Security Architecture */}
        <ResolveIQSecurity />

        {/* Section 9: Comprehensive Testing Strategy */}
        <ResolveIQTesting />
      </div>
    </div>
  );
}
