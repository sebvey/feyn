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
- PATCH, `glossary.md` : la quatrième colonne, « Défini dans », donne le seul concept qui définit
  le terme ; les variantes s'écrivent avec des virgules (« Product Owner, PO »), une parenthèse
  ne précise plus que le sens (« Produit (d'une équipe) », « Escalade (d'un obstacle) ») ; epic,
  feature et tâche, story points et vélocité, risque de valeur et risque de faisabilité ont
  chacun leur ligne, « story » rejoint « User story » ; l'introduction suit la spec.
- PATCH, concept 2 : un piège renvoie au concept 17 pour « hypothèse ».
