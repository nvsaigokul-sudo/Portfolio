import React from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TimelineItem } from "@/components/timeline/TimelineItem";
import { educationData } from "@/lib/content/education";

export function Timeline() {
  return (
    <section
      id="education"
      aria-label="Academic Background & Education"
      className="relative py-24 sm:py-32 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="07"
          tag="ACADEMIC BACKGROUND"
          title="Education & Foundations"
          subtitle="Formal computer science coursework and academic progress from matriculation to undergraduate degree."
        />

        <div className="relative mt-8">
          {educationData.map((record, idx) => (
            <TimelineItem
              key={record.institution}
              item={record}
              isLast={idx === educationData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
