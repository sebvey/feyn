---
description: "Comment un Product Owner travaille quand l'équipe est en flux continu, sans sprint : tirer l'élément, la direction sans objectif de sprint, inspecter ce qui est livré, prévoir avec le temps de cycle."
stances:
  consensus:
    - author: "Pas de consensus pour travailler sans sprint"
      text: "Aucun texte ne fait consensus. Ce que le cours tient du Scrum Guide reste vrai : un incrément peut être livré avant toute revue, et les pratiques de prévision (dont les « cumulative flows ») sont citées sans être imposées."
      refs: ["S3"]
  school:
    - author: "The Kanban Guide (John Coleman, Daniel Vacanti, v2025.5)"
      text: "Le texte du flux sans sprint. Kanban y est une stratégie pour optimiser le flux de valeur : définir et visualiser le workflow, gérer activement les éléments, améliorer le workflow. L'équipe écrit sa Definition of Workflow (ce qu'est un élément, quand il commence et finit, ses états, des règles de passage explicites), tire un élément quand elle a de la place et suit quatre mesures : travail en cours, débit, âge d'un élément, temps de cycle. Pas de rôles, pas d'événements, pas de cadence imposée. Le guide dit « contrôler » le travail en cours."
      refs: ["S1"]
    - author: "La méthode Kanban (David J. Anderson, Kanban University)"
      text: "Une autre école que le *Kanban Guide*, avec son propre vocabulaire : le point d'engagement, le réapprovisionnement, des cadences de revue dont la revue de la livraison du service. Ni elle ni le *Kanban Guide* ne sont le consensus."
      refs: ["S4", "S5", "S7"]
  course:
    - text: "Ce qui ne change pas sans sprint : le backlog ordonné par le PO, la DoD, l'incrément, l'objectif produit. Le *Kanban Guide* n'en parle pas ; le cours les garde du Scrum Guide."
      refs: ["S1", "S3"]
    - text: "Le PO ordonne, les Developers tirent. Le *Kanban Guide* ne nomme que les membres du système Kanban."
      refs: ["S1"]
    - text: "La DoR devient la règle pour franchir le début du flux."
      refs: ["S1", "S5"]
    - text: "L'objectif produit et l'ordre du backlog donnent la direction, à la place de l'objectif de sprint."
      refs: ["S3"]
    - text: "L'équipe inspecte ce qui est livré avec les parties prenantes, à une cadence qu'elle choisit."
      refs: ["S1", "S3", "S4"]
    - text: "« Limite du travail en cours » : le mot du *Kanban Guide for Scrum Teams* ; « flux continu » est le vocabulaire du cours."
      refs: ["S1", "S2"]
neighbors:
  - author: "Kanban dans Scrum : The Kanban Guide for Scrum Teams (Scrum.org, janvier 2021)"
    text: "Un autre cas, à ne pas confondre : le Scrum Guide s'y applique en entier, le sprint reste. Une équipe qui garde ses sprints et y ajoute des pratiques de flux suit le cours tel quel, sans cette annexe. Ce guide relie le débit aux dates de livraison probables dont parle le PO."
    refs: ["S2"]
diagrams:
  - file: tableau-de-flux.svg
    title: "Un tableau de flux : on tire un élément quand une place se libère"
    caption: "On tire une carte prête du backlog quand une place se libère sous la limite du travail en cours."
    subconcept: A2a
---

## Objectif

Pour une équipe en flux continu, sans sprint : dire ce qui ne change pas, et ce que deviennent le Sprint Planning et la DoR, l'objectif de sprint, la revue de sprint et la prévision.

## L'essentiel

En flux continu, il n'y a pas de sprint : l'équipe commence un élément quand elle a de la place, sous une limite du travail en cours, et peut le livrer dès qu'il est fini (la fin d'un élément, c'est l'équipe qui la définit). Cette page le décrit d'après le *Kanban Guide* [école], qui n'a ni rôles, ni événements, ni cadence imposée. Ce qui ne change pas [cours] : le backlog ordonné par le PO, la DoD, l'incrément, l'objectif produit.

Une équipe qui garde ses sprints et y ajoute des pratiques de flux fait du Kanban dans Scrum : le sprint reste, et le reste du cours s'applique tel quel. Cette annexe concerne seulement le flux sans sprint.

![Un tableau de flux : on tire un élément quand une place se libère](tableau-de-flux.svg)

## A2a Tirer l'élément, la DoR au début du flux

*Sans Sprint Planning, une place libre sous la limite déclenche le prochain élément.*

Sans sprint, aucun Sprint Planning ne choisit le travail de deux semaines. L'équipe fixe combien d'éléments peuvent être en cours à la fois, c'est-à-dire commencés et pas finis, et en commence un nouveau quand le nombre repasse sous cette limite. Le *Kanban Guide* lui fait écrire sa Definition of Workflow, qui dit entre autres où commence un élément, où il finit, et à quelle règle il franchit chaque passage.

La Definition of Ready (DoR), que l'équipe écrit, liste les conditions qu'un élément remplit avant qu'on le commence [école] : elle est absente du Scrum Guide. C'est elle qui sert de règle pour franchir le début du flux [cours]. Kanban University appelle ce moment le point d'engagement [école]. Le PO a ordonné le backlog, les Developers tirent l'élément suivant [cours]. Pour la DoR elle-même, voir concept 11b.

## A2b Sans objectif de sprint, ce qui donne la direction

*Rien ne regroupe deux semaines de travail : la direction vient de l'objectif produit et de l'ordre du backlog.*

Sans sprint, plus d'objectif de sprint : aucun pourquoi commun ne relie un lot d'éléments choisi pour deux semaines. La direction ne disparaît pas pour autant [cours]. Elle vient de l'objectif produit et de l'ordre du backlog, que le PO tient. Quand une place se libère, elle va à l'élément prêt le plus haut.

C'est donc le PO qui ordonne, et qui veut changer l'ordre le convainc (concept 1b) : la pression des demandeurs ne décide pas de l'élément tiré. Le PO tient le haut du backlog à jour à mesure que les places se libèrent. Une équipe peut aussi se donner un moment régulier pour le revoir : c'est le réapprovisionnement de la méthode Kanban [école], dont ni la fréquence ni les participants ne sont fixés ici.

## A2c Sans revue de sprint, inspecter ce qui est livré

*Livrer n'attend plus de revue ; inspecter ce qu'on a livré, si.*

Sans sprint, pas de revue de sprint, et le *Kanban Guide* ne prévoit aucune réunion avec les parties prenantes. Un élément fini peut partir sans attendre : le Scrum Guide dit déjà que la revue ne doit jamais être une barrière à la livraison de valeur [consensus].

Ce qui reste nécessaire : inspecter ce qui est livré avec les parties prenantes et adapter le backlog, à une cadence que l'équipe choisit [cours]. Livrer et inspecter sont deux moments distincts. L'inspection n'est pas la revue de la livraison du service de la méthode Kanban [école], qui porte sur la performance du service, pas sur ce que l'incrément change pour ses utilisateurs. Une demande qui en naît entre au backlog et s'ordonne, sans se promettre en séance (concept 13).

## A2d Prévoir en flux

*Sans prévision par sprint, le temps de cycle donne une durée et une probabilité, pas une promesse.*

Parmi les quatre mesures que le *Kanban Guide* fait suivre (travail en cours, débit, âge d'un élément, temps de cycle), le temps de cycle va du début d'un élément à sa fin. Sur son historique, l'équipe en tire une prévision en deux parties, une durée et une probabilité : c'est son attente de niveau de service. Le débit est l'une des mesures suivies, pas la base de cette prévision. Le guide donne cet exemple : « 85 % des éléments sont finis en huit jours ou moins ».

Deux précisions. La durée se compte à partir du début d'un élément, pas de la demande ni d'aujourd'hui : un élément qui n'a pas commencé n'a pas encore de temps de cycle. Et la probabilité dit qu'une part des éléments prend plus longtemps : ce n'est pas une promesse. La prévision vient des Developers et de leurs mesures, pas d'une date que le PO invente [cours] ; elle se revoit à mesure qu'on avance. C'est le même principe que pour une prévision en sprints (concept 16c).

## Pièges

- **Confondre les deux cas** : un tableau de flux dans des sprints est du Kanban dans Scrum, le sprint reste et le cours s'applique. A2 ne sert qu'au flux sans sprint.
- **Présenter la méthode Kanban ou le *Kanban Guide* comme le consensus** : deux écoles, aucun texte ne fait consensus pour travailler sans sprint.
- **Croire que sans sprint tout s'en va** : le backlog ordonné par le PO, la DoD, l'incrément et l'objectif produit restent.
- **Commencer un élément qui n'est pas prêt « pour qu'il soit en route »** : il prend une place sous la limite sans avancer.
- **Laisser la pression des demandeurs décider de l'élément tiré** : c'est l'ordre du backlog, que le PO tient à jour à mesure que les places se libèrent.
- **Supprimer l'inspection avec les parties prenantes** parce qu'il n'y a plus de revue de sprint, ou la confondre avec la revue de la livraison du service, qui porte sur la performance du service.
- **Prendre l'attente de niveau de service pour une promesse**, ou la compter depuis aujourd'hui : c'est une durée avec une probabilité, à partir du début d'un élément.
- **Affirmer que les équipes data travaillent surtout en flux** : le cours n'a trouvé aucune enquête qui le montre.

## Le test rapide

> Pour chaque pièce du sprint, qu'est-ce qui la remplace, et qui la tient ?

Formulation du cours : aucune source ne la formule ainsi. Le Sprint Planning, une place libre sous la limite et la DoR au début du flux ; l'objectif de sprint, l'objectif produit et l'ordre du backlog (le PO) ; la revue de sprint, une inspection à la cadence choisie par l'équipe ; la prévision par sprint, une prévision sur l'historique du temps de cycle (les Developers).
