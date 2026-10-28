# Migration report: concept 9

Workflow `migrate-concept`, course `parcours-po`, concept folder `concepts/09-decoupage-vertical/`. Paths in the course folder are relative to it; the old files are named from their repository folder (`parcours-po`, `parcours-po-website`).
Old files: `parcours-po/course/concepts/09-decoupage-vertical.md` (CF), `parcours-po/course/sources/09-decoupage-vertical.md` (SF), `parcours-po-website/src/content/concepts/fr/09-decoupage-vertical.mdx` (MDX), `parcours-po-website/src/components/schemas/Gateau.astro`, `parcours-po-website/src/components/schemas/PartRecoupee.astro` (ASTRO).

## Summary

| kept | moved | by design | lost | invented | refuted | checks | target existed | accepted |
|---|---|---|---|---|---|---|---|---|
| 41 | 46 | 8 | 0 | 0 | 0 | pass | no | no |

Result: **passed**. lost and invented count the rows confirmed by the verification; the rows it refuted (refuted) are listed at the end and count in no other column. checks is read in code from the output below, which the check agent returns; target existed is read in code from the listing below, which the scope agent returns.

## Target before the run

`ls -ld concepts/09-decoupage-vertical; ls -la concepts/09-decoupage-vertical`, as the scope agent returned it: no such folder.

```
ls: concepts/09-decoupage-vertical: No such file or directory
ls: concepts/09-decoupage-vertical: No such file or directory
```

## CF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter (concept: 9, titre) | course.yaml (number "9", title) | by design | M12 | M12: the H1s and frontmatters of M1; course.yaml holds number and title |
| H1 « Découpage en tranches verticales » | course.yaml title | by design | M12 | M12: the H1s of M1 (no H1 in the three files) |
| « Objectif » | course.yaml objective; concept.md « Objectif » | moved | M1 | Moved to course.yaml, where S1-08 kept CF's wording (objective merge: 9 merged); concept.md « Objectif » is that objective verbatim, capital first letter, final period. No clause lost. |
| « L'essentiel » | concept.md « L'essentiel » | moved | M4 | Merged with the MDX text before the first <Sous> (MDX wording as base); the CF-only clause « de haut en bas » carried at its place (« traverse toutes les couches, de haut en bas, en tranche fine »). Every other CF claim is in the MDX wording. |
| « Consensus et choix d'école » | frontmatter stances.consensus, stances.school, stances.course, neighbors | moved | M3 | Not written as a section; each claim matched to a frontmatter item: Scrum Guide claim to consensus[0], pratique établie to consensus[1], catalogues (SPIDR cinq techniques, neuf patrons de Lawrence 2009 avec Peter Green, Twenty Ways 2005, recoupement) to school items, walking skeleton to neighbors, Choix du cours to course items. |
| « Consensus et choix d'école » / Consensus, pratique établie: « sous le V d'INVEST, concept 7 » | frontmatter stances.consensus[1].text | moved | M3 | CF-only reference « concept 7 » carried into the matching item: « sous le V d'INVEST, concept 7) » |
| « Consensus et choix d'école » / Choix du cours: « concept 3b », « concept 17b1 » | frontmatter stances.course[4].text | moved | M3 | CF's precise references win over MDX « concept 3 » and « concept 17 »: « (concept 3b) et une exploration bornée (concept 17b1) » |
| « Choix du cours » teacher hint « (sans source externe, à présenter comme tels) » | none (protocol rule stances-told-apart) | by design | M3 | M3: CF's teacher hint on the course's choices is carried by the protocol rule stances-told-apart |
| « Sous-concepts » | teaching.md « Consignes » | moved | M9 | Renamed « Consignes », text verbatim. Every bank case is cited by its title, so no citation line (none written). |
| « Banque d'exemples » lead paragraph (« Faits du fil rouge utilisés : … ») | teaching.md « Faits du fil rouge utilisés » | moved | M9 | Became its own section, lead words « Faits du fil rouge utilisés : » dropped; rest verbatim |
| « Banque d'exemples » (six cases, all fields) | teaching.md « Banque d'exemples » | kept | M9 | Same ### headings, every field verbatim (checked line by line) |
| « Pièges » | concept.md « Pièges » | moved | M7 | Merged with MDX <Erreurs> in MDX order and sentences; CF precisions kept: « Un walking skeleton (Cockburn) », « (concept 4) » on Appliquer le vertical aux tâches, « (concepts 5 et 7b) » plus the CF-only sentence « Une story qui ne nomme pas l'écran livre quand même quelque chose de visible. », « (concept 8a2) » where MDX had concept 8. Nothing lost. |
| « Le test rapide » | concept.md « Le test rapide » | moved | M8 | CF question as one blockquote, followed by the <Reflexe> note paragraph |
| « Schéma » | teaching.md « Schéma » | kept | M9 | Verbatim |

## SF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter (concept: 9) | none | by design | M12 | M10/M12: SF frontmatter dropped (M1) |
| H1 « Sources : Découpage en tranches verticales » | none | by design | M12 | M10/M12: SF H1 dropped (M1) |
| intro paragraph | sources.md intro | kept | M10 | Verbatim; no old path, no pointer to drop |
| « Affirmations » | sources.md « Affirmations » | kept | M10 | Same 39 rows, same order, texts unchanged; rows not listed below are kept with only the Nature column added (kinds checked against the MDX affirmations, or the ecoles stance when no item states the claim: Defer Performance row école via the Lawrence/catalogues school items) |
| « Affirmations » header | sources.md « Affirmations » header | moved | M10 | « Affirmation (section du fichier du concept) \| Source \| Ce qui a été vérifié » became « Affirmation (section de `concept.md` ou de `teaching.md`) \| Source \| Ce qui a été vérifié \| Nature » |
| row « Le Scrum Guide ne parle ni de tranche verticale… » | sources.md « Affirmations » row 1 | moved | M10 | old path: « `course/sources/04-hierarchie.md`, `course/sources/07-invest.md` » became « `concepts/04-hierarchie/sources.md`, `concepts/07-invest/sources.md` » |
| row « Découper un élément en éléments plus petits fait partie du refinement… » | sources.md « Affirmations » row 2 | moved | M10 | old path: « `course/sources/04-hierarchie.md` » became « `concepts/04-hierarchie/sources.md` » |
| row « L'incrément doit être utilisable » | sources.md « Affirmations » row 3 | moved | M10 | old path: « `course/sources/00-scrum.md` » became « `concepts/00-scrum/sources.md` » |
| row « Que chaque story soit une tranche verticale… » | sources.md « Affirmations » row 4 | moved | M10 | old path: « `course/sources/03-backlog-produit.md`, `course/sources/17-hypotheses-exploration.md` » became « `concepts/03-backlog-produit/sources.md`, `concepts/17-hypotheses-exploration/sources.md` » |
| row « « Tranche » est une façon de découper, pas un niveau… » | sources.md « Affirmations » row 10 | moved | M10 | section name « (Sous-concepts 9a1 et 9a2, … » became « (Consignes 9a1 et 9a2, … »; old path « `course/sources/04-hierarchie.md` » became « `concepts/04-hierarchie/sources.md` » |
| row « Le vertical s'arrête à la story… » | sources.md « Affirmations » row 11 | moved | M10 | old path: « `course/sources/04-hierarchie.md` » became « `concepts/04-hierarchie/sources.md` » |
| row « Le PO juge la story sur ses critères… » | sources.md « Affirmations » row 12 | moved | M10 | old path: « `course/sources/08-criteres-regles.md` » became « `concepts/08-criteres-regles/sources.md` » |
| row « SPIDR, P et I… » | sources.md « Affirmations » row 17 | moved | M10 | orphan [S5b] added: source « [S5] » became « [S5], [S5b] »; [S5b] is cited in no old source cell and the verification column names it as support: « l'affiche [S5b] ajoute « Consider building a minimal user interface first » » |
| row « SPIDR, S (Spike)… » | sources.md « Affirmations » row 18 | moved | M10 | old path: « `course/sources/07-invest.md` » became « `concepts/07-invest/sources.md` » |
| row « Une story qui ne nomme pas l'écran… » | sources.md « Affirmations » row 29 | moved | M10 | old paths: « `course/sources/05-user-story.md`, `course/sources/07-invest.md`, `course/sources/01-produit-et-po.md` » became « `concepts/05-user-story/sources.md`, `concepts/07-invest/sources.md`, `concepts/01-produit-et-po/sources.md` » |
| row « Un mot flou dans la tranche… » | sources.md « Affirmations » row 30 | moved | M10 | old paths: « `course/sources/08-criteres-regles.md`, `course/sources/07-invest.md` » became « `concepts/08-criteres-regles/sources.md`, `concepts/07-invest/sources.md` » |
| row « Le spike livre une réponse… » | sources.md « Affirmations » row 35 | moved | M10 | old path: « `course/sources/07-invest.md` » became « `concepts/07-invest/sources.md` » |
| row « Les Developers estiment la taille d'un élément… » | sources.md « Affirmations » row 36 | moved | M10 | old paths: « `course/sources/04-hierarchie.md`, `course/sources/07-invest.md` » became « `concepts/04-hierarchie/sources.md`, `concepts/07-invest/sources.md` » |
| row « Les tâches se découpent au Sprint Planning… » | sources.md « Affirmations » row 37 | moved | M10 | old path: « `course/sources/04-hierarchie.md` » became « `concepts/04-hierarchie/sources.md` » |
| row « Une tranche qui traverse toutes les couches sans servir seule… » | sources.md « Affirmations » row 28 | kept | M10 | Nature « cours », from the MDX item « Traverser les couches ne suffit pas : la tranche doit servir seule. » (kind cours) |
| « Références » | sources.md « Références » | kept | M10 | Same rows, unchanged; no old path |
| « Non vérifié » | sources.md « Non vérifié » | kept | M10 | Same items, unchanged; no old path or pointer to drop |

## MDX: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter numero | course.yaml number | moved | M1 | Carried out of the folder to course.yaml |
| frontmatter titre | course.yaml title | moved | M1 | Carried out of the folder to course.yaml (same title) |
| frontmatter objectif | course.yaml objective | moved | M1 | Merged into the CF wording by S1-08 (9: merged); its clauses (tranches qui traversent les couches du produit, servent seules à l'utilisateur) are all in the objective |
| frontmatter prerequis | course.yaml prerequisites [8] | moved | M1 | Carried out of the folder to course.yaml |
| frontmatter description | concept.md frontmatter description | kept | M2 |  |
| frontmatter ecoles (consensus, ecole, cours, voisines) | concept.md frontmatter stances.consensus, stances.school, stances.course, neighbors | kept | M3 | Keys renamed as M3 gives (auteur/texte/refs to author/text/refs, voisines to neighbors); texts and refs unchanged except the two items below |
| ecoles.consensus[1] « Pratique établie, hors du Scrum Guide » | frontmatter stances.consensus[1] | moved | M3 | CF-only « concept 7 » added: « sous le V d'INVEST, concept 7) »; refs unchanged [S2, S3, S4] |
| ecoles.cours[4] « Chaque story est une tranche verticale… » | frontmatter stances.course[4] | moved | M3 | CF's precise references win: « (concept 3) » became « (concept 3b) », « (concept 17) » became « (concept 17b1) »; refs unchanged [S1] |
| frontmatter sources (affirmations, references, nonVerifie) | sources.md « Affirmations » Nature column (kinds only) | by design | M12 | M10/M12: the MDX sources texts, by design; only their kind is used, in the Nature column |
| frontmatter alignement | none | by design | M12 | M12: MDX alignement |
| import lines (Gateau, PartRecoupee) | none | by design | M12 | M6/M12: import lines, nothing |
| text before the first <Sous> | concept.md « L'essentiel » | moved | M4 | Base wording of « L'essentiel », merged with CF (« de haut en bas » added) |
| <Figure> with <Gateau /> | concept.md « L'essentiel », after the paragraph: ![…](gateau.svg) | moved | M6 | Converted to one image, alone in its paragraph, at the same place |
| <Sous id="9a"> with promesse | concept.md « 9a La tranche verticale » | moved | M5 | Converted to « ## 9a La tranche verticale » and the promise in italics; title equals course.yaml |
| <h4 id="9a1"> and its text | concept.md « 9a1 La tranche qui sert seule » | moved | M5 | Heading converted; three paragraphs verbatim; <Pastille kind="cours"/> became « [cours] » |
| <h4 id="9a2"> and its text | concept.md « 9a2 Où s'arrête le vertical » | moved | M5 | Heading converted; text verbatim; <Renvoi n="4"/> « concept 4 », <Renvoi n="15"/> « concept 15 », <Pastille kind="cours"/> « [cours] » |
| <Sous id="9b"> with promesse | concept.md « 9b Les patrons de découpage » | moved | M5 | Converted to « ## 9b Les patrons de découpage » and the promise in italics |
| <h4 id="9b1"> and its text | concept.md « 9b1 Couche ou tranche » | moved | M5 | Heading converted; text verbatim; <Renvoi n="4"/> « concept 4 », <Renvoi n="17"/> « concept 17 » |
| <FilRouge> (9b1) | concept.md « 9b1 Couche ou tranche » | moved | M6 | Converted to a blockquote starting « **Fil rouge :** », text verbatim |
| <Figure> with <PartRecoupee /> | concept.md « 9b1 Couche ou tranche », after the Fil rouge blockquote: ![…](part-recoupee.svg) | moved | M6 | Converted to one image, alone in its paragraph, at the same place |
| <h4 id="9b2"> and its text | concept.md « 9b2 Les patrons et leur catalogue » | moved | M5 | Heading converted; text and list verbatim; <Pastille kind="ecole"/> « [école] », <Pastille kind="cours"/> « [cours] », <Renvoi n="17"/> « concept 17 » |
| <Reflexe note> | concept.md « Le test rapide » | moved | M8 | Question as a blockquote, note « Formulation du cours, cohérente avec la valeur pour l'utilisateur que demandent Wake et Lawrence. » as the following paragraph |
| <Erreurs> | concept.md « Pièges » | moved | M7 | Converted to « Pièges », MDX order and sentences, merged with CF precisions; renvois converted (« concepts 5 et 7b », CF « concept 8a2 » over « concept 8 »); typographic apostrophes of « Légender une part » made straight (form) |

## ASTRO: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| E1 « Ingestion » | gateau.svg, group 9a1-gateau-ingestion | kept | M11 | Bottom layer (y 210), label « Ingestion » verbatim, muted rendering (context). |
| E2 « Transformation » | gateau.svg, group 9a1-gateau-transformation | kept | M11 | Second layer from the bottom, label « Transformation » verbatim, muted rendering (context). |
| E3 « Données prêtes » | gateau.svg, group 9a1-gateau-donnees-pretes | kept | M11 | Third layer, label « Données prêtes » verbatim, muted rendering (context). |
| E4 « Restitution » | gateau.svg, group 9a1-gateau-restitution | kept | M11 | Top layer (y 60), label « Restitution » verbatim, muted rendering (context). |
| E5 « couche entière » | gateau.svg, group 9a1-couche-entiere | kept | M11 | A shaded band laid exactly over the transformation layer with a bracket and the label « couche entière » verbatim; contrast told apart from the subject by opacity and form (filled, no stroke, against the subject's thick stroke). No state in the inventory; none drawn. |
| E6 « tranche 1 » | gateau.svg, group 9a1-part-1 | kept | M11 | Vertical part spanning the four layers, label « tranche 1 » verbatim in primary, subject rendering (thick stroke). |
| E7 « tranche 2 » | gateau.svg, group 9a1-part-2 | kept | M11 | Vertical part spanning the four layers, label « tranche 2 » verbatim in primary, subject rendering. |
| E8 « tranche 3 » | gateau.svg, group 9a1-part-3 | kept | M11 | Vertical part spanning the four layers, label « tranche 3 » verbatim in primary, subject rendering. |
| Relation: E1 to E4 stacked, ingestion at the bottom, restitution at the top | gateau.svg, groups 9a1-gateau-ingestion, 9a1-gateau-transformation, 9a1-gateau-donnees-pretes, 9a1-gateau-restitution | kept | M11 | The four bands are stacked in the order Ingestion (bottom), Transformation, Données prêtes, Restitution (top). |
| Relation: E5 is the layer E2 taken whole | gateau.svg, group 9a1-couche-entiere | kept | M11 | The shaded band has the same position and full width as the transformation band (x 160, y 160, width 310). |
| Relation: E6, E7, E8 each cross all four layers, top to bottom | gateau.svg, groups 9a1-part-1, 9a1-part-2, 9a1-part-3 | kept | M11 | Each part runs from y 54 to y 266, over the whole stack (y 60 to y 260). |
| Relation: E6, E7, E8 set against E5 (serves alone vs does not serve alone) | gateau.svg, groups 9a1-couche-entiere, 9a1-part-1 to 9a1-part-3, 9a1-cle-gateau | kept | M11 | Both forms are drawn together and the key opposes them: « tranche horizontale : ne sert pas seule » against « tranche verticale : un peu de chaque couche, sert seule ». |
| Relation: E6, E7, E8 side by side, named in order tranche 1, 2, 3 | gateau.svg, groups 9a1-part-1, 9a1-part-2, 9a1-part-3 | kept | M11 | Three parts at x 190, 290, 390, labelled tranche 1, tranche 2, tranche 3 from left to right. |
| Legende sentence « Le gâteau en couches. » | concept.md frontmatter title of gateau.svg, and the SVG <title> | moved | M11 | To the title, as the inventory sends it: the title « Le gâteau en couches : une tranche horizontale contre trois tranches verticales » carries it. |
| Legende sentence « En bas, l'ingestion des données ; en haut, la restitution, ce que voit l'utilisateur. » | gateau.svg, groups 9a1-gateau-ingestion (bottom) and 9a1-gateau-restitution (top) | moved | M11 | To the labels, as the inventory sends it: « Ingestion » labels the bottom band and « Restitution » the top band. The appositions « des données » and « ce que voit l'utilisateur » are not drawn (the inventory's labels do not carry them either: E4's label is « Restitution »). |
| Legende sentence « Une couche prise en entier (grisée) ne sert pas seule ; chaque part verticale traverse toutes les couches et sert seule. » | concept.md frontmatter caption of gateau.svg | kept | M11 | The caption holds it verbatim. |
| key « tranche horizontale : ne sert pas seule » of gateau.svg | gateau.svg | kept | M11 | Group 9a1-cle-gateau; sample is the shaded rect of the contrast (E5's rendering); words are the inventory's key entry for E5, verbatim. |
| key « tranche verticale : un peu de chaque couche, sert seule » of gateau.svg | gateau.svg | kept | M11 | Group 9a1-cle-gateau; sample is the thick-stroked rect of the subject (E6's rendering); words are the inventory's key entry for E6, verbatim. |
| E1 « Une vue des vélos en panne : trop gros pour un sprint » (la part d'origine, context) | part-recoupee.svg, group 9b1-part-trop-grosse | kept | M11 | Label verbatim; drawn as a muted part (context), above the three pieces. |
| E2 « a. les stations du centre-ville seulement » (morceau a, subject) | part-recoupee.svg, group 9b1-morceau-a | kept | M11 | Label verbatim (split over two tspans); class primary, opacity 1: subject carried. |
| E3 « c. les vélos signalés, confirmés ou non » (morceau c, subject) | part-recoupee.svg, group 9b1-morceau-c | kept | M11 | Label verbatim (split over two tspans); class primary: subject carried. |
| E4 « b. la table des signalements » (morceau b, contrast) | part-recoupee.svg, group 9b1-morceau-b | kept | M11 | Label verbatim, as muted text; the band is secondary at fill-opacity 0.45, so it differs from the subject by opacity: contrast carried. |
| E5 the four layers of the data product (no label, context) | part-recoupee.svg, group 9b1-quatre-couches | kept | M11 | Four muted layers, low fill opacity, at each of the three piece positions: context carried; no label in the inventory, none drawn. |
| E6 « D de SPIDR (Cohn) », « ou Variations in Data (Lawrence) » (context) | part-recoupee.svg, group 9b2-patron-du-morceau-a | kept | M11 | Both labels verbatim (the second split over two tspans); muted: context carried. |
| E7 « R de SPIDR (Cohn) », « assouplir d'abord une règle » (context) | part-recoupee.svg, group 9b2-patron-du-morceau-c | kept | M11 | Both labels verbatim (straight apostrophe, split over two tspans); muted: context carried. |
| E8 « une couche », « pas une tranche : pas de patron » (text) | part-recoupee.svg, group 9b1-sans-patron | kept | M11 | Both labels verbatim (the second split over two tspans); muted at opacity 1: text carried. |
| Relation: E1 is recut into three pieces, E2 (a), E3 (c) and E4 (b) | part-recoupee.svg, group 9b1-recoupe-en-trois | kept | M11 | Three arrows go from the too-big part to the three pieces. |
| Relation: E2 crosses all four layers of E5 | part-recoupee.svg, groups 9b1-morceau-a over 9b1-quatre-couches | kept | M11 | Four primary cells of a lie over the four layers, top to bottom. |
| Relation: E3 crosses all four layers of E5 | part-recoupee.svg, groups 9b1-morceau-c over 9b1-quatre-couches | kept | M11 | Four primary cells of c lie over the four layers, top to bottom. |
| Relation: E4 is only the données prêtes layer of E5, the other layers empty | part-recoupee.svg, groups 9b1-morceau-b over 9b1-quatre-couches | kept | M11 | Only the second layer from the top is filled: with restitution on top (concept text: « l'ingestion en bas, la restitution en haut »), that is the données prêtes layer. The other three layers are left empty. As in the old diagram, no label names the layer. |
| Relation: E6 stands under E2 | part-recoupee.svg, group 9b2-patron-du-morceau-a under 9b1-morceau-a | kept | M11 | Pattern labels sit directly under piece a. |
| Relation: E7 stands under E3 | part-recoupee.svg, group 9b2-patron-du-morceau-c under 9b1-morceau-c | kept | M11 | Pattern labels sit directly under piece c. |
| Relation: E8 stands under E4 | part-recoupee.svg, group 9b1-sans-patron under 9b1-morceau-b | kept | M11 | The no-pattern note sits directly under piece b. |
| Legende « Une part trop grosse, recoupée. » (to title) | concept.md frontmatter title of part-recoupee.svg, and the SVG <title> | moved | M11 | The title is « Une part trop grosse, recoupée »: the sentence without its final period. |
| Legende « Les morceaux a et c sont des parts verticales ; b est une lamelle horizontale : la couche des données prêtes, seule (morceaux inventés pour l'illustration). » (to caption) | concept.md frontmatter caption of part-recoupee.svg | kept | M11 | The caption holds it verbatim. |
| Legende « Sous chaque morceau, le patron de découpage et son catalogue. » (to labels) | part-recoupee.svg, groups 9b2-patron-du-morceau-a, 9b2-patron-du-morceau-c, 9b1-sans-patron | moved | M11 | The labels under each piece name its pattern and catalogue (D de SPIDR (Cohn) / Variations in Data (Lawrence); R de SPIDR (Cohn)) or say there is none (pas de patron). |

## Lost

None.

## Invented

None.

## Refuted by the verification

None.

## Diagrams (M11)

Each old diagram was inventoried (what it shows, by idea), drawn anew from its inventory and concept.md alone under SPEC.md 7.2, and compared on information (the ASTRO rows above). Renderings: the old diagram from the frozen site's build, the new one in one colour.

### `parcours-po-website/src/components/schemas/Gateau.astro`

Figure legende, in « L'essentiel »: « Le gâteau en couches. En bas, l'ingestion des données ; en haut, la restitution, ce que voit l'utilisateur. Une couche prise en entier (grisée) ne sert pas seule ; chaque part verticale traverse toutes les couches et sert seule. »

One idea.

Its sentences, where the inventory sends them (M11):
- « Le gâteau en couches. »: title of gateau.svg
- « En bas, l'ingestion des données ; en haut, la restitution, ce que voit l'utilisateur. »: labels of gateau.svg
- « Une couche prise en entier (grisée) ne sert pas seule ; chaque part verticale traverse toutes les couches et sert seule. »: caption of gateau.svg

#### gateau.svg

- Title: Le gâteau en couches : une tranche horizontale contre trois tranches verticales
- Caption: Une couche prise en entier (grisée) ne sert pas seule ; chaque part verticale traverse toutes les couches et sert seule.
- Sub-concept: 9a
- Idea: « Une couche prise en entier (grisée) ne sert pas seule ; chaque part verticale traverse toutes les couches et sert seule. » (legende)

| Id | Element | Labels | Role | State |
|---|---|---|---|---|
| E1 | l'ingestion, la couche du bas d'un produit data : l'ingestion des données (relevés des stations) | « Ingestion » | context | none |
| E2 | la transformation, une couche du produit data | « Transformation » | context | none |
| E3 | les données prêtes, une couche du produit data | « Données prêtes » | context | none |
| E4 | la restitution, la couche du haut : ce que voit l'utilisateur | « Restitution » | context | none |
| E5 | une tranche horizontale : une couche prise en entier, ici la transformation ; tant que les autres manquent, elle ne sert pas seule à l'utilisateur | « couche entière » | contrast | none |
| E6 | une tranche verticale, une part de gâteau : un peu de chaque couche, elle sert seule | « tranche 1 » | subject | none |
| E7 | une tranche verticale, une part de gâteau : un peu de chaque couche, elle sert seule | « tranche 2 » | subject | none |
| E8 | une tranche verticale, une part de gâteau : un peu de chaque couche, elle sert seule | « tranche 3 » | subject | none |

Relations:
- E1 to E4 are the four layers of the product, stacked in this order, from E1 l'ingestion en bas to E4 la restitution en haut (« En bas, l'ingestion des données ; en haut, la restitution, ce que voit l'utilisateur »)
- E5 is the layer E2 taken whole: one layer only, and all of it
- E6, E7 and E8 each cross all four layers E1 to E4, de haut en bas, taking a bit of each layer
- E6, E7 and E8 are set against E5: each vertical slice serves alone, the whole layer E5 does not serve alone
- E6, E7 and E8 are three slices side by side, named in order tranche 1, tranche 2, tranche 3

Key of the inventory: E5 « tranche horizontale : ne sert pas seule »; E6 « tranche verticale : un peu de chaque couche, sert seule ». Key drawn: « tranche horizontale : ne sert pas seule »; « tranche verticale : un peu de chaque couche, sert seule ».

| Old | New |
|---|---|
| ![old diagram 1](181-concept-9-report/old-1.png) | ![gateau.svg](181-concept-9-report/gateau.png) |

### `parcours-po-website/src/components/schemas/PartRecoupee.astro`

Figure legende, in the section 9b1: « Une part trop grosse, recoupée. Les morceaux a et c sont des parts verticales ; b est une lamelle horizontale : la couche des données prêtes, seule (morceaux inventés pour l'illustration). Sous chaque morceau, le patron de découpage et son catalogue. »

One idea.

Its sentences, where the inventory sends them (M11):
- « Une part trop grosse, recoupée. »: title of part-recoupee.svg
- « Les morceaux a et c sont des parts verticales ; b est une lamelle horizontale : la couche des données prêtes, seule (morceaux inventés pour l'illustration). »: caption of part-recoupee.svg
- « Sous chaque morceau, le patron de découpage et son catalogue. »: labels of part-recoupee.svg

#### part-recoupee.svg

- Title: Une part trop grosse, recoupée
- Caption: Les morceaux a et c sont des parts verticales ; b est une lamelle horizontale : la couche des données prêtes, seule (morceaux inventés pour l'illustration).
- Sub-concept: 9b1
- Idea: « Les morceaux a et c sont des parts verticales ; b est une lamelle horizontale : la couche des données prêtes, seule (morceaux inventés pour l'illustration). » (legende)

| Id | Element | Labels | Role | State |
|---|---|---|---|---|
| E1 | la part d'origine, le besoin d'Étienne : une vue des vélos en panne, que les Developers jugent trop grosse pour un sprint (un epic, qui se découpe) | « Une vue des vélos en panne : trop gros pour un sprint » | context | none |
| E2 | le morceau a, les stations du centre-ville seulement : une part verticale, qui traverse les quatre couches et livre à Étienne une vue qu'il peut consulter | « a. les stations du centre-ville seulement » | subject | none |
| E3 | le morceau c, les vélos signalés, confirmés ou non par un technicien : une part verticale, qui traverse les quatre couches et livre à Étienne une vue qu'il peut consulter | « c. les vélos signalés, confirmés ou non » | subject | none |
| E4 | le morceau b, une table des signalements prête, sans vue : une lamelle horizontale, la couche des données prêtes seule, les autres couches restant vides ; rien pour Étienne tant qu'elle n'est pas raccrochée à un usage | « b. la table des signalements » | contrast | none |
| E5 | les quatre couches du produit data (ingestion, transformation, données prêtes, restitution), que chaque part verticale traverse et dont b ne garde que celle des données prêtes | none | context | none |
| E6 | sous le morceau a, son patron de découpage et son catalogue : le morceau a restreint les données, c'est le D de SPIDR (Mike Cohn), ou Variations in Data chez Richard Lawrence, même idée sous deux noms | « D de SPIDR (Cohn) », « ou Variations in Data (Lawrence) » | context | none |
| E7 | sous le morceau c, son patron de découpage et son catalogue : le morceau c assouplit d'abord une règle (ne pas distinguer encore les pannes confirmées), c'est le R de SPIDR (Mike Cohn) | « R de SPIDR (Cohn) », « assouplir d'abord une règle » | context | none |
| E8 | sous le morceau b, la note qui dit pourquoi il n'a pas de patron : b est une couche, pas une tranche | « une couche », « pas une tranche : pas de patron » | text | none |

Relations:
- E1 is recut into three pieces: E2 (a), E3 (c) and E4 (b), from the too-big part to its pieces
- E2 crosses all four layers of E5, from ingestion to restitution
- E3 crosses all four layers of E5, from ingestion to restitution
- E4 is only the données prêtes layer of E5, the other layers of E5 left empty: a layer, set against E2 and E3
- E6 stands under E2: the splitting pattern of a and its catalogues
- E7 stands under E3: the splitting pattern of c and its catalogue
- E8 stands under E4: b has no pattern

Key of the inventory: none. Key drawn: none.

| Old | New |
|---|---|
| ![old diagram 2](181-concept-9-report/old-2.png) | ![part-recoupee.svg](181-concept-9-report/part-recoupee.png) |

Renderings in `181-concept-9-report/`, beside this report.

## Writing choices

- M9 citation line: none written. The old « Sous-concepts » already cites all six cases of the bank by title. The first case's heading is « Redécouper « quelles stations vont se vider ? » » and « Consignes » cites it as « Redécouper “quelles stations vont se vider ?” ». SPEC 4.3 counts « » and “ ” as the same quotes, so that case is cited too.
- M9 « Consignes »: the old « Sous-concepts » is copied word for word under the heading « Consignes »; nothing is added.
- M9 « Faits du fil rouge utilisés »: built from the lead paragraph of the old « Banque d'exemples » with its lead words « Faits du fil rouge utilisés : » removed. Old start: « Faits du fil rouge utilisés : Régis, régulateur, ... ». New start: « Régis, régulateur, ... ». The whole paragraph moves, including « Ne sont pas fixés ... » and « Les découpages proposés par l'équipe ... ne deviennent pas des faits du fil rouge. », because it is a single lead paragraph about the facts and what is left unfixed. No other lead text stays in the bank.
- M9 bank and Schéma: the six cases are copied with the same ### headings and every field word for word; their field order already matches SPEC 4.3. The old « Schéma » section is copied word for word.
- M10 orphan: [S5b] was cited in no source cell. Only one row names it as support: « SPIDR, P et I ... », whose verification says « l'affiche [S5b] ajoute ... ». Source cell changed from « [S5] » to « [S5], [S5b] ». Counted moved; detail: orphan [S5b] added.
- M10 section name: in the row « « Tranche » est une façon de découper ... », « (Sous-concepts 9a1 et 9a2, Banque 9a1 et 9a2, Pièges) » becomes « (Consignes 9a1 et 9a2, Banque 9a1 et 9a2, Pièges) ».
- M10 header: « Affirmation (section du fichier du concept) | Source | Ce qui a été vérifié » becomes « Affirmation (section de `concept.md` ou de `teaching.md`) | Source | Ce qui a été vérifié | Nature ».
- M10 old path, row « Le Scrum Guide ne parle ni de tranche verticale ... »: `course/sources/04-hierarchie.md`, `course/sources/07-invest.md` become `concepts/04-hierarchie/sources.md`, `concepts/07-invest/sources.md`
- M10 old path, row « Découper un élément en éléments plus petits fait partie du refinement »: `course/sources/04-hierarchie.md` becomes `concepts/04-hierarchie/sources.md`
- M10 old path, row « L'incrément doit être utilisable »: `course/sources/00-scrum.md` becomes `concepts/00-scrum/sources.md`
- M10 old path, row « Que chaque story soit une tranche verticale ... »: `course/sources/03-backlog-produit.md`, `course/sources/17-hypotheses-exploration.md` become `concepts/03-backlog-produit/sources.md`, `concepts/17-hypotheses-exploration/sources.md`
- M10 old path, row « « Tranche » est une façon de découper ... »: `course/sources/04-hierarchie.md` becomes `concepts/04-hierarchie/sources.md`
- M10 old path, row « Le vertical s'arrête à la story ... »: `course/sources/04-hierarchie.md` becomes `concepts/04-hierarchie/sources.md`
- M10 old path, row « Le PO juge la story sur ses critères ... »: `course/sources/08-criteres-regles.md` becomes `concepts/08-criteres-regles/sources.md`
- M10 old path, row « SPIDR, S (Spike) ... »: `course/sources/07-invest.md` becomes `concepts/07-invest/sources.md`
- M10 old path, row « Une story qui ne nomme pas l'écran ... »: `course/sources/05-user-story.md`, `course/sources/07-invest.md`, `course/sources/01-produit-et-po.md` become `concepts/05-user-story/sources.md`, `concepts/07-invest/sources.md`, `concepts/01-produit-et-po/sources.md`
- M10 old path, row « Un mot flou dans la tranche ... »: `course/sources/08-criteres-regles.md`, `course/sources/07-invest.md` become `concepts/08-criteres-regles/sources.md`, `concepts/07-invest/sources.md`
- M10 old path, row « Le spike livre une réponse ... »: `course/sources/07-invest.md` becomes `concepts/07-invest/sources.md`
- M10 old path, row « Les Developers estiment la taille d'un élément ... »: `course/sources/04-hierarchie.md`, `course/sources/07-invest.md` become `concepts/04-hierarchie/sources.md`, `concepts/07-invest/sources.md`
- M10 old path, row « Les tâches se découpent au Sprint Planning ... »: `course/sources/04-hierarchie.md` becomes `concepts/04-hierarchie/sources.md`
- M10 dropped pointers: none. The intro and « Non vérifié » point to no old decision, off-course.md, git history or task id. « le fichier du concept » is prose, not a path, and is kept.
- M10 Nature taken from the kind of the MDX affirmation stating the same claim: consensus for the four rows on the Scrum Guide (tranche/couche/story), refinement, the usable increment, and splitting by value. cours for: every story being a vertical slice; crossing the layers is not enough; 'au niveau du sprint, une tranche est une story' (MDX « Le principe vaut à plusieurs niveaux ... »); the quick test; the four layers; the 9b diagram's linking of pieces to patterns. école for: the catalogues; SPIDR; D; R; P et I; S (Spike); Lawrence's nine patterns; Humanizing Work (the same MDX item as Lawrence's nine patterns); Simple/Complex; Variations in Data; Business Rule Variations; choosing a split you can defer; Wake's Twenty Ways.
- M10 Nature left empty because the matching MDX affirmation has no kind: the cake metaphor at Wake; the origin of the words; a layer alone does not serve; the vertical stops at the story; the PO judges on criteria; the walking skeleton; the storyline examples; Developers size and a story too big for a sprint is split.
- M10 Nature, row « Lawrence, Defer Performance »: no MDX affirmation states it. It is matched to the ecoles.ecole item « Richard Lawrence : neuf patrons (2009) », since Defer Performance is one of those nine patterns: école.
- M10 Nature, row « Les patrons SPIDR et Lawrence se recoupent ... sans se confondre »: no MDX affirmation states it as a whole. It is matched to the ecoles.ecole item « Entre les catalogues »: école.
- M10 Nature, row « Une tranche qui traverse toutes les couches sans servir seule (compteur) ... »: taken as the example form of the MDX affirmation « Traverser les couches ne suffit pas : la tranche doit servir seule. » (kind cours), which has the same Pièges section: cours. The alternative was empty, through the walking skeleton neighbour, which carries no stance.
- M10 Nature left empty for the rows with no MDX affirmation and no consensus/ecole/cours ecoles item they match: the story that names no screen (form left to the Developers); the vague word as an unfixed rule; the spike delivers an answer, not a function; tasks split at Sprint Planning; the walking skeleton dated « années 1990 » (its only match is the neighbours item, which is not a stance).
- M13: neither old file has an em-dash, arrow or typographic apostrophe, so nothing is replaced. The en-dash in « © 2000–2026 » (reference S4) is not a banned character and is kept.
- M3: the consensus item 'Pratique établie, hors du Scrum Guide' gets CF's concept reference: MDX 'sous le V d'INVEST)' becomes 'sous le V d'INVEST, concept 7)'.
- M3: in the course item 'Chaque story est une tranche verticale', CF's more precise references win: MDX '(concept 3)' becomes '(concept 3b)' and '(concept 17)' becomes '(concept 17b1)'.
- M3: no other CF claim is carried, because MDX items already state them all. This covers consensus Scrum Guide, the school catalogues and their overlap, the four layers, 'sert seule', the test, and the walking skeleton neighbour. CF's 'Choix d'école' framing ('chacun avec son auteur') is matched to the per-author school items.
- M3: the CF teacher hint '(sans source externe, à présenter comme tels)' is not written, by design (protocol rule stances-told-apart).
- M3: item keys are written in the template order text, author, refs (MDX order is auteur, texte, refs). Course items have no author key because MDX gives none.
- M4: one CF-only phrase is added to « L'essentiel » where CF places it: 'traverse toutes les couches, en tranche fine' becomes 'traverse toutes les couches, de haut en bas, en tranche fine'. Every other CF clause is already in the MDX wording.
- M6: '(<Renvoi n="5" />, <Renvoi n="7b" />)' (consecutive renvois in one parenthesis) becomes '(concepts 5 et 7b)'.
- M6: Pastilles become '[cours]' (9a1, 9a2 and 9b2) and '[école]' (9b2), each where its pastille stood, before the following comma or period.
- M7: the pitfall 'Croire que traverser les couches suffit' takes the author CF names: 'Un walking skeleton sert l'équipe' becomes 'Un walking skeleton (Cockburn) sert l'équipe'. MDX's article 'Un' is kept.
- M7: the pitfall 'Appliquer le vertical aux tâches' takes CF's reference: '...appartiennent aux Developers.' becomes '...appartiennent aux Developers (concept 4).'
- M7: the pitfall 'Nommer la forme dans la tranche' takes the CF sentence MDX lacks, added at the end of the item: 'Une story qui ne nomme pas l'écran livre quand même quelque chose de visible.'
- M7: the pitfall 'Fixer une règle en découpant' takes CF's more precise reference: '(concept 8)' becomes '(concept 8a2)'.
- M7: MDX order is kept ('Légender une part « story »' comes after 'Trancher une hypothèse'). No CF pitfall is missing from MDX.
- M8: the quick test is the CF question as a blockquote, followed by the Reflexe note as one paragraph. CF adds nothing.
- M13: typographic apostrophes in the pitfall 'Légender une part « story »' ('n’est', 'qu’au') become straight apostrophes. This is form and is not counted. No em-dash or arrow was found, so none was replaced.
- M1: « Objectif » is the course.yaml objective verbatim. It equals CF's wording, and MDX objectif is a shorter form that course.yaml already covers. The line breaks follow CF.

## Checks

`mise exec -- specs/linear-course/checks/check-course courses/parcours-po --only course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography --concept 9`

```
course-yaml: ok
concept-folder: ok
conventions: ok
svg-contract: ok
sources: ok
glossary-order: ok
typography: ok
```
