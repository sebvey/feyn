---
description: "Ce qu'est une user story (qui, quoi, pourquoi), pourquoi la phrase ne suffit pas (les 3C) et comment faire remonter un « afin de » faible jusqu'à la raison de l'utilisateur."
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "Ne parle pas de story et n'impose aucun format aux éléments du backlog. Il cite des attributs (description, ordre, taille) qui varient selon le domaine. Rien de ce concept n'est donc dans le Scrum Guide."
      refs: [S1]
    - author: "Pratique établie, hors du Scrum Guide"
      text: "La story vient d'Extreme Programming (XP), où Kent Beck a introduit le terme. Les 3C (carte, conversation, confirmation) sont de Ron Jeffries (XP), en 2001."
      refs: [S3, S4, S5]
  school:
    - author: "Rachel Davies, chez Connextra : le format « en tant que / je veux / afin de »"
      text: "Un modèle né à Londres, au début des années 2000, devenu le plus courant sans être obligatoire. Mike Cohn, qui le recommande, dit lui-même qu'il n'y a pas de formule magique."
      refs: [S2, S5, S6]
    - author: "Ron Jeffries : la confirmation"
      text: "Jeffries parle de tests d'acceptation, des exemples définis par le client. Rapprocher la confirmation des critères d'acceptation est la lecture courante, et celle du cours."
      refs: [S3]
  course:
    - text: "Poser des « pourquoi ? » successifs sur le « afin de » est un choix du cours. Il s'inspire des « cinq pourquoi » venus de Toyota, conçus pour remonter à la cause d'un problème ; le nombre de « pourquoi ? » varie selon le problème."
      refs: [S7]
    - text: "S'arrêter à une décision que l'utilisateur prend ou à un gain qu'il reconnaît. Au-delà, la raison devient l'objectif produit ou un enjeu général, commun à beaucoup de stories, et n'aide plus à ordonner."
      refs: [S2]
    - text: "Le PO n'invente pas la raison : il la demande à l'utilisateur."
      refs: [S3]
    - text: "Une story, un seul « je veux » : s'il y en a plusieurs, ce n'est plus une story (feature ou epic, concept 4 ; un parcours, concept 16)."
      refs: []
    - text: "Le test du « afin de » lu à la personne qui a fait la demande est une formulation du cours."
      refs: []
neighbors:
  - author: "Le parcours de l'utilisateur"
    text: "Une story exprime un besoin, pas tout ce que fait l'utilisateur. Le parcours organise les stories en story map, une carte des stories rangées sous les étapes du parcours (Jeff Patton, concept 16)."
    refs: [S9]
diagrams:
  - file: phrase-trois-blocs-pourquoi.svg
    title: "La phrase d'une story en trois blocs, et l'échelle des « pourquoi ? »"
    caption: "Une story sur un cas inventé pour l'illustration. En bas, la phrase en trois blocs ; le « afin de » est mis en avant. Au-dessus, l'échelle des « pourquoi ? » : on monte jusqu'à une décision que l'utilisateur prend, et pas plus haut. À gauche, la carte, avec sa conversation (bulle) et sa confirmation (coche) : les 3C."
    subconcept: 5a
---

## Objectif

Écrire une story qui dit qui a le besoin, ce qu'il veut faire et pourquoi, sans imposer de
solution ; savoir que la phrase seule ne suffit pas (les 3C) ; faire remonter un « afin de »
faible jusqu'à la décision ou au gain que l'utilisateur reconnaît.

## L'essentiel

Une **user story** (story) exprime **un besoin précis** d'un utilisateur, vu de lui : ni son parcours entier, ni une spécification. Elle s'écrit souvent **en tant que** (qui), **je veux** (quoi, sans solution imposée), **afin de** (sa raison). La raison aide le PO à ordonner et laisse l'équipe choisir comment répondre, parfois plus simplement. La phrase écrite, la **carte**, ne suffit pas : la **conversation** la précise, et la **confirmation** dit comment vérifier qu'elle est faite (les 3C).

![La phrase d'une story en trois blocs, et l'échelle des « pourquoi ? »](phrase-trois-blocs-pourquoi.svg)

## 5a Les trois parties et les 3C

*Qui, quoi, pourquoi : la phrase est une carte, elle ne contient pas toute la story.*

### 5a1 Les trois parties

Une story dit **qui** a le besoin (l'utilisateur, désigné par son rôle, c'est-à-dire sa catégorie d'utilisateurs ; le choix de l'acteur est au concept 6), **quoi** (ce qu'il veut faire ou savoir) et **pourquoi** (sa raison), le plus souvent sous la forme « En tant que *qui*, je veux *quoi*, afin de *pourquoi* ». Le « je veux » décrit ce que l'utilisateur veut, pas la façon dont l'équipe le construit : un écran, un export ou un graphique sont des solutions, c'est-à-dire le comment des Developers.

Une story porte un seul « je veux ». S'il y en a plusieurs, ce n'est plus une story : c'est une feature ou un epic (concept 4), ou un parcours, que le concept 16 apprend à ranger.

Le Scrum Guide ne parle pas de story et n'impose aucun format. L'idée vient d'Extreme Programming (XP), où Kent Beck a introduit le terme. Le format « en tant que / je veux / afin de » est un choix d'école [école] : un modèle de Rachel Davies, chez Connextra à Londres, au début des années 2000. Il est devenu le plus courant, sans être obligatoire ; Mike Cohn, qui le recommande, le dit lui-même.

> **Fil rouge :** Régis, régulateur, veut savoir quelles stations vont se vider, pour y aller avant : qui (le régulateur), quoi (connaître les stations qui vont se vider), pourquoi (y aller avant).

### 5a2 Les 3C

Les 3C sont une pratique établie, de Ron Jeffries (XP, 2001), hors du Scrum Guide [consensus] :

- la **carte** est la phrase écrite. Elle représente le besoin sans le contenir en entier ;
- la **conversation** le précise, entre l'utilisateur, le PO et ceux qui réalisent ;
- la **confirmation** dit comment vérifier que la story est faite. On la rapproche couramment des critères d'acceptation (concept 8) ; Jeffries, lui, parle de tests d'acceptation [école].

La carte n'est donc pas à allonger : elle reste courte, et le détail va dans la conversation et la confirmation.

> **Fil rouge :** Abba veut savoir avant de partir s'il reste un vélo à sa station. La phrase tient en une ligne ; ce qu'est « sa station » (celle qu'elle a choisie comme favorite) et la fraîcheur visée (moins de 15 minutes) se précisent à côté, en conversation puis en critères.

## 5b Le « afin de » et les « pourquoi ? » successifs

*La raison se demande à l'utilisateur, jusqu'à une décision qu'il prend ou un gain qu'il reconnaît.*

**Un « afin de » qui sert.** Le « afin de » donne la raison du besoin. Il aide le PO à ordonner les stories, et il laisse l'équipe choisir comment répondre [école] : connaître la raison permet parfois une réponse plus simple (formulation du cours). Deux formes le rendent inutile :

- le « afin de » **circulaire**, qui répète le « je veux » (« je veux voir les locations, afin de suivre les locations ») ;
- le « afin de » **de confort** (« afin d'être bien informé »), qui ne dit pas ce que ce confort change pour l'utilisateur.

Le PO n'invente pas la raison : il la demande à l'utilisateur [cours].

**Remonter par les « pourquoi ? ».** Quand le « afin de » est faible, le PO demande « pourquoi ? » à l'utilisateur, plusieurs fois, jusqu'à **une décision qu'il prend ou un gain qu'il reconnaît**. La technique rappelle les « cinq pourquoi » venus de Toyota, conçus pour remonter à la cause d'un problème ; ici, le nombre importe peu [cours].

Il faut aussi savoir s'arrêter. Trop haut, la raison devient l'objectif produit (concept 2) ou un enjeu général, que partagent beaucoup de stories : elle n'aide plus à les ordonner entre elles. Le bon point d'arrêt est celui que l'utilisateur reconnaît comme sa raison.

> **Fil rouge :** Autre cas, sur le fil rouge : pour la vue des stations vides, la raison qu'Étienne reconnaît est d'envoyer les régulateurs plus tôt vers les stations qui se vident, une décision qu'il prend chaque jour. C'est un bon point d'arrêt.

## Pièges

- **Prendre la story pour le parcours de l'utilisateur** : piège probable de qui n'a jamais lu de story. Une story est un besoin, pas une suite d'actions. Si la phrase enchaîne plusieurs actions, c'est un parcours, que le concept 16 apprend à ranger.
- **Mettre une solution dans le « je veux »** (« je veux un export CSV de… », « un graphique dans la vue ») : écrire le besoin, l'équipe proposera la solution (le concept 7 y revient : besoin ou solution).
- **Un « afin de » circulaire ou de confort** : demander « pourquoi ? » à l'utilisateur, jusqu'à une décision ou un gain qu'il reconnaît.
- **Un « afin de » trop haut** (l'objectif produit, « améliorer le service ») : il vaut pour toutes les stories et n'aide plus à ordonner.
- **Inventer la raison** au lieu de la demander.
- **Un acteur technique** (« en tant que data engineer, je veux un traitement qui calcule les pannes ») : l'acteur est celui qui agit et y gagne, pas celui qui construit. Un data engineer qui consomme la plateforme peut pourtant être un utilisateur (concept 1) ; le choix de l'acteur se travaille au concept 6.
- **Un chiffre précis dans la phrase** (« … à jour de moins de 15 minutes ») : il va dans un critère d'acceptation (concept 8).
- **Une contradiction dans la phrase** (« je veux en temps réel le nombre de vélos en panne par semaine ») : la conversation tranche lequel des deux est le besoin.
- **Croire que le format est obligatoire** : le Scrum Guide n'impose aucun format ; « en tant que / je veux / afin de » est un choix d'école, devenu courant.

## Le test rapide

> Lis le seul « afin de » à la personne qui a fait la demande : reconnaît-elle une décision qu'elle prend ou un gain qu'elle attend (« oui, c'est pour ça ») ? Et le « je veux » nomme-t-il un besoin, sans table, vue ni traitement ?

Formulation du cours, sans source.
