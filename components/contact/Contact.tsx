"use client";

import React, { useState } from "react";
import { Mail, Phone, Copy, Check, ExternalLink, Linkedin, Github } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Button } from "@/components/common/Button";
import { ResumeButton } from "@/components/contact/ResumeButton";
import { profileData } from "@/lib/content/profile";

export function Contact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section
      id="contact"
      aria-label="Contact & Communications"
      className="relative py-24 sm:py-32 border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading
          align="center"
          number="08"
          tag="GET IN TOUCH"
          title="Direct Communication Channel"
          subtitle="Open for backend engineering, AI/ML systems, and distributed architecture opportunities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
          {/* Email Card */}
          <GlassPanel variant="cyan" className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-500">// PRIMARY CONTACT</span>
              </div>
              <div className="text-xs font-mono text-slate-400 mb-1">EMAIL ADDRESS</div>
              <a
                href={`mailto:${profileData.email}`}
                className="text-base sm:text-lg font-mono font-bold text-white hover:text-cyan-300 transition-colors block mb-4 break-all"
              >
                {profileData.email}
              </a>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <a href={`mailto:${profileData.email}`} className="flex-1">
                <Button size="sm" variant="primary" className="w-full justify-center">
                  Send Email
                </Button>
              </a>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => copyToClipboard(profileData.email, "email")}
                title="Copy email address"
              >
                {copiedField === "email" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </Button>
            </div>
          </GlassPanel>

          {/* Phone Card */}
          <GlassPanel variant="default" className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-500">// DIRECT TELEPHONE</span>
              </div>
              <div className="text-xs font-mono text-slate-400 mb-1">PHONE NUMBER</div>
              <a
                href={`tel:${profileData.phone}`}
                className="text-base sm:text-lg font-mono font-bold text-white hover:text-cyan-300 transition-colors block mb-4"
              >
                {profileData.phone}
              </a>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <a href={`tel:${profileData.phone}`} className="flex-1">
                <Button size="sm" variant="outline" className="w-full justify-center">
                  Direct Call
                </Button>
              </a>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => copyToClipboard(profileData.phone, "phone")}
                title="Copy phone number"
              >
                {copiedField === "phone" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </Button>
            </div>
          </GlassPanel>
        </div>

        {/* Social Profiles (Handled gracefully per PRD Section 45 Phase 12) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {profileData.linkedInUrl ? (
            <a
              href={profileData.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="md">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          ) : (
            <div className="relative group">
              <Button variant="outline" size="md" disabled className="opacity-50">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <span className="text-[10px] font-mono text-slate-500">(Pending URL)</span>
              </Button>
            </div>
          )}

          {profileData.githubUrl ? (
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="md">
                <Github className="w-4 h-4" />
                <span>GitHub Repositories</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          ) : (
            <div className="relative group">
              <Button variant="outline" size="md" disabled className="opacity-50">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <span className="text-[10px] font-mono text-slate-500">(Pending URL)</span>
              </Button>
            </div>
          )}

          <ResumeButton size="md" variant="primary" />
        </div>
      </div>
    </section>
  );
}
