"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/layout/container";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollState } from "@/hooks/use-scroll-state";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScrollState(18);
  const { activeSection, setActiveSection } = useActiveSection(navigation.main);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNavigate = (href: string) => {
    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);
    setActiveSection(sectionId);
    setIsOpen(false);
    if (!element) {
      window.history.replaceState(null, "", href);
      return;
    }
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Container className="pt-4">
          <motion.div
            animate={{
              backdropFilter: isScrolled ? "blur(20px)" : "blur(12px)",
              backgroundColor: isScrolled
                ? "rgba(10, 14, 21, 0.72)"
                : "rgba(10, 14, 21, 0.42)",
              borderColor: isScrolled
                ? "rgba(255, 255, 255, 0.10)"
                : "rgba(255, 255, 255, 0.06)",
              boxShadow: isScrolled
                ? "0 18px 40px rgba(0, 0, 0, 0.24)"
                : "0 8px 24px rgba(0, 0, 0, 0.12)",
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-3"
          >
            <Link
              href="#home"
              className="inline-flex items-center gap-3 rounded-full px-3 py-2"
              onClick={(e) => { e.preventDefault(); handleNavigate("#home"); }}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-black"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Input node */}
                  <circle cx="7" cy="7" r="2.5" fill="currentColor" stroke="none" />
                  {/* Output node */}
                  <circle cx="17" cy="17" r="2.5" fill="currentColor" stroke="none" />
                  {/* Middle processing node */}
                  <circle cx="12" cy="12" r="1.5" fill="none" />
                  {/* Flow lines */}
                  <path d="M9.5 9.5L12 12" />
                  <path d="M12 12L14.5 14.5" />
                  <path d="M7 9.5V12C7 12 7 14 10 14" strokeDasharray="1.5 1.5" />
                  <path d="M17 14.5V12C17 12 17 10 14 10" strokeDasharray="1.5 1.5" />
                </svg>
              </span>
              <span className="hidden text-[15px] font-semibold tracking-wide text-white sm:inline-flex">
                {siteConfig.name}
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navigation.main.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => handleNavigate(item.href)}
                    className={cn(
                      "relative inline-flex items-center rounded-full px-4 py-1.5 text-sm transition-colors",
                      isActive ? "text-white" : "text-muted-foreground hover:text-white"
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </motion.div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <Container className="pt-24">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-2xl"
              >
                <nav className="flex flex-col gap-1">
                  {navigation.main.map((item, index) => {
                    const sectionId = item.href.replace("#", "");
                    const isActive = activeSection === sectionId;
                    return (
                      <motion.button
                        key={item.href}
                        type="button"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.22, delay: index * 0.03 }}
                        onClick={() => handleNavigate(item.href)}
                        className={cn(
                          "rounded-xl px-4 py-3 text-left text-sm transition-colors",
                          isActive
                            ? "bg-white/[0.06] text-white"
                            : "text-muted-foreground hover:bg-white/[0.04] hover:text-white"
                        )}
                      >
                        {item.label}
                      </motion.button>
                    );
                  })}
                </nav>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}