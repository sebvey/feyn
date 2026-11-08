# linear-fr : le cours

| Reader | Comes for | Opens |
|---|---|---|
| creator | what a course is, the templates, how to verify | sections [1](#1-le-dossier-du-cours) to [7](#7-le-lexique-des-fichiers-du-cours), [`templates/README.md`](templates/README.md), [`product-lines/check-course`](../../../check-course) |
| builder | the shape of a course, the form of the concept file and of the course files, the lexicon of the course files | sections [1](#1-le-dossier-du-cours) to [7](#7-le-lexique-des-fichiers-du-cours), [`form.yaml`](form.yaml), [`schemas/`](schemas/) |
| verifier | the rules of a course as data, the checks, their fixtures | [`rules.yaml`](rules.yaml), [`checks/README.md`](checks/README.md), [`checks/fixtures/`](checks/fixtures/), the export `reads` of each check (the roles of [`../spec.yaml`](../spec.yaml) it reads) |
| spec writer | the rules, the form and the schemas of a course, the spec's decisions | [`rules.yaml`](rules.yaml), [`form.yaml`](form.yaml), [`schemas/`](schemas/), [`../decisions/`](../decisions/), [`../CHANGELOG.md`](../CHANGELOG.md), [`../spec.yaml`](../spec.yaml) (who reads each file) |

The readers are defined in [`spec-directives/README.md`](../../../../spec-directives/README.md#the-readers).

Ce qu'est un cours de `linear-fr` : son dossier, `course.yaml`, le dossier de concept, les fichiers de domaine, les fichiers du cours, les schémas et le lexique des fichiers du cours. La portée, les fichiers, les catégories et les checks sont le `README.md` de la MAJOR ; la conformité, les niveaux, les méthodes, la sévérité et les versions sont les directives de spec, `spec-directives/1/README.md` ; le protocole que le professeur exécute est `products/teacher/rules.yaml`.

Les règles d'un cours, celles que la revue vérifie comprises, sont les données de [`rules.yaml`](rules.yaml), un groupe par section qui y renvoie, chacun avec son `purpose` ; les tables de champs sont les schémas JSON de [`schemas/`](schemas/) ; la forme du fichier de concept (ses parties, les blocs d'une unité et leurs champs, leur ordre, leur présence, publiés ou non, leurs lecteurs, la longueur d'un message du professeur) et celle des fichiers du cours (`course.yaml`, `logo.svg`, `plan.md`, le fichier de domaine, `storyline.md`) sont la donnée de [`form.yaml`](form.yaml), qui nomme les mots par leur clé du lexique. Chaque section tient ce qui n'énonce aucune règle (l'arborescence d'un cours, ce à quoi sert un fichier, une notation) et un lien vers son groupe de `rules.yaml` et, pour une table de champs, vers son schéma JSON (#524, #531, #533). Les sections 1 à 7 viennent des sections 2 à 7 et 9 de la description de la spec avant la séparation (#323, lue à `9c691da^:specs/linear-course/1/SPEC.md`).

Chaque concept est une source, écrite une fois : un **fichier de concept**, `concept.md`, découpé en **unités**, un message du professeur chacune, dont chaque bloc est **publié** ou **non publié**, une propriété de la spec (`form.yaml`), jamais écrite dans le cours. Le site construit les parties publiées, et rien d'autre ; le professeur lit le fichier entier. Le site et la classe sont des builds du cours, sans réécriture.

## 1. Le dossier du cours

```
courses/<id>/
  course.yaml          la carte : identité, domaines, concepts, couleur d'accent (section 2)
  logo.svg             le logo du cours : une couleur, carré, sans script ni ressource externe (ci-dessous)
  plan.md              prose : public, accueil, progression, partis pris, règles d'écriture (section 5)
  glossary.md          le glossaire du cours (section 5)
  storyline.md         le fil rouge : le monde, puis les faits fixés (section 5)
  CHANGELOG.md         le journal des versions du cours (section 5)
  domains/N-slug.md    un fichier de domaine par domaine (section 4)
  concepts/NN-slug/    un dossier de concept par concept numéroté et par annexe, son fichier de concept compris (section 3)
  decisions/           les décisions du cours ; aucun build ne le lit
```

**Le logo.** `logo.svg`, à la racine du dossier, est le logo du cours, obligatoire : son nom est fixé par la spec (`logo` de [`form.yaml`](form.yaml)), aucune clé de `course.yaml` ne le nomme, et le site n'a pas de logo par défaut. Le site le montre dans son en-tête et le build en tire le favicon et l'image de partage. Son contrat suit celui d'un schéma (section 6.1) pour la couleur, et pour la même raison : une seule couleur, `currentColor` (un `fill` et un `stroke` toujours `currentColor` ou `none`, aucune autre couleur, aucun style), que le site peint dans la couleur d'accent du cours (section 2), dans chaque thème, celui que le lecteur choisit avec le bouton du site compris ; un `viewBox` carré, puisqu'il tient dans une case carrée (l'en-tête, le favicon) ; aucun script et aucune ressource externe, puisque le favicon et l'image de partage sont tirés de lui seul. Il n'a pas de gabarit : copié tel quel, un gabarit donnerait à plusieurs cours le même logo. Un logo lisible à 16 et 28 pixels se dessine en quelques traits.

Les règles du dossier du cours sont le groupe « Le dossier du cours » de [`rules.yaml`](rules.yaml).

## 2. `course.yaml`

`course.yaml` est la carte du cours : son identité, ses domaines et ses concepts, rien sous le concept ; l'arbre d'un concept est dans son `concept.md` (section 3), et à qui le cours s'adresse, dans « Public cible » de `plan.md` (section 5). Le site, le build du professeur et les checks lisent `course.yaml` ; le site compose depuis lui l'enchaînement des concepts d'un domaine (section 4).

**La couleur d'accent.** Le bloc `site` de `course.yaml` dit l'apparence du site du cours, jamais s'il est publié : chaque cours a un site, sur ses trois canaux. Il tient la couleur d'accent du cours, `site.accent_color`, obligatoire, une couleur `#rrggbb`. Le site en garde la teinte et en tire toute la famille de l'accent de chaque thème, avec sa propre luminosité, pour que le contraste reste le sien et non une règle de chaque cours ; il y peint le logo (section 1).

Ses champs sont décrits par le schéma JSON [`schemas/course.schema.yaml`](schemas/course.schema.yaml), que `course_map` de [`form.yaml`](form.yaml) nomme avec ses lecteurs ; ses règles sont le groupe « Le fichier course.yaml » de [`rules.yaml`](rules.yaml).

## 3. Le dossier de concept

```
concepts/09-decoupage-vertical/
  concept.md         le fichier de concept : le site en construit les parties publiées, le professeur le lit entier
  sources.md         publié : le site le construit, « Non vérifié » excepté (3.4)
  <stem>.svg         publié : un fichier par schéma (section 6)
```

Chaque titre de `concept.md` commence par son type, et un type est toujours au même niveau : le titre du concept en `#`, la tête, les sections et le pied en `##`, les blocs du pied et les unités en `###`, les blocs d'une unité en `####`, ses cas en `#####`. Le fichier s'ouvre sur son **titre**, `# Concept <n> : <titre>` (une annexe, `# Annexe <id> : <titre>`), celui que `course.yaml` donne au concept, qui le garde aussi : un humain qui ouvre le fichier sait quel concept il lit, et le check compare les deux. L'arbre du concept est dans les titres de `concept.md` et nulle part ailleurs : une **section** est un titre `## Section <id> : <titre>`, son id le numéro du concept suivi d'une lettre (`9a`, `A2a`) ; ses **unités** sont des titres `### Unité <id> : <titre>` dans la section, leur id celui de la section suivi d'un chiffre (`9a1`). Une section tient au moins une unité, même quand elle n'en a qu'une (`9b`, puis `9b1`) : une section n'est jamais elle-même une unité. Une unité est un message du professeur. Les mots de type sont les valeurs de `block_kinds` dans le lexique (section 7). Le créateur découpe le concept là où il l'écrit, et les checks lisent l'arbre dans ces titres.

**Identifiants.** Les numéros de concept, les ids de section et d'unité, les titres des cas (section 3.3), les numéros de domaine et leurs concepts, les noms `dir` des concepts et `file` des domaines sont les identifiants du cours : la mémoire de l'apprenant et les adresses du site les citent. En changer un est une MAJOR du cours (`spec-directives/1/README.md` section 6).

La forme du dossier et du fichier de concept est la donnée de [`form.yaml`](form.yaml) ; ses règles sont le groupe « Le dossier de concept » de [`rules.yaml`](rules.yaml). Une annexe a le même fichier de concept, découpé en unités (`A1a`, `A1a1`). Une question fréquente hors du parcours a sa matière dans une unité d'annexe, sourcée comme toute matière, avec ses idées fausses et ses cas : aucune unité n'écrit de lien vers elle, et le professeur la pose quand l'apprenant en soulève le sujet.

### 3.1 Le frontmatter de `concept.md`

Ses champs sont décrits par le schéma JSON [`schemas/concept-frontmatter.schema.yaml`](schemas/concept-frontmatter.schema.yaml) ; ses règles sont le groupe « Le frontmatter de concept.md » de [`rules.yaml`](rules.yaml).

Le site rend les positions et les voisins depuis le frontmatter, sous le titre `headings.stances`. `verified` est un matériau d'audit, comme « Affirmations » de `sources.md` : une re-vérification est un changement de `concept.md`. Un schéma déclaré dans `diagrams` nomme son unité (`unit`) : le build le place à cette unité, et le corps n'a pas de ligne d'image.

### 3.2 Le corps de `concept.md`

Le corps tient, dans cet ordre, le titre du concept (section 3) ; une **tête**, le titre `## L'essentiel`, puis son texte, le seul résumé écrit du concept ; les sections et leurs unités ; un **pied**, le titre `## Clôture`, puis ses blocs `###` : « Se vérifier » (la question que l'apprenant se pose pour vérifier sa réponse, ce qui sert à reconnaître ou à appliquer le concept entier), « Approfondissement » (de la matière en plus, pour qui demande à aller plus loin) et « Consigne au professeur » (ce que le professeur sait et ne dit pas dans le concept entier, qu'aucune unité ne dit seule, que seul le professeur lit ; son critère est celui de la consigne d'une unité, 3.3), chacun au choix, « Clôture » présente quand elle en tient un. Ce qu'un build compose n'y est pas écrit : l'objectif vient de `course.yaml`. Le site construit la tête et les parties publiées du pied ; quand le professeur lit « Approfondissement », `products/teacher/rules.yaml` le dit.

Ses règles sont le groupe « Le corps de concept.md » de [`rules.yaml`](rules.yaml) ; ses parties, leur ordre et leur présence sont `concept_file` de [`form.yaml`](form.yaml).

### 3.3 L'unité

Une unité tient trois blocs `####`, dans l'ordre où le créateur l'écrit : enseigner, demander, donner la consigne. Le titre d'un bloc est son seul mot ; qu'un bloc soit **publié** (le site, le professeur et l'apprenant le lisent) ou non (le professeur seul le lit), c'est `form.yaml` qui le dit, pas son titre. Les mots sont ceux de `unit_blocks` et `unit_fields` du lexique (section 7).

| Bloc | Publié | Tient | Présence |
|---|---|---|---|
| `#### Leçon` | oui | sa **matière**, ses deux faces, dans cet ordre : ce qui est vrai (`- **Matière** :`, les mêmes mots pour le site et le professeur), puis ce qui semble vrai et ne l'est pas, ses **idées fausses** (`- **Idées fausses** :`), chacune nommée, avec sa **racine** et sa correction | obligatoire |
| `#### Cas du fil rouge` | oui | ses **cas**, chacun sous son titre `##### Cas : <titre>`, puis ses champs : son **ancrage** (`- **Ancrage** :`, la situation du fil rouge où la matière se voit), sa question (`- **Question** :`), sa réponse attendue (`- **Réponse attendue** :`) et les idées fausses qu'il met en jeu (`- **Idées fausses en jeu** :`, les noms des idées fausses de son unité qu'il rend tentantes) | obligatoire |
| `#### Consigne au professeur` | non | sa **consigne**, en prose, sans libellé : la limite de sa matière, ce que le professeur sait et ne dit pas dans l'unité (ci-dessous) | au choix |

Dans « Leçon » et « Cas du fil rouge », chaque champ s'ouvre sur son libellé seul, `- **<libellé>** : <texte>`, rien entre le libellé et ses deux-points, ses lignes suivantes en retrait de deux espaces ; une précision ouvre le texte (`- **Question** : en deux parties : …`). Aucune ligne de l'unité n'est hors d'un bloc, ni, dans ces deux blocs, hors d'un champ ; dans « Cas du fil rouge », chaque champ est sous le titre de son cas. Les blocs, leur ordre, leur présence, leur publication, leurs lecteurs et leurs champs sont `unit` de [`form.yaml`](form.yaml).

**La leçon.** Elle tient la matière de l'unité, ses deux faces, dans l'ordre où le créateur l'écrit, avant tout cas : « Matière », ce qui est vrai, puis « Idées fausses », ce qui semble vrai et ne l'est pas, publiées et sourcées comme elle (3.4). Une idée fausse est une croyance qu'un apprenant qui a lu la matière pourrait encore avoir : son nom, court et unique dans l'unité, celui qu'un cas citera, puis la croyance citée entre « », puis, en retrait de quatre espaces, sa **racine** (`- **Racine** :`), pourquoi elle semble vraie (une expérience courante, un mot trompeur, une vérité voisine étendue trop loin), et sa correction (`- **Correction** :`), ce qui la corrige, appuyé sur la matière ; rien d'autre sous elle.

La leçon ne tient pas ce qui est propre à un cas : la situation du fil rouge va à l'ancrage du cas, le verdict à sa réponse attendue, et une idée fausse que la situation d'un cas a fait naître est réécrite en croyance générale, une seule fois dans la leçon ; un cas n'en écrit aucune. La façon de faire réfléchir va à la consigne (ci-dessous). Le site rend la matière, puis les cas, puis les idées fausses, chacune avec son nom, sa croyance, sa racine et sa correction : il ne donne pas une idée fausse avant la question.

```
#### Leçon

- **Matière** : Quand l'eau a pris trop peu au café, c'est la **sous-extraction** : […]
- **Idées fausses** :
  - **Goût et force** : « Un goût marqué, piquant ou amer, dit une tasse trop forte »
    - **Racine** : une tasse plus concentrée a un goût plus marqué, et le piquant comme l'amer semblent « en trop ».
    - **Correction** : le piquant de l'acide dit une tasse sous-extraite, l'amer avec le sec une tasse sur-extraite ; la force, la concentration de la tasse, est une autre question (concept 0b).
  - **L'amer seul** : « Une tasse amère est sur-extraite »
    - **Racine** : l'amer est bien un signe de la sur-extraction.
    - **Correction** : seul, il ne suffit pas : un café torréfié foncé est amer même bien extrait ; c'est l'amer avec le sec en bouche qui dit une tasse sur-extraite.
```

**La revue d'une idée fausse.** Une idée fausse qui ne fait que nier une phrase de la matière, sans racine qu'un apprenant pourrait suivre, est retirée ; une idée fausse écrite sur la situation d'un cas, ou qui redit une autre de son unité, est réécrite en croyance générale, ou fusionnée ; une racine creuse (« on pourrait le croire ») n'est pas une racine. Sur l'unité 0a2 de `samples/cafe`, dont la matière dit qu'une tasse sous-extraite est acide et une tasse sur-extraite amère et sèche :

| | Idée fausse | Pourquoi |
|---|---|---|
| bonne | « Goût et force » : « Un goût marqué, piquant ou amer, dit une tasse trop forte », sa racine : une tasse plus concentrée a un goût plus marqué, et le piquant comme l'amer semblent « en trop » | une croyance qu'un apprenant qui a lu la matière peut garder, et une racine qu'il peut suivre : le professeur répond à son raisonnement |
| mauvaise | « Elle pique, donc elle est trop forte », puis « Amère, donc trop forte », chacune écrite sur la tasse d'un cas | la même croyance, dite deux fois depuis deux cas, sur la situation de chacun et sans racine : la matière niée, phrase à phrase |

Une question que le cours pose et repose, sa façon propre de faire réfléchir (« et alors ? », « d'où vient ce chiffre ? »), s'écrit dans la « Consigne au professeur » de son unité, dans celle du concept quand elle vaut pour le concept entier, ou dans une section libre de `plan.md` quand elle vaut pour le cours entier (section 5) ; jamais sous une idée fausse, qui ne tient que sa racine et sa correction.

**Les cas.** « Cas du fil rouge » tient un cas au moins, chacun sous son titre `##### Cas : <titre>` (le mot `block_kinds.case` du lexique, puis le séparateur et le titre), ses champs sous lui, dans l'ordre : « Ancrage », « Question », « Réponse attendue », puis « Idées fausses en jeu ». Le premier est le **cas de l'unité**, toujours posé ; chaque autre est un **cas supplémentaire**, et les cas supplémentaires sont le stock de l'unité, où le professeur choisit : après une réponse fausse, un cas qui nomme l'idée fausse que la réponse montre ; à l'entraînement, un cas pas encore posé. Un cas supplémentaire, qui peut être posé après une réponse fausse, se suffit : son propre ancrage et sa propre question, rien d'emprunté à la question échouée. Le titre d'un cas est son identifiant, unique dans le concept. Le site publie chaque cas sous son titre et montre sa réponse attendue cachée, jusqu'à ce que le lecteur la révèle ; le professeur, lui, ne la dit qu'une fois la réponse donnée.

**Les idées fausses en jeu.** Un cas n'écrit aucune idée fausse : son dernier champ, « Idées fausses en jeu », nomme, par leurs noms séparés par « ; », celles de son unité que sa situation rend tentantes, une au moins, et seulement celles de son unité. Chaque idée fausse de l'unité est nommée par un cas au moins ; il convient que chacune de celles que nomme le cas de l'unité soit nommée aussi par un cas supplémentaire, pour que le professeur ait un autre cas à poser après une réponse fausse qui la montre. Le site rend « Idées fausses en jeu » avec la réponse attendue, une fois révélée, chaque nom un lien vers son idée fausse.

La forme d'un cas, sur l'unité 0a2 de `samples/cafe` :

```
#### Cas du fil rouge

##### Cas : La tasse qui pique

- **Ancrage** : Cédric décrit sa tasse du jour : « … »
- **Question** : en deux parties : la tasse de Cédric est-elle trop peu ou trop extraite ? Et qu'est-ce qui, dans sa description, te le fait dire ?
- **Réponse attendue** :
  1. Trop peu : elle est sous-extraite.
  2. …
- **Idées fausses en jeu** : Goût et force ; Un seul défaut

##### Cas : Le jus de pneu

- **Ancrage** : Le lendemain, Cédric écrit : « … »
- **Question** : …
- **Réponse attendue** : …
- **Idées fausses en jeu** : Goût et force ; L'amer seul ; Un seul défaut
```

« Cas du fil rouge » tient, pour chaque cas, la situation du fil rouge où la matière se voit (son ancrage), sa question, sa réponse attendue et les noms des idées fausses qu'il met en jeu. Il ne tient pas une idée fausse ni sa croyance recopiée : elles sont dans la leçon de l'unité, que le nom désigne ; ni la matière, que la réponse attendue applique sans la redire ; ni quand poser un cas, une règle du protocole, `products/teacher/rules.yaml` ; ni une question fréquente hors du parcours, dont la matière est une unité d'annexe (section 3).

**La consigne.** « Consigne au professeur » est la limite de la matière de l'unité : ce que le professeur sait et ne dit pas ici. Une phrase n'y reste que si un professeur compétent, qui lit la matière, les cas, les idées fausses, le protocole et le plan, agirait autrement sans elle, et seulement dans cette unité. Elle tient ce que l'unité n'enseigne pas et où cela s'enseigne (« Ne dire ni comment corriger la tasse de Cédric, ni quel réglage changer : c'est le concept 2 »), ce que le cours n'enseigne pas, et une question que le cours pose et repose dans cette unité (ci-dessus). Elle ne tient pas ce qui vaut pour toute unité, quand poser un cas supplémentaire ou que faire d'un concept plus loin que l'apprenant aborde : c'est une règle du protocole, `products/teacher/rules.yaml` ; ni ce qui vaut pour le cours entier, un parti pris : il va aux partis pris de `plan.md` (section 5) ; ni l'évident, ce que le professeur fait sans qu'on le lui dise : il est retiré. Plus une consigne tient de phrases, plus le professeur est rigide, plus elle contredit le protocole et s'éloigne de la matière. La consigne du pied (3.2) suit le même critère pour le concept entier.

Les règles de l'unité sont le groupe « L'unité » de [`rules.yaml`](rules.yaml).

### 3.4 `sources.md`

`sources.md` trace les champs publiés de `concept.md` qui affirment (« Matière », les racines et les corrections des « Idées fausses », « L'essentiel », « Se vérifier », « Approfondissement »), pas les cas d'une unité, dont l'ancrage vient du fil rouge et la réponse attendue redit la matière : « Affirmations » relie chaque affirmation à ce qui l'établit, « Références » décrit les sources, « Non vérifié » dit ce qu'aucune source consultée ne confirme. Le site construit chaque ligne de « Affirmations » et de « Références » ; « Non vérifié » est la seule section qu'il ne construit pas, reconnue par son titre du lexique ; la classe copie le fichier entier. Ses sections, leur ordre et leur publication sont `sources` de [`form.yaml`](form.yaml).

Les règles de `sources.md` sont le groupe « Le fichier sources.md » de [`rules.yaml`](rules.yaml).

### 3.5 Les conventions du texte

La structure de `concept.md` est du Markdown simple sous des conventions : le site fait de chacune son HTML et ses classes, le professeur les lit comme du Markdown ordinaire. Hors d'elles (gras, italique, listes, paragraphes, catalogues en gras), le texte est du Markdown ordinaire ; dans une unité, il convient que le gras marque un terme du glossaire (3.6). Elles valent dans ce que l'apprenant lit ou entend, la consigne exceptée (`readers` de [`form.yaml`](form.yaml)).

Une **référence de concept** est du texte simple : le mot `concept_refs.concept` (au pluriel `concept_refs.concepts`, une liste jointe par `concept_refs.and`) puis des numéros de concept ou des ids de section ou d'unité, `concept 4`, `concept 8a2`, `(concept 17)`, `concepts 5 et 7b` ; vers une annexe, le mot `concept_refs.annex` puis un numéro d'annexe ou l'id d'une section ou d'une unité d'annexe, `annexe A2`, `annexe A2b`. Un id nu sans ce mot (`qu'en 9a`) est du texte simple, sans lien. Un **marqueur de position** est `[cours]`, `[école]` ou `[consensus]` (`markers.course`, `markers.school`, `markers.consensus`).

Les règles de ces conventions sont le groupe « Les conventions du texte » de [`rules.yaml`](rules.yaml).

### 3.6 Les ajouts d'une unité

Écrire une unité ajoute hors du fichier de concept : ce sont ses **ajouts**. Un fait que son ancrage emploie entre aux « Faits fixés » de `storyline.md`, avec l'id de l'unité ; il convient qu'un passage qu'elle met en gras soit un terme de `glossary.md` : le gras d'emphase reste possible, et `unit-additions` signale un gras qui n'est pas un terme, au cas où le terme manquerait au glossaire ; une affirmation d'un champ publié a sa ligne dans « Affirmations » de `sources.md`, une fois les sources du concept écrites. Les étapes de la création d'un cours et les checks que chacune lance sont dans [`checks/README.md`](checks/README.md).

Les règles des ajouts sont le groupe « Les ajouts d'une unité » de [`rules.yaml`](rules.yaml).

## 4. Fichiers de domaine

Un fichier de domaine, dans `domains/`, est l'entrée d'un domaine, publié : le site le construit et le professeur le lit. Il tient ce que seul le domaine dit, le problème qu'il règle et un cas du fil rouge qui le traverse ; le reste est écrit ailleurs une fois : son titre, son objectif et ses concepts dans `course.yaml`, d'où le build compose l'enchaînement de ses concepts, et sa place dans le cours dans « Progression » de `plan.md`.

Ses sections, leur ordre, leur présence, publiées ou non, et leurs lecteurs sont `domain_file` de [`form.yaml`](form.yaml) ; ses règles sont le groupe « Les fichiers de domaine » de [`rules.yaml`](rules.yaml).

## 5. Fichiers du cours

- **`plan.md`** : à qui le cours s'adresse (« Public cible », le seul endroit qui le dit), comment le professeur accueille un nouvel apprenant (« Accueil »), la **progression** du cours (« Progression » : les domaines dans l'ordre, ce que chacun donne, comment l'un mène au suivant), puis ce que le professeur en prend pour enseigner (les partis pris, les règles d'écriture du cours, les questions qu'il pose et repose dans tout le cours) ; le professeur le lit, le site en construit le public et la progression.
- **`glossary.md`** : les termes du cours ; le site montre son premier tableau et « Termes à éviter » tels quels.
- **`storyline.md`** : le fil rouge, que le professeur lit en entier, en deux parties : le **monde** (le cadre, les acteurs, les sources), en prose libre, que le site montre, puis les **faits fixés** (« Faits fixés »), chacun suivi de l'id de l'unité qui l'a fixé, `(0d1)`, une aide à l'écriture que lisent le professeur et le créateur et que le site ne montre jamais.
- **`CHANGELOG.md`** : le journal des versions du cours ; le site montre le numéro de sa dernière version, sans autre détail.

**Cellule du terme** : la première colonne du tableau du glossaire tient un terme, ou ses variantes séparées par des virgules (« Product Owner, PO »), chacune reconnue en mot entier, casse ignorée. Une parenthèse est un qualificatif de sens (« État (d'un élément) »).

Les parties de `plan.md`, de `storyline.md`, de `glossary.md` et de `CHANGELOG.md`, leur ordre, leur présence, publiées ou non, et leurs lecteurs sont `plan`, `storyline`, `glossary` et `changelog` de [`form.yaml`](form.yaml) ; les règles de ces fichiers sont le groupe « Les fichiers du cours » de [`rules.yaml`](rules.yaml).

## 6. Les schémas

Un **schéma** est un SVG du dossier de concept, déclaré dans `diagrams` (section 3.1), qui montre en un dessin ce qu'une unité enseigne. Un même SVG sert chaque endroit où l'apprenant le rencontre, complet par lui-même : le site le montre ; le professeur l'envoie au panneau du bureau et en dit la légende ; dans le terminal, le professeur dit la légende et donne le lien du site. Chacun affiche le SVG tel qu'il est, `currentColor` suivant la couleur du texte qui l'entoure ; certains teintent en outre les trois classes `primary`, `secondary` et `muted`, et aucun ne demande au SVG de changer.

La section 6.1 est le contrat de dessin ; la section 6.2, le style que partagent les schémas d'un cours.

### 6.1 Le contrat de dessin

Les nuances d'un schéma viennent de `fill-opacity`, `stroke-opacity` et `opacity`. Quand la feuille de style d'un consommateur fixe la `color` des trois classes (et celle du thème sombre), elle reteinte `currentColor`. `<desc>` décrit le dessin pour les lecteurs d'écran.

Les règles du contrat de dessin sont le groupe « Le contrat de dessin » de [`rules.yaml`](rules.yaml).

### 6.2 Le style

Le style est écrit pour les schémas à dessiner, pas pour la compatibilité avec les anciens (décision `one-diagram-style`).

Les règles du style sont le groupe « Le style des schémas » de [`rules.yaml`](rules.yaml).

## 7. Le lexique des fichiers du cours

Le lexique des fichiers du cours, `course/lexicon.yaml`, écrit une fois les mots qu'un programme reconnaît dans un fichier du cours (un titre, un mot de type, un champ ou un bloc d'unité, un marqueur, une nature, une référence de concept, un type de source, un caractère banni) et les nomme par clé : les checks, le build du professeur et le site les y lisent, par leur clé, et aucun ne les écrit à nouveau (décision `lexicon-not-language-pack`). Les mots que le professeur dit et écrit sont le lexique du professeur, `products/teacher/lexicon.yaml` (`products/teacher/README.md`, « Clés et paramètres ») ; les mots et les textes courts que le site montre pour tout cours de la spec, et qu'aucun fichier du cours ne tient, sont le lexique du site, `products/site/lexicon.yaml`.

Cette section n'énonce aucune règle d'un cours : le lexique est un fichier de la spec. `course/lexicon.yaml` tient chaque clé ci-dessous ; `lexicon-keys`, un test de `check-spec`, le vérifie. Un `course/lexicon.yaml` absent ou illisible est une erreur d'outillage, ni un défaut du cours ni une règle : `course-yaml` échoue dessus (code de sortie 1), et `lexicon-keys` échoue dessus quand le manifeste de la spec, `spec.yaml`, le déclare (`course.lexicon`). Les valeurs :

| Groupe | Clés et valeurs |
|---|---|
| `headings` | `essentials` « L'essentiel », `stances` « Consensus et choix d'école » (le titre du site pour les positions du frontmatter, et la section qu'une entrée de « Non vérifié » de `sources.md` nomme pour une position ou un voisin : aucune section de `concept.md` ne l'a), `deepening` « Approfondissement », `landmarks` « Se vérifier », `instruction` « Consigne au professeur », `foot` « Clôture » ; `essentials` est aussi le titre de la tête de `concept.md` (3.2) ; `claims` « Affirmations », `references` « Références », `unverified` « Non vérifié » ; `problem` « Le problème », `crossing_case` « Un cas qui traverse le domaine » ; `audience` « Public cible », `onboarding` « Accueil », `progression` « Progression » ; `fixed_facts` « Faits fixés » ; `avoid` « Termes à éviter », `unreleased` « Non publié » |
| `block_kinds` | `concept` « Concept », `annex` « Annexe », `section` « Section », `unit` « Unité » : le mot qui ouvre le titre d'un concept, d'une annexe, d'une section et d'une unité dans `concept.md`, suivi de son id puis du séparateur et du titre ; `case` « Cas » : le mot qui ouvre le titre d'un cas, suivi du séparateur et du titre (3.3) ; `separator` « : », une espace avant et après, entre l'id, ou le mot d'un cas, et le titre (3) |
| `unit_fields` | `matter` « Matière », `misconceptions` « Idées fausses », `root` « Racine », `correction` « Correction », `anchor` « Ancrage », `question` « Question », `expected_answer` « Réponse attendue », `misconceptions_in_play` « Idées fausses en jeu », `instruction` « Consigne au professeur » : les libellés des champs d'une unité, ceux de ses idées fausses et de ses cas compris ; `instruction` est aussi le mot du bloc « Consigne au professeur » d'une unité, où il n'a pas de libellé (3.3) |
| `unit_blocks` | `lesson` « Leçon », `cases` « Cas du fil rouge » : les mots des deux blocs d'une unité qui tiennent des champs étiquetés (3.3) |
| `markers` | `consensus` « consensus », `school` « école », `course` « cours » |
| `natures` | `fact` « fait » : la nature d'une affirmation de `sources.md` qu'une source énonce sans position (3.4) ; les autres natures sont les marqueurs de position `consensus`, `school`, `course`. Seul `sources` la lit : ce n'est pas un marqueur du texte publié, que `conventions` vérifie |
| `concept_refs` | `concept` « concept », `concepts` « concepts », `and` « et », `annex` « annexe » : les mots d'une référence de concept (3.5) |
| `source_types` | `primary` « primaire », `secondary` « secondaire », `marketing` « marketing » |
| `typography` | `banned` : les caractères que le texte d'un cours n'emploie pas (le tiret cadratin, les flèches) |
