import React from "react";
import { Cpu, Database, Network, Shield, Server, Activity, Terminal } from "lucide-react";

export function HeroFallback() {
  const nodes = [
    { id: "api", name: "API Gateway", icon: Network, x: "20%", y: "30%", color: "border-cyan-500/40 text-cyan-300" },
    { id: "auth", name: "OAuth2 / Security", icon: Shield, x: "40%", y: "18%", color: "border-cyan-500/40 text-cyan-300" },
    { id: "service", name: "Spring Microservices", icon: Server, x: "50%", y: "45%", color: "border-cyan-400 text-cyan-200" },
    { id: "kafka", name: "Apache Kafka", icon: Activity, x: "75%", y: "25%", color: "border-cyan-500/40 text-cyan-300" },
    { id: "agent", name: "Spring AI Agent", icon: Cpu, x: "85%", y: "55%", color: "border-cyan-400 text-cyan-200" },
    { id: "db", name: "Postgres + pgvector", icon: Database, x: "65%", y: "75%", color: "border-cyan-500/40 text-cyan-300" },
    { id: "telemetry", name: "OpenTelemetry", icon: Terminal, x: "30%", y: "70%", color: "border-cyan-500/40 text-cyan-300" },
  ];

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full min-h-[450px] flex items-center justify-center console-grid-bg overflow-hidden opacity-80"
    >
      {/* SVG Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3DDBFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#5B8CFF" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <line x1="20%" y1="30%" x2="50%" y2="45%" stroke="url(#cyanLine)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="40%" y1="18%" x2="50%" y2="45%" stroke="url(#cyanLine)" strokeWidth="1.5" />
        <line x1="50%" y1="45%" x2="75%" y2="25%" stroke="url(#cyanLine)" strokeWidth="1.5" strokeDasharray="6 3" />
        <line x1="75%" y1="25%" x2="85%" y2="55%" stroke="url(#cyanLine)" strokeWidth="1.5" />
        <line x1="85%" y1="55%" x2="65%" y2="75%" stroke="url(#cyanLine)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="65%" y1="75%" x2="50%" y2="45%" stroke="url(#cyanLine)" strokeWidth="1.5" />
        <line x1="30%" y1="70%" x2="50%" y2="45%" stroke="url(#cyanLine)" strokeWidth="1.5" strokeDasharray="5 5" />
      </svg>

      {/* Nodes */}
      {nodes.map((n) => {
        const Icon = n.icon;
        return (
          <div
            key={n.id}
            style={{ left: n.x, top: n.y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 p-2 rounded-xl bg-[#0D1117]/90 border ${n.color} shadow-lg backdrop-blur-sm`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-xs font-mono tracking-wider">{n.name}</span>
          </div>
        );
      })}
    </div>
  );
}
