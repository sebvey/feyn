---
stances:
  consensus:
    - text: "Un produit est un moyen de livrer de la valeur, avec des frontières claires, des parties prenantes connues et des utilisateurs ou clients bien définis."
      author: "Le Scrum Guide 2020 : le produit"
      refs: [S1]
      verified: ["« A product is a vehicle to deliver value. It has a clear boundary, known stakeholders, well-defined users or customers. » (Commitment: Product Goal)"]
    - text: "Le PO répond de la valeur du produit et du backlog : il formule l'objectif produit, crée les éléments, les ordonne et rend le backlog transparent. Il est une seule personne, pas un comité ; il peut déléguer ce travail, mais il en reste responsable. Qui veut changer le backlog doit le convaincre. L'organisation respecte ses décisions, visibles dans le contenu et l'ordre du backlog."
      author: "Le Scrum Guide 2020 : le PO"
      refs: [S1]
      verified: ["« accountable for maximizing the value of the product » ; « Developing and explicitly communicating the Product Goal » ; « Ordering Product Backlog items » ; « The Product Owner is one person, not a committee. » ; « Regardless, the Product Owner remains accountable. » ; « Those wanting to change the Product Backlog can do so by trying to convince the Product Owner. » ; « the entire organization must respect their decisions » (Product Owner)"]
    - text: "Le comment revient aux seuls Developers, qui estiment aussi la taille des éléments ; le PO peut les aider à comprendre les arbitrages. Le travail du sprint, les Developers le choisissent en discussion avec le PO : le PO ne le fixe pas seul."
      author: "Le Scrum Guide 2020 : les Developers"
      refs: [S1]
      verified: ["« How this is done is at the sole discretion of the Developers » ; « Through discussion with the Product Owner, the Developers select items from the Product Backlog to include in the current Sprint » (Sprint Planning) ; « The Developers who will be doing the work are responsible for the sizing. The Product Owner may influence the Developers by helping them understand and select trade-offs. » (Product Backlog)"]
  school:
    - text: "Décrire un produit par son groupe cible et ses « besoins » : les problèmes qu'il retire aux utilisateurs et les bénéfices qu'il leur apporte. Le cours en tire la grille problème, utilisateurs, valeur ; le Scrum Guide nomme déjà les utilisateurs et la valeur."
      author: "Roman Pichler : Product Vision Board"
      refs: [S5, S1]
      verified: ["« the problems and pain points the product removes, and the benefits or gains it creates for the users and the customers » (article, les « needs » du tableau)", "« A product is a vehicle to deliver value. It has a clear boundary, known stakeholders, well-defined users or customers. » (Commitment: Product Goal)"]
    - text: "Traiter les consommateurs de données comme des clients. Le propriétaire d'un produit de données doit savoir qui en sont les utilisateurs et comment ils s'en servent."
      author: "Zhamak Dehghani : data mesh"
      refs: [S2]
      verified: ["« the consumers of that data should be treated as customers » (article)"]
  course:
    - text: "La grille problème, utilisateurs, valeur : le cours sépare le problème et la valeur, que Pichler réunit sous « besoins », et n'emploie pas « besoin », réservé aux stories."
      refs: [S5]
      verified: ["« the problems and pain points the product removes, and the benefits or gains it creates for the users and the customers » (article, les « needs » du tableau)"]
    - text: "Les consommateurs de données sont des utilisateurs du produit (cas inventé : un service d'analyse qui reçoit un jeu de données, un organisme qui reçoit des indicateurs). Choix du cours, appuyé sur le choix d'école de Dehghani."
      refs: [S2]
      verified: ["« the consumers of that data should be treated as customers » (article)"]
    - text: "Une partie prenante est toute personne ou équipe concernée par le produit : utilisateur, financeur, sponsor, équipe voisine, fournisseur de données. Le sponsor porte le budget du produit et porte plus haut les obstacles qui dépassent le PO, sans ordonner le backlog. Le Scrum Guide emploie « stakeholders » sans le définir."
      refs: [S1]
      verified: ["absent de The Scrum Guide 2020 (texte entier) : une définition de « stakeholders », mot employé sans être défini"]
    - text: "Le PO obtient les faits du métier auprès des utilisateurs, au lieu de les trancher seul."
      refs: []
diagrams:
  - file: produit-probleme-utilisateurs-valeur.svg
    title: "Un produit se décrit par un problème, des utilisateurs et une valeur ; trois acteurs se partagent les décisions"
    caption: "En haut, le produit se décrit par un problème, des utilisateurs et une valeur ; les consommateurs de données sont des utilisateurs. En bas, qui tranche quoi : le PO représente les parties prenantes dans le backlog et répond de la valeur."
    unit: 1a
---

## L'essentiel

Un produit livre de la valeur à des utilisateurs connus. Ce cours le décrit par trois choses : le **problème** qu'il résout, les **utilisateurs** qui ont ce problème (un consommateur de données en est un), la **valeur** qu'ils en tirent, plutôt que par sa technique. Le **Product Owner** répond de cette valeur : il tient le backlog produit, donc il dit **quoi**, **dans quel ordre** et **pourquoi**. Les **Developers** décident **comment** et donnent le **coût**. Les **parties prenantes** font valoir leurs besoins en convainquant le PO, qui est une seule personne.

## 1a Le produit : problème, utilisateurs, valeur

- **Matière** : Le Scrum Guide définit un produit comme un moyen de livrer de la valeur, avec des utilisateurs et des parties prenantes connus [consensus]. Roman Pichler (Product Vision Board) le décrit par son groupe cible et par les problèmes qu'il lui retire et les bénéfices qu'il lui apporte [école]. Le cours en tire une grille à trois cases : le problème, les utilisateurs, la valeur [cours].

  La technique dit comment le produit est fait, pas pourquoi il existe. Signe qu'une description en reste là : un abonné qui la lirait ne comprendrait pas à quoi sert la plateforme. La technique n'est pas interdite, elle vient après, pour qui demande comment c'est fait.

  La **valeur** est ce que l'utilisateur ou l'organisation gagne (du temps, une meilleure décision, un risque évité). Une phrase qui dit seulement ce que le produit affiche ou calcule n'a pas encore de valeur : il faut dire ce que la personne fait ou obtient grâce à lui, et ce que cela change pour elle. Si le PO ne le sait pas, il le demande à la personne concernée, il ne l'invente pas.

  Un **utilisateur** est une personne ou une équipe qui se sert du produit. Pour un produit data, un consommateur de données en est un, même s'il n'ouvre aucun écran du produit. Dehghani, dans le data mesh, va dans ce sens : traiter les consommateurs de données comme des clients [école]. Le cours en fait un choix : un service d'analyse qui reçoit un jeu de données, un organisme qui reçoit des indicateurs sont des utilisateurs du produit [cours].
- **Ancrage** : Un nouvel arrivant chez l'opérateur demande ce qu'est la plateforme. Un data engineer répond : « Un entrepôt qui collecte les relevés des stations toutes les 5 minutes, avec des vues et des alertes par-dessus. » Étienne, lui, fait chaque matin le point sur l'état du réseau avant d'envoyer les régulateurs.
- **Question** : « Réécris cette présentation avec la grille problème, utilisateurs, valeur, en deux ou trois phrases, sans mot technique. »
- **Réponse attendue** : par exemple : « Aux heures de pointe, des stations du centre-ville se vident et les abonnés n'y trouvent plus de vélo. La plateforme montre à l'exploitation (Étienne et ses régulateurs) quelles stations sont vides, pour qu'ils y apportent des vélos plus vite. Elle fournit aussi à la collectivité des indicateurs pour justifier sa subvention, et à l'équipe appli les données qu'affiche l'appli. » Attendu : un problème, des utilisateurs nommés, ce qui change pour eux. Nuance : la technique n'est pas interdite ; elle vient après, pour qui demande comment c'est fait.
- **Idées fausses** :
  - « La plateforme centralise les données » : c'est encore la technique ; la phrase ne dit ni pour qui ni ce qui change.
  - « Elle offre des vues, des alertes et des indicateurs » : une liste de fonctions sans utilisateur n'a pas de valeur ; il faut dire ce que la personne fait ou obtient grâce à elles.
  - « La valeur, c'est d'avoir une vue des stations vides » : c'est un livrable ; la valeur est ce que l'utilisateur gagne grâce à lui.
  - « Les utilisateurs, ce sont ceux qui regardent les vues » : un consommateur de données, qui reçoit des données ou des indicateurs, est un utilisateur, pas seulement un destinataire de rapports.
  - « Étienne gagne une heure par jour » : ce qu'un utilisateur gagne est un fait du métier ; le PO le demande à la personne concernée, il ne l'invente pas.
- **Consigne** : l'objectif produit et la mesure du résultat viennent plus tard dans le parcours : ici, on s'arrête à « ce qui change pour une personne nommée ». Dans l'unité comme dans ses cas, à une valeur qui reste un livrable, demander « et alors ? » ; à un gain chiffré, demander « d'où vient ce chiffre ? ». Ne citer que l'exploitation n'est pas une erreur : apporter dans la correction la collectivité (qui finance le service et reçoit des indicateurs) et l'équipe appli (qui reçoit des données), que l'apprenant ne connaît pas encore comme utilisatrices. Faire présenter la plateforme à un abonné : s'il ne comprend pas à quoi elle sert, la phrase parle encore de technique. En rechange, « « Et alors ? » » ; « L'équipe appli, utilisatrice de la plateforme ? » sert à l'entraînement, ou quand l'apprenant doute qu'un consommateur de données soit un utilisateur.

#### L'équipe appli, utilisatrice de la plateforme ? (entraînement)

- **Ancrage** : L'équipe appli (sa PO : Pia) affiche dans l'appli des abonnés des données qu'elle reçoit de la plateforme. Diego dit : « Les utilisateurs de la plateforme, ce sont Étienne et ses régulateurs. L'équipe appli, c'est une équipe voisine, pas une utilisatrice. »
- **Question** : « Diego a-t-il raison ? Justifie. »
- **Réponse attendue** : non. L'équipe appli se sert des données de la plateforme : c'est une utilisatrice, avec son besoin (recevoir les données qu'affiche l'appli) et sa valeur (montrer aux abonnés des données justes et à jour). À apporter dans la correction si l'apprenant ne le dit pas, ce que ça change pour le PO : les besoins de l'équipe appli entrent au backlog et s'ordonnent avec ceux d'Étienne ; la justesse et la fraîcheur (l'âge des données quand on les lit) des données livrées comptent pour elle autant qu'un écran pour Étienne. Nuance : Diego n'a pas tout faux, une même équipe peut être à la fois utilisatrice de la plateforme et équipe voisine dont dépend une partie du travail (une dépendance, vue plus tard dans le parcours) ; dans les deux cas, c'est une partie prenante. Faire des consommateurs de données des utilisateurs est un choix du cours, appuyé sur le data mesh (choix d'école de Dehghani).
- **Idées fausses** :
  - « Un utilisateur est une personne devant un écran » : on se sert d'un produit par ses écrans ou par ses données.
  - « Les utilisateurs, ce sont les abonnés » : ils profitent de la plateforme à travers l'appli, mais le besoin que la plateforme sert directement est celui de l'équipe appli.

#### « Et alors ? » (rechange)

- **Ancrage** : Théo, technicien de maintenance, répare les vélos sur le terrain. Dans une présentation de ce que la plateforme pourrait apporter à la maintenance, une phrase dit : « La plateforme montrera les vélos signalés en panne. »
- **Question** : « Que manque-t-il à cette phrase selon la grille ? Corrige-la. »
- **Réponse attendue** : il manque l'utilisateur et la valeur : « montrer », et alors ? Par exemple : « Théo, technicien de maintenance, prépare sa tournée de réparation à partir des vélos signalés en panne. » La phrase dit ce que fait Théo grâce à la plateforme, pas ce qu'elle affiche. Nuance : ce que ça change par rapport à aujourd'hui, et combien de temps Théo y gagne, le PO ne le sait pas ; il le demande à Théo, ou à Maud, la responsable maintenance qui encadre les techniciens ; il ne l'invente pas.
- **Idées fausses** :
  - « La plateforme montrera les vélos signalés en panne depuis la source des signalements » : c'est ajouter de la technique, pas de la valeur.
  - « Théo gagne une heure par jour » : c'est inventer la valeur au lieu de la demander.

## 1b Qui tranche quoi

- **Matière** : Le concept 0 a situé les trois responsabilités de l'équipe Scrum ; voici qui décide quoi.

  Le PO répond de la valeur du produit et du backlog. Il formule l'objectif produit, crée les éléments, les ordonne et les explique : c'est lui qui dit le quoi, l'ordre et le pourquoi. Il est une seule personne, pas un comité [consensus]. Il peut confier une partie du travail, mais il en reste responsable.

  Les Developers décident du comment et donnent le coût (la taille des éléments). Le PO peut les aider à comprendre les arbitrages, il ne choisit pas la technique à leur place. Le travail du sprint, les Developers le choisissent en discussion avec le PO, quels éléments comme combien : le PO ne le fixe pas seul.

  Les parties prenantes sont toutes les personnes ou équipes concernées par le produit : les utilisateurs, le financeur, le sponsor, une équipe voisine, un fournisseur de données [cours]. Elles font valoir leurs besoins, et qui veut changer le backlog doit convaincre le PO. Le sponsor porte le budget du produit et porte plus haut les obstacles qui dépassent le PO, sans ordonner le backlog. Arbitrer entre parties prenantes et escalader viennent plus tard dans le parcours.
- **Ancrage** : La plateforme se rafraîchit toutes les 5 minutes. Dana, data engineer, propose de passer les relevés des stations en streaming. Diego te demande : « Tu valides ? »
- **Question** : « Dans cette proposition, qu'est-ce qui relève de toi, PO, et qu'est-ce qui relève des Developers ? »
- **Réponse attendue** : le streaming est un comment : le choix de la technique et son coût reviennent aux Developers ; le PO n'a pas à « valider » une technique. Ce qui relève du PO : le besoin derrière. Des données plus fraîches changeraient-elles quelque chose pour Étienne ou les régulateurs ? Le PO le leur demande, sans le trancher seul. Si le besoin existe, il devient un élément du backlog que le PO crée, explique (le pourquoi) et ordonne face aux autres, une fois que les Developers en ont donné la taille. Nuance : même un travail purement technique passe par le backlog, seule source de travail de l'équipe Scrum ; le PO l'ordonne en écoutant l'argument des Developers. Si l'apprenant objecte qu'une cible de fraîcheur existe déjà (moins de 15 minutes, règle fixée) : la question du PO devient « la cible est-elle tenue, et descendre en dessous changerait-il quelque chose pour Étienne ? » ; le moyen de la tenir (streaming ou autre) reste aux Developers.
- **Idées fausses** :
  - « Le streaming, c'est trop lourd pour nous » : choisir ou refuser la technique, ou l'estimer à la place des Developers, c'est garder la casquette de développeur ; le comment et le coût reviennent aux Developers.
  - « C'est technique, ça ne me regarde pas » : le PO perd le pourquoi (qui y gagne ?) et l'ordre ; même un travail technique passe par le backlog.
  - « Les régulateurs ont besoin du temps réel » : c'est un fait métier, que le PO demande à Étienne au lieu de le trancher seul.
  - « Le PO décide du quoi, donc du contenu du sprint » : il propose et ordonne le backlog ; les Developers choisissent avec lui ce qu'ils prennent.
  - « Les demandeurs votent l'ordre », ou « deux PO se partagent le backlog » : le PO est une seule personne, pas un comité ; déléguer le travail est permis, pas la responsabilité.
- **Consigne** : rappel de 0b2 : les Developers choisissent les éléments avec le PO ; 1b y ajoute la quantité. En 15 lignes, s'en tenir au PO face aux Developers, avec la définition des parties prenantes en une ligne ; le comité et la délégation viennent par un cas supplémentaire ou par la correction. Exemple de fournisseur de données : Sid, le DSI, qui donne les accès aux données des systèmes. Couper la proposition en deux questions : « qu'est-ce que ça change pour un utilisateur ? » (PO) et « comment on le fait, pour quel coût ? » (Developers). En rechange, « Un vote pour ordonner le backlog » ; « Deux PO pour la plateforme ? » et « Qui choisit le travail du sprint ? » servent à l'entraînement.

#### Un vote pour ordonner le backlog (rechange)

- **Ancrage** : Les demandes arrivent d'Étienne (responsable d'exploitation), de Maud (responsable maintenance), de Charlotte (chargée de mission mobilité, pour la collectivité, qui reçoit des indicateurs de la plateforme) et de Pia (PO de l'équipe appli, qui reçoit des données de la plateforme). Pour éviter les conflits, Odile (directrice des opérations, sponsor de la plateforme, dont elle porte le budget) propose que ces quatre personnes votent l'ordre du backlog à chaque sprint.
- **Question** : « Que réponds-tu à Odile ? Dis qui tranche l'ordre et quelle place gardent les quatre demandeurs. »
- **Réponse attendue** : l'ordre revient au PO, une seule personne, pas un comité (Scrum Guide). Étienne, Maud, Charlotte et Pia sont des parties prenantes : ils font valoir leurs besoins, et qui veut changer l'ordre doit convaincre le PO. Le PO les écoute, représente leurs besoins dans le backlog et explique ses choix (le pourquoi). Avec un vote, personne ne répondrait de la valeur. Charlotte et Pia sont aussi des utilisatrices (Charlotte pour la collectivité, Pia pour l'équipe appli : des consommateurs de données, vus en 1a) : tout utilisateur est une partie prenante. Nuance : Odile est le sponsor (elle porte le budget de la plateforme et porte plus haut les obstacles qui dépassent le PO) ; l'ordre, lui, reste au PO, et un obstacle qui le dépasse se porte plus haut (l'escalade, vue plus tard dans le parcours), ce qui n'a rien d'un vote à chaque sprint.
- **Idées fausses** :
  - « Un vote, c'est plus juste » : avec un vote, personne ne répond de la valeur ni de l'ordre.
  - « Le PO ordonne seul, sans écouter ni expliquer » : il écoute les parties prenantes, représente leurs besoins et explique ses choix.
  - « Le PO peut-il vraiment ordonner seul si les demandeurs ne sont pas d'accord ? » : oui, c'est sa responsabilité ; ce doute est sain, le parcours y répond plus tard (arbitrer, dire non avec l'objectif produit).

#### Deux PO pour la plateforme ? (entraînement)

- **Ancrage** : Pia, PO de l'équipe appli, connaît bien les données qu'affiche l'appli. Odile propose que Pia et toi teniez ensemble le backlog de la plateforme : chaque PO ordonnerait ses propres demandes.
- **Question** : « Que réponds-tu à Odile ? »
- **Réponse attendue** : un produit a un seul PO, une seule personne ; plusieurs équipes sur un même produit partagent le même PO (Scrum Guide). Pia est PO de l'appli ; pour la plateforme, elle est utilisatrice et partie prenante : ses besoins entrent au backlog quand elle t'en convainc, et tu les ordonnes face à ceux d'Étienne, Maud et Charlotte. Avec deux PO, deux ordres se contrediraient et personne ne répondrait de l'ensemble. Nuance : tu peux confier une partie du travail sur le backlog (écrire des éléments, par exemple), tu en restes responsable (vu au concept 0) ; le Scrum Guide ne parle pas de « proxy PO ».
- **Idées fausses** :
  - « Deux PO, c'est plus rapide, et Pia connaît mieux les données de l'appli » : la connaissance de Pia sert le backlog par la discussion, pas par le partage du rôle.
  - « Partager le rôle, c'est déléguer » : confier du travail est permis, partager la responsabilité non.

#### Qui choisit le travail du sprint ? (entraînement)

- **Ancrage** : Au Sprint Planning, tu arrives avec le backlog ordonné et annonces : « Ce sprint, on fait les six premiers éléments. » Dana répond qu'au vu du travail, l'équipe peut en prendre quatre.
- **Question** : « Tu dis six, Dana dit quatre : qui tranche combien d'éléments entrent, et que gardes-tu, toi ? »
- **Réponse attendue** : ni l'un ni l'autre seul. Le PO propose comment le sprint peut augmenter la valeur du produit, et l'ordre du backlog dit ce qui vient en premier ; les Developers choisissent, en discussion avec le PO, les éléments qu'ils prennent, puisqu'ils savent ce qu'ils peuvent faire. Ici, l'équipe prend sans doute les quatre premiers, et le PO vérifie que ce sont bien les plus utiles. Nuance : le PO décide de l'ordre du backlog, pas de la quantité de travail du sprint. À retenir : « dans quel ordre » (PO) et « combien on en prend » (Developers, avec le PO).
- **Idées fausses** :
  - « Le PO décide du quoi, donc du contenu du sprint » : il décide de l'ordre, les Developers choisissent ce qu'ils prennent avec lui.
  - « Les Developers choisissent seuls » : la discussion avec le PO fait partie du choix.

## Se vérifier

> Ma phrase dit-elle **qui** a **quel problème**, et **ce qui change** pour lui une fois résolu ?
> Pour une décision : est-ce un quoi, un ordre ou un pourquoi (PO), ou un comment ou un coût
> (Developers) ?

Formulation du cours, appuyée sur la définition du produit et sur les responsabilités du Scrum Guide.
