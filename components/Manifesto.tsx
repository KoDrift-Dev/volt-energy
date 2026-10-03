"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { VOLT_WAVE } from "../lib/volt-photos";

const line = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden py-28 md:py-44">
      {/* Darkened wave background */}
      <div className="absolute inset-0">
        <Image
          src={VOLT_WAVE}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-18% 0px" }}
          className="font-grunge font-black leading-[1.12]"
          style={{ fontSize: "clamp(1.9rem, 5.2vw, 4.2rem)" }}
        >
          <motion.p variants={line} custom={0} className="text-white">
            STIR UP YOUR
          </motion.p>
          <motion.p variants={line} custom={1} className="text-white">
            FEARLESS PAST AND
          </motion.p>
          <motion.p variants={line} custom={2} className="my-3 md:my-4">
            <span className="font-display inline-block -rotate-3 bg-volt px-5 py-1 font-normal tracking-[0.06em] text-black shadow-[0_0_44px_rgba(124,255,0,0.35)] md:px-8">
              FIRE UP
            </span>
          </motion.p>
          <motion.p variants={line} custom={3} className="text-white">
            YOUR
          </motion.p>
          <motion.p variants={line} custom={4} className="text-outline mt-2">
            FUTURE WITH EVERY
          </motion.p>
          <motion.p variants={line} custom={5} className="text-outline">
            GULP OF PERFECT CAFFEINE
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="font-body mx-auto mt-10 max-w-xl text-sm leading-relaxed text-white/55 md:text-base"
        >
          We don&apos;t do half-measures. Every can of VOLT is engineered for
          the ones who show up loud, push past limits, and never hit snooze
          on their ambition.
        </motion.p>
      </div>
    </section>
  );
}
