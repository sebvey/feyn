## Affirmations

| Affirmation | Section | Source | Vérifié | Nature |
|---|---|---|---|---|
| Le PO fait écrire et fixer ce que l'indicateur compte ; le calcul, la requête et les tests sont le comment des Developers | L'essentiel, 12a1, Pièges | [S1] | « How this is done is at the sole discretion of the Developers. No one else tells them how to turn Product Backlog items into Increments of value. » (Sprint Planning) | cours |
| Un indicateur : une valeur calculée par le produit pour ses utilisateurs | 12a1 | cours | Définition du cours. | cours |
| Le contenu d'une définition : la règle de calcul, le grain, la période, la source, la fraîcheur ; une liste du cours, qui recoupe la pratique des outils d'indicateurs | 12a1 | [S2], [S8], [S9] | « The grain establishes exactly what a single fact table row represents » (page) ; « Consider it as your WHERE clause » ; « Define the data's grain on the time dimension column » (page) ; « the measure to calculate, the aggregation to apply, the time grain to use, and any filters » (page) | cours |
| Le grain vient de la modélisation dimensionnelle de Kimball : ce que représente une ligne de la table de faits | 12a1 | [S2] | « The grain establishes exactly what a single fact table row represents » ; « the pivotal step in a dimensional design » (page) | école |
| La fraîcheur d'un indicateur fait partie de sa définition ; c'est aussi une dimension de qualité (timeliness) | 12a1, 12b | [S3] | « Timeliness indicates whether the data is available when expected and needed » (5. Timeliness) | cours |
| La définition s'écrit une fois, pour l'indicateur, pas dans les critères d'une story : un critère est propre à une story | 12a2, Pièges | [S14] | « conditions of satisfaction are specific to a given product backlog item » (page) | cours |
| La qualité des données s'exprime en règles mesurables sur des dimensions | L'essentiel, 12b | [S4], [S3] | « There are six core data quality dimensions, as defined by DAMA UK » (Data quality dimensions – how to measure your data quality) ; « Uniqueness measures the number of duplicates » (3. Uniqueness) | consensus |
| Le niveau de qualité exigé dépend de l'usage | 12b | [S4], [S3] | « data quality can be thought of as 'fitness for purpose' » ; « The level of quality required will vary depending on the purpose » (Why do we need a data quality framework?) ; « Timeliness means different things for different uses » (5. Timeliness) | consensus |
| Les six dimensions de DAMA UK, reprises par le gouvernement britannique : exactitude, complétude, unicité, cohérence, fraîcheur, validité | 12b | [S3], [S4] | « data reflects reality » (1. Accuracy) ; « all the data required for a particular use is present » (2. Completeness) ; « Uniqueness measures the number of duplicates » (3. Uniqueness) ; « data values do not conflict with other values » (4. Consistency) ; « available when expected and needed » (5. Timeliness) ; « conforms to the expected format, type, and range » (6. Validity) ; « There are six core data quality dimensions, as defined by DAMA UK » (Data quality dimensions – how to measure your data quality) | école |
| La liste des dimensions est un choix d'école : d'autres listes existent ailleurs | 12b | [S4] | « This is not a prescriptive list and may vary depending upon your data and your users' needs » (Data quality dimensions – how to measure your data quality) | école |
| Un relevé en double relève de l'unicité | 12b | [S3] | « Uniqueness measures the number of duplicates » (3. Uniqueness) | école |
| « Fiable » ou « propre » se traduisent en règles mesurables, une par dimension, au niveau que dit celui qui utilise le chiffre | 12b, Pièges | [S3], [S4] | « conforms to the expected format, type, and range » (6. Validity) ; « The level of quality required will vary depending on the purpose » (Why do we need a data quality framework?) | consensus |
| Une exigence de qualité se range selon sa portée : la DoD si elle vaut pour toute story, un critère si elle est propre à une story, la définition de l'indicateur si elle le concerne | 12b, Pièges, Le test rapide | [S14] | « Think of the definition of done as a special set of acceptance criteria that are added to every user story » ; « conditions of satisfaction are specific to a given product backlog item » (page) | cours |
| Une donnée que la source n'envoie pas est une limite de la source, pas un défaut que la plateforme corrige ; elle s'écrit dans la définition et se montre à ceux qui lisent le chiffre | 12b, Pièges | [S4], [S3] | « Communicate quality to users regularly and clearly to ensure data is used appropriately » (4. Communicate data quality clearly and effectively) ; « all the data required for a particular use is present » (2. Completeness) | cours |
| Donnée personnelle : toute information sur une personne physique identifiée ou identifiable, y compris par un identifiant | 12c | [S6] | « toute information se rapportant à une personne physique identifiée ou identifiable » ; « notamment par référence à un identifiant, tel qu'un nom, un numéro d'identification » (art. 4, 1) | consensus |
| Un identifiant reste une donnée personnelle : une donnée pseudonymisée reste personnelle pour qui peut la rattacher à une personne | 12c, Pièges | [S6], [S7], [S7b] | « notamment par référence à un identifiant, tel qu'un nom, un numéro d'identification » (art. 4, 1) ; « Les données à caractère personnel qui ont fait l'objet d'une pseudonymisation et qui pourraient être attribuées à une personne physique par le recours à des informations supplémentaires devraient être considérées comme des informations concernant une personne physique identifiable » (considérant 26) ; « restent donc des données à caractère personnel » (communiqué) | consensus |
| Le RGPD, texte de loi : les données sont collectées pour des finalités déterminées (limitation des finalités) | 12c | [S6b] | « collectées pour des finalités déterminées, explicites et légitimes, et ne pas être traitées ultérieurement d'une manière incompatible avec ces finalités » (art. 5, 1, b) | consensus |
| Le RGPD, texte de loi : seulement les données nécessaires à ces finalités (minimisation) | 12c | [S6b] | « adéquates, pertinentes et limitées à ce qui est nécessaire au regard des finalités pour lesquelles elles sont traitées (minimisation des données) » (art. 5, 1, c) | consensus |
| Le PO part de la finalité et demande, pour chaque colonne, à quoi elle sert, au détail ou agrégée ; il ne fait pas le droit | 12c, Pièges, Le test rapide | [S6b] | « adéquates, pertinentes et limitées à ce qui est nécessaire au regard des finalités pour lesquelles elles sont traitées (minimisation des données) » (art. 5, 1, c) | cours |
| Celui qui donne l'accès et demande de justifier chaque colonne applique la minimisation | 12c | [S6b] | « adéquates, pertinentes et limitées à ce qui est nécessaire au regard des finalités pour lesquelles elles sont traitées (minimisation des données) » (art. 5, 1, c) | cours |
| Une finalité se dit avant d'utiliser les données ; une nouvelle finalité fait une nouvelle demande | 12c, Pièges | [S6b] | « collectées pour des finalités déterminées, explicites et légitimes, et ne pas être traitées ultérieurement d'une manière incompatible avec ces finalités » (art. 5, 1, b) | cours |
| Le délégué à la protection des données, s'il y en a un, conseille sur la règle de droit | 12c, Pièges | [S12] | « informer et conseiller le responsable du traitement […] ainsi que les employés qui procèdent au traitement » (art. 39, 1, a) ; « contrôler le respect du présent règlement » (art. 39, 1, b) ; « associé, d'une manière appropriée et en temps utile, à toutes les questions relatives à la protection des données » (art. 38, 1) | consensus |

## Références

| Réf. | Source (auteur, titre, date) | Lien | Type | Consultée le |
|---|---|---|---|---|
| S1 | Schwaber, Sutherland, *The Scrum Guide*, novembre 2020 | https://scrumguides.org/scrum-guide.html | primaire | 2026-10-22 ; 2026-10-30 (sections des citations relevées) |
| S2 | Kimball Group, « Grain », *Dimensional Modeling Techniques* (sans auteur ni date) | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/grain/ | primaire (site du groupe de l'auteur, qui vend aussi des formations) | 2026-10-22 |
| S3 | Government Data Quality Hub, « Meet the data quality dimensions », 24 juin 2021, d'après DAMA UK, « The six primary dimensions for data quality assessment », 2013 | https://www.gov.uk/government/news/meet-the-data-quality-dimensions | primaire (reprise officielle des dimensions de DAMA UK) | 2026-10-22 ; 2026-10-30 (sections des citations relevées) |
| S4 | Government Data Quality Hub, *The Government Data Quality Framework*, 3 décembre 2020 | https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework | primaire | 2026-10-22 ; 2026-10-30 (sections des citations relevées) |
| S6 | Règlement (UE) 2016/679 (RGPD), art. 4 (chapitre I), texte reproduit par la CNIL | https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre1 | primaire (texte de loi) | 2026-10-22 |
| S6b | Règlement (UE) 2016/679 (RGPD), art. 5 (chapitre II), texte reproduit par la CNIL | https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre2 | primaire (texte de loi) | 2026-10-22 |
| S7 | RGPD, considérant 26, texte reproduit par la CNIL | https://www.cnil.fr/fr/reglement-europeen-protection-donnees | primaire (texte de loi) | 2026-10-22 |
| S7b | EDPB, communiqué sur ses lignes directrices sur la pseudonymisation | https://www.edpb.europa.eu/news/edpb-adopts-pseudonymisation-guidelines-and-paves-the-way-to-improve-cooperation-with_fr | primaire (autorité européenne) | 2026-10-22 |
| S8 | dbt Labs, « Creating metrics » (documentation du Semantic Layer) | https://docs.getdbt.com/docs/build/metrics-overview | marketing (documentation d'un éditeur : un exemple de pratique, pas une norme) | 2026-10-22 |
| S9 | Klipfolio, « What is a metric? » (glossaire) | https://www.klipfolio.com/glossary/metric | marketing | 2026-10-22 |
| S11 | Scrum Alliance, *CSPO Learning Objectives*, janvier 2022 (mis en forme 2/2024) | https://www.scrumalliance.org/media/certifications/los/cspo_learning_objectives_2022.pdf | primaire (et marketing pour la certification) | 2026-10-22 |
| S11b | Scrum.org, Professional Scrum Product Owner I (domaines de l'évaluation) | https://www.scrum.org/assessments/professional-scrum-product-owner-i-certification | primaire (et marketing pour la certification) | 2026-10-22 |
| S12 | RGPD, art. 37 à 39 (chapitre IV), texte reproduit par la CNIL | https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre4 | primaire (texte de loi) | 2026-10-22 |
| S14 | Mountain Goat Software (Cohn), « Relationship between Definition of Done and Conditions of Satisfaction », mise à jour du 24 juin 2024 (sans signature ; site et voix de Cohn) | https://www.mountaingoatsoftware.com/blog/clarifying-the-relationship-between-definition-of-done-and-conditions-of-sa | primaire (site de l'auteur, qui vend aussi ses formations) | 2026-10-22 |

## Non vérifié

- 12a1, Consensus et choix d'école : aucune source établie (norme, texte de consensus) ne fixe
  la liste « règle de calcul, grain, période, source, fraîcheur ». Elle recoupe la pratique
  (dbt [S8], Klipfolio [S9], tous deux marketing ; le grain chez Kimball [S2]) : la présenter
  comme le choix du cours, sans « on s'accorde à dire ».
- 12c, Pièges, Consensus et choix d'école : selon des commentaires de cabinets (Inside Privacy,
  https://www.insideprivacy.com/eu-data-protection/eu-court-of-justice-clarifies-the-concept-of-personal-data-in-the-context-of-a-transfer-of-pseudonymized-data-to-third-parties,
  et Skadden, consultés le 2026-10-22), la Cour de justice a jugé le 4 septembre 2025 (CEPD c/
  CRU, C-413/23 P) qu'une donnée pseudonymisée n'est pas une donnée personnelle pour tout
  destinataire : seulement pour celui qui peut raisonnablement réidentifier la personne.
  L'arrêt n'a pas été lu, et aucune citation des commentaires n'a été relevée. Sans effet sur
  l'exemple : la plateforme appartient à l'opérateur, qui détient le fichier des abonnés. Le
  fichier du concept dit « une donnée pseudonymisée reste personnelle pour qui peut la
  rattacher à une personne », pas « toujours et pour tous ».
- 12a1, 12b, Consensus et choix d'école : « fraîcheur » pour timeliness est une traduction du
  cours ; DAMA UK définit timeliness comme une donnée disponible quand on l'attend, pas comme un
  âge maximal. Sens voisin ; ne pas attribuer à DAMA UK la formulation « âge des données ».
- 12b, Consensus et choix d'école : le livre blanc d'origine de DAMA UK n'a pas été relu, seule
  sa reprise par le gouvernement britannique [S3], [S4] ; le DMBOK 2, payant, n'a pas été
  consulté. La fiche ne date pas ces listes et ne cite pas de nombre pour le DMBOK 2.
- 12b, Consensus et choix d'école : que d'autres listes de dimensions soient « parfois bien plus
  longues », et que toutes passent par des dimensions, vient du recensement de DAMA NL
  (*Dimensions of Data Quality*, version 1.2, 3 septembre 2020,
  https://www.dama-nl.org/wp-content/uploads/2020/09/DDQ-Dimensions-of-Data-Quality-Research-Paper-version-1.2-d.d.-3-Sept-2020.pdf),
  lu au cadrage, sans citation relevée.
- 12c : l'obligation de désigner un délégué à la protection des données (art. 37) n'est pas
  vérifiée pour un opérateur de ce type ; ne pas l'affirmer.
