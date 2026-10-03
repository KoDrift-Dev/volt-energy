"use client";

import { motion } from "framer-motion";

/**
 * Original VOLT emblem — three jagged, torn vertical slashes
 * in neon green. Drawn from scratch as an inline SVG; no
 * third-party brand assets are used.
 */
export default function SlashMark({
  className = "",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  const slashes = [
    // Left slash — torn edges, slightly shorter
    "M28,10 L44,12 L40,30 L48,34 L38,52 L46,56 L36,76 L42,82 L34,110 L28,106 L32,84 L26,78 L34,60 L28,54 L36,36 L30,30 Z",
    // Middle slash — tallest, dominant
    "M54,4 L70,6 L66,26 L74,30 L64,50 L72,54 L62,76 L68,82 L60,116 L54,112 L58,88 L52,82 L60,62 L54,56 L62,38 L56,32 Z",
    // Right slash — torn edges
    "M80,10 L96,12 L92,32 L100,36 L90,56 L98,60 L88,80 L94,86 L86,108 L80,104 L84,84 L78,78 L86,60 L80,54 L88,36 L82,30 Z",
  ];

  return (
    <svg viewBox="0 0 120 120" className={className} aria-label="VOLT emblem">
      {slashes.map((d, i) =>
        animated ? (
          <motion.path
            key={i}
            d={d}
            fill="#7CFF00"
            stroke="#7CFF00"
            strokeWidth={2}
            strokeLinejoin="round"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 1 }}
            transition={{
              pathLength: { duration: 1.1, delay: i * 0.18, ease: "easeInOut" },
              fillOpacity: { duration: 0.5, delay: 0.9 + i * 0.18 },
            }}
          />
        ) : (
          <path key={i} d={d} fill="#7CFF00" />
        ),
      )}
    </svg>
  );
}
