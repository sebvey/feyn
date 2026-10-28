## Consignes

1. **1a Le produit : problème, utilisateurs, valeur.** Décrire la plateforme par ce qu'elle
   change pour qui, pas par sa technique ; les consommateurs de données sont des
   utilisateurs. L'objectif produit et la mesure du résultat viennent au
   concept 2 : ici, on s'arrête à « ce qui change pour une personne nommée ». La valeur est ce
   que l'utilisateur ou l'organisation gagne (du temps, une meilleure décision, un risque évité).
   Exemple : Étienne fait chaque matin le point sur l'état du réseau avant d'envoyer les
   régulateurs ; il est l'utilisateur, et ce que ce point change pour lui, le PO le précise avec
   lui au lieu de le deviner.
2. **1b Qui tranche quoi.** Le PO : quoi, ordre, pourquoi ; une seule personne, qui peut
   déléguer le travail sans déléguer la responsabilité. Les Developers : comment et coût ; ils
   choisissent le travail du sprint avec le PO. Les parties prenantes (toute personne ou équipe
   concernée par le produit : utilisateurs, financeur, sponsor, équipe voisine, fournisseur de
   données) font valoir
   leurs besoins et convainquent le PO ; le sponsor est le responsable qui porte le budget du
   produit et porte plus haut les obstacles qui dépassent le PO, sans ordonner le backlog. Le concept 0 a situé les trois responsabilités de
   l'équipe Scrum ; ici, on dit qui décide. Arbitrer entre parties prenantes et escalader
   viennent au concept 14. Rappel de 0a2 : les Developers choisissent les éléments avec le
   PO ; 1b y ajoute la quantité. En 15 lignes, s'en tenir au PO face aux Developers, avec la
   définition des parties prenantes en une ligne ; le comité et la délégation viennent par
   l'exemple ou la relance. Exemple de fournisseur de données : Sid, le DSI, qui donne les
   accès aux données des systèmes.

Cas de la banque : pour 1a, « Présenter la plateforme à un nouvel arrivant », « L'équipe appli, utilisatrice de la plateforme ? » et « « Et alors ? » » ; pour 1b, « Dana propose de passer au streaming », « Un vote pour ordonner le backlog », « Deux PO pour la plateforme ? » et « Qui choisit le travail du sprint ? ».

## Banque d'exemples

### Présenter la plateforme à un nouvel arrivant (1a)
- **Explication** : un produit se décrit par le problème qu'il résout, pour qui, et ce que ça
  change pour eux. La technique dit comment il est fait, pas pourquoi il existe.
- **Situation** : un nouvel arrivant chez l'opérateur demande ce qu'est la plateforme. Un data
  engineer répond : « Un entrepôt qui collecte les relevés des stations toutes les 5 minutes,
  avec des vues et des alertes par-dessus. »
- **Question** : Réécris cette présentation avec la grille problème, utilisateurs, valeur, en
  deux ou trois phrases, sans mot technique.
- **Réponse attendue** : par exemple : « Aux heures de pointe, des stations du centre-ville se
  vident et les abonnés n'y trouvent plus de vélo. La plateforme montre à l'exploitation (Étienne
  et ses régulateurs) quelles stations sont vides, pour qu'ils y apportent des vélos plus vite.
  Elle fournit aussi à la collectivité des indicateurs pour justifier sa subvention, et à
  l'équipe appli les données qu'affiche l'appli. » Attendu : un problème, des utilisateurs
  nommés, ce qui change pour eux. Nuance : la technique n'est pas interdite ; elle vient après,
  pour qui demande comment c'est fait.
- **Erreurs fréquentes** : reformuler la technique (« elle centralise les données ») : demander
  « qui s'en sert, et qu'est-ce qui change pour lui ? ». Lister des fonctions (vues, alertes,
  indicateurs) sans utilisateur. Ne citer que l'exploitation n'est pas une erreur : apporter
  dans la correction la collectivité (qui finance le service et reçoit des indicateurs) et
  l'équipe appli (qui reçoit des données), que l'apprenant ne connaît pas encore comme
  utilisatrices (voir l'exemple suivant). Donner pour valeur un livrable (« avoir une vue des
  stations vides ») : demander « et alors ? » ; le concept 2 reprend cette distinction.
- **Ce qui marche** : faire présenter la plateforme à un abonné : s'il ne comprend pas à quoi
  elle sert, la phrase parle encore de technique.

### L'équipe appli, utilisatrice de la plateforme ? (1a)
- **Explication** : un utilisateur est une personne ou une équipe qui se sert du produit. On
  se sert d'un produit par ses écrans ou par ses données.
- **Situation** : l'équipe appli (sa PO : Pia) affiche dans l'appli des abonnés des données
  qu'elle reçoit de la plateforme. Diego dit : « Les utilisateurs de la plateforme, ce sont
  Étienne et ses régulateurs. L'équipe appli, c'est une équipe voisine, pas une utilisatrice. »
- **Question** : Diego a-t-il raison ? Justifie.
- **Réponse attendue** : non. L'équipe appli se sert des données de la plateforme : c'est une
  utilisatrice, avec son besoin (recevoir les données qu'affiche l'appli) et sa valeur (montrer
  aux abonnés des données justes et à jour). À apporter dans la correction si l'apprenant ne le
  dit pas, ce que ça change pour le PO : les besoins de l'équipe appli entrent au backlog et
  s'ordonnent avec ceux d'Étienne ; la justesse et la fraîcheur (l'âge des données quand on les
  lit) des données livrées comptent pour elle autant qu'un écran pour Étienne. Nuance : Diego n'a
  pas tout faux, une même équipe peut être à la fois utilisatrice de la plateforme et équipe
  voisine dont dépend une partie du travail (concept 10) ; dans les deux cas, c'est une partie
  prenante. Faire des consommateurs de données des utilisateurs est un choix du cours,
  appuyé sur le data mesh (choix d'école de Dehghani).
- **Erreurs fréquentes** : réserver « utilisateur » aux humains devant un écran. Répondre que
  les utilisateurs sont les abonnés : ils profitent de la plateforme à travers l'appli, mais le
  besoin que la plateforme sert directement est celui de l'équipe appli. Pour l'une ou l'autre,
  relancer : « si la plateforme livre des données fausses, qui s'en plaint en premier ? ».
- **Ce qui marche** : demander « si la plateforme livre des données fausses, qui s'en plaint en
  premier ? » : l'équipe appli, puis ses abonnés.

### « Et alors ? » (1a)
- **Situation** : Théo, technicien de maintenance, répare les vélos sur le terrain. Dans une
  présentation de ce que la plateforme pourrait apporter à la maintenance, une phrase dit : « La
  plateforme montrera les vélos signalés en panne. »
- **Question** : Que manque-t-il à cette phrase selon la grille ? Corrige-la.
- **Réponse attendue** : il manque l'utilisateur et la valeur : « montrer », et alors ? Par
  exemple : « Théo, technicien de maintenance, prépare sa tournée de réparation à partir des
  vélos signalés en panne. » La phrase dit ce que fait Théo grâce à la plateforme, pas ce
  qu'elle affiche. Nuance : ce que ça change par rapport à aujourd'hui, et combien de temps Théo
  y gagne, le PO ne le sait pas ; il le demande à Théo, ou à Maud, la responsable maintenance qui encadre les
  techniciens ; il ne l'invente pas.
- **Erreurs fréquentes** : ajouter de la technique (« depuis la source des signalements »).
  Relancer : « et alors ? ». Inventer la valeur (« Théo gagne une heure par jour ») au lieu de
  la demander. Relancer : « d'où vient ce chiffre ? ».
- **Ce qui marche** : répéter « et alors ? » jusqu'à obtenir un changement pour une personne
  nommée.

### Dana propose de passer au streaming (1b)
- **Explication** : le PO répond du quoi, de l'ordre et du pourquoi ; les Developers, du comment
  et du coût.
- **Situation** : la plateforme se rafraîchit toutes les 5 minutes. Dana, data engineer,
  propose de passer les relevés des stations en streaming. Diego te demande : « Tu valides ? »
- **Question** : Dans cette proposition, qu'est-ce qui relève de toi, PO, et qu'est-ce qui
  relève des Developers ?
- **Réponse attendue** : le streaming est un comment : le choix de la technique et son coût
  reviennent aux Developers ; le PO n'a pas à « valider » une technique. Ce qui relève du PO :
  le besoin derrière. Des données plus fraîches changeraient-elles quelque chose pour Étienne ou
  les régulateurs ? Le PO le leur demande, sans le trancher seul. Si le besoin existe, il
  devient un élément du backlog que le PO crée, explique (le pourquoi) et ordonne face aux
  autres, une fois que les Developers en ont donné la taille. Nuance : même un travail purement
  technique passe par le backlog, seule source de travail de l'équipe Scrum ; le PO l'ordonne en
  écoutant l'argument des Developers. Si l'apprenant objecte qu'une cible de fraîcheur existe
  déjà (moins de 15 minutes, règle fixée) : la question du PO devient
  « la cible est-elle tenue, et descendre en dessous changerait-il quelque chose pour Étienne ? » ;
  le moyen de la tenir (streaming ou autre) reste aux Developers.
- **Erreurs fréquentes** : choisir ou refuser la technique (« le streaming, c'est trop lourd pour
  nous ») : réflexe d'ancien développeur ; c'est le comment, il revient aux Developers.
  Relancer : « comment on le fait, pour quel coût : qui répond à cette question ? ». À
  l'inverse, « c'est technique, ça ne me regarde pas » : le PO perd le pourquoi (qui y gagne ?)
  et l'ordre. Relancer : « qu'est-ce que ça change pour un utilisateur ? ». Décider seul que les
  régulateurs « ont besoin du temps réel » : c'est un fait métier, à demander à Étienne. Relancer :
  « qui peut dire si les régulateurs en ont besoin ? ».
- **Ce qui marche** : couper la proposition en deux questions : « qu'est-ce que ça change pour
  un utilisateur ? » (PO) et « comment on le fait, pour quel coût ? » (Developers).

### Un vote pour ordonner le backlog (1b)
- **Situation** : les demandes arrivent d'Étienne (responsable d'exploitation), de Maud
  (responsable maintenance), de Charlotte (chargée de mission mobilité, pour la collectivité,
  qui reçoit des indicateurs de la plateforme) et de Pia (PO de l'équipe appli, qui reçoit des
  données de la plateforme). Pour éviter les conflits, Odile (directrice des opérations, sponsor
  de la plateforme, dont elle porte le budget) propose que ces quatre personnes votent l'ordre
  du backlog à chaque sprint.
- **Question** : Que réponds-tu à Odile ? Dis qui tranche l'ordre et quelle place gardent les
  quatre demandeurs.
- **Réponse attendue** : l'ordre revient au PO, une seule personne, pas un comité (Scrum Guide).
  Étienne, Maud, Charlotte et Pia sont des parties prenantes : ils font valoir leurs besoins, et
  qui veut changer l'ordre doit convaincre le PO. Le PO les écoute, représente leurs besoins
  dans le backlog et explique ses choix (le pourquoi). Avec un vote, personne ne répondrait de
  la valeur. Charlotte et Pia sont aussi des utilisatrices (Charlotte pour la collectivité, Pia
  pour l'équipe appli : des consommateurs de données, vus en 1a) : tout utilisateur est une
  partie prenante. Nuance : Odile est le sponsor (elle porte le budget de la plateforme et porte
  plus haut les obstacles qui dépassent le PO) ; l'ordre, lui, reste au PO, et un obstacle qui
  le dépasse se porte plus haut (concept 14), ce qui n'a rien d'un vote à chaque sprint.
- **Erreurs fréquentes** : accepter le vote « pour être juste ». Relancer : « si l'ordre se
  révèle mauvais, qui en répond ? ». À l'inverse, ordonner sans
  écouter ni expliquer. Douter : « le PO peut-il vraiment ordonner seul si les demandeurs ne
  sont pas d'accord ? » Oui, c'est sa responsabilité ; ce doute est sain, le concept 14 y répond
  (arbitrer, dire non avec l'objectif produit).
- **Ce qui marche** : demander « si l'ordre se révèle mauvais, qui en répond ? ». Avec un vote,
  personne.

### Deux PO pour la plateforme ? (1b)
- **Situation** : Pia, PO de l'équipe appli, connaît bien les données qu'affiche l'appli. Odile
  propose que Pia et toi teniez ensemble le backlog de la plateforme : chaque PO
  ordonnerait ses propres demandes.
- **Question** : Que réponds-tu à Odile ?
- **Réponse attendue** : un produit a un seul PO, une seule personne ; plusieurs équipes sur un
  même produit partagent le même PO (Scrum Guide). Pia est PO de l'appli ; pour la plateforme,
  elle est utilisatrice et partie prenante : ses besoins entrent au backlog quand elle t'en
  convainc, et tu les ordonnes face à ceux d'Étienne, Maud et Charlotte. Avec deux PO, deux
  ordres se contrediraient et personne ne répondrait de l'ensemble. Nuance : tu peux confier une
  partie du travail sur le backlog (écrire des éléments, par exemple), tu en restes responsable
  (vu au concept 0) ; le Scrum Guide ne parle pas de « proxy PO ».
- **Erreurs fréquentes** : accepter « pour aller plus vite » ou parce que Pia connaît mieux les
  données de l'appli : la connaissance de Pia sert le backlog par la discussion, pas par le
  partage du rôle. Confondre avec la délégation : confier du travail est permis, partager la
  responsabilité non. Pour l'une ou l'autre, relancer : « si les deux ordres se contredisent,
  qui tranche ? ».
- **Ce qui marche** : demander « si les deux ordres se contredisent, qui tranche ? ». S'il faut
  un arbitre, c'est qu'il y a un seul PO.

### Qui choisit le travail du sprint ? (1b)
- **Situation** : au Sprint Planning, tu arrives avec le backlog ordonné et annonces : « Ce
  sprint, on fait les six premiers éléments. » Dana répond qu'au vu du travail, l'équipe peut en
  prendre quatre.
- **Question** : Tu dis six, Dana dit quatre : qui tranche combien d'éléments entrent, et que
  gardes-tu, toi ?
- **Réponse attendue** : ni l'un ni l'autre seul. Le PO propose comment le sprint peut augmenter
  la valeur du produit, et l'ordre du backlog dit ce qui vient en premier ; les Developers
  choisissent, en discussion avec le PO, les éléments qu'ils prennent, puisqu'ils savent ce
  qu'ils peuvent faire. Ici, l'équipe prend sans doute les quatre premiers, et le PO vérifie que
  ce sont bien les plus utiles. Nuance : le PO décide de l'ordre du backlog, pas de la quantité
  de travail du sprint.
- **Erreurs fréquentes** : « le PO décide du quoi, donc du contenu du sprint » : il décide de
  l'ordre, les Developers choisissent ce qu'ils prennent avec lui. À l'inverse, « les Developers
  choisissent seuls » : la discussion avec le PO fait partie du choix.
- **Ce qui marche** : séparer « dans quel ordre » (PO) et « combien on en prend » (Developers,
  avec le PO).

## Schéma

À gauche, un triangle dont les sommets sont **Problème**, **Utilisateurs** et **Valeur**, avec
**Produit** au centre. Sous « Utilisateurs », deux familles : ceux qui regardent les vues
et ceux qui consomment des données.
À droite, un tableau « qui tranche quoi » en trois colonnes : **PO** (quoi, ordre, pourquoi ;
une seule personne), **Developers** (comment, coût ; choisissent le travail du sprint avec le
PO), **Parties prenantes** (font valoir leurs besoins, convainquent le PO). Légende : le PO
représente les parties prenantes dans le backlog et répond de la valeur.
