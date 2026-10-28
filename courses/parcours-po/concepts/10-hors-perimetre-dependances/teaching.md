## Consignes
1. **10a hors périmètre**, en deux messages ; on ne passe à 10b qu'après les deux :
   - **10a1** l'écrire : ce que la story ne fait pas alors qu'on pourrait l'attendre, écrit quand
     on précise la story avant le sprint (« Écrire le hors périmètre de la tournée ») ;
   - **10a2** le montrer à la revue : ce que devient une demande sortie du hors périmètre
     (comment l'ordonner : concept 13) (« Maud crie au bug », qui reprend le hors périmètre de
     10a1).
2. **10b dépendances**, en deux messages :
   - **10b1** entre deux stories de l'équipe : fusionner ou ordonner (« Fusionner les deux
     stories de Charlotte ? ») ;
   - **10b2** envers une autre équipe : s'accorder avec le PO de cette équipe (« Le canal
     d'Abba dépend de l'équipe appli ») ; si l'accord ne se fait pas, escalade : renvoi au
     concept 14, sans l'enseigner. L'accès à la table des locations, dépendance envers la DSI, est l'exemple du
     concept 11b.

Déjà enseigné, à rappeler sans le réenseigner : V et I d'INVEST, les Developers estiment la
taille (concept 7) ; une story tient dans un sprint (concept 4) ; le PO ordonne seul le backlog
(concepts 1 et 3) ; la revue de sprint (concept 0) ; la règle non fixée que le PO fait fixer
(concept 8a2) ; la tranche verticale (concept 9) ; les parties prenantes (concept 1 ; la
cartographie complète au concept 14). Pas encore enseignés, nommés avec renvoi :
données du produit (12), ordonner (13), escalade (14), préciser une story
avant le sprint et revue de sprint en détail (15).

## Faits du fil rouge utilisés

la story de tournée (concept 6) ; Théo confirme ou infirme sur
place une panne signalée ; un vélo signalé en panne reste louable, son blocage à la location a
été mis hors périmètre de la story de tournée et Maud le réclame ; un vélo n'est plus louable
quand un technicien l'a retiré du service après constat ; les signalements par téléphone ne sont
pas saisis dans l'appli ; Charlotte veut le nombre de locations par quartier sur le mois, puis la
comparaison au même mois de l'an dernier ; l'accès à la table des locations n'est pas obtenu
(concept 11b) ; la story d'Abba (concept 7) ; la disponibilité par station vient de la
plateforme, la livrer à Abba par un canal dépend de l'équipe appli, dont Pia est la PO ; Pia
veut aussi la disponibilité par station pour l'appli ; Scarlette est Scrum Master des deux équipes ;
Odile est sponsor. Les propos de Maud à la revue, de Dana et de Diego, et l'état du backlog de
l'équipe appli sont des propositions d'exercice : ils ne deviennent pas des faits du fil rouge.

## Banque d'exemples

### Écrire le hors périmètre de la tournée (10a1)
- **Explication** : le hors périmètre liste ce que la story ne fait pas alors qu'un utilisateur
  ou une partie prenante pourrait s'y attendre. On l'écrit quand on précise la story avant le
  sprint. On n'y met que les demandes plausibles, celles qu'on pourrait croire incluses : une
  évidence que personne n'attend n'y a pas sa place (choix du cours). La rubrique est un choix
  d'école : le Scrum Guide n'en parle pas.
- **Situation** : la story de tournée, avant le sprint, sans hors périmètre : « En tant que
  technicien de maintenance, je veux voir les vélos signalés en panne, afin de préparer ma
  tournée de réparation. » On sait que Maud veut qu'un vélo signalé en panne ne soit plus
  louable, que le technicien confirme ou infirme la panne sur place, et que les signalements
  reçus par téléphone ne sont pas saisis dans l'appli. Dana, data engineer, propose une seule
  ligne : « Hors périmètre : réparer les vélos. »
- **Question** : écris le hors périmètre de cette story, en partant de la ligne de Dana.
- **Réponse attendue** : la ligne de Dana est une évidence : personne ne croit qu'une liste
  répare un vélo ; on la retire. Trois lignes : bloquer le vélo à la location (Maud peut le
  croire inclus) ; diagnostiquer la panne (on peut croire que la liste dit si la panne est
  réelle, elle ne montre que des signalements, que le technicien confirme ou infirme sur
  place) ; les signalements reçus par téléphone (Maud et Théo
  peuvent croire la liste complète, elle ne montre que les signalements saisis dans l'appli).
  Nuances : chaque ligne reste une demande ; le blocage va au backlog. Les signalements absents
  sont aussi une question de données, reprise au concept 12.
- **Erreurs fréquentes** :
  - garder des évidences ou des tâches des Developers (concept 4) : demander « qui pourrait
    croire que c'est inclus ? » ;
  - oublier le téléphone, le plus traître, car la liste a l'air complète : demander « la liste
    montre-t-elle toutes les pannes signalées ? » ;
  - écrire une ligne vague (« le reste des signalements ») : on ne sait plus ce qui est exclu.
- **Ce qui marche** : le test rapide, ligne par ligne, à voix haute.

### Maud crie au bug (10a2)
- **Explication** : écrit avant le sprint, le hors périmètre aligne les attentes : à la revue,
  personne ne découvre un manque convenu.
- **Situation** :
  > En tant que technicien de maintenance, je veux voir les vélos signalés en panne, afin de
  > préparer ma tournée de réparation.
  > Hors périmètre : bloquer le vélo à la location ; diagnostiquer la panne (la liste montre des
  > signalements, le technicien confirme ou infirme la panne sur place) ; les signalements reçus
  > par téléphone (ils ne sont pas saisis dans l'appli).

  La story est livrée. À la revue de sprint, Maud, responsable maintenance, s'agace : « Un
  vélo signalé reste louable, c'est un bug ! »
- **Question**, en deux parties : « Que réponds-tu à Maud, en tant que PO ? », puis « Que
  devient sa demande ? »
- **Réponse attendue** :
  1. La réponse à Maud : la story fait ce qu'elle dit : le blocage était écrit hors périmètre,
     convenu avant le sprint ; le PO montre la ligne, ce qui désamorce le « bug ». Le ton reste
     posé : la demande de Maud est légitime, un vélo signalé en panne qu'on peut louer est un
     vrai problème.
  2. Sa demande : elle entre au backlog comme une nouvelle story (la revue sert aussi à adapter
     le backlog), et le PO l'ordonne face au reste. Il ne promet pas le prochain sprint sur le
     moment et ne la refuse pas : comment l'ordonner, et ce que pèse l'argument de sécurité,
     vient au concept 13. Nuance : la nouvelle story touche une règle. Aujourd'hui, un vélo
     n'est plus louable qu'après constat d'un technicien ; bloquer dès le signalement, et
     débloquer si la panne est infirmée, est une règle à faire fixer (concept 8a2), pas à
     trancher en revue.
- **Erreurs fréquentes** :
  - Partie 1, reconnaître un bug et s'excuser : la story fait ce qui était convenu ; demander
    « qu'est-ce qui était écrit avant le sprint ? » ;
  - Partie 2, promettre le blocage pour le prochain sprint (« c'est le bon moment ») : la
    demande entre au backlog et s'ordonne comme les autres ; demander « face aux autres
    demandes, qui décide de sa place ? » (concept 13, sans l'enseigner) ;
  - Partie 2, décider sur place la règle de blocage (« on bloque dès le signalement ») : règle à
    faire fixer (concept 8a2).
- **Ce qui marche** : une réponse au ton de PO, en trois temps : reconnaître le problème, montrer
  la ligne écrite, dire où va la demande et qui la place. Si la réponse est elliptique (« hors
  périmètre »), faire préciser avant de corriger : « que dis-tu à Maud, mot pour mot ? ».

### Fusionner les deux stories de Charlotte ? (10b1)
- **Explication** : une story dépend d'une autre quand elle ne peut pas être livrée, ou n'a pas
  de sens, avant elle. On les réduit (I d'INVEST, concept 7). Pour lever une dépendance entre
  deux stories, Mike Cohn donne deux voies : les fusionner, si la story fusionnée reste petite,
  ou les découper autrement. Une dépendance qui reste s'écrit, et le PO ordonne : l'élément dont
  l'autre dépend passe avant.
- **Situation** : Charlotte, chargée de mission mobilité à la collectivité.
  - A : « En tant que chargée de mission mobilité, je veux voir le nombre de locations par
    quartier sur le mois, afin de justifier la subvention au conseil. »
  - B : « En tant que chargée de mission mobilité, je veux comparer ce mois au même mois de l'an
    dernier, afin de montrer l'évolution. »

  B n'a pas de sens sans A. Diego, data engineer, propose de fusionner A et B en une seule story
  « pour supprimer la dépendance ».
- **Question** : que réponds-tu à Diego ?
- **Réponse attendue** : plutôt non, ici. A a une valeur seule : Charlotte peut justifier la
  subvention avec les chiffres du mois ; B l'enrichit. Fusionner grossit la story et retarde la
  valeur de A jusqu'à ce que B soit prête. La dépendance est saine : on garde les deux stories,
  on l'écrit dans B, et le PO ordonne A avant B (comment ordonner : concept 13). Nuances :
  fusionner se défend si la story fusionnée reste petite, et ce sont les Developers qui estiment
  la taille (concept 7), Diego compris. Une dépendance pose problème quand aucune des deux
  stories n'a de valeur seule : ce sont souvent des tranches horizontales (concept 9) ; on
  vérifie, et on redécoupe en tranches verticales. A et B attendent aussi l'accès à la table des
  locations : dépendance envers la DSI, traitée au concept 11b.
- **Erreurs fréquentes** :
  - s'arrêter au « non » : demander « et alors, on fait quoi de la dépendance ? » ;
  - accepter la fusion parce qu'une dépendance serait toujours un défaut : le I se tient autant
    que possible (concept 7) ; relancer : « si l'équipe s'arrête après A, Charlotte s'en
    sert-elle ? » ;
  - répondre « fusionner, jamais » : Cohn la retient quand le résultat reste petit ; relancer :
    « dans quel cas Cohn fusionne-t-il deux stories ? » ;
  - placer B avant A, ou les laisser sans ordre : B n'a pas de sens sans A ; relancer : « si
    l'équipe livre B seule, que voit Charlotte ? ».
- **Ce qui marche** : « si l'équipe s'arrête après A, Charlotte s'en sert-elle ? », puis « et si
  elle s'arrête après la story fusionnée, qu'a-t-elle eu en attendant ? ».

### Le canal d'Abba dépend de l'équipe appli (10b2)
- **Explication** : une dépendance envers une autre équipe ne se règle pas dans son seul
  backlog. Le PO l'écrit dans son backlog, demande à l'autre PO de l'écrire dans le sien, et
  s'accorde avec lui sur l'ordre dans les deux backlogs, pour que les deux parts arrivent à
  temps. Chaque PO ordonne seul son backlog : pour changer sa place, on le convainc. Choix du
  cours : le Scrum Guide ne traite pas deux produits ayant chacun son PO.
- **Situation** : la story d'Abba (concept 7) : « En tant qu'abonné, je veux savoir avant de
  partir s'il reste un vélo à ma station, afin de ne pas me déplacer pour rien. » La
  disponibilité par station vient de la plateforme ; la livrer à Abba par un canal (SMS, serveur
  vocal, appli) relève de l'équipe appli, dont Pia est la PO. Pia veut aussi la disponibilité
  par station pour l'appli. Le canal pour les abonnés sans l'appli n'est pas au backlog de
  l'équipe appli. Dana : « Notre part sera prête à la fin du sprint. Le canal, c'est l'affaire de
  l'équipe appli. »
- **Question** : en tant que PO de la plateforme, que fais-tu de cette dépendance ?
- **Réponse attendue** : Dana a raison sur la frontière : le canal relève de l'équipe appli.
  Mais la part de la plateforme, livrée seule, ne sert pas Abba tant que le canal n'existe pas.
  Le PO écrit la dépendance dans la story d'Abba et demande qu'elle soit écrite aussi côté
  appli (un lien entre les deux éléments : annexe A1). Il va voir Pia, lui présente le besoin
  (un tiers des abonnés n'a qu'un téléphone basique, sans l'appli) et s'accorde avec elle sur
  l'ordre dans les deux backlogs : c'est Pia qui inscrit et place le canal dans le sien. Nuances :
  la part de la plateforme n'est pas perdue si elle sort avant, car Pia veut aussi la
  disponibilité pour l'appli ; si l'accord ne se fait pas, ou si la dépendance bloque, c'est une
  escalade (porter le blocage au niveau qui peut le lever : Scarlette, qui est aussi Scrum Master
  de l'équipe appli ; Odile, sponsor) : concept 14.
- **Erreurs fréquentes** :
  - livrer sa part et tenir la story pour faite : demander « Abba obtient-elle l'information ? » ;
  - demander à Dana de faire le canal : l'appli et ses canaux relèvent de l'équipe appli ;
  - inscrire soi-même le canal dans le backlog de l'équipe appli, ou exiger une date : Pia
    ordonne son backlog ; pour y placer le canal, on la convainc ;
  - escalader d'emblée à Odile sans avoir parlé à Pia : l'escalade vient après (concept 14) ;
  - « si Pia refuse, je remonte à Odile » : juste sur le principe (parler d'abord, escalader
    ensuite) ; nommer les deux voies (Scarlette, Odile) et renvoyer au concept 14 pour qui saisir
    et quand, sans le trancher ici ;
  - écarter la story parce qu'elle dépend d'une autre équipe : le I se tient autant que possible
    (concept 7).
- **Ce qui marche** : suivre le chemin de l'information jusqu'à Abba, comme au concept 7, et
  demander à chaque étape « qui la fait, et dans quel backlog ? ». Si la réponse s'arrête à
  « écrire la dépendance », relancer : « et alors, qui va voir qui ? ».

## Schéma
Deux panneaux.
1. **Hors périmètre (10a)** (cas inventé, à dire dans la légende) : un cercle « la story »,
   avec dedans « voir l'indicateur sur le tableau de bord ». Juste au bord, à l'extérieur,
   deux étiquettes : « l'export en fichier », « l'envoi par courriel ». De chacune part une
   flèche vers une boîte « backlog, à ordonner par le PO ». Légende : « au bord du cercle :
   ce qu'on pourrait croire inclus ».
2. **Dépendances (10b)** (cas inventé, à dire dans la légende) : à gauche, un seul backlog, une
   story X au-dessus d'une story Y, une flèche « Y dépend de X » ; légende « même équipe : le PO
   ordonne ». À droite, deux backlogs côte à côte (équipe A, équipe B) ; une story de A reliée
   par un trait à un élément de B ; entre les deux PO, une bulle « chacun ordonne le sien ».
