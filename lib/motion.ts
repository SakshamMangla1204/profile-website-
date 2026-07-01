import type { Variants } from "framer-motion";

export const durations = {
  fast: 0.28,
  base: 0.45,
  slow: 0.72,
} as const;

export const easings = {
  smooth: [0.22, 1, 0.36, 1] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.base,
      ease: easings.smooth,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: durations.base,
      ease: easings.smooth,
    },
  },
};

export const staggerContainer = (staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren: 0.04,
    },
  },
});
