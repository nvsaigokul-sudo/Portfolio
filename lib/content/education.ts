export interface EducationRecord {
  institution: string;
  program: string;
  dates: string;
  score: string;
  scoreLabel: string;
  location: string;
  status: "Current" | "Completed";
  description: string;
}

export const educationData: EducationRecord[] = [
  {
    institution: "Lovely Professional University",
    program: "B.Tech, Computer Science & Engineering",
    dates: "Aug 2024 – Present",
    score: "7.13",
    scoreLabel: "CGPA",
    location: "Phagwara, Punjab",
    status: "Current",
    description: "Specializing in software systems, distributed computing, database management, and intelligent software engineering.",
  },
  {
    institution: "Venkateswara Perumal College",
    program: "Diploma, Computer Science & Engineering",
    dates: "Aug 2021 – Mar 2024",
    score: "7.56",
    scoreLabel: "CGPA",
    location: "Tirupathi, Andhra Pradesh",
    status: "Completed",
    description: "Built strong foundations in core computer science, data structures, algorithms, object-oriented programming, and relational databases.",
  },
  {
    institution: "Veda Vyasa Vidya Nikethan High School",
    program: "Matriculation (Secondary Education)",
    dates: "Jun 2020 – Mar 2021",
    score: "100%",
    scoreLabel: "Score",
    location: "Tirupathi, Andhra Pradesh",
    status: "Completed",
    description: "Achieved maximum score (100%) in secondary school matriculation examinations.",
  },
];
