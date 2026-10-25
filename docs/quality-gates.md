# Quality Gates

Four gates reject work. They are not advisory. Templates in `templates/`.
Gates 1–3 check correctness (facts, licenses, render). Gate 4 — added in v3 —
checks *effort and originality*: the things a human reviewer, and YouTube's
inauthentic-content review, actually judge.

## Gate 1 — FACTS (after S1, enforced at S2)
- [ ] Every narration claim maps to a line in `02_facts.md` tagged VERIFIED.
- [ ] Each VERIFIED fact has a source URL; primary/institutional sources preferred
      (museum, library, journal) over aggregators.
- [ ] Numbers, dates, names spelled and pronounced deliberately in the script
      (write years as words for TTS: "seventeen seventy-five"). Dossier facts
      carry confidence/source tags (`[WIKI] [NEWS] [OFFICIAL] [FANSITE]
      [UNVERIFIED]` — agent-kit); UNVERIFIED items are listed explicitly and
      are FORBIDDEN in narration; numbers must match the dossier
      digit-for-digit, **including in titles and descriptions**. Contested
      claims are labelled in the script and get the on-screen SPECULATION
      stamp in the render (somerton mechanic) — never stated as settled.
- [ ] Script carries its pronunciation lexicon + `say` fields (see
      channel-bible §Voice) — names are decided here, not discovered at QC.
- [ ] Titles/hooks may compress but may not contradict the verified facts; the
      script body states the precise version. (Ep. 001 pattern.)
- [ ] Claim-vs-facts diff is clean at QC time (re-checked in Gate 3).

## Gate 2 — LICENSE (after S3, enforced at S5/S7) — code-enforced, not honour-system
Design copied from Bilal's `documentary-engine/core/stills/` (see
`docs/pipeline.md` §S3 for the full mechanism):
- [ ] Assets entered the timeline **only** through the stills gate tool
      (declarative `stills.json` → Commons `imageinfo`/`extmetadata` check →
      validated download → auto-written `credits.json` ledger). Hand-fetched
      files bypassing the tool fail this gate.
- [ ] Each asset's license string matched the allowlist regex
      `^(public domain|cc0|cc by(-sa)?( [1-4](\.d)?)?|attribution)` at fetch
      time. **Anything else — including fair use — aborted the build**;
      fair-use exclusions are documented by name in the episode folder.
- [ ] Download validation passed per asset: ≥40 KB, JPEG/PNG magic bytes,
      PIL-measured width ≥640. The gate tool exited 0, which means *every*
      declared plate passed — a partial pass is a fail.
- [ ] Every visual/audio asset is in `04_media_manifest.json` AND `CREDITS.md` with:
      file title · author · license · source URL · local filename · scene used in.
- [ ] Licenses limited to **Public Domain / Public Domain Mark / CC0 / CC BY /
      CC BY-SA**. NC or ND assets are rejected outright (imgacq refuses them
      at staging).
- [ ] If `imgacq` (opuscar) was used: its `ledger.json` is present with
      sha256, dimensions, scene slot, and classification per asset
      (`authentic_verified | documentary_context | illustration |
      reconstruction | unverified`); no asset classified `unverified` is in
      the timeline, and failed downloads were recorded, never substituted.
- [ ] Images come from Wikimedia Commons / Wellcome Collection / NLM or an
      equivalently documented source — never "found on Google Images".
- [ ] Downloaded video (if any) has embedded audio stripped.
- [ ] Music: only license-clean sources with attribution recorded (e.g. CC BY
      score with credit) or locally generated beds (ffmpeg ambient pad — ep. 001 v2).
      Music search default is Openverse **CC0-only** (last-stop pattern).
- [ ] The credits appendix in the episode metadata/description is **generated
      from the ledger** and copied **verbatim**. Attribution is part of the
      license, not a courtesy.

## Gate 3 — QC (at S7, before human approval) — the QC battery
The battery is assembled from Bilal's own QC code: last-stop `engine/qc.py`
(spec asserts + freezedetect), agent-kit S7 fail-the-run list, ahyeon
`pipeline/qc.py` bands, and documentary-engine `core/tts/asr_check.py`.
**The auditor is a separate code path from the builder** (last-stop doctrine):
it re-derives everything from the final file — a builder bug cannot
self-certify. Builder and auditor agreeing is the pass.

Automated battery (all must pass on the **final** mp4):
- [ ] **ffprobe spec asserts** (last-stop `qc.py`): long-form (primary)
      1920×1080 / derivative Shorts 1080×1920 · H.264, yuv420p · 30 fps
      (24–30 per format) · AAC (48 kHz stereo long / per spec shorts) ·
      **faststart verified at byte level** (moov before mdat).
- [ ] **Duration vs target ±2 s** (last-stop) and within the brief's ±3%
      (agent-kit S7) — the stricter of the two applies.
- [ ] **freezedetect**: `ffmpeg freezedetect n=0.003 d=2.0` — any frozen frame
      ≥2 s **fails** (anti-slideshow proof), unless that span is a hold
      declared in `06_timeline.json` (intentional holds are data, kit S7).
- [ ] **blackdetect**: black frames only where the timeline declares them
      (intro/outro); black anywhere else fails.
- [ ] **Loudness**: two-pass loudnorm to **−16 LUFS for long-form** (opuscar
      BRAIN law — the primary format), **−14 LUFS ±1** for derivative Shorts
      (accepted band −18…−11 per ahyeon), true peak ≤ −1.2 dBTP; voice
      clearly above the music bed (music ≈ −13 dB under VO, ducking ≈ −7 dB).
- [ ] **Pacing (2026-10-26)**: narration pace measured on the final mix —
      narration word count (from the ASR round-trip transcript / script)
      divided by narration duration — lands in **125–145 wpm**
      (`docs/retention-scripting.md` §Pacing). Outside the band fails; the
      fix is re-performance, never processing. Corollary assert: **no
      time-stretch in the chain** — the episode's build scripts and render
      log must contain no `atempo` / time-stretch / playback-rate operation
      on narration audio. (Pilot v3 precedent: `atempo` finish to ~165 wpm,
      rejected by Bilal — "too quick for no reason.")
- [ ] **ASR round-trip** (documentary-engine `core/tts/asr_check.py` — the
      single most valuable QC script in Bilal's repos): faster-whisper
      transcribes **every** rendered narration line and diffs it against the
      script — English: exact word match after normalization (incl.
      number-word conversion). **Exit 1 on any mismatch.** Per-line `asr`
      override fields handle names/numbers; residuals are documented in the
      QC report, never hidden (their Isdal film shipped with "Gades"→"Gates"
      recorded as an accepted residual). Somerton benchmark: 0 mismatches on
      1,967 words is achievable — aim there.
- [ ] **Slop + facts LLM audit** (ahyeon `qa_nim.py` pattern): an LLM pass over
      the whole narration vs the episode's facts dossier returns JSON —
      unsupported claims `{beat_id, claim, problem}` and **slop phrases**
      `{beat_id, phrase}` (named patterns: "in today's world", "delve",
      "testament to", "game-changer", repeated openers, hollow superlatives
      without receipts) plus a tone score. Any unsupported claim fails the
      gate; slop phrases are rewritten, not argued with.
- [ ] **Editing-doctrine numbers** (last-stop, QC-asserted): average shot
      length ≤8 s; ≥6 cuts per narration minute; never the same source twice
      in a row; no return to a source within 6 slots; slot length 2.5–8 s;
      screen never blank while narration plays; picture cuts **0.30 s before**
      the anchor word (the entity is on screen when named).

Operator checks (in addition to the battery):
- [ ] **QC stills before full render** (documentary-engine discipline):
      single frames at scene timestamps were inspected *before* the render
      was committed to — never render blind.
- [ ] Caption sync spot-checked at ≥3 beats (start / middle / end); captions
      match the format's style — sentence-level lower-third cues (long-form)
      or 3–5-word cues ≤2.0 s (derivative Shorts) — never whole-section
      blocks; read-time holds: on-screen text stays ≥ words/3 + 1 s after
      animating in.
- [ ] Frame inspection at ≥5 timestamps by the operator: real images legible,
      duotone grade consistent, no banned elements (emoji chips, cartoon
      mascot scenes, caption walls), no empty mid-frames.
- [ ] Claim-vs-facts diff clean; license ledger complete; thumbnail 1280×720
      (or 1080×1920 for Shorts) with ≤5 words, legible at 200 px wide.
- [ ] QC report written from `templates/qc-report-template.md` and stored as
      `08_qc_report.md` in the episode folder — pass/fail per item, with the
      battery's raw outputs attached, not vibes. (The ASR round-trip above is
      the pronunciation check; it supersedes the old "human listen" note —
      where ASR cannot run, flag that explicitly instead of claiming a check
      that wasn't performed.)

## Gate 4 — EFFORT & ORIGINALITY (anti-slop) (at S7, with Gate 3; script-side items pre-checked at S2)

Added in v3 after Bilal's verdict on pilot v2: v2 passed Gates 1–3 and still
only *matched* his existing system's level. Passing correctness is the floor.
Gate 4 is the verifiable evidence that this episode is original, crafted work
— the standard YouTube's July 2025 inauthentic-content policy rewards (see
`docs/monetization-policy.md`) and that a human reviewer can check without
taking anyone's word for it. **Every item produces an artifact or a countable
fact in the QC report. "It feels crafted" is not a pass.**
**Strengthened 2026-10-26 after Bilal's verdict on pilot v3:** v3 passed the
v3-era Gate 4 and was still rejected — its motion was parallax drift over
stills, which reads as a slideshow. The motion section below is now the
motion-graphics-first rule (slideshow ban, ≥65% motion-graphics runtime,
per-scene motion manifest). A gate that a rejected episode passed is a bug in
the gate; this section is the fix, and the precedent is recorded in it.

Character & script (specs: `docs/character-bible.md`, `docs/retention-scripting.md`):
- [ ] **Character asides present and counted:** ≥1 marked `[ASIDE]` beat per
      ~15 s of narration (Shorts) in the Archivist's voice; the QC report
      states the count and the timestamps. Zero asides = a readout = fail.
- [ ] **Retention rubric passed at S2:** `03_script_scores.md` records ≥16/20
      with no zero dimension (rubric in `docs/retention-scripting.md`).
      First line passes all four first-line rules; open loop planted by
      0:10 (0:30 long-form) and **paid in full, with evidence, in the final
      third** — an unpaid loop fails here, not just in the rubric.
- [ ] **Original analysis, not present in any single source:** the QC report
      names the episode's original contribution (its framing, comparison, or
      conclusion) and the auditor confirms it appears in **none** of the
      dossier's sources. If the episode's argument can be found whole in one
      Wikipedia article or one video, it is a retelling — fail.
- [ ] **No source-structure tracking:** narration order/framing does not
      follow any single source's structure (the LLM audit in Gate 3 checks
      phrasing; this checks architecture).

Motion & visual craft (the MOTION-GRAPHICS-FIRST rule, 2026-10-26 —
supersedes the v3 animation standard; taxonomy in `docs/channel-bible.md`):
- [ ] **The slideshow ban:** any scene whose only motion is Ken Burns
      zoom/pan or parallax drift over a still image is a **slideshow scene
      and fails** — regardless of layer count, grade, or annotations riding
      on the drift. (Pilot v3 precedent: its Remotion parallax signature
      scenes satisfied the old v3 checks below and Bilal still rejected the
      episode — *"image slideshows with narration and subtitles"*,
      2026-10-26. The old ≥2-motion-layers check is therefore **retired as
      a pass criterion**: layers are craft, not motion graphics.)
- [ ] **≥65% of runtime is true motion-graphics scenes:** computed from the
      motion manifest (below) over the episode runtime excluding the ≤2 s
      intro mark and the outro card. A scene counts only if its primary
      content is generated animated graphics of a taxonomy type — animated
      diagram, process animation, animated map, animated timeline, data
      graphic, kinetic typography, artifact manipulation. The QC report
      states the measured percentage and the per-scene breakdown.
- [ ] **Per-scene motion manifest exists and matches the render:**
      `07_motion_manifest.json` (written at S5) records **per scene**:
      engine (Remotion / HyperFrames), motion type(s) from the taxonomy,
      the still assets embedded and their graphic treatment, and scene
      in/out times. The auditor spot-checks ≥3 scenes against the render;
      a scene whose rendered motion doesn't match its manifest entry (or
      that has no taxonomy motion type) is a slideshow scene — see above.
- [ ] **Every still is embedded in a motion scene:** no still image appears
      as a scene in itself; each is inside a motion-graphics scene with
      graphic treatment (diagram context, desk handling, annotation system,
      data framing). **No static full-screen image holds >3 s** (tightened
      from the v3 4 s rule); the only exceptions are holds declared in
      `06_timeline.json` *and* justified in the QC report (a verdict pause,
      not a lazy stretch). Gate 3's freezedetect ≥2 s battery still applies
      underneath: the battery catches frozen renders; this gate catches
      frozen *ideas*.
- [ ] **A motion-graphics event in every scene:** something is *built,
      drawn, counted, routed, or transformed* on screen per scene — a
      diagram assembles, a process step plays, a timeline node lands, a
      document is stamped/compared, type performs the verdict. A scene whose
      only event is "image appears (with drift)" fails — that was the v2
      ceiling and the v3 rejection.

Score:
- [ ] **Scene-matched licensed score:** the episode's score map (written at
      S2, `docs/retention-scripting.md`) exists and the render obeys it —
      per-scene music states, a mandatory state change at the loop plant and
      at the payoff, every cue license-verified in the Gate 2 ledger
      (sources: `docs/media-sources.md`). One ambient pad under the whole
      episode fails this gate outright (v2's known weakness, now a rule).

Artwork & fit:
- [ ] **Episode-specific artwork:** title card, thumbnail, and any graphic
      devices are made for *this* case (its plates, its palette, its
      objects) — not restyled channel templates with the title swapped.
- [ ] **Image-fit manifest exists and passes:** `05_image_fit.json` (written
      at S3/S5) records, **per image**: focal point (what must survive —
      a face, a label, a headline), fit mode (cover / contain-with-plate-
      backdrop / split-plate / detail-crop), the safe crop for 16:9
      (primary format; 9:16 only for a derivative Short), and any
      camera/drift path's start and end frames checked against that crop.
      **No key content is cropped in any QA frame** — the Gate 3 frame
      inspection explicitly re-checks the manifest's focal points at every
      inspected timestamp. (v2 precedent: the Woollams advert's "ARSENIC"
      cropped mid-zoom at ~56 s — a v2 "minor issue" that is a Gate 4
      **fail**.)

## The anti-slop test (applies at every gate)
Show the episode's frames to a stranger: could they tell which real case, place,
and documents this episode is about from the visuals alone? If the frames could
illustrate any topic with the nouns swapped, it fails — that's the v1 pilot
failure mode, and it's a monetization risk, not a taste issue. Gate 4 is this
test made countable; when the two disagree, Gate 4's checklist governs.
