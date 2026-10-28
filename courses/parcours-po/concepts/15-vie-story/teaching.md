## Consignes

1. **15a refinement**, en deux messages, chacun avec sa question :
   - **15a1** le refinement et le mot flou (« Vélo en panne : qui le précise ? ») : activité
     continue, sans événement imposé ; on y précise, découpe, et les Developers estiment la
     taille. Le mot flou se fait préciser par l'utilisateur concerné de chaque story, au
     refinement ; chaque story dit le sens retenu. Le cours ne fixe aucun de ces sens. Rappel de
     7a2 : les mots que le fil rouge laisse non fixés, comme « heures de pointe », se précisent
     de même, avec ceux qui s'en servent, pas à leur place.
   - **15a2** pas de story « définir X » (« La story "définir le seuil" », exemple éprouvé) :
     une story « définir X » dont une autre dépend n'apporte rien seule ; X se précise au
     refinement avec l'utilisateur concerné, et on livre d'abord ce dont les règles sont
     connues.
2. **15b Sprint Planning et objectif de sprint** : les trois sujets ; le PO propose, l'équipe
   fixe l'objectif, les Developers choisissent avec le PO et font leur plan (« L'objectif de
   sprint de Diego »). En rechange, ou pour « exercice » : « La liste pour le blocage entre-t-elle
   au sprint ? » (ce qui entre : la DoR, concept 11b) ; « La story qui ne passe pas » (l'objectif
   reste quand une story ne passe pas). Ne pas enseigner l'estimation ni la vélocité. 15b
   suppose des sprints : à l'apprenant qui travaille sans sprint, proposer l'annexe A2b.
3. **15c revue de sprint** : l'incrément inspecté, ce qui a changé, le backlog adapté ; une
   demande née de la revue entre au backlog et s'ordonne (« La revue avec Étienne et Maud »).
   En rechange, ou si l'apprenant voit la revue comme une validation : « La revue en recette ».
   Aparté possible, si l'apprenant décrit la vie d'une story par les états de l'outil :
   « Tout est en "Fait" ». 15c suppose des sprints : à l'apprenant qui travaille sans sprint,
   proposer l'annexe A2c.

Déjà enseigné, à rappeler sans le réenseigner : responsabilités, événements, artefacts et
engagements, sprint et incrément (concept 0) ; le PO seul ordonne, qui veut changer l'ordre le
convainc (1b) ; objectif produit (2) ; backlog émergent, le haut précis et le bas vague (3a2) ;
découper un élément, la tâche aux Developers (4) ; le mot flou qui se fait préciser, la story
attend (7a2) ; V et I d'INVEST, les Developers estiment (7) ; la règle non fixée que le PO fait
fixer (8a2) ; tranche verticale et tâches de Dana (9) ; hors périmètre, la demande de Maud
entre au backlog à la revue, dépendance envers une autre équipe (10) ; DoD, DoR, élément prêt
à être choisi (11) ; définition d'un indicateur, signalements par téléphone absents (12) ;
ordonner (13) ; dire non, escalade (14). Pas encore enseignés, nommés avec renvoi : story map
et prévision « pour quand ? » (16), exploration d'une hypothèse (17), outil et états d'un
élément (annexe A1), travail sans sprint (annexe A2).

Cas de la banque : pour 15a2, « La story « définir le seuil » » ; pour 15c, « Tout est en « Fait » ».

## Faits du fil rouge utilisés

Théo, technicien de maintenance, prépare sa tournée de réparation
à partir des vélos signalés et confirme ou infirme sur place une panne signalée ; un vélo
signalé en panne reste louable ; un vélo n'est plus louable quand un technicien l'a retiré du
service après constat ; les signalements sont saisis par l'abonné dans l'appli, ceux par
téléphone n'y sont pas ; Étienne suit plusieurs vues, dont les vélos en panne ; Maud veut le
nombre de vélos en panne par semaine et fixe chaque semaine le nombre de techniciens en
tournée ; le blocage d'un vélo signalé se fait dans le système de location (DSI), la plateforme
peut lui fournir la liste des vélos signalés, la story de blocage dépend de la DSI ; la règle
« vélo disponible » (à quai et louable) ; le seuil « presque vide » n'est pas fixé (3 vélos
cité, pas décidé) ; la vue des stations vides sert à Étienne à envoyer les régulateurs plus tôt
vers les stations qui se vident ; DoD de l'équipe vélos (heure de la dernière mise à jour,
définition écrite de chaque indicateur publié) et DoR (critères écrits, règles métier fixées,
dépendances identifiées, accès obtenu) ; Developers : Dana, Diego (data engineers), Anna
(analyste) ; sprints de deux semaines. Les répliques de l'équipe, d'Étienne et de Maud, les
brouillons de stories et d'objectifs, le contenu des sprints et une part de pannes infirmées
sont des propositions d'exercice : ils ne deviennent pas des faits du fil rouge. Restent non
fixés, et aucun exemple ne les fixe : le sens de « en panne » pour chaque utilisateur, le seuil
« presque vide », la règle de blocage (dès le signalement ou non). Le prof ne demande jamais à
l'apprenant de fixer une règle ni de faire le travail des Developers (estimer, planifier les
tâches).

## Banque d'exemples

### Vélo en panne : qui le précise ? (15a1)
- **Explication** : le refinement précise et découpe les éléments du haut du backlog ; les
  Developers en estiment la taille. Le Scrum Guide en fait une activité continue, pas un
  événement : ni moment ni durée imposés. Il se fait en général avant le Sprint Planning. Ce
  n'est pas forcément une réunion de toute l'équipe : des conversations, parfois avec les
  parties prenantes (Verwijs et Overeem, choix d'école). Choix du cours : un mot flou se fait
  préciser par l'utilisateur concerné (rappel du concept 7a2).
- **Situation** : trois stories du haut du backlog parlent de vélos en panne : la vue des vélos
  en panne d'Étienne, le nombre de vélos en panne par semaine pour Maud, une évolution de la
  tournée de Théo (la tournée elle-même est livrée, concept 10). Un vélo est signalé par un abonné dans l'appli ;
  Théo confirme ou infirme la panne sur place. Au refinement, Anna, analyste : « En panne, c'est
  signalé : c'est ce qu'on a dans les données. On l'écrit pour les trois et on passe au
  planning. »
- **Question**, en deux parties : « Que réponds-tu à Anna : qui précise ce que veut dire « en
  panne » ? », puis « Quand le précise-t-on, et où l'écrit-on ? »
- **Réponse attendue** :
  1. Qui : ni Anna ni le PO ne le fixent. Chaque utilisateur concerné le précise pour sa
     story : Maud pour son indicateur, Étienne pour sa vue, Théo pour sa tournée. Nuance, non
     attendue, à apporter dans la correction : le sens peut différer d'une story à l'autre :
     chaque story dit le sien, sous un nom qui ne prête pas à confusion (par exemple « vélos
     signalés » ou « pannes confirmées »). Mais quand un même chiffre sert à plusieurs
     utilisateurs, ou à la mesure de l'objectif produit, le PO ne laisse pas deux définitions
     sous un même nom (concept 7a2). Nuances, non attendues : la tournée livrée part déjà des
     vélos signalés ; reste à voir avec Théo ce que son évolution fait, par exemple, d'un vélo
     dont il a infirmé la panne. Ce que la source contient ne dit pas ce dont l'utilisateur a
     besoin ; si un utilisateur retient les pannes constatées, les Developers diront si la
     donnée existe. Les signalements par téléphone manquent dans la source (concept 12b).
  2. Quand et où : au refinement, avant que la story soit choisie ; tant que le sens n'est pas
     précisé, la story attend (concepts 7a2 et 8a2). On l'écrit dans la règle ou les critères
     d'acceptation de chaque story, dès le refinement (concept 8) ; pour Maud, aussi dans la
     définition écrite de son indicateur, que la DoD exige (concept 12a).
- **Erreurs fréquentes** :
  - Partie 1, donner raison à Anna parce que « c'est ce qu'on a » : demander « Maud compte-t-elle
    les vélos signalés ou les vélos à réparer, et qui le sait ? » ;
  - Partie 1, trancher soi-même (« signalé, c'est plus simple ») : le PO fait préciser, il ne
    fixe pas ;
  - Partie 1, imposer d'office un seul sens aux trois stories, sans demander à chacun : demander
    « Maud, Étienne et Théo décident-ils la même chose avec ce mot ? » ;
  - Partie 2, tenir le refinement en réunion d'équipe, sans Maud, Étienne ni Théo : demander
    « qui, dans la pièce, sait ce que compte Maud ? » ;
  - Partie 2, proposer une story « définir "en panne" » : c'est l'objet de 15a2 ;
  - Partie 2, citer « 10 % de la capacité » pour le refinement : repère du Scrum Guide 2017,
    retiré en 2020 ;
  - Partie 2, réponse juste sans le « où » : demander « et alors, où l'écrit-on ? » ;
  - Partie 1 ou 2, réponse elliptique (« on demande à chacun ») : faire préciser avant de
    corriger (en partie 1 : qui, pour quelle story ; en partie 2 : quand, où).
- **Ce qui marche** : « qui se sert de ce chiffre, et pour décider quoi ? » : Maud fixe
  chaque semaine le nombre de techniciens en tournée ; Étienne pilote la flotte ; Théo prépare sa
  tournée. Trois décisions, peut-être trois sens.

### La story « définir le seuil » (15a2, exemple éprouvé)
- **Explication** : un mot ou une règle à préciser n'est pas une story : rien ne change pour
  l'utilisateur quand c'est fait. On le précise au refinement, avec l'utilisateur concerné.
  Rappel, sans le réenseigner : la règle non fixée, le PO la fait fixer (concept 8a2) ; la DoR
  de l'équipe vélos demande des règles métier fixées (concept 11b).
- **Situation** : Étienne demande de voir aussi les stations presque vides (demande d'exercice
  déjà vue en 8a2). Le seuil n'est pas fixé : 3 vélos a été cité, sans décision. Diego, data
  engineer, écrit deux stories :
  1. « Définir le seuil "presque vide". »
  2. « En tant que responsable d'exploitation, je veux voir les stations presque vides, afin
     d'envoyer les régulateurs plus tôt vers les stations qui se vident. » Elle dépend de la 1.
- **Question**, en deux parties : « Que penses-tu de la story 1, et que proposes-tu à la
  place ? », puis « Que livres-tu à Étienne en attendant ? »
- **Réponse attendue** :
  1. La story 1 : elle n'apporte rien seule : une fois finie, Étienne ne voit rien de plus (V
     d'INVEST), et la 2 en dépend (I, concept 7). Le seuil n'est pas du travail de sprint :
     c'est une règle métier que le PO fait fixer, au refinement, par l'utilisateur concerné,
     ici Étienne (concept 8a2) ; le cours n'en donne pas la valeur. La story 2 attend : sans
     seuil fixé, elle ne remplit pas la DoR. Nuance, non attendue : si Étienne a besoin de
     données pour fixer le seuil, une exploration bornée peut l'éclairer ; elle livre une
     réponse, pas le seuil, qu'Étienne fixe (concept 17).
  2. En attendant : on livre d'abord ce dont les règles sont connues : par exemple, les vélos
     disponibles de chaque station (règle fixée : à quai et louable).
- **Erreurs fréquentes** :
  - Partie 1, garder la story 1 « pour ne pas l'oublier » : demander « une fois finie, que peut
    faire Étienne de plus ? » ;
  - Partie 1, en faire une tâche des Developers : le seuil n'est pas un « comment », c'est une
    règle du domaine ;
  - Partie 1, proposer soi-même 3 vélos pour débloquer : renvoyer à 8a2, sans réexpliquer ;
  - Partie 1, « la story 1 n'a pas de valeur » et s'arrêter là : demander « et alors, on fait
    quoi ? » (où se précise le seuil).
- **Ce qui marche** : l'apprenant voit souvent seul que la story 1 n'apporte rien ; partir de
  là et montrer où va le travail : au refinement avec Étienne, et une story dont les règles sont
  connues en attendant.

### L'objectif de sprint de Diego (15b)
- **Explication** : le Sprint Planning traite trois sujets (Scrum Guide). Pourquoi : le PO
  propose comment le produit peut gagner en valeur, toute l'équipe fixe l'objectif de sprint.
  Quoi : les Developers choisissent les éléments en discutant avec le PO. Comment : les
  Developers font leur plan (les tâches de Dana, concept 9). L'objectif de sprint, engagement
  du backlog de sprint (concept 0a3), dit pourquoi le sprint a de la valeur et fait travailler
  l'équipe ensemble.
- **Situation** : situation d'exercice. Au Sprint Planning, trois stories prêtes sont en haut
  du backlog : la vue des vélos en panne d'Étienne, le nombre de vélos en panne par semaine pour
  Maud, une évolution de la tournée de Théo. Diego propose comme objectif de sprint : « Finir
  la vue d'Étienne, le nombre par semaine de Maud et la tournée de Théo. »
- **Question** : corrige cet objectif de sprint : qu'est-ce qui ne va pas, et que proposes-tu
  à l'équipe ?
- **Réponse attendue** : c'est une liste de stories, pas un objectif : il dit quoi, pas
  pourquoi le sprint a de la valeur ; il ne donne pas de cohérence, chacun finit « sa »
  story. Une proposition dit la valeur commune, par exemple : « Que la maintenance et
  l'exploitation voient les vélos en panne depuis la plateforme, pour organiser les
  réparations. » Le PO propose, toute l'équipe fixe l'objectif ; les Developers choisissent
  avec lui les stories qui le servent et font leur plan. Nuances, non attendues : un bon
  objectif laisse de la souplesse (si une story ne passe pas, il peut être atteint quand même,
  rechange « La story qui ne passe pas ») ; le PO prépare aussi le lien des stories avec
  l'objectif produit (Scrum Guide) ; l'objectif ne fixe pas le sens de « en panne », précisé
  au refinement (15a1).
- **Erreurs fréquentes** :
  - raccourcir la liste (« finir la vue et la tournée ») : demander « pourquoi ce sprint
    compte-t-il pour Étienne, Maud et Théo ? » ;
  - fixer l'objectif seul (« mon objectif ») : le PO propose, l'équipe le fixe ; relancer :
    « au Sprint Planning, qui propose l'objectif, et qui le fixe ? » ;
  - choisir les stories ou leur nombre à la place des Developers : ils choisissent, avec le
    PO, d'après leurs résultats passés, leur capacité et la DoD ; ne pas entrer dans
    l'estimation ni la vélocité ; relancer : « qui choisit les stories du sprint ? » ;
  - si l'apprenant dit que Scrum peut se passer d'objectif de sprint : c'est l'avis de Mike
    Cohn (choix d'école) ; le Scrum Guide en fait un engagement.
- **Ce qui marche** : demander « si une des trois stories ne passe pas, le sprint a-t-il
  échoué ? » : la liste dit oui, un objectif peut dire non.

### La liste pour le blocage entre-t-elle au sprint ? (15b, en rechange)
- **Explication** : au Sprint Planning, les Developers choisissent les éléments prêts ; une
  story qui ne remplit pas la DoR ne se choisit pas (concept 11b). Le PO propose, il n'impose
  pas.
- **Situation** : situation d'exercice. Une story fournit au système de location la liste des
  vélos signalés, pour le blocage ; le blocage lui-même se fait à la DSI. La règle n'est pas
  fixée : bloquer dès le signalement, et débloquer si Théo infirme la panne ? (concept 10a2).
  Maud, responsable maintenance, insiste : « Elle doit entrer dans ce sprint. »
- **Question**, en deux parties : « Que proposes-tu au Sprint Planning ? », puis « Que dis-tu
  à Maud ? »
- **Réponse attendue** :
  1. Au Sprint Planning : la story n'est pas prête : la règle de blocage n'est pas fixée, elle
     ne remplit pas la DoR (règles métier fixées). Le PO ne la propose pas pour ce sprint ;
     les Developers choisissent parmi les stories prêtes.
  2. À Maud : il dit pourquoi, et ce qu'il fait : il fait fixer la règle (concept 8a2) et suit
     la dépendance envers la DSI (concepts 10b et 13) ; la story garde sa place dans l'ordre
     (concept 13). Nuance : il ne tranche pas la règle pour la rendre prête.
- **Erreurs fréquentes** :
  - Partie 1, « on la prend, la règle se décidera pendant le sprint » : demander « que
    construisent les Developers lundi ? » ;
  - Partie 1 ou 2, trancher la règle soi-même : à faire fixer, pas à décider en planning.
- **Ce qui marche** : relire la DoR de l'équipe à voix haute, ligne par ligne, devant la story.

### La story qui ne passe pas (15b, en rechange)
- **Explication** : l'objectif de sprint est un engagement des Developers, mais il laisse de la
  souplesse sur le travail exact. Si le travail diffère de ce qu'ils attendaient, ils
  renégocient la portée avec le PO, sans toucher à l'objectif. Si l'objectif devient obsolète,
  seul le PO peut annuler le sprint (Scrum Guide).
- **Situation** : situation d'exercice. L'objectif fixé : « Que la maintenance et
  l'exploitation voient les vélos en panne depuis la plateforme, pour organiser les
  réparations. » En milieu de sprint, Anna découvre que le nombre par semaine de Maud
  demande un travail imprévu sur la source des signalements. Diego : « On change l'objectif de
  sprint, ou on annule le sprint ? »
- **Question** : que réponds-tu à Diego ?
- **Réponse attendue** : ni l'un ni l'autre. L'objectif reste : la vue d'Étienne et l'évolution
  de la tournée de Théo le servent encore. Les Developers et le PO renégocient la portée du
  backlog de sprint : le nombre de Maud peut sortir du sprint et revenir au backlog, où le PO
  l'ordonne. Annuler le sprint se fait seulement si l'objectif devient obsolète, et seul le PO
  le peut ; ce n'est pas le cas ici. Le PO prévient Maud.
- **Erreurs fréquentes** :
  - réécrire l'objectif pour qu'il colle au travail fait : l'objectif est l'engagement, la
    portée bouge autour ;
  - annuler pour « repartir propre » : demander « l'objectif a-t-il perdu son sens ? » ;
  - décider seul de ce qui sort : la portée se renégocie entre Developers et PO.
- **Ce qui marche** : séparer ce qui bouge (les stories du sprint) et ce qui tient (le
  pourquoi).

### La revue avec Étienne et Maud (15c)
- **Explication** : la revue de sprint inspecte ce que le sprint a produit et ce qui a changé ;
  l'équipe et les parties prenantes décident ensemble de la suite, et le backlog peut être
  ajusté. C'est une séance de travail (Scrum Guide). Rappel, sans le réenseigner : une demande
  née en revue entre au backlog et s'ordonne (concepts 10a2 et 13).
- **Situation** : situation d'exercice. L'incrément contient la vue des vélos en panne d'Étienne
  et l'évolution de la tournée de Théo. Dans cet exercice, la vue d'Étienne affiche les vélos
  signalés, sens retenu avec lui au refinement, et Théo a infirmé sur place environ une panne
  signalée sur trois pendant le sprint. En revue, Étienne : « Donc un tiers des vélos de ma vue
  roulent ? » Maud : « Il me faut les pannes confirmées par semaine. Vous me le faites au
  prochain sprint ? »
- **Question** : que fais-tu, en tant que PO, de ce que la revue vient de faire apparaître ?
- **Réponse attendue** : c'est le but de la revue : inspecter l'incrément et ce qui a changé
  (une part des signalements infirmée), et adapter le backlog. La demande de Maud entre au
  backlog comme un nouvel élément ; le PO l'ordonne face au reste (concept 13), et les
  Developers choisiront au Sprint Planning. Il ne la promet pas en séance, et ne la refuse pas.
  La remarque d'Étienne ne se tranche pas en séance : le sens de « en panne » pour sa vue se
  reprécise avec lui au refinement (15a1). Nuance, non attendue : compter les pannes confirmées
  suppose une donnée dont le fil rouge ne dit pas si elle existe ; les Developers le diront au
  refinement.
- **Erreurs fréquentes** :
  - promettre le prochain sprint : demander « qui décide de sa place, et qui choisit le travail
    du sprint ? » ;
  - décider en séance que la vue n'affichera que les pannes confirmées : à reprendre avec Étienne
    au refinement ;
  - « je note, on verra » sans dire où : demander « et alors, où va sa demande ? » ;
  - remercier et clore, comme après une présentation : la revue sert à décider de la suite.
- **Ce qui marche** : trois temps, au ton de PO : reconnaître ce que la revue a appris, dire où
  va chaque demande et qui la place, dire quand se reprécise le mot.

### La revue en recette (15c, en rechange)
- **Explication** : la revue n'est ni une démonstration à sens unique, ni une séance où le PO
  « accepte » le travail (Scrum.org, pratique établie) ; le cours en tire qu'elle n'est pas non
  plus une recette où une partie prenante valide (choix du cours). Fait se décide par la DoD,
  avant la revue ; une story qui ne la remplit pas n'est pas présentée et retourne au backlog,
  où le PO l'ordonne.
- **Situation** : situation d'exercice. Le nombre par semaine de Maud passe ses critères
  d'acceptation, mais sa définition écrite manque, alors que la DoD l'exige pour tout indicateur
  publié. Diego prépare la revue : « On le montre quand même, Maud le validera en séance : la
  revue servira de recette. »
- **Question** : que corriges-tu dans le plan de Diego ?
- **Réponse attendue** : deux points. Le nombre ne remplit pas la DoD : il n'est pas fait, il
  n'est pas présenté, il retourne au backlog (concept 0b). Et la revue n'est pas une
  validation : ce n'est pas la signature de Maud qui rend une story faite, c'est la DoD ; la
  revue sert à inspecter avec elle ce qui est fait et à décider de la suite. Nuance : un
  incrément peut être livré avant la revue ; la revue n'est pas une porte de mise en
  production.
- **Erreurs fréquentes** :
  - le montrer « en avant-première » : présenté en revue, il passe pour fait ; réexpliquer ;
  - garder la validation de Maud « pour être sûr » : la DoD et les critères disent quand
    c'est fait ; Maud dit ce qu'il faut ensuite ; relancer : « si Maud dit oui en séance,
    la définition écrite existe-t-elle pour autant ? » ;
  - ne relever qu'un des deux points : relancer sur l'autre.
- **Ce qui marche** : « si Maud dit oui en séance, la définition écrite existe-t-elle pour
  autant ? ».

### Tout est en « Fait » (aparté, 15c)
- **Explication** : les états d'un élément dans l'outil (à faire, en cours, fait) sont un choix
  d'équipe, configurable ; le Scrum Guide n'en fixe aucun. Détail : annexe A1.
- **Situation** : en fin de sprint (sans sprint : à la fin du cycle que l'équipe se donne),
  toutes les cartes du tableau de l'équipe sont dans la colonne « Fait ». Dana : « La vie de ces
  stories est finie. »
- **Question**, en deux parties : « Qu'est-ce que la colonne « Fait » te dit ? », puis « Que
  lui manque-t-il pour dire, comme Dana, que la vie de ces stories est finie ? »
- **Réponse attendue** :
  1. Ce que dit « Fait » : rien de sûr tant que « Fait » ne veut pas dire « DoD remplie » :
     l'outil ne connaît pas la DoD.
  2. Ce qui manque : la vie d'une story ne s'arrête pas à l'état : la revue (sans sprint, le
     moment d'inspection de A2c) l'inspecte avec les parties prenantes, et ce qu'on y apprend
     adapte le backlog.
- **Erreurs fréquentes** : Partie 2, prendre les états de l'outil pour les étapes de Scrum :
  demander « où, dans ces colonnes, sont le refinement et la revue ? ».
- **Ce qui marche** : demander à l'équipe ce que veut dire « Fait » chez elle.

## Schéma

Un cadre « Sprint Planning », avec trois questions empilées de haut en bas, reliées par des flèches dans l'ordre : pourquoi, quoi, comment. « Pourquoi » (l'objectif de sprint) est la plus marquée : cadre épais, fond plus soutenu, texte en gras. « Quoi » (les éléments) et « comment » (les tâches) sont plus discrètes. Le dessin ne montre ni le refinement ni la revue de sprint, et ne donne aucune explication : tout se dit à voix haute.
