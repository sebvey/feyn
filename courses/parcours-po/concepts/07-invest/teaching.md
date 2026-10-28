## Consignes

1. **7a les six lettres et le mot flou**, en deux messages, chacun avec sa question :
   - **7a1** Les six lettres (« La story d'Abba, lettre par lettre ») : une ligne par lettre,
     puis la story d'Abba jugée avec elles. INVEST est un aide-mémoire de Wake, pas une règle
     de Scrum. E et S se jugent avec les Developers. Pour S, dire lequel est lequel : quelques
     semaines-personnes (Wake), quelques jours-personnes (certaines équipes), un sprint (repère
     du cours, concept 4). En rechange, ou si l'apprenant donne S en jours : « Huit jours, trop gros ? ».
     Pour V, Wake dit « le client » ; « l'utilisateur » est la lecture du cours. L'Agile Alliance
     glose ce V par « valuable (or vertical) » : le découpage vertical vient au concept 9.
   - **7a2** Le mot flou (« Heures de pointe ») : quand E, S et T restent douteux ensemble, un
     même mot n'est pas fixé ; on ne coche pas « OK », on cherche ce mot. Ni le PO ni les
     Developers ne le fixent : le PO le fait préciser par l'utilisateur concerné avant le sprint
     (concept 15), et la story attend. Mots flous typiques (exemples inventés) : « rapidement »,
     « récent », « important ». Un seul mot flou peut faire douter des trois lettres. Pour le
     repérer : un testeur qui ne connaît que la story peut-il dire « fait » ou « pas fait » sans
     rien demander ? Le mot qui l'oblige à poser une question est le mot flou.
2. **7b N : besoin ou solution, une contrainte va dans un critère** : la story fixe le besoin ;
   les détails de la solution (la forme, l'outil) se construisent avec l'équipe, jusque pendant la
   réalisation. Négociable ne veut pas dire tout ouvert : une contrainte réelle ne se négocie
   pas, et elle s'écrit dans un critère d'acceptation, sans nommer de solution. L'écriture des
   critères vient au concept 8. Exemple éprouvé : « Le SMS d'Abba ». Si la réponse est juste
   du premier coup : « Le canal dans le critère ». Une contrainte est une exigence réelle de
   l'usage ; elle n'est pas une solution, car plusieurs solutions peuvent la respecter. Exemple
   inventé : un régulateur consulte une vue depuis sa camionnette, sur un petit écran. « Se lire sur
   un petit écran » est une contrainte, qui va dans un critère ; un tableau, une liste ou une carte
   sont des solutions, que l'équipe peut proposer.

## Faits du fil rouge utilisés

La story d'Abba et ses règles fixées (vélo disponible,
station favorite, moins de 15 minutes) ; un tiers des abonnés n'a qu'un téléphone basique, sans
l'appli ; le canal (SMS, serveur vocal, appli) dépend de l'équipe appli, dont Pia est la PO ;
ni les heures de pointe ni ce qu'est une station vide (vélos à quai ou disponibles) ne sont
définis ; la vue des stations vides doit servir à Étienne à envoyer les régulateurs plus tôt. La
story d'Étienne en 7a2, l'estimation et les propos de Diego en 7a1, les propos d'Anna et de Dana,
et le brouillon « recevoir un SMS à 8 h » en 7b sont des propositions d'exercice : ils ne
deviennent pas des faits du fil rouge.

## Banque d'exemples

### La story d'Abba, lettre par lettre (7a1)
- **Explication** : INVEST, grille de Bill Wake (2003, XP), six lettres : I (ne dépend pas
  d'une autre story ni du travail d'une autre équipe, autant que possible), N (le besoin, pas les détails de la solution), V (de
  la valeur pour l'utilisateur), E (les Developers peuvent l'estimer assez pour l'ordonner), S
  (petite : chez Wake, au plus quelques semaines-personnes ; repère du cours : elle tient dans
  un sprint, concept 4), T (on saurait écrire un test qui dit si elle est faite).
  C'est un aide-mémoire, absent du Scrum Guide.
- **Situation** : « En tant qu'abonné, je veux savoir avant de partir s'il reste un vélo à ma
  station, afin de ne pas me déplacer pour rien. » Règles fixées : un vélo disponible est à
  quai et louable ; la station est la favorite de l'abonné ; données à jour de moins de
  15 minutes. La disponibilité vient de la plateforme ; la livrer à Abba par un canal dépend de
  l'équipe appli.
- **Question** : juge cette story lettre par lettre : laquelle pose question, et pourquoi ?
- **Réponse attendue** : I. La story dépend de l'équipe appli pour le canal : elle ne sert pas
  Abba tant que ce canal n'existe pas. Wake reconnaît qu'on n'y arrive pas toujours ; on écrit
  la dépendance, et son traitement vient au concept 10. Les autres tiennent : N (aucun canal
  nommé), V (Abba évite un déplacement pour rien), T (les règles fixées permettent de trancher),
  E et S (rien de flou n'empêche d'estimer). Nuance : E et S, le PO ne les coche pas seul ; ce
  sont les Developers qui estiment, et ils diront si elle tient dans un sprint.
- **Erreurs fréquentes** :
  - tout cocher « OK » d'un coup : relancer, lettre par lettre : « qu'est-ce qui te permet de
    le dire ? » ; sinon : « qui livre l'information à Abba ? » ;
  - voir dans la dépendance une raison de rejeter la story : I se tient « autant que possible »,
    la dépendance s'écrit et se traite (concept 10) ;
  - donner S en jours (« quelques jours, donc OK ») : le repère est le sprint (7a1, « Huit jours,
    trop gros ? »).
- **Ce qui marche** : faire suivre le chemin de l'information jusqu'à Abba : la plateforme
  calcule, puis un canal qu'elle ne fait pas.

### Huit jours, trop gros ? (7a1)
- **Explication** : S chez Wake : une story représente au plus quelques semaines-personnes de
  travail ; certaines équipes visent quelques jours-personnes, Wake le signale lui-même. Le
  repère du cours : une story tient dans un sprint (concept 4) ; les Developers en estiment la
  taille.
- **Situation** : l'équipe vélos (Dana, Diego, Anna) travaille en sprints de deux semaines. Pour
  une story, Diego estime environ huit jours de travail d'une personne. Il dit : « INVEST dit
  qu'une story, c'est quelques jours. Huit, c'est trop gros, il faut la couper. »
- **Question** : qu'est-ce qui est juste, et qu'est-ce qui ne l'est pas, dans la phrase de
  Diego ?
- **Réponse attendue** : juste : l'estimation est la sienne, il est l'un des Developers (nuance
  à apporter : des stories plus petites s'estiment souvent mieux, chez Wake). Faux : INVEST ne dit pas « quelques
  jours ». Chez Wake, une story fait au plus quelques semaines-personnes ; « quelques
  jours-personnes » est le choix de certaines équipes. Le repère du cours est le sprint : la
  question à poser est « tient-elle dans le sprint ? », et ce sont les Developers (Dana, Diego,
  Anna) qui y répondent. Nuance : une équipe qui s'est donné la règle des quelques jours la suit,
  c'est sa règle, pas celle d'INVEST. Couper une story qui ne tient pas dans un sprint :
  concept 9.
- **Erreurs fréquentes** :
  - donner raison à Diego parce que « une story, c'est quelques jours » : confondre une pratique
    d'équipe avec la grille ; relancer : « d'où vient “quelques jours” ? » ;
  - trancher soi-même « huit jours, ça tient » : la taille est l'estimation des Developers ; le
    PO corrige la référence à INVEST, pas l'estimation ; relancer : « qui dit combien de temps
    prendra cette story ? ».
- **Ce qui marche** : poser les trois repères côte à côte : quelques semaines-personnes (Wake),
  quelques jours-personnes (certaines équipes), un sprint (le cours, concept 4), et demander
  « d'où vient “quelques jours” ? ».

### Heures de pointe (7a2)
- **Explication** : quand plusieurs lettres restent douteuses ensemble, elles dépendent souvent
  d'un même mot non fixé. Wake lie E à la compréhension (on estime mal ce qu'on ne comprend
  pas), S au périmètre connu, T à la clarté (si on ne sait pas tester, la story n'est pas assez
  claire). Cocher « OK » ne règle rien : on cherche le mot, on le fait préciser.
- **Situation** : brouillon d'exercice : « En tant que responsable d'exploitation, je veux voir,
  au point du matin, les stations du centre-ville restées vides aux heures de pointe la
  veille, afin d'envoyer les régulateurs plus tôt vers les stations qui se vident. »
  Anna coche E et S « OK ». Les heures de pointe ne sont définies nulle part.
- **Question** : que réponds-tu à Anna ?
- **Réponse attendue** : « heures de pointe ». Tant qu'il n'est pas fixé, E est douteux (une
  plage fixe, ou une plage par jour de la semaine, ne demandent pas le même calcul), S aussi
  (selon la définition, la story tient ou non dans un sprint), et T (un testeur ne sait pas si
  une station vide à 9 h 30 compte). Ni Anna ni le PO ne le fixent : le PO le fait préciser par
  Étienne, qui utilisera la vue, avant le sprint (concept 15) ; la story attend. Nuances :
  « vide » (vélos à quai ou disponibles) n'est pas fixé non plus ; l'apprenant qui le relève a
  raison, même traitement. « Heures de pointe » sert aussi à la mesure de l'objectif produit :
  la définition précisée avec Étienne doit valoir pour cette mesure, que portent les parties
  prenantes de l'objectif (Odile) ; le PO ne laisse pas coexister deux définitions.
- **Erreurs fréquentes** :
  - donner raison à Anna (« E et S tiennent ») : relancer : « une station vide à 9 h 30, tu la
    comptes ? » ;
  - proposer soi-même une plage (« 7 h à 9 h et 17 h à 19 h ») pour débloquer : c'est la décision
    de l'utilisateur, le PO la fait prendre, il ne l'invente pas ; relancer : « qui peut dire ce
    que sont les heures de pointe pour cette vue ? » ;
  - laisser les Developers choisir la plage « pour avancer » : ils estiment, ils ne fixent pas le
    besoin ; relancer : « qui peut dire ce que sont les heures de pointe pour cette vue ? ».
- **Ce qui marche** : demander à l'apprenant de jouer le testeur : « une station vide à 9 h 30,
  tu la comptes ? ». Puis relier les trois lettres E, S, T au même mot. Relance si
  l'apprenant trouve le mot sans dire qui le fixe : « qui peut dire ce que sont les heures de
  pointe pour cette vue ? » ; s'il ne relie pas le mot aux lettres : « lesquelles de E, S, T
  peux-tu vérifier sans lui ? ».

### Le SMS d'Abba (7b)
- **Explication** : N (Negotiable) : la story n'est pas un contrat de fonctions ; elle porte
  l'essentiel, pas les détails. La solution se construit avec l'équipe, jusque pendant la
  réalisation (Wake). Négociable ne veut pas dire tout ouvert : une contrainte, exigence réelle
  de l'usage, ne se négocie pas ; plusieurs solutions peuvent la respecter (choix du cours). Cas
  inventé : un régulateur consulte une vue sur le petit écran de sa camionnette ; « se lire sur
  un petit écran » est une contrainte, un tableau, une liste ou une carte sont des solutions.
- **Situation** :
  - brouillon : « En tant qu'abonné, je veux recevoir un SMS à 8 h avec le nombre de vélos de ma
    station… » (la solution est figée dans la story) ;
  - négociable : « En tant qu'abonné, je veux savoir avant de partir s'il reste un vélo à ma
    station, afin de ne pas me déplacer pour rien. » (SMS, serveur vocal, appli : le canal se
    discute avec l'équipe appli.)
- **Question**, en deux parties : « On t'apprend qu'un tiers des abonnés n'a pas l'appli,
  seulement un téléphone basique. Qu'est-ce qui devient non négociable ? », puis « Où
  écris-tu cette contrainte ? »
- **Réponse attendue** :
  1. Non négociable : le SMS reste une solution, donc négociable (un serveur vocal servirait
     aussi). Ce qui ne se négocie pas, c'est la contrainte : l'abonné sans l'appli, avec un
     téléphone basique, doit pouvoir savoir.
  2. Où l'écrire : dans un critère d'acceptation, sans nommer de canal (par exemple : Abba, qui
     n'a qu'un téléphone basique sans l'appli, obtient avant de partir le nombre de vélos
     disponibles à sa station). Sa forme vient au concept 8. Nuance : la phrase de la story ne
     change pas.
- **Erreurs fréquentes** :
  - Partie 1, « le SMS devient obligatoire » : il répond à la contrainte, il n'est pas la
    contrainte ; demander « un serveur vocal la respecterait-il ? » ;
  - Partie 2, ajouter la contrainte dans le « je veux » (« … depuis un téléphone basique ») : la
    phrase reste le besoin, la contrainte va dans un critère ;
  - Partie 2, ne pas savoir où écrire la contrainte : c'est le lien à faire travailler.
    Relancer : « où un testeur la lira-t-il ? ».
- **Ce qui marche** : demander « qu'est-ce qui devient non négociable ? » plutôt que « le SMS
  devient-il obligatoire ? », qui oriente vers une mauvaise réponse.

### Le canal dans le critère (7b)
- **Explication** : le critère d'acceptation dit quand la story est faite ; s'il nomme une
  solution, il la fige, comme la phrase l'aurait fait.
- **Situation** : Dana propose ce critère pour la story d'Abba : « Abba reçoit un SMS avec le
  nombre de vélos disponibles à sa station. »
- **Question** : corrige ce critère.
- **Réponse attendue** : il fige le SMS et perd la contrainte. Corrigé : le critère ne nomme
  pas de canal et garde la contrainte (Abba n'a qu'un téléphone basique, sans l'appli). Sa
  rédaction complète vient au concept 8. Nuance : le canal se choisit dans la conversation avec
  l'équipe appli.
- **Erreurs fréquentes** :
  - garder le SMS « puisque c'est ce qu'on fera » : ce choix revient à la conversation avec
    l'équipe appli, le critère ne le fige pas ; relancer : « si l'équipe appli choisit un
    serveur vocal, ton critère passe-t-il ? » ;
  - corriger le canal mais oublier la contrainte (téléphone basique, sans l'appli) : le critère
    ne protège plus les abonnés concernés ; relancer : « si l'équipe appli ne livre que dans
    l'appli, ton critère passe-t-il ? ».
- **Ce qui marche** : « si l'équipe appli choisit un serveur vocal, ton critère passe-t-il ? ».

## Schéma

Six cases alignées, une par lettre (I, N, V, E, S, T), au-dessus d'une phrase de story inventée pour l'illustration (« … je veux une vue qui s'affiche
rapidement … »). Le mot « rapidement » est surligné dans la phrase ; trois fils partent de lui
vers les cases E, S et T, en rouge, comme trois branches sur une même racine ; I, N, V en vert.
Deuxième état, à droite : « rapidement » précisé par l'utilisateur concerné, avant le sprint ;
alors seulement les trois cases passent au vert. Légende : « plusieurs
lettres en rouge : cherche le mot dont elles dépendent ».
