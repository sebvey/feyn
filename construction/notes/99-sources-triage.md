# 99: what `sources.md` is for, and the triage of concept 9

Issue #99, 2026-10-28. The rule was agreed point by point by the maintainer in the orchestrator's
work session of 2026-10-28 and is recorded as decision `where-a-claim-goes`
(`specs/linear-course/decisions/`). This note applies it to concept 9 on paper: nothing under
`courses/` is edited. The application to the course is #140, the spec and check change #141,
the writing tools #142.

## 1. What each build reads in `sources.md`

| Build | Reads | Why |
|---|---|---|
| site | the « Affirmations » rows whose section is in `concept.md` or is `headings.stances` (the `cours` ones included), and the « Références » they cite | they justify what the reader reads; a row that names a case or a hint of an answer is teacher-only |
| classroom | the whole file (`course/concepts/**` is copied as is, design `05-teacher-classroom.md`) | the teacher answers « d'où ça vient ? » from it (rule `origin-from-sources-file`) and says what « Non vérifié » holds for the claim (rule `unverified-part-told`) |

« Non vérifié » is never built for the reader. This keeps the one filter of decision
`reader-facing-and-teacher-only-files` and gives it a ground stronger than "its items carry no
section": under the rule, « Non vérifié » holds only guardrails, which are for the writer and
the teacher.

## 2. The rule

Five tests, in order, per claim (the decision has the full wording):

1. A storyline fact leaves `sources.md`: its place is `storyline.md` and « Faits du fil rouge
   utilisés » of `teaching.md`.
2. The reader text states it (`concept.md`, frontmatter `stances` and `neighbors`): a row of
   « Affirmations » with its `concept.md` section or `headings.stances`; a choice or an example
   of the course has nature `cours`.
3. Only `teaching.md` states it: if the learner must know it, it is a gap of the course (add it
   to `concept.md`, then test 2); a teaching device (a deduction, an invented example) has
   nature `cours` and its row stays teacher-only. Concept 9 showed a third case the agreed wording
   left implicit: a sourced claim the teacher gives only on demand (row 22, « Réserve, sur
   demande ») keeps its sources and stays teacher-only. The decision states it.
4. No source settles it and the course does not state it: « Non vérifié », written as a
   guardrail.
5. The trace of a removed claim: dropped; git history is the trace.

Two consequences used in the triage: a row's parenthesis names sections of one file only (a
`concept.md` section for a test 2 row, a `teaching.md` section or case title for a test 3 row),
so a case title never reaches the site; and a claim the course states as a fact that no source
settles fits no test: it is sourced, rewritten into a guardrail, or removed (none in concept 9).

## 3. « Non vérifié »

- **What it holds**: what must not be asserted, and why, written as an instruction (« écrire X,
  pas Y », « ne pas dater »). It serves the teacher who speaks and whoever writes or fixes the
  course. The course does not make the claim.
- **How an entry without a source is named**: it is not named after a source. No source « the
  model's knowledge »: a guardrail rests on the absence of a source, and an example of the
  course is a claim of nature `cours` in « Affirmations », whose source cell says « cours »
  (#141).
- **The criterion for keeping one**: test 4. The course does not state the claim, no consulted
  source settles it, and the entry says what to write or avoid. An entry the course states moves
  to « Affirmations » (test 2); a trace with no wording to protect is dropped (test 5).

## 4. Counts

The issue says 39 claims, the orchestrator's brief 38: there are **39** « Affirmations » rows
(the S1-02 prototype note and the S1-09 report say 39 too). The issue's comment says 11
« Non vérifié » entries: there are **10** bullets. Rows are numbered here from 1 (« Le Scrum
Guide ne parle ni de tranche verticale… ») to 39, in file order.

| Outcome | Rows | Entries |
|---|---|---|
| stays | 20 (19 by test 2, 1 by test 3: row 22) | 7 (test 4), 2 of them to reword as instructions |
| re-sectioned (test 2) | 16 | |
| nature becomes cours (test 3) | 2 | |
| leaves the file (test 1) | 1 | |
| moves to `concept.md` (test 3, gap) | 0 | |
| dropped | 0 | 3 (1 by test 2, 2 by test 5) |
| **total** | **39** | **10** |

Concept 9 has no test 3 gap: every claim the learner must know is already in `concept.md`, and
the teacher-only rows are teaching devices or a reserve. Row 12 (« Le PO juge la story sur ses
critères ») looked teacher-only by its section (« Les tâches de Dana »), but 9a2 states it: it
is re-sectioned, not a gap.

## 5. « Affirmations », row by row

"Re-sectioned": the reader text states the claim, and the parenthesis names something that is
not its `concept.md` section (a case, a case field, a `teaching.md` section, an old heading).

| # | Claim (first words) | Parenthesis today | Test | Outcome | What changes |
|---|---|---|---|---|---|
| 1 | Le Scrum Guide ne parle ni de tranche verticale… | Consensus et choix d'école | 2 | stays | |
| 2 | Découper un élément en éléments plus petits… | Consensus et choix d'école, renvoi au concept 4 | 2 | stays | |
| 3 | L'incrément doit être utilisable | Consensus, appui | 2 | re-sectioned | « Consensus, appui » is no heading: (Consensus et choix d'école) |
| 4 | Que chaque story soit une tranche verticale… | Consensus et choix d'école, Choix du cours | 2 | stays | `stances.course` |
| 5 | Découper par valeur plutôt que par couche… | Consensus et choix d'école | 2 | stays | |
| 6 | La métaphore du gâteau en couches… | Consensus et choix d'école, 9a | 2 | stays | |
| 7 | Origine des mots : les couches s'empilent… | 9a | 2 | stays | |
| 8 | Une couche seule ne sert pas seule… | L'essentiel, Schéma, 9a1 | 2 | re-sectioned | « Schéma » is `teaching.md`: (L'essentiel, 9a1) |
| 9 | Être vertical par les couches ne suffit pas… | L'essentiel, Pièges | 2 | stays | already `cours` |
| 10 | « Tranche » est une façon de découper… | Consignes 9a1 et 9a2, Banque 9a1 et 9a2, Pièges | 2 | re-sectioned | 9a2 states it: (9a2, Pièges) |
| 11 | Le vertical s'arrête à la story… | L'essentiel, 9a2, « Les tâches de Dana », Pièges, Schéma | 2 | re-sectioned | case and « Schéma » removed: (L'essentiel, 9a2, Pièges) |
| 12 | Le PO juge la story sur ses critères… | « Les tâches de Dana » | 2 | re-sectioned | 9a2 states it: (9a2); now built for the reader |
| 13 | Les catalogues de patrons… sont des choix d'école | Consensus et choix d'école, 9b | 2 | stays | |
| 14 | SPIDR, de Mike Cohn… | 9b | 2 | stays | |
| 15 | SPIDR, D (Data)… | 9b | 2 | stays | |
| 16 | SPIDR, R (Rules)… | 9b | 2 | stays | |
| 17 | SPIDR, P et I… | 9b, si l'échange y mène | 2 | re-sectioned | 9b2 states P and I outright; the teaching hint goes: (9b2) |
| 18 | SPIDR, S (Spike)… | 9b2, Explication, renvoi au concept 17 | 2 | re-sectioned | case field removed: (9b2, Consensus et choix d'école); see 7 |
| 19 | Patrons de Richard Lawrence : neuf patrons… | 9b | 2 | stays | |
| 20 | Ces patrons sont aujourd'hui publiés par Humanizing Work… | Consensus et choix d'école | 2 | stays | |
| 21 | Lawrence, Simple/Complex… | 9b2, Explication | 2 | re-sectioned | (9b2, Consensus et choix d'école) |
| 22 | Lawrence, Defer Performance… | 9b2, Réserve sur demande… | 3 | stays | teacher-only: only the reserve of case 9b2 gives it; section the case « Prévoir les stations à risque : quel patron ? » |
| 23 | Lawrence, Variations in Data… | 9b2, Explication | 2 | re-sectioned | (9b2, Consensus et choix d'école) |
| 24 | Lawrence, Business Rule Variations… | 9b2, Réserve | 2 | re-sectioned | 9b2 and the stances (« Entre les catalogues ») state it: (9b2, Consensus et choix d'école) |
| 25 | Choisir le découpage qui permet de reporter… | 9b, conseil attribué au guide de Lawrence et Green | 2 | re-sectioned | only the stances state it, not 9b: (Consensus et choix d'école) |
| 26 | Wake, « Twenty Ways to Split Stories »… | Consensus et choix d'école | 2 | stays | |
| 27 | Le walking skeleton (Alistair Cockburn)… | Consensus et choix d'école | 2 | stays | `neighbors`; see 7 |
| 28 | Une tranche qui traverse toutes les couches sans servir seule… | Pièges, banque « Le compteur de relevés ingérés » | 3 | nature becomes cours | the principle is rows 9 and 27; what is proper to this row is the case's application (« Exemple du cours »): section the case only, teacher-only |
| 29 | Une story qui ne nomme pas l'écran… | Pièges, banque « Redécouper » | 2 | re-sectioned | Pièges states it: (Pièges) |
| 30 | Un mot flou dans la tranche… | Pièges, banque | 2 | re-sectioned | (Pièges); « fil rouge » leaves the source cell and the storyline part leaves the verification (test 1); see 6 |
| 31 | Le test rapide… | Le test rapide | 2 | stays | already `cours` |
| 32 | Couches d'un produit data… | Schéma, 9a | 2 | re-sectioned | « Schéma » is `teaching.md`, L'essentiel and `stances.course` state it: (L'essentiel, Consensus et choix d'école); source « aucune » becomes « cours » (#141); see 6 |
| 33 | Exemples du fil rouge… | (none) | 1 | leaves the file | see 6 |
| 34 | Schéma 9b, cas inventé (vue des vélos en panne d'Étienne)… | Schéma 9b | 2 | re-sectioned | 9b1 and 9b2 state it (« Ce rattachement est l'application du cours [cours] »): (9b1, 9b2) |
| 35 | Le spike livre une réponse… | 9b2, erreurs fréquentes | 3 | nature becomes cours | the first half is row 18; the rest is a deduction of the case (« déduction du cours »): section the case « Prévoir les stations à risque : quel patron ? », teacher-only. Today « 9b2 » would let the site build it |
| 36 | Les Developers estiment la taille… | 9b1 | 2 | stays | |
| 37 | Les tâches se découpent au Sprint Planning… | « Les tâches de Dana » ; Sprint Planning nommé avec renvoi au concept 15 | 2 | re-sectioned | 9a2 states it: (9a2) |
| 38 | Walking skeleton daté « années 1990 » | Consensus et choix d'école | 2 | stays | `neighbors` author |
| 39 | Les patrons SPIDR et Lawrence se recoupent… | Consensus et choix d'école, 9b2 | 2 | stays | |

## 6. « Non vérifié », entry by entry

| # | Entry | Test | Outcome | Why |
|---|---|---|---|---|
| 1 | Origine de la métaphore du gâteau | 4 | stays | a guardrail: « Écrire « on la trouve chez Wake », pas « Wake l'a inventée » » |
| 2 | Origine du terme « vertical slice » | 4 | stays, to reword | the second half is a guardrail (« ne pas en parler »); the first half (« non trouvée ») says no instruction: add one, such as not attributing or dating the term |
| 3 | Date d'origine de SPIDR | 4 | stays | « Ne pas dater SPIDR. » |
| 4 | Signature de [S5], [S7], [S9] | 4 | stays | « Ne citer que [S5] pour attribuer quelque chose à Cohn. » |
| 5 | Signature de [S4] | 4 | stays, to reword | it ends on a statement (« L'auteur des patrons de 2009 est Lawrence seul [S3] »): write it as an instruction (attribute the 2009 patterns to Lawrence alone, do not date the guide) |
| 6 | Date du walking skeleton | 4 | stays | a guardrail on how to date the term (« Cockburn, années 1990 »); row 38 sources the wording the course uses |
| 7 | Le découpage par couches serait « l'erreur la plus courante » | 4 | stays | « ne pas la reprendre comme un fait » |
| 8 | Couches d'un produit data | 2 | dropped | the course states it as its own example: it is row 32 (nature `cours`), listed twice |
| 9 | « Qualité de service différée (5 minutes avant temps réel) » | 5 | dropped | the trace of an example removed from the old concept file; what it protected (patterns named by their authors) is in the reader text (« on attribue chaque patron à son catalogue », Pièges « Mélanger les catalogues ») |
| 10 | « Elephant carpaccio » | 5 | dropped | seen on [S8], not read, absent from the course: a trace with no wording to protect |

## 7. The known cases

- **Row 33, « Exemples du fil rouge »** (source « fil rouge »): test 1, leaves the file. Every
  fact it lists is already where the rule puts it: Régis's need, the 5-minute refresh, about a
  year of history, the ingestion that exists, the centre first, the weather « source envisagée,
  pas encore collectée », Étienne's view of empty stations, and « Les découpages proposés par
  l'équipe, les tâches de Dana et le compteur de Diego sont des propositions d'exercice » are in
  « Faits du fil rouge utilisés »; the nuance on Étienne's view is in the expected answer of
  case 9a1. Nothing to move.
- **Row 30, « Un mot flou… ; fil rouge »**: the claim is stated in Pièges (« Fixer une règle en
  découpant ») and sourced by the paths to concepts 8 and 7: test 2, it stays, re-sectioned to
  (Pièges). Its storyline part (« seuil « presque vide » (3 vélos cité comme exemple, pas
  décidé) », what an empty station is, peak hours) is test 1: already in « Faits du fil rouge
  utilisés » (« Ne sont pas fixés : … »), so it leaves the row with « fil rouge ».
- **« Couches d'un produit data »**, in « Affirmations » (row 32, source « aucune », nature
  `cours`) and in « Non vérifié » (entry 8): the course states it (L'essentiel, and
  `stances.course` « sont un exemple, pas un découpage normé »). Test 2: one row, nature `cours`,
  section (L'essentiel, Consensus et choix d'école), source « cours » once #141 lands; the
  « Non vérifié » entry is dropped.
- **« Qualité de service différée »** and **« Elephant carpaccio »**: test 5, both dropped
  (section 6). Neither is a guardrail the course still needs.

## 8. Other findings for #140

Found while reading each row against `concept.md`; outside the rule, left to the pass:
- Row 18: its verification says « Ni « rarement la première » ni « dernier recours » ne figurent
  dans la fiche », yet `stances.school` now says « normalement pas la première à essayer » and
  « Pour lui, le spike est le dernier recours »; the row quotes Lawrence [S3] but its source cell
  cites only [S5] and a path. Add [S3], refresh the verification.
- Rows 25 and 26: `stances.school` says « Pour Wake, découper sert à séparer les parties de forte
  valeur de celles de faible valeur »; the quotation that supports it ([S6]) sits in row 25,
  whose source cell cites only [S4].
- Row 27 mixes a sourced definition and a course deduction (« Distinction avec la tranche
  verticale : déduction du cours »), with an empty nature: splitting it (the distinction as
  `cours`) would be cleaner.
- Several verification texts still speak of « la fiche » or « le fichier du concept » (the old
  concept file), and so does the introduction: harmless for the rule, stale after migration.

## 9. Do the writing tools read `sources.md`?

- **`course-batch`** (`.claude/workflows/course-batch.js`): the sources step writes
  `sources.md` first, from « every claim of the existing files »; the writing step is told it
  « has just been written » and that each claim it adds « has its row in sources.md »; the
  substance review checks that rows exist. So the batch reads it, implicitly. But the fix step
  (« Fix the real defects in concept.md, teaching.md and, if needed, sources.md ») is not told
  to read it before fixing. And three prompts contradict test 4: the writing step's « add it, or
  put it in « Non vérifié » », the substance review's « (or in « Non vérifié ») », and the
  sources step's « put in « Non vérifié » what you could not confirm ».
- **`/taught-check`**: the workflow modifies no file and reads only `concept.md` and
  `teaching.md`, which is enough to find what is not yet taught. But its skill (step 2) fixes
  findings on the branch without a word on `sources.md`, so a reworded claim can leave its row
  stale.
- **`migrate-concept`** (`.claude/workflows/migrate-concept.js`, rule M10): copies the old
  sources file faithfully, by design; the maintainer kept it so (option a).

Follow-up C is therefore opened: #142, "Make the concept-writing tools apply the sources rule".

## 10. Application and follow-ups

The maintainer chose option a: the migration S1-10 (#23) stays faithful, so its kept, moved,
lost and invented report stays meaningful, and a dedicated pass applies the rule to the 20
concepts afterwards. The check change lands with that pass, not before: otherwise
`check-course` fails on every migrated concept and S1-10's Done when cannot be met.

- #140 "Apply the sources rule to the course" (`type:course`, `area:course:parcours-po`),
  blocked by #23 and #99: the pass over the 20 `sources.md`, this triage as the model, test 3's
  gaps added to `concept.md`.
- #141 "Accept « cours » as a source and reject free text in the sources check"
  (`type:improvement`, `area:spec:linear-course`), blocked by #99 and #140: `SPEC.md` 4.4 and
  `sources.js`, with fixtures. Blocked by #140 so that it never lands before the course
  conforms; #140 can already write « cours » in source cells, which today's check accepts as
  non-empty text.
- #142 "Make the concept-writing tools apply the sources rule" (`type:improvement`,
  `area:agentic`), blocked by #99.
