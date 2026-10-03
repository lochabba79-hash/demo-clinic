# HANDOFF — manual asset path (lets-scroll Step 1.7)

Build ships **stills-only (v1, $0)**. The scroll engine already supports clips:
drop rendered files into `assets/vid/` and wire them in `index.html` — no code changes needed beyond the config.

## Current status

| Slot | File | Status |
|---|---|---|
| still_reception | `assets/still_reception.png` (3:2, ≥1536px, solid warm bg, no text) | pending — render from `assets/still_prompts.md` |
| still_exam | `assets/still_exam.png` | pending |
| still_care | `assets/still_care.png` | pending |
| still_cta | `assets/still_cta.png` | pending |
| dive_0..3 | `assets/vid/dive_*.mp4` (~8s, 16:9, start-frame = still) | optional upgrade |
| conn_1..3 | `assets/vid/conn_*.mp4` (~5s, start = dive_i last frame, end = dive_{i+1} first frame) | optional upgrade |

## Acceptance rules (from the skill — seams must be frame-identical)
- Stills: aspect ≈ 3:2 (±3%), width ≥ 1200px, opens cleanly, same palette/light across all 4.
- Clips (if ever rendered): frame 0 must match the handed-over start frame; connector end must land on next dive's first-frame composition (near-miss OK — engine crossfades).
- One source for all stills of a build (no mixing tools mid-set — reads as style drift).
