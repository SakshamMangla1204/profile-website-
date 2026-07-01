"use client";

import { motion } from "framer-motion";

const nodes = [
  { id: "core", x: 230, y: 168, size: 16, delay: 0 },
  { id: "memory", x: 122, y: 102, size: 11, delay: 0.1 },
  { id: "tools", x: 334, y: 88, size: 10, delay: 0.16 },
  { id: "orchestrator", x: 116, y: 242, size: 12, delay: 0.22 },
  { id: "reasoning", x: 330, y: 256, size: 12, delay: 0.28 },
  { id: "retrieval", x: 222, y: 58, size: 9, delay: 0.34 },
  { id: "agents", x: 230, y: 296, size: 10, delay: 0.4 },
  { id: "cloud", x: 394, y: 178, size: 9, delay: 0.46 },
  { id: "observability", x: 66, y: 170, size: 8, delay: 0.52 },
] as const;

const links = [
  ["core", "memory"],
  ["core", "tools"],
  ["core", "orchestrator"],
  ["core", "reasoning"],
  ["core", "retrieval"],
  ["core", "agents"],
  ["core", "cloud"],
  ["core", "observability"],
  ["memory", "retrieval"],
  ["orchestrator", "agents"],
  ["tools", "cloud"],
  ["reasoning", "agents"],
] as const;

const nodeMap = Object.fromEntries(nodes.map((node) => [node.id, node]));

export function AiNetwork() {
  return (
    <div className="relative mx-auto aspect-[1.1] w-full max-w-[32rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-soft-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_55%)]" />
      <div className="absolute inset-6 rounded-[1.5rem] border border-white/8" />
      <svg
        viewBox="0 0 460 340"
        className="relative z-10 h-full w-full"
        role="img"
        aria-label="Animated visualization of an autonomous AI system network"
      >
        <defs>
          <linearGradient id="network-link" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="50%" stopColor="rgba(226,232,240,0.34)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
          <radialGradient id="network-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
            <stop offset="40%" stopColor="rgba(203,213,225,0.92)" />
            <stop offset="100%" stopColor="rgba(71,85,105,0.18)" />
          </radialGradient>
          <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {links.map(([from, to], index) => {
            const start = nodeMap[from];
            const end = nodeMap[to];

            return (
              <motion.line
                key={`${from}-${to}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="url(#network-link)"
                strokeWidth="1.25"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.1 }}
                animate={{ pathLength: 1, opacity: [0.18, 0.42, 0.18] }}
                transition={{
                  pathLength: {
                    duration: 1,
                    delay: 0.1 + index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  opacity: {
                    duration: 3.6,
                    delay: index * 0.06,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                }}
              />
            );
          })}
        </motion.g>

        <motion.circle
          cx="230"
          cy="168"
          r="94"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeDasharray="8 14"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ transformOrigin: "230px 168px" }}
        />

        {nodes.map((node) => {
          const isCore = node.id === "core";

          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: [1, 1.04, 1],
              }}
              transition={{
                opacity: {
                  duration: 0.6,
                  delay: node.delay,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: {
                  duration: isCore ? 3.8 : 4.8,
                  delay: node.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              }}
            >
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={isCore ? 40 : node.size * 2.7}
                fill={isCore ? "rgba(255,255,255,0.08)" : "rgba(148,163,184,0.05)"}
                filter="url(#soft-glow)"
                animate={{
                  opacity: isCore ? [0.16, 0.34, 0.16] : [0.08, 0.14, 0.08],
                }}
                transition={{
                  duration: isCore ? 3.4 : 4.2,
                  delay: node.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill={isCore ? "url(#network-core)" : "rgba(255,255,255,0.92)"}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size + 1.5}
                fill="none"
                stroke={isCore ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)"}
              />
            </motion.g>
          );
        })}

        <motion.path
          d="M 86 276 C 126 248, 152 248, 194 282 S 288 318, 362 286"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3 12"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.12, 0.32, 0.12] }}
          transition={{
            pathLength: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
            opacity: {
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        />
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/45 to-transparent" />
    </div>
  );
}
