# Orb Theory — Agent-Native Documentary System

A complete, agent-native production system for **Orb Theory**, a faceless YouTube
channel where a thinking-orb narrator explains *why the world works that way* —
curiosity science, history, and human behaviour, in English, for a global audience.

This repo is the unified, completed form of Bilal Ansari's earlier documentary
projects (see `PROVENANCE.md`). It is written so that **any AI agent, starting cold,
can read this repo and run the whole system**: research → facts gate → script →
license gate → voice → render → QC gate → human approval → upload → monitoring.

**Start here: `AGENTS.md`.** It is the operating contract. Everything else supports it.

## The quality bar (non-negotiable)

Bilal rejected the first pilot as "AI slop". That rejection defines this system:

- **Real images, real cases.** Visuals are built on real, license-verified archival
  images (Wikimedia Commons / Wellcome Collection / National Library of Medicine),
  credited in the description. No generic stock sludge, no CSS-cartoon mascots,
  no emoji chips, no caption-block walls.
- **Facts gate.** Narration may only state facts that are in the episode's verified
  dossier. If it isn't verified, it isn't said.
- **License gate.** No asset enters a timeline without a recorded license, author,
  and source URL. No license string → no asset. No exceptions.
- **QC gate.** Every render passes a written QC report (audio levels, caption sync,
  duration, license ledger complete) before a human ever sees it.
- **Character + retention (v3).** Scripts are performed by a recurring
  character, The Archivist (`docs/character-bible.md`), written to a scored
  retention system (`docs/retention-scripting.md`), and checked by **Gate 4 —
  effort & originality**: a reviewer must be able to *verify* the craft
  (asides counted, original analysis named, per-scene motion and score,
  image-fit manifest), not take it on faith.
- **Motion graphics, not slideshows (2026-10-26 pivot).** The primary format
  is long-form 16:9, and its dominant visual language is true motion
  graphics — animated diagrams, process animations, maps, timelines, data
  graphics, kinetic typography. A scene whose only motion is Ken Burns /
  parallax drift over a still is a slideshow scene and fails Gate 4;
  ≥65% of runtime must be motion-graphics scenes, declared per scene in a
  motion manifest.
- **Natural pace (2026-10-26 pivot).** Narration measures 125–145 wpm on
  the final mix. Time-stretching narration to hit a runtime is banned —
  pilot v3 was rejected for exactly that.
- **Human-approval gate.** Nothing is uploaded until Bilal approves the final video.
  Uploads default to **unlisted**; the human flips to public.
- **GitHub is the production floor + archive.** Voice, ASR QC, and renders
  run on GitHub Actions (`docs/github-actions.md`); every workflow reports
  back as a committed run record under `runs/`. A finished video is not
  "published" until its **GitHub Release** exists — tag
  `video-<NNN>-<slug>-v<X.Y.Z>`, MP4 attached as a release asset.

## Quickstart (cold agent)

```bash
# 1. Read AGENTS.md, then docs/channel-bible.md and docs/pipeline.md
# 2. Check the environment (see AGENTS.md § Environment — three proven workarounds live there)
python3 --version   # >= 3.11
node --version      # >= 22
ffmpeg -version
# 3. Open or create an episode folder under episodes/NNN-slug/ from templates/
# 4. Run the stages in docs/pipeline.md in order. Never skip a gate.
```

## Status (honest, 2026-10-26)

| Piece | State |
|---|---|
| Pipeline S0–S8 design | ✅ Adopted from Bilal's `documentary-agent-kit`, adapted in `docs/pipeline.md`; ADAPT analysis of all 8 of Bilal's documentary repos **merged 2026-10-25** (see `PROVENANCE.md`) |
| HyperFrames rendering on reference VM | ✅ **Proven** (real renders; two workarounds required — see `docs/troubleshooting.md`) |
| License gate (code-enforced) | 📐 **Designed** — design merged (`docs/pipeline.md` §S3) from `documentary-engine/core/stills/` (allowlist regex, validated downloads, auto-ledger). The code exists in Bilal's repo; it is **not yet vendored into this repo or run for an Orb episode** |
| Plate prep (duotone grade) | 📐 **Designed** — `prep_plates.py` design merged (§S3); palette swapped to Orb emerald/gold on paper only, not yet run |
| QC battery (ASR round-trip + freezedetect + spec asserts) | 📐 **Designed** — gate spec merged in `docs/quality-gates.md` from last-stop `qc.py`, kit S7, ahyeon `qc.py`, documentary-engine `asr_check.py`. Components proven inside Bilal's own films (e.g. somerton: 0 ASR mismatches / 1,967 words); **not yet assembled or run as one battery here** |
| Edge TTS — production route (GitHub Actions) | ✅ **Implemented in-repo** (2026-10-26): `scripts/edge_tts_actions.py` (opuscar pattern, no proxy hacks) + `.github/workflows/voice-tts.yml` — house voice `en-US-AndrewMultilingualNeural` @ −3%, WordBoundary capture. **Published 2026-10-26**: this repo lives at github.com/superz1402/Orb-theory-system and the initial push armed the voice-tts smoke run; run outcomes are read from the `runs/` records the workflow commits back, never assumed |
| Edge TTS — local synthesis | ⚠️ Voices list works via proxy fix; **synthesis blocked** on reference VM (WebSocket handshake through the MITM proxy). No transport fix exists in any of Bilal's repos — the Actions route above is the answer, not a local patch |
| Kokoro TTS (offline fallback) | ✅ **Proven** on the reference VM (pilot v1/v2, `bm_george` @ 0.92, per-sentence takes) |
| MoneyPrinterTurbo | ⚠️ Code-ready for Shorts; needs one LLM key + one free stock key for a full run (**UNPROVEN** end-to-end) |
| Episode 001 (Scheele's Green) | v1 **rejected** (AI slop); v2 rebuilt with real licensed images — verdict: *"better but needs more improvement"*; v3 produced to the v3 standard (Archivist performance, Remotion parallax scenes, scene-matched score) and **REJECTED by Bilal 2026-10-26** on three grounds: **pace** (~165 wpm `atempo` finish — *"too quick for no reason"*), **format** (vertical Short; he wants long-form 16:9), and **slideshow feel** (parallax/Ken Burns over stills + narration + subtitles — *"that's what we hate and do not want at all"*). **Episode 001 is now in production as a long-form 16:9 episode (8–12 min) — the new standard-bearer under the pivot below** |
| V3 standard (character / retention / media / Gate 4) | 📝 Docs added 2026-10-25; **tested by Pilot v3** — character, retention scripting, score map, and Gate 4 all functioned, and the pilot was still rejected (see Episode 001 row). The lesson is recorded in the gates themselves: a standard a rejected episode passes is a bug in the standard — hence the pivot row below |
| **FORMAT PIVOT (2026-10-26)** | 🔀 **Primary format is now long-form 16:9 (1920×1080), 8–12 min episodes.** Proposed cadence **1 long-form/week — PROPOSAL, pending Bilal's approval**. Shorts demoted to a derivative format (cut from approved long-form, later phase). **Pacing standard:** 125–145 wpm on the final mix; `atempo`/time-stretch narration **banned outright** (v3's ~165 wpm finish is the documented mistake); scripted pauses + music-only chapter interludes (≈4–8 s); long-form loudness −16 LUFS. **Motion-graphics-first rule:** slideshow scenes (Ken Burns/parallax-only) **fail**; ≥65% of runtime must be true motion-graphics scenes (taxonomy in `docs/channel-bible.md`); every still embedded inside a motion scene; no static full-screen image >3 s; per-scene **motion manifest** (`07_motion_manifest.json`) checked at Gate 4. Written into channel-bible, retention-scripting, character-bible, pipeline (S5/S6/S7), quality-gates, AGENTS (rules 15–16) — **written, not yet proven: Episode 001 long-form is its first test** |
| Remotion (motion-graphics scene engine) | ✅ **Proven** — pilot v3 feasibility verdict (`pilot-v3/remotion-test/VERDICT.md`: spec render on the reference VM, ~41.8 s per finished second) and v3 production signature scenes. Consequence recorded in `docs/pipeline.md` §S7: long-form renders are scene-by-scene, checkpointed, unattended jobs (8–12 min ≈ 5.5–8.5 h render on the reference VM) |
| GitHub Actions layer (voice / ASR-QC / render-smoke / release-video) | ✅ **Implemented in-repo** (2026-10-26) — four workflows in `.github/workflows/`, smoke triggers in `.github/smoke/`, Remotion smoke project in `examples/remotion-smoke/`, full guide in `docs/github-actions.md`. Every workflow commits a structured run record to `runs/<workflow>/<run-id>/` (the connector-readable bridge — the connector has no Actions API). **First runs armed 2026-10-26**: the initial snapshot push carried the `.github/smoke/` triggers, arming the first **voice-tts** and **render-smoke** runs under superz1402; outcomes are pending and will be read from the `runs/` records + the `smoke-<n>` prerelease, not assumed |
| YouTube upload / channel | ⛔ Not started. Needs Bilal's one-time Google/YouTube sign-in; nothing has ever been uploaded by this system |
| This repo | ✅ **Published 2026-10-26 to [github.com/superz1402/Orb-theory-system](https://github.com/superz1402/Orb-theory-system)** (public). Account chosen by Bilal: **superz1402**, where his documentary systems live; **ansaribilal14 is kept as-is** for his other project. Published via the official GitHub connector (snapshot push, sync record kept beside the local checkout). The initial push carried `.github/smoke/tts.txt` + `.github/smoke/render.txt`, **arming the first voice-tts + render-smoke runs** — outcomes pending, read from `runs/` records. A finished video is not "published" until its GitHub Release exists (tag `video-<NNN>-<slug>-v<X.Y.Z>`, opuscar style) |

Anything marked **UNPROVEN** or **DRAFT** in this repo means exactly that. Do not
present it as working. Prove it on a real episode, then update the status table.

## Layout

```
README.md            this file
AGENTS.md            THE operating contract — read first, obey always
PROVENANCE.md        where every part of this system came from
docs/                channel bible, character bible, retention scripting,
                     media sources, pipeline, quality gates, policy,
                     troubleshooting, github-actions (the CI floor)
templates/           episode brief, script, credits/metadata, QC report
episodes/            one folder per episode (artifacts are the contracts)
scripts/             helper tooling (Edge-TTS proxy wrapper for local VMs;
                     edge_tts_actions.py — the production Actions voice)
.github/workflows/   voice-tts, asr-qc, render-smoke, release-video
.github/smoke/       push triggers that fire the smoke workflows
examples/            remotion-smoke — the minimal proven render project
runs/                machine-readable records committed back by workflows
```

## Owner

Bilal Ansari (GitHub: `superz1402`, `ansaribilal14`). Operator agent: Myang.
License: **to be confirmed by Bilal before publication** — see `LICENSE-TBD.md`.
