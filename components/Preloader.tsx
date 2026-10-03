"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VOLT_PRELOADER } from "../lib/volt-photos";

const DURATION = 2800;

/**
 * VOLT preloader v4 — the artwork IS the design.
 * AI-generated frame matching the reference video preloader exactly:
 * pure black screen, three slim glowing claw slashes, volumetric light
 * bursting upward from within the marks, soft green haze above, sparks.
 * Subtle life: fade-in, slow scale pulse, shimmer over the marks — then exit.
 */
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

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-black"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* The artwork, full-bleed, breathing gently */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${VOLT_PRELOADER})` }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: [0, 1], scale: [1.04, 1.015, 1.03, 1.02] }}
            transition={{
              opacity: { duration: 0.7, ease: "easeOut" },
              scale: { duration: 2.8, ease: "easeInOut" },
            }}
          />

          {/* Soft animated shimmer sweeping over the marks */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 40% 30% at 50% 42%, rgba(124,255,0,0.10) 0%, transparent 70%)",
              mixBlendMode: "screen",
            }}
            animate={{ opacity: [0, 1, 0.6, 1, 0.7] }}
            transition={{ duration: 2.8, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
