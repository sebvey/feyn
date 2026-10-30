---
description: "Niveaux, liens de dépendance et états d'un élément dans l'outil du backlog : ce que Scrum n'impose pas, ce que les outils proposent par défaut, et ce que le PO demande à l'équipe et à l'administrateur."
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "Ne parle ni d'outil de suivi, ni d'état, ni de lien entre éléments, ni de niveau. D'autres pratiques peuvent s'employer dans le cadre. Le PO veille à ce que le backlog soit transparent, visible et compris. Un élément qui ne remplit pas la DoD ne fait pas partie de l'incrément. La rétrospective inspecte aussi les outils de l'équipe."
      refs: ["S1"]
      verified:
        - "« status », « workflow », « board », « link », « ticket », « Jira », « epic », « feature », « story », « theme », « task » absents du texte entier (cherché le 2026-10-30) ; « Various processes, techniques and methods can be employed within the framework. » (Scrum Definition) ; « Ensuring that the Product Backlog is transparent, visible and understood » (Product Owner) ; « Work cannot be considered part of an Increment unless it meets the Definition of Done. » (Increment) ; « The Scrum Team inspects how the last Sprint went with regards to individuals, interactions, processes, tools, and their Definition of Done. » (Sprint Retrospective)"
    - author: "Ce que font les outils (documentation des éditeurs : un constat, pas un consensus)"
      text: "Niveaux par défaut : Jira, Epic > Story > Subtask (niveaux au-dessus seulement dans les offres Premium et Enterprise) ; Azure DevOps (processus Agile), Epic > Feature > User Story > Task. Dans Azure DevOps, on ne retire pas un niveau hérité : on le renomme, on désactive son type, et chaque équipe choisit les niveaux qu'elle affiche. Aucun outil vérifié n'a de lien nommé « dépend de » : Jira dit « blocks / is blocked by », Azure DevOps « Predecessor / Successor », Linear « blocked / blocking ». Le lien peut relier des éléments de deux équipes, même dans deux espaces (Jira) ou deux projets (Azure DevOps) différents. Les états (Jira dit « statuts ») viennent avec un jeu par défaut que l'équipe change (en ajouter, en retirer ou en renommer, selon l'outil) ; exemples : Azure DevOps, pour une user story en processus Agile, New, Active, Resolved, Closed ; Linear, Backlog, Todo, In Progress, Done, Canceled. Les réglages se trouvent chez les administrateurs, et certains valent pour plusieurs équipes."
      refs: ["S2", "S3", "S4", "S5", "S6", "S6b", "S7", "S8b", "S10", "S10b", "S12", "S12b"]
      verified:
        - "« By default, Jira is set up with three levels of work type hierarchy » ; « You can modify these levels » (Modify the default hierarchy levels) ; « Jira Premium and Enterprise customers can also create and manage additional levels » (Manage custom hierarchy levels) ; « Changes to your work type hierarchy will apply to all company-managed spaces in your site. » (Configure the work type hierarchy)"
        - "« Epic », « Feature », « User Story », « Task » (Agile) (tableau « Main distinctions among the default processes »)"
        - "« You can't remove an inherited portfolio level from a product. » ; « You can rename the level, or disable WITs to prevent teams from creating new work items of those types » (Limitations) ; « any projects that use the process automatically reflect the customizations » (Prerequisites)"
        - "« Each team can select and configure the backlog levels that fit their needs. » (Select backlog navigation levels)"
        - "« blocks / is blocked by » (About issue linking)"
        - "« Use linked work items to connect work across teams and spaces in Jira » ; « You can link work items across different spaces » (Link work items)"
        - "« Choose Predecessor when linking to a work item that should complete before the current item » ; « You can create predecessor-successor links across projects » (Work link type)"
        - "« The statuses are recommended starting points for each template, but you can edit or remove them from a workflow to suit your team's need. » ; « You can also create your own. » (Work item statuses)"
        - "« In the Agile process, a user story typically moves through New, Active, Resolved, and Closed. » (Workflow states)"
        - "« You can customize the workflow of any work item type (WIT) by hiding inherited states or adding custom states. » (Supported customizations)"
        - "« You can mark issues as blocked, blocking, related, and duplicate. » (Overview)"
        - "« These workflows are team-specific and come with a default set and order: Backlog > Todo > In Progress > Done > Canceled. » (Overview) ; « Create statuses by clicking the + button, or remove statuses » (Configure)"
  school:
    - author: "Mike Cohn : la Definition of Ready"
      text: "Une DoR stricte devient une barrière avant chaque sprint, un pas vers une approche séquentielle, par étapes. Cohn conseille des repères plutôt que des règles (concept 11b)."
      refs: ["S13"]
      verified:
        - "« becomes a huge step towards a sequential, stage-gate approach » (A Definition of Ready Is Not Always a Good Idea) ; « Favor guidelines rather than rules on your Definition of Ready » (How to Use a Definition of Ready Correctly)"
    - author: "Atlassian : peu d'états (conseil d'éditeur, pas un choix d'école)"
      text: "L'éditeur de Jira conseille de limiter les états et les transitions à ce dont l'équipe a besoin. C'est une recommandation de l'éditeur, à lire comme telle, pas un consensus."
      refs: ["S9"]
      verified:
        - "« Keep your workflow simple: limit statuses and transitions » ; « include only the statuses and transitions you need » (Keep your workflow simple: limit statuses and transitions)"
  course:
    - text: "Peu de niveaux suffisent, et un niveau qui ne contient d'habitude qu'un seul élément est de trop (concept 4). C'est une règle pratique du cours, sans source externe."
      refs: []
    - text: "Dans l'outil, « fait » veut dire DoD remplie. Le Scrum Guide dit qu'un élément qui ne la remplit pas ne fait pas partie de l'incrément ; que l'état de l'outil doive suivre la DoD est la règle du cours."
      refs: ["S1"]
      verified:
        - "« Work cannot be considered part of an Increment unless it meets the Definition of Done. » (Increment)"
    - text: "Un état « prêt » de l'outil reste un repère, pas une barrière. Le cours applique ici l'avis de Cohn sur la DoR."
      refs: ["S13"]
      verified:
        - "« Favor guidelines rather than rules on your Definition of Ready » (How to Use a Definition of Ready Correctly)"
    - text: "Le lien ne remplace pas la conversation avec l'autre PO. Le Manifeste agile met les individus et leurs interactions avant les processus et les outils, sans parler d'un lien d'outil."
      refs: ["S14"]
      verified:
        - "« Individuals and interactions over processes and tools » (page)"
    - text: "Le PO dit ce qu'il veut voir dans l'outil et pourquoi ; l'équipe choisit ; l'administrateur règle."
      refs: []
neighbors:
  - author: "La « Definition of Done » d'une colonne d'Azure DevOps"
    text: "Même nom, autre objet : ce sont les critères pour passer une étape du tableau. La DoD de Scrum est unique et porte sur l'incrément."
    refs: ["S11", "S1"]
    verified:
      - "« Define the criteria for the Definition of Done in each column. » ; « This action helps the team identify necessary tasks before advancing an item to the next stage » (Add Definition of Done to a column)"
      - "« The Definition of Done is a formal description of the state of the Increment when it meets the quality measures required for the product. » (Commitment: Definition of Done)"
diagrams:
  - file: ecran-niveaux.svg
    title: "Un écran d'outil stylisé (exemple inventé pour l'illustration) : les niveaux"
    caption: "Niveaux : la ligne Epic est le niveau de trop."
    subconcept: A1a
  - file: ecran-liens.svg
    title: "Un écran d'outil de backlog : les liens de dépendance entre deux équipes"
    caption: "Liens : le lien d'une story vers un élément de l'autre équipe ne remplace pas l'accord des deux PO."
    subconcept: A1b
  - file: ecran-etats.svg
    title: "Un écran d'outil de backlog : les états, où « fait » veut dire DoD remplie"
    caption: "États (cas inventé : Idée, Cadrée, Réalisation, Terminée) : « Terminée » veut dire DoD remplie."
    subconcept: A1c
---

## Objectif

Dire ce qu'un PO règle dans l'outil du backlog, et pourquoi : les niveaux (et le niveau de trop), le lien qui note une dépendance, y compris envers une autre équipe, et les états d'un élément, où « fait » veut dire DoD remplie.

## L'essentiel

Le Scrum Guide ne dit rien des outils de suivi : ni niveau, ni lien, ni état d'un élément. Il demande un backlog transparent, visible et compris. L'outil propose des **réglages par défaut** (niveaux, types de liens, états) ; l'équipe les change, et aucun n'est une règle de Scrum. Le PO dit ce qu'il veut voir dans l'outil et pourquoi ; l'administrateur de l'outil fait le réglage, qui peut toucher d'autres équipes. Cette page ne dit pas où cliquer : les écrans changent d'un outil et d'une version à l'autre.

![Un écran d'outil stylisé (exemple inventé pour l'illustration) : les niveaux](ecran-niveaux.svg)

![Un écran d'outil de backlog : les liens de dépendance entre deux équipes](ecran-liens.svg)

![Un écran d'outil de backlog : les états, où « fait » veut dire DoD remplie](ecran-etats.svg)

## A1a Les niveaux dans l'outil

*Les niveaux viennent de l'outil, pas de Scrum : l'équipe en choisit peu.*

Jira propose par défaut trois niveaux (Epic, Story, Subtask). Azure DevOps, en processus Agile, en propose quatre (Epic, Feature, User Story, Task). Ce sont des réglages par défaut : l'équipe choisit les siens, et peu suffisent (concept 4). Un niveau est de trop quand il ne contient d'habitude qu'un seul élément [cours] : il oblige à écrire deux éléments là où un seul porte le besoin (concept 4a3).

Un niveau de trop ne se retire pas toujours. Azure DevOps ne retire pas un niveau hérité : on le renomme, on désactive son type, et chaque équipe choisit les niveaux qu'elle affiche. Pour Jira, la documentation décrit le retrait d'un niveau ajouté, pas celui d'un niveau par défaut. Mais ne pas pouvoir retirer un niveau n'oblige pas à l'employer : l'équipe peut cesser de s'en servir, et ne pas l'afficher quand l'outil le permet.

Ces réglages touchent plus que l'équipe. La hiérarchie de Jira vaut pour tous les espaces gérés par l'entreprise, et la changer casse les liens parent et enfant existants. Le processus d'Azure DevOps s'applique à tous les projets qui l'emploient. D'où, dans les deux outils, le partage des rôles [cours] : le PO dit ce qu'il veut et pourquoi, l'équipe choisit ses niveaux, l'administrateur de l'outil fait le réglage.

## A1b Les liens de dépendance

*Un lien note une dépendance entre deux éléments, aussi entre deux équipes ; il n'en tient pas lieu d'accord.*

Une dépendance (concept 10b) se note par un lien entre deux éléments. Aucun des trois outils vérifiés n'a de lien nommé « dépend de » : Jira dit « blocks / is blocked by », Azure DevOps « Predecessor / Successor », Linear « blocked / blocking ». Le lien peut relier des éléments de deux équipes, dans deux espaces (Jira) ou deux projets (Azure DevOps). Il rend la dépendance visible des deux côtés.

> **Fil rouge :** Rappel du cas de concept 10b2 : la story d'Abba, abonnée sans l'appli (comme un tiers des abonnés, qui n'ont qu'un téléphone basique), dépend de l'équipe appli, dont Pia est la PO. La disponibilité par station vient de la plateforme ; le canal relève de cette équipe. C'est une dépendance envers une autre équipe, du genre que le lien note.

Un lien n'est pas un accord. Chaque PO inscrit et ordonne dans son propre backlog, et on le convainc plutôt que de le contourner (concept 10b2). Le lien ne remplace donc pas la conversation avec l'autre PO [cours] : on parle d'abord, le lien suit la dépendance ensuite.

## A1c Les états

*Les états sont un choix d'équipe ; « fait » doit y vouloir dire DoD remplie.*

Les états d'un élément (Jira dit « statuts ») disent où il en est : à faire, en cours, fait, par exemple. Chaque outil en propose un jeu par défaut, que l'équipe change : Azure DevOps (processus Agile, User Story) a New, Active, Resolved, Closed ; Linear, Backlog, Todo, In Progress, Done, Canceled. Atlassian conseille d'en garder peu, un conseil d'éditeur et non un consensus.

Deux règles du cours [cours] s'y ajoutent. D'abord, « fait » veut dire DoD remplie (concept 11a) : un élément qui ne la remplit pas ne fait pas partie de l'incrément, selon le Scrum Guide. Or l'outil ne connaît pas la DoD ; il juge « terminé » d'après sa propre règle. Dans les tableaux Scrum de Jira, c'est ce qui se trouve dans la colonne la plus à droite. À l'équipe de faire coïncider le dernier état avec la DoD.

Ensuite, un état « prêt » reste un repère, pas une barrière (concept 11b) : il suit la DoR de l'équipe. Et chaque état se tient à jour : en ajouter un par étape coûte, d'autant que les états ne racontent pas la vie d'une story (concept 15). Le PO propose, l'équipe décide, par exemple en rétrospective, l'administrateur règle.

## Pièges

- **Copier les niveaux par défaut sans les choisir** (par exemple un niveau intermédiaire hérité du processus) : l'équipe choisit les siens, peu suffisent (concept 4).
- **Se croire coincé par un niveau que l'outil ne retire pas** : l'équipe peut cesser de l'employer et ne pas l'afficher.
- **Chercher un lien « dépend de »** : il s'appelle « blocks / is blocked by » (Jira), « Predecessor / Successor » (Azure DevOps) ou « blocked / blocking » (Linear).
- **Prendre le lien pour l'accord**, ou créer soi-même l'élément dans le backlog d'une autre équipe : chaque PO inscrit et ordonne dans le sien ; on le convainc (concept 10b2).
- **Un « fait » qui ne veut pas dire DoD remplie** : l'outil juge terminé d'après sa propre règle (sa colonne la plus à droite, sa catégorie d'état), pas d'après la DoD.
- **Confondre la « Definition of Done » d'une colonne d'Azure DevOps avec la DoD de Scrum** : même nom, autre objet (les critères pour passer une étape du tableau).
- **Un état « prêt » en barrière**, ou **multiplier les états** : la DoR tourne au mini cahier des charges (concept 11b), et chaque état se tient à jour ; les états ne sont pas la vie d'une story (concept 15).
- **Décrire les clics, ou régler seul** : le PO dit quoi et pourquoi ; l'équipe choisit ; l'administrateur règle, et certains réglages touchent d'autres équipes (la hiérarchie de Jira, le processus d'Azure DevOps).

## Le test rapide

> Pour chaque réglage : « à quoi sert-il, à l'équipe ou à l'utilisateur ? » Un niveau contient-il d'habitude plus d'un élément ? L'autre PO connaît-il la dépendance que le lien note ? « Fait » veut-il dire DoD remplie ?

Formulation du cours : aucune source ne la formule ainsi.
