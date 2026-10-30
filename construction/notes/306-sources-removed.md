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
