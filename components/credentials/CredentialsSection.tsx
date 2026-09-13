import React from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TrainingCard } from "@/components/credentials/TrainingCard";
import { CertificationCard } from "@/components/credentials/CertificationCard";
import { AchievementCard } from "@/components/credentials/AchievementCard";
import { certificationsData } from "@/lib/content/certifications";

export function CredentialsSection() {
  return (
    <section
      id="achievements"
      aria-label="Training, Certifications, and Achievements"
      className="relative py-24 sm:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Achievements Section */}
        <div>
          <SectionHeading
            number="04"
            tag="COMPETITIONS & RECOGNITION"
            title="Engineering Challenges & Milestones"
            subtitle="Participation in national-level competitive engineering and hackathon sprints."
          />
          <AchievementCard />
        </div>

        {/* Training Section */}
        <div id="training">
          <SectionHeading
            number="05"
            tag="PROFESSIONAL TRAINING"
            title="Full-Stack Enterprise Specialization"
            subtitle="Intensive immersion in Java, Spring Boot microservices, and persistence systems."
          />
          <TrainingCard />
        </div>

        {/* Certifications Grid */}
        <div id="certifications">
          <SectionHeading
            number="06"
            tag="CREDENTIALS"
            title="Certifications & Validated Studies"
            subtitle="Verified coursework spanning Generative AI, LLM prompting, and autonomous workflows."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificationsData.map((cert) => (
              <CertificationCard key={cert.title} certification={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
