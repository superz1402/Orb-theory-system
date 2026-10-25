# GitHub Actions — how Orb Theory runs on GitHub

This repo is not just documentation: it is a working production floor.
GitHub Actions runners have the clean network this pipeline needs (the
reference VM's egress proxy blocks Edge-TTS synthesis and stalls model
downloads), so the stages that need the open internet run **here**, while
scene design, scripting, and gates stay agent-driven. Everything below is
implemented in `.github/workflows/` — not aspirational.

| Workflow | File | What it does | Trigger |
|---|---|---|---|
| **voice-tts** | `voice-tts.yml` | S4 voiceover: Edge TTS (house voice) + WordBoundary timings | Push to `episodes/**/voice-input.txt` or `.github/smoke/tts.txt`; manual |
| **asr-qc** | `asr-qc.yml` | QC: faster-whisper transcription diffed word-by-word against the script | Manual |
| **render-smoke** | `render-smoke.yml` | Renders the Remotion smoke card and publishes it as a prerelease — proves Actions → Release end to end | Push to `.github/smoke/render.txt`, the example, or the workflow; manual |
| **release-video** | `release-video.yml` | Creates the GitHub Release for a finished video, video attached | Manual |

---

## 1. voice-tts — the production voice

Runs `scripts/edge_tts_actions.py` (pattern adapted from Bilal's opuscar
`gen_tts_andrew.py`): the script file is split into blocks, each block is
synthesized with Microsoft Edge TTS — house voice
**`en-US-AndrewMultilingualNeural` at −3%** (−4% long-form; pass it as the
`rate` input) — with per-block retries and resumability, and WordBoundary
events are captured for word-level caption timing. Outputs land next to the
input script:

- `<stem>.audio.wav` — full narration, 24 kHz mono PCM
- `<stem>.words.json` — every word with absolute start/duration (the S6 caption contract)
- `<stem>.timing.json` — per-block durations and starts

**To voice an episode:** write the narration to
`episodes/<NNN>-<slug>/voice-input.txt` and push — the run starts by itself.
Or: Actions tab → **voice-tts** → *Run workflow* → set `script_path`
(and `voice`/`rate` if deviating from the house standard).

**Outputs:** artifact **`voice-<episode-folder>`** on the run (audio +
words + timing, 90-day retention), plus the committed run record (§5).

Pacing law still applies (AGENTS.md rule 16): the rate is chosen here, at
casting time. Nothing downstream may time-stretch the result.

## 2. asr-qc — the round-trip check

Transcribes narration audio with **faster-whisper** and diffs it,
word by word, against the script that was voiced. This is the check that
catches a voice mispronouncing a name the script spelled correctly —
Bilal's benchmark from the Somerton film is **0 mismatches / 1,967 words**.

Run it manually: Actions tab → **asr-qc** → *Run workflow*:

- `script_path` (required) — the script that was voiced
- Audio source, first match wins: `audio_path` (a file in the repo) →
  a voice artifact (`audio_artifact_run_id` + `audio_artifact_name`) →
  `<stem>.audio.wav` sitting next to the script
- `model` — tiny/base/small/medium (default `small`)
- `strict` — when true, any mismatch fails the job; otherwise the report
  is informational (the QC gate judges it, per `docs/quality-gates.md`)

**Outputs:** artifact **`asr-qc-report`** (`asr-qc-report.md` + `.json`),
the report is also written to the run's job summary, plus the run record.

## 3. render-smoke — proof the loop works

Renders `examples/remotion-smoke/` — a 3-second 1920×1080 motion-graphics
card (animated title, a timeline that draws itself, a slam stamp; no CDN,
all local) — verifies it with ffprobe, uploads it as an artifact, and
**creates a prerelease GitHub Release `smoke-<run_number>` with the MP4
attached**. If this release exists, the entire chain Bilal watches —
push → render → Release — is proven on this repo, on this account.

It fires automatically when `.github/smoke/render.txt` changes, and can
be run manually any time.

## 4. release-video — every published video becomes a Release

**The rule: a video is not "published" in this system until its GitHub
Release exists.** The Release is the durable, watchable record of the
finished video — the MP4 is attached as a release asset, alongside the
episode's metadata and credits.

Run manually: Actions tab → **release-video** → *Run workflow*:

- `episode_number` (e.g. `001`), `episode_slug` (e.g. `scheeles-green`),
  `version` (semver, e.g. `1.0.0`)
- Video source — one of: `video_path_in_repo`, **or**
  `artifact_run_id` + `artifact_name` (+ `video_filename_in_artifact`)
  from the run that rendered it
- `title` (optional; defaults to the first heading of the episode's
  `metadata.md`), `prerelease` for draft/review cuts

**Tag convention (Bilal's opuscar style):**

```
video-<NNN>-<slug>-v<MAJOR.MINOR.PATCH>
e.g.  video-001-scheeles-green-v1.0.0
```

The attached MP4 is renamed canonically
(`orb-theory-001-scheeles-green-v1.0.0.mp4`), notes are assembled from
the episode's `metadata.md` + `credits.md` when present, and the asset
set + ffprobe are recorded in the run record (§5).

## 5. Run records — how results are read back (`runs/`)

The GitHub connector this system is operated through has **no Actions
API**: it cannot list runs, read logs, or fetch artifacts. So every
workflow ends with a **Commit run record** step that writes its
structured results back into the repo:

```
runs/<workflow>/<run-id>/
  status.json     run id, job status, inputs, headline numbers
  voice-tts/      + <stem>.words.json, <stem>.timing.json
  asr-qc/         + asr-qc-report.md, asr-qc-report.json
  render-smoke/   + render-manifest.json (ffprobe of the render)
  release-video/    status.json carries the tag, asset list, probe
```

Media never goes in git: audio lives in run artifacts, videos live on
their Releases. `runs/**` matches no workflow's push-trigger paths, so a
record commit can never retrigger a workflow. Records are append-only —
an agent reading results reads the newest `runs/<workflow>/*/status.json`.

## 6. How Bilal watches

- **Actions tab** — every run, live: click a run to watch each step's log
  as it happens (voice synthesis, renders, releases). A green tick = the
  stage passed; the job summary on voice/ASR runs carries the report.
- **Releases tab** — the finished shelf: every smoke test and, via
  release-video, every published episode with its MP4 attached,
  downloadable and playable in the browser.
- **Commits** — `runs:` commits after each workflow are the paper trail;
  each one is a completed stage reporting back.

## 7. Roadmap (designed, NOT yet wired — do not present as working)

- **Episode scene renders as a matrix workflow.** Long-form episodes
  render scene-by-scene (§S7 of `docs/pipeline.md`); once Episode 001's
  scene manifest locks, each scene becomes one matrix job across
  parallel runners — collapsing the reference VM's ~5.5–8.5 h serial
  render — with assembly + the full QC battery as the final job, feeding
  release-video. The render-smoke workflow is the proven kernel of this.
- **Voice → ASR chaining.** voice-tts success can dispatch asr-qc
  automatically against the same script once the episode cadence starts.
