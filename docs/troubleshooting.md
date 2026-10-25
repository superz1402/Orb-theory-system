# Troubleshooting — every failure we've actually hit, and its fix

Reference environment: Linux VM, 2 cores / 7.7 GB RAM / no GPU, /tmp = 512 MB
tmpfs, all egress via an HTTP proxy (`http_proxy`/`https_proxy` env), Python
3.12.3, Node 24.22.1, ffmpeg 8.1.2. Verified 2026-10-25.

## HyperFrames render refuses: "Low disk space — 0.5 GB free at /tmp"
**Cause:** /tmp is a 512 MB tmpfs; the renderer checks/stages there, and
`--frames-cache-dir` does **not** bypass the check.
**Fix (proven):** run every render with a TMPDIR on the big disk:
`TMPDIR=~/workspace/youtube-channel/pipeline/tmp npx hyperframes render …`
Create that directory first. Apply the same pattern to any tool that stages in /tmp.

## HyperFrames composition hangs/fails: CDN script never loads (`ERR_TUNNEL_CONNECTION_FAILED`, `sub_timeline_script_failure`)
**Cause:** headless Chrome cannot fetch CDN assets (e.g. GSAP from jsDelivr)
through the egress proxy.
**Fix (proven):** download each JS/CSS asset once with curl and reference it
**locally** in the composition. Standing rule: **no CDN references, ever.**

## Edge TTS fails immediately: `ClientConnectorSSLError … WRONG_VERSION_NUMBER`
**Cause:** edge-tts ignores proxy env vars and attempts direct TLS, which the
MITM egress intercepts.
**Partial fix (proven for HTTPS):** pass `--proxy "$https_proxy"` explicitly AND
make TLS verify against a **combined CA bundle** (certifi + egress CA), because
edge-tts hardcodes `certifi.where()`. Wrapper provided: `scripts/edge_tts_via_proxy.py`.
Result on reference VM: **voice listing works (322 voices, HTTPS 200).**

## Edge TTS synthesis still fails: `WSServerHandshakeError 101 Invalid connection header`
**Cause:** synthesis runs over **WebSocket** (`wss://speech.platform.bing.com`);
the egress proxy breaks the WS upgrade handshake even after the TLS fix.
**Status:** UNRESOLVED locally on the reference VM (edge-tts 7.3.1, latest at
test time) — and, per the full analysis of Bilal's 8 documentary repos, **no
transport-level fix exists in any of them**: every implementation is the plain
`edge_tts` library/CLI over its normal WebSocket, no proxy argument, no custom
connector, no REST fallback. None of them ever ran synthesis from a network
like this VM's.
**The production workaround is architectural (adopted — see pipeline.md §S4):**
synthesis runs on **GitHub Actions runners** (clean egress, no MITM proxy) —
the pattern Bilal's ahyeon, agent-kit and last-stop productions actually use
(heavy/production stages on the runner; finished audio committed or attached
to a Release and pulled back over HTTPS, which works fine through our proxy).
The Orb Theory Actions voice job (house voice
`en-US-AndrewMultilingualNeural` @ −3%, WordBoundary capture) becomes the
production route once this repo is published to GitHub; it has not yet run
for Orb Theory, so treat it as designed-not-proven until the first job lands.
**Other workarounds, in order:** (1) run synthesis on any unrestricted network;
(2) a hosted edge-tts endpoint; (3) **fallback — local Kokoro-82M** (proven:
`kokoro-onnx`, model ~340 MB one-time download, CPU, per-sentence WAVs,
voice `bm_george` @ 0.92). Do not loop retries; one attempt per new network,
then fall back.

## ASR round-trip QC fails on a name or number
**Cause:** the TTS pronounced it differently than the script intended
(the pilot v1 worry: Scheele / Scheueur / blancmange were unverifiable until
this check existed).
**Fix:** add the name to the script's **pronunciation lexicon** (phonetic
spelling, substituted into spoken text only) or set the line's **`say` field**;
if the ASR transcript itself is the problem (homophones, number formats), set
the line's **`asr` override** in the script. Re-run `asr_check.py` — exit 1 on
any remaining mismatch is the gate working, not a bug. Accepted residuals
must be written into the QC report (precedent: "Gades"→"Gates", Isdal film).

## QC battery: freezedetect flags a frozen frame ≥2 s
**Cause:** a still plate sat static while narration played — the slideshow
failure mode this channel exists to avoid.
**Fix:** give the plate real motion (Ken Burns zoompan, plate-prep animation,
a card or diagram beat), shorten the slot to the 2.5–8 s doctrine range, or —
if the stillness is a deliberate dramatic hold — declare it as a hold in
`06_timeline.json` so the auditor exempts exactly that span. Never raise the
threshold to make it pass.

## License gate aborts the build on an image you wanted
**Working as designed.** The allowlist regex rejects anything that isn't
Public Domain / CC0 / CC BY / CC BY-SA — **including fair use** (precedent:
documentary-engine skipped the famous Isdal composite sketch on purpose).
**Fix:** find a freely-licensed plate of the same subject, use a period
document instead, or present the item as a clearly-labelled drawn
reconstruction (drawn evidence stays visibly drawn — honest-caption rule).
Never hand-edit the ledger or the regex to force an asset through. Related
history: opuscar's `imgacq` exists because an earlier ad-hoc fetcher with no
license check caused a watermark incident — do not re-create it.

## `git clone` of large repos stalls/times out on this network
**Fix (proven):** fetch the official GitHub **tarball** of the branch and extract
it to the target path (this is how MoneyPrinterTurbo was installed). Same code,
not a git checkout — note it in the install record.

## MoneyPrinterTurbo won't run end-to-end
**Known state:** source + light deps OK; full `requirements.txt` is heavy
(streamlit, faster-whisper, Azure Speech…) and was deliberately **not** forced
on the small VM. It also needs keys: 1 LLM key (Moonshot/OpenAI/Gemini/DeepSeek…)
+ 1 free stock key (Pexels/Pixabay). Prefer the project's `uv sync`/Docker route
as a dedicated step once keys exist. Full run remains **UNPROVEN**.

## Renders are slow / RAM warnings (`hyperframes doctor`: low free RAM, software GPU)
Expected on this VM: 300 frames ≈ 35 s for a trivial 10 s comp; the 52 s ep. 001
v1 render took ~4 min. Mitigations: render per segment + concat `-c copy`,
re-render only changed beats, batch overnight, keep compositions light, one
render at a time.

## Pilot v1 "looks like AI slop" (owner rejection, 2026-10-25)
**Failure mode, recorded so it is never repeated:** CSS glowing-orb mascot face
carrying scenes · emoji chips as visuals · whole-section caption blocks · empty
mid-frames · no music bed · flat synthetic voice pacing.
**Fix:** the v2 pattern — real licensed archival images full-bleed + Ken Burns,
documentary grade/grain, sentence captions, minimal gold logo mark only,
timeline graphics over real plates, quiet generated music bed, per-sentence
voice takes. Enforced by the anti-slop test in `docs/quality-gates.md`.

## "Banned" (or any hook word) vs the facts
If a title/hook compresses the truth, the **script body must state the precise
verified version** and the facts dossier must show both. If the precise version
kills the hook, the hook changes — never the facts. (Ep. 001: some countries
banned arsenic pigments in the 1830s–40s; Britain never formally banned wallpaper
use; production faded after the 1860s and the last brand ceased by the 1890s.)
