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
- Render the 4 stills from `assets/still_prompts.md` (any free AI image tool) → save as `assets/still_*.png` → reference them in `index.html` scene visuals.
- Full video chain later per `HANDOFF.md` (paid, ~$18) — engine already supports it.

## External sources used
- Fonts: Google Fonts (Amiri display + Tajawal body)
- Icons: Phosphor Icons (light weight) via CDN
- Motion: GSAP + ScrollTrigger CDN (progressive enhancement; page works without it)
- Method: lets-scroll skill (MIT) — walkthrough architecture, manual-asset path, seam rules
