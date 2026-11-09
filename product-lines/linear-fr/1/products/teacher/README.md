# linear-fr : le professeur

| Reader | Comes for | Opens |
|---|---|---|
| creator | nothing here: what a course is | [`../../course/README.md`](../../course/README.md), [`../../course/templates/README.md`](../../course/templates/README.md) |
| builder | what a teacher of this spec must do and what it needs, which a teacher implementation makes hold | [Capacités](#capacités), [Comportements attendus](#comportements-attendus) |
| verifier | how a protocol rule is judged | [Comportements attendus](#comportements-attendus) |
| spec writer | how a protocol rule is written and classed | [Définitions](#définitions), [Comportements attendus](#comportements-attendus), [`../../decisions/`](../../decisions/), [`../../CHANGELOG.md`](../../CHANGELOG.md) |

The readers are defined in [`spec-directives/README.md`](../../../../../spec-directives/README.md#the-readers).

Ce que la spec `linear-fr` attend d'un professeur : ce qu'il fait, observable dans la conversation ou dans ce qu'il retient de l'apprenant, et ce dont il a besoin pour le faire. Le professeur est le produit que cette spec fixe sans nommer de cible : un professeur construit pour Claude Code, ou pour une autre cible, tient les mêmes comportements avec ses propres moyens, que son implémentation choisit et relie aux comportements qu'ils servent (décision `three-layers-of-a-product`). Le tamis entre la spec et l'implémentation : un professeur passé à l'échelle, sans mémoire locale ni skills, devrait-il encore le tenir ? Oui, c'est la spec ; non, c'est l'implémentation ; une chose qui mêle les deux est scindée.

**Langue : le français, une exception bornée.** Ce fichier et les comportements attendus sont en français, la langue de la spec (`language: fr` dans `spec.yaml` ; décision `language-policy`) ; les clés, les ids et les slugs restent en anglais. Un professeur d'une autre langue suit une autre spec, pas une traduction de celle-ci (décision `lexicon-not-language-pack`).

## Définitions

Les mots que les comportements attendus emploient avec un sens fixé ici. Un comportement emploie le mot, il ne le redéfinit pas.

- **L'apprenant** : la personne qui suit le cours avec le professeur.
- **Une session** : une conversation entre l'apprenant et le professeur, de son ouverture à son arrêt ou à sa coupure.
- **Le parcours** : l'ordre des domaines, des concepts et des unités que le cours fixe ; une annexe est hors du parcours.
- **Le concept en cours** : le concept du parcours que le professeur enseigne, ou qu'il reprendra à la prochaine session.
- **La mémoire de l'apprenant** : ce que le professeur retient de l'apprenant d'une session à l'autre ; ce qu'elle retient est fixé par les comportements de son sujet, son stockage par l'implémentation.

## Capacités

Ce dont un professeur a besoin pour tenir ses comportements, quelle que soit sa cible. Une implémentation fournit chacune par un moyen de son choix ; un comportement qui en dépend la suppose, il ne dit pas comment elle est fournie. Une capacité n'est ici que si un comportement attendu la suppose : la liste suit les comportements, et chaque sujet qui en écrit l'ajuste.

- **Lire le cours** : les fichiers du cours, tels que la spec les fixe (`course/README.md`), dont la carte du cours et ses annexes.
- **Retrouver et enregistrer ce qu'il sait de l'apprenant** : lire la mémoire de l'apprenant à l'ouverture d'une session, y écrire au fil de la session.
- **Connaître les adresses du site** : l'adresse du site du cours, de la carte des domaines, et de la page de chaque domaine, de chaque concept et de chaque annexe.
- **Chercher hors du cours** : trouver une source quand l'apprenant demande ce que le cours ne couvre pas.
- **Montrer un schéma, ou savoir qu'il ne le peut pas** : afficher un schéma du cours à l'apprenant, ou le savoir impossible et le dire.
- **Connaître le cours d'un coup d'œil** : le titre et « L'essentiel » de chaque concept et de chaque annexe, à tout moment de la session.

## Comportements attendus

Les comportements attendus sont dans `rules.yaml`, la forme d'un fichier de règles des directives de spec (`spec-directives/1/README.md` section 2). Ce fichier dit comment un comportement s'écrit et se classe ; il n'en énonce aucun.

**Un comportement** a :
- un `id`, son slug : deux à cinq mots, en minuscules, reliés par des tirets, en anglais, qui nomment le comportement (décision `rules-named-by-slug`) ; le slug d'un comportement retiré n'est jamais réutilisé ;
- un `text`, à la troisième personne : « Le professeur… ». Il dit ce que fait le professeur, jamais comment une implémentation l'y amène ; il se suffit à lui-même, sans pronom dont le nom est dans un autre comportement ;
- un `why`, obligatoire ici, plus strict que les directives de spec : la raison pour laquelle il est attendu, qui peut porter une preuve (une dérive vue dans une session ou un test) ; un comportement sans raison à donner n'est pas attendu ;
- sa façon d'être jugé : `method` `test` et un `check` pour un script qui lit la transcription (tant que le professeur n'a pas de scripts, un `criterion` dit ce que le script vérifiera), `method` `inspection` et un `criterion` pour un juge qui lit la transcription ou pour la lecture de la mémoire de l'apprenant après la session. Le `criterion` dit ce que le juge regarde et à partir de quoi le comportement est tenu ou non.

Une permission n'est pas un comportement à part : elle devient la limite du comportement qu'elle assouplit, dans son `criterion`, là où le juge la lit. Les comportements n'ont pas de niveau. Une mise en place ou un aiguillage (« à ce moment, lis… ») se réécrit en comportement ; un résumé d'autres comportements n'en est pas un.

**Leur classement**, que `spec.yaml` déclare sous `lists.classifications.teacher` avec le fichier `rules.yaml` :

| Clé | Ce qu'elle dit | Valeurs |
|---|---|---|
| `subject` | le sujet du comportement, l'axe du fichier : un groupe par sujet | `session-flow` (le déroulé de la session), `teaching-a-unit` (enseigner une unité), `message-form` (la forme d'un message), `storyline` (le fil rouge), `sources-and-stances` (les sources et les postures), `learner-memory` (la mémoire de l'apprenant) |
| `moment` | quand il s'applique | `session-start`, `onboarding`, `resume`, `domain-presentation`, `unit`, `stop`, `any` |
| `judged-by` | ce que lit qui le juge | `transcript-script`, `transcript-judge`, `memory-reading` |

Un groupe déclare son `subject` une fois pour ses comportements ; `moment` et `judged-by` se déclarent sur le comportement ou sur son groupe.
