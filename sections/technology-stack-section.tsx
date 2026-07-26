"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { technologyStack } from "@/data/technology-stack";

export function TechnologyStackSection() {
  return (
    <section id="technology-stack" className="py-16 md:py-20 border-t border-white/[0.04]">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-white/[0.06]" />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
              Tech Stack
            </span>
            <span className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <h2 className="text-display-sm font-semibold text-white text-center md:text-display-md">
            A modern stack for intelligent systems
          </h2>
          <p className="mt-4 text-center text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            From agent orchestration and retrieval pipelines to cloud infrastructure and product delivery.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {technologyStack.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.4,
                  delay: categoryIndex * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.06),transparent_40%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative z-10">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-300/80">
                    {category.title}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {category.items.slice(0, 6).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[9px] text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                    {category.items.length > 6 && (
                      <span className="text-[9px] text-muted-foreground/50 self-center">
                        +{category.items.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
