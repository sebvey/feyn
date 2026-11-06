---
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "Les trois responsabilités (Developers, Product Owner, Scrum Master), le sprint et ses quatre événements, les trois artefacts avec leurs engagements. L'incrément s'ajoute aux précédents ; un sprint peut en produire plusieurs, que l'on peut livrer avant sa fin ; la revue de sprint n'est pas une porte de mise en production."
      refs: ["S1"]
      verified: ["« Scrum defines three specific accountabilities within the Scrum Team » (Scrum Team) ; « four formal events for inspection and adaptation within a containing event, the Sprint » (Scrum Theory) ; « For the Product Backlog it is the Product Goal. For the Sprint Backlog it is the Sprint Goal. For the Increment it is the Definition of Done. » (Scrum Artifacts) ; « Each Increment is additive to all prior Increments » ; « Multiple Increments may be created within a Sprint » ; « The Sprint Review should never be considered a gate to releasing value » (Increment)"]
    - author: "Les limites du Scrum Guide"
      text: "« User story », « vision produit » et « Definition of Ready » n'y figurent pas, pas plus que « ticket », terme d'outil : ils viennent d'autres pratiques, que le parcours aborde plus tard."
      refs: ["S1"]
      verified: ["absent de The Scrum Guide 2020 (texte entier cherché : « vision » et « user story », 0 occurrence ; « Definition of Ready » absente ; « ticket » n'en est pas un terme)"]
  school:
    - text: "Aucun choix d'école dans ce concept : tout ce qu'il enseigne vient du Scrum Guide ou du cours."
      refs: []
  course:
    - text: "Une équipe Scrum qui travaille en sprints : le cours le suppose. Ce n'est ni du consensus ni un choix d'école. Plus tard dans le parcours, quatre unités (la Definition of Ready, la préparation du Sprint Planning, la revue de sprint, la prévision) ont leur équivalent pour le travail sans sprint."
      refs: []
    - text: "Le réflexe : « si on décidait de le livrer maintenant, un utilisateur pourrait-il s'en servir, et la DoD est-elle remplie ? ». Le Guide exige un incrément utilisable et conforme à la DoD ; il n'exige pas qu'il soit livré."
      refs: ["S1"]
      verified: ["« the Increment must be usable » ; « Work cannot be considered part of an Increment unless it meets the Definition of Done » ; « an Increment may be delivered to stakeholders prior to the end of the Sprint » (Increment)"]
    - text: "Une échéance propre à un sprint n'a pas sa place dans la DoD, qui vaut pour tout ce qui entre dans l'incrément. Elle relève de l'objectif de sprint si elle dit ce que le sprint vise, du plan des Developers si elle organise le travail."
      refs: ["S1"]
      verified: ["« Work cannot be considered part of an Increment unless it meets the Definition of Done » (Increment)"]
    - text: "Un pipeline fini mais que personne ne peut consulter n'est pas un incrément."
      refs: ["S1"]
      verified: ["« the Increment must be usable » (Increment)"]
    - text: "La rétrospective réunit l'équipe Scrum, sans les parties prenantes. Le Guide ne nomme que l'équipe Scrum ; le cours en tire que les parties prenantes n'y viennent pas."
      refs: ["S1"]
      verified: ["« The Scrum Team inspects how the last Sprint went » (Sprint Retrospective)"]
diagrams:
  - file: sprint-duree-increment-etat.svg
    title: "Un sprint est une durée, un incrément est un état du produit"
    caption: "Le sprint est une durée (la frise, des blocs de même longueur, collés) ; l'incrément est un état du produit (l'escalier, dont chaque marche s'ajoute aux précédentes et peut tomber à n'importe quel moment). Plusieurs marches dans un même sprint sont possibles. En bas, chaque artefact porte son engagement."
    unit: 0d
---

## L'essentiel

Scrum est un cadre de travail léger, défini par le Scrum Guide (Schwaber et Sutherland, 2020). Une équipe y tient trois **responsabilités** (Product Owner, Scrum Master, Developers), travaille en **sprints** d'un mois au plus, sans pause entre eux, qui contiennent quatre **événements**, et s'appuie sur trois **artefacts**, chacun avec son **engagement**. Un point à ne pas rater : le sprint est une **durée** ; l'**incrément** est le produit dans un nouvel état utilisable, qui remplit la DoD et peut être livré avant la fin du sprint. Qui les confond « livre un sprint » et attend sa fin pour livrer.

Ce cours suppose une équipe Scrum qui travaille en sprints [cours]. Le reste du cours vaut aussi sans sprint ; seuls quatre unités, plus tard dans le parcours, font exception, avec leur équivalent en flux continu : la Definition of Ready, la préparation du Sprint Planning, la revue de sprint et la prévision.

## 0a Trois responsabilités

### 0a1 L'équipe en bref

- **Matière** : Une équipe Scrum est une seule équipe, petite (dix personnes au plus en général), sans sous-équipe ni hiérarchie, tournée vers un seul objectif à la fois, l'objectif produit (l'état futur visé du produit, repris en 0c). Elle s'organise elle-même : elle décide en interne qui fait quoi, quand et comment. Elle porte trois responsabilités ; une responsabilité dit de quoi chacun répond, pas qui commande. Le **Product Owner** (PO) répond de la valeur du produit et du backlog (la liste ordonnée de ce qu'il faut pour améliorer le produit, reprise en 0c) ; les **Developers** réalisent l'incrément (le produit dans un nouvel état utilisable, repris en 0d) ; le **Scrum Master** répond de l'efficacité de l'équipe.
- **Ancrage** : Dans l'équipe vélos, Dana et Diego sont data engineers, Anna analyste, Scarlette Scrum Master, et l'apprenant est le PO. Un collègue de la DSI le croise : « Alors, qui est le chef de l'équipe vélos ? Scarlette, j'imagine, c'est elle qui organise les réunions. »
- **Question** : « Que lui réponds-tu ? Dis qui porte quelle responsabilité dans l'équipe vélos. »
- **Réponse attendue** : il n'y a pas de chef : l'équipe Scrum n'a pas de hiérarchie, elle s'organise elle-même. Le PO (l'apprenant) répond de la valeur de la plateforme et du backlog ; les Developers (Dana, Diego, Anna) réalisent l'incrément ; Scarlette, Scrum Master, répond de l'efficacité de l'équipe. Organiser les réunions ne fait pas d'elle une cheffe.
- **Idées fausses** :
  - « Scarlette est la cheffe, puisqu'elle organise les réunions » : le Scrum Master répond de l'efficacité de l'équipe, il ne la commande pas ; l'équipe n'a pas de hiérarchie.
    - **Relance** : « de quoi répond le Scrum Master ? »
  - « Le PO est le chef, puisqu'il décide de ce qu'on fait » : le PO répond de la valeur du produit et du backlog, pas des personnes ni de leur façon de travailler : l'équipe décide en interne qui fait quoi, quand et comment.
    - **Relance** : « de quoi répond le PO, et qui décide comment faire le travail ? »
- **Consigne** : ce message est le premier du concept : il s'ouvre, toujours, sur l'annonce du parti pris, en deux ou trois lignes. Le cours suppose une équipe Scrum en sprints ; si l'équipe de l'apprenant travaille sans sprint, il le signale, et l'équivalent en flux continu lui sera proposé, plus tard dans le parcours, aux sous-concepts de la Definition of Ready, de la préparation du Sprint Planning, de la revue de sprint et de la prévision (le reste du cours vaut sans sprint). La question du message reste celle de 0a1. S'il dit travailler sans sprint, note dans « Points annoncés pour plus tard » : équivalent en flux continu à proposer pour la Definition of Ready, la préparation du Sprint Planning, la revue de sprint et la prévision. Pour chaque rôle, demander « de quoi répond-il ? ».

### 0a2 Le Product Owner

- **Matière** : Le Product Owner (PO) répond de la valeur du produit. Il répond aussi du backlog produit :
  - formuler l'objectif produit et le faire connaître ;
  - créer les éléments du backlog (toute entrée du backlog, quelle que soit sa taille) et les rendre clairs ;
  - les ordonner ;
  - veiller à ce que le backlog soit transparent, visible et compris.

  Il peut faire ce travail ou le confier à d'autres ; il en reste responsable. C'est une seule personne, pas un comité. Qui veut changer le backlog doit convaincre le PO, et l'organisation respecte ses décisions, visibles dans le contenu et l'ordre du backlog. Ce qu'il tranche face aux Developers et aux parties prenantes vient au concept 1b.
- **Ancrage** : Après une tournée avec Théo (technicien de maintenance), Diego (data engineer) écrit lui-même deux éléments du backlog sur les vélos signalés en panne. Odile (directrice des opérations) s'en étonne : « Ce n'est pas son rôle, c'est le PO qui écrit le backlog. Et puisqu'il les a écrits, Diego va les mettre en tête. »
- **Question**, en deux parties : « Odile a-t-elle raison de dire que ce n'est pas le rôle de Diego d'écrire ces éléments ? », puis « A-t-elle raison de dire que Diego va les mettre en tête ? »
- **Réponse attendue** : non sur les deux.
  1. Diego peut-il écrire des éléments ? Oui : le PO répond de la création des éléments, pas forcément de leur rédaction ; il peut la confier, et en reste responsable : il s'assure qu'ils sont clairs et compris.
  2. Diego peut-il les mettre en tête ? Non : l'ordre reste au PO ; avoir écrit un élément ne donne pas sa place dans le backlog ; Diego, comme Odile, peut convaincre le PO de le placer haut.
- **Idées fausses** :
  - « Le PO, c'est celui qui écrit les tickets ; seul lui écrit le backlog » : le PO répond de la valeur du produit et de ce que contient le backlog, son ordre compris ; il peut confier l'écriture des éléments et en reste responsable. « Ticket » est un terme d'outil, absent du Scrum Guide ; le cours dit « élément du backlog ».
    - **Relance** : « de quoi le PO répond-il : d'écrire, ou de ce que contient le backlog ? »
  - « Diego a écrit les éléments, c'est donc lui qui les ordonne » : l'ordre du backlog reste au PO ; qui écrit un élément peut seulement convaincre le PO de le placer haut.
    - **Relance** : « qui répond de l'ordre du backlog ? »
- **Consigne** : « ticket » se corrige dans la correction, sans en faire une vigilance. Séparer « faire le travail » (confiable) et « en répondre » (le PO seul).

### 0a3 Les Developers

- **Matière** : Les Developers sont les membres de l'équipe qui réalisent l'incrément, quel que soit leur métier : le mot « developers » n'exclut aucune compétence. Ils répondent de quatre choses :
  - créer le backlog de sprint, leur plan pour le sprint (repris en 0c) ;
  - la qualité, en respectant la Definition of Done (DoD), les exigences de qualité de l'équipe (reprise en 0c) ;
  - adapter leur plan chaque jour vers l'objectif de sprint (ce que le sprint vise, fixé à son début, repris en 0c) ;
  - se tenir responsables les uns envers les autres.

  Comment transformer un élément du backlog en incrément, eux seuls le décident.
- **Ancrage** : Dans l'équipe vélos, Dana et Diego (data engineers) construisent les pipelines ; Anna (analyste) calcule les indicateurs (les valeurs que la plateforme calcule pour ses utilisateurs) et les analyses publiés dans les vues de la plateforme. Odile (directrice des opérations) prépare un schéma de l'équipe pour le comité de direction : « Developers : Dana et Diego. À part : Anna, analyste, puisqu'elle ne construit pas les pipelines. »
- **Question** : « Corrige le schéma d'Odile. »
- **Réponse attendue** : Anna est une Developer : elle réalise une partie de l'incrément (les indicateurs, les analyses publiées dans les vues). Les Developers ne se définissent pas par leur métier mais par ce qu'ils réalisent. Dans une équipe Scrum, il n'y a pas de sous-équipe. Nuance à apporter si la réponse ne la donne pas : avec Dana et Diego, elle répond du backlog de sprint, de la qualité selon la DoD, de l'adaptation du plan chaque jour, et chacun se tient responsable envers les autres.
- **Idées fausses** :
  - « Developer veut dire développeur » : les Developers sont ceux qui réalisent l'incrément, quel que soit leur métier.
    - **Relance** : « qui réalise l'incrément de la plateforme ? »
  - « Anna est à part, mais elle aide les Developers » : il n'y a pas de sous-équipe dans une équipe Scrum ; Anna réalise une partie de l'incrément, elle est une Developer.
    - **Relance** : « dans une équipe Scrum, peut-il y avoir un groupe à part ? »
- **Consigne** : demander « qui réalise l'incrément ? » plutôt que « qui code ? ».

### 0a4 Le Scrum Master

- **Matière** : Le Scrum Master répond de l'efficacité de l'équipe Scrum, et de la mise en place de Scrum tel que le décrit le Scrum Guide. Il sert l'équipe : il l'aide à s'organiser elle-même et à se concentrer sur des incréments qui remplissent la DoD, fait lever les obstacles à son avancement, et veille à ce que les événements (les rendez-vous du sprint, repris en 0b) aient lieu, soient utiles et tiennent leur durée. Il sert le PO : il l'aide à trouver des techniques pour l'objectif produit et le backlog, et facilite la collaboration avec les parties prenantes (toute personne ou équipe concernée par le produit, concept 1). Il sert l'organisation, en l'aidant à adopter Scrum. Il n'est pas le chef de l'équipe : l'équipe n'a pas de hiérarchie.
- **Ancrage** : Étienne (responsable d'exploitation) relance Scarlette, la Scrum Master, sur la vue des vélos en panne. Scarlette, qui anime les événements de l'équipe, la remonte en tête du backlog.
- **Question** : « Scarlette pouvait-elle changer l'ordre du backlog ? Que fallait-il faire de la demande d'Étienne ? »
- **Réponse attendue** : non. L'ordre du backlog relève du PO, qui en répond seul ; Scarlette répond de l'efficacité de l'équipe et aide à lever les obstacles. Étienne, ou Scarlette pour lui, porte la demande au PO et cherche à le convaincre ; le PO décide de la place de la vue. Scarlette peut aussi faciliter l'échange entre Étienne et le PO. Si l'apprenant soulève la délégation : vue en 0a2, le PO peut confier le travail d'ordonner et en reste responsable.
- **Idées fausses** :
  - « Scarlette est la cheffe de l'équipe, elle peut » : il n'y a pas de hiérarchie dans l'équipe Scrum ; le Scrum Master sert son efficacité.
    - **Relance** : « de quoi répond le Scrum Master ? »
  - « Scarlette anime les événements, donc elle arbitre » : animer un événement ne donne pas l'ordre du backlog.
    - **Relance** : « de quoi répond le Scrum Master ? »
  - « Les Developers décident de l'ordre, puisqu'ils font le travail » : ils décident comment faire le travail ; l'ordre reste au PO (approfondi au concept 1b).
    - **Relance** : « de quoi répondent les Developers, et de quoi répond le PO ? »
- **Consigne** : pour chaque rôle, demander « de quoi répond-il ? ».

## 0b Le sprint et ses quatre événements

### 0b1 Le sprint en bref

- **Matière** : Le sprint dure un mois au plus, toujours la même durée ; un sprint plus court donne plus de cycles d'apprentissage. Le suivant commence dès que le précédent se termine, sans pause. Il est lui-même un événement, celui qui en contient quatre autres : Sprint Planning au début, Daily Scrum chaque jour, revue de sprint puis rétrospective à la fin. Chaque événement est une occasion d'inspecter le travail et de l'adapter. Pendant le sprint, on ne fait rien qui compromette l'objectif de sprint, et la qualité ne baisse pas. Les durées maximales données pour chaque événement sont celles d'un sprint d'un mois.
- **Ancrage** : Diego (data engineer) propose à l'équipe vélos, qui travaille en sprints de deux semaines : « Après chaque sprint, on souffle une semaine sans sprint, et on fait la rétrospective au retour, à froid. »
- **Question** : « Que réponds-tu à Diego ? Dis ce qui ne va pas dans sa proposition. »
- **Réponse attendue** : deux choses. Le sprint suivant commence dès la fin du précédent : une semaine hors sprint n'existe pas en Scrum. La rétrospective fait partie du sprint et le clôt : elle ne vient pas après. Nuance, à apporter dans la correction : si l'équipe a besoin de souffler, c'est un sujet pour la rétrospective (le rythme de travail ; son but vient en 0b5), pas une pause entre deux sprints. Les deux semaines de l'équipe vélos sont conformes (un mois au plus).
- **Idées fausses** :
  - « Seule la pause pose problème » : la rétrospective, elle aussi, est mal placée : elle fait partie du sprint et le clôt.
    - **Relance** : « et la rétrospective, à quel moment du sprint a-t-elle lieu ? »
  - « Le sprint est un événement comme le Sprint Planning ou la revue » : le sprint est l'événement qui contient les quatre autres, et un sprint suit l'autre sans pause.
- **Consigne** : pour le sprint au même rang que ses événements, réexpliquer avec l'image d'une frise : des blocs collés les uns aux autres, chacun contenant les quatre événements.

### 0b2 Sprint Planning

- **Matière** : Le Sprint Planning (8 heures au plus, en général moins pour un sprint plus court) ouvre le sprint ; toute l'équipe Scrum y prépare le sprint, en trois sujets. L'objectif, les éléments et le plan forment le backlog de sprint (repris en 0c). Comment le PO prépare le Sprint Planning vient plus tard dans le parcours.
  - Pourquoi ce sprint a de la valeur : le PO propose comment le produit peut gagner en valeur pendant le sprint, puis toute l'équipe fixe l'objectif de sprint.
  - Quoi : les Developers choisissent, en discutant avec le PO, les éléments du backlog qu'ils prennent.
  - Comment : les Developers planifient le travail de chaque élément, et eux seuls en décident.
- **Ancrage** : Diego (data engineer) décrit le Sprint Planning de l'équipe vélos à un collègue de l'équipe appli : « Scarlette, la Scrum Master, arrive avec la liste de ce qu'on fait ce sprint, et on se répartit les éléments. »
- **Question** : « Corrige Diego : au Sprint Planning, qui décide de quoi ? »
- **Réponse attendue** : Scarlette ne choisit rien ; elle peut veiller à ce que l'événement ait lieu et soit utile. Le PO propose comment le sprint peut augmenter la valeur ; toute l'équipe fixe l'objectif de sprint ; les Developers (Dana, Diego, Anna) choisissent les éléments en discutant avec le PO, puis font leur plan. Nuance : l'ordre du backlog, le PO le tient en continu ; au planning, il s'en sert pour proposer.
- **Idées fausses** :
  - « C'est le PO qui choisit ce qui entre dans le sprint » : il propose, les Developers choisissent avec lui (approfondi au concept 1b).
    - **Relance** : « qui choisit les éléments, et avec qui ? »
  - « Le PO ordonne le backlog au Sprint Planning » : l'ordre se tient en continu, hors de tout événement ; au planning, le PO s'en sert pour proposer.
- **Consigne** : pour chaque événement, demander « qui y décide quoi ? ».

### 0b3 Daily Scrum

- **Matière** : Le Daily Scrum (15 minutes) est un événement pour les Developers, chaque jour du sprint, à la même heure et au même endroit. Son but : inspecter l'avancement vers l'objectif de sprint et adapter le backlog de sprint, avec un plan pour la journée qui vient. Les Developers choisissent la forme du point. Le PO ou le Scrum Master n'y participent comme Developers que s'ils travaillent eux-mêmes sur des éléments du sprint. Les Developers peuvent adapter leur plan à tout moment de la journée, pas seulement au Daily Scrum.
- **Ancrage** : Diego (data engineer) poursuit : « Chaque matin, au Daily Scrum, chacun dit à Scarlette ce qu'il a fait la veille, et elle note qui est en retard. »
- **Question** : « Corrige Diego. »
- **Réponse attendue** : le Daily Scrum n'est pas un compte rendu à Scarlette. C'est le point des Developers entre eux, sur l'avancement vers l'objectif de sprint ; ils y adaptent leur plan. Scarlette n'en est pas la destinataire ; elle peut aider à lever les obstacles que le point fait apparaître.
- **Idées fausses** :
  - « Le Daily Scrum, ce sont les trois questions : hier, aujourd'hui, les obstacles » : elles ne sont plus dans le Scrum Guide depuis 2020 ; les Developers choisissent la structure du point.
    - **Relance** : « au Daily Scrum, qui y décide quoi ? »
  - « Le Scrum Master anime le Daily Scrum, donc il contrôle l'avancement » : le Daily Scrum est le point des Developers entre eux, pas un compte rendu au Scrum Master.
    - **Relance** : « de quoi répond le Scrum Master ? »
- **Consigne** : demander « au Daily Scrum, qui parle à qui, et pour quoi faire ? ».

### 0b4 Revue de sprint

- **Matière** : La revue de sprint (4 heures au plus) est l'avant-dernier événement du sprint. L'équipe Scrum y présente son travail aux parties prenantes clés, et l'avancement vers l'objectif produit est discuté. Ensemble, ils regardent ce que le sprint a produit et ce qui a changé autour du produit, puis décident de la suite : le backlog peut être adapté. C'est une séance de travail, pas une simple présentation. Ce que le PO y mène vient plus tard dans le parcours.
- **Ancrage** : Diego (data engineer) termine : « Le dernier jour, à la revue, on présente à Étienne, le responsable d'exploitation, des diapositives de ce qui est fini. »
- **Question** : « Corrige Diego : que se passe-t-il vraiment à la revue de sprint ? »
- **Réponse attendue** : la revue est une séance de travail : l'équipe montre son travail, puis l'équipe et les parties prenantes, dont Étienne, inspectent ce que le sprint a produit et ce qui a changé, et adaptent le backlog. Des diapositives seules n'y suffisent pas.
- **Idées fausses** :
  - « À la revue, on rend des comptes à Étienne », ou « c'est un tour de table » : c'est une séance de travail entre l'équipe et les parties prenantes, qui inspectent ce que le sprint a produit et adaptent le backlog.
    - **Relance** : « à la sortie de la revue, qu'est-ce qui a changé ? »
  - « La revue valide la livraison » : la revue n'est pas une porte de mise en production ; on peut livrer avant la fin du sprint (0d).
- **Consigne** : « la revue valide la livraison » vient en 0d : le dire en une ligne, sans réenseigner. Demander « à la sortie de la revue, qu'est-ce qui a changé ? » (le backlog).

### 0b5 Rétrospective

- **Matière** : La rétrospective (3 heures au plus) a pour but de trouver comment gagner en qualité et en efficacité. L'équipe Scrum y inspecte comment s'est passé le sprint : les personnes, leurs échanges, les processus, les outils et la DoD. Elle dit ce qui a bien marché, les problèmes rencontrés, et choisit les changements les plus utiles, qu'elle peut ajouter au backlog du sprint suivant. Elle réunit l'équipe Scrum, sans les parties prenantes [cours]. La rétrospective clôt le sprint.
- **Ancrage** : La vue des vélos en panne a pris du retard. Odile (directrice des opérations) demande à venir à la rétrospective de l'équipe vélos « pour comprendre ce qui a coincé, et en profiter pour revoir l'ordre du backlog ».
- **Question** : « Que réponds-tu à Odile ? »
- **Réponse attendue** : le point testé : la rétrospective est le moment où l'équipe Scrum inspecte sa propre façon de travailler et choisit des améliorations ; l'ordre du backlog ne s'y revoit pas : le PO le tient en continu, et c'est à la revue que les parties prenantes inspectent le travail et que le backlog s'adapte. Sur la présence d'Odile, le Guide ne nomme que l'équipe Scrum ; le cours en tire qu'elle n'y vient pas (choix du cours, à dire comme tel). Une réponse qui la laisse écouter sans toucher à l'ordre n'est pas fausse : apporter la nuance. Odile peut donner son avis sur le retard à la revue de sprint, et faire valoir ses demandes auprès du PO.
- **Idées fausses** :
  - « La rétrospective, c'est faire le bilan du produit » : c'est la façon de travailler qui s'inspecte à la rétrospective ; le produit s'inspecte à la revue.
    - **Relance** : « à la rétrospective, qu'est-ce qu'on inspecte : le produit, ou la façon de travailler ? »
  - « Odile peut y revoir l'ordre du backlog » : l'ordre reste au PO, qui le tient en continu ; les parties prenantes donnent leur avis sur le travail à la revue.
    - **Relance** : « qui répond de l'ordre du backlog, et où les parties prenantes donnent-elles leur avis sur le travail ? »
- **Consigne** : « produit à la revue, façon de travailler à la rétrospective ». Après ce message, le dernier des cinq de 0b, « Le sprint raconté par Diego » sert à l'« exercice » ou à l'entraînement du concept 0 : un récit neuf, qui mêle des erreurs sur les quatre événements.

#### Le sprint raconté par Diego (entraînement)

- **Ancrage** : Diego (data engineer) raconte le sprint de l'équipe appli, qu'il a observé : « Au Sprint Planning, le PO arrive avec l'objectif de sprint déjà écrit et la liste des éléments. Le Daily Scrum dure une heure, et Odile, la directrice des opérations, y vient chaque matin. À la revue, Scarlette, qui est aussi la Scrum Master de l'équipe appli, présente seule le travail. La rétrospective, on la saute quand le sprint s'est bien passé. »
- **Question** : « Corrige le récit de Diego : relève chaque erreur et dis ce qui se passe vraiment. »
- **Réponse attendue** : quatre erreurs.
  1. Au Sprint Planning, le PO propose comment le sprint peut augmenter la valeur, mais c'est toute l'équipe qui fixe l'objectif de sprint, et les Developers choisissent les éléments avec le PO.
  2. Le Daily Scrum dure 15 minutes et sert aux Developers ; Odile n'y a pas sa place, il ne sert pas à suivre l'équipe.
  3. La revue est une séance de travail entre l'équipe Scrum et les parties prenantes, pas la présentation d'une seule personne ; le Scrum Master ne répond pas du travail présenté.
  4. La rétrospective fait partie de chaque sprint, qu'il se soit bien passé ou non : c'est elle qui le clôt, et l'équipe y cherche toujours comment s'améliorer.

  Trois erreurs sur quatre : réponse partielle, relancer sur celle qui manque.
- **Idées fausses** :
  - « Le PO fixe seul l'objectif de sprint » : il propose comment le sprint peut augmenter la valeur ; toute l'équipe fixe l'objectif.
  - « On peut sauter la rétrospective quand le sprint s'est bien passé » : elle fait partie de chaque sprint et le clôt.
    - **Relance** : « Et la rétrospective sautée ? »

## 0c Trois artefacts, trois engagements

- **Matière** : Les artefacts représentent le travail ou la valeur. Chacun porte un engagement, un repère pour juger l'avancement :
  - le **backlog produit**, liste ordonnée et émergente de ce qu'il faut pour améliorer le produit, seule source du travail de l'équipe, a pour engagement l'**objectif produit**, l'état futur visé à long terme ;
  - le **backlog de sprint** (l'objectif de sprint, les éléments choisis, le plan des Developers) a pour engagement l'**objectif de sprint**, l'objectif unique du sprint ;
  - l'**incrément** a pour engagement la **Definition of Done**, la description de l'état qu'il doit atteindre.

  Les engagements n'ont pas la même durée de vie. L'objectif produit et la DoD valent d'un sprint à l'autre (la rétrospective peut faire évoluer la DoD) ; l'objectif de sprint ne vaut que pour un sprint. Une échéance propre à un sprint n'a donc pas sa place dans la DoD [cours].
- **Ancrage** : L'objectif produit de l'équipe vélos : « Que les stations du centre-ville restent le moins longtemps possible vides aux heures de pointe, grâce à des données à jour pour l'exploitation. » La DoD de l'équipe vélos exige notamment que chaque vue affiche l'heure de sa dernière mise à jour. Ce sprint, la vue des stations vides est dans le backlog de sprint. Anna propose d'ajouter à la DoD : « La vue des stations vides est livrée à Étienne avant mercredi. »
- **Question**, en deux parties : « Cette phrase a-t-elle sa place dans la DoD ? Pourquoi ? », puis « Où irait-elle sinon ? »
- **Réponse attendue** :
  1. Sa place dans la DoD : non. La DoD vaut pour tout ce qui entre dans l'incrément, sprint après sprint (comme l'heure de dernière mise à jour) ; une échéance propre à un élément et à ce sprint n'y a pas sa place.
  2. Où irait-elle : dans le backlog de sprint : dans l'objectif de sprint si elle exprime ce que le sprint vise (qu'Étienne voie les stations vides), dans le plan des Developers si elle organise le travail (livrer la vue avant mercredi). Les deux réponses sont justes si elles sont justifiées. L'objectif produit est la cible à long terme et ne change pas à chaque sprint : la phrase n'y va pas.
- **Idées fausses** :
  - « La DoD est un artefact » : la DoD est l'engagement de l'incrément ; les artefacts sont le backlog produit, le backlog de sprint et l'incrément.
  - « La phrase va dans l'objectif produit, parce que c'est important » : l'objectif produit est la cible à long terme et ne change pas à chaque sprint.
    - **Relance** : « est-ce que ça vaudra encore au prochain sprint ? »
- **Consigne** : la première idée fausse touche la partie 1 de la question, la seconde la partie 2 ; pour la première, réexpliquer. Demander « est-ce que ça vaudra encore au prochain sprint ? » : oui pour la DoD et l'objectif produit, non pour l'objectif de sprint.

## 0d Sprint et incrément

- **Matière** : Le sprint est une durée, qui contient les événements. L'incrément est une étape concrète vers l'objectif produit : le produit dans un nouvel état utilisable. Il naît à l'instant où un élément du backlog remplit la DoD, et il s'ajoute à tous les précédents. Trois conséquences :
  - plusieurs incréments peuvent naître dans un même sprint ;
  - on peut livrer un incrément avant la fin du sprint : la revue de sprint n'est pas une porte de mise en production, et la seule règle pendant le sprint est de ne rien changer qui mette en danger l'objectif de sprint ;
  - un travail qui ne remplit pas la DoD ne fait pas partie de l'incrément : il n'est ni livré, ni présenté à la revue, et retourne au backlog produit, où le PO l'ordonne avec le reste.

  On ne « livre » donc pas un sprint : on livre des incréments, au moment où ils existent. Il faut aussi qu'un incrément soit utilisable : un travail fini mais que personne ne peut consulter n'en est pas un [cours].
- **Ancrage** : Sprint de deux semaines de l'équipe vélos. Le mercredi de la deuxième semaine, la vue des stations vides remplit la DoD (elle affiche l'heure de sa dernière mise à jour) et elle est livrée : Étienne peut s'en servir. Dana objecte : « On aurait dû attendre la revue de sprint, c'est elle qui valide la livraison. »
- **Question** : « Dana a-t-elle raison ? Qu'est-ce qui a été livré mercredi ? »
- **Réponse attendue** : non. Mercredi, c'est un incrément qui a été livré : la plateforme dans un nouvel état utilisable, avec la vue, conforme à la DoD ; pas le sprint, qui continue jusqu'à son terme et peut produire d'autres incréments. On peut livrer avant la fin du sprint ; la revue n'est pas une porte de mise en production. Nuance à apporter dans la correction : à la revue, l'équipe et les parties prenantes, dont Étienne, inspectent ce que le sprint a produit, la vue comprise, et adaptent le backlog.
- **Idées fausses** :
  - « Un sprint, une livraison : on livre le sprint » : le sprint est une durée ; on livre des incréments, un ou plusieurs, au moment où ils existent, ou pas du tout pendant un sprint. Erreur fréquente en formation.
    - **Relance** : « le sprint : une durée, ou un état du produit ? »
  - « Livrer avant la fin casse le sprint » : rien n'oblige à attendre la revue ; pendant le sprint, la règle est de ne pas compromettre l'objectif de sprint.
  - « Le pipeline qui charge les relevés des stations est fini, c'est donc un incrément » : un travail fini que personne ne peut consulter, sans vue ni export, n'est pas un incrément ; un incrément est utilisable et remplit la DoD.
    - **Relance** : « si on décidait de le livrer maintenant, un utilisateur pourrait-il s'en servir ? »
- **Consigne** : pour la deuxième idée fausse, réexpliquer. Distinguer le sprint et la livraison grâce à l'incrément (« une durée, ou un état du produit ? ») ; l'image d'un escalier dont chaque marche est un incrément, avec une marche le mercredi. « Le sprint est livré » sert à l'« exercice » ou à l'entraînement.

#### « Le sprint est livré » (entraînement)

- **Ancrage** : Dernier jour d'un autre sprint. La vue des vélos en panne est finie, mais elle n'affiche pas encore l'heure de sa dernière mise à jour. Diego annonce : « Le sprint est livré. On montre la vue en revue et on la met en service ; l'heure, on l'ajoutera au prochain sprint. »
- **Question** : « Corrige l'annonce de Diego. »
- **Réponse attendue** : on ne livre pas un sprint, on livre un incrément. La vue ne remplit pas la DoD : elle ne fait pas partie de l'incrément ; elle n'est ni livrée ni présentée à la revue, et retourne au backlog produit, où le PO l'ordonne avec le reste. Seul le travail conforme à la DoD forme l'incrément.
- **Idées fausses** :
  - « C'est un détail, on peut la montrer à la revue » : un élément qui ne remplit pas la DoD n'est pas présenté à la revue.
    - **Relance** : « si on la livrait maintenant, la DoD serait-elle remplie ? »
  - « Finie, donc livrée » : finie pour les Developers ne veut pas dire conforme à la DoD.
    - **Relance** : « si on la livrait maintenant, la DoD serait-elle remplie ? »
  - « Le sprint est livré, c'est une façon de parler » : la formule entretient la confusion entre la durée et l'incrément.
    - **Relance** : « Diego dit « le sprint est livré » : qu'est-ce qui se livre ? »

## Repères

> « Si on décidait de le livrer maintenant, un utilisateur pourrait-il s'en servir, et la DoD est-elle remplie ? »

Si oui aux deux, c'est un incrément, quel que soit le jour du sprint. Formulation du cours, appuyée sur l'incrément utilisable et la DoD du Scrum Guide.

## Consigne

Le niveau du concept est celui du Scrum Guide : de quoi chacun répond (0a) ; le but de chaque événement, qui y décide quoi, sa durée maximale (0b). Ce que l'apprenant a dit de Scrum à l'accueil (« Avant le parcours » de `learner/apprenant.md`) ne fait sauter aucun message : le message de l'unité qui le traite le rappelle (« tu l'as dit : … »), plus court.
