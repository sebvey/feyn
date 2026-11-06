# Journal des changements

## Non publié

- MINOR, tout le cours : créé depuis `parcours-po` à `398fa07`, ses concepts 0 et 1 copiés avec leurs SVG dans un seul domaine, `1-frame` ; `plan.md` et `storyline.md` copiés, `glossary.md` réduit aux 21 termes que les concepts 0 et 1 définissent et aux deux lignes de « Termes à éviter » qu'ils emploient (« livrer un sprint », « ticket »).
- PATCH, `course.yaml` : le titre dit ce qu'est le cours, un sous-titre dit qu'il est le banc d'essai de la spec ; l'objectif du domaine ne nomme plus l'objectif produit, que le cours n'enseigne pas.
- PATCH, `domains/1-frame.md` : écrit pour deux concepts, chaque section gardée ; le renvoi au domaine suivant et au concept de l'objectif produit est la notion en mots.
- PATCH, `plan.md` : le parti pris « une équipe en sprints » nomme en mots les quatre sous-concepts ultérieurs qui ont un équivalent en flux continu, sans renvoi à un contenu que le cours n'a pas.
- PATCH, `storyline.md` : chaque renvoi par numéro à un concept que le cours n'a pas est la notion en mots ; la colonne des acteurs nomme des notions, non des numéros de concept.
- PATCH, `concepts/00-scrum/concept.md`, `concepts/00-scrum/teaching.md` : chaque renvoi par numéro à un concept ultérieur ou à un contenu que le cours n'a pas est la notion en mots, « plus tard dans le parcours » au plus.
- PATCH, `concepts/01-produit-et-po/` (`concept.md`, `sources.md`, `teaching.md`) : chaque renvoi par numéro à un concept ultérieur est la notion en mots, « plus tard dans le parcours » au plus.
- PATCH, `course.yaml` : la clé `language` est retirée ; la langue est celle de la spec, déclarée dans son `spec.yaml` (#493).
- PATCH, `course.yaml` : les sous-concepts quittent chaque concept ; `course.yaml` est la carte du cours, et l'arbre d'un concept est dans les titres de son `concept.md`, inchangés (#628).
- MAJOR, `concepts/00-scrum/`, `concepts/01-produit-et-po/` : chaque concept tient en un seul `concept.md`, découpé en unités, un message du professeur chacune (#630). `teaching.md` disparaît : l'« Explication » d'un cas devient la « Matière » de son unité, la « Situation » son « Ancrage », les « Erreurs fréquentes » ses « Idées fausses », l'« Usage » et « Ce qui marche » sa « Consigne » ; les cas qui ne sont pas celui d'une unité deviennent des cas supplémentaires. Le concept 0 compte 11 unités en quatre sections, renumérotées (`0a1` à `0a4`, `0b1` à `0b5`, `0c`, `0d`) ; le concept 1, deux sections d'une unité (`1a`, `1b`). « Objectif », « Pièges », « Le test rapide » (devenu « Repères »), « Consignes », « Schéma », les encadrés du fil rouge, la ligne d'image et la `description` du frontmatter quittent les fichiers ; `sources.md` nomme les unités.
- PATCH, `storyline.md` : la vue des stations vides renvoie au concept 0d, l'ancien 0b (#630).
- PATCH, `course.yaml`, `plan.md`, `domains/1-frame.md` : `audience` quitte `course.yaml`, « Public cible » de `plan.md` le dit seul ; `plan.md` gagne « Progression », écrite depuis « D'où l'on vient, où l'on va » du domaine ; le fichier de domaine perd son frontmatter, « Le fil des concepts » et « D'où l'on vient, où l'on va » (#632).
- PATCH, `storyline.md` : le monde, puis « Faits fixés », chaque fait suivi de l'unité qui le fixe ; les faits qu'aucune unité ne fixe et les parties du monde qu'aucune unité n'emploie le quittent, 13 faits devenus 5 (#632).
