"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Trophy, Rocket, Globe, Lightbulb, Building2, ChevronDown, ExternalLink } from "lucide-react";

import { Container } from "@/components/layout/container";

interface Milestone {
  id: string;
  icon: React.ElementType;
  title: string;
  organization: string;
  location?: string;
  year: string;
  description: string;
  tags: string[];
  details?: string;
}

const milestones: Milestone[] = [
  {
    id: "research-award",
    icon: Trophy,
    title: "Best Research Presentation Award",
    organization: "Research Fora International Conference",
    location: "Bali, Indonesia",
    year: "2024",
    description:
      "Honored with the Best Research Presentation Award in recognition of research and presentation excellence for \"Electric Vehicle Modelling for Future Technology and Market Penetration.\" The work explored emerging trends in electric mobility, technology adoption, and sustainable transportation, receiving recognition for its analytical depth, technical insight, and presentation excellence at an international conference.",
    tags: ["Research", "Electric Vehicles", "Innovation", "Sustainable Mobility", "Presentation Excellence"],
    details:
      "The research presented comprehensive modeling of EV adoption curves, market penetration strategies, and infrastructure requirements for sustainable transportation futures. The presentation was selected from over 200 international submissions.",
  },
  {
    id: "nec-finalist",
    icon: Rocket,
    title: "NEC '24 Finalist",
    organization: "E-Cell, IIT Bombay",
    year: "2025",
    description:
      "Selected as a finalist in the National Entrepreneurship Challenge conducted by E-Cell IIT Bombay, presenting innovative startup concepts while competing alongside entrepreneurial teams from across India. The experience strengthened my understanding of startup validation, business strategy, product thinking, and innovation.",
    tags: ["Entrepreneurship", "Startup", "Innovation", "Business Strategy", "Leadership"],
    details:
      "Competed against 500+ teams from across India. The challenge involved multiple rounds of pitching, business model validation, and investor presentations. Finalists were selected based on innovation, feasibility, and market potential.",
  },
  {
    id: "ideathon-haryana",
    icon: Lightbulb,
    title: "Ideathon Haryana 2024 Participant",
    organization: "Ideathon Haryana",
    year: "2024",
    description:
      "Participated in Ideathon Haryana 2024, presenting an innovative solution focused on addressing real-world societal challenges. Collaborated in a competitive innovation environment that emphasized product ideation, problem-solving, and technology-driven thinking while engaging with mentors and fellow innovators from diverse backgrounds.",
    tags: ["Innovation", "Ideathon", "Product Thinking", "Problem Solving", "Design Thinking"],
    details:
      "The ideathon brought together innovative minds to solve pressing societal challenges. Developed a comprehensive solution addressing real-world problems through technology and design thinking methodologies.",
  },
  {
    id: "ieee-smart-cities",
    icon: Globe,
    title: "IEEE Smart Cities Challenge",
    organization: "IEEE Smart Cities",
    year: "2023",
    description:
      "Led Team Nohmera to secure a Top 7 position among more than 205 participating teams by presenting an innovative smart mobility solution focused on portable electric vehicle charging infrastructure. The competition emphasized innovation, urban mobility, and sustainable transportation technologies.",
    tags: ["Smart Cities", "Innovation", "Leadership", "Electric Vehicles", "Mobility"],
    details:
      "Team Nohmera developed a comprehensive solution for portable EV charging infrastructure addressing urban mobility challenges. The solution integrated IoT, mobile technology, and sustainable energy systems.",
  },
  {
    id: "startup-idea",
    icon: Lightbulb,
    title: "Startup Idea Presentation",
    organization: "Dronacharya College of Engineering",
    year: "2023",
    description:
      "Presented Nohmera, an on-demand portable electric vehicle charging platform designed to improve charging accessibility through technology-driven mobility solutions. The concept focused on connecting EV users with portable charging assistance using a seamless digital platform.",
    tags: ["Product Design", "Startup", "Innovation", "Electric Vehicles", "Entrepreneurship"],
    details:
      "Nohmera was conceptualized as a solution to the EV charging infrastructure gap. The platform connected EV owners with portable charging service providers through a mobile application, enabling on-demand charging services.",
  },
  {
    id: "think-startup",
    icon: Building2,
    title: "Think Startup Program",
    organization: "IIT Delhi",
    year: "2022",
    description:
      "Participated in the Think Startup Program at IIT Delhi, collaborating on product ideation, customer-centric problem solving, business model development, and entrepreneurial thinking. The experience provided early exposure to startup ecosystems and innovation methodologies.",
    tags: ["Entrepreneurship", "Innovation", "Business", "Ideation", "Product Thinking"],
    details:
      "An intensive program covering startup fundamentals, design thinking, lean startup methodologies, and business model canvas. Collaborated with peers from diverse backgrounds to develop and pitch startup concepts.",
  },
];

const stats = [
  { value: "5+", label: "National & International Recognitions" },
  { value: "3", label: "Startup & Innovation Programs" },
  { value: "Top 7", label: "National Innovation Ranking" },
  { value: "1", label: "International Research Recognition" },
];

export function MilestonesSection() {
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);

  return (
    <section id="milestones" className="py-16 md:py-20 border-t border-white/[0.04]">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-white/[0.06]" />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
              Milestones & Recognition
            </span>
            <span className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <h2 className="text-display-sm font-semibold text-gradient text-center md:text-display-md">
            Milestones & Recognition
          </h2>
          <p className="mt-4 text-center text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Every milestone represents a step in my journey—from entrepreneurship and product innovation to research, cloud engineering, and AI systems. Together, these experiences reflect my passion for solving meaningful problems, embracing continuous learning, and building technology with real-world impact.
          </p>

          {/* Statistics Row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-5 text-center hover:border-white/[0.10] transition-colors"
              >
                <div className="text-2xl md:text-3xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1.5 text-[10px] md:text-xs text-muted-foreground leading-relaxed">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline */}
          <div className="relative mt-12">
            {/* Timeline line */}
            <div className="absolute left-[18px] md:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-300/30 via-white/[0.08] to-transparent hidden md:block" />

            <div className="space-y-6 md:space-y-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isExpanded = expandedMilestone === milestone.id;

                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative pl-[52px] md:pl-[60px]"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[10px] md:left-[11px] top-[6px] hidden md:flex h-[18px] w-[18px] items-center justify-center">
                      <span className="h-[10px] w-[10px] rounded-full bg-brand-300 shadow-[0_0_8px_rgba(139,92,246,0.35)]" />
                    </div>

                    {/* Mobile icon */}
                    <div className="absolute left-0 top-0 flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]">
                      <Icon className="h-4 w-4 text-brand-300" />
                    </div>

                    {/* Card */}
                    <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.06),transparent_40%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start gap-3 md:gap-4">
                          {/* Desktop icon */}
                          <div className="hidden md:flex shrink-0 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-brand-300 shadow-inner-line">
                            <Icon className="h-5 w-5 md:h-6 md:w-6" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                              <div className="flex-1">
                                <h3 className="text-base md:text-lg font-medium text-white">
                                  {milestone.title}
                                </h3>
                                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                                  <span className="text-brand-300/80">{milestone.organization}</span>
                                  {milestone.location && (
                                    <>
                                      <span className="text-white/20">•</span>
                                      <span>{milestone.location}</span>
                                    </>
                                  )}
                                  <span className="text-white/20">•</span>
                                  <span>{milestone.year}</span>
                                </div>
                              </div>
                            </div>

                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                              {milestone.description}
                            </p>

                            {/* Tags */}
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {milestone.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Expand button */}
                            {milestone.details && (
                              <button
                                onClick={() => setExpandedMilestone(isExpanded ? null : milestone.id)}
                                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brand-300/80 hover:text-brand-300 transition-colors"
                              >
                                <span>{isExpanded ? "Hide" : "Read more"}</span>
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronDown className="h-3.5 w-3.5" />
                                </motion.div>
                              </button>
                            )}

                            {/* Expandable details */}
                            <AnimatePresence>
                              {isExpanded && milestone.details && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-4 rounded-lg border border-white/[0.04] bg-white/[0.02] p-4">
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                      {milestone.details}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Subtle visual element */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mt-12 flex items-center justify-center gap-3 text-muted-foreground/40"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/10" />
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/10" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}