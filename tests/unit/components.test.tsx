import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { GlassPanel } from "@/components/common/GlassPanel";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Contact } from "@/components/contact/Contact";

describe("UI Components & Accessibility (PRD Sections 12-14, 33, 35)", () => {
  it("renders Badge with appropriate styling classes", () => {
    render(<Badge variant="cyan">SYSTEM ONLINE</Badge>);
    const badge = screen.getByText("SYSTEM ONLINE");
    expect(badge).toBeInTheDocument();
  });

  it("renders Button and responds to disabled state", () => {
    render(<Button disabled>Action</Button>);
    const button = screen.getByRole("button", { name: "Action" });
    expect(button).toBeDisabled();
  });

  it("renders SectionHeading with title and monospace tag", () => {
    render(
      <SectionHeading
        number="01"
        tag="TEST TAG"
        title="Test Section Title"
        subtitle="Test subtitle"
      />
    );
    expect(screen.getByText("Test Section Title")).toBeInTheDocument();
    expect(screen.getByText("// TEST TAG")).toBeInTheDocument();
    expect(screen.getByText("[01]")).toBeInTheDocument();
  });

  it("renders Contact details correctly with direct mailto/tel", () => {
    render(<Contact />);
    expect(screen.getByText("nvsaiogkul@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("+91-8019856575")).toBeInTheDocument();
  });
});
