# Media Sources — the expanded CC registry (v3)

**Status: NEW in v3 (2026-10-25), from Bilal's v3 directive to expand sourcing
beyond Wikimedia with credit through Creative Commons licensing.**

## The absolute rule (unchanged, applies to every source below)

**Only Public Domain / Public Domain Mark / CC0 / CC BY / CC BY-SA assets,
verified per-asset at download time, recorded in the episode's license ledger
(file title · author · license · source URL) and credited in the YouTube
description, generated from the ledger verbatim.** No license string → no use.
No exceptions for "it was on a free site", no fair-use reliance, no Google
Images scraping. NC and ND assets are refused at staging. The verification
mechanism per source is the code-enforced license gate
(`docs/pipeline.md` §S3, Gate 2 in `docs/quality-gates.md`) — where a source
has an API exposing license metadata (Commons, Openverse, Smithsonian,
Flickr), the gate queries it; where it doesn't, the asset's own page metadata
is recorded by the operator *at download time* and the asset stays out of the
timeline until that record exists.

Credit formats below: `Author — "Title" — License — source URL` for images;
music adds the track title and artist page. Credits are **generated from the
ledger**, never hand-typed (Gate 2).

## Images & plates

| Source | Best for | Licenses available | Gate verification | Notes |
|---|---|---|---|---|
| **Wikimedia Commons** | The spine: archival photos, engravings, documents, portraits | PD, CC0, CC BY, CC BY-SA (also others — allowlist filters) | Commons API `imageinfo`/`extmetadata` license-string match against the allowlist regex (§S3) | Proven (ep. 001, 8 plates). Hosts Wellcome/NLM deposits too — credit the depositing institution named in the metadata. |
| **Wellcome Collection** | Medical/scientific history, Victorian ephemera, anatomy, adverts | Mostly CC BY 4.0 for images in their open collection | Asset page metadata + Commons deposit records (V/L numbers) | Proven (ep. 001: Arsenic Waltz V0042226, Woollams advert L0048804). Superb for this channel's cases. |
| **U.S. National Library of Medicine** (NLM / Images from the History of Medicine) | Historical medical books & plates, public-health posters | Predominantly Public Domain (US federal / pre-1930 works) | Item record in the episode ledger; much of the collection is also on Commons (Kedzie plates, ep. 001) | Go through Commons deposits where they exist — the gate already speaks that API. |
| **Internet Archive** (archive.org) | Scanned books (page plates!), early film, ephemera, audio | Mixed — PD for most pre-1930 scans; item-level rights vary | Per-item metadata recorded in ledger; **item-level check mandatory** — "on the Archive" is not a license | The `Shadows from the Walls of Death` full text lives here. Treat every item as unverified until its rights field is read. |
| **Openverse** (openverse.org, WordPress) | One search across Commons/Flickr/Smithsonian/etc.; also audio (see Music) | CC0, CC BY, CC BY-SA (filterable; also returns NC/ND — refused) | Openverse API returns license + attribution per result; gate records both, then re-verifies at the source page | The `imgacq` provider ladder's #2 (opuscar). Good discovery layer; never the final authority — the source page is. |
| **Library of Congress** (loc.gov) | US history: photos (FSA/OWI), newspapers, maps, prints | Largely PD (US federal works + pre-1930); "Free to Use and Reuse" sets are pre-cleared | LOC API/item page rights advisory recorded in ledger | The "Free to Use and Reuse" collections are the fast path — items outside them need the item-level check. |
| **Europeana** | European museums/archives: paintings, manuscripts, photos, objects | PD/CC0/CC BY/CC BY-SA with rights labels per item (also in-copyright items — filtered out) | Rights label on the item page recorded in ledger | Best expansion for European cases (Kiruna, California-island maps). Rights statements are explicit — copy them into the ledger exactly. |
| **Smithsonian Open Access** | Museum objects, natural history, portraits, design | **CC0** for designated Open Access assets | Smithsonian API (api.si.edu) — **requires a free API key** (api.data.gov signup); CC0 flag per asset returned by the API | CC0 = simplest credits in the registry (credit still recorded — courtesy + provenance). Only assets the API marks Open Access/CC0; the rest of the Smithsonian site is not cleared. |
| **NASA** (images.nasa.gov, APOD, JPL) | Space episodes: photos, mission imagery, some video | Predominantly PD (US federal works) | NASA image library metadata in ledger | Caveats: NASA insignia/portraits of identifiable astronauts carry extra rules; third-party images hosted by NASA (e.g. some APOD entries) are **not** PD — per-asset check stands. |
| **Flickr Commons / Flickr CC search** | Documentary & vernacular photography, institutional Commons accounts (archives, libraries) | Flickr Commons = "no known copyright restrictions" (treat as PD-mark, verify per photo); CC search spans all CC types — allowlist applies | Flickr API license field per photo + photo page recorded in ledger | Institutional Commons accounts (national archives etc.) are the gold seam. Individual CC uploads vary in quality of license hygiene — prefer institutions. |

## Video (B-roll / archival clips) — use sparingly, stills are the spine

| Source | Best for | Licenses | Gate verification | Caveats (honest) |
|---|---|---|---|---|
| **Internet Archive** (moving images) | Prelinger films, early newsreel, industrial films | Much PD (Prelinger is explicitly PD) | Per-item rights in ledger; embedded audio stripped per pipeline rule | Quality varies wildly; a clip must pass the same plate-prep/grade discipline as stills. |
| **Wikimedia Commons** (video) | Documentary clips, processes, places | PD/CC BY/CC BY-SA | Same Commons API gate as stills | Small catalogue; check first before going elsewhere. |
| **Pexels / Pixabay (video & images)** | Modern B-roll a case genuinely needs (a lab process, a modern view — labelled "MODERN VIEW") | Pexels/Pixabay **content license** (free to use, attribution not required) — **not a CC license** | License page + asset URL recorded in ledger at download time; operator marks the license as "Pexels License"/"Pixabay Content License", never mislabels it CC | **Content ID caveat (honest):** stock-site assets are a known source of bogus Content ID claims by third parties even when used within the license — keep the ledger + download receipts to dispute with. Attribution not required by the license, but this channel credits anyway (provenance + Gate 4 craft evidence). Never the visual spine; manifest assets only (see pipeline — MPT default stock behaviour stays banned). |

## Music & score (per-scene, mapped — see `docs/retention-scripting.md`)

| Source | Best for | Licenses | Gate verification | Notes |
|---|---|---|---|---|
| **Openverse (audio)** | First search for score cues | **CC0-only search is the house default** (last-stop pattern); CC BY results admissible with credit | Openverse API license field → ledger | CC0 default keeps score credits clean; log the query + result in the score map. |
| **Musopen** | Period-correct classical score (public-domain compositions, dedicated recordings) | PD compositions; recordings carry Musopen's stated PD/CC terms per track | Track page terms recorded in ledger | The natural fit for historical cases — a real 19th-century parlour piece beats a generic pad, and the credit line itself is production value. |
| **Free Music Archive** | Contemporary cues, textures | CC BY / CC BY-SA / CC0 per track (also NC — refused) | Track page license → ledger | Per-track check is mandatory; FMA's catalogue mixes licenses aggressively. |
| **incompetech / Kevin MacLeod** | Reliable scored cues by mood/length | **CC BY** (credit required: composer + track title + incompetech.com) | Track page + license recorded in ledger | The CC BY credit must appear in the description verbatim — the ledger generation handles it. Widely used = some cues are recognisable; prefer less obvious pieces. |
| **Pixabay Music** | Modern beds/stingers | Pixabay Content License (not CC) | Same as Pexels/Pixabay above | Same Content ID caveat as their video — ledger + receipts retained. |
| **YouTube Audio Library** | Channel-standard cues, zero dispute surface | YouTube license (some tracks CC BY — the library marks them; attribution then required) | **Requires the channel's YouTube sign-in** — available only after Bilal's one-time sign-in exists | Zero Content ID risk on library tracks is its real value. Until the channel exists, this source is **UNAVAILABLE** — do not plan score maps around it yet. |
| **Locally generated bed** (ffmpeg) | Fallback texture under narration | Original — no license | Marked "generated" in the score map (ep. 001 v2 pattern) | Fallback only in v3: a generated pad may support a scene, but it may not be the whole episode's score (retention doc bans the single-pad approach). |

## Expansion discipline

- New source proposed? It enters this registry first — with license types and
  a gate-verification method — *before* any asset from it is used. A source
  whose licenses can't be machine- or record-verified doesn't enter.
- The ladder for any given need: **Commons/Wellcome/NLM → Openverse discovery
  → LOC/Europeana/Smithsonian/NASA (topic fit) → Internet Archive →
  Flickr institutions → Pexels/Pixabay (modern needs only)**. Music:
  **Openverse CC0 → Musopen → FMA → incompetech → Pixabay Music → generated**.
- Every expansion is judged by Gate 4: more sources exist to make each
  episode *more specific*, never to make production *more generic*.
