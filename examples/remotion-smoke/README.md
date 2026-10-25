# remotion-smoke

The smallest honest Remotion project in this repo: one composition,
`SmokeCard` — 90 frames (3 s) at 30 fps, 1920×1080.

It exists to prove, on a clean GitHub Actions runner, that the render stack
Episode 001 long-form depends on actually works end to end: Node + Remotion
+ headless Chromium producing a real H.264 MP4 with real motion graphics
(animated title, a timeline that draws itself, a slam stamp — see
`src/SmokeCard.tsx`). `.github/workflows/render-smoke.yml` renders it and
attaches the MP4 to a prerelease GitHub Release.

Run it locally (any machine with Node ≥ 20 and ~1 GB free for Chromium):

```bash
cd examples/remotion-smoke
npm install
npm run render        # -> out/smoke.mp4
```

All assets are local and system fonts only — no CDN fetches, ever (the
reference VM's egress proxy kills them; see `docs/troubleshooting.md`).
