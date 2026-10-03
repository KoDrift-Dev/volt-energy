"use client";

import { motion } from "framer-motion";

const DISCIPLINES = [
  "MOTOCROSS",
  "SKATEBOARDING",
  "MMA",
  "ESPORTS",
  "SNOWBOARDING",
  "BMX",
];

export default function AthletesStrip() {
  return (
    <section id="athletes" className="relative border-y border-white/10 bg-ink py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-body text-center text-xs font-bold uppercase tracking-[0.45em] text-white/45"
        >
          Fuel for the fearless
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {DISCIPLINES.map((d, i) => (
            <span key={d} className="flex items-center gap-8">
              <span className="font-display text-outline-thin text-3xl tracking-[0.1em] transition-all duration-300 hover:text-volt hover:[-webkit-text-stroke:0px] md:text-5xl">
                {d}
              </span>
              {i < DISCIPLINES.length - 1 && (
                <span className="text-volt text-xl" aria-hidden>
                  ✦
                </span>
              )}
            </span>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-body mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-white/50"
        >
          VOLT backs riders, fighters, skaters and gamers who refuse to slow
          down. When the lights are brightest, the fearless reach for green.
        </motion.p>
      </div>
    </section>
  );
}
