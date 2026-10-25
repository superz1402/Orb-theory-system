# 001 — Scheele's Green: "The Colour That Killed"

**Status (2026-10-25):** v1 rendered → **REJECTED by Bilal ("AI slop")** ·
v2 rebuilt with real licensed images → **PENDING Bilal's approval** ·
not uploaded (nothing on this channel has ever been uploaded).

The channel's pilot and this system's worked example. Same verified story in
both versions; everything about the *execution* changed.

## The story (verified — see sources.md)
1775: Carl Wilhelm Scheele invents a vivid green — copper arsenite. It goes
everywhere (wallpaper, dresses, candles, sweets). Damp + mould turns it to
poisonous gas and dust; children waste away in green bedrooms. 1861: Matilda
Scheueur, 19, dies dusting artificial leaves; her eyes and fingernails had
turned green. Some countries banned arsenic pigments in the 1830s–40s; Britain
never formally banned wallpaper use — production faded after the 1860s and the
last brand ceased by the 1890s. **Hook-vs-facts note:** the working title says
"killed/banned" as shorthand; the scripts state the precise version. This is
the canonical example of the facts-gate rule in `docs/quality-gates.md`.

## v1 — what failed (do not repeat)
- File: `orb-theory-pilot-01.mp4` (52.34 s, 1080×1920, Kokoro bm_george) in the
  working workspace `pilot/` — kept as the anti-pattern reference.
- Failures: glowing CSS orb face carrying scenes; emoji chips (wallpaper/dress/
  candle) as visuals; whole-section caption blocks; empty mid-frames; no music
  bed; flat voice pacing. Screenshots: `pilot/frame-*.png` in working workspace.

## v2 — the pattern to copy
- Script: same story, tightened, **per-sentence lines** (script summary in this
  folder: `script-v1.md` is the v1 text; v2's per-sentence text lives in the
  working workspace `pilot-v2/script-v2.md` until approval, then is copied here).
- Visuals: **real images only**, license-verified via the Commons API
  (ledger summary: `credits.md` in this folder; machine ledger
  `media_manifest.json` in working workspace `pilot-v2/`):
  Kedzie's *Shadows from the Walls of Death* title page + arsenical wallpaper
  sample page (PD, NLM) · Scheele portrait by Scheffner (PD) · Scheele's Green
  swatch (PD) · Paris Green tin (CC BY-SA 3.0) · "The Arsenic Waltz" 1862
  etching (Wellcome, CC BY 4.0) · Dutch arsenical wallpaper sample (PD).
- Design: full-bleed images + Ken Burns, dark emerald grade/vignette/grain,
  serif title card, sentence captions with keyword highlight, timeline graphic
  1775 → 1861 → 1874 → 1890s over a real wallpaper plate, quiet ffmpeg-generated
  ambient bed, Orb reduced to a minimal gold logo mark (intro/outro).
- Voice: Kokoro bm_george, speed 0.94, +3% pitch, per-sentence takes
  (Edge TTS preferred but synthesis blocked on the reference VM — see
  `docs/troubleshooting.md`).

## Artifacts in this folder
- `script-v1.md` — the v1 script (with its accuracy note), copied from the pilot.
- `sources.md` — the verified source log (Wikipedia — Scheele's green; Actalent —
  arsenic green substitutions), copied from the pilot.
- `credits.md` — summary of the v2 license ledger (full CREDITS.md + manifest
  remain in the working workspace `pilot-v2/` until v2 is approved, then move here).
