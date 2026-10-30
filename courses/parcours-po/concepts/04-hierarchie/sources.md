## Affirmations

| Affirmation | Section | Source | Vérifié | Nature |
|---|---|---|---|---|
| Le Scrum Guide ne définit aucun niveau : il parle d'« éléments du backlog » ; epic, feature, story, thème et tâche n'y figurent pas | L'essentiel, 4a1 | [S1] | « epic », « feature », « story », « theme », « task » absents du texte (recherche du 2026-10-22) ; « Product Backlog items » (Product Backlog) | consensus |
| La tâche est du travail des Developers : ils planifient le travail de chaque élément choisi | L'essentiel, 4a1 | [S1] | « For each selected Product Backlog item, the Developers plan the work necessary » (Sprint Planning) | consensus |
| La tâche est dans le plan des Developers, le backlog de sprint, pas au backlog produit ; le PO ne l'écrit pas | L'essentiel, 4a1, Pièges, Le test rapide | [S1] | « composed of the Sprint Goal (why), the set of Product Backlog items selected for the Sprint (what), as well as an actionable plan for delivering the Increment (how) » ; « a plan by and for the Developers » (Sprint Backlog) | cours |
| Le cours emploie quatre mots courants ; les outils ont trois ou quatre niveaux par défaut | L'essentiel, 4a1 | [S3], [S4] | « By default, Jira is set up with three levels of work type hierarchy » (page) ; « Epic », « Feature », « User Story », « Task » (Agile) ; « Epic », « Issue », « Task » (Basic) (tableau « Main distinctions among the default processes ») | cours |
| Une story est un besoin d'utilisateur | L'essentiel, 4a1 | [S2] | « A user story is simply something a user wants. » (page) | école |
| Epic : au sens d'origine, une grosse story, trop grosse pour un sprint | L'essentiel, 4a1 | [S2] | « an epic is a large user story » ; « epic just means big user story » (page) | école |
| Aucun seuil ne sépare les niveaux | 4a1 | [S2] | « there's no magic threshold at which we call a particular story an epic » (page) | école |
| Le thème n'est pas un niveau du cours : son sens varie selon les auteurs (chez Cohn, une collection de stories) | 4a1, Pièges | [S2] | « to mean a collection of user stories » (page) | école |
| Jira Cloud, par défaut : Epic > Story > Subtask, modifiables ; des niveaux au-dessus seulement dans les offres Premium et Enterprise | 4a2 | [S3] | « By default, Jira is set up with three levels of work type hierarchy » ; niveau 1 « by default called Epic », niveau 0 « called Story », niveau -1 « called Subtask » ; « You can modify these levels » ; « Jira Premium and Enterprise customers can also create and manage additional levels » (page) | école |
| Azure DevOps : les niveaux dépendent du processus choisi à la création du projet ; Agile : Epic > Feature > User Story > Task ; Scrum : Epic > Feature > Product Backlog Item > Task ; Basic : Epic > Issue > Task | 4a2 | [S4] | « Epic », « Feature », « User Story », « Task » (Agile) ; « Product backlog item » (Scrum) ; « Epic », « Issue », « Task » (Basic) (tableau « Main distinctions among the default processes ») ; « You can't change a project's base process after the project is created. » (page) | école |
| SAFe, un cadre pour plusieurs équipes, ajoute des niveaux (la capability entre epic et feature) ; une équipe seule n'en a pas besoin | 4a2 | [S5] | « sized to be delivered by an Agile Release Train within a PI » ; « whose implementation often spans multiple ARTs » (page) | école |
| Chaque équipe choisit ses niveaux, et les niveaux d'un outil se modifient | L'essentiel, 4a2 | [S1], [S3] | « epic », « feature », « story », « theme », « task » absents du texte (recherche du 2026-10-22) ; « You can modify these levels » (page) | école |
| Une story tient dans un sprint | L'essentiel, 4a1 | cours | Définition du cours, qui oppose la story à l'epic, trop gros pour un sprint. | cours |
| Aucune durée en jours ne fait la définition d'une story | Pièges | [S7] | « at most a few person-weeks » (Small) | cours |
| Un seul « je veux » trop gros pour un sprint n'est pas encore une story : il se découpe | 4b, Le test rapide | [S2] | « epic just means big user story » (page) | cours |
| Le niveau de trop : quand la plupart des features ne contiennent qu'une story, un niveau est de trop | 4a3, Pièges | cours | Règle tirée d'une session du cours (historique git), sans source externe. | cours |
| Feature ou story : compter les « je veux » (un seul : story ; plusieurs, chacun utile seul : feature) | 4b, Le test rapide | cours | Test qui a marché avec un apprenant en session (historique git), là où « je sais ce que voit l'utilisateur » ne marchait pas ; aucune source externe. | cours |
| Juger le niveau d'après ce qu'il reste à livrer, pas dans l'absolu | 4b, Pièges | cours | Choix du cours, sans source externe. | cours |
| Epic au sens du test du cours : plusieurs groupes de « je veux », ou des « je veux » qu'on ne sait pas encore écrire ; un « je veux » qui en contient d'autres se déplie avant de compter | 4b, Le test rapide, Pièges | cours | Extension du test « compter les “je veux” » à l'epic, sans source externe. | cours |
| Quand la taille et le compte divergent, le compte l'emporte : une feature peut prendre plusieurs sprints ; la taille ne tranche qu'entre story et epic, pour un seul « je veux » | L'essentiel, 4b | cours | Choix du cours, sans source externe. | cours |
| Une phrase au format d'une story peut être un epic : le format ne fait pas le niveau | 4b, Pièges | [S2] | « an epic is a large user story » (page) | cours |
| Un travail qui ne sert qu'à réaliser une story est une tâche du plan des Developers ; un travail technique qui porte sa propre raison entre au backlog, et le PO l'ordonne | 4a1, Pièges | [S1] | « It is the single source of work undertaken by the Scrum Team. » (Product Backlog) ; « How this is done is at the sole discretion of the Developers. » (Sprint Planning) | cours |
| Un niveau coûte (écrire, ranger, suivre) ; avant de retirer un niveau, vérifier que ses éléments ne sont pas mal classés | 4a3 | cours | Choix du cours, sans source externe. | cours |

## Références

| Réf. | Source (auteur, titre, date) | Lien | Type | Consultée le |
|---|---|---|---|---|
| S1 | Schwaber, Sutherland, *The Scrum Guide*, novembre 2020 | https://scrumguides.org/scrum-guide.html | primaire | 2026-10-22 |
| S2 | Cohn (Mountain Goat Software), « Epics, Features and User Stories », page de guide, mise à jour le 28 avril 2025 (sans signature ; site et voix de Cohn) | https://www.mountaingoatsoftware.com/agile/stories-epics-and-themes | primaire (site de l'auteur, qui vend aussi ses formations) | 2026-10-22 |
| S3 | Atlassian, « Configure the work type hierarchy », Jira Cloud administration (sans date de mise à jour, © 2026) | https://support.atlassian.com/jira-cloud-administration/docs/configure-the-issue-type-hierarchy/ | primaire (documentation de l'éditeur) | 2026-10-22 |
| S4 | Microsoft, « Default processes and process templates », Azure Boards, mise à jour 2026 | https://learn.microsoft.com/en-us/azure/devops/boards/work-items/guidance/choose-process | primaire (documentation de l'éditeur) | 2026-10-22 |
| S5 | Scaled Agile, « Features and Capabilities », SAFe, mise à jour le 24 février 2025 | https://framework.scaledagile.com/features-and-capabilities | primaire, marketing (pour la formation SAFe) | 2026-10-22 |
| S7 | Wake, « INVEST in Good Stories, and SMART Tasks », 17 août 2003 | https://xp123.com/invest-in-good-stories-and-smart-tasks/ | primaire | 2026-10-22 (cadrage T-018a, §8) |

## Non vérifié

- 4a1, Consensus et choix d'école : la page de Cohn [S2] n'a pas de nom d'auteur ;
  l'attribution à Cohn vient du site et de la voix du texte. Sa date d'origine n'est pas
  affichée (seulement la mise à jour).
- L'essentiel, 4a1 : le sens « capacité qui sert seule » de la feature reformule le résumé de
  la page de Cohn (« story big enough to release on its own »), lu par un outil de résumé, pas
  mot pour mot. La documentation d'Azure DevOps [S4] place Feature entre Epic et l'élément du
  backlog produit ; aucune citation n'en a été relevée.
- 4a1, 4a3, Consensus et choix d'école : que « feature » n'ait pas de sens unique (terme
  absent de l'équipe XP d'origine, employé de façon incohérente) et que Cohn le juge superflu
  au point d'en faire une étiquette plutôt qu'un niveau a été lu sur sa page [S2], sans
  citation relevée. La page Wikipédia « User story », consultée le 2026-10-22, donne des
  définitions de thème et d'epic qui se contredisent ; aucune citation n'en a été relevée.
- 4a2 : qu'Azure DevOps permette de modifier ses niveaux (processus hérités personnalisables,
  niveaux de backlog ajoutables) a été lu dans sa documentation [S4], sans citation relevée.
- 4a2 : les noms de niveaux de Jira Server ou Data Center, et des modèles de projet Jira
  (Scrum, Kanban) au-delà de la page [S3], ne sont pas vérifiés. Le niveau 0 de Jira regroupe
  en pratique Story, Task et Bug ; [S3] ne nomme que « Story ».
- 4a1 : le sens de « thème » dans Jira (regroupement transversal) n'a été lu que sur
  Wikipédia, page qui affiche un avertissement de fiabilité ; il est absent de [S3].
- Pièges : « quelques jours » comme pratique courante pour la taille d'une story : aucune
  source ; Wake [S7] dit « at most a few person-weeks ». Ne pas l'écrire.
- 4a3, 4b, Pièges, Le test rapide : les trois tests du cours (compter les « je veux », niveau
  de trop, juger ce qu'il reste à livrer) ont été observés sur un seul apprenant (base faible).
  Les présenter comme des règles pratiques du cours, pas comme un consensus.
