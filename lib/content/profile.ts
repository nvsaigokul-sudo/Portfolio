export interface PersonalProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedInUrl: string | null;
  githubUrl: string | null;
  resumeUrl: string;
  positioningStatement: string;
  professionalSummary: string;
  focusAreas: {
    title: string;
    description: string;
    tags: string[];
  }[];
  engineeringPrinciples: {
    title: string;
    highlight: string;
    description: string;
  }[];
}

export const profileData: PersonalProfile = {
  name: "N V Sai Gokul",
  role: "Backend / AI-ML Engineer",
  email: "nvsaiogkul@gmail.com",
  phone: "+91-8019856575",
  linkedInUrl: null, // TODO — Site owner to add LinkedIn URL
  githubUrl: null,   // TODO — Site owner to add GitHub URL
  resumeUrl: "/assets/resume/nv-sai-gokul-resume.pdf",
  positioningStatement: "I build intelligent, production-oriented software systems that combine backend engineering, AI, real-time processing, distributed systems, and security.",
  professionalSummary:
    "Computer Science and Engineering student with hands-on experience building Java and Spring Boot backend systems — REST APIs, database-driven services, and containerized microservices. Has designed AI-integrated systems spanning cybersecurity and production-incident intelligence, including real-time communication, anomaly detection, automated threat analysis, retrieval-augmented generation (RAG), AI agents, and event-driven/distributed processing. Focused on building systems that are explainable, evidence-backed, and production-minded rather than purely academic exercises.",
  focusAreas: [
    {
      title: "Backend Engineering",
      description: "Scalable Java & Spring Boot microservices, high-throughput REST APIs, and containerized services with robust database schemas.",
      tags: ["Java", "Spring Boot", "REST APIs", "PostgreSQL", "Docker"]
    },
    {
      title: "Applied AI & RAG",
      description: "Evidence-grounded AI agents, hybrid semantic + keyword retrieval, and deterministic safety layers preventing model hallucinations.",
      tags: ["Spring AI", "pgvector", "BM25 Hybrid", "Agent Reasoning"]
    },
    {
      title: "Distributed Systems",
      description: "Event-driven telemetry ingestion, asynchronous processing at scale, and real-time streaming architectures.",
      tags: ["Apache Kafka", "Redis Pub/Sub", "STOMP", "WebSocket"]
    },
    {
      title: "Security & Observability",
      description: "Zero-trust principles, token-based authentication, real-time anomaly detection, and granular distributed tracing.",
      tags: ["OAuth2/OIDC", "JWT/Argon2id", "OpenTelemetry", "K-Means"]
    }
  ],
  engineeringPrinciples: [
    {
      title: "Evidence Over Hallucination",
      highlight: "INSUFFICIENT EVIDENCE Safety State",
      description: "The system prefers explicit uncertainty over hallucination. If telemetry does not establish root cause beyond doubt, it blocks automated speculation."
    },
    {
      title: "Deterministic Pre-Filtering",
      highlight: "Deterministic Engine Precedes AI",
      description: "Statistical and rule-based correlation engines process high-volume signals first so AI agents reason over verified patterns rather than raw noise."
    },
    {
      title: "Safe Agent Execution",
      highlight: "Read-Only Investigation Tools",
      description: "Automated AI investigation agents operate strictly with read-only inspection primitives, guaranteeing zero mutation of production infrastructure."
    }
  ]
};
