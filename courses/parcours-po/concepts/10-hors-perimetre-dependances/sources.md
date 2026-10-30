## Affirmations

| Affirmation | Section | Source | Vérifié | Nature |
|---|---|---|---|---|
| La rubrique « Hors périmètre » est un choix d'école : le Scrum Guide n'en parle pas et n'impose aucune forme aux éléments du backlog | 10a1, Pièges | [S1] | « out of scope » absent du texte (recherche du 2026-10-30) ; « an ongoing activity to add details, such as a description, order, and size. Attributes often vary with the domain of work. » (Product Backlog) | école |
| Le hors périmètre dit ce que la story ne fait pas alors qu'on pourrait s'y attendre ; chaque ligne reste une demande | L'essentiel, 10a1 | [S2] | « clearly calling out what you're not doing. Flag things that are out of scope at the moment, but might be considered at a later time » (8. What we're not doing) | école |
| Écrit avant le sprint, le hors périmètre aligne les attentes : à la revue, un manque convenu ne passe pas pour un bug | L'essentiel, 10a1, Pièges | [S2b] | « one of the best ways to prevent it is to be proactive » ; « list what's out of scope for this feature or release » (How to write a product requirements document (PRD), étape 5) | cours |
| On n'y met que les demandes plausibles, celles qu'on pourrait croire incluses | 10a1, Pièges, Le test rapide | [S2] | « Flag things that are out of scope at the moment, but might be considered at a later time » (8. What we're not doing) | cours |
| La revue de sprint sert à adapter le backlog : la demande réclamée entre au backlog | 10a2 | [S1] | « The Product Backlog may also be adjusted to meet new opportunities » ; « inspect the outcome of the Sprint and determine future adaptations » (Sprint Review) | consensus |
| Le PO ordonne le backlog, la demande sortie du hors périmètre comprise | L'essentiel, 10a2, Pièges | [S1] | « Ordering Product Backlog items » (Product Owner) | consensus |
| Une dépendance : une story ne peut pas être livrée, ou n'a pas de sens, avant une autre | L'essentiel, 10b1 | [S3] | « we'd like them to not overlap in concept, and we'd like to be able to schedule and implement them in any order » (Independent) | cours |
| On réduit les dépendances autant que possible (le I d'INVEST), sans toujours y arriver | 10b1 | [S3] | « we'd like to be able to schedule and implement them in any order » ; « We can't always achieve this » (Independent) | consensus |
| Pour lever une dépendance, Cohn donne deux voies : fusionner les deux stories, si la story fusionnée reste petite, ou les découper autrement | 10b1, Pièges | [S4] | « Combine the dependent stories into one larger but independent story » ; « Find a different way of splitting the stories » ; « works well in this case because the combined story is only five days long » ; « a better approach is usually to find a different dimension along which to split » (ch. 2, Independent) | consensus |
| Les Developers estiment la taille | 10b1 | [S1] | « The Developers who will be doing the work are responsible for the sizing. » (Product Backlog) | consensus |
| Une dépendance qui reste s'écrit, et le PO ordonne : l'élément dont l'autre dépend passe avant | 10b1 | [S5], [S1] | « Some items may not be high priority on their own, but they're necessary for delivering other items » ; « needs to be moved higher on the backlog » (page) ; « Ordering Product Backlog items » (Product Owner) | consensus |
| Si la story dont l'autre dépend a une valeur seule, on garde les deux et on les ordonne : fusionner retarderait sa valeur | 10b1, Pièges, Le test rapide | [S4] | « works well in this case because the combined story is only five days long » (ch. 2, Independent) | cours |
| Deux stories dont aucune n'a de valeur seule sont souvent des tranches horizontales, à redécouper en tranches verticales | 10b1, Pièges, Le test rapide | [S6] | « Stories split along technical boundaries gives us stories that don't deliver any value to users on their own » (page) | cours |
| Le Scrum Guide ne traite pas deux produits qui ont chacun leur PO : plusieurs équipes sur un même produit partagent le PO et le backlog | 10b2 | [S1], [S7] | « multiple cohesive Scrum Teams, each focused on the same product. Therefore, they should share the same Product Goal, Product Backlog, and Product Owner. » (Scrum Team) ; « A Nexus has a single Product Owner who manages a single Product Backlog » (page) | fait |
| Envers une autre équipe, la dépendance s'écrit dans les deux backlogs et les deux PO s'accordent sur l'ordre | 10b2, Pièges | [S7] | « The Product Backlog must be decomposed so that dependencies are transparent, identified across teams, and removed or minimized » (page) | cours |
| Chaque PO ordonne seul son backlog : pour changer la place d'un élément chez l'autre, on le convainc | 10b2, Pièges | [S1] | « Those wanting to change the Product Backlog can do so by trying to convince the Product Owner » (Product Owner) | cours |
| Dans l'outil, la dépendance se note souvent par un lien entre deux éléments : un choix d'école | 10b2 | [S10] | « New installations of Jira come with four default types of links » ; « blocks / is blocked by » (About issue linking) | école |
| Une règle non fixée que soulève la demande se fait fixer, pas trancher en revue | 10a2, Pièges | cours | Choix du cours, sans source externe. | cours |

## Références

| Réf. | Source (auteur, titre, date) | Lien | Type | Consultée le |
|---|---|---|---|---|
| S1 | Schwaber, Sutherland, *The Scrum Guide*, novembre 2020 | https://scrumguides.org/scrum-guide.html | primaire | 2026-10-22 (texte téléchargé et cherché) ; 2026-10-30 (sections des citations et absences relevées) |
| S2 | Atlassian, « What is a Product Requirements Document (PRD)? », section « What we're not doing » | https://www.atlassian.com/agile/product-management/requirements | marketing (éditeur de Confluence et Jira) | 2026-10-22 (extraits de recherche) ; 2026-10-30 (page relue pour situer la citation) |
| S2b | Atlassian, modèle Confluence « Product requirements » | https://www.atlassian.com/software/confluence/templates/product-requirements | marketing (éditeur de Confluence et Jira) | 2026-10-22 (extraits de recherche) ; 2026-10-30 (page relue pour situer la citation) |
| S3 | Wake, « INVEST in Good Stories, and SMART Tasks », xp123.com, 17 août 2003 | https://xp123.com/invest-in-good-stories-and-smart-tasks/ | primaire | 2026-10-22 (relu) ; 2026-10-30 (section de la citation relevée) |
| S4 | Cohn, *User Stories Applied*, Addison-Wesley, 2004, ch. 2 « Writing Stories », section « Independent » | https://athena.ecs.csus.edu/~buckley/CSc191/User-Stories-Applied-Mike-Cohn.pdf | primaire (texte de l'auteur, copie hébergée par un tiers) | 2026-10-22 (extrait de recherche) |
| S5 | Mountain Goat Software (Cohn), « 5 Key Factors for Effective Product Backlog Prioritization », mis à jour le 15 octobre 2024 | https://www.mountaingoatsoftware.com/agile/5-key-factors-for-effective-product-backlog-prioritization | primaire (site de l'auteur, qui vend ses formations) | 2026-10-22 |
| S6 | Mountain Goat Software (Cohn), « Five Story-Splitting Mistakes and How to Stop Making Them » | https://www.mountaingoatsoftware.com/agile/five-story-splitting-mistakes-and-how-to-stop-making-them | primaire (site de l'auteur, qui vend ses formations) | 2026-10-22 (extrait de recherche) |
| S7 | Scrum.org (Schwaber et al.), *Nexus Guide*, janvier 2021 | https://www.scrum.org/resources/online-nexus-guide | primaire (Scrum.org, qui vend formations et certifications) | 2026-10-22 |
| S8 | Scaled Agile, Inc., glossaire SAFe, « ART Planning Board » | https://framework.scaledagile.com/blog/glossary_term/program-board | primaire (et marketing : l'éditeur vend certifications et outil) | 2026-10-22 |
| S9 | Scaled Agile, Inc., « PI Planning », mise à jour du 15 mars 2026 | https://framework.scaledagile.com/pi-planning | primaire (et marketing) | 2026-10-22 |
| S10 | Atlassian, « Configuring issue linking », Jira Data Center 11.3 | https://confluence.atlassian.com/spaces/ADMINJIRASERVER/pages/938847862/Configuring+issue+linking | primaire (documentation de l'éditeur) | 2026-10-22 (extraits de recherche) ; 2026-10-30 (page relue pour situer la citation) |

## Non vérifié

- 10a1, Consensus et choix d'école : une rubrique « Hors périmètre » dans une story comme
  « pratique de rédaction répandue » : aucune source d'auteur trouvée au niveau de la story ;
  seuls [S2] et [S2b] (marketing) recommandent une telle section, au niveau d'un document
  d'exigences. Pas de donnée d'usage. Écrire « certaines équipes ajoutent… », sans
  « répandue », ou garder « choix d'école » sans auteur.
- 10b1, Consensus et choix d'école : les citations de Cohn [S4] ont été lues dans une copie
  hébergée par un site universitaire tiers, non sur une édition consultée directement ; le
  passage concorde avec la table des matières de l'éditeur. Ne rien y appuyer d'autre que les
  deux voies (fusionner, découper autrement) et la condition de taille.
- 10b2, Consensus et choix d'école : l'accord entre deux PO de produits distincts sur l'ordre
  dans leurs backlogs est un choix du cours. Ni le Scrum Guide ni Nexus ne traitent deux
  produits ; SAFe le fait au niveau du train, avec d'autres rôles. À présenter comme choix du
  cours, sans auteur.
- 10b2 : le lien « dépend de » dans les outils autres que Jira n'est pas vérifié ; il relève de
  l'annexe A1.
- 10b1, Pièges : la page [S6] n'est pas datée et n'affiche pas d'auteur (site de Cohn).
