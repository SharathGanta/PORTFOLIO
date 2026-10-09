# Talking-Video Personal Portfolio — Sharath Kumar Ganta

A high-performance, minimalist personal portfolio website built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Lenis**.

The website features an authentic looping talking-video hero avatar, an interactive 3D hanging lanyard ID card, a periodic table of tech elements, an expanding work accordion, ink-flood certifications, an interactive career spine timeline, and a pinned horizontal achievements gallery.

All content is extracted verbatim and strictly verified from the official résumé (`Sharath_Kumar_Ganta_3.0.pdf`).

---

## 📋 Sections Architecture

| Index | Section | Description & Key Interaction |
| :--- | :--- | :--- |
| **00** | **Hero** | Seamless looping talking character video with `mix-blend-mode: multiply` blending, giant ghost name typography behind, smart sound toggle (▶/❚❚), and auto-pause on scroll. |
| **01** | **About** | 3-column layout featuring a realistic 3D ID card on a lanyard (pendulum swing physics, idle sway, 3D card flip on hover/tap/keyboard), verbatim summary, and verified quick facts. |
| **02** | **Skills** | "Periodic table of my stack": 8-column elemental grid with category filters, diagonal wave entrance animation, and a sticky inspector panel with 150px logo pops and project references. |
| **03** | **Work** | Expanding horizontal accordion panels (desktop) / vertical accordion (mobile) showcasing 4 key enterprise architectures with illustrative grayscale mini-UIs and tech stacks. |
| **04** | **Certifications** | Ink-flood index on a clean white band. Rows flood with black ink from left to right on hover/focus, text turns white, and arrow indicators slide in. |
| **05** | **Experience** | Chronological timeline uniting 13+ years of experience and B. Tech education into one single trajectory with an interactive vertical spine drawn by scroll progress. |
| **06** | **Achievements** | Viewport-pinned horizontal scrolling gallery with 72px brand-tint glow logo tiles and 1.4s `easeOutQuart` animated counter metrics. |
| **07** | **Contact & Footer** | Kinetic interactive letter-hop heading, large underlined email with live feedback copy chip, spinning badge, and accessible semantic footer. |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.x or later (Node.js 24+ recommended)
- Python 3.10+ (for hero video asset pipeline)

### 2. Installation
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🎥 Rebuilding the Hero Video Assets

The hero video pipeline is automated in `scripts/build-hero-assets.py`. It uses `ffmpeg` and `numpy` to:
1. Crop the character centered head-to-toe (`crop=576:720:352:0`, scaled to `768x960`).
2. Whiten the background with `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98` for blending into `--paper`.
3. Create a seamless 9.5-second loop with a 0.5s video `xfade` and sample-accurate audio cross-fade in `numpy`.
4. Export:
   - `public/hero/hero.mp4` (H.264, yuv420p, CRF 24, AAC 96k, `+faststart`)
   - `public/hero/hero.webm` (VP9, CRF 36, Opus 80k)
   - `public/portrait-bust.webp` (480×600 head-to-shirt crop)
   - `public/og.jpg` (1200×630 OpenGraph social banner)

To run the pipeline:
```bash
python scripts/build-hero-assets.py
```

---

## 🎨 Design System Specifications

- **Paper Background:** `#f4f2ee` (warm off-white)
- **Cards:** `#ffffff` with 26px border-radius and 1px hairline shadow
- **Ink:** `#0d0d0d`
- **Ink-2:** `#3a3a3a`
- **Mute:** `#77756f`
- **Line:** `rgba(13, 13, 13, 0.1)`
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Self-Hosted Fonts:**
  - *Inter Tight* (Display and body)
  - *Instrument Serif* (Italic accent word in headings)
  - *JetBrains Mono* (Indices, numbers, and tags)

---

## 📄 Brand Logos & Licences

All brand logos in `public/logos/` are authentic SVGs:
- **Simple Icons:** CC0 1.0 Universal Public Domain Dedication.
- **Devicon:** MIT License.
- Full details documented in `public/logos/LICENSE.md`.
