## Affirmations

| Affirmation | Section | Source | Vérifié | Nature |
|---|---|---|---|---|
| Le Scrum Guide ne dit rien des outils de suivi : ni niveau, ni lien, ni état d'un élément | L'essentiel | [S1] | « status », « workflow », « board », « link », « ticket », « Jira », « epic », « feature », « story », « theme », « task » absents du texte entier (cherché le 2026-10-30) ; « Product Backlog items » (Product Backlog) | consensus |
| Le Scrum Guide demande un backlog transparent, visible et compris | L'essentiel | [S1] | « Ensuring that the Product Backlog is transparent, visible and understood » (Product Owner) ; « The emergent process and work must be visible to those performing the work as well as those receiving the work. » (Transparency) | consensus |
| Jira propose par défaut trois niveaux : Epic, Story, Subtask, qu'on peut modifier | A1a | [S2] | « By default, Jira is set up with three levels of work type hierarchy » ; « by default called Epic » ; « called Story » ; « called Subtask » ; « You can modify these levels » (Modify the default hierarchy levels) | fait |
| Azure DevOps, en processus Agile, propose quatre niveaux : Epic, Feature, User Story, Task | A1a | [S3] | « Epic », « Feature », « User Story », « Task » (Agile) ; « Epic », « Issue », « Task » (Basic) (tableau « Main distinctions among the default processes ») | fait |
| Azure DevOps ne retire pas un niveau hérité : on le renomme, ou on désactive son type | A1a, Pièges | [S4] | « You can't remove an inherited portfolio level from a product. » ; « You can rename the level, or disable WITs to prevent teams from creating new work items of those types » (Limitations) | fait |
| Dans Azure DevOps, chaque équipe choisit les niveaux qu'elle affiche | A1a, Pièges | [S5] | « Each team can select and configure the backlog levels that fit their needs. » (Select backlog navigation levels) | fait |
| Pour Jira, la documentation décrit le retrait d'un niveau ajouté, pas celui d'un niveau par défaut | A1a | [S2] | « To remove a level you have added to the work type hierarchy » (Remove a hierarchy level) | fait |
| Ne pas pouvoir retirer un niveau n'oblige pas à l'employer : l'équipe peut cesser de s'en servir, et ne pas l'afficher quand l'outil le permet | A1a, Pièges | cours | Déduit des pages de Jira et d'Azure DevOps sur le retrait d'un niveau. | cours |
| Peu de niveaux suffisent ; un niveau est de trop quand il ne contient d'habitude qu'un seul élément | A1a, Pièges, Le test rapide | cours | Règle pratique du cours (concept 4). | cours |
| La hiérarchie de Jira vaut pour tous les espaces gérés par l'entreprise, et la changer casse les liens parent et enfant existants | A1a, Pièges | [S2] | « Changes to your work type hierarchy will apply to all company-managed spaces in your site. » (Configure the work type hierarchy) ; « will break existing parent and child relationships » (Manage custom hierarchy levels) | fait |
| Le processus d'Azure DevOps s'applique à tous les projets qui l'emploient | A1a, Pièges | [S4] | « any projects that use the process automatically reflect the customizations » (Prerequisites) | fait |
| Le PO dit ce qu'il veut voir dans l'outil et pourquoi, l'équipe choisit, l'administrateur de l'outil fait le réglage | L'essentiel, A1a, A1c, Pièges | cours | Partage des rôles du cours. | cours |
| La page ne dit pas où cliquer : les écrans changent d'un outil et d'une version à l'autre | L'essentiel, Pièges | cours | Choix du cours. | cours |
| Aucun des trois outils vérifiés n'a de lien nommé « dépend de » : Jira dit « blocks / is blocked by », Azure DevOps « Predecessor / Successor », Linear « blocked / blocking » | A1b, Pièges | [S6], [S7], [S12] | « New installations of Jira come with four default types of links » ; « blocks / is blocked by » (About issue linking) ; « Choose Predecessor when linking to a work item that should complete before the current item » (Work link type) ; « You can mark issues as blocked, blocking, related, and duplicate. » (Overview) | fait |
| Le lien peut relier des éléments de deux équipes, dans deux espaces (Jira) ou deux projets (Azure DevOps) | A1b | [S6b], [S7] | « Use linked work items to connect work across teams and spaces in Jira » ; « You can link work items across different spaces » (Link work items) ; « You can create predecessor-successor links across projects » (Work link type) | fait |
| Le lien rend la dépendance visible des deux côtés | A1b | [S6b] | « Linked work items help your team surface, understand, and manage dependencies and related work » (Link work items) | fait |
| Un lien n'est pas un accord et ne remplace pas la conversation avec l'autre PO : chaque PO inscrit et ordonne dans son propre backlog, et on le convainc | A1b, Pièges | [S1] | « Those wanting to change the Product Backlog can do so by trying to convince the Product Owner » (Product Owner) | cours |
| Les états d'un élément viennent avec un jeu par défaut, que l'équipe change | A1c | [S8], [S8b], [S10b], [S12b] | « Statuses are the steps of a team's workflow » (What is a workflow status?) ; « The statuses are recommended starting points for each template, but you can edit or remove them from a workflow to suit your team's need. » ; « You can also create your own. » (Work item statuses) ; « You can customize the workflow of any work item type (WIT) by hiding inherited states or adding custom states. » (Supported customizations) ; « These workflows are team-specific and come with a default set and order » (Overview) ; « Create statuses by clicking the + button, or remove statuses » (Configure) | fait |
| États par défaut : Azure DevOps (processus Agile, User Story), New, Active, Resolved, Closed ; Linear, Backlog, Todo, In Progress, Done, Canceled | A1c | [S10], [S12b] | « In the Agile process, a user story typically moves through New, Active, Resolved, and Closed. » (Workflow states) ; « Backlog > Todo > In Progress > Done > Canceled » (Overview) | fait |
| Atlassian conseille de garder peu d'états : un conseil d'éditeur, pas un consensus | A1c | [S9] | « Keep your workflow simple: limit statuses and transitions » ; « include only the statuses and transitions you need » (Keep your workflow simple: limit statuses and transitions) | école |
| « Fait » veut dire DoD remplie : selon le Scrum Guide, un élément qui ne la remplit pas ne fait pas partie de l'incrément | A1c, Pièges, Le test rapide | [S1] | « Work cannot be considered part of an Increment unless it meets the Definition of Done. » (Increment) | cours |
| L'outil juge « terminé » d'après sa propre règle : dans les tableaux Scrum de Jira, la colonne la plus à droite ; dans ses tableaux Kanban, la catégorie d'état | A1c, Pièges | [S8e] | « Unlike Jira's scrum boards, Kanban boards use status category to determine whether a work item is complete » ; « determine complete work based exclusively on whether a status is in the rightmost board column » ("Completed work items" are determined by Status Category) | fait |
| Un état « prêt » reste un repère, pas une barrière : il suit la DoR de l'équipe | A1c, Pièges | [S13] | « becomes a huge step towards a sequential, stage-gate approach » (A Definition of Ready Is Not Always a Good Idea) ; « Favor guidelines rather than rules on your Definition of Ready » (How to Use a Definition of Ready Correctly) | cours |
| Chaque état se tient à jour : en ajouter un par étape coûte, et les états ne racontent pas la vie d'une story | A1c, Pièges | cours | | cours |
| L'équipe change ses réglages, par exemple en rétrospective, qui inspecte aussi les outils | A1c | [S1] | « The Scrum Team inspects how the last Sprint went with regards to individuals, interactions, processes, tools, and their Definition of Done. » (Sprint Retrospective) | cours |

## Références

| Réf. | Source (auteur, titre, date) | Lien | Type | Consultée le |
|---|---|---|---|---|
| S1 | Schwaber, Sutherland, *The Scrum Guide*, novembre 2020 | https://scrumguides.org/scrum-guide.html | primaire | 2026-10-23 (texte téléchargé et cherché) ; 2026-10-30 (sections des citations relevées) |
| S2 | Atlassian, « Configure the work type hierarchy », Jira Cloud administration (sans date de mise à jour, © 2026) | https://support.atlassian.com/jira-cloud-administration/docs/configure-the-issue-type-hierarchy/ | primaire (documentation de l'éditeur) | 2026-10-23 (relu) ; 2026-10-30 (sections des citations relevées) |
| S3 | Microsoft, « Default processes and process templates », Azure Boards, mise à jour 2026 | https://learn.microsoft.com/en-us/azure/devops/boards/work-items/guidance/choose-process | primaire (documentation de l'éditeur) | 2026-10-22 (non relu) |
| S4 | Microsoft, « Customize Backlogs and Boards », Azure Boards, 20 août 2025 | https://learn.microsoft.com/en-us/azure/devops/organizations/settings/work/customize-process-backlogs-boards | primaire (documentation de l'éditeur) | 2026-10-23 ; 2026-10-30 (sections des citations relevées) |
| S5 | Microsoft, « Select backlog navigation levels », Azure DevOps (sans date affichée) | https://learn.microsoft.com/en-us/azure/devops/organizations/settings/select-backlog-navigation-levels | primaire (documentation de l'éditeur) | 2026-10-23 ; 2026-10-30 (sections des citations relevées) |
| S6 | Atlassian, « Configuring issue linking », Jira Data Center 11.3 | https://confluence.atlassian.com/spaces/ADMINJIRASERVER/pages/938847862/Configuring+issue+linking | primaire (documentation de l'éditeur) | 2026-10-23 (relu) ; 2026-10-30 (sections des citations relevées) |
| S6b | Atlassian, « Link work items », Jira Cloud (sans date, © 2026) | https://support.atlassian.com/jira-software-cloud/docs/link-issues | primaire, marketing (primaire pour ce que fait l'outil, documentation de l'éditeur ; marketing pour ce qu'il recommande) | 2026-10-23 (relu) ; 2026-10-30 (sections des citations relevées) |
| S7 | Microsoft, « Link Types Reference Guide », Azure Boards, 8 octobre 2025 | https://learn.microsoft.com/en-us/azure/devops/boards/queries/link-type-reference | primaire (documentation de l'éditeur) | 2026-10-23 ; 2026-10-30 (sections des citations relevées) |
| S8 | Atlassian, « What is a workflow status? », Jira Cloud administration (sans date, © 2026) | https://support.atlassian.com/jira-cloud-administration/docs/what-is-a-workflow-status | primaire (documentation de l'éditeur) | 2026-10-23 (extraits de recherche et pages lues) ; 2026-10-30 (sections des citations relevées) |
| S8b | Atlassian, « What are work item statuses, priorities, and resolutions? », Jira Cloud administration (sans date, © 2026) | https://support.atlassian.com/jira-cloud-administration/docs/what-are-issue-statuses-priorities-and-resolutions | primaire (documentation de l'éditeur) | 2026-10-23 (extraits de recherche et pages lues) ; 2026-10-30 (sections des citations relevées) |
| S8e | Atlassian, base de connaissances, « Kanban board shows or hides completed work unexpectedly in Jira Cloud » (sans date, © 2026) | https://support.atlassian.com/jira/kb/kanban-board-shows-or-hides-completed-work-unexpectedly-in-jira-cloud | primaire (documentation de l'éditeur) | 2026-10-23 (extraits de recherche et pages lues) ; 2026-10-30 (sections des citations relevées) |
| S9 | Atlassian, « Best practices for workflows in Jira », Jira Cloud (sans date) | https://support.atlassian.com/jira-software-cloud/docs/best-practices-for-workflows-in-jira | marketing (recommandation de l'éditeur) | 2026-10-23 (extrait de recherche) ; 2026-10-30 (page relue, sections des citations relevées) |
| S10 | Microsoft, « How workflow category states are used in Azure Boards backlogs and boards » (sans date relevée) | https://learn.microsoft.com/en-us/azure/devops/boards/work-items/workflow-and-state-categories | primaire (documentation de l'éditeur) | 2026-10-23 ; 2026-10-30 (sections des citations relevées) |
| S10b | Microsoft, « Customize the workflow of an inherited process », 3 mars 2026 | https://learn.microsoft.com/en-us/azure/devops/organizations/settings/work/customize-process-workflow | primaire (documentation de l'éditeur) | 2026-10-23 ; 2026-10-30 (sections des citations relevées) |
| S11 | Microsoft, « Manage columns on your board », Azure Boards, section « Add Definition of Done to a column » (sans date relevée) | https://learn.microsoft.com/en-us/azure/devops/boards/boards/add-columns | primaire (documentation de l'éditeur) | 2026-10-23 (extrait de recherche) ; 2026-10-30 (page relue, sections des citations relevées) |
| S12 | Linear, documentation, « Issue relations » (sans date) | https://linear.app/docs/issue-relations | primaire (documentation de l'éditeur) | 2026-10-23 ; 2026-10-30 (copie archivée du 1er octobre 2026 relue : l'adresse renvoie désormais à « Issue properties » ; sections des citations relevées) |
| S12b | Linear, documentation, « Issue status » (sans date) | https://linear.app/docs/configuring-workflows | primaire (documentation de l'éditeur) | 2026-10-23 ; 2026-10-30 (copie archivée du 1er octobre 2026 relue : l'adresse renvoie désormais à « Issue properties » ; sections des citations relevées) |
| S13 | Mountain Goat Software (Cohn), « Definition of Ready: What It Is and Why It's Dangerous », mise à jour du 28 juin 2023 | https://www.mountaingoatsoftware.com/blog/the-dangers-of-a-definition-of-ready | primaire (site de l'auteur, qui vend aussi ses formations) | 2026-10-22 (non relu) ; 2026-10-30 (sections des citations relevées) |
| S14 | Beck et al., *Manifesto for Agile Software Development*, 2001 | https://agilemanifesto.org/ | primaire | 2026-10-23 |

## Non vérifié

- A1a, Pièges : la page [S2] ne décrit que le retrait d'un niveau ajouté ; qu'un niveau par
  défaut de Jira (Epic) ne se retire pas est implicite, pas écrit. Ne pas affirmer « Jira
  interdit de retirer l'epic » ; dire que l'équipe peut ne pas l'employer.
- A1a : les niveaux et réglages des espaces gérés par l'équipe dans Jira (« team-managed ») :
  [S2] ne vaut que pour les espaces gérés par l'entreprise. Non vérifié pour les autres.
- A1b : types de liens par défaut de Jira Cloud. [S6b] liste dix-sept libellés (dont
  « implements », « causes », « reviews ») sans dire lesquels existent sur un site neuf ; seuls
  les quatre types de Data Center [S6] sont donnés comme « default ». Dire « blocks / is
  blocked by » sans affirmer une liste complète pour Cloud.
- A1b : la page [S12] ne dit pas si une relation de Linear relie deux équipes. Ne pas
  l'affirmer.
- A1b, A1c : aucune donnée de part de marché consultée pour dire de Linear qu'il est un
  « outil courant », ni pour classer les outils par usage. Présenter Linear comme un troisième
  outil, sans « courant » ; Jira et Azure DevOps sont ceux que le cours cite déjà (concepts 4
  et 10).
- A1b, Pièges : le lien « dépend de » des autres outils (Trello, GitHub Projects, Monday…)
  n'est pas vérifié.
- A1c : statuts par défaut d'un espace Scrum ou Kanban de Jira. La page « Add statuses to a
  Jira workflow » (https://support.atlassian.com/jira-cloud-administration/docs/add-statuses-to-a-jira-workflow)
  donne un exemple (To do, In progress, Done « would be three statuses ») et [S8b] une liste de
  statuts disponibles selon les modèles, pas la liste exacte d'un modèle donné. Ne pas affirmer
  qu'un espace Scrum neuf a exactement trois statuts. Le statut « Selected for Development »
  (« The work item is verified and has been selected to be worked on in the future ») existe
  dans la liste de [S8b] ; dans quel modèle : non vérifié.
- L'essentiel, Pièges : les pages d'Atlassian et de Linear n'affichent aucune date de mise à
  jour (seulement « © 2026 » chez Atlassian). Les noms d'Atlassian changent (« work item »,
  ex-« issue » ; « space », ex-« project ») : le concept ne doit pas citer d'intitulé de menu.
- A1b, Consensus et choix d'école : « le lien ne remplace pas la conversation » est une
  formulation du cours ; le Manifeste agile [S14] l'appuie en général (individus et
  interactions plutôt que processus et outils), pas pour un lien d'outil. À présenter comme le
  choix du cours.
- L'essentiel, A1a, Consensus et choix d'école : les pages [S2], [S4], [S5], [S10b] disent
  qui a les droits, pas le rôle du PO. « Le PO propose, l'administrateur règle » est un choix
  du cours.
- A1a, Consensus et choix d'école : le niveau de trop est une règle pratique du cours, tirée
  de l'échange avec un seul apprenant, déjà en « Non vérifié » au concept 4 ; l'entrée
  d'origine n'a pas été relue.
