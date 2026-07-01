"use client";

import { motion } from "framer-motion";

const layers = [
  {
    id: "experience",
    label: "Product Interfaces",
    x: 72,
    y: 58,
    width: 268,
    height: 52,
    delay: 0.02,
  },
  {
    id: "agents",
    label: "Agent Orchestration",
    x: 112,
    y: 136,
    width: 188,
    height: 52,
    delay: 0.12,
  },
  {
    id: "reasoning",
    label: "Reasoning + Workflow Logic",
    x: 86,
    y: 214,
    width: 240,
    height: 52,
    delay: 0.22,
  },
  {
    id: "systems",
    label: "Data, Tools, and Cloud Systems",
    x: 58,
    y: 292,
    width: 296,
    height: 52,
    delay: 0.32,
  },
] as const;

const rails = [
  { x1: 206, y1: 110, x2: 206, y2: 136, delay: 0.18 },
  { x1: 206, y1: 188, x2: 206, y2: 214, delay: 0.28 },
  { x1: 206, y1: 266, x2: 206, y2: 292, delay: 0.38 },
] as const;

const satellites = [
  { x: 360, y: 86, r: 9, delay: 0.2 },
  { x: 38, y: 162, r: 7, delay: 0.26 },
  { x: 370, y: 238, r: 8, delay: 0.34 },
  { x: 38, y: 316, r: 7, delay: 0.42 },
] as const;

export function AiArchitecture() {
  return (
    <div className="relative mx-auto aspect-[0.98] w-full max-w-[30rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.10),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-soft-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_32%),radial-gradient(circle_at_70%_70%,rgba(148,163,184,0.06),transparent_28%)]" />
      <div className="absolute inset-7 rounded-[1.5rem] border border-white/8" />

      <svg
        viewBox="0 0 412 388"
        className="relative z-10 h-full w-full"
        role="img"
        aria-label="Animated illustration of an AI product architecture"
      >
        <defs>
          <linearGradient id="architecture-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="50%" stopColor="rgba(226,232,240,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
          <linearGradient id="architecture-panel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.09)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
          </linearGradient>
          <filter id="architecture-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.rect
          x="24"
          y="24"
          width="364"
          height="340"
          rx="28"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeDasharray="6 14"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        {rails.map((rail) => (
          <motion.line
            key={`${rail.y1}-${rail.y2}`}
            x1={rail.x1}
            y1={rail.y1}
            x2={rail.x2}
            y2={rail.y2}
            stroke="url(#architecture-stroke)"
            strokeWidth="1.25"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.18 }}
            animate={{ pathLength: 1, opacity: [0.18, 0.34, 0.18] }}
            transition={{
              pathLength: {
                duration: 0.7,
                delay: rail.delay,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 3.6,
                delay: rail.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          />
        ))}

        {layers.map((layer, index) => (
          <motion.g
            key={layer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: layer.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.rect
              x={layer.x}
              y={layer.y}
              width={layer.width}
              height={layer.height}
              rx="18"
              fill="url(#architecture-panel)"
              stroke="rgba(255,255,255,0.08)"
              animate={{
                opacity: [0.92, 1, 0.92],
              }}
              transition={{
                duration: 4.2 + index * 0.35,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.rect
              x={layer.x + 16}
              y={layer.y + 16}
              width={Math.min(layer.width * 0.44, 130)}
              height="6"
              rx="3"
              fill="rgba(255,255,255,0.9)"
              initial={{ scaleX: 0.5, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.45,
                delay: layer.delay + 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: `${layer.x + 16}px ${layer.y + 19}px` }}
            />
            <motion.rect
              x={layer.x + 16}
              y={layer.y + 30}
              width={Math.min(layer.width * 0.62, 178)}
              height="4"
              rx="2"
              fill="rgba(148,163,184,0.6)"
              initial={{ scaleX: 0.5, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.45,
                delay: layer.delay + 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: `${layer.x + 16}px ${layer.y + 32}px` }}
            />
            <text
              x={layer.x + 16}
              y={layer.y + 48}
              fill="rgba(226,232,240,0.92)"
              fontSize="12"
              letterSpacing="0.08em"
            >
              {layer.label}
            </text>
          </motion.g>
        ))}

        {satellites.map((satellite, index) => (
          <motion.g
            key={`${satellite.x}-${satellite.y}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [1, 1.08, 1] }}
            transition={{
              opacity: {
                duration: 0.55,
                delay: satellite.delay,
                ease: [0.22, 1, 0.36, 1],
              },
              scale: {
                duration: 3.8 + index * 0.4,
                delay: satellite.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          >
            <motion.circle
              cx={satellite.x}
              cy={satellite.y}
              r={satellite.r * 2.6}
              fill="rgba(255,255,255,0.05)"
              filter="url(#architecture-glow)"
              animate={{ opacity: [0.08, 0.18, 0.08] }}
              transition={{
                duration: 3.2,
                delay: satellite.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <circle
              cx={satellite.x}
              cy={satellite.y}
              r={satellite.r}
              fill="rgba(255,255,255,0.92)"
            />
          </motion.g>
        ))}

        <motion.path
          d="M 340 86 C 312 96, 296 108, 286 136"
          fill="none"
          stroke="url(#architecture-stroke)"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeDasharray="4 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.12, 0.28, 0.12] }}
          transition={{
            pathLength: { duration: 0.85, delay: 0.34, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />
        <motion.path
          d="M 66 162 C 86 162, 96 156, 112 146"
          fill="none"
          stroke="url(#architecture-stroke)"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeDasharray="4 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.12, 0.28, 0.12] }}
          transition={{
            pathLength: { duration: 0.85, delay: 0.42, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />
        <motion.path
          d="M 344 238 C 314 238, 304 248, 286 270"
          fill="none"
          stroke="url(#architecture-stroke)"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeDasharray="4 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.12, 0.28, 0.12] }}
          transition={{
            pathLength: { duration: 0.85, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />
        <motion.path
          d="M 66 316 C 92 316, 104 318, 126 318"
          fill="none"
          stroke="url(#architecture-stroke)"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeDasharray="4 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.12, 0.28, 0.12] }}
          transition={{
            pathLength: { duration: 0.85, delay: 0.58, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />
      </svg>
    </div>
  );
}
