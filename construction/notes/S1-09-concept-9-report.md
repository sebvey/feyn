# Migration report: concept 9

Workflow `migrate-concept`, course `parcours-po`, concept folder `/Users/sve/code/workspaces/perso/feyn/.claude/worktrees/agent-aa88e67174098d833/migrate-work/parcours-po/concepts/09-decoupage-vertical/`.
Old files: `/Users/sve/code/workspaces/perso/pdx/parcours-po/course/concepts/09-decoupage-vertical.md` (CF), `/Users/sve/code/workspaces/perso/pdx/parcours-po/course/sources/09-decoupage-vertical.md` (SF), `/Users/sve/code/workspaces/perso/pdx/parcours-po-website/src/content/concepts/fr/09-decoupage-vertical.mdx` (MDX), `/Users/sve/code/workspaces/perso/pdx/parcours-po-website/src/components/schemas/Gateau.astro`, `/Users/sve/code/workspaces/perso/pdx/parcours-po-website/src/components/schemas/PartRecoupee.astro` (ASTRO).

## Summary

| kept | moved | by design | lost | invented | checks | accepted |
|---|---|---|---|---|---|---|
| 6 | 34 | 6 | 0 | 0 | pass | no |

Result: **passed**. lost and invented count the rows confirmed by the verification; the rows it refuted are listed at the end.

## CF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter (concept, titre) and H1 | course.yaml (number, title) | moved | M1 | identity carried to course.yaml; no H1 in the three files |
| « Objectif » | course.yaml objective; concept.md « Objectif » | moved | M1 | same text as the course.yaml objective, capitalised, final period |
| « L'essentiel » | concept.md « L'essentiel » | moved | M4 | merged into the MDX wording; CF-only « de haut en bas » carried at its place |
| « Consensus et choix d'école » | concept.md frontmatter stances.consensus, stances.school, stances.course, neighbors | moved | M3 | no body section; every claim matched to a frontmatter item |
| Consensus, pratique établie: « sous le V d'INVEST, concept 7 » | concept.md frontmatter stances.consensus[1].text | moved | M3 | CF-only reference « concept 7 » carried into the MDX item |
| Choix du cours: « (concept 3b) », « (concept 17b1) » | concept.md frontmatter stances.course[4].text | moved | M3 | CF's more precise references replace MDX « concept 3 », « concept 17 » |
| Choix du cours: « (sans source externe, à présenter comme tels) » | none (PROTOCOL.md rule 6.1) | by design | M3 | CF's teacher hint on the course's choices is carried by PROTOCOL.md rule 6.1 |
| « Sous-concepts » | teaching.md « Consignes » | moved | M9 | heading renamed; text verbatim |
| « Banque d'exemples », lead paragraph « Faits du fil rouge utilisés : … » | teaching.md « Faits du fil rouge utilisés » | moved | M9 | lead words dropped; text verbatim, including what is not fixed |
| « Banque d'exemples », six cases | teaching.md « Banque d'exemples » | kept | M9 | same ### headings, every field verbatim |
| « Pièges » | concept.md « Pièges » | moved | M7 | merged with MDX <Erreurs>, MDX order and sentences |
| Piège « Croire que traverser les couches suffit »: « Le walking skeleton (Cockburn) » | concept.md « Pièges » item 2 | moved | M7 | CF named author kept over MDX « Un walking skeleton » |
| Piège « Appliquer le vertical aux tâches »: « (concept 4) » | concept.md « Pièges » item 3 | moved | M7 | CF reference absent from MDX kept |
| Piège « Nommer la forme dans la tranche »: « Une story qui ne nomme pas l'écran livre quand même quelque chose de visible. » | concept.md « Pièges » item 4 | moved | M7 | CF sentence absent from MDX kept in its item |
| Piège « Fixer une règle en découpant »: « (concept 8a2) » | concept.md « Pièges » item 5 | moved | M7 | CF « concept 8a2 » replaces MDX « concept 8 » |
| « Le test rapide » | concept.md « Le test rapide » | moved | M8 | CF question as the blockquote, then the <Reflexe> note as one paragraph |
| « Schéma » | teaching.md « Schéma » | kept | M9 |  |

## SF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter and H1 | none | by design | M1 | M10: frontmatter and H1 dropped (M1) |
| intro paragraph | sources.md, top | kept | M10 |  |
| « Affirmations » | sources.md « Affirmations » | moved | M10 | header renamed to « Affirmation (section de `concept.md` ou de `teaching.md`) \| Source \| Ce qui a été vérifié \| Nature »; Nature column added from the MDX kinds; course/sources/NN-slug.md paths become concepts/NN-slug/sources.md; rows, order and texts unchanged |
| row « SPIDR, P et I : un chemin à la fois ; … » | sources.md « Affirmations », same row | moved | M10 | orphan [S5b] added: source [S5] becomes [S5], [S5b]; the verification column names it as support: « l'affiche [S5b] ajoute « Consider building a minimal user interface first » » |
| row « « Tranche » est une façon de découper, pas un niveau … » | sources.md « Affirmations », same row | moved | M10 | section name « Sous-concepts 9a1 et 9a2 » becomes « Consignes 9a1 et 9a2 » |
| « Références » | sources.md « Références » | kept | M10 |  |
| « Non vérifié » | sources.md « Non vérifié » | kept | M10 |  |

## MDX: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| numero, titre, prerequis | course.yaml (number, title, prerequisites) | moved | M1 |  |
| objectif | course.yaml objective | moved | M1 | every clause carried by the course.yaml objective (the CF objective) |
| description | concept.md frontmatter description | kept | M2 |  |
| ecoles.consensus, ecoles.ecole, ecoles.cours | concept.md frontmatter stances.consensus, stances.school, stances.course | moved | M3 | keys renamed (auteur, texte as author, text); texts unchanged except the two CF precisions; refs lists identical |
| ecoles.voisines (walking skeleton) | concept.md frontmatter neighbors | moved | M3 | key renamed; text and refs [S8] unchanged |
| sources.affirmations (kind) | sources.md « Affirmations », column Nature | moved | M10 | kinds carried to the matching rows (ecole written école); empty where the item has no kind; rows with no MDX item take the matching ecoles stance (Defer Performance and the overlap row: école) |
| sources texts (affirmation, verifie, references, nonVerifie) | none | by design | M12 | M10: the MDX sources texts (the reader paraphrase), only their kind is used |
| alignement | none | by design | M12 | MDX alignement |
| import lines | none | by design | M12 | import lines |
| text before the first <Sous> | concept.md « L'essentiel » | moved | M4 | base wording of the merged section |
| <Figure legende> with <Gateau /> | concept.md « L'essentiel », image gateau.svg; frontmatter diagrams[0].caption | moved | M6 | image alone in its paragraph at the same place; legende as caption |
| <Sous id="9a"> | concept.md « 9a La tranche verticale » | moved | M5 | heading plus the promise as one italic paragraph |
| <h4 id="9a1"> | concept.md « 9a1 La tranche qui sert seule » | moved | M5 | <Pastille kind="cours"/> becomes [cours]; text unchanged |
| <h4 id="9a2"> | concept.md « 9a2 Où s'arrête le vertical » | moved | M5 | Renvoi 4 and 15 become « concept 4 », « concept 15 »; Pastille becomes [cours] |
| <Sous id="9b"> | concept.md « 9b Les patrons de découpage » | moved | M5 | heading plus the promise in italics |
| <h4 id="9b1">, <FilRouge>, <Figure> with <PartRecoupee /> | concept.md « 9b1 Couche ou tranche »; image part-recoupee.svg; frontmatter diagrams[1].caption | moved | M6 | FilRouge becomes a « **Fil rouge :** » blockquote; Figure becomes its image at the same place; Renvoi 4 and 17 converted |
| <h4 id="9b2"> | concept.md « 9b2 Les patrons et leur catalogue » | moved | M6 | Pastille ecole becomes [école], Pastille cours becomes [cours], Renvoi 17 converted; text unchanged |
| <Reflexe note> | concept.md « Le test rapide » | moved | M8 | note as the paragraph after the blockquote |
| <Erreurs> | concept.md « Pièges » | moved | M7 | MDX order kept; Renvoi 5, 7b become « concepts 5 et 7b »; typographic apostrophes in « n’est … qu’au » made straight (M13 form) |

## ASTRO: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Gateau.astro | gateau.svg; concept.md frontmatter diagrams[0] | moved | M11 | same viewBox 0 0 600 440 and geometry; layers.map and slices.map written out; title and desc kept, ids gateau-titre, gateau-desc; slice colours s1, s2, s3 become primary at 0.85, 0.6, 0.4; cut lines become 2-unit gaps; hatched layer becomes a muted fill under the dashed outline; legend swatches drawn as the elements; grey-note halo (paint-order stroke) dropped as a conversion loss; groups 9a1-*; subconcept 9a |
| PartRecoupee.astro | part-recoupee.svg; concept.md frontmatter diagrams[1] | moved | M11 | same viewBox 0 0 600 395 and geometry; maps written out; title and desc kept (typographic apostrophes made straight), ids prefixed part-recoupee; slices a, c at 0.85, 0.6 with gaps for the cut lines; hatch on b becomes muted fill under dashed outline; ghost layers secondary dashed; groups 9b1-part-origine, 9b1-morceau-a/b/c, 9b2-patrons; subconcept 9b1 |
| Astro frontmatter code and <style> blocks | none | by design | M12 | Astro frontmatter code once written out; colour tokens and styles converted under M11 |

## Lost

None.

## Invented

None.

## Refuted by the verification

None.

## Writing choices

- M10 orphan: [S5b] is cited by no source cell; the row « SPIDR, P et I » names it as support in its verification column (« l'affiche [S5b] ajoute « Consider building a minimal user interface first » »), so its source becomes « [S5], [S5b] ». This is moved, detail "orphan [S5b] added". No other reference is an orphan.
- M10 source column: every other cell is copied unchanged. I did not add [S5] to the « Découper par valeur » row, [S7] to « Être vertical par les couches ne suffit pas », [S3] to « SPIDR, S », [S6] to « Defer Performance » or « Choisir le découpage », or [S2] to « Couches d'un produit data ». These ids show up in the verification column only as a contrast, a nuance not retained or a neighbouring idea. « aucune » is kept on the « Couches d'un produit data » row. The earlier file in the target folder had added these ids, and it was overwritten.
- M10 Nature, row « Lawrence, Defer Performance »: no MDX affirmation states it. I gave it « école », from the MDX ecoles item « Richard Lawrence : neuf patrons (2009) ».
- M10 Nature, row « Les patrons SPIDR et Lawrence se recoupent »: no MDX affirmation states it on its own. I gave it « école », from the MDX ecoles item « Entre les catalogues ».
- M10 Nature, rows « Le spike livre une réponse », « Une tranche qui traverse toutes les couches sans servir seule », « Une story qui ne nomme pas l'écran », « Un mot flou dans la tranche », « Les tâches se découpent au Sprint Planning » and « Walking skeleton daté années 1990 »: no MDX affirmation and no consensus/ecole/cours item states them, so I left Nature empty. The compteur row and the walking-skeleton date row match the voisines item, which has no stance.
- M10 Nature, rows on the gâteau metaphor, the origin of the words, « Une couche seule », « Le vertical s'arrête à la story », « Le PO juge la story », the walking skeleton, « Les Developers estiment la taille » and the storyline examples: the matching MDX affirmation has no kind, so Nature is left empty (the site's choice).
- M10 Nature: « Chaque story est une tranche verticale » row gets « cours » from the MDX affirmation of that name. The « Tranche est une façon de découper » row gets « cours » from the MDX affirmation « Le principe vaut à plusieurs niveaux ; au niveau du sprint, une tranche est une story ».
- M13: SF « Références » S4 holds an en-dash (« © 2000–2026 »). I kept it, because the banned list is em-dash and arrows, and an en-dash is neither. No em-dash, arrow or typographic apostrophe was found in CF or SF, so nothing was replaced.
- M9: the CF « Banque d'exemples » lead paragraph became « Faits du fil rouge utilisés » with its lead words « Faits du fil rouge utilisés : » dropped. No other lead text was left at the top of « Banque d'exemples ». The « Consignes » case citations are copied verbatim, including « Redécouper “quelles stations vont se vider ?” », whose inner quotes are “ ” where the heading has « ».
- M13 form: I added a blank line after each ## heading and between the « Affirmations » table and « Références », following the template. No wording changed.
- M1: « Objectif » is the course.yaml objective, verbatim, with a capital first letter and a final period. The CF « Objectif » matches it word for word. The MDX objectif is a shorter form with no clause the objective lacks, so nothing is lost.
- M3: the consensus item « Pratique établie, hors du Scrum Guide » takes CF's « concept 7 » after « sous le V d'INVEST ». MDX had no reference there.
- M3: the course item « Chaque story est une tranche verticale » takes CF's more precise references: « concept 3b » replaces MDX « concept 3 », and « concept 17b1 » replaces MDX « concept 17 ».
- M3: every other CF « Consensus et choix d'école » claim (Scrum Guide, catalogues, walking skeleton, course choices) already has a matching MDX item, so those items are copied unchanged. The CF teacher hint « sans source externe, à présenter comme tels » is left out by design (PROTOCOL 6.1).
- M3: MDX ecoles.voisines becomes frontmatter neighbors (one item, walking skeleton).
- M4: « L'essentiel » uses the MDX wording as its base and adds CF's « de haut en bas » after « traverse toutes les couches ». The MDX gloss « (le besoin d'un utilisateur, à la taille d'un sprint) » is kept. The gateau.svg image sits where its Figure stood.
- M6: Renvoi n=4, 15, 4, 17, 17 become plain « concept N ». In the « Pièges » list, Renvoi 5 and Renvoi 7b in one parenthesis become « concepts 5 et 7b ».
- M7: in « Croire que traverser les couches suffit », CF's named author wins: MDX « Un walking skeleton » becomes CF « Le walking skeleton (Cockburn) ».
- M7: in « Appliquer le vertical aux tâches », CF's « (concept 4) » is added.
- M7: in « Nommer la forme dans la tranche », the CF sentence missing from MDX is added at the end of the item: « Une story qui ne nomme pas l'écran livre quand même quelque chose de visible. »
- M7: in « Fixer une règle en découpant », CF's « concept 8a2 » replaces MDX « concept 8 ».
- M7: the items keep MDX order and MDX sentences. No CF item is missing from MDX.
- M8: « Le test rapide » is the CF question as a blockquote, then the Reflexe note as one paragraph. CF adds nothing more.
- M13: the typographic apostrophes in « n’est » and « qu’au » (MDX pitfall « Légender une part « story » ») become straight ones. The MDX text has no em-dash or arrow, so no banned character was replaced.
- Context: a concept.md was already in the target folder before this run. I overwrote it with this version, built from the old files on disk under rules M1 to M8 and M13. Its content matches the previous file.
- gateau.svg: The three slice colours (--sch-s1, --sch-s2, --sch-s3) become one primary class at fill-opacity 0.85, 0.6 and 0.4. (M11)
- gateau.svg: The contrast ink of the cut lines (--sch-s-ink) becomes a 2-unit gap: each slice is drawn as four segments, and the gap spans the full slice width where the old cuts stopped 6 units short of each edge. (M11)
- gateau.svg: The 45-degree hatch pattern of the whole layer (and of its legend swatch) becomes a muted fill at fill-opacity 0.25 under the dashed outline. (M11)
- gateau.svg: The halo behind « couche entière » (paint-order stroke in --sch-grey) is dropped. (M11)
- gateau.svg: The softer legend text colour (--sch-text-soft) becomes fill-opacity 0.8 on the explanation tspans. (M11)
- gateau.svg: The site font (var(--font-ui)) becomes the generic system-ui, sans-serif. (M11)
- part-recoupee.svg: second colour: slices a and c (--sch-s1, --sch-s2) become one class, primary, told apart by fill-opacity 0.85 and 0.6 (M11)
- part-recoupee.svg: contrast ink: the cut lines across slices a and c (--sch-s-ink at 0.6) become 2-unit gaps between four segments per slice, outer corners kept at rx 6 (M11)
- part-recoupee.svg: hatch: the hatched band of b (pattern g9b-hatch over --sch-grey) becomes a muted fill at 0.25 under its dashed outline (M11)
- part-recoupee.svg: grey and band-line tokens (--sch-grey-line, --sch-band-line) become the classes muted and secondary with stroke-opacity 0.8 and 0.45 (M11)
- part-recoupee.svg: font: var(--font-ui) becomes the generic system-ui, sans-serif; the .soft and .small classes were unused and are dropped (M11)

## Checks

`mise exec -- /Users/sve/code/workspaces/perso/feyn/specs/linear-course/checks/check-course /Users/sve/code/workspaces/perso/feyn/.claude/worktrees/agent-aa88e67174098d833/migrate-work/parcours-po --only course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography --concept 9 --lang-dir /Users/sve/code/workspaces/perso/feyn/.claude/worktrees/agent-aa88e67174098d833/specs/linear-course/checks/fixtures/lang`

```
course-yaml: ok
concept-folder: ok
conventions: ok
svg-contract: ok
sources: ok
glossary-order: ok
typography: ok
```
