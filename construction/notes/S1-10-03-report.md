# Migration report: concept 3

Workflow `migrate-concept`, course `parcours-po`, concept folder `concepts/03-backlog-produit/`. Paths in the course folder are relative to it; the old files are named from their repository folder (`parcours-po`, `parcours-po-website`).
Old files: `parcours-po/course/concepts/03-backlog-produit.md` (CF), `parcours-po/course/sources/03-backlog-produit.md` (SF), `parcours-po-website/src/content/concepts/fr/03-backlog-produit.mdx` (MDX), `parcours-po-website/src/components/schemas/Schema03.astro` (ASTRO).

## Summary

| kept | moved | by design | lost | invented | refuted | checks | target existed | accepted |
|---|---|---|---|---|---|---|---|---|
| 5 | 37 | 7 | 1 | 0 | 1 | fail | no | no |

Result: **failed**. lost and invented count the rows confirmed by the verification; the rows it refuted (refuted) are listed at the end and count in no other column. checks is read in code from the output below, which the check agent returns; target existed is read in code from the listing below, which the scope agent returns.

## Target before the run

`ls -ld concepts/03-backlog-produit; ls -la concepts/03-backlog-produit`, as the scope agent returned it: no such folder.

```
ls: cannot access 'concepts/03-backlog-produit': No such file or directory
ls: cannot access 'concepts/03-backlog-produit': No such file or directory
```

## CF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Frontmatter (concept, titre) and H1 « Le backlog produit » | course.yaml (number 3, title) | by design | M1 | M12: the H1s and frontmatters of M1; identity held by course.yaml |
| « Objectif » | concept.md « Objectif » (course.yaml objective verbatim) | moved | M1 | Lead « À la fin, l'apprenant sait » dropped, capital first letter; merged in course.yaml by S1-08 (concept 3 listed under « merged »); every clause carried |
| « L'essentiel » | concept.md « L'essentiel » | moved | M4 | Merged with MDX intro, MDX wording as base; CF-only « (Scrum Guide) » added after « équipe Scrum »; CF « Il ne se remplit pas d'avance pour être dépilé ensuite : c'est ce qui le sépare d'un cahier des charges » carried by MDX « ni un cahier des charges rempli d'avance, ni une liste qu'on dépile » |
| « Consensus et choix d'école » (section) | concept.md frontmatter stances / neighbors | moved | M3 | Not written as a section; each claim matched to a frontmatter item |
| Consensus: « (vu aux concepts 0 et 1) » | concept.md frontmatter stances.consensus[0].text | moved | M3 | CF-only reference carried into the MDX consensus item |
| Consensus: glossary parenthesis « tout n'y sera pas fait, voir 3b ; c'est la même notion » | concept.md frontmatter stances.course[3].text | moved | M3 | CF-only « (voir 3b) ; c'est la même notion » carried into the matching course item |
| Choix d'école: retirer (« l'élément revient si le besoin apparaît ») | concept.md frontmatter stances.school[1].text | moved | M3 | CF-only parenthesis « (l'élément revient si le besoin apparaît) » carried into the MDX item |
| Choix d'école: DEEP; Rubin contenu; Parti pris du cours (sans sprint) | concept.md frontmatter stances.school[0], school[2], course[0] | kept | M3 | Same claims as the MDX items |
| « Sous-concepts » | teaching.md « Consignes » | moved | M9 | Heading renamed, text verbatim (diffed) |
| « Banque d'exemples » lead paragraph (faits du fil rouge) | teaching.md « Faits du fil rouge utilisés » | moved | M9 | Placed under its own heading; text verbatim, no lead words to drop |
| « Banque d'exemples » cases (Trois niveaux de priorité, Tout détailler d'avance ?, Maud passe par Diego, Le plan de l'année, Le backlog de Dana, Au fond depuis des mois) | teaching.md « Banque d'exemples » | kept | M9 | Same ### headings, every field verbatim (diffed) |
| « Pièges » (section) | concept.md « Pièges » | moved | M7 | Merged with MDX <Erreurs>, MDX order; CF items Le remplir au début and Le figer folded into MDX item « Le remplir au début, puis le figer » |
| Piège « Prendre le backlog pour la liste des tâches techniques » | concept.md « Pièges » item 1 | lost (L1) | M7 | CF sentences « Signe : … » and « et le PO l'ordonne (il n'est pas exclu) » carried, but CF's precision « réflexe le plus probable d'un développeur ou d'un profil data » is missing: the item keeps MDX's generic « réflexe probable d'un profil technique » |
| Piège « Le remplir au début » | concept.md « Pièges » item 2 | lost (L2, refuted) | M7 | « le reste émerge » carried; the CF clause « écrire tous les éléments d'un coup » is in no new file |
| Piège « Le figer » | concept.md « Pièges » item 2 | moved | M7 | Both CF sentences carried into the MDX merged item « Le remplir au début, puis le figer » |
| Pièges « Le dépiler », « Des priorités », « Tout détailler », « appartient », « Definition of Ready » | concept.md « Pièges » items 3, 4, 5, 7, 9 | moved | M7 | CF sentences absent from MDX added in their items (« Le cours dit « ordonner », pas « prioriser » », « qui dit le besoin », « il reste responsable (concepts 0 et 1) », full DoR sentence, full dépiler sentence) |
| « Le test rapide » | concept.md « Le test rapide » blockquote | moved | M8 | Question as blockquote, identical to the <Reflexe> slot |
| « Schéma » | teaching.md « Schéma » | kept | M9 | Verbatim |

## SF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Frontmatter (concept) and H1 « Sources : Le backlog produit » | none | by design | M1 | M10: frontmatter and H1 dropped (M1) |
| Intro paragraph | sources.md intro | moved | M10 | Old path rewritten: « (`course/sources/00-scrum.md`, `01-produit-et-po.md`, `02-objectif-produit-resultat.md`) » to « (`concepts/00-scrum/sources.md`, `concepts/01-produit-et-po/sources.md`, `concepts/02-objectif-produit-resultat/sources.md`) »; rest unchanged |
| « Affirmations » subheadings ### 3a, ### 3b, ### Test rapide et schéma | sources.md « Affirmations » (one table) | moved | M10 | Three tables merged into one table (SPEC.md 4.4: one table), rows in the same order; the grouping headings carry no claim |
| « Affirmations » table header | sources.md « Affirmations » | moved | M10 | Header « Affirmation (section du fichier du concept) \| Source \| Ce qui a été vérifié » to « Affirmation (section de `concept.md` ou de `teaching.md`) \| Source \| Ce qui a été vérifié \| Nature » |
| « Affirmations » rows (29 rows) | sources.md « Affirmations » | moved | M10 | Texts and source cells unchanged (diffed); Nature added: consensus/cours/école from the MDX item kind, empty where the MDX item has no kind (appartient, Émergente, élément du backlog, hors backlog, retrait pas définitif, qu'une partie, tâches techniques, Ticket); rows with no MDX item: « Le haut est en général précisé avant » consensus (ecoles.consensus), DoR, Réunir les parties prenantes, Test, Schéma empty; no orphan reference |
| Row « Le backlog produit est un des trois artefacts » | sources.md « Affirmations » row 3 | moved | M10 | Old paths in the verification column: « `00-scrum.md` et `02-objectif-produit-resultat.md` » to « `concepts/00-scrum/sources.md` et `concepts/02-objectif-produit-resultat/sources.md` »; source cell [S1] unchanged |
| « Références » | sources.md « Références » | kept | M10 | Unchanged but for S8 « (déjà cité dans `00-scrum.md`) » to « (déjà cité dans `concepts/00-scrum/sources.md`) », moved |
| Row S8 of « Références » | sources.md « Références » | moved | M10 | Old path « `00-scrum.md` » to « `concepts/00-scrum/sources.md` » |
| « Non vérifié » | sources.md « Non vérifié » | moved | M10 | Old paths: « (`course/plan.md` : » to « (`plan.md` : »; « (voir `00-scrum.md`) » to « (voir `concepts/00-scrum/sources.md`) »; rest unchanged |

## MDX: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Frontmatter numero, titre, prerequis | course.yaml | by design | M1 | M12: identity frontmatter held by course.yaml |
| Frontmatter objectif | course.yaml objective; concept.md « Objectif » | moved | M1 | Shorter form of the CF objective, merged by S1-08; every clause in the objective |
| Frontmatter description | concept.md frontmatter description | kept | M2 |  |
| ecoles.consensus | concept.md frontmatter stances.consensus | moved | M3 | Keys renamed; CF « (vu aux concepts 0 et 1) » added; author and refs [S1, S3] unchanged |
| ecoles.ecole (3 items) | concept.md frontmatter stances.school | moved | M3 | Keys renamed; item 2 gains CF « (l'élément revient si le besoin apparaît) »; items 1 and 3 unchanged; refs unchanged |
| ecoles.cours (5 items) | concept.md frontmatter stances.course | moved | M3 | Keys renamed; item 4 gains CF « (voir 3b) ; c'est la même notion »; other items unchanged; refs unchanged |
| ecoles.voisines | concept.md frontmatter neighbors | moved | M3 | Renamed, text, author, refs unchanged |
| sources (affirmations texts, references, nonVerifie) | none (kind used in sources.md Nature) | by design | M12 | M10: the MDX sources texts, only their kind is used |
| alignement | none | by design | M12 | M12: MDX alignement |
| import Schema03 | none | by design | M6 | M6/M12: import lines |
| Text before the first <Sous> | concept.md « L'essentiel » | moved | M4 | Base of the merged « L'essentiel » |
| <Figure legende> with <Schema03 /> | concept.md « L'essentiel » image; frontmatter diagrams[0] | moved | M6 | « ![Le backlog produit : une colonne ordonnée, précise en haut et vague en bas](backlog-produit-colonne-ordonnee.svg) » at the same place; legende as caption; subconcept 3a |
| <Sous id=3a> with h4 3a1, 3a2 | concept.md « ## 3a Une liste ordonnée, émergente », « ### 3a1 Ordonnée », « ### 3a2 Émergente » | moved | M5 | Promise in italics; reader text unchanged; <Renvoi n=4/13/1/15> to « concept N »; <Pastille> to [cours], [consensus], [école] |
| <Sous id=3b> | concept.md « ## 3b Ce qu'il n'est pas » | moved | M5 | Promise in italics; reader text unchanged |
| <h4 id=3b1> « Pas un cahier des charges, pas une liste à dépiler » | concept.md « 3b » paragraph led by bold title | moved | M5 | 3b1 not in course.yaml: paragraph led by its title in bold; Pastille ecole to [école] |
| <h4 id=3b2> « Pas le plan technique de la solution » | concept.md « 3b » paragraph led by bold title | moved | M5 | 3b2 not in course.yaml: paragraph led by its title in bold; Renvoi n=1 to « concept 1 » |
| <Reflexe note> | concept.md « Le test rapide » | moved | M8 | Question as blockquote, note as one paragraph; CF adds nothing |
| <Erreurs> (9 items) | concept.md « Pièges » | moved | M7 | MDX order and sentences, merged with CF; « Dire « ticket » » (MDX only) kept at its place; Renvoi n=11 to « concept 11 » |

## ASTRO: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Schema03 component | backlog-produit-colonne-ordonnee.svg | moved | M11 | Stem from the <title> words; same viewBox 0 0 600 570 and geometry; cards.map, chips.map, moves.map written out (6 cards, 4 chips, 4 moves with labels and marker-start on réordonner); <title> and <desc> kept, ids prefixed with the stem (marker g3-arr to backlog-produit-colonne-ordonnee-fleche) |
| Astro frontmatter code (X, W, cards, chips, moves) and comments | none | by design | M12 | M12: Astro frontmatter code once written out |
| Colour mapping and <style> | backlog-produit-colonne-ordonnee.svg attributes | moved | M11 | Concept mapping: --sch-text primary 1; --sch-s1 primary 0.85; --sch-text-soft secondary 0.8; --sch-grey-line secondary 0.6; --sch-band-line muted 0.5; --sch-grey muted 0.35; --sch-band muted 0.15; --sch-s-ink none (a gap). Applied consistently: flag fill muted 0.15 + stroke primary 0.85; lines and arrow-head secondary 0.8; precise cards primary 0.85; vague cards muted 0.15 + dashed secondary 0.6; kbox and chips muted 0.15 / 0.5; doc muted 0.35 + secondary 0.6; texts primary 1 or secondary 0.8; font var(--font-ui) to sans-serif |
| Element opacities .kcard.v1 0.95, .v2 0.8, .v3 0.65; .cross 0.8 | backlog-produit-colonne-ordonnee.svg opacity attributes | moved | M11 | Kept as element opacity on fill and outline of each vague card, and on both crosses, on top of their token pair |
| Card text n1 to n3 in --sch-s-ink | backlog-produit-colonne-ordonnee.svg group 3a2-colonne | moved | M11 | Contrast ink becomes a gap: precise cards drawn as evenodd paths with a cut-out behind the label, label in currentColor; loss: the label is no longer a second ink on the card |
| Drawn elements (flag, column, Sprint Planning box, chips, four moves, legend, two crossed vignettes) | backlog-produit-colonne-ordonnee.svg groups 3a1-objectif-produit, 3a2-colonne, 3a2-sprint-planning, 3a1-demandes, 3a2-mouvements, 3a2-legende, 3b-cahier-des-charges, 3b-liste-a-depiler | moved | M11 | All elements present with same coordinates, grouped by leaf sub-concept |

## Lost

| Id | Source | Old item | Missing | Verification |
|---|---|---|---|---|
| L1 | CF | Piège « Prendre le backlog pour la liste des tâches techniques » | CF sentences « Signe : … » and « et le PO l'ordonne (il n'est pas exclu) » carried, but CF's precision « réflexe le plus probable d'un développeur ou d'un profil data » is missing: the item keeps MDX's generic « réflexe probable d'un profil technique » | CF Pièges item 1 reads « réflexe le plus probable d'un développeur ou d'un profil data ». In concept.md line 84 the pitfall has only MDX's generic « c'est le réflexe probable d'un profil technique ». No other part of concept.md names the developer or the data profile. teaching.md lines 174-175 do have « réflexe probable d'un développeur ou d'un profil data », but that is the verbatim « Erreurs fréquentes » field of a CF example case, not this pitfall. It also lacks « le plus ». sources.md does not carry it either. M7 says CF's more precise wording wins, so this precision is lost from the pitfall. |

## Invented

None.

## Refuted by the verification

| Id | Flagged | Found |
|---|---|---|
| L2 | Piège « Le remplir au début » | In concept.md line 85 the pitfall reads « **Le remplir au début, puis le figer** : comme un cahier des charges, alors qu'on n'en connaît qu'une partie ; le reste émerge ». « Remplir au début, comme un cahier des charges » already says that every item is written upfront, in one go. CF's « écrire tous les éléments d'un coup » only restates its own heading « Le remplir au début ». The same meaning appears again at concept.md line 76 (« Un cahier des charges découpé se remplit et se valide au début ») and line 48 (« un cahier des charges rempli d'avance »). No precision, reference or nuance is missing, only a paraphrase, so the meaning is kept. |

## Colour mapping (M11)

One pair of class and opacity per old colour token, decided once for all the diagrams of the concept.

| Token | Class | Opacity | Draws | Diagrams |
|---|---|---|---|---|
| `--sch-text` | primary | 1 | Schema03: flag-text, vague card numbers (card-text v1-v3), box-text, head, chip-text, move labels, legend strong tspan, vig labels, cross strokes (cross keeps its own element opacity 0.8) | backlog-produit-colonne-ordonnee.svg |
| `--sch-s1` | primary | 0.85 | Schema03: fill of the precise cards n1-n3 and stroke of the Objectif produit flag | backlog-produit-colonne-ordonnee.svg |
| `--sch-text-soft` | secondary | 0.8 | Schema03: arrows and connector lines (.line), arrow-head marker, italic notes, column legend text | backlog-produit-colonne-ordonnee.svg |
| `--sch-grey-line` | secondary | 0.6 | Schema03: dashed outline of the vague cards v1-v3, outline of the doc vignettes, doc-spine fill, doc-line strokes | backlog-produit-colonne-ordonnee.svg |
| `--sch-band-line` | muted | 0.5 | Schema03: outline of the Sprint Planning box (kbox) and of the request chips | backlog-produit-colonne-ordonnee.svg |
| `--sch-grey` | muted | 0.35 | Schema03: fill of the doc vignettes (cahier des charges, pile a depiler) | backlog-produit-colonne-ordonnee.svg |
| `--sch-band` | muted | 0.15 | Schema03: fill of the flag, of the vague cards v1-v3 (which keep their element opacities 0.95, 0.8, 0.65), of the Sprint Planning box and of the chips | backlog-produit-colonne-ordonnee.svg |
| `--sch-s-ink` | none | none (a gap) | Schema03: contrast ink of the numbers on the precise cards n1-n3 (card-text n1-n3, drawn over the s1 fill), becomes a gap (knocked-out text); a loss | backlog-produit-colonne-ordonnee.svg |

Declared but drawn by no element: `--sch-s2`, `--sch-s3`.

## Writing choices

- M9: « Consignes » copies CF « Sous-concepts » verbatim. It cites only the three 3a cases (« Trois niveaux de priorité », « Tout détailler d'avance ? », « Maud passe par Diego »). The three 3b cases (« Le plan de l'année », « Le backlog de Dana », « Au fond depuis des mois ») are cited nowhere in CF, and the rule asks for a verbatim copy, so no citation was added. The concept-folder check will probably flag this.
- M9: the CF lead paragraph of « Banque d'exemples » (« Les demandes d'Étienne, Maud, Charlotte et Pia sont celles du fil rouge. ... ») became « Faits du fil rouge utilisés » unchanged. It has no lead words to drop, and no other lead text is left at the top of « Banque d'exemples ».
- M10: SF « Affirmations » had three tables under ### subheadings. They are merged into one table, as SPEC 4.4 requires, with the same rows in the same order. The subheadings are dropped: « 3a : liste ordonnée, émergente, seule source de travail », « 3b : ce qu'il n'est pas », « Test rapide et schéma ».
- M10 Nature, MDX item with a kind: Définition consensus; seule source consensus; artefacts/engagement consensus; « Ordonnée »/l'ordre se justifie par l'objectif produit cours; ordered pas prioritized consensus; PO répond du backlog consensus; haut précis bas vague école; « Prêt à être choisi » consensus (MDX item « prêt à être choisi » n'est pas la DoR); sans sprint cours (MDX « Le backlog garde son sens sans sprints »); DEEP école; ordre vs niveaux de priorité cours; Détailler tôt école; pas un cahier des charges figé consensus; dépiler cours; jamais faits école; revue de sprint consensus.
- M10 Nature left empty because the matching MDX item has no kind: « appartient » au PO; Émergente (ajoute, précise...); élément du backlog; travail hors du backlog; Retirer pas définitif; n'en remplit qu'une partie; pas la liste des tâches techniques; « Ticket ».
- M10 Nature, no MDX affirmation states the claim: « Le haut est en général précisé avant le Sprint Planning... » gets consensus, matched to ecoles.consensus (« Les éléments que l'équipe peut finir en un sprint sont prêts à être choisis au Sprint Planning, une fois précisés »).
- M10 Nature, no MDX affirmation states the claim: the Definition of Ready row (« conditions qu'une équipe fixe elle-même..., choix d'école ») is left empty. It matches only ecoles.voisines, which is not a stance. Its closest MDX affirmation (prêt à être choisi is not the DoR, consensus) is a different claim, already mapped to the « Prêt à être choisi » row.
- M10 Nature, no MDX affirmation or ecoles item matches, so left empty: Réunir les parties prenantes (banque « Le plan de l'année »); Test (Le test rapide); Schéma.
- M10 orphans: none. S1 to S9 are each cited in at least one source cell.
- M10 path (intro), moved: old « (`course/sources/00-scrum.md`, `01-produit-et-po.md`, `02-objectif-produit-resultat.md`) », new « (`concepts/00-scrum/sources.md`, `concepts/01-produit-et-po/sources.md`, `concepts/02-objectif-produit-resultat/sources.md`) ». The two bare file names were read as abbreviations of course/sources/ paths.
- M10 path (row « artefacts », verification column), moved: old « Sources complètes dans `00-scrum.md` et `02-objectif-produit-resultat.md` », new « Sources complètes dans `concepts/00-scrum/sources.md` et `concepts/02-objectif-produit-resultat/sources.md` ».
- M10 path (Références S8, consulted-on column), moved: old « (déjà cité dans `00-scrum.md`) », new « (déjà cité dans `concepts/00-scrum/sources.md`) ».
- M10 path (Non vérifié), moved: old « (`course/plan.md` : », new « (`plan.md` : ».
- M10 path (Non vérifié), moved: old « (voir `00-scrum.md`) », new « (voir `concepts/00-scrum/sources.md`) ».
- M10: no pointer was dropped. F12 (a storyline fact id) and « l'annexe A2 » stay as they are. No old decision number appears, so decisions/team-in-sprints.md was not used.
- M10: no row section is named « Sous-concepts », so no rename was needed. Short section names such as « Consensus », « banque « ... » » and « 3a » are kept as written.
- M13: neither file has an em-dash, arrow or typographic apostrophe, so nothing was replaced.
- M1: Objectif = course.yaml objective with capital D and final period; CF Objectif equals it (lead dropped per S1-08), MDX objectif is a shorter form dropping the 'ce qu'il n'est pas' list; no clause lost.
- M3: CF consensus 'qui veut changer le backlog doit le convaincre (vu aux concepts 0 et 1)' - reference '(vu aux concepts 0 et 1)' carried into the consensus item (MDX had none).
- M3: CF consensus parenthesis on the course glossary ('tout n'y sera pas fait, voir 3b ; c'est la même notion') matched to the course item 'Le glossaire du cours dit...'; carried as '(voir 3b) ; c'est la même notion.' appended to its last sentence; 'voir 3b' kept as CF wrote it (bare id, not rewritten as 'concept 3b').
- M3: CF school item 'retirer' adds '(l'élément revient si le besoin apparaît)'; inserted after 'Que ce retrait ne soit pas définitif' in the school item.
- M3: CF 'Parti pris du cours' matched to course item 'Ce concept vaut aussi pour une équipe sans sprint'; nothing added. CF has no teacher hint on course choices to drop.
- M3: neighbors item keeps MDX auteur 'La Definition of Ready (concept 11)' as author.
- M4: CF '(Scrum Guide)' after 'seule source de travail de l'équipe Scrum' added to the MDX essentials at its CF place; CF closing sentence 'Il ne se remplit pas d'avance pour être dépilé ensuite : c'est ce qui le sépare d'un cahier des charges' judged same claim as MDX 'Ce n'est donc ni un cahier des charges rempli d'avance, ni une liste qu'on dépile' and not added.
- M5: MDX h4 3b1 and 3b2 (not in course.yaml) became paragraphs of 3b led by their titles in bold, with a period added inside the bold: '**Pas un cahier des charges, pas une liste à dépiler.**' and '**Pas le plan technique de la solution.**', prefixed to the first paragraph of each; counted moved.
- M6: Renvoi n=4: 'concept 4', n=13: '(concept 13)' and 'concept 13', n=1: 'concept 1' / '(concept 1)', n=15: 'concept 15', n=11: 'concept 11'; Pastille kinds: [cours], [consensus], [école], each kept after a space where it stood.
- M7 item 1: CF 'Signe : un utilisateur ne comprend aucun élément.' inserted after the first sentence; CF ', et le PO l'ordonne (il n'est pas exclu)' appended to the last sentence; CF 'd'un développeur ou d'un profil data' not taken (MDX 'profil technique' kept, not a named author).
- M7 item 2: MDX merged CF items 'Le remplir au début' and 'Le figer'; CF '; le reste émerge' appended and CF 'Le faire valider, puis interdire d'y toucher' plus 'Il change à chaque chose apprise, à la revue de sprint notamment' joined as one sentence with a colon ('...d'y toucher : il change...').
- M7 item 3: CF sentence 'le traiter dans l'ordre d'arrivée, ou dans un ordre fixé une fois pour toutes, jusqu'au dernier élément.' placed first (CF place), MDX sentence follows with capital L.
- M7 item 4: CF sentence 'Le cours dit « ordonner », pas « prioriser ».' appended.
- M7 item 5: CF clause 'qui dit le besoin' added after 'en une ligne'; MDX 'du travail à refaire' kept over CF 'du travail qui sera à refaire'.
- M7 item 7: CF ', il reste responsable (concepts 0 et 1)' appended (CF reference kept).
- M7 item 9: CF's fuller sentence used ('le Scrum Guide dit seulement ... ; la Definition of Ready (...) est un choix d'école, vu au concept 11'), replacing MDX's 'la seconde est un choix d'école', since 'la seconde' no longer reads after the CF clause.
- M7: MDX-only item 'Dire « ticket »' kept at MDX place; CF has no item absent from MDX.
- M8: CF question equals the Reflexe slot; one blockquote, then the Reflexe note as the paragraph; CF adds nothing.
- M13: no banned characters or typographic apostrophes found in the copied texts; nothing replaced.
- M11/diagrams: single frontmatter entry as given, image placed in L'essentiel where the MDX Figure stood.
- backlog-produit-colonne-ordonnee.svg: element opacity 0.95 kept on .kcard.v1 (card 4) (M11)
- backlog-produit-colonne-ordonnee.svg: element opacity 0.8 kept on .kcard.v2 (card 5) (M11)
- backlog-produit-colonne-ordonnee.svg: element opacity 0.65 kept on .kcard.v3 (card 6) (M11)
- backlog-produit-colonne-ordonnee.svg: element opacity 0.8 kept on .cross (the cross over the cahier des charges) (M11)
- backlog-produit-colonne-ordonnee.svg: element opacity 0.8 kept on .cross (the cross over the pile) (M11)
- backlog-produit-colonne-ordonnee.svg: The light contrast ink (--sch-s-ink) of the labels of cards 1 to 3 (« 1  précis », « 2 », « 3 ») on the dark card fill: each card is drawn as a filled path with a rectangular gap (evenodd hole) where its label stands, and the label, which has no pair, is set in that gap with no class, in plain currentColor. (M11)
- backlog-produit-colonne-ordonnee.svg: Elements whose fill and stroke used two tokens of different classes (.flag: --sch-band fill, --sch-s1 stroke; .kcard.v1-v3 and .doc: --sch-band or --sch-grey fill, --sch-grey-line stroke) are each drawn as two superposed rects, one for the fill and one for the outline. (M11)
- backlog-produit-colonne-ordonnee.svg: font-family var(--font-ui) becomes the generic sans-serif. (M11)

## Checks

`mise exec -- specs/linear-course/checks/check-course courses/parcours-po --only course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography --concept 3`

```
course-yaml: ok
concept-folder: fail: concepts/03-backlog-produit/teaching.md:125 case "Le plan de l'année" is not cited by its title in « Consignes »
concept-folder: fail: concepts/03-backlog-produit/teaching.md:152 case "Le backlog de Dana" is not cited by its title in « Consignes »
concept-folder: fail: concepts/03-backlog-produit/teaching.md:187 case "Au fond depuis des mois" is not cited by its title in « Consignes »
conventions: ok
svg-contract: ok
sources: ok
glossary-order: fail: concepts/03-backlog-produit/concept.md:92 uses the term "Definition of Ready", introduced by concept 11 (glossary.md:58), which comes later
glossary-order: fail: concepts/03-backlog-produit/concept.md:60 uses the term "MoSCoW", introduced by concept 13 (glossary.md:71), which comes later
typography: ok
```

Left:
- teaching.md:125, 152, 187 (concept-folder): the three 3b cases (« Le plan de l'année », « Le backlog de Dana », « Au fond depuis des mois ») are not cited by title in « Consignes ». The old « Sous-concepts » section does not cite them either, and M9 requires it verbatim. Adding the citations would add text, so it is a content decision for the maintainer.
- concept.md:92 (glossary-order): the pitfall uses « Definition of Ready », introduced at concept 11. The sentence is the old MDX/CF text, so removing or rewording it would change what it says.
- concept.md:60 (glossary-order): the text uses « MoSCoW », introduced at concept 13. Same reason: it is old text, and removing the term would change what it says.

Failing the run:
- concept-folder: fail: concepts/03-backlog-produit/teaching.md:125 case "Le plan de l'année" is not cited by its title in « Consignes »
- concept-folder: fail: concepts/03-backlog-produit/teaching.md:152 case "Le backlog de Dana" is not cited by its title in « Consignes »
- concept-folder: fail: concepts/03-backlog-produit/teaching.md:187 case "Au fond depuis des mois" is not cited by its title in « Consignes »
- glossary-order: fail: concepts/03-backlog-produit/concept.md:92 uses the term "Definition of Ready", introduced by concept 11 (glossary.md:58), which comes later
- glossary-order: fail: concepts/03-backlog-produit/concept.md:60 uses the term "MoSCoW", introduced by concept 13 (glossary.md:71), which comes later

## Fixes after the run

Run `wf_396e562d-835` left 5 kept, 37 moved, 7 by design, 1 lost, 0 invented, 1 refuted. Fixed in the output only, under the rulings on #23:

- L1 (lost, fixed): pitfall « Prendre le backlog pour la liste des tâches techniques » now reads « c'est le réflexe probable d'un profil technique, le plus probable d'un développeur ou d'un profil data » (site sentence as base, the old file's precision kept, M7). The item is now moved: 1 lost becomes 0.
- Ruling B: `teaching.md` gains one line after the « Consignes » list, « Cas de la banque : pour 3b, « Le plan de l'année », « Le backlog de Dana » et « Au fond depuis des mois ». » Titles exact, no teaching content added. `concept-folder` is now ok.
- Ruling A: the two `glossary-order` failures are not fixed; they are left to the Checks sub-issue (#166): `concept.md:92` « Definition of Ready » (concept 11) and `concept.md:60` « MoSCoW » (concept 13).
- Reader sub-heading 3b (ruling of 2026-10-27): checked, it is « ## 3b Ce qu'il n'est pas » with two bold-led paragraphs (« **Pas un cahier des charges, pas une liste à dépiler.** », « **Pas le plan technique de la solution.** »), not a heading.

Checks after the fixes (same command, `--concept 3`): `course-yaml`, `concept-folder`, `conventions`, `svg-contract`, `sources`, `typography` ok; `glossary-order` fail (2, ruling A).
