import React from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { resolveiqData } from "@/lib/content/projects/resolveiq";
import { cyberSentinelData } from "@/lib/content/projects/cyberSentinel";

export function FeaturedWorkIndex() {
  return (
    <section
      id="work"
      aria-label="Featured Engineering Projects"
      className="relative py-24 sm:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="02"
          tag="FEATURED WORK"
          title="Production Systems & Deep Dives"
          subtitle="Explore interactive 3D architectures, deterministic anomaly detection, and simulated incident pipelines."
        />

        <div className="space-y-12">
          {/* ResolveIQ — Primary Centerpiece (PRD Section 19) */}
          <ProjectCard
            id={resolveiqData.id}
            title={resolveiqData.title}
            subtitle={resolveiqData.subtitle}
            tagline={resolveiqData.tagline}
            status={resolveiqData.status}
            href="/work/resolveiq"
            isPrimary={true}
            accentColor="cyan"
            highlights={[
              "Deterministic Detection & Correlation Engine preceding AI evaluation",
              "Spring AI Investigation Agent operating with sandboxed read-only tools",
              "Hybrid RAG combining pgvector cosine similarity with BM25 keyword precision",
            ]}
            techStack={[
              "Java",
              "Spring Boot",
              "Apache Kafka",
              "OpenTelemetry",
              "Spring AI",
              "pgvector",
              "PostgreSQL",
              "Docker",
            ]}
          />

          {/* Cyber Sentinel — Secondary Project (PRD Section 25) */}
          <ProjectCard
            id={cyberSentinelData.id}
            title={cyberSentinelData.title}
            subtitle={cyberSentinelData.subtitle}
            tagline={cyberSentinelData.tagline}
            status={cyberSentinelData.status}
            href="/work/cyber-sentinel"
            isPrimary={false}
            accentColor="red"
            highlights={[
              "Dual-layer threat detection: K-Means clustering pre-filter + Gemini AI reasoning",
              "Full-duplex WebSocket / STOMP messaging with Spring Cloud Gateway perimeter",
              "Redis Pub/Sub broadcasting with automatic TTL cleanup for ephemeral chat rooms",
            ]}
            techStack={[
              "Java",
              "Spring Boot",
              "Spring Cloud Gateway",
              "Redis Pub/Sub",
              "WebSocket / STOMP",
              "Google Gemini AI",
              "Weka ML",
              "Docker",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
