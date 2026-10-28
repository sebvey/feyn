---
description: "Comment décrire un produit data par son problème, ses utilisateurs et sa valeur, et qui du PO, des Developers et des parties prenantes décide du quoi, de l'ordre, du comment et du coût."
stances:
  consensus:
    - text: "Un produit est un moyen de livrer de la valeur, avec des frontières claires, des parties prenantes connues et des utilisateurs ou clients bien définis."
      author: "Le Scrum Guide 2020 : le produit"
      refs: [S1]
    - text: "Le PO répond de la valeur du produit et du backlog : il formule l'objectif produit, crée les éléments, les ordonne et rend le backlog transparent. Il est une seule personne, pas un comité ; il peut déléguer ce travail, mais il en reste responsable. Qui veut changer le backlog doit le convaincre. L'organisation respecte ses décisions, visibles dans le contenu et l'ordre du backlog."
      author: "Le Scrum Guide 2020 : le PO"
      refs: [S1]
    - text: "Le comment revient aux seuls Developers, qui estiment aussi la taille des éléments ; le PO peut les aider à comprendre les arbitrages. Le travail du sprint, les Developers le choisissent en discussion avec le PO : le PO ne le fixe pas seul."
      author: "Le Scrum Guide 2020 : les Developers"
      refs: [S1]
  school:
    - text: "Décrire un produit par son groupe cible et ses « besoins » : les problèmes qu'il retire aux utilisateurs et les bénéfices qu'il leur apporte. Le cours en tire la grille problème, utilisateurs, valeur ; le Scrum Guide nomme déjà les utilisateurs et la valeur."
      author: "Roman Pichler : Product Vision Board"
      refs: [S5, S1]
    - text: "Traiter les consommateurs de données comme des clients. Le propriétaire d'un produit de données doit savoir qui en sont les utilisateurs et comment ils s'en servent."
      author: "Zhamak Dehghani : data mesh"
      refs: [S2]
  course:
    - text: "La grille problème, utilisateurs, valeur : le cours sépare le problème et la valeur, que Pichler réunit sous « besoins », et n'emploie pas « besoin », réservé aux stories."
      refs: [S5]
    - text: "Les consommateurs de données sont des utilisateurs du produit (cas inventé : un service d'analyse qui reçoit un jeu de données, un organisme qui reçoit des indicateurs). Choix du cours, appuyé sur le choix d'école de Dehghani."
      refs: [S2]
    - text: "Une partie prenante est toute personne ou équipe concernée par le produit : utilisateur, financeur, sponsor, équipe voisine, fournisseur de données. Le sponsor porte le budget du produit et porte plus haut les obstacles qui dépassent le PO, sans ordonner le backlog. Le Scrum Guide emploie « stakeholders » sans le définir."
      refs: [S1]
    - text: "Le PO obtient les faits du métier auprès des utilisateurs, au lieu de les trancher seul."
      refs: []
diagrams:
  - file: produit-probleme-utilisateurs-valeur.svg
    title: "Un produit se décrit par un problème, des utilisateurs et une valeur ; trois intervenants se partagent les décisions"
    caption: "En haut, le produit se décrit par un problème, des utilisateurs et une valeur ; les consommateurs de données sont des utilisateurs. En bas, qui tranche quoi : le PO représente les parties prenantes dans le backlog et répond de la valeur."
    subconcept: 1a
---

## Objectif

Décrire un produit par le problème qu'il résout, ses utilisateurs et la valeur qu'ils en tirent, et dire qui tranche quoi entre le PO, les Developers et les parties prenantes.

## L'essentiel

Un produit livre de la valeur à des utilisateurs connus. Ce cours le décrit par trois choses : le **problème** qu'il résout, les **utilisateurs** qui ont ce problème (un consommateur de données en est un), la **valeur** qu'ils en tirent, plutôt que par sa technique. Le **Product Owner** répond de cette valeur : il tient le backlog produit, donc il dit **quoi**, **dans quel ordre** et **pourquoi**. Les **Developers** décident **comment** et donnent le **coût**. Les **parties prenantes** font valoir leurs besoins en convainquant le PO, qui est une seule personne.

![Un produit se décrit par un problème, des utilisateurs et une valeur ; trois intervenants se partagent les décisions](produit-probleme-utilisateurs-valeur.svg)

## 1a Le produit : problème, utilisateurs, valeur

*Décrire ce que le produit change, pour qui, avant de dire comment il est fait.*

Le Scrum Guide définit un produit comme un moyen de livrer de la valeur, avec des utilisateurs et des parties prenantes connus [consensus]. Roman Pichler (Product Vision Board) le décrit par son groupe cible et par les problèmes qu'il lui retire et les bénéfices qu'il lui apporte [école]. Le cours en tire une grille à trois cases : le **problème**, les **utilisateurs**, la **valeur** [cours].

La technique dit comment le produit est fait, pas pourquoi il existe. Signe qu'une description en reste là : un abonné qui la lirait ne comprendrait pas à quoi sert la plateforme. La technique n'est pas interdite, elle vient après, pour qui demande comment c'est fait.

La **valeur** est ce que l'utilisateur ou l'organisation gagne (du temps, une meilleure décision, un risque évité). Une phrase qui dit seulement ce que le produit affiche ou calcule n'a pas encore de valeur : il faut dire ce que la personne fait ou obtient grâce à lui, et ce que cela change pour elle. Si le PO ne le sait pas, il le demande à la personne concernée, il ne l'invente pas.

Les **utilisateurs** sont les personnes ou les équipes qui se servent du produit. Pour un produit data, un consommateur de données en est un, même s'il n'ouvre aucun écran du produit. Dehghani, dans le data mesh, va dans ce sens : traiter les consommateurs de données comme des clients [école]. Le cours en fait un choix : un service d'analyse qui reçoit un jeu de données, un organisme qui reçoit des indicateurs sont des utilisateurs du produit [cours].

> **Fil rouge :** Étienne fait chaque matin le point sur l'état du réseau avant d'envoyer les régulateurs ; il est l'utilisateur, et ce que ce point change pour lui, le PO le précise avec lui au lieu de le deviner.

## 1b Qui tranche quoi

*Le PO dit quoi, dans quel ordre et pourquoi ; les Developers disent comment et combien.*

Le concept 0 a situé les trois responsabilités de l'équipe Scrum ; voici qui décide quoi.

**Le PO** répond de la valeur du produit et du backlog. Il formule l'objectif produit, crée les éléments, les ordonne et les explique : c'est lui qui dit le quoi, l'ordre et le pourquoi. Il est une seule personne, pas un comité [consensus]. Il peut confier une partie du travail, mais il en reste responsable.

**Les Developers** décident du comment et donnent le coût (la taille des éléments). Le PO peut les aider à comprendre les arbitrages, il ne choisit pas la technique à leur place. Le travail du sprint, les Developers le choisissent en discussion avec le PO, quels éléments comme combien : le PO ne le fixe pas seul.

**Les parties prenantes** sont toutes les personnes ou équipes concernées par le produit : les utilisateurs, le financeur, le sponsor, une équipe voisine, un fournisseur de données [cours]. Elles font valoir leurs besoins, et qui veut changer le backlog doit convaincre le PO. Le sponsor porte le budget du produit et porte plus haut les obstacles qui dépassent le PO, sans ordonner le backlog. Arbitrer entre parties prenantes et savoir quand aller plus haut viennent au concept 14.

> **Fil rouge :** Sid, le DSI, qui donne les accès aux données des systèmes, est une partie prenante, comme fournisseur de données.

## Pièges

- **Décrire le produit par sa technique** (l'architecture, les composants, la fréquence de mise à jour) : la phrase ne dit ni pour qui ni ce qui change. Signe : un abonné ne comprendrait pas à quoi sert la plateforme.
- **Oublier la valeur** : dire ce que le produit affiche ou calcule, sans dire ce qui change pour une personne nommée : et alors ?
- **Oublier les consommateurs de données** : un consommateur de données est un utilisateur, pas seulement un destinataire de rapports.
- **Trancher seul un fait métier**, comme ce dont un utilisateur a besoin ou le temps qu'il gagnerait : il se demande à la personne concernée. Le PO ordonne le backlog ; les faits du métier, il les obtient des utilisateurs.
- **Garder la casquette de développeur** : choisir la technique ou estimer à la place des Developers. Le comment et le coût sont à eux.
- **Croire que le PO fixe seul le contenu du sprint** : il propose, les Developers choisissent avec lui.
- **Partager la responsabilité de PO** : un comité qui vote l'ordre, ou deux PO qui se la partagent. Déléguer le travail est permis, pas la responsabilité.

## Le test rapide

> Ma phrase dit-elle **qui** a **quel problème**, et **ce qui change** pour lui une fois résolu ?
> Pour une décision : est-ce un quoi, un ordre ou un pourquoi (PO), ou un comment ou un coût
> (Developers) ?

Formulation du cours, appuyée sur la définition du produit et sur les responsabilités du Scrum Guide.
