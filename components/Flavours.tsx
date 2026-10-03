"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { VOLT_CAN } from "../lib/volt-photos";

type Flavour = {
  name: string;
  tag: string;
  color: string;
  dark: boolean;
};

const FLAVOURS: Flavour[] = [
  { name: "THE ORIGINAL", tag: "OG VOLT", color: "#A6FF00", dark: true },
  { name: "ZERO SUGAR", tag: "NO SUGAR", color: "#E8E8E8", dark: true },
  { name: "PUNCH", tag: "FRUIT PUNCH", color: "#FF2E88", dark: false },
  { name: "MANGO", tag: "MANGO TANGO", color: "#FF7A00", dark: false },
  { name: "BLUE BOLT", tag: "BLUE RASPBERRY", color: "#2E9BFF", dark: false },
  { name: "CITRUS", tag: "CITRUS ZING", color: "#FFD400", dark: true },
  { name: "BERRY", tag: "WILD BERRY", color: "#9B30FF", dark: false },
  { name: "NITRO", tag: "NITRO CHARGE", color: "#FF2E2E", dark: false },
];

const BUBBLES = [
  { w: 74, h: 74, top: "6%", left: "8%" },
  { w: 34, h: 34, top: "18%", left: "72%" },
  { w: 52, h: 52, top: "64%", left: "82%" },
  { w: 26, h: 26, top: "76%", left: "12%" },
  { w: 44, h: 44, top: "38%", left: "88%" },
];

function FlavourCard({ flavour, index }: { flavour: Flavour; index: number }) {
  const text = flavour.dark ? "text-black" : "text-white";
  const ring = flavour.dark ? "border-black/15" : "border-white/25";

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      className="group relative w-60 shrink-0 snap-center md:w-72"
    >
      <div
        className="relative aspect-[3/4] -rotate-6 overflow-hidden rounded-3xl transition-transform duration-300 ease-out group-hover:rotate-0 group-hover:scale-[1.04]"
        style={{
          backgroundColor: flavour.color,
          boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
        }}
      >
        {/* Bubble decoration */}
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className={`absolute rounded-full ${ring} border-2 ${
              flavour.dark ? "bg-black/5" : "bg-white/10"
            }`}
            style={{ width: b.w, height: b.h, top: b.top, left: b.left }}
          />
        ))}

        {/* Index + tag */}
        <div className={`absolute left-5 top-5 z-10 ${text}`}>
          <p className="font-display text-lg tracking-widest opacity-70">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="font-body mt-1 text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
            {flavour.tag}
          </p>
        </div>

        {/* Can */}
        <div className="absolute inset-x-0 top-[12%] bottom-[26%]">
          <Image
            src={VOLT_CAN}
            alt={`VOLT ${flavour.name} energy drink can`}
            fill
            sizes="288px"
            className="object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-108 group-hover:-rotate-2"
          />
        </div>

        {/* Flavour name */}
        <p
          className={`font-grunge absolute inset-x-0 bottom-6 z-10 px-5 text-center text-2xl italic md:text-[1.7rem] ${text}`}
          style={{ textShadow: flavour.dark ? "none" : "0 2px 12px rgba(0,0,0,0.4)" }}
        >
          {flavour.name}
        </p>
      </div>
    </motion.article>
  );
}

export default function Flavours() {
  return (
    <section id="flavours" className="relative overflow-hidden bg-ink py-24 md:py-36">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-volt/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-xl tracking-[0.3em] text-white md:text-2xl"
        >
          WE HAVE
        </motion.p>

        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display leading-none text-white"
            style={{ fontSize: "clamp(4.5rem, 12vw, 10rem)" }}
          >
            08
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display inline-block -rotate-2 bg-volt px-4 py-1 leading-none text-black md:px-6"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4.6rem)" }}
          >
            FREAKING
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display leading-none text-white"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4.6rem)" }}
          >
            FLAVOURS
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-body mt-5 max-w-lg text-sm leading-relaxed text-white/55"
        >
          Eight ways to go full throttle. Drag through the lineup and find
          the one that hits like lightning.
        </motion.p>
      </div>

      {/* Draggable rail */}
      <div className="relative mt-14 md:mt-20">
        <div className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-10 pt-4 active:cursor-grabbing md:gap-8 md:px-12">
          {FLAVOURS.map((f, i) => (
            <FlavourCard key={f.name} flavour={f} index={i} />
          ))}
          <div className="w-2 shrink-0" aria-hidden />
        </div>
      </div>

      <div className="relative mt-4 flex justify-center">
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          href="#flavours"
          className="font-body inline-flex items-center gap-2 rounded-full bg-volt px-9 py-3.5 text-sm font-extrabold uppercase tracking-[0.2em] text-black transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_32px_rgba(124,255,0,0.5)]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
          Explore more
        </motion.a>
      </div>
    </section>
  );
}
