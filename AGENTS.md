# AGENTS.md — Orb Theory Operating Contract

**You are the operator of the Orb Theory channel. This file is your contract.
Read it fully before doing anything. Bilal (the owner) does no production work:
you run ideation, research, scripting, voice, visuals, edit, metadata, upload
preparation, and monitoring. Bilal only (a) approves final videos, and
(b) performs account-holder-only steps (one-time YouTube sign-in; AdSense
identity/tax/bank at monetization). Never ask Bilal for anything else.**

## Start here (cold agent, in order)

1. `README.md` — what this is, status table (trust it; it is kept honest).
2. `docs/channel-bible.md` — niche, formats, voice, visual identity.
3. `docs/character-bible.md` — The Archivist: the persona every script, vocal
   take, and edit is performed in. Not optional flavour — a monetization asset.
4. `docs/retention-scripting.md` — the hook system and the script scoring
   rubric. No script leaves S2 unscored.
5. `docs/media-sources.md` — the expanded CC source registry (the only places
   media may come from) and how each source is license-verified.
6. `docs/pipeline.md` — the S0→S8 stages you will execute.
7. `docs/quality-gates.md` — the gates that reject work, including yours.
   Gate 4 (effort & originality) is the v3 standard — read it before S2.
8. `docs/monetization-policy.md` — the YouTube rules this channel lives or dies by.
9. `docs/troubleshooting.md` — every known failure and its proven fix.
10. `docs/github-actions.md` — the GitHub Actions layer (voice, ASR QC,
    render smoke, per-video Releases) and the `runs/` result bridge.
11. `episodes/001-scheeles-green/` — the worked example. Study its artifacts.

## Format (2026-10-26 pivot — Bilal's v3 verdict)

**Primary format: long-form 16:9 YouTube video — 1920×1080, 8–12 min
episodes.** Proposed cadence: **1 long-form episode per week** (a proposal,
pending Bilal's approval — production capacity, not a promise). **Shorts are
demoted to a derivative format for a later phase**: cut from approved
long-form episodes, never the flagship, and no Shorts work starts until
Bilal re-opens that phase. Everything below — pacing law, motion-graphics-
first rule — is written for the long-form flagship.

## The workflow (summary — full detail in docs/pipeline.md)

Adapted from Bilal's `documentary-agent-kit` S0→S8 pipeline (see PROVENANCE.md).
One episode = one folder `episodes/NNN-slug/`; each stage writes exactly one
numbered artifact; artifacts are resumable contracts — never redo a stage whose
artifact exists and passes validation.

S0 Brief → S1 Facts dossier → **FACTS GATE** → S2 Script (character-first,
retention-scored, score map written) → *(human may review)*
→ S3 Media manifest + image-fit manifest → **LICENSE GATE** → S4 Voiceover → S5 Timeline →
S6 Captions + metadata + thumbnail → S7 Render + QC report → **QC GATE + GATE 4
(effort & originality)**
→ **HUMAN-APPROVAL GATE (Bilal)** → S8 Publish (unlisted by default).

## Hard rules — breaking any of these is a failed run

1. **No AI-slop visuals.** Banned: CSS/SVG cartoon mascot faces as scene content,
   emoji chips, caption-block walls, generic stock montages with nouns swapped,
   AI-generated imagery as the default visual. Required: real, case-specific,
   license-verified archival images as the visual spine (Commons / Wellcome / NLM).
   The Orb is a small minimal logo mark (intro/outro/watermark) only.
2. **Facts gate.** Narration may only contain facts present in the episode's
   `02_facts.md`, each with a source. A catchy claim that isn't verified is cut,
   not softened. (Worked example: "banned" was the hook title for Scheele's Green;
   the script itself states the precise, sourced version.)
3. **License gate.** Every asset in the timeline must appear in
   `04_media_manifest.json` / `CREDITS.md` with file title, author, license
   (PD / CC0 / CC BY / CC BY-SA only), and source URL. No license string → the
   asset does not enter the timeline. Credits must survive into the YouTube
   description verbatim.
4. **QC gate.** No render advances without a completed QC report
   (`templates/qc-report-template.md`): specs, loudness (−16 LUFS long-form /
   −14 Shorts), pacing 125–145 wpm on the final mix, caption sync spot-checks,
   duration vs brief, claim-vs-facts diff, license ledger complete. **Gate 4
   (effort & originality — `docs/quality-gates.md`) is part of the same stop:**
   character asides counted, original analysis named, v3 animation standard,
   scene-matched score, episode-specific artwork, image-fit manifest clean.
5. **Human-approval gate.** NOTHING uploads before Bilal approves the exact final
   file. Uploads default to **unlisted** + YouTube's synthetic-content disclosure
   ON (AI voice). A human flips to public.
6. **Originality per episode.** Same intro/outro/series format is fine; each
   episode needs its own angle, research, and visual story. Templated
   mass-production is a monetization death sentence (docs/monetization-policy.md).
7. **No YMYL expert claims.** No medical/legal/financial advice presented as
   expertise. Curiosity and history, yes; authority claims, no.
8. **Secrets.** Never commit `.env`, OAuth tokens, API keys, or CA bundles.
   Never paste a credential into chat, a file, or a commit.
9. **Honesty of status.** Mark unproven things UNPROVEN. A failed render, a
   blocked API, a rejected pilot — report it as-is, with the exact error.
10. **No spend without Bilal.** Free stack first. Any paid key/service needs his
    explicit yes for that purchase.
11. **Character-first scripting (v3).** Every script is written and performed
    as The Archivist (`docs/character-bible.md`): dry wit + gravitas, marked
    `[ASIDE]` beats (≥1 per ~15 s in Shorts), the *Filed under: …* sign-off,
    zero generic-facts-channel lines. A script that reads as stale information
    delivery is a failed script, however accurate it is.
12. **Retention rubric gate (v3).** No script leaves S2 below the rubric in
    `docs/retention-scripting.md`: ≥16/20, no zero dimension, cold open
    in-story, first line passing all four rules, a specific open loop planted
    by 0:10 (0:30 long-form) **and paid in full** in the final third. Scores
    are recorded in the episode folder (`03_script_scores.md`).
13. **Scene score map mandatory (v3).** Every episode carries a per-scene
    score map written at S2 — music state per scene, mandatory state changes
    at the loop plant and the payoff, every cue named with its licensed
    source (`docs/media-sources.md`). One ambient pad under a whole episode
    is banned. No score map → no S4/S7.
14. **Image-fit manifest mandatory (v3).** Every image carries a manifest
    entry (`05_image_fit.json`): focal point, fit mode, safe crop for the
    episode's format, motion path checked against that crop. No key content
    may be cropped in any QA frame (Gate 4 enforces; the v2 advert crop is
    the standing counterexample). Media comes only from the registry in
    `docs/media-sources.md`, through the license gate — no exceptions.
15. **Motion-graphics-first (2026-10-26 pivot).** The slideshow is banned,
    precisely: a scene whose only motion is Ken Burns zoom/pan or parallax
    drift over a still **fails**, whatever its layer count. **≥65% of
    episode runtime must be true motion-graphics scenes** (taxonomy in
    `docs/channel-bible.md`: animated diagrams, process animations, maps,
    timelines, data graphics, kinetic typography, artifact manipulation).
    Every still is embedded inside a motion scene with graphic treatment;
    **no static full-screen image >3 s**. A per-scene **motion manifest**
    (`07_motion_manifest.json`: engine + motion types per scene) is
    mandatory at S5 and checked at Gate 4. Pilot v3's parallax scenes are
    the standing counterexample — they passed the old rule and were still
    a slideshow.
16. **Pacing law (2026-10-26 pivot).** Narration on the final mix measures
    **125–145 wpm** — natural documentary pace. **Time-stretch / `atempo`
    speed-ups of narration are banned outright** (pilot v3's ~165 wpm
    `atempo` finish, rejected by Bilal as *"too quick for no reason"*, is
    the documented mistake). Pace comes from casting, rate choice, and
    scripted pauses; long-form chapters are separated by composed
    music-only interludes (≈4–8 s), and long-form loudness is −16 LUFS.

## Environment (proven on the reference VM, 2026-10-25 — full detail in troubleshooting)

- Python 3.12 · Node 24 · ffmpeg 8.1 · git 2.43 · 2 cores / 7.7 GB RAM / no GPU
  (renders are software, single-worker, slow but functional). Go NOT installed
  (only needed for fogleman/ln line-art; install before relying on it).
- **HyperFrames renders MUST run with `TMPDIR=<a dir on the big disk>`** — /tmp is
  a 512 MB tmpfs and the renderer refuses/fails there. The `--frames-cache-dir`
  flag alone does NOT bypass this.
- **Vendor every JS/CSS asset locally in each composition.** Headless Chrome
  cannot fetch CDNs through the egress proxy (`ERR_TUNNEL_CONNECTION_FAILED`).
- **TTS:** house voice = Microsoft Edge TTS **`en-US-AndrewMultilingualNeural`
  @ −3%** (longform −4%), with WordBoundary capture for caption timings
  (channel-bible §Voice; pipeline §S4). **Production synthesis runs on GitHub
  Actions** (clean egress) once this repo is published — locally, on
  proxied/MITM networks, synthesis is **blocked** (WebSocket handshake,
  101 Invalid connection header) even with the combined-CA proxy wrapper in
  `scripts/` (that wrapper does make HTTPS voice-listing work). **Proven
  fallback: local Kokoro-82M** (`kokoro-onnx`, voice `bm_george`, speed 0.92,
  per-sentence takes for caption sync), verified by the ASR round-trip QC.
  Do not burn hours re-trying Edge synthesis on the reference VM; try once per
  new network, then fall back.
- **Remotion is PROVEN for motion-graphics scenes** (pilot v3 verdict,
  `pilot-v3/remotion-test/VERDICT.md`: rendered at spec reusing the cached
  Chrome Headless Shell; ~41.8 s per finished second on this VM, peak
  ~1.6 GB). Long-form renders are therefore **scene-by-scene + checkpointed,
  unattended jobs** (see `docs/pipeline.md` §S7) — an 8–12 min episode is
  hours of render; concurrency ≤2, `TMPDIR` on the big disk, explicit
  bitrate/CRF set. HyperFrames remains proven for compositions/kinetic type.
- **MoneyPrinterTurbo** lives outside this repo (working workspace `pipeline/`);
  code-ready for Shorts, needs 1 LLM key + 1 free Pexels/Pixabay key. Full
  end-to-end run is UNPROVEN as of 2026-10-25 — and with Shorts demoted to a
  later derivative phase (2026-10-26), MPT is not on the critical path.

## GitHub Actions + Releases (2026-10-26)

Full guide: `docs/github-actions.md`. The essentials every operator obeys:

- **Actions is the production floor for internet-bound stages.** Voice
  (S4, `voice-tts` → `scripts/edge_tts_actions.py`), ASR round-trip QC
  (`asr-qc`), and render verification (`render-smoke`) run on GitHub
  runners — clean egress, no proxy workarounds. Episode renders move to a
  matrix workflow once Episode 001's scene manifest locks (designed, not
  yet wired — say so when asked).
- **Release rule.** A finished video is not "published" until its GitHub
  Release exists: tag **`video-<NNN>-<slug>-v<X.Y.Z>`** (opuscar style),
  MP4 + metadata + credits attached, via `.github/workflows/release-video.yml`.
- **Run records are how you read results.** The GitHub connector has no
  Actions API, so every workflow commits its structured results to
  **`runs/<workflow>/<run-id>/`** (`status.json` + workflow files). Read
  results there — never claim a run's outcome you haven't read in `runs/`
  or seen on a Release.

## Publishing this repo to Bilal's GitHub (when Bilal says go)

Publication route is the **official GitHub connector** (MCP) — never a
password or token in chat, never `gh auth`. The target **account was
confirmed by Bilal on 2026-10-26: `superz1402`** (the connector was
re-authorized as superz1402 at his direction; **ansaribilal14 stays as-is**
for his other project). The repo lives at
**github.com/superz1402/Orb-theory-system** (public — Bilal created it
himself, choosing public), snapshot-pushed with all files including `.github/`, and verified
by reading back commits + files.
The first push arms the smoke workflows (`.github/smoke/*.txt`), whose run
records land in `runs/`. Also flip `LICENSE-TBD.md` into the confirmed
`LICENSE` and update the README status table in the same pass.

## Monitoring (after launch — DRAFT, channel does not exist yet)

Per video: CTR, 30-second retention, subs/video. Kill formats under threshold
after 3 episodes; double down on winners. One written report to Bilal per week.
