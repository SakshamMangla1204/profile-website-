"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/data/site-config";

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

function GmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" fill="#EA4335" />
      <path d="M22 6l-10 7L2 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#333">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const contactLinks = [
  {
    label: "Email (Primary)",
    href: `mailto:${siteConfig.email}`,
    value: siteConfig.email,
    icon: GmailIcon,
  },
  {
    label: "Email (Secondary)",
    href: `mailto:${siteConfig.emailAlt}`,
    value: siteConfig.emailAlt,
    icon: GmailIcon,
  },
  {
    label: "GitHub",
    href: siteConfig.github,
    value: "View profile",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    value: "Connect professionally",
    icon: LinkedInIcon,
  },
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-20 border-t border-white/[0.04]">
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
              Contact
            </span>
            <span className="h-px flex-1 bg-white/[0.06]" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-display-sm font-semibold text-gradient text-center md:text-display-md"
          >
            Let's Build Together
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-center text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto"
          >
            If you are exploring agentic AI products, workflow automation, or
            production-grade intelligent software, I'm always open to
            thoughtful conversations and ambitious builds.
          </motion.p>

          <motion.div variants={containerVariants} className="mt-8 flex flex-wrap justify-center gap-3">
            <motion.div variants={itemVariants}>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white text-black px-6 text-sm font-medium shadow-lg transition-all hover:bg-white/90 hover:-translate-y-0.5"
              >
                Email Me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-medium text-foreground transition-all hover:bg-white/[0.08] hover:-translate-y-0.5"
              >
                <FileText className="h-4 w-4" />
                Resume
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {contactLinks.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} variants={itemVariants}>
                  <Link
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-white transition-colors"
                  >
                    <span className="opacity-80 group-hover/link:opacity-100 transition-opacity">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">{item.value}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}