"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Cloud, Server, Database, ChevronDown, Award } from "lucide-react";

import { Container } from "@/components/layout/container";

interface Certification {
  name: string;
}

interface CertificationCategory {
  title: string;
  description: string;
  icon: React.ElementType;
  certifications: Certification[];
}

const categories: CertificationCategory[] = [
  {
    title: "Cloud Foundations",
    description:
      "Built a strong understanding of AWS Cloud fundamentals, cloud economics, partner ecosystems, digital sovereignty, governance, and cloud adoption strategies through AWS Partner learning programs.",
    icon: Cloud,
    certifications: [
      { name: "AWS Partner: Cloud Economics Essentials" },
      { name: "AWS Partner: Accreditation" },
      { name: "AWS Partner: Digital Sovereignty on AWS (Technical)" },
    ],
  },
  {
    title: "Cloud Infrastructure & Modern Deployment",
    description:
      "Expanded expertise in cloud-native infrastructure, workload migration strategies, serverless computing, and containerized application deployment using AWS best practices.",
    icon: Server,
    certifications: [
      { name: "AWS Partner: Containers on AWS (Technical)" },
      { name: "AWS Partner: Migrating Workloads to AWS (Technical)" },
    ],
  },
  {
    title: "Data Analytics & AI",
    description:
      "Strengthened knowledge of analytics pipelines, cloud-based data engineering, AI workflows, and modern data processing concepts through AWS learning pathways.",
    icon: Database,
    certifications: [
      { name: "Data Scientist Learning Plan (Partner)" },
      { name: "Fundamentals of Analytics on AWS – Part 1" },
      { name: "Fundamentals of Analytics on AWS – Part 2" },
    ],
  },
];

const learningTracks = ["Cloud Engineering", "Infrastructure", "Analytics"];

export function CertificationsSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section id="certifications" className="py-16 md:py-20 border-t border-white/[0.04]">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-white/[0.06]" />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
              Continuous Learning
            </span>
            <span className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <h2 className="text-display-sm font-semibold text-white text-center md:text-display-md">
            Continuous Learning & Certifications
          </h2>
          <p className="mt-4 text-center text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            I believe great engineers are continuous learners. Alongside building production-oriented AI systems, I actively expand my expertise through industry-recognized AWS Partner learning paths focused on cloud engineering, infrastructure, analytics, and modern application development.
          </p>

          {/* Statistics Row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid grid-cols-3 gap-4 md:gap-6"
          >
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-semibold text-white">8+</div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground">AWS Partner Certifications</div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-semibold text-white">3</div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground">Learning Tracks</div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-6">
              <div className="text-xs font-medium text-brand-300/80 mb-2">Specializations</div>
              <div className="flex flex-wrap gap-1 justify-center">
                {learningTracks.map((track) => (
                  <span
                    key={track}
                    className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {track}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certification Cards */}
          <div className="mt-8 grid gap-4 md:gap-5">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isExpanded = expandedCard === index;

              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                >
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.06),transparent_40%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="shrink-0 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-brand-300 shadow-inner-line">
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-base md:text-lg font-medium text-white">
                              {category.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {category.description}
                            </p>
                          </div>
                          <div className="shrink-0 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-muted-foreground">
                            <Award className="h-3 w-3" />
                            {category.certifications.length}
                          </div>
                        </div>

                        {/* Expand Button */}
                        <button
                          onClick={() => setExpandedCard(isExpanded ? null : index)}
                          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brand-300/80 hover:text-brand-300 transition-colors"
                        >
                          <span>{isExpanded ? "Hide" : "View"} certifications</span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-3.5 w-3.5" />
                          </motion.div>
                        </button>

                        {/* Expandable Certifications List */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 space-y-2">
                                {category.certifications.map((cert, certIndex) => (
                                  <motion.div
                                    key={cert.name}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: certIndex * 0.05,
                                      ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="flex items-start gap-2.5 rounded-lg border border-white/[0.04] bg-white/[0.02] p-3"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300/60" />
                                    <span className="text-sm text-muted-foreground leading-relaxed">
                                      {cert.name}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Subtle AWS-inspired visual element */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mt-12 flex items-center justify-center gap-3 text-muted-foreground/40"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/10" />
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3L4 9v12h16V9l-8-6z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/10" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}