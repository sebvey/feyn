# linear-course: the course

| Reader | Comes for | Opens |
|---|---|---|
| creator | what a course is, the templates, how to verify | sections [1](#1-le-dossier-du-cours) to [7](#7-the-lexicon-of-the-course-files), [`templates/README.md`](templates/README.md), [`course-specs/check-course`](../../../check-course) |
| builder | the shape of a course, the lexicon of the course files | sections [1](#1-le-dossier-du-cours) to [7](#7-the-lexicon-of-the-course-files), [`schemas/`](schemas/) |
| verifier | the rules of a course as data, the checks, their fixtures | [`rules.yaml`](rules.yaml), [`checks/README.md`](checks/README.md), [`checks/fixtures/`](checks/fixtures/) |
| spec writer | the rules and schemas of a course, the spec's decisions | [`rules.yaml`](rules.yaml), [`schemas/`](schemas/), [`../decisions/`](../decisions/), [`../CHANGELOG.md`](../CHANGELOG.md) |

The readers are defined in [`spec-directives/README.md`](../../../../spec-directives/README.md#the-readers).

What a course of `linear-course` is: its folder, `course.yaml`, the concept folder, the domain
files, the course files, the diagrams and the lexicon of the course files. The scope, the files, the
categories and the checks are the MAJOR's `README.md`; conformance, levels, methods, severity and
versions are the spec directives, `spec-directives/1/README.md`; the protocol the teacher executes
is `teacher/README.md`. Sections 1 to 7 are sections 2 to 7 and 9 of the spec's description before
the split (#323, read at `9c691da^:specs/linear-course/1/SPEC.md`), moved as written; sections
1, 2, 4 and 5 were rewritten since, their rules moved to `course/rules.yaml` (#524).

Each concept is one source: its folder holds **reader-facing** files (the site builds them, the
teacher reads them) and one **teacher-only** file (the teacher reads it, the site never builds
it). The site and the classroom are builds of the course, without rewriting.

**Until the extraction of the rules (#318).** Sections 1, 2, 4 and 5 are a description, in
French: their rules, those the review verifies included, are data in `course/rules.yaml`, which
they cite by id. Sections 3, 6 and 7 keep their verbal forms of obligation, read in the levels of
the spec directives (`spec-directives/1/README.md` section 3).
"Mandatory" means a requirement: the element is present. The check named verifies it, at the
level and severity the MAJOR's `README.md` section 5 gives that check; its form is checked where
that check says so, reviewed otherwise. "Optional" means it may be absent, a permission, and when
present it follows the rule given. Every rule names the check that verifies it by test, in
backquotes (the MAJOR's `README.md` section 5 gives its level); a rule with no check id is verified
by inspection, the review. The rules the checks verify are also data in `course/rules.yaml`, each
with its level, category and method, and the tables of sections 2 and 3.1 are the schemas
`course/schemas/course.schema.yaml` and `course/schemas/concept-frontmatter.schema.yaml` (#329).

## 1. Le dossier du cours

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | the files a course has, which are mandatory, where each one's form is given | creating a course; adding a domain or a concept |
| the site | where each file it builds is | at each build |
| the reviewer | that a change sits where the spec puts it, in plain CommonMark | reviewing a change |

```
courses/<id>/
  course.yaml          identité, domaines, concepts, sous-concepts (section 2)
  plan.md              prose : public, accueil, partis pris, règles d'écriture (section 5)
  glossary.md          le glossaire du cours (section 5)
  storyline.md         le fil rouge (section 5)
  CHANGELOG.md         le journal des versions du cours (section 5)
  domains/N-slug.md    un fichier de domaine par domaine (section 4)
  concepts/NN-slug/    un dossier de concept par concept numéroté et par annexe (section 3)
  decisions/           les décisions du cours ; aucun build ne le lit
```

Un cours tient chaque fichier et chaque dossier de cet arbre (règles `course-yaml-present`,
`course-files-present`, `course-yaml-paths-exist`, `domain-files-listed`,
`concept-folders-listed`) ; `decisions/` est le seul au choix de l'auteur (règle
`course-decisions-folder`).

Le Markdown d'un cours est du CommonMark simple, avec un frontmatter YAML là où la spec le dit
(règle `plain-markdown`, vérifiée par le check `conventions`). Le texte d'un cours suit la
typographie du lexique ; le check `typography` signale ses caractères interdits
(`typography.banned` : le tiret cadratin, les flèches) (règle `no-banned-character`).

## 2. `course.yaml`

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | the course order and the split of each concept into leaf sub-concepts | designing the course; each change of its plan |
| the teacher | the order it teaches in, the prerequisites, one leaf sub-concept per message | each teaching session |
| the site | titles, objectives, durations, the order of the pages and their addresses | at each build |
| the maintainer | the identifiers whose change is a course MAJOR (below) | classing a course change |

Le site, le build de la classe et les checks lisent `course.yaml` ; le check `course-yaml` en
vérifie les règles de méthode test.

Les tableaux qui suivent sont le schéma `course/schemas/course.schema.yaml` (règle
`course-yaml-valid-against-schema`). La colonne « Présent » dit si un cours conforme tient
toujours le champ, ou si le champ est au choix de l'auteur.

| Champ | Présent | Sens |
|---|---|---|
| `id` | toujours | l'id du cours : des mots ASCII en minuscules reliés par des tirets, égal au nom du dossier (règle `course-id-equals-folder`) |
| `spec` | toujours | `linear-course@<MAJOR>` : la MAJOR de la spec que le cours suit (`spec-directives/1/README.md` section 6) |
| `title` | toujours | le titre du cours |
| `subtitle` | au choix | une ligne sous le titre, sur le site |
| `audience` | toujours | une phrase pour l'accueil du site et les aperçus ; la prose complète est dans `plan.md` |
| `site` | au choix | l'allure du cours sur le site ; une clé omise prend la valeur par défaut du site |
| `site.icon` | au choix | le chemin, relatif au dossier du cours, d'un SVG qui sert de marque et de favicon au cours |
| `site.color` | au choix | la couleur d'accent du cours, `#rrggbb` |
| `storyline` | toujours | le chemin du fil rouge : `storyline.md` |
| `glossary` | toujours | le chemin du glossaire du cours : `glossary.md` |
| `domains` | toujours | les domaines, dans l'ordre du cours (ci-dessous) |
| `concepts` | toujours | chaque concept numéroté et chaque annexe, dans l'ordre du cours (ci-dessous) |
| `annexes` | au choix | les numéros des concepts qui sont des annexes ; absent, aucun |

Une entrée de **domaine** :

| Champ | Présent | Sens |
|---|---|---|
| `number` | toujours | un entier ; les domaines sont numérotés 1, 2, 3… dans l'ordre de la liste |
| `slug` | toujours | des mots ASCII en minuscules reliés par des tirets |
| `title` | toujours | le titre du domaine |
| `objective` | toujours | ce que l'apprenant sait faire à la fin du domaine, en une phrase |
| `duration_min` | toujours | les minutes de conversation avec le professeur, estimation basse, apartés exclus |
| `file` | toujours | `domains/<number>-<slug>.md` ; le fichier existe |
| `concepts` | toujours | les numéros des concepts du domaine, dans l'ordre du cours |

Une entrée de **concept** (annexes comprises) :

| Champ | Présent | Sens |
|---|---|---|
| `number` | toujours | l'identifiant du concept : `0`, `1`… pour un concept numéroté, `A1`, `A2`… pour une annexe ; une chaîne (un entier sans guillemets se lit comme sa chaîne décimale) |
| `slug` | toujours | des mots ASCII en minuscules reliés par des tirets |
| `title` | toujours | le titre du concept |
| `objective` | toujours | ce que l'apprenant sait faire après le concept, en une phrase ; repris dans « Objectif » (section 3.2) |
| `prerequisites` | toujours | les numéros des concepts que l'apprenant a validés avant ; `[]` pour aucun |
| `duration_min` | au choix | les minutes de conversation avec le professeur, estimation basse |
| `dir` | toujours | `concepts/<NN>-<slug>`, `NN` le numéro sur deux chiffres (`09`) ; une annexe garde son numéro (`concepts/A1-<slug>`) ; le dossier existe |
| `subconcepts` | toujours | l'arbre des sous-concepts du concept, non vide (ci-dessous) |

Un nœud de **sous-concept** :

| Champ | Présent | Sens |
|---|---|---|
| `id` | toujours | au premier niveau, le numéro du concept suivi d'une lettre, à partir de `a`, dans l'ordre (`9a`, `9b`, `A2a`) ; au second niveau, l'id de son parent suivi d'un chiffre, à partir de `1`, dans l'ordre (`9a1`, `9a2`) |
| `title` | toujours | le titre du sous-concept, tel que son titre de section dans `concept.md` l'écrit |
| `children` | au choix | les nœuds de second niveau, 9 au plus (l'id d'un enfant finit par un chiffre) ; l'arbre a deux niveaux au plus |

Un nœud sans `children` est un **sous-concept feuille** : un message du professeur avec une question
(règle `leaf-fits-one-message`). Le professeur découpe une feuille trop grande pour un message
(`teacher/README.md`, règle `short-messages`) ; les « Consignes » du concept (section 3.3) disent
comment, s'il y a lieu. L'`audience`, l'`objective` d'un domaine et celui d'un concept tiennent
chacun en une phrase (règle `summaries-in-one-sentence`).

Ce que les tableaux ne disent pas, le check `course-yaml` le vérifie :
- l'unicité des numéros de concept et des ids de sous-concept (règle `course-identifiers-unique`)
  et l'ordre du cours, les concepts numérotés par numéro croissant puis les annexes (règle
  `concepts-in-course-order`), avec la forme des ids (règles `subconcept-ids-in-order`,
  `domains-numbered-in-order`) ;
- le partage en domaines : chaque concept numéroté dans un seul domaine, les concepts de chaque
  domaine consécutifs, les annexes hors de tout domaine et désignées par `annexes` (règles
  `concept-in-one-domain`, `domain-concepts-consecutive`, `annexes-in-no-domain`,
  `annexes-are-a-numbers`) ;
- les prérequis, des concepts numérotés qui viennent avant (règle `prerequisite-comes-earlier`) ;
- les chemins : les fichiers et dossiers nommés existent, un dossier de `concepts/` par entrée
  de concept, chacun nommé par son numéro (règles `course-yaml-paths-exist`,
  `concept-folders-listed`, `domain-file-named-by-number`, `concept-dir-named-by-number`).

**Identifiants.** Les numéros de concept, les ids de sous-concept, les titres de cas
(section 3.3), les numéros de domaine et leurs concepts, les noms `dir` des concepts et `file`
des domaines sont les identifiants du cours : la mémoire de l'apprenant et les adresses du site
les citent. En changer un est une MAJOR du cours (`spec-directives/1/README.md` section 6).

## 3. The concept folder

```
concepts/09-decoupage-vertical/
  concept.md         mandatory   reader-facing: built by the site, read by the teacher
  teaching.md        mandatory   teacher-only: teaching notes, example bank included; never built
  sources.md         mandatory   reader-facing: built by the site, « Non vérifié » excepted (3.4)
  <stem>.svg         optional    reader-facing: one file per diagram (section 6)
```

Nothing else sits in a concept folder (`concept-folder`). The three Markdown files have no H1:
the title is in `course.yaml`. Sections are `##` headings whose text is the lexicon's
heading, in the order given, and no other `##` section exists (`concept-folder`).

### 3.1 `concept.md` frontmatter

| Key | Presence | Meaning |
|---|---|---|
| `description` | mandatory | one sentence for the site (search engines, previews) |
| `stances` | mandatory | the standing of the concept's claims, three keys, each a list of items, possibly empty |
| `stances.consensus` | mandatory | what is accepted, and by which text (the Scrum Guide, established practice) |
| `stances.school` | mandatory | school of thought: a named author's or current's choice |
| `stances.course` | mandatory | the course's own choices, which no source states as such (an item may cite the sources it comes close to) |
| `neighbors` | optional | neighbouring notions not to confuse with this concept: a list of items |
| `diagrams` | optional | the concept's diagrams, a list (below) |

`stances` and `neighbors` are the one place for the concept's stances and neighbours: the body has no stances
section (`concept-folder`), and the site renders them from the frontmatter, under the heading
`headings.stances`. The reader text may still mark a claim with a stance marker (section 3.5).

An **item**: `text` (mandatory, inline Markdown: bold and italics only), `author` (optional;
expected on consensus and school items: the text or author the claim belongs to), `refs`
(mandatory, possibly empty: reference ids of `sources.md`, `sources`), `verified` (mandatory
when `refs` is not empty, absent otherwise: a list parallel to `refs`, one entry per reference
in the same order, each the shortest quotation that settles the item, between « », and its
place in parentheses, as the verified column of 3.4; `concept-folder` fails a `verified` whose
length differs from `refs`). A stance or a neighbour is sourced in its item, never by a row of
« Affirmations »: the proof sits beside what it proves. `verified` is audit material, like
« Affirmations »; a re-verification is a change of `concept.md`.

A **diagram** entry, all keys mandatory: `file` (the SVG's file name), `title` (one line: the
SVG `<title>` and the image alt), `caption` (what the diagram shows: the teacher says it, the
site shows it as the legend), `subconcept` (the id of the sub-concept it illustrates). Every
declared file exists and every SVG of the folder is declared (`svg-contract`).

### 3.2 `concept.md` body

In this order (`concept-folder`):

1. « Objectif » (`objective`), mandatory: the concept's `objective`, verbatim, give or take line
   breaks, written with a capital first letter and ending with a period where the field ends
   with no `.`, `!` or `?` (`concept-folder`).
2. « L'essentiel » (`essentials`), mandatory: the definition and why it matters, a few lines;
   may hold a diagram image.
3. The sub-concept sections, mandatory: one per first-level sub-concept, in `course.yaml` order,
   and inside each, one per second-level sub-concept (`concept-folder`; form in section 3.5).
   A leaf section holds the leaf's **reader text**: the explanation as a site reader reads it.
4. « Pièges » (`pitfalls`), mandatory: the pitfalls of the whole concept.
5. « Le test rapide » (`quick_test`), mandatory: the quick test of the whole concept.
6. « Approfondissement » (`deepening`), optional: more matter on the concept, beyond what its
   sub-concept sections teach, for the learner who asks to go further. Its claims are sourced in
   `sources.md` like any other (3.4), and the site builds it like the rest of the file. The
   teacher reads it in an aside, on the learner's request (`teacher/README.md`, rule
   `deepening-read-in-aside`), never on the course path; no case, of any type, relies on it.

### 3.3 `teaching.md`

**Purpose.** `teaching.md` holds what the teacher needs beyond the reader text, above all the
**cases**. A case is the prepared question of the loop: the teacher poses it at a sub-concept and
corrects the answer. It gives coverage (every leaf sub-concept has one, checked), the course's
own position (its expected answer is the stance the concept states: consensus, school or
course), experience (it anticipates the mistakes learners make), anchoring (it lives in the
storyline) and testability (taught-check and fresh tests cite it by its title). A case is created for one of
four needs, its **type** (below): one per leaf sub-concept, on the course path; a fallback, when
the learner fails the first; a practice case, for the learner who wants to practise a validated
concept, or to retrieve at the resume a concept validated in an earlier session; an aside, for a frequent question off the course path. A case is never created for what
the reader text does not state: that is a gap of the concept, filled in `concept.md`.

| Reader | Needs | When |
|---|---|---|
| the teacher | the order and split of the concept, the case to pose at each sub-concept, how to correct the answer | each leaf sub-concept; each fallback, practice case or aside |
| the learner | through the teacher, a case's explanation, situation and question; its expected answer never before they answer | each message that poses a case |
| the creator (human or agent) | when to create a case, and what each of its fields may contain | writing or changing a concept's teaching notes |
| taught-check | what each case asks, against what the learner was taught before it | after a change to what a concept teaches |

In this order (`concept-folder`):

1. « Consignes » (`instructions`), mandatory: the order of teaching and the split into
   messages, which case to pose at which sub-concept and which as fallback, the
   cross-references not to re-teach, the concept's own vigilance points. Every case of the bank
   is cited here by its title in « » (`case-contract`; « » and “ ” count as the same quotes,
   spaces inside them ignored).
2. « Faits du fil rouge utilisés » (`storyline_facts`), optional: the storyline facts the cases
   use, and what the storyline leaves unfixed.
3. « Banque d'exemples » (`bank`), mandatory: the example bank, one `###` per case.
4. « Schéma » (`drawing`), optional: the drawing instruction (metaphor, what it shows) behind
   the concept's diagrams.

`teaching.md` never overrides a protocol rule: it says what to teach, `teacher/README.md` says how
and when (« Schéma » says what to draw, not when to send a diagram); a « Consignes » that
contradicts a rule is a defect of the concept (review). A case restates only the storyline facts
listed in « Faits du fil rouge utilisés », which takes them from `storyline.md`; it adds the
unfolding (who says what, when), never a new fact (review).

A **case** heading is `### <title> (<sub-concept>)`. The parenthesis holds the sub-concept id
and at most one **qualifier**, before or after the id, separated by a comma: `(9a1, rechange)`,
`(aparté, 11a)`; nothing else (`case-contract`). The qualifier is a value of the
lexicon's `qualifiers` group and gives the case its type:

| Type | Qualifier (key) | The teacher poses it |
|---|---|---|
| main | none | at its sub-concept, on the course path, in the order of « Consignes » |
| fallback | « rechange » (`qualifiers.fallback`) | when the learner fails the case of the same sub-concept; it stands alone: its own situation and question, nothing borrowed from the failed case |
| practice | « entraînement » (`qualifiers.practice`) | when the learner practises a validated concept, one case per message, without re-explaining; unasked at the resume, for a concept validated in an earlier session (`teacher/README.md`, rules `validated-concept-practised`, `practice-cases-chosen` and `earlier-concept-retrieved-at-resume`) |
| aside | « aparté » (`qualifiers.aside`) | in an aside, on a question off the course path (rule `asides-welcome`) |

The case's **title**, its identifier, is the heading without the parenthesis; titles are unique
in the concept. The sub-concept is one of the concept's, at any level; every leaf sub-concept
has at least one case (`case-contract`).

A case is a list of fields, each item opening with `**<label>** :`, its text on the same line
or in a nested list; only the « Question » label may carry a qualifier of its own before the
colon (« **Question**, en deux parties : ») (`case-contract`):

| Field (key) | Presence | May contain | Who reads it | When the teacher uses it |
|---|---|---|---|---|
| « Usage » (`usage`) | optional | when to pose the case, for a case off the course path: a fallback, a practice case, an aside | the teacher | choosing the next case |
| « Explication » (`explanation`) | optional | what the teacher says before the case: the source of its explanation of the sub-concept; without it, the teacher explains from the leaf's reader text | the teacher, then the learner | in the message that poses the case, before the situation |
| « Situation » (`situation`) | mandatory | the actors and the storyline facts posed up front, and the unfolding (who says what, when) | the teacher, then the learner | in the message that poses the case, before the question |
| « Question » (`question`) | mandatory | the question the case asks | the teacher, then the learner; taught-check | at the end of the message that poses the case |
| « Réponse attendue » (`expected_answer`) | mandatory | the right answer with its nuances: the course's position as `concept.md` states it | the teacher; taught-check | correcting the learner's answer |
| « Erreurs fréquentes » (`common_mistakes`) | mandatory | frequent answers and how to correct them, follow-ups inline | the teacher | correcting a partial or wrong answer, and in its follow-ups |
| « Ce qui marche » (`what_works`) | optional | a wording or follow-up a teacher saw work; empty in a new course; the maintainer adds it from what the teacher notes in learner memory (`teacher/README.md`, rule `save-levers`) | the teacher | posing the case and correcting the answer |

The optional fields before « Situation » come in any order; the four mandatory fields come in
the order of the table; « Ce qui marche » comes last.

### 3.4 `sources.md`

**Purpose.** `sources.md` shows that the concept is grounded, and lets anyone trace a claim of
its body to what it rests on. « Références » serves the site reader first; « Affirmations »
serves the audit (the reviewer, the maintainer, the teacher on request). Traceability is worth
its re-verification, not its volume.

| Reader | Needs | When |
|---|---|---|
| the site reader | to know the course is grounded; where to read further; which claim is consensus, school or the course's choice | reading a concept |
| the teacher | the source as described, to answer « d'où ça vient ? », and what is not verified (`teacher/README.md`, rules `origin-from-sources-file` and `unverified-part-told`) | on the learner's request |
| the creator (human or agent) | what to source and what not to; where to put what could not be confirmed | writing the concept |
| the reviewer | that a claim is backed by what it cites: the quotation, the place | reviewing a change |
| the maintainer | when a source changes or a section is rewritten, what to re-verify; when it was consulted | months later |

Only `concept.md` is sourced. « Affirmations » covers the verifiable claims of its body (a
definition, a date, a figure, a quotation, what a guide says or does not say). Not a row: a
storyline fact (invented, in `storyline.md`), a teaching device (an invented example, a
deduction of a case), a stance or a neighbour (sourced in its frontmatter item, 3.1), a wording
of the course. A claim only `teaching.md` states is a gap of the concept, added to `concept.md`
first, or no claim to source. `concept.md` and `teaching.md` cite no reference: references live
in the frontmatter `refs` and here (`sources`).

The site builds every row of « Affirmations » and « Références »: no row is teacher-only.
« Non vérifié » is the one section never built (by its lexicon heading); the classroom copies the
whole file.

The file has no H1 and no introduction: it opens on « Affirmations » (`sources`). In this order
(`concept-folder`):

1. « Affirmations » (`claims`), mandatory: one table, five columns in this order:
   - **claim**: the claim in a few words;
   - **section**: where `concept.md` makes it: sub-concept ids (`4b`, `9a1`) and fixed sections
     by their lexicon value, « L'essentiel », « Pièges », « Le test rapide », « Approfondissement »
     (`headings.essentials`, `pitfalls`, `quick_test`, `deepening`), several separated by
     commas, never a heading's text; each exists in `concept.md` (`sources`). « Objectif » is
     not one: it states what the learner will do, not a claim;
   - **source**: reference ids `[S1]`, separated by commas, or the `markers.course` word
     (« cours ») for a claim the course makes by its own choice; nothing else: no free text, no
     path to another concept, whose verification each concept repeats with its own reference
     (`sources`);
   - **verified**: per reference of the source cell, in the same order, the shortest quotation
     that settles the claim, between « », then its place in parentheses (section, page,
     heading); for an absence, « absent de » and the place searched; for a « cours » claim, one
     line saying what it follows from, or nothing. No reasoning, no pointer to « Non vérifié »:
     what cannot be quoted goes there (review). The cell is empty only for a « cours » claim
     (`sources`);
   - **nature**, mandatory: `consensus`, `école`, `cours` (the stance markers
     `markers.consensus`, `markers.school`, `markers.course`) or `fait` (`natures.fact`: what a
     source states with no stance, a tool's default, a date, a figure) (`sources`). A claim the
     reader text marks with a stance marker has that marker's nature; a « cours » source has
     nature `cours` (review).
2. « Références » (`references`), mandatory: one table, five columns in this order: **id**
   (`S<n>`, optionally a lowercase letter: `S5b`), unique; **source** (author, title, date: how
   the teacher names it; a description repeated from another concept is copied identically);
   **link**, one URL or empty: a second place is a second reference, never a second URL nor a
   path to a repository file (`sources`); **type**, how much to trust it and how to name it: one
   or more of `primary` (the text itself), `secondary` (someone reporting it), `marketing` (a
   vendor's or a training's page), written as the lexicon's words and separated by
   commas, then an optional remark in parentheses (« primaire, marketing (aimant à
   prospects) »); **consulted on**, when this reference was read for this concept: it starts
   with `YYYY-MM-DD`. References are per concept: each concept cites its own.
3. « Non vérifié » (`unverified`), mandatory, possibly empty: a list; each entry opens with its
   section, in the forms of the section column or `headings.stances` (« Consensus et choix
   d'école ») for a stance or a neighbour, then « : » (`sources`), then what no consulted source
   confirms, why, and, when useful, the instruction that follows (« écrire X, pas Y »). It holds
   no trace of a removed claim: git history is the trace.

Rules (`sources`): every id cited (frontmatter `refs`, source column) exists in « Références »;
every reference is cited by a claim or a frontmatter item.

### 3.5 Reader-text conventions

The structure of `concept.md` is plain Markdown under these conventions. The site maps each to
its HTML and classes; the teacher reads them as ordinary Markdown. Failure messages name the
convention.

| Convention | Form in `concept.md` | Check |
|---|---|---|
| sub-concept section | `## <id> <title>` (first level), then one paragraph entirely in italics: the **promise**; a first-level sub-concept with children holds nothing else; one without children holds its reader text after the promise | `conventions` |
| leaf heading | `### <id> <title>` (second level), then the reader text | `conventions` |
| heading title | the `<title>` of a sub-concept heading equals the `title` of `course.yaml` | `conventions` |
| concept reference | plain text `concept 4`, `concept 8a2`, `(concept 17)`, `concepts 5 et 7b`: the word (`concept_refs.concept`, plural `concept_refs.concepts`, list joined by `concept_refs.and`) then concept numbers or sub-concept ids; each names an existing concept or sub-concept of the course. To an annex, `annexe A2`, `annexe A2b`: the word `concept_refs.annex` then an annex number or the sub-concept id of an annex, which exists in the course. A bare id with no such word (`qu'en 9a`) is plain text and is not linked | `conventions` |
| stance marker | `[cours]`, `[école]`, `[consensus]` (`markers.course`, `markers.school`, `markers.consensus`) right after the claim it qualifies; no link reference definition carries a marker's label | `conventions` |
| storyline blockquote | a blockquote whose first line starts with `**Fil rouge :**` (`markers.storyline`); in the sub-concept sections, no other blockquote | `conventions` |
| diagram image | `![<title>](<file>)` alone in its paragraph, `<file>` a declared diagram and `<title>` its declared `title`; each declared diagram appears once in the body; the caption comes from the frontmatter. The image sits in the section of its `subconcept` (one of its `###` sections included) or in « L'essentiel » (review) | `conventions` |
| pitfalls | « Pièges » is one bulleted list, each item opening with the pitfall in bold | `conventions` |
| quick test | « Le test rapide » is one blockquote (the question), then at most one paragraph (the note) | `conventions` |
| plain Markdown | no H1, no `####` or deeper heading, no HTML tag, no MDX `import`/`export` or component, no `:::` directive | `conventions` |

Everything else (bold, italics, lists, paragraphs, catalogues in bold) is ordinary Markdown.
In `teaching.md`, concept references follow the same form, not checked.

## 4. Fichiers de domaine

| Reader | Needs | When |
|---|---|---|
| the learner | why the domain matters and how its concepts connect | before its concepts |
| the teacher | what it says to present the domain (`domain-presented-from-file`) | before the first concept of a domain |
| the creator (human or agent) | what each section says, and that it teaches no concept | writing or changing a domain |

`domains/<number>-<slug>.md`, un par domaine de `course.yaml`, et aucun autre fichier dans
`domains/` (règles `domain-file-named-by-number`, `course-yaml-paths-exist`,
`domain-files-listed`). Côté lecteur : le site le construit, le professeur le lit, et tout son texte
est pour le lecteur (règle `domain-text-for-reader`). Il n'enseigne aucun concept et n'affirme
rien qu'un concept du domaine n'affirme pas ; il n'a donc pas de fichier de sources (règle
`domain-teaches-no-concept`). Il n'a pas de H1 (règle `domain-file-no-h1`).

Son frontmatter tient `description`, une phrase pour le site, et rien d'autre (règle
`domain-frontmatter-description`) ; le numéro, le titre, l'objectif et la durée du domaine sont
dans `course.yaml`.

Son corps tient quatre sections, dans cet ordre (règle `domain-sections-in-order`), chacune avec
sa part (règle `domain-section-content`) :

1. « Le problème » (`problem`) : la difficulté rencontrée sans les concepts du domaine.
2. « Le fil des concepts » (`concept_thread`) : un court paragraphe par concept du domaine, dans
   l'ordre, ouvert par `**<number>. <concept title>.**`, le titre tel que dans `course.yaml` ;
   un domaine d'un seul concept a un paragraphe pour le concept, puis un par sous-concept de
   premier niveau, ouvert par `**<id>. <title>.**` (règle `concept-thread-paragraphs`). La
   première phrase de chaque paragraphe, après l'amorce, se lit seule, pour qu'un consommateur
   la montre seule (ci-dessous).
3. « D'où l'on vient, où l'on va » (`from_to`) : ce que le domaine précédent donne à celui-ci,
   et ce que celui-ci donne au suivant.
4. « Un cas qui traverse le domaine » (`crossing_case`) : une situation du fil rouge où chaque
   concept du domaine sert, dans l'ordre, sans donner la réponse.

**Première phrase** : elle finit par `.`, `?` ou `!` dans les 300 caractères qui suivent
l'amorce, pour que le site la montre (règle `domain-first-sentence-ends`, vérifiée par le check
`domain-first-sentence`, qui bloque), et ne s'ouvre pas sur un mot de la liste `checks.anaphora`
du lexique (« Il », « Elle », « Ce », « Cette », « Puis »…), pour qu'elle se lise seule (règle
`domain-first-sentence-stands-alone`, vérifiée par le check `domain-first-sentence-standalone`,
qui signale).

## 5. Fichiers du cours

| Reader | Needs | When |
|---|---|---|
| the teacher | its posture, the onboarding questions, the course's stances, the storyline facts its cases use | onboarding; each case it poses |
| the learner | the course glossary and the storyline | reading the course on the site |
| the creator (human or agent) | the terms to use and the defining concept of each, the storyline facts a case may draw on | writing a concept or a case |
| the maintainer | what changed in each course version | each release |

- **`plan.md`** : une première section `##` « Public cible » (`audience`), la prose complète du
  public (règle `plan-audience-first`) ; une section `##` « Accueil » (`onboarding`), ce que le
  professeur prend du cours pour accueillir un nouvel apprenant : un paragraphe qui donne la
  posture du professeur (« Posture : Product Owner senior qui forme l'apprenant. »), puis la liste
  numérotée des questions d'accueil, au moins une, chacune `<n>. **<question label>** : <question>`, les
  libellés distincts ; la liste clôt la section (règles `plan-onboarding-section`,
  `onboarding-question-form`). Le protocole demande d'abord le pseudo de l'apprenant, puis ces
  questions dans leur ordre, et dit où vont les réponses (`teacher/README.md`, règles
  `teacher-posture-from-plan`, `onboarding-questions-announced`, `onboarding-questions-order` et
  `onboarding-profile-written`). Aucune question ne porte sur le rythme : le professeur ajuste le
  rythme au fil du cours (règle `onboarding-asks-no-pace`). Viennent ensuite, au choix de
  l'auteur, des sections `##` que le professeur lit : les partis pris du cours (« Parti pris : une
  équipe en sprints »), ses propres règles d'écriture ; et un H1 (règle
  `plan-optional-sections`).
- **`glossary.md`** : une introduction et un H1, au choix de l'auteur (règle
  `glossary-intro-and-h1`) ; un tableau, avant toute section `##`, de quatre colonnes dans cet
  ordre (règle `glossary-table-four-columns` ; ce fichier les nomme par leur sens, et le texte de
  leur en-tête est celui du cours, « Concept » ou « Défini dans ») :
  1. le terme du cours, dans la **cellule du terme** (ci-dessous) ;
  2. son terme anglais, vide quand le terme n'a pas d'équivalent anglais utile ou quand le terme
     du cours est déjà le mot anglais (règle `glossary-english-term`) ;
  3. la définition, qui résume le texte lecteur du concept de définition et n'affirme rien qu'il
     n'affirme pas (règle `glossary-definition-from-concept`) ;
  4. le **concept de définition** : un numéro de concept de `course.yaml` (règle
     `glossary-defining-concept-form`), le concept qu'un apprenant ouvre pour creuser le terme,
     celui dont le texte lecteur l'enseigne (son objectif ou l'un de ses sous-concepts en traite),
     pas un concept qui l'emploie ou le définit en passant avec une référence de concept vers un
     autre (règle `glossary-defining-concept-teaches`). Deux concepts qui enseignent le terme
     aussi à fond font d'ordinaire deux termes, sur deux lignes ; sinon le concept de définition
     est le premier dans l'ordre du cours. Un concept du cours enseigne chaque terme du glossaire
     (règle `glossary-term-taught`) : un terme qu'aucun concept n'enseigne est un manque du cours
     (son explication entre dans un concept) ou quitte le glossaire. Le glossaire ne liste pas les
     concepts qui emploient un terme : un script ou le site le calcule à partir des variantes
     (règle `glossary-no-usage-list`).

  Une section « Termes à éviter » (`avoid`) complète le glossaire au choix de l'auteur : un
  tableau de trois colonnes, le terme à éviter, ce qu'il faut dire à la place, pourquoi (règle
  `glossary-avoid-section`). Le site lit le premier tableau tel quel.

  **Cellule du terme** : un terme, ou ses variantes séparées par des virgules (« Product Owner,
  PO »), chacune reconnue en mot entier, casse ignorée. Une parenthèse est un qualificatif de sens
  (« État (d'un élément) »). Une variante appartient à une seule ligne : deux lignes ne tiennent
  pas la même variante, casse ignorée, qualificatif compris (règle `glossary-variant-in-one-row`).

  **Ordre** : un terme est employé après son concept de définition, dans l'ordre du cours (règle
  `glossary-term-after-defining-concept`, vérifiée par le check `glossary-order`, qui signale sans
  bloquer). Le check lit le texte lecteur, le `concept.md` de chaque concept : son corps et son
  frontmatter (les textes de `stances` et de `neighbors`, le `title` et la `caption` de
  `diagrams`) ; il ne lit pas `teaching.md`. Chaque emploi compte, pas seulement le premier. Dans
  le `concept.md` d'un concept qui vient avant le concept de définition, le terme figure dans une
  phrase qui porte une référence de concept (section 3.5) vers le concept de définition ou vers
  l'un de ses sous-concepts (« annexe A2 », « annexe A2b » pour une annexe), ou, ce que la revue
  vérifie, dans une phrase qui le définit en passant (règle `term-defined-in-passing`). Une phrase
  finit à « . », « ? », « ! » ou « … » suivi d'une espace ou de la fin de son bloc ; « : » et
  « ; » ne la finissent pas. Un paragraphe, une citation, un élément de liste, un titre, une ligne
  de tableau et un texte de frontmatter sont des blocs, et une phrase ne franchit pas un bloc.
  Le check saute la ligne dont la cellule du terme porte un qualificatif de sens, faute qu'un
  script distingue les sens d'un homonyme ; la revue vérifie son ordre (règle
  `qualified-term-order-reviewed`).
- **`storyline.md`** : le fil rouge, en prose libre dans la langue de la spec, que le professeur
  lit et que le site montre. Il nomme le rôle que l'apprenant y tient (règle
  `storyline-names-learner-role`). Les cas y prennent leurs acteurs et leurs faits, sans le
  contredire (règle `cases-follow-storyline`).
- **`CHANGELOG.md`** : une section « Non publié » (`unreleased`), vide s'il n'y a rien à
  publier, d'abord (règle `changelog-unreleased-first`) ; puis une section par version publiée,
  la plus récente d'abord, `## X.Y.Z, YYYY-MM-DD` (règle `changelog-release-sections`). Une entrée
  est une ligne `- MAJOR|MINOR|PATCH, <where> : <what>` (règle `changelog-entry-form`). Une
  introduction et un dernier paragraphe libre (la ligne qui relie le cours à son histoire d'avant
  0.1.0) complètent le fichier au choix de l'auteur (règle `changelog-intro-and-closing`).

## 6. Diagrams

**Purpose.** A diagram shows in one drawing what a sub-concept teaches. One SVG serves every
place the learner meets it, so it is complete on its own and no consumer asks it to change.

| Reader | Needs | When |
|---|---|---|
| the learner | a drawing readable on the site in both themes and in the desktop panel; in the terminal, its caption and the site link | at the sub-concept it illustrates |
| the creator (human or agent) | the contract an SVG meets (6.1) and the style it is drawn in (6.2) | drawing or redrawing a diagram |
| the site | the one property a consumer keeps when it displays a diagram (below) | at each build |
| the teacher | the same property, in the desktop panel | sending a diagram |
| the reviewer | the style and the match with the caption, which no script checks | reviewing a diagram |

A **diagram** is one SVG in the concept folder, declared in `diagrams` (section 3.1). It serves
both builds: the site shows it, the teacher sends it to the desktop panel and says its caption;
in the terminal, the teacher says the caption and gives the site link. A consumer displays the
SVG so that `currentColor` follows the colour of the text around it, and may tint the three
classes of 6.1, never must. Section 6.1 is the drawing contract, checked by `svg-contract`
where a script can tell, by review otherwise; section 6.2 is the style every diagram of a course
shares, for the writers and the reviews.

### 6.1 Drawing contract

**Purpose.** The rules that keep one SVG safe and readable in every consumer: `svg-contract`
checks what a script can tell, a review the rest (below).

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | what an SVG may hold, to pass `svg-contract` | drawing a diagram |
| the site | an SVG shown as it is: no script, no external resource, colours that follow the text around it | at each build |
| the teacher | an SVG the desktop panel shows as it is | sending a diagram |
| the learner | with a screen reader, the title and description of the drawing | reading a concept on the site |

- **File**: `<stem>.svg`, the stem lowercase ASCII words joined by hyphens; well-formed XML;
  32 KB at most.
- **Frame**: the root `<svg>` has `xmlns` and a `viewBox`, and no `width` or `height`.
- **Colour**: the root has `fill="currentColor"`. Every `fill` and `stroke` is `currentColor`
  or `none`; shades come from `fill-opacity`, `stroke-opacity` and `opacity`. No other colour
  value (hex, `rgb()`, named), no `style` attribute, no `<style>` element. The only classes are
  `primary`, `secondary` and `muted`: a consumer's stylesheet may set their `color` (and the
  dark theme's), which re-tints `currentColor`. Outside the site (desktop panel, any viewer) the
  drawing stays readable in one colour.
- **Text**: words are `<text>` (and `<tspan>`), never paths; the diagram has at least one
  `<text>`. Fonts: only the attribute `font-family` with generic families (`system-ui`,
  `sans-serif`, `serif`, `monospace`); no font file, no `@font-face`.
- **Accessibility**: the root has `role="img"` and `aria-labelledby` naming its `<title>` (and
  `<desc>` if present). `<title>` is the root's first child and equals the frontmatter `title`;
  `<desc>`, optional, describes the drawing for screen readers. Their ids start with the stem
  (`gateau-titre`).
- **Groups**: every drawn child of the root is a `<g>` with an `id`; a `<defs>`, which is not
  drawn, may sit at the root beside them, and what it holds follows this contract. Group ids are
  `<sub-concept>-<element>`: a sub-concept id of the concept, a hyphen, lowercase ASCII letters
  and digits joined by hyphens (`9a1-couches`, `9a1-tranche-1`); never a bare sub-concept id, which is the reader-text
  anchor. Ids are unique across the concept's diagrams.
- **Forbidden**: `<script>`, `on*` attributes, `<image>`, `<foreignObject>`, any `href` or
  `xlink:href` not starting with `#`, any external resource.

Nothing checks that the drawing says what its caption says: a review does.

### 6.2 Style

**Purpose.** One meaning per class and six principles, so that the same role looks the same from
one concept to the next, whoever draws it.

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | which class and opacity each role takes, what a diagram holds | drawing or redrawing a diagram |
| the reviewer | the principles a diagram is judged against | reviewing a diagram |

Every diagram of a course is drawn in one style, whoever draws it (a migration, `course-batch`,
a contributor): the same role takes the same class from one concept to the next (decision
`one-diagram-style`). It is written for the diagrams to draw, not for compatibility with older
ones: six principles. No script checks it: a review does.

Each class means one thing in every diagram: **`primary`** what the diagram teaches, its focus;
**`secondary`** the contrast, a second element set against the first; **`muted`** the context
and the ordinary text.

1. **One idea per diagram.** A diagram shows what its caption says; a caption that needs two
   sentences means two diagrams.
2. **Roles.** A diagram has a subject, at most one contrast, a context and text. A series is the
   subject in levels; a state (done, not done, refused) is said by form.
3. **Rendering of the roles.**
   - subject: `primary`, opacity 1;
   - series: `primary` at falling opacity (1, 0.7, 0.4);
   - contrast: `secondary`;
   - context: `muted`, a low opacity for fills, a middle one for lines;
   - text: `muted`, opacity 1; `primary` only when the word is the subject;
   - state: solid for done, dashed for not done or uncertain, struck for refused.

   In one colour, nothing is more marked than the subject; the contrast differs from the subject
   by opacity or form, not by hue alone.
4. **Readable in one colour.** Opacity and form carry every distinction, never the hue alone.
   Text is always legible: never knocked out of a fill, never on a fill darker than itself.
5. **Composition.** The `viewBox` is 600 units wide by default. The diagram reads left to right
   or top to bottom; it holds few elements, with space between them. Its text is in the
   course's words, never under 14 units.
6. **Text the diagram holds.** Its labels, and a key (a sample and a word) when a distinction of
   form or opacity must be named. No teaching sentence: that is the `caption`. No decoration,
   icon or gradient.

## 7. The lexicon of the course files

**Purpose.** The words a program must recognise in a course file (a heading, a case field, a
qualifier, a marker, a nature, a concept reference, a source type, a banned character), written
once, in `course/lexicon.yaml`, and named by key: the checks, the classroom build and the site
read them there, and none writes them again (decision `lexicon-not-language-pack`).

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | the headings, case field labels, qualifiers, markers and natures to write | writing any course file |
| the writer of a program that recognises a word of the course files (a check, the classroom build, the site) | the key that names the word, its group, and the file to read it from, `course/lexicon.yaml` | writing or changing that program |

`course/lexicon.yaml` holds every key below, `checks.anaphora` excepted, which is optional;
`lexicon-keys`, a test of `check-spec`, verifies it. A missing or unreadable `course/lexicon.yaml`
is a tooling error, not a defect of the course nor a rule: `course-yaml` fails on it (exit 1),
and `lexicon-keys` fails on it beside a `teacher/lexicon.yaml`. A program reads a word by its
key, never as a literal of its own. The words the teacher says and writes are the other lexicon,
`teacher/lexicon.yaml` (`teacher/README.md`, "Keys and parameters"). The values:

| Group | Keys and values |
|---|---|
| `headings` | `objective` « Objectif », `essentials` « L'essentiel », `stances` « Consensus et choix d'école » (the site's heading for the frontmatter stances, and the section a « Non vérifié » entry of `sources.md` names for a stance or a neighbour: no `concept.md` section has it), `pitfalls` « Pièges », `quick_test` « Le test rapide », `deepening` « Approfondissement »; `instructions` « Consignes », `storyline_facts` « Faits du fil rouge utilisés », `bank` « Banque d'exemples », `drawing` « Schéma »; `claims` « Affirmations », `references` « Références », `unverified` « Non vérifié »; `problem` « Le problème », `concept_thread` « Le fil des concepts », `from_to` « D'où l'on vient, où l'on va », `crossing_case` « Un cas qui traverse le domaine »; `audience` « Public cible », `onboarding` « Accueil », `avoid` « Termes à éviter », `unreleased` « Non publié » |
| `case_fields` | `usage` « Usage », `explanation` « Explication », `situation` « Situation », `question` « Question », `expected_answer` « Réponse attendue », `common_mistakes` « Erreurs fréquentes », `what_works` « Ce qui marche » |
| `qualifiers` | `fallback` « rechange », `practice` « entraînement », `aside` « aparté »: the closed list of a case heading's qualifiers (3.3) |
| `markers` | `storyline` « Fil rouge », `consensus` « consensus », `school` « école », `course` « cours » |
| `natures` | `fact` « fait »: the nature of a `sources.md` claim that a source states with no stance (3.4); the other natures are the stance markers `consensus`, `school`, `course`. Read by `sources` only: never a marker of the reader text, which `conventions` checks |
| `concept_refs` | `concept` « concept », `concepts` « concepts », `and` « et », `annex` « annexe »: the words of a concept reference (3.5) |
| `source_types` | `primary` « primaire », `secondary` « secondaire », `marketing` « marketing » |
| `typography` | `banned`: the characters course text never uses (the em-dash, the arrows) |
| `checks` | `anaphora`, optional: the words a domain paragraph's first sentence does not open with; without it, `domain-first-sentence-standalone` fails |
