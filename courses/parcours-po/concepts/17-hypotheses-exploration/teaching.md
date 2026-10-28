## Consignes

1. **17a savoir ou supposer** : une affirmation qu'on n'a pas vérifiée est une hypothèse ; les
   quatre risques de Cagan nommés, le cours en retient deux (valeur, faisabilité, données
   comprises) ; pour ranger une supposition, se demander ce qui arrive si elle est fausse (on
   ne sait pas le construire : faisabilité ; on le construit pour rien : valeur), et une même
   phrase peut cacher les deux, par exemple (cas inventé, hors banque) « on enverra un SMS de
   disponibilité, et les abonnés sans l'appli iront à une station où il reste des vélos »
   (la disponibilité vient de la plateforme, le canal de l'équipe appli) : elle suppose
   d'abord que le SMS arrive avec une disponibilité assez fraîche (faisabilité), puis que ces
   abonnés changeront d'itinéraire (valeur) ; la question type fait trier des affirmations (« Prévoir les stations à risque :
   on sait ou on suppose ? »). En rechange : « De quoi dépend la story de Régis ? ».
2. **17b explorer à moindre coût**, en deux messages :
   - **17b1** décider l'exploration avant : la question, la durée, ce qu'on décidera selon la
     réponse ; elle livre une réponse, pas une fonction ; elle s'ordonne au backlog ; le PO pose
     la question, les Developers explorent (« On verra ce qu'Anna trouve ») ;
   - **17b2** choisir la façon d'explorer selon l'hypothèse : analyse d'historique pour la
     faisabilité, prototype sur données réelles pour la valeur ; interroger l'utilisateur ne suffit pas (« Régis ira-t-il plus tôt ? »).
3. **17c accepter un résultat incertain** : une prévision se trompe parfois ; le critère porte
   sur un niveau atteint, mesuré sur l'historique, fixé après l'exploration par l'utilisateur
   concerné, qui pèse les deux sortes d'erreur ; le PO le fait fixer
   (« Le critère à 90 % »). En rechange : « Les chiffres d'Anna », puis, si l'apprenant parle
   du seuil « presque vide » ou pour « exercice », « Presque vide d'après l'historique ».

Un mot, deux sens : la « prévision des stations à risque » est une fonction du produit pour
Régis ; la prévision au sens du glossaire (ce que les Developers pensent livrer, et quand) est
celle du concept 16c. Le dire si l'apprenant les mêle.

Déjà enseigné, à rappeler sans le réenseigner : responsabilités, événements, artefacts (0) ; le
PO seul ordonne (1b) ; livrable et résultat, la mesure de résultat aux points non fixés (2) ;
backlog émergent (3a2) ; les « pourquoi ? » successifs (5b) ; la règle non fixée que le PO fait
fixer (8a2) ; la prévision des stations à risque découpée, le S de SPIDR, le spike nommé dans
SPIDR et renvoyé ici (9a, 9b) ; dépendances (10) ; DoR (11b) ; définition d'un indicateur,
qualité des données, fraîcheur (12) ; ordonner, le lien non établi d'une demande avec l'objectif
produit (13a, 13a2) ; dire non, escalade (14) ; refinement et ce que le PO prépare au Sprint Planning (15) ; la
première version, les deux sens du MVP et la prévision « pour quand ? » (16b, 16c).

## Faits du fil rouge utilisés

Régis, régulateur, conduit une camionnette et veut savoir quelles
stations vont se vider, pour y aller avant ; Étienne encadre les régulateurs et doit pouvoir les
envoyer plus tôt vers les stations qui se vident ; l'objectif produit (le moins longtemps
possible vides, au centre-ville, aux heures de pointe) et sa mesure de résultat ; les relevés
des stations (vélos à quai et, pour chacun, s'il est louable), rafraîchis toutes les 5 minutes,
historique d'environ un an ; relevés en double (concept 11) ; la météo (pluie, par heure) :
source envisagée, pas encore collectée ; le centre-ville, premier périmètre ; l'équipe vélos
(Dana, Diego, Anna, analyste). Non fixés, et qu'aucun exemple ne fixe : ce qu'est une station
vide, les heures de pointe, la cible et le calcul de la mesure de résultat, le seuil « presque
vide » (3 vélos cité, pas décidé). Ne sont pas fixés non plus : si la tendance de la dernière
heure suffit, si la pluie compte, si Régis ira plus tôt. Les répliques des Developers, la durée
de l'exploration, les résultats chiffrés d'Anna et le prototype de 17b2 sont des situations
d'exercice : ils ne deviennent pas des faits du fil rouge. Le prof ne demande jamais à
l'apprenant de fixer un seuil ou un niveau, ni de dire si une hypothèse est vraie.

## Banque d'exemples

### Prévoir les stations à risque : on sait ou on suppose ? (17a)
- **Explication** : une hypothèse, c'est ce qu'on tient pour vrai sans l'avoir vérifié (pour
  Scrum.org, l'objectif produit lui-même en est une, qu'on peut reformuler sans que ce soit un
  échec : choix d'école). Marty Cagan (choix d'école) nomme quatre grands risques : valeur,
  utilisabilité, faisabilité, viabilité. Le cours en retient deux : la **valeur** (l'utilisateur
  s'en servira-t-il, cela sert-il l'objectif produit ?) et la **faisabilité** (peut-on le
  construire, avec des données qui existent, assez bonnes et fraîches ? ce point sur les données
  est un choix du cours). Le reste de Cagan (il parle de product manager, il veut traiter ces
  risques avant de construire) va dans la correction, pas dans ce message. Si le message dépasse
  une quinzaine de lignes, le couper : l'explication, puis la situation et la question.
- **Situation** : la prochaine tranche pour Régis est la prévision des stations à risque
  (concept 9b). Fait du fil rouge, donné ici : la plateforme garde l'historique des relevés depuis son
  lancement, il y a environ un an. Au refinement, quatre phrases circulent :
  1. « La plateforme garde l'historique des relevés depuis environ un an. »
  2. « La tendance de la dernière heure suffit pour voir quelles stations vont se vider. »
  3. « Quand il pleut, les stations se vident autrement. »
  4. « Si Régis voit les stations à risque, il ira plus tôt, et elles resteront moins
     longtemps vides. »
- **Question** : range ces quatre phrases en « on sait » et « on suppose », en disant pour
  chaque supposition si elle porte sur la valeur ou sur la faisabilité.
- **Réponse attendue** : 1 se sait : c'est un fait des sources de données (on peut encore en
  vérifier la qualité, les relevés en double par exemple). 2 se suppose, faisabilité : personne
  n'a vérifié que la tendance prévoit assez tôt. 3 se suppose, faisabilité côté données, et plus
  que ça : la météo n'est pas collectée, on ne peut même pas le vérifier sur nos données
  aujourd'hui. 4 se suppose, valeur, et contient deux hypothèses : que Régis change sa tournée
  (comportement), et que cela réduit le temps vide (lien avec l'objectif produit, qui, pour
  Scrum.org, est lui-même une hypothèse). Suite, non attendue (la question ne demande que le
  tri), à apporter dans la correction : on ne tranche aucune des trois, on cherche comment les
  vérifier au moindre coût (17b). Nuance : 4 dépend aussi de ce qu'est une station vide et des
  heures de pointe, non fixés (règles à faire fixer, concept 8a2).
- **Erreurs fréquentes** :
  - ranger 2 en « on sait » parce que « c'est ce que fait n'importe quel modèle » : demander
    « qui l'a vérifié, sur quelles données ? » ;
  - trancher 3 (« évidemment, la pluie compte ») : c'est plausible, et c'est encore une
    supposition ; le PO ne la tranche pas, il la fait vérifier ;
  - voir dans 4 une seule hypothèse : demander « et si Régis y va plus tôt, est-on sûr que la
    mesure de résultat baisse ? » ;
  - réponse juste sans la suite (le tri seul) : elle est juste, apporter la suite dans la
    correction ; réponse elliptique (« 1 sait, le reste non ») : faire préciser le risque de
    chacune avant de corriger.
- **Ce qui marche** : pour chaque phrase, « qui l'a vérifié, et comment ? » ; si personne,
  c'est une hypothèse. Puis, pour ranger : « si c'est faux, on ne sait pas le construire
  (faisabilité), ou on le construit pour rien (valeur) ? ».

### De quoi dépend la story de Régis ? (17a, en rechange)
- **Explication** : à poser après une réponse fausse ou pour « exercice », sans rappeler les
  deux risques : la question les fait retrouver.
- **Situation** : la story est écrite : « En tant que régulateur, je veux voir les stations du
  centre-ville qui vont se vider, afin d'y aller avant qu'elles soient vides. » Diego : « Elle
  est claire, on peut la prendre. »
- **Question** : de quoi cette story suppose-t-elle la vérité pour apporter quelque chose,
  que personne n'a encore vérifié ?
- **Réponse attendue** : la story peut être claire et reposer sur des suppositions. Valeur :
  que Régis ait le temps d'y aller et change sa tournée ; que des stations moins longtemps vides
  en résultent (objectif produit). Faisabilité : qu'on sache prévoir assez tôt avec les données
  qu'on a (les relevés ; la pluie, non collectée). Suite : nommer ces hypothèses avant le
  Sprint Planning (concept 15), et proposer de vérifier celle qui pèse le plus (17b). Clarté
  et prête ne veulent pas dire vérifiée.
- **Erreurs fréquentes** :
  - répondre sur la forme de la story (« il manque des critères ») : juste, mais la question
    porte sur ce qu'elle suppose ;
  - ne voir que la technique : demander « et si la prévision est parfaite, que fait Régis ? ».
- **Ce qui marche** : « si on la livre demain et qu'elle ne sert à rien, quelle phrase était
  fausse ? ».

### On verra ce qu'Anna trouve (17b1)
- **Explication** : une exploration bornée (spike, venu d'XP) répond à une question dans un
  temps fixé ; elle livre une réponse, pas une fonction, et ce qu'elle produit se jette souvent.
  Elle se décide avant, sur trois points (choix du cours) : la question, la durée, ce qu'on
  décidera selon la réponse, y compris ce qui compte comme « oui ». Teresa Torres (choix
  d'école) le dit ainsi : si toutes les réponses mènent à la même décision, inutile d'explorer.
  Le temps fixé borne le coût ; au terme, on décide, parfois d'explorer encore. Mise au backlog
  produit (certaines équipes la gardent plutôt dans un autre élément, choix d'école), elle
  s'ordonne comme le reste (concept 13) ; Mike Cohn compte aussi parmi les facteurs d'ordre
  l'apprentissage, ce que l'équipe apprend en faisant l'élément. Le PO pose la question ; les
  Developers explorent.
- **Situation** : pour la prévision des stations à risque, Diego propose : « Anna n'a qu'à
  fouiller l'historique des relevés, on verra ce qu'elle trouve. »
- **Question** : que manque-t-il à la proposition de Diego pour en faire une exploration
  bornée, et que proposes-tu ?
- **Réponse attendue** : il manque les trois points. La question : par exemple « sur
  l'historique d'environ un an, la tendance de la dernière heure repère-t-elle à l'avance les
  stations du centre-ville qui se sont vidées ? ». La durée : fixée avec Anna avant de commencer
  (dans cet exercice, deux jours) ; c'est elle qui dit ce qu'il lui faut, le PO ne l'estime pas.
  Ce qu'on décidera : si oui, on construit la prévision par la tendance (morceau c du concept
  9b) ; si non, on cherche d'autres données ou on revoit la tranche ; dans les deux cas, on ne
  livre pas l'exploration à Régis. Ce qui compte comme « oui » (combien de stations repérées,
  avec combien d'avance) se dit aussi avant : c'est le seuil qui juge l'exploration ; le PO ne
  le chiffre pas, il le fait dire par Étienne et Régis (« combien d'avance vous faut-il, pour
  combien de stations, pour que ça vaille la peine ? »), comme toute règle métier (8a2). Il ne
  se confond pas avec le niveau exigé de la fonction livrée, fixé après (17c). Nuances : « se
  vider » suppose ce qu'est une station vide, non fixé (règle à faire fixer, 8a2) ; Anna peut le
  noter comme limite de sa réponse. La pluie ne s'explore pas sur nos relevés : la météo n'est
  pas collectée ; savoir s'il existe un historique météo est une question à poser, pas une
  hypothèse à trancher.
- **Erreurs fréquentes** :
  - proposer de faire l'exploration soi-même (« je sais faire une requête ») : la tentation d'un
    profil data ; le PO pose la question, Anna explore ;
  - « si oui, on construit » sans dire ce qu'est un « oui » : demander « oui à partir de quoi,
    et qui le sait ? » ; si l'apprenant chiffre lui-même le seuil, lui faire dire qui le fixe ;
  - fixer la durée seul (« deux jours, ça suffit ») : la durée se décide avec qui explore ;
  - attendre de l'exploration une fonction (« et à la fin, Régis a sa prévision ») : elle livre
    une réponse ; la fonction est une autre story ;
  - écrire la question sans la décision : demander « et si la réponse est non, que fais-tu ? » ;
  - réponse elliptique (« il faut la borner ») : faire dire quoi borner, et comment.
- **Ce qui marche** : faire écrire en trois lignes « question / durée / si oui, si non » ; si
  les deux branches donnent la même suite, montrer que l'exploration ne sert à rien.

### Régis ira-t-il plus tôt ? (17b2)
- **Explication** : on choisit la façon d'explorer selon l'hypothèse, en pesant ce qu'elle
  coûte et ce qu'elle apprend (référentiel CSPO). Une analyse d'historique répond à une question de
  faisabilité sur des données qu'on a déjà. Pour la valeur, Cagan (choix d'école) distingue plusieurs
  prototypes, dont la maquette montrée à l'utilisateur, qui ne prouve pas qu'on s'en servira (on dit une chose et on en fait une autre),
  et le prototype sur données réelles, utilisé pour de vrai par de vrais utilisateurs, qui
  montre si l'idée marche. Le MVP au sens de Ries est une autre manière d'apprendre au moindre
  coût (concept 16b).
- **Situation** : Anna a commencé son exploration de l'historique. Dana : « Pour savoir si
  Régis ira plus tôt, Anna n'a qu'à regarder aussi dans l'historique. » Diego : « Demandons-lui
  simplement s'il s'en servirait. »
- **Question**, en deux parties : « L'historique ou la question à Régis disent-ils si Régis ira
  plus tôt ? », puis « Que proposes-tu pour le savoir ? »
- **Réponse attendue** :
  1. L'historique, la question : non, ni l'un ni l'autre ne suffit. L'historique montre les
     vélos, pas ce que Régis ferait avec une prévision qu'il n'a jamais eue. La question à
     Régis apprend quelque chose (ce qu'il en attend, ce qui l'en empêcherait), mais un « oui »
     ne prouve pas qu'il changera sa tournée.
  2. Proposition : un prototype sur les vrais relevés, simple et jetable (dans cet exercice,
     une liste des stations à risque calculée par la tendance, envoyée à Régis pendant
     quelques jours), et regarder ce qu'il en fait, avec Étienne qui envoie les régulateurs.
     C'est le PO qui pose la question et organise l'essai avec Étienne et Régis ; les
     Developers construisent le prototype. Nuance : ce prototype suppose que la tendance donne
     quelque chose (17b1) ; on peut attendre la réponse d'Anna, ou accepter qu'il se trompe et
     observer quand même le comportement de Régis. Ce prototype n'est pas le morceau c du
     concept 9b : il ne remplit pas la DoD et se jette ; il sert à savoir si le morceau c vaut
     d'être construit. L'exploration de 17b1 ne se livre pas à Régis ; le prototype, lui, est
     fait pour qu'il s'en serve quelques jours.
- **Erreurs fréquentes** :
  - Partie 1, « Régis a dit oui, donc c'est vérifié » : demander « et s'il dit oui puis ne s'en
    sert pas ? » ;
  - Partie 1, décider soi-même que Régis ira plus tôt (« c'est son métier ») : c'est la valeur
    supposée, à vérifier ;
  - Partie 1, « l'historique le dira » : demander « l'historique montre-t-il ce que Régis
    ferait avec une prévision qu'il n'a jamais eue ? » ;
  - Partie 2, « je fais la requête moi-même » (profil data) : rappeler que le PO pose la
    question, les Developers explorent (17b1) ;
  - Partie 2, construire la prévision complète pour voir : la façon la plus chère d'apprendre ;
  - Partie 2, s'arrêter à « il faut tester avec lui » : demander « comment, et qui fait
    quoi ? ».
- **Ce qui marche** : « qu'est-ce qui te montrerait, sans le lui demander, que Régis va plus
  tôt aux stations ? ».

### Le critère à 90 % (17c)
- **Explication** : une prévision n'est jamais sûre ; une story qui l'exige ne se finit jamais.
  Le critère d'acceptation porte donc sur un niveau atteint, mesuré sur des données mises de
  côté : une pratique établie en analyse de
  données (CRISP-DM, Google), hors Scrum. Ce niveau se fixe après l'exploration qui montre ce
  qu'on peut atteindre, pas avant (choix du cours). Il se fait fixer par l'utilisateur
  concerné, qui pèse deux erreurs : une fausse alerte et un cas manqué. Le PO le fait fixer, il ne le tranche pas. À ne pas confondre avec ce
  qui comptait comme « oui » pour l'exploration, dit avant par l'utilisateur concerné pour savoir si on continue (17b1).
- **Situation** : avant toute exploration, Dana propose pour la story de Régis ce critère :
  « Then la prévision annonce au moins 90 % des stations qui vont se vider. » Elle ajoute :
  « 90 %, c'est le standard. »
- **Question** : qu'est-ce qui ne va pas dans ce critère, et que proposes-tu à la place ?
- **Réponse attendue** : trois défauts. Le niveau est fixé avant de savoir ce qu'on peut
  atteindre : 90 % est peut-être inatteignable, ou trop modeste. Personne de concerné ne l'a
  fixé : « le standard » n'est pas une décision, comme le seuil « presque vide » de Dana (concept
  8a2). Il ne compte qu'une erreur : on atteint 90 % en annonçant toutes les stations, au prix
  de camionnettes envoyées pour rien ; il faut aussi les fausses alertes. Proposition : un
  critère de la forme « rejouée sur une part de l'historique mise de côté, la prévision repère à
  l'avance au moins N stations vides sur 10, avec au plus M fausses alertes », N et M fixés par
  Étienne et Régis après l'exploration d'Anna, qui montre ce qu'on peut atteindre. Nuances : «
  vont se vider » ne se teste pas tel quel (sur quoi le mesure-t-on ?), d'où la forme rejouée
  sur l'historique ; « station vide » et le temps d'avance utile sont aussi à faire fixer ; le
  PO apporte le compromis, il ne choisit pas N et M.
- **Erreurs fréquentes** :
  - corriger le chiffre (« plutôt 80 % ») : le PO tranche alors un niveau ; demander « qui paie
    une erreur de la prévision ? » ;
  - exiger « la prévision ne se trompe pas » : une prévision se trompe parfois, la story ne se
    finirait jamais ;
  - ne voir que les stations manquées : demander « et si la prévision annonce toutes les
    stations, le critère passe-t-il ? » ;
  - réponse elliptique (« 90 % sorti de nulle part ») : faire dire ce qu'on met à la place, et
    qui le fixe.
- **Ce qui marche** : « une camionnette envoyée pour rien, une station vide manquée : qui sait
  laquelle coûte le plus ? ». Puis l'image d'une balance : la fausse alerte sur un plateau, le
  cas manqué sur l'autre.

### Les chiffres d'Anna (17c, en rechange)
- **Explication** : à poser après « Le critère à 90 % » si l'apprenant a besoin d'un cas
  chiffré, ou pour « exercice ».
- **Situation** : dans cet exercice, Anna revient de son exploration avec deux réglages
  possibles, mesurés sur une part de l'historique : le premier repère 6 stations vides sur 10,
  avec 1 fausse alerte pour 5 alertes ; le second en repère 9 sur 10, avec 1 fausse alerte sur
  2. Dana : « Prenons le second, il en rate moins. »
- **Question** : que fais-tu de ces chiffres avant le Sprint Planning ?
- **Réponse attendue** : le PO ne choisit pas : il porte le compromis à Étienne et Régis, dans
  leurs mots (« avec le second, une tournée sur deux pour rien ; avec le premier, 4 stations
  vides sur 10 que vous ne verrez pas venir »), et leur fait fixer le niveau, qui devient le
  critère d'acceptation. Dana a raison sur un point : le second en rate moins ; mais il envoie
  plus souvent la camionnette pour rien, et c'est à Étienne et Régis de peser. Nuance : un niveau
  entre les deux réglages est peut-être possible, à demander à Anna ; aucun ne fixe ce qu'est
  une station vide, toujours à faire fixer.
- **Erreurs fréquentes** :
  - choisir à la place d'Étienne (« le premier, les camionnettes coûtent cher ») : demander
    « qui le sait ? » ;
  - lire « 9 sur 10 » comme « juste 9 fois sur 10 » : ce n'est qu'un des deux chiffres.
- **Ce qui marche** : faire traduire chaque réglage en une journée de Régis.

### Presque vide d'après l'historique (17c, en rechange)
- **Explication** : cette logique vaut pour toute règle métier non fixée : une donnée ou une exploration l'éclaire, l'utilisateur concerné la fixe. Le cours n'en donne pas la valeur.
- **Situation** : dans cet exercice, Anna a vu dans l'historique qu'une station du centre-ville
  qui descend à 3 vélos se vide souvent dans l'heure. Dana : « Voilà, c'est prouvé : presque
  vide, c'est 3 vélos. »
- **Question** : que réponds-tu à Dana, et que fais-tu des chiffres d'Anna ?
- **Réponse attendue** : l'exploration ne fixe pas le seuil, elle l'éclaire : elle montre ce qui
  se passe à 3 vélos, et peut montrer ce qui se passe à 2 ou à 4. Le seuil reste une règle
  métier qu'Étienne fixe, en pesant ce qu'il en fera (envoyer plus tôt, au risque de déplacements
  inutiles) ; le PO lui porte les chiffres et fait fixer la règle (concept 8a2). Et « souvent »
  dans l'heure se fait préciser : combien de fois sur combien ?
- **Erreurs fréquentes** :
  - « 3 vélos, c'est prouvé » : une donnée dit ce qui se passe, pas ce qu'on décide d'en faire ;
    demander « l'exploration d'Anna fixe-t-elle le seuil, ou l'éclaire-t-elle ? », puis « qui
    envoie la camionnette, et qui en paie le coût ? » ;
  - garder les chiffres pour soi et proposer un autre seuil (« plutôt 4 vélos ») : le PO
    tranche alors la règle ; demander « qui la fixe ? ».
- **Ce qui marche** : « l'historique te dit ce qui arrive ; qui te dit ce qu'on en fait ? ».

## Schéma

**17a, savoir ou supposer (aucun schéma déclaré).** Deux colonnes, « on sait » et « on suppose » ;
la colonne de droite coupée en deux bacs, « valeur » (l'utilisateur s'en servira-t-il ? cela sert-il
l'objectif produit ?) et « faisabilité » (peut-on le construire ? avec quelles données ?). Des
affirmations posées en cartes (cas inventé : « la livraison arrive toujours le mardi »). Légende :
« qui l'a vérifié ? ».
**17b1, l'exploration bornée (exploration-bornee.svg).** À gauche, « le PO pose la question » avec
une flèche vers une grande boîte, « les Developers explorent », seule marquée du dessin. Sous la
boîte, une accolade de la même largeur, « durée fixée avant ». À droite, une flèche vers « une
réponse », puis vers « décision dite d'avance ». Légende : « une réponse, pas une fonction ».
**17c, accepter un résultat incertain (deux-seuils.svg, puis une balance sans schéma déclaré).**
Une flèche du temps, avec au milieu un rectangle « exploration ». Avant lui, une barre pâle,
« seuil qui juge l'exploration, fixé avant ». Après lui, une barre pleine, la plus marquée,
« niveau exigé de la fonction livrée, fixé après ». Puis, pour les deux erreurs : une balance ;
sur un plateau, « fausse alerte », sur l'autre, « cas manqué » ; sous la balance, l'utilisateur
concerné qui fixe le niveau. Légende : « l'exploration montre ce qu'on peut atteindre,
l'utilisateur fixe ce qu'il exige ».
