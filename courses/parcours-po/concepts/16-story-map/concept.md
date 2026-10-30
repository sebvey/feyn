---
description: "Comment lire une story map, tracer une première version qui traverse le parcours de l'utilisateur, distinguer les deux sens de MVP et répondre à « pour quand ? » par une fourchette."
stances:
  consensus:
    - text: "Le backlog est une liste ordonnée et émergente, seule source du travail, et le PO répond de l'ordre (concepts 1b et 3). Le Guide ne parle ni de story map ni de plan de version. Les Developers qui feront le travail en estiment la taille ; le travail choisi au Sprint Planning est leur prévision. Les engagements sont l'objectif produit, l'objectif de sprint et la DoD (concept 0a3). Le Guide cite des pratiques de prévision (burn-down, burn-up, flux cumulé) sans en imposer aucune, et rappelle que dans un environnement complexe, ce qui va arriver est inconnu : seul ce qui s'est déjà passé sert à décider. Il ne dit pas qui prévoit une version."
      author: "Le Scrum Guide 2020"
      refs: ["S1"]
      verified:
        - "« an emergent, ordered list » ; « It is the single source of work undertaken by the Scrum Team. » ; « The Developers who will be doing the work are responsible for the sizing. » (Product Backlog) ; « Ordering Product Backlog items » (Product Owner) ; « story map », « release plan » absents du texte (recherche du 2026-10-30) ; « the more confident they will be in their Sprint forecasts » (Topic Two: What can be Done this Sprint?) ; « For the Product Backlog it is the Product Goal » ; « For the Sprint Backlog it is the Sprint Goal » ; « For the Increment it is the Definition of Done » (Scrum Artifacts) ; « Various practices exist to forecast progress, like burn-downs, burn-ups, or cumulative flows. While proven useful, these do not replace the importance of empiricism. In complex environments, what will happen is unknown. Only what has already happened may be used for forward-looking decision making. » (The Sprint)"
    - text: "Le Guide de 2011 a remplacé « commit » par « forecast » pour le travail choisi : un engagement renvoie à des obligations assumées, une prévision à des hypothèses fondées sur des faits. Source secondaire, dont l'auteur n'est pas affiché, cohérente avec le texte du Guide."
      author: "Scrum.org : prévision et promesse"
      refs: ["S10"]
      verified:
        - "« the removal of the term \"commit\" in favor of \"forecast\" in regards to the work selected for a Sprint » (introduction) ; « The word commitment usually relates to undertaken duties. » ; « the chosen alternative \"forecast\" has to do with making assumptions based on reliable information and evidence » (Why forecast is better suited than commitment?)"
    - text: "Les référentiels de PO (le CSPO de Scrum Alliance) font planifier une version et établir une prévision avec les parties prenantes."
      author: "Pratique établie, hors du Scrum Guide"
      refs: ["S7"]
      verified:
        - "« list the components of a product plan or forecast with stakeholders » (2.4) ; « describe how to plan a product release » (2.5)"
  school:
    - text: "En haut, les activités de l'utilisateur, de gauche à droite dans l'ordre du récit (la colonne vertébrale, qui ne s'ordonne pas) ; dessous, les stories, de haut en bas, l'indispensable en haut ; des tranches de version qui traversent toute la colonne vertébrale, avec à côté de chacune son résultat visé et une mesure de succès. Patton voit la carte comme une meilleure version du backlog que la liste plate. Il appelle aussi « walking skeleton » la première version utilisable, en citant Alistair Cockburn : un autre usage du mot que celui du cours, qui le réserve au sens de Cockburn (concept 9)."
      author: "Jeff Patton : la story map"
      refs: ["S2", "S3"]
      verified:
        - "« At the top of the map are \"big stories.\" I call them user activities » (Build a story map) ; « I don't prioritize the backbone. It just \"is.\" I do prioritize the ribs » ; « This is what Alistair Cockburn refers to as the \"walking skeleton\". » (Your software has a backbone and a skeleton) ; « horizontal swim lanes for each release » (Plan using your backbone) ; « a better version of a product backlog » (The New User Story Backlog is a Map)"
        - "« The left to right axis in a story map is organized in the order you'd tell the story about your user » ; « Use a tape line to identify slices of tasks » ; « Identify the target outcomes of your slice in a sticky note or card to the left of the slice » (p. 1) ; « Slice your map into holistic product releases that span the users and use of the product. » ; « For each release, identify product success metrics. » ; « a \"functional walking skeleton\" » (p. 2)"
    - text: "La version d'un nouveau produit qui permet d'apprendre le plus sur ses clients pour le moindre effort. Ries précise que ce n'est pas faire un produit minimal (repris au concept 17). Dans l'usage courant, le MVP est la première version, avec juste assez pour servir les premiers utilisateurs ; Patton l'emploie dans ce sens."
      author: "Eric Ries : le MVP"
      refs: ["S5", "S6", "S3"]
      verified:
        - "« the minimum viable product is that version of a new product which allows a team to collect the maximum amount of validated learning about customers with the least effort. » ; « MVP, despite the name, is not about creating minimal products » (page)"
        - "« a version of a product with just enough features to be usable by early customers who can then provide feedback » (introduction)"
        - "« a minimal viable product release » (p. 2)"
    - text: "La prévision se donne en fourchette plutôt qu'en valeur unique, calculée à partir de la vélocité. C'est une pratique de son école ; elle découle aussi de l'empirisme du Scrum Guide."
      author: "Mike Cohn : la prévision en fourchette"
      refs: ["S11", "S1"]
      verified:
        - "« Rather than providing a single value forecast, the tool estimates velocity as a range » (page)"
        - "« In complex environments, what will happen is unknown. Only what has already happened may be used for forward-looking decision making. » (The Sprint)"
    - text: "Pratiques courantes d'estimation et de prévision, absentes du Scrum Guide : le cours les nomme sans les enseigner. Ron Jeffries juge faible leur usage pour prédire une date de fin. En flux continu (sans sprint), la prévision passe par le temps de cycle, la durée entre le début et la fin d'un élément (annexe A2d)."
      author: "Story points et vélocité"
      refs: ["S12", "S11", "S1"]
      verified:
        - "« I may have invented story points, and if I did, I'm sorry now » ; « at best a weak idea » (page)"
        - "« Rather than providing a single value forecast, the tool estimates velocity as a range » (page)"
        - "« velocity », « story point », « estimat » absents du texte (recherche du 2026-10-30)"
  course:
    - text: "La carte complète le backlog ordonné, elle ne le remplace pas. C'est compatible avec le Scrum Guide (une seule liste ordonnée, ordonnée par le PO), mais pas avec Patton, pour qui la carte est un meilleur backlog."
      refs: ["S1", "S2"]
      verified:
        - "« an emergent, ordered list » ; « It is the single source of work undertaken by the Scrum Team. » (Product Backlog) ; « Ordering Product Backlog items » (Product Owner)"
        - "« a better version of a product backlog » (The New User Story Backlog is a Map) ; « in favor of putting stories into a flat-backlog » (Keep your map displayed to communicate the big picture)"
    - text: "La prévision d'une version se construit sur la taille et le rythme des Developers. Le PO ne l'invente pas : il la porte aux parties prenantes. Le Guide 2020 ne dit pas qui prévoit une version ; le Guide 2017 confiait au PO le suivi du travail restant vers un but."
      refs: ["S1", "S9", "S7"]
      verified:
        - "« The Developers who will be doing the work are responsible for the sizing. » (Product Backlog) ; « the more confident they will be in their Sprint forecasts » (Topic Two: What can be Done this Sprint?)"
        - "« to assess progress toward completing projected work by the desired time for the goal » (Monitoring Progress Toward Goals, p. 16)"
        - "« list the components of a product plan or forecast with stakeholders » (2.4)"
    - text: "Ce qui la fait bouger : l'ordre du backlog et une dépendance non levée. Si une date compte vraiment, on la prend comme échéance et c'est le contenu qui varie (concept 13c) ; on ne fixe pas à la fois la date et tout le contenu."
      refs: []
    - text: "Ce qui entre dans l'incrément, même pour un MVP, remplit la DoD. Le MVP de Ries qui n'est pas un incrément est une expérience (concept 17)."
      refs: ["S1"]
      verified:
        - "« Work cannot be considered part of an Increment unless it meets the Definition of Done. » (Increment)"
    - text: "Une même vue peut apparaître sous plusieurs activités, et une activité sans story se voit comme un trou à explorer avec l'utilisateur ; une première version n'est pas complète tant que ce trou n'est pas exploré. « Trou à explorer » n'est pas une formule de Patton."
      refs: ["S3"]
      verified:
        - "« Story maps are for looking at the big picture » (p. 1) ; « Slice your map into holistic product releases that span the users and use of the product. » (p. 2)"
neighbors:
  - text: "Une toute petite implémentation de bout en bout, qui relie les composants de l'architecture. Patton rattache le mot à Cockburn mais l'applique à une première version utilisable. Le cours réserve le terme au sens de Cockburn (concept 9)."
    author: "Le walking skeleton (Alistair Cockburn)"
    refs: ["S2", "S3", "S13"]
    verified:
      - "« the smallest possible system you could build that would give you end to end functionality. This is what Alistair Cockburn refers to as the \"walking skeleton\". » (Your software has a backbone and a skeleton)"
      - "« a \"functional walking skeleton\" » ; « the simplest possible functional version of the product » (p. 2)"
      - "« A Walking Skeleton is a tiny implementation of the system that performs a small end-to-end function. It need not use the final architecture, but it should link together the main architectural components. » ; « The architecture and the functionality can then evolve in parallel » (page)"
  - text: "La prévision des Developers (ce qu'ils pensent livrer, et quand) est le sujet de cette page. La prévision des stations à risque est, elle, une fonction du produit pour Régis (concepts 9 et 17). Distinction de vocabulaire du cours."
    author: "Deux sens du mot « prévision »"
    refs: []
diagrams:
  - file: story-map.svg
    title: "Une story map : le parcours de l'utilisateur en haut, les stories dessous, la première version en travers"
    caption: "Une ligne en travers de la carte délimite la première version : un peu de chaque activité, avec un trou nommé là où une activité n'a pas encore de story."
    subconcept: 16b1
  - file: prevision-fourchette.svg
    title: "Une prévision en fourchette que l'ordre du backlog et une dépendance peuvent déplacer"
    caption: "Une prévision des Developers, donnée en fourchette, que l'ordre du backlog et une dépendance peuvent déplacer."
    subconcept: 16c
---

## Objectif

Ranger les stories d'un backlog selon le parcours de l'utilisateur, en story map ; tracer une première version utile qui traverse ce parcours, avec son résultat visé et sa mesure ; répondre à « pour quand ? » par la prévision des Developers, en fourchette, sans en faire une promesse.

## L'essentiel

Une liste plate de stories ne dit pas à quel moment de son parcours l'utilisateur s'en sert. La **story map** [école] (Jeff Patton) range les stories sous les activités de l'utilisateur, dans l'ordre où il raconte son parcours : on voit le tout. Une **tranche de version** trace une ligne en travers de la carte : la première version utile prend, sous chaque activité, le moins de stories qui permet à l'utilisateur d'atteindre son but, avec un résultat visé et une mesure. « MVP » a deux sens : on dit lequel on emploie. À « pour quand ? », le PO répond par la **prévision**, construite sur la taille et le rythme des Developers : une fourchette, revue à chaque sprint, pas une promesse.

## 16a La carte

*Ranger les stories selon le parcours de l'utilisateur plutôt qu'en liste plate.*

**Les activités en haut, les stories dessous.** Une story map se lit comme le parcours de l'utilisateur. En haut, ses activités, de gauche à droite dans l'ordre où il les raconte : c'est la **colonne vertébrale**, et elle ne s'ordonne pas par importance. Sous chaque activité, les stories qui la servent, de haut en bas : en haut l'indispensable, plus bas ce qui l'est moins. L'axe horizontal est donc celui du moment, et l'axe vertical celui de la nécessité. Pour dresser la colonne vertébrale, Patton propose de partir d'une journée type de l'utilisateur.

> **Fil rouge :** Exemple inventé pour l'illustration : un technicien de maintenance raconterait sa journée ainsi : préparer la tournée, se rendre sur place, confirmer la panne, réparer ou retirer le vélo. Quatre moments, dans cet ordre : ce seraient les activités de sa carte.

Les colonnes ne sont donc pas des vues, des epics ou des features : la carte n'est pas la hiérarchie du backlog (concept 4). Pour ranger une story, on demande à l'utilisateur à quel moment il s'en sert, et on ne le décide pas à sa place. La carte montre alors ce que l'arbre de la hiérarchie ne montre pas : une même vue peut apparaître sous plusieurs activités, et une activité sans story se voit comme un trou à explorer avec l'utilisateur [cours]. En revanche, la carte sert à voir le tout, pas à décrire un flux avec la précision d'un modèle de processus [école].

**La carte complète le backlog.** Le Scrum Guide ne parle pas de story map : le backlog y est la liste ordonnée, seule source du travail, et le PO répond de son ordre (concept 3). Pour Patton, la carte est une meilleure version du backlog que la liste plate [école]. Le cours garde les deux [cours] : la carte montre le tout, les trous et les versions, mais elle ne donne pas d'ordre unique, puisque deux stories de deux colonnes n'y ont pas d'ordre entre elles. Chaque story de la carte reste un élément du backlog, à sa place dans l'ordre (concept 13). L'ordre de gauche à droite est celui du récit, pas celui du travail.

## 16b La tranche de version

*Une première version qui traverse le parcours, son résultat visé, et le mot MVP.*

### 16b1 La première version utile

Une **tranche de version** est une ligne tracée en travers de la carte (chez Patton, un ruban adhésif) : au-dessus, les stories de la version [école]. La première version utile est le plus petit ensemble de stories qui permet aux utilisateurs visés d'atteindre leur but. Elle traverse toute la colonne vertébrale : un peu de chaque activité, et non une activité entière avant la suivante. Patton le dit par l'image d'une voiture qu'on ne livre pas sans freins. Ce qui est indispensable, c'est l'utilisateur qui le dit : le PO le lui fait dire. Là où une activité n'a pas encore de story, la tranche laisse un trou nommé, qu'on explore avec l'utilisateur ; elle n'est pas complète tant que ce trou n'est pas exploré [cours].

![Une story map : le parcours de l'utilisateur en haut, les stories dessous, la première version en travers](story-map.svg)

C'est l'idée de la tranche verticale (concept 9) à l'échelle d'une version : la version sert seule. Mais les deux ne se confondent pas. La carte range les moments du parcours de l'utilisateur, pas les couches du produit : une première version bâtie comme une couche (une partie technique seule, sans rien que l'utilisateur puisse utiliser) ne sert pas seule.

À côté de la tranche, on écrit son **résultat visé** et une **mesure de succès** : ce qu'on mesurera pour dire si la version a réussi, de préférence un changement dans ce que fait l'utilisateur. On nomme la mesure, sans inventer de cible : la cible chiffrée est une règle que le PO fait fixer (concept 8a2). Cette mesure de version est une autre chose que la mesure de résultat de l'objectif produit, plus lointaine (concept 2).

Patton emploie aussi « walking skeleton » pour cette première version utilisable, en citant Cockburn. C'est un autre usage du mot : le cours le réserve au sens de Cockburn, une implémentation de bout en bout qui sert l'équipe (concept 9).

### 16b2 Les deux sens de MVP

« MVP » a deux sens, et on dit toujours lequel on emploie [cours]. Pour Eric Ries [école], c'est la version d'un nouveau produit qui permet d'apprendre le plus sur ses clients pour le moindre effort ; il précise que ce n'est pas faire un produit minimal, et le concept 17 y revient. Dans l'usage courant, c'est la première version, avec juste assez pour servir les premiers utilisateurs : la première tranche de la carte, au sens de 16b1.

Dans les deux cas, ce n'est pas une version au rabais. Tout ce qui entre dans l'incrément remplit la DoD, MVP ou pas (concepts 0 et 11a).

## 16c Pour quand ?

*Répondre par une fourchette fondée sur les Developers, qui se revoit, et que l'on ne promet pas.*

**Une fourchette, pas une date.** À « pour quand ? », le PO n'invente pas de date. La prévision se construit sur la taille des stories, que les Developers estiment, et sur leur rythme des derniers sprints : le Scrum Guide rappelle que seul ce qui s'est déjà passé sert à décider. Le Guide 2020 donne aux Developers la prévision du sprint ; il ne dit pas qui prévoit une version. Le cours retient que la prévision d'une version se construit sur leur taille et leur rythme, et que le PO la porte aux parties prenantes [cours].

Elle se donne en **fourchette**, pratique de l'école de Mike Cohn, qui la calcule à partir de la vélocité [école], et elle se revoit à chaque sprint (l'empirisme du Guide l'appelle). Ce n'est pas une promesse : les engagements de Scrum sont l'objectif produit, l'objectif de sprint et la DoD. Story points et vélocité sont des pratiques courantes, absentes du Scrum Guide, que cette page nomme sans les enseigner ; Ron Jeffries juge faible leur usage pour prédire une date de fin [école]. En flux continu (sans sprint), la prévision passe par le temps de cycle, la durée entre le début et la fin d'un élément (annexe A2d).

![Une prévision en fourchette que l'ordre du backlog et une dépendance peuvent déplacer](prevision-fourchette.svg)

**Ce qui la fait bouger.** Une prévision dit aussi ce qui la ferait bouger [cours]. L'ordre du backlog d'abord : ce qui passe devant retarde ce qui suit (concept 13). Une dépendance ensuite : tant qu'elle n'est pas levée, l'élément qui en dépend glisse (concept 10) ; si l'attente dure, c'est un obstacle à escalader (concept 14c).

Quand une date compte vraiment, on la prend comme échéance, et c'est le contenu qui varie : on ne fixe pas à la fois la date et tout le contenu. L'ordre dit alors ce qui sera prêt à cette date, et MoSCoW peut aider à dire ce qui doit y être (concept 13c).

## Pièges

- **Prendre la carte pour la hiérarchie** : en haut, les activités de l'utilisateur, pas des vues, des epics ou des features. Dessous, ses stories.
- **Ordonner la colonne vertébrale par importance** : elle suit l'ordre du récit ; l'importance joue de haut en bas.
- **Croire que la carte remplace le backlog**, ou que l'ordre de gauche à droite est l'ordre du travail : le backlog reste la liste ordonnée par le PO (choix du cours).
- **Placer une story sans savoir quand l'utilisateur s'en sert** : le lui demander.
- **Finir une activité avant la suivante**, ou faire de la première version une couche (concept 9) : la tranche traverse la carte et sert seule.
- **Une version sans résultat visé ni mesure**, ou avec une cible inventée : la mesure se nomme, la cible se fait fixer.
- **Confondre les deux sens de MVP**, ou le prendre pour une version au rabais. Dire lequel on emploie ; la DoD vaut pour tout ce qui entre dans l'incrément.
- **Prendre le walking skeleton de Patton pour celui de Cockburn.** Le cours garde le sens de Cockburn (concept 9).
- **Inventer une date**, prendre la prévision pour une promesse, ou estimer à la place des Developers.
- **Viser le bilan au conseil sans date** : sa date n'est pas fixée ; si une prévision doit le viser, la date se demande à Charlotte.
- **Confondre la prévision du travail avec la prévision des stations à risque** (concepts 9 et 17) : la seconde est une fonction du produit, pour Régis.

## Le test rapide

> « Ta carte se lit-elle comme la journée de l'utilisateur ? Ta première tranche sert-elle chaque moment de cette journée (ou laisse-t-elle un trou nommé, à explorer avec l'utilisateur), avec un résultat visé et une mesure ? Ta réponse à « pour quand ? » donne-t-elle la fourchette des Developers et ce qui la ferait bouger ? »

Résumé du cours, sans équivalent dans les sources. Un non à l'une des trois : le concept n'est pas appliqué.
