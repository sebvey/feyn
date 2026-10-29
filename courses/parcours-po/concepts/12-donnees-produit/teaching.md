## Consignes

1. **12a définir un indicateur** : ce qu'il compte et sa règle de calcul (ce qu'on inclut, ce
   qu'on exclut), son grain, sa période, sa source, sa fraîcheur. La définition vaut pour
   l'indicateur partout où il est publié ; un critère d'acceptation est propre à une story
   (concept 8). Le PO fait fixer les règles qui manquent, il ne les tranche pas (renvoi 8a2).
   Se déroule en deux messages :
   - **12a1** le contenu d'une définition (« Compléter la définition des vélos disponibles »,
     corrigé tiré des règles fixées) ;
   - **12a2** ce qui manque et qui le fixe (« Les locations par quartier de Charlotte »). En
     rechange : « La mesure de résultat est aussi un indicateur » (sans réenseigner 2c).
2. **12b qualité des données** : une exigence de qualité s'écrit en règle mesurable sur une
   dimension ; elle va dans la DoD si elle vaut pour toute story (le test des relevés en double,
   concept 11a), dans un critère si elle est propre à une story, dans la définition de
   l'indicateur si elle le concerne (par exemple sa fraîcheur). Une limite de la source n'est
   pas un défaut que la plateforme corrige : elle s'écrit et se montre. Un relevé en double
   relève de l'unicité : on le mesure par un taux de relevés en double. Exemple principal :
   « Les signalements par téléphone ». En rechange, ou pour « exercice » : « Des chiffres
   fiables, dit Charlotte ».
3. **12c accès et données personnelles** : demander les colonnes nécessaires à une finalité
   dite, au détail ou agrégées selon l'usage ; un identifiant qui permet de retrouver
   une personne est une donnée personnelle. Le PO ne fait pas le droit : il sait quoi demander et pourquoi. Exemple
   principal : « Quelles colonnes demander à Sid ? ». En rechange, ou si l'apprenant juge
   un identifiant inoffensif : « Prenons toute la table ».

## Faits du fil rouge utilisés

Règles fixées (un vélo disponible est un vélo à quai et
louable ; fraîcheur visée : moins de 15 minutes) ; relevés des stations (vélos à quai par
station et, pour chacun, s'il est louable ; la plateforme se rafraîchit toutes les 5 minutes ;
relevés en double) ; un vélo signalé en panne reste louable ; DoD de l'équipe vélos (heure de
la dernière mise à jour sur chaque vue d'Étienne ; chaque indicateur publié a sa définition
écrite ; test des relevés en double, concept 11a) ; table des locations (vélo, identifiant de
l'abonné, stations de départ et d'arrivée, heures ; accès demandé à Sid, pas obtenu ; la DSI
demande de justifier chaque colonne) ; référentiel des quartiers (quartier de chaque station,
tenu par la collectivité) ; Charlotte veut le nombre de locations par quartier sur le mois, puis
la comparaison au même mois de l'an dernier ; signalements de pannes saisis dans l'appli
(équipe appli), ceux reçus par téléphone non saisis ; Maud fixe chaque semaine le nombre de
techniciens en tournée ; la mesure de résultat de l'objectif produit. Non fixés, et qu'aucun
exemple ne fixe : compter ou non les locations très courtes ; quartier de la station de départ
ou d'arrivée ; station vide, heures de pointe, cible et calcul de la mesure de résultat ; seuil
« presque vide ». Les brouillons de définition, les répliques des Developers et de Charlotte, et
les règles de qualité proposées, l'indicateur des vélos signalés par semaine que regarde Maud
(banque 12b) sont des propositions d'exercice : elles ne deviennent pas des
faits du fil rouge. Le prof ne demande jamais à l'apprenant de fixer une règle.

## Banque d'exemples

### Compléter la définition des vélos disponibles (12a1)
- **Explication** : un indicateur (valeur calculée par le produit pour ses utilisateurs) se lit
  d'une seule façon quand sa définition écrite dit : ce qu'il compte et sa règle de calcul (ce
  qu'on inclut, ce qu'on exclut), son grain (ce que représente une valeur : par station, par
  quartier), sa période (l'instant ou la durée sur laquelle on compte), sa source (le système
  qui produit les données, avec son propriétaire), sa fraîcheur (l'âge maximal des données quand
  on lit le chiffre). Liste : choix du cours ; le grain vient de Kimball. La DoD de l'équipe
  vélos exige aussi une définition écrite pour chaque indicateur publié (la DoD : concept 11a) :
  le PO la fait écrire et fixer, les Developers font le calcul.
- **Situation** : les vues d'Étienne et la story d'Abba affichent les vélos disponibles de
  chaque station. Anna, analyste, écrit : « Vélos disponibles : nombre de vélos de chaque
  station, d'après les relevés. » Les relevés des stations viennent du système des bornes, dont
  la DSI donne l'accès.
- **Question** : complète cette définition pour que deux analystes qui la lisent calculent le
  même nombre.
- **Réponse attendue** : ce qui est juste : le grain (par station) ; la source à moitié (les
  relevés, sans leur propriétaire : le système des bornes, via la DSI). À compléter : la règle de calcul, « vélos » seul laisse compter les vélos à quai ;
  la règle fixée dit : un vélo à quai et louable. La période : au dernier relevé (un état à un
  instant, pas un cumul sur la journée). La fraîcheur : moins de 15 minutes, la règle fixée. Les
  deux ne se confondent pas : la période dit à quel moment le nombre est vrai, la fraîcheur de
  combien ce moment peut dater quand on lit le chiffre. Corrigé : « Vélos disponibles : nombre
  de vélos à quai et louables, par station, au dernier relevé, d'après les relevés des stations
  (système des bornes, via la DSI), à jour de moins de 15 minutes. » Nuances, non attendues : les relevés en double relèvent de la
  qualité (12b) et de la DoD, pas de la définition ; la définition cite les règles fixées, elle
  ne les invente pas.
- **Erreurs fréquentes** :
  - écrire comment calculer (requête, jointure) : c'est le comment des Developers ; la
    définition dit ce qu'on compte, sur quoi, quand ; réexpliquer ;
  - exclure les vélos signalés en panne « parce qu'ils sont en panne » : la règle dit qu'un
    vélo signalé reste louable, donc disponible ; exclure, c'est inventer une règle (concept
    8b2) ; relancer : « qui a fixé qu'un vélo signalé en panne ne compte pas ? » ;
  - écrire « en temps réel » pour la fraîcheur : un mot flou (concept 7a2) ; la règle fixée
    dit moins de 15 minutes ; relancer : « Anna et Diego lisent ta définition chacun de leur
    côté : trouvent-ils le même nombre pour la même station ? » ;
  - ajouter seulement « à quai et louables », sans période ni fraîcheur : dire ce qui est
    corrigé, puis demander « à quel moment ce nombre est-il vrai, et vieux de combien ? » ;
  - perdre en réécrivant une case déjà juste (« par station » disparaît) : dire ce qui est
    ajouté, puis demander « ce nombre, il est donné pour quoi : une station, tout le réseau ? ».
- **Ce qui marche** : le test des deux analystes : « Anna et Diego lisent ta définition chacun
  de leur côté : trouvent-ils le même nombre pour la même station ? ». Puis passer les cinq
  cases une à une.

### Les locations par quartier de Charlotte (12a2)
- **Explication** : une définition vaut pour l'indicateur partout où il est publié (choix du
  cours) ; un critère d'acceptation est propre à une story (concept 8). Une case qu'on ne peut
  pas remplir signale une règle non fixée, ou une source qui manque.
- **Situation** : Charlotte, chargée de mission mobilité, veut le nombre de locations par quartier
  sur le mois, pour justifier la subvention au conseil (story A, concept 10b1). Anna écrit :
  « Locations par quartier : nombre de locations, par quartier, sur le mois, d'après la table
  des locations. » Une location rendue à la même station au bout de quelques minutes est
  souvent un vélo défectueux rendu aussitôt. Le quartier de chaque station est dans le
  référentiel des quartiers, tenu par la collectivité.
- **Question**, en deux parties : « Qu'est-ce qui reste ouvert dans cette définition ? », puis
  « Qui fixe ce qui reste ouvert ? »
- **Réponse attendue** :
  1. Ce qui reste ouvert : deux règles ne sont pas fixées. Compter ou non les locations très
     courtes ; rattacher la location au quartier de la station de départ ou d'arrivée. Toutes
     deux changent le chiffre. La source est incomplète : le quartier vient du référentiel des
     quartiers, tenu par la collectivité, à côté de la table des locations. La fraîcheur manque
     aussi. Nuances, non attendues : la table des locations n'est pas encore accessible
     (concept 11b) : la story ne remplit pas la DoR, même avec une définition complète. La
     comparaison au même mois de l'an dernier (story B) n'a de sens qu'avec la même
     définition, appliquée aux deux années : c'est pourquoi elle s'écrit une fois, pour
     l'indicateur, et non dans les critères de A.
  2. Qui le fixe : c'est Charlotte qui fixe les deux règles, pour ce qu'elle montre au conseil ;
     le PO lui pose la question, il ne choisit pas. Étienne peut l'éclairer (il voit les vélos
     rendus aussitôt), il ne fixe pas : sa vue des locations du jour, pas encore construite,
     montrera toutes les locations, et la règle concerne l'indicateur de Charlotte. Pour la
     fraîcheur, le PO demande à Charlotte quand elle a besoin du mois.
- **Erreurs fréquentes** :
  - Partie 1, mettre la définition dans les critères de la story A : demander « et la story B,
    quelle définition prend-elle ? » ;
  - Partie 1, réponse elliptique (« départ ou arrivée ? ») : faire préciser (pourquoi est-ce
    ouvert ?) avant de corriger ;
  - Partie 1 ou 2, trancher (« on enlève les locations courtes, ce sont des pannes ») : réponse
    fausse, même si l'argument est bon ; ni l'apprenant ni le PO ne fixent la règle. En
    partie 1, dire seulement que la règle n'est pas à trancher ici, et garder « qui la fixe »
    pour la partie 2. En partie 2, réexpliquer avec l'exemple de « Ce qui marche » (la location
    de trois minutes), puis demander « qui montre ce chiffre au conseil ? » ;
  - Partie 2, répondre « Étienne » : sa vue des locations du jour montrera toutes les
    locations, courtes comprises ; c'est une autre vue ; pour l'indicateur de Charlotte, c'est
    Charlotte.
- **Ce qui marche** : faire calculer deux chiffres possibles pour une même location courte (un
  vélo pris et rendu à la même station en trois minutes : une location ou zéro ?). Le
  désaccord montre la règle qui manque.

### La mesure de résultat est aussi un indicateur (12a, en rechange)
- **Explication** : la mesure de résultat de l'objectif produit (concept 2c) est un indicateur
  comme un autre : elle a besoin d'une définition complète. Rappel, sans réenseigner 2c.
- **Situation** : la mesure de résultat retenue : le temps cumulé pendant lequel une station du
  centre-ville est vide aux heures de pointe, calculé depuis les relevés des stations.
- **Question** : passe cette mesure aux cinq cases de la définition : lesquelles sont
  remplies, lesquelles restent ouvertes ?
- **Réponse attendue** : remplie : la source (les relevés des stations). Ouvertes : la règle
  (une station vide : sans vélo à quai, ou sans vélo disponible ? quelles heures de pointe ?),
  la période sur laquelle on cumule le temps (le jour, la semaine, le mois ?), le grain et le
  calcul (par station, ou cumulé sur le centre-ville), et la cible
  chiffrée, qui n'est pas dans la définition mais manque pour juger. Ces points ne sont pas
  fixés ; le PO les fait fixer avec les parties prenantes (concept 2c), sans les trancher. La
  fraîcheur n'est pas dite non plus.
- **Erreurs fréquentes** :
  - proposer une définition (« vide, c'est zéro vélo disponible ») : c'est fixer un fait
    métier ; demander « qui doit le décider ? » ;
  - croire la mesure prête parce que sa phrase est longue : compter les cases remplies ;
    relancer : « deux analystes la calculent demain : trouvent-ils le même temps ? ».
- **Ce qui marche** : « deux analystes la calculent demain : trouvent-ils le même temps ? ».

### Les signalements par téléphone (12b)
- **Explication** : la qualité s'exprime en règles mesurables sur des dimensions (pratique
  établie) ; leur liste est un choix d'école : six chez DAMA UK (exactitude, complétude,
  unicité, cohérence, fraîcheur, validité) ; un relevé en double relève de l'unicité. Une
  exigence va dans la DoD si elle vaut pour toute story (11a), dans un critère si elle est
  propre à une story (8a1), dans la définition si elle concerne l'indicateur. Ce que la
  plateforme reçoit mal se corrige (un relevé en double) ; ce qu'elle ne reçoit jamais est une limite de
  la source : elle s'écrit (dans la définition de l'indicateur) et se montre à ceux qui lisent le
  chiffre.
- **Situation** (hypothèse d'exercice) : la plateforme publie le nombre de vélos signalés par
  semaine, que Maud regarde pour fixer le nombre de techniciens en tournée. Les signalements
  viennent de l'appli (équipe appli) ; ceux reçus par téléphone n'y sont pas saisis. Diego :
  « C'est un défaut de qualité : ajoutons une story pour le corriger. »
- **Question**, en deux parties : « Que réponds-tu à Diego ? », puis « Où écris-tu cette
  limite ? »
- **Réponse attendue** :
  1. La réponse à Diego : ce n'est pas un défaut que la plateforme peut corriger : elle ne
     reçoit pas les signalements par téléphone, aucun traitement ne les fera apparaître. C'est
     une limite de la source (pour cet usage, une question de complétude). Si Maud a besoin des
     signalements par téléphone, la question va d'abord à ceux qui les reçoivent, et au
     propriétaire de la source, l'équipe appli, pour leur saisie (dépendance envers une autre
     équipe, concept 10b2) : pas une story de nettoyage. Le fil rouge ne dit pas qui reçoit les
     appels : ne pas le fixer.
  2. Où l'écrire : dans la définition de l'indicateur (« ne compte que les signalements saisis
     dans l'appli »), et on la rend visible à ceux qui s'en servent, Maud d'abord, là où ils
     lisent le chiffre. Nuance : ce qui compte comme « en panne » (signalé ou constaté) se
     précise au concept 15.
- **Erreurs fréquentes** :
  - Partie 1, accepter la story de Diego : demander « avec quelles données la plateforme les
    retrouverait-elle ? » ;
  - Partie 2, l'écrire dans la DoD : elle ne vaut pas pour toute story, seulement pour cet
    indicateur ; relancer : « cette exigence vaut-elle pour toute story, pour une story, ou pour
    cet indicateur ? » ;
  - Partie 2, l'écrire dans la définition sans la montrer : Maud lit le chiffre, pas la
    définition ; demander « où Maud l'apprend-elle ? ».
- **Ce qui marche** : séparer ce que l'équipe peut corriger (un relevé en double dans ce qu'elle reçoit)
  de ce qu'elle ne reçoit pas (un signalement jamais saisi) ; et « si Maud fixe ses
  techniciens sur ce chiffre sans savoir qu'il manque des pannes, que se passe-t-il ? ».

### Des chiffres fiables, dit Charlotte (12b, en rechange)
- **Explication** : une exigence de qualité vague ne se teste pas ; on la traduit en règles
  mesurables, une dimension à la fois, et c'est l'utilisateur qui dit le niveau dont il a
  besoin (la qualité dépend de l'usage). La liste des dimensions est un choix d'école : six chez DAMA UK (exactitude, complétude, unicité, cohérence, fraîcheur, validité). Une exigence va dans la DoD si elle vaut pour toute story (11a), dans un critère si elle est propre à une story (8a1), dans la définition si elle concerne l'indicateur.
- **Situation** : Charlotte, chargée de mission mobilité, à propos des locations par quartier :
  « Je présente ces chiffres au conseil : il me faut des chiffres fiables. »
- **Question** : comment transformes-tu « fiables » en exigences qu'on peut vérifier ?
- **Réponse attendue** : « fiables » est un mot flou (concept 7a2) : on demande à Charlotte ce qui
  la ferait douter d'un chiffre, puis on écrit des règles mesurables, par dimension. Exemples
  d'exercice : chaque location est rattachée à un quartier (complétude) ; aucune location
  comptée deux fois (unicité) ; les locations des derniers jours du mois sont comptées quand
  Charlotte lit le chiffre (fraîcheur). Ce qui vaut pour cet indicateur va dans sa
  définition ; ce qui vaut pour toute story va dans la DoD. Le niveau exigé (un taux, une date)
  est à faire dire par Charlotte : le PO ne le fixe pas.
- **Erreurs fréquentes** :
  - répondre « on testera tout » : demander « que vérifie le test, exactement ? » ;
  - fixer soi-même un seuil (« moins de 1 % d'erreurs ») : c'est à Charlotte de dire ce dont le
    conseil a besoin ; relancer : « qui sait ce dont le conseil a besoin ? ».
- **Ce qui marche** : « quel chiffre, faux, te mettrait en difficulté devant le conseil ? ».

### Quelles colonnes demander à Sid ? (12c)
- **Explication** : le RGPD (texte de loi) demande des finalités déterminées et seulement les
  données nécessaires à ces finalités (minimisation). Un identifiant est une donnée
  personnelle quand il permet de retrouver la personne. Le PO ne fait pas le droit ; il sait dire,
  pour chaque colonne, à quoi elle sert, et s'il lui faut le détail ou un agrégat. S'il y a un
  délégué à la protection des données, c'est lui qui conseille sur la règle.
- **Situation** : la table des locations contient, pour chaque location : le vélo, l'identifiant
  de l'abonné, les stations de départ et d'arrivée, les heures. L'accès est demandé à Sid,
  DSI ; il demande de justifier chaque colonne. On prépare la demande pour les stories de
  Charlotte (locations par quartier sur le mois, puis comparaison au même mois de l'an dernier).
- **Question** : que demandes-tu à Sid pour les stories de Charlotte, et comment le
  justifies-tu ? (Relances : si l'apprenant ne parle que des colonnes, « et quelles
  locations ? » ; s'il donne la liste sans raison, « à quoi sert chacune ? ».)
- **Réponse attendue** : la finalité d'abord : compter les locations par quartier, sur le mois,
  pour Charlotte. Les stations de départ et d'arrivée (le quartier vient du référentiel, et la
  règle départ ou arrivée n'est pas fixée) et les heures (la période, et la durée si Charlotte
  écarte les locations très courtes). Pas l'identifiant de l'abonné : il ne sert pas à compter
  les locations par quartier, et c'est une donnée personnelle. Pas le vélo non plus pour cette
  finalité : si une règle à venir en a besoin, on le demande alors, avec sa finalité. Charlotte
  reçoit des comptes agrégés par quartier ; la plateforme a besoin des lignes de location pour
  les calculer, sans l'abonné : au détail, parce que la règle des locations très courtes n'est
  pas fixée et que le calcul en dépend. Les lignes aussi se bornent : les locations du mois et
  du même mois de l'an dernier (story B), pas tout l'historique. Nuances, non attendues : la vue
  des locations du jour d'Étienne (concept 11b) attend le même accès ; c'est une autre finalité,
  justifiée colonne par colonne elle aussi (stations, heures, toujours sans l'abonné). La
  demande de Sid n'est pas un frein, c'est la
  minimisation appliquée ; une demande justifiée colonne par colonne avance plus vite (renvoi
  11b).
- **Erreurs fréquentes** :
  - « toute la table, on verra » : demander « à quoi sert l'identifiant de l'abonné pour
    compter par quartier ? » ;
  - oublier les heures : sans elles, pas de mois ;
  - demander tout l'historique : la finalité borne aussi les lignes ; demander « de quels mois
    Charlotte a-t-elle besoin ? » ;
  - voir la question de Sid comme une mauvaise volonté à contourner : sa question est celle
    que le PO doit savoir poser d'abord ; si l'accès bloque sprint après sprint, l'escalade se
    voit au concept 14 ;
  - réponse juste sans la raison (« départ, arrivée, heures ») : demander « pourquoi pas
    l'abonné ? ».
- **Ce qui marche** : écrire la demande en deux colonnes, « colonne » et « à quoi elle sert pour
  Charlotte » ; une colonne sans raison ne se demande pas.

### Prenons toute la table (12c, en rechange)
- **Explication** : une donnée pseudonymisée (un identifiant à la place du nom) reste une donnée
  personnelle pour qui peut la rattacher à une personne (RGPD). Une finalité se dit avant
  d'utiliser les données, pas après.
- **Situation** : Dana, data engineer : « Demandons toute la table. L'identifiant de l'abonné,
  ce n'est qu'un numéro, pas un nom ; et on en aura peut-être besoin plus tard. »
- **Question** : qu'est-ce qui ne tient pas dans les deux arguments de Dana ?
- **Réponse attendue** : « ce n'est qu'un numéro » : l'identifiant est une donnée personnelle ;
  l'opérateur connaît le nom et les coordonnées de ses abonnés, il sait à qui correspond un
  identifiant. « Plus tard » : une finalité se dit avant d'utiliser
  les données, pas après ; « peut-être plus tard » n'en est pas une. On demande ce
  qui sert la finalité d'aujourd'hui ; une nouvelle finalité fera une nouvelle demande, avec sa
  justification. Nuance : le PO ne tranche pas un point de droit ; le délégué à la protection
  des données, s'il y en a un, conseille.
- **Erreurs fréquentes** :
  - donner raison à Dana : relancer : « l'opérateur peut-il retrouver qui est l'abonné
    48213 ? » ;
  - ne réfuter que l'un des deux arguments : dire ce qui est juste, relancer sur l'autre ;
  - « on l'anonymisera dans l'entrepôt » : la collecte reste trop large ; et un identifiant
    remplacé par un autre reste rattachable tant que quelqu'un garde la correspondance ;
    relancer : « une fois l'identifiant remplacé, quelqu'un peut-il encore retrouver
    l'abonné ? ».
- **Ce qui marche** : « l'opérateur peut-il retrouver qui est l'abonné 48213 ? ».

## Schéma

Trois schémas, un par sous-concept. Les cas sont inventés pour l'illustration : ils ne fixent
aucun fait du fil rouge.
1. **12a2** : la fiche de l'indicateur « Nouveaux abonnés » (cas inventé), un cadre discret qui
   contient cinq cases dans l'ordre : règle de calcul, grain, période, source, fraîcheur. Quatre
   cases sont discrètes ; la règle de calcul, en pointillé et seule au trait plein, porte la
   question « un renouvellement compte-t-il ? ». Une clé nomme le pointillé : « à faire fixer ».
2. **12b** : la plateforme, un cadre à droite. Un relevé en double entre dans le cadre, en trait
   discret, avec « reçu mal : se corrige (unicité) ». Une donnée que la source n'envoie pas reste
   dehors, en pointillé, arrêtée par une barre au bord du cadre, avec « jamais reçu : limite de
   la source » ; c'est l'élément le plus marqué du schéma.
3. **12c** : la source Abonnés (cas inventé), quatre colonnes côte à côte. Nom, coordonnées et
   abonnement sont barrés et leur trait s'arrête sur une barre. La station favorite, seule en
   gras, passe et va jusqu'à la finalité « compter les abonnés par station favorite ».
