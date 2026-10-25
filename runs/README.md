# runs/ — machine-readable workflow records

Every GitHub Actions workflow in this repo commits its structured results
back here when it finishes:

```
runs/<workflow>/<run-id>/
  status.json          always: run id, job status, inputs, headline numbers
  …workflow files      voice-tts: <stem>.words.json + <stem>.timing.json
                       asr-qc:    asr-qc-report.md + asr-qc-report.json
                       render-smoke: render-manifest.json (ffprobe)
                       release-video: status.json (tag, assets, probe)
```

**Why this exists:** the GitHub connector this system is operated through
has no Actions API — it cannot list workflow runs or read their logs. This
folder is the designed bridge: results land as ordinary repo files, readable
with the connector's normal file tools. Videos themselves are never stored
here — they live on their GitHub Release (see `docs/github-actions.md`).

Records are append-only history; folders are never edited after the run
that created them. `runs/**` matches no workflow's push-trigger paths, so
record commits can never retrigger a workflow.
