## Consignes

1. **9a tranche verticale**, en deux messages, chacun avec sa question :
   - **9a1** La tranche qui sert seule (« Redécouper “quelles stations vont se vider ?” ») :
     d'abord l'origine des mots, puis l'image des couches. Les couches s'empilent à
     l'horizontale. Une tranche horizontale est une couche entière ; une tranche verticale
     coupe toutes les couches de haut en bas. Parts nommées « tranche 1, 2, 3 », jamais
     « story ». Dire en une ligne qu'au niveau du sprint une tranche est une story, et que le
     vertical s'arrête là : ce que deviennent ses tâches, 9a2 le fait trouver (ne pas le dire
     ici). En rechange, ou si l'apprenant croit
     qu'il suffit de traverser les couches : « Le compteur de relevés ingérés ».
   - **9a2** Où s'arrête le vertical (« Les tâches de Dana ») : « tranche » est une façon de
     découper, pas un niveau. Un epic se découpe en stories verticales ; au niveau du sprint,
     une tranche est une story, et le vertical s'arrête là : le plan des Developers relève du
     concept 4 (renvoi, sans le réenseigner). Après une réponse fausse : « Les tâches de la
     story d'Abba ».
2. **9b patrons de découpage**, en deux messages, une question par message :
   - **9b1** Couche ou tranche (« Prévoir les stations à risque : laquelle est une couche ? ») :
     un besoin trop gros pour un sprint est un epic (concept 4), et il se découpe ici ; chaque
     morceau passe le même test qu'en 9a.
   - **9b2** Les patrons et leur catalogue (« Prévoir les stations à risque : quel patron ? ») :
     SPIDR (Cohn) et les patrons de Lawrence, choix d'école ; le S de SPIDR (spike) en une
     ligne, renvoi au concept 17. Le morceau a sert d'exemple résolu ; la question porte sur c
     seul.

## Faits du fil rouge utilisés

Régis, régulateur, veut savoir quelles stations vont se vider,
pour y aller avant ; les relevés des stations (nombre de vélos à quai et, pour chacun, s'il est
louable), rafraîchis toutes les 5 minutes, historique d'environ un an ; le centre-ville, premier
périmètre ; la météo (pluie, par heure) : source envisagée, pas encore collectée ; la vue des
stations vides d'Étienne (concepts 0 et 2) ; la plateforme collecte déjà les relevés dans
l'entrepôt (l'ingestion des relevés existe) ; l'équipe vélos (Dana, Diego, Anna). Ne sont pas
fixés : ce qu'est une station vide (vélos à quai ou disponibles), le seuil « presque vide » (3
vélos cité, pas décidé), les heures de pointe. Aucun exemple ne les fixe ; une réponse qui
s'appuie sur l'un d'eux le nomme comme règle à faire fixer (concept 8a2). Si la tendance de la
dernière heure suffit et si la pluie compte : non tranché, c'est le concept 17. Les découpages
proposés par l'équipe, les tâches de Dana et le compteur de Diego sont des propositions
d'exercice : ils ne deviennent pas des faits du fil rouge.

## Banque d'exemples

### Redécouper « quelles stations vont se vider ? » (9a1)
- **Explication** : d'abord l'origine des mots. Les couches d'un produit data s'empilent à
  l'horizontale (ingestion en bas, restitution en haut). Une
  tranche horizontale est une couche entière ; elle ne sert pas seule. Une tranche verticale
  coupe toutes les couches de haut en bas, comme une part de gâteau (métaphore qu'on trouve chez
  Wake) : un peu de chaque couche, et l'utilisateur s'en sert. Les parts se nomment « tranche
  1, 2, 3 ». Au niveau du sprint, une tranche est une story, et le vertical s'arrête là (la suite en
  9a2, sans dire ici ce que deviennent les tâches).
- **Situation** : Régis, régulateur, veut savoir quelles stations vont se vider, pour y
  apporter des vélos avant. L'équipe propose : 1. préparer l'historique des relevés (déjà
  collectés) pour l'entraînement ; 2. entraîner un modèle de prévision ; 3. afficher la carte
  des stations à risque.
- **Question** : quelle première tranche verticale proposes-tu, pour que Régis s'en serve dès le
  lendemain ?
- **Réponse attendue** : le découpage de l'équipe est horizontal : trois couches, rien pour
  Régis avant la fin. Première tranche : l'état actuel des stations vides, sans modèle (un peu
  de chaque couche : lecture des relevés déjà collectés, calcul simple, restitution) ; Régis
  voit où aller maintenant. Ensuite, la prévision des stations à risque, qui se découpe à son
  tour (9b). Nuances : la tranche 1 ne répond qu'en partie au besoin (Régis arrive après que
  la station s'est vidée) ; elle sert seule quand même. Ce qu'est une station vide (vélos à
  quai ou disponibles) n'est pas fixé : c'est une règle à faire fixer, la story attend sur ce
  point (concept 8a2). La forme (carte, liste) reste aux Developers : la story dit ce que Régis obtient (concepts 5 et 7b). Si l'apprenant
  rappelle que la vue des stations vides d'Étienne existe déjà : c'est juste ; la première
  tranche pour Régis est alors l'accès à cet état, et la tranche suivante est la prévision.
- **Erreurs fréquentes** :
  - redécouper en couches plus fines (« d'abord tout l'historique préparé, puis… ») :
    demander « si on s'arrête après la tranche 1, qu'a Régis ? » ;
  - garder la prévision dans la tranche 1, sans modèle (« la carte des stations qui vont se
    vider, avec juste les données brutes ») : confondre tranche fine et prévision au rabais ;
    dire ce qui est juste (une tranche fine, sans modèle), puis demander « avec seulement les
    relevés bruts, que verrait Régis demain matin ? » ;
  - écrire « afficher la carte » dans la tranche : la forme est une solution (concept 7b) ;
  - fixer soi-même « vide = 0 vélo à quai », ou ajouter les stations presque vides avec un seuil
    de 3 vélos : règles non fixées, renvoi au concept 8a2 sans le réexpliquer ;
  - objecter que les relevés sont déjà collectés : c'est juste, et c'est pourquoi la couche 1
    de l'équipe prépare l'historique pour le modèle au lieu de l'ingérer ; le découpage reste
    horizontal ;
  - réponse juste sans la suite (« l'état actuel ») : demander « pourquoi celle-là d'abord ? »
    puis « et après ? ». Réponse elliptique : la faire préciser avant de corriger.
- **Ce qui marche** : le test rapide à voix haute, tranche par tranche (« si on s'arrête là,
  Régis s'en sert-il demain matin ? »), et l'image du gâteau, parts nommées « tranche 1, 2, 3 ».

### Le compteur de relevés ingérés (9a1, rechange)
- **Explication** : à poser après 9a1, sans rappeler la règle ; la question la fait trouver.
- **Situation** : pour la prévision des stations à risque, Diego, data engineer, propose une
  première tranche : « afficher le nombre de relevés ingérés par heure », un suivi de
  l'ingestion qui existe déjà. Elle touche toutes les couches : les relevés de l'entrepôt, un
  calcul, un affichage.
- **Question** : Régis s'en sert-il, et pour décider quoi ?
- **Réponse attendue** : Régis ne s'en sert pas : il n'en tire rien pour choisir où aller.
  Ce n'est donc pas une tranche verticale au sens du cours : elle traverse les couches, mais ne
  sert pas seule. Elle sert l'équipe (vérifier que le chemin marche de bout en bout).
  Nuance : c'est proche de ce qu'Alistair Cockburn appelle un walking skeleton, une toute
  petite implémentation de bout en bout qui relie les composants de l'architecture ; utile à
  l'équipe, mais distinct d'une tranche verticale. Si l'équipe en a besoin, c'est du travail
  des Developers dans une story, pas une story de Régis.
- **Erreurs fréquentes** :
  - « c'est une tranche verticale, elle passe par toutes les couches » : redemander « Régis
    s'en sert-il ? » ;
  - rejeter tout travail de bout en bout : il a sa place, comme tâche d'une story qui sert.
- **Ce qui marche** : demander « qui s'en sert, et pour décider quoi ? ».

### Les tâches de Dana (9a2)
- **Explication** : « tranche » est une façon de découper, pas un niveau. Un epic se découpe
  en stories verticales ; au niveau du sprint, une tranche est une story. Ne pas dire ici ce
  que deviennent les tâches : la question le fait trouver.
- **Situation** : la première tranche de Régis (l'état actuel des stations vides) devient une
  story. Au Sprint Planning (concept 0 ; détail au concept 15b), Dana, data engineer, la découpe en trois tâches :
  « lire l'état courant dans l'entrepôt », « calculer les stations vides », « restituer le
  résultat à Régis ». Anna dit : « On refait un découpage horizontal. »
- **Question** : Anna a-t-elle raison ? Pourquoi ?
- **Réponse attendue** : non. Ce sont des tâches, pas des stories : le vertical s'arrête à la
  story ; ses tâches, souvent une par couche, sont un découpage technique normal, le plan des
  Developers, dans le backlog de sprint (concept 4). La story, elle, reste verticale : elle
  sert seule à Régis. Le PO juge la story sur ses critères d'acceptation, pas sur ses tâches.
  Nuance : « calculer les stations vides » suppose que la règle « station vide » est fixée ;
  sinon la story n'était pas prête à être choisie (3a2, 8a2 ; l'équipe l'écrit dans sa
  Definition of Ready, concept 11).
- **Erreurs fréquentes** :
  - donner raison à Anna, parce que « chaque découpage doit être vertical » : demander « à quel
    niveau Régis se sert-il de quelque chose : la story ou la tâche ? » ;
  - vouloir que le PO écrive ou valide les tâches : elles appartiennent au plan des Developers
    (concept 4) ;
  - réponse juste sans le pourquoi (« non, c'est normal ») : demander « pourquoi ? ».
- **Ce qui marche** : dans la correction, pas avant la question (il donnerait la réponse) :
  l'image de la tranche 1 coupée en lamelles horizontales : ses tâches.

### Les tâches de la story d'Abba (9a2, rechange)
- **Explication** : pour réexpliquer après une réponse fausse à « Les tâches de Dana » : le test
  « l'utilisateur s'en sert-il si on s'arrête là ? » s'applique à ce qu'on lui livre, la story ;
  les tâches ne sont jamais livrées seules.
- **Situation** : la story d'Abba (concept 8) : connaître le nombre de vélos disponibles à sa
  station favorite. Diego la découpe en trois tâches : « lire les relevés de la station »,
  « compter les vélos à quai et louables », « transmettre le chiffre à l'équipe appli ».
- **Question** : faut-il que chacune de ces trois tâches serve seule à Abba ? Pourquoi ?
- **Réponse attendue** : non. Abba se sert de la story livrée, pas d'une tâche : les tâches
  sont le plan des Developers pour finir la story (concept 4), souvent une par couche. Seule la
  story doit servir seule.
- **Erreurs fréquentes** : « oui, sinon c'est horizontal » : demander « Abba verra-t-elle un
  jour la tâche « lire les relevés » toute seule ? ».
- **Ce qui marche** : opposer ce qu'Abba reçoit (le nombre de vélos disponibles) et ce que
  l'équipe fait pour le produire (les trois tâches).

### Prévoir les stations à risque : laquelle est une couche ? (9b1)
- **Explication** : un besoin trop gros pour un sprint est un epic (concept 4), et il se
  découpe ici. Chaque
  morceau passe le même test qu'en 9a : sert-il seul à l'utilisateur ?
- **Situation** : tranche suivante pour Régis, « prévoir les stations à risque ». Les Developers
  (Dana, Diego, Anna) l'estiment trop grosse pour un sprint et proposent trois morceaux :
  a) la prévision pour le centre-ville seulement ;
  b) la collecte des données météo ;
  c) une prévision par la tendance de la dernière heure, avant tout modèle.
- **Question** : lequel de ces morceaux n'est pas une tranche verticale ?
- **Réponse attendue** : b. Collecter la météo est une couche : une source de plus, rien pour
  Régis. La météo est une source envisagée, pas encore collectée. Version verticale : « une
  prévision ajustée quand il pleut » (collecte, calcul, restitution : Régis voit une prévision
  qui tient compte de la pluie). a et c sont verticales : chacune traverse les couches et livre
  à Régis une prévision qu'il peut consulter ; son utilité reste une hypothèse à vérifier.
  Nuance : savoir si la tendance de la dernière heure suffit, et si la pluie
  change vraiment les départs, n'est pas tranché ici ; on le vérifie avant de s'engager,
  par une exploration bornée (un travail court, limité dans le temps, qui répond à une question
  sans livrer de fonction ; concept 17).
- **Erreurs fréquentes** :
  - désigner a, « parce que ce n'est qu'une partie des stations » : un périmètre réduit reste
    vertical s'il sert seul ; relancer : « si on livre seulement a, que voit Régis ? » ;
  - désigner c, « parce qu'il n'y a pas de modèle » : le modèle est un moyen, pas la valeur ;
    relancer : « si on livre seulement c, que voit Régis ? » ;
  - trancher que la pluie compte ou non : c'est une hypothèse, concept 17 ;
  - réponse elliptique (« b ») : faire dire pourquoi avant de corriger, puis demander « et
    alors, que fais-tu de b ? ».
- **Ce qui marche** : demander, morceau par morceau, « si on livre seulement celui-là, que voit
  Régis ? ».

### Prévoir les stations à risque : quel patron ? (9b2)
- **Explication** : des catalogues de patrons aident à trouver un découpage. Choix d'école,
  chacun à son auteur, posés côte à côte :
  - **SPIDR** (Mike Cohn), cinq lettres : Spike (exploration bornée : un travail limité dans le
    temps qui répond à une question, sans livrer de fonction ; concept 17), Paths, Interfaces,
    Data (une partie des données d'abord), Rules (assouplir d'abord une règle) ;
  - **Richard Lawrence** (neuf patrons, 2009), dont Variations in Data (une variante des
    données d'abord) et Simple/Complex (« quelle est la version la plus simple ? », les
    variantes en stories à part).
  Exemple résolu : le morceau a (le centre-ville d'abord) restreint les données : le D de
  SPIDR, ou Variations in Data chez Lawrence, même idée sous deux noms.
- **Réserve, sur demande** : les autres lettres de SPIDR (Paths : un chemin de l'utilisateur à
  la fois ; Interfaces : une interface à la fois, ou minimale d'abord) ; chez Lawrence, Defer
  Performance (« que ça marche » avant « que ce soit rapide »), Business Rule Variations (une
  story par variante de règle), Workflow Steps. Les deux catalogues se recoupent (données,
  règles) sans se confondre.
- **Situation** : le morceau c de « prévoir les stations à risque » (9b1) : une prévision par
  la tendance de la dernière heure, avant tout modèle.
- **Question** : quel patron le morceau c applique-t-il, et dans quel catalogue ?
- **Réponse attendue** : c prend la version la plus simple d'abord : Simple/Complex, de
  Lawrence ; SPIDR n'a pas de patron sous ce nom. Nuances : répondre « le R de SPIDR » est
  défendable si on voit la tendance comme une règle de calcul assouplie pour commencer ;
  Simple/Complex le dit plus directement. Le nom compte moins que la question qu'il fait
  poser ; le guide de Lawrence et Peter Green conseille aussi de choisir le découpage qui
  permet de reporter, voire d'abandonner, un morceau de faible valeur (ordonner : concept 13).
- **Erreurs fréquentes** :
  - ranger c sous le S de SPIDR : un spike livre une réponse, pas une fonction ; c livre une
    prévision à Régis ;
  - attribuer Simple/Complex à SPIDR, ou fondre les deux catalogues en un seul : redonner
    chaque patron à son auteur ;
  - chercher un patron pour b : b n'est pas une tranche (9b1) ;
  - réponse elliptique (« Simple/Complex ») : faire dire le catalogue et pourquoi avant de
    corriger.
- **Ce qui marche** : une question par message (pas « laquelle, puis quel patron » d'un coup,
  ni « quel patron pour a et pour c ») ; donner a comme exemple résolu, puis faire relier c.
  Pour tenir en 15 lignes, ne pas réciter les catalogues : la réserve sert sur demande.

## Schéma

**9a, le gâteau en couches.** Quatre couches empilées, de bas en haut : ingestion (relevés
des stations), transformation, données prêtes, restitution (ce que voit l'utilisateur). Une couche
entière grisée, légendée « tranche horizontale : ne sert pas seule ». Trois parts verticales
colorées qui traversent toutes les couches, légendées « tranche 1 », « tranche 2 »,
« tranche 3 », avec la légende « tranche verticale : un peu de chaque couche, sert seule ».
Pour 9a2, dans la correction (pas avant la question) : un zoom sur la tranche 1, coupée en
lamelles horizontales en pointillé, « tâches », avec la mention « au niveau du sprint, la
tranche est une story ».
**9b, la part trop grosse (cas inventé, ni Régis ni son exercice).** La part « une vue des
vélos en panne pour Étienne », trop grosse pour un sprint, recoupée : deux parts verticales
(a les stations du centre-ville seulement, c les vélos signalés, confirmés ou non par un
technicien) et, à côté, une lamelle horizontale « b une table des signalements prête, sans
vue : une couche ». Sous chaque part verticale, le patron et son catalogue (« D, SPIDR /
Variations in Data, Lawrence » ; « R, SPIDR (Business Rule Variations, Lawrence, diffère) »).
Légende : « morceaux inventés pour l'illustration ».
