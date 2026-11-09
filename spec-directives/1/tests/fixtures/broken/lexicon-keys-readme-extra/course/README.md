# fixture: the course

A concept folder holds the cases (`course/rules.yaml`, rule `leaf-has-a-case`); the group `cases`
holds them. A check id in code is not a rule: `concept-folder`.

| Field | Used in |
|---|---|
| `id` | `course-id-equals-folder` |

## The lexicon of the course files

Every key of `course/lexicon.yaml`, which `lexicon-keys` holds to `lists.lexicons.course` of `spec.yaml`:

| Group | Keys and values |
|---|---|
| `headings` | `essentials` « L'essentiel », `stances` « Consensus et choix d'école », `deepening` « Approfondissement », `landmarks` « Se vérifier », `instruction` « Consigne au professeur », `foot` « Clôture », `claims` « Affirmations », `references` « Références », `unverified` « Non vérifié », `problem` « Le problème », `crossing_case` « Un cas qui traverse le domaine », `audience` « Public cible », `onboarding` « Accueil », `progression` « Progression », `fixed_facts` « Faits fixés », `avoid` « Termes à éviter », `unreleased` « Non publié » |
| `block_kinds` | `concept` « Concept », `annex` « Annexe », `section` « Section », `unit` « Unité », `case` « Cas », `separator` « : » |
| `unit_fields` | `matter` « Matière », `misconceptions` « Idées fausses », `root` « Racine », `correction` « Correction », `anchor` « Ancrage », `question` « Question », `expected_answer` « Réponse attendue », `misconceptions_in_play` « Idées fausses en jeu », `instruction` « Consigne au professeur » |
| `unit_blocks` | `lesson` « Leçon », `cases` « Cas du fil rouge », `summary` « Résumé » |
| `markers` | `consensus` « consensus », `school` « école », `course` « cours » |
| `natures` | `fact` « fait » |
| `concept_refs` | `concept` « concept », `concepts` « concepts », `and` « et », `annex` « annexe » |
| `source_types` | `primary` « primaire », `secondary` « secondaire », `marketing` « marketing » |
| `typography` | `banned` : the banned characters |
