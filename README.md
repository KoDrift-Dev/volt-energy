# VOLT Energy — Landing Page

Original energy-drink brand landing page built with Next.js 16, React 19,
Tailwind CSS v4 and Framer Motion. 100% original branding: the VOLT triple
torn-slash emblem is an original inline-SVG design.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Structure

- `app/page.tsx` — single-page composition
- `app/layout.tsx` — Anton / Bitter italic / Archivo fonts via `next/font`
- `components/Preloader.tsx` — neon slash-mark draw-in intro
- `components/Navbar.tsx` — fixed nav + mobile slide-down menu
- `components/Hero.tsx` — full-viewport hero with mouse parallax
- `components/Marquee.tsx` — infinite neon-green marquee band
- `components/Manifesto.tsx` — scroll-revealed stacked manifesto type
- `components/Flavours.tsx` — draggable rail of 8 tilted flavour cards
- `components/AthletesStrip.tsx` — disciplines strip
- `components/Footer.tsx` — giant wordmark, link columns, legal bar
- `public/assets/` — `hero-bg.jpg`, `can.png`, `wave.jpg`

## Live Demo

https://volt-energy-lemon.vercel.app
