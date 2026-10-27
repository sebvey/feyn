# Glossaire du cours

Un seul terme par notion : le cours emploie le « terme du cours », en français, ou en anglais
quand c'est l'usage. La colonne « Concept » donne le concept qui l'introduit : un fichier de
concept n'emploie pas un terme introduit plus loin sans le définir. Le prof peut montrer ce
fichier à l'apprenant.

| Terme du cours | Anglais | Définition | Concept |
|---|---|---|---|
| Scrum | Scrum | Cadre de travail décrit par le Scrum Guide (Schwaber, Sutherland, 2020) | 0 |
| Équipe Scrum | Scrum Team | Le PO, le Scrum Master et les Developers | 0 |
| Product Owner (PO) | Product Owner | Personne seule qui répond de la valeur du produit et de l'ordre du backlog | 0, 1 |
| Scrum Master | Scrum Master | Personne qui répond de l'efficacité de l'équipe, dont la levée des obstacles | 0, 14 |
| Developers | Developers | Les membres de l'équipe qui réalisent l'incrément (ici data engineers et analyste) | 0 |
| Responsabilité | accountability | Ce dont répond chacun des trois rôles de l'équipe Scrum (PO, Scrum Master, Developers) | 0 |
| Événement | event | Le sprint et les quatre événements qu'il contient (Sprint Planning, Daily Scrum, revue de sprint, rétrospective) | 0 |
| Artefact | artifact | Ce qui représente le travail ou la valeur : backlog produit, backlog de sprint, incrément | 0 |
| Engagement | commitment | Repère attaché à chaque artefact : objectif produit, objectif de sprint, DoD | 0 |
| Sprint | Sprint | Période fixe d'un mois au plus, qui contient les autres événements | 0 |
| Sprint Planning | Sprint Planning | Événement où l'équipe fixe l'objectif de sprint et où les Developers choisissent, avec le PO, le travail du sprint | 0, 15 |
| Daily Scrum | Daily Scrum | Point quotidien des Developers sur l'avancement vers l'objectif de sprint | 0 |
| Revue de sprint | Sprint Review | Événement où l'équipe et les parties prenantes inspectent l'incrément et adaptent le backlog | 0, 15 |
| Rétrospective | Sprint Retrospective | Événement où l'équipe inspecte sa façon de travailler, DoD comprise | 0 |
| Incrément | Increment | Le produit dans un nouvel état utilisable, qui remplit la DoD | 0 |
| Produit | product | Ce qui résout un problème d'utilisateurs et leur apporte une valeur | 1 |
| Utilisateur | user | Personne qui se sert du produit (un consommateur de données en est un) | 1 |
| Partie prenante | stakeholder | Toute personne ou équipe concernée par le produit (utilisateur, financeur, sponsor, équipe voisine, fournisseur de données) | 1, 14 |
| Valeur | value | Ce que l'utilisateur ou l'organisation gagne (temps, meilleure décision, risque évité) | 1 |
| Livrable | output | Ce que l'équipe produit (une vue, un indicateur, un pipeline) | 2 |
| Résultat | outcome | Ce qui change chez l'utilisateur grâce au livrable | 2 |
| Objectif produit | Product Goal | État futur visé du produit, cible à long terme de l'équipe | 0, 2 |
| Vision produit | product vision | Raison d'être du produit à long terme ; absente du Scrum Guide (choix d'école) | 2 |
| Mesure de résultat | outcome metric | Mesure qui dit si on s'approche du résultat visé | 2 |
| Backlog produit | Product Backlog | Liste ordonnée et émergente de ce qui pourrait améliorer le produit | 0, 3 |
| Élément du backlog | Product Backlog item | Toute entrée du backlog, quel que soit son niveau | 0, 3 |
| Epic, feature, story, tâche | epic, feature, story, task | Niveaux de découpage d'un besoin, choisis par l'équipe ; la tâche est du travail des Developers, pas un besoin | 4 |
| User story (story) | user story | Un besoin précis d'un utilisateur, vu de lui ; format courant (choix d'école) : en tant que, je veux, afin de | 5 |
| 3C | Card, Conversation, Confirmation | Une story est une carte, une conversation et une confirmation (Jeffries) | 5 |
| Acteur (d'une story) | actor | Rôle qui fait l'action du « je veux » et y gagne ce que dit le « afin de » (heuristique du cours) | 6 |
| Rôle | user role | Catégorie d'utilisateurs aux besoins communs | 6 |
| Persona | persona | Portrait fictif d'un rôle, construit à partir d'utilisateurs réels (choix d'école, Cooper) | 6 |
| INVEST | INVEST | Six critères d'une story bien formée (Wake) | 7 |
| Exploration bornée (spike) | spike | Travail limité dans le temps pour répondre à une question, sans livrer de fonction | 7, 17 |
| Contrainte | constraint | Exigence réelle de l'usage, qui ne se négocie pas ; elle s'écrit dans un critère d'acceptation, sans nommer de solution | 7, 8 |
| Mot flou | vague term | Mot d'une story ou d'un critère dont le sens n'est pas fixé, qui rend plusieurs lettres d'INVEST douteuses ; le PO le fait préciser par l'utilisateur concerné | 7, 15 |
| Critère d'acceptation | acceptance criterion | Condition vérifiable, propre à une story, qui dit quand elle est faite | 8 |
| Règle métier | business rule | Vérité du domaine, valable hors de la story | 8 |
| Given/When/Then | Given/When/Then | Forme d'un critère en exemple (issue du BDD, choix d'école) | 8 |
| Fraîcheur | freshness | Âge maximal des données au moment où on les lit | 1, 8, 12 |
| Couche | layer | Partie empilée du produit (ingestion, transformation, données prêtes, restitution, dans l'exemple du cours) | 9 |
| Tranche horizontale | horizontal slice | Une couche entière du produit, qui ne sert pas seule à l'utilisateur | 9 |
| Tranche verticale | vertical slice | Découpage qui traverse les couches et sert seul à l'utilisateur | 9 |
| Walking skeleton | walking skeleton | Toute petite implémentation de bout en bout qui relie les composants de l'architecture (Cockburn) ; sert l'équipe, pas une tranche verticale | 9 |
| Patron de découpage | splitting pattern | Façon type de découper une story trop grosse (choix d'école) | 9 |
| Hors périmètre | out of scope | Ce qu'une story ne fait pas alors qu'on pourrait l'attendre | 10 |
| Dépendance | dependency | Une story ne peut pas être livrée, ou n'a pas de sens, avant une autre story ou le travail d'une autre équipe | 10 |
| Definition of Done (DoD) | Definition of Done | Exigences de qualité que tout élément remplit pour faire partie de l'incrément | 0, 11 |
| Definition of Ready (DoR) | Definition of Ready | Conditions qu'un élément remplit avant d'être commencé : entrer dans un sprint, ou franchir le début du flux (annexe A2) ; choix d'école | 11 |
| Indicateur | metric | Valeur calculée par le produit pour ses utilisateurs (locations par quartier) | 2, 12 |
| Définition d'un indicateur | metric definition | Ce qu'il compte, sa règle de calcul, son grain, sa période, sa source, sa fraîcheur | 12 |
| Grain | grain | Ce que représente une valeur d'un indicateur ou une ligne d'une table (par station, par quartier ; Kimball) | 12 |
| Qualité des données | data quality | Respect de règles mesurables sur des dimensions (six chez DAMA UK : complétude, unicité, fraîcheur, validité, exactitude, cohérence ; la liste est un choix d'école) | 12 |
| Source de données | data source | Système qui produit les données, avec son propriétaire | 12 |
| Donnée personnelle | personal data | Information sur une personne identifiée ou identifiable (RGPD) | 12 |
| Finalité | purpose | Ce pour quoi des données sont demandées, dit avant de les collecter (RGPD) | 12 |
| Minimisation | data minimisation | Ne demander que les données nécessaires à la finalité (RGPD) | 12 |
| Ordonner | order | Décider de la place de chaque élément dans le backlog | 3, 13 |
| Prêt à être choisi | ready for selection | Élément que l'équipe peut finir en un sprint, une fois précisé (Scrum Guide) ; la DoR en est une version écrite par l'équipe | 3, 11 |
| Coût du retard | cost of delay | Ce qu'on perd à livrer plus tard (choix d'école) | 13 |
| WSJF | Weighted Shortest Job First | Coût du retard divisé par la durée, pour ordonner (choix d'école, SAFe) | 13 |
| MoSCoW | MoSCoW | Classement Must, Should, Could, Won't pour une échéance (choix d'école) | 13 |
| Sponsor | sponsor | Responsable qui porte le budget du produit et porte plus haut les obstacles qui dépassent le PO, sans ordonner le backlog | 1, 14 |
| Obstacle | impediment | Ce qui bloque l'équipe et qu'elle ne lève pas seule | 14 |
| Escalade | escalation | Porter un obstacle au niveau qui peut le lever | 14 |
| Refinement | Product Backlog refinement | Activité continue qui précise et découpe les éléments du backlog | 15 |
| Objectif de sprint | Sprint Goal | Objectif unique du sprint, fixé au Sprint Planning | 0, 15 |
| Backlog de sprint | Sprint Backlog | Objectif de sprint, éléments choisis et plan des Developers | 0, 15 |
| Story map | story map | Carte du backlog selon le parcours de l'utilisateur (Patton) | 16 |
| Colonne vertébrale | backbone | Ligne des activités de l'utilisateur en haut de la story map, dans l'ordre de son récit ; elle ne s'ordonne pas (Patton) | 16 |
| Tranche de version | release slice | Ensemble de stories de la carte qui forme une version utile | 16 |
| MVP | minimum viable product | Au sens de Ries : version qui apporte le plus d'apprentissage pour le moindre effort ; l'usage courant en fait la première version | 16, 17 |
| Prévision | forecast | Estimation de ce qui sera fait et quand, tirée de la taille et du rythme mesurés des Developers ; pas une promesse. À ne pas confondre avec la prévision des stations à risque, une fonction du produit (9, 17) | 16 |
| Story points, vélocité | story points, velocity | Unité d'estimation de la taille, et quantité finie par sprint dans cette unité : pratiques courantes, absentes du Scrum Guide, nommées sans être enseignées (choix d'école) | 16 |
| Mesure de succès | success metric | Mesure qui dit si une version a réussi, de préférence un changement de comportement de l'utilisateur (Patton) ; distincte de la mesure de résultat de l'objectif produit | 2, 16 |
| Hypothèse | assumption | Ce qu'on tient pour vrai sans l'avoir vérifié | 2, 17 |
| Risque de valeur, risque de faisabilité | value risk, feasibility risk | Hypothèse sur ce que l'utilisateur fera du produit et sur ce qu'il sert l'objectif produit ; hypothèse sur ce qu'on peut construire, données comprises (deux des quatre risques de Cagan ; les données : choix du cours) | 17 |
| Prototype | prototype | Version rapide et peu chère d'une idée, faite pour la tester et souvent jetée : maquette montrée à l'utilisateur, ou prototype sur données réelles, utilisé pour de vrai par de vrais utilisateurs (Cagan) | 17 |
| État (d'un élément) | status, state | Étape où se trouve un élément dans le tableau de l'équipe (à faire, en cours, fait), réglée dans l'outil ; absent du Scrum Guide ; Jira dit « statut » | A1 |
| Kanban dans Scrum | Kanban with Scrum | Équipe qui garde ses sprints et y ajoute des pratiques de flux (*Kanban Guide for Scrum Teams*) : le cours s'applique sans l'annexe A2 | A2 |
| Flux continu | continuous flow | Travail sans sprint : un élément commence quand l'équipe a de la place et se livre quand il est fini (terme du cours) | A2 |
| Travail en cours | work in progress (WIP) | Éléments commencés et pas finis (*Kanban Guide*) | A2 |
| Limite du travail en cours | WIP limit | Nombre d'éléments en cours que l'équipe s'autorise (*Kanban Guide for Scrum Teams* ; le *Kanban Guide* dit « contrôler ») | A2 |
| Definition of Workflow | Definition of Workflow | Ce que l'équipe écrit de son flux : ce qu'est un élément, quand il commence et finit, ses états, ses règles de passage (*Kanban Guide*) | A2 |
| Point d'engagement | commitment point | Moment où l'on décide de commencer un élément (choix d'école, Kanban University) | A2 |
| Réapprovisionnement | replenishment | Moment régulier où l'on revoit les éléments prêts et choisit ceux qui entreront selon la place (choix d'école, Kanban University) | A2 |
| Débit | throughput | Nombre d'éléments finis par unité de temps (*Kanban Guide*) | A2 |
| Temps de cycle | cycle time | Durée entre le début et la fin d'un élément (*Kanban Guide*) | A2 |
| Âge d'un élément | work item age | Durée depuis le début d'un élément encore en cours (*Kanban Guide*) | A2 |
| Attente de niveau de service | service level expectation (SLE) | Prévision du temps de cycle en durée et probabilité, tirée de l'historique (*Kanban Guide*) | A2 |

## Termes à éviter

| À éviter | Dire plutôt | Pourquoi |
|---|---|---|
| « le métier » | l'acteur nommé (Étienne, Maud), « les utilisateurs » ou « les parties prenantes » | Flou : on ne sait pas qui décide |
| « prioriser » au sens d'ordonner | « ordonner » ; « priorité » seulement pour MoSCoW | Le Scrum Guide parle d'ordre ; « priorité » laisse croire à des ex aequo |
| « équipe de développement » | « Developers » | Terme du Scrum Guide 2017, remplacé en 2020 |
| « livrer un sprint » | « livrer un incrément » | Le sprint est une durée, l'incrément un état du produit |
| « ticket » | « élément du backlog » | Terme d'outil, absent du Scrum Guide |
| « KPI », « métrique » | « indicateur » (ce que calcule le produit) ou « mesure de résultat » (ce qui juge le produit) | Deux notions, deux termes |
