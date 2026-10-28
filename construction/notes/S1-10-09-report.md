# Migration report: concept 9

Workflow `migrate-concept`, course `parcours-po`, concept folder `/Users/sve/code/workspaces/perso/feyn/.claude/worktrees/s1-10-155/courses/parcours-po/concepts/09-decoupage-vertical/`.
Old files: `/Users/sve/code/workspaces/perso/pdx/parcours-po/course/concepts/09-decoupage-vertical.md` (CF), `/Users/sve/code/workspaces/perso/pdx/parcours-po/course/sources/09-decoupage-vertical.md` (SF), `/Users/sve/code/workspaces/perso/pdx/parcours-po-website/src/content/concepts/fr/09-decoupage-vertical.mdx` (MDX), `/Users/sve/code/workspaces/perso/pdx/parcours-po-website/src/components/schemas/Gateau.astro`, `/Users/sve/code/workspaces/perso/pdx/parcours-po-website/src/components/schemas/PartRecoupee.astro` (ASTRO).

## Summary

| kept | moved | by design | lost | invented | refuted | checks | target existed | accepted |
|---|---|---|---|---|---|---|---|---|
| 7 | 50 | 6 | 0 | 0 | 0 | pass | no | no |

Result: **passed**. lost and invented count the rows confirmed by the verification; the rows it refuted (refuted) are listed at the end and count in no other column. checks is read in code from the output below, which the check agent returns; target existed is the scope agent's word.

## CF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter (concept, titre) and H1 | course.yaml (number, title) | by design | M1 | M12: H1s and frontmatters of M1 are dropped; identity held by course.yaml |
| « Objectif » | course.yaml objective; concept.md « Objectif » | moved | M1 | Identical to the course.yaml objective (capital, final period); written verbatim in concept.md « Objectif » and carried in course.yaml |
| « L'essentiel » | concept.md « L'essentiel » | moved | M4 | Merged with the MDX intro: MDX wording as base, CF-only « de haut en bas » inserted after « traverse toutes les couches »; nothing of CF missing |
| « Consensus et choix d'école » (section) | concept.md frontmatter stances and neighbors | moved | M3 | Not written as a section; each claim matched to a frontmatter item (Scrum Guide, pratique établie, catalogues SPIDR/Lawrence/Wake, recoupement, walking skeleton, choix du cours) |
| Consensus pratique établie: « sous le V d'INVEST, concept 7 » | concept.md frontmatter stances.consensus[1].text | moved | M3 | CF-only reference « concept 7 » carried into the MDX item |
| Choix du cours: « (concept 3b) » and « (concept 17b1) » | concept.md frontmatter stances.course[4].text | moved | M3 | CF precise references win over MDX « concept 3 » and « concept 17 » |
| Choix du cours hint « (sans source externe, à présenter comme tels) » | none (protocol rule stances-told-apart) | by design | M3 | M3/M12: the CF teacher hint on the course's choices is carried by the protocol rule stances-told-apart |
| « Sous-concepts » | teaching.md « Consignes » | moved | M9 | Renamed « Consignes », text verbatim (diff identical) |
| « Banque d'exemples » lead paragraph « Faits du fil rouge utilisés : … » | teaching.md « Faits du fil rouge utilisés » | moved | M9 | Became its own section, lead words dropped, rest verbatim |
| « Banque d'exemples » (seven cases, all fields) | teaching.md « Banque d'exemples » | kept | M9 | Same ### headings and every field verbatim (diff identical), including « Réserve, sur demande » |
| « Pièges » | concept.md « Pièges » | moved | M7 | Merged with MDX <Erreurs>: MDX order and sentences; CF precisions kept (« (Cockburn) », « (concept 4) », « concepts 5 et 7b », « concept 8a2 », CF sentence « Une story qui ne nomme pas l'écran livre quand même quelque chose de visible. ») |
| « Le test rapide » | concept.md « Le test rapide » | moved | M8 | CF question as blockquote, then the MDX <Reflexe> note; CF adds nothing else |
| « Schéma » | teaching.md « Schéma » | kept | M9 | Verbatim (diff identical) |

## SF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter and H1 | none | by design | M1 | M10/M12: frontmatter and H1 dropped |
| intro paragraph | sources.md intro | kept | M10 | Identical |
| « Affirmations » (section, header, Nature column) | sources.md « Affirmations » | moved | M10 | Header becomes « Affirmation (section de `concept.md` ou de `teaching.md`) \| Source \| Ce qui a été vérifié \| Nature »; 39 rows, same order, columns 1 to 3 identical after the named conversions; Nature filled from MDX kinds (ecole written école), empty where the MDX item has no kind or no item matches |
| Row « Le Scrum Guide ne parle ni de tranche verticale… » | sources.md « Affirmations » | moved | M10 | paths course/sources/04-hierarchie.md, 07-invest.md to concepts/NN-slug/sources.md; Nature consensus |
| Row « Découper un élément en éléments plus petits fait partie du refinement » | sources.md « Affirmations » | moved | M10 | path rewritten; Nature consensus |
| Row « L'incrément doit être utilisable » | sources.md « Affirmations » | moved | M10 | path rewritten (00-scrum); Nature consensus |
| Row « Que chaque story soit une tranche verticale… » | sources.md « Affirmations » | moved | M10 | paths rewritten (03-backlog-produit, 17-hypotheses-exploration); Nature cours |
| Row « « Tranche » est une façon de découper, pas un niveau… » | sources.md « Affirmations » | moved | M10 | section name « Sous-concepts 9a1 et 9a2 » becomes « Consignes 9a1 et 9a2 »; path rewritten; Nature cours |
| Row « Le vertical s'arrête à la story… » | sources.md « Affirmations » | moved | M10 | path rewritten; Nature empty (MDX item has no kind) |
| Row « Le PO juge la story sur ses critères… » | sources.md « Affirmations » | moved | M10 | path rewritten (08-criteres-regles); Nature empty |
| Row « SPIDR, P et I… » | sources.md « Affirmations » | moved | M10 | orphan [S5b] added: source cell « [S5] » becomes « [S5], [S5b] »; S5b is cited by no source cell and the verification column names it as support: « l'affiche [S5b] ajoute « Consider building a minimal user interface first » »; Nature école |
| Row « SPIDR, S (Spike)… » | sources.md « Affirmations » | moved | M10 | path rewritten (07-invest); Nature école |
| Row « Lawrence, Defer Performance… » | sources.md « Affirmations » | moved | M10 | No MDX sources item states it; Nature école taken from the matching MDX ecoles item « Richard Lawrence : neuf patrons (2009) » |
| Row « Une story qui ne nomme pas l'écran… » | sources.md « Affirmations » | moved | M10 | paths rewritten (05-user-story, 07-invest, 01-produit-et-po); Nature empty |
| Row « Un mot flou dans la tranche… » | sources.md « Affirmations » | moved | M10 | paths rewritten (08-criteres-regles, 07-invest); Nature empty |
| Row « Couches d'un produit data… » | sources.md « Affirmations » | moved | M10 | Source « aucune » kept as is; Nature cours |
| Row « Le spike livre une réponse… » | sources.md « Affirmations » | moved | M10 | path rewritten (07-invest); Nature empty |
| Row « Les Developers estiment la taille d'un élément… » | sources.md « Affirmations » | moved | M10 | paths rewritten (04-hierarchie, 07-invest); Nature empty |
| Row « Les tâches se découpent au Sprint Planning… » | sources.md « Affirmations » | moved | M10 | path rewritten (04-hierarchie); Nature empty |
| « Références » | sources.md « Références » | kept | M10 | Unchanged, nine rows including S5b |
| « Non vérifié » | sources.md « Non vérifié » | kept | M10 | Unchanged, ten items |

## MDX: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| numero, titre, prerequis | course.yaml | moved | M1 | number "9", title, prerequisites [8] in course.yaml |
| objectif | course.yaml objective | moved | M1 | MDX « tranches qui traversent les couches du produit et servent seules à l'utilisateur » is a shorter form of the course.yaml objective (S1-08 « merged » for concept 9); no clause lost |
| description | concept.md frontmatter description | kept | M2 |  |
| ecoles.consensus, ecoles.ecole, ecoles.cours | concept.md frontmatter stances.consensus, stances.school, stances.course | moved | M3 | Keys renamed (auteur/texte to author/text); texts and refs unchanged except CF precisions added (concept 7, concept 3b, concept 17b1) |
| ecoles.voisines | concept.md frontmatter neighbors | moved | M3 | Walking skeleton item, text and refs [S8] unchanged |
| sources (affirmations texts, references, nonVerifie) | none (kinds used in sources.md Nature) | by design | M10 | M10/M12: MDX sources texts by design, only their kind is used |
| alignement | none | by design | M12 | MDX alignement |
| import lines | none | by design | M6 | import lines: by design, nothing (M12) |
| Intro text before first <Sous> | concept.md « L'essentiel » | moved | M4 | Base of « L'essentiel », merged with CF |
| <Figure> Gateau in intro | concept.md « L'essentiel » image gateau.svg; frontmatter diagrams[0] | moved | M6 | ![title](gateau.svg) at the same place; legende is the caption; subconcept 9a |
| <Sous id=9a> with promesse | concept.md « 9a La tranche verticale » | moved | M5 | Heading plus promise as italic paragraph |
| <h4 9a1> La tranche qui sert seule | concept.md « 9a1 La tranche qui sert seule » | moved | M5 | Three paragraphs unchanged; <Pastille cours> becomes [cours] |
| <h4 9a2> Où s'arrête le vertical | concept.md « 9a2 Où s'arrête le vertical » | moved | M5 | Unchanged; <Renvoi 4> concept 4, <Renvoi 15> concept 15, <Pastille cours> [cours] |
| <Sous id=9b> with promesse | concept.md « 9b Les patrons de découpage » | moved | M5 | Heading plus promise as italic paragraph |
| <h4 9b1> Couche ou tranche | concept.md « 9b1 Couche ou tranche » | moved | M5 | Text unchanged; Renvois 4 and 17 converted |
| <FilRouge> Étienne | concept.md « 9b1 », blockquote | moved | M6 | Blockquote led by « **Fil rouge :** », text unchanged |
| <Figure> PartRecoupee | concept.md « 9b1 » image part-recoupee.svg; frontmatter diagrams[1] | moved | M6 | Image at the same place; legende is the caption; subconcept 9b1 |
| <h4 9b2> Les patrons et leur catalogue | concept.md « 9b2 Les patrons et leur catalogue » | moved | M5 | Paragraphs and list unchanged; <Pastille ecole> [école], <Pastille cours> [cours], <Renvoi 17> concept 17 |
| <Reflexe note> | concept.md « Le test rapide » | moved | M8 | Question as blockquote, note as one paragraph |
| <Erreurs> | concept.md « Pièges » | moved | M7 | MDX order and sentences kept, merged with CF precisions; Renvois converted (8 replaced by CF « concept 8a2 ») |
| Erreurs « Légender une part « story » » typographic apostrophes | concept.md « Pièges » | kept | M13 | ’ written as straight apostrophe (form, not counted) |

## ASTRO: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Gateau.astro (frontmatter code, layers and slices loops) | gateau.svg | moved | M11 | Loops written out; same viewBox 0 0 600 440 and geometry (layers, labels at x=148, slices x 172/276/380, w 92, y 70 to 326, rx 6, legend at translate(22 346)); Astro frontmatter code by design (M12) |
| Gateau <title>, <desc> | gateau.svg | moved | M11 | Kept verbatim, ids prefixed with stem (gateau-titre, gateau-desc) |
| Gateau colours, hatch pattern, cut lines, <style> | gateau.svg | moved | M11 | Tokens mapped to distinct class/opacity pairs (band muted 0.15/stroke 0.6, grey muted 0.35, grey-line stroke 0.9, s1/s2/s3 primary 0.85/0.6/0.4, text primary 1, text-soft secondary 0.8); cuts drawn as 2px gaps between slice segments; hatch as muted fill under dashed outline; legend swatch drawn with that outline; grey-note halo (paint-order stroke) dropped; no loss list written in the SVG itself |
| Gateau groups | gateau.svg | moved | M11 | Groups 9a1-couches, 9a1-tranche-1..3, 9a1-couche-entiere(-fond), 9a1-legende |
| PartRecoupee.astro (frontmatter code, map loops) | part-recoupee.svg | moved | M11 | Loops written out; same viewBox 0 0 600 395 and geometry (SEG 38, Y0 142, slices x 20/230 w 190, ghosts at 142/218/256, hatch at 180) |
| PartRecoupee <title>, <desc> | part-recoupee.svg | moved | M11 | Kept, ids prefixed with stem; typographic apostrophes made straight (form) |
| PartRecoupee colours, hatch, cut lines, <style> | part-recoupee.svg | moved | M11 | s1 primary 0.85, s2 secondary 0.6, band-line muted stroke 0.5, grey-line muted stroke 1, hatch muted fill 0.4 under dashed outline, text primary; cuts as 3px gaps; unused classes soft/small dropped; no loss list written in the SVG itself |
| PartRecoupee groups | part-recoupee.svg | moved | M11 | 9b1-part-origine, 9b1-morceau-a/c/b, 9b1-note-b; pattern labels take the later leaf: 9b2-patron-a, 9b2-patron-c |

## Lost

None.

## Invented

None.

## Refuted by the verification

None.

## Writing choices

- M9: the « Consignes » cite the first case as « Redécouper “quelles stations vont se vider ?” », with its inner “ ” kept as CF writes them. Its heading has « » inside, and the rule keeps inner quotes as they are.
- M9: the lead words « Faits du fil rouge utilisés : » were dropped. The rest of that paragraph became « Faits du fil rouge utilisés », with its line breaks kept. No other lead text was left at the top of « Banque d'exemples ».
- M9: « Schéma » was copied verbatim from CF. Its two bold-led blocks (9a, 9b) stay one paragraph with no blank line between them, as in CF.
- M10: orphan [S5b] added to the source column of the row « SPIDR, P et I » ([S5] became [S5], [S5b]), because its verification column says « l'affiche [S5b] ajoute … ». Counted moved, detail "orphan [S5b] added". No other reference is orphaned.
- M10: the Nature of « Que chaque story soit une tranche verticale … » is cours, from the MDX item « Chaque story est une tranche verticale. » (kind cours).
- M10: the Nature of « « Tranche » est une façon de découper, pas un niveau … » is cours, from the MDX item « Le principe vaut à plusieurs niveaux ; au niveau du sprint, une tranche est une story. » (kind cours).
- M10: the rows on Wake's cake metaphor, the origin of the words, a single layer, the vertical stopping at the story, the PO judging the story, the walking skeleton, a story without a screen, the vague word, the storyline examples and the Developers sizing are each stated by an MDX sources item that has no kind. Their Nature is left empty (the site's choice).
- M10: the rows « Ces patrons sont aujourd'hui publiés par Humanizing Work » and « Patrons de Richard Lawrence : neuf patrons » both take école from the one MDX item « Lawrence : neuf patrons, publiés le 28 octobre 2009, aujourd'hui publiés avec Peter Green. », which states both claims.
- M10: no MDX sources item states « Lawrence, Defer Performance ». It takes école from the MDX ecoles item « Richard Lawrence : neuf patrons (2009) », since Defer Performance is one of those nine.
- M10: no MDX sources item states « Les patrons SPIDR et Lawrence se recoupent ». It takes école from the MDX ecoles item « Entre les catalogues ».
- M10: three rows are matched only by the MDX voisines item, which has no stance, so their Nature is empty. They are « Une tranche qui traverse toutes les couches sans servir seule (compteur) », « Walking skeleton daté « années 1990 » » and « Le walking skeleton (Alistair Cockburn) » (also stated by a kindless MDX sources item).
- M10: three rows match no MDX sources item that has a kind and no ecoles stance, so their Nature is empty. They are « Le spike livre une réponse, pas une fonction », « Les tâches se découpent au Sprint Planning » and « Un mot flou dans la tranche ».
- M10: « (Sous-concepts 9a1 et 9a2, …) » became « (Consignes 9a1 et 9a2, …) ». Every course/sources/NN-slug.md path became concepts/NN-slug/sources.md. Rows whose section is in teaching.md were kept.
- M10: the source cells « aucune » and « fil rouge » were copied as they are. The double space in the row on the storyline examples was kept.
- M10/M13: a blank line was added after each ## heading (form only). The Nature column is written as an empty cell (| |) where it has no value.
- M13: neither file had any banned character (em-dash, arrow) or typographic apostrophe, so nothing was replaced. The en-dash in « © 2000–2026 » (S4) was kept: the French pack does not ban it.
- M1: « Objectif » written as the course.yaml objective, capital first letter and final period added, wrapped on three lines like the CF « Objectif ». CF « Objectif » matches it word for word. MDX objectif is a shorter form that S1-08 records as merged, so nothing is lost.
- M3: the CF « Consensus » (pratique établie) gives a more precise reference, « sous le V d'INVEST, concept 7 ». It was carried into the matching MDX consensus item: « ...sous le V d'INVEST, concept 7), Richard Lawrence (2009)... ».
- M3: the CF « Choix du cours » has more precise references, « concept 3b » and « concept 17b1 ». They replace MDX « concept 3 » and « concept 17 » in the course item « Chaque story est une tranche verticale... ».
- M3: the MDX course item « Au niveau du sprint, une tranche est une story. » has no CF equivalent in « Choix du cours ». It was kept as is.
- M3: CF school, neighbor and other course claims are all already carried by MDX items. Nothing CF-only was added there.
- M3: the CF teacher hint « sans source externe, à présenter comme tels » was dropped by design (protocol rule stances-told-apart).
- M3: item keys are written in the template order text, author, refs. The MDX order was auteur, texte, refs.
- M4: the CF-only « de haut en bas » was added to the MDX base in « L'essentiel », at the place CF says it: « traverse toutes les couches, de haut en bas, en tranche fine ».
- M4/M6: the Gateau figure in the « L'essentiel » zone became ![title](gateau.svg) after the essentials paragraph. The PartRecoupee figure became ![title](part-recoupee.svg) in 9b1, after the Fil rouge blockquote, at the MDX place.
- M6: renvois were written as « au concept 4 », « (concept 15) », « (concept 4) » and « ; concept 17) », twice. The consecutive renvois 5 and 7b in one parenthesis became « (concepts 5 et 7b) ».
- M7: pitfall « Croire que traverser les couches suffit » keeps the MDX sentence « Un walking skeleton » and inserts the named author from CF: « Un walking skeleton (Cockburn) sert l'équipe ».
- M7: pitfall « Appliquer le vertical aux tâches » got the CF reference « (concept 4) » at the end of the MDX sentence, which had none.
- M7: pitfall « Nommer la forme dans la tranche » got the CF sentence absent from MDX: « Une story qui ne nomme pas l'écran livre quand même quelque chose de visible. »
- M7: pitfall « Fixer une règle en découpant » uses CF « concept 8a2 » in place of MDX « concept 8 ».
- M7: order is the MDX <Erreurs> order. No CF pitfall is absent from MDX.
- M8: the quick test is the CF question, identical to the Reflexe slot, as one blockquote. The note is the Reflexe note. CF adds nothing.
- M13: two typographic apostrophes (’) in MDX pitfall « Légender une part « story » » (n’est, qu’au) became straight ones. No banned character (em-dash, arrow) was found, so nothing was replaced.
- gateau.svg: Colour mapping: --sch-band (layer fill): muted, fill-opacity 0.15 (M11)
- gateau.svg: Colour mapping: --sch-band-line (layer outline): muted, stroke-opacity 0.6 (M11)
- gateau.svg: Colour mapping: --sch-grey (hatch background of the whole layer and of its legend swatch): muted, fill-opacity 0.35 (M11)
- gateau.svg: Colour mapping: --sch-grey-line (hatch lines and dashed outline of the whole layer): muted, stroke-opacity 0.9 (M11)
- gateau.svg: Colour mapping: --sch-s1 (tranche 1 and the vertical-slice legend swatch): primary, fill-opacity 0.85 (M11)
- gateau.svg: Colour mapping: --sch-s2 (tranche 2): primary, fill-opacity 0.6 (M11)
- gateau.svg: Colour mapping: --sch-s3 (tranche 3): primary, fill-opacity 0.4 (M11)
- gateau.svg: Colour mapping: --sch-text (layer names, slice labels, 'couche entière', legend terms): primary, fill-opacity 1 (M11)
- gateau.svg: Colour mapping: --sch-text-soft (legend sentences): secondary, fill-opacity 0.8 (M11)
- gateau.svg: --sch-s-ink cut lines across each slice became gaps: each slice is drawn as four segments with a 2-unit gap at the layer boundaries (y 138, 198, 258), full slice width instead of the 6-unit inset of the old cuts; the 0.6 opacity of the cut ink is lost (M11)
- gateau.svg: The hatch pattern g9a-hatch (45-degree lines, line opacity 0.55) became a muted fill under a dashed outline, on the whole layer and on its legend swatch (the swatch now carries the dashed outline too) (M11)
- gateau.svg: The halo of 'couche entière' (paint-order stroke in --sch-grey, 5px) is dropped (M11)
- gateau.svg: The four distinct slice colours (s1, s2, s3) are now one class with three opacities (M11)
- gateau.svg: font-family var(--font-ui) became the generic sans-serif (M11)
- part-recoupee.svg: Colour mapping, --sch-text: class primary, opacity 1 (all text, the default fill) (M11)
- part-recoupee.svg: Colour mapping, --sch-s1 (slice a): class primary, fill-opacity 0.85 (M11)
- part-recoupee.svg: Colour mapping, --sch-s2 (slice c): class secondary, fill-opacity 0.6 (M11)
- part-recoupee.svg: Colour mapping, --sch-grey (hatch background of band b): class muted, fill-opacity 0.4 (M11)
- part-recoupee.svg: Colour mapping, --sch-grey-line (origin outline, links, outline of band b): class muted, stroke-opacity 1 (M11)
- part-recoupee.svg: Colour mapping, --sch-band-line (ghost layers of b): class muted, stroke-opacity 0.5 (M11)
- part-recoupee.svg: Colour mapping, --sch-s-ink (cut lines across slices a and c, opacity 0.6): no ink, a 3px gap; each slice drawn as four segments (M11)
- part-recoupee.svg: Hatch of band b (pattern g9b-hatch, --sch-grey-line stripes at opacity 0.55 over --sch-grey): a muted fill (0.4) under the dashed outline (M11)
- part-recoupee.svg: --sch-text-soft and the classes soft and small: declared in the <style> but used by no element, nothing drawn (M11)
- part-recoupee.svg: Font var(--font-ui) replaced by the generic font-family sans-serif (M11)
- part-recoupee.svg: The second colour that told slices a and c apart: now told apart by class and opacity (0.85 against 0.6) (M11)
- part-recoupee.svg: Typographic apostrophes (d’abord, c’est, n’a, l’illustration) written straight in the desc and text (form) (M11)

## Checks

`mise exec -- specs/linear-course/checks/check-course /Users/sve/code/workspaces/perso/feyn/.claude/worktrees/s1-10-155/courses/parcours-po --only course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography --concept 9`

```
course-yaml: ok
concept-folder: ok
conventions: ok
svg-contract: ok
sources: ok
glossary-order: ok
typography: ok
```

## Run against the prototype

The run's output against the hand prototype (S1-02, #79, edited by #81 and #126), from `git diff` on the concept folder: 11 hunks (concept.md 5, sources.md 4, one per SVG), split into 20 differences. `teaching.md` is identical.

| class | count |
|---|---|
| (a) the run reads the old files differently | 4 |
| (b) a later deliberate change to the prototype, missed | 0 |
| (c) the two M11 changes after run 4 | 3 |
| (d) wrapping, key order, form | 13 |

(a), the run right in each by MAP:

- concept.md « Pièges »: « Le walking skeleton (Cockburn) » becomes « Un walking skeleton (Cockburn) »: M7 takes the MDX sentence (« Un ») and adds CF's named author; the prototype took CF's article.
- gateau.svg: each slice keeps the old outer corners (rx 6, drawn as paths) with square inner segments; the prototype rounded every segment (rx 4 and 2).
- gateau.svg: the legend swatch of the whole layer carries the layer's own outline (stroke 2.5, dash 7 5): M11, a swatch drawn as the element it stands for; the prototype drew a lighter one (2, dash 5 3).
- part-recoupee.svg: slices a and c keep rx 6 outer corners and get 3px gaps centred on the old cut lines; the prototype had rx 4 and 2 and 2px gaps.

(b): none missed. The three deliberate changes are reproduced: orphan [S5b] added to the « SPIDR, P et I » row (#81), the CF references « concept 7 », « concept 3b », « concept 17b1 » in the stances and the stances kept in the frontmatter only (#126).

(c), both M11 changes hold:

- gateau.svg, one class-and-opacity pair per old token: band muted 0.15 with outline 0.6, grey muted 0.35, grey-line muted stroke 0.9, s1 to s3 primary 0.85, 0.6, 0.4, text primary 1, text-soft secondary 0.8; no two tokens share a pair. Group ids were already on leaf 9a1 in the prototype.
- part-recoupee.svg, one pair per token: holds, as it already did in the prototype, whose pairs were distinct. The run's pairs differ by choices M11 allows, not by the M11 change itself: slice c secondary 0.6 (primary 0.6 in the prototype), ghost layers muted stroke 0.5 (secondary 0.45), grey muted 0.4, grey-line muted stroke 1.
- part-recoupee.svg, group ids on the leaf a part illustrates: the prototype's one `9b2-patrons` becomes `9b2-patron-a` and `9b2-patron-c` (the patterns, taught in 9b2) and `9b1-note-b` (the layer note, explained in 9b1).

(d): stance and neighbor keys in template order (text, author, refs, 2 hunks); reader text unwrapped, the Fil rouge blockquote on one line (3 hunks); sources.md, a blank line after each `##` heading and empty Nature cells written `| |`; per SVG, `font-family="sans-serif"` as in `templates/diagram.svg`, the `<desc>` on several lines as in the component, and the loops written out per element (four layer rects, attributes on each element). Gateau groups: `9a1-tranche-horizontale` became `9a1-couche-entiere-fond` and the `9a1-tranches-verticales` wrapper is gone (each slice group now holds its own label); nothing references either id.

No fix after the run: where the run and the prototype differ, the run follows MAP. The checks rerun on the output give all seven ok, `glossary-order` included.
