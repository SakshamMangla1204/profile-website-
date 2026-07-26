"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

import { Container } from "@/components/layout/container";

const experiences = [
  {
    role: "Cloud Engineering Intern",
    company: "F13 Technologies",
    duration: "Nov 2025 – Feb 2026",
    description:
      "Contributed to the development of cloud-native applications leveraging Amazon Web Services (AWS), including AWS Lambda, Amazon S3, DynamoDB, Cognito, and API Gateway. Worked on serverless architectures, secure authentication workflows, API-driven integrations, and scalable backend services while gaining hands-on experience with modern cloud engineering and deployment practices.",
  },
  {
    role: "Chief Executive Officer",
    company: "Entrepreneurship Cell, DCE Gurugram",
    duration: "May 2025 – Aug 2025",
    description:
      "Led the strategic direction of the Entrepreneurship Cell by overseeing organizational initiatives, managing cross-functional teams, and driving innovation-focused programs. Collaborated with founders, mentors, startups, and institutional stakeholders to strengthen the entrepreneurial ecosystem through leadership, operational planning, and execution.",
  },
  {
    role: "Chief Design Officer",
    company: "Entrepreneurship Cell, DCE Gurugram",
    duration: "Sep 2024 – Apr 2025",
    description:
      "Directed the organization's creative strategy by developing visual identities, branding assets, marketing campaigns, and digital content. Collaborated with leadership teams to translate organizational objectives into impactful visual communication while maintaining design consistency across all initiatives.",
  },
  {
    role: "Student Partner",
    company: "Internshala",
    duration: "Mar 2025 – Apr 2025",
    description:
      "Represented Internshala as a campus partner by promoting internships, career development initiatives, and professional learning opportunities. Executed outreach campaigns, increased student engagement, and facilitated awareness of skill development programs through strategic communication and community building.",
  },
  {
    role: "Python Intern",
    company: "Encryptix",
    duration: "Jul 2024 – Aug 2024",
    description:
      "Developed Python-based software solutions while strengthening programming fundamentals, debugging techniques, and software development practices. Contributed to application development, code optimization, and structured problem-solving within a collaborative development environment.",
  },
] as const;

export function PersonalJourneySection() {
  return (
    <section id="personal-journey" className="py-16 md:py-20 border-t border-white/[0.04]">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-white/[0.06]" />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
              Personal Journey
            </span>
            <span className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <h2 className="text-display-sm font-semibold text-white text-center md:text-display-md">
            My Path So Far
          </h2>
          <p className="mt-4 text-center text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            From engineering intern to engineering leader — each chapter shaped by curiosity, craft, and conviction.
          </p>

          <div className="relative mt-10">
            {/* Timeline line */}
            <div className="absolute left-[18px] top-2 bottom-2 w-px bg-white/[0.06] hidden md:block" />

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.role}-${exp.company}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative pl-[52px] md:pl-[52px]"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[10px] top-[6px] hidden md:flex h-[18px] w-[18px] items-center justify-center">
                    <span className="h-[10px] w-[10px] rounded-full bg-brand-300 shadow-[0_0_8px_rgba(139,92,246,0.35)]" />
                  </div>

                  {/* Timeline icon for mobile */}
                  <div className="absolute left-0 top-0 flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]">
                    <Briefcase className="h-4 w-4 text-brand-300" />
                  </div>

                  <div className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.06),transparent_40%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="relative z-10">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                      <div>
                        <h3 className="text-base font-medium text-white">
                          {exp.role}
                        </h3>
                        <p className="mt-0.5 text-sm text-brand-300/80">
                          {exp.company}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 shrink-0 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.duration}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}