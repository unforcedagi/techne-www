# Publishing later

Nothing here executes, connects to a PDS, or publishes. No publisher dependency or credentials are installed. Git is the current source of truth.

## Candidate 1: Standard.site / Sequoia

[Sequoia](https://sequoia.pub/quickstart/) can publish Markdown sites using `site.standard.publication` and `site.standard.document`. `sequoia.example.json` follows its [configuration reference](https://sequoia.pub/config/), checked 2026-09-15. It maps our `summary` and `date` fields and marks drafts for exclusion. It is an EXAMPLE with deliberately invalid identity placeholders. Do not rename it to `sequoia.json` until the collective identity, publication, canonical domain and publishing workflow are agreed. Initialization may create remote records.

A future publisher fills each piece's `atUri` and sets `lexicon: site.standard.document`. Our `publication` field is a handle hint, NOT the publication record URI Sequoia requires. Author `did` values are optional hints, not signatures or attestations. The piece template currently emits the requested `rel="alternate"` link and an atproto footer only when `atUri` exists. Standard.site verification needs its own exact discovery markup and well-known publication file; implement and verify these with the publisher, not by assuming the generic alternate link is sufficient.

MDX is executable build input, not portable Markdown. Before publishing MDX, choose a plain-text/Markdown fallback for custom components; do not upload imports as if every reader could execute them.

## Candidate 2: Techne SDK / regenOS

The SDK could use Standard.site's document lexicon, or a future `coop.lexicon.*` design. `coop.lexicon.document` is a reserved schema option here, not a claim that the SDK implements it. Collective ownership and author attestations still need agreement and implementation. A future adapter fills the same `atUri`, `publication`, `lexicon`, and author `did` fields after successful publication.

No build-time network calls, backfill, author signatures, account setup, relay crawl, or credential configuration are implied by this scaffold.
