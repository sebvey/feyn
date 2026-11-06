# linear-course : le cours

| Reader | Comes for | Opens |
|---|---|---|
| creator | what a course is, the templates, how to verify | sections [1](#1-le-dossier-du-cours) to [7](#7-le-lexique-des-fichiers-du-cours), [`templates/README.md`](templates/README.md), [`course-specs/check-course`](../../../check-course) |
| builder | the shape of a course, the form of the concept file and of the course files, the lexicon of the course files | sections [1](#1-le-dossier-du-cours) to [7](#7-le-lexique-des-fichiers-du-cours), [`form.yaml`](form.yaml), [`schemas/`](schemas/) |
| verifier | the rules of a course as data, the checks, their fixtures | [`rules.yaml`](rules.yaml), [`checks/README.md`](checks/README.md), [`checks/fixtures/`](checks/fixtures/) |
| spec writer | the rules, the form and the schemas of a course, the spec's decisions | [`rules.yaml`](rules.yaml), [`form.yaml`](form.yaml), [`schemas/`](schemas/), [`../decisions/`](../decisions/), [`../CHANGELOG.md`](../CHANGELOG.md) |

The readers are defined in [`spec-directives/README.md`](../../../../spec-directives/README.md#the-readers).

Ce qu'est un cours de `linear-course` : son dossier, `course.yaml`, le dossier de concept, les fichiers de domaine, les fichiers du cours, les schémas et le lexique des fichiers du cours. La portée, les fichiers, les catégories et les checks sont le `README.md` de la MAJOR ; la conformité, les niveaux, les méthodes, la sévérité et les versions sont les directives de spec, `spec-directives/1/README.md` ; le protocole que le professeur exécute est `teacher/rules.yaml`.

Les règles d'un cours, celles que la revue vérifie comprises, sont les données de [`rules.yaml`](rules.yaml), un groupe par section qui y renvoie, chacun avec son `purpose` ; les tables de champs sont les schémas JSON de [`schemas/`](schemas/) ; la forme du fichier de concept (ses parties, les champs d'une unité, leur ordre, leur présence, publiés ou non, leurs lecteurs, la longueur d'une unité) et celle des fichiers du cours (`course.yaml`, `plan.md`, le fichier de domaine, `storyline.md`) sont la donnée de [`form.yaml`](form.yaml), qui nomme les mots par leur clé du lexique. Chaque section tient sa table des lecteurs quand elle en a une, ce qui n'énonce aucune règle (l'arborescence d'un cours, ce à quoi sert un fichier, une notation) et un lien vers son groupe de `rules.yaml` et, pour une table de champs, vers son schéma JSON (#524, #531, #533). Les sections 1 à 7 viennent des sections 2 à 7 et 9 de la description de la spec avant la séparation (#323, lue à `9c691da^:specs/linear-course/1/SPEC.md`).

Chaque concept est une source, écrite une fois : un **fichier de concept**, `concept.md`, découpé en **unités**, un message du professeur chacune, dont chaque champ est **publié** ou **non publié**, une propriété de la spec (`form.yaml`), jamais écrite dans le cours. Le site construit les parties publiées, et rien d'autre ; le professeur lit le fichier entier. Le site et la classe sont des builds du cours, sans réécriture.

## 1. Le dossier du cours

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | the files a course has, which are mandatory, where each one's form is given | creating a course; adding a domain or a concept |
| the site | where each file it builds is | at each build |
| the reviewer | that a change sits where the spec puts it, in plain CommonMark | reviewing a change |

```
courses/<id>/
  course.yaml          la carte : identité, domaines, concepts (section 2)
  plan.md              prose : public, accueil, progression, partis pris, règles d'écriture (section 5)
  glossary.md          le glossaire du cours (section 5)
  storyline.md         le fil rouge : le monde, puis les faits fixés (section 5)
  CHANGELOG.md         le journal des versions du cours (section 5)
  domains/N-slug.md    un fichier de domaine par domaine (section 4)
  concepts/NN-slug/    un dossier de concept par concept numéroté et par annexe, son fichier de concept compris (section 3)
  decisions/           les décisions du cours ; aucun build ne le lit
```

Les règles du dossier du cours sont le groupe « Le dossier du cours » de [`rules.yaml`](rules.yaml).

## 2. `course.yaml`

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | the course order: its domains, its concepts and their prerequisites | designing the course; each change of its plan |
| the teacher | the order it teaches in, the prerequisites | each teaching session |
| the site | titles, objectives, durations, the order of the pages and their addresses | at each build |
| the maintainer | the identifiers whose change is a course MAJOR (section 3) | classing a course change |

`course.yaml` est la carte du cours : son identité, ses domaines et ses concepts, rien sous le concept ; l'arbre d'un concept est dans son `concept.md` (section 3), et à qui le cours s'adresse, dans « Public cible » de `plan.md` (section 5). Le site, le build de la classe et les checks lisent `course.yaml` ; le site compose depuis lui l'enchaînement des concepts d'un domaine (section 4).

Ses champs sont décrits par le schéma JSON [`schemas/course.schema.yaml`](schemas/course.schema.yaml), que `course_map` de [`form.yaml`](form.yaml) nomme avec ses lecteurs ; ses règles sont le groupe « Le fichier course.yaml » de [`rules.yaml`](rules.yaml).

## 3. Le dossier de concept

```
concepts/09-decoupage-vertical/
  concept.md         le fichier de concept : le site en construit les parties publiées, le professeur le lit entier
  sources.md         publié : le site le construit, « Non vérifié » excepté (3.4)
  <stem>.svg         publié : un fichier par schéma (section 6)
```

L'arbre du concept est dans les titres de `concept.md` et nulle part ailleurs : une **section** est un titre `## <id> <title>`, son id le numéro du concept suivi d'une lettre (`9a`, `A2a`) ; ses **unités** sont des titres `### <id> <title>` dans la section, leur id celui de la section suivi d'un chiffre (`9a1`). Une section sans titre `###` est une section d'une unité : elle est elle-même une unité. Une unité est un message du professeur. Le créateur découpe le concept là où il l'écrit, et les checks lisent l'arbre dans ces titres.

**Identifiants.** Les numéros de concept, les ids de section et d'unité, les titres des cas supplémentaires (section 3.3), les numéros de domaine et leurs concepts, les noms `dir` des concepts et `file` des domaines sont les identifiants du cours : la mémoire de l'apprenant et les adresses du site les citent. En changer un est une MAJOR du cours (`spec-directives/1/README.md` section 6).

La forme du dossier et du fichier de concept est la donnée de [`form.yaml`](form.yaml) ; ses règles sont le groupe « Le dossier de concept » de [`rules.yaml`](rules.yaml). Une annexe a le même fichier de concept, découpé en unités (`A1a`, `A1a1`).

### 3.1 Le frontmatter de `concept.md`

Ses champs sont décrits par le schéma JSON [`schemas/concept-frontmatter.schema.yaml`](schemas/concept-frontmatter.schema.yaml) ; ses règles sont le groupe « Le frontmatter de concept.md » de [`rules.yaml`](rules.yaml).

Le site rend les positions et les voisins depuis le frontmatter, sous le titre `headings.stances`. `verified` est un matériau d'audit, comme « Affirmations » de `sources.md` : une re-vérification est un changement de `concept.md`. Un schéma déclaré dans `diagrams` nomme son unité (`unit`) : le build le place à cette unité, et le corps n'a pas de ligne d'image.

### 3.2 Le corps de `concept.md`

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | the parts of the file, in order, and what each holds | writing or changing a concept |
| the site | the published parts, to render them and nothing else | at each build |
| the teacher | the whole file: the units in order, each with its question, its corrections, its instruction | each teaching session |

Le corps tient, dans cet ordre, une **tête**, « L'essentiel », le seul résumé écrit du concept ; les sections et leurs unités ; un **pied**, « Repères » (ce que l'apprenant garde du concept entier, la question à se poser par exemple), « Approfondissement » (de la matière en plus, pour qui demande à aller plus loin) et « Consigne » (la méthode propre au concept entier, que seul le professeur lit). Ce qu'un build compose n'y est pas écrit : l'objectif vient de `course.yaml`, les pièges des idées fausses des unités. Le site construit les parties publiées de la tête et du pied ; quand le professeur lit « Approfondissement », `teacher/rules.yaml` le dit.

Ses règles sont le groupe « Le corps de concept.md » de [`rules.yaml`](rules.yaml) ; ses parties, leur ordre et leur présence sont `concept_file` de [`form.yaml`](form.yaml).

### 3.3 L'unité

| Reader | Needs | When |
|---|---|---|
| the teacher | the unit's matter to say, its anchor, the question to pose, how to correct the answer, when to pose a supplementary case | each unit; each fallback, practice case or aside |
| the learner | through the teacher or on the site, the matter, the anchor, the misconceptions and their corrections, the landmarks; through the teacher, the question, and the expected answer never before they answer | each unit |
| the site | the published fields of each unit, nothing else | at each build |
| the creator (human or agent) | what each field holds, which are mandatory, and when to write a supplementary case | writing a unit |
| taught-check | what each question asks, against what the learner was taught before it | after a change to what a concept teaches |

Une unité est un bloc de Markdown, une liste de champs étiquetés, chacun `- **<libellé>** : <texte>`, dont les libellés sont les `unit_fields` du lexique : sa **matière** (« Matière », ce qui est vrai, les mêmes mots pour le site et le professeur), son **ancrage** (« Ancrage », la situation du fil rouge où la matière se voit), sa question (« Question ») et sa réponse attendue (« Réponse attendue »), ses **idées fausses** (« Idées fausses », chacune avec sa correction et ses **relances** imbriquées, « Relance »), ses **repères** (« Repères ») et sa **consigne** (« Consigne », ce que la méthode a de propre à l'unité). Lesquels sont obligatoires, leur ordre, lesquels sont publiés et qui les lit sont `unit` de [`form.yaml`](form.yaml).

Un **cas supplémentaire** est un titre `####` de l'unité, `#### <title> (<qualifier>)` : son titre est son identifiant, son **qualificatif** lui donne son type, et il tient les champs d'une unité sans matière ni consigne. Il n'est pas publié. Quand le professeur pose chaque type, les groupes `loop` et `practice-skip-asides` de `teacher/rules.yaml` le disent :

| Type | Qualificatif (clé) |
|---|---|
| rechange | « rechange » (`qualifiers.fallback`) |
| entraînement | « entraînement » (`qualifiers.practice`) |
| aparté | « aparté » (`qualifiers.aside`) |

Les règles de l'unité sont le groupe « L'unité » de [`rules.yaml`](rules.yaml).

### 3.4 `sources.md`

| Reader | Needs | When |
|---|---|---|
| the site reader | to know the course is grounded; where to read further; which claim is consensus, school or the course's choice | reading a concept |
| the teacher | the source as described, to answer « d'où ça vient ? », and what is not verified (`teacher/rules.yaml`, group `stances-and-sources`) | on the learner's request |
| the creator (human or agent) | what to source and what not to; where to put what could not be confirmed | writing the concept |
| the reviewer | that a claim is backed by what it cites: the quotation, the place | reviewing a change |
| the maintainer | when a source changes or a section is rewritten, what to re-verify; when it was consulted | months later |

`sources.md` trace les champs publiés de `concept.md` (« Matière », « L'essentiel », « Repères », « Approfondissement », les corrections des idées fausses) : « Affirmations » relie chaque affirmation à ce qui l'établit, « Références » décrit les sources, « Non vérifié » dit ce qu'aucune source consultée ne confirme. Le site construit chaque ligne de « Affirmations » et de « Références » ; « Non vérifié » est la seule section qu'il ne construit pas, reconnue par son titre du lexique ; la classe copie le fichier entier.

Les règles de `sources.md` sont le groupe « Le fichier sources.md » de [`rules.yaml`](rules.yaml).

### 3.5 Les conventions du texte

La structure de `concept.md` est du Markdown simple sous des conventions : le site fait de chacune son HTML et ses classes, le professeur les lit comme du Markdown ordinaire. Hors d'elles (gras, italique, listes, paragraphes, catalogues en gras), le texte est du Markdown ordinaire ; dans une unité, il convient que le gras marque un terme du glossaire (3.6). Elles valent dans ce que l'apprenant lit ou entend, la consigne exceptée (`readers` de [`form.yaml`](form.yaml)).

Une **référence de concept** est du texte simple : le mot `concept_refs.concept` (au pluriel `concept_refs.concepts`, une liste jointe par `concept_refs.and`) puis des numéros de concept ou des ids de section ou d'unité, `concept 4`, `concept 8a2`, `(concept 17)`, `concepts 5 et 7b` ; vers une annexe, le mot `concept_refs.annex` puis un numéro d'annexe ou l'id d'une section ou d'une unité d'annexe, `annexe A2`, `annexe A2b`. Un id nu sans ce mot (`qu'en 9a`) est du texte simple, sans lien. Un **marqueur de position** est `[cours]`, `[école]` ou `[consensus]` (`markers.course`, `markers.school`, `markers.consensus`).

Les règles de ces conventions sont le groupe « Les conventions du texte » de [`rules.yaml`](rules.yaml).

### 3.6 Les ajouts d'une unité

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | what writing a unit adds outside the concept file, and whether it was added | writing a unit, then the sources of its concept |
| the reviewer | which additions a script verified, so the review reads the rest | reviewing a change |

Écrire une unité ajoute hors du fichier de concept : ce sont ses **ajouts**. Un fait que son ancrage emploie entre aux « Faits fixés » de `storyline.md`, avec l'id de l'unité ; il convient qu'un passage qu'elle met en gras soit un terme de `glossary.md` : le gras d'emphase reste possible, et `unit-additions` signale un gras qui n'est pas un terme, au cas où le terme manquerait au glossaire ; une affirmation d'un champ publié a sa ligne dans « Affirmations » de `sources.md`, une fois les sources du concept écrites. Les étapes de la création d'un cours et les checks que chacune lance sont dans [`checks/README.md`](checks/README.md).

Les règles des ajouts sont le groupe « Les ajouts d'une unité » de [`rules.yaml`](rules.yaml).

## 4. Fichiers de domaine

| Reader | Needs | When |
|---|---|---|
| the learner | why the domain matters, and a situation of the storyline where its concepts serve | before its concepts |
| the teacher | what it says to present the domain (group `domain-presentation`) | before the first concept of a domain |
| the creator (human or agent) | what each section says, and that it teaches no concept | writing or changing a domain |

Un fichier de domaine, dans `domains/`, est l'entrée d'un domaine, publié : le site le construit et le professeur le lit. Il tient ce que seul le domaine dit, le problème qu'il règle et un cas du fil rouge qui le traverse ; le reste est écrit ailleurs une fois : son titre, son objectif et ses concepts dans `course.yaml`, d'où le build compose l'enchaînement de ses concepts, et sa place dans le cours dans « Progression » de `plan.md`.

Ses sections, leur ordre, leur présence, publiées ou non, et leurs lecteurs sont `domain_file` de [`form.yaml`](form.yaml) ; ses règles sont le groupe « Les fichiers de domaine » de [`rules.yaml`](rules.yaml).

## 5. Fichiers du cours

| Reader | Needs | When |
|---|---|---|
| the teacher | its posture, the onboarding questions, the course's stances, the storyline facts its anchors use | onboarding; each unit it teaches |
| the learner | the course glossary, the public and the progression of the course, the storyline | reading the course on the site |
| the site | the published sections of `plan.md` and the storyline | at each build |
| the creator (human or agent) | the terms to use and the defining concept of each, the storyline facts an anchor may draw on | writing a concept or a unit |
| the maintainer | what changed in each course version | each release |

- **`plan.md`** : à qui le cours s'adresse (« Public cible », le seul endroit qui le dit), comment le professeur accueille un nouvel apprenant (« Accueil »), la **progression** du cours (« Progression » : les domaines dans l'ordre, ce que chacun donne, comment l'un mène au suivant), puis ce que le professeur en prend pour enseigner (les partis pris, les règles d'écriture du cours) ; le professeur le lit, le site en construit le public et la progression.
- **`glossary.md`** : les termes du cours ; le site montre son premier tableau tel quel.
- **`storyline.md`** : le fil rouge, que le professeur lit et que le site montre, en deux parties : le **monde** (le cadre, les acteurs, les sources), en prose libre, puis les **faits fixés** (« Faits fixés »), chacun suivi de l'id de l'unité qui l'a fixé, `(0d)`.
- **`CHANGELOG.md`** : le journal des versions du cours.

**Cellule du terme** : la première colonne du tableau du glossaire tient un terme, ou ses variantes séparées par des virgules (« Product Owner, PO »), chacune reconnue en mot entier, casse ignorée. Une parenthèse est un qualificatif de sens (« État (d'un élément) »).

Les parties de `plan.md` et de `storyline.md`, leur ordre, leur présence, publiées ou non, et leurs lecteurs sont `plan` et `storyline` de [`form.yaml`](form.yaml) ; les règles de ces fichiers sont le groupe « Les fichiers du cours » de [`rules.yaml`](rules.yaml).

## 6. Les schémas

| Reader | Needs | When |
|---|---|---|
| the learner | a drawing readable on the site in both themes and in the desktop panel; in the terminal, its caption and the site link | at the unit it illustrates |
| the creator (human or agent) | the contract an SVG meets (6.1) and the style it is drawn in (6.2) | drawing or redrawing a diagram |
| the site | the one property a consumer keeps when it displays a diagram (below) | at each build |
| the teacher | the same property, in the desktop panel | sending a diagram |
| the reviewer | the style and the match with the caption, which no script checks | reviewing a diagram |

Un **schéma** est un SVG du dossier de concept, déclaré dans `diagrams` (section 3.1), qui montre en un dessin ce qu'une unité enseigne. Un même SVG sert chaque endroit où l'apprenant le rencontre, complet par lui-même : le site le montre ; le professeur l'envoie au panneau du bureau et en dit la légende ; dans le terminal, le professeur dit la légende et donne le lien du site. Chacun affiche le SVG tel qu'il est, `currentColor` suivant la couleur du texte qui l'entoure ; certains teintent en outre les trois classes `primary`, `secondary` et `muted`, et aucun ne demande au SVG de changer.

La section 6.1 est le contrat de dessin ; la section 6.2, le style que partagent les schémas d'un cours.

### 6.1 Le contrat de dessin

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | what an SVG may hold, to pass `drawing-contract` | drawing a diagram |
| the site | an SVG shown as it is: no script, no external resource, colours that follow the text around it | at each build |
| the teacher | an SVG the desktop panel shows as it is | sending a diagram |
| the learner | with a screen reader, the title and description of the drawing | reading a concept on the site |

Les nuances d'un schéma viennent de `fill-opacity`, `stroke-opacity` et `opacity`. Quand la feuille de style d'un consommateur fixe la `color` des trois classes (et celle du thème sombre), elle reteinte `currentColor`. `<desc>` décrit le dessin pour les lecteurs d'écran.

Les règles du contrat de dessin sont le groupe « Le contrat de dessin » de [`rules.yaml`](rules.yaml).

### 6.2 Le style

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | which class and opacity each role takes, what a diagram holds | drawing or redrawing a diagram |
| the reviewer | the principles a diagram is judged against | reviewing a diagram |

Le style est écrit pour les schémas à dessiner, pas pour la compatibilité avec les anciens (décision `one-diagram-style`).

Les règles du style sont le groupe « Le style des schémas » de [`rules.yaml`](rules.yaml).

## 7. Le lexique des fichiers du cours

| Reader | Needs | When |
|---|---|---|
| the creator (human or agent) | the headings, unit field labels, qualifiers, markers and natures to write | writing any course file |
| the writer of a program that recognises a word of the course files (a check, the classroom build, the site) | the key that names the word, its group, and the file to read it from, `course/lexicon.yaml` | writing or changing that program |

Le lexique des fichiers du cours, `course/lexicon.yaml`, écrit une fois les mots qu'un programme reconnaît dans un fichier du cours (un titre, un champ d'unité, un qualificatif, un marqueur, une nature, une référence de concept, un type de source, un caractère banni) et les nomme par clé : les checks, le build de la classe et le site les y lisent, par leur clé, et aucun ne les écrit à nouveau (décision `lexicon-not-language-pack`). Les mots que le professeur dit et écrit sont l'autre lexique, `teacher/lexicon.yaml` (`teacher/README.md`, « Clés et paramètres »).

Cette section n'énonce aucune règle d'un cours : le lexique est un fichier de la spec. `course/lexicon.yaml` tient chaque clé ci-dessous ; `lexicon-keys`, un test de `check-spec`, le vérifie. Un `course/lexicon.yaml` absent ou illisible est une erreur d'outillage, ni un défaut du cours ni une règle : `course-yaml` échoue dessus (code de sortie 1), et `lexicon-keys` échoue dessus à côté d'un `teacher/lexicon.yaml`. Les valeurs :

| Groupe | Clés et valeurs |
|---|---|
| `headings` | `essentials` « L'essentiel », `stances` « Consensus et choix d'école » (le titre du site pour les positions du frontmatter, et la section qu'une entrée de « Non vérifié » de `sources.md` nomme pour une position ou un voisin : aucune section de `concept.md` ne l'a), `deepening` « Approfondissement », `landmarks` « Repères », `instruction` « Consigne » ; `claims` « Affirmations », `references` « Références », `unverified` « Non vérifié » ; `problem` « Le problème », `crossing_case` « Un cas qui traverse le domaine » ; `audience` « Public cible », `onboarding` « Accueil », `progression` « Progression » ; `fixed_facts` « Faits fixés » ; `avoid` « Termes à éviter », `unreleased` « Non publié » |
| `unit_fields` | `matter` « Matière », `anchor` « Ancrage », `question` « Question », `expected_answer` « Réponse attendue », `misconceptions` « Idées fausses », `follow_up` « Relance », `landmarks` « Repères », `instruction` « Consigne » : les libellés des champs d'une unité et d'un cas supplémentaire (3.3) |
| `qualifiers` | `fallback` « rechange », `practice` « entraînement », `aside` « aparté » : la liste fermée des qualificatifs d'un titre de cas supplémentaire (3.3) |
| `markers` | `consensus` « consensus », `school` « école », `course` « cours » |
| `natures` | `fact` « fait » : la nature d'une affirmation de `sources.md` qu'une source énonce sans position (3.4) ; les autres natures sont les marqueurs de position `consensus`, `school`, `course`. Seul `sources` la lit : ce n'est pas un marqueur du texte publié, que `conventions` vérifie |
| `concept_refs` | `concept` « concept », `concepts` « concepts », `and` « et », `annex` « annexe » : les mots d'une référence de concept (3.5) |
| `source_types` | `primary` « primaire », `secondary` « secondaire », `marketing` « marketing » |
| `typography` | `banned` : les caractères que le texte d'un cours n'emploie pas (le tiret cadratin, les flèches) |
