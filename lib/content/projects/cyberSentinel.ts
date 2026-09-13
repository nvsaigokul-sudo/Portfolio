export interface CyberSentinelProject {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  status: string;
  githubUrl: string | null;
  overview: string;
  messagingLane: {
    title: string;
    description: string;
    stages: { id: string; name: string; role: string }[];
  };
  threatTypes: {
    id: "api_flood" | "brute_force" | "traffic_spike" | "suspicious_activity";
    name: string;
    badge: string;
    description: string;
    telemetrySignature: string;
    kMeansOutlierProfile: {
      cluster: string;
      distanceToCentroid: string;
      features: string[];
    };
    geminiReasoning: string;
    mitigationAction: string;
  }[];
  techStack: {
    category: string;
    technologies: string[];
  }[];
  engineeringDecisions: {
    question: string;
    decision: string;
    rationale: string;
  }[];
}

export const cyberSentinelData: CyberSentinelProject = {
  id: "cyber-sentinel",
  title: "Cyber Sentinel",
  subtitle: "Secure Real-Time Communication Platform",
  tagline: "End-to-end encrypted messaging paired with dual-layer machine learning and LLM threat intelligence.",
  status: "Actively Developed / Portfolio Project",
  githubUrl: null, // TODO — Site owner to add GitHub repository URL for Cyber Sentinel
  overview: "Cyber Sentinel is a resilient, real-time messaging architecture combining Spring Boot, Redis Pub/Sub, and STOMP WebSockets with proactive threat detection. By pairing high-speed K-Means anomaly clustering with Google Gemini AI contextual analysis, the platform intercepts malicious API floods, credential brute-forcing, and anomalous traffic patterns at the gateway before they degrade messaging infrastructure.",
  messagingLane: {
    title: "Authorized Real-Time Messaging Lane",
    description: "Low-latency bi-directional messaging path utilizing ephemeral room lifecycles and decoupled Pub/Sub distribution.",
    stages: [
      { id: "users", name: "Authenticated Clients", role: "Browser & mobile clients connecting over secure WSS" },
      { id: "websocket", name: "WebSocket / STOMP", role: "Full-duplex frame negotiation with heartbeat monitoring" },
      { id: "gateway", name: "Spring Cloud Gateway", role: "Centralized TLS termination, auth validation, and routing" },
      { id: "redis", name: "Redis Pub/Sub + TTL", role: "Distributed room broadcasting with automatic TTL expiry" },
      { id: "messaging", name: "Active Chat Engine", role: "Message delivery to subscribed participants" },
    ],
  },
  threatTypes: [
    {
      id: "api_flood",
      name: "API Rate Flood",
      badge: "Rate Violation",
      description: "High-frequency burst of message-dispatch frames designed to exhaust server socket buffers.",
      telemetrySignature: "850 req/sec from single CIDR block | WebSocket frame payload identical",
      kMeansOutlierProfile: {
        cluster: "Outlier Cluster C4",
        distanceToCentroid: "4.82 Euclidean distance (Threshold: 2.10)",
        features: ["Request Frequency: Extreme", "Entropy: 0.04 (Repetitive)", "Socket Age: 1.2s"],
      },
      geminiReasoning: "Volumetric packet flooding originating from automated bot network masquerading as legitimate chat clients. Exceeds standard human typing entropy bounds by 99.4%.",
      mitigationAction: "Dynamic IP throttle applied at Spring Cloud Gateway; socket connection dropped and ephemeral room key invalidated.",
    },
    {
      id: "brute_force",
      name: "Credential Brute-Force",
      badge: "Auth Attack",
      description: "Rapid cyclical token validation attempts targeting protected temporary room passkeys.",
      telemetrySignature: "120 failed auth handshakes in 4.5 seconds across rotating user-agent headers",
      kMeansOutlierProfile: {
        cluster: "Outlier Cluster C2",
        distanceToCentroid: "3.95 Euclidean distance (Threshold: 2.10)",
        features: ["Auth Failure Rate: 98.2%", "Fingerprint Variance: High", "Payload Size: Uniform"],
      },
      geminiReasoning: "Dictionary passkey enumeration detected against private room endpoints. Coordinated rotational user-agents indicate distributed credential-stuffing script.",
      mitigationAction: "Gateway rate-limiter triggers progressive exponential backoff delay and temporary subnet ban.",
    },
    {
      id: "traffic_spike",
      name: "Volumetric Traffic Spike",
      badge: "DoS Anomaly",
      description: "Sudden asymmetric influx of connection requests stressing gateway thread pools.",
      telemetrySignature: "Connection request rate increased by 1,200% within 8 seconds",
      kMeansOutlierProfile: {
        cluster: "Outlier Cluster C3",
        distanceToCentroid: "3.42 Euclidean distance (Threshold: 2.10)",
        features: ["Connection Rate: 12x", "Handshake Completion: 18%", "Keep-Alive: Dropped"],
      },
      geminiReasoning: "Slowloris-style connection hoarding attempting to exhaust gateway netty worker threads without completing STOMP handshake.",
      mitigationAction: "Aggressive idle-handshake timeouts enforced; non-responsive sockets terminated immediately.",
    },
    {
      id: "suspicious_activity",
      name: "Payload Tampering",
      badge: "Protocol Violation",
      description: "Malformed STOMP frames containing unauthorized command injection and header anomalies.",
      telemetrySignature: "Corrupted framing bytes, illegal header escape sequences, and oversized headers",
      kMeansOutlierProfile: {
        cluster: "Outlier Cluster C1",
        distanceToCentroid: "4.15 Euclidean distance (Threshold: 2.10)",
        features: ["Header Length: Out of bounds", "Parser Error Rate: 100%", "Command: Malformed"],
      },
      geminiReasoning: "Protocol fuzzing attack probing for deserialization vulnerabilities in the STOMP message parsing pipeline.",
      mitigationAction: "Frame rejected at edge filter; client session blacklisted and incident event logged to audit stream.",
    },
  ],
  techStack: [
    { category: "Backend Services", technologies: ["Java", "Spring Boot", "Spring Cloud Gateway"] },
    { category: "Real-Time & Cache", technologies: ["WebSocket", "STOMP Protocol", "Redis (Pub/Sub + TTL)"] },
    { category: "Machine Learning & AI", technologies: ["Weka (K-Means Clustering)", "Markov Chain Modeling", "Google Gemini AI"] },
    { category: "Frontend & UI", technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "DevOps & Infrastructure", technologies: ["Docker", "Docker Compose"] },
  ],
  engineeringDecisions: [
    {
      question: "Why Redis Pub/Sub + TTL for chat rooms?",
      decision: "In-memory Pub/Sub with automatic key expiration",
      rationale: "Temporary chat rooms do not need permanent relational database storage. Redis Pub/Sub delivers sub-millisecond multi-client broadcast while TTL keys automatically clean up dormant rooms without requiring expensive periodic database cron purges.",
    },
    {
      question: "Why a centralized Spring Cloud Gateway?",
      decision: "Edge routing and unified rate inspection",
      rationale: "Terminating WebSocket handshakes and client traffic at a dedicated gateway layer prevents unauthenticated packets from ever reaching backend services. It centralizes IP rate-limiting, authentication, and threat inspection in a single perimeter.",
    },
    {
      question: "Why pair K-Means clustering with Google Gemini AI?",
      decision: "Dual-layer detection: statistical ML pre-filter + LLM contextual intelligence",
      rationale: "Sending raw traffic directly to an LLM is cost-prohibitive and slow. Unsupervised K-Means clustering flags statistical outliers in microsecond timeframes. Once an outlier is flagged, Gemini AI analyzes the packet narrative and user context to distinguish malicious attacks from benign flash crowds.",
    },
  ],
};
