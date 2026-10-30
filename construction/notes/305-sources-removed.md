# #305: what left the sources of concepts 6 to 8

The rows of « Affirmations », the references, the frontmatter `refs` and the « Non vérifié »
entries that the sources pass of concepts 6 to 8 removed, re-anchored or changed, and where
their matter went (#305, SPEC 4.4 and 4.1). Destinations: a frontmatter item (its `refs` and
`verified`), another row of the same file (merged), « Non vérifié », `concept.md` (a gap: none
in this slice), or nowhere (not a claim of the body of `concept.md`). Line numbers are the
lines of `sources.md` on `main` at `298fb36`. No `concept.md` body changed: every row kept is a
claim the body already makes.

In every concept: the header « Ce qui a été vérifié » became « Vérifié »; every verified cell
kept holds quotations and their place only (the reasoning, the pointers to other files or
concepts and the « en partie » or « appui » mentions left); « aucune » became « cours »; each
« Non vérifié » entry opens with its sections, its bold title rewritten as plain text. No
source was reread. Places: those `main` holds (« (chapitre 3, premier paragraphe) »,
« (définition du produit) », « (conclusion) », « (T) », « (N) » for Wake in concept 8, and the
Scrum Guide « (Product Backlog) » and Jeffries « (Confirmation) » that concepts 1, 3, 4 and 5
hold for the same quotations); « (page) », « (article) » or « (extrait) » where `main` names
no section.

## 06-roles-personas

| Line | Row | Went to |
|---|---|---|
| 9 | « Les rôles utilisateurs viennent du usage-centered design ; les personas, de l'interaction design » | frontmatter `stances.school[0]` and `school[1]` (the S2 quotation); the body does not name the usage-centered design; « venu du design d'interaction » (6b) is covered by the row « Le persona est un choix d'école » (row 17, S2) |
| 18 | « Exemple du fil rouge en 6a : Étienne… Régis… » | nowhere: a storyline fact |
| 21 | « Le persona se construit à partir d'utilisateurs réels interrogés » | « Non vérifié » (6b, Pièges): S7 held a paraphrase, no quotation; S8 had none either |
| 22 | « Les personas viennent d'Alan Cooper » | merged into row 17 (6b); its S6 quotation (« first published in 1998… ») in `stances.school[1]` |
| 24 | « Les personas sont critiqués » | « Non vérifié » (6b): the S7 « Criticism » section is paraphrased, not quoted |
| 26 | « Le trait qu'Anna veut ajouter » | nowhere: a teaching device (a case of the bank) |
| 29 | « Les trois parties de la story, les 3C, la solution hors du « je veux », le chiffre précis » (path to concept 5) | nowhere: not a claim of concept 6's body (only `teaching.md` names them, to say they are not retaught) |

- Row 5 (Scrum Guide silent): re-anchored from « Consensus et choix d'école » to 6a, 6b,
  Pièges; its search and the « well-defined users or customers » quotation also settle
  `stances.consensus[0]`.
- Row 6 (« Un rôle est une catégorie… »): source [S2], [S3], [S4] en partie -> « cours »: no
  quotation settles the definition, which is the course's.
- Rows 7, 8: re-anchored to 6a, Pièges; row 8 lost its section « banque « Une vue, deux
  acteurs » ».
- Row 10 (« agit et y gagne »): [S5] en partie -> [S3], [S5]; the reasoning left the cell.
- Row 11: the consumer-of-data part left for its own row (row 28 below); re-anchored to 6a,
  Pièges, Le test rapide.
- Row 12: [S3] en partie -> [S3], re-anchored to 6a, Pièges, Le test rapide.
- Rows 13, 14: « aucune » -> « cours ». Row 15: the « Théo ou Maud ? » part left (a case of
  the bank). Row 16: lost its section « banque ».
- Row 17: S7 left it (Wikipédia « crédite Cooper », no quotation); « Absent du Scrum Guide »
  left (row 5 holds it); re-anchored to 6b, Pièges.
- Row 19: the reasoning on « d'un rôle » left the cell.
- Row 20: « prénom » and S8 left it (S8 held a paraphrase of « Kathy »); the claim now reads
  « des objectifs et des comportements »; the prénom is in « Non vérifié » (L'essentiel, 6b).
- Row 23: re-anchored to 6b, Pièges; its S6 quotation now the one row 17 holds
  (« Whether you hate or love this idea as a development tool, you can thank me. »; row 23
  read « whether you hate or love this idea »).
- Row 25: [S6], [S7] en partie, nature `école` -> « cours », nature `cours`: neither quotation
  settles « fictif par son prénom, pas par ses traits », which the body states as a deduction;
  « un utilisateur réel (Théo) » left (a case of the bank).
- Row 27: lost « renvoi aux concepts 7 et 8 »; « aucune » -> « cours ».
- Row 28 (path `concepts/01-produit-et-po/sources.md` [S2]): concept 1's S2 (Dehghani) copied
  identically as S9, with the quotation of concept 1's row and the place « (article) » that
  concept 1's frontmatter gives it; re-anchored to 6a, Pièges.
- Row 30 (path `concepts/04-hierarchie/sources.md`): concept 4 sources « un « je veux » » as
  « cours » (its test of counting the « je veux »), so no reference to copy; source « cours ».
- Reference S4 (Cohn, « Adding Decorated User Roles… ») left: its quotations (« first class »,
  « first-time visitor ») settle no claim of the body, and no row or item cited it.
- Reference S8 (Rysen and whichframework.org, two links) left: no quotation of it exists; both
  pages, with their link, are named in the « Non vérifié » entry on « Kathy ».
- Frontmatter `neighbors[0]` (proto-persona) lost S7: no quotation, only the word
  « proto-persona »; « Non vérifié » (6b, Pièges, Consensus et choix d'école).

## 07-invest

| Line | Row | Went to |
|---|---|---|
| 8 | « Grille reprise par d'autres praticiens, dont Cohn » | frontmatter `stances.consensus[1]` (S3); S1's « popular enough » nowhere; S6 (Microsoft cites INVEST, no quotation) in « Non vérifié » (Cohn's book entry) |
| 11 | « Wake inscrit INVEST dans les 3C de Jeffries » (path to concept 5) | frontmatter `stances.consensus[1]` (S1's quotation); the body does not state it; the path named where the 3C are taught, and Wake's own quotation settles the item, so no reference was copied |
| 13 | « I, illustration : la story d'Abba dépend de l'équipe appli » | nowhere: a storyline fact |
| 20 | « S, exercice « Huit jours, trop gros ? » » | nowhere: a case of the bank; « Smaller stories tend to get more accurate estimates » is not in the body; sizing by the Developers stays in row 10 |
| 24 | « Exercice « Heures de pointe » » | nowhere: storyline facts and a case of the bank; the E, S, T link stays in rows 16, 17, 21, 22 |
| 25 | « « Heures de pointe » sert aussi à la mesure de l'objectif produit » (path to concept 2's `concept.md`) | nowhere: not in the body; storyline facts |
| 26 | « Spike : vient d'XP… » | frontmatter `stances.school[1]` (S1, S4); the body does not name the spike |
| 27 | « Spike : son usage varie selon les écoles » | frontmatter `stances.school[1]` (S6) |
| 33 | « Un critère qui nomme une solution la fige » | merged into row 32 (« Écrire la solution dans la story, ou dans un critère… », 7b, Pièges) |
| 34 | « Le canal relève de l'équipe appli » | nowhere: a storyline fact |
| 35 | « Mots flous typiques et exemple du régulateur sur un petit écran » | nowhere: invented examples |
| 36 | « Story d'Abba… un tiers des abonnés… » | nowhere: storyline facts and a case of the bank |
| 37 | « Règles fixées : vélo disponible… » | nowhere: storyline facts |

- Row 5: re-anchored to L'essentiel, Pièges; « Wake remercie Mike Cohn » left (no quotation).
- Row 6: S3 left it (« concorde », no quotation); 7a -> 7a1.
- Row 7: re-anchored to Pièges; it also settles `stances.consensus[0]`.
- Row 9: re-anchored to L'essentiel, Pièges; S3's « reformuler » paraphrase left.
- Row 10 (path `concepts/01-produit-et-po/sources.md`): concept 1 cites the Scrum Guide 2020
  as its S1, identical to S2 here (description, link, type, consulted on): S2 kept, the
  quotation of concept 1 copied with the place « (Product Backlog) » that concept 1's
  frontmatter gives it; re-anchored to 7a1, Pièges; order [S2], [S1].
- Row 14: split in three: V for Wake (S1, the reasoning left), V for the user as the
  course's reading (« cours », nature `cours`), and a row for the Agile Alliance's
  « Valuable (or vertical) » (S3, 7a1, nature `fait`), a claim the body makes.
- Rows 12, 15, 16, 17, 21: 7a -> 7a1 (and 7a2, Pièges where the body says it); row 16 lost
  « banque « Heures de pointe » ».
- Row 18: S7 left it; re-anchored to 7a1, Pièges.
- Row 19 (path `concepts/04-hierarchie/sources.md`): concept 4 sources « tient dans un sprint »
  as « cours »: nothing to copy; the computation on the storyline team left the cell.
- Row 22: [S1] en partie and `[c7]` -> « cours » (the body marks it [cours]).
- Row 23 (path `concepts/04-hierarchie/sources.md`): concept 4's S1 (Scrum Guide 2020) is
  identical to S2 here: S2 kept; the quotation was already this row's; lost « banque ».
- Row 28: lost « banque « Le SMS d'Abba » »; re-anchored to 7a1, 7b.
- Rows 29 and 32 (path `concepts/05-user-story/sources.md`): concept 5's S2 (Cohn, « Why the
  Three-Part User Story Template Works So Well ») copied identically as S8, with the quotation
  of concept 5's row « Pas de solution dans le « je veux » »; S1 en partie -> S1.
- Rows 30, 31: « aucune » and [S1] en partie with `[c8]` -> « cours »; Wake's treatment of
  non-functional requirements (no quotation) went to « Non vérifié » (7b, Pièges).
- Row 38: [S1] en partie -> [S1].
- Reference S7 (web search results, no URL) left: no quotation; the search is described in the
  « Non vérifié » entry on « quelques jours ».
- Frontmatter `stances.course[3]` lost S1: no quotation of Wake settles the constraint in a
  criterion; « Non vérifié » (7b, Pièges, Consensus et choix d'école).

## 08-criteres-regles

| Line | Row | Went to |
|---|---|---|
| 5 | « Le Scrum Guide ne parle pas de critère d'acceptation… » | frontmatter `stances.consensus[0]`; the body does not mention the Scrum Guide; « story » absent copied from concept 5's search of the same guide |
| 6 | « Une story porte des critères d'acceptation : pratique établie » | frontmatter `stances.consensus[1]` (S2, S3, S4) |
| 7 | « Critère d'acceptation et condition de satisfaction : presque synonymes » (empty section) | frontmatter `stances.consensus[1]` (S4); the body does not say it |
| 8 | « C'est le PO qui écrit les critères » (empty section) | frontmatter `stances.consensus[1]` (S4) |
| 10 | « Le BDD vient de Dan North » | merged into row 9 (8b1, North's quotation); S10's BDD quotation nowhere (below) |
| 13 | « Specification by Example, popularisé par Adzic » | frontmatter `stances.school[1]` (S8); Fowler (S9) to « Non vérifié » |
| 19 | « Le cas du schéma est inventé » | nowhere: an invented example |
| 20 | « Example Mapping : règles en bleu, exemples en vert, questions en rouge » | the row « une règle non fixée reste une question » (8a2, S7's quotation from row 23); the colours to « Non vérifié »: no quotation |
| 31 | « Un Then qui exclut le vélo signalé en panne invente une règle » | nowhere: storyline facts and a case of the bank |
| 32 | « « Pas de smartphone » est trop large… » | nowhere: a case of the bank |
| 34 | « La story attend tant qu'une règle n'est pas fixée » (path to concept 7) | merged into row 23 (below) |
| 35 | « Les 3C : la confirmation est le critère d'acceptation » (path to concept 5) | frontmatter `stances.consensus[1]` (S2, Jeffries, identical to concept 5's S3 but for its consulted-on remark: kept); the body does not name the 3C |
| 37 | « Dépendances (10) et DoR (11) : nommés avec renvoi » | nowhere: pointers, not claims |

- Rows 9, 11, 12, 24: re-anchored from « Consensus et choix d'école » or 8b to 8b1 (and
  Pièges for row 11); row 12 lost its writing advice and now reads as 8b1 does (« Cucumber
  et son langage Gherkin outillent Given/When/Then »); row 9 lost the publication history
  (the reference holds it).
- Row 14: S11 (the course glossary) left; L'essentiel -> L'essentiel, 8a1.
- Row 16: S11, S6 and S7 left: « cours »; Gherkin's Rule quotation went to
  `stances.school[2]` and a « Non vérifié » entry (8a1).
- Row 17: S6 left it (« Scenario is a synonym… » does not settle it); « Schéma » -> 8a1.
- Row 18: « aucune » -> « cours », re-anchored to 8a1, Le test rapide.
- Row 21: [S3] en partie -> [S3], re-anchored to 8a1, Le test rapide.
- Row 22: [S3] -> « cours » (the body marks it [cours]; Wake's N quotation stays in
  `stances.course[2]`); 8a and « banque » -> 8a1.
- Row 23 and row 34: one row (L'essentiel, 8a2, Pièges). Row 34 cited concept 7's row on the
  vague word, whose source is the Scrum Guide 2020 (concept 7's S2), identical to S1 here: S1
  kept, concept 7's quotation copied. Row 23's S7 quotation went to the Example Mapping row
  and `stances.course[4]`; the storyline DoR and « presque vide » left.
- Rows 25, 26: S12 (teaching session observations) left; re-anchored to 8b1, Pièges.
- Row 27: S12 -> « cours »; Gherkin's « 3-5 steps per example » stays in `stances.course[1]`.
- Row 28: storyline facts left; the row keeps the claim of the body (a result observable by
  the user, not a means), [S6], [S3].
- Row 29: [S3] en partie -> « cours ». Row 30: empty section -> 8b1, Pièges.
- Row 33: S2, S3 left (no quotation says no form is imposed); [S10] en partie -> [S10].
- Row 36 (path `concepts/11-dor-dod/sources.md`): concept 11's S3 (Cohn, DoD and conditions of
  satisfaction) is identical to S4 here: S4 kept, concept 11's quotation « Think of the
  definition of done as a special set of acceptance criteria… » copied; the storyline DoR and
  `storyline.md` left; re-anchored to 8a1, Pièges.
- Reference S8: its second link (`https://gojko.net/books/specification-by-example/`) left; the
  description still names both pages. Which page carries the quotation is not recorded.
- Reference S9 (Fowler) left: no quotation; « Non vérifié », with its link. Frontmatter
  `stances.school[1]` lost S9.
- Reference S10: its second link (`https://www.agilealliance.org/glossary/bdd/`) left, and with
  it the quotation « BDD is a practice where members of the team discuss the expected behavior
  of a system »; the description still names both entries. Which page carries the other
  quotations is not recorded.
- References S11 (the course glossary, link `glossary.md`) and S12 (teaching session
  observations, link « (dépôt) ») left: internal, not sources; the claims they backed cite
  « cours ».
- Frontmatter `stances.course[1]` lost S5: North's ATM example is paraphrased, not quoted;
  « Non vérifié » (8b2).
- « Non vérifié »: the entry on SPIDR and Richard Lawrence left: not a claim of concept 8,
  which does not name them (concept 9 sources them). New entries: Fowler, Gherkin's Rule, the
  colours of Example Mapping.
