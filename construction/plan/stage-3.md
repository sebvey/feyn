# Stage 3: the site

Milestone `stage-3`. Design: `design/06-site.md`, `design/03-spec-linear-course.md` ("Reader
text conventions"), `design/04-diagrams.md`, `design/07-versions-channels-flow.md`.

Done when: `verify.mjs` passes; the capture diff between the old site (freeze) and
`/next/parcours-po/` is empty or explained; `parcours-po/v0.1.0` is published in prod; the prod
classroom is built from that tag.

Source: `../pdx/parcours-po-website` at its freeze deployment, read-only.

### S3-01 Bring the site engine into site/ and strip the old source
`area=site type=improvement model=sonnet depends=- parallel=no`
- **Reads**: `design/06-site.md`; `../pdx/parcours-po-website/{package.json,astro.config.mjs,src,scripts,docs,CLAUDE.md,README.md}`.
- **Observation**: the engine (layouts, components, styles, Pagefind, Playwright, `verify.mjs`)
  is good; its source (MDX, `src/data/*.ts`, `check-alignment.mjs`, stamps, version) is what
  the refactoring removes.
- **To do**: copy the engine into `site/` (no git history); remove `src/content/`,
  `src/data/{domaines,glossaire,fil-rouge,version}.ts`, `scripts/check-alignment.mjs`, the 23
  diagram components, the site `CHANGELOG.md` and its ADRs; keep layouts, the non-diagram
  components, styles, Pagefind, Playwright, `verify.mjs`, the docs that describe the engine
  (moved to `site/docs/`, English, trimmed of alignment matter); `mise.toml` pinning Node for
  the repository; `site/README.md`. The build is expected to fail at this point: say so in the
  PR.
- **Done when**: `site/` contains the engine and nothing of the old source; `npm install`
  works; the list of what was dropped is in the PR.

### S3-02 Read the course directly: collections, data, routes
`area=site type=improvement model=opus depends=S3-01 parallel=no`
- **Reads**: `SPEC.md`, `course.yaml` of `parcours-po`; Astro content-collection docs
  (`glob` loader with `base`, data loaders) via the docs tool if available.
- **Observation**: Astro reads Markdown collections from any folder; the course is the source.
- **To do**: `src/content.config.ts`: a `concepts` collection (`glob`, `base:
  '../courses/<id>/concepts'`, pattern `*/concept.md`, schema from the spec's frontmatter), a
  `sources` collection, a `domains` collection, and loaders for `course.yaml`, `glossary.md`,
  `storyline.md`; routes `/<course>/`, `/<course>/domaines/`, `/<course>/domaines/N/`,
  `/<course>/concepts/NN/`, `/<course>/glossaire/`, `/<course>/fil-rouge/`, as today under
  the course prefix; the home `/` lists the courses from a `site/courses.yaml` (which courses
  the site publishes and from which channel). Multi-course by construction, one course today.
- **Done when**: `astro build` succeeds on `parcours-po` with the raw Markdown bodies (no
  conventions mapped yet); every page of the old site has its counterpart URL (list in the PR).

### S3-03 Map the reader-text conventions to the site's HTML
`area=site type=improvement model=opus depends=S3-02 parallel=no`
- **Reads**: `design/03-spec-linear-course.md` ("Reader text conventions"), `SPEC.md`
  conventions section; the old components `Sous`, `Pastille`, `Renvoi`, `FilRouge`, `Figure`,
  `Reflexe`, `Erreurs` in `../pdx/parcours-po-website/src/components/` for the HTML and classes
  they produce.
- **Observation**: the CSS expects the old components' HTML; the Markdown carries conventions
  instead.
- **To do**: remark/rehype plugins in `site/src/plugins/`: sectionize `##` sub-concepts into
  the `Sous` HTML with the italic promise; `###` leaves into the numbered `h4`; autolink
  `concept N[sub]` into `Renvoi`; `[cours]`/`[école]`/`[consensus]` into `Pastille`;
  `**Fil rouge :**` blockquotes into `FilRouge`; images into `Figure` with inline SVG (or
  `<img>`: decide here, note the reason in `site/decisions/`); « Le test rapide » into
  `Reflexe`; « Pièges » into `Erreurs`; `stances` and `neighbors` frontmatter into the
  « Consensus ou école » tab as today. Markers and leads come from the language pack.
- **Done when**: on concept 9, each of the nine constructs renders with the same CSS hooks
  (classes, ids, landmarks) as the old component, or with new hooks and the CSS adapted in
  the same PR (a checklist in the PR, one line per construct); the page is **equivalent** for
  the reader, not identical: differences that come from decided changes (one `objective`,
  dropped « accroches », footer, course prefix in URLs) are listed, and no markup workaround
  is written to match the old HTML byte for byte (reworking a component or its CSS for
  cleaner code is the right move, and is done here); the dark theme still colours the SVGs.
  A normalised HTML diff against the old page is a diagnostic to find what was missed, not a
  gate.

### S3-04 Language pack labels, footer version, Pagefind per course
`area=site type=improvement model=sonnet depends=S3-02 parallel=yes`
- **Reads**: `lang/fr.yaml` (`site` section); `design/06-site.md`.
- **To do**: every visible label from the pack, by the course's language; the footer "<course
  title> <course version>, built on <date> (<short sha>)" where the version is the course tag
  the build runs on, or `main@<sha>` for next and previews; Pagefind indexed per course
  sub-folder, searching inside the course only.
- **Done when**: no hard-coded French label remains in `site/src/` (grep); the footer shows
  the right values on a tag build and a `main` build; search on `/parcours-po/` returns only
  that course.

### S3-05 Channels: BASE_PATH, build parameters, home
`area=site type=improvement model=sonnet depends=S3-02 parallel=yes`
- **Reads**: `design/06-site.md` ("One site, several courses, several channels"),
  `design/07-versions-channels-flow.md`.
- **To do**: the build takes `COURSE`, `CHANNEL` (`prod` | `next` | `pr-N`) and derives
  `BASE_PATH` (`/feyn-site/<course>/`, `/feyn-site/next/<course>/`, `/feyn-site/pr-N/<course>/`)
  and the footer version; `npm run build -- --course parcours-po --channel next`; the home
  page build for `/feyn-site/` listing the prod courses; `site/docs/channels.md`.
- **Done when**: three local builds (prod from the tag, next, pr-1) produce three working trees
  with correct internal links (link check of `verify.mjs`).

### S3-06 CI workflows: checks, site-next, site-preview, site-prod
`area=agentic type=improvement model=sonnet depends=S3-05,S0-06 parallel=no`
- **Reads**: `design/08-agentic.md` ("CI workflows"), `design/06-site.md` ("Deployment
  mechanics").
- **To do**: `.github/workflows/checks.yml` (on PR: `check-course` on every touched course,
  `astro check` and build if `site/` or a course is touched; blocking); `site-next.yml` (on
  push to `main` touching `courses/<id>/` or `site/`: build `next` for each touched course and
  push into `gh-pages` of `feyn-site` under `next/<course>/`, keeping the rest, with the deploy
  key); `site-preview.yml` (on PR opened/synchronize: build `pr-N`, push under `pr-N/<course>/`,
  comment the address; on closed: remove the folder); `site-prod.yml` (`workflow_dispatch`
  inputs `course`, `tag`: checkout the tag, build `prod`, push under `<course>/`, rebuild the
  home).
- **Done when**: a PR touching concept 9 gets a preview comment with a working address; its
  close removes the folder; a merge to `main` updates `/next/parcours-po/`; a manual prod run
  on the freeze-equivalent content serves `/parcours-po/` (placeholder content is fine until
  S3-09).

### S3-07 Port verify.mjs and the capture diff against the old site
`area=site type=improvement model=sonnet depends=S3-03,S3-04 parallel=no`
- **Reads**: `../pdx/parcours-po-website/scripts/verify.mjs`, its docs.
- **To do**: `site/scripts/verify.mjs` ported (astro check, build, link check, Playwright
  captures in the four formats, style check) with the course and channel parameters; a
  `compare-captures` script that diffs the captures of `/next/parcours-po/` against captures of
  the frozen old site (taken once from `../pdx/parcours-po-website` built locally) page by page,
  reporting pixel diff percentages, as a diagnostic: it finds what was missed, it does not
  demand identity; a `site-verify` agent workflow wrapping both is stage 4.
- **Done when**: `verify.mjs` passes on next; the capture diff report lists every page with a
  percentage, and every page above a threshold (say 2%) is explained in the PR by a decided
  change (one `objective`, dropped « accroches », footer, course prefix in URLs, a component
  reworked for cleaner code) or fixed; the maintainer reads the report and the captures of
  three pages (home, a domain, concept 9) and says "equivalent".

### S3-08 Write /publish
`area=agentic type=improvement model=opus depends=S3-06 parallel=yes`
- **Reads**: `design/07-versions-channels-flow.md` ("Git flow", release), `design/08-agentic.md`.
- **To do**: `.claude/skills/publish/SKILL.md`: from a clean `main`, proposes the next course
  version from the changelog's unreleased entries (MAJOR/MINOR/PATCH per the spec's rules),
  moves them under the version heading, commits, tags `<course>/vX.Y.Z`, pushes the tag,
  triggers `site-prod` with `gh workflow run`, and says how to rebuild the prod classroom.
  Never force, never on a dirty tree, never without the maintainer's confirmation of the
  version.
- **Done when**: a dry run on a fake course in a scratch repository performs every step; the
  skill is under 80 lines.

### S3-09 Release parcours-po v0.1.0 and build the prod classroom
`area=course:parcours-po type=course model=sonnet depends=S3-07,S3-08 parallel=no`
- **To do**: `/publish parcours-po` to `0.1.0`; verify `/feyn-site/parcours-po/`;
  `build-classroom parcours-po --ref parcours-po/v0.1.0 --out ~/classrooms/parcours-po`;
  the maintainer runs a first real session in it.
- **Done when**: the prod site serves 0.1.0 with the right footer; the prod classroom exists
  with its `course.lock` pointing at the tag.

### S3-10 Redirect the old site and archive the old repositories
`area=repo type=improvement model=sonnet depends=S3-09 parallel=no`
- **Reads**: `design/10-migration.md` ("After migration").
- **To do**: in `../pdx/parcours-po-website`, a last deployment: a single `index.html` with a meta
  refresh and a link to `https://sebvey.github.io/feyn-site/parcours-po/`, plus a `404.html`
  doing the same (deep links); then `gh repo archive` on both old repositories (the maintainer
  confirms each); local clones kept.
- **Done when**: the old address redirects; both repositories show as archived on GitHub.

### S3-11 Site decisions and docs
`area=site type=decision model=opus depends=S3-03 parallel=yes`
- **To do**: through `/decide`: `markdown-conventions-mapped-by-plugins`,
  `inline-svg-or-img` (whichever S3-03 chose), `no-site-version`, `deploy-per-subfolder`;
  `site/docs/` reread: engine construction, pitfalls, recipes (English, no alignment matter).
- **Done when**: decisions pass `/decide`'s bar; `site/docs/` has no reference to MDX, stamps
  or `src/data`.
