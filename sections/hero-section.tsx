import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

import { Container } from "@/components/layout/container";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-8">
      <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-400/30 to-transparent" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-300 animate-pulse" />
            AI Engineer &middot; Product Builder
          </div>

          <h1 className="text-balance text-display-sm font-semibold md:text-display-md lg:text-display-lg leading-[1.1]">
            <span className="text-gradient">Autonomous Systems.</span>
            <br />
            <span className="text-gradient">Intelligent Workflows.</span>
            <br />
            <span className="text-white">Real Products.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            I build autonomous AI systems that reason, retrieve knowledge,
            orchestrate tools, and automate complex workflows using modern LLM
            frameworks and scalable architecture.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="#contact"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white text-black px-6 text-sm font-medium shadow-lg transition-all hover:bg-white/90 hover:-translate-y-0.5"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#about"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-medium text-foreground transition-all hover:bg-white/[0.08] hover:-translate-y-0.5"
            >
              <Terminal className="h-4 w-4" />
              About Me
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {["Agentic AI", "Product Engineering", "Cloud-Native", "LLM Orchestration", "RAG Systems"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { value: "5+", label: "Years Building" },
              { value: "10+", label: "AI Systems" },
              { value: "3", label: "Core Stacks" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] py-3">
                <div className="text-sm font-semibold text-white">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}