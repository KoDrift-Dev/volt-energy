"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlashMark from "./SlashMark";

const DURATION = 2400;

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="glow-volt">
            <SlashMark animated className="h-24 w-24 md:h-32 md:w-32" />
          </div>

          <motion.p
            className="font-display mt-6 text-3xl tracking-[0.35em] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            VOLT
          </motion.p>

          {/* Progress shimmer */}
          <div className="mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-white/10 md:w-64">
            <motion.div
              className="h-full w-full origin-left bg-volt"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
              style={{ boxShadow: "0 0 12px rgba(124,255,0,0.9)" }}
            />
          </div>

          <motion.p
            className="font-body mt-4 text-[11px] uppercase tracking-[0.4em] text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.4 }}
          >
            Charging up
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
