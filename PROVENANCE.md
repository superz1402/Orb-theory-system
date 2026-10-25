# PROVENANCE — where this system came from

Orb Theory's system is Bilal Ansari's own work, unified. All sources below are
Bilal's repos (GitHub accounts `superz1402` and `ansaribilal14`), reused and
adapted with his explicit authorization as owner on 2026-10-25. They were
incomplete projects/setups; this repo is their completion and unification,
merged with what was proven empirically while building the Orb Theory pilots
on the reference VM (2026-10-25).

| Source repo | What was taken / adapted |
|---|---|
| `superz1402/documentary-agent-kit` (MIT) | **The backbone.** S0→S8 stage pipeline, stage-artifact contracts (`00_brief` … `09_publish`), facts gate (confidence tags `[WIKI] [NEWS] [OFFICIAL] [FANSITE] [UNVERIFIED]`; UNVERIFIED forbidden in narration; numbers digit-for-digit incl. titles) + license gate rules, S2 script rules (cold-open law, ban list, ~150 wpm budgets, duration ±3%), S4 voice spec (`en-US-AndrewNeural`, −4% longform, WordBoundary stream → `timing.json`, piper-tts network-blocked fallback), S6 caption spec (3–5-word cues ≤2.0 s), S7 QC fail-the-run list, unlisted-by-default publishing. Adapted in `docs/pipeline.md`, `docs/quality-gates.md`, `docs/channel-bible.md`. |
| `superz1402/documentary-engine` | **The license gate in code** — `core/stills/` (`fetch_stills.py` + `commons_search.py`): declarative `stills.json` → Commons `imageinfo`/`extmetadata` → allowlist regex → validated download → auto-written `credits.json`; non-allowlisted (incl. fair use) aborts the build. **`core/stills/prep_plates.py`** — the duotone plate prep (3-stop LUT, seeded grain, vignette) adopted as the anti-slop grade. **`core/tts/asr_check.py`** — faster-whisper ASR round-trip voice QC (the battery's centrepiece). `core/tts/tts.py` — Kokoro local voice (speed 0.92, per-line wav + durations). `MOTION-CRAFT.md` (nothing linear; ease-out `cubic-bezier(.16,1,.3,1)`; stagger 2–4 frames; read-time ≥ words/3 + 1 s; every cut needs a carrier; holds mandatory) + render discipline (QC stills before full render, `range.mjs` chunked resumable rendering, two-pass loudnorm −14 LUFS / TP −1.2). |
| `superz1402/last-stop-yt-engine` | **QC battery core** — `engine/qc.py`: ffprobe spec asserts on the final mp4 (duration ±2 s, faststart byte check), **freezedetect** anti-slideshow gate, separate builder/auditor code paths. **Editing doctrine as numeric gates**: ASL ≤8 s, ≥6 cuts/min, no source twice in a row or within 6 slots, slots 2.5–8 s, cut 0.30 s before the anchor word. **Narration↔picture clock**: slot math + gap-calibration formula (adopted in S5). `engine/voice.py` edge-tts block pattern (retry, >1024 B check, 48 kHz stereo WAV, `.done` markers). Openverse CC0-only music search + seeded-numpy ambient-bed fallback. Its "No images. Ever." stance was **not** adopted — Orb Theory is image-led (real archival images). Character-lock/face tooling not applicable, skipped. |
| `ansaribilal14/opuscar-studio` ("Lemo Opuscar") | **BRAIN.md — the operating system**: git-as-brain ("if it is not in the repo, it does not exist"), push-after-every-step, append-only worklog format, the 10-step method, GitHub Release convention (assets + full source list + open human-verification claims in release notes). **Voice law (Step 4)**: Edge TTS is the permanent default — house narrator `en-US-AndrewMultilingualNeural` @ −3%, WordBoundary capture per block is contract. **`work/video-004-*/src/gen_tts_andrew.py`** — the Actions voice-job pattern copied in pipeline §S4 (75 s timeout, resumable, words JSON). **`scripts/imgacq/`** — the advanced sourcing system (provider ladder, validated downloads, sha256/dHash dedup, per-film `ledger.json` with asset classifications, NC/ND refused at staging) adopted for episodes that outgrow Commons hand-picking. `DIRECTOR.md` craft rules + `core/render/readcheck.mjs` (automated reading-speed check via `window.TEXTS(t)`). Per-film folder + release-tag convention `video-NNN-slug-vX.Y.Z` (in `episodes/README.md`). NOTE on sources: the 464 MB repo would not full-clone over the reference network; analysis used a **blobless sparse clone** (HEAD `e1f8145`) checked out for BRAIN.md, `lemo-opuscar/core`, styles, `scripts/` incl. `imgacq/`, `docs/`, and `work/video-004-dyatlov-pass/src/` — findings verified against that checkout, other paths materializable on demand. |
| `superz1402/somerton-man-documentary` | **Evidence discipline as a visual mechanic**: claims are EXHIBITs or carry a red SPECULATION stamp; unresolved claims ship in a verification table. **FACTS.md discipline** (unverified = UNSPECIFIED = not used; quotes only where documented). **`film/lock_timeline.py`** — the locked scene-table pattern adopted in S5 (lead/tail/min-duration/cut-type per scene, computed from measured voice; deliberate silence beats as data). Voice precedent: Kokoro `bm_george` @ 0.92, ASR-verified — **0 mismatches on 1,967 words**. Code-drawn framing: documents/evidence as on-screen heroes (how Orb Theory treats archival pages, e.g. *Shadows from the Walls of Death*). |
| `superz1402/ostrich-documentary` | **The Shorts template**: 58 s, one subject, one accumulating visual system (copperplate engraving that draws itself; the film's only colour arrives at the emotional peak), beat-grid cue map (88 BPM), composed silences as events, poster = final frame. Its `build.sh` skeleton (voice → ASR check → events → score → mix → frames → mux → checks → subs → poster) is the shape of our Shorts factory. Plus the engraved house-style lesson: one strong, consistent period aesthetic per episode beats mixed generic visuals. Film is CC0. |
| `superz1402/ahyeon-documentary` | **The working proof of the whole shape** — the kit's 29-min film: licensed stills + cards + edge-tts + Ken Burns, **built and rendered on GitHub Actions** (the precedent for the Actions voice route). Taken concretely: `pipeline/tts.py` (edge-tts CLI per beat @ −3%, per-beat SRT, **pronunciation lexicon**, resumable), `pipeline/source_media.py` (script-driven Commons/Openverse sourcing, `media_manifest.json` ledger, description attribution appendix *generated from the manifest*), `pipeline/build_cards.py` (Pillow title/stat/quote/timeline card system — rebranded to Orb emerald/gold), `pipeline/qc.py` bands (loudness −14, accepted −18…−11), and **`pipeline/qa_nim.py`** — the LLM slop+facts audit (unsupported claims + named slop-phrase patterns as gated JSON) adopted in Gate 3. |
| `superz1402/survival-cinema-agent` | **Paperwork discipline**: the per-production `style_bible.md` (exact palette, lens/lighting language, continuity anchors, an explicit Forbidden list, a style-anchor paragraph appended to every asset prompt) and the **rights & provenance report as a deliverable** (original-work declaration, reference-works table, per-asset source/resolution/originality, a YouTube AI-disclosure section, audit-trail file list) + the 5-file QA report set. Its all-AI-imagery media model is **not** adopted: generated imagery is a last resort here, never the default (anti-slop rules). |

## Third-party foundations (not Bilal's; dependencies, not vendored)

- **HyperFrames** (heygen-com/hyperframes, Apache-2.0) — HTML/CSS/GSAP → MP4 render
  engine. Proven on the reference VM; workarounds in `docs/troubleshooting.md`.
- **MoneyPrinterTurbo** (harry0703, MIT) — Shorts pipeline (script→stock→TTS→subs).
- **Kokoro-82M** (kokoro-onnx) — local TTS fallback. Proven on the reference VM.
- **edge-tts** (Microsoft Edge voices) — preferred TTS; see blocker in troubleshooting.
- **fogleman/ln**, **vercel-labs/vgpu**, **danielwh2/drawably**,
  **Jakubantalik/Libraries.dev** (`thinking-orbs`), **s1dashu/ip-as-logo-skill** —
  style/process assets Bilal selected; roles and verdicts recorded in the original
  findings (`pipeline/FINDINGS.md` in the working workspace; summary folded into
  `docs/channel-bible.md`).

## Primary working documents this repo was distilled from

- Channel plan (`PLAN.md`, working workspace) — concept, niche decision, first 10 topics.
- Pipeline findings (`pipeline/FINDINGS.md`) — every environment fact, install test,
  and blocker, verified 2026-10-25.
- `pipeline/ADAPT.md` — the full per-repo analysis of Bilal's 8 documentary
  repos (completed 2026-10-25, incl. the Edge-TTS verdict and a ranked
  adaptation list). **Merged into this repo 2026-10-25**: license-gate code
  design + duotone plate prep → `docs/pipeline.md` §S3; the GitHub-Actions
  Edge-TTS synthesis pattern + house voice → `docs/pipeline.md` §S4 and
  `docs/channel-bible.md` §Voice; ASR-round-trip + freezedetect QC battery →
  `docs/quality-gates.md` Gate 3 and `docs/troubleshooting.md`; the opuscar
  `imgacq` ledger pattern → `docs/pipeline.md` §S3; component landing map →
  `docs/pipeline.md` (end). The full ADAPT text remains in the working
  workspace and can be vendored to `docs/adapt-analysis.md` if Bilal wants the
  raw analysis published alongside the system.
