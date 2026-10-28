## Consignes

1. **5a les trois parties et les 3C** : qui (l'utilisateur qui a le besoin, désigné par son
   rôle, c'est-à-dire sa catégorie d'utilisateurs ; le choix de l'acteur se travaille au
   concept 6), quoi (ce qu'il veut faire ou savoir, sans solution), pourquoi (sa raison). Un
   seul « je veux » ; s'il y en a plusieurs, ce n'est plus une story (feature ou epic,
   concept 4 ; un parcours, concept 16). Origine : XP, format de Connextra, absent du Scrum
   Guide. Les 3C : la carte (la phrase écrite) ne contient pas tout le besoin, la conversation
   le précise, la confirmation dit comment vérifier. La carte n'est donc pas à allonger : elle
   reste courte, et le détail va dans la conversation et la confirmation.
   Exemples du fil rouge : en 5a1, Régis, régulateur, veut savoir quelles stations vont se vider,
   pour y aller avant : qui (le régulateur), quoi (connaître les stations qui vont se vider),
   pourquoi (y aller avant). En 5a2, Abba veut savoir avant de partir s'il reste un vélo à sa station : la phrase
   tient en une ligne ; ce qu'est « sa station » (celle qu'elle a choisie comme favorite) et la
   fraîcheur visée (moins de 15 minutes) se précisent à côté, en conversation puis en critères.
   Découpe en deux messages : **5a1** les trois parties, avec « La demande de Maud, en story » (« Une
   semaine de Maud : story ou parcours ? » en rechange, ou si l'apprenant décrit un parcours) ; **5a2** les 3C avec « La carte suffit-elle ? », l'origine réduite à une
   ligne. Chaque message a sa question.
2. **5b le « afin de » et les « pourquoi ? » successifs** : un « afin de » circulaire (il répète
   le « je veux ») ou de confort (« être bien informé ») n'aide ni à ordonner ni à choisir une
   solution. Le PO demande « pourquoi ? » à l'utilisateur, plusieurs fois, et s'arrête à une
   décision qu'il prend ou un gain qu'il reconnaît. Trop haut, la raison devient l'objectif
   produit ou une raison générale, commune à toutes les stories. Le PO n'invente pas la raison : il
   la demande. Exemple du fil rouge : pour la vue des stations vides, la raison qu'Étienne reconnaît
   est d'envoyer les régulateurs plus tôt vers les stations qui se vident, une décision qu'il prend
   chaque jour : c'est un bon point d'arrêt.
   Cas de la banque : pour 5b, « Trois « afin de » à juger », « Remonter de la demande à la décision » et « Un « afin de » trop haut ».

## Banque d'exemples

Dans les exemples de 5b, le prof joue Maud : il donne ses réponses d'après le fil rouge, et
l'apprenant, en PO, pose les questions. « Trois “afin de” à juger » donne la raison de Maud :
ne le prendre qu'après « Remonter de la demande à la décision », ou avec un apprenant qui l'a
déjà trouvée. Les brouillons de stories à corriger sont inventés pour
l'exercice : ils ne deviennent pas des faits du fil rouge.

### La demande de Maud, en story (5a1)
- **Explication** : une story dit qui, quoi, pourquoi, le plus souvent sous la forme « En tant
  que `<qui>`, je veux `<quoi>`, afin de `<pourquoi>` ». Le « je veux » décrit ce que l'utilisateur
  veut faire ou savoir, pas comment l'équipe le construit. Le Scrum Guide ne parle pas de
  story ; ce format est un choix d'école (son origine : 5a2).
- **Situation** : Maud, responsable maintenance, encadre les techniciens. Elle demande le
  nombre de vélos en panne par semaine. Diego, data engineer, a ajouté au backlog : « Créer une
  table hebdomadaire des signalements de pannes, alimentée par un traitement chaque nuit. »
- **Question** : réécris cet élément en story.
- **Réponse attendue** : il manque le qui et le pourquoi, et le quoi est une solution (une
  table, un traitement de nuit : c'est le comment des Developers). Par exemple : « En tant que
  responsable maintenance, je veux connaître le nombre de vélos en panne chaque semaine, afin
  de… ». Nuance : le « afin de » ne s'invente pas ; on le laisse ouvert et on le demande à
  Maud (5b). La table relève du plan des Developers : s'ils la retiennent, c'est une de leurs
  tâches (concept 4), pas un élément que le PO écrit.
- **Erreurs fréquentes** :
  - garder la solution en la déplaçant (« je veux une table des pannes ») : demander « qu'est-ce
    que Maud veut savoir, sans parler de table ? » ; sinon : « quelles parties d'une story
    manquaient à l'élément de Diego ? » ;
  - inventer un « afin de » plausible (« afin de réduire les pannes ») : rappeler que c'est à
    Maud de le dire ;
  - écrire « en tant qu'utilisateur » : trop vague, Maud a un rôle précis (concept 6).
- **Ce qui marche** : faire lire la phrase à voix haute à la place de Maud : « est-ce qu'elle
  dirait ça elle-même ? ». Une table, elle ne la demanderait pas.

### Une semaine de Maud : story ou parcours ? (5a1)
- **Explication** : une story exprime un besoin, pas tout ce que fait l'utilisateur. Le parcours
  sert ailleurs : il organise le backlog en story map, une carte des stories rangées sous les
  étapes du parcours (concept 16).
- **Situation** : brouillon d'exercice : « En tant que responsable maintenance, chaque semaine,
  je consulte les signalements de pannes, je compte les vélos en panne, je fais le point avec
  mes techniciens et je les préviens des vélos à réparer. »
- **Question** : est-ce une story ? Tranche et justifie.
- **Réponse attendue** : non, c'est un parcours : quatre actions, donc plusieurs besoins
  possibles, et aucun « je veux » ni « afin de ». La plateforme sert surtout l'étape « compter
  les vélos en panne » : « je veux connaître le nombre de vélos en panne chaque semaine, afin
  de… ». Le « afin de » reste ouvert : on le demandera à Maud (5b). Prévenir les techniciens
  ne relève pas forcément de la plateforme ; si c'était un besoin, ce serait une autre story.
  Le prof ne révèle pas ici le lien entre le comptage et la décision de Maud : 5b le fait
  trouver par les « pourquoi ? ».
- **Erreurs fréquentes** :
  - « oui, c'est une story, elle décrit ce que fait l'utilisateur » : c'est la confusion la plus
    probable chez qui n'a jamais lu de story ; compter les actions. Relancer : « combien de “je
    veux” caches-tu là-dedans ? » ;
  - garder les quatre étapes dans un seul « je veux » : une story, un « je veux » (concept 4).
    Relancer : « combien de “je veux” caches-tu là-dedans ? ».
- **Ce qui marche** : « combien de “je veux” caches-tu là-dedans ? » ; relance après le « non » :
  « lequel la plateforme peut-elle servir ? ».

### La carte suffit-elle ? (5a2)
- **Explication** : les 3C (Jeffries, XP, pratique établie) : la carte, la phrase écrite,
  représente le besoin sans le contenir en entier ; la conversation le précise ; la confirmation
  dit comment vérifier que la story est faite. On la rapproche couramment des critères
  d'acceptation, conditions vérifiables qui disent quand la story est faite (concept 8).
- **Situation** : la story de Maud est écrite : « En tant que responsable maintenance, je veux
  connaître le nombre de vélos en panne chaque semaine, afin de… » (le « afin de » reste à
  demander à Maud, 5b). Anna, analyste, dit : « La carte est claire, je m'y mets. » Les
  signalements de pannes viennent de l'appli ; ceux reçus par téléphone n'y sont pas saisis.
- **Question** : que manque-t-il avant qu'Anna puisse s'y mettre et dire un jour que c'est fait ?
- **Réponse attendue** : la conversation et la confirmation. La conversation, avec Maud et
  Anna : les signalements par téléphone manquent dans la source, le chiffre sera donc incomplet,
  est-ce acceptable pour ce que Maud en fera ? Qu'appelle-t-on une semaine ? Ce qui compte
  comme « en panne » se précise aussi (concepts 12 et 15). La confirmation : comment Maud et Anna
  vérifieront que le chiffre est juste, écrit en critères d'acceptation (concept 8). Nuance : la
  carte n'est pas à allonger ; c'est la conversation qui porte le détail.
- **Erreurs fréquentes** :
  - allonger la phrase pour tout y mettre (« … hors signalements par téléphone, du lundi au
    dimanche ») : la phrase reste courte, le détail va dans la conversation et la confirmation.
    Relancer : « si Anna ne parle à personne, que risque-t-elle de livrer ? » ;
  - trancher soi-même le cas des signalements par téléphone : c'est à voir avec Maud.
    Relancer : « qui décide si un chiffre incomplet suffit ? ».
- **Ce qui marche** : donner les trois mots anglais (Card, Conversation, Confirmation) et leur
  origine XP, puis demander : « si Anna ne parle à personne, que risque-t-elle de livrer ? ».

### Trois « afin de » à juger (5b)
- **Explication** : le « afin de » donne la raison du besoin. Il aide le PO à
  ordonner les stories et laisse l'équipe choisir comment répondre. Un « afin de » qui répète le
  « je veux » (circulaire) ou qui parle de confort ne fait ni l'un ni l'autre.
- **Situation** : trois fins possibles pour « En tant que responsable maintenance, je veux
  connaître le nombre de vélos en panne chaque semaine… » :
  1. « … afin de suivre le nombre de vélos en panne. »
  2. « … afin d'avoir une vue claire des pannes. »
  3. « … afin de fixer le nombre de techniciens en tournée. »
- **Question** : lequel aide le PO à ordonner et l'équipe à choisir une solution ?
- **Réponse attendue** : le 3. Le 1 est circulaire : il redit le « je veux ». Le 2 est de
  confort : il ne dit pas ce que la clarté change pour Maud. Le 3 nomme une décision que Maud
  prend chaque semaine : on connaît la raison (des tournées bien dimensionnées), on peut
  comparer cette story à d'autres, et l'équipe peut proposer une autre réponse qui sert la même
  décision, parfois plus simple (le chiffre envoyé chaque semaine plutôt qu'une nouvelle vue,
  par exemple). Nuance : le 3 n'est juste que si Maud le confirme.
- **Erreurs fréquentes** :
  - choisir le 2 « parce qu'une vue claire, c'est de la valeur » : demander « clair pour décider
    quoi ? » ;
  - juger le 1 acceptable « parce qu'il est vrai » : vrai, mais il n'apprend rien de plus que le
    « je veux ».
- **Ce qui marche** : cacher le « je veux » et lire le seul « afin de » : s'il ne dit rien de
  neuf, il ne sert pas. Relance si l'apprenant choisit le 3 sans juger les autres : « que
  reproches-tu au 1 et au 2 ? ».

### Remonter de la demande à la décision (5b)
- **Explication** : quand le « afin de » est faible, le PO demande « pourquoi ? » à l'utilisateur,
  plusieurs fois, jusqu'à une décision que celui-ci prend ou un gain qu'il reconnaît. La
  technique rappelle les « cinq pourquoi » venus de Toyota ; ici, le nombre importe peu.
- **Réserve, sur demande** : réponses de Maud, à donner seulement quand l'apprenant pose la question : au premier
  « pourquoi ? » : « Pour savoir combien de vélos mes techniciens auront à réparer. » Au second :
  « Parce que chaque semaine, je fixe le nombre de techniciens en tournée. »
- **Situation** : tu as écrit « … afin de suivre les pannes ». Le prof joue Maud, que
  l'apprenant peut interroger.
- **Question** : pose tes « pourquoi ? » à Maud, puis réécris le « afin de ».
- **Réponse attendue** : « … afin de fixer le nombre de techniciens en tournée ». On s'arrête là
  parce que c'est une décision que Maud prend elle-même, chaque semaine : elle reconnaît la
  raison, et la story sert cette décision. Un « pourquoi ? » de plus mènerait à une raison générale
  (des vélos réparés plus vite, un meilleur service) que partagent beaucoup de stories.
  Nuance : la première réponse de Maud (« combien de vélos à réparer ») est déjà meilleure que
  « suivre les pannes », mais elle ne dit pas encore ce qu'elle en fait.
- **Erreurs fréquentes** :
  - répondre à la place de Maud au lieu de lui poser la question : le PO demande, il n'invente
    pas la raison ;
  - s'arrêter au premier « pourquoi ? » : relancer par « et qu'en fait-elle ? ».
- **Ce qui marche** : les « pourquoi ? » successifs, posés à voix haute ; puis « Maud dirait-elle
  “oui, c'est exactement pour ça” ? ». Relance si l'apprenant ne justifie pas où il s'arrête :
  « pourquoi t'arrêter là ? ».

### Un « afin de » trop haut (5b)
- **Explication** : trop de « pourquoi ? » mènent à une raison si générale qu'elle vaut pour
  toutes les stories : elle n'aide plus à les ordonner entre elles.
- **Situation** : Diego propose, pour la story de Maud : « … afin que les stations du
  centre-ville restent moins longtemps vides aux heures de pointe. » C'est l'objectif produit de
  la plateforme.
- **Question** : ce « afin de » est-il meilleur que « afin de fixer le nombre de techniciens en
  tournée » ? Tranche et justifie.
- **Réponse attendue** : non. C'est l'objectif produit (concept 2) : beaucoup de stories y
  contribuent, il ne distingue pas celle-ci. Il n'est pas non plus le gain de Maud : rien
  dans le fil rouge ne relie le nombre de techniciens en tournée aux stations vides, et Maud
  ne le reconnaîtrait pas comme sa raison. Le bon « afin de » est la décision de Maud ; le lien
  avec l'objectif produit, s'il existe, se discute quand le PO ordonne le backlog (concept 13).
- **Erreurs fréquentes** :
  - « oui, il est plus ambitieux » : ambitieux ne veut pas dire utile pour décider. Relancer :
    « si toutes les stories du backlog avaient ce “afin de”, comment choisirais-tu laquelle faire
    d'abord ? » ;
  - forcer le lien (« des vélos réparés, donc des stations moins vides ») : c'est un lien supposé,
    pas vérifié, et ce n'est pas la raison de Maud (concept 17). Relancer : « Maud reconnaîtrait-elle cette raison
    comme la sienne ? ».
- **Ce qui marche** : « si toutes les stories du backlog avaient ce “afin de”, comment
  choisirais-tu laquelle faire d'abord ? ».

## Schéma

La phrase en trois blocs côte à côte : « En tant que » (qui), « je veux » (quoi, sans
solution), « afin de » (pourquoi), le troisième mis en avant. Au-dessus du troisième, une
échelle de « pourquoi ? » qui monte, sur un cas inventé pour l'illustration : « suivre les
locations » (barré, circulaire) ; « savoir combien de vélos sont sortis » ; « décider combien de
vélos redistribuer » (encadré, « on s'arrête ici : la décision de l'utilisateur ») ; plus haut, en
pointillés et grisé, « que le réseau serve mieux la ville » (« trop haut : l'objectif produit »). À côté, la carte de la
story, avec une bulle de dialogue (conversation) et une coche (confirmation), légendée « 3C,
Jeffries, XP ».
