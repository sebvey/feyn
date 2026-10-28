## Consignes

1. **8a critère ou règle métier** : le critère est propre à la story et se tranche OK ou KO ; la
   règle est vraie hors de la story, et les critères l'illustrent. Une contrainte d'usage (un
   moyen d'accès précis) va dans un critère (concept 7b), dans son Given (8b1). La DoR de
   l'équipe vélos (sa Definition of Ready : les conditions qu'elle écrit pour qu'un élément soit
   prêt à être choisi, concept 11) demande des règles métier fixées avant qu'une story entre dans
   un sprint ; le cas 8a2 la définit ainsi en passant. Se déroule en deux messages :
   - **8a1** critère ou règle (« Trier les phrases de la story d'Abba ») ;
   - **8a2** la règle non fixée (« Le seuil des stations presque vides ») : un critère qui
     s'appuie sur une règle non fixée la fixe en douce ; le PO la fait fixer, la story attend
     (renvoi au concept 7a2, sans le réenseigner).
2. **8b Given/When/Then, une variable à la fois** : Given, le contexte de départ ; When,
   l'événement ou l'action ; Then, le résultat observable, ce que le testeur vérifie. D'un
   exemple à l'autre, un seul fait du Given change. Se déroule en deux messages :
   - **8b1** la forme (« Le critère d'Abba à corriger » ; « Fraîcheur : que vérifie le Then ? »
     en rechange, ou quand l'apprenant écrit le rafraîchissement dans le Then) ;
   - **8b2** une variable à la fois (« Les vélos disponibles d'Étienne »).

## Faits du fil rouge utilisés

la story d'Abba (« En tant qu'abonné, je veux savoir avant de
partir s'il reste un vélo à ma station, afin de ne pas me déplacer pour rien. ») ; Abba n'a
qu'un téléphone basique, sans l'appli ; règles fixées : un vélo disponible est un vélo à quai et
louable, la station d'un abonné est celle qu'il a choisie comme favorite, fraîcheur visée de
moins de 15 minutes ; la plateforme se rafraîchit toutes les 5 minutes ; un vélo signalé en
panne reste louable ; le seuil « presque vide » n'est pas fixé (3 vélos cité, pas décidé) ; DoR
de l'équipe vélos : règles métier fixées. Les brouillons de critères, la story d'Étienne et les
nombres de vélos sont des propositions d'exercice : ils ne deviennent pas des faits du fil
rouge. Le prof ne demande jamais à l'apprenant de fixer une règle (un seuil, une définition).

## Banque d'exemples

### Trier les phrases de la story d'Abba (8a1)

- **Explication** : un critère d'acceptation est propre à une story et se tranche OK ou KO.
  Une règle métier est vraie hors de la story : d'autres stories s'en servent. Les critères
  illustrent souvent une règle par un cas précis. Test : « est-ce encore vrai si cette story
  n'existe pas ? ». Séparer ainsi critère et règle est un choix du cours.
- **Situation** : pour la story d'Abba, quatre phrases sont notées en vrac :
  1. Un vélo disponible est un vélo à quai et louable.
  2. La station d'un abonné est celle qu'il a choisie comme favorite.
  3. Quand sa station favorite compte 4 vélos disponibles, Abba obtient « 4 » avant de partir.
  4. Abba n'a qu'un téléphone basique, sans l'appli.
- **Question** : range chaque phrase : règle métier, critère d'acceptation, ou morceau d'un
  critère.
- **Réponse attendue** : 1 et 2 sont des règles : elles restent vraies sans cette story, et
  d'autres s'en servent (1 sert aussi à la disponibilité par station que Pia veut pour
  l'appli, concept 3 ; 2 vaut pour tout abonné, quelle
  que soit la story). 3 est un critère : un cas précis, propre à la story, qu'un testeur tranche ; il
  illustre 1 et 2. 4 est un morceau de critère : la contrainte (concept 7b) va dans son contexte
  de départ (le Given, qui vient en 8b1), pour que le testeur vérifie depuis un téléphone
  basique. Nuance : la fraîcheur visée (moins de 15 minutes) est aussi une règle fixée ; le
  critère en cite la valeur (« à jour de moins de 15 minutes »).
- **Erreurs fréquentes** :
  - classer 1 en critère parce que la story l'utilise : demander « si on supprime la story de
    Abba, un vélo disponible change-t-il de définition ? » ;
  - classer 3 en règle parce qu'il a l'air général : il porte un cas et un nombre, il se
    tranche ;
  - ne pas savoir où écrire 4 : le lien entre contrainte et critère n'est pas un réflexe ;
    demander « qu'est-ce que le testeur doit savoir d'Abba pour vérifier ? ».
- **Ce qui marche** : le test rapide à voix haute, phrase par phrase ; puis relier chaque
  critère à la règle qu'il illustre.

### Le seuil des stations presque vides (8a2)

- **Explication** : un critère qui s'appuie sur une règle non fixée la fixe en douce : le cas
  qu'il choisit tranche la règle, sans que personne l'ait décidée. On le repère en se demandant,
  pour chaque critère : « quelle règle ce cas suppose-t-il, et est-elle fixée ? ». Rappel, sans
  le réenseigner : le PO fait fixer la règle, la story attend (7a2). Cas générique inventé pour
  l'illustration : le critère « Then la location de plus de 24 heures est signalée » décide
  qu'une location est trop longue au-delà de 24 heures, alors que personne n'a fixé la durée
  maximale.
- **Situation** : Étienne demande de voir aussi les stations presque vides (demande d'exercice).
  Le seuil n'est pas fixé : 3 vélos a été cité, sans décision. Dana, data engineer, propose ce
  critère, écrit en Given/When/Then (étant donné, quand, alors ; la forme vient en 8b) : « Given
  une station compte 2 vélos disponibles, When Étienne ouvre la vue, Then la station apparaît
  presque vide. » Elle ajoute : « 3 vélos, tout le monde le dit. »
- **Question** : qu'est-ce que ce critère décide, et qui l'a décidé ?
- **Réponse attendue** : le critère repose sur « presque vide », dont la règle n'est pas fixée :
  il décide qu'une station à 2 vélos est presque vide. Qui l'a décidé : personne ; Dana le tire
  de ce que « tout le monde dit », et un avis répandu n'est pas une décision. Répondre « Dana »
  sans dire que personne n'a décidé est l'erreur fréquente ci-dessous, pas une réponse
  partielle. Un critère illustre une règle, il ne la remplace pas. Suite, en renvoi : le PO la
  fait fixer, la story attend (7a2) ; la DoR de l'équipe vélos (sa Definition of Ready : les
  conditions qu'elle écrit pour qu'un élément soit prêt à être choisi, concept 11) demande des
  règles métier fixées. Nuance : la règle devra aussi dire si une station au seuil compte comme presque
  vide. Une fois fixée, elle s'écrit comme règle métier, et les critères l'illustrent par des
  cas autour du seuil, une variable à la fois (8b).
- **Erreurs fréquentes** :
  - juger le critère bon parce que sa forme l'est : demander « d'où vient le 2 ? » ;
  - répondre « Dana » ou « l'équipe » sans voir que personne n'a décidé : un avis répandu n'est
    pas une décision ; relancer : « si Étienne voit une station marquée presque vide avec 2 vélos,
    qui a décidé que c'était presque vide ? » ;
  - proposer soi-même un seuil pour débloquer : relancer : « qui, chez l'opérateur, sait à
    partir de combien de vélos une station est presque vide pour Étienne ? » ; puis renvoyer à
    7a2, sans réexpliquer.
- **Ce qui marche** : « si Étienne voit une station marquée presque vide avec 2 vélos, qui a
  décidé que c'était presque vide ? ».

### Le critère d'Abba à corriger (8b1)

- **Explication** : Given/When/Then (en français : étant donné, quand, alors). Given : le
  contexte de départ ; When : l'événement ou l'action ; Then : le résultat observable, ce que le
  testeur vérifie. Choix d'école : Dan North et Chris Matts, dans le BDD ; Cucumber et son
  langage Gherkin l'outillent, mais la forme s'écrit sans outil.
- **Situation** : la contrainte d'Abba (téléphone basique, sans l'appli) va dans un critère
  (concept 7b). Un premier brouillon : « Given Abba n'a pas de smartphone quand elle quitte son
  domicile, Then elle peut savoir le nombre de vélos à la station. »
- **Question** : corrige ce critère.
- **Réponse attendue** : ce qui est juste : aucun canal nommé, la contrainte est dans le Given.
  Trois défauts : le When manque (quel événement déclenche le résultat ?), et « quand elle
  quitte son domicile » arrive trop tard, elle veut savoir avant de partir ; le Then est vague
  (« elle peut savoir » : que vérifie le testeur ?) ; « pas de smartphone » est trop large, la
  contrainte est un téléphone basique, sans l'appli. Corrigé : « Given Abba n'a qu'un
  téléphone basique, sans l'appli, et sa station favorite compte 4 vélos disponibles, When elle
  demande la disponibilité de sa station avant de partir, Then elle obtient « 4 ». » Nuances,
  non attendues : « vélos » devient « vélos disponibles », le terme de la règle fixée (à quai et
  louable) ; on peut citer la règle de fraîcheur (« à jour de moins de 15 minutes »),
  traitée dans « Fraîcheur : que vérifie le Then ? » ; sans le nombre dans le Given (« elle obtient le nombre de
  vélos disponibles »), le critère est juste mais moins tranchant ; le nombre précis en fait un
  exemple.
- **Erreurs fréquentes** :
  - corriger le Then en nommant un canal (« elle reçoit un SMS ») : c'est une solution
    (concept 7b), le Then dit ce qu'elle obtient ; relancer : « si l'équipe appli choisit un
    serveur vocal, ton critère passe-t-il ? » ;
  - garder « elle peut savoir » : on ne sait pas quoi vérifier ; relancer : « qu'est-ce que le
    testeur regarde pour dire OK ? » ;
  - ajouter un When au mauvais moment (« quand elle arrive à la station ») : relancer : « à
    quel moment Abba veut-elle savoir ? ».
- **Ce qui marche** : « qu'est-ce que le testeur regarde pour dire OK ? ». Si un défaut reste
  après la réponse, dire ce qui est corrigé et relancer sur celui-là seul.

### Fraîcheur : que vérifie le Then ? (8b1)

- **Explication** : le Then vérifie un résultat observable par l'utilisateur, pas un moyen
  choisi par l'équipe.
- **Situation** : pour la story d'Abba, Diego, data engineer, propose : « Then le nombre de
  vélos disponibles est rafraîchi toutes les 5 minutes. » La plateforme se rafraîchit toutes
  les 5 minutes ; la fraîcheur visée est de moins de 15 minutes.
- **Question** : ce Then convient-il ? Corrige-le si besoin.
- **Réponse attendue** : non. Il vérifie un moyen de l'équipe, pas ce qu'Abba obtient. Le
  Then vérifie l'âge des données quand Abba les lit : « elle obtient le nombre de vélos
  disponibles, à jour de moins de 15 minutes » (la règle fixée, que le critère cite). Le
  rafraîchissement toutes les 5 minutes permet de tenir cette fraîcheur, et peut changer sans
  que le critère change ; seul, il ne la garantit pas (un rafraîchissement qui échoue).
- **Erreurs fréquentes** :
  - garder les deux « parce que 5 minutes, c'est plus exigeant » : le critère fige alors un
    moyen que l'équipe pouvait changer ; relancer : « Abba voit-elle la fréquence de
    rafraîchissement ? Que voit-elle ? » ;
  - écrire « en temps réel » : un mot flou, et une solution ; relancer : « comment le testeur
    vérifie-t-il « en temps réel » ? ».
- **Ce qui marche** : « Abba voit-elle la fréquence de rafraîchissement ? Que voit-elle ? ».

### Les vélos disponibles d'Étienne (8b2)

- **Explication** : d'un exemple à l'autre, ne changer qu'un fait du Given : si le Then change,
  on sait quelle règle joue ; si le test échoue, on sait quoi corriger. Choix du cours.
- **Situation** : story d'exercice : « En tant que responsable d'exploitation, je veux voir au
  point du matin le nombre de vélos disponibles de chaque station, afin de décider où envoyer
  les régulateurs. » Règles fixées : un vélo disponible est à quai et louable ; un vélo signalé
  en panne reste louable ; un vélo retiré du service par un technicien après constat ne l'est
  plus. Anna, analyste, écrit deux exemples :
  - A : « Given une station compte 6 vélos à quai, tous louables, When Étienne ouvre la vue, Then
    la vue affiche 6 vélos disponibles pour cette station. »
  - B : « Given une station compte 6 vélos à quai, dont 1 retiré du service et 1 signalé en panne,
    When Étienne ouvre la vue, Then la vue affiche 4 vélos disponibles pour cette station. »
- **Question** : que reproches-tu à B ? Réécris-le.
- **Réponse attendue** : B change deux faits à la fois (un vélo retiré du service, un vélo signalé
  en panne) : si le test échoue, on ne sait pas lequel est en cause. Et son Then invente une
  règle : un vélo signalé en panne reste louable, donc disponible ; B attend 5, pas 4. Réécrit
  en deux exemples : B1, 6 vélos à quai dont 1 retiré du service : 5 disponibles ; B2, 6 vélos à
  quai, tous louables, dont 1 signalé en panne : 6 disponibles. Nuance : B2 dérange, et Maud
  réclame le blocage des vélos signalés (concept 10) ; s'il est livré, le vélo signalé ne sera
  plus louable : la règle « vélo disponible » ne change pas, l'exemple B2 change.
- **Erreurs fréquentes** :
  - ne voir que l'un des deux défauts : dire ce qui est juste, relancer sur l'autre (deux faits
    changés : « et si le test de B échoue, qu'est-ce qu'Anna corrige ? » ; règle inventée :
    « d'après la règle, le vélo signalé en panne est-il disponible ? ») ;
  - corriger B en « 5 » sans le séparer : le Then est juste, mais deux faits changent encore ;
  - ajouter à chaque critère « la vue affiche l'heure de la dernière mise à jour » : cela vaut
    pour toutes les vues d'Étienne, c'est la DoD de l'équipe (concept 11).
- **Ce qui marche** : comparer A et B ligne à ligne et compter les faits qui changent.

## Schéma

Deux colonnes, sur un cas inventé pour l'illustration. À gauche, la règle métier sur une
carte bleue (« un abonné loue un seul vélo à la fois »). À droite, les exemples en Given/When/Then sur
des cartes vertes, reliés par un trait à la règle qu'ils illustrent ; dans chaque paire
d'exemples, le seul fait qui change est surligné. En bas, une carte rouge « durée maximale d'une
location : à faire fixer avant le sprint », sans exemple dessous. Légende : « couleurs de
l'Example Mapping (Matt Wynne) : règles en bleu, exemples en vert, questions en rouge ».
