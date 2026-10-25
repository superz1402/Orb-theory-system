> **APPROVED by Bilal, 2026-10-26 ("Approved — put Myang in Episode 001"). In production — first integration: Episode 001.**
> Canonical copy with all assets (myang.svg, character-sheet.png, myang-demo.mp4, Remotion source): `~/workspace/youtube-channel/mascot-myang/` — this file is the design document only.

# Myang, the Archivist — Mascot Design & Integration

**Status: APPROVED by Bilal, 2026-10-26 — the design, all §6 integration modes, and the §7 rule amendment. First integration: Episode 001 (Scheele's Green), at assembly level per §6.**
Origin: Bilal's message of 2026-10-26 with a photo of an AHYEON plush keychain —
*"let's think if we can have an animated Myang there, just like this."*
Deliverables in this folder: `myang.svg` (layered master vector) ·
`character-sheet.png` (1920×1320) · `myang-demo.mp4` (9 s animated proof,
1920×1080) · `build_assets.py` (generator) · `demo/` (Remotion source) ·
`reference-ahyeon-plush.png` (Bilal's photo, kept for the record).

---

## 1. The idea

The Archivist has been a voice for three pilots. Myang gives that voice a
face — the *same* character, not a new one bolted on. The design brief wrote
itself out of the character bible: a keeper of dangerous, beautiful things,
faintly and permanently unimpressed. So the default expression — the one he
wears 90% of the time — is a heavy half-lidded, unimused stare over a tiny ω
mouth. That face **is** the vocal register: flat delivery, dry verdicts,
sarcasm never signalled. When the narration says *"Lovely colour. Pity about
the arsenic,"* this is the face that says it.

He is a plush because the reference is a plush and because plush is the right
metaphor for the archive's keeper: soft archive-glove hands, stitched seams,
a tag with a file number. He handles lethal evidence like a toy — which is
exactly the channel's tonal trick, curiosity with a body count.

## 2. Originality — style language borrowed, design original

The reference is idol merchandise (an AHYEON plush charm), so this design
borrows only the **style language** and nothing else:

| Borrowed (style language) | Original to Myang (the design) |
|---|---|
| Plush-soft blob construction | Cream archival-paper body, taller bean proportions, dashed gold **stitch seams** |
| Bold simple shapes, big expressive eyes | Eyes rebuilt as a rig: separate lids + pupils + twin highlights, tuned to a *sarcastic* default (the reference's eyes sit open; Myang's sit half-lidded) |
| Pointy ear/flap accents | Four rounded **emerald velvet** points with stitched seams (channel palette — the reference is blue) |
| Keychain-charm energy | The bead chain becomes a **gold bead cord holding a "FILE № 001" archive tag** — the show's filing motif, not merch hardware |
| Blush + tiny cat mouth | Kept as genre grammar, redrawn; plus three props that are pure Orb Theory: **emerald bow tie, brass hand-stamp, round archivist spectacles** |

All geometry was drawn from primitives in code (`build_assets.py`,
`demo/src/Myang.tsx`) — nothing traced, no part of the Ahyeon design reused.
Myang is not Ahyeon, not BABYMONSTER-adjacent, and must never be named or
marketed as such.

## 3. Anatomy & palette

- **Body:** one round plush blob, cream (`#F7F1E1` over a `#FCF8ED → #EFE3C4`
  gradient), dashed seam stitching in muted gold (`#D9C69C`).
- **Points:** two ear-points up, two cheek-flaps down — deep emerald velvet
  (`#0E4A38`, gradient `#17614B → #0A3A2C`), the channel's emerald worn as cloth.
- **Face:** near-black plush eyes (`#221C14`) with twin white highlights; soft
  blush (`#E79B9B`); ω mouth in six variants.
- **Props:** emerald bow tie (always worn) · brass hand-stamp (`#C9A227` family,
  red stamp pad) · FILE № 001 tag on a gold bead cord · gold spectacles
  (evidence beats only).
- **Ground/typography:** archive emerald `#0D2B23`, paper `#F2EAD8`, aged gold
  `#C9A227`, verdict red `#B3402A` — the exact channel palette from
  `docs/channel-bible.md`, set in the channel's serif stack.

## 4. The rig (built for code-driven animation)

One layered SVG, named groups: `points` · `tag` · `body` · `face`
(`eye-L`/`eye-R`, each = dark eye + highlights + **clipped** lid + lash line;
`mouth`) · `prop-spectacles` · `bowtie` · `paw-stamp` (arm group pivots at the
shoulder). Expressions are **parameter states**, not redraws — lid coverage,
eye scale, pupil offset, highlight scale, mouth weights, ear perk/droop,
blush, spectacles, arm pose. The same geometry drives the print master
(`myang.svg`) and the Remotion component, so print, sheet and screen can
never drift apart.

### Expression set & usage

| Expression | Parameters (essence) | Fires when |
|---|---|---|
| **Default — unimused** | lids 55%, pupils level, ω mouth | Narration presence, chapter cards, idle. The money shot. |
| **Curious** | lids up, eyes +13%, ear perked, spectacles drop on | An exhibit is introduced / a source is examined closely |
| **Shocked** | lids fully open, eyes +18%, highlights shrink, small "o" mouth | The worst fact in the episode lands — **max once per episode** |
| **Pleased** | happy closed arc eyes, bigger ω, blush up | Verdict delivered, case closed, sign-off |
| **Sleepy** | lids 93%, ear points droop, tiny mouth | Era-transition jokes, "the archive at 3 a.m." beats, long-chapter breathers |
| **Stamp-rage** | squint, flat determined mouth, stamp raised | Only the verdict-stamp beat — determination, not anger at anyone |

Motion language: springs everywhere (no linear moves), breathing idle
(~2.6 s cycle), blink ~every 3 s, squash-and-stretch reserved for the stamp
slam. He never bounces like a cartoon mascot; he *settles*, like plush.

## 5. The animated proof (`myang-demo.mp4`)

9 s, 1920×1080, 30 fps, silent by design (voice is a separate stage). Beats:
idle breathing + blink → slow unimused turn to camera → an evidence card
(Scheele's Green, Exhibit A) slides in; he goes **curious**, spectacles drop
on → stamp raises, face hardens → **SLAM**: squash-and-stretch, "FILED" mark
pops onto the card with a gold impact burst → **pleased** closed-eyes finish
holding the beat while the sign-off types in: *"Filed under: beautiful — and
lethal."*

Honest production notes:

- The render took **41 s for 9 s** on the reference VM — flat vector scenes
  are ~60× cheaper than the photographic parallax scenes measured in pilot v3
  (~41.8 s per finished second). Mascot passes will never be the render
  bottleneck.
- The video rig omits the print master's SVG grain filter on purpose (grain
  makes H.264 work hard; pilot v3 VERDICT caveat). Print keeps the grain;
  screen keeps the softness via gradients and seam dashes.
- QA frames from the actual MP4 were inspected (idle / curious / slam /
  finish). Two real defects were found and fixed during the build: eyelid
  patches first rendered as visible rectangles (now clipped to the eye's own
  ellipse), and the FILED mark first landed across the exhibit's title (now
  placed clear of the text).
- The serif is the Georgia system stack, as in all channel work so far; if
  the channel ever vendors a licensed display serif, Myang inherits it.

## 6. Episode integration (approved — assembly-level, no scene re-renders)

Myang is produced as a **separate overlay/host pass** and composited at
assembly (S7). Scenes already built for Episode 001 are not re-rendered.

1. **Chapter-card host (new renders, cheap).** Each chapter card (~5–8 s)
   becomes a small Myang scene in the demo's staging: card + expression set
   by the chapter's turn. This *adds* the host the long-form structure wants
   without touching chapter content.
2. **Corner-reaction presence (overlay pass).** During motion-graphics
   scenes — never during solemn evidence or victim beats — Myang appears
   bottom-right at ~340–420 px wide, reacting on scripted `[ASIDE]`/verdict
   beats from the existing score map. Cap: **≤4 reactions per episode, ≤3 s
   each, shocked ≤1.** Rendered from the rig alone (transparent pass — see
   caveat below) and composited with ffmpeg `overlay` in the same assembly
   step that already joins scenes.
3. **Evidence-examiner beats (new scenes, optional per episode).** The demo's
   staging *is* this scene type: exhibit card + curious Myang + spectacles.
   Where an episode introduces a key exhibit, this can replace a planned
   artifact-manipulation scene in the motion manifest (taxonomy type stays
   "artifact manipulation" — Myang is the manipulator).
4. **End-card sign-off (replaces the static outro).** The stamp slam + the
   catchphrase, every episode, identical ritual — the series' closing image.
   The Orb mark remains on the card as his seal, per the channel bible.

**What this changes in the current Episode 001 build:** nothing inside the
nine chapter scenes. It adds: chapter cards (if the assembly adopts them), an
overlay track in the S5 timeline + S7 assembly, and a new end card. The
motion manifest gains an `overlay` entry type; Gate 4 gains two countable
checks (reaction count ≤4; no mascot over victim/evidence-solemn beats).

**Technical caveat, stated plainly:** the transparent overlay render
(Remotion → ProRes 4444 / PNG sequence with alpha) is **unproven on this
VM** — the demo renders on the emerald ground. First integration step is a
10-frame alpha test; fallback is rendering reactions on the scene's own
background plate (still no scene re-render — the plate is an input, not the
scene) or restricting Myang to cards/end-card, which need no alpha at all.

## 7. The rule this design amended (approved 2026-10-26)

Honesty required naming it: `AGENTS.md` rule 1 banned "CSS/SVG cartoon mascot
faces as scene content," and the character bible said the Archivist's "visual
embodiment stays minimal… not a cartoon on screen (v1's failure)." Those
rules were written against pilot v1 — a CSS orb face carrying scenes amid
emoji chips. Myang is Bilal's own direction (2026-10-26), so the rules were
amended, not broken. The adopted replacement wording:

> *The Orb remains the channel's logo mark. Myang is the Archivist's face —
> permitted as chapter-card host, end-card ritual, evidence examiner, and
> capped corner reactions under §6. He never carries a scene's information
> content, never appears over victim or solemn-evidence beats, and is never
> drawn in any style but the approved rig.*

Bilal approved the design, all §6 integration modes, and this amendment on
2026-10-26. The amendment is applied in `AGENTS.md` (rule 1 exception +
rules 17–18) and `docs/character-bible.md`; the modes remain independent —
Bilal can retire any one of them without touching the character.

## 8. Why this is also the monetization play

The character bible already argues the persona is a monetization asset: a
recurring character with distinct storylines per episode is the pattern
YouTube's inauthentic-content policy explicitly allows. A *visible* recurring
character strengthens every part of that: recognition in thumbnails and
chapter cards, a ritual sign-off viewers can quote, and a face that makes the
channel's originality legible to a human reviewer in five seconds. The
stamp — a physical verdict, identical ritual, different case each week — is
the series' signature the way the sign-off line already is.

## 9. Files & regeneration

- `build_assets.py` — regenerates `myang.svg`, `character-sheet.svg`,
  `sheet.html`; rasterise the sheet with the cached Chrome Headless Shell
  (`--screenshot`, window 1920×1320, `TMPDIR` on the big disk).
- `demo/` — Remotion project (`src/Myang.tsx` rig, `src/MyangDemo.tsx`
  choreography). Render: `TMPDIR=~/workspace/youtube-channel/pipeline/tmp
  npx remotion render src/index.ts MyangDemo ../myang-demo.mp4 --crf=20`
  (reuses pilot-v3's `node_modules` via symlink; config pins the cached
  Chrome Headless Shell, concurrency 2).
- Approval: granted by Bilal 2026-10-26 — (a) the design itself, (b) all
  integration modes from §6, (c) the rule amendment in §7. First
  integration: Episode 001.
