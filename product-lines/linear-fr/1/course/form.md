# The form of a course

Generated from `course/form.yaml` and `course/lexicon.yaml` by `mise exec -- spec-directives/generate-map product-lines/linear-fr/1`: do not edit it by hand, change the form or the lexicon and run the command again.

The files of a course of `linear-fr`, each with its parts in their order: whether a part is mandatory, whether the site publishes it, and who reads it (`site` the site reader, through the build; `teacher`; `learner`, who hears it from the teacher or reads it on the site). A word is given by its key in `course/lexicon.yaml`, its value beside it. What each part holds and the rules on it are `course/README.md` and `course/rules.yaml`.

## A concept folder

Its files: `concept.md`, `sources.md`, and its diagrams, `*.svg`; nothing else.

## `concept.md`

Its frontmatter: its keys and their form are `course/schemas/concept-frontmatter.schema.yaml`. Every heading of its body opens with its kind, one kind at one level; a heading that carries an id is `<kind word> <id> : <title>`.

| Part | Word | Presence | Published | Readers |
|---|---|---|---|---|
| frontmatter, `stances` | `headings.stances` « Consensus et choix d'école » |  | yes | site, teacher, learner |
| frontmatter, `neighbors` |  |  | yes | site, teacher, learner |
| frontmatter, `diagrams` |  |  | yes | site, teacher, learner |
| title, `#` | `block_kinds.concept` « Concept », an annex `block_kinds.annex` « Annexe » | mandatory | yes | site, teacher, learner |
| head, `##` | `headings.essentials` « L'essentiel » | mandatory | yes | site, teacher, learner |
| sections, `##`, each holding its units, `###`, one to 9 | `block_kinds.section` « Section »; a unit `block_kinds.unit` « Unité » | mandatory | yes | site, teacher, learner |
| foot, `##` | `headings.foot` « Clôture » | optional | yes | site, teacher, learner |
| a block of the foot, `###` | `headings.landmarks` « Se vérifier » | optional | yes | site, teacher, learner |
| a block of the foot, `###` | `headings.deepening` « Approfondissement » | optional | yes | site, teacher, learner |
| a block of the foot, `###` | `headings.instruction` « Consigne au professeur » | optional | no | teacher |

### A unit

Its blocks, `####`, in this order, and nothing else; a block is of one publication, its fields have none of their own.

| Block | Word | Presence | Published | Readers | Fields |
|---|---|---|---|---|---|
| `lesson` | `unit_blocks.lesson` « Leçon » | mandatory | yes | site, teacher, learner | `unit_fields.matter` « Matière »; `unit_fields.misconceptions` « Idées fausses », a list, each misconception with `unit_fields.root` « Racine », `unit_fields.correction` « Correction » |
| `cases` | `unit_blocks.cases` « Cas du fil rouge » | mandatory | yes | site, teacher, learner | each case under its heading `#####` `block_kinds.case` « Cas », then `unit_fields.anchor` « Ancrage », `unit_fields.question` « Question », `unit_fields.expected_answer` « Réponse attendue », `unit_fields.misconceptions_in_play` « Idées fausses en jeu »; the field `misconceptions_in_play` names misconceptions of the unit, separated by « ; »; shown hidden on the site: `unit_fields.expected_answer` « Réponse attendue », `unit_fields.misconceptions_in_play` « Idées fausses en jeu » |
| `instruction` | `unit_fields.instruction` « Consigne au professeur », unlabelled | optional | no | teacher | its one field, prose |

The length of a teacher message: the text of `unit_fields.matter` « Matière », `unit_fields.anchor` « Ancrage », `unit_fields.question` « Question » of the unit's case, the misconceptions left out, at most 12 lines of 100 characters (above, `teacher-message-length` reports it).

## `sources.md`

Its sections, in this order.

| Part | Word | Presence | Published | Readers |
|---|---|---|---|---|
| section, `##` | `headings.claims` « Affirmations » | mandatory | yes | site, teacher, learner |
| section, `##` | `headings.references` « Références » | mandatory | yes | site, teacher, learner |
| section, `##` | `headings.unverified` « Non vérifié » | mandatory | no | teacher |

## `course.yaml`

Its fields and their form are `course/schemas/course.schema.yaml`. Published: yes. Readers: site, teacher.

## `logo.svg`

At the root of the course folder. Presence: mandatory. Published: yes. Readers: site.

## `plan.md`

Its sections, in this order, then its free sections.

| Part | Word | Presence | Published | Readers |
|---|---|---|---|---|
| section, `##` | `headings.audience` « Public cible » | mandatory | yes | site, teacher, learner |
| section, `##` | `headings.onboarding` « Accueil » | mandatory | no | teacher |
| section, `##` | `headings.progression` « Progression » | mandatory | yes | site, teacher, learner |
| free sections, `##`, of free titles, after them |  | optional | no | teacher |

## `domains/<number>-<slug>.md`

In `domains/`, `<number>-<slug>.md`: no frontmatter, its sections, in this order, and nothing else.

| Part | Word | Presence | Published | Readers |
|---|---|---|---|---|
| section, `##` | `headings.problem` « Le problème » | mandatory | yes | site, teacher, learner |
| section, `##` | `headings.crossing_case` « Un cas qui traverse le domaine » | mandatory | yes | site, teacher, learner |

## `storyline.md`

| Part | Word | Presence | Published | Readers |
|---|---|---|---|---|
| the world: its H1 and its sections of free titles, `##` |  | mandatory | yes | site, teacher, learner |
| the fixed facts, `##`, last | `headings.fixed_facts` « Faits fixés » | optional | no | teacher |

## `glossary.md`

| Part | Word | Presence | Published | Readers |
|---|---|---|---|---|
| its table, one term per row, before any section |  | mandatory | yes | site, teacher, learner |
| section, `##` | `headings.avoid` « Termes à éviter » | optional | yes | site, teacher, learner |

## `CHANGELOG.md`

| Part | Word | Presence | Published | Readers |
|---|---|---|---|---|
| the latest release, its version and its date |  |  | yes | site |
