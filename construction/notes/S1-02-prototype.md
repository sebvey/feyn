# S1-02: the concept 9 prototype

Task S1-02 (issue #15), night run 1, 2026-10-27. The folder
`courses/parcours-po/concepts/09-decoupage-vertical/` was written by hand from four old files:

- the concept file `../pdx/parcours-po/course/concepts/09-decoupage-vertical.md` (below: **CF**);
- the sources file `../pdx/parcours-po/course/sources/09-decoupage-vertical.md` (**SF**);
- the site page `../pdx/parcours-po-website/src/content/concepts/fr/09-decoupage-vertical.mdx` (**MDX**);
- the components `Gateau.astro` and `PartRecoupee.astro` (**Astro**).

What it holds: `concept.md` (reader-facing), `teaching.md` (teacher-only), `sources.md`,
`gateau.svg`, `part-recoupee.svg`. No check exists yet (`specs/linear-course/checks/` is
empty). What was verified, and how, is at the end.

## Checklist: every old section mapped

Verdicts: **moved** (text unchanged), **merged** (two old versions made into one, differences
listed), **converted** (same information, new form), **dropped** (not carried, with the reason).

### Concept file (CF)

| CF section | Where it is now | Verdict |
|---|---|---|
| frontmatter `concept: 9`, `titre` | `course.yaml` (number, title), written by a later task | dropped here, by design |
| `# Découpage en tranches verticales` | no H1 in `concept.md`: the title is in `course.yaml` (adjustment 2) | dropped |
| « Objectif » | `concept.md` « Objectif » | moved (adjustment 1: three objective texts exist) |
| « L'essentiel » | `concept.md` « L'essentiel » | merged with the MDX opening paragraph: MDX wording, plus CF's « de haut en bas »; MDX's gloss « (le besoin d'un utilisateur, à la taille d'un sprint) » kept |
| « Consensus et choix d'école » | `concept.md` « Consensus et choix d'école » (prose, unchanged); the structured form is the MDX `ecoles` in the frontmatter | moved (adjustment 4: the same claims now live twice in one file) |
| « Sous-concepts » | `teaching.md` « Consignes » | moved, heading renamed as the design says |
| « Banque d'exemples », intro paragraph (« Faits du fil rouge utilisés : … », « Ne sont pas fixés : … ») | `teaching.md` « Faits du fil rouge utilisés » | moved; the lead « Faits du fil rouge utilisés : » became the heading |
| the six cases, every field (Explication, Situation, Question, Réponse attendue, Erreurs fréquentes, Ce qui marche, and « Réserve, sur demande » in 9b2) | `teaching.md` « Banque d'exemples », same `###` titles | moved, verbatim (adjustments 8 and 9) |
| « Pièges » | `concept.md` « Pièges » | merged with the MDX `<Erreurs>`: MDX order and sentences; CF's precise references kept (`concept 8a2` where MDX had `concept 8`, `(concept 4)` on the tasks pitfall, « Le walking skeleton (Cockburn) » where MDX had « Un walking skeleton »); CF's sentence « Une story qui ne nomme pas l'écran livre quand même quelque chose de visible. », absent from MDX, kept |
| « Le test rapide » | `concept.md` « Le test rapide »: the question as a blockquote, then MDX's `<Reflexe note>` as the paragraph | merged |
| « Schéma » | `teaching.md` « Schéma » | moved, verbatim (adjustment 14) |

Mechanical proof: every non-empty line of CF was searched verbatim in `concept.md` +
`teaching.md`; the 19 lines not found are exactly the H1, the `titre` key, the « Sous-concepts »
heading, the « Faits du fil rouge utilisés : » lead, and the lines of the two merged sections
(L'essentiel, Pièges) listed above.

### Site page (MDX)

| MDX item | Where it is now | Verdict |
|---|---|---|
| `numero`, `titre`, `prerequis: ["8"]` | `course.yaml` (number, title, prerequisites), later task | dropped here, by design |
| `objectif` (« Découper un besoin data en tranches qui traversent les couches du produit et servent seules à l'utilisateur. ») | nowhere yet: the « Objectif » section holds CF's text (adjustment 1) | dropped, recorded here verbatim |
| `description` | `concept.md` frontmatter `description` | moved |
| `ecoles.consensus`, `ecoles.ecole`, `ecoles.cours` | frontmatter `stances.consensus`, `stances.school`, `stances.course`; keys `auteur`, `texte`, `refs` became `author`, `text`, `refs` | converted, texts unchanged (2, 5 and 5 items) |
| `ecoles.voisines` | frontmatter `neighbors` | converted, text unchanged |
| `sources` (affirmations, references, nonVerifie: a reader paraphrase of SF) | `sources.md` is built from SF; the `kind` of each affirmation became the `Nature` column | converted; the paraphrased wording is dropped (adjustment 12) |
| `alignement` (course version, two hashes) | none: the site reads the source, the stamp disappears (design) | dropped, by design |
| `import` lines | none | dropped, by design |
| opening paragraph | merged into « L'essentiel » (above) | merged |
| `<Figure legende>` + `<Gateau />` | `![…](gateau.svg)` at the end of « L'essentiel », same place as on the site; `legende` is the frontmatter `caption` | converted |
| `<Sous id="9a" titre promesse>`, `<Sous id="9b" …>` | `## 9a La tranche verticale`, `## 9b Les patrons de découpage`, each followed by its promise as an italic-only paragraph | converted |
| `<h4 id="9a1">` … `<h4 id="9b2">` | `### 9a1 …` … `### 9b2 …`, reader text unchanged | converted |
| `<Renvoi n="4" />` (and 15, 17, 5, 7b, 8) | plain `concept 4`, `(concept 15)`, `(concepts 5 et 7b)` | converted (adjustment 11) |
| `<Pastille kind="cours" />` (×3), `<Pastille kind="ecole" />` (×1) | `[cours]`, `[école]` right after the claim | converted (adjustment 10) |
| `<FilRouge>` in 9b1 | a blockquote led by `**Fil rouge :**` | converted |
| `<Figure legende>` + `<PartRecoupee />` in 9b1 | `![…](part-recoupee.svg)`, same place | converted |
| `<Reflexe note>` | « Le test rapide » | merged (above) |
| `<Erreurs>` | « Pièges » | merged (above) |

Mechanical proof: the MDX body was cut into sentences (components replaced by their Markdown
form) and each searched in `concept.md`; the 7 not found are the merges listed above and the
three lines of the storyline blockquote, whose `> ` prefixes break the search (read by hand:
unchanged).

### Sources file (SF)

| SF section | Where it is now | Verdict |
|---|---|---|
| frontmatter `concept: 9`, H1 « Sources : … » | none (adjustment 2) | dropped |
| intro paragraph | `sources.md`, top | moved |
| « Affirmations », 39 rows | `sources.md` « Affirmations », same rows, same order | converted: a `Nature` column (`consensus`, `école`, `cours`, or empty) from the MDX `kind`; the header now says « section de `concept.md` ou de `teaching.md` »; « Sous-concepts 9a1 et 9a2 » became « Consignes 9a1 et 9a2 »; the paths `course/sources/NN-slug.md` became `concepts/NN-slug/sources.md` |
| « Références », 10 rows | `sources.md` « Références » | moved |
| « Non vérifié », 10 items | `sources.md` « Non vérifié » | moved |

Two `Nature` values are mine, not MDX's: the Defer Performance row (`école`, like every other
Lawrence pattern) and the « SPIDR et Lawrence se recoupent » row (`école`, as MDX's stance
« Entre les catalogues »). MDX's affirmation « Pour Lawrence, le spike est le dernier
recours ; Cohn est moins tranché » has no row of its own in SF: it is inside the SPIDR S row.
MDX's « Les exemples du fil rouge (Étienne, …) sont des faits inventés » is covered by SF's two
rows on storyline examples and on the 9b diagram case.

### Diagrams (Astro)

| Astro element | Where it is now | Verdict |
|---|---|---|
| `Gateau.astro`, `<svg viewBox="0 0 600 440">` | `gateau.svg`, same viewBox and geometry | converted |
| `PartRecoupee.astro`, `<svg viewBox="0 0 600 395">` | `part-recoupee.svg`, same viewBox and geometry | converted |
| `<title>`, `<desc>` | kept in each SVG (accessibility); `<title>` is also the frontmatter `title` and the image alt | moved (typographic apostrophes made straight) |
| ten colour tokens `--sch-*`, the `<style>` blocks, the hatch `<pattern>` | `currentColor` with opacities, three classes (adjustment 6) | converted, with the losses listed there |
| JS loops (`layers.map`, `slices.map`) | written out | converted |
| parts | named groups: `9a1-couches`, `9a1-tranche-horizontale`, `9a1-tranches-verticales` (`9a1-tranche-1` to `-3`), `9a1-couche-entiere`, `9a1-legende`; `9b1-part-origine`, `9b1-morceau-a`, `-c`, `-b`, `9b2-patrons` | converted (adjustment 7) |

## What the format could not express cleanly, and what the spec should say

Recommendations, numbered for the review. None blocks this prototype; 6, 12 and 4 matter most.

1. **Three objective texts.** `plan.md` (« découper un besoin data en tranches qui servent
   seules »), CF « Objectif » (three clauses), MDX `objectif` (one sentence, above). The design
   wants one `objective` in `course.yaml`, restated in « Objectif ». Recommend: the spec says
   the section is the `objective` verbatim (a check compares them), and the migration picks
   CF's text, the fullest. The prototype holds CF's text.
2. **No H1.** The old files had `# Title`; `course.yaml` now holds the title, and an H1 would
   double it on the site. The prototype has none in its three Markdown files. Recommend: the
   spec says so, and the teacher takes the title from `course.yaml`.
3. **Order of the body.** The design's sentence lists « Pièges » and « Le test rapide » with
   the leaf sections, which reads as if they were per leaf. They are per concept, after the
   sub-concept sections. Recommend the spec give the full order: « Objectif », « L'essentiel »,
   « Consensus et choix d'école », the `##` sub-concept sections, « Pièges », « Le test rapide ».
   Also: a diagram may sit in « L'essentiel » (the cake does, as on the site), so its place in
   the body is not its `subconcept`.
4. **Stances twice in one file.** The body section « Consensus et choix d'école » (CF prose)
   and the frontmatter `stances` + `neighbors` (MDX) say the same things in two wordings, and
   already differ (`concept 3b` against `concept 3`, `concept 17b1` against `concept 17`; the
   body has a « Notion voisine » bullet). The design keeps both. Recommend: keep only the
   frontmatter (structured, with refs; the site has a tab for it, the teacher reads YAML), drop
   the body section from the spec, and move CF's teacher hint « à présenter comme tels » to the
   protocol, where it applies to every concept. Second best: keep both, and accept the drift.
5. **Three caption texts per diagram.** Frontmatter `title`, frontmatter `caption` (the old
   figure legend), and the SVG `<desc>` (a longer description). Recommend: the frontmatter is
   the source the teacher says and the site shows; the SVG keeps `<title>` (equal to the
   frontmatter `title`, checked) and `<desc>` for screen readers; the body image alt is the
   `title`. The frontmatter key naming the sub-concept is `subconcept` in the prototype.
6. **The drawing contract cannot be met as worded without a fallback rule.** The three classes
   style nothing when the SVG is shown outside the site (the desktop panel, GitHub, any viewer):
   shapes would fall back to black fill, and SVG text is black by default, not `currentColor`.
   A `<style>` in the SVG would fix it but leaks into the whole page when the site inlines the
   SVG. What the prototype does, and the spec should say: the root has `fill="currentColor"`;
   every shape paints with `currentColor` through `fill`/`stroke` attributes, with shades from
   `fill-opacity`/`stroke-opacity`; the classes (`primary`, `secondary`, `muted`) only set
   `color` in the site stylesheet, which re-tints the shapes; no `<style>`, no hex colour.
   Losses against the Astro: ten colour tokens became one colour in three roles plus opacities
   (the three blues of the slices are now three opacities of `primary`); the white cut lines
   inside the slices (`--sch-s-ink`, a second colour) cannot exist, so each slice is drawn as
   four segments with a 2-unit gap; the hatch pattern became a flat `muted` fill under a dashed
   outline; the halo behind « couche entière » is gone. Both files render readably in
   monochrome (checked with Quick Look).
7. **Group ids that start with a digit.** `9a1-couches` (the design's own example) is a valid
   HTML id but not an XML Name, and a CSS selector needs escaping (`#\39 a1-couches`). Worse,
   the bare sub-concept id `9a1` is also the heading anchor of the reader text: an SVG group
   named `9a1` inlined in the page would collide with it. Recommend: group ids are
   `<sub-concept>-<element>`, never the bare sub-concept, unique across a concept's diagrams
   (checked); `<title>` and `<desc>` ids are prefixed with the file stem (`gateau-titre`).
8. **Case titles carry more than the sub-concept.** `(9a1, rechange)`: the parenthesis also
   marks a fallback case. And « Consignes » cites the first case as « Redécouper “quelles
   stations vont se vider ?” » while its heading reads « Redécouper « quelles stations vont se
   vider ? » »: a check matching Consignes to case titles would fail. Recommend: the spec
   gives the grammar `### <title> (<sub-concept>[, rechange])`, says the id is the title
   without the parenthesis, and requires Consignes to cite titles exactly (the migration then
   fixes the inner quotes).
9. **Case fields.** The design lists Explication, Situation, Question, Réponse attendue,
   Erreurs fréquentes, Relances. The real bank has no Relances field (follow-ups are written
   inside Erreurs fréquentes, « demander … », « relancer : … »), has « Ce qui marche » in every
   case, and « Réserve, sur demande » in 9b2. Recommend: the spec lists the fields as they are,
   required (Situation, Question, Réponse attendue, Erreurs fréquentes) and optional
   (Explication, Ce qui marche, Réserve sur demande), follow-ups inline.
10. **Markers.** `[cours]` is plain text in CommonMark unless a link definition `[cours]: …`
    exists, so it is safe; the plugin must act on text nodes only, and a check should forbid
    link definitions named like a marker. The MDX `kind` was `ecole`; the marker is `[école]`:
    the language pack maps the three.
11. **Concept references.** The text writes `concepts 5 et 7b` (plural, a list), `concept 8a2`
    (a sub-concept) and `qu'en 9a` (a bare sub-concept, no « concept »). Recommend: the
    autolink pattern covers the plural and the list, links `8a2` to its anchor, and leaves bare
    sub-concepts as text.
12. **`sources.md` is reader-facing but cites the bank.** SF's claims point at teaching
    sections and cases (« Les tâches de Dana », « Banque 9a1 et 9a2 », « la fiche l'écrit en
    nuance de la Réponse attendue de 9a1 », the counter of Diego). Built as is, the site would
    show case titles and hints of expected answers. The old site avoided it with a rewritten,
    reader-safe copy (the MDX `sources`), which the design drops. Options: (a) accept it: the
    repository is public and already says expected answers are visible; (b) claims whose only
    section is in `teaching.md` move to a section of `teaching.md`; (c) the site filters rows
    by section. Recommend (b): it keeps the reader-facing / teacher-only split true. The
    prototype keeps SF whole, to show the problem. Also for the spec: the `Nature` column
    (needed for the site's badges, it came from MDX), the header naming two files, and the form
    of a reference to another concept's sources (`concepts/NN-slug/sources.md` here).
13. **Dropped by design, to be picked up by the `course.yaml` task**: `prerequis: ["8"]`, the
    number and title, and the sub-concept tree with its two-messages split (CF « Sous-concepts »
    first lines, `plan.md` row 9).
14. **Course findings, not format** (kept verbatim, for an issue if wanted): CF « Schéma »
    asks for a 9a2 zoom (slice 1 cut into dashed horizontal strips, « tâches ») that no
    diagram draws; and its 9b label « R, SPIDR (Business Rule Variations, Lawrence, diffère) »
    is drawn as « R de SPIDR (Cohn), assouplir d'abord une règle ».

## Verified, and how

- The folder exists and reads as plain Markdown: no HTML, no MDX, no directive; the
  frontmatter parses as YAML (Ruby `YAML.load`: keys `description`, `stances` with 2, 5 and 5
  items, `neighbors`, `diagrams` with two entries).
- Both SVGs are well-formed (`xmllint --noout`), have a `viewBox` and no root
  `width`/`height`, no hex colour, no `style`, no `<style>`, no script, no image, no `href`;
  3.6 KB and 4.1 KB; rendered with `qlmanage` and looked at.
- No em-dash and no arrow in the three Markdown files (grep).
- The CF and MDX coverage searches above.
- Not verified: the site rendering (no plugins yet), the teacher reading the folder (no
  teacher yet), any check of the spec (none written yet).

The Done when's « the maintainer has read the note » cannot hold overnight: per
`construction/overnight.md`, it is met by this note being written and the PR being open.
