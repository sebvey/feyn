# Fil rouge du cours : l'opérateur de vélos en libre-service

Sert d'exemple au cours, concept après concept, en changeant de situation (utilisateur, besoin,
décision) plutôt que de domaine. Le mainteneur tient ce fichier. Le prof ne le modifie pas.
L'apprenant ne tranche jamais un fait métier.

## L'opérateur

- Un opérateur exploite le service de vélos en libre-service d'une métropole : environ 300
  stations, 3 000 vélos et 40 000 abonnés. C'est l'entreprise du cours.
- La DSI de l'opérateur gère les systèmes (bornes, location, appli) et donne les accès à leurs
  données.
- Le comité de direction de l'opérateur réunit notamment la directrice des opérations (Odile) et
  le DSI (Sid) : leurs désaccords s'y tranchent, comme ceux entre la plateforme et l'appli
  que leurs PO et Scarlette ne règlent pas.

## La collectivité

La métropole, appelée la collectivité, est extérieure à l'opérateur.

- Elle finance le service par une subvention et attend des indicateurs pour la justifier devant
  son conseil. Le conseil examine la subvention une fois par an ; la collectivité y présente un
  bilan.
- Charlotte, chargée de mission mobilité, la représente (voir les acteurs).
- Elle tient le référentiel des quartiers (voir les sources de données).

## Le produit et l'équipe

- **Le produit** : la plateforme de données de l'opérateur. Elle collecte les données des
  systèmes dans un entrepôt et en tire des vues, des alertes et des indicateurs pour les métiers
  de l'opérateur et pour la collectivité. Elle existe depuis environ un an.
- **L'objectif produit** : « Que les stations du centre-ville restent le moins longtemps
  possible vides aux heures de pointe, grâce à des données à jour pour l'exploitation. » Sa
  mesure de résultat : le temps cumulé pendant lequel une station du centre-ville est vide aux
  heures de pointe, calculé depuis les relevés des stations. La cible chiffrée, la définition
  des « heures de pointe », celle d'une station vide (vélos à quai ou vélos disponibles) et le
  calcul (par station ou cumulé sur le centre-ville) ne sont pas fixés.
- **Le PO, c'est l'apprenant** : chaque question le place dans ce rôle (« que proposes-tu au
  planning ? »).
- **L'équipe vélos** (l'équipe de la plateforme) : deux data engineers (Dana, Diego) et une
  analyste (Anna), en sprints de deux semaines. Sa Scrum Master, Scarlette, l'est aussi de
  l'équipe appli.
- **Ce que la plateforme ne fait pas** :
  - l'appli des abonnés et ses canaux (notifications, SMS) relèvent de l'**équipe appli**, qui a
    sa propre PO (Pia) et consomme des données de la plateforme ;
  - les accès aux données des systèmes relèvent de la DSI.

  Ces deux frontières sont des dépendances naturelles (concepts 10, 11 et 14).

## Les acteurs

L'initiale du prénom rappelle le rôle : Dana et Diego (data), Anna (analyste), Scarlette (Scrum
Master), Odile (opérations), Étienne (exploitation), Régis (régulateur), Théo (technicien), Maud
(maintenance), Abba (abonnée), Charlotte (chargée de mission), Pia (PO de l'appli), Sid
(DSI : S, I, D).

| Acteur | Rôle | Besoin principal | Concepts où il est central |
|---|---|---|---|
| Odile, directrice des opérations | Encadre l'exploitation (Étienne) et la maintenance (Maud) ; sponsor de la plateforme, dont elle porte le budget | Que la plateforme améliore le service (objectif produit) | 2, 14 |
| Scarlette, Scrum Master | Scrum Master de l'équipe vélos et de l'équipe appli | Lever les obstacles des deux équipes | 0, 14 |
| Régis, régulateur | Conduit une camionnette, redistribue les vélos entre stations | Savoir quelles stations vont se vider, pour y aller avant | 9, 17 |
| Étienne, responsable d'exploitation | Encadre les régulateurs, pilote la flotte au quotidien | Suivre l'état du réseau dans plusieurs vues (stations vides, vélos en panne, locations du jour) | 4, 11, 16 |
| Théo, technicien de maintenance | Répare les vélos sur le terrain ; confirme ou infirme sur place une panne signalée | Préparer sa tournée de réparation à partir des vélos signalés | 6, 10, 15 |
| Maud, responsable maintenance | Encadre les techniciens | Qu'un vélo signalé en panne ne soit plus louable | 5, 10, 13 |
| Abba, abonnée | Persona des abonnés sans l'appli, avec un téléphone basique (un tiers des abonnés), construit à partir d'abonnés interrogés | Savoir avant de partir s'il reste un vélo à sa station | 6, 7, 8 |
| Charlotte, chargée de mission mobilité | Côté collectivité, suit le service qu'elle finance | Justifier la subvention au conseil (locations par quartier) | 10, 12, 13 |
| Pia, PO de l'équipe appli | Porte l'appli des abonnés | Recevoir de la plateforme les données qu'affiche l'appli | 13, 14 |
| Sid, DSI | Gère les systèmes et leurs accès | Donner les accès aux données dans les règles | 11, 12, 14 |

## Les sources de données

| Source | Contenu | Propriétaire | Fraîcheur, défauts connus |
|---|---|---|---|
| Relevés des stations | Nombre de vélos à quai par station et, pour chacun, s'il est louable | Système des bornes, via la DSI | En continu ; la plateforme se rafraîchit toutes les 5 minutes et garde l'historique depuis son lancement (environ un an). Relevés en double (concept 11) |
| Table des locations | Chaque location : vélo, abonné (identifiant), stations de départ et d'arrivée, heures | Système de location, via la DSI | Historique sur plusieurs années dans le système de location. Accès demandé, pas encore obtenu (concept 11b) ; la DSI demande de justifier chaque colonne demandée |
| Signalements de pannes | Vélo signalé, par l'abonné dans l'appli | Équipe appli | Les signalements par téléphone ne sont pas saisis dans l'appli |
| Abonnés | Nom et coordonnées de l'abonné, abonnement, station favorite | Équipe appli | |
| Référentiel des quartiers | Quartier de chaque station | La collectivité | |
| Météo | Pluie, par heure | Service externe | Source envisagée, pas encore collectée |

## Faits fixés

- « Station presque vide » : règle métier à fixer par un seuil (3 vélos cité comme exemple, pas
  décidé).
- Le centre-ville sert de premier périmètre ; la météo (pluie) pourrait ajuster la prévision
  des stations à risque : à vérifier (concept 17).
- Un vélo signalé en panne reste louable : son blocage à la location a été mis hors périmètre
  de la story de tournée de Théo ; Maud le réclame (concept 10). Le blocage se fait dans le
  système de location (DSI) ; la plateforme peut lui fournir la liste des vélos signalés : la
  story de blocage dépend de la DSI (concept 13).
- Un vélo n'est plus louable quand un technicien l'a retiré du service après constat.
- Règles fixées : un vélo disponible est un vélo à quai et louable ; la station d'un abonné est
  celle qu'il a choisie comme favorite. Fraîcheur visée : moins de 15 minutes.
- La disponibilité par station vient de la plateforme ; la livrer à Abba par un canal (SMS,
  serveur vocal, appli) dépend de l'équipe appli.
- La collectivité veut le nombre de locations par quartier sur le mois, puis la comparaison au
  même mois de l'an dernier (concept 10b).
- Chaque vue d'Étienne affiche l'heure de la dernière mise à jour (DoD, concept 11). La DoD
  exige aussi que chaque indicateur publié ait sa définition écrite (ajoutée en
  rétrospective, concepts 11a et 12a), et que les relevés en double soient détectés par un
  test automatique avant publication (concept 11a). DoR de
  l'équipe vélos : critères d'acceptation écrits, règles métier fixées, dépendances
  identifiées, accès aux données obtenu (concept 11b).
- La vue des stations vides est livrée (concept 0b) ; elle doit servir à Étienne à envoyer les
  régulateurs plus tôt vers les stations qui se vident. Les autres vues d'Étienne ne sont pas
  livrées. La story de tournée de Théo est livrée (concept 10a2).
- Étienne envoie les régulateurs vers les stations ; sur le terrain, un régulateur comme Régis va
  aussi de lui-même vers une station qu'il voit se vider.
- La journée d'Étienne : point du matin sur l'état du réseau, envoi des régulateurs, suivi des
  incidents, bilan du soir.
- Maud fixe chaque semaine le nombre de techniciens en tournée ; elle demande le nombre de
  vélos en panne par semaine (concept 5).
- Une location rendue à la même station au bout de quelques minutes est souvent un vélo
  défectueux rendu aussitôt ; les compter ou non comme locations n'est pas fixé pour les
  indicateurs (concept 12a). La vue des locations du jour d'Étienne, pas encore construite
  (accès à la table des locations non obtenu), montrera toutes les locations, courtes comprises.
