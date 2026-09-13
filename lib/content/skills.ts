export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    icon?: string;
    note?: string;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    description: "Core programming and query languages used for system implementation",
    skills: [
      { name: "Java", note: "Primary language" },
      { name: "Python", note: "ML & scripting" },
      { name: "SQL", note: "Complex queries & schema design" },
      { name: "Kotlin", note: "Modern JVM features" },
      { name: "C++", note: "Systems foundation" },
    ],
  },
  {
    category: "Backend",
    description: "Application frameworks, protocols, and microservice architectures",
    skills: [
      { name: "Spring Boot", note: "Enterprise services" },
      { name: "REST APIs", note: "Contract-first design" },
      { name: "WebSocket", note: "Bi-directional streaming" },
    ],
  },
  {
    category: "Databases",
    description: "Relational, in-memory caching, and vector indexing engines",
    skills: [
      { name: "PostgreSQL", note: "Primary relational & pgvector" },
      { name: "MySQL", note: "Relational storage" },
      { name: "Redis", note: "Caching & Pub/Sub" },
    ],
  },
  {
    category: "DevOps & Tools",
    description: "Containerization, version control, and deployment pipelines",
    skills: [
      { name: "Docker", note: "Containerization" },
      { name: "Git", note: "Version control & workflows" },
      { name: "CI/CD", note: "Automated pipelines" },
    ],
  },
  {
    category: "Messaging & AI",
    description: "Distributed message queues, workflow automation, and LLM integrations",
    skills: [
      { name: "Kafka", note: "Event-driven telemetry ingestion" },
      { name: "n8n", note: "Workflow orchestration" },
      { name: "Google Gemini AI", note: "Contextual reasoning & threat analysis" },
      { name: "Groq AI", note: "Low-latency inference" },
    ],
  },
];
