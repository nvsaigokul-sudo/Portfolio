export interface CertificationRecord {
  title: string;
  issuer: string;
  issueDate: string;
  category: string;
  description: string;
  credentialUrl?: string | null;
}

export const certificationsData: CertificationRecord[] = [
  {
    title: "Master Generative AI & Generative AI Tools",
    issuer: "Infosys Springboard",
    issueDate: "December 2025",
    category: "Generative AI",
    description: "Deep dive into foundational GenAI concepts, LLM architectures, fine-tuning, embeddings, and enterprise generative toolchains.",
    credentialUrl: null, // TODO — Add credential URL if available
  },
  {
    title: "ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM",
    issuer: "Specialized AI Certification",
    issueDate: "September 2025",
    category: "Prompt Engineering",
    description: "Advanced structured prompting methodologies, few-shot patterns, system instruction architectures, and zero-shot reasoning evaluation.",
    credentialUrl: null,
  },
  {
    title: "Build Generative AI Apps with No-Code Tools",
    issuer: "AI Solutions Program",
    issueDate: "August 2025",
    category: "Applied AI",
    description: "Architecting automated AI agent pipelines, webhook integrations, and vector retrieval using visual orchestration platforms.",
    credentialUrl: null,
  },
];
