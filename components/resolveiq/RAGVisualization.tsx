"use client";

import React, { useState } from "react";
import { Search, Database, Sparkles, BookOpen, GitMerge, FileText, CheckCircle2 } from "lucide-react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { resolveiqData } from "@/lib/content/projects/resolveiq";
import { cn } from "@/lib/utils/cn";

export function RAGVisualization() {
  const [activeEngine, setActiveEngine] = useState<"hybrid" | "vector" | "bm25">("hybrid");
  const rag = resolveiqData.ragPipeline;

  return (
    <section id="rag" className="py-16 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="cyan" size="sm">
                RAG RETRIEVAL ENGINE
              </Badge>
              <span className="text-xs font-mono text-slate-400">
                // DUAL-PATH HYBRID SEARCH
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans">
              {rag.title}
            </h2>
          </div>

          {/* Engine Filter Toggles */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-black/60 border border-white/10">
            <button
              onClick={() => setActiveEngine("hybrid")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono transition-all",
                activeEngine === "hybrid"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Hybrid (pgvector + BM25)
            </button>
            <button
              onClick={() => setActiveEngine("vector")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono transition-all",
                activeEngine === "vector"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-400/40"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Vector Only
            </button>
            <button
              onClick={() => setActiveEngine("bm25")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono transition-all",
                activeEngine === "bm25"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                  : "text-slate-400 hover:text-white"
              )}
            >
              BM25 Keyword Only
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-3xl mb-10">
          {rag.summary}
        </p>

        {/* Dual Branch Interactive Visualization (PRD Section 22) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Query Source Node */}
          <div className="lg:col-span-3">
            <div className="p-5 rounded-xl bg-black/60 border border-cyan-500/40 text-center">
              <div className="text-[10px] font-mono text-cyan-400 uppercase mb-1">
                Incident Query
              </div>
              <div className="font-mono text-xs font-bold text-white mb-2">
                &quot;HikariPool connection timeout SQLTransientConnectionException&quot;
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Correlated Telemetry Signature
              </span>
            </div>
          </div>

          {/* Parallel Branch Splitting & Convergence */}
          <div className="lg:col-span-6 space-y-4">
            {/* Vector Branch */}
            <div
              className={cn(
                "p-4 rounded-xl border transition-all duration-300",
                activeEngine === "vector" || activeEngine === "hybrid"
                  ? "bg-blue-950/20 border-blue-500/40 shadow-[0_0_15px_rgba(91,140,255,0.15)]"
                  : "opacity-40 bg-black/30 border-white/5"
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-blue-300 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  {rag.vectorBranch.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {rag.vectorBranch.engine}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                {rag.vectorBranch.role}
              </p>
            </div>

            {/* Reciprocal Rank Fusion Bridge */}
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 py-1">
              <GitMerge className="w-4 h-4 text-cyan-400" />
              <span>Reciprocal Rank Fusion (RRF) Confluence</span>
            </div>

            {/* BM25 Branch */}
            <div
              className={cn(
                "p-4 rounded-xl border transition-all duration-300",
                activeEngine === "bm25" || activeEngine === "hybrid"
                  ? "bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  : "opacity-40 bg-black/30 border-white/5"
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-emerald-400" />
                  {rag.bm25Branch.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {rag.bm25Branch.engine}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                {rag.bm25Branch.role}
              </p>
            </div>
          </div>

          {/* AI Agent Recipient Node */}
          <div className="lg:col-span-3">
            <div className="p-5 rounded-xl bg-cyan-950/20 border border-cyan-400/50 text-center shadow-[0_0_20px_rgba(61,219,255,0.15)]">
              <div className="text-[10px] font-mono text-cyan-400 uppercase mb-1">
                Context Delivery
              </div>
              <div className="font-mono text-xs font-bold text-white mb-2">
                Spring AI Investigation Agent
              </div>
              <span className="text-[11px] font-mono text-emerald-300">
                Evidence-Grounded Knowledge Injected
              </span>
            </div>
          </div>
        </div>

        {/* Sample Retrieved Runbook Cards (PRD Section 22) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              // Retrieved Sample Runbooks (Demonstration Data):
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              Ranked by hybrid relevance score
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rag.sampleRunbooks.map((book) => (
              <GlassPanel
                key={book.id}
                variant="default"
                className="p-5 hover:border-cyan-400/40 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {book.id}
                  </span>
                  <Badge variant="green" size="sm">
                    {book.matchScore}
                  </Badge>
                </div>
                <h4 className="text-sm font-semibold text-white font-sans mb-1">
                  {book.title}
                </h4>
                <div className="text-[11px] font-mono text-slate-400 mb-2">
                  Category: {book.category}
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {book.relevance}
                </p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
