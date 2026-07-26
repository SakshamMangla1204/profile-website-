"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { Container } from "@/components/layout/container";

const quoteLines = [
  "Great software doesn't simply respond.",
  "It understands.",
  "It reasons.",
  "It acts.",
] as const;

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-16 md:py-20 border-t border-white/[0.04]">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-white/[0.06]" />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
              Philosophy
            </span>
            <span className="h-px flex-1 bg-white/[0.06]" />
          </div>

          {/* Centered quote */}
          <div className="mx-auto max-w-2xl text-center">
            <Quote className="mx-auto h-8 w-8 text-brand-300/50 mb-4" />
            <blockquote className="text-center select-none">
              {quoteLines.map((line, index) => (
                <motion.span
                  key={line}
                  className="block text-display-sm font-semibold leading-tight md:text-display-md"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </blockquote>

            <motion.div
              className="mt-4 h-px w-12 mx-auto bg-brand-300/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <motion.div
              className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.06),transparent_40%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <h3 className="text-sm font-medium text-white">
                  Why Agentic AI is the next chapter
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Traditional software waits for explicit input and follows
                  predefined paths. Agentic AI changes that model by enabling
                  software to interpret intent, gather context, reason across
                  multiple steps, and take action with the right tools at the
                  right time.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.06),transparent_40%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    That shift matters because the products people need are no
                    longer just interfaces for commands. They are intelligent
                    systems that can support decisions, automate operations, and
                    complete complex work with greater autonomy.
                  </p>
                  <p>
                    The future is combining robust architecture, orchestration,
                    memory, retrieval, and reasoning into products that behave
                    less like static applications and more like capable
                    collaborators.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}