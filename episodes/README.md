# Episodes

One folder per episode: `episodes/NNN-slug/` (NNN = zero-padded sequence,
slug = short case name). The folder holds the episode's **stage artifacts** —
they are the contracts between pipeline stages (docs/pipeline.md) and must all
be present before an episode can be called done.

## Required contents (mirrors opuscar per-film folders + kit stage contracts)

```
NNN-slug/
  00_brief.md            S0 brief (from templates/episode-brief.md)
  02_facts.md            S1 verified facts dossier
  sources.md             S1 source log (URLs + what each supports)
  03_script.md           S2 per-sentence script
  04_media_manifest.json S3 license ledger (machine-readable)
  CREDITS.md             S3 license ledger (human-readable; verbatim into description)
  05_voice/              S4 per-sentence voice takes
  timings.json           S4 real narration timings
  06_timeline.json       S5 scene timeline
  metadata.md            S6 title/description/tags (from templates/credits-metadata-template.md)
  thumbnail.*            S6 thumbnail
  08_qc_report.md        S7 QC report (from templates/qc-report-template.md)
  09_publish.json        S8 video ID/URL/privacy — only after human approval
  comp/                  HyperFrames composition (assets vendored locally!)
```

## Media rule
Do **not** commit renders or voice WAVs to git (see `.gitignore`) — they are
regenerable from the artifacts + composition. Following Bilal's opuscar
convention, finished films are attached to **GitHub Releases** tagged
`video-NNN-slug-vMAJOR.MINOR` with the MP4, subtitles, poster/thumbnail,
chapters (long-form), metadata, sources, and credits.

## Worked example
`001-scheeles-green/` — the channel's first episode and this system's reference
implementation, including its v1 rejection and what v2 changed. New agents:
produce episodes that look like 001's **v2** artifact set, not v1's.
