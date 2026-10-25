# Pipeline — S0 → S8

Adapted from Bilal's `documentary-agent-kit` (MIT) stage contracts, fitted to
Orb Theory's formats and to the tooling proven on the reference VM.
**Run stages in order, one at a time. Each stage validates its input artifact
exists before running and writes exactly one output artifact before exiting.
Never delete prior artifacts. A stage whose output exists and passes validation
is not re-run.**

Episode folder: `episodes/NNN-slug/` (see `episodes/README.md`).

| Stage | Name | Input → Output artifact | Gate / notes |
|---|---|---|---|
| S0 | Brief | topic sentence → `00_brief.json` (use `templates/episode-brief.md` fields) | One specific angle, not a listicle. **Format defaults to long-form 16:9, target 8–12 min** (2026-10-26 pivot); hook line drafted here. |
| S1 | Research & facts | brief → `02_facts.md` + `sources.md` | Every fact carries a source URL, checked against the primary source where possible. Tag facts VERIFIED / UNVERIFIED. |
| — | **FACTS GATE** | — | Script may only use VERIFIED facts. See quality-gates.md. |
| S2 | Script | facts → `03_script.md` (or `.json` with per-beat lines) | Per-sentence lines (captions + per-sentence TTS depend on it). Hook ≤2 s. Human review available here; Bilal's approval is mandatory at S7, optional here. |
| S3 | Source media | script → `04_media_manifest.json` + `CREDITS.md` + prepped plates | Download real images (Commons/Wellcome/NLM APIs) through the **code-enforced license gate** (below). Record file title, author, license, source URL per asset at download time — not later. Every passing plate is then **plate-prepped** (below) before S5. |
| — | **LICENSE GATE** | — | Code-enforced, not honour-system (design below). Only allowlisted licenses with complete ledger entries may proceed. Strip embedded audio from any downloaded video. |
| S4 | Voiceover | script → `05_voice/*.wav` + `audio/words/*.words.json` + `timings.json` | **Production route: GitHub Actions synthesis** (house voice, WordBoundary capture — detail below) once this repo is published; **local Kokoro fallback** offline. Timings come from real audio durations + captured word boundaries. |
| S5 | Timeline + motion manifest | media + voice → `06_timeline.json` + `07_motion_manifest.json` | Locked scene table in the somerton pattern: per scene — line ids, lead-in, tail, minimum duration, named cut type — computed from *measured* voice durations, with last-stop gap calibration `gap_scale = clamp((target − intro − outro − Σvoice) / Σpause_slots, 0.4, 2.6)` so runtime hits the brief. Scripted pause beats and chapter interludes are data (declared silence slots/holds), not accidents. Only manifest assets may appear. **Motion manifest (2026-10-26): per scene — engine (Remotion / HyperFrames), motion type(s) from the channel-bible taxonomy, still assets embedded + their graphic treatment** — Gate 4 computes the ≥65% motion-graphics runtime from it. A scene with no taxonomy motion type is designed as a slideshow scene and must be redesigned at this stage, not at QC. |
| S6 | Captions & metadata | timeline → `captions` (SRT/ASS), `metadata.md`, `thumbnail` | **Long-form captions: sentence-level lower-third cues** grouped from the S4 word timings (a sentence or natural clause per cue — the Shorts 3–5-word pop style, agent-kit S6, is reserved for derivative Shorts); spot-check sync at open/mid/outro. Metadata from `templates/credits-metadata-template.md`; **credits block generated from the license ledger, copied verbatim**; AI-disclosure line included. Thumbnail 1280×720, ≤5 words, licensed subject image, legibility checked at 200 px wide. |
| S7 | Render & QC | timeline + captions → `final.mp4` (working name) + `08_qc_report.md` | **Scene-by-scene rendering + checkpointing is the standard render strategy (2026-10-26)** — see §S7 below. Never one monolithic render for long-form. QC report via template. |
| — | **QC GATE** | — | All checks in quality-gates.md pass or the episode loops back. |
| — | **HUMAN-APPROVAL GATE** | — | Bilal approves the exact final file. Silence ≠ approval. |
| S8 | Publish | approved final + metadata → `09_publish.json` | YouTube Studio upload by the operator agent under Bilal's one-time sign-in (or Data API v3, resumable insert, ~1600 quota units/upload, ≤5/day). Privacy **unlisted**, synthetic-content disclosure ON, description = metadata.md incl. credits. Record video ID + URL in `09_publish.json`. Human flips to public. **Status: UNPROVEN — no upload has ever been performed by this system.** |

## S3 detail — the license gate is code (from documentary-engine `core/stills/`)

Adapted from Bilal's `documentary-engine/core/stills/` (`fetch_stills.py`,
`commons_search.py`, `prep_plates.py`) — the strongest implementation in his
repos. A human "being careful" is not a gate; this is:

1. **Declarative request.** Each episode declares its plates in a `stills.json`:
   `{id, file, aspect, caption, use, query}`. Sourcing is driven by the script's
   visual queries (ahyeon `source_media.py` pattern), never by browsing around.
2. **Allowlist check.** For each candidate, query the Commons API `imageinfo`
   with `extmetadata` and match the license string against the allowlist regex
   `^(public domain|cc0|cc by(-sa)?( [1-4](\.d)?)?|attribution)`. **Anything
   else — including fair use — aborts the build.** Fair-use exclusions are
   documented by name in the episode folder (documentary-engine skipped the
   famous Isdal composite sketch on exactly this rule).
3. **Download + validate.** 1600 px thumbnail via curl with a descriptive
   User-Agent. Reject unless: ≥40 KB, JPEG/PNG magic bytes check out, and PIL
   measures width ≥640. (Ahyeon's variant adds: mime must be image, no SVG,
   ≥900×600, download >5000 B.)
4. **Auto-ledger.** The tool writes `stills/credits.json` itself — source title,
   page URL, license, artist, credit string, validated flag. Exit 0 **only if
   every plate passes**. The YouTube description's credits appendix is
   *generated from this ledger* (ahyeon pattern), never hand-typed.
5. **Honest captions.** A plate caption may only claim what the source supports;
   modern photos are labelled "MODERN VIEW", period images carry their year, no
   AI image may impersonate evidence, drawn evidence stays visibly drawn, and
   every plate carries an on-screen author+license tag.

**Plate prep (the anti-slop grade, `prep_plates.py`).** Every passing plate is
prepped before S5: cover-crop to scene aspect → resize 1200w → autocontrast
luma → **3-stop duotone LUT** in the film's palette (Orb Theory: emerald/gold —
shadows/mids/highlights stops) → seeded gaussian grain (σ5.5) → vignette (−18%).
Real photos land inside the drawn world in one palette instead of looking pasted.

**When an episode outgrows Commons hand-picking — `imgacq` (opuscar-studio).**
For episodes needing >10 plates or non-Commons sources, adopt Bilal's
`opuscar-studio/scripts/imgacq/` ledger pattern instead: provider priority
SearXNG (self-hosted, opt-in) → Openverse → NASA → Internet Archive → Commons;
keyless, bounded timeouts + backoff, no proxy/CAPTCHA evasion. Downloads are
validated (magic bytes + full Pillow decode + size caps); **failures are
recorded, never silently substituted**; sha256 + dHash dedup. The per-film
`ledger.json` records source page, media URL, creator, license + rights URL,
sha256, dimensions, scene slot, and a **classification** —
`authentic_verified | documentary_context | illustration | reconstruction |
unverified` (search metadata alone can never yield `authentic_verified`;
unclear license ⇒ flagged, never auto-approved; **NC/ND refused at staging**).
Its `stage` command drops an approved asset into the renderer's cache slot with
zero renderer changes; absent slots keep labelled-reconstruction fallbacks.
(This system exists because an earlier ad-hoc fetcher with no license check
caused a watermark incident — documented in opuscar `docs/IMAGE-ACQUISITION-PLAN.md`
as history not to repeat.)

## S4 detail — voice: GitHub Actions synthesis is the production route

No repo of Bilal's contains a transport workaround for Edge TTS on a
MITM-proxied network — because none of them run synthesis on the constrained
machine. **Their workaround is architectural: synthesis runs on GitHub Actions
runners** (clean egress), and the audio is pulled back over HTTPS. Ahyeon and
the agent-kit run whole pipelines via `Actions → Run workflow`; last-stop puts
its production stages on the runner (`OPS.md`). Orb Theory adopts the same
pattern as its **production voice route, effective once this repo is published
to GitHub**:

- **House voice (Bilal's standard, opuscar BRAIN.md Step 4 — "edge-tts or
  nothing"): `en-US-AndrewMultilingualNeural`, rate −3%** (≈136 wpm on
  documentary copy; agent-kit S4 specifies −4% for longform). One voice for the
  whole episode — no per-chapter changes.
- **Pacing law (2026-10-26):** the finished narration measures **125–145 wpm
  on the final mix** (Gate 3 asserts it). Achieve pace here — voice and rate
  selection — and in the script's engineered pauses. **No stage downstream
  may time-stretch narration (`atempo` or equivalent) for any reason**;
  pilot v3's `atempo` finish to ~165 wpm is the documented, rejected mistake
  (`docs/retention-scripting.md` §Pacing).
- **Job shape** (copy the opuscar `work/video-004-*/src/gen_tts_andrew.py`
  pattern): the workflow takes the episode's lines file; per narration block it
  runs `edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary")`,
  streams chunks, writes the audio, and **captures WordBoundary events** →
  `audio/words/<id>.words.json` (`offset/1e7`, `duration/1e7` in seconds) —
  these drive S6 caption cues and SFX alignment. Wrap each block in
  `asyncio.wait_for(…, 75 s)` (edge-tts can hang mid-stream); 4 attempts with
  backoff `2*(attempt+1)` s and a 0.35 s pause between blocks; validate mp3
  >1000 bytes; convert to 24 kHz mono PCM WAV with trailing-silence trim
  (`silenceremove` −45 dB + 0.25 s pad). **Resumable:** blocks whose wav+words
  already exist are skipped. The workflow uploads `voice/*.wav + words/*.json +
  timing.json` as an artifact/Release; the operator machine downloads it via
  HTTPS (which works through the proxy that blocks the WebSocket).
- **Pronunciation is data, not luck:** the script carries a **lexicon**
  (ahyeon `script.json.lexicon`: name → phonetic spelling, substituted into the
  spoken text only, e.g. `"YG": "Y-G"`) and a **`say` field** per line where
  needed (opuscar `tts_zh.py`: text actually spoken vs text shown in
  subtitles — for numbers, abbreviations, names).
- **Offline fallback: local Kokoro** (documentary-engine/somerton/ostrich all
  shipped Kokoro films; `core/tts/tts.py`, per-line wav + durations, default
  speed 0.92). Piper-tts is the agent-kit's documented second fallback
  (approximate word timing from chars/sec). The local Edge-TTS proxy wrapper in
  `scripts/` remains useful for voice *listing* only — see troubleshooting.

## S7 detail — render strategy: scene-by-scene + checkpointing (2026-10-26)

Long-form on this VM class (2 cores / 7.7 GB / no GPU) is rendered **one scene
at a time, never as one monolithic composition**:

- **Why:** pilot v3 evidence, both directions. A single monolithic 62 s
  HyperFrames render **died at 92% on memory**; splitting into ≤34 s comps
  succeeded. Remotion's measured rate on the reference VM is **~41.8 s per
  finished second** (`pilot-v3/remotion-test/VERDICT.md`) — an 8–12 min
  episode is therefore roughly **5.5–8.5 hours of render**: an unattended,
  checkpointed job by design, not an interactive one. Plan episodes around
  that (overnight batches); do not promise same-day long-form renders.
- **Engines:** **Remotion is PROVEN for motion-graphics scenes** (v3 verdict:
  full layered composition at spec on this VM; it then carried v3's
  signature scenes in production) and **HyperFrames is proven** for
  compositions/kinetic type. The per-scene engine is the motion manifest's
  choice (S5) — the render stage executes the manifest, it does not
  re-decide it. (Remotion caveats from the verdict: reuse the cached Chrome
  Headless Shell, `TMPDIR` on the big disk, concurrency ≤2 — RAM binds, and
  set an explicit bitrate/CRF: grain layers make default encodes huge.)
- **Checkpoint contract:** each scene renders to its own file
  (`render/scenes/scene-NNN.mp4`), is validated on completion (ffprobe spec +
  operator stills at scene start/mid/end + freezedetect on the scene), and
  is **not re-rendered** unless its inputs change — the scene file is the
  checkpoint. A failed scene reports its exact error and blocks only itself;
  earlier scenes stand. Final assembly is a concat (`-c copy` where codecs
  allow) of validated scene files + the mixed audio, followed by the full
  Gate 3 battery on the assembled file (scene-level passes never substitute
  for the final-file battery).
- **HyperFrames mechanics** still apply per scene (TMPDIR fix + vendored
  assets — troubleshooting.md).

## Formats: long-form primary, Shorts derivative (2026-10-26 pivot)

- **Long-form (the flagship):** 1920×1080, 8–12 min, chaptered script,
  motion-graphics-first scenes (Gate 4), sentence-level lower-third ASS
  captions, −16 LUFS, narration 125–145 wpm on the final mix.
- **Shorts (derivative, later phase only):** cut from an *approved*
  long-form episode — 1080×1920 vertical reframe, 40–60 s, 3–5-word
  word-timed cues burned in. No standalone Shorts pipeline runs until Bilal
  re-opens the phase; MoneyPrinterTurbo is **not** on the critical path
  (its stock defaults violate the anti-slop rule in any case).

## Resumability & failures
A failed stage writes nothing (or a clearly-marked partial) and reports the exact
error upward. Fix the cause (check troubleshooting.md first), then re-run only
that stage. Never paper over a gate failure by editing the artifact by hand.

## Where the components live in Bilal's repos (provenance for the stages above)

`documentary-engine/core/stills/` → S3 gate + plate prep ·
`opuscar-studio/scripts/imgacq/` → S3 at scale ·
`opuscar-studio work/video-004-*/src/gen_tts_andrew.py` + `ahyeon-documentary/pipeline/tts.py`
→ S4 Actions job · `documentary-engine/core/tts/tts.py` → S4 Kokoro fallback ·
`somerton-man-documentary film/lock_timeline.py` + last-stop gap calibration → S5 ·
`documentary-agent-kit` S6 → S6 caption spec · QC battery sources are mapped in
`docs/quality-gates.md`. Full analysis: `PROVENANCE.md`.
