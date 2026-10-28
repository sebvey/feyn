## Consignes

1. **11a DoD** : une seule DoD, pour toute story ; elle dit quand un élément entre dans
   l'incrément (renvoi au concept 0, 0a3, sans le réenseigner). Un critère est propre à une
   story ; une règle métier est une vérité du domaine (concept 8). Exemple principal : « DoD ou
   critère : les trois exigences d'Étienne ». En rechange, ou si l'apprenant demande ce qui
   arrive à une story qui ne remplit pas la DoD : « L'exception demandée par Étienne » (la
   conséquence se renvoie au concept 0b). Aparté possible :
   « La DoD évolue ».
2. **11b DoR** : choix d'école ; ce que dit le Scrum Guide (prêt à être choisi au Sprint
   Planning) ; décider si une story est prête, et quoi faire sinon. Au planning, le PO propose,
   les Developers choisissent (concept 0 ; détail au concept 15b). Exemple principal : « La
   story d'Étienne sans accès aux locations ». En rechange, ou pour « exercice » : « Une DoR qui
   devient barrière ». La dépendance envers la DSI s'appuie sur le concept 10b, sans le
   réenseigner. 11b suppose des sprints : à l'apprenant qui travaille sans sprint,
   proposer l'annexe A2a.

## Faits du fil rouge utilisés

Les vues d'Étienne (stations vides, vélos en panne, locations du
jour) ; chaque vue d'Étienne affiche l'heure de la dernière mise à jour (DoD de l'équipe) ;
relevés en double, défaut connu des relevés des stations, que la DoD fait détecter par un test
automatique avant publication ; chaque indicateur publié a sa définition écrite (DoD, ajoutée
en rétrospective : aparté « La DoD évolue ») ; un vélo disponible est un vélo à
quai et louable ; un vélo retiré du service par un technicien n'est plus louable ; DoR de
l'équipe vélos : critères d'acceptation écrits, règles métier fixées, dépendances
identifiées, accès aux données obtenu ; accès à la table des locations demandé à la DSI
(Sid), pas encore obtenu, la DSI demandant de justifier chaque colonne ; les locations
rendues à la même station au bout de quelques minutes : les compter ou non n'est pas fixé
pour les indicateurs ; la vue des locations du jour, pas encore construite, montrera toutes
les locations, courtes comprises.
Developers : Dana, Diego (data engineers), Anna (analyste) ; sprints de deux semaines. Les
autres exigences proposées (l'exigence 2 de « DoD ou critère », les ajouts de Diego à la DoR),
les répliques des Developers et d'Étienne, et les nombres de vélos sont des
propositions d'exercice : ils ne deviennent pas des faits du fil rouge. Le seuil « presque
vide », la définition d'une station vide et les heures de pointe ne sont pas fixés : aucun
exemple ne les fixe. Le prof ne demande jamais à l'apprenant de fixer une règle.

## Banque d'exemples

### DoD ou critère : les trois exigences d'Étienne (11a)

- **Explication** : la DoD, vue au concept 0 (0a3), dit quand un élément entre dans l'incrément.
  Il n'y en a qu'une, pour toute story (et pour toutes les équipes d'un même produit) : on
  l'écrit une fois, on ne la recopie pas dans chaque story. Une exigence de la DoD peut ne viser
  qu'une sorte de travail (cas inventé : toute story qui change un calcul est relue par un
  second Developer) : elle reste la même pour toute story de cette sorte. Un critère
  d'acceptation est propre à une story (concept 8). Le Scrum Guide ne parle pas de critère :
  cette distinction est un consensus (pratique établie, hors du Scrum Guide ; Mike Cohn). Le
  contenu de la DoD est propre au produit (ou à l'organisation) : le Scrum Guide ne le fixe pas.
- **Situation** : Étienne, responsable d'exploitation, suit plusieurs vues (stations vides,
  vélos en panne, locations du jour). Trois exigences sont notées en vrac :
  1. Chaque vue affiche l'heure de la dernière mise à jour des données.
  2. Dans la vue des stations vides, chaque station affichée indique ses vélos disponibles :
     5 vélos à quai, dont 1 retiré du service, donnent 4.
  3. Les relevés en double sont détectés par un test automatique avant publication.
- **Question** : pour chacune, DoD ou critère d'acceptation d'une story ? Et pourquoi ?
- **Réponse attendue** : 1 DoD : elle vaut pour toutes les vues, on ne la recopie pas dans
  chaque story. 2 critère : un cas précis, propre à la story de la vue des stations vides, qui
  illustre la règle fixée « un vélo disponible est un vélo à quai et louable ». 3 DoD : une
  exigence de qualité des données, la même pour toute story qui publie des relevés. Test :
  « vaut-il pour toute story du même type de travail, sans être recopié ? ». Nuances, non
  attendues : la règle « vélo disponible » vaut aussi pour plusieurs stories, mais c'est une
  règle métier, une vérité du domaine, pas une exigence de qualité (concept 8) ; le critère 2
  ne dit pas quelles stations figurent dans la vue : la définition d'une station vide n'est pas
  fixée, le PO la fait fixer (concept 8a2). Les dimensions de qualité (le double relève de
  l'unicité) se voient au concept 12b.
- **Erreurs fréquentes** :
  - les trois classements justes, sans justification : demander « pourquoi ? » pour chacun ;
  - classer 1 en critère « de chaque vue » : demander « combien de fois l'écrirais-tu ? » ;
  - classer 2 en DoD parce que la règle « vélo disponible » vaut partout : séparer la règle
    (vraie hors de la story, concept 8) du cas que la story vérifie ;
  - classer 3 en critère parce que seules certaines stories publient des relevés : une
    exigence de la DoD peut viser une sorte de travail ; elle reste la même pour toutes ;
  - réponse elliptique (« 1 et 3 partout ») : faire préciser avant de corriger.
- **Ce qui marche** : dire d'emblée « une seule DoD, pour toute story » plutôt que « la DoD
  vaut au niveau de l'incrément », formule qui a fait croire à une DoD par incrément. Le test
  rapide à voix haute, exigence par exigence.

### L'exception demandée par Étienne (11a, en rechange)

- **Explication** : critères et DoD s'ajoutent : une story terminée passe ses propres critères
  et toute la DoD. La DoD est commune : on ne la lève pas pour une story. Une story qui ne la
  remplit pas ne fait pas partie de l'incrément : elle n'est ni livrée ni présentée à la revue,
  et retourne au backlog (concept 0, 0b).
- **Situation** : situation d'exercice. La vue des stations vides est livrée et Étienne s'en
  sert. Une story la fait évoluer : afficher les vélos disponibles de chaque station (le
  critère 2 de l'exemple précédent). Fin d'un sprint : cette story passe tous ses critères
  d'acceptation, mais le test automatique des relevés en double n'est pas encore écrit pour ses
  nouveaux relevés. Étienne, responsable d'exploitation : « J'en ai besoin tout de suite. Faites
  une exception pour cette évolution, vous ajouterez le test plus tard. »
- **Question** : que réponds-tu à Étienne ?
- **Réponse attendue** : pas d'exception : la story n'est pas terminée, elle ne remplit pas la
  DoD. Passer ses critères ne suffit pas, critères et DoD s'ajoutent. Une DoD qu'on lève story
  par story n'est plus commune ; la changer se décide pour tous, en rétrospective (concept 0,
  0a3). Conséquence, sans la réenseigner : la story retourne au backlog (concept 0, 0b), où le
  PO lui donne sa place (ordonner : concept 13) ; la vue déjà livrée reste en service, sans
  l'évolution. Le PO dit à Étienne pourquoi : sans le test, un relevé en double peut fausser le
  nombre de vélos disponibles qu'il lit.
- **Erreurs fréquentes** :
  - « oui, ce n'est qu'un test » : demander « et à la prochaine story pressée ? » ;
  - « non » sans la suite : demander « et alors, on fait quoi ? » ;
  - rejouer tout le concept 0b (revue, incrément) : une ligne et le renvoi suffisent.
- **Ce qui marche** : « Étienne pourrait-il se fier à ces nombres s'il ne sait pas quelles
  exigences l'évolution a sautées ? »

### La DoD évolue (aparté, 11a)

- **Explication** : la DoD change dans le temps, pour toutes les stories, quand l'équipe
  l'améliore ; elle ne change pas selon le contenu d'un sprint. La rétrospective l'inspecte
  (Scrum Guide). Rappel du concept 0, sans le réenseigner.
- **Situation** : en préparant les stories de Charlotte (locations par quartier), Étienne et Charlotte
  découvrent qu'ils n'entendent pas la même chose par « location » : une location rendue à la même station au bout de quelques minutes compte-t-elle ? La règle
  n'est pas fixée. En rétrospective, l'équipe propose d'ajouter à sa DoD : « chaque indicateur
  publié a sa définition écrite » (indicateur : valeur calculée par le produit pour ses
  utilisateurs, comme les locations par quartier ; détail au concept 12a). C'est ainsi que la
  règle est entrée dans la DoD de l'équipe (fait du fil rouge) ; la discussion entre Étienne et
  Charlotte reste une situation d'exercice.
- **Question** : pourquoi dans la DoD plutôt que dans les critères des stories de Charlotte ?
- **Réponse attendue** : l'exigence vaut pour tout indicateur publié, pas pour une story ; la
  rétrospective est le lieu où l'équipe adapte sa DoD, pour toutes les stories à venir.
  Nuance : la DoD exige une définition écrite, elle ne fixe pas la règle des locations
  courtes ; elle reste à faire fixer, sans que le PO la tranche (concept 8a2). Ce que contient
  la définition d'un indicateur : concept 12a.
- **Erreurs fréquentes** :
  - trancher la règle (« on ne les compte pas ») : ni l'apprenant ni le PO ne la fixent seuls ;
  - croire que la DoD fixe la règle : elle exige qu'elle soit écrite.
- **Ce qui marche** : opposer « ce qu'on exige de tout travail » et « ce que vaut une
  location », que fixent les utilisateurs de l'indicateur.

### La story d'Étienne sans accès aux locations (11b)

- **Explication** : la DoR liste les conditions qu'une story remplit avant d'entrer dans un
  sprint ; l'équipe l'écrit elle-même. C'est un choix d'école : le Scrum Guide n'en parle pas.
  Il dit seulement qu'un élément que l'équipe peut finir en un sprint est prêt à être choisi au
  Sprint Planning, et qu'il le devient en général après avoir été précisé. Au planning, le PO
  propose, les Developers choisissent (concept 0 ; détail au concept 15b).
- **Situation** : la DoR de l'équipe vélos exige des critères d'acceptation écrits, des règles
  métier fixées, des dépendances identifiées et un accès aux données obtenu. La story d'Étienne
  « voir les locations du jour par station » a ses critères écrits ; la dépendance à la DSI est
  identifiée (dépendance : concept 10b). Mais l'accès à la table des locations, demandé à Sid,
  le DSI, n'est pas encore donné. Dana, data engineer : « Prenons-la quand même, on aura
  sûrement l'accès mercredi. »
- **Question** : que proposes-tu au planning du sprint, et pourquoi ?
- **Réponse attendue** : la story n'est pas prête, elle ne remplit pas la DoR : l'accès n'est
  pas obtenu, et sans
  lui les Developers ne peuvent pas la finir dans le sprint. Au planning, le PO propose à la
  place une story prête ; les Developers choisissent. Et il fait avancer l'accès : relancer
  Sid, et voir ce qui bloque ; si l'accès bloque sprint après sprint, escalader (concept 14).
  Nuances, à apporter dans la correction : ce qui bloque, ici, c'est que la DSI demande de
  justifier chaque colonne (quelles colonnes demander : concept 12c). Mike Cohn veut une DoR faite de repères plus que de règles, mais une dépendance
  envers une autre équipe est le cas où il admet qu'une règle stricte peut se justifier. Un
  « sûrement » ne lève pas la dépendance.
- **Erreurs fréquentes** :
  - « oui, l'équipe s'organisera » : demander « que font les Developers mercredi si l'accès
    n'est pas là ? » ;
  - « oui, et sinon on avancera sur le reste » (le plan B est déjà dans la réponse) : renvoyer à
    la DoR, « la story d'Étienne la remplit-elle aujourd'hui, et qu'en tires-tu pour le
    planning ? » ;
  - « non » sans la suite : demander « et alors, on fait quoi ? » (au planning, et pour
    l'accès) ;
  - décider seul que la story entre ou non : le PO propose, les Developers choisissent ;
  - si l'apprenant relève que la règle des locations très courtes n'est pas fixée : bon
    réflexe (DoR : règles fixées) ; ici la story n'en dépend pas, la vue des locations du jour
    les montrera toutes ; la règle concerne les indicateurs (concept 12a).
- **Ce qui marche** : comparer la DoD (quand une story est terminée) et la DoR (quand elle
  peut commencer) : les deux portes du sprint.

### Une DoR qui devient barrière (11b, en rechange)

- **Explication** : une DoR trop stricte devient une barrière à franchir avant chaque sprint ;
  c'est l'avis de Mike Cohn, qui y voit un retour au cycle en cascade (choix d'école). Image,
  choix du cours : la DoR tourne au mini cahier des charges.
- **Situation** : situation d'exercice. Après l'affaire de l'accès, Diego propose d'ajouter à
  la DoR : « toutes les questions sur la story sont réglées, la maquette de la vue est validée
  par Étienne, le schéma des tables est écrit ».
- **Question** : que proposes-tu à l'équipe de garder de la proposition de Diego, et
  pourquoi ?
- **Réponse attendue** : rien des trois ajouts. Exiger toutes les questions réglées et une
  maquette validée, c'est vouloir la story entièrement spécifiée avant le sprint : la
  conversation continue pendant le sprint (les 3C, concept 5 ; la solution se construit jusque
  pendant la réalisation, concept 7b), et l'équipe peut encore préciser une story au Sprint
  Planning (Scrum Guide, à apporter en nuance s'il ne le dit pas). Le schéma des tables est le comment des
  Developers (concept 1), pas une condition d'entrée. Ce qu'une DoR peut exiger : ce sans quoi
  la story ne peut pas avancer, comme une dépendance externe levée (l'accès). Nuance : choix
  d'école ; une équipe peut tenir une DoR plus stricte si elle s'en sert comme repère. La DoR
  se décide en équipe (par exemple en rétrospective) : le PO propose, il ne la fixe pas seul.
- **Erreurs fréquentes** :
  - « plus la DoR est complète, mieux c'est » : demander « combien de stories passeraient la
    porte au prochain planning ? » ;
  - garder la maquette « pour éviter les surprises » : la forme de la vue se discute avec les
    Developers (concept 7b) ; relancer : « sans la maquette validée, qu'est-ce que l'équipe ne
    pourrait vraiment pas faire ? ».
- **Ce qui marche** : demander ce que l'équipe ne pourrait vraiment pas faire sans chaque
  condition.

## Schéma

Un sprint dessiné comme une pièce à deux portes. À gauche, la porte d'entrée « DoR (choix
d'école) », par où passent les cartes de story venues du backlog ; une carte bloquée devant,
étiquetée « critères à écrire » (cas inventé, à dire dans la légende). À droite, la porte de sortie « DoD », qui
mène à l'incrément ; une carte refoulée repart vers le backlog. Sur chaque carte, ses propres
critères d'acceptation ; la DoD est un seul cadre, le même pour toutes les cartes qui
sortent. Légende : « DoR : quand une story peut commencer ; DoD : quand elle est terminée ».
