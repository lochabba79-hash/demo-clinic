# AUDIT — demo-clinic vs. AI-slop research framework
> Target: https://lochabba79-hash.github.io/demo-clinic/ (v1.2) · Date: 2026-10-03
> Method: framework Phases 1–2 + revised scoring model. No AI-detector scores used as evidence.

## Content Quality and Trust Score: 85/100 (Low risk)

| Category | Wt | Score | Evidence |
|---|---|---|---|
| Factual accuracy & source integrity | 20 | 16 | No efficacy claims, no fake citations, no "studies show". Prices/hours/phone are placeholders BUT disclosed (`نموذج تجريبي`, "أسعار استرشادية", JSON-LD description). Must be replaced before any sale — tracked as P1. |
| Originality & information gain | 12 | 10 | Copy written for this clinic (Sétif, BaridiMob, Sat–Thu week). Zero slop phrases ("digital landscape", "take the next step", "in conclusion"…). FAQ answers are specific, not interchangeable. |
| Experience/expertise/authority/trust | 12 | 8 | No fake credentials claimed (good). Missing for a real sale: doctor name, license, clinic address — P1 before client delivery (high-stakes medical track). |
| Content value & task completion | 12 | 10 | Every section has one job; booking form completes the task (name/phone/reason/day/time → WhatsApp). No filler paragraphs. |
| Freshness & maintenance | 10 | 8 | No dates to rot. Hours/prices are placeholders — refresh on sale. No "last updated" stamp — acceptable for single-page demo. |
| Tone, brand voice, inclusivity | 8 | 8 | Warm consistent AR + FR; no hype, no caps headings, no exclamation abuse. Plain verbs, sentence case. |
| Conversion & user journey | 8 | 7 | Specific CTAs per scene, sticky mobile CTA, form validation. Gap: no objection handling near booking except FAQ — acceptable. |
| Structure, readability, a11y | 8 | 7 | H1×1 → H2s, skip link, labels, focus rings, AAA contrast (~7:1), reduced-motion, native controls. Fixed this round: photo alts, canonical. |
| Technical SEO & metadata | 7 | 5 | Title, description, OG, JSON-LD MedicalClinic, canonical ✓. Gaps: og:image is SVG (most scrapers ignore — TODO PNG), no sitemap/robots (fine for 1-page demo, needed for real sites). |
| Visual authenticity | 3 | 3 | Real Pexels photos (not AI), licensed, credited in README. Presented as clinic's own — mitigated by demo labels everywhere; real sale swaps in real photos. |

## Source verification (2026-10-03 — framework applied to its own citations)
| Source | Status | What it confirms |
|---|---|---|
| Google: guidance on gen-AI content | ✅ Live | Scaled valueless pages may breach spam policy; generated content needs manual review (titles, descriptions, schema, alt text). Supports our evidence-hierarchy approach. |
| W3C: WCAG 2.2 (REC Dec 2024) | ✅ Live | Confirms 2.4.11–13, 2.5.7–8, 3.2.6, 3.3.7–8; 4.1.1 Parsing removed. Our a11y floor cites the current standard. |
| Originality.ai: AI-text issues on websites | ✅ Live (Oct 2025) | Confirms accuracy/originality risks. Flag: vendor source selling detectors — treat its "Google detects AI content" framing as interested-party claim; Google's own docs target scaled abuse + people-first value, not detection. |
| arXiv 2412.05139 (CMU/Berkeley): detector examination | ✅ Live | TPR@0.01 as low as 0%; detectors fail on unseen models/tasks; AUROC misleads. Justifies our ban on detector scores as evidence. |

## Remediation (priority-ordered)- [ ] **P1 — before any client sale:** replace phone, address, hours, prices; add doctor name + license; swap stock photos for real clinic photos.
- [x] **P2 — done v1.5/v1.6:** og-image PNG 1200×630 shipped (locally rendered); sitemap.xml + robots.txt live.
- [ ] **P3 — ongoing:** re-run this table per client site; keep findings register per domain.
