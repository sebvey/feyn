## Consignes

1. **13a ordonner, c'est décider**, en deux messages ; on ne passe à 13b qu'après les deux :
   - **13a1** les quatre critères, face à l'objectif produit : la valeur se mesure face à lui
     (que les stations du centre-ville restent le moins longtemps possible vides aux heures de
     pointe) ; une demande sortie du hors périmètre s'ordonne face au reste (« La story de
     blocage face à l'appli ») ;
   - **13a2** ordonner quatre demandes et argumenter chaque place ; ce qui n'est pas prêt (la
     DoR de l'équipe vélos, 11b : critères d'acceptation écrits, règles métier fixées,
     dépendances identifiées, accès aux données obtenu), ce qui dépend d'autre chose, le risque
     de sécurité (« Les quatre demandes »).
2. **13b valeur et coût du retard** (choix d'école) : comment le coût du retard évolue dans le
   temps (coût qui grandit chaque jour, valeur qui tombe après une échéance), sans chiffres
   inventés ; WSJF nommé (« Le blocage et le bilan au conseil »).
3. **13c MoSCoW pour une échéance** (choix d'école) : Must, Should, Could, Won't (pas cette
   fois) pour une échéance ; le Must relève de celui qui connaît l'échéance, le PO l'aide à classer ; MoSCoW ne
   remplace pas l'ordre (« Tout est Must pour le bilan »). En rechange : « Tout le backlog en
   MoSCoW ? ».

Déjà enseigné, à rappeler sans le réenseigner : le Scrum Master aide à lever les obstacles, il
n'ordonne pas le backlog (concept 0a1) ; partie prenante, le PO seul ordonne, qui veut changer l'ordre le
convainc, une seule personne, pas un comité (0a1, 1b) ; Sprint Planning et revue de sprint, leur but et qui y décide quoi
(0a2) ; l'objectif produit, un seul à la fois, et sa mesure de résultat aux
points non fixés (2) ; liste ordonnée et non priorités, une demande ne se traite pas en direct
(3) ; les Developers estiment la taille (7) ; la règle non fixée que le PO fait fixer (8a2) ;
reporter un morceau de faible valeur (9b2) ; la demande de Maud entre au backlog à la revue
(10a2) ; dépendance entre deux stories, s'accorder avec l'autre équipe (10b) ; la DoR et l'accès
obtenu (11b) ; définition d'un indicateur et accès aux données (12). Pas encore enseignés,
nommés avec renvoi : identifier les parties prenantes, dire non et escalade (14), préciser une
story avant le sprint, ce que le PO prépare au Sprint Planning et mène à la revue (15), première version et prévision « pour quand ? »
(16), hypothèses et exploration (17), outil du backlog (annexe A1).

## Faits du fil rouge utilisés

L'objectif produit et sa mesure de résultat, dont la cible, les
heures de pointe, la station vide et le calcul ne sont pas fixés ; un vélo signalé en panne
reste louable ; son blocage, sorti du hors périmètre de la tournée, est réclamé par Maud ; le
blocage se fait dans le système de location (DSI), la plateforme peut lui fournir la liste des
vélos signalés : la story de blocage dépend de la DSI ; aujourd'hui, un vélo n'est plus louable
qu'après constat d'un technicien ; bloquer dès le signalement est une règle non fixée (10a2) ;
Odile encadre la maintenance et est sponsor ; l'accès à la table des locations n'est pas obtenu
(11b) ; Charlotte veut les locations par quartier sur le mois, puis la comparaison au même mois de
l'an dernier, qui dépend de la première ; le conseil examine la subvention une fois par an, sur
un bilan présenté par la collectivité, à une date non fixée ; Pia veut la disponibilité par
station pour l'appli ; un vélo disponible est un vélo à quai et louable ; les relevés des
stations sont déjà collectés. Les propos de Diego, d'Anna et de Charlotte, la date du bilan et la
« carte des quartiers » de 13c sont des situations d'exercice : ils ne deviennent pas des faits
du fil rouge.

## Banque d'exemples

### La story de blocage face à l'appli (13a1)
- **Explication** : ordonner, c'est décider de la place unique de chaque demande, et dire
  pourquoi. Le Scrum Guide confie l'ordre au PO sans dire comment ; la pratique établie pèse
  quatre critères. La **valeur** : ce que la demande apporte, rapporté à l'objectif produit. Le
  **coût** : l'effort, que les Developers estiment, pas le PO. Le **risque**, en deux sens : le
  risque pour le produit (ce qui est incertain et nécessaire se fait tôt, Cohn) ; le risque
  pour les utilisateurs (sécurité), dont la gravité se fait qualifier par ceux qui en
  répondent (choix du cours). Les **dépendances** : ce dont une autre demande a besoin
  remonte. L'ordre d'arrivée n'en fait pas partie.
- **Situation** : à la revue, la demande de Maud (bloquer à la location un vélo signalé en
  panne) est entrée au backlog (10a2). Odile, directrice des opérations, encadre la maintenance de
  Maud. Diego : « On vient d'en parler, c'est le bon moment : prenons-la au prochain sprint. » Au
  backlog attend aussi la disponibilité par station pour l'appli, demandée par Pia. Le blocage se
  fait dans le système de location, à la DSI ; la plateforme peut lui fournir la liste des vélos
  signalés. Bloquer dès le signalement est une règle que personne n'a fixée.
- **Question** : entre la story de blocage et la disponibilité pour l'appli, laquelle places-tu
  devant, et sur quoi t'appuies-tu ?
- **Réponse attendue** : plusieurs ordres se défendent ; ce qui compte, c'est l'argument.
  D'abord, « c'est le bon moment » n'est pas un critère : c'est l'ordre d'arrivée. Puis les
  quatre critères. Valeur : le blocage évite qu'on loue un vélo en panne (sécurité des
  abonnés) ; l'appli sert les abonnés qui l'ont. Leur lien avec le temps vide des stations n'est
  pas établi : qui en suppose un pose une hypothèse (concept 17), à argumenter ; l'objectif
  produit ne départage donc pas seul ici, et le PO le dit. Coût : à demander aux Developers.
  Risque : ici, le risque pour les utilisateurs ; il pèse lourd, mais sa gravité se fait
  qualifier par Maud, voire Odile (directrice des opérations, qui encadre la maintenance), pas
  par le PO seul. Dépendances : le blocage dépend de la DSI et d'une règle à faire fixer (8a2) ;
  la disponibilité, non (son affichage relève de l'équipe appli). Deux réponses justes : l'appli
  d'abord, parce que rien ne la bloque ; ou le blocage en tête si sa gravité est jugée haute. Ce
  qu'on fait d'une story qui n'est pas prête vient en 13a2. Dans les deux cas, la place se
  décide face au reste, pas parce qu'on vient d'en parler.
- **Erreurs fréquentes** :
  - « oui, c'est le bon moment, on la prend » : demander « qu'est-ce qui ne sera pas fait à la
    place, et sur quoi as-tu décidé ? » ;
  - « la sécurité passe toujours devant, point » : souvent juste sur le fond, mais qui juge la
    gravité ? et la story peut-elle seulement entrer au sprint (règle non fixée, DSI) ? ;
  - fixer soi-même la règle (« on bloque dès le signalement ») : règle à faire fixer (8a2) ;
  - estimer le coût à la place des Developers (« c'est petit, une liste à envoyer ») : le coût se
    demande à Dana, Diego et Anna ;
  - donner un ordre sans le pourquoi : demander « pourquoi ? », comme Pia le ferait.
- **Ce qui marche** : faire trancher entre les deux demandes, pas commenter une seule ; puis
  passer chaque critère comme une case à remplir (valeur, coût, risque, dépendances). Si la
  réponse s'arrête à un ordre, relancer : « pourquoi celle-ci devant, critère par critère ? ».

### Les quatre demandes (13a2)
- **Explication** : rappel en une ligne des quatre critères. Ce qui n'est pas prêt (règle non
  fixée, accès non obtenu, travail d'une autre équipe sans lequel on ne finit pas dans le
  sprint, comme en 11b) n'entre pas au sprint, quel que soit son rang ; le PO lance ce qui le
  rend prêt (choix du cours). Une demande qui en suppose une autre passe après elle.
- **Situation** : quatre demandes au backlog.
  - Maud : bloquer les vélos signalés (sécurité) ; règle non fixée ; dépend de la DSI.
  - Étienne : les locations du jour ; accès à la table des locations non obtenu.
  - Charlotte : la comparaison à l'an dernier (bilan au conseil) ; suppose les locations par
    quartier et le même accès.
  - Pia : la disponibilité par station pour l'appli ; règle fixée, données collectées.
- **Question** : propose un ordre pour ces quatre demandes et argumente chaque place.
- **Réponse attendue** : il n'y a pas un seul ordre juste ; la réponse est bonne si elle pèse ce
  qui doit peser. L'objectif produit d'abord : le lien de chacune avec le temps vide des
  stations du centre-ville n'est pas établi ; qui en suppose un pose une hypothèse
  (concept 17), recevable s'il l'argumente. Autre valeur recevable : la comparaison de Charlotte
  sert à justifier la subvention qui finance le service ; le PO l'argumente sans la balayer.
  Ce qui est prêt : seule la disponibilité pour l'appli n'attend rien de bloquant (les relevés en double
  relèvent de la DoD, 11a). Les dépendances : la comparaison de Charlotte suppose les
  locations par quartier, absentes de la liste ; elles passent avant elle, et l'accès
  conditionne Étienne et Charlotte. Le risque pour les utilisateurs : le blocage peut passer devant
  l'objectif produit si Maud et Odile qualifient le risque de grave ; le PO ne le juge pas
  seul. Le coût : à demander à Dana, Diego et Anna, pour chacune. Un ordre qui se défend :
  l'appli (prête), puis le blocage dès qu'il est prêt, puis Étienne ou Charlotte, l'un et l'autre
  derrière l'accès : l'un ou l'autre en troisième, à argumenter (l'exploitation au quotidien ou
  la subvention). Autre ordre défendable : le blocage en
  tête, l'appli prise au prochain sprint parce que le blocage n'est pas prêt. Dans tous les cas,
  le PO lance ce qui débloque : faire fixer la règle, s'accorder avec la DSI, obtenir l'accès
  (s'il bloque : escalade, concept 14). Mauvaises réponses : l'ordre d'arrivée, celui qui
  insiste le plus, tout placer en tête, la comparaison avant les locations par quartier, Étienne
  au prochain sprint sans l'accès.
- **Erreurs fréquentes** :
  - ordonner par la personne (« Charlotte finance, elle passe d'abord ») : demander « qu'est-ce que
    sa demande apporte, et peut-on la faire maintenant ? » ; le sponsor ou le financeur
    convainc le PO comme les autres (1b) ;
  - ignorer ce qui est prêt et mettre en tête une story bloquée, sans rien faire pour la
    débloquer : demander « si l'équipe la prend lundi, que fait-elle ? » ;
  - un ordre juste sans le pourquoi : relancer par « pourquoi celle-ci en deuxième ? » ;
  - oublier que la comparaison suppose les locations par quartier : demander « avec quoi
    compare-t-on ? » ;
  - trancher la gravité du risque, la règle de blocage ou la date du bilan : ce sont des faits
    métier, à demander à qui les détient.
- **Ce qui marche** : un tableau à quatre lignes et quatre colonnes (valeur, coût, risque pour
  le produit ou pour les utilisateurs, dépendances), plus une colonne « prête ? » ; l'apprenant
  le remplit avant d'ordonner. Si la réponse est elliptique (« l'appli, puis Maud »), faire
  préciser avant de corriger : « dis-moi pour chacune pourquoi elle est à cette place ».

### Le blocage et le bilan au conseil (13b)
- **Explication** : la valeur d'une demande dépend aussi du moment où elle arrive. Le **coût du
  retard** dit ce qu'on perd à la livrer plus tard. Choix d'école : Don Reinertsen en fait la
  mesure économique à quantifier ; on peut, comme Joshua Arnold le propose pour commencer,
  raisonner sur la forme de l'urgence : un coût qui grandit dès aujourd'hui, ou un coût du
  retard lié à une échéance, presque nul au début, qui monte à son approche ; après, la valeur
  est perdue (jusqu'à l'échéance suivante). SAFe divise le coût du retard par la durée (WSJF) :
  on le nomme, sans l'enseigner. Ici, on ne chiffre rien.
- **Situation** : situation d'exercice : Charlotte annonce que le bilan au conseil a lieu dans
  deux mois ; le conseil examine la subvention une fois par an. Deux demandes : le blocage des
  vélos signalés (Maud) et la comparaison au même mois de l'an dernier (Charlotte).
- **Question**, en deux parties : « Du blocage et de la comparaison, laquelle coûte dès
  aujourd'hui, laquelle seulement plus tard ? », puis « Que change, à ton ordre, la forme de
  ces deux coûts dans le temps ? »
- **Réponse attendue** :
  1. La forme : le blocage coûte dès aujourd'hui, et chaque jour qu'un vélo signalé reste
     louable s'ajoute aux autres : urgence immédiate, qui pousse à rendre la story prête vite
     (règle, DSI). La comparaison coûte peu tant que le bilan est loin, puis de plus en plus à
     son approche ; après le bilan, sa valeur tombe jusqu'au bilan suivant, un an plus tard.
  2. L'effet sur l'ordre : l'échéance fait monter la comparaison, et avec elle ce dont elle
     dépend (les locations par quartier, l'accès), d'autant qu'il faut le temps de les faire ;
     le blocage garde une urgence propre, qui ne dépend pas d'une date. Nuances : le temps
     qu'il faut, ce sont les Developers qui l'estiment ; la gravité du risque reste à faire
     qualifier (13a) ; la date du bilan se demande à Charlotte, le PO ne la fixe pas.
- **Erreurs fréquentes** :
  - Partie 1, inventer des chiffres (« un accident coûte tant ») : le fil rouge ne chiffre
    rien ; raisonner en forme (immédiat, échéance, coût qui grandit) ;
  - Partie 1, confondre coût du retard et coût de la demande : l'un se perd en attendant,
    l'autre se dépense en faisant ;
  - Partie 1, dire « urgent » sans dire pourquoi : demander « que perd-on, et à partir de
    quand ? » ;
  - Partie 2, « la comparaison a une date, donc elle passe d'abord » : l'échéance fait monter,
    elle ne met pas en tête d'office ; et la comparaison ne peut pas venir avant les locations
    par quartier.
- **Ce qui marche** : faire décrire en mots la forme des deux coûts dans le temps (dès le
  départ, ou plat puis qui monte jusqu'au bilan).

### Tout est Must pour le bilan (13c)
- **Explication** : pour une échéance, MoSCoW classe ce qui doit y être : Must (le minimum
  utilisable que la livraison garantit), Should (important, pas vital), Could (souhaitable,
  qu'on lâche en premier si l'échéance est menacée), Won't (pas cette fois, pas « jamais »).
  Choix d'école de DSDM, attribué à Dai Clegg ; DSDM recommande de ne pas dépasser environ 60 %
  de l'effort en Must : au-delà, l'échéance devient risquée. Chez DSDM, c'est le représentant de
  l'activité concernée (le Business Visionary) qui dit ce qui est Must ; le PO l'aide à
  classer, la réponse revient à celui qui sait ce que l'échéance exige. MoSCoW classe pour une échéance, il ne
  remplace pas l'ordre du backlog.
- **Situation** : pour le bilan au conseil, Charlotte te dit : « Tout est Must : les locations par
  quartier, la comparaison à l'an dernier, et une carte des quartiers. »
- **Question** : que réponds-tu à Charlotte ?
- **Réponse attendue** : tout en Must, c'est ne rien classer : si l'échéance est menacée, on ne
  sait plus quoi lâcher. Le PO aide Charlotte à classer par une question : « si le conseil n'avait
  que ça, le bilan tiendrait-il ? ». C'est elle qui y répond, elle sait ce que le conseil
  attend ; le PO ne décide pas à sa place. Il apporte ce qu'il sait : la comparaison suppose les
  locations par quartier (elle ne peut pas être Must sans elles), et l'effort se demande aux
  Developers, pour garder le Must sous environ 60 %. Classer en Won't veut dire « pas pour ce
  bilan » : la demande reste au backlog, dans l'ordre, que MoSCoW ne remplace pas. Nuance : les
  locations par quartier et la comparaison attendent l'accès à la table des locations ; pour la
  carte, demander ce qu'elle montre avant de dire ce dont elle dépend. Un Must bloqué par
  l'accès est un obstacle à lever (concept 14).
- **Erreurs fréquentes** :
  - accepter tout en Must parce que Charlotte finance : demander « que lâches-tu si le temps
    manque ? » ;
  - classer à la place de Charlotte (« la carte, c'est du Could ») : le PO pose la question, elle
    répond ;
  - lire Won't comme un refus : c'est « pas cette fois » ;
  - classer la comparaison en Must et les locations par quartier en Should : la comparaison les
    suppose.
- **Ce qui marche** : « si on n'avait le temps que d'une chose avant le bilan, laquelle ? »,
  puis « et d'une deuxième ? ». Si la réponse est « je lui dis non », relancer : « et alors,
  que proposes-tu à Charlotte ? ».

### Tout le backlog en MoSCoW ? (13c, en rechange)
- **Explication** : MoSCoW se rapporte à une échéance ou à un délai fixé ; le backlog, lui,
  reste une liste ordonnée (concept 3).
- **Situation** : Anna propose : « Classons tout le backlog en MoSCoW, ce sera plus simple que
  ton ordre. »
- **Question** : que réponds-tu à Anna ?
- **Réponse attendue** : non. Quatre catégories laissent des ex aequo : avec dix Must, l'équipe
  ne sait pas lequel prendre d'abord, comme avec des priorités (concept 3a1). Et un Must n'a de
  sens que face à une échéance : « Must pour quoi ? ». MoSCoW sert pour le bilan au conseil ;
  à l'intérieur, et pour le reste du backlog, il faut toujours un ordre.
- **Erreurs fréquentes** : « oui, c'est plus lisible » : demander « Dana finit lundi : quel Must
  prend-elle ? ».
- **Ce qui marche** : la question « Must pour quelle échéance ? ».

## Schéma

Les schémas déclarés, un par sous-concept qui en a un, et la métaphore pour ceux qui n'en ont pas. Tu ne montres un schéma que si l'apprenant le demande.

**13a1, les quatre critères (aucun schéma déclaré : la métaphore reste pour toi).** Une colonne
de quatre cartes, une par place, pas de cartes côte à côte. À droite de chaque carte, quatre
pastilles : valeur (face à l'objectif produit, en haut du panneau comme un cap), coût (« estimé
par les Developers »), risque (deux moitiés : « pour le produit », « pour les utilisateurs,
qualifié par qui en répond »), dépendances. Légende : « une place par carte, un pourquoi par
place ».

**13a2, `ordonner-une-place.svg`.** Quatre cartes empilées, « place 1 » à « place 4 », une demande
par place. La carte de la place 2, marquée « pas prête », est la seule qui ressort.

**13b, `formes-cout-retard.svg`.** Un graphique sans graduation, le temps en abscisse et le coût
du retard en ordonnée. Une droite qui monte dès le départ, « coût qui grandit dès aujourd'hui » ;
une courbe presque plate qui monte de plus en plus vite jusqu'à un trait vertical « échéance »,
puis retombe, « coût lié à une échéance ». La clé nomme les deux traits. Si l'apprenant le
demande avant d'avoir répondu à la partie 1 de « Le blocage et le bilan au conseil », ne le
montre pas avant sa réponse : le schéma la donnerait.

**13c, `moscow-echeance-backlog-ordonne.svg`.** À gauche, une boîte « une échéance » avec quatre
bacs empilés, Must (« le minimum utilisable »), Should (« important, pas vital »), Could
(« souhaitable »), Won't (« pas cette fois ») ; à droite, « backlog ordonné », une colonne de
cinq cartes, « place 1 » à « place 5 », le Won't relié à la place 5. Le plafond d'environ 60 % de
l'effort en Must (DSDM) n'est pas dessiné : tu le dis si l'apprenant le demande.
