# Journal des changements

## Non publié

- MINOR, tout le cours : créé depuis `parcours-po` à `398fa07`, ses concepts 0 et 1 copiés
  avec leurs SVG dans un seul domaine, `1-frame` ; `plan.md` et `storyline.md` copiés,
  `glossary.md` réduit aux 21 termes que les concepts 0 et 1 définissent et aux deux lignes de
  « Termes à éviter » qu'ils emploient (« livrer un sprint », « ticket »).
- PATCH, `course.yaml` : le titre dit ce qu'est le cours, un sous-titre dit qu'il est le banc
  d'essai de la spec ; l'objectif du domaine ne nomme plus l'objectif produit, que le cours
  n'enseigne pas.
- PATCH, `domains/1-frame.md` : écrit pour deux concepts, chaque section gardée ; le renvoi au
  domaine suivant et au concept de l'objectif produit est la notion en mots.
- PATCH, `plan.md` : le parti pris « une équipe en sprints » nomme en mots les quatre
  sous-concepts ultérieurs qui ont un équivalent en flux continu, sans renvoi à un contenu
  que le cours n'a pas.
- PATCH, `storyline.md` : chaque renvoi par numéro à un concept que le cours n'a pas est la
  notion en mots ; la colonne des acteurs nomme des notions, non des numéros de concept.
- PATCH, `concepts/00-scrum/concept.md`, `concepts/00-scrum/teaching.md` : chaque renvoi par
  numéro à un concept ultérieur ou à un contenu que le cours n'a pas est la notion en mots,
  « plus tard dans le parcours » au plus.
- PATCH, `concepts/01-produit-et-po/` (`concept.md`, `sources.md`, `teaching.md`) : chaque
  renvoi par numéro à un concept ultérieur est la notion en mots, « plus tard dans le
  parcours » au plus.
- PATCH, `course.yaml` : la clé `language` est retirée ; la langue est celle de la spec,
  déclarée dans son `spec.yaml` (#493).
