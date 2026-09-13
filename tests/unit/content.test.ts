import { describe, it, expect } from "vitest";
import { profileData } from "@/lib/content/profile";
import { skillsData } from "@/lib/content/skills";
import { achievementsData } from "@/lib/content/achievements";
import { educationData } from "@/lib/content/education";
import { resolveiqData } from "@/lib/content/projects/resolveiq";
import { cyberSentinelData } from "@/lib/content/projects/cyberSentinel";

describe("Content Integrity & Accuracy (PRD Sections 7-9, 27-31)", () => {
  it("verifies personal profile details match PRD verbatim", () => {
    expect(profileData.name).toBe("N V Sai Gokul");
    expect(profileData.email).toBe("nvsaiogkul@gmail.com");
    expect(profileData.phone).toBe("+91-8019856575");
    expect(profileData.role).toBe("Backend / AI-ML Engineer");
    expect(profileData.linkedInUrl).toBeNull(); // Verified TODO
    expect(profileData.githubUrl).toBeNull();   // Verified TODO
  });

  it("verifies skills contain zero fabricated proficiency percentages", () => {
    const allSkills = skillsData.flatMap((cat) => cat.skills);
    expect(allSkills.length).toBeGreaterThan(10);
    // Ensure no percentage symbols or fake 1-100 scores
    allSkills.forEach((skill) => {
      expect((skill as any).percentage).toBeUndefined();
      expect((skill as any).level).toBeUndefined();
    });
  });

  it("verifies Amazon ML Challenge contains participation only without fake rankings", () => {
    const mlChallenge = achievementsData[0];
    expect(mlChallenge.organization).toBe("Amazon");
    expect(mlChallenge.description).toContain("Participated in Amazon");
    expect(mlChallenge.description.toLowerCase()).not.toContain("won");
    expect(mlChallenge.description.toLowerCase()).not.toContain("first place");
  });

  it("verifies education credentials match PRD Section 31", () => {
    expect(educationData).toHaveLength(3);
    expect(educationData[0].institution).toBe("Lovely Professional University");
    expect(educationData[0].score).toBe("7.13");
    expect(educationData[1].institution).toBe("Venkateswara Perumal College");
    expect(educationData[1].score).toBe("7.56");
    expect(educationData[2].institution).toBe("Veda Vyasa Vidya Nikethan High School");
    expect(educationData[2].score).toBe("100%");
  });

  it("verifies ResolveIQ architecture stages and simulation steps match PRD", () => {
    expect(resolveiqData.architectureStages).toHaveLength(13);
    expect(resolveiqData.simulationSteps).toHaveLength(13);
    expect(resolveiqData.insufficientEvidenceDemo.headline).toBe("INSUFFICIENT EVIDENCE");
  });

  it("verifies Cyber Sentinel has 4 threat simulation types", () => {
    expect(cyberSentinelData.threatTypes).toHaveLength(4);
    const threatIds = cyberSentinelData.threatTypes.map((t) => t.id);
    expect(threatIds).toContain("api_flood");
    expect(threatIds).toContain("brute_force");
    expect(threatIds).toContain("traffic_spike");
    expect(threatIds).toContain("suspicious_activity");
  });
});
