## Consignes

1. **16a la carte** : les activités de l'utilisateur en ligne (la colonne vertébrale, dressée
   à partir d'une journée type, Patton), les stories dessous, de haut en bas ; la carte sert à
   voir le tout, pas à décrire un flux avec la précision d'un modèle de processus (Patton) ;
   elle n'est pas la hiérarchie (4) et ne remplace pas le backlog ordonné (« La journée d'Étienne rangée par vues »). En rechange : « On peut
   supprimer le backlog ? ».
2. **16b tranche de version**, en deux messages ; on ne passe à 16c qu'après les deux :
   - **16b1** la tranche qui traverse la carte, la première version utile, son résultat visé
     et sa mesure de succès, sans cible (« Le point du matin d'abord ») ;
   - **16b2** les deux sens de MVP, et dire lequel on emploie (« Un MVP, même bâclé »).
3. **16c la prévision vient des Developers** : la fourchette, ce qui la fait bouger, pas une
   promesse (« Pour quand ? »). En rechange : « Il me faut une date ». À l'apprenant qui
   travaille sans sprint : annexe A2d (prévoir en flux).

Déjà enseigné, à rappeler sans le réenseigner : l'incrément et les trois engagements (0) ; le PO
seul ordonne, qui veut changer l'ordre le convainc (1b) ; résultat, mesure de résultat et ses
points non fixés (2) ; backlog ordonné, seule source du travail (3) ; les niveaux epic, feature,
story (4) ; le format de la story (5) ; les Developers estiment la taille (7) ; la règle non
fixée que le PO fait fixer (8a2) ; tranche verticale, couche (9) ; dépendance envers une autre
équipe (10b) ; DoD, l'accès aux locations non obtenu (11) ; ordre, MoSCoW pour une échéance
(13) ; escalade (14c) ; Sprint Planning et revue de sprint (15). Non acquis au fil principal :
le walking skeleton de Cockburn (vu seulement dans la rechange 9a1). Pas encore enseignés,
nommés avec renvoi : hypothèses et exploration, le MVP de Ries comme manière d'apprendre (17) ;
l'outil du backlog (annexe A1) ; travailler sans sprint (annexe A2).

## Faits du fil rouge utilisés

la journée d'Étienne (point du matin sur l'état du réseau, envoi
des régulateurs, suivi des incidents, bilan du soir) ; ses vues (stations vides, vélos en panne,
locations du jour) ; la vue des stations vides, déjà livrée, doit servir à Étienne à envoyer les
régulateurs plus tôt vers les stations qui se vident ; les deux autres vues ne sont pas
livrées ; l'accès à la table des locations n'est pas obtenu ; le blocage des vélos signalés,
réclamé par Maud ; sprints de deux semaines ;
l'objectif produit et sa mesure de résultat, dont la cible, les heures de pointe, la station
vide et le calcul ne sont pas fixés ; Odile, sponsor. Situations d'exercice, qui ne deviennent
pas des faits du fil rouge : les stories d'Étienne et le moment où il s'en sert, les cartes de
Anna et de Dana, les propos de Diego, d'Odile et d'Étienne, la prévision de trois à cinq sprints
et le contenu de la tranche en 16c.

## Banque d'exemples

### La journée d'Étienne rangée par vues (16a)
- **Explication** : une story map (Jeff Patton, choix d'école) se lit comme la journée de
  l'utilisateur. En haut, ses activités, de gauche à droite dans l'ordre où il la raconte : la
  colonne vertébrale. Sous chaque activité, les stories qui la servent, de haut en bas : en
  haut l'indispensable, plus bas ce qui l'est moins. La carte fait voir le tout ; elle complète
  le backlog ordonné, elle ne le remplace pas (choix du cours), et le PO garde l'ordre.
- **Situation** : Étienne raconte sa journée : point du matin sur l'état du réseau, envoi des
  régulateurs, suivi des incidents, bilan du soir. Anna a dessiné une carte pour Étienne : trois
  colonnes, « Stations vides », « Vélos en panne », « Locations du jour », avec sous chacune les
  stories de la vue. Parmi elles (propos d'exercice d'Étienne) :
  1. « voir les stations vides, pour y envoyer les régulateurs » (déjà livrée) ;
  2. « au point du matin, voir les vélos signalés en panne, station par station » ;
  3. « au bilan du soir, savoir combien de vélos ont été signalés dans la journée » ;
  4. « voir le nombre de locations depuis ce matin, par station ».
- **Question**, en deux parties : « Corrige la carte d'Anna : que mets-tu en haut ? », puis
  « Où ranges-tu ces quatre stories ? »
- **Réponse attendue** :
  1. En haut : les colonnes d'Anna sont des vues, des éléments de la hiérarchie (concept 4) qui
     découpent le produit, pas des moments de la journée d'Étienne. En haut, ses quatre
     activités, dans l'ordre de sa journée : point du matin, envoi des régulateurs, suivi des
     incidents, bilan du soir.
  2. Les quatre stories : chacune va sous l'activité qu'elle sert : 1 sous l'envoi des
     régulateurs, 2 sous le point du matin, 3 sous le bilan du soir. Pour 4, le moment n'est
     pas dit : on demande à Étienne quand il s'en sert, on ne le décide pas à sa place.
     Nuances, non attendues, à apporter dans la correction : la carte montre ce que l'arbre de
     4 ne montre pas, une même vue sous plusieurs activités (vélos en panne, le matin et le
     soir) et une activité vide (ici le suivi des incidents), trou à explorer avec Étienne ; la
     story 1, déjà livrée, reste sur la carte (on voit ce qu'Étienne a déjà) ; la carte ne
     remplace pas le backlog, chaque story y garde sa place.
- **Erreurs fréquentes** :
  - Partie 1, garder les vues en colonnes (« c'est plus clair ») : demander « à quel moment de
    sa journée Étienne s'en sert-il ? » ;
  - Partie 1, ranger les activités par importance : la colonne vertébrale suit l'ordre du
    récit, elle ne s'ordonne pas ;
  - Partie 2, mettre epic, feature et story en lignes : la carte n'est pas la hiérarchie ; ses
    lignes vont de l'indispensable au moins nécessaire ;
  - Partie 2, placer la story 4 soi-même : demander « qu'est-ce qui te dit à quel moment
    Étienne s'en sert ? » ;
  - Partie 2, placer une story « parce que c'est le plus important pour Étienne » :
    l'importance joue de haut en bas ; de gauche à droite, c'est le moment, que seul Étienne
    sait ; demander « et s'il la regarde au bilan du soir ? ».
- **Ce qui marche** : faire raconter la journée d'Étienne à voix haute (« d'abord…, puis… »),
  puis poser chaque story sous le moment où il la lit. Lien avec le format (5), chez Patton :
  la tâche de l'utilisateur va après « je veux », l'activité après « afin de ».

### On peut supprimer le backlog ? (16a, en rechange)
- **Explication** : rappel en une ligne : de gauche à droite, l'ordre du récit ; de haut en
  bas, l'indispensable d'abord ; l'ordre du backlog, la décision du PO.
- **Situation** : Dana, devant la carte de la journée d'Étienne : « Maintenant qu'on a la carte,
  on peut supprimer le backlog dans l'outil. »
- **Question** : que réponds-tu à Dana ?
- **Réponse attendue** : non, dans ce cours : le backlog reste la seule liste ordonnée, et le PO
  en répond (Scrum Guide). La carte montre le tout et les trous, mais deux stories
  de deux colonnes et de la même ligne (aussi indispensables l'une que l'autre) n'y ont pas d'ordre entre elles : la carte ne donne pas
  d'ordre unique. Si Dana finit lundi, laquelle prend-elle ? Chaque story de la carte est un
  élément du backlog, à sa place dans l'ordre. Nuance : Patton, lui, voit la carte comme un
  meilleur backlog (choix d'école) ; garder les deux est un choix du cours.
- **Erreurs fréquentes** :
  - « oui, la carte suffit » : demander « quelle story vient en premier ? » ;
  - prendre l'ordre de gauche à droite pour l'ordre du travail : c'est l'ordre du récit.
- **Ce qui marche** : « Dana finit lundi : quelle story prend-elle ? ».

### Le point du matin d'abord (16b1)
- **Explication** : une tranche de version est une ligne tracée en travers de la carte : au-dessus,
  les stories de la version. Chez Patton (choix d'école), la tranche traverse toute la colonne
  vertébrale : la première version utile, c'est le moins de stories, prises sous chaque
  activité, qui permet à l'utilisateur d'atteindre son but. À côté de la tranche, on écrit son
  résultat visé et une mesure de succès : ce qu'on mesurera pour dire si la version a réussi,
  de préférence un changement dans ce que fait l'utilisateur. On nomme la mesure, sans inventer
  de cible.
- **Situation** : la carte de la journée d'Étienne est faite. Diego : « Première version : le
  point du matin, en entier, avec tout ce qu'Étienne voudrait y voir. Ensuite l'envoi des
  régulateurs, puis le reste. »
- **Question**, en deux parties : « Que proposes-tu à Diego à la place ? », puis « Qu'écris-tu
  à côté de la tranche ? »
- **Réponse attendue** : chaque partie se corrige en un message : la première, la tranche, qui
  dit l'indispensable, avec le trou du suivi des incidents et le lien avec 9 en une ligne
  chacun, ou renvoyés au fichier à relire ; la seconde, le résultat visé et la mesure.
  1. À la place : finir une activité avant la suivante, c'est construire une colonne à la
     fois : Étienne aurait un point du matin complet et rien pour le reste de sa journée. La
     première tranche prend, sous chaque activité, le minimum qui permet à Étienne de mener sa
     journée : par exemple, les vélos signalés au point du matin (story 2), la vue des stations
     vides (story 1, déjà livrée) pour l'envoi des régulateurs, les vélos signalés dans la
     journée au bilan du soir (story 3). La story 4 (locations du jour) attend qu'Étienne dise
     quand il s'en sert, et son accès n'est pas obtenu (11b). Ce qui est indispensable, c'est
     Étienne qui le dit ; le PO le lui fait dire (« sans quoi ta journée ne tient pas ? »). Le
     suivi des incidents n'a pas encore de story : la tranche couvre ce que la carte contient,
     et elle n'est pas complète tant que ce trou n'est pas exploré avec Étienne. C'est lui qui
     dit si sa journée tient sans le suivi des incidents, pas le PO ; la tranche se confirme
     après. C'est l'idée de la tranche verticale (9) à l'échelle d'une version : la version
     sert seule.
  2. À côté de la tranche : un résultat visé que le PO propose et fait confirmer (par exemple,
     qu'Étienne envoie plus tôt les régulateurs vers les stations qui se vident) et une mesure
     de succès, nommée sans cible : de préférence un changement dans ce que fait Étienne, à
     chercher avec lui ; la mesure de résultat de l'objectif produit en est une autre, plus
     lointaine, avec ses points non fixés (concept 2).
- **Erreurs fréquentes** :
  - Partie 1, suivre Diego « parce que c'est le plus important pour Étienne » : même confusion qu'en
    16a, l'importance joue de haut en bas dans chaque colonne, la tranche traverse toutes les
    colonnes ;
  - Partie 1, accepter « le point du matin d'abord » : demander « lundi, avec cette version seule,
    la journée d'Étienne tient-elle ? » ;
  - Partie 1, penser la première version comme une couche (« d'abord toutes les données dans
    l'entrepôt, les vues après ») : elle ne sert pas seule (9) ;
  - Partie 1, croire que la tranche de version est une tranche horizontale (9) parce que sa ligne
    traverse la carte : la carte range les moments de la journée d'Étienne, pas les couches du
    produit ; la tranche de version traverse toute la journée et sert seule ; relancer : « que
    contient cette tranche : une couche du produit, ou un peu de chaque moment de la journée
    d'Étienne ? » ;
  - Partie 1, choisir soi-même ce qui est indispensable : c'est Étienne qui le dit ;
  - Partie 1, mettre au-dessus de la ligne tout ce qui est en haut de chaque colonne « parce que
    tout compte » : la tranche n'est plus la plus petite ;
  - Partie 2, fixer une cible (« moins 20 % de temps vide ») : la cible n'est pas fixée, le PO la
    fait fixer.
- **Ce qui marche** : l'image de Patton : on ne livre pas une voiture sans freins ; une version
  petite, mais qui marche d'un bout à l'autre de la journée. Si l'apprenant cite le « walking
  skeleton » de Patton pour cette première version : c'est un autre usage du mot : le cours le
  garde pour le sens de Cockburn, une toute petite implémentation de bout en bout qui relie les
  composants, utile à l'équipe et pas à l'utilisateur (concept 9, vu au cas de rechange de 9a1) ; ne pas
  l'enseigner ici.

### Un MVP, même bâclé (16b2)
- **Explication** : « MVP » a deux sens. Pour Eric Ries, c'est la version d'un nouveau produit
  qui permet d'apprendre le plus sur ses clients pour le moindre effort ; il précise que ce
  n'est pas faire un produit minimal (concept 17 y revient). Dans l'usage courant, c'est la
  première version, avec juste assez pour servir les premiers utilisateurs : la première
  tranche de la carte (16b1). On dit toujours lequel on emploie. Tout ce qui entre dans
  l'incrément remplit la DoD (0, 11a), MVP ou pas.
- **Situation** : Odile, sponsor (propos d'exercice) : « Livrez vite un MVP à Étienne, même
  bâclé : vous corrigerez après. »
- **Question** : que réponds-tu à Odile ?
- **Réponse attendue** : d'abord, dire de quel MVP on parle. Si Odile veut une première
  version vite, c'est la première tranche de la carte : petite, pas bâclée ; on retire des
  stories, pas de la qualité, car ce qui ne remplit pas la DoD n'entre pas dans l'incrément.
  Si elle veut savoir si une idée marche avant d'y mettre plus d'effort, c'est le MVP au sens de
  Ries : une façon d'apprendre (concept 17), pas une version au rabais. « Bâclé » ne
  correspond à aucun des deux sens. Le PO nomme le sens et propose la tranche ; il ne promet
  pas de date (16c).
- **Erreurs fréquentes** :
  - accepter « bâclé » parce qu'Odile est sponsor : le sponsor n'ordonne pas le backlog (14),
    et la DoD vaut pour tout incrément ; relancer : « minimum de quoi ? » ;
  - employer « MVP » sans dire dans quel sens : Odile et l'équipe ne parlent plus de la même
    chose ; relancer : « de quel MVP parle Odile ? » ;
  - refuser le mot en bloc (« le MVP, c'est du marketing ») : il a deux sens utiles, à
    distinguer ; relancer : « de quel MVP parle Odile ? » ;
  - proposer un « MVP » qui ne sert pas seul (les données dans l'entrepôt, sans vue) : c'est
    une couche (9) ; relancer : « avec cette version seule, que voit Étienne ? ».
- **Ce qui marche** : « minimum de quoi ? » : des stories, jamais de la qualité. Faire dire le
  sens en une phrase avant de répondre à Odile.

### Pour quand ? (16c)
- **Explication** : à « pour quand ? », le PO ne donne pas une date qu'il invente. La prévision
  se construit sur la taille des stories, que les Developers estiment, et sur leur rythme des
  derniers sprints (Scrum Guide : seul ce qui s'est déjà passé sert à prévoir). Elle se donne
  en fourchette (école de Mike Cohn) et se revoit à chaque sprint. Ce n'est pas une promesse.
  Le Scrum Guide cite des pratiques de prévision sans en imposer ; story points et vélocité en
  sont, choix d'école, sans les détailler ici.
- **Situation** : Étienne, devant la première tranche : « Pour quand ? » Dans cet exercice, Étienne
  a dit qu'il regarde les locations du jour au bilan du soir et les veut dans la version ; Dana,
  Diego et Anna prévoient trois à cinq sprints, d'après la taille des stories et leurs derniers
  sprints, et la tranche retenue avec Étienne contient les locations du jour, qui attendent
  l'accès à la table des locations. Le PO a commencé à répondre : « Fin du mois prochain,
  promis. »
- **Question** : corrige la réponse du PO : que dis-tu à Étienne ?
- **Réponse attendue** : pas de date promise : « fin du mois prochain » ne vient pas des
  Developers, et « promis » en fait une promesse. Le PO dit : d'après Dana, Diego et Anna, trois
  à cinq sprints, soit six à dix semaines ; une prévision, revue à chaque sprint, dont on
  reparle à chaque revue. Puis ce qui la ferait bouger : la dépendance (les locations du jour
  attendent l'accès ; s'il tarde, la version glisse, ou le PO propose à Étienne de sortir cette
  story de la tranche, à décider avec lui) ; l'ordre (si une autre demande passe devant, comme
  le blocage réclamé par Maud, la version arrive plus tard). Le PO ne refait pas le calcul à
  la place des Developers et ne leur demande pas de s'engager sur la borne basse. Nuance : si
  l'accès bloque longtemps, c'est un obstacle à escalader (14c).
- **Erreurs fréquentes** :
  - donner une date pour rassurer Étienne : c'est une promesse que personne n'a prévue ;
  - prendre la borne basse pour la réponse (« trois sprints, donc ») : la fourchette se donne
    entière ;
  - estimer soi-même (« trois stories, deux sprints ») : la taille vient des Developers ;
  - s'arrêter à la fourchette : relancer « et alors, qu'est-ce qui pourrait la faire bouger ? » ;
  - répondre à Étienne en story points : il demande quand, pas combien de points.
- **Ce qui marche** : la réponse en trois temps : la fourchette, d'où elle vient, ce qui la
  ferait bouger. Si la réponse est elliptique (« trois à cinq sprints »), faire préciser avant de
  corriger : « et tu le dis comment à Étienne ? ».

### Il me faut une date (16c, en rechange)
- **Explication** : rappel en une ligne : la prévision est une fourchette, pas une promesse.
- **Situation** : Étienne (propos d'exercice) : « Une fourchette ne m'aide pas : il me faut une
  date ferme. »
- **Question** : que proposes-tu à Étienne ?
- **Réponse attendue** : d'abord demander ce qui se passe à cette date : si rien n'en dépend,
  la fourchette suffit, revue à chaque sprint. Si une date compte vraiment, on la prend comme
  échéance et c'est le contenu qui varie : ce qui sera prêt à cette date dépend de l'ordre, et
  MoSCoW peut dire avec Étienne ce qui doit y être (13c) ; les Developers disent ce qui tient
  probablement avant. On ne fixe pas à la fois la date et tout le contenu (choix du cours).
  La date et ce qui doit y être, c'est Étienne qui les dit ; le PO ne les invente pas.
- **Erreurs fréquentes** :
  - donner la borne haute comme date ferme « pour être tranquille » : c'est toujours une
    promesse sur tout le contenu ; relancer : « qu'est-ce qui se passe à cette date ? » ;
  - répondre « en Scrum, on ne donne pas de date » et s'arrêter là : relancer « et alors, que
    proposes-tu à Étienne ? ».
- **Ce qui marche** : « qu'est-ce qui se passe à cette date ? ».

## Schéma

Deux dessins, chacun sur un cas inventé, distinct de ceux de la banque.

1. **La carte (16b1)**, sur la journée d'un technicien de maintenance : le montrer après la
   correction de 16b1, qui s'appuie sur 16a. En haut, une flèche de gauche à droite,
   « colonne vertébrale », sous laquelle quatre cartes côte à côte : « préparer la tournée »,
   « se rendre sur place », « confirmer la panne », « réparer ou retirer le vélo ». Dessous,
   sous chaque activité, des cartes « story » empilées, avec à gauche une flèche vers le bas
   légendée « l'indispensable ». Une ligne épaisse, « première version », traverse les quatre
   colonnes : au-dessus, une story par activité, sauf sous la troisième, où une case en
   pointillés porte « trou à explorer » ; dessous, deux rangées de stories de plus en plus
   pâles. La première version est le plus marqué.
2. **Pour quand ? (16c)** : une flèche horizontale, « sprints », et sur elle une barre épaisse,
   « fourchette », bornée par deux traits, avec au-dessus « prévision des Developers ». Sous la
   barre, deux cases, « l'ordre du backlog » et « une dépendance », chacune avec une flèche vers
   la barre.
