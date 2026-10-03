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

/** Original VOLT torn-slash paths (same emblem as SlashMark). */
const SLASHES = [
  "M28,10 L44,12 L40,30 L48,34 L38,52 L46,56 L36,76 L42,82 L34,110 L28,106 L32,84 L26,78 L34,60 L28,54 L36,36 L30,30 Z",
  "M54,4 L70,6 L66,26 L74,30 L64,50 L72,54 L62,76 L68,82 L60,116 L54,112 L58,88 L52,82 L60,62 L54,56 L62,38 L56,32 Z",
  "M80,10 L96,12 L92,32 L100,36 L90,56 L98,60 L88,80 L94,86 L86,108 L80,104 L84,84 L78,78 L86,60 L80,54 L88,36 L82,30 Z",
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
    return Array.from({ length: 14 }, () => ({
      x: (r() - 0.5) * 320,
      size: 1.5 + r() * 2.5,
      delay: r() * 2.2,
      duration: 1.6 + r() * 1.6,
      drift: (r() - 0.5) * 50,
      opacity: 0.35 + r() * 0.45,
    }));
  }, []);

  const beams = useMemo(() => [-40, -24, -9, 9, 24, 40], []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-black"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Volumetric light beams bursting upward from WITHIN the marks */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {beams.map((angle, i) => (
              <motion.div
                key={i}
                className="absolute bottom-[-4vh] left-1/2 h-[52vh] w-9 origin-bottom"
                style={{
                  marginLeft: -18,
                  background: `linear-gradient(to top, ${VOLT}66 0%, ${VOLT}1f 45%, transparent 92%)`,
                  filter: "blur(16px)",
                  transform: `rotate(${angle}deg)`,
                }}
                initial={{ opacity: 0, scaleY: 0.35 }}
                animate={{
                  opacity: [0, 0.95, 0.6, 1, 0.75],
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

          {/* Soft green haze hugging the marks — the bloom they emit */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[46vh] w-[46vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${VOLT}33 0%, ${VOLT}10 42%, transparent 70%)`,
              filter: "blur(28px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.9, 0.7, 1], scale: [0.6, 1.1, 1, 1.06] }}
            transition={{ duration: 2.6, delay: 0.25, ease: "easeInOut" }}
          />

          {/* The three slash marks — white-hot core, green bloom */}
          <motion.svg
            viewBox="0 0 120 120"
            className="absolute left-1/2 top-1/2 h-[30vh] w-auto -translate-x-1/2 -translate-y-1/2 select-none"
            style={{
              filter:
                "drop-shadow(0 0 8px rgba(244,255,216,0.95)) drop-shadow(0 0 34px rgba(124,255,0,0.7)) drop-shadow(0 0 110px rgba(124,255,0,0.38))",
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
                strokeWidth={2}
                strokeLinejoin="round"
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
                  boxShadow: `0 0 8px 2px ${VOLT}66`,
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

          {/* Final flash burst before exit */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 48%, #f4ffdc 0%, ${VOLT}55 42%, transparent 78%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0, 0.85, 0] }}
            transition={{ duration: 2.8, times: [0, 0.78, 0.86, 0.93, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
