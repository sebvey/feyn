# linear-course : le protocole

| Reader | Comes for | Opens |
|---|---|---|
| creator | nothing here: what a course is | [`../course/README.md`](../course/README.md), [`../course/templates/README.md`](../course/templates/README.md) |
| builder | the composition of the teacher, the protocol to inject, learner memory, the keys | [Composition](#composition), [`composition.yaml`](composition.yaml), [`rules.yaml`](rules.yaml), [Clés et paramètres](#clés-et-paramètres), [`templates/learner/`](templates/learner/) |
| verifier | the rules of the protocol as data, their method; what a teacher loads and when | [`rules.yaml`](rules.yaml), [`spec-directives/1/README.md`](../../../../spec-directives/1/README.md#2-conformance) section 2, [Composition](#composition) |
| spec writer | how a rule of the protocol is named and written | [Notation](#notation), [Règles d'écriture](#règles-décriture), [`rules.yaml`](rules.yaml), [`../decisions/`](../decisions/), [`../CHANGELOG.md`](../CHANGELOG.md) |

The readers are defined in [`spec-directives/README.md`](../../../../spec-directives/README.md#the-readers).

Le protocole pédagogique de `linear-course`, la partie de la spec que le professeur exécute : des
règles nommées par un slug, en neuf familles, toutes dans [`rules.yaml`](rules.yaml), leur seule
source. Ce fichier dit comment une règle s'écrit et n'en énonce aucune. Le protocole a la version de
la spec (le `README.md` du MAJOR) ; ajouter ou changer une règle est un MINOR de la spec
(`spec-directives/1/README.md` section 6). Le build de la classe place les règles de chaque partie
là où le dit la [Composition](#composition) : les permanentes dans les instructions du professeur,
celles d'un moment chargées à ce moment, à côté du modèle d'instructions, des deux lexiques et des
paramètres.

**Langue : le français, une exception bornée.** Les règles et ce fichier sont en français, la
langue de la spec (`language: fr` dans `spec.yaml` ; décision `language-policy`,
`docs/decisions/language-policy.md`) ; les clés, les ids et les slugs restent en anglais. Un
professeur ou un cours d'une autre langue suit une autre spec, pas une traduction de celle-ci
(décision `lexicon-not-language-pack`).

## Notation

- `{group.key}` (un point) : une clé de l'un des deux lexiques de la spec, `course/lexicon.yaml`,
  les mots des fichiers du cours (`course/README.md` section 7), ou `teacher/lexicon.yaml`, les
  mots que le professeur dit et écrit. Toute phrase littérale que l'apprenant voit, tout mot de
  l'apprenant auquel une règle réagit, tout titre et toute valeur écrits dans la mémoire de
  l'apprenant, la typographie. Le build de la classe la remplace par la valeur du lexique (une
  liste par ses éléments entre « », séparés par des virgules). Toutes les clés sont listées dans
  [Clés et paramètres](#clés-et-paramètres).
- `{course.<name>}` : un paramètre du cours, tiré de `course.yaml` ; `{classroom.<name>}` : un
  paramètre de la classe, tiré de `course.lock`. Le build les remplace aussi.
- `{n}`, `{title}`… (sans point) : un emplacement dans une valeur, que le professeur remplit
  quand il parle ou écrit.
- `course/` est la copie du cours dans la classe, en lecture seule ; `learner/` est la mémoire de
  l'apprenant, les trois fichiers de `teacher/templates/learner/`.
- Les règles sont dans [`rules.yaml`](rules.yaml), par groupes, dans l'ordre des familles. Un
  groupe a un `id` (son slug), un `title`, un `purpose` (ce à quoi sert le groupe), une `category`
  (sa famille), une `method` (`demonstration`, par les fresh tests) et ses `rules`. Une famille est
  un groupe dont l'`id` est sa catégorie : il porte les règles placées directement sous la
  famille, et les autres groupes de la famille le suivent.
- Une règle a un `id` (son slug), un `level`, un `text`, et peut avoir un `why` (ce que fait le
  professeur sans la règle, là où une dérive a été vue dans un test ou une session) et un `origin`
  (l'issue ou la décision feyn d'où elle vient). Chaque règle est testable.
- Une règle est nommée par un slug, comme une décision (décision `rules-named-by-slug`) : deux à
  cinq mots, en minuscules, reliés par des tirets, qui nomment le comportement, en anglais quelle
  que soit la langue de la spec. Une autre règle la cite en code, « (règle
  `one-question-per-message`) », comme le font les tableaux, le `README.md` du MAJOR,
  `course/README.md` et les tests ; une décision ne cite aucun id de règle (décision
  `decision-format`). Une règle n'a pas de numéro : son ordre et sa famille peuvent changer, son
  slug non ; le slug d'une règle retirée n'est jamais réutilisé.
- Le slug d'un groupe a la forme de celui d'une règle, à ceci près qu'un mot suffit, et partage
  leur espace de noms : aucun groupe et aucune règle n'ont le même slug (décision
  `rule-groups-replace-ranges`). Un groupe se cite en code après « groupe » ou « group » ; un
  ensemble de règles se cite par un groupe, jamais par une plage « X à Y ».

## Règles d'écriture

Décidées par le mainteneur le 2026-10-27 (débrief, issue #92) et le 2026-10-28 (issue #122) ;
chaque rédacteur les tient.

- Une règle se suffit à elle-même : les tests la citent par son slug et la lisent seule. Elle
  nomme ce dont elle parle : aucun pronom dont le nom est dans une autre règle, aucun
  « ci-dessus ».
- Une règle dit un comportement, qu'un test vérifie seul. Plusieurs clés, éléments ou branches
  d'un même acte, une borne écrite dans l'acte, une lecture nommée comme source de l'acte, ou une
  phrase ou une formule fixe dite avant le premier appel d'outil (la forme de la règle de la
  phrase d'attente) restent dans une règle. Deux actes qu'un test signalerait à part sont deux
  règles : à des moments différents, ou l'un dans le texte et l'autre dans les appels d'outil ou
  dans `learner/` ; un message entier envoyé sans appel d'outil est un comportement à côté de ce
  que dit le message. Une proposition qui rappelle un comportement qu'une autre règle porte peut
  rester ; les tests citent la règle qui le porte. Une règle scindée en deux reçoit deux slugs.
- Le `text` et le `why` d'une règle tutoient le professeur ; ils ne parlent jamais de lui à la
  troisième personne.

## Composition

La composition du professeur est ce dont un professeur est fait, à côté de la façon dont il se
comporte (le protocole) : cinq parties, chacune définie par le moment où elle se charge et par ce
qu'elle tire de la spec, du cours, de la mémoire de l'apprenant et de la classe. C'est une donnée,
dans [`composition.yaml`](composition.yaml), dont l'en-tête nomme les listes fermées de `loads` et
de `from` ; cette section la décrit. Elle ne nomme aucun mécanisme d'une cible : la façon dont une
partie se réalise appartient au build de la classe (`classroom-builder/`), si bien qu'une seconde
cible se construit depuis la même composition.

| Partie | Se charge | Tire de |
|---|---|---|
| `permanent` | `every-message` | les règles du protocole avec le `purpose` de leurs familles et de leurs groupes (spec, `rules.yaml`), la posture (cours, `plan.md` sous `headings.onboarding`), la carte du cours et les noms des fichiers du cours (cours, `course.yaml`), les deux lexiques (spec, `lexicon.yaml` et `../course/lexicon.yaml`), les paramètres de la classe (classe, `course.lock`) |
| `on-demand` | `at-a-moment` | à chacun de ses moments (accueil, reprise, un schéma demandé ou déclaré au sous-concept en cours, l'arrêt, une remise à zéro), les règles de ce moment (groupe `onboarding`, groupe `resume`, la famille `stop`, les règles `requested-diagram-shown` et `diagram-not-displayable` ; aucune encore pour une remise à zéro) et ce que ce moment lit |
| `course-reads` | `during-the-session` | le cours tel qu'il est copié, lu quand le protocole le dit : le fil rouge, le fichier de domaine, le `concept.md` du concept (la matière) et son `teaching.md` (la méthode), `sources.md` sur demande, le glossaire du cours |
| `learner-memory` | `at-start-and-save-points` | les modèles de la mémoire de l'apprenant (spec, `templates/learner/`), les règles de la mémoire (la famille `learner-memory`), les trois fichiers de `learner/` ; rien du cours |
| `permissions` | `always` | ce qu'un professeur écrit, `learner/` et ses commits, jamais poussés, et ce qu'il n'écrit jamais, `course/` (règle `write-only-in-learner`) |

Deux lecteurs y viennent. Le builder, qui écrit le build de la classe : sa moitié qui dépend de ce
MAJOR, [`build/render-parts`](build/README.md), lit `composition.yaml` et `rules.yaml` pour rendre
chaque partie en texte, et la moitié à la racine (`classroom-builder/`) réalise les parties pour sa
cible. Les fresh tests ([`tests/`](tests/README.md)) : ils jugent un professeur sur ce qu'il charge
et quand, par la règle `teacher-loads-composition` (groupe `composition-loading`), une exigence de
méthode démonstration : un professeur qui charge l'accueil à chaque message, ou la reprise pour un
nouvel apprenant, n'est pas conforme. `composition` (`check-spec`, `spec-directives/1/README.md`
section 8) teste la forme du fichier, jamais son sens.

## Clés et paramètres

Chaque clé et chaque paramètre que les règles emploient, en un seul endroit : les deux lexiques,
`course/lexicon.yaml` et `teacher/lexicon.yaml`, s'écrivent depuis cette liste, et `lexicon-keys`
(`check-spec`) vérifie que chaque clé existe dans l'un d'eux. Les valeurs sont données pour
référence ; le lexique fait foi. Une valeur marquée *modèle* est un patron que le professeur suit,
pas une chaîne fixe. La colonne « Used in » cite les règles de `rules.yaml` qui emploient la clé.

**`course/lexicon.yaml`, le lexique des fichiers du cours (`course/README.md` section 7) : les clés employées ici**

| Key | Value | Used in |
|---|---|---|
| `headings.onboarding` | « Accueil » (`plan.md` : la posture, puis les questions d'accueil) | `teacher-posture-from-plan`, `onboarding-questions-announced`, `onboarding-questions-order`, `onboarding-profile-written` |
| `headings.instructions` | « Consignes » | `follow-concept-instructions` |
| `headings.bank` | « Banque d'exemples » | `examples-from-bank` |
| `headings.drawing` | « Schéma » | `requested-diagram-shown` |
| `headings.unverified` | « Non vérifié » | `unverified-part-told` |
| `headings.claims` | « Affirmations » | `origin-from-sources-file` |
| `headings.references` | « Références » | `origin-from-sources-file` |
| `headings.stances` | « Consensus et choix d'école » | `unverified-part-told` |
| `headings.deepening` | « Approfondissement » | `deepening-read-in-aside` |
| `headings.storyline_facts` | « Faits du fil rouge utilisés » | `storyline-facts-section-unsaid` |
| `case_fields.usage` | « Usage » | `case-usage-respected` |
| `case_fields.explanation` | « Explication » | `explanation-from-case` |
| `qualifiers.fallback` | « rechange » (`course/README.md` 3.3) | `follow-concept-instructions` |
| `qualifiers.practice` | « entraînement » (`course/README.md` 3.3) | `practice-cases-chosen`, `earlier-concept-retrieved-at-resume` |
| `qualifiers.aside` | « aparté » (`course/README.md` 3.3) | `asides-welcome` |
| `typography.banned` | les caractères interdits (le tiret long, les flèches que liste `typography.banned`) | `course-language-typography` |
| `typography.rules` | la typographie selon laquelle le professeur écrit : une espace avant « : », « ; », « ? », « ! » ; les guillemets « ». Elle ne répète pas l'interdit : `typography.banned` porte les caractères interdits (le tiret long, les flèches que liste `typography.banned`) | `course-language-typography` |

**`teacher/lexicon.yaml`, le lexique du professeur : les groupes qu'ajoute le protocole**

| Key | Value | Used in |
|---|---|---|
| `phrases.concept_title` | « Concept {n} : {title} » | `concept-title-link` |
| `phrases.domain_title` | « Domaine {n} : {title} » | `domain-title-link` |
| `phrases.site_link` | « le site web » | `first-message-site-and-requests`, `descriptive-site-links` |
| `phrases.domains_map_link` | « la carte des domaines » | `resume-on-greeting`, `descriptive-site-links` |
| `phrases.domains_one` | « son domaine » | `first-message-presents-course` |
| `phrases.domains_many` | « ses {n} domaines » ({n} le nombre de domaines) | `first-message-presents-course` |
| `phrases.concept_page_link` | « la page du concept {n} » | `validated-concept-page-link` |
| `phrases.example_lead` | « Exemple : » | `example-question-quote-form`, `follow-up-quote-form` |
| `phrases.question_lead` | « Question pour toi : » | `example-question-quote-form` |
| `phrases.next_lead` | « La suite : » | `next-line-form` |
| `phrases.continue_prompt` | « Des questions ? J'enchaîne ? » | `what-counts-as-one-question`, `next-line-form` |
| `phrases.questions_announce` | « J'ai {count} questions pour toi, voici la première : » ({count} en lettres) | `several-questions-announced` |
| `phrases.why` | « pourquoi ? » | `what-counts-as-one-question` |
| `phrases.banned_question` | « as-tu compris ? » | `never-ask-if-understood` |
| `phrases.reference_model` | *modèle* « {name}, au concept {n} » (« la DoD, au concept 11 ») | `concept-reference-form` |
| `phrases.waiting_example` | *modèle* « Parfait {nickname}, je prépare le concept {n}. » | `waiting-sentence-first` |
| `phrases.onboarding_setup` | « Je mets en place le cours. » | `onboarding-closing-sentence` |
| `phrases.onboarding_ready` | « C'est prêt, on démarre. » | `onboarding-ready-message` |
| `phrases.resume_opening` | « Je retrouve où on en était, un instant. » | `resume-opening-sentence` |
| `phrases.stop_opening` | « Je sauvegarde ta progression, un instant. » | `stop-opening-sentence` |
| `learner_says.faster` | « plus vite » | `first-message-site-and-requests`, `adapt-to-pace-requests` |
| `learner_says.slower` | « plus lent » | `first-message-site-and-requests`, `adapt-to-pace-requests` |
| `learner_says.example` | « exemple » | `first-message-site-and-requests`, `adapt-to-pace-requests` |
| `learner_says.exercise` | « exercice » | `first-message-site-and-requests`, `adapt-to-pace-requests` |
| `learner_says.continue` | liste, *modèle* : « on continue », « la suite » | `resume-on-continue` |
| `learner_says.resume` | liste, *modèle* : « on reprend » | `resume-on-greeting` |
| `learner_says.stop` | liste, *modèle* : « on s'arrête », « fin de session », « je dois y aller », « on reprendra » | `stop-opening-sentence` |
| `learner_says.hurry` | liste, *modèle* : « je dois filer », « vite » | `hurried-departure` |
| `memory_headings.next_step` | « Prochaine étape » | `resume-reads-progress-only`, `resume-recap-message`, `pending-question-retaught`, `practice-noted-in-next-step`, `practice-note-removed`, `course-path-offered-after-aside`, `untaught-notion-not-vigilance`, `save-next-step`, `earlier-concept-retrieved-at-resume` |
| `memory_headings.concepts` | « Concepts » | `save-concept-statuses` |
| `memory_headings.announced` | « Points annoncés pour plus tard » | `save-announced-ideas` |
| `memory_headings.journal` | « Journal » | `save-journal-line`, `earlier-concept-retrieved-at-resume` |
| `memory_headings.levers` | « Leviers » | `save-levers` |
| `memory_headings.vigilances` | « Vigilances actives » | `save-vigilances` |
| `memory_headings.acquired` | « Acquis » | `save-acquired` |
| `memory_headings.preferences` | « Préférences » | `course-form-requests`, `save-preferences` |
| `status.validated` | « validé » | `save-concept-statuses` |
| `status.in_progress` | « en cours » | `save-concept-statuses` |
| `status.skipped` | « sauté » | `skip-on-request`, `save-concept-statuses` |
| `status.to_review` | « à revoir » | `save-concept-statuses` |
| `memory.observation_line` | `date, [concept], fait : action` | `save-levers`, `save-vigilances` |
| `memory.acquired_line` | `[concept] fait (date)` | `save-acquired` |
| `memory.profile_line` | `- {label} : {answer}` (le libellé d'une question de « Accueil », la réponse de l'apprenant) | `onboarding-profile-written` |
| `memory.journal_line` | « {date}, session {k} : {events}. » (date `YYYY-MM-DD`) | `save-journal-line` |
| `memory.minirecap_entry` | « mini-récap {from}-{to} » | `save-journal-line` |
| `memory.commit_message` | « {nickname} : {what} » | `commit-after-save-point` |
| `memory.commit_validated` | « concept {n} validé » | `commit-after-save-point` |
| `memory.commit_stop` | « arrêt » | `commit-after-save-point` |
| `memory.onboarding` | « accueil » (le commit et la première ligne du journal) | `commit-after-save-point` |

Les titres, les statuts et les formats de ligne que portent les clés de `memory_headings`, de
`status` et de `memory` sont ceux de `teacher/templates/learner/` : `teacher/lexicon.yaml` et les modèles de la mémoire de
l'apprenant changent ensemble.

**Paramètres du cours** (tirés de `course.yaml`, injectés par le build de la classe)

| Parameter | Value | Used in |
|---|---|---|
| `course.title` | `title` | `teacher-posture-from-plan` |
| `course.domain_count` | le nombre de `domains` | `first-message-presents-course` |
| `course.storyline` | `storyline` (un chemin dans le dossier du cours) | `read-before-what-follows`, `examples-from-storyline` |
| `course.glossary` | `glossary` (un chemin dans le dossier du cours) | `one-term-per-notion` |

**Paramètres de la classe** (tirés de `course.lock`, injectés par le build de la classe)

| Parameter | Value | Used in |
|---|---|---|
| `classroom.site_url` | l'URL du site du cours pour le canal de la classe | `first-message-site-and-requests`, `descriptive-site-links` |
| `classroom.domains_url` | l'URL de la carte des domaines | `resume-on-greeting`, `descriptive-site-links` |
| `classroom.domain_url` | l'URL de la page d'un domaine, avec l'emplacement `{n}` | `domain-title-link` |
| `classroom.concept_url` | l'URL de la page d'un concept, avec l'emplacement `{nn}` : le numéro tel que l'écrit son `dir` (`09`, `A1`) | `validated-concept-page-link`, `concept-title-link` |
