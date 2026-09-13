export interface TrainingRecord {
  title: string;
  provider: string;
  duration: string;
  description: string;
  technologies: string[];
}

export const trainingData: TrainingRecord[] = [
  {
    title: "Java Full Stack Development",
    provider: "Professional Training Program",
    duration: "June 2025 – July 2025",
    description: "Hands-on immersion in enterprise Java architecture, full-lifecycle Spring Boot backend engineering, transactional persistence layers, and RESTful API services.",
    technologies: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "Spring MVC",
      "Spring Data JPA",
      "JDBC",
      "JPA",
      "H2",
      "PostgreSQL",
      "HTML",
      "CSS",
      "Git",
    ],
  },
];
