Le Scrum Guide 2020 [S1] ne parle pas de user story : ce que le concept en dit ne relève donc
pas du Scrum Guide. Le format « en tant que / je veux / afin de » est un choix d'école devenu
courant (Connextra, Rachel Davies, popularisé par Cohn) ; les 3C sont une pratique établie
attribuée à Ron Jeffries (XP). Les faits du fil rouge (Maud, signalements de pannes, nombre de
techniciens en tournée, F12) sont inventés : ils n'ont pas de source. Les sections entre
parenthèses sont celles du modèle de fichier de concept.

## Affirmations

| Affirmation (section de `concept.md` ou de `teaching.md`) | Source | Ce qui a été vérifié | Nature |
|---|---|---|---|
| Le Scrum Guide ne parle pas de user story (Consensus et choix d'école) | [S1] | Texte web du guide téléchargé et cherché le 2026-10-22 : « story », « stories », « user story » : 0 occurrence | consensus |
| Le Scrum Guide n'impose aucun format aux éléments du backlog : il cite seulement des attributs (Consensus et choix d'école) | [S1] | Refinement : « adding details, such as a description, order, and size. Attributes often vary with the domain of work ». Les éléments du backlog et le PO qui les crée sont enseignés aux concepts 0, 1 et 3 | consensus |
| La user story vient d'Extreme Programming (XP), où Kent Beck a introduit le terme (Consensus et choix d'école) | [S4], [S5] | Fowler : « Kent Beck first introduced the term as part of Extreme Programming ». Wikipédia date l'introduction de 1997 (projet C3 de Chrysler) et le livre de Beck, *Extreme Programming Explained*, de 1999 ; dates non vérifiées à une source primaire (voir « Non vérifié ») | consensus |
| Une story exprime un besoin vu de l'utilisateur, pas une spécification (L'essentiel) | [S4], [S5] | Fowler : « a more informal and conversational style of requirements elicitation » (glose de la source, absente de la fiche) ; Wikipédia : « an informal, natural language description of features of a software system », écrite du point de vue de l'utilisateur final |  |
| Le format « en tant que / je veux / afin de » vient de Rachel Davies, chez Connextra (Londres), au début des années 2000 (Consensus et choix d'école) | [S2], [S5], [S6] | Cohn : « originated with agile coach Rachel Davies at a UK company, Connextra, in the early 2000s ». Wikipédia : équipe XP de Connextra à Londres, 2001. Scrum Alliance (Schiel) : modèle de Rachel Davies, 2002, sans nommer Connextra. Dates discordantes : écrire « au début des années 2000 » (cadrage T-018a §2.4) | école |
| Ce format est un choix d'école devenu courant, pas une obligation (Consensus et choix d'école) | [S2], [S4], [S6] | Cohn : « the most popular way of writing user stories », « a recognized standard », mais « There is no magic formula » et il ne le juge pas « mandatory ». Fowler : « A common way to formulate stories is ». Schiel : « there is NO REQUIRED STRUCTURE » | école |
| Les trois parties : qui (le rôle), quoi (ce qu'il veut faire), pourquoi (la raison) (L'essentiel, 5a) | [S2], [S6] | Cohn détaille qui, quoi, pourquoi ; Schiel : « Who is the user? », « What do they want to do? », « Why do they want to do it? » | école |
| Le « afin de » aide le PO à ordonner (L'essentiel, 5b) | [S2] | Cohn : « The structure of good user stories actually helps the product owner prioritize » ; la raison rend visibles le bénéficiaire et la valeur. Comment ordonner reste au concept 13 | école |
| Le « afin de » laisse l'équipe choisir la solution qui sert le même but, parfois plus simple (L'essentiel, 5b, Pièges) | [S2] | Cohn : connaître la raison « helps the team decide how best to implement the functionality » (exemple du correcteur orthographique). « Plus simple » est un choix du cours, pas une citation. Que les Developers décident du comment est au concept 1 (sources 01) | école |
| Les 3C : Card, Conversation, Confirmation, de Ron Jeffries, 2001 (Consensus et choix d'école, 5a) | [S3] | Jeffries, « Essential XP: Card, Conversation, Confirmation », 30 août 2001. Pratique établie attribuée à Jeffries, reprise par Scrum Alliance [S6] ; pas du Scrum Guide | consensus |
| Carte : la phrase écrite, qui représente le besoin et ne le contient pas en entier (5a) | [S3] | « The card is a token representing the requirement » ; « The card does not contain all the information that makes up the requirement » | consensus |
| Conversation : les échanges qui précisent la story (5a) | [S3], [S6] | Jeffries : « The requirement itself is communicated from customer to programmers through conversation » ; Schiel : « a placeholder for a conversation about the work to be done » | consensus |
| Confirmation : ce qui permet de vérifier que la story est faite (les critères d'acceptation, concept 8) (5a) | [S3] | Jeffries : « This component is the acceptance test » : des exemples, de préférence automatisés, définis par le client. Rapprocher la confirmation des critères d'acceptation est la lecture courante et celle du cours ; Jeffries dit « acceptance test » | école |
| La phrase seule ne suffit pas (L'essentiel, 5a) | [S3] | Conséquence de « The card does not contain all the information that makes up the requirement » | cours |
| Une story, un seul « je veux » ; plusieurs, ce n'est plus une story (feature ou epic, concept 4 ; un parcours, concept 16) (5a, banque « Une semaine de Maud », Pièges) | aucune ici | Renvoi au concept 4 (4b : un « je veux », story ; plusieurs, feature ; plusieurs groupes, epic), dont le test « compter les “je veux” » vient des sessions du cours (amélioration de session (`off-course.md`, historique git) ; observation d'une session, un apprenant, [c4] : le test « je sais ce que voit l'utilisateur » ne parlait pas, compter les « je veux » a marché) ; choix du cours | cours |
| Cohn recommande le modèle tout en disant qu'il n'est pas obligatoire (Consensus et choix d'école) | [S2] | Article consacré à expliquer pourquoi le modèle « works so well » ; « There is no magic formula », modèle non « mandatory » | école |
| La carte reste courte ; le détail va dans la conversation et la confirmation (banque « La carte suffit-elle ? ») | [S3] | Découle de la carte comme « token representing the requirement » ; la formulation est celle du cours | cours |
| Demander « pourquoi ? » plusieurs fois de suite fait remonter d'une demande au besoin qui la fonde (5b) | [S7] en partie | Technique des « cinq pourquoi », attribuée par des sources secondaires à Taiichi Ohno (Toyota), conçue pour remonter à la cause d'un problème. L'appliquer au « afin de » d'une story est un choix du cours. Le nombre varie : « The number of whys may be higher or lower depending on the complexity of the analysis and problem » (mention « citation needed », relu le 2026-10-22). Si le fichier du concept nomme la technique, l'attribuer à Toyota sans date ni citation (voir « Non vérifié ») | cours |
| Un « afin de » circulaire (qui répète le « je veux ») ou de confort n'aide ni à ordonner ni à choisir une solution (Pièges) | [S2] en partie | Découle du rôle que Cohn donne à la raison (ordonner, choisir comment faire) ; les deux formes de « afin de » faible viennent des sessions du cours (observation d'une session, un apprenant, [c5] : « afin de » faible ou circulaire ; base faible) | cours |
| Test rapide : la personne qui a fait la demande reconnaît-elle, dans le seul « afin de », une décision qu'elle prend ou un gain qu'elle attend ? (Le test rapide) | aucune | Choix du cours, sans source | cours |
| S'arrêter de demander « pourquoi ? » à une décision que l'utilisateur prend ou un gain qu'il reconnaît ; au-delà, la raison devient l'objectif produit ou un enjeu général commun à beaucoup de stories, qui n'aide plus à ordonner (5b, banque « Remonter de la demande à la décision », « Un “afin de” trop haut », Pièges) | aucune | Choix du cours, sans source ; « n'aide plus à ordonner » découle du rôle que Cohn donne à la raison [S2] | cours |
| Exemples du fil rouge en 5a et 5b : Régis (savoir quelles stations vont se vider, pour y aller avant) ; Abba (savoir avant de partir s'il reste un vélo à sa station ; sa station est la favorite ; fraîcheur visée de moins de 15 minutes) ; Étienne (la vue des stations vides sert à envoyer les régulateurs plus tôt) (Consignes) | fil rouge | Faits fixés du fil rouge (acteurs, règles fixées, vue des stations vides) ; l'analyse en qui/quoi/pourquoi et en point d'arrêt est l'application du cours, sans source externe. « La carte n'est pas à allonger » : voir la ligne « La carte reste courte » (5a) |  |
| Le PO n'invente pas le « afin de » : il le demande à l'utilisateur (5b, Pièges) | aucune | Choix du cours, cohérent avec le concept 1 (le PO demande la valeur à l'utilisateur, il ne l'invente pas) et avec la conversation des 3C [S3] | cours |
| Une story exprime un besoin, pas le parcours entier de l'utilisateur ; le concept 16 range les stories sous les étapes du parcours (la story map) (Pièges, L'essentiel) | [S9] | Patton : la story map organise les stories sous les étapes du parcours de l'utilisateur (sources 02 [S17]). Que l'erreur soit fréquente vient du profil de départ d'un apprenant observé en session (il voyait la story comme « la description du parcours de l'utilisateur » ; un apprenant : base faible), sans source externe |  |
| Pas de solution dans le « je veux » (Pièges) | [S2] en partie | Cohn : la raison laisse l'équipe choisir comment faire ; « sans solution » est la ligne du plan du cours. Le fichier du concept renvoie au concept 7 (besoin ou solution, critère N d'INVEST) sans nommer INVEST, introduit au concept 7 | cours |
| Acteur technique : l'acteur est celui qui agit et y gagne ; renvoi au concept 6 (Pièges) | aucune ici | Renvoi au concept 6, qui en porte la source. Cohn propose d'autres formats quand un système a peu d'utilisateurs visibles [S2]. Attention : au concept 1, les consommateurs de données sont des utilisateurs (sources 01, Dehghani) ; la fiche dit qu'un data engineer qui consomme la plateforme peut être un utilisateur (Pièges) | cours |
| Un chiffre précis va dans les critères d'acceptation, pas dans la phrase ; renvoi au concept 8 (Pièges) | aucune ici | Pratique du cours ; le concept 8 en porte la source | cours |
| Contradiction interne dans la phrase (Pièges) | aucune | Exemple du cours, sans source |  |

## Références

| Réf. | Source (auteur, titre, date) | Lien | Type | Consultée le |
|---|---|---|---|---|
| S1 | Schwaber, Sutherland, *The Scrum Guide*, novembre 2020 | https://scrumguides.org/scrum-guide.html | primaire | 2026-10-22 |
| S2 | Cohn, « Why the Three-Part User Story Template Works So Well », Mountain Goat Software (date de publication non affichée ; mise à jour du 22 avril 2026) | https://www.mountaingoatsoftware.com/agile/why-the-three-part-user-story-template-works-so-well | primaire (site de l'auteur, qui vend aussi ses formations) | 2026-10-22 |
| S3 | Jeffries, « Essential XP: Card, Conversation, Confirmation », 30 août 2001 | https://ronjeffries.com/xprog/articles/expcardconversationconfirmation/ | primaire | 2026-10-22 |
| S4 | Fowler, « User Story », bliki, 22 avril 2013 | https://martinfowler.com/bliki/UserStory.html | secondaire | 2026-10-22 |
| S5 | Wikipédia, « User story » | https://en.wikipedia.org/wiki/User_story | secondaire | 2026-10-22 |
| S6 | Schiel, « The Anatomy of a User Story », Scrum Alliance (date non affichée) | https://resources.scrumalliance.org/Article/anatomy-user-story | secondaire (Scrum Alliance vend des certifications) | 2026-10-22 |
| S7 | Wikipédia, « Five whys » | https://en.wikipedia.org/wiki/Five_whys | secondaire | 2026-10-22 |
| S9 | Patton, « Story Map Concepts » | https://www.jpattonassociates.com/wp-content/uploads/2015/03/story_mapping.pdf | primaire | 2026-10-22 (cadrage T-018a, non relu ici) |

## Non vérifié

- **Date de Connextra** : 2001 (Wikipédia), 2002 (Schiel, Scrum Alliance), « early 2000s »
  (Cohn). Aucune source primaire de Rachel Davies ou de Connextra consultée. Écrire « au début
  des années 2000 », sans année.
- **Libellé exact du modèle d'origine** : Cohn écrit « As a …, I … so that … », Schiel « As a
  `<role>`, I want `<action>`, so that `<value>` », Wikipédia « As a `<role>` I can `<capability>`, so that
  `<receive benefit>` ». Le cours emploie la forme française courante « en tant que / je veux /
  afin de » sans la donner comme la carte d'origine.
- **Kent Beck, 1997, projet C3, et *Extreme Programming Explained* (1999)** : rapportés par
  Wikipédia seulement ; le livre n'a pas été consulté. Le fichier du concept peut dire que la
  story vient d'XP (Fowler) sans année.
- **« A user story is a promise for a conversation » (Alistair Cockburn, 1998)** : rapporté par
  Wikipédia, non retrouvé chez Fowler ; ne pas citer ni attribuer.
- **Rachel Davies, « inventrice » de la user story** : Wikipédia dit que Cohn la nomme ainsi et
  qu'elle en crédite toute l'équipe (mention « citation needed ») ; Cohn [S2] ne lui attribue que
  le modèle. Ne lui attribuer que le modèle.
- **Les cinq pourquoi** : origine (Ohno ou Sakichi Toyoda, Toyota) rapportée par des sources
  secondaires discordantes, sans texte de Toyota ni d'Ohno consulté. La fiche écrit « venus de
  Toyota », sans date, auteur ni citation.
- **Cohn, *User Stories Applied* (2004)** : livre non lu ; rien du fichier
  du concept ne doit s'y appuyer.
