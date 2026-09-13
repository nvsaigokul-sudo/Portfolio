# N V Sai Gokul — Interactive Engineering Portfolio

> **"I build intelligent, production-oriented software systems that combine backend engineering, AI, real-time processing, distributed systems, and security"**

A dark-mode "engineering console" interactive portfolio website engineered strictly according to the comprehensive system specification, showcasing **ResolveIQ** (flagship incident intelligence platform) and **Cyber Sentinel** (secure real-time communication platform).

Built with **Next.js 14 (App Router)**, **TypeScript**, **React Three Fiber (Three.js / Drei)**, **GSAP**, **Framer Motion**, **Zustand**, and **Tailwind CSS**. Fully accessible, performant, SEO-optimized, and configured for seamless Vercel edge deployment.

---

## Key Highlights & Featured Systems

### 1. Flagship Project: ResolveIQ (`/work/resolveiq`)
An autonomous production incident intelligence platform designed to eliminate fragmented telemetry during critical outages:
- **13-Stage Architecture Pipeline**: Explorable via scroll-storytelling and standalone interactive step-through controls (`Prev Stage` / `Next Stage`), featuring custom data-packet types (metrics cubes, logs lines, traces trails, deployment diamonds, config hexagons) and floating technical inspection cards.
- **13-Step Live Incident Simulation**: Replayable interactive simulation of a HikariCP connection starvation failure, complete with a persistent `"Simulated Incident — Portfolio Demonstration"` HUD badge, play/pause/reset/skip controls, and real-time signal convergence telemetry.
- **Independent Safety Gate ("INSUFFICIENT EVIDENCE")**: A deliberate, calm safety state demonstrating engineering discipline — halting automated RCA synthesis when telemetry is incomplete to prevent hallucinations.
- **Dual-Path Hybrid RAG Visualization**: Parallel visual flow demonstrating semantic vector search via pgvector and exact-token BM25 keyword search merging through Reciprocal Rank Fusion (RRF).
- **Evidence-Backed RCA Glass Panel**: Progressive reveals for confidence score (94% demo certainty), supporting metrics/logs/traces, evaluated counter-evidence (preventing confirmation bias), affected services, and verified mitigation runbook actions.
- **Deep Technical Rationale & Testing**: Justifications for Kafka decoupling, deterministic pre-filtering before LLM, read-only tools, and multi-tier testing (JUnit 5, Testcontainers, Vitest, Chaos, Load).

### 2. Secondary Project: Cyber Sentinel (`/work/cyber-sentinel`)
A resilient, real-time messaging architecture with proactive machine learning threat detection:
- **Dual-Lane 3D Architecture**: Visualizes authorized messaging traffic (STOMP WebSockets, Spring Cloud Gateway, Redis Pub/Sub with TTL) alongside a parallel threat inspection lane.
- **Simulate Real-Time Threat**: Interactive attack simulations for 4 distinct threat types:
  - *API Rate Flood*
  - *Credential Brute-Force*
  - *Volumetric Traffic Spike*
  - *Payload Tampering*
- **K-Means Anomaly Clustering Visualization**: Visual cluster plot with highlighted Euclidean outlier distance from centroids.
- **Google Gemini AI Threat Reasoning**: Multimodal contextual pass classifying attacker intent and orchestrating edge filter socket severances.

### 3. Engineering Profile & Credentials (`/`)
- **Interactive 3D Distributed Topology Hero**: Bounded cursor-reactive parallax tilt, depth-layered packet drift, and graceful 2D SVG fallback.
- **Professional Profile**: Categorical focus areas (Backend, AI/ML, Distributed Systems, Security) with zero fabricated numbers.
- **Skills Matrix**: Grouped tag clusters across Languages, Backend, Databases, DevOps & Tools, Messaging & AI.
- **Credentials & Timeline**: Amazon ML Challenge 2026 participation, Java Full Stack Development training, verified AI certifications, and academic education.
- **Contact**: Direct mailto/tel communication with one-click clipboard copy and verified resume download.

---

## Architectural & Tech Stack

| Technology | Role |
| :--- | :--- |
| **Next.js 14 (App Router)** | File-based routing, static page generation (SSG), metadata SEO API |
| **TypeScript** | Strict compile-time type safety across content and state stores |
| **Tailwind CSS** | Design tokens, glassmorphism, responsive breakpoints, accessible focus states |
| **React Three Fiber & Drei** | WebGL 3D rendering, instanced packet geometry, and HTML node labels |
| **Three.js** | Low-level GPU particle fields, procedural curves, and emissive materials |
| **GSAP & Framer Motion** | Scroll triggers, progressive timeline reveals, and spring UI micro-interactions |
| **Zustand** | Global simulation state machine, adaptive rendering tiers, and reduced-motion flags |
| **Vitest & React Testing Library** | Automated unit and component testing verifying content and simulation state |

---

## Getting Started Locally

### Prerequisites
- Node.js 18+ (tested on Node.js v24.17.0)
- npm 9+

### Installation
```bash
# Clone the repository
git clone https://github.com/nvsaigokul-sudo/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Test Suite
```bash
npm run test
```

### Production Build Verification
```bash
npm run build
```

---

## Deployment to Vercel

The application is fully prepared for one-click deployment to **Vercel**:
1. Connect this repository to Vercel.
2. Framework Preset: **Next.js** (auto-detected).
3. Build Command: `next build`.
4. Output Directory: `.next`.
5. Static assets (including the resume PDF) are served directly from `public/assets/resume/`.

---

## License & Attribution

Designed and engineered for **N V Sai Gokul**. All telemetry and incident data are portfolio simulations created for technical demonstration.
