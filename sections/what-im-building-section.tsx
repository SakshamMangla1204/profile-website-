"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { ExternalLink, GitBranch, Database, Activity } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const projects = [
  {
    icon: GitBranch,
    title: "Agentic Workflow Engine",
    description: "A multi-agent orchestration system that coordinates LLM agents for complex business workflows with built-in observability and error recovery.",
    tags: ["TypeScript", "LangChain", "PostgreSQL", "Docker"],
    status: "Active",
  },
  {
    icon: Database,
    title: "Knowledge Retrieval Pipeline",
    description: "Hybrid search system combining vector embeddings with structured data for accurate, context-aware knowledge retrieval at scale.",
    tags: ["Python", "ChromaDB", "OpenAI", "FastAPI"],
    status: "Active",
  },
  {
    icon: Activity,
    title: "AI Infrastructure Monitor",
    description: "Real-time monitoring and alerting for LLM-based systems, tracking latency, token usage, and response quality across deployments.",
    tags: ["React", "Node.js", "Prometheus", "Grafana"],
    status: "Beta",
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

export function WhatImBuildingSection() {
  return (
    <section id="projects" className="py-16 md:py-20 border-t border-white/[0.04]">
      <Container>
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-white/[0.06]" />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
              Projects
            </span>
            <span className="h-px flex-1 bg-white/[0.06]" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-display-sm font-semibold text-white text-center md:text-display-md"
          >
            What I'm Building
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-center text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto"
          >
            Each project reflects a different layer of the AI stack: from agent
            orchestration and retrieval to infrastructure and product delivery.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="mt-8 grid gap-3 sm:grid-cols-3"
          >
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.10] transition-colors group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="h-5 w-5 text-brand-300" />
                    <span className="text-[10px] uppercase tracking-wider text-cyan-400/70 font-medium">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* GitHub link */}
          <motion.div variants={itemVariants} className="mt-6 text-center">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-white transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View more on GitHub
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}