# 06. The site

## What changes

Today's site (Astro 7, MDX, Pagefind, Playwright, manual deployment) is a good engine attached
to a wrong source: one hand-rewritten MDX per concept, three copied `.ts` files, sha256
stamps. The engine stays; the source becomes the course itself.

- The site reads `courses/<id>/course.yaml`, `concepts/*/concept.md`, `sources.md`, `*.svg`,
  `domains/*.md`, `glossary.md`, `storyline.md`. No more `src/content/`, `src/data/`,
  `check-alignment.mjs` or stamps: the source is read at build.
- The MDX constructs of today's bodies become Markdown conventions of the spec, mapped by
  remark/rehype plugins to the same HTML and classes (see `03-spec-linear-course.md`,
  "Reader text conventions"). CSS and layout components are kept.
- Site labels come from the spec's language pack.
- The 23 diagram components disappear; SVGs are served as they are (see `04-diagrams.md`).
- The site has **no version of its own**: its footer says "parcours-po 0.3.0, built on <date>
  (<short feyn sha>)". `src/data/version.ts`, the site `CHANGELOG.md` and the rule "site MAJOR
  = course MAJOR" disappear.
- The site docs (`docs/construction.md`, `data-map.md`, `pitfalls.md`, `recipes.md`) are
  reread at stage 3: what describes the engine stays (English, in `site/docs/`), what
  describes alignment with the course dies. The site's ADRs are not carried over
  (maintainer's decision: set for the POC, not a constraint).
- `verify.mjs` (astro check, build, links, captures in 4 formats, style) stays, ported.

## One site, several courses, several channels

One GitHub Pages site (`sebvey.github.io/feyn-site/`), one sub-path per course and per
channel, **from the first course on**:

| Address | Channel | Source | Trigger |
|---|---|---|---|
| `/parcours-po/` | prod | the course tag (`parcours-po/vX.Y.Z`) | manual (`workflow_dispatch`, inputs `course`, `tag`) |
| `/next/parcours-po/` | next | `main` | every merge touching `courses/parcours-po/` or `site/` |
| `/pr-123/parcours-po/` | preview | the PR branch | PR opened and pushed; removed on close |
| `/` | home | list of courses in prod | rebuilt with every prod deployment |

A half-done course B on `main` does not harm course A's next: each has its folder.

## Deployment mechanics

- The Astro build takes `course`, `channel` and `BASE_PATH` (`/feyn-site/next/parcours-po`).
  The Pagefind index is computed per sub-folder.
- The CI workflow pushes `dist/` into the `gh-pages` branch of `feyn-site`, **into its own
  sub-folder only**, keeping the rest (peaceiris `destination_dir` + `keep_files`, or three
  lines of shell with a `gh-pages` checkout). Authentication by deploy key (a secret of
  `feyn`).
- PR preview: a job on `pull_request` (opened, synchronize) that builds and pushes into
  `/pr-N/`, a job on `closed` that removes the folder. A PR comment gives the address.
- The old site: a last deployment of a redirect `index.html` to `/feyn-site/parcours-po/`,
  then archive the repository.

## What we keep from today's site

The concept pages (tabs « Comprendre », « Consensus ou école », « Sources »), the domain
pages, the domain map, the course glossary, the storyline, search, verification captures,
accessibility. The site stays **equivalent** for the reader, not identical: decided changes show (one
`objective`, no « accroches », a new footer, the course prefix in URLs), and a component may be
reworked for cleaner code rather than bent to reproduce the old HTML. The capture diff of stage
3 is a diagnostic that finds what was missed; the maintainer's reading of a few pages says
"equivalent".
