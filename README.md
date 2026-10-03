# Demo Clinic — عيادة الشفاء (scroll demo, v1 stills-only)

## Preview (on your PC)
1. Open `index.html` directly in Firefox (double-click). No build step, no server needed.
2. Scroll slowly: 4 scenes cross-dissolve as one continuous warm journey (lets-scroll walkthrough pattern, CSS stills instead of paid video clips).
3. Test widths: 360px (phone) / 768px / 1280px. Test `prefers-reduced-motion` — page falls back to static stills.

## Deploy free (Netlify)
1. Create free account at netlify.com → Add new site → Deploy manually.
2. Drag the `demo-clinic` folder. You get a public URL instantly.
3. Replace the `wa.me/213000000000` number with the real clinic number before showing clients.

## Upgrade path
- Stills are **shipped (v1.2)**: real Pexels photos (free license) in `assets/still_*.jpg`,
  auto-layered by `scroll.js`. Credits: waiting room 26244207 · exam 12149118 ·
  consultation 5593720 · clinic building 11953725 (photographers on pexels.com).
  To swap in AI-generated stills later, overwrite the same filenames — no code changes.
- Full video chain later per `HANDOFF.md` (paid, ~$18) — engine already supports it.

## External sources used
- Fonts: Google Fonts (Amiri display + Tajawal body)
- Icons: Phosphor Icons (light weight) via CDN
- Motion: GSAP + ScrollTrigger CDN (progressive enhancement; page works without it)
- Method: lets-scroll skill (MIT) — walkthrough architecture, manual-asset path, seam rules
