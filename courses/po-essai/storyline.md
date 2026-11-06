# Fil rouge du cours : l'opérateur de vélos en libre-service

Sert d'exemple au cours, concept après concept, en changeant de situation (utilisateur, besoin, décision) plutôt que de domaine. Le mainteneur tient ce fichier. Le prof ne le modifie pas. L'apprenant ne tranche jamais un fait métier.

## L'opérateur

- Un opérateur exploite le service de vélos en libre-service d'une métropole. C'est l'entreprise du cours.
- La DSI de l'opérateur gère les systèmes (bornes, location, appli) et donne les accès à leurs données.
- Le comité de direction de l'opérateur réunit notamment la directrice des opérations (Odile) et le DSI (Sid).

## La collectivité

La métropole, appelée la collectivité, est extérieure à l'opérateur.

- Elle finance le service par une subvention et attend des indicateurs pour la justifier.
- Charlotte, chargée de mission mobilité, la représente (voir les acteurs).

## Le produit et l'équipe

- **Le produit** : la plateforme de données de l'opérateur. Elle collecte les données des systèmes dans un entrepôt et en tire des vues, des alertes et des indicateurs pour les métiers de l'opérateur et pour la collectivité.
- **L'objectif produit** : « Que les stations du centre-ville restent le moins longtemps possible vides aux heures de pointe, grâce à des données à jour pour l'exploitation. »
- **Le PO, c'est l'apprenant** : chaque question le place dans ce rôle (« que proposes-tu au planning ? »).
- **L'équipe vélos** (l'équipe de la plateforme) : deux data engineers (Dana, Diego) et une analyste (Anna), en sprints de deux semaines. Sa Scrum Master, Scarlette, l'est aussi de l'équipe appli.
- **Ce que la plateforme ne fait pas** :
  - l'appli des abonnés relève de l'**équipe appli**, qui a sa propre PO (Pia) et consomme des données de la plateforme ;
  - les accès aux données des systèmes relèvent de la DSI.

  Ces deux frontières sont des dépendances naturelles (le parcours y revient plus tard : les dépendances, la Definition of Ready, les parties prenantes).

## Les acteurs

L'initiale du prénom rappelle le rôle : Dana et Diego (data), Anna (analyste), Scarlette (Scrum Master), Odile (opérations), Étienne (exploitation), Théo (technicien), Maud (maintenance), Charlotte (chargée de mission), Pia (PO de l'appli), Sid (DSI : S, I, D).

| Acteur | Rôle | Besoin principal |
|---|---|---|
| Odile, directrice des opérations | Encadre l'exploitation (Étienne) et la maintenance (Maud) ; sponsor de la plateforme, dont elle porte le budget | Que la plateforme améliore le service (objectif produit) |
| Scarlette, Scrum Master | Scrum Master de l'équipe vélos et de l'équipe appli | Lever les obstacles des deux équipes |
| Étienne, responsable d'exploitation | Encadre les régulateurs, qui redistribuent les vélos entre stations, et pilote la flotte au quotidien | Suivre l'état du réseau dans plusieurs vues (stations vides, vélos en panne) |
| Théo, technicien de maintenance | Répare les vélos sur le terrain | Préparer sa tournée de réparation à partir des vélos signalés |
| Maud, responsable maintenance | Encadre les techniciens | Qu'un vélo signalé en panne ne soit plus louable |
| Charlotte, chargée de mission mobilité | Côté collectivité, suit le service qu'elle finance | Justifier la subvention |
| Pia, PO de l'équipe appli | Porte l'appli des abonnés | Recevoir de la plateforme les données qu'affiche l'appli |
| Sid, DSI | Gère les systèmes et leurs accès | Donner les accès aux données dans les règles |

## Les sources de données

| Source | Contenu | Propriétaire | Fraîcheur, défauts connus |
|---|---|---|---|
| Relevés des stations | Nombre de vélos à quai par station et, pour chacun, s'il est louable | Système des bornes, via la DSI | En continu ; la plateforme se rafraîchit toutes les 5 minutes |
| Signalements de pannes | Vélo signalé, par l'abonné dans l'appli | Équipe appli | |

## Faits fixés

- La Definition of Done de l'équipe vélos exige notamment que chaque vue affiche l'heure de sa dernière mise à jour (0c).
- La vue des vélos en panne, qu'Étienne réclame, a pris du retard : elle n'est pas livrée (0b5).
- La vue des stations vides est livrée un mercredi, en cours de sprint, conforme à la Definition of Done : Étienne peut s'en servir (0d).
- Étienne fait chaque matin le point sur l'état du réseau, puis envoie les régulateurs vers les stations (1a).
- La fraîcheur visée des données de la plateforme est de moins de 15 minutes, une règle fixée (1b).
