# Channel Bible — Orb Theory

## Concept
A thinking-orb narrator explains **why the world works that way**. Curiosity
science, history, and human behaviour. Evergreen topics (back-catalogue keeps
earning; not news-dependent). English-language, global audience (higher CPM
than a single-country channel). Approved by Bilal 2026-10-25.

## Formats & cadence — FORMAT PIVOT (2026-10-26, Bilal's v3 verdict)

- **PRIMARY FORMAT: long-form 16:9 — 1920×1080, 8–12 min episodes.** This is
  the flagship and the standard-bearer. (Supersedes the v3-era plan, which led
  with vertical Shorts; Bilal's verdict on pilot v3, 2026-10-26: *"let's try
  long form videos instead 16:9 ratio like youtube."*)
- **Cadence proposal: 1 long-form episode per week.** PROPOSAL — marked
  pending Bilal's approval; it is a production-capacity judgement (long-form
  renders on the reference VM are overnight, scene-checkpointed jobs — see
  `docs/pipeline.md` §S7), not a promise. Do not publish a different cadence
  as decided.
- **Shorts are DEMOTED to a derivative format — later phase.** When they
  return, Shorts are **cut from approved long-form episodes** (vertical
  reframe + word-cue captions), produced only after the long-form engine is
  proven across several episodes. This reverses the v3 doctrine (Shorts as
  originals in their own right): that doctrine belonged to the Shorts-first
  era and is retired. No Shorts production until Bilal re-opens the phase.
- YPP target: 1,000 subs + 4,000 watch-hours (the long-form route; the
  10M-Shorts-views alternative is no longer the strategy).

## Voice
- **The narrator is a character: The Archivist** — persona, verbal tics,
  sign-off, casting/audition protocol, and the never-do list live in
  `docs/character-bible.md` and govern every script. Scripting for retention
  (hooks, open loops, score maps, the scoring rubric) lives in
  `docs/retention-scripting.md`. Expanded media sourcing lives in
  `docs/media-sources.md`.
- One consistent narrator voice across the channel (a character, not a rotation).
  One voice for the whole episode — no per-chapter changes (agent-kit S4 law).
- **House voice (production): Microsoft Edge TTS
  `en-US-AndrewMultilingualNeural`, rate −3%** (≈136 wpm on documentary copy;
  **−4% for long-form** per agent-kit S4). This is Bilal's operator-mandated
  standard across all his documentary systems (opuscar BRAIN.md Step 4:
  "edge-tts or nothing" — a platform voice was shipped once and rejected; do
  not regress).
- **PACING STANDARD (2026-10-26 — hard law, see also
  `docs/retention-scripting.md` §Pacing): natural documentary pace,
  125–145 wpm measured on the final mix.** Pace is achieved by voice/rate
  choice and script design — never in post. **Time-stretch / `atempo`
  speed-ups of narration are BANNED outright, at any factor, for any reason.**
  Documented mistake: pilot v3's performance was finished with per-line
  pitch-preserved `atempo` to a ~165 wpm target; Bilal rejected it —
  *"too quick for no reason"* (2026-10-26). If a take measures outside the
  band, re-cast or re-synthesise at a different rate; do not stretch it.
- **Production route: synthesis runs on GitHub Actions, not on the operator
  machine** — Edge TTS's WebSocket is blocked on proxied/MITM networks (see
  troubleshooting), while Actions runners have clean egress; WAVs + word
  timings are pulled back over HTTPS. Pattern: opuscar `gen_tts_andrew.py` —
  per-block `Communicate(..., boundary="WordBoundary")`, **WordBoundary
  capture is contract**: the word timings drive captions (see Captions below)
  and SFX alignment. Full job spec in `docs/pipeline.md` §S4. This route
  becomes production **once this repo is published to GitHub**; until then it
  is designed, not proven, for Orb Theory (the pattern itself is proven in
  Bilal's ahyeon / agent-kit / last-stop productions).
- **Offline fallback (proven on the reference VM): local Kokoro-82M** —
  `bm_george` (British male) at speed **0.92**, generated **per sentence/line**
  so captions sync to real timings (documentary-engine `core/tts/tts.py`;
  somerton and ostrich shipped whole films on this voice). Known weakness:
  flatter pacing, synthetic edge — disclose as synthetic on upload (required
  anyway). Piper-tts is the second documented fallback (agent-kit S4).
- **Pronunciation is data:** every script carries a lexicon (name → phonetic
  spelling, spoken text only — ahyeon pattern) and a `say` field where the
  spoken form differs from the subtitle text (numbers, abbreviations, names —
  opuscar pattern). ASR round-trip QC verifies the result (quality-gates.md).
- Narration style: hook in the first 2 seconds, one idea per sentence, precise
  wording for facts even inside catchy titles.

## Visual identity (the anti-slop system)
- **Spine: real archival images** — Wikimedia Commons, Wellcome Collection,
  National Library of Medicine, sourced through the code-enforced license gate
  (`docs/pipeline.md` §S3). But a still is **evidence inside a scene, never
  the scene itself** — see the motion-graphics-first rule below. (The v2/v3
  treatment — full-bleed stills under slow Ken Burns drift — is retired: it
  reads as a slideshow, and Bilal rejected it by name.)
- **Plate prep is mandatory** (documentary-engine `prep_plates.py`): every
  archival plate is cover-cropped to scene aspect, resized 1200w,
  autocontrasted, mapped through a **3-stop duotone LUT in the Orb
  emerald/gold palette**, given seeded grain (σ5.5) and a −18% vignette —
  *before* it enters a scene. This is what makes real photos from different
  centuries sit in one film instead of looking pasted. Plate captions obey the
  honest-caption rule: claim only what the source supports, "MODERN VIEW" for
  modern photos, year on period images, on-screen author+license tag.
- **Period plate aesthetic** (from Bilal's ostrich-documentary lesson): one strong
  consistent look per episode — engravings/plates/documents treated as evidence
  on screen (somerton-man lesson), not decoration.
- **Motion cards & diagrams** in HyperFrames: timeline graphics (e.g.
  1775 → 1861 → 1874 → 1890s), name cards, maps. Motion rules (from Bilal's
  MOTION-CRAFT): ease-out entrances / ease-in exits, stagger 2–4 frames, overlap
  actions, on-screen text read-time ≥ words/3 + 1 s, let key ideas hold still.
- **MOTION-GRAPHICS-FIRST RULE (2026-10-26 — supersedes the v3 animation
  standard; enforced by Gate 4 in `docs/quality-gates.md`):** the dominant
  visual language of every episode is **true motion graphics**, not moving
  photographs.
  - **The slideshow ban, defined precisely:** a scene whose only motion is
    Ken Burns zoom/pan or parallax drift over a still image is a **slideshow
    scene, and it FAILS** — however many layers drift, however good the
    grade. Precedent: pilot v3's Remotion parallax signature scenes met the
    old v3 rule (≥2 layers, annotations) and Bilal still rejected them —
    *"more like image slideshows with narration and subtitles, that's what
    we hate and do not want at all"* (2026-10-26). Drift is set-dressing,
    never the scene.
  - **≥65% of episode runtime must be true motion-graphics scenes** —
    scenes whose primary content is generated, animated graphics:
    - **Animated diagrams** — a structure is drawn/built step by step
      (Ep. 001: the **chemistry build** — Scheele's 1775 synthesis assembling
      element by element into copper arsenite, formula kinetic-typed as it
      forms).
    - **Process animations** — a mechanism plays out over time (Ep. 001:
      the **gas-process diagram** — damp + mould acting on arsenical
      wallpaper, arsine gas forming and rising into the room, animated
      arrows/particles/stages).
    - **Animated maps** — geography drawn, routes/regions highlighted in
      sync with narration.
    - **Animated timelines** — the axis draws on, nodes land, spans fill
      (Ep. 001: the **ban-timeline** — 1775 invention → 1861 Matilda case →
      1874 Kedzie's book → 1890s fade-out, country bans lighting up as the
      narration reaches them).
    - **Data graphics** — counts, comparisons, quantities that build
      (bars, tallies, dosage/arsenic-content figures) rather than appear.
    - **Kinetic typography** — words as the visual event: verdict lines,
      quoted labels, dates and names typeset in motion, in character.
    - **Artifact manipulation** — real plates/documents handled on the
      Archivist's desk: opened, slid in, stamped, compared side-by-side,
      detail-isolated (Ep. 001: the **case-file desk** — Kedzie's title page
      and the wallpaper sample laid out, stamped, annotated as evidence).
  - **Every still image is embedded inside a motion scene** with graphic
    treatment (diagram context, desk handling, annotation systems, data
    framing) — a still may support a scene; it may not *be* the scene.
    **No static full-screen image may hold >3 s.**
  - **Per-scene motion manifest:** every scene declares its engine
    (Remotion / HyperFrames) and its motion types (from the taxonomy above)
    in `07_motion_manifest.json` at S5; Gate 4 checks the manifest against
    the render and computes the ≥65% figure from it. A scene with no
    taxonomy motion type is a slideshow scene by definition.
  - **What survives from v3:** animated annotations synced to anchor words
    (picture change 0.30 s before the anchor word), image-as-artifact
    handling, and parallax/Ken Burns **as subordinate layers inside a
    motion-graphics scene** remain good craft — they just no longer count
    as the scene's motion on their own.
  - **Scene engines — Remotion is PROVEN for motion-graphics scenes**
    (pilot v3 `remotion-test/VERDICT.md`: full layered composition rendered
    at spec on the reference VM; Remotion then carried v3's signature
    scenes in production). **HyperFrames is proven** for compositions,
    kinetic type, and HTML-native scenes. Engine choice is per scene,
    recorded in the motion manifest — pick the engine that does the scene's
    taxonomy type best; both are first-class.
- **Image fit is designed, per image (v3):** every plate gets an entry in the
  episode's image-fit manifest (focal point, fit mode, safe crop for the
  format, motion path checked against the crop — Gate 4). "Cover and hope"
  cropping is banned; if a plate's focal content cannot survive the format,
  the fit mode changes (contain-with-plate-backdrop, split-plate,
  detail-crop), not the content. Primary format is now **16:9** (see
  Formats); 9:16 fit is designed only when a derivative Short is cut.
- **The Orb**: small, minimal, elegant line/gold logo mark — intro (≤2 s), outro,
  tiny watermark at most. **Never** a cartoon face carrying scenes (v1 failure).
- **Banned**: emoji chips, CSS-cartoon mascot scenes, whole-section caption
  blocks, generic stock montages, mixed random AI imagery.
- Captions: built from the captured **word timings** (Edge WordBoundary or ASR
  round-trip) — timings are data; presentation differs by format.
  **Long-form (primary): sentence-level lower-third captions** — a full
  sentence (or natural clause) per cue, set in the lower third, calm and
  documentary; **not** the Shorts word-pop style. **Derivative Shorts (later
  phase):** 3–5 word cues, max 2.0 s each (agent-kit S6), keyword highlighted
  in Scheele-green/gold. Whole-section caption blocks are banned in both
  formats (v1 failure). Style reference: Inter SemiBold ~52 px at 1080p
  (scale for 1920-wide long-form), #F2F2F2, thin outline + soft shadow.
- Thumbnails: original, ≤5 words, one real image or strong plate + the Orb mark.
  No stolen thumbnails, no misleading imagery (policy + trust).

## Tool roles (Bilal's picks, with verdicts)
| Tool | Role in Orb Theory | State |
|---|---|---|
| HyperFrames | Main editor/renderer (HTML→MP4); kinetic type + HTML-native motion scenes | ✅ Proven |
| Remotion | Motion-graphics scene engine (diagrams, process animations, data-driven scenes) | ✅ **Proven** — pilot v3 verdict (`remotion-test/VERDICT.md`) + v3 production signature scenes; per-scene engine choice in the motion manifest |
| MoneyPrinterTurbo | Shorts assembly pipeline only | ⚠️ Code-ready, UNPROVEN end-to-end |
| fogleman/ln | Signature 3D line-art scenes (maps, objects) | Needs Go + per-scene code |
| Libraries.dev `thinking-orbs` | Orb "thinking" micro-visual inside compositions | Style asset |
| drawably | Hand-drawn annotation style for labels/sketches | Style asset |
| vercel-labs/vgpu | Shader backgrounds/transitions, sparingly | Low value on GPU-less VM — skip by default |
| ip-as-logo-skill | Process for generating the Orb logo mark with an image model | Needs an image model |

## Topic slate (first 10, approved 2026-10-25; format order pivoted 2026-10-26)
Long-form (the slate, in production order): **(1) Scheele's Green — Episode
001, in production as the long-form standard-bearer** · (2) first life,
reconstructed without photos · (3) Kiruna, the town that moved 3 miles ·
(4) why your brain deletes most of every day · (5) the map that lied for 400
years (California as an island) · (6) elevators made skyscrapers
psychologically possible.
Held for the later derivative-Shorts phase (or future long-form re-scoping):
the 15-minute city your great-grandparents lived in · why astronauts can't
taste salt properly · "hello" vs "ahoy" · the library that burns every 100
years on purpose (that framing must pass the facts gate before scripting).
