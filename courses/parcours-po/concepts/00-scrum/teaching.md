## Consignes

1. **Annonce du parti pris** (en tête du premier message du concept, celui de 0a1 l'équipe en
   bref, toujours) : le cours suppose une équipe Scrum en sprints ; si l'équipe de l'apprenant
   travaille sans sprint, il le signale, et l'annexe A2 lui sera proposée aux sous-concepts 11b,
   15b, 15c et 16c (le reste du cours vaut sans sprint). L'annonce invite l'apprenant à signaler
   son cas, en deux ou trois lignes ; la question du message est celle de 0a1. S'il dit
   travailler sans sprint, note dans « Points annoncés pour plus tard » : annexe A2 à proposer en
   11b, 15b, 15c et 16c.
2. **Ce que l'apprenant sait déjà** : ce qu'il a dit de Scrum à l'accueil (« Avant le parcours »
   de `learner/apprenant.md`) ne fait sauter aucun message ; l'explication du sous-concept qui le
   traite le rappelle (« tu l'as dit : … »), plus court.
3. **0a le cadre**, en trois parties. 0a1 et 0a2 ne tiennent pas chacun en un message (« Reste
   court ») : l'enseignant les découpe comme ci-dessous, une partie par message, chacune avec
   son cas (point 5). Les trois parties :
   - **0a1 les responsabilités**, en quatre messages, chacun avec son explication, son exemple
     et sa question, dans cet ordre : l'équipe en bref, le PO, les Developers, le Scrum Master.
     Le niveau est celui du Scrum Guide : de quoi chacun répond. Ce que le PO tranche face aux
     Developers et aux parties prenantes vient au concept 1b ;
   - **0a2 le sprint et ses quatre événements**, en cinq messages, chacun avec son explication,
     son exemple et sa question, dans cet ordre : le sprint en bref, Sprint Planning, Daily
     Scrum, revue de sprint, rétrospective. Le niveau est celui du Scrum Guide : le but de
     l'événement, qui y décide quoi, sa durée maximale. Comment le PO prépare le Sprint
     Planning et mène la revue vient aux concepts 15b et 15c ;
   - **0a3 les artefacts et leurs engagements**, en un message.
4. **0b sprint et incrément** : le sprint est une durée qui contient les événements ;
   l'incrément est le produit dans un nouvel état utilisable, qui naît dès qu'un élément remplit
   la DoD, s'ajoute aux précédents, et peut être livré avant la fin du sprint ; un élément qui ne
   remplit pas la DoD n'en fait pas partie (ni livré ni présenté à la revue, il retourne au
   backlog produit). Le message de 0b pose « La vue des stations vides livrée un mercredi » ;
   « « Le sprint est livré » » sert d'exercice ou de creusage.
5. **Cas de la banque** : pour 0a1 et 0a2, un par message, dans l'ordre des messages, l'en-tête
   du cas nommant sa partie, par exemple (0a1, le PO). Pour 0a1, « Qui est le chef de l'équipe
   vélos ? », « Diego écrit des éléments du backlog », « Anna est-elle une Developer ? », « Qui
   tranche dans l'équipe vélos » ; pour 0a2, « Une semaine pour souffler », « Scarlette choisit le travail du sprint », « Le
   compte rendu du matin », « Des diapositives pour Étienne », « Odile veut assister à la
   rétrospective », puis « Le sprint raconté par Diego » après les cinq messages, en exercice ou
   au creusage ; pour 0a3, « Trois artefacts, trois engagements ».

## Banque d'exemples

### Qui est le chef de l'équipe vélos ? (0a1, l'équipe en bref)
- **Explication** : une équipe Scrum est petite (en général dix personnes au plus), sans
  sous-équipe ni hiérarchie, tournée vers un seul objectif à la fois, l'objectif produit (l'état
  futur visé du produit, détaillé en 0a3). Elle s'organise elle-même : elle décide en interne qui
  fait quoi, quand et comment. Elle porte trois responsabilités, chacune vue en détail dans un
  message à elle : le **Product Owner** (PO) répond de la valeur du produit et du backlog (la
  liste ordonnée de ce qu'il faut pour améliorer le produit, détaillée en 0a3) ; les **Developers**
  réalisent l'incrément (le produit dans un nouvel état utilisable, détaillé en 0b) ; le **Scrum
  Master** répond de l'efficacité de l'équipe.
  Une responsabilité dit de quoi chacun répond, pas qui commande.
- **Situation** : dans l'équipe vélos, Dana et Diego sont data engineers, Anna analyste,
  Scarlette Scrum Master, et l'apprenant est le PO. Un collègue de la DSI le croise : « Alors,
  qui est le chef de l'équipe vélos ? Scarlette, j'imagine, c'est elle qui organise les
  réunions. »
- **Question** : « Que lui réponds-tu ? Dis qui porte quelle responsabilité dans l'équipe
  vélos. »
- **Réponse attendue** : il n'y a pas de chef : l'équipe Scrum n'a pas de hiérarchie, elle
  s'organise elle-même. Le PO (l'apprenant) répond de la valeur de la plateforme et du backlog ;
  les Developers (Dana, Diego, Anna) réalisent l'incrément ; Scarlette, Scrum Master, répond de
  l'efficacité de l'équipe. Organiser les réunions ne fait pas d'elle une cheffe.
- **Erreurs fréquentes** :
  - « Scarlette, puisqu'elle organise » : relancer : « de quoi répond le Scrum Master ? ».
  - « Le PO, puisqu'il décide de ce qu'on fait » : le PO répond de la valeur du produit et du
    backlog, pas des personnes ni de leur façon de travailler : l'équipe décide en interne qui
    fait quoi, quand et comment. Relancer : « de quoi répond le PO, et qui décide
    comment faire le travail ? ».
- **Ce qui marche** : pour chaque rôle, demander « de quoi répond-il ? ».

### Diego écrit des éléments du backlog (0a1, le PO)
- **Explication** : le PO répond de la valeur du produit. Il répond aussi du backlog produit :
  formuler l'objectif produit et le faire connaître ; créer les éléments du backlog (toute entrée
  du backlog, quelle que soit sa taille ; détaillés au concept 3) et les rendre clairs ; les
  ordonner ; veiller à ce que le backlog soit transparent, visible et compris. Il peut faire ce
  travail ou le confier à d'autres ; il en reste responsable. C'est une seule personne, pas un
  comité. Qui veut changer le backlog doit convaincre le PO, et l'organisation respecte ses
  décisions, visibles dans le contenu et l'ordre du backlog.
- **Situation** : après une tournée avec Théo (technicien de maintenance), Diego (data
  engineer) écrit lui-même deux éléments du backlog sur les vélos signalés en panne. Odile
  (directrice des opérations) s'en étonne : « Ce n'est pas son rôle, c'est le PO qui écrit le
  backlog. Et puisqu'il les a écrits, Diego va les mettre en tête. »
- **Question**, en deux parties : « Odile a-t-elle raison de dire que ce n'est pas le rôle de
  Diego d'écrire ces éléments ? », puis « A-t-elle raison de dire que Diego va les mettre en
  tête ? »
- **Réponse attendue** : non sur les deux.
  1. Diego peut-il écrire des éléments ? Oui : le PO répond de la création des éléments, pas
     forcément de leur rédaction ; il peut la confier, et en reste responsable : il s'assure
     qu'ils sont clairs et compris.
  2. Diego peut-il les mettre en tête ? Non : l'ordre reste au PO ; avoir écrit un élément ne
     donne pas sa place dans le backlog ; Diego, comme Odile, peut convaincre le PO de le
     placer haut.
- **Erreurs fréquentes** :
  - Partie 1, « oui, seul le PO écrit le backlog » : il en répond, il peut confier le travail.
    Relancer : « de quoi le PO répond-il : d'écrire, ou de ce que contient le backlog ? ».
  - Partie 2, « Diego a écrit, Diego ordonne » : relancer : « qui répond de l'ordre du
    backlog ? ».
  - « Ticket » : terme d'outil, absent du Scrum Guide ; le cours dit « élément du backlog ». Le
    dire dans la correction, sans vigilance.
- **Ce qui marche** : séparer « faire le travail » (confiable) et « en répondre » (le PO seul).

### Anna est-elle une Developer ? (0a1, les Developers)
- **Explication** : les Developers sont les membres de l'équipe qui réalisent l'incrément, quel
  que soit leur métier : le mot « developers » n'exclut aucune compétence. Ils répondent de quatre
  choses : créer le backlog de sprint, leur plan pour le sprint (détaillé en 0a3) ; la qualité, en
  respectant la Definition of Done (DoD), les exigences de qualité de l'équipe (reprise en 0a3,
  détaillée au concept 11) ; adapter leur plan chaque jour vers l'objectif de sprint (ce que le
  sprint vise, fixé à son début, détaillé en 0a3) ; se tenir responsables les uns envers les
  autres. Comment transformer un élément du backlog en incrément, eux seuls le décident.
- **Situation** : dans l'équipe vélos, Dana et Diego (data engineers) construisent les
  pipelines ; Anna (analyste) calcule les indicateurs (les valeurs que la plateforme calcule pour ses
  utilisateurs) et les analyses publiés dans les vues de
  la plateforme. Odile (directrice des opérations) prépare un schéma de l'équipe pour le comité
  de direction : « Developers : Dana et Diego. À part : Anna, analyste, puisqu'elle ne construit
  pas les pipelines. »
- **Question** : « Corrige le schéma d'Odile. »
- **Réponse attendue** : Anna est une Developer : elle réalise une partie de l'incrément (les
  indicateurs, les analyses publiées dans les vues). Les Developers ne se définissent pas par
  leur métier mais par ce qu'ils réalisent. Dans une équipe Scrum, il n'y a pas de sous-équipe.
  Nuance à apporter si la réponse ne la donne pas : avec Dana et Diego, elle répond du backlog
  de sprint, de la qualité selon la DoD, de l'adaptation du plan chaque jour, et chacun se tient
  responsable envers les autres.
- **Erreurs fréquentes** :
  - « Developer veut dire développeur » : relancer : « qui réalise l'incrément de la
    plateforme ? ».
  - « Anna est à part, mais elle aide les Developers » : il n'y a pas de sous-équipe. Relancer :
    « dans une équipe Scrum, peut-il y avoir un groupe à part ? ».
- **Ce qui marche** : « qui réalise l'incrément ? » plutôt que « qui code ? ».

### Qui tranche dans l'équipe vélos (0a1, le Scrum Master)
- **Explication** : le Scrum Master répond de l'efficacité de l'équipe Scrum, et de la mise en
  place de Scrum tel que le décrit le Scrum Guide. Il sert l'équipe : il l'aide à s'organiser
  elle-même, à se concentrer sur des incréments qui remplissent la DoD, fait lever les obstacles à
  son avancement, et veille à ce que les événements (les rendez-vous fixes du sprint, détaillés en 0a2)
  aient lieu, soient utiles et tiennent leur durée. Il sert le PO : il l'aide à trouver des
  techniques pour l'objectif produit et le backlog, et facilite la collaboration avec les parties
  prenantes (toute personne ou équipe concernée par le produit, reprises au concept 1). Il sert
  l'organisation, en l'aidant à adopter Scrum. Il n'est pas le chef de l'équipe.
- **Situation** : Étienne (responsable d'exploitation) relance Scarlette, la Scrum Master, sur la
  vue des vélos en panne. Scarlette, qui anime les événements de l'équipe, la remonte en tête du
  backlog.
- **Question** : « Scarlette pouvait-elle changer l'ordre du backlog ? Que fallait-il faire de la
  demande d'Étienne ? »
- **Réponse attendue** : non. L'ordre du backlog relève du PO, qui en répond seul ; Scarlette répond
  de l'efficacité de l'équipe et aide à lever les obstacles. Étienne, ou Scarlette pour lui, porte la
  demande au PO et cherche à le convaincre ; le PO décide de la place de la vue. Scarlette peut
  aussi faciliter l'échange entre Étienne et le PO. Si l'apprenant soulève la délégation : vue au
  message sur le PO, le PO peut confier le travail d'ordonner et en reste responsable.
- **Erreurs fréquentes** :
  - « Scarlette est la cheffe de l'équipe, elle peut » : il n'y a pas de hiérarchie dans l'équipe
    Scrum ; le Scrum Master sert son efficacité. Relancer : « de quoi répond le Scrum
    Master ? ».
  - « Scarlette anime, donc elle arbitre » : animer un événement ne donne pas l'ordre du backlog.
    Relancer : « de quoi répond le Scrum Master ? ».
  - « Les Developers décident de l'ordre puisqu'ils font le travail » : ils décident comment
    faire le travail ; l'ordre reste au PO (approfondi au concept 1b). Relancer : « de quoi
    répondent les Developers, et de quoi répond le PO ? ».
- **Ce qui marche** : pour chaque rôle, demander « de quoi répond-il ? ».

### Une semaine pour souffler (0a2, le sprint en bref)
- **Explication** : le sprint est une durée fixe, d'un mois au plus ; un sprint plus court donne
  plus de cycles d'apprentissage. Le suivant commence dès la fin du précédent, sans pause. Le
  sprint est lui-même un événement, celui qui contient les quatre autres : Sprint Planning au
  début, Daily Scrum chaque jour, revue de sprint puis rétrospective à la fin. Chaque événement
  est une occasion d'inspecter le travail et de l'adapter. Pendant le sprint, on ne fait rien
  qui compromette l'objectif de sprint, et la qualité ne baisse pas.
- **Situation** : Diego (data engineer) propose à l'équipe vélos, qui travaille en sprints de
  deux semaines : « Après chaque sprint, on souffle une semaine sans sprint, et on fait la
  rétrospective au retour, à froid. »
- **Question** : « Que réponds-tu à Diego ? Dis ce qui ne va pas dans sa proposition. »
- **Réponse attendue** : deux choses. Le sprint suivant commence dès la fin du précédent : une
  semaine hors sprint n'existe pas en Scrum. La rétrospective fait partie du sprint et le
  clôt : elle ne vient pas après. Nuance, à apporter dans la correction : si l'équipe a besoin
  de souffler, c'est un sujet pour la rétrospective (le rythme de travail ; son but vient au
  message sur la rétrospective), pas une pause entre deux sprints. Les deux semaines de
  l'équipe vélos sont conformes (un mois au plus).
- **Erreurs fréquentes** :
  - Ne relever que la pause : relancer : « et la rétrospective, à quel moment du sprint
    a-t-elle lieu ? ».
  - Mettre le sprint au même rang que le Sprint Planning ou la revue : le sprint est l'événement
    qui contient les quatre autres. Réexpliquer avec l'image d'une frise : des blocs collés les
    uns aux autres, chacun contenant les quatre événements.
- **Ce qui marche** : l'image d'une frise, des blocs collés les uns aux autres.

### Scarlette choisit le travail du sprint (0a2, Sprint Planning)
- **Explication** : le Sprint Planning ouvre le sprint ; toute l'équipe Scrum y prépare le
  sprint, en trois sujets. Pourquoi ce sprint a-t-il de la valeur : le PO propose comment le
  produit peut gagner en valeur pendant le sprint, puis toute l'équipe fixe l'objectif de
  sprint. Quoi : les Developers choisissent, en discutant avec le PO, les éléments du backlog
  qu'ils prennent. Comment : les Developers planifient le travail de chaque élément, et eux
  seuls en décident. L'objectif, les éléments et le plan forment le backlog de sprint (0a3).
  Durée : 8 heures au plus pour un sprint d'un mois, en général moins pour un sprint plus court.
- **Situation** : Diego (data engineer) décrit le Sprint Planning de l'équipe vélos à un
  collègue de l'équipe appli : « Scarlette, la Scrum Master, arrive avec la liste de ce qu'on
  fait ce sprint, et on se répartit les éléments. »
- **Question** : « Corrige Diego : au Sprint Planning, qui décide de quoi ? »
- **Réponse attendue** : Scarlette ne choisit rien ; elle peut veiller à ce que l'événement ait
  lieu et soit utile. Le PO propose comment le sprint peut augmenter la valeur ; toute l'équipe
  fixe l'objectif de sprint ; les Developers (Dana, Diego, Anna) choisissent les éléments en
  discutant avec le PO, puis font leur plan. Nuance : l'ordre du backlog, le PO le tient en
  continu ; au planning, il s'en sert pour proposer.
- **Erreurs fréquentes** :
  - « C'est le PO qui choisit ce qui entre dans le sprint » : il propose, les Developers
    choisissent avec lui (approfondi au concept 1b). Relancer : « qui choisit les éléments, et
    avec qui ? ».
  - « Le PO ordonne le backlog au Sprint Planning » : l'ordre se tient en continu, hors de tout
    événement. Le dire dans la correction.
- **Ce qui marche** : pour chaque événement, demander « qui y décide quoi ? ».

### Le compte rendu du matin (0a2, Daily Scrum)
- **Explication** : le Daily Scrum est un événement de 15 minutes pour les Developers, chaque
  jour du sprint, à la même heure et au même endroit. Son but : inspecter l'avancement vers
  l'objectif de sprint et adapter le backlog de sprint, avec un plan pour la journée qui vient.
  Les Developers choisissent la forme du point. Le PO ou le Scrum Master n'y participent comme
  Developers que s'ils travaillent eux-mêmes sur des éléments du sprint. Les Developers peuvent
  adapter leur plan à tout moment de la journée, pas seulement au Daily Scrum.
- **Situation** : Diego (data engineer) poursuit : « Chaque matin, au Daily Scrum, chacun dit à
  Scarlette ce qu'il a fait la veille, et elle note qui est en retard. »
- **Question** : « Corrige Diego. »
- **Réponse attendue** : le Daily Scrum n'est pas un compte rendu à Scarlette. C'est le point
  des Developers entre eux, sur l'avancement vers l'objectif de sprint ; ils y adaptent leur
  plan. Scarlette n'en est pas la destinataire ; elle peut aider à lever les obstacles que le
  point fait apparaître.
- **Erreurs fréquentes** :
  - Citer les trois questions (hier, aujourd'hui, obstacles) comme règle du Daily Scrum : elles
    ne sont plus dans le Scrum Guide depuis 2020 ; les Developers choisissent la structure du
    point. Relancer : « au Daily Scrum, qui y décide quoi ? ».
  - « Le Scrum Master anime, donc il contrôle l'avancement » : relancer : « de quoi répond le
    Scrum Master ? ».
- **Ce qui marche** : demander « au Daily Scrum, qui parle à qui, et pour quoi faire ? ».

### Des diapositives pour Étienne (0a2, revue de sprint)
- **Explication** : la revue de sprint est l'avant-dernier événement du sprint. L'équipe Scrum
  y présente son travail aux parties prenantes clés, et l'avancement vers
  l'objectif produit est discuté. Ensemble, ils regardent ce que le sprint a produit et ce qui a
  changé autour du produit, puis décident de la suite : le backlog peut être adapté. C'est une
  séance de travail, pas une simple présentation. Durée : 4 heures au plus pour un sprint d'un
  mois. Ce que le PO y mène vient au concept 15c.
- **Situation** : Diego (data engineer) termine : « Le dernier jour, à la revue, on présente à
  Étienne, le responsable d'exploitation, des diapositives de ce qui est fini. »
- **Question** : « Corrige Diego : que se passe-t-il vraiment à la revue de sprint ? »
- **Réponse attendue** : la revue est une séance de travail : l'équipe montre son travail, puis
  l'équipe et les parties prenantes, dont Étienne, inspectent ce que le sprint a produit et ce
  qui a changé, et adaptent le backlog. Des diapositives seules n'y suffisent pas.
- **Erreurs fréquentes** :
  - « On rend des comptes à Étienne » ou « c'est un tour de table » : relancer : « à la sortie
    de la revue, qu'est-ce qui a changé ? » (le backlog).
  - « La revue valide la livraison » : vient en 0b ; le dire en une ligne, sans réenseigner.
- **Ce qui marche** : demander « à la sortie de la revue, qu'est-ce qui a changé ? ».

### Odile veut assister à la rétrospective (0a2, rétrospective)
- **Explication** : la rétrospective a pour but de trouver comment gagner en qualité et en
  efficacité. L'équipe Scrum y inspecte comment s'est passé le sprint : les personnes, leurs
  échanges, les processus, les outils et la DoD. Elle dit ce qui a bien marché, les problèmes
  rencontrés, et choisit les changements les plus utiles, qu'elle peut ajouter au backlog du
  sprint suivant. La rétrospective clôt le sprint. Durée : 3 heures au plus pour un sprint d'un
  mois.
- **Situation** : la vue des vélos en panne a pris du retard. Odile (directrice des opérations)
  demande à venir à la rétrospective de l'équipe vélos « pour comprendre ce qui a coincé, et en
  profiter pour revoir l'ordre du backlog ».
- **Question** : « Que réponds-tu à Odile ? »
- **Réponse attendue** : le point testé : la rétrospective est le moment où l'équipe Scrum
  inspecte sa propre façon de travailler et choisit des améliorations ; l'ordre du backlog ne
  s'y revoit pas : le PO le tient en continu, et c'est à la revue que les parties prenantes
  inspectent le travail et que le backlog s'adapte. Sur la présence d'Odile, le Guide ne nomme
  que l'équipe Scrum ; le cours en tire qu'elle n'y vient pas (choix du cours, à dire comme
  tel). Une réponse qui la laisse écouter sans toucher à l'ordre n'est pas fausse : apporter la
  nuance. Odile peut donner son avis sur le retard à la revue de sprint, et faire valoir ses
  demandes auprès du PO.
- **Erreurs fréquentes** :
  - « La rétrospective, c'est faire le bilan du produit » : c'est la façon de travailler qui
    s'inspecte, le produit s'inspecte à la revue. Relancer : « à la rétrospective, qu'est-ce
    qu'on inspecte : le produit, ou la façon de travailler ? ».
  - Accepter qu'Odile y revoie l'ordre : relancer : « qui répond de l'ordre du backlog, et où
    les parties prenantes donnent-elles leur avis sur le travail ? ».
- **Ce qui marche** : « produit à la revue, façon de travailler à la rétrospective ».

### Le sprint raconté par Diego (0a2, creusage)
- **Usage** : après les cinq messages de 0a2, pour « exercice » ou au creusage du concept 0 ; un
  récit neuf, qui mêle des erreurs sur les quatre événements.
- **Situation** : Diego (data engineer) raconte le sprint de l'équipe appli, qu'il a observé :
  « Au Sprint Planning, le PO arrive avec l'objectif de sprint déjà écrit et la liste des
  éléments. Le Daily Scrum dure une heure, et Odile, la directrice des opérations, y vient chaque
  matin. À la revue, Scarlette, qui est aussi la Scrum Master de l'équipe appli, présente seule
  le travail. La rétrospective, on la saute quand le sprint s'est bien passé. »
- **Question** : « Corrige le récit de Diego : relève chaque erreur et dis ce qui se passe
  vraiment. »
- **Réponse attendue** : quatre erreurs.
  1. Au Sprint Planning, le PO propose comment le sprint peut augmenter la valeur, mais c'est
     toute l'équipe qui fixe l'objectif de sprint, et les Developers choisissent les éléments
     avec le PO.
  2. Le Daily Scrum dure 15 minutes et sert aux Developers ; Odile n'y a pas sa place, il ne
     sert pas à suivre l'équipe.
  3. La revue est une séance de travail entre l'équipe Scrum et les parties prenantes, pas la
     présentation d'une seule personne ; le Scrum Master ne répond pas du travail présenté.
  4. La rétrospective fait partie de chaque sprint, qu'il se soit bien passé ou non : c'est elle
     qui le clôt, et l'équipe y cherche toujours comment s'améliorer.

  Trois erreurs sur quatre : réponse partielle, relancer sur celle qui manque (ex. « Et la
  rétrospective sautée ? »).
- **Erreurs fréquentes** : celles des exemples « Une semaine pour souffler », « Scarlette
  choisit le travail du sprint », « Le compte rendu du matin », « Des diapositives pour
  Étienne » et « Odile veut assister à la rétrospective ».

### Trois artefacts, trois engagements (0a3)
- **Explication** : les artefacts représentent le travail ou la valeur ; chacun a un
  engagement, qui donne un repère pour juger l'avancement. Le backlog produit, liste ordonnée et
  émergente de ce qu'il faut pour améliorer le produit, seule source du travail (concept 3), a
  pour engagement l'objectif produit, l'état futur visé, à long terme (concept 2). Le backlog de
  sprint (objectif de sprint, éléments choisis, plan des Developers) a pour engagement
  l'objectif de sprint, l'objectif unique du sprint (concept 15). L'incrément a pour engagement
  la Definition of Done, la description de l'état que doit atteindre l'incrément (concept 11).
  Les engagements n'ont pas la même durée de vie : l'objectif produit et la DoD valent d'un
  sprint à l'autre (la rétrospective peut faire évoluer la DoD), l'objectif de sprint ne vaut
  que pour un sprint.
- **Situation** : l'objectif produit de l'équipe vélos : « Que les stations du centre-ville
  restent le moins longtemps possible vides aux heures de pointe, grâce à des données à jour pour
  l'exploitation. » La DoD de l'équipe vélos exige notamment que chaque vue affiche l'heure de
  sa dernière mise à jour. Ce sprint, la vue des stations vides est dans le backlog de sprint.
  Anna propose d'ajouter à la DoD : « La vue des stations vides est livrée à Étienne avant mercredi. »
- **Question**, en deux parties : « Cette phrase a-t-elle sa place dans la DoD ? Pourquoi ? »,
  puis « Où irait-elle sinon ? »
- **Réponse attendue** :
  1. Sa place dans la DoD : non. La DoD vaut pour tout ce qui entre dans l'incrément, sprint
     après sprint (comme l'heure de dernière mise à jour) ; une échéance propre à un élément et
     à ce sprint n'y a pas sa place.
  2. Où irait-elle : dans le backlog de sprint : dans l'objectif de sprint si elle exprime ce
     que le sprint vise (qu'Étienne voie les stations vides), dans le plan des Developers si
     elle organise le travail (livrer la vue avant mercredi). Les deux réponses sont justes si
     elles sont justifiées. L'objectif produit est la cible à long terme et ne change pas à
     chaque sprint : la phrase n'y va pas.
- **Erreurs fréquentes** :
  - Partie 1, confondre artefact et engagement (« la DoD est un artefact ») : la DoD est
    l'engagement de l'incrément. Réexpliquer.
  - Partie 2, mettre la phrase dans l'objectif produit « parce que c'est important » :
    l'objectif produit ne change pas à chaque sprint. Relancer : « est-ce que ça vaudra encore
    au prochain sprint ? ».
- **Ce qui marche** : demander « est-ce que ça vaudra encore au prochain sprint ? » ; oui pour la
  DoD et l'objectif produit, non pour l'objectif de sprint.

### La vue des stations vides livrée un mercredi (0b)
- **Explication** : le sprint est une durée, qui contient les événements ; l'incrément est le
  produit dans un nouvel état utilisable. Dès qu'un élément remplit la DoD, un incrément naît ;
  il s'ajoute aux précédents. Un sprint peut en produire plusieurs, et on peut livrer un incrément avant la fin du sprint : la
  revue de sprint n'est pas une porte de mise en production. Un élément qui ne remplit pas la
  DoD ne fait pas partie de l'incrément : il n'est ni livré ni présenté à la revue, et retourne
  au backlog produit, où le PO l'ordonne avec le reste.
- **Situation** : sprint de deux semaines de l'équipe vélos. Le mercredi de la deuxième semaine,
  la vue des stations vides remplit la DoD (elle affiche l'heure de sa dernière mise à jour) et
  elle est livrée : Étienne peut s'en servir. Dana objecte : « On aurait dû attendre la revue de
  sprint, c'est elle qui valide la livraison. »
- **Question** : « Dana a-t-elle raison ? Qu'est-ce qui a été livré mercredi ? »
- **Réponse attendue** : non. Mercredi, c'est un incrément qui a été livré : la plateforme dans
  un nouvel état utilisable, avec la vue, conforme à la DoD ; pas le sprint, qui continue
  jusqu'à son terme et peut produire d'autres incréments. On peut livrer avant la fin du
  sprint ; la revue n'est pas une porte de mise en production. Nuance à apporter dans la
  correction : à la revue, l'équipe et les parties prenantes, dont Étienne, inspectent ce que
  le sprint a produit, la vue comprise, et adaptent le backlog.
- **Erreurs fréquentes** :
  - « Un sprint, une livraison » : le sprint est une durée, on peut livrer plusieurs fois, ou
    pas du tout, pendant un sprint. Relancer : « le sprint : une durée, ou un état du
    produit ? ».
  - « Livrer avant la fin casse le sprint » : rien n'oblige à attendre ; pendant le sprint, la
    règle est de ne pas compromettre l'objectif de sprint. Réexpliquer.
- **Ce qui marche** : distinguer le sprint et la livraison grâce à l'incrément (« une durée, ou
  un état du produit ? ») ; l'image d'un escalier dont chaque marche est un incrément, avec une
  marche le mercredi.

### « Le sprint est livré » (0b, exercice ou creusage)
- **Explication** : un élément qui ne remplit pas la DoD ne fait pas partie de l'incrément : il
  n'est ni livré ni présenté à la revue de sprint, et retourne au backlog produit, où le PO
  l'ordonne avec le reste.
- **Situation** : dernier jour d'un autre sprint. La vue des vélos en panne est finie, mais elle
  n'affiche pas encore l'heure de sa dernière mise à jour. Diego annonce : « Le sprint est livré.
  On montre la vue en revue et on la met en service ; l'heure, on l'ajoutera au prochain
  sprint. »
- **Question** : « Corrige l'annonce de Diego. »
- **Réponse attendue** : on ne livre pas un sprint, on livre un incrément. La vue ne remplit pas
  la DoD : elle ne fait pas partie de l'incrément ; elle n'est ni livrée ni présentée à la revue,
  et retourne au backlog produit, où le PO l'ordonne avec le reste. Seul le travail conforme à la
  DoD forme l'incrément.
- **Erreurs fréquentes** :
  - « C'est un détail, on peut la montrer » : un élément qui ne remplit pas la DoD n'est pas
    présenté à la revue. Relancer : « si on la livrait maintenant, la DoD serait-elle
    remplie ? ».
  - « Finie, donc livrée » : finie pour les Developers ne veut pas dire conforme à la DoD.
    Relancer : « si on la livrait maintenant, la DoD serait-elle remplie ? ».
  - Laisser passer « le sprint est livré » comme une façon de parler : la formule entretient la
    confusion entre la durée et l'incrément. Relancer : « Diego dit « le sprint est livré » :
    qu'est-ce qui se livre ? ».
- **Ce qui marche** : poser le test rapide en le formulant, appliqué à la vue : « Si on la livrait
  maintenant, un utilisateur pourrait-il s'en servir, et la DoD serait-elle remplie ? »

## Schéma

Une frise de sprints : des blocs de temps de même longueur, collés les uns aux autres. Dans
chaque bloc, le Sprint Planning au début, un petit trait par jour pour le Daily Scrum, la revue
puis la rétrospective à la fin. Au-dessus, un escalier qui monte : chaque marche est un
incrément qui s'ajoute aux précédents ; les marches tombent à des moments variés, plusieurs
possibles dans un même sprint. Légende : « sprint : une
durée », « marche : un incrément ». À côté, un tableau de trois lignes : backlog
produit et objectif produit, backlog de sprint et objectif de sprint, incrément et DoD.
En 0a2 (le sprint en bref), la frise seule ; l'escalier vient en 0b, le tableau en 0a3.
