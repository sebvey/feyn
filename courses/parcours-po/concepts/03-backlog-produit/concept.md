---
description: "Ce qu'est le backlog produit d'une équipe Scrum : une liste ordonnée et émergente, seule source de travail, et pourquoi ce n'est ni un cahier des charges figé ni une liste à dépiler."
stances:
  consensus:
    - text: "Le backlog produit est une liste ordonnée et émergente de ce qu'il faut pour améliorer le produit, et la seule source du travail de l'équipe Scrum. Son engagement est l'objectif produit, qui figure dans le backlog ; le reste du backlog émerge pour dire ce qui le remplira. Le PO répond de la gestion du backlog (objectif produit, éléments, ordre, transparence) : il peut déléguer ce travail et en reste responsable, et qui veut changer le backlog doit le convaincre (vu aux concepts 0 et 1). Le Guide dit « ordonné » et non « priorisé » depuis 2011. Les éléments que l'équipe peut finir en un sprint sont prêts à être choisis au Sprint Planning, une fois précisés."
      author: "Le Scrum Guide 2020"
      refs: [S1, S3]
      verified:
        - "« The Product Backlog is an emergent, ordered list of what is needed to improve the product. » ; « It is the single source of work undertaken by the Scrum Team. » ; « ready for selection in a Sprint Planning event » (Product Backlog) ; « The Product Goal is in the Product Backlog. The rest of the Product Backlog emerges to define \"what\" will fulfill the Product Goal. » (Commitment: Product Goal) ; « is accountable for effective Product Backlog management » ; « may delegate the responsibility to others. Regardless, the Product Owner remains accountable » ; « Those wanting to change the Product Backlog can do so by trying to convince the Product Owner » (Product Owner)"
        - "« The Product Backlog is \"ordered,\" instead of \"prioritized,\" » (changements 2010-2011)"
  school:
    - text: "Un backlog détaillé à bon escient (le haut précis, le bas vague), estimé, émergent, « priorisé » (là où le Guide dit ordonné). La version 2017 du Scrum Guide disait que le bas est moins détaillé ; la version 2020 a retiré la phrase. « Le haut précis, le bas vague » est donc le choix de Cohn et de Pichler, partagé par Kenneth Rubin, pas un texte du Scrum Guide."
      author: "Mike Cohn et Roman Pichler : DEEP"
      refs: [S2, S4, S5]
      verified:
        - "« the lower the order, the less detail » (Product Backlog, p. 15)"
        - "« Roman Pichler […] and I use the acronym DEEP » (page) ; « Stories that will not be developed for awhile should be described with less detail » (Detailed Appropriately)"
        - "« just-enough, just-in-time » (chap. 6)"
    - text: "Retirer les éléments qui ne serviront plus, donc accepter que certains ne soient jamais faits. Le Scrum Guide ne le dit pas : c'est une conséquence du mot « émergente ». Que ce retrait ne soit pas définitif (l'élément revient si le besoin apparaît) est un choix du cours, que ni Cohn ni Rubin ne disent."
      author: "Mike Cohn, Kenneth Rubin : retirer ce qui ne servira plus"
      refs: [S4, S5, S9]
      verified:
        - "« user stories on the product backlog will be added, removed, or reprioritized » (Emergent)"
        - "« discard some » (chap. 6)"
        - "« closing issues the team will never get to is okay » (page)"
    - text: "Surtout des fonctions utiles aux utilisateurs, mais aussi des défauts à corriger, des améliorations techniques et du travail pour apprendre."
      author: "Kenneth Rubin : ce qu'un backlog contient"
      refs: [S5]
      verified:
        - "« defects needing repair, technical improvements, knowledge-acquisition work » (chap. 6)"
  course:
    - text: "Ce concept vaut aussi pour une équipe sans sprint. Aucun guide consulté n'en fait un consensus."
      refs: [S6, S7]
      verified:
        - "« backlog » absent du texte ; « start work on an item (pull or select) only when there is a clear signal that there is capacity to do so » (texte)"
        - "« flow-based Sprint Planning » (extrait de recherche)"
    - text: "L'ordre s'argumente par l'objectif produit. C'est tiré de deux phrases du Guide (l'objectif produit est dans le backlog, le reste émerge pour dire ce qui le remplira), le Guide ne le formule pas ainsi. Comment ordonner est traité au concept 13."
      refs: [S1]
      verified:
        - "« The Product Goal is in the Product Backlog. The rest of the Product Backlog emerges to define \"what\" will fulfill the Product Goal. » (Commitment: Product Goal)"
    - text: "Un ordre vaut mieux que des niveaux de priorité (haute, moyenne, basse) : les niveaux laissent des ex aequo qui ne disent pas quoi faire ensuite. Le Guide dit « ordonné » ; l'argument des ex aequo est celui du cours."
      refs: [S1, S3]
      verified:
        - "« an emergent, ordered list » (Product Backlog)"
        - "« \"ordered,\" instead of \"prioritized,\" » (changements 2010-2011)"
    - text: "Le glossaire du cours dit « ce qui pourrait améliorer le produit » là où le Guide dit « ce qu'il faut ». « Pourrait » marque que tout n'y sera pas fait (voir 3b) ; c'est la même notion."
      refs: [S1]
      verified:
        - "« what is needed to improve the product » (Product Backlog)"
    - text: "« Cahier des charges figé » et « liste à dépiler » sont des termes du cours, pour deux façons de se tromper. Aucune source consultée n'oppose ces termes en français."
      refs: [S1, S2, S8]
      verified:
        - "« emergent » (Product Backlog)"
        - "« A Product Backlog is never complete. » (Product Backlog, p. 15)"
        - "« Responding to change over following a plan » (les quatre valeurs)"
neighbors:
  - text: "Le Guide dit seulement qu'un élément que l'équipe peut finir en un sprint est prêt à être choisi. La Definition of Ready, ce sont les conditions qu'une équipe fixe elle-même avant qu'un élément entre dans un sprint : un choix d'école, absent du Guide."
    author: "La Definition of Ready (concept 11)"
    refs: [S1]
    verified:
      - "« ready for selection in a Sprint Planning event » (Product Backlog) ; « Definition of Ready » absent du texte"
diagrams:
  - file: backlog-produit-colonne-ordonnee.svg
    title: "Le backlog produit : une colonne ordonnée, précise en haut et vague en bas"
    caption: "Le backlog produit. Les demandes arrivent en vrac et le PO décide de leur place ; l'objectif produit justifie l'ordre. Le haut est précis et sort vers le Sprint Planning, le bas reste vague (choix d'école : DEEP). Quatre mouvements le font vivre. En marge, deux façons de se tromper, barrées."
    subconcept: 3a
---

## Objectif

Dire ce qu'est un backlog produit (une liste ordonnée, émergente, seule source de travail de
l'équipe) et ce qu'il n'est pas (un cahier des charges découpé, une liste à dépiler, le
découpage technique de la solution).

## L'essentiel

Le backlog produit est la **liste ordonnée et émergente** de ce qu'il faut pour améliorer le produit, et la **seule source de travail** de l'équipe Scrum (Scrum Guide). **Ordonnée** : chaque élément a une place, que l'objectif produit justifie. **Émergente** : on ajoute, précise, découpe, réordonne et retire des éléments à mesure que l'équipe apprend ; le haut est précis, le bas reste vague. Ce n'est donc ni un cahier des charges rempli d'avance, ni une liste qu'on dépile.

![Le backlog produit : une colonne ordonnée, précise en haut et vague en bas](backlog-produit-colonne-ordonnee.svg)

## 3a Une liste ordonnée, émergente

*Une place pour chaque élément, et un contenu qui change avec ce que l'équipe apprend.*

### 3a1 Ordonnée

Un **élément du backlog** est toute entrée du backlog, quel que soit son niveau (les niveaux sont au concept 4). Dans une liste ordonnée, chaque élément a une place, et le haut dit ce que l'équipe fera ensuite.

Le Scrum Guide dit « ordonné » et non « priorisé » depuis 2011. Des niveaux de priorité (haute, moyenne, basse) laissent des ex aequo qui ne disent pas quoi prendre d'abord ; un ordre n'en laisse pas [cours]. Le cours dit donc « ordonner », et réserve « priorité » à MoSCoW, un classement pour une échéance (concept 13). La place de chaque élément s'argumente par l'objectif produit [cours] ; comment ordonner (valeur, coût, risque, dépendances) vient au concept 13.

Le backlog est aussi la seule source de travail de l'équipe (vu au concept 0) : ce qui n'y figure pas, l'équipe ne le fait pas. Le PO en répond ; d'autres peuvent écrire des éléments, et il reste responsable. Qui veut changer le backlog doit le convaincre.

### 3a2 Émergente

Le backlog change à mesure que l'équipe apprend : on y ajoute, précise et découpe, réordonne et retire des éléments. La revue de sprint peut elle aussi l'ajuster.

Le haut doit être assez précis pour que les Developers le choisissent au Sprint Planning et le finissent en un sprint : le Guide dit d'un tel élément qu'il est « prêt à être choisi » [consensus]. Le bas, lui, reste vague : on précise un élément quand il approche du haut. Le Scrum Guide 2017 le disait ; celui de 2020 ne le dit plus. C'est aujourd'hui le D de DEEP, un choix d'école [école] de Mike Cohn et Roman Pichler, partagé par Kenneth Rubin.

Détailler le bas d'avance, c'est écrire du travail qui sera à refaire : d'ici à ce que l'élément approche du haut, le besoin ou le contexte auront pu changer [cours]. On garde le bas en une ligne qui dit le besoin. Le travail continu qui précise les éléments est traité au concept 15.

## 3b Ce qu'il n'est pas

*Trois façons de se tromper de nature : le cahier des charges, la liste à dépiler, le plan technique.*

**Pas un cahier des charges, pas une liste à dépiler.** Un **cahier des charges** découpé se remplit et se valide au début, puis se fige. Le backlog, lui, n'est jamais complet : on n'en connaît au départ qu'une partie, et il change à chaque chose apprise.

Une **liste à dépiler** se traite dans l'ordre d'arrivée, ou dans un ordre fixé une fois pour toutes, jusqu'au dernier élément. Or l'ordre change, et certains éléments ne seront jamais faits. Être au backlog n'est pas une promesse : retirer ce qui ne servira plus garde le backlog lisible. Le Scrum Guide ne le dit pas ; c'est la pratique de Cohn et de Rubin [école], conséquence d'un backlog émergent. Que ce retrait ne soit pas définitif (l'élément revient si le besoin apparaît) est un choix du cours, que ni Cohn ni Rubin ne disent.

**Pas le plan technique de la solution.** Le découpage de la solution en tâches est le plan des Developers : il vit dans le backlog de sprint, pas dans le backlog produit. Un travail technique n'est pas exclu pour autant : il entre au backlog avec ce qu'il améliore, et le PO l'ordonne (concept 1). Un signe : si un utilisateur ne comprend aucun élément du backlog, c'est le plan des Developers, pas le backlog produit.

## Pièges

- **Prendre le backlog pour la liste des tâches techniques** : c'est le réflexe le plus probable d'un développeur ou d'un profil data. Signe : un utilisateur ne comprend aucun élément. Le plan est dans le backlog de sprint ; au backlog produit, un travail technique porte ce qu'il améliore, et le PO l'ordonne (il n'est pas exclu).
- **Le remplir au début, puis le figer** : comme un cahier des charges, alors qu'on n'en connaît qu'une partie ; le reste émerge. Le faire valider, puis interdire d'y toucher : il change à chaque chose apprise, à la revue de sprint notamment.
- **Le dépiler** : le traiter dans l'ordre d'arrivée, ou dans un ordre fixé une fois pour toutes, jusqu'au dernier élément. L'ordre change, et certains éléments ne seront jamais faits.
- **Des priorités au lieu d'un ordre** (haute, moyenne, basse) : des ex aequo qui ne disent pas quoi faire ensuite. Le cours dit « ordonner », pas « prioriser ».
- **Tout détailler d'avance** : du travail à refaire. Détailler le haut, garder le bas en une ligne qui dit le besoin.
- **Travailler hors du backlog** : ce qui n'y figure pas, l'équipe ne le fait pas ; la demande entre au backlog, à la place que décide le PO.
- **Dire que le backlog « appartient » au PO** : il en répond ; d'autres peuvent y écrire des éléments, il reste responsable (concepts 0 et 1).
- **Dire « ticket »** : c'est un terme d'outil ; le cours dit « élément du backlog ».
- **Confondre « prêt à être choisi » avec la Definition of Ready** : le Scrum Guide dit seulement qu'un élément que l'équipe peut finir en un sprint est prêt à être choisi au Sprint Planning ; la Definition of Ready (conditions qu'une équipe fixe elle-même avant qu'un élément entre dans un sprint) est un choix d'école, vu au concept 11.

## Le test rapide

> En lisant le haut du backlog, sait-on ce que l'équipe fera ensuite, et pourquoi dans cet ordre ? Chaque élément dit-il ce qu'il améliore, pour qui ?

Formulation du cours, tirée de la transparence que le Guide demande du backlog.
