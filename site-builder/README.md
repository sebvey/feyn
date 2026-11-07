# site-builder

Builds the site of a course: the site engine (Astro), its one command (`build-site`), which runs the spec half of the site build on a course and lays its output out in pages with the old site's design, and Pagefind's search index. Its own documentation lives in `site-builder/docs/`, its decisions in `site-builder/decisions/`. Builds are deployed to the artifact repository `sebvey/feyn-site`, never from here.

## The two halves

The site build is cut in two, as the classroom build is (`classroom-builder/README.md`, "The two halves"):
- the half that depends on the spec MAJOR, `course-specs/<name>/<MAJOR>/site/build/`: its `render-site <course-dir>` reads the course through the one course parser and prints its published parts, the words, the URL scheme and the language of the site as one JSON document, whose shape the MAJOR's `site.schema.yaml` fixes (for `linear-course@1`, `course-specs/linear-course/1/site/build/README.md`);
- the half that depends on the target only, here: `build-site` reads `spec: <name>@<MAJOR>` in the course's `course.yaml`, refuses (exit 2) a spec or a MAJOR with no `site/build/render-site`, runs it, validates its output against the MAJOR's `site.schema.yaml` (the `ajv` of the spec directives the MAJOR declares), then has Astro lay the document out and Pagefind index the pages.

The engine never reads a course file, nor a spec file but that schema: every text, every word that names a thing of the course and every address comes from the document. A second MAJOR or a second spec writes its own `site/build/`, and this folder does not change.

## Install

Once, and after each change of `package-lock.json`: `cd site-builder && mise exec -- npm ci` (or `mise exec -- npm ci --prefix site-builder` from the root, the plain form an agent in a worktree runs). The dependencies, their versions pinned: Astro and Pagefind, the remark pipeline that renders the course's Markdown (`unified`, `remark-parse`, `remark-rehype`, `rehype-stringify`), and for `astro check` only, `@astrojs/check`, `typescript` and `@types/node`. `render-site` and the validation also need the spec directives' package: `mise exec -- npm ci --prefix spec-directives/1`. Missing either, `build-site` stops at exit 2 with the command to run.

## The command

```
mise exec -- site-builder/build-site <course-dir> [--channel next|prod|preview] [--base <path>] [--out <dir>]
```

- `<course-dir>`: a course folder, holding its `course.yaml` (`course-specs/linear-course/1/course/samples/cafe`, the bench course).
- `--channel`: `next` (the default), `prod` or `preview` (decision `three-channels`); it sets the defaults of `--base` and `--out`.
- `--base <path>`: the base path of the pages, every internal link starting with it, `/feyn-site/<channel>/<course id>/` by default (`/feyn-site/next/cafe/` for `cafe` on next); the course id is `course.yaml`'s `id`. A preview is given its own: `--base /feyn-site/pr-<n>/<course id>/`. A path from the root of the host, `/` added at its end when missing.
- `--out <dir>`: the output folder, `site-builder/dist/<channel>/<course id>/` by default (`dist/` is ignored by git). An existing folder is emptied first when it holds a site build (an `index.html`); a non-empty folder without one is refused, so that a typo of `--out` never empties another folder.

Exit 0 built, 1 an input the build cannot read (`render-site` failed, its output not valid against the schema, the Astro or Pagefind build failed, a page missing from the output), 2 a usage error, missing dependencies or a refused target: a course whose `course.yaml` declares no spec, a spec or MAJOR with no `spec.yaml` or no `site/build/render-site` (the message names it), an output folder that is not a site build.

## The output

One page per address of the URL scheme (`course-specs/linear-course/1/site/url-scheme.yaml`, given through the document), under the base path: the home (`index.html`), the domain map (`domaines/index.html`), a page per domain (`domaines/<n>/index.html`), a page per concept and per annex (`concepts/<nn>/index.html`, `concepts/00/` for concept 0, `concepts/A1/` for annex A1), the search page (`recherche/index.html`) and the page of an address no page has (`404.html`); then `pagefind/`, the search index, and `_astro/`, the stylesheet and the icons. The storyline, glossary and « À propos » pages are epic #598's next stories: the header and the footer already link to their addresses.

## How the engine lays the document out

- **One route.** Astro's file-based routing would write the addresses in file names: the one page `src/pages/[...path].astro` routes every page from the addresses the document gives (`url_scheme.pages`, each domain's and each concept's `path`), and hands it to its view in `src/views/`. An address that is a file (`404.html`) is routed without its extension; `build-site` moves it to its address when Astro writes it as a folder.
- **The words.** A word that names a thing of the course comes from the document's `words` (the navigation, the labels, the headings, the kind words, the separator « : »); a word of the interface (the skip link, the menu, search, « À propos », previous and next, the theme toggle, a concept page's table of contents and the button that reveals an expected answer, the 404 page, the version) is written once, in `src/ui.ts`; a page writes none of its own (decision `one-source-two-builds`).
- **The text.** The course's Markdown, CommonMark, is rendered as written by the remark pipeline (`src/lib/site.ts`), raw HTML left out; each concept reference the document lists (`concept_refs`) becomes a link to its page, each stance marker (`[consensus]`, `[école]`, `[cours]`, the course lexicon's `markers`) the badge of its stance with the marker's word, out of the search index, `**gras**` bold. French typography is applied to every page's HTML at build time (`src/lib/typo-fr.ts`, run by `src/middleware.ts`): no-break spaces and curly apostrophes, no word changed. No script capitalises a course text: a label comes before a text that starts lowercase (« Objectif : dire si … », « Réponse attendue : trop peu : … »). The page's language is the document's `language`, its spec MAJOR's: the engine writes none.
- **The design.** The old site's (`parcours-po-website`): `src/styles/global.css` ports its `global.css` and `transversal.css` (tokens, palette, serif body, system UI, dark mode by preference and by the header's toggle, widths 40rem and 66rem, accessibility, print styles), its class names kept, reworked only where the structure changes (no tabs, no cross-course pages, no course bar); the shell (`src/layouts/Base.astro`: skip link, header with the course title as brand, navigation, search and theme toggle, footer with « À propos »), the table of contents (`Sommaire`), the foldable concepts (`ConceptList`), the duration bubble (`Bulle`) and the previous and next cards (`PrevNext`) are its components, ported.
- **The concept page.** `src/views/Concept.astro` follows the course's division top to bottom, with no tabs (epic #598, point 17): the head (the eyebrow, the title, the objective, the prerequisites), the sticky table of contents (`Sommaire`, a section by its id and title on desktop, its title on a phone) beside the text column, « L'essentiel », each section and each unit in place (`Sous`: its matter, the diagrams that name it (`Figure`), its cases (`Cases`, each expected answer in a `<details>` closed by default and out of the index) and its « Pièges » (`Erreurs`)), « Clôture » (« Se vérifier » in the `Reflexe` box), the stances in three columns (`Ecoles`, the badges `Pastille`, the references `Refs`) and the neighbours (`Voisins`), the sources (`Sources`: « Affirmations », each nature a badge or its word, « Références » under the anchors `ref-S1`), the previous and next cards; an annex, out of the reading order, has none. What the document leaves out (« Consigne au professeur », « Non vérifié », a part `published: false`) is never there to build.

## The search index

Pagefind splits a word at a straight apostrophe, not at the curly one the typography writes: « l’extraction » would be one word, and searching « extraction » would miss it. `build-site` has Pagefind index a copy of the pages whose apostrophes between two letters are straight, then gives the excerpts Pagefind stores (its fragments) their curly apostrophes back; the pages are not touched.

## The check

`mise exec -- npm run check --prefix site-builder`: `astro check`, the types of the engine's files. The site's verification (links, captures, no overflow, no JS error) comes with epic #598's sixth story; until then, a build of `cafe` read in a browser.
