# #308: what left the sources of concept 17 and annexes A1, A2

The rows of « Affirmations », the references, the frontmatter `refs` and the « Non vérifié »
entries that the sources pass of concept 17 and annexes A1, A2 removed, re-anchored or changed,
and where their matter went (#308, SPEC 4.4 and 4.1). Destinations: a frontmatter item (its
`refs` and `verified`), another row of the same file (merged), « Non vérifié », `concept.md`
(a gap), or nowhere (not a claim of the body of `concept.md`). Line numbers are the lines of
`sources.md` on `main` at `966d514`.

Places: a place in parentheses is one `main` held, or one checked on 2026-10-30 by fetching
the source: the Scrum Guide 2020 (all three folders); in concept 17 the CSPO objectives PDF,
Cagan's two posts, Wells, Mountain Goat's spikes page, Torres's post, the two Product Talk
glossary entries, the CRISP-DM PDF (task and page of the PDF), Ries, the PAIR chapter and the
two Google crash course pages; in A1 every Atlassian and Microsoft page but « Default
processes and process templates » (S3, copied from concept 4), the Agile Manifesto, Cohn's DoR
page, and the two Linear pages through their copy archived on 2026-10-01 (their address now
leads to « Issue properties »); in A2 the *Kanban Guide*, the *Kanban Guide for Scrum Teams*,
Kanban University's two pages and Wikipédia. « (page) » is the whole page where it has no
section. Not fetched: Scrum.org's « Product Goal » pages (concept 17 S15, S16, copied from
concept 2), concept 13's S6 (copied), the HICSS paper (A2 S8, behind a bot check).

Every verified cell kept now holds quotations and their place only: the reasoning, the
storyline remarks and the pointers to other files or concepts it held were dropped.

## 17-hypotheses-exploration

Body of `concept.md`: unchanged.

| Line | Row | Went to |
|---|---|---|
| 5 | « Scrum repose sur l'empirisme ... ce qui va arriver est inconnu » | split: empiricism kept, anchored 17a; « what will happen is unknown » kept in the row at line 32; frontmatter `stances.consensus[0]` |
| 6 | « Le Scrum Guide ne parle ni de spike ni de découverte ... » | re-anchored 17a (the body's claim: no product hypotheses, assumptions only at the retrospective); spike and discover: frontmatter `stances.consensus[0]` |
| 7 | « Repérer et valider les hypothèses du produit fait partie du travail du PO ... » | re-anchored 17a; the comparison by cost and learning (4.2): frontmatter `stances.consensus[1]` |
| 8 | « Hypothèse : ce qu'on tient pour vrai sans l'avoir vérifié » | nowhere: a definition of the course (the cited concept 2 held no quotation for it) |
| 10 | « Le lien non établi d'une demande avec l'objectif produit est une hypothèse » | nowhere: only `teaching.md` (« Consignes ») states it |
| 12 | « Cagan parle de product manager, pas de PO, et répartit les risques par rôle » | frontmatter `stances.school[0]`: the body does not state it |
| 16 | « Situation 17 : la tendance de la dernière heure ... » | nowhere: storyline facts and a teaching device |
| 20 | « Le spike sert aussi une question métier ... » | frontmatter `stances.school[1]` (S5's « how a feature should work »): the body does not state it |
| 23 | « Décider avant d'explorer la question, la mesure et ce qu'on fera ... » | split: Torres's « skip your experiment » kept, anchored 17b1; the rest: frontmatter `stances.school[3]` and `stances.course[1]` |
| 25 | « Explorer à moindre coût : prototype ... » | re-anchored 17b2 as « Cagan distingue plusieurs sortes de prototypes »; the feasibility prototype: frontmatter `stances.school[2]` |
| 28 | « Le prototype de 17b2 n'est pas le morceau c de 9b ... » | re-anchored 17b2, source « cours » (the body's claim); the piece c of 9b and the path to concept 9: nowhere, a teaching device |
| 33 | « Un critère sur un niveau atteint ... le métier garde ses propres critères » | split: the technical criterion kept (17c); the business criteria and « who assesses »: frontmatter `stances.consensus[2]` and the row at line 37 |
| 35 | « Le niveau se fixe après l'exploration ... appui, pas un consensus » | split into three rows (17c): the course's choice (« cours »), what CRISP-DM says (`fait`), what Google does (`fait`) |
| 38 | « Deux seuils à ne pas mêler ... » | re-anchored 17b1, 17c, Pièges, source « cours »; Torres, CRISP-DM and Google: frontmatter `stances.course[3]` |
| 40 | « « Prévision » a deux sens dans le cours ... » | frontmatter `neighbors[0]`; the Pièges sentence repeats the neighbour, so it has no row (SPEC 4.1) |
| 41 | « Le seuil « presque vide » relève de la même logique ... » | re-anchored 17c, Pièges as the body's claim « ce que montre l'historique ne fixe pas une règle métier », source « cours »; the threshold of the storyline: nowhere |
| 42 | « La pluie compte-t-elle ? ... » | nowhere: storyline facts |
| 43 | « Restent non fixés : station vide ... » | nowhere: storyline facts |

- Kept and re-anchored, their reasoning dropped: 9 (17a), 11 (17a), 13 (17a), 14 (17a), 15
  (17a, source « cours »), 17 (17b1), 18 (17b1, Pièges), 19 (17b1), 21 (17b1), 22 (17b1), 24
  (L'essentiel, 17b1, Pièges, source « cours »), 26 (17b2), 27 (17b2, Pièges), 29 (17b2), 30
  (17b2), 31 (17b2), 32 (L'essentiel, 17c, Pièges), 34 (17c), 36 (17c, Pièges), 37 (17c,
  Pièges), 39 (17c, Pièges).
- Paths copied (Done when): row 9, concept 2's S5 and S6 as S15 and S16, with their
  quotations; row 18, concept 9's S5 (SPIDR) as S17, with the quotations of its spike row and
  their place; row 22, concept 13's S6 as S18, with the five factors of its row 13.
- S18 re-synced after #316 merged (`main` at 2753909) with concept 13's S6 as merged: its
  « consultée le » now reads « 2026-10-22 (relu) ; 2026-10-30 (sections des citations
  relevées) » (the pointer to concept 10 left), and the row quotes « Value » ; « Cost » ;
  « Learning » ; « Risk » ; « Dependencies » (titres des facteurs 1 à 5), concept 13's row 9
  and `stances.consensus` items as merged. Description, link and type were already identical.
- Paths whose reference this concept already held: row 17 cited concept 7's S4, which is
  Wells, this concept's S4 (same page): S4 kept with its own quotations, re-read on
  2026-10-30; Wake's « (time-boxed) "spike" » (concept 7's S1) left: S5's « a time-boxed
  research activity » settles the time box.
- Paths that left: row 14's concept 12 S3 (freshness as a quality dimension: the body of
  concept 17 does not state it); row 24's concept 0 (the row is now « cours »); row 37's
  concept 8 (a rule that concept 8 states as a course choice); row 20's concept 7 S6 (the
  row went to `stances.school[1]`, which S5 settles).
- Quotations new or longer than on `main`, each checked on 2026-10-30 in the fetched source:
  S6's « If the answer is the same in all three instances, skip your experiment and take
  action now. » (row 23, `stances.school[3]`; `main` paraphrased it); S5's « After the
  predetermined number of hours, a decision is made. », « But that decision may be to invest
  more hours in gaining more knowledge. » (row 19, `main` paraphrased), « With a spike, a team
  isn't trying to immediately deliver a new capability; instead, they are building the
  knowledge » (row 18, `main` held « the knowledge » only), « Some agile software development
  teams opt to put a spike story ... », « Other teams take the approach ... » (row 21, `main`
  held fragments) and « This could be uncertainty about how a feature should work or about how
  it will be built. » (`stances.school[1]`), and « Spikes are a concept adapted from Extreme Programming (XP) » (row
  17, `stances.school[1]`; `main` held « a concept adapted from Extreme Programming (XP) »);
  S2's 3.1 objective with its opening « describe how ... » (row 7); S3's four risks with their
  openings « value risk (... », « usability risk (... », « feasibility risk (... », « business
  viability risk (... » (row 11, `stances.school[0]`; `main` held the parentheses only) and
  « the techniques for tackling these early » (row 13, `main` held « techniques for tackling
  these early »); S4's « Create spike solutions to figure out answers to tough technical or
  design problems. » (`stances.school[1]`; `main` held « tough technical or design problems »);
  S10's « Is the data complete (does it cover all the cases required)? » (row 14,
  `stances.course[0]`; `main` held « Is the data complete […]? »); S8's « These are written by
  engineers in order to address technical risks during product discovery » (`stances.school[2]`,
  `stances.course[2]`; `main` held it from « written by engineers »), « the four main types of
  prototypes »
  (row 25) and « this is code so it requires your developers to create the live-data
  prototype » (`stances.course[2]`); S10's « The data understanding phase starts with initial
  data collection ... » (row 29, `main` described the phase) and « The model is built on the
  training set and its quality estimated on the test set. » (row 34, now alone); S9's full
  definition (`stances.school[4]`); S7's « setting a specific, predetermined threshold for
  success before you run a test or experiment » (`main` held « line in the sand » and
  « before you run a test or experiment »); S3's three role sentences (`stances.school[0]`,
  `main` described them); S2's 4.2 objective (`stances.consensus[1]`). Shortened to avoid a
  dash of the source: S8's « it's not good for proving anything », S10's « Define the criteria
  ... in technical terms » and « a certain level of predictive accuracy » as two quotations.
- Places corrected: the « In complex environments » sentence is under « The Sprint », not a
  « section sur la prévision ».
- Absences searched on 2026-10-30 in the fetched texts: « spike », « discover », and
  « assumption » outside the retrospective in the Scrum Guide; « data » and « Product Owner »
  in Cagan's « The Four Big Risks ».
- References: none removed; S1 to S10 and S12 to S14 gained « ; 2026-10-30 (sections des
  citations relevées) », S11 « ; 2026-10-30 (citation relevée) ».
- « Non vérifié »: every entry now opens with its section; none removed; « Tension levée dans
  la fiche » lost its bold.

## A1-outil-backlog

Body of `concept.md`: unchanged.

| Line | Row | Went to |
|---|---|---|
| 6 | « Scrum laisse le choix des pratiques et des outils » | frontmatter `stances.consensus[0]` |
| 8 | « Jira (Cloud) : trois niveaux par défaut ... » | split: the three levels kept (A1a); Premium, renaming and the company-wide settings: frontmatter `stances.consensus[1]` and the row on company-managed spaces |
| 9 | « Jira : la page ne décrit le retrait que d'un niveau ajouté ... » | split: the removal kept (A1a); « will break existing parent and child relationships » to the row on company-managed spaces (A1a, Pièges) |
| 12 | « Azure DevOps : chaque équipe choisit les niveaux ... » | kept, its free-text anchor « le niveau de trop se règle pour l'équipe » replaced by A1a, Pièges |
| 14 | « Le niveau de trop : quand la plupart des features ne contiennent qu'une story ... » | merged with row 15 into « Peu de niveaux suffisent ; un niveau est de trop ... », source « cours » (concept 4 states it as a course choice) |
| 16, 18, 20, 21 | the link names in Jira, Azure DevOps, Linear, and « aucun « dépend de » » | merged into one row (A1b, Pièges) |
| 17, 19 | a link across two spaces (Jira) or two projects (Azure DevOps) | merged into one row (A1b) |
| 22, 36 | « Le lien ne remplace pas la conversation ... », « C'est Pia qui inscrit le canal ... » | merged into « Un lien n'est pas un accord ... on le convainc » (A1b, Pièges, [S1]); Pia and the storyline: nowhere; the Manifesto: frontmatter `stances.course[3]` |
| 23 | « Rendre visibles les dépendances qui restent » | re-anchored A1b as the body's « Le lien rend la dépendance visible des deux côtés » ([S6b]); the path to concept 10's Nexus left: the body does not cite Nexus |
| 24, 25 | the states and their defaults | split into « Les états viennent avec un jeu par défaut, que l'équipe change » and « États par défaut : Azure DevOps ..., Linear ... »; Jira's « would be three statuses » left the rows (an example, kept in « Non vérifié ») |
| 29 | « Piège de vocabulaire : la « Definition of Done » par colonne d'Azure DevOps » | frontmatter `neighbors[0]`; the Pièges sentence repeats the neighbour, so it has no row (SPEC 4.1) |
| 31, 38 | « Les états de l'outil ne sont pas la vie d'une story », « Chaque état se tient à jour » | merged into one row (A1c, Pièges, source « cours ») |
| 35 | « Sens du lien dans l'exemple A1b ... » | nowhere: a teaching device (the case « Dana a tracé le canal d'Abba ») |
| 37 | « « Fait » suit la DoD de l'équipe vélos ... » | nowhere: storyline facts and a teaching device; the claims of the body are the rows on « fait » and « prêt » |
| 39 | « Faits de l'exemple A1b ... » | nowhere: storyline facts |

- Kept and re-anchored, their reasoning dropped: 5 (L'essentiel), 7 (L'essentiel), 10 (A1a),
  11 (A1a, Pièges), 13 (A1a, Pièges, « cours »), 15 (merged with 14), 26 (A1c, nature
  `école`), 27 (A1c, Pièges, Le test rapide), 28 (A1c, Pièges), 30 (A1c, Pièges, nature
  `cours`, as the reader text marks it), 32 (A1c, nature `cours`), 33 (L'essentiel, A1a, A1c,
  Pièges, « cours »), 34 (L'essentiel, Pièges, « cours »).
- Paths whose reference this concept already held, kept rather than copied (the deviation
  accepted on #304): concept 4's Scrum Guide (S1, row 5), Jira hierarchy page (S2, row 8) and
  Azure process page (S3, row 10, the Agile part of concept 4's row 8 quotation copied); concept 10's Scrum
  Guide (S1, rows 22, 36) and Jira linking page (S6, row 16); concepts 0 and 11's Scrum Guide
  (S1, row 27); concept 11's Cohn DoR page (S13, row 30). `plan.md` (row 15) left.
- Links with several places, split where each quotation names its page: S6 into S6 (Jira Data
  Center, the four default link types) and S6b (Jira Cloud, links across teams and spaces);
  S8 into S8 (« What is a workflow status? »), S8b (statuses, priorities and resolutions) and
  S8e (the knowledge base article on Kanban boards); S10 into S10 (workflow category states)
  and S10b (customizing an inherited workflow); S12 into S12 (« Issue relations ») and S12b
  (« Issue status »). Links that left, no quotation tied to them: « Add statuses to a Jira
  workflow » (its example « would be three statuses » now in the « Non vérifié » entry, with
  its link), « Create, edit and delete statuses in team-managed spaces » (none of `main`'s
  quotations is on it), Linear « Parent and sub-issues ».
- Quotations new or longer than on `main`, each checked on 2026-10-30: S1's absences
  (« status », « workflow », « board », « link », « ticket », « Jira », « epic »,
  « feature », « story », « theme », « task », searched again); S2's « by default called
  Epic », « called Story », « called Subtask »; S10b's full sentence « You can customize the
  workflow of any work item type (WIT) by hiding inherited states or adding custom states. »;
  S12b's « These workflows are team-specific and come with a default set and order » and
  « Create statuses by clicking the + button, or remove statuses » (`main` paraphrased: add,
  rename, remove); S8b's « The statuses are recommended starting points for each template, but
  you can edit or remove them from a workflow to suit your team's need. » and « You can also
  create your own. » (`main` held fragments); the Scrum Guide's DoD definition for
  `neighbors[0]`.
- Row 5: « Product Backlog items » (Product Backlog) left its cell: it settled nothing in the
  claim; the absences do.
- S12, S12b: the link is now the copy archived on 2026-10-01, where they were read; the live
  addresses, which lead to « Issue properties », are in « consultée le ».
- S13's description now reads as concept 11's S6, « (sans signature ; site et voix de Cohn) »
  added. S14 gained « ; 2026-10-30 (citation relevée) ».
- References: S3 lost the pointer to concept 4 in « consultée le »; S2, S6, S13 lost theirs
  too; every re-read reference gained « ; 2026-10-30 (sections des citations relevées) » (S9,
  S11 « page relue », S12, S12b « copie archivée du 1er octobre 2026 relue »).
- « Non vérifié »: every entry now opens with its section; none removed; « une session »
  became « l'échange avec un seul apprenant ».

## A2-sans-sprint

Body of `concept.md`: unchanged.

| Line | Row | Went to |
|---|---|---|
| 5 | « Définition : Kanban est une stratégie ... » | frontmatter `stances.school[0]`: the body does not define Kanban |
| 6, 7, 14 | no roles, no events (no Sprint Planning), no cadence in the *Kanban Guide* | merged into one row (L'essentiel, A2a, A2c, nature `école`) |
| 8 | « Le *Kanban Guide for Scrum Teams* : Kanban complète Scrum ... le sprint reste » | frontmatter `neighbors[0]`; L'essentiel and Pièges say what the neighbour item says, so it has no row (SPEC 4.1) |
| 9 | « Distinguer le flux sans sprint ... de Kanban dans Scrum » | frontmatter `neighbors[0]`; « flux continu », a word of the course: `stances.course[5]` |
| 10 | « La méthode Kanban ... est une autre école que le *Kanban Guide* » | frontmatter `stances.school[1]` (S4, S5, S7); the Pièges sentence repeats the stance |
| 13 | « Pour l'apprenant sans sprint, une réponse juste ... » | nowhere: only `teaching.md` (« Consignes ») states it |
| 19 | « La DoR devient la condition pour franchir le début du flux ... » | split: the DoR absent from the Scrum Guide (A2a, `école`, concept 11's absence copied on S3) and the course's rule (A2a, `cours`, [S1], [S2]); the Kanban University part: frontmatter `stances.course[2]` |
| 24 | « La place libérée va à l'élément prêt le plus haut ... » | re-anchored A2b, Pièges (the body's claim), [S3] |
| 26 | « Sans sprint, pas de revue de sprint ... » | kept (A2c); the absence of events also in the row at lines 6, 7, 14 |
| 30 | « Les quatre mesures obligatoires du *Kanban Guide* » | re-anchored A2d; the 2025 renaming: nowhere, the body does not state it |
| 33 | « Le débit aide le PO à parler des dates de livraison probables » | frontmatter `neighbors[0]` (the item says it, the body does not) |
| 34 | « Le Scrum Guide cite « cumulative flows » ... » | frontmatter `stances.consensus[0]` |

- Row 12 (« Le cours n'affirme pas que les équipes data travaillent surtout en flux »):
  re-anchored Pièges, source « cours », nature `cours`: S8's « using students as subjects »
  does not settle the absence of a survey. S8 left « Références »; its description, link and
  quotation are in the « Non vérifié » entry on the share of data teams in flow.
- Row 23: S1's « in pursuit of these goals » replaced by the absence of « sprint goal » and
  « product goal », searched on 2026-10-30.
- The Kanban Zone page now has its URL in « Non vérifié », beside Nave's.
- Kept and re-anchored, their reasoning dropped: 11 (L'essentiel, Pièges, « cours »), 15 and 16 (merged, A2a, `école`), 17 (A2a), 18 (A2a), 20 (Pièges),
  21 (A2a), 22 (A2a), 23 (A2b), 25 (A2b), 27 (A2c, Pièges), 28 (A2c, Pièges; S6 left it), 29
  (L'essentiel, A2c), 31 (A2d), 32 (A2d, Pièges).
- Paths whose reference this concept already held, kept rather than copied (the deviation
  accepted on #304): row 19, concept 11's Scrum Guide absence « Definition of Ready »
  (copied, S3); row 21, concepts 0 and 13's Scrum Guide (S3, « Ordering Product Backlog
  items », found on 2026-10-30); row 24, concepts 1 and 13's Scrum Guide (S3, « trying to
  convince the Product Owner », both as concept 13 quotes them on `main` at 2753909); row 32,
  concept 16's Scrum Guide (S3), re-synced after #316 merged with concept 16's row « La
  prévision du sprint est celle des Developers »: « the more confident they will be in their
  Sprint forecasts » (Topic Two: What can be Done this Sprint?). Concept 16's other forecast
  row (« Une prévision n'est pas une promesse », on the Scrum Guide's commitments and a
  Scrum.org article) is not copied: A2 rests « pas une promesse » on the *Kanban Guide*'s
  forecast with a probability (S1), and the row is « cours ». `decisions/team-in-sprints.md` and `plan.md` (rows 11, 13,
  23) left.
- S6 (two tool vendors' pages, search excerpts only) left the row at line 28 and
  « Références »: it backed only the frequency and the participants, which the body does not
  state; its two pages are named in the « Non vérifié » entries on frequency and participants.
- S2: the *Kanban Guide for Scrum Teams* was re-read on 2026-10-30 (the page refuses a plain
  download; read through an extraction service); its quotations are now at their sections.
- Quotations new or longer than on `main`, each checked on 2026-10-30: S1's absences
  (« role », « event », « sprint », « backlog », « product owner », « done », « ready »,
  « continuous flow »); S3's « Ordering Product Backlog items », « The Product Owner is also
  accountable for effective Product Backlog management », « The Product Goal is the long-term
  objective for the Scrum Team. » and « Work cannot be considered part of an Increment unless
  it meets the Definition of Done. » (`main` said « vérifié aux concepts 2 et 13 »); S4's
  « the 7 Kanban Cadences » and « Replenishment/Commitment » (`main` paraphrased); S7's two
  sentences on Anderson's 2010 book and Coleman and Vacanti's 2020 guide (`main` paraphrased);
  S1's « sprint goal », « product goal » absences.
- Absences: « increment » is absent from S1 as a word (`main` counted « incremental »).
- References: S1, S3 lost their pointers to concepts 3 and 0 in « consultée le »; S2 lost its
  note on concept 3.
- « Non vérifié »: every entry now opens with its section; none removed; the entries on
  frequencies and participants now carry S6's description.
