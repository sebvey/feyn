## Consignes

1. **3a Liste ordonnée, émergente, seule source de travail.** Ordonnée : chaque élément a une
   place, pas d'ex aequo ; « ordonner », c'est décider de la place de chaque élément, et l'ordre
   s'argumente par l'objectif produit (concept 2) ; comment ordonner (valeur, coût, risque,
   dépendances) vient au concept 13. Émergente : le backlog change à mesure que l'équipe
   apprend ; un élément se précise quand il approche du haut, le bas reste vague (DEEP, choix
   d'école). Seule source de travail : rappel du concept 0, sans le réenseigner. Un **élément du
   backlog** est toute entrée du backlog, quel que soit son niveau (les niveaux : concept 4).
   3a s'enseigne en deux messages de 15 lignes, chacun avec sa question : **3a1** « ordonnée »
   (exemple « Trois niveaux de priorité »), puis **3a2** « émergente » (« Tout détailler d'avance ? »),
   qui rappelle en une ligne « seule source » (concept 0). 3a est validé quand les deux réponses
   le sont. « Maud passe par Diego » (3a2) sert d'exemple de rechange, ou d'exercice si l'apprenant
   le demande ou confond un travail hors du backlog avec un raccourci acceptable.
2. **3b Ce qu'il n'est pas.** Un cahier des charges découpé : rempli et validé au début, puis
   figé. Une liste à dépiler : traitée dans l'ordre d'arrivée ou dans un ordre fixé une fois pour
   toutes, jusqu'au dernier élément. Le découpage technique de la solution en tâches : ce plan
   appartient aux Developers, dans le backlog de sprint ; un travail technique entre au backlog
   avec ce qu'il améliore, et le PO l'ordonne (concept 1).

Cas de la banque : pour 3b, « Le plan de l'année », « Le backlog de Dana » et « Au fond depuis des mois ».

## Faits du fil rouge utilisés

Les demandes d'Étienne, Maud, Charlotte et Pia sont celles du fil rouge. Les circonstances des
exemples (qui propose quoi, par quel canal, depuis quand) sont des situations d'exercice : elles
ne deviennent pas des faits du fil rouge.

## Banque d'exemples

### Trois niveaux de priorité (3a1)
- **Explication** : le backlog est une liste ordonnée : chaque élément a une place, et le haut
  dit ce que l'équipe fera ensuite. Le Scrum Guide dit « ordonné » plutôt que « priorisé » :
  une priorité laisse des ex aequo, un ordre non. L'ordre se justifie par l'objectif produit.
- **Situation** : les demandes arrivent en vrac : Étienne veut une vue des vélos en panne, Maud
  (responsable maintenance) veut qu'un vélo signalé en panne ne soit plus louable, Charlotte
  (chargée de mission mobilité à la collectivité) veut comparer les locations par quartier au
  même mois de l'an dernier, Pia (PO de l'équipe appli) veut la disponibilité par station pour
  l'appli.
  Diego propose de leur donner à chacune une priorité, haute, moyenne ou basse. Trois sont
  « haute ».
- **Question** : Que proposes-tu à Diego à la place de ces priorités ?
- **Réponse attendue** : avec trois demandes « haute », l'équipe ne sait pas laquelle prendre
  d'abord : la question revient à chaque Sprint Planning. Un ordre donne à chaque demande une
  place unique, et le PO dit pourquoi ce rang : en quoi la demande rapproche (ou non) de
  l'objectif produit, des stations du centre-ville moins longtemps vides aux heures de pointe.
  Nuance : l'ordre lui-même (un risque pour la sécurité, une échéance) se travaille au
  concept 13 ; ici, on retient qu'une liste ordonnée tranche là où des priorités laissent des
  égalités.
- **Erreurs fréquentes** :
  - ordonner tout de suite les quatre demandes, longuement : recentrer sur ce que l'ordre
    apporte par rapport aux priorités ; le « comment ordonner » vient au concept 13 ;
  - « l'ordre, c'est l'urgence ou qui crie le plus fort » : demander « qu'est-ce qui rapproche
    de l'objectif produit ? » ;
  - garder les priorités et ajouter un sous-ordre : c'est revenir à un ordre, en plus lourd.
    Relancer : « avec ton sous-ordre, à quoi servent encore les trois niveaux ? » ;
  - proposer un ordre sans dire ce que les priorités ne règlent pas : relancer par « qu'est-ce
    que la proposition de Diego ne règle pas ? » ;
  - proposer un ordre sans dire sur quoi il s'appuie : relancer par « sur quoi t'appuies-tu pour
    mettre une demande en premier ? » ; les deux manques ensemble : « Dana finit son travail
    mardi : laquelle des trois "haute" prend-elle, et avec ton ordre, sur quoi t'appuies-tu
    pour mettre une demande en premier ? ».
- **Ce qui marche** : demander « Dana finit son travail mardi : laquelle des trois "haute"
  prend-elle ? ». L'apprenant voit qu'il faut une place unique.

### Tout détailler d'avance ? (3a2)
- **Explication** : le backlog est émergent : il change à mesure que l'équipe apprend. Un
  élément se précise quand il approche du haut ; le bas reste vague. Le haut doit être assez
  précis pour que les Developers puissent le choisir au Sprint Planning et le finir en un
  sprint : le Scrum Guide dit alors qu'il est « prêt à être choisi » (consensus). Que le bas
  reste vague, le Scrum Guide 2017 le disait et la version 2020 ne le dit plus ; c'est le D de
  DEEP (détaillé à bon escient), choix d'école de Cohn et Pichler. Rappel en une ligne (concept 0) :
  le backlog reste la seule source de travail de l'équipe.
- **Situation** : Anna propose de consacrer les deux prochains jours à écrire en détail tous
  les éléments du backlog, jusqu'à la comparaison au même mois de l'an dernier pour Charlotte. Or
  cette comparaison suppose les locations par quartier, qui supposent l'accès à la table des
  locations, que la DSI n'a pas encore donné.
- **Question** : Anna a-t-elle raison de tout détailler maintenant ?
- **Réponse attendue** : non. D'ici à ce que la comparaison arrive en haut, beaucoup changera :
  l'accès, les colonnes accordées, la façon de compter les locations, peut-être la demande
  elle-même. Le détail écrit aujourd'hui serait à refaire. On détaille d'abord le haut, ce que
  l'équipe prendra aux prochains Sprint Planning ; le bas reste une ligne qui dit le besoin
  (Charlotte veut comparer à l'an dernier). Nuance : « vague » ne veut pas dire vide ; on garde
  assez pour comprendre la demande et la placer dans l'ordre. Le travail qui précise les
  éléments a un nom, qui viendra au concept 15.
- **Erreurs fréquentes** :
  - « un backlog bien écrit est détaillé partout » : réflexe de spécification complète, que 3b
    reprend sous le nom de cahier des charges (ne pas l'enseigner ici). Relancer : « quand cet
    élément sera pris, que saura-t-on de plus qu'aujourd'hui ? » ; sinon, réexpliquer (voir « Ce
    qui marche ») ;
  - à l'inverse, « on ne détaille rien avant le Sprint Planning » : le haut est en général
    précisé avant ; l'équipe peut encore le préciser pendant le Sprint Planning (Scrum Guide),
    mais si tout s'y découvre, la séance sert à découvrir la demande. Relancer : « que faut-il
    savoir d'un élément pour que les Developers le choisissent au Sprint Planning ? » ;
  - répondre « non » sans dire quoi détailler : relancer par « que détailles-tu en premier ? ».
- **Ce qui marche** : « quand cet élément sera pris, que saura-t-on de plus qu'aujourd'hui ? ».
  Pour réexpliquer après « détaillé partout » : une autre demande d'Étienne, voir les locations du
  jour par station, attend elle aussi l'accès à la table des locations ; si la DSI n'accorde que
  certaines colonnes, le détail écrit aujourd'hui est à refaire.

### Maud passe par Diego (3a2)
- **Explication** : le backlog est la seule source de travail de l'équipe (concept 0) : ce qui
  n'y est pas, l'équipe ne le fait pas ; sinon le backlog ne dit plus ce que fait l'équipe ni
  pourquoi.
- **Situation** : Maud va voir Diego directement : « Envoie à la DSI, chaque matin, la liste
  des vélos signalés en panne, pour qu'elle les bloque à la location ; c'est une question de
  sécurité. » Diego te demande s'il peut s'y mettre dès demain.
- **Question** : Que réponds-tu à Diego ?
- **Réponse attendue** : Diego ne la prend pas en direct : la demande entre au backlog, et le PO
  décide de sa place parmi les autres. Le motif de Maud (la sécurité) est un argument pour la
  placer haut, à peser au concept 13. Si Diego la traitait en direct, le reste du backlog
  glisserait sans que personne l'ait décidé, et le PO ne pourrait plus répondre de l'ordre.
  Nuance : passer par le backlog n'impose pas d'attendre des semaines ; le PO peut la mettre en
  haut tout de suite. Ce qu'on fait du sprint en cours est une autre question, hors de ce
  concept.
- **Erreurs fréquentes** :
  - « c'est la sécurité, on la fait tout de suite » : peut-être en haut, mais c'est au PO d'en
    décider, dans le backlog. Relancer : « si Diego la fait, qu'est-ce qui ne sera pas fait à la
    place, et qui l'a décidé ? » ;
  - « Maud n'a pas à demander à Diego » : elle a le droit de le dire à qui elle veut ; c'est
    au PO de faire entrer la demande au backlog ;
  - répondre à Diego sans dire où va la demande : relancer par « et la demande de Maud,
    qu'en fais-tu ? ».
- **Ce qui marche** : demander « si Diego la fait, qu'est-ce qui ne sera pas fait à la place, et
  qui l'a décidé ? ».

### Le plan de l'année (3b)
- **Explication** : le backlog n'est ni un cahier des charges découpé (rempli et validé au
  début, puis figé) ni une liste à dépiler (traitée jusqu'au bout dans un ordre fixé). On n'en
  remplit qu'une partie au début ; l'ordre change ; certains éléments ne seront jamais faits.
- **Situation** : Odile propose : « Réunissons Étienne, Maud, Charlotte et Pia un après-midi.
  On écrit tous les éléments de l'année, je les valide, et l'équipe les dépile dans l'ordre
  jusqu'en décembre. »
- **Question** : Corrige la proposition d'Odile.
- **Réponse attendue** : quatre défauts. « Tous les éléments de l'année » : on ne connaît au
  début qu'une partie des besoins, le reste émerge (la revue de sprint en fait apparaître). « Je
  les valide » : le backlog devient un cahier des charges figé ; or il change, et c'est le PO qui
  répond de son contenu et de son ordre, pas une validation du sponsor (concept 1). « Dépile
  dans l'ordre » : l'ordre change à mesure qu'on apprend. « Jusqu'en décembre » : certains
  éléments ne seront jamais faits, et c'est normal. Nuance, à apporter si l'apprenant ne la
  donne pas : réunir les quatre demandeurs pour
  recueillir leurs besoins est utile ; ce qui en sort entre au backlog, dans l'ordre que décide
  le PO, et se reprendra.
- **Erreurs fréquentes** :
  - ne relever que « dépiler » et accepter le reste parce qu'Odile porte le budget : relancer
    par « en mars, Étienne découvre un nouveau besoin : où va-t-il, dans le plan d'Odile ? » ;
  - jeter toute l'idée : écouter les parties prenantes reste nécessaire. Relancer : « dans la
    proposition d'Odile, qu'est-ce qui reste utile ? » ;
  - croire que « émergent » veut dire « sans plan » : le haut est précis, et l'objectif produit
    donne la direction. Réexpliquer.
- **Ce qui marche** : demander « en mars, Étienne découvre un nouveau besoin : où va-t-il, dans le
  plan d'Odile ? ».

### Le backlog de Dana (3b)
- **Explication** : le backlog dit ce qu'il faut pour améliorer le produit. Le découpage de la
  solution en tâches est le plan des Developers, dans le backlog de sprint. Un travail technique
  entre au backlog avec ce qu'il améliore, et le PO l'ordonne (concept 1).
- **Situation** : pour la vue des vélos en panne demandée par Étienne, Dana remplit le backlog avec
  « ingestion des signalements », « modèle de données des pannes », « dédoublonnage des relevés
  des stations », « tableau de bord ». Elle dit : « Comme ça, c'est clair pour nous. »
- **Question** : Qu'est-ce qui cloche dans ce backlog ?
- **Réponse attendue** : ces éléments découpent la solution, le comment : c'est le plan des
  Developers, qui va dans le backlog de sprint quand ils prennent le travail. Au backlog
  produit, l'élément dit ce qui change pour qui : Étienne voit les vélos signalés en panne.
  « Tableau de bord » est le plus proche de la demande d'Étienne, mais il nomme une solution (un
  écran), pas ce qui change pour lui : c'est lui qu'on réécrit ainsi. Le PO ne peut ordonner
  « modèle de données » face aux demandes de Maud ou de Charlotte : il ne sait pas ce qu'il
  apporte. Nuance, à apporter dans la correction (la situation ne dit ni ce que comptent les
  relevés, ni qu'ils ont des doublons) : le dédoublonnage des relevés en double peut avoir sa
  place au backlog, mais pas dans cette vue : les relevés comptent les vélos à quai, pas les
  pannes. C'est un défaut connu des données, qui peut fausser les vues tirées des relevés, comme
  celle des stations vides ; il entre au backlog avec ce qu'il améliore (des vues justes pour
  Étienne), et le PO l'ordonne comme le reste. Le travail technique n'est donc pas exclu du
  backlog : il y entre avec sa raison.
- **Erreurs fréquentes** :
  - « le backlog, c'est la liste des tâches de l'équipe » : réflexe probable d'un développeur ou
    d'un profil data ; demander « qu'est-ce qu'Étienne voit de nouveau quand cet élément est
    fini ? » ;
  - à l'inverse, « pas de technique au backlog » : le concept 1 a montré qu'un travail technique y
    passe ;
  - dire « ticket » : terme d'outil ; le cours dit « élément du backlog » ;
  - « on garde "tableau de bord", c'est ce qu'Étienne voit » : juste en grande partie ; dire ce
    qui est juste, puis demander de l'écrire par ce qu'Étienne voit, pas par l'écran ;
  - relever le défaut sans réécrire aucun élément : relancer par « garderais-tu un de ces
    éléments, écrit comment ? ».
- **Ce qui marche** : faire lire le backlog à Étienne : s'il ne comprend aucun élément, c'est le
  plan des Developers, pas le backlog produit.

### Au fond depuis des mois (3b)
- **Explication** : un élément au backlog n'est pas une promesse. Retirer ce qui ne servira plus
  garde le backlog lisible ; le Scrum Guide ne le dit pas, c'est la pratique de Cohn et de
  Rubin, conséquence d'un backlog émergent. Qu'un élément retiré puisse revenir est un choix du
  cours.
- **Situation** : situation d'exercice : au bas du backlog dort depuis des mois l'élément
  « passer les relevés des stations en streaming », créé il y a des mois sur une proposition de
  Dana, avant que personne ait vérifié le besoin. La plateforme se rafraîchit
  toutes les 5 minutes, sous la cible de fraîcheur (l'âge des données quand on les lit) de 15 minutes, et personne n'a redemandé de
  données plus fraîches. Diego : « Il est au backlog, il faudra bien le faire un jour. »
- **Question**, en deux parties : « Diego a-t-il raison ? », puis « Que fais-tu de cet
  élément ? »
- **Réponse attendue** :
  1. Diego a-t-il raison : non. Être au backlog ne crée aucune obligation : le backlog émerge,
     et ce qui y figure peut en sortir ; le PO peut retirer un élément qui ne sert plus
     l'objectif produit.
  2. Que faire de l'élément : avant de le retirer, le PO vérifie que le besoin n'existe pas : il
     demande à Étienne si des données plus fraîches changeraient quelque chose pour
     l'exploitation (fait métier, pas à trancher seul). S'il n'y a pas de besoin, il le
     retire ; retirer n'est pas définitif, l'élément reviendra si le besoin apparaît.
- **Erreurs fréquentes** :
  - Partie 1 ou 2, « on le garde au cas où » : un bas du backlog qui s'allonge sans fin cache ce qui
    compte. Relancer : « si cet élément disparaissait, qui s'en plaindrait ? » ;
  - Partie 2, le retirer sans rien demander parce qu'il paraît inutile : la fraîcheur nécessaire
    est un fait à obtenir d'Étienne. Relancer : « avant de le retirer, que vérifies-tu, et
    auprès de qui ? ».
- **Ce qui marche** : demander « si cet élément disparaissait, qui s'en plaindrait ? ».

## Schéma

Une colonne verticale de cartes : en haut, de petites cartes nettes ; plus bas, des cartes de
plus en plus grosses et floues (légende « le haut précis, le bas vague : choix d'école, DEEP »).
Au-dessus de la colonne, un drapeau « Objectif produit », relié à la colonne par la légende
« justifie l'ordre ». À gauche, des demandes en vrac (de plusieurs parties prenantes)
entrent dans la colonne ; sur la flèche d'entrée, la légende « le PO décide de leur place ». À
droite, quatre flèches courbes : ajouter,
préciser et découper, réordonner, retirer. Au sommet, une sortie vers le Sprint Planning
(« prêt à être choisi »). En marge, deux vignettes barrées : un classeur « cahier des charges
figé » et une pile « à dépiler ».
