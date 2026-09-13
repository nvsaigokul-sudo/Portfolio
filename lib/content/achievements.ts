export interface AchievementRecord {
  title: string;
  organization: string;
  year: string;
  badge: string;
  description: string;
  highlights: string[];
}

export const achievementsData: AchievementRecord[] = [
  {
    title: "Amazon ML Challenge 2026",
    organization: "Amazon",
    year: "2026",
    badge: "National Competitor",
    description: "Participated in Amazon's prestigious national-level 72-hour Machine Learning Challenge, collaborating in a team to build an applied ML pipeline tackling a large-scale real-world problem using an Amazon-provided multimodal dataset.",
    highlights: [
      "Rapid feature engineering and exploratory data analysis across high-dimensional dataset",
      "Model experimentation, validation metric optimization, and failure-mode analysis",
      "Collaborative 72-hour engineering sprint under intense competitive conditions"
    ],
  },
];
