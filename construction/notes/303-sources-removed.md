# #303: what left the sources of concepts 0 to 2

The rows of « Affirmations », the « Non vérifié » entries and the references that the sources
pass of #303 removed from `courses/parcours-po/concepts/00-scrum`, `01-produit-et-po` and
`02-objectif-produit-resultat`, and where their matter went (SPEC 4.4: a stance, a storyline
fact, a teaching device or a claim only `teaching.md` makes is not a row). Rows are named by
their claim as it read on `main` at `cece54b`. The body of `concept.md` did not change in any of
the three concepts: no gap was added.

Destinations: **item** (a frontmatter item of `concept.md`: its `refs` and `verified`),
**« Non vérifié »**, **trimmed** (a row kept, a part of its claim or verified cell removed), or
**nowhere** (not a claim of `concept.md`).

## 00-scrum

| Removed | Where its matter went |
|---|---|
| Row « Le Scrum Guide ne parle ni de vision produit, ni de user story, ni de Definition of Ready » (empty section) | item `stances.consensus[1]`: its search becomes the `verified` entry (« absent de ») |
| Row « DoD : ... donc pas pour une échéance propre à un sprint », the échéance part and its reading of the « Réponse attendue » | trimmed; item `stances.course[2]` holds the échéance, with the DoD quotation |
| Row « Revue de sprint : séance de travail ... », the note on « outcome » translated without « résultat » (glossaire) | trimmed: a wording of the course |
| Row « Rétrospective : but ... ; elle réunit l'équipe Scrum », the course's reading on stakeholders | trimmed; item `stances.course[4]` |
| Row « Le Scrum Master : ... », the sentence « Il ne décide ni de l'ordre ni du comment » | trimmed: a deduction, not in the body |
| Row « Le PO crée les éléments du backlog », the sentence « Ticket n'est pas un terme du Scrum Guide » | item `stances.consensus[1]` (absence of « ticket ») |
| Row « Un sprint de deux semaines est conforme ... » (« situation du fil rouge ») | trimmed to the sourced claim (a month at most; shorter sprints, more learning cycles); two weeks is a storyline fact |
| Row « Les engagements n'ont pas la même durée de vie », the sentence « la lecture du cours » | trimmed: nature `cours` now says it |
| Reference S1, its second link (`https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf`) | nowhere: the description still names the PDF; no row says which quotation came from the PDF |

## 01-produit-et-po

| Removed | Where its matter went |
|---|---|
| Row « Décrire un produit par problème, utilisateurs et valeur, choix d'école de Pichler », the grid and its « appui [S1] » | the row now states what Pichler says (1a, école); the grid is item `stances.course[0]`, the [S1] support item `stances.school[0]` |
| Row « Les consommateurs de données sont des utilisateurs du produit » (« [S2] en partie ») | the row now states Dehghani's claim (1a, école); the course's choice is item `stances.course[1]`; the owner's metrics were a paraphrase with no quotation: nowhere |
| Row « Même un travail technique passe par le backlog ... » (Banque, streaming) | nowhere: a claim only `teaching.md` makes |
| Row « Le Scrum Guide ne parle pas de « proxy PO » » (Banque, deux PO) | nowhere: a claim only `teaching.md` makes |
| Row « Plusieurs équipes sur un même produit partagent le même PO » (Banque, deux PO) | nowhere: a claim only `teaching.md` makes |
| Row « Au Sprint Planning, le PO propose ... », the illustration « sans doute les quatre premiers » | trimmed: a teaching device |
| Row « Le PO répond de la valeur et de l'ordre même quand le travail est délégué ... » | kept, rewritten as the Pièges claim (comité, deux PO, déléguer le travail pas la responsabilité) |
| « Non vérifié » « Le PO fixe l'exigence, les Developers en donnent le coût ... » | nowhere: the trace of a claim the concept no longer makes |
| « Non vérifié » « Le PO tient compte du coût pour ordonner » (Banque, streaming) | nowhere: a claim only `teaching.md` makes (concept 13 sources it) |
| « Non vérifié » « Cible de fraîcheur de moins de 15 minutes » | nowhere: a storyline fact |
| « Non vérifié » « Décrire le produit par sa technique ... », the words « la fiche ne l'énonce plus comme consensus » | trimmed: the trace of a removed claim |
| « Non vérifié » « Un désaccord qui dépasse le PO se porte au sponsor » (Banque, vote) | rewritten as the 1b entry « le sponsor porte plus haut les obstacles qui dépassent le PO », the claim the body makes |

## 02-objectif-produit-resultat

| Removed | Where its matter went |
|---|---|
| Row « La distinction livrable et résultat est partagée par ... Scrum Alliance, Scrum.org, Torres, Seiden » | item `stances.consensus[1]` (S2, S6, S11); Torres has no quotation: « Non vérifié » |
| Row « Josh Seiden est l'auteur de l'idée du résultat comme changement de comportement » | item `stances.school[0]`; the row on Seiden's claim (2a) keeps S11 |
| Row « Livrer un indicateur n'est pas obtenir le résultat ... » | nowhere as a row: the same claim as the row « Un indicateur calculé par la plateforme est un livrable ... » (2a) and item `stances.course[1]` |
| Row « Formats de vision, choix d'école : le Product Vision Board de Roman Pichler » | item `stances.school[1]` (S9 and its quotation); the body does not name Pichler |
| Row « Mesurer la valeur fait partie des objectifs d'apprentissage du PO » | item `stances.consensus[1]` (CSPO 5.5) |
| Row « Evidence-Based Management (Scrum.org) : quatre domaines de valeur » | item `stances.school[5]` (S16) |
| Row « Patton : une mesure de succès par tranche de version » | « Non vérifié »: no quotation; reference S17 removed |
| Row « Pour un produit de données, Zhamak Dehghani fait suivre ... » | « Non vérifié »: no quotation; reference S18 removed |
| Row « Qualité des données : respect de règles mesurables ... » (glose) | nowhere: a gloss of a frontmatter item, defined in the glossary and at concept 12 |
| Row « Hypothèse : ce qu'on tient pour vrai sans l'avoir vérifié » (glose) | nowhere: a gloss of a frontmatter item, defined at concept 17 |
| Rows on « Livrable ou résultat ? », « Un indicateur ... », the usage of a livrable, a measure badly defined: the pseudo-reference S13 | source « cours »; reference S13 removed (a course choice, not a source) |
| Row « Une sortie à l'heure ou un incrément terminé ne prouve pas la valeur », the case « Vue livrée, objectif atteint » | trimmed: rewritten as the 2a and Pièges claim |
| Row « Un objectif produit formulé comme une caractéristique ... », the banque « Trois objectifs » and the glossary's « temps réel » | trimmed: a teaching device |
| Rows « Une mesure mal définie trompe ... » and « L'objectif produit retenu est une direction », their storyline facts | trimmed: storyline facts |
| Row « L'objectif produit a été introduit par le Scrum Guide 2020 », reference S7 (Dave West's post, not read) | « Non vérifié » (the post was only seen as a link); reference S7 removed |
| « Non vérifié » « Phrase de positionnement de Geoffrey Moore » | nowhere: the trace of a claim removed in review |
| « Non vérifié » « Loi de Goodhart », its 1975 quotation | the verified cell of the row « Une mesure qui devient une cible ... » (Pièges), which had none |
| « Non vérifié » « Effet de la pluie » | nowhere: a claim only `teaching.md` makes |
| « Non vérifié » « Patton et la distinction livrable et résultat » | replaced by the Patton entry above |
| Reference S4 (Torres) | « Non vérifié », with its title and link: no quotation, cited by nothing else |
| Reference S9, its second link (`https://www.romanpichler.com/blog/the-product-vision-board/`) | nowhere: the description names the post and its date; the quotations come from the tool page |
| Reference S11, its second link (`https://www.senseandrespond.co/books`) | nowhere: the Google Books page carries the title and subtitle quoted |
| Reference S12 (the Medium summary) and its second summary (UIE, `https://aycl.uie.com/virtual_seminars/outcomes`) | « Non vérifié », in the entry on Seiden's exact definition, both with their link: which summary carries the phrase was not noted, so neither can hold it in a `verified` cell; the quotation left the row on Seiden (2a) and items `stances.school[0]` and `stances.course[0]`, which keep S11 |
| Reference S16, its second link (`https://www.scrum.org/ebm`) | nowhere: taken for the same Scrum.org page (not verified: the link was not opened for this pass) |
| Row « La vision est un choix d'école : Scrum.org et Scrum Alliance la gardent ... », reference [S6] and the quotation « a bridge between the product vision and the Sprint Goals » | trimmed: four references for three quotations, and the page (S5 or S6) that carries « a bridge ... » was not noted; the S5 place now holds the S5 quotation on vision (« often an aspirational vision ... »), and S6 left the row, having no quotation on vision |
| Row « Accoler deux résultats dans un objectif produit ... », reference [S13] | source [S1] only: S13 was a course choice, not a source |
| Row « Normaliser les comptages bruts ... », the part « l'application au calcul de la mesure retenue ... est un raisonnement du cours » | trimmed: it applied the claim to a storyline measure |
