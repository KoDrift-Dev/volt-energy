"use client";

import { motion } from "framer-motion";
import SlashMark from "./SlashMark";
import { XIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All flavours", href: "#flavours" },
      { label: "Merch", href: "#flavours" },
      { label: "Find a store", href: "#top" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "#manifesto" },
      { label: "Athletes", href: "#athletes" },
      { label: "Careers", href: "#manifesto" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "#top" },
      { label: "FAQ", href: "#manifesto" },
      { label: "Privacy", href: "#top" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Giant wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-end justify-center gap-4 md:gap-8"
        >
          <SlashMark className="glow-volt mb-4 h-16 w-16 md:mb-8 md:h-32 md:w-32" />
          <span
            className="font-display leading-none text-white"
            style={{ fontSize: "clamp(5rem, 20vw, 17rem)" }}
          >
            VOLT
          </span>
        </motion.div>

        {/* Link columns */}
        <div className="mt-14 grid grid-cols-2 gap-10 border-t border-white/10 pt-12 md:grid-cols-4 md:gap-8">
          <div>
            <p className="font-grunge text-xl italic text-volt">Ignite your pulse.</p>
            <p className="font-body mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Eight fearless flavours. One unmistakable charge. VOLT Energy —
              since 2026.
            </p>
            <div className="mt-6 flex items-center gap-5">
              {[
                { icon: <XIcon className="h-5 w-5" />, label: "VOLT on X" },
                { icon: <InstagramIcon className="h-5 w-5" />, label: "VOLT on Instagram" },
                { icon: <YoutubeIcon className="h-5 w-5" />, label: "VOLT on YouTube" },
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
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-body text-xs font-bold uppercase tracking-[0.35em] text-white/40">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="font-body text-sm text-white/70 transition-colors hover:text-volt"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 md:flex-row">
          <p className="font-body text-xs tracking-wide text-white/40">
            © 2026 VOLT Energy. All rights reserved.
          </p>
          <p className="font-body text-xs tracking-wide text-white/40">
            Contains caffeine. Enjoy responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
