## Consignes

1. **4a les niveaux, qu'aucun guide n'impose** : se déroule en trois messages, chacun avec son
   exemple de la banque.
   - **4a1** Les quatre mots (« Classer l'arbre d'Étienne ») : le Scrum Guide ne connaît que des éléments
     du backlog ; epic, feature, story et tâche classent un besoin par taille ; la tâche revient
     aux Developers, dans le backlog de sprint.
   - **4a2** Les niveaux de l'outil (« « Scrum impose trois niveaux » ») : un réglage par défaut, modifiable ;
     l'équipe choisit les siens.
   - **4a3** Le niveau de trop (« Un niveau de trop ? ») : peu de niveaux suffisent ; signe d'un niveau
     de trop : la plupart des features ne contiennent qu'une story.
2. **4b feature ou story : compter les « je veux »** (« Un seul « je veux » ? », « Vélos en panne et locations du jour : feature ou story ? », « Les stations presque vides : ce qu'il reste à livrer ») : écrire les « je veux » de ce qu'il reste
   à livrer. Un seul, qui tient dans un sprint : story ; trop gros pour un sprint : un epic (au sens de
   Cohn, une grosse story), qui se découpe (concept 9). Plusieurs, chacun utile seul : feature, et chaque « je veux » devient une story
   candidate. Plusieurs groupes (par exemple des moments différents de la journée d'un utilisateur), ou
   des « je veux » qu'on ne sait pas encore écrire : epic. Un « je veux » qui en contient
   d'autres se déplie avant de compter. Exemple du fil rouge : la journée d'Étienne (point du
   matin, envoi des régulateurs, suivi des incidents, bilan du soir) compte plusieurs moments
   distincts ; un besoin qui couvre toute sa journée est un epic, pas une story.

## Faits du fil rouge utilisés

Les formulations de besoins de cette banque (les « je veux » d'Étienne, les éléments à classer)
sont des propositions d'exercice : elles ne deviennent pas des faits du fil rouge. Étienne veut suivre l'état du réseau dans plusieurs vues (stations vides,
vélos en panne, locations du jour) ; sa journée (point du matin, envoi des régulateurs, suivi
des incidents, bilan du soir) ; la vue des stations vides, déjà livrée ; les relevés en double ;
les signalements de pannes, faits par les abonnés dans l'appli ; le seuil des stations presque
vides, pas encore fixé ; le bilan que Charlotte présente au conseil (locations par quartier sur le
mois, puis comparaison au même mois de l'an dernier).

## Banque d'exemples

### Classer l'arbre d'Étienne (4a1)
- **Explication** : le Scrum Guide ne parle que d'éléments du backlog. Quatre mots courants les
  classent par taille : epic (trop gros pour un sprint, morceaux pas tous connus), feature
  (capacité qui sert seule, faite de plusieurs besoins), story (un besoin, tient dans un sprint),
  tâche (travail des Developers pour réaliser une story, dans leur plan : le backlog de sprint).
- **Situation** : Étienne, responsable d'exploitation, veut suivre l'état du réseau dans plusieurs
  vues. Quatre éléments sont proposés pour le backlog, et Dana note un travail pour réaliser le 3 :
  1. « Suivre l'état du réseau. »
  2. « La vue des vélos en panne. »
  3. « Voir, station par station, les vélos signalés en panne. »
  4. (note de Dana) « Écrire la requête qui lit les signalements de pannes pour la vue. »
  5. « Les locations du jour. »
- **Question**, en deux parties : « Classe 1, 3 et 4 en epic, feature, story ou tâche. », puis
  « Pour 2 et 5, que te manque-t-il pour trancher ? »
- **Réponse attendue** :
  1. Classer 1, 3 et 4 : 1 est un epic : il contient plusieurs vues, chacune faite de besoins
     qu'on ne connaît pas encore tous. 3 est une story : un seul besoin, qui tient dans un
     sprint. 4 est une tâche : du travail des Developers pour réaliser 3, qu'Étienne ne voit
     pas ; il va dans leur plan (le backlog de sprint, concept 3), pas au backlog produit.
     Nuance : ces mots sont un vocabulaire courant, pas une règle de Scrum. Dans la correction,
     ne pas dire encore ce qui manque pour 2 et 5 : c'est la partie 2.
  2. 2 et 5 : le libellé ne suffit pas ; il manque ce qu'Étienne veut y voir, c'est-à-dire ses
     besoins : combien il en a pour chaque vue (on les comptera en « je veux » en 4b). 2 contient au moins 3 : si Étienne n'a pas d'autre besoin sur les pannes, 2 et 3 ne
     font qu'une story.
- **Erreurs fréquentes** :
  - Partie 1, classer 1 en story parce que la phrase est courte : c'est l'erreur la plus fréquente
    (un epic classé en story). Relancer : « qu'est-ce que 1 contient ? » ; la liste nomme déjà deux
    vues (2 et 5), en plus de la vue des stations vides, déjà livrée ;
  - Partie 1, mettre 4 au backlog produit parce que le travail est nécessaire : il ne sert qu'à
    réaliser 3, c'est une tâche du plan des Developers. Un travail technique qui porte sa propre
    raison (par exemple dédoublonner les relevés des stations, qui contiennent des doublons : ce
    travail sert plusieurs vues, pas une seule story) entre, lui, au backlog, et le PO l'ordonne ;
  - Partie 2, trancher 2 et 5 sur leur libellé (« une vue, c'est une feature ») : le mot « vue » ne
    fait pas le niveau, les besoins d'Étienne le font.
- **Ce qui marche** : partir du haut et demander ce que chaque élément contient, puis placer
  les éléments dans l'arbre, niveau par niveau.

### « Scrum impose trois niveaux » (4a2)
- **Explication** : les noms et le nombre de niveaux viennent des outils et des équipes, pas du
  Scrum Guide ; chaque outil a ses niveaux par défaut, qui se modifient.
- **Situation** : l'équipe vélos range son backlog. Dana, data engineer : « Scrum impose trois
  niveaux : epic, story, sous-tâche. »
- **Question** : que réponds-tu à Dana ?
- **Réponse attendue** : le Scrum Guide n'impose aucun niveau ; il ne parle que d'éléments du
  backlog. Epic > Story > Subtask, ce sont les niveaux par défaut de Jira, modifiables ;
  Azure DevOps, en processus Agile, ajoute Feature. L'équipe choisit ses niveaux et s'y tient,
  avec le moins de niveaux possible. Quand un niveau est de trop : 4a3, à ne pas dévoiler ici.
- **Erreurs fréquentes** :
  - donner raison à Dana parce que « tout le monde fait comme ça dans Jira » : c'est un réglage
    par défaut d'un outil, pas une règle de Scrum ;
  - croire qu'il faut tous les niveaux possibles, voire ceux de SAFe (capability) : SAFe vise
    plusieurs équipes ; une équipe seule n'en a pas besoin ;
  - ajouter un niveau « thème » au-dessus de l'epic : son sens varie d'un outil et d'un auteur à
    l'autre ; le cours ne l'enseigne pas comme niveau.
- **Ce qui marche** : distinguer trois sources de règles : le Scrum Guide (aucun niveau), l'outil
  (des niveaux par défaut, modifiables), l'équipe (son choix).

### Un niveau de trop ? (4a3)
- **Explication** : un niveau coûte : chaque élément s'y écrit, s'y range et s'y suit. S'il
  double presque toujours le niveau du dessous, il est de trop. C'est un choix du
  cours, pas un consensus.
- **Situation** : Anna, analyste, a obtenu d'ajouter un niveau feature pour les vues d'Étienne :
  l'équipe a quatre niveaux. Quelques sprints plus tard, le backlog des vues d'Étienne compte un
  epic, cinq features et sept stories ; quatre des cinq features ne contiennent qu'une story
  (répartition d'exercice).
- **Question** : que proposes-tu à l'équipe ?
- **Réponse attendue** : le niveau feature est probablement de trop : quand la plupart des
  features ne contiennent qu'une story, la feature répète la story et double l'écriture et le
  suivi. Avant de le retirer, vérifier que ces features ne sont pas des stories mal classées, ou
  des features dont les autres stories ne sont pas encore écrites : si c'est le cas, on reclasse
  et on recompte. Sinon, proposer de retirer le niveau (epic > story > tâche) et d'y revenir si des
  besoins faits de plusieurs besoins distincts reviennent (comptés en « je veux » en 4b). Une
  réponse qui propose de retirer le niveau sans cette vérification est juste : apporter la
  vérification dans la correction. Nuance : c'est un choix du cours, pas un consensus ; une feature
  isolée qui ne contient qu'une story n'est pas un signal. Comment régler les niveaux dans l'outil :
  annexe A1a, à proposer quand l'apprenant en a besoin.
- **Erreurs fréquentes** :
  - garder le niveau « au cas où » : chaque niveau se remplit et se tient à jour ;
  - retirer le niveau story et garder les features : ce sont les stories qui entrent dans les
    sprints.
- **Ce qui marche** : compter, feature par feature, les stories dessous, à voix haute. Après
  « au cas où, ça ne coûte rien » : montrer le coût dans l'outil (une feature à une seule story,
  ce sont deux éléments à écrire, ranger et suivre pour un seul besoin d'Étienne).

### Un seul « je veux » ? (4b)
- **Explication** : un « je veux », c'est un besoin que l'utilisateur dit lui-même, à la
  première personne (« je veux voir… ») ; la story entière s'écrit au concept 5. Écris les « je
  veux » de ce qu'il reste à livrer. Un seul, qui tient dans un sprint : story ; trop gros pour
  un sprint : un epic (au sens de Cohn, une grosse story), qui se découpe (concept 9).
  Plusieurs, chacun utile seul : feature, et chaque « je veux » devient une story candidate.
  Plusieurs groupes, ou des « je veux » qu'on ne sait pas encore écrire : epic. Un « je veux »
  qui en contient d'autres se déplie avant de compter.
- **Situation** : Anna ajoute au backlog : « Charlotte : je veux justifier la subvention devant le
  conseil. » Elle conclut : « Un seul je veux, donc une story. » Pour son bilan, Charlotte a déjà
  cité les locations par quartier sur le mois, puis la comparaison au même mois de l'an dernier ;
  elle n'a pas dit si le bilan contiendra autre chose.
- **Question** : Anna a-t-elle raison ?
- **Réponse attendue** : non. Ce « je veux » en contient d'autres : déplié, il donne au moins
  deux « je veux », chacun utile seul (voir les locations par quartier du mois ; les comparer au
  même mois de l'an dernier), et peut-être d'autres que Charlotte n'a pas encore dits. Des « je
  veux » qu'on ne sait pas encore écrire : epic. Si Charlotte confirme que le bilan s'arrête à ces
  deux-là, c'est une feature. Nuance : une phrase au format d'une story peut cacher plusieurs
  besoins ; le format (concept 5) ne fait pas le niveau.
- **Erreurs fréquentes** :
  - valider la story parce que la phrase a la bonne forme : c'est l'erreur « epic classé en
    story ». Relancer : « qu'est-ce que Charlotte montrera au conseil ? » ;
  - répondre « feature » sans réserve : juste pour les deux « je veux » connus, mais le bilan
    n'est pas tout écrit. Relancer : « Charlotte a-t-elle dit tout ce que contiendra son bilan ? ».
- **Ce qui marche** : faire écrire ce que Charlotte montrera au conseil, ligne par ligne ; le nombre
  de « je veux » obtenus, et ceux qui manquent, tranchent seuls.

### Vélos en panne et locations du jour : feature ou story ? (4b)
- **Situation** : interrogé sur deux vues (propos d'exercice), Étienne dit :
  - vélos en panne : « je veux voir les vélos signalés en panne, station par station » et « je
    veux savoir, au bilan du soir, combien de vélos ont été signalés dans la journée » ;
  - locations du jour : « je veux voir le nombre de locations depuis ce matin, par station ».
- **Question** : chaque vue est-elle une feature ou une story ?
- **Réponse attendue** : vélos en panne : deux « je veux », chacun utile seul (le premier sert à
  la journée, le second au bilan du soir) : feature, avec deux stories candidates. Locations du
  jour : un seul « je veux » : story, même si on l'appelle « vue » comme les autres. Nuance : le
  compte vaut pour aujourd'hui ; si Étienne ajoute un besoin, la story peut devenir une feature, le
  backlog évolue.
- **Erreurs fréquentes** :
  - compter des « je veux » qui ne servent pas seuls (« je veux un filtre par station » sans rien
    à filtrer) : ce sont des morceaux d'un même besoin, pas deux besoins. Relancer : « ce « je
    veux » sert-il à Étienne sans l'autre ? » ;
  - classer les deux vues au même niveau parce qu'elles ont le même nom de « vue ». Relancer :
    « combien de « je veux » Étienne a-t-il dits pour chaque vue ? ».
- **Ce qui marche** : faire écrire les « je veux » par l'apprenant avant de trancher ; deux « je
  veux », chacun utile seul : signal de feature.

### Les stations presque vides : ce qu'il reste à livrer (4b)
- **Situation** : la vue des stations vides est livrée. Étienne demande de voir aussi les stations
  presque vides (demande d'exercice). Le seuil d'une station presque vide n'est pas fixé (3 vélos
  a été cité, sans décision). Diego, data engineer : « Nouvelle vue, nouveau calcul, nouveau
  seuil : c'est une feature. »
- **Question** : feature ou story ?
- **Réponse attendue** : story. On juge le niveau d'après les « je veux » qu'il reste à livrer à
  Étienne, pas d'après le travail technique : la vue des stations vides existe ; il reste un seul
  « je veux » : voir les stations sous le seuil. Le nouveau calcul est du travail des
  Developers, pas un besoin de plus. Sans la vue existante, il resterait au moins deux « je
  veux » (voir les stations vides, voir les stations presque vides), chacun utile seul : une
  feature. Nuance : le seuil n'est pas fixé ; c'est Étienne qui le dira, le PO ne l'invente pas (on y
  revient aux concepts 7 et 8).
- **Erreurs fréquentes** :
  - confondre le travail technique (« un nouveau calcul, c'est gros ») avec les « je veux » de
    Étienne. Relancer : « qu'est-ce qu'Étienne aura de plus, qu'il n'a pas déjà ? » ;
  - proposer soi-même un seuil pour débloquer la story. Relancer : « à qui demanderais-tu ce que veut dire « presque vide » ? » (1b).
- **Ce qui marche** : « qu'est-ce qu'Étienne aura de plus, qu'il n'a pas déjà ? ».

## Schéma

Un arbre qui descend, sur un cas inventé pour l'illustration (des vols de vélos, qui ne sont pas
un fait du fil rouge ni le cas d'un exercice) : à la racine, l'epic « Prévenir les vols » ;
dessous, trois branches : « Alerter les agents » et « Retrouver les vélos » (features, chacune
avec deux stories en feuilles), « Marquer un vélo volé » (story directement sous l'epic). Libellés
fixés des cinq stories : « Détecter un vol probable » et « Alerter un agent » (sous « Alerter les
agents ») ; « Localiser un vélo volé » et « Marquer un vélo retrouvé » (sous « Retrouver les
vélos ») ; « Marquer un vélo volé » (sous l'epic). Sous la story « Détecter un vol probable »,
deux petites tâches grisées, « Lire les positions » et « Écrire la règle », légendées « plan des
Developers, backlog de sprint ». Chaque
niveau a sa couleur. À droite, en face de chaque niveau, le compte de « je veux » qui le
désigne (plusieurs groupes, plusieurs, un seul, aucun vu par l'utilisateur). En bandeau : « Scrum
Guide : des éléments du backlog, sans niveau ; les noms des niveaux sont un choix d'équipe ».
