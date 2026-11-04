# linear-course : le cours

| Reader | Comes for | Opens |
|---|---|---|
| creator | what a course is, the templates, how to verify | sections [1](#1-le-dossier-du-cours) to [7](#7-le-lexique-des-fichiers-du-cours), [`templates/README.md`](templates/README.md), [`course-specs/check-course`](../../../check-course) |
| builder | the shape of a course, the lexicon of the course files | sections [1](#1-le-dossier-du-cours) to [7](#7-le-lexique-des-fichiers-du-cours), [`schemas/`](schemas/) |
| verifier | the rules of a course as data, the checks, their fixtures | [`rules.yaml`](rules.yaml), [`checks/README.md`](checks/README.md), [`checks/fixtures/`](checks/fixtures/) |
| spec writer | the rules and schemas of a course, the spec's decisions | [`rules.yaml`](rules.yaml), [`schemas/`](schemas/), [`../decisions/`](../decisions/), [`../CHANGELOG.md`](../CHANGELOG.md) |

The readers are defined in [`spec-directives/README.md`](../../../../spec-directives/README.md#the-readers).

Ce qu'est un cours de `linear-course` : son dossier, `course.yaml`, le dossier de concept, les
fichiers de domaine, les fichiers du cours, les schémas et le lexique des fichiers du cours. La
portée, les fichiers, les catégories et les checks sont le `README.md` de la MAJOR ; la
conformité, les niveaux, les méthodes, la sévérité et les versions sont les directives de spec,
`spec-directives/1/README.md` ; le protocole que le professeur exécute est `teacher/README.md`.

Les règles d'un cours, celles que la revue vérifie comprises, sont les données de
[`rules.yaml`](rules.yaml), un groupe par section qui en énonce, chacun avec son `purpose` ; les
tables de champs sont les schémas JSON de [`schemas/`](schemas/). Chaque section tient sa table
des lecteurs quand elle en a une, ce qui n'énonce aucune règle (l'arborescence d'un cours, ce à
quoi sert un fichier, une notation) et un lien vers son groupe de `rules.yaml` et, pour une table
de champs, vers son schéma JSON (#524, #531, #533). Les sections 1 à 7 viennent des sections 2
à 7 et 9 de la description de la spec avant la séparation (#323, lue à
`9c691da^:specs/linear-course/1/SPEC.md`).

Chaque concept est une source : son dossier tient des fichiers **côté lecteur** (reader-facing :
le site les construit, le professeur les lit) et un fichier **professeur seul** (teacher-only : le
professeur le lit, le site ne le construit pas). Le site et la classe sont des builds du cours,
sans réécriture.

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

Les règles du dossier du cours sont le groupe « Le dossier du cours » de
[`rules.yaml`](rules.yaml).

## 2. `course.yaml`

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | the course order and the split of each concept into leaf sub-concepts | designing the course; each change of its plan |
| the teacher | the order it teaches in, the prerequisites, one leaf sub-concept per message | each teaching session |
| the site | titles, objectives, durations, the order of the pages and their addresses | at each build |
| the maintainer | the identifiers whose change is a course MAJOR (below) | classing a course change |

Le site, le build de la classe et les checks lisent `course.yaml`.

Ses champs sont décrits par le schéma JSON
[`schemas/course.schema.yaml`](schemas/course.schema.yaml) ; ses règles sont le groupe « Le
fichier course.yaml » de [`rules.yaml`](rules.yaml).

**Identifiants.** Les numéros de concept, les ids de sous-concept, les titres de cas
(section 3.3), les numéros de domaine et leurs concepts, les noms `dir` des concepts et `file`
des domaines sont les identifiants du cours : la mémoire de l'apprenant et les adresses du site
les citent. En changer un est une MAJOR du cours (`spec-directives/1/README.md` section 6).

## 3. Le dossier de concept

```
concepts/09-decoupage-vertical/
  concept.md         côté lecteur : le site le construit, le professeur le lit
  teaching.md        professeur seul : notes d'enseignement, banque d'exemples comprise ; le site ne le construit pas
  sources.md         côté lecteur : le site le construit, « Non vérifié » excepté (3.4)
  <stem>.svg         côté lecteur : un fichier par schéma (section 6)
```

Les règles du dossier de concept sont le groupe « Le dossier de concept » de
[`rules.yaml`](rules.yaml).

### 3.1 Le frontmatter de `concept.md`

Ses champs sont décrits par le schéma JSON
[`schemas/concept-frontmatter.schema.yaml`](schemas/concept-frontmatter.schema.yaml) ; ses règles
sont le groupe « Le frontmatter de concept.md » de [`rules.yaml`](rules.yaml).

Le site rend les positions et les voisins depuis le frontmatter, sous le titre
`headings.stances`. `verified` est un matériau d'audit, comme « Affirmations » de `sources.md` :
une re-vérification est un changement de `concept.md`.

### 3.2 Le corps de `concept.md`

Le corps de `concept.md` est le texte lecteur du concept. La section d'un sous-concept feuille
tient le **texte lecteur** de la feuille : l'explication telle qu'un lecteur du site la lit. Le
site construit « Approfondissement » comme le reste du fichier ; quand le professeur le lit,
`teacher/README.md` le dit.

Ses règles sont le groupe « Le corps de concept.md » de [`rules.yaml`](rules.yaml).

### 3.3 `teaching.md`

| Reader | Needs | When |
|---|---|---|
| the teacher | the order and split of the concept, the case to pose at each sub-concept, how to correct the answer | each leaf sub-concept; each fallback, practice case or aside |
| the learner | through the teacher, a case's explanation, situation and question; its expected answer never before they answer | each message that poses a case |
| the creator (human or agent) | when to create a case, and what each of its fields may contain | writing or changing a concept's teaching notes |
| taught-check | what each case asks, against what the learner was taught before it | after a change to what a concept teaches |

`teaching.md` est le fichier du professeur seul : ses consignes, les faits du fil rouge que ses
cas emploient, sa banque d'exemples, faite de **cas**, et sa consigne de dessin.

Le **titre** d'un cas, son identifiant, est son titre `###` sans la parenthèse ; la parenthèse
nomme son sous-concept et, au besoin, son **qualificatif**, qui lui donne son type. Quand le
professeur pose chaque type, `teacher/README.md` le dit :

| Type | Qualificatif (clé) | Le cas sert |
|---|---|---|
| principal | aucun | au sous-concept qu'il porte, au fil, dans l'ordre de « Consignes » |
| rechange | « rechange » (`qualifiers.fallback`) | quand l'apprenant échoue au cas du même sous-concept |
| entraînement | « entraînement » (`qualifiers.practice`) | quand l'apprenant s'exerce sur un concept validé ou, à la reprise, sur un concept validé lors d'une session précédente |
| aparté | « aparté » (`qualifiers.aside`) | en aparté, sur une question hors du fil |

Les champs d'un cas, dont les libellés sont les `case_fields` du lexique, et qui lit chacun :

| Champ (clé) | Qui le lit |
|---|---|
| « Usage » (`usage`) | le professeur |
| « Explication » (`explanation`) | le professeur, puis l'apprenant |
| « Situation » (`situation`) | le professeur, puis l'apprenant |
| « Question » (`question`) | le professeur, puis l'apprenant ; taught-check |
| « Réponse attendue » (`expected_answer`) | le professeur ; taught-check |
| « Erreurs fréquentes » (`common_mistakes`) | le professeur |
| « Ce qui marche » (`what_works`) | le professeur |

Les règles de `teaching.md` sont le groupe « Le fichier teaching.md » de
[`rules.yaml`](rules.yaml).

### 3.4 `sources.md`

| Reader | Needs | When |
|---|---|---|
| the site reader | to know the course is grounded; where to read further; which claim is consensus, school or the course's choice | reading a concept |
| the teacher | the source as described, to answer « d'où ça vient ? », and what is not verified (`teacher/README.md`, rules `origin-from-sources-file` and `unverified-part-told`) | on the learner's request |
| the creator (human or agent) | what to source and what not to; where to put what could not be confirmed | writing the concept |
| the reviewer | that a claim is backed by what it cites: the quotation, the place | reviewing a change |
| the maintainer | when a source changes or a section is rewritten, what to re-verify; when it was consulted | months later |

`sources.md` trace le corps de `concept.md` : « Affirmations » relie chaque affirmation à ce qui
l'établit, « Références » décrit les sources, « Non vérifié » dit ce qu'aucune source consultée
ne confirme. Le site construit chaque ligne de « Affirmations » et de « Références » ; « Non
vérifié » est la seule section qu'il ne construit pas, reconnue par son titre du lexique ; la
classe copie le fichier entier.

Les règles de `sources.md` sont le groupe « Le fichier sources.md » de [`rules.yaml`](rules.yaml).

### 3.5 Les conventions du texte lecteur

La structure de `concept.md` est du Markdown simple sous des conventions : le site fait de
chacune son HTML et ses classes, le professeur les lit comme du Markdown ordinaire. Hors d'elles
(gras, italique, listes, paragraphes, catalogues en gras), le texte est du Markdown ordinaire.

Une **référence de concept** est du texte simple : le mot `concept_refs.concept` (au pluriel
`concept_refs.concepts`, une liste jointe par `concept_refs.and`) puis des numéros de concept ou
des ids de sous-concept, `concept 4`, `concept 8a2`, `(concept 17)`, `concepts 5 et 7b` ; vers
une annexe, le mot `concept_refs.annex` puis un numéro d'annexe ou l'id d'un sous-concept
d'annexe, `annexe A2`, `annexe A2b`. Un id nu sans ce mot (`qu'en 9a`) est du texte simple, sans
lien. Un **marqueur de position** est `[cours]`, `[école]` ou `[consensus]`
(`markers.course`, `markers.school`, `markers.consensus`).

Les règles de ces conventions sont le groupe « Les conventions du texte lecteur » de
[`rules.yaml`](rules.yaml).

## 4. Fichiers de domaine

| Reader | Needs | When |
|---|---|---|
| the learner | why the domain matters and how its concepts connect | before its concepts |
| the teacher | what it says to present the domain (`domain-presented-from-file`) | before the first concept of a domain |
| the creator (human or agent) | what each section says, and that it teaches no concept | writing or changing a domain |

Un fichier de domaine, dans `domains/`, est l'entrée d'un domaine, côté lecteur : le site le
construit et le professeur le lit.

Ses règles sont le groupe « Les fichiers de domaine » de [`rules.yaml`](rules.yaml).

## 5. Fichiers du cours

| Reader | Needs | When |
|---|---|---|
| the teacher | its posture, the onboarding questions, the course's stances, the storyline facts its cases use | onboarding; each case it poses |
| the learner | the course glossary and the storyline | reading the course on the site |
| the creator (human or agent) | the terms to use and the defining concept of each, the storyline facts a case may draw on | writing a concept or a case |
| the maintainer | what changed in each course version | each release |

- **`plan.md`** : à qui le cours s'adresse, et ce que le professeur en prend pour accueillir un
  nouvel apprenant et pour enseigner ; le professeur le lit.
- **`glossary.md`** : les termes du cours ; le site montre son premier tableau tel quel.
- **`storyline.md`** : le fil rouge, en prose libre, que le professeur lit et que le site montre.
- **`CHANGELOG.md`** : le journal des versions du cours.

**Cellule du terme** : la première colonne du tableau du glossaire tient un terme, ou ses
variantes séparées par des virgules (« Product Owner, PO »), chacune reconnue en mot entier, casse
ignorée. Une parenthèse est un qualificatif de sens (« État (d'un élément) »).

Les règles de ces fichiers sont le groupe « Les fichiers du cours » de [`rules.yaml`](rules.yaml).

## 6. Les schémas

| Reader | Needs | When |
|---|---|---|
| the learner | a drawing readable on the site in both themes and in the desktop panel; in the terminal, its caption and the site link | at the sub-concept it illustrates |
| the creator (human or agent) | the contract an SVG meets (6.1) and the style it is drawn in (6.2) | drawing or redrawing a diagram |
| the site | the one property a consumer keeps when it displays a diagram (below) | at each build |
| the teacher | the same property, in the desktop panel | sending a diagram |
| the reviewer | the style and the match with the caption, which no script checks | reviewing a diagram |

Un **schéma** est un SVG du dossier de concept, déclaré dans `diagrams` (section 3.1), qui
montre en un dessin ce qu'un sous-concept enseigne. Un même SVG sert chaque endroit où
l'apprenant le rencontre, complet par lui-même : le site le montre ; le professeur l'envoie au
panneau du bureau et en dit la légende ; dans le terminal, le professeur dit la légende et donne
le lien du site. Chacun affiche le SVG tel qu'il est, `currentColor` suivant la couleur du texte
qui l'entoure ; certains teintent en outre les trois classes `primary`, `secondary` et `muted`,
et aucun ne demande au SVG de changer.

La section 6.1 est le contrat de dessin ; la section 6.2, le style que partagent les schémas
d'un cours.

### 6.1 Le contrat de dessin

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | what an SVG may hold, to pass `svg-contract` | drawing a diagram |
| the site | an SVG shown as it is: no script, no external resource, colours that follow the text around it | at each build |
| the teacher | an SVG the desktop panel shows as it is | sending a diagram |
| the learner | with a screen reader, the title and description of the drawing | reading a concept on the site |

Les nuances d'un schéma viennent de `fill-opacity`, `stroke-opacity` et `opacity`. Quand la
feuille de style d'un consommateur fixe la `color` des trois classes (et celle du thème sombre),
elle reteinte `currentColor`. `<desc>` décrit le dessin pour les lecteurs d'écran.

Les règles du contrat de dessin sont le groupe « Le contrat de dessin » de
[`rules.yaml`](rules.yaml).

### 6.2 Le style

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | which class and opacity each role takes, what a diagram holds | drawing or redrawing a diagram |
| the reviewer | the principles a diagram is judged against | reviewing a diagram |

Le style est écrit pour les schémas à dessiner, pas pour la compatibilité avec les anciens
(décision `one-diagram-style`).

Les règles du style sont le groupe « Le style des schémas » de [`rules.yaml`](rules.yaml).

## 7. Le lexique des fichiers du cours

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | the headings, case field labels, qualifiers, markers and natures to write | writing any course file |
| the writer of a program that recognises a word of the course files (a check, the classroom build, the site) | the key that names the word, its group, and the file to read it from, `course/lexicon.yaml` | writing or changing that program |

Le lexique des fichiers du cours, `course/lexicon.yaml`, écrit une fois les mots qu'un programme
reconnaît dans un fichier du cours (un titre, un champ de cas, un qualificatif, un marqueur, une
nature, une référence de concept, un type de source, un caractère banni) et les nomme par clé :
les checks, le build de la classe et le site les y lisent, par leur clé, et aucun ne les écrit à
nouveau (décision `lexicon-not-language-pack`). Les mots que le professeur dit et écrit sont
l'autre lexique, `teacher/lexicon.yaml` (`teacher/README.md`, « Keys and parameters »).

Cette section n'énonce aucune règle d'un cours : le lexique est un fichier de la spec.
`course/lexicon.yaml` tient chaque clé ci-dessous, `checks.anaphora` au choix ; `lexicon-keys`,
un test de `check-spec`, le vérifie. Un `course/lexicon.yaml` absent ou illisible est une erreur
d'outillage, ni un défaut du cours ni une règle : `course-yaml` échoue dessus (code de sortie 1),
et `lexicon-keys` échoue dessus à côté d'un `teacher/lexicon.yaml`. Les valeurs :

| Groupe | Clés et valeurs |
|---|---|
| `headings` | `objective` « Objectif », `essentials` « L'essentiel », `stances` « Consensus et choix d'école » (le titre du site pour les positions du frontmatter, et la section qu'une entrée de « Non vérifié » de `sources.md` nomme pour une position ou un voisin : aucune section de `concept.md` ne l'a), `pitfalls` « Pièges », `quick_test` « Le test rapide », `deepening` « Approfondissement » ; `instructions` « Consignes », `storyline_facts` « Faits du fil rouge utilisés », `bank` « Banque d'exemples », `drawing` « Schéma » ; `claims` « Affirmations », `references` « Références », `unverified` « Non vérifié » ; `problem` « Le problème », `concept_thread` « Le fil des concepts », `from_to` « D'où l'on vient, où l'on va », `crossing_case` « Un cas qui traverse le domaine » ; `audience` « Public cible », `onboarding` « Accueil », `avoid` « Termes à éviter », `unreleased` « Non publié » |
| `case_fields` | `usage` « Usage », `explanation` « Explication », `situation` « Situation », `question` « Question », `expected_answer` « Réponse attendue », `common_mistakes` « Erreurs fréquentes », `what_works` « Ce qui marche » |
| `qualifiers` | `fallback` « rechange », `practice` « entraînement », `aside` « aparté » : la liste fermée des qualificatifs d'un titre de cas (3.3) |
| `markers` | `storyline` « Fil rouge », `consensus` « consensus », `school` « école », `course` « cours » |
| `natures` | `fact` « fait » : la nature d'une affirmation de `sources.md` qu'une source énonce sans position (3.4) ; les autres natures sont les marqueurs de position `consensus`, `school`, `course`. Seul `sources` la lit : ce n'est pas un marqueur du texte lecteur, que `conventions` vérifie |
| `concept_refs` | `concept` « concept », `concepts` « concepts », `and` « et », `annex` « annexe » : les mots d'une référence de concept (3.5) |
| `source_types` | `primary` « primaire », `secondary` « secondaire », `marketing` « marketing » |
| `typography` | `banned` : les caractères que le texte d'un cours n'emploie pas (le tiret cadratin, les flèches) |
| `checks` | `anaphora`, au choix : les mots sur lesquels la première phrase d'un paragraphe de domaine ne s'ouvre pas ; sans elle, `domain-first-sentence-standalone` échoue |
