# BROWSER QA PROMPT — paste into your visual browser AI
> Target: https://lochabba79-hash.github.io/demo-clinic/ · Arabic RTL clinic landing, 4 scroll scenes, booking form → WhatsApp.

```
You are a visual QA inspector. TEST ONLY — do not edit anything.
Open https://lochabba79-hash.github.io/demo-clinic/ and inspect it like a paying
client would. Take screenshots as you go; every finding must cite one.

MATRIX (viewport × theme × language):
A. 1280×800, light, Arabic — slow-scroll top→bottom, screenshot each of the 4 scenes.
B. 375×667, light, Arabic — same scroll; check sticky bottom CTA never covers form inputs.
C. 375×667, dark (system dark or in-page moon toggle), French (FR toggle) — same scroll.
D. 1280×800, dark, Arabic — spot-check hero + booking only.

INTERACTIONS (do all, report pass/fail each):
1. Click FR toggle → confirm dir flips to LTR, lang="fr", day pills become French.
2. Click moon toggle twice → theme changes light→dark→system; confirm no invisible text.
3. Booking: click تأكيد with EMPTY name/phone → error message must appear.
4. Fill name "Test", phone "0550123456", pick Wednesday + evening → confirm button label
   updates AND its href contains the encoded name/day (inspect, do NOT send).
5. Keyboard: Tab from top to bottom — every control reachable, focus ring always visible.
6. Open DevTools console → list ALL errors/warnings. Open Network → list total
   transferred KB and any file >300 KB.

CHECK FOR THESE DEFECTS:
- Empty/blank viewport moments mid-scroll (cream gap with no content visible)
- Text overlapping images, nav, or sticky CTA at any scroll position
- Copy unreadable over scene photos (contrast) in EITHER theme
- Horizontal scrollbar at 375px
- Broken images, missing icons (empty boxes where an icon should be)
- Layout differences between AR-RTL and FR-LTR that look like bugs (not mirrors)
- Anything that looks untrustworthy for a medical brand

OUTPUT FORMAT (nothing else — no praise, no generic statements):
## Verdict: SHIP / FIX-FIRST (one line, why)
## Findings
| ID | Viewport | Section | Expected | Actual (+screenshot ref) | Severity P0-P3 |
(Severity: P0 blocks trust/conversion, P1 visible defect, P2 polish, P3 nitpick.
Omit rows for things that pass — only report defects, plus the interaction
pass/fail list and console/network numbers.)
## Interaction results
1..6 → PASS/FAIL + one-line evidence each.
## Console errors
Exact message text or "none".
## Network
Total KB transferred, files >300 KB, LCP-candidate file.
```
