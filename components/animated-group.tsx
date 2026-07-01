"use client";

import { motion } from "framer-motion";

import { motionPresets } from "@/animations/presets";
import { cn } from "@/lib/utils";

type AnimatedGroupProps = {
  children: React.ReactNode;
  className?: string;
  preset?: keyof typeof motionPresets;
};

export function AnimatedGroup({
  children,
  className,
  preset = "reveal",
}: AnimatedGroupProps) {
  const selectedPreset = motionPresets[preset];
  const items = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="show"
      variants={selectedPreset.container}
    >
      {items.map((child, index) => (
        <motion.div key={index} variants={selectedPreset.item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
