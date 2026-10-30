---
description: "Epic, feature, story, tâche : à quoi servent ces niveaux du backlog, ce qu'en dit le Scrum Guide (rien), et comment trancher en comptant les « je veux » qu'il reste à livrer."
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "Le backlog contient des « éléments du backlog », sans niveau : les mots epic, feature, story, thème et tâche n'y figurent pas. Découper un élément en éléments plus petits et plus précis fait partie du travail continu sur le backlog (le refinement, vu au concept 15). Au Sprint Planning, les Developers planifient le travail de chaque élément choisi, souvent en le découpant en travail d'un jour ou moins ; la façon de le faire est à leur seule discrétion."
      refs: ["S1"]
      verified:
        - "« epic », « feature », « story », « theme », « task » absents du texte (recherche du 2026-10-22) ; « Product Backlog refinement is the act of breaking down and further defining Product Backlog items into smaller more precise items » (Product Backlog) ; « This is often done by decomposing Product Backlog items into smaller work items of one day or less. How this is done is at the sole discretion of the Developers. » (Sprint Planning)"
  school:
    - author: "Mike Cohn : l'epic, la feature, le thème"
      text: "Au sens d'origine, un epic est une grosse story, trop grosse pour un sprint. Aucun seuil ne sépare les niveaux, et « feature » n'a pas de sens unique : Cohn le juge même superflu et propose d'en faire une étiquette plutôt qu'un niveau. Chez lui, un thème est une collection de stories. La frontière entre niveaux reste floue entre praticiens."
      refs: ["S2"]
      verified:
        - "« epic just means big user story » ; « there's no magic threshold at which we call a particular story an epic » ; « to mean a collection of user stories » (page)"
    - author: "Jira Cloud (Atlassian) : choix d'outil"
      text: "Trois niveaux par défaut, Epic > Story > Subtask (sous-tâche), modifiables ; des niveaux au-dessus seulement dans les offres Premium et Enterprise."
      refs: ["S3"]
      verified:
        - "« By default, Jira is set up with three levels of work type hierarchy » ; « You can modify these levels » ; « Jira Premium and Enterprise customers can also create and manage additional levels » (page)"
    - author: "Azure DevOps (Microsoft) : choix d'outil"
      text: "Les niveaux dépendent du processus choisi à la création du projet. Agile : Epic > Feature > User Story > Task. Scrum : Epic > Feature > Product Backlog Item > Task. Basic : Epic > Issue > Task."
      refs: ["S4"]
      verified:
        - "« Epic », « Feature », « User Story », « Task » (Agile) ; « Product backlog item » (Scrum) ; « Epic », « Issue », « Task » (Basic) (tableau « Main distinctions among the default processes ») ; « You can't change a project's base process after the project is created. » (page)"
    - author: "SAFe (Scaled Agile) : choix de cadre"
      text: "Un cadre pour plusieurs équipes, qui ajoute des niveaux : la capability, entre epic et feature. Une feature y est dimensionnée pour plusieurs équipes réunies. Le cours juge qu'une équipe seule n'en a pas besoin."
      refs: ["S5"]
      verified:
        - "« sized to be delivered by an Agile Release Train within a PI » ; « whose implementation often spans multiple ARTs » (page)"
  course:
    - text: "Compter les « je veux » pour trancher, en jugeant d'après ce qu'il reste à livrer. Un seul « je veux » trop gros pour un sprint est un epic (au sens de Cohn, une grosse story), qui se découpe. Quand la taille et le compte divergent, le compte l'emporte. Ces règles pratiques n'ont pas de source externe."
      refs: []
    - text: "Un niveau est de trop quand la plupart des features ne contiennent qu'une story. Règle pratique du cours, sans source externe ; Cohn, qui juge la feature superflue, va dans le même sens. Avant de retirer un niveau, on vérifie que ses éléments ne sont pas mal classés."
      refs: []
    - text: "La tâche revient aux Developers : le PO ne l'écrit pas. Le Guide laisse le découpage à leur discrétion ; le cours en déduit que la tâche est à eux."
      refs: ["S1"]
      verified:
        - "« How this is done is at the sole discretion of the Developers. » (Sprint Planning)"
    - text: "« Quatre mots courants » est un choix du cours, pas un constat d'usage. Aucune source ne dit que la plupart des équipes emploient ces quatre mots, et les outils vérifiés ont trois ou quatre niveaux par défaut."
      refs: ["S3", "S4"]
      verified:
        - "« By default, Jira is set up with three levels of work type hierarchy » (page)"
        - "« Epic », « Feature », « User Story », « Task » (Agile) ; « Epic », « Issue », « Task » (Basic) (tableau « Main distinctions among the default processes »)"
    - text: "Peu de niveaux suffisent : choix du cours."
      refs: []
neighbors:
  - author: "Le thème"
    text: "Le cours n'en fait pas un niveau : son sens varie selon les auteurs et les outils (chez Cohn, une collection de stories), et aucun des deux outils cités n'en a un niveau par défaut."
    refs: ["S2", "S3", "S4"]
    verified:
      - "« to mean a collection of user stories » (page)"
      - "niveau 1 « by default called Epic », niveau 0 « called Story », niveau -1 « called Subtask » (page)"
      - "« Epic », « Feature », « User Story », « Task » (Agile) ; « Epic », « Issue », « Task » (Basic) (tableau « Main distinctions among the default processes »)"
diagrams:
  - file: arbre-niveaux-backlog.svg
    title: "L'arbre des niveaux du backlog : epic, feature, story, tâche"
    caption: "Un arbre sur un cas inventé (des vols de vélos), qui n'est pas un fait du fil rouge. L'epic se déplie en deux features (deux stories chacune) et une story rattachée directement à l'epic : on peut sauter un niveau. Sous une story, deux tâches grisées : elles appartiennent aux Developers. À droite, le compte de « je veux » qui désigne chaque niveau. Cas inventé, pour illustrer."
    subconcept: 4a
---

## Objectif

Classer un besoin en epic, feature, story ou tâche ; trancher entre feature et story en
comptant les « je veux » ; choisir peu de niveaux, en sachant qu'aucun guide n'en impose.

## L'essentiel

Le Scrum Guide ne connaît que des **éléments du backlog**, sans niveau. Le cours emploie quatre mots courants pour les classer : **epic** (trop gros pour un sprint), **feature** (sert seule, faite de plusieurs besoins), **story** (un besoin, qui tient dans un sprint) et **tâche** (travail des Developers pour réaliser une story, dans le backlog de sprint). Aucun guide n'impose ces niveaux : les outils ont leurs réglages par défaut, trois ou quatre niveaux, l'équipe choisit les siens, et peu suffisent. Pour trancher, on compte les « je veux » qu'il reste à livrer. Le compte l'emporte sur la taille : une feature peut prendre plusieurs sprints ; la taille ne tranche qu'entre story et epic, pour un seul « je veux ».

![L'arbre des niveaux du backlog : epic, feature, story, tâche](arbre-niveaux-backlog.svg)

## 4a Les niveaux, qu'aucun guide n'impose

*Les noms et le nombre de niveaux viennent des outils et des équipes, pas de Scrum.*

### 4a1 Les quatre mots

Le Scrum Guide ne parle que d'éléments du backlog : les mots epic, feature, story, thème et tâche n'y figurent pas. Les quatre mots du cours sont un vocabulaire courant, pas une règle de Scrum [cours]. Ils classent un besoin par ce qu'il contient :

- un **epic** est trop gros pour un sprint, et ses morceaux ne sont pas tous connus. Au sens d'origine, c'est une grosse story (Mike Cohn [école]) ;
- une **feature** est une capacité qui sert seule à l'utilisateur, faite de plusieurs besoins ;
- une **story** est un seul besoin, qui tient dans un sprint (concept 5) ;
- une **tâche** est du travail des Developers pour réaliser une story : l'utilisateur ne la voit pas. Elle vit dans leur plan, le backlog de sprint, et le PO ne l'écrit pas [cours].

Aucun seuil ne sépare ces niveaux, et « feature » n'a pas de sens unique : la frontière reste floue, même entre praticiens. Un travail technique qui ne sert qu'à réaliser une story est une tâche. S'il porte sa propre raison (dédoublonner les relevés des stations, par exemple), il entre au backlog et le PO l'ordonne (concept 3). Le **thème** n'est pas un niveau du cours : son sens varie selon les auteurs et les outils.

### 4a2 Les niveaux de l'outil

Les niveaux par défaut changent d'un outil à l'autre, et chacun se modifie [école] :

- **Jira Cloud** : Epic > Story > Subtask par défaut ; des niveaux au-dessus seulement dans les offres Premium et Enterprise.
- **Azure DevOps** : selon le processus choisi à la création du projet. Agile : Epic > Feature > User Story > Task. Scrum : Epic > Feature > Product Backlog Item > Task. Basic : Epic > Issue > Task.
- **SAFe**, un cadre pour plusieurs équipes, ajoute des niveaux, dont la capability entre epic et feature ; le cours juge qu'une équipe seule n'en a pas besoin.

Trois sources de règles, donc, à ne pas confondre : le Scrum Guide (aucun niveau), l'outil (des niveaux par défaut, modifiables) et l'équipe (son choix).

### 4a3 Le niveau de trop

Un niveau coûte : chaque élément s'y écrit, s'y range et s'y suit. S'il double presque toujours le niveau du dessous, il est de trop. Signe : la plupart des features ne contiennent qu'une story. C'est un choix du cours [cours], pas un consensus ; Cohn, qui juge la feature superflue, va dans le même sens. Avant de retirer un niveau, on vérifie que ses éléments ne sont pas mal classés : une feature qui ne contient qu'une story peut être une story mal classée.

Régler les niveaux dans l'outil : annexe A1.

## 4b Feature ou story : compter les « je veux »

*Le niveau d'un besoin se lit au nombre de « je veux » qu'il reste à livrer.*

**Le test du compte.** Un « je veux » est un besoin que l'utilisateur dit lui-même, à la première personne (« je veux voir… ») ; la story entière s'écrit au concept 5.

Le test est un choix du cours [cours]. On écrit les « je veux » de **ce qu'il reste à livrer** à l'utilisateur, pas le travail technique, puis on les compte :

- **un seul**, qui tient dans un sprint : une **story** ;
- **un seul**, trop gros pour un sprint : un **epic** (au sens de Cohn), qui se découpe (concept 9) ;
- **plusieurs**, chacun utile seul : une **feature**, et chaque « je veux » devient une story candidate ;
- **plusieurs groupes** (par exemple des moments différents de la journée d'un utilisateur), ou des « je veux » qu'on ne sait pas encore écrire : un **epic**. Un « je veux » qui en contient d'autres se déplie avant de compter.

> **Fil rouge :** La journée d'Étienne (point du matin, envoi des régulateurs, suivi des incidents, bilan du soir) compte plusieurs moments distincts ; un besoin qui couvre toute sa journée est un epic, pas une story.

**Ce que le compte ne regarde pas.** Le compte l'emporte sur la taille : une feature peut prendre plusieurs sprints. La taille ne tranche qu'entre story et epic, pour un seul « je veux ». Le format non plus ne fait pas le niveau : une phrase au format d'une story (concept 5) peut cacher plusieurs besoins.

Le niveau se juge d'après ce qu'il reste à livrer, pas dans l'absolu. Ce qui existe déjà ne compte plus, et le travail technique n'est pas un « je veux » de plus pour l'utilisateur.

## Pièges

- **Classer un epic en story** : une phrase courte, ou au format d'une story, cache plusieurs besoins (« gérer toute la flotte », exemple inventé). Déplier le « je veux » : s'il en contient d'autres, ce n'est pas une story.
- **Mettre une tâche au backlog produit** : le travail qui ne sert qu'à réaliser une story (cas inventé : convertir un fichier en entrée pour un écran) est une tâche, dans le plan des Developers (backlog de sprint). Un travail technique qui porte sa propre raison (par exemple dédoublonner les relevés des stations, qui contiennent des doublons : ce travail sert plusieurs vues, pas une seule story ; concept 3) entre, lui, au backlog, et le PO l'ordonne.
- **Croire que Scrum impose des niveaux**, ou copier ceux de l'outil sans les choisir.
- **Garder un niveau de trop** : quand la plupart des features ne contiennent qu'une story, un niveau double le travail. Le régler dans l'outil : annexe A1.
- **Faire du thème un niveau** : son sens varie selon l'outil et l'auteur.
- **Juger le niveau dans l'absolu** : on juge les « je veux » qu'il reste à livrer, pas le travail technique. Ce qui existe déjà ne compte plus, et le travail technique n'est pas un « je veux » de plus pour l'utilisateur.
- **Donner une taille en jours comme définition d'une story** : elle tient dans un sprint, aucune durée en jours n'en fait la définition.

## Le test rapide

> Écris les « je veux » de ce qu'il reste à livrer. Un seul, qui tient dans un sprint : story ; trop gros pour un sprint : epic, qui se découpe. Plusieurs, chacun utile seul : feature. Plusieurs groupes, ou pas encore tous écrits : epic. Du travail que l'utilisateur ne voit pas, pour réaliser une story : tâche, dans le plan des Developers.

Règle pratique du cours, sans source externe.
