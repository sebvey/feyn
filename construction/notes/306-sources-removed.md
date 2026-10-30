# #306: what left the sources of concepts 9 to 12

The rows of « Affirmations », the references, the frontmatter `refs` and the « Non vérifié »
entries that the sources pass of concepts 9 to 12 removed, re-anchored or changed, and where
their matter went (#306, SPEC 4.4 and 4.1). Destinations: a frontmatter item (its `refs` and
`verified`), another row of the same file (merged), « Non vérifié », `concept.md` (a gap), or
nowhere (not a claim of the body of `concept.md`). Line numbers are the lines of `sources.md`
on `main` at `298fb36`.

Places: a place in parentheses is one `main` held, or one checked on 2026-10-30 by fetching
the source (the Scrum Guide 2020, and in concept 9 Wake's INVEST, Lawrence's 2009 post, the
Humanizing Work guide and SPIDR); « (page) » is the whole page where no place was recorded.
Every verified cell kept now holds quotations and their place only: the reasoning and
pointers to other files or concepts it held were dropped.

## 09-decoupage-vertical

Body of `concept.md`: unchanged.

| Line | Row | Went to |
|---|---|---|
| 5 | « Le Scrum Guide ne parle ni de tranche verticale, ni de couche, ni de story » | frontmatter `stances.consensus[0]` (S1: absence searched again on 2026-10-30) |
| 6 | « Découper un élément en éléments plus petits fait partie du refinement » | frontmatter `stances.consensus[0]` (S1, the quotation of concept 4) |
| 7 | « L'incrément doit être utilisable » | frontmatter `stances.consensus[0]` (S1, the quotation of concept 0) |
| 8 | « Que chaque story soit une tranche verticale ; ... exceptions » | frontmatter `stances.course[4]` (S1, and S10 copied from concept 17) |
| 9 | « Découper par valeur plutôt que par couche technique » | frontmatter `stances.consensus[1]` (S2, S3, S4); S7's « The most common mistake ... »: « Non vérifié » (Pièges), as on `main`; the note on S5 and on *User Stories Applied*: nowhere |
| 17 | « Les catalogues de patrons de découpage sont des choix d'école » | frontmatter `stances.school[0]` to `[3]`; the rows on SPIDR and on Lawrence's nine patterns attribute each catalogue; « I didn't invent these patterns ... » now in `stances.school[1]` under S3 (where it was found on 2026-10-30) |
| 24 | « Ces patrons sont aujourd'hui publiés par Humanizing Work » | frontmatter `stances.school[1]`; the names under the photos: « Non vérifié » (Consensus et choix d'école); the order of the guide's patterns: nowhere |
| 30 | « Choisir le découpage qui permet de reporter ou d'abandonner une story » | frontmatter `stances.school[2]` (S4) and `[3]` (S6, Wake's quotation): the body does not state it |
| 31 | « Wake, « Twenty Ways to Split Stories » (2005) » | frontmatter `stances.school[3]` (S6); the list of dimensions and Pietri: nowhere |
| 32 | « Le walking skeleton (Alistair Cockburn) » | frontmatter `neighbors[0]` (S8); the Pièges claim keeps a row (« Le walking skeleton relie les couches ... »); the comparison with the spike: nowhere |
| 33 | « Une tranche qui traverse toutes les couches sans servir seule (compteur de relevés) » | nowhere: a teaching device (the case « Le compteur de relevés ingérés »); the body's claim is in the row « Traverser les couches ne suffit pas » |
| 38 | « Exemples du fil rouge : Régis ... » | nowhere: storyline facts and teaching devices |
| 39 | « Schéma 9b, cas inventé ... » | nowhere: an invented example; the patterns it names have their rows (D, R, the overlap of the catalogues) |
| 42 | « Les tâches se découpent au Sprint Planning par les Developers » | merged into the row at line 15 (« Le vertical s'arrête à la story ») |
| 43 | « Walking skeleton daté « années 1990 » » | frontmatter `neighbors[0]`; the dates: « Non vérifié » (Pièges, Consensus et choix d'école) |
| 44 | « Les patrons SPIDR et Lawrence se recoupent » | kept, anchored 9b2, Pièges, Approfondissement; also frontmatter `stances.school[4]` |

- Kept and re-anchored, their reasoning dropped: 10 (9a1, nature `fait`), 11 (L'essentiel, 9a1;
  « on les dessine à l'horizontale » left the claim: a wording of the course; the S4 quotation
  now reads « a horizontal slice, which refers to ... », the source's text, where `main` elided
  « which »), 12 (L'essentiel, 9a1, Pièges; « Schéma » left), 13 (9a1, Pièges; the nuance of S7
  on small stories: nowhere, not in the body), 14 (9a2, Pièges), 15 (L'essentiel, 9a2, Pièges),
  16 (9a2), 18 to 21 (9b2), 22 (merged with 40 into « Le spike est une activité de recherche »,
  9b1, 9b2), 23, 25 to 29, 41 (9b1), 36, 37 (L'essentiel, 9a1; « Schéma » left).
- Row 13: S7's nuance left; Lawrence's « still have to follow the model » replaced by « may
  satisfy small, but it fails at independent and valuable », the quotation `main` gives for
  Lawrence on value (row 9).
- Row 22: the spike's XP origin (path to concept 7) left: the body does not state it; « rarely
  the first » and « last resort » went to `stances.school[0]` and `[1]`.
- Row 40: its path to concept 7 pointed at the glossary, which holds no quotation; « sans
  livrer de fonction » is now settled by SPIDR's « During a spike a team isn't trying to develop
  the new functionality », found on 2026-10-30 (a quotation added).
- Paths copied (Done when): row 8, concept 17's S5 as S10; rows 14 and 41, concept 4's S2 as
  S11; row 34, concept 5's S2 as S12; row 16, concept 8's S4 as S13. Paths whose reference this
  concept already held, kept rather than copied (the deviation accepted on #304): the Scrum
  Guide 2020 (S1) of concepts 0, 1, 3, 4, 7 and 8, rows 5 to 8, 15, 16, 34, 41, 42; Wake's INVEST
  (S2) of concept 7, row 34. Row 35's paths (concepts 7 and 8) pointed at rows that are
  themselves course choices: source « cours ». Row 14's « Consignes » and « Banque » anchors left.
- Row 34: quotations from concept 1's S1 (« How this is done is at the sole discretion of the
  Developers. », the first sentence, at the place concept 4 gives) and concept 7's S1
  (« details will be co-created by the customer and programmer during development »).
- « Non vérifié »: « Qualité de service différée » and « Elephant carpaccio » left: traces of
  claims the concept does not make. Added: the origin of SPIDR (Consensus et choix d'école:
  [S5] says the stories were collected, not that Cohn split them). Every other entry now opens
  with its section.

## 10-hors-perimetre-dependances

Body of `concept.md`: unchanged.

| Line | Row | Went to |
|---|---|---|
| 6 | « Le Scrum Guide n'impose aucune forme aux éléments du backlog » | merged into the row at line 5 (10a1, Pièges, école) and frontmatter `stances.school[0]` |
| 7 | « Un élément choisi au Sprint Planning a en général été précisé avant ... » | frontmatter `stances.consensus[0]` (S1); « clarifier ce qui n'y est pas »: nowhere, a deduction |
| 13 | « Le hors périmètre de la story de Théo ... » | nowhere: storyline facts |
| 20 | « Consensus : réduire les dépendances et rendre visibles celles qui restent » | frontmatter `stances.consensus[1]` (S7's quotation); the transparency pillar of S1: nowhere, the item does not rest on it |
| 23 | « Choix d'école, SAFe : ... « ART Planning Board » » | frontmatter `stances.school[2]` (S8, S9): the body does not name SAFe |
| 25 | « Scarlette, Scrum Master des deux équipes ; Odile, sponsor ; Pia ... » | nowhere: storyline facts |
| 28 | « Faits de 10b2 : ... » | nowhere: storyline facts and teaching devices |
| 30 | « Les signalements par téléphone absents ... » | nowhere: a storyline fact |
| 31 | « La puce « Consensus (pratique établie, hors du Scrum Guide) » » | frontmatter `stances.consensus[1]`; the label is a wording of the course |

- Kept and re-anchored, their reasoning dropped: 5 (10a1, Pièges), 8 (L'essentiel, 10a1,
  nature `école`), 9 (L'essentiel, 10a1, Pièges, now S2b), 10 (10a1, Pièges, Le test rapide;
  « reste une demande » is the row at line 8), 11 (10a2), 12 (L'essentiel, 10a2, Pièges; its
  second claim, « qui veut changer l'ordre le convainc », is the row at line 27), 14
  (L'essentiel, 10b1; the glossary left the source), 15 (10b1), 16 (10b1, Pièges), 17 (10b1,
  Pièges, Le test rapide), 18 (10b1), 19 (10b1, Pièges, Le test rapide), 21 (10b2, nature
  `fait`; the storyline part left), 22 (10b2, Pièges), 24 (10b2), 26 (10b1), 27 (10b2,
  Pièges; Pia and the storyline left), 29 (10a2, Pièges: the claim the body makes, a rule not
  fixed is fixed, not settled in review, source « cours »; the blocking rule of the
  storyline left).
- Row 6's quotation now reads « an ongoing activity to add details, such as a description,
  order, and size. Attributes often vary with the domain of work. », the Scrum Guide's text
  (checked on 2026-10-30; `main` had « adding details »), as #304 did in concept 5.
- Row 15's quotation was one string across a paragraph break of Wake's text; it is now two
  quotations, « ... in any order » and « We can't always achieve this ».
- Row 9 had no quotation (« [S2] relie la liste d'exclusions à la prévention de la dérive du
  périmètre »): the passage on scope creep was found on 2026-10-30 on the Confluence template,
  S2's second link, which became S2b with its quotation; `stances.course[1]` now cites S2b
  instead of S2.
- Paths: row 26 cited concept 7 for the Scrum Guide's sizing sentence: S1 kept (the deviation
  accepted on #304), quotation copied; row 29 cited concept 8 for a rule that concept 8 states
  as a course choice: source « cours ».
- Links with two places: S2 split into S2 (the PRD article, which holds « What we're not
  doing ») and S2b (the template, which holds the scope creep passage). S4 kept the copy of the
  book, where its quotations were read; the publisher's page
  (`https://www.mountaingoatsoftware.com/books/user-stories-applied`) left. S10 kept the Jira
  Data Center page, which lists the four default link types; the Jira Cloud page
  (`https://support.atlassian.com/jira-software-cloud/docs/link-issues`) left.
- S3's « consultée le » lost its pointer to `07-invest.md`.
- « Non vérifié »: every entry now opens with its section; none removed.

## 11-dor-dod

Body of `concept.md`: unchanged.

| Line | Row | Went to |
|---|---|---|
| 19 | « Exigence 1 : « Chaque vue affiche l'heure de la dernière mise à jour des données » : DoD » | nowhere: a storyline fact and a teaching device |
| 20 | « Exigence 3 : « Les relevés en double sont détectés ... » : DoD » | nowhere: a storyline fact and a teaching device (its paths to `storyline.md` and concept 12 with it) |
| 21 | « Exigence 2 : « Dans la vue des stations vides ... » : critère d'acceptation » | nowhere: storyline facts and a teaching device (its path to concept 8 with it) |
| 24 | « L'exception demandée par Étienne ... » | nowhere: a teaching device; « lever la DoD pour une story pressée » merged into the row at line 8 (Pièges added); its paths to `storyline.md` and concept 0 with it |
| 26 | « Aparté : en préparant les stories de Charlotte ... » | nowhere: storyline facts and a teaching device |
| 27 | « Une DoR qui exige toutes les questions réglées, une maquette validée ... » | nowhere: a teaching device; its claims of the body are the rows at lines 32, 33 and 35; its paths to concepts 5 and 1 with it |
| 28 | « Faire avancer l'accès : relancer Sid ... » | nowhere: storyline facts |
| 38 | « DoR de l'équipe vélos ... » | nowhere: a storyline fact |
| 39 | « Story d'Étienne « voir les locations du jour par station » ... » | nowhere: storyline facts |
| 42 | « La DoD nommée au concept 0 (0a3) ... » | nowhere: a cross-reference (path to concept 0) |
| 43 | « Critère d'acceptation ou règle métier ... » | nowhere: a cross-reference (path to concept 8) |
| 44 | « Dépendances envers une autre équipe ou la DSI » | nowhere: a cross-reference (path to concept 10) |
| 45 | « Données du produit : définition d'un indicateur ... » | nowhere: cross-references (`plan.md`) |
| 46 | « Seuil « presque vide », définition d'une station vide, heures de pointe : non fixés » | nowhere: storyline facts |

- Kept and re-anchored, their reasoning dropped: 5 and 6 (L'essentiel, 11a), 7 (11a), 8 (11a,
  Pièges), 9 (L'essentiel, 11a, Pièges; « Ce qui marche » left), 10 (11a), 11 (11a, Pièges;
  its verified cell, a pointer to row 9, is now the quotation), 12 (11a), 13 (11a, Pièges:
  « La DoD évolue » was a case), 14 (11a), 15 (L'essentiel, 11a, Le test rapide), 16 (11a,
  Pièges), 17 and 18 (11a), 22 (11a, Pièges), 23 (11a), 25 (11a, Le test rapide), 29 (L'essentiel,
  11b, Pièges), 30 (11b, Pièges), 31 and 32 (11b), 33 (L'essentiel, 11b), 34 (L'essentiel, 11b,
  Pièges), 35 (11b, Pièges), 36 and 37 (11b), 40 (11b, Pièges: the claim the body makes, the
  case's expected answer left), 41 (11b, source « cours »).
- Row 9: reference S8 (session observations, link « (dépôt) ») left the row and
  « Références »: it backed the course's wording, not the claim.
- Row 18: the remark on « souvent » and « temps de réponse » left the cell: « Non vérifié »
  holds it, as on `main`.
- Row 22: reference S10 (the course glossary, link `glossary.md`) and the path to concept 8
  (which states the distinction as a course choice) became the source « cours ». Row 33 lost
  S10 (the glossary) too; S10 left « Références ».
- Row 34: S5 and S6 left it: S6 had no quotation in the row, and S5's only quotation is the
  word « apparently ». S5 (Scrum Patterns) left frontmatter `stances.school[1]` and
  « Références »: its title, link and date are in the « Non vérifié » entry on the first
  author of the DoR. The « ready-ready / done-done » parallel of row 33 left: a wording of the
  course.
- Row 37: « Relu le 2026-10-24 » moved to S6's « consultée le »; Cohn's velocity remark
  (« non repris »): nowhere.
- Paths copied (Done when): rows 5, 12, 29, 31 cited concept 0, row 14 concept 8, for the
  Scrum Guide 2020: S1 kept (the deviation accepted on #304), its quotations at the places
  checked on 2026-10-30.
- « Non vérifié »: every entry now opens with its section; none removed; the first entry now
  carries S5's description.

## 12-donnees-produit

Body of `concept.md`: unchanged.

| Line | Row | Went to |
|---|---|---|
| 5 | « Ni le Scrum Guide ni les référentiels du PO ne disent comment définir un indicateur ... » | frontmatter `stances.consensus[0]`: S11 split into S11 and S11b (absences); the path to concept 2 became S1, concept 2's Scrum Guide copied, with its quotation |
| 9 | « Données personnelles : finalité et minimisation sont des principes du RGPD » | merged into the rows at lines 37 and 38 (12c), and frontmatter `stances.consensus[1]` |
| 15 | « Corrigé « vélos disponibles par station » ... » | nowhere: storyline facts and a teaching device |
| 16 | « Exercice « locations par quartier » pour Charlotte ... » | nowhere: storyline facts and a teaching device (its path to concept 8 with it) |
| 18 | « La DoD de l'équipe vélos exige que chaque indicateur publié ait sa définition écrite ... » | nowhere: a storyline fact; « la DoD exige la définition, elle n'en fixe pas les règles » is a wording of the course (its paths to `storyline.md` and concept 11 with it) |
| 19 | « La mesure de résultat de l'objectif produit est aussi un indicateur ... » | nowhere: storyline facts (its path to concept 2 with it) |
| 20 | « Brouillon d'Anna ... » | nowhere: a teaching device |
| 21 | « Exclure les vélos signalés en panne invente une règle ... » | nowhere: a storyline fact (its path to concept 8 with it) |
| 22 | « Écrire la requête ou la jointure au lieu de la définition ... » | merged into the row at line 10 (Pièges) |
| 23 | « La comparaison au même mois de l'an dernier (story B) ... » | nowhere: a teaching device; « une fois, pour l'indicateur » is the row at line 17 (its path to concept 10 with it) |
| 24 | « Fraîcheur des locations par quartier : à demander à Charlotte » | nowhere: a storyline fact |
| 25 | « La vue des locations du jour d'Étienne ... » | nowhere: a storyline fact |
| 26 | « La story de Charlotte ne remplit pas la DoR ... » | nowhere: a teaching device (its path to concept 11 with it) |
| 31 | « Nombre de vélos signalés par semaine, regardé par Maud ... » | nowhere: storyline facts and a teaching device (its path to concept 10 with it) |
| 32 | « Ce qui compte comme « en panne » ... » | nowhere: a cross-reference |
| 34 | « Mesurer une dimension, c'est poser une règle chiffrable » | merged into the row at line 33 (12b, Pièges) |
| 40 | « Pour les locations par quartier, l'identifiant de l'abonné n'est pas nécessaire ... » | nowhere: storyline facts and a teaching device |
| 41 | « Pas la colonne du vélo pour cette finalité ... » | nowhere: storyline facts and a teaching device (its path to concept 11 with it) |
| 43 | « « On l'anonymisera dans l'entrepôt » ... » | nowhere: a teaching device; the claim of the body is the row at line 36 |
| 46 | « Un indicateur est une valeur calculée par le produit, un livrable ... » | frontmatter `neighbors[0]` (no reference: concept 2 states it as a course choice) |
| 47 to 52 | cross-references to concepts 2, 8, 10, 11, 14, 15 and unfixed storyline facts | nowhere |

- Kept and re-anchored, their reasoning dropped: 6 (L'essentiel, 12b), 7 (12b), 8 (12b; S3
  added to its source cell, since its cell quoted S3), 10 (L'essentiel, 12a1, Pièges), 11
  (12a1), 12 (12a1), 13 (12a1), 14 (12a1, 12b), 17 (12a2, Pièges), 27 (12b), 28 (12b), 29 (12b,
  Pièges, Le test rapide), 30 (12b, Pièges; the storyline part left), 33 (12b, Pièges), 35 (12c),
  36 (12c, Pièges), 37 and 38 (12c), 39 (12c, Pièges, Le test rapide), 42 (12c, Pièges), 44 (12c:
  the claim the body makes, Sid and the storyline left), 45 (12c, Pièges).
- Row 6: « There are six core data quality dimensions, as defined by DAMA UK » is on the
  framework page (S4), not on S3, as checked on 2026-10-30; the row now cites it to S4. S5
  (DAMA NL) had no quotation: it left the row.
- Row 7: S5 left; its claim (other lists, some much longer) now rests on S4's « This is not a
  prescriptive list ... », found on 2026-10-30 (a quotation added); the dates of DAMA UK and of
  the DMBOK 2: nowhere, the body does not date them.
- Rows 10 and 22: the path to concept 1 became S1 (the Scrum Guide 2020, copied from concepts 1
  and 2, whose descriptions are identical), with concept 1's quotation, at the place checked
  on 2026-10-30; `plan.md` left.
- Rows 11, 12, 29, 35: reference S10 (the course glossary, no link) became « cours » or left;
  S10 left « Références ».
- Row 14: its path to concept 8 (a freshness in an acceptance criterion) left: the body of
  concept 12 does not state it.
- Rows 17 and 29: the paths to concepts 11 and 8 (Cohn's page on DoD and conditions of
  satisfaction, the same description in both) became S14, copied, with their quotations.
- Row 33: its path to concept 7 (the vague word, a course choice there) left the source.
- Row 36: S13 (the 2025 ruling, read through commentaries) had no quotation: it left the row,
  frontmatter `stances.consensus[1]` and « Références »; its link is in the « Non vérifié »
  entry on the ruling.
- Frontmatter: `stances.consensus[0]` lost S5 and gained S1 and S11b; `stances.consensus[1]`
  lost S13 and gained S6b; `stances.school[0]` lost S5. The author of `stances.consensus[0]`
  still names DAMA NL: a « Non vérifié » entry says its claim has no quotation.
- Links with two places: S6 split into S6 (chapter I, art. 4) and S6b (chapter II, art. 5); S7
  into S7 (recital 26) and S7b (the EDPB release); S11 into S11 (CSPO) and S11b (PSPO). Each
  quotation of `main` names its article, recital or source, so each went to its own reference.
- The paragraph under « Références » (« Pas de S1 ... ») left: the concept now cites S1.
- « Non vérifié »: every entry now opens with its section; the DAMA NL entry is new (S5's
  description); the entry on the 2025 ruling now carries S13's link.
