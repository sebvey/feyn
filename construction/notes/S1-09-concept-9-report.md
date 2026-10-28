# Migration report: concept 9

Workflow `migrate-concept`, course `parcours-po`, concept folder `courses/parcours-po/concepts/09-decoupage-vertical/` (in the run copy).
Old files: `../pdx/parcours-po/course/concepts/09-decoupage-vertical.md` (CF), `../pdx/parcours-po/course/sources/09-decoupage-vertical.md` (SF), `../pdx/parcours-po-website/src/content/concepts/fr/09-decoupage-vertical.mdx` (MDX), `../pdx/parcours-po-website/src/components/schemas/Gateau.astro`, `../pdx/parcours-po-website/src/components/schemas/PartRecoupee.astro` (ASTRO).

## Summary

| kept | moved | by design | lost | invented | refuted | checks | target existed | accepted |
|---|---|---|---|---|---|---|---|---|
| 10 | 38 | 9 | 0 | 0 | 0 | pass | no | no |

Result: **passed**. lost and invented count the rows confirmed by the verification; the rows it refuted (refuted) are listed at the end and count in no other column. checks is the check agent's reading of the output below; target existed is the scope agent's.

## CF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter (concept, titre) and H1 | none (course.yaml number and title) | by design | M1 | M12: the H1s and frontmatters of M1 |
| « Objectif » | concept.md « Objectif »; course.yaml objective | kept | M1 | identical to the course.yaml objective |
| « L'essentiel » | concept.md « L'essentiel » | moved | M4 | merged into the MDX wording; CF-only « de haut en bas » carried at its place; the layer list given by MDX as a colon list |
| « Consensus et choix d'école » (section) | concept.md frontmatter stances and neighbors | moved | M3 | not written as a section; each claim matched to a frontmatter item |
| Consensus, pratique établie: « sous le V d'INVEST, concept 7 » | concept.md frontmatter stances.consensus[1].text | moved | M3 | CF-only reference « concept 7 » carried into the MDX item; refs [S2, S3, S4] unchanged |
| Choix du cours: « concept 3b », « concept 17b1 » | concept.md frontmatter stances.course[4].text | moved | M3 | CF's precise references replace MDX « concept 3 » and « concept 17 »; refs [S1] unchanged |
| Choix du cours teacher hint « sans source externe, à présenter comme tels » | none (protocol rule stances-told-apart) | by design | M3 | M3: the CF teacher hint on the course's choices is carried by the protocol rule stances-told-apart |
| Consensus Scrum Guide, Choix d'école catalogues, Notion voisine walking skeleton, other Choix du cours claims | concept.md frontmatter stances.consensus[0], stances.school, neighbors[0], stances.course[0..3] | kept | M3 | every claim present in the matching MDX item |
| « Sous-concepts » | teaching.md « Consignes » | moved | M9 | renamed « Consignes », text verbatim |
| « Banque d'exemples » lead paragraph (storyline facts) | teaching.md « Faits du fil rouge utilisés » | moved | M9 | lead words « Faits du fil rouge utilisés : » dropped, rest verbatim |
| « Banque d'exemples » cases (six cases, all fields) | teaching.md « Banque d'exemples » | kept | M9 | same ### headings, every field verbatim |
| « Pièges » | concept.md « Pièges » | moved | M7 | merged with MDX <Erreurs> in MDX order; CF « (Cockburn) », « (concept 4) », « concepts 5 et 7b », « concept 8a2 » and the CF sentence « Une story qui ne nomme pas l'écran livre quand même quelque chose de visible. » kept |
| « Le test rapide » | concept.md « Le test rapide » (blockquote) | kept | M8 |  |
| « Schéma » | teaching.md « Schéma » | kept | M9 | verbatim |

## SF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter and H1 | none | by design | M10 | M10/M12: frontmatter and H1 dropped (M1) |
| intro paragraph | sources.md top | kept | M10 |  |
| « Affirmations » (section, header) | sources.md « Affirmations » | moved | M10 | header « Affirmation (section de `concept.md` ou de `teaching.md`) » and fourth column Nature added; 39 rows, same order, texts unchanged |
| rows 1, 2, 3 (Scrum Guide, refinement, incrément) | sources.md « Affirmations » rows 1-3 | moved | M10 | paths course/sources/NN-slug.md become concepts/NN-slug/sources.md; Nature consensus (MDX kind) |
| row 4 (chaque story est une tranche verticale) | sources.md « Affirmations » row 4 | moved | M10 | paths converted; Nature cours |
| row 10 (« Tranche » est une façon de découper) | sources.md « Affirmations » row 10 | moved | M10 | section name « Sous-concepts 9a1 et 9a2 » becomes « Consignes 9a1 et 9a2 »; path converted; Nature cours |
| rows 11, 12 (le vertical s'arrête à la story; le PO juge la story) | sources.md « Affirmations » rows 11-12 | moved | M10 | paths converted; Nature empty (MDX item has no kind) |
| row 17 (SPIDR, P et I) | sources.md « Affirmations » row 17 | moved | M10 | orphan [S5b] added: source « [S5] » becomes « [S5], [S5b] »; verification text « l'affiche [S5b] ajoute « Consider building a minimal user interface first » » names it as support; S5b cited in no other source cell; Nature école |
| row 18 (SPIDR, S Spike) | sources.md « Affirmations » row 18 | moved | M10 | path converted; Nature école |
| rows 29, 30 (forme laissée aux Developers; mot flou règle non fixée) | sources.md « Affirmations » rows 29-30 | moved | M10 | paths converted; Nature empty |
| rows 35, 36, 37 (spike livre une réponse; Developers estiment la taille; tâches au Sprint Planning) | sources.md « Affirmations » rows 35-37 | moved | M10 | paths converted; Nature empty |
| rows 5-9, 13-16, 19-28, 31-34, 38, 39 | sources.md « Affirmations » | kept | M10 | texts and sources unchanged; Nature from MDX kinds (consensus 5; cours 9, 31, 32, 34; école 13-16, 19-26, 39 with row 22 via the Lawrence ecoles item; empty 6-8, 27, 28, 33, 38) |
| « Références » | sources.md « Références » | kept | M10 | unchanged |
| « Non vérifié » | sources.md « Non vérifié » | kept | M10 | unchanged |

## MDX: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| numero, titre, prerequis | course.yaml (number, title, prerequisites) | by design | M1 | M12: the frontmatters of M1 |
| objectif | course.yaml objective | moved | M1 | every clause carried by the course.yaml objective |
| description | concept.md frontmatter description | kept | M2 |  |
| ecoles.consensus, ecoles.ecole, ecoles.cours | concept.md frontmatter stances.consensus, stances.school, stances.course | moved | M3 | keys renamed (auteur, texte to author, text); texts and refs unchanged except the CF precise references (concept 7, 3b, 17b1) |
| ecoles.voisines | concept.md frontmatter neighbors | moved | M3 | key renamed; text and refs [S8] unchanged |
| sources (affirmations texts, references, nonVerifie) | none (kinds used in sources.md Nature) | by design | M10 | M10/M12: the MDX sources texts, only their kind is used |
| alignement | none | by design | M12 | M12: MDX alignement |
| import lines | none | by design | M6 | M6/M12: import lines, nothing |
| text before first <Sous> (essentials) | concept.md « L'essentiel » | moved | M4 | base of the merge with CF « L'essentiel » |
| <Figure> with <Gateau /> | concept.md « L'essentiel », ![…](gateau.svg); frontmatter diagrams[0] | moved | M6 | image at the same place; legende becomes caption; subconcept 9a |
| <Sous id="9a"> and <h4> 9a1, 9a2 | concept.md « 9a La tranche verticale », « 9a1 … », « 9a2 … » | moved | M5 | headings converted, promise in italics; reader text unchanged; Pastilles to [cours], Renvois to « concept 4 », « concept 15 » |
| <Sous id="9b"> and <h4> 9b1, 9b2 | concept.md « 9b Les patrons de découpage », « 9b1 … », « 9b2 … » | moved | M5 | headings converted; <FilRouge> to a « **Fil rouge :** » blockquote; Pastilles to [école], [cours]; Renvois to « concept 4 », « concept 17 » |
| <Figure> with <PartRecoupee /> | concept.md « 9b1 », ![…](part-recoupee.svg); frontmatter diagrams[1] | moved | M6 | image at the same place; legende becomes caption; subconcept 9b1 |
| <Reflexe note> | concept.md « Le test rapide » | moved | M8 | question as blockquote, note as one paragraph |
| <Erreurs> | concept.md « Pièges » | moved | M7 | base of the merge; MDX order; <Renvoi> converted; typographic apostrophes straightened in « Légender une part story » |

## ASTRO: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Gateau.astro frontmatter code (layers, slices, constants) and comments | none (written out in gateau.svg) | by design | M12 | M12: Astro frontmatter code once written out |
| Gateau svg root, viewBox 0 0 600 440, <title>, <desc> | gateau.svg | moved | M11 | same viewBox; title and desc kept, ids renamed gateau-titre, gateau-desc |
| Gateau four layers (band rects and labels) | gateau.svg g#9a1-couches | moved | M11 | loop written out; band colour to muted fill-opacity 0.12, stroke-opacity 0.5 |
| Gateau hatched whole layer and dashed outline, « couche entière » | gateau.svg g#9a1-couche-entiere-fond, g#9a1-couche-entiere | moved | M11 | hatch becomes muted fill 0.35 under the dashed outline; text halo dropped (recorded loss) |
| Gateau three slices s1, s2, s3 with cut lines and labels | gateau.svg g#9a1-tranche-1, -2, -3 | moved | M11 | three colours become opacities 0.85, 0.6, 0.4; cut lines become 2-unit gaps (four segments per slice) |
| Gateau legend (hatch swatch, slice swatch, texts) | gateau.svg g#9a1-legende | moved | M11 | hatch swatch drawn as the whole layer (fill 0.35, dashed outline); slice swatch as tranche 1 (0.85) |
| Gateau <style> and pattern g9a-hatch | gateau.svg attributes | moved | M11 | converted to currentColor with opacities and classes primary, muted |
| PartRecoupee.astro frontmatter code (SEG, Y0) and comments | none (written out in part-recoupee.svg) | by design | M12 | M12: Astro frontmatter code once written out |
| PartRecoupee svg root, viewBox 0 0 600 395, <title>, <desc> | part-recoupee.svg | moved | M11 | same viewBox; title and desc kept, ids prefixed part-recoupee; typographic apostrophes straightened |
| PartRecoupee origin part and three links | part-recoupee.svg g#9b1-part-origine, g#9b1-liens | moved | M11 | loop written out; grey line to muted currentColor |
| PartRecoupee slices a (s1) and c (s2) with cut lines and heads | part-recoupee.svg g#9b1-tranche-a, g#9b1-tranche-c | moved | M11 | primary 0.85 and secondary 0.6; cut lines become 2-unit gaps |
| PartRecoupee b: ghost rects, hatched band, outline, heads | part-recoupee.svg g#9b1-lamelle-b | moved | M11 | ghost loop written out as dashed muted rects; hatch becomes muted fill 0.4 under the dashed outline |
| PartRecoupee pattern notes (D, R, une couche) | part-recoupee.svg g#9b1-patrons | moved | M11 | texts kept, apostrophe straightened; class strong to font-weight 700 |
| PartRecoupee <style> and pattern g9b-hatch (incl. unused .soft, .small) | part-recoupee.svg attributes | moved | M11 | converted to currentColor with opacities and classes primary, secondary, muted |

## Lost

None.

## Invented

None.

## Refuted by the verification

None.

## Writing choices

- M9: CF « Banque d'exemples » lead paragraph is entirely the storyline facts (facts, what is not fixed, what stays exercise proposals); all of it moved to « Faits du fil rouge utilisés » with the lead words « Faits du fil rouge utilisés : » dropped; no other lead text left at the top of « Banque d'exemples ». Its original line breaks kept.
- M9: « Consignes » and « Schéma » copied verbatim from CF « Sous-concepts » and « Schéma »; case headings, fields and labels unchanged (all labels already SPEC 4.3 labels; nested bold items such as **SPIDR**, **Richard Lawrence**, **Découper par couche** are inside fields, not fields).
- M10 Nature: row « Ces patrons sont aujourd'hui publiés par Humanizing Work (Lawrence et Green) » given école, taken as stated by the MDX item « Lawrence : neuf patrons, publiés le 28 octobre 2009, aujourd'hui publiés avec Peter Green » (kind ecole).
- M10 Nature: row « Que chaque story soit une tranche verticale ; ... » given cours from MDX item « Chaque story est une tranche verticale. » (kind cours).
- M10 Nature: row « Tranche est une façon de découper, pas un niveau ... au niveau du sprint, une tranche est une story » given cours from MDX item « Le principe vaut à plusieurs niveaux ; au niveau du sprint, une tranche est une story » (kind cours).
- M10 Nature: rows whose matching MDX item has no kind left empty (site's choice): métaphore du gâteau, origine des mots, couche seule ne sert pas seule, vertical s'arrête à la story, PO juge sur critères, walking skeleton définition, exemples du fil rouge, Developers estiment la taille.
- M10 Nature: row Lawrence Defer Performance has no MDX sources item; matched to the ecoles.ecole item « Richard Lawrence : neuf patrons (2009) »: école.
- M10 Nature: row « Les patrons SPIDR et Lawrence se recoupent ... sans se confondre » has no MDX sources item stating it; matched to ecoles.ecole item « Entre les catalogues »: école.
- M10 Nature: row « tranche qui traverse toutes les couches sans servir seule (compteur) ; proche d'un walking skeleton » has no MDX sources item; its closest ecoles match is the voisines walking skeleton item (not a stance): empty.
- M10 Nature: rows with no MDX sources item and no ecoles stance match left empty: story qui ne nomme pas l'écran, mot flou règle non fixée, spike livre une réponse pas une fonction (course deduction; not the SPIDR ecole claim), tâches au Sprint Planning, walking skeleton daté années 1990 (voisines, not a stance).
- M10 Nature: row « Le test rapide » given cours from MDX item « Le réflexe : ... » (kind cours); row « Couches d'un produit data » cours; row « Schéma 9b, cas inventé » cours from MDX « Rattacher le morceau ... » (kind cours).
- M10 orphan: [S5b] was cited by no source cell; row « SPIDR, P et I » names it as support in its verification column (« l'affiche [S5b] ajoute ... »); source cell [S5] became « [S5], [S5b] » (moved, detail: orphan [S5b] added). No other orphan.
- M10: section name « Sous-concepts 9a1 et 9a2 » in row « Tranche est une façon de découper » renamed « Consignes 9a1 et 9a2 »; « Banque 9a1 et 9a2 » and other section names left as they are.
- M10: paths `course/sources/NN-slug.md` rewritten to `concepts/NN-slug/sources.md` in source and verification cells (00-scrum, 01-produit-et-po, 03-backlog-produit, 04-hierarchie, 05-user-story, 07-invest, 08-criteres-regles, 17-hypotheses-exploration).
- M10: source cells « aucune » and « fil rouge » copied unchanged; a double space in the row « Exemples du fil rouge » copied as is.
- M13: the en-dash in « © 2000–2026 » (S4 reference) kept: it is not an em-dash, and « Références » stays unchanged. No em-dash, arrow or typographic apostrophe found in the sources of these two files.
- M13: a blank line added after the « Affirmations », « Références » and « Non vérifié » headings (form only, CommonMark).
- M1: « Objectif » is the course.yaml objective verbatim (identical to CF); the MDX objectif is a shorter form whose every clause the objective carries, so nothing is lost.
- M3: stances.consensus item 2 (Pratique établie): the reference « concept 7 », which only CF gives, is added after « sous le V d'INVEST »; the rest is the MDX text.
- M3: stances.course item 5 (Chaque story est une tranche verticale): CF's more precise references win, « concept 3 » becomes « concept 3b » and « concept 17 » becomes « concept 17b1 ».
- M3: the CF school claims (catalogues, each with its author, partly overlapping, each pattern attributed to its catalogue) and the CF walking skeleton neighbour are already in the MDX items; nothing added. The CF teacher hint « sans source externe, à présenter comme tels » is dropped by design.
- M3: item keys are written in the template order text, author, refs.
- M4: « L'essentiel » uses the MDX wording; « de haut en bas, », which only CF gives, is inserted after « traverse toutes les couches, ». CF's parenthesised list of layers is not used because the MDX colon list says the same thing. The gateau.svg image follows at the Figure's place.
- M6: the MDX pitfall renvois « (<Renvoi n="5" />, <Renvoi n="7b" />) » become « (concepts 5 et 7b) »; the Pastilles become [cours] and [école] where they stood; the FilRouge becomes a « **Fil rouge :** » blockquote.
- M7: in the walking skeleton pitfall, CF's named author is kept: « Un walking skeleton (Cockburn) sert l'équipe ».
- M7: in « Appliquer le vertical aux tâches », CF's reference « (concept 4) » is added at the end.
- M7: in « Nommer la forme dans la tranche », the CF sentence « Une story qui ne nomme pas l'écran livre quand même quelque chose de visible. » is added to the item.
- M7: in « Fixer une règle en découpant », CF « concept 8a2 » replaces MDX « concept 8 ».
- M7: every CF pitfall is already in MDX; the list keeps the MDX order, with « Légender une part « story » » in seventh place.
- M8: the quick test blockquote is the CF question, which matches the Reflexe slot; the note is the Reflexe note; CF adds nothing.
- M13: the typographic apostrophes in the « Légender une part » pitfall (n’est, qu’au) become straight apostrophes. The file has no em-dashes or arrows, so no replacement was needed.
- gateau.svg: The second colour is lost: the three slices (--sch-s1, --sch-s2, --sch-s3) become one class, primary, told apart by fill-opacity 0.85, 0.6 and 0.4 (M11)
- gateau.svg: The hatch on the whole layer (pattern g9a-hatch) becomes a muted fill (fill-opacity 0.35) under the dashed outline that was already there; the legend swatch is drawn the same way (M11)
- gateau.svg: The cut lines across each slice (--sch-s-ink at 0.6 opacity) become 2-unit gaps: each slice is drawn as four path segments (y 70-137, 139-197, 199-257, 259-326), with rounded corners only at the top and bottom (M11)
- gateau.svg: The halo behind the « couche entière » label (paint-order stroke in --sch-grey) is lost (M11)
- gateau.svg: The two text tones (--sch-text and --sch-text-soft) become currentColor, with fill-opacity 0.8 on the legend text and 1 on its bold terms (M11)
- gateau.svg: The site font (var(--font-ui)) becomes the generic families system-ui, sans-serif (M11)
- part-recoupee.svg: Second colour: slices a (--sch-s1) and c (--sch-s2) had two hues; now classes primary and secondary with fill-opacity 0.85 and 0.6 (M11)
- part-recoupee.svg: Hatch: the g9b-hatch pattern on band b (grey background, 45-degree lines) became a muted fill (fill-opacity 0.4) under its dashed outline (M11)
- part-recoupee.svg: Contrast ink: the cut lines (--sch-s-ink, opacity 0.6, inset x 26 to 204 and 236 to 414) across slices a and c became 2-unit gaps, each slice drawn as four segments across its full width (M11)
- part-recoupee.svg: Fonts: var(--font-ui) became the generic font-family system-ui, sans-serif (M11)
- part-recoupee.svg: Distinct text and grey tokens (--sch-text, --sch-grey-line, --sch-band-line) collapse to currentColor (text) and the muted class (outlines, links, ghost layers) (M11)

## Checks

`mise exec -- specs/linear-course/checks/check-course courses/parcours-po --only course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography --concept 9 --lang-dir specs/linear-course/checks/fixtures/lang`

```
course-yaml: ok
concept-folder: ok
conventions: ok
svg-contract: ok
sources: ok
glossary-order: ok
typography: ok
```

