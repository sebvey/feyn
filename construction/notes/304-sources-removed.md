# #304: what left the sources of concepts 3 to 5

The rows of « Affirmations », the references, the frontmatter `refs` and the « Non vérifié »
entries that the sources pass of concepts 3 to 5 removed, and where their matter went (#304,
SPEC 4.4 and 4.1). Destinations: a frontmatter item (its `refs` and `verified`), another row of
the same file (merged), « Non vérifié », `concept.md` (a gap: none in this slice), or nowhere
(not a claim of the body of `concept.md`). Row numbers are the lines of `sources.md` on `main`
at `cece54b`. No `concept.md` body changed: every row kept is a claim the body already makes.

Every verified cell kept now holds quotations and their place only, as SPEC 4.4 says: the
reasoning and pointers to other files or concepts it held were dropped; the reasoning that is a
writing instruction already shows in the body.

## 03-backlog-produit

| Line | Row | Went to |
|---|---|---|
| 7 | « Le backlog produit est un des trois artefacts ; son engagement est l'objectif produit » | frontmatter `stances.consensus[0]` (the quotations of S1); the body states no such claim |
| 11 | « Le backlog « appartient » au PO » | merged into the row « Le PO répond du backlog » (Pièges added); the 2017 quotation (S2) nowhere: the body does not contrast 2017 and 2020 on this |
| 15 | « Ce concept vaut aussi pour une équipe sans sprint » | frontmatter `stances.course[0]` (S6, S7); « Non vérifié » kept, its head now « Consensus et choix d'école » |
| 19 | « Un travail pris hors du backlog fait glisser le reste sans décision » | nowhere: a deduction of the case « Maud passe par Diego »; « ce qui n'y figure pas, l'équipe ne le fait pas » stays in the row « seule source de travail » (3a1, Pièges) |
| 21 | « Le haut est en général précisé avant le Sprint Planning ; l'équipe peut encore le préciser pendant » | nowhere: only the case « Tout détailler d'avance ? » says it |
| 22 | « La Definition of Ready : conditions qu'une équipe fixe elle-même » | merged into the row « Prêt à être choisi » (3a2, Pièges) and frontmatter `neighbors[0]` |
| 30 | « Réunir les parties prenantes pour recueillir leurs besoins » | nowhere: a teaching device of the case « Le plan de l'année »; the PO deciding the place stays in the row « Le PO répond du backlog » |
| 33 | « Schéma : colonne de cartes… » | nowhere: the drawing instruction of `teaching.md`; each claim it draws has its own row (3a, 3b) |

- Row 16, DEEP, stays: re-anchored at 3a2, which states it; Rubin's attribution of DEEP to
  Pichler (no quotation) left the row and is in « Non vérifié » (date of DEEP).
- Row 20, « Détailler tôt le bas du backlog », stays, nature `école` -> `cours`: the body marks
  the claim « [cours] » (3a2).
- Row 25, « On n'en remplit qu'une partie au début »: S5 left it (Rubin's « Prioritizing beyond
  that is likely a waste of effort » does not settle it); nature `fait`, what the replaced
  2017 guide stated.
- Row 26, « On ne le dépile pas »: S3 left it (the revision history does not say the order
  changes).
- Reference S5: its second link (InformIT extract,
  `https://www.informit.com/articles/article.aspx?p=1928232&seqNum=3`) left the link column; the
  description says the chapter was also read there. Which quotation came from which page is
  not recorded, so no S5b was made.
- Reference S8: the « consultée le » cell lost its path to `concepts/00-scrum/sources.md`.
- « Non vérifié »: the entry on the iceberg image left: neither `concept.md` nor `teaching.md`
  uses the image. The pointer to `concepts/00-scrum/sources.md` left the French-terms entry.

## 04-hierarchie

| Line | Row | Went to |
|---|---|---|
| 6 | « Découper un élément en éléments plus petits fait partie du refinement » | frontmatter `stances.consensus[0]` (S1) |
| 13 | « Feature : une capacité qui sert seule à l'utilisateur » | « Non vérifié » (L'essentiel, 4a1): S2 was a reformulation of a summary, S4 had no quotation |
| 29 | « SAFe vise plusieurs équipes ; une équipe seule n'a pas besoin de ses niveaux » | merged into the row « SAFe ajoute des niveaux » (4a2) |
| 30 | « Exemple du fil rouge : la journée d'Étienne » | nowhere: a storyline fact |
| 31 | « Les libellés de l'arbre du Schéma » | nowhere: an invented example of the drawing |

- Rows 8 and 27 cited `concepts/00-scrum/sources.md`, `concepts/01-produit-et-po/sources.md`
  and `concepts/03-backlog-produit/sources.md`: the reference those concepts cite there is
  the Scrum Guide 2020, the same work and URL as S1 here, which was kept rather than copied
  (concept 0's S1 differs in its description and consulted-on date, concept 3's in its
  consulted-on remark: a deviation from the ruling, raised in the PR); the quotations of
  their verified cells were copied (« composed of the Sprint Goal (why)… », « a plan by and for
  the Developers », « It is the single source of work undertaken by the Scrum Team. »).
- Row 12, « La frontière entre niveaux est floue »: kept as « Aucun seuil ne sépare les
  niveaux » (4a1, S2); « feature » with no single sense, and S6 (no quotation), went to
  « Non vérifié » (4a1, 4a3, Consensus et choix d'école).
- Row 14, thème: S6 left it (no quotation).
- Row 18, « Chaque équipe choisit ses niveaux »: S4 left it (no quotation); « Non vérifié »
  (4a2).
- Row 7, « La tâche »: narrowed to what the body says (the Developers plan the work of each
  item); « un jour ou moins » and « à leur seule discrétion » stay in
  `stances.consensus[0]`, which quotes them.
- Row 19, « Une story tient dans un sprint »: S2 left it (a deduction, no quotation); split in
  two rows, « tient dans un sprint » (L'essentiel, 4a1, « cours ») and « aucune durée en
  jours » (Pièges, S7), since Wake's « at most a few person-weeks » settles only the second.
- Rows 20 to 25 and 28: the internal reference S8 (session improvements, `[c4]`) and the
  « appui partiel » mentions became the source « cours ».
- Reference S6 (Wikipédia, « User story ») left: no row or item quotes it any more; its
  matter is in « Non vérifié ». Frontmatter: `stances.school[0]` and `neighbors[0]` lost S6.
- Reference S8 (internal, link « (dépôt) ») left: course claims cite « cours ».
- Frontmatter `stances.course[1]` lost S2: no quotation says Cohn finds the feature
  superfluous; « Non vérifié » (4a1, 4a3, Consensus et choix d'école).
- « Non vérifié »: the entry on Beck's *Extreme Programming Explained* left: the origin of the
  story is not a claim of concept 4 (concept 5 keeps its own entry).

## 05-user-story

| Line | Row | Went to |
|---|---|---|
| 20 | « Cohn recommande le modèle tout en disant qu'il n'est pas obligatoire » | merged into the row « Ce format est un choix d'école devenu courant » (5a1, Pièges) |
| 26 | « Exemples du fil rouge en 5a et 5b » | nowhere: storyline facts |

- Rows 5, 6, 7, 9, 10, 14: re-anchored from « Consensus et choix d'école » to 5a1, 5a2 or
  Pièges, which state them.
- Row 6: its quotation now reads « an ongoing activity to add details, such as a description,
  order, and size. Attributes often vary with the domain of work. », the wording of the Scrum
  Guide 2020 quoted in `03-backlog-produit/sources.md` (row 6 had « adding details »).
- Row 7: S5 left it (dates only, no quotation; « Non vérifié » kept). Row 9: S5 and S6 left it
  (no quotation); Londres and 2001 are in « Non vérifié » (5a1). Row 11: S2 left it (no
  quotation).
- Row 28, « Une story exprime un besoin, pas le parcours entier »: S9 (Patton, a copy of
  concept 2's S17, whose verified cell holds no quotation) left; the source is « cours ».
  S9 left « Références » and frontmatter `neighbors[0]`; « Non vérifié » (L'essentiel, Pièges,
  Consensus et choix d'école).
- Frontmatter `stances.consensus[1]` lost S5, `stances.school[0]` lost S5 (no quotation; S3,
  S4, S2 and S6 settle the items).
- Rows 19, 23, 24, 25, 27, 30, 31, 32: « aucune », « aucune ici », « [S2] en partie » became
  « cours ». Rows 22 and 29 kept their reference ([S7], [S2]) without « en partie ».
