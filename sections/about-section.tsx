"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { BrainCircuit, Workflow, Boxes } from "lucide-react";

const focusAreas = [
  {
    icon: BrainCircuit,
    title: "Autonomous AI Systems",
    description: "Systems that reason through multi-step tasks, coordinate tools, and make reliable progress across real product flows.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Retrieval pipelines and agent orchestration that reduce manual work and improve operational speed.",
  },
  {
    icon: Boxes,
    title: "Production-Ready Delivery",
    description: "Architecture, observability, and maintainability so AI features ship as dependable products, not fragile demos.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 border-t border-white/[0.04]">
      <Container>
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-white/[0.06]" />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
              About
            </span>
            <span className="h-px flex-1 bg-white/[0.06]" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-display-sm font-semibold text-white text-center md:text-display-md"
          >
            Building Intelligent Software
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-center text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto"
          >
            I design autonomous systems that can interpret context, access
            knowledge, coordinate workflows, and deliver useful outcomes inside
            software people actually depend on. I approach AI as a systems problem.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="mt-8 grid gap-3 sm:grid-cols-3"
          >
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  variants={itemVariants}
                  className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                >
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.06),transparent_40%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="relative z-10">
                    <Icon className="h-5 w-5 text-brand-300 mb-3" />
                    <h3 className="text-sm font-medium text-white">{area.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {area.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}