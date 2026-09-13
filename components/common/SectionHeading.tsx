import React from "react";
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  number?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  number,
  tag,
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 mb-3 text-xs font-mono tracking-widest uppercase text-cyan-400",
          align === "center" && "justify-center"
        )}
      >
        {number && <span className="text-slate-500 font-bold">[{number}]</span>}
        {tag && <span>// {tag}</span>}
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
