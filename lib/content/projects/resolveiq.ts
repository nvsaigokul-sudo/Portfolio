export interface ArchitectureStage {
  id: string;
  step: number;
  name: string;
  category: "ingestion" | "analysis" | "ai" | "resolution";
  packetType: "metrics" | "logs" | "traces" | "deployment" | "config";
  shortDescription: string;
  detailedDescription: string;
  technicalDetails: string[];
}

export interface SimulationStep {
  step: number;
  title: string;
  phase: string;
  description: string;
  activeNodeId: string;
  alertType?: "normal" | "warning" | "verified";
}

export interface ResolveIQProject {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  status: string;
  githubUrl: string | null;
  problem: {
    title: string;
    summary: string;
    painPoints: string[];
  };
  solution: {
    title: string;
    summary: string;
    coreComponents: string[];
  };
  architectureStages: ArchitectureStage[];
  simulationSteps: SimulationStep[];
  insufficientEvidenceDemo: {
    headline: string;
    subheadline: string;
    explanation: string;
    confidenceScore: number;
    philosophyReason: string;
    scenarios: string[];
  };
  sampleRCA: {
    incidentId: string;
    title: string;
    demoConfidenceScore: number;
    severity: string;
    affectedServices: string[];
    supportingEvidence: {
      metrics: string[];
      logs: string[];
      traces: string[];
    };
    counterEvidence: string[];
    rootCause: string;
    recommendedMitigation: string;
    disclaimer: string;
  };
  ragPipeline: {
    title: string;
    summary: string;
    vectorBranch: {
      name: string;
      engine: string;
      role: string;
    };
    bm25Branch: {
      name: string;
      engine: string;
      role: string;
    };
    sampleRunbooks: {
      id: string;
      title: string;
      matchScore: string;
      category: string;
      relevance: string;
    }[];
  };
  techStack: {
    category: string;
    technologies: string[];
  }[];
  engineeringDecisions: {
    question: string;
    decision: string;
    rationale: string;
  }[];
  securityArchitecture: {
    title: string;
    description: string;
    features: {
      name: string;
      explanation: string;
    }[];
  };
  testingStrategy: {
    category: string;
    tooling: string;
    validates: string;
  }[];
}

export const resolveiqData: ResolveIQProject = {
  id: "resolveiq",
  title: "ResolveIQ",
  subtitle: "Production Incident Intelligence Platform",
  tagline: "Deterministic correlation, autonomous agent investigation, and evidence-backed root cause analysis.",
  status: "Actively Developed / Portfolio Project",
  githubUrl: null, // TODO — Site owner to add GitHub repository URL for ResolveIQ
  problem: {
    title: "The Fragmented Telemetry Crisis",
    summary: "During high-severity production outages, engineering teams are inundated with disconnected metrics, unstructured logs, fragmented traces, and noisy alerts across dozens of microservices. Engineers waste critical minutes manually correlating disparate dashboards while MTTR surges.",
    painPoints: [
      "Alert storms with hundreds of concurrent notifications obscuring the initial failure point",
      "Siloed telemetry forcing on-call engineers to cross-reference multiple independent tools",
      "Premature LLM adoption producing confident hallucinations without ground-truth verification",
      "Lack of institutional memory resulting in re-solving already resolved historical incidents",
    ],
  },
  solution: {
    title: "Deterministic Grounding + Tool-Augmented AI",
    summary: "ResolveIQ unites streaming telemetry with a deterministic detection and graph correlation engine before handing verified signals to a Spring AI investigation agent. The agent synthesizes runbooks via hybrid RAG to generate an evidence-backed Root Cause Analysis — or halts in an explicit INSUFFICIENT EVIDENCE state when telemetry is inconclusive.",
    coreComponents: [
      "High-throughput OpenTelemetry ingestion decoupled through Apache Kafka",
      "Deterministic graph-based correlation engine establishing verified failure topologies",
      "Spring AI investigation agent equipped strictly with read-only observability tools",
      "Hybrid RAG combining pgvector embeddings with BM25 exact keyword matching",
      "Anti-hallucination safety barrier that prefers uncertainty over fabricated causes",
    ],
  },
  architectureStages: [
    {
      id: "apps",
      step: 1,
      name: "Applications",
      category: "ingestion",
      packetType: "metrics",
      shortDescription: "Microservices and distributed applications executing production workloads.",
      detailedDescription: "Containerized Java/Spring Boot and polyglot microservices instrumented with OpenTelemetry SDKs emitting high-volume telemetry.",
      technicalDetails: ["Distributed microservice topology", "Zero-code instrumentation auto-injection", "Context propagation across HTTP/gRPC"],
    },
    {
      id: "otel",
      step: 2,
      name: "OpenTelemetry Collector",
      category: "ingestion",
      packetType: "logs",
      shortDescription: "Standardized aggregation and normalization layer for all observability streams.",
      detailedDescription: "Receives raw OTLP metrics, logs, and distributed traces, batches them, removes PII, and normalizes them into structured events.",
      technicalDetails: ["OTLP protocol over gRPC", "Memory-bounded batch processor", "Tail-based sampling filters"],
    },
    {
      id: "kafka",
      step: 3,
      name: "Apache Kafka",
      category: "ingestion",
      packetType: "traces",
      shortDescription: "Fault-tolerant event stream buffering high-throughput telemetry at scale.",
      detailedDescription: "Decouples ingestion from analysis engines, providing partitioned, ordered log guarantees during sudden 100x traffic spikes.",
      technicalDetails: ["Partitioned telemetry topics", "At-least-once delivery semantics", "Horizontal consumer group scaling"],
    },
    {
      id: "detection",
      step: 4,
      name: "Detection Engine",
      category: "analysis",
      packetType: "deployment",
      shortDescription: "Deterministic anomaly detection evaluating sliding-window thresholds.",
      detailedDescription: "Calculates statistical deviations (p99 latency spikes, error rate jumps, saturation bounds) without relying on stochastic LLMs.",
      technicalDetails: ["Sliding-window rate calculations", "Dynamic baseline anomaly scoring", "Alert deduplication pipeline"],
    },
    {
      id: "correlation",
      step: 5,
      name: "Correlation Engine",
      category: "analysis",
      packetType: "config",
      shortDescription: "Graph-based dependency traversal linking related failure events.",
      detailedDescription: "Maps downstream service failures back to upstream culprits using runtime dependency graphs and trace traceparent propagation.",
      technicalDetails: ["Directed acyclic graph traversal", "Temporal proximity clustering", "Blast-radius calculation"],
    },
    {
      id: "evidence",
      step: 6,
      name: "Evidence Collection",
      category: "analysis",
      packetType: "metrics",
      shortDescription: "Automated aggregation of contextual logs, metric diffs, and deploy diffs.",
      detailedDescription: "Constructs an immutable evidence bundle encompassing the exact anomaly window, recent configuration commits, and error snippets.",
      technicalDetails: ["Zero-mutation read snapshots", "Timeline alignment across logs/traces", "Structured JSON evidence payload"],
    },
    {
      id: "agent",
      step: 7,
      name: "Spring AI Investigation Agent",
      category: "ai",
      packetType: "logs",
      shortDescription: "Autonomous reasoning agent executing read-only investigation tools.",
      detailedDescription: "Inspects correlated telemetry, formulates diagnostic hypotheses, and queries tools with zero capability to alter production state.",
      technicalDetails: ["Spring AI model abstraction", "Deterministic function calling schema", "Sandboxed read-only tools"],
    },
    {
      id: "rag",
      step: 8,
      name: "Hybrid RAG Pipeline",
      category: "ai",
      packetType: "traces",
      shortDescription: "Parallel semantic embedding and BM25 exact keyword retrieval.",
      detailedDescription: "Queries historical post-mortems and verified runbooks using vector similarity alongside BM25 exact code-token precision.",
      technicalDetails: ["pgvector cosine similarity", "BM25 keyword search index", "Reciprocal Rank Fusion (RRF)"],
    },
    {
      id: "runbooks",
      step: 9,
      name: "Runbooks & Post-Mortems",
      category: "ai",
      packetType: "deployment",
      shortDescription: "Curated institutional repository of remediation steps and historical RCAs.",
      detailedDescription: "Version-controlled Markdown runbooks and resolved incident records providing grounded historical context.",
      technicalDetails: ["GitOps runbook sync", "Structured incident schema", "Chunking with metadata tags"],
    },
    {
      id: "evaluation",
      step: 10,
      name: "Evidence Evaluation",
      category: "ai",
      packetType: "config",
      shortDescription: "Confidence scoring and counter-evidence verification check.",
      detailedDescription: "Cross-examines hypothesized root causes against both supporting and counter evidence to detect confirmation bias.",
      technicalDetails: ["Counter-evidence stress test", "Probabilistic confidence bounds", "Anti-hallucination validation gate"],
    },
    {
      id: "rca",
      step: 11,
      name: "Root Cause Analysis (RCA)",
      category: "resolution",
      packetType: "metrics",
      shortDescription: "Synthesized diagnostic report with confidence rating and affected nodes.",
      detailedDescription: "Produces an explainable report containing primary root cause, supporting metrics, counter evidence, and affected dependencies.",
      technicalDetails: ["Markdown & JSON schema export", "Audit trail of tool invocations", "Clear confidence level output"],
    },
    {
      id: "verification",
      step: 12,
      name: "Engineer Verification",
      category: "resolution",
      packetType: "logs",
      shortDescription: "Human-in-the-loop review interface for on-call engineer sign-off.",
      detailedDescription: "Provides interactive verification controls where engineers can accept, challenge, or refine the automated RCA hypotheses.",
      technicalDetails: ["Single-click approval workflow", "Annotation diff tracking", "Audit logging for compliance"],
    },
    {
      id: "mitigation",
      step: 13,
      name: "Mitigation & Lifecycle",
      category: "resolution",
      packetType: "traces",
      shortDescription: "Runbook command dispatch and incident resolution tracking.",
      detailedDescription: "Guides on-call responders through recommended remediations with step-by-step validation checks.",
      technicalDetails: ["Runbook command preview", "Incident status lifecycle transition", "Post-incident review generation"],
    },
  ],
  simulationSteps: [
    {
      step: 1,
      title: "Normal Baseline",
      phase: "Baseline Traffic",
      description: "Distributed services operating within normal latency and throughput boundaries.",
      activeNodeId: "apps",
      alertType: "normal",
    },
    {
      step: 2,
      title: "Telemetry Ingestion",
      phase: "Active Streams",
      description: "OpenTelemetry collector ingesting metrics, traces, and application logs into Kafka.",
      activeNodeId: "otel",
      alertType: "normal",
    },
    {
      step: 3,
      title: "Abnormal Behavior Triggered",
      phase: "Anomaly Detected",
      description: "Database connection pool exhaustion detected in Checkout Service. Latency spikes above p99 threshold.",
      activeNodeId: "detection",
      alertType: "warning",
    },
    {
      step: 4,
      title: "Threshold Detection",
      phase: "Alert Evaluation",
      description: "Deterministic Detection Engine flags 14x increase in HTTP 500 error rates within 10-second window.",
      activeNodeId: "detection",
      alertType: "warning",
    },
    {
      step: 5,
      title: "Causal Correlation",
      phase: "Topology Traversal",
      description: "Correlation engine isolates cascading failures in Payment Proxy and Order Service back to DB Pool timeout.",
      activeNodeId: "correlation",
      alertType: "warning",
    },
    {
      step: 6,
      title: "Evidence Bundle Assembly",
      phase: "Context Collection",
      description: "Aggregating HikariCP pool metrics, timeout stack traces, and recent configuration deployment diffs.",
      activeNodeId: "evidence",
      alertType: "normal",
    },
    {
      step: 7,
      title: "Spring AI Agent Dispatched",
      phase: "Investigation",
      description: "AI Investigation Agent boots with isolated read-only tools to inspect correlated evidence.",
      activeNodeId: "agent",
      alertType: "normal",
    },
    {
      step: 8,
      title: "Hybrid RAG Execution",
      phase: "Knowledge Retrieval",
      description: "Concurrent retrieval across pgvector (vector search) and BM25 (exact keyword) for DB pool exhaustion runbooks.",
      activeNodeId: "rag",
      alertType: "normal",
    },
    {
      step: 9,
      title: "Runbook Context Fusion",
      phase: "Context Synthesized",
      description: "Retrieved runbook 'RB-304: HikariCP Connection Starvation Mitigation' aligned with current telemetry.",
      activeNodeId: "runbooks",
      alertType: "normal",
    },
    {
      step: 10,
      title: "Counter-Evidence Evaluation",
      phase: "Safety Gate",
      description: "Agent evaluates whether network saturation could explain the failure. Counter evidence rules out network partition.",
      activeNodeId: "evaluation",
      alertType: "normal",
    },
    {
      step: 11,
      title: "RCA Generation",
      phase: "Synthesis",
      description: "Structured Root Cause Analysis generated with 94% Demo Confidence Score.",
      activeNodeId: "rca",
      alertType: "verified",
    },
    {
      step: 12,
      title: "Engineer Verification",
      phase: "Human In Loop",
      description: "On-call lead verifies diagnostic findings and approves recommended remediation procedure.",
      activeNodeId: "verification",
      alertType: "verified",
    },
    {
      step: 13,
      title: "Mitigation Dispatch",
      phase: "Mitigation",
      description: "Recommended rollback of configuration commit #a9c14f or dynamic HikariCP pool scale-up initiated.",
      activeNodeId: "mitigation",
      alertType: "verified",
    },
  ],
  insufficientEvidenceDemo: {
    headline: "INSUFFICIENT EVIDENCE",
    subheadline: "Deterministic Safety Gate Activated — Speculation Blocked",
    explanation: "When telemetry lacks definitive causal links or contradictory signals cannot be resolved, ResolveIQ explicitly halts RCA generation rather than generating plausible-sounding hallucinations.",
    confidenceScore: 32,
    philosophyReason: "The system prefers explicit uncertainty over hallucination — it will not fabricate a root cause without adequate evidence.",
    scenarios: [
      "Telemetry gap: OpenTelemetry collector experienced packet drops during network blip",
      "Conflicting metrics: CPU throttled concurrently with external payment gateway degradation",
      "No correlated deployment or configuration changes found in the incident window",
    ],
  },
  sampleRCA: {
    incidentId: "INC-8492-DEMO",
    title: "Checkout Service HikariCP Connection Starvation",
    demoConfidenceScore: 94,
    severity: "SEV-1 (Critical)",
    affectedServices: ["checkout-service (Origin)", "payment-proxy", "order-orchestrator"],
    supportingEvidence: {
      metrics: [
        "HikariCP active connections reached 100% capacity (pool_size=10/10) for 180s",
        "Connection acquisition timeout rate spiked from 0.01% to 84.2%",
        "p99 HTTP latency elevated from 42ms to 4,820ms on POST /api/v1/checkout",
      ],
      logs: [
        "java.sql.SQLTransientConnectionException: HikariPool-1 - Connection is not available, request timed out after 30000ms",
        "org.springframework.transaction.CannotCreateTransactionException: Could not open JDBC Connection for transaction",
      ],
      traces: [
        "Trace ID 7f3b8a1c90: Span 'checkout.persistOrder' blocked 30,004ms in getConnection()",
        "Downstream calls to 'payment-proxy' starved before HTTP handshake dispatch",
      ],
    },
    counterEvidence: [
      "Database host PostgreSQL instance CPU utilization remained nominal at 18%",
      "Direct DB health check responded within 2ms — PostgreSQL was not unresponsive",
      "Network packet loss across DB VPC remained flat at 0.00%",
    ],
    rootCause: "A misconfigured configuration change (commit #a9c14f) reduced the HikariCP max-pool-size from 50 to 10 while transaction timeout was inadvertently increased to 45s, causing fast pool starvation under concurrent loads.",
    recommendedMitigation: "Revert application configuration commit #a9c14f or dynamically set 'spring.datasource.hikari.maximum-pool-size=50' via actuator refresh endpoint.",
    disclaimer: "Demo visualization — values are illustrative, not measured production data.",
  },
  ragPipeline: {
    title: "Dual-Engine Hybrid RAG Retrieval",
    summary: "Standard vector search alone struggles with exact identifier lookups like error codes or table names. ResolveIQ combines pgvector semantic embeddings with BM25 exact keyword matching, merging results via Reciprocal Rank Fusion (RRF).",
    vectorBranch: {
      name: "Vector Search",
      engine: "PostgreSQL pgvector (HNSW index)",
      role: "Captures semantic intent, diagnostic narratives, and analogous incident descriptions even when differing terminology is used.",
    },
    bm25Branch: {
      name: "Keyword Search",
      engine: "BM25 Algorithm",
      role: "Guarantees deterministic, exact-token recall for specific exception classes, configuration flags, and service names.",
    },
    sampleRunbooks: [
      {
        id: "RB-304",
        title: "HikariCP Connection Pool Exhaustion Playbook",
        matchScore: "0.96 RRF Score",
        category: "Database Persistence",
        relevance: "Matches SQLTransientConnectionException and connection acquisition timeout telemetry.",
      },
      {
        id: "RB-118",
        title: "PostgreSQL Client-Side Connection Leak Diagnostics",
        matchScore: "0.84 RRF Score",
        category: "Infrastructure",
        relevance: "Provides validation scripts to verify unclosed JDBC statements.",
      },
      {
        id: "RB-209",
        title: "Cascading Microservice Timeout Mitigation",
        matchScore: "0.78 RRF Score",
        category: "Resilience",
        relevance: "Guides circuit breaker trip threshold tuning on payment proxies.",
      },
    ],
  },
  techStack: [
    { category: "Frontend", technologies: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js / R3F"] },
    { category: "Backend", technologies: ["Java", "Spring Boot", "REST APIs", "Spring MVC"] },
    { category: "Messaging", technologies: ["Apache Kafka (Event-driven telemetry ingestion)"] },
    { category: "Telemetry", technologies: ["OpenTelemetry (OTLP collector, traces, metrics, logs)"] },
    { category: "Databases", technologies: ["PostgreSQL", "Redis", "pgvector"] },
    { category: "RAG & AI", technologies: ["Spring AI", "pgvector Vector Search", "BM25 Keyword Search", "Reciprocal Rank Fusion"] },
    { category: "Security", technologies: ["OAuth2 / OIDC", "JWT", "RBAC", "Row-Level Security (RLS)", "Argon2id", "TLS"] },
    { category: "Testing", technologies: ["JUnit", "Testcontainers", "Vitest", "E2E", "Chaos", "Load Testing"] },
    { category: "Containerization", technologies: ["Docker", "Docker Compose"] },
  ],
  engineeringDecisions: [
    {
      question: "Why Apache Kafka for telemetry ingestion?",
      decision: "Buffered partitioned messaging stream",
      rationale: "Production incidents generate sudden 100x spikes in telemetry volume (error logs, retries, traces). Direct HTTP ingestion would overwhelm analytical databases. Kafka guarantees backpressure handling, ordered partitions, and asynchronous decoupling at scale.",
    },
    {
      question: "Why deterministic detection precedes the AI agent?",
      decision: "Rule and statistical pre-filtering before LLM involvement",
      rationale: "Letting an LLM 'guess' correlation across millions of raw events produces hallucinations and massive token waste. A deterministic engine computes p99 anomalies and graph traversal first, grounding the AI agent strictly in verified signals.",
    },
    {
      question: "Why hybrid vector + BM25 retrieval?",
      decision: "pgvector semantic embeddings paired with BM25 exact matching",
      rationale: "Semantic embeddings excel at conceptual queries ('db connection starvation') but often misrank precise tokens like 'SQLTransientConnectionException' or specific error codes. Hybrid RAG provides both conceptual discovery and exact-token precision.",
    },
    {
      question: "Why are investigation agent tools strictly read-only?",
      decision: "Zero mutation privilege during diagnosis",
      rationale: "Automated agents diagnosing an active outage must never have write access to mutate clusters, restart services, or modify schemas without explicit human engineer verification, preventing catastrophic cascading failures.",
    },
  ],
  securityArchitecture: {
    title: "Enterprise Zero-Trust Security",
    description: "Every telemetry stream, API request, and data storage tier is secured following defense-in-depth principles.",
    features: [
      { name: "OAuth2 / OIDC", explanation: "Identity federation with enterprise identity providers." },
      { name: "Cryptographic JWTs", explanation: "Stateless, signed bearer tokens for distributed microservice authorization." },
      { name: "Role-Based Access Control (RBAC)", explanation: "Granular separation between incident viewers, responders, and leads." },
      { name: "Row-Level Security (RLS)", explanation: "PostgreSQL tenant isolation ensuring multi-tenant telemetry segregation." },
      { name: "Argon2id Key Derivation", explanation: "State-of-the-art password hashing resilient against GPU/ASIC attacks." },
      { name: "End-to-End TLS", explanation: "Encrypted transport for OTLP streams, Kafka broker connections, and API endpoints." },
    ],
  },
  testingStrategy: [
    { category: "JUnit 5", tooling: "Java / Spring Boot", validates: "Unit validation of detection algorithms, statistical thresholds, and correlation graph traversal logic." },
    { category: "Testcontainers", tooling: "Dockerized PostgreSQL & Kafka", validates: "True integration testing with real Kafka brokers, pgvector indexing, and SQL transactions." },
    { category: "Vitest & React Testing Library", tooling: "Frontend UI & State", validates: "Component rendering, simulation state machine transitions, and accessible keyboard focus." },
    { category: "Chaos Engineering", tooling: "Simulated Fault Injection", validates: "System resilience during Kafka partition unavailabilities and downstream telemetry dropouts." },
    { category: "Load Testing", tooling: "High-Throughput Generators", validates: "Ingestion throughput under 50,000 telemetry events per second without collector memory leaks." },
  ],
};
