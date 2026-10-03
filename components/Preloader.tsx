"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VOLT_PRELOADER } from "../lib/volt-photos";

const DURATION = 2900;

/**
 * VOLT preloader v5 — the video's animation, the v4 artwork.
 * Three stacked full-screen copies of the preloader artwork, each clipped to
 * a slanted column matching its claw's tilt. Columns wipe open top-to-bottom,
 * staggered, with a brightness surge — like each mark tearing into existence.
 * Volumetric beams flicker upward from within the marks, sparks rise, then a
 * white-green flash and slide-up exit. No text, no bar, nothing else.
 *
 * bg-contain (not cover) so the artwork's claw x-positions stay exact on any
 * screen — letterboxing is invisible on the pure-black base.
 */

interface Claw {
  /** degenerate polygon: all points at the claw's top tip (wipe starts here) */
  hidden: string;
  /** full slanted column: top-left, top-right, bottom-right, bottom-left */
  shown: string;
  /** beam anchor, % of width */
  beamX: string;
}

const CLAWS: Claw[] = [
  {
    hidden: "polygon(39% -2%, 39% -2%, 39% -2%, 39% -2%)",
    shown: "polygon(27% -2%, 50% -2%, 35% 102%, 11% 102%)",
    beamX: "31%",
  },
  {
    hidden: "polygon(57% -2%, 57% -2%, 57% -2%, 57% -2%)",
    shown: "polygon(45% -2%, 67% -2%, 55% 102%, 33% 102%)",
    beamX: "51%",
  },
  {
    hidden: "polygon(78% -2%, 78% -2%, 78% -2%, 78% -2%)",
    shown: "polygon(65% -2%, 87% -2%, 75% 102%, 53% 102%)",
    beamX: "71%",
  },
];

/** Deterministic RNG so sparks are SSR-safe (identical on server + client). */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Beam({ x, delay }: { x: string; delay: number }) {
  return (
    <>
      {[0, 1].map((k) => (
        <motion.div
          key={k}
          className="pointer-events-none absolute"
          style={{
            left: `calc(${x} + ${k === 0 ? "-14px" : "12px"})`,
            top: "4%",
            height: "48%",
            width: k === 0 ? 14 : 9,
            transform: `translateX(-50%) rotate(${k === 0 ? -4 : 5}deg)`,
            transformOrigin: "bottom center",
            background:
              "linear-gradient(to top, rgba(150,255,70,0.85) 0%, rgba(124,255,0,0.28) 55%, transparent 100%)",
            filter: "blur(7px)",
            mixBlendMode: "screen",
          }}
          initial={{ opacity: 0, scaleY: 0.4 }}
          animate={{ opacity: [0, 0.9, 0.45, 0.8, 0.55], scaleY: [0.4, 1, 0.85, 1, 0.9] }}
          transition={{ duration: 1.7, delay, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

interface Spark {
  left: string;
  size: number;
  drift: number;
  duration: number;
  delay: number;
}

export default function Preloader() {
  const [show, setShow] = useState(true);

  const sparks = useMemo<Spark[]>(() => {
    const rand = mulberry32(7);
    return Array.from({ length: 18 }, () => ({
      left: `${18 + rand() * 64}%`,
      size: 2 + rand() * 3,
      drift: (rand() - 0.5) * 60,
      duration: 1.4 + rand() * 1.2,
      delay: 0.5 + rand() * 1.1,
    }));
  }, []);

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
          {/* Three claw layers tearing in, staggered */}
          {CLAWS.map((claw, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 bg-black bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${VOLT_PRELOADER})`,
                clipPath: claw.hidden,
              }}
              animate={{
                clipPath: claw.shown,
                filter: ["brightness(0.35)", "brightness(1.9)", "brightness(1.05)"],
              }}
              transition={{
                clipPath: {
                  duration: 0.9,
                  delay: 0.12 + i * 0.16,
                  ease: [0.7, 0, 0.3, 1],
                },
                filter: {
                  duration: 1.15,
                  delay: 0.12 + i * 0.16,
                  times: [0, 0.55, 1],
                  ease: "easeOut",
                },
              }}
            />
          ))}

          {/* Volumetric beams flickering up from within each mark */}
          {CLAWS.map((claw, i) => (
            <Beam key={i} x={claw.beamX} delay={0.55 + i * 0.16} />
          ))}

          {/* Rising sparks */}
          {sparks.map((s, i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute rounded-full"
              style={{
                left: s.left,
                top: "62%",
                width: s.size,
                height: s.size,
                background: "rgba(160,255,90,0.9)",
                filter: "blur(1px)",
                mixBlendMode: "screen",
              }}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{ opacity: [0, 0.9, 0], y: -220, x: s.drift }}
              transition={{ duration: s.duration, delay: s.delay, ease: "easeOut" }}
            />
          ))}

          {/* Finale flash burst */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 42%, rgba(220,255,190,0.95) 0%, rgba(124,255,0,0.45) 45%, transparent 75%)",
              mixBlendMode: "screen",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.9, 0] }}
            transition={{ duration: DURATION / 1000, times: [0, 0.7, 0.83, 1], ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
