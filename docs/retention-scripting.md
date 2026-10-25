# Retention Scripting — the hook system

**Status: NEW in v3 (2026-10-25), from Bilal's v3 directive: "a mini second
should let user see whole videos." UPDATED 2026-10-26 for the format pivot:
long-form 16:9 is now the primary format, and the §Pacing standard below is
hard law from Bilal's v3 verdict. UNPROVEN at long-form length — Episode 001
long-form is the first test. Thresholds are starting values, to be revised
against real retention data, never silently.**

Companion docs: `docs/character-bible.md` (who is speaking),
`docs/quality-gates.md` Gate 4 (where this system is enforced).

## The principle

Retention is written, not edited in afterwards. A viewer decides in the first
seconds and re-decides every few seconds after that. The script — not the
render — carries that load: **every line either advances the case, opens a
question, pays one off, or is an Archivist aside.** A line that does none of
those is cut at S2, however factual it is. Facts that survive only as
information-delivery belong in the dossier, not the narration.

## Pacing standard (2026-10-26 — hard law, all formats)

Bilal's v3 verdict: the narration was *"too quick for no reason."* Pace is a
scripting and casting decision, never a post-production correction.

- **Natural documentary pace: 125–145 wpm, measured on the final mix**
  (narration word count ÷ narration duration in the finished file — Gate 3
  measures it; a mix outside the band fails and is re-performed, not
  processed). For reference: the Edge house voice at −3%/−4% lands ≈136 wpm
  on documentary copy — inside the band by design.
- **Time-stretch / `atempo` speed-ups of narration are BANNED outright** —
  any factor, any tool, any justification ("the take ran long" is a
  scripting problem: cut lines or re-synthesise at a different rate).
  **Documented mistake:** pilot v3's Kokoro performance measured only
  ~131 wpm raw and was finished with per-line pitch-preserved `atempo` to a
  ~165 wpm target. It sounded rushed for no dramatic reason and Bilal
  rejected the episode on it (2026-10-26). The factors are still logged in
  pilot-v3's `timings.json` as the record of what not to do.
- **Pauses are engineered in the script, not hoped for in the take.** Mark
  pause beats in the script (`[PAUSE]`, verdict-line lead-ins, chapter
  boundaries); S5 turns them into declared silence slots in the timeline.
  A script whose lines are wall-to-wall with no marked breathing room fails
  the rubric (dimension 10 covers the facts side; pacing is reviewed with
  the score map at S2).
- **Chapter interludes (long-form):** between chapters, a **music-only
  interlude of roughly 4–8 s** — no narration; the score map states the cue,
  the motion scene carries a visual bridge (timeline advance, map move,
  desk reset). Breathing room is retention design at long-form length, not
  dead air — but it must be *composed* (music + motion), never a frozen
  frame or a silent slate.
- **Loudness reference:** long-form mixes to **−16 LUFS** (Gate 3); the
  pacing band and the loudness spec are checked on the same final mix.

## The hook system (written for Shorts in v3; the rules are the long-form rules too — see Long-form deltas)

### 1. Cold open, in-story (0:00–0:02)
- The video starts **inside the case**, mid-scene or mid-object — never with a
  title card, logo sting, channel intro, or a summary of the topic.
- The first frame is the episode's strongest plate (from the image-fit
  manifest), already moving (animation standard, Gate 4). The Orb mark waits
  for the outro; the hook does not carry branding.
- The first *spoken* line arrives within the first second. Silence, music-only
  openings, and "welcome back" are banned.

### 2. First-line rules (the first spoken line must do all four)
1. **Names a concrete thing** — an object, a person, a place, a number.
   ("This wallpaper killed a two-year-old." — not "Victorians loved green.")
2. **Contains the contradiction** the episode resolves: beauty/danger,
   ordinary/impossible, celebrated/wrong. The Archivist's register is the
   dry pivot (`docs/character-bible.md`).
3. **Is a claim the facts gate has already verified.** A hook that overclaims
   fails Gate 1 even if it "works" — ep. 001's pattern: hook compresses, the
   script body states the precise version within the first third.
4. **Could not open any other episode.** If the line still works with the
   nouns swapped, it is generic — rewrite (this is the Gate 4 test, applied
   at line 1).

### 3. Open loop by 0:10, paid at the end
- By 10 seconds the script has planted **one specific unanswered question**
  (the loop): a named person's fate, an unexplained detail on screen, a
  number that doesn't add up. It must be *specific* — "but why?" is not a loop;
  "the doctor found the same green dust in three houses — and one of them had
  no wallpaper" is.
- The loop is **paid, in full, in the final third** — with evidence, not a
  shrug. Planting a loop the episode doesn't pay is a Gate 4 fail (it is also
  exactly the "manipulative content" pattern in the monetization policy).
- The verdict + sign-off follow the payoff immediately. No new information
  after the payoff except the verdict.

### 4. Pattern interrupt every 5–7 s
- No 7-second span of a Short may pass without a *change of state*: a cut to a
  new plate, an animated annotation landing, a camera move change, a timeline
  stamp, a sound cue, or a caption emphasis shift. The interrupt is planned in
  the script's beat table (S2/S5) — not left to the editor to improvise.
- Interrupts must be *content*, not noise: each one shows evidence, a date, a
  name, a detail zoom. Random zooms and whooshes on nothing are slop (Gate 4).

### 5. Character aside every ~15 s
- One Archivist aside (see character bible: dry pivot, understatement,
  object-address) per ~15 s of narration, written into the script as marked
  beats (`[ASIDE]`), so Gate 4 can count them.
- Asides are the retention of *character*: they are why a viewer follows the
  channel rather than the topic. A script with zero asides is a readout, and
  readouts fail the rubric below regardless of factual quality.

## Per-scene score map (written BEFORE production)

Music is scored to the case, not looped under it. At S2, the script folder
gains a **score map** — one row per scene/beat:

| Beat | Scene intent | Music state | License source |
|---|---|---|---|
| b01 cold open | dread under beauty | sparse piano, single line | (record per asset) |
| b02 evidence | curiosity, forward motion | plucked strings enter | … |
| b03 reveal/payoff | verdict | full theme, then drop to near-silence for sign-off | … |

Rules:
- **A state change is mandatory at the loop plant and at the payoff**; other
  changes follow scene intent. One ambient pad under the whole video (the v2
  approach) is **banned** — it is the audio signature of low-effort content.
- Every cue names its **licensed source at map time** (registry:
  `docs/media-sources.md`; Gate 2 verifies the asset and the credit).
  Locally generated beds (ffmpeg, last-stop pattern) remain the fallback when
  no licensed cue fits, and are marked as such in the map.
- Music never competes with verdict lines: ducking per the loudness spec in
  Gate 3; the sign-off is spoken over near-silence.
- Long-form maps additionally score the **chapter interludes** (§Pacing):
  each interlude is a row in the map (cue, duration ≈4–8 s, the visual
  bridge it plays under) — an unscored gap in the narration is a map defect.

## Caption-cue spec (from word timings)

- Captions are built from **captured word timings** (Edge WordBoundary via
  Actions in production; ASR/per-line timings locally) — never hand-timed,
  never whole-sentence-or-longer blocks.
- Cues of **3–5 words, max 2.0 s each**, hold ≥1.8 s, bottom-centred with safe
  margins (agent-kit S6; see channel bible §Captions).
- The keyword of each cue (the entity or the contradiction word) is
  highlighted in Scheele-green/gold. In the cold open, the contradiction word
  of line 1 is the highlighted word — the eye and the ear get the hook
  simultaneously.
- Picture cuts land **0.30 s before the anchor word** (last-stop doctrine,
  Gate 3) — captions, cuts, and narration are one timing system, not three.

## Long-form deltas (8–12 min — the PRIMARY format since 2026-10-26)

- Cold open + first-line rules are identical; the loop is planted by 0:30 and
  **re-looped**: each chapter pays a small loop and plants the next, with the
  master loop paid in the final chapter.
- Pattern-interrupt cadence relaxes to a change of state every 8–12 s, but
  the motion standard does not relax with it: Gate 4's motion-graphics-first
  rule (≥65% true motion-graphics runtime, no static full-screen image >3 s)
  applies at full strength at long-form length — long-form is where the
  slideshow failure is *easiest* to drift into and is banned hardest.
- Asides: one per 20–30 s is acceptable at length; chapter transitions are
  the composed music-only interludes of §Pacing (motion + score, in
  character by design), never silent title slates over a frozen frame.
- Captions at long-form length are sentence-level lower-third (see
  `docs/channel-bible.md` §Captions and `docs/pipeline.md` §S6) — the
  word-timing data still drives them; the Shorts pop presentation does not
  carry over.

## Script scoring rubric (S2 gate — score the draft, rewrite below threshold)

Score the draft before it leaves S2. Record the scores in the episode folder
(`03_script_scores.md`). **Any single dimension at 0, or a total below 16/20,
sends the script back for rewrite. No exceptions for deadlines.**

| # | Dimension | 0 | 1 | 2 |
|---|---|---|---|---|
| 1 | Cold open | Starts with intro/summary/meta | In-story but generic | In-story, concrete, could open no other episode |
| 2 | First line | No contradiction or unverified claim | Contradiction present, loosely verified | All four first-line rules pass |
| 3 | Open loop | None planted, or planted and unpaid | Planted late / paid weakly | Planted ≤0:10 (≤0:30 long), specific, paid in full with evidence |
| 4 | Pattern interrupts | Beats >7 s (Short) without state change | Mostly planned, gaps remain | Every beat ≤7 s (Short) has a planned content interrupt |
| 5 | Character density | No asides; generic readout | Asides present but sparse/generic | ≥1 marked `[ASIDE]` per ~15 s, unmistakably Archivist |
| 6 | Payoff & verdict | Ends on information or a shrug | Payoff present, verdict flat | Loop paid with evidence; verdict earns the sign-off |
| 7 | Originality of angle | Restates the main source's framing | Some own framing | Analysis/framing not present in any single source (Gate 4 checks) |
| 8 | Score map | Missing or one pad throughout | Map present, no mandatory state changes | Map complete; changes at loop + payoff; every cue license-named |
| 9 | Caption plan | Whole-section blocks / hand-timed | Word timings exist, cues rough | Cues built from word timings in the format's style: sentence-level lower-third (long-form) / 3–5-word cues with keyword highlight (Shorts) |
| 10 | Facts discipline | Unverified claims in narration | Minor compression issues | Every claim maps to a VERIFIED dossier line; hook/body pattern honoured |

**Total: __/20 — threshold ≥16, no zero dimensions. Scorer ≠ scriptwriter**
where two agents are available (the builder/auditor separation doctrine,
Gate 3).
