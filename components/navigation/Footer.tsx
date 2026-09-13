"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Shield, Cpu, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#070A0F] py-12 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
              SG
            </div>
            <div>
              <p className="text-slate-200 font-semibold font-mono text-sm">
                N V Sai Gokul
              </p>
              <p className="text-slate-500 font-mono text-[11px]">
                Software / Backend / AI-ML Engineer
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px]">
            <Link href="/" className="hover:text-cyan-300 transition-colors">
              // HOME
            </Link>
            <Link href="/work/resolveiq" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
              <Cpu className="w-3 h-3 text-cyan-400" />
              RESOLVEIQ
            </Link>
            <Link href="/work/cyber-sentinel" className="hover:text-red-300 transition-colors flex items-center gap-1">
              <Shield className="w-3 h-3 text-red-400" />
              CYBER SENTINEL
            </Link>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="text-slate-500">
              Built with Next.js, R3F & Tailwind
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-white/5 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-slate-500 font-mono text-[11px]">
          Portfolio Demonstration &copy; {new Date().getFullYear()} N V Sai Gokul. All simulation metrics and scenarios are illustrative.
        </div>
      </div>
    </footer>
  );
}
