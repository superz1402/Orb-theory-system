#!/usr/bin/env python3
"""Edge-TTS launcher for proxied / MITM-egress networks (e.g. this project's VM).

Problem it solves: edge-tts hardcodes `ssl.create_default_context(cafile=certifi.where())`.
Behind an HTTPS egress proxy that re-signs TLS with its own CA, verification fails
(`SSLCERTIFICATE_VERIFY_FAILED` / `WRONG_VERSION_NUMBER`).

Fix: build a combined CA bundle = certifi's bundle + your proxy/egress CA bundle, then
monkeypatch `certifi.where()` to return it BEFORE edge_tts is imported, and pass the
proxy explicitly with --proxy.

Setup (once):
    cat "$(python -c 'import certifi; print(certifi.where())')" /path/to/egress-ca-bundle.pem > combined-ca.pem
    export ORB_COMBINED_CA=$PWD/combined-ca.pem     # or place combined-ca.pem next to this script

Usage:
    python scripts/edge_tts_via_proxy.py --proxy "$https_proxy" -l        # list voices (WORKS — HTTPS)
    python scripts/edge_tts_via_proxy.py --proxy "$https_proxy" -t "..." -v en-GB-RyanNeural --write-media out.mp3

KNOWN LIMIT (2026-10-25, see docs/troubleshooting.md): voice LISTING works over HTTPS,
but speech SYNTHESIS runs over WebSocket and the reference VM's egress proxy breaks the
WS upgrade handshake ("101 Invalid connection header"). On an unrestricted network this
script should work end-to-end as-is. On the reference VM, use the Kokoro fallback.
"""
import os

import certifi

_HERE = os.path.dirname(os.path.abspath(__file__))
_combined = os.environ.get("ORB_COMBINED_CA") or os.path.join(_HERE, "combined-ca.pem")
if os.path.exists(_combined):
    certifi.where = lambda: _combined  # noqa: E731 — must run before edge_tts import

from edge_tts.__main__ import main  # noqa: E402

if __name__ == "__main__":
    main()
