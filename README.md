# Techne — writing and practice

An Astro + MDX preview of a new front door for Techne. [Preview](https://unforcedagi.github.io/techne-www/). The current [techne.coop](https://techne.coop/) remains separate and unchanged. Introductory copy is explicitly placeholder; the seed article is scaffold copy, not an approved statement by the authors.

## Add a piece — three steps

1. Create `src/content/writing/your-slug.md` (or `.mdx` when a component earns its place) with this frontmatter:

   ```yaml
   ---
   title: Your title
   authors:
     - name: Your name
       # url: https://example.com/
       # did: did:plc:your-identifier
   date: 2026-09-15
   summary: One or two sentences to introduce the piece.
   draft: true
   ---
   ```

2. Write below the frontmatter; run `npm run dev` to read it locally. Drafts appear in development. **This is a public repository: draft source is public even though production excludes its page.** Use the `local()` helper from `src/lib/writing.ts` for internal links in MDX/components so the preview base works.
3. Set `draft: false` when ready, run `npm run build`, and submit a PR. Merging to `main` builds and deploys GitHub Pages. The filename determines `/writing/your-slug/`.

## Run locally

Node 24 LTS (`nvm use`), then `npm ci` and `npm run dev`. Open the URL Astro prints. `npm run build` runs type/schema checks, produces static HTML, and checks internal links, fragments and assets. `npm run preview` serves that production build. `npm test` demonstrates schema failures for missing title/date, optional atproto markup, root/base builds and draft exclusion, restoring its temporary fixture afterwards. Browser acceptance additionally verifies local draft visibility, production 404, themes and responsive layout.

## Site configuration and deployment

`src/content/site.config.ts` owns the introduction, entities, address, vision and existing-room links. `src/styles/global.css` is the shared stylesheet. Fonts are bundled locally. No third-party font request is needed.

GitHub Pages must be set to **GitHub Actions**. One workflow builds and deploys pushes to `main`, using Node 24. Default base is `/techne-www`. For a future domain move:

```sh
SITE_URL=https://techne.coop BASE_PATH=/ npm run build
```

`SITE_URL` is the origin, and `BASE_PATH` is the mount path. No CNAME or DNS changes are part of this repository. Existing rooms always link to absolute `https://techne.coop/...` URLs. Moving the live front door is a separate coordinated change.

## Deliberately absent

No atproto publishing or fetching, auth, analytics, database, CMS, or imported essay drafts/freewrites. Optional `atUri`, `publication` (defaults to `techne.coop`), `lexicon`, and author `did` fields are inert. See [publishing notes](scripts/publish/README.md) for the two undecided paths. MDX accepts trusted author code at build time; the sample interaction is native HTML disclosure and needs no JavaScript.

## Design provenance

Typefaces, dark/light colors, v4 sunset palette and spacing tokens come from [Todd and Nou's existing stylesheet](https://github.com/Techne-Co-op/techne.coop/blob/bc02c457efbca3168a18a36bf050befee88d15bf/commons/ui/commons.css). The Hub address is from that revision's home-page footer: 1515 Walnut Street, Boulder, Colorado. We adapted the theme selectors to `prefers-color-scheme`; no copied runtime or estate routes. Home uses a wide layout; article content is capped at 920px. No email was invented: Contact points to the existing participation page.

## Review workflow

Scaffold starts on `main`; subsequent changes use branches and PRs. Include `Co-authored-by: CodexJi <codexji@users.noreply.github.com>` when applicable. No deployment of the production domain without its owners' migration decision.
