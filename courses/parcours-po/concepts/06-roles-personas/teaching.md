## Consignes

1. **6a l'acteur de la story** : un rôle, pas un prénom ni « utilisateur » par défaut. Test :
   celui qui fait l'action du « je veux » est-il celui qui gagne le « afin de » ? Deux pièges :
   l'acteur technique (celui qui construit) et la valeur d'un autre rôle dans le « afin de ». Le
   PO vérifie l'acteur auprès des utilisateurs. Exemple du fil rouge de deux rôles aux actions
   différentes : Étienne, responsable d'exploitation, envoie les régulateurs vers les stations ;
   Régis, régulateur, conduit la camionnette et redistribue les vélos. Un message, avec « Théo
   ou Maud ? ». Rechange : « Diego, acteur de sa story ? » (acteur technique), ou « Une vue,
   deux acteurs » si l'apprenant a déjà le test et qu'il faut le pousser sur la vérification.
2. **6b le persona (choix d'école)** : court. Un portrait fictif d'un rôle, construit à partir
   d'utilisateurs réels. Il ne remplace ni le rôle
   dans la story, ni les entretiens. Un message, avec « Abba, on lui fait dire ce qu'on veut ? »
   (« Le trait qu'Anna veut ajouter » après une réponse fausse, si la relance échoue ; « En
   tant qu'Abba ? » en rechange).

## Banque d'exemples

Les brouillons de stories à corriger sont inventés pour l'exercice : ils ne deviennent pas des
faits du fil rouge. Le concept ne réenseigne pas ce qui est acquis : consommateurs de données
utilisateurs (concept 1) ; trois parties, 3C, solution hors du « je veux », chiffre précis hors
de la phrase (concept 5) ; un « je veux » par story (concept 4). Il y renvoie.

### Théo ou Maud ? (6a)
- **Explication** : l'acteur d'une story est désigné par son rôle (sa catégorie d'utilisateurs),
  pas par un prénom. Choix du cours : il agit et y gagne. Il fait l'action du « je veux »,
  et le « afin de » dit son gain à lui. Le Scrum Guide n'en dit rien ; écrire pour des rôles
  précis est une recommandation de Mike Cohn.
- **Situation** : Théo, technicien de maintenance, répare les vélos sur le terrain et prépare sa
  tournée de réparation à partir des vélos signalés en panne. Maud, responsable maintenance,
  encadre les techniciens. Maud a ajouté ce brouillon au backlog : « En tant que responsable
  maintenance, je veux voir les vélos signalés en panne, afin que mes techniciens préparent leur
  tournée. »
- **Question** : qui est l'acteur ? Réécris le début de la story.
- **Réponse attendue** : le technicien de maintenance. C'est lui qui regarde les vélos signalés
  et prépare sa tournée ; le « afin de » du brouillon dit d'ailleurs le gain des techniciens, pas
  celui de Maud. Par exemple : « En tant que technicien de maintenance, je veux voir les vélos
  signalés en panne, afin de préparer ma tournée de réparation. » Nuances : Maud a son propre
  besoin, avec sa propre raison (fixer le nombre de techniciens en tournée, concept 5) : c'est
  une autre story, dont elle est l'acteur. Le rôle, pas « Théo » : la story vaut pour tous les
  techniciens. Et le PO ne choisit pas l'acteur sur le papier : il vérifie auprès de Théo que
  c'est bien lui qui prépare sa tournée à partir des signalements. Si l'apprenant change
  l'acteur sans toucher au « afin de », relance : « et le « afin de », que devient-il ? ». S'il
  garde Maud et veut changer le « afin de », relance : « qui regardera la liste pour préparer
  sa tournée, et qui y gagne ? » ; un « afin de » propre à Maud ferait une autre story.
- **Erreurs fréquentes** :
  - garder Maud « parce que c'est elle qui a demandé » : celui qui demande n'est pas toujours
    celui qui agit ; demander « qui fera l'action, et qui y gagne ? » ;
  - écrire « En tant que Théo » : la story sert un rôle ; Théo est un technicien parmi d'autres,
    celui à qui le PO pose ses questions ;
  - écrire « En tant qu'utilisateur » : techniciens et responsable n'ont ni la même action ni la
    même raison, le rôle change la conversation.
- **Ce qui marche** : tracer deux flèches, l'une du « je veux » vers celui qui agit, l'autre du
  « afin de » vers celui qui y gagne : si elles n'arrivent pas sur le même rôle, l'acteur est à
  revoir. Si l'apprenant le demande, le prof joue Théo, d'après le fil rouge : « Je prépare ma
  tournée à partir des vélos signalés ; sur place, je confirme ou j'infirme la panne. »

### Diego, acteur de sa story ? (6a)
- **Explication** : l'acteur est celui qui agit et y gagne, pas celui qui construit. Les
  Developers construisent le produit ; un consommateur de données, lui, est un utilisateur
  (choix du cours, concept 1).
- **Situation** : Diego, data engineer, propose : « En tant que data engineer, je veux une table
  des vélos signalés en panne, mise à jour toutes les 5 minutes, afin d'alimenter la vue de
  maintenance. » Les techniciens de maintenance préparent leur tournée de réparation à partir
  des vélos signalés en panne.
- **Question** : Diego défend son brouillon : « Je suis bien un utilisateur de la plateforme,
  non ? » Que réponds-tu à Diego ?
- **Réponse attendue** : ici, Diego construit, il ne se sert pas du résultat : la table est une
  part de son travail, le « afin de » est une étape technique, et aucun gain de l'utilisateur
  n'apparaît. L'acteur est le technicien de maintenance, qui prépare sa tournée. Nuance : un
  data engineer peut être un utilisateur quand il consomme les données pour son propre besoin
  (concept 1) ; ce n'est pas le cas ici. La table et les 5 minutes relèvent du concept 5
  (solution hors du « je veux », chiffre hors de la phrase) : les signaler, sans s'y attarder.
  Si l'apprenant ne nomme pas l'acteur, relance : « alors, qui est l'acteur de ce besoin ? ».
- **Erreurs fréquentes** :
  - corriger la table et les 5 minutes en gardant « en tant que data engineer » : rappeler que
    la question porte d'abord sur l'acteur ; relancer : « si cette story n'est jamais livrée,
    qui s'en plaint ? » ;
  - conclure qu'un data engineer n'est jamais un acteur : un consommateur de données, quel que
    soit son métier, peut être l'acteur, comme l'équipe appli au concept 1 ; ce qui compte,
    c'est qu'il se serve du résultat pour son propre besoin ; réexpliquer.
- **Ce qui marche** : « si cette story n'est jamais livrée, qui s'en plaint ? » Pas Diego, mais
  Théo, qui prépare sa tournée sans la liste.

### Une vue, deux acteurs (6a)
- **Explication** : le PO ne devine pas l'acteur : il le vérifie auprès des utilisateurs. Un
  rôle plus précis vaut la peine quand il change la conversation (Cohn) : une autre raison,
  d'autres données, un autre moment.
- **Situation** : Étienne, responsable d'exploitation, veut suivre l'état du réseau dans plusieurs
  vues, dont les vélos en panne. Théo prépare sa tournée de réparation à partir des vélos
  signalés en panne. Diego demande : « Pour la vue des vélos en panne, on met Étienne ou Théo comme
  acteur ? »
- **Question** : que fais-tu avant d'écrire la story ?
- **Réponse attendue** : ce n'est pas un choix à faire au hasard : les deux rôles n'ont pas la
  même raison (suivre l'état du réseau, préparer une tournée). Il y a sans doute deux besoins,
  donc deux stories, chacune avec son acteur et son « afin de » (un « je veux » par story,
  concept 4). Avant d'écrire, le PO demande à Étienne et à Théo ce qu'ils feront de l'information
  (quelles données, à quel moment). Une seule story ne conviendrait que s'ils avaient la même
  action pour la même raison (Cohn) : leurs raisons connues le rendent peu probable. Ordonner
  les deux stories viendra au concept 13. Si l'apprenant s'arrête à « je leur demande »,
  relance : « et que réponds-tu à Diego ? ».
- **Erreurs fréquentes** :
  - choisir l'un des deux « parce qu'il est le plus important » : c'est ordonner, pas choisir
    l'acteur ; relancer : « une story ou deux ? » ;
  - écrire « en tant qu'utilisateur » pour couvrir les deux : on perd les deux raisons ;
    relancer : « une story ou deux ? » ;
  - décider seul de ce que chacun en fera : le PO le demande, il ne l'invente pas ; relancer :
    « qui sait ce qu'Étienne et Théo feront de cette vue ? ».
- **Ce qui marche** : écrire les deux « afin de » côte à côte ; s'ils diffèrent, demander « une
  story ou deux ? ».

### Abba, on lui fait dire ce qu'on veut ? (6b)
- **Explication** : un persona est un portrait fictif et réaliste d'un rôle : un prénom, des
  objectifs, des comportements. Choix d'école d'Alan Cooper, venu du design d'interaction, absent du
  Scrum Guide, discuté entre praticiens. Il se construit à partir d'utilisateurs réels
  interrogés ; il aide l'équipe à se représenter le rôle quand elle en parle.
- **Situation** : un tiers des abonnés n'a pas l'appli, seulement un téléphone basique. L'équipe
  parle d'eux à travers Abba, persona des abonnés sans l'appli : elle veut savoir avant de
  partir s'il reste un vélo à sa station. Anna dit : « Abba n'existe pas, donc on peut lui
  prêter les besoins qui nous arrangent. »
- **Question** : que réponds-tu à Anna ?
- **Réponse attendue** : Abba est fictive par son prénom, pas par ses traits : un persona se
  construit à partir d'utilisateurs réels, donc chacun de ses traits doit venir d'abonnés sans
  l'appli (le téléphone basique, par exemple, est celui d'un tiers des abonnés). Lui prêter un
  besoin que personne n'a exprimé, c'est inventer un utilisateur. Un nouveau besoin pour Abba se
  vérifie auprès d'abonnés sans l'appli. Nuance : le persona reste un choix d'école ; une équipe
  peut s'en passer et parler du rôle.
- **Erreurs fréquentes** :
  - « oui, c'est un outil de l'équipe » : le persona aide à penser l'utilisateur, il ne le
    remplace pas ; relancer : « d'où vient chaque trait d'Abba ? » ; sinon : rechange « Le
    trait qu'Anna veut ajouter » ;
  - confondre persona et utilisateur réel : Théo est un technicien qu'on interroge ; Abba
    doit résumer des abonnés réels ; relancer : « d'où vient chaque trait d'Abba ? ».
- **Ce qui marche** : « d'où vient chaque trait d'Abba ? » : s'il ne vient d'aucun abonné
  réel, il n'a rien à faire dans le portrait.

### Le trait qu'Anna veut ajouter (6b, rechange)
- **Usage** : après une réponse fausse à « Abba, on lui fait dire ce qu'on veut ? », si la
  relance échoue.
- **Explication** : un persona (cas inventé : « Léa », cycliste du week-end) a un prénom
  fictif ; chacun de ses traits vient d'une observation d'utilisateurs réels, et doit pouvoir
  répondre à « d'où vient-il ? ».
- **Situation** : Anna veut ajouter au portrait d'Abba : « elle se contente d'une
  disponibilité vieille d'une heure ». Cela arrangerait l'équipe ; aucun abonné ne l'a dit.
- **Question** : que demandes-tu à Anna, et que fais-tu avant d'accepter ce trait ?
- **Réponse attendue** : demander d'où vient ce trait ; le vérifier auprès d'abonnés sans
  l'appli ; sans appui, il n'entre pas dans le portrait. Construire pour ce trait servirait une
  abonnée qui n'existe pas. Nuance : il heurte en plus la fraîcheur visée (moins de 15 minutes).
- **Erreurs fréquentes** :
  - accepter « puisqu'Abba est fictive » : c'est l'erreur de départ, revenir à « d'où vient
    ce trait ? » ;
  - trancher soi-même que les abonnés s'en contentent : le PO le vérifie, il ne le décide pas.
- **Ce qui marche** : opposer le téléphone basique (un tiers des abonnés, trait appuyé) au
  trait d'Anna (appuyé sur rien).

### En tant qu'Abba ? (6b)
- **Explication** : un persona est un portrait fictif d'un rôle (prénom, objectifs,
  comportements), construit à partir d'utilisateurs réels (choix d'école d'Alan Cooper) ; il
  sert à la conversation et aux exemples ; la phrase de la story garde le rôle (choix du cours).
- **Situation** : Abba est le persona des abonnés sans l'appli (un tiers des abonnés, qui n'ont
  qu'un téléphone basique). Story au backlog : « En tant qu'abonné, je veux savoir avant de partir s'il
  reste un vélo à ma station, afin de ne pas me déplacer pour rien. » Diego propose de la
  réécrire : « En tant qu'Abba, je veux… ».
- **Question** : faut-il remplacer « abonné » par « Abba » ? Tranche et justifie.
- **Réponse attendue** : non, dans ce cours. Le besoin et la raison valent pour tous les abonnés,
  avec ou sans l'appli : « abonné » ne fait rien manquer. Abba sert ailleurs : dans la
  conversation, et dans les exemples qui disent quand la story est faite (« Abba n'a qu'un
  téléphone basique… », concept 8). Ce que son téléphone change pour la story se travaille au
  concept 7. Nuance : certaines équipes écrivent leurs stories au nom d'un persona ; c'est
  possible, à condition que le persona vienne d'utilisateurs réels.
- **Erreurs fréquentes** :
  - « oui, c'est plus concret » : plus concret, mais la story sert un rôle, pas un portrait ;
    relancer : « le besoin d'Abba est-il différent de celui des autres abonnés, ou seulement
    la façon de le servir ? » ;
  - réécrire en « En tant qu'abonné sans téléphone » ou y nommer un canal : c'est le sujet du
    concept 7 ; ne pas le trancher ici.
- **Ce qui marche** : « le besoin d'Abba est-il différent de celui des autres abonnés, ou
  seulement la façon de le servir ? »

## Schéma

Deux schémas, un par sous-concept.

**6a, deux flèches vers l'acteur**, sur un cas inventé pour l'illustration, qui n'est pas celui
d'un exercice. La phrase de la story en trois blocs (« En tant que », « je
veux », « afin de »), la case « En tant que » vide. En dessous, deux rôles : régulateur et agent
d'accueil. Deux flèches partent de la phrase : du « je veux » (« savoir quelles stations vont se
vider ») vers celui qui agit, du « afin de » (« y aller avant qu'elles soient vides ») vers celui
qui y gagne ; les deux arrivent sur le régulateur, et son rôle monte dans la case vide. Légende :
« les deux flèches sur le même rôle : c'est l'acteur ».

**6b, le portrait tiré des abonnés.** Une carte portrait « Léa, persona des cyclistes du
week-end » (cas inventé pour l'illustration), posée sur un groupe de silhouettes de cyclistes
réels. Une flèche de la carte vers une bulle de conversation ; la case « En tant que » d'une
story, à côté, garde le rôle. Légende : « construit à partir d'utilisateurs réels (choix d'école,
Cooper) ».
