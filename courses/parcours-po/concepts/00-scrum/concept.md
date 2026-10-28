---
description: "Scrum en bref : qui fait quoi, les quatre événements du sprint, les trois artefacts et leurs engagements, et pourquoi le sprint est une durée alors que l'incrément est un état du produit."
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "Les trois responsabilités (Developers, Product Owner, Scrum Master), le sprint et ses quatre événements, les trois artefacts avec leurs engagements. L'incrément s'ajoute aux précédents ; un sprint peut en produire plusieurs, que l'on peut livrer avant sa fin ; la revue de sprint n'est pas une porte de mise en production."
      refs: ["S1"]
    - author: "Les limites du Scrum Guide"
      text: "« User story », « vision produit » et « Definition of Ready » n'y figurent pas, pas plus que « ticket », terme d'outil : ils viennent d'autres pratiques (concepts 2, 5 et 11)."
      refs: ["S1"]
  school:
    - text: "Aucun choix d'école dans ce concept : tout ce qu'il enseigne vient du Scrum Guide ou du cours."
      refs: []
  course:
    - text: "Une équipe Scrum qui travaille en sprints : le cours le suppose. Ce n'est ni du consensus ni un choix d'école. Quatre sous-concepts (11b, 15b, 15c, 16c) renvoient à l'annexe A2 pour le travail sans sprint."
      refs: []
    - text: "Le réflexe : « si on décidait de le livrer maintenant, un utilisateur pourrait-il s'en servir, et la DoD est-elle remplie ? ». Le Guide exige un incrément utilisable et conforme à la DoD ; il n'exige pas qu'il soit livré."
      refs: ["S1"]
    - text: "Une échéance propre à un sprint n'a pas sa place dans la DoD, qui vaut pour tout ce qui entre dans l'incrément. Elle relève de l'objectif de sprint si elle dit ce que le sprint vise, du plan des Developers si elle organise le travail."
      refs: ["S1"]
    - text: "Un pipeline fini mais que personne ne peut consulter n'est pas un incrément."
      refs: ["S1"]
    - text: "La rétrospective réunit l'équipe Scrum, sans les parties prenantes. Le Guide ne nomme que l'équipe Scrum ; le cours en tire que les parties prenantes n'y viennent pas."
      refs: ["S1"]
diagrams:
  - file: sprint-duree-increment-etat.svg
    title: "Un sprint est une durée, un incrément est un état du produit"
    caption: "Le sprint est une durée (la frise, des blocs de même longueur, collés) ; l'incrément est un état du produit (l'escalier, dont chaque marche s'ajoute aux précédentes et peut tomber à n'importe quel moment). Plusieurs marches dans un même sprint sont possibles. En bas, chaque artefact porte son engagement."
    subconcept: 0b
---

## Objectif

Situer les trois responsabilités de Scrum (Product Owner, Scrum Master, Developers), le sprint
et ses quatre événements, les trois artefacts et leurs engagements ; distinguer le sprint, une
durée, de l'incrément, le produit dans un nouvel état utilisable.

## L'essentiel

Scrum est un cadre de travail léger, défini par le Scrum Guide (Schwaber et Sutherland, 2020). Une équipe y tient trois **responsabilités** (Product Owner, Scrum Master, Developers), travaille en **sprints** d'un mois au plus, sans pause entre eux, qui contiennent quatre **événements**, et s'appuie sur trois **artefacts**, chacun avec son **engagement**. Un point à ne pas rater : le sprint est une **durée** ; l'**incrément** est le produit dans un nouvel état utilisable, qui remplit la DoD et peut être livré avant la fin du sprint. Qui les confond « livre un sprint » et attend sa fin pour livrer.

Ce cours suppose une équipe Scrum qui travaille en sprints [cours]. Le reste du cours vaut aussi sans sprint ; seuls quatre sous-concepts font exception, avec leur équivalent en flux continu dans l'annexe A2 : concepts 11b, 15b, 15c et 16c.

![Un sprint est une durée, un incrément est un état du produit](sprint-duree-increment-etat.svg)

## 0a Le cadre

*Qui fait quoi, quels rendez-vous, quels supports de travail.*

### 0a1 Trois responsabilités

Une équipe Scrum est une seule équipe, petite (dix personnes au plus en général), sans sous-équipe ni hiérarchie, tournée vers un seul objectif à la fois, l'objectif produit. Elle s'organise elle-même : elle décide en interne qui fait quoi, quand et comment. Elle porte trois responsabilités ; une responsabilité dit de quoi chacun répond, pas qui commande.

- **Le Product Owner (PO)** répond de la valeur du produit. Il répond aussi du backlog produit :
  - formuler l'objectif produit et le faire connaître ;
  - créer les éléments du backlog (toute entrée du backlog, quelle que soit sa taille, concept 3) et les rendre clairs ;
  - les ordonner ;
  - veiller à ce que le backlog soit transparent, visible et compris.

  Il peut faire ce travail ou le confier à d'autres ; il en reste responsable. C'est une seule personne, pas un comité. Qui veut changer le backlog doit convaincre le PO, et l'organisation respecte ses décisions, visibles dans le contenu et l'ordre du backlog. Ce qu'il tranche face aux Developers et aux parties prenantes vient au concept 1b.
- **Les Developers** sont les membres de l'équipe qui réalisent l'incrément, quel que soit leur métier : le mot « developers » n'exclut aucune compétence. Ils répondent de quatre choses :
  - créer le backlog de sprint, leur plan pour le sprint ;
  - la qualité, en respectant la Definition of Done (DoD), les exigences de qualité de l'équipe ;
  - adapter leur plan chaque jour vers l'objectif de sprint ;
  - se tenir responsables les uns envers les autres.

  Comment transformer un élément du backlog en incrément, eux seuls le décident.
- **Le Scrum Master** répond de l'efficacité de l'équipe Scrum, et de la mise en place de Scrum tel que le décrit le Scrum Guide. Il sert l'équipe : il l'aide à s'organiser elle-même et à se concentrer sur des incréments qui remplissent la DoD, fait lever les obstacles à son avancement, et veille à ce que les événements aient lieu, soient utiles et tiennent leur durée. Il sert le PO : il l'aide à trouver des techniques pour l'objectif produit et le backlog, et facilite la collaboration avec les parties prenantes (toute personne ou équipe concernée par le produit, concept 1). Il sert l'organisation, en l'aidant à adopter Scrum. Il n'est pas le chef de l'équipe : l'équipe n'a pas de hiérarchie.

> **Fil rouge :** L'équipe vélos compte deux data engineers (Dana, Diego) et une analyste (Anna) : ce sont ses Developers. Scarlette en est la Scrum Master, et l'est aussi de l'équipe appli.

### 0a2 Le sprint et ses quatre événements

Le sprint dure un mois au plus, toujours la même durée, et le suivant commence dès que le précédent se termine, sans pause. Il est lui-même un événement, celui qui en contient quatre autres : Sprint Planning au début, Daily Scrum chaque jour, revue de sprint puis rétrospective à la fin. Chaque événement est une occasion d'inspecter le travail et de l'adapter. Pendant le sprint, on ne fait rien qui compromette l'objectif de sprint, et la qualité ne baisse pas. Les durées maximales ci-dessous sont celles d'un sprint d'un mois :

- **Sprint Planning** (8 heures, en général moins pour un sprint plus court) : il ouvre le sprint ; toute l'équipe Scrum y prépare le sprint, en trois sujets. L'objectif, les éléments et le plan forment le backlog de sprint. Comment le PO prépare le Sprint Planning vient au concept 15b.
  - **Pourquoi ce sprint a de la valeur** : le PO propose comment le produit peut gagner en valeur pendant le sprint, puis toute l'équipe fixe l'objectif de sprint.
  - **Quoi** : les Developers choisissent, en discutant avec le PO, les éléments du backlog qu'ils prennent.
  - **Comment** : les Developers planifient le travail de chaque élément, et eux seuls en décident.
- **Daily Scrum** (15 minutes) : un événement pour les Developers, chaque jour du sprint, à la même heure et au même endroit. Son but : inspecter l'avancement vers l'objectif de sprint et adapter le backlog de sprint, avec un plan pour la journée qui vient. Les Developers choisissent la forme du point. Le PO ou le Scrum Master n'y participent comme Developers que s'ils travaillent eux-mêmes sur des éléments du sprint. Les Developers peuvent adapter leur plan à tout moment de la journée, pas seulement au Daily Scrum.
- **Revue de sprint** (4 heures) : l'avant-dernier événement du sprint. L'équipe Scrum y présente son travail aux parties prenantes clés, et l'avancement vers l'objectif produit est discuté. Ensemble, ils regardent ce que le sprint a produit et ce qui a changé autour du produit, puis décident de la suite : le backlog peut être adapté. C'est une séance de travail, pas une simple présentation. Ce que le PO y mène vient au concept 15c.
- **Rétrospective** (3 heures) : son but est de trouver comment gagner en qualité et en efficacité. L'équipe Scrum y inspecte comment s'est passé le sprint : les personnes, leurs échanges, les processus, les outils et la DoD. Elle dit ce qui a bien marché, les problèmes rencontrés, et choisit les changements les plus utiles, qu'elle peut ajouter au backlog du sprint suivant. Elle réunit l'équipe Scrum, sans les parties prenantes [cours]. La rétrospective clôt le sprint.

> **Fil rouge :** L'équipe vélos travaille en sprints de deux semaines : c'est conforme, un mois étant un maximum. Des sprints plus courts donnent plus de cycles d'apprentissage.

### 0a3 Trois artefacts, trois engagements

Les artefacts représentent le travail ou la valeur. Chacun porte un engagement, un repère pour juger l'avancement :

- le **backlog produit**, liste ordonnée et émergente de ce qu'il faut pour améliorer le produit, seule source du travail de l'équipe (concept 3), a pour engagement l'**objectif produit**, l'état futur visé à long terme (concept 2) ;
- le **backlog de sprint** (l'objectif de sprint, les éléments choisis, le plan des Developers) a pour engagement l'**objectif de sprint**, l'objectif unique du sprint (concept 15) ;
- l'**incrément** a pour engagement la **Definition of Done**, la description de l'état qu'il doit atteindre (concept 11).

Les engagements n'ont pas la même durée de vie. L'objectif produit et la DoD valent d'un sprint à l'autre (la rétrospective peut faire évoluer la DoD) ; l'objectif de sprint ne vaut que pour un sprint. Une échéance propre à un sprint n'a donc pas sa place dans la DoD [cours].

## 0b Sprint et incrément

*Une durée d'un côté, un état du produit de l'autre.*

Le sprint est une durée, qui contient les événements. L'incrément est une étape concrète vers l'objectif produit : le produit dans un nouvel état **utilisable**. Il naît à l'instant où un élément du backlog remplit la DoD, et il s'ajoute à tous les précédents. Trois conséquences :

- plusieurs incréments peuvent naître dans un même sprint ;
- on peut livrer un incrément avant la fin du sprint : la revue de sprint n'est pas une porte de mise en production, et la seule règle pendant le sprint est de ne rien changer qui mette en danger l'objectif de sprint ;
- un travail qui ne remplit pas la DoD ne fait pas partie de l'incrément : il n'est ni livré, ni présenté à la revue, et retourne au backlog produit, où le PO l'ordonne avec le reste.

On ne « livre » donc pas un sprint : on livre des incréments, au moment où ils existent. Il faut aussi qu'un incrément soit utilisable : un travail fini mais que personne ne peut consulter n'en est pas un [cours].

> **Fil rouge :** Un pipeline qui charge les relevés des stations dans l'entrepôt, sans qu'aucune vue ni aucun export ne permette de les consulter, est un travail terminé, pas un incrément : personne ne peut s'en servir.

## Pièges

- **« Livrer un sprint »** : le sprint est une durée. On livre des incréments, un ou plusieurs, au moment où ils existent. Erreur fréquente en formation.
- **Compter comme incrément un travail fini mais inutilisable** (un pipeline qui charge des données que personne ne peut consulter), ou qui ne remplit pas la DoD.
- **Faire de la revue de sprint la porte de mise en production**, ou la réduire à une présentation : c'est une séance de travail qui inspecte ce que le sprint a produit et adapte le backlog.
- **Prendre le Scrum Master pour le chef de l'équipe**, ou le Daily Scrum pour un compte rendu au Scrum Master : c'est le point des Developers sur leur avancement.
- **Réduire le PO à « celui qui écrit les tickets »** : il répond de la valeur du produit et de l'ordre du backlog.
- **Mettre le sprint au même rang que ses quatre événements**, ou laisser une pause entre deux sprints.

## Le test rapide

> « Si on décidait de le livrer maintenant, un utilisateur pourrait-il s'en servir, et la DoD est-elle remplie ? »

Si oui aux deux, c'est un incrément, quel que soit le jour du sprint. Formulation du cours, appuyée sur l'incrément utilisable et la DoD du Scrum Guide.
