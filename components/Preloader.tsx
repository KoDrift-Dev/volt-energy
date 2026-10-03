"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION = 2800;
const VOLT = "#7CFF00";
const CORE = "#F2FFD8";

type Spark = {
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
};

/** Slim jagged claw slashes — narrow torn strips, sharp zigzag edges, clearly separated. */
const SLASHES = [
  "M32,8 L34,16 L30,22 L34,30 L30,38 L34,46 L29,54 L33,62 L28,70 L32,78 L28,86 L32,94 L28,102 L31,110 L37,108 L34,100 L38,92 L34,84 L38,76 L33,68 L37,60 L33,52 L37,44 L32,36 L36,28 L33,20 L37,12 Z",
  "M56,4 L58,14 L54,20 L58,28 L54,36 L58,44 L53,52 L57,60 L52,68 L56,76 L52,84 L56,92 L51,100 L54,108 L52,116 L59,114 L58,106 L62,98 L58,90 L62,82 L57,74 L61,66 L57,58 L61,50 L56,42 L60,34 L57,26 L61,18 L58,10 Z",
  "M82,10 L84,18 L80,24 L84,32 L80,40 L84,48 L79,56 L83,64 L78,72 L82,80 L78,88 L82,96 L79,104 L83,110 L88,106 L85,98 L89,90 L85,82 L89,74 L84,66 L88,58 L84,50 L88,42 L83,34 L87,26 L84,18 L87,12 Z",
];

/** Deterministic pseudo-random so SSR and client render the same sparks. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, DURATION);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  const sparks = useMemo<Spark[]>(() => {
    const r = seeded(7);
    return Array.from({ length: 12 }, () => ({
      x: (r() - 0.5) * 300,
      size: 1.2 + r() * 2.2,
      delay: r() * 2.2,
      duration: 1.6 + r() * 1.6,
      drift: (r() - 0.5) * 50,
      opacity: 0.25 + r() * 0.35,
    }));
  }, []);

  const beams = useMemo(() => [-30, -18, -7, 7, 18, 30], []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-black"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Slim volumetric light beams bursting upward from WITHIN the marks */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {beams.map((angle, i) => (
              <motion.div
                key={i}
                className="absolute bottom-[-4vh] left-1/2 h-[48vh] w-3 origin-bottom"
                style={{
                  marginLeft: -6,
                  background: `linear-gradient(to top, ${VOLT}55 0%, ${VOLT}12 50%, transparent 90%)`,
                  filter: "blur(8px)",
                  transform: `rotate(${angle}deg)`,
                }}
                initial={{ opacity: 0, scaleY: 0.35 }}
                animate={{
                  opacity: [0, 0.7, 0.45, 0.7, 0.5],
                  scaleY: [0.35, 1, 0.85, 1, 0.92],
                }}
                transition={{
                  duration: 2.6,
                  delay: 0.3 + i * 0.09,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Tight bloom hugging the marks only — never floods the background */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[26vh] w-[26vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${VOLT}1f 0%, ${VOLT}0d 45%, transparent 72%)`,
              filter: "blur(14px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.55, 0.4, 0.55], scale: [0.6, 1.05, 1, 1.03] }}
            transition={{ duration: 2.6, delay: 0.25, ease: "easeInOut" }}
          />

          {/* The three slim slash marks — white-hot core, tight neon glow */}
          <motion.svg
            viewBox="0 0 120 120"
            className="absolute left-1/2 top-1/2 h-[32vh] w-auto -translate-x-1/2 -translate-y-1/2 select-none"
            style={{
              filter:
                "drop-shadow(0 0 3px rgba(244,255,216,1)) drop-shadow(0 0 12px rgba(124,255,0,0.9)) drop-shadow(0 0 30px rgba(124,255,0,0.4))",
            }}
            animate={{ opacity: [1, 0.94, 1] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            aria-label="VOLT emblem"
          >
            {SLASHES.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill={CORE}
                stroke={CORE}
                strokeWidth={1.2}
                strokeLinejoin="miter"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{
                  pathLength: { duration: 0.9, delay: 0.2 + i * 0.16, ease: "easeInOut" },
                  fillOpacity: { duration: 0.45, delay: 0.75 + i * 0.16 },
                }}
              />
            ))}
          </motion.svg>

          {/* Faint sparks drifting up from the marks */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {sparks.map((s, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full"
                style={{
                  width: s.size,
                  height: s.size,
                  background: VOLT,
                  boxShadow: `0 0 6px 1px ${VOLT}55`,
                  left: `calc(50% + ${s.x}px)`,
                  top: "52%",
                  opacity: s.opacity,
                }}
                initial={{ y: 0, x: 0, opacity: 0 }}
                animate={{
                  y: -300,
                  x: s.drift,
                  opacity: [0, s.opacity, s.opacity * 0.8, 0],
                }}
                transition={{
                  duration: s.duration,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Final flash burst before exit — kept tight and brief */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 48%, #f4ffdc 0%, ${VOLT}44 40%, transparent 75%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0, 0.6, 0] }}
            transition={{ duration: 2.8, times: [0, 0.78, 0.86, 0.93, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
