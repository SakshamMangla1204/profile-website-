import { fadeIn, fadeUp, staggerContainer } from "@/lib/motion";

export const motionPresets = {
  hero: {
    container: staggerContainer(0.1),
    item: fadeUp,
  },
  reveal: {
    container: staggerContainer(0.08),
    item: fadeUp,
  },
  subtle: {
    container: staggerContainer(0.06),
    item: fadeIn,
  },
} as const;
