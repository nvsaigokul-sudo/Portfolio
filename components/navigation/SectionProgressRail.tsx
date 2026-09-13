"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface NavRailItem {
  id: string;
  label: string;
}

interface SectionProgressRailProps {
  items: NavRailItem[];
  backLink?: string;
  backText?: string;
}

export function SectionProgressRail({
  items,
  backLink = "/",
  backText = "Back to Portfolio",
}: SectionProgressRailProps) {
  const [activeId, setActiveId] = useState(items[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="In-project progress navigation"
      className="hidden xl:flex fixed left-8 top-32 z-40 flex-col gap-6 select-none"
    >
      <Link
        href={backLink}
        className="group inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors px-2 py-1 rounded bg-black/40 backdrop-blur-sm border border-white/5 hover:border-cyan-400/30"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
        <span>{backText}</span>
      </Link>

      <div className="relative pl-3 border-l border-white/10 space-y-4">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "group flex items-center gap-3 text-left text-xs font-mono transition-all block cursor-pointer",
                isActive ? "text-cyan-400 font-semibold" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <span
                className={cn(
                  "absolute -left-[5px] w-2 h-2 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-cyan-400 shadow-[0_0_8px_#3DDBFF] scale-125"
                    : "bg-slate-700 group-hover:bg-slate-500"
                )}
              />
              <span className="truncate max-w-[140px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
