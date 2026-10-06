# HANDOFF — manual asset path (lets-scroll Step 1.7)

Build ships **stills-only (v1, $0)**. The scroll engine already supports clips:
drop rendered files into `assets/vid/` and wire them in `index.html` — no code changes needed beyond the config.

## Current status — v1.2: Pexels stills shipped (free license, baked into repo)
## 3D models — v3.0: CC0 GLBs baked into `assets/models/` (9–36 KB each)

| Model | File | Author / license | Source |
|---|---|---|---|
| Hospital sign | `sign_hospital.glb` (9 KB) | Kenney / CC0 | poly.pizza/m/PeM20xAT0V |
| First-aid kit | `firstaid_kit.glb` (18 KB) | Quaternius / CC0 | poly.pizza, First Aid Kit by Quaternius |
| Health pickup | `pickup_health.glb` (36 KB) | Quaternius / CC0 | poly.pizza, Pickup Health by Quaternius |

Viewer: `viewer.js` + Three.js 0.160 CDN (importmap), lazy via IntersectionObserver,
drag-rotate + auto-rotate (off under reduced-motion), static fallback without WebGL.
Note: GLB fetch needs http(s) — local `file://` preview shows the fallback; serve via
`npx serve .` or the live URL. Quaternius full packs are CC0 too but ship FBX-only,
so Poly Pizza GLB conversions were used instead (same authors, same license).

| Slot | File | Status |
|---|---|---|
| still_reception | `assets/still_reception.jpg` — hospital waiting room (Pexels 26244207) | ✅ live, auto-layered |
| still_exam | `assets/still_exam.jpg` — medical examination (Pexels 12149118) | ✅ live, auto-layered |
| still_care | `assets/still_care.jpg` — doctor listening attentively (Pexels 5593720) | ✅ live, auto-layered |
| still_cta | `assets/still_cta.jpg` — health clinic building, red door (Pexels 11953725) | ✅ live, auto-layered |
| dive_0..3 | `assets/vid/dive_*.mp4` (~8s, 16:9, start-frame = still) | optional upgrade |
| conn_1..3 | `assets/vid/conn_*.mp4` (~5s, start = dive_i last frame, end = dive_{i+1} first frame) | optional upgrade |

## Acceptance rules (from the skill — seams must be frame-identical)
- Stills: aspect ≈ 3:2 (±3%), width ≥ 1200px, opens cleanly, same palette/light across all 4.
- Clips (if ever rendered): frame 0 must match the handed-over start frame; connector end must land on next dive's first-frame composition (near-miss OK — engine crossfades).
- One source for all stills of a build (no mixing tools mid-set — reads as style drift).
