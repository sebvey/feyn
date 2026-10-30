# Journal des versions du cours

Avant 0.1.0 : parcours-po 2.5.0, dépôt archivé (`sebvey/feyn-o0o`).

Le cours porte un numéro `MAJOR.MINOR.PATCH` (voir `specs/linear-course/1/SPEC.md`, section 8) :
MAJOR quand un identifiant change (numéro de concept, de sous-concept, de domaine, nom de
dossier ou de fichier de domaine), MINOR quand ce qui est enseigné change, PATCH pour la
rédaction. En 0.x, tout peut encore bouger.

Une ligne par changement : `- CATÉGORIE, concept ou fichier : ce qui change`.

## Non publié

- PATCH, concept 0 : le découpage de 0a1 (quatre messages) et de 0a2 (cinq messages) passe de
  `course.yaml` (champ `messages`, retiré de la spec) aux « Consignes » de `teaching.md`, qui
  lient chaque message à son cas de la banque.
- MINOR, concepts 0, 5, 9, 11 à 17 : les en-têtes de cas ne gardent que le sous-concept et
  « rechange » ou « entraînement » ; les réponses de Maud (5b) passent dans la « Situation » ;
  le champ « Réserve » de 9b2 (autres patrons de SPIDR et de Lawrence) est retiré, à reprendre
  en « Approfondissement » ; en 12, « (hypothèse d'exercice) » passe du libellé au texte de la
  « Situation ».
- MINOR, concept 9 : la matière retirée de 9b2 revient en « Approfondissement » (Workflow
  Steps, Defer Performance et un exemple de Business Rule Variations, patrons de Lawrence),
  hors du parcours : aucun cas ne s'y appuie ; `sources.md` rattache ces patrons à la section.
- PATCH, `glossary.md` : la quatrième colonne, « Défini dans », donne le seul concept qui enseigne
  le terme (une définition en passant, qui renvoie ailleurs, ne compte pas) ; les variantes
  s'écrivent avec des virgules (« Product Owner, PO »), une parenthèse ne précise plus que le
  sens (« Produit (d'une équipe) », « Rôle (d'utilisateur) ») ; epic, feature et tâche, story
  points et vélocité, risque de valeur et risque de faisabilité ont chacun leur ligne, « story »
  rejoint « User story » ; l'introduction suit la spec.
- PATCH, concepts 2 et 10 : un piège renvoie au concept 17 pour « hypothèse », la légende du
  schéma des dépendances au concept 14 pour « escalade ».
- PATCH, concept 11 : `sources.md` cite les lignes du glossaire sous leur nouvelle forme.
- PATCH, concept 0 : `teaching.md` dit « entraînement » là où il restait « creusage ».
- PATCH, concepts 0 à 17, annexes A1 et A2 : les `sources.md` suivent la spec. « Affirmations »
  a cinq colonnes, dont une colonne de section, sans introduction, et son en-tête dit
  « Vérifié » ; chaque ligne est une affirmation du corps de `concept.md`, à la section qui la
  fait. Les positions et les notions voisines sont sourcées dans leur entrée du frontmatter
  (`verified` à côté de `refs`) ; un chemin vers un autre concept est remplacé par une référence
  propre au concept. Le corps des `concept.md` ne change pas.
