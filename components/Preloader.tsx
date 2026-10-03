"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VOLT_CAN } from "../lib/volt-photos";

const DURATION = 2800;
const VOLT = "#7CFF00";

type Spark = {
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
};

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
    const r = seeded(42);
    return Array.from({ length: 22 }, () => ({
      x: (r() - 0.5) * 420,
      size: 2 + r() * 3,
      delay: r() * 2.2,
      duration: 1.6 + r() * 1.8,
      drift: (r() - 0.5) * 60,
    }));
  }, []);

  const beams = useMemo(() => [-46, -28, -10, 8, 26, 44], []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 45%, rgba(124,255,0,0.06) 0%, transparent 60%)",
            }}
          />

          {/* Volumetric light beams bursting upward from the can */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {beams.map((angle, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 left-1/2 h-[46vh] w-10 origin-bottom"
                style={{
                  marginLeft: -20,
                  background: `linear-gradient(to top, ${VOLT}55 0%, ${VOLT}18 45%, transparent 90%)`,
                  filter: "blur(14px)",
                  transform: `rotate(${angle}deg)`,
                }}
                initial={{ opacity: 0, scaleY: 0.4 }}
                animate={{ opacity: [0, 0.9, 0.55, 1, 0.7], scaleY: [0.4, 1, 0.85, 1, 0.9] }}
                transition={{
                  duration: 2.6,
                  delay: 0.35 + i * 0.08,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Bloom behind the can — the light igniting from the claw marks */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[52vh] w-[52vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${VOLT}40 0%, ${VOLT}14 38%, transparent 70%)`,
              filter: "blur(24px)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0.75, 1], scale: [0.5, 1.12, 1, 1.08] }}
            transition={{ duration: 2.6, delay: 0.3, ease: "easeInOut" }}
          />

          {/* The can */}
          <motion.img
            src={VOLT_CAN}
            alt="VOLT energy drink can"
            className="relative z-10 h-[44vh] w-auto select-none object-contain"
            draggable={false}
            style={{
              filter:
                "drop-shadow(0 0 18px rgba(124,255,0,0.55)) drop-shadow(0 0 70px rgba(124,255,0,0.28))",
            }}
            initial={{ opacity: 0, y: 26, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Rising sparks */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            {sparks.map((s, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full"
                style={{
                  width: s.size,
                  height: s.size,
                  background: VOLT,
                  boxShadow: `0 0 8px 2px ${VOLT}88`,
                  left: `calc(50% + ${s.x}px)`,
                  top: "52%",
                }}
                initial={{ y: 0, x: 0, opacity: 0 }}
                animate={{ y: -320, x: s.drift, opacity: [0, 1, 0.9, 0] }}
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
            className="pointer-events-none absolute inset-0 z-30"
            style={{ background: `radial-gradient(circle at 50% 46%, #eaffd0 0%, ${VOLT}66 40%, transparent 75%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0, 0.9, 0] }}
            transition={{ duration: 2.8, times: [0, 0.78, 0.86, 0.93, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
