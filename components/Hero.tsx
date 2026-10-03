"use client";

import { useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { XIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";
import { VOLT_HERO_BG, VOLT_CAN } from "../lib/volt-photos";

const BASE_DELAY = 2.6;

const fadeUp = {
  initial: { opacity: 0, y: 42 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });
  const bgX = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const bgY = useTransform(sy, [-0.5, 0.5], [12, -12]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { innerWidth, innerHeight } = window;
      mx.set(e.clientX / innerWidth - 0.5);
      my.set(e.clientY / innerHeight - 0.5);
    },
    [mx, my],
  );

  return (
    <section
      id="top"
      onMouseMove={onMouseMove}
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 scale-110" style={{ x: bgX, y: bgY }}>
        <Image
          src={VOLT_HERO_BG}
          alt="A hand rising from stormy waves holding a can of VOLT, backlit by a fiery green eruption"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

      {/* Vertical social rail */}
      <motion.div
        {...fadeUp}
        transition={{ delay: BASE_DELAY + 0.9, duration: 0.6 }}
        className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-6 sm:flex md:left-8"
      >
        <span className="h-16 w-px bg-white/25" />
        {[
          { icon: <XIcon />, label: "VOLT on X" },
          { icon: <InstagramIcon />, label: "VOLT on Instagram" },
          { icon: <YoutubeIcon />, label: "VOLT on YouTube" },
        ].map((s) => (
          <a
            key={s.label}
            href="#top"
            aria-label={s.label}
            className="text-white/55 transition-all duration-200 hover:scale-110 hover:text-volt"
          >
            {s.icon}
          </a>
        ))}
        <span className="h-16 w-px bg-white/25" />
      </motion.div>

      {/* Headline block */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 sm:pl-20 md:pl-24">
        <motion.p
          {...fadeUp}
          transition={{ delay: BASE_DELAY, duration: 0.6 }}
          className="font-body mb-4 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.45em] text-white/70"
        >
          <span className="inline-block h-px w-10 bg-volt" />
          Volt Energy
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ delay: BASE_DELAY + 0.15, duration: 0.7 }}
          className="font-grunge font-black leading-[0.95] text-white"
          style={{ fontSize: "clamp(3.2rem, 9vw, 8rem)" }}
        >
          Ignite your Pulse
          <br />
          <span className="text-volt">with CAFFEINE</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ delay: BASE_DELAY + 0.35, duration: 0.6 }}
          className="font-body mt-6 max-w-md text-sm leading-relaxed text-white/60 md:text-base"
        >
          Raw energy for the fearless. Crack open a VOLT and turn every
          moment into full throttle.
        </motion.p>

        <motion.p
          {...fadeUp}
          transition={{ delay: BASE_DELAY + 0.5, duration: 0.6 }}
          className="font-body mt-8 text-xs font-semibold uppercase tracking-[0.5em] text-white/40"
        >
          Since 2026
        </motion.p>
      </div>

      {/* Bottom-right floating card */}
      <motion.a
        href="#flavours"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: BASE_DELAY + 0.65, duration: 0.7 }}
        className="group absolute bottom-24 right-5 z-10 hidden items-center gap-4 rounded-2xl border border-white/15 bg-black/55 p-3 pr-5 backdrop-blur-md transition-colors hover:border-volt/60 sm:flex md:bottom-28 md:right-10"
      >
        <div className="relative h-20 w-14 overflow-hidden rounded-lg bg-gradient-to-b from-zinc-800 to-black">
          <Image
            src={VOLT_CAN}
            alt="VOLT energy drink can"
            fill
            sizes="56px"
            className="object-contain p-1 transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div>
          <p className="font-grunge text-lg italic text-white">The Original</p>
          <span className="font-body mt-1.5 inline-block rounded-full bg-volt px-5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-black transition-transform duration-200 group-hover:scale-105">
            Explore
          </span>
        </div>
      </motion.a>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: BASE_DELAY + 1.1, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.4em]">
            Scroll
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
