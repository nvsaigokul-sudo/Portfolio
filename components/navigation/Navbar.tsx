"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Cpu, Shield, ExternalLink, Terminal } from "lucide-react";
import { ResumeButton } from "@/components/contact/ResumeButton";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isHome) {
        const sections = ["hero", "about", "work", "skills", "training", "achievements", "education", "contact"];
        const scrollPosition = window.scrollY + 200;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const navLinks = [
    { name: "About", href: isHome ? "#about" : "/#about", sectionId: "about" },
    { name: "Skills", href: isHome ? "#skills" : "/#skills", sectionId: "skills" },
    { name: "Achievements", href: isHome ? "#achievements" : "/#achievements", sectionId: "achievements" },
    { name: "Education", href: isHome ? "#education" : "/#education", sectionId: "education" },
    { name: "Contact", href: isHome ? "#contact" : "/#contact", sectionId: "contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0A0E14]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram Console Badge */}
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-100 hover:text-cyan-300 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center font-mono font-bold text-xs text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(61,219,255,0.4)] transition-all">
              SG
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-semibold tracking-wider text-slate-100 group-hover:text-cyan-300">
                N V SAI GOKUL
              </span>
              <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">
                ENGINEER // CONSOLE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            <Link
              href="/"
              className={cn(
                "text-xs font-mono tracking-wider transition-colors py-1 relative",
                isHome && activeSection === "hero" ? "text-cyan-400" : "text-slate-300 hover:text-slate-100"
              )}
            >
              // HOME
              {isHome && activeSection === "hero" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#3DDBFF]" />
              )}
            </Link>

            {/* Work Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setWorkDropdownOpen(true)}
              onMouseLeave={() => setWorkDropdownOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1.5 text-xs font-mono tracking-wider py-1 transition-colors cursor-pointer",
                  pathname.startsWith("/work") ? "text-cyan-400" : "text-slate-300 hover:text-slate-100"
                )}
                aria-expanded={workDropdownOpen}
                aria-haspopup="true"
              >
                // WORK
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", workDropdownOpen && "rotate-180")} />
              </button>

              {workDropdownOpen && (
                <div className="absolute top-full left-0 w-72 pt-2 z-50">
                  <div className="rounded-xl bg-[#0D1117]/95 backdrop-blur-xl border border-white/10 p-2 shadow-2xl space-y-1">
                    <Link
                      href="/work/resolveiq"
                      className="block p-3 rounded-lg hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all group"
                      onClick={() => setWorkDropdownOpen(false)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" /> ResolveIQ
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                          FLAGSHIP
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        Incident intelligence with deterministic correlation & Spring AI investigation.
                      </p>
                    </Link>

                    <Link
                      href="/work/cyber-sentinel"
                      className="block p-3 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all group"
                      onClick={() => setWorkDropdownOpen(false)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-bold text-red-300 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5" /> Cyber Sentinel
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-400/10 text-red-300 border border-red-400/20">
                          SECURITY
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        Real-time STOMP communication with K-Means & Gemini AI threat detection.
                      </p>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Standard Nav Items */}
            {navLinks.map((link) => {
              const isActive = isHome && activeSection === link.sectionId;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-xs font-mono tracking-wider transition-colors py-1 relative",
                    isActive ? "text-cyan-400" : "text-slate-300 hover:text-slate-100"
                  )}
                >
                  // {link.name.toUpperCase()}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#3DDBFF]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Persistent Resume CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ResumeButton size="sm" variant="primary" />
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-[#0A0E14]/98 backdrop-blur-2xl border-t border-white/10 p-6 flex flex-col justify-between z-50 overflow-y-auto">
          <div className="space-y-6">
            {/* Pinned Resume CTA at top of mobile overlay (PRD Section 11) */}
            <div className="pt-2 pb-4 border-b border-white/10">
              <ResumeButton size="lg" className="w-full justify-center" />
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase px-2">
                // Featured Systems
              </div>
              <Link
                href="/work/resolveiq"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span className="font-mono text-sm font-semibold">ResolveIQ</span>
                </div>
                <span className="text-xs font-mono text-cyan-400">Flagship →</span>
              </Link>
              <Link
                href="/work/cyber-sentinel"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-mono text-sm font-semibold">Cyber Sentinel</span>
                </div>
                <span className="text-xs font-mono text-red-400">Threat Intel →</span>
              </Link>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase px-2 mb-2">
                // Navigation
              </div>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-mono text-slate-200 hover:bg-white/5"
              >
                [00] Home Overview
              </Link>
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-mono text-slate-200 hover:bg-white/5"
                >
                  [0{idx + 1}] {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-center font-mono text-xs text-slate-500">
            N V Sai Gokul — Backend / AI-ML Engineer
          </div>
        </div>
      )}
    </header>
  );
}
