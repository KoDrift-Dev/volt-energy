"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlashMark from "./SlashMark";

const LINKS = [
  { label: "Flavours", href: "#flavours" },
  { label: "Story", href: "#manifesto" },
  { label: "Athletes", href: "#athletes" },
  { label: "Shop", href: "#flavours" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.7, duration: 0.7, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-black/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2.5" aria-label="VOLT home">
          <SlashMark className="h-8 w-8 md:h-9 md:w-9" />
          <span className="font-display text-2xl tracking-[0.18em] text-white md:text-[1.7rem]">
            VOLT
          </span>
        </a>

        {/* Center links */}
        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-body text-[13px] font-semibold uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-volt"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#flavours"
            className="font-body hidden rounded-full bg-volt px-6 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.18em] text-black transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(124,255,0,0.55)] md:inline-block"
          >
            Buy Now
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-white transition-transform duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-transform duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-md md:hidden"
          >
            <ul className="space-y-1 px-5 py-5">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2.5 text-2xl tracking-[0.12em] text-white/85 transition-colors hover:text-volt"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href="#flavours"
                  onClick={() => setOpen(false)}
                  className="font-body inline-block rounded-full bg-volt px-8 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
                >
                  Buy Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
