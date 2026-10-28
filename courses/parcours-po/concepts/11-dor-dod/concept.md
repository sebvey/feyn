---
description: "Ce que sont la Definition of Done et la Definition of Ready, en quoi elles diffèrent d'un critère d'acceptation, et quoi faire d'une story qui n'est pas prête."
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "La DoD est l'engagement de l'incrément : la description de son état quand il remplit les exigences de qualité du produit. Un élément qui la remplit entre dans l'incrément ; sinon, il n'est ni livré ni présenté en revue de sprint, et retourne au backlog (concept 0b). Les équipes d'un même produit partagent la même DoD. Si l'organisation a un standard, l'équipe le suit au minimum ; sinon, l'équipe Scrum écrit la sienne. Les Developers la respectent ; la rétrospective l'inspecte."
      refs: ["S1", "S2"]
    - author: "Le Scrum Guide 2020, sur la DoR et les critères"
      text: "Ne parle ni de story, ni de critère d'acceptation, ni de DoR. Dit qu'un élément que l'équipe peut finir en un sprint est prêt à être choisi au Sprint Planning, et qu'il le devient en général après avoir été précisé ; l'équipe peut encore le préciser pendant le Sprint Planning."
      refs: ["S1"]
    - author: "Pratique établie, hors du Scrum Guide"
      text: "Distinguer DoD et critère d'acceptation. Mike Cohn voit la DoD comme des critères ajoutés à chaque story ; les critères d'acceptation, eux, sont propres à une story."
      refs: ["S3"]
  school:
    - author: "Le contenu de la DoD"
      text: "Il est propre au produit ou à l'organisation : le Scrum Guide ne le fixe pas. Exemple en data, chez Scott Ambler, pour une équipe d'entrepôt de données : détection et signalement des erreurs de données, documentation technique à jour, métadonnées captées et validées."
      refs: ["S1", "S9"]
    - author: "Écrire une DoR"
      text: "Pratique née chez des praticiens vers 2008-2009 ; son premier auteur est discuté, on ne l'attribue à personne. Le terme « ready-ready » (prêt pour de bon), face à « done-done », est celui de l'entreprise Systematic."
      refs: ["S4", "S5"]
    - author: "La DoR selon Mike Cohn"
      text: "Il en cite des conditions typiques : critères d'acceptation identifiés, taille qui tient dans un sprint, dépendances externes levées."
      refs: ["S6"]
    - author: "Mike Cohn : le risque d'une DoR trop stricte"
      text: "Elle devient une barrière à franchir avant chaque sprint, qui ramène au cycle en cascade. Il conseille des repères plutôt que des règles, avec une exception possible : certaines dépendances envers une autre équipe ou un fournisseur."
      refs: ["S6"]
  course:
    - text: "La formule « une seule DoD, pour toute story »."
      refs: ["S1", "S2"]
    - text: "Le test « vaut-il pour toute story du même type de travail, sans être recopié ? », qui sépare la DoD d'un critère d'acceptation."
      refs: ["S3"]
    - text: "Une règle métier, vérité du domaine, n'est ni une exigence de la DoD ni un critère (concept 8)."
      refs: []
    - text: "L'image du « mini cahier des charges » pour une DoR trop stricte. Cohn parle de stage-gate et de cascade, pas de cahier des charges."
      refs: ["S6"]
    - text: "La DoR se décide en équipe : le PO la propose, il ne la fixe pas seul."
      refs: ["S6"]
neighbors:
  - author: "« Prêt à être choisi » (Scrum Guide)"
    text: "Le critère du Guide est qu'un élément soit faisable en un sprint, pas une liste de conditions. La DoR en est une version écrite par l'équipe, qui peut aller plus loin."
    refs: ["S1"]
diagrams:
  - file: "sprint-piece-deux-portes.svg"
    title: "Le sprint comme une pièce à deux portes"
    caption: "Le sprint entre deux portes : à l'entrée la DoR (choix d'école), où une story aux critères à écrire (cas inventé) reste au backlog ; à la sortie une seule DoD, qui renvoie au backlog la carte qui ne la remplit pas."
    subconcept: "11a"
---

## Objectif

Distinguer la Definition of Done (DoD), la Definition of Ready (DoR) et un critère d'acceptation ; ranger une exigence au bon endroit ; décider si une story est prête à entrer dans un sprint, et dire quoi faire quand elle ne l'est pas.

## L'essentiel

La **DoD** (Definition of Done), nommée au concept 0 (0a3), est l'engagement de l'incrément : les exigences de qualité que tout élément remplit pour en faire partie. Il n'y a **qu'une DoD, pour toute story**. Le critère d'acceptation dit ce que fait une story donnée (concept 8) ; la DoD, comment toutes sont faites. La **DoR** (Definition of Ready) liste les conditions qu'une story remplit avant d'entrer dans un sprint : la DoD dit quand elle est terminée, la DoR quand elle peut commencer. La DoD est dans le Scrum Guide, la DoR non.

![Le sprint comme une pièce à deux portes](sprint-piece-deux-portes.svg)

## 11a La Definition of Done

*Une exigence de qualité commune à toute story, qu'il ne faut confondre ni avec un critère ni avec une règle métier.*

**Une seule DoD, pour toute story.** La DoD dit quand un élément entre dans l'incrément (concept 0a3) [consensus]. Un élément qui la remplit en fait partie. Sinon, il n'est ni livré ni présenté à la revue de sprint : il retourne au backlog (concept 0b). Les équipes d'un même produit partagent la même DoD : si l'organisation a un standard, l'équipe le suit au minimum, sinon elle écrit la sienne. Les Developers la respectent, et la rétrospective l'inspecte : c'est là qu'on peut la faire évoluer, pour toutes les stories à venir, et non d'un sprint à l'autre selon le contenu.

Le Scrum Guide ne fixe pas le contenu de la DoD : il est propre au produit ou à l'organisation [école]. En data, Scott Ambler cite, pour une équipe d'entrepôt de données, la détection des erreurs de données et une documentation à jour. Une DoD qu'on lèverait pour une story pressée ne serait plus commune : la story qui ne la remplit pas n'est pas terminée.

**DoD, critère ou règle métier.** Le Scrum Guide ne parle pas de critère d'acceptation. La distinction vient d'une pratique établie : pour Mike Cohn, la DoD est un jeu de critères ajouté à chaque story, alors que les critères sont propres à une story [consensus]. Une story terminée passe donc ses critères **et** toute la DoD.

Un test du cours [cours] aide à ranger une exigence : « vaut-il pour toute story du même type de travail, sans être recopié ? » Si oui, c'est la DoD : « le travail est relu par un second Developer avant d'entrer dans l'incrément » vaut pour toute story, on l'écrit une fois. Un cas précis, propre à une story, est un critère : « la liste des vélos signalés est triée du signalement le plus ancien au plus récent ». Ces deux exigences sont des exemples inventés pour l'illustration. Une exigence de la DoD peut ne viser qu'une sorte de travail (cas inventé : toute story qui change un calcul est relue par un second Developer) : elle reste la même pour toute story de cette sorte. Une règle métier qui vaut pour plusieurs stories n'est ni l'un ni l'autre : c'est une vérité du domaine, pas une exigence de qualité sur le travail (concept 8).

## 11b La Definition of Ready

*Une liste d'entrée dans le sprint, qui est un choix d'école : utile comme repère, dangereuse comme barrière.*

**Ce que dit le Guide, et ce que la DoR ajoute.** Le Scrum Guide ne parle pas de DoR. Il dit seulement qu'un élément que l'équipe peut finir en un sprint est **prêt à être choisi** au Sprint Planning, et qu'il le devient en général après avoir été précisé ; l'équipe peut encore le préciser pendant le Sprint Planning (concept 15). La DoR est une liste écrite par l'équipe pour cela [école] : une pratique née chez des praticiens vers 2008-2009, dont le premier auteur est discuté. Mike Cohn en cite des conditions typiques : critères d'acceptation identifiés, taille qui tient dans un sprint, dépendances externes levées.

La DoR suppose des sprints : sans sprint, voir annexe A2.

**Prête ou pas, et le risque de la barrière.** Au Sprint Planning, le PO propose et les Developers choisissent (concept 15b). Une story dont une condition d'entrée manque n'est pas prête : on ne la prend pas sur la simple confiance qu'elle le deviendra en cours de sprint. Le PO propose à la place une story prête, et il fait avancer ce qui bloque, par exemple une dépendance envers une autre équipe (concept 10b). Si cela bloque sprint après sprint, le PO le porte au niveau qui peut le lever (concept 14).

Mais une DoR trop stricte devient une barrière à franchir avant chaque sprint : pour Cohn, un retour au cycle en cascade, d'où son conseil de préférer des repères à des règles. Il admet une exception : certaines dépendances envers une autre équipe ou un fournisseur. Le cours [cours] parle d'un « mini cahier des charges » quand tout doit être spécifié avant le sprint, alors que la conversation continue pendant. La DoR se décide en équipe (Cohn parle de critères établis par l'équipe) : le PO la propose, il ne la fixe pas seul [cours].

## Pièges

- **Recopier la même exigence dans les critères de chaque story** (par exemple une relecture par un second Developer) : elle va dans la DoD.
- **Mettre dans la DoD ce qui est propre à une story** : c'est un critère d'acceptation (cas inventé : « la liste des vélos signalés est triée du signalement le plus ancien au plus récent »).
- **Prendre une règle métier pour une exigence de la DoD** parce qu'elle vaut pour plusieurs stories : la règle dit une vérité du domaine (concept 8), la DoD une exigence de qualité sur le travail.
- **Croire à une DoD par incrément, par sprint ou par équipe d'un même produit** : une seule DoD, pour toute story, qui change en rétrospective pour tous.
- **Lever la DoD pour une story pressée** : la DoD n'est plus commune ; la story n'est pas terminée et retourne au backlog (concept 0b).
- **Présenter la DoR comme du Scrum** : le Guide parle d'éléments prêts à être choisis, pas de DoR.
- **Prendre une story sur la confiance qu'une condition sera remplie en cours de sprint** : une dépendance externe non levée la laisse au backlog ; le PO fait avancer la dépendance.
- **Faire de la DoR un mini cahier des charges** : les stories attendent d'être entièrement spécifiées, et la conversation s'arrête avant le sprint.
- **Fixer en douce une règle non fixée pour rendre une story prête** (par exemple un seuil ou une durée maximale) : le PO la fait fixer (concept 8a2).

## Le test rapide

> « Vaut-il pour toute story (du même type de travail), sans être recopié ? » : DoD.
>
> « Propre à cette story ? » : critère d'acceptation.
>
> « Faut-il l'avoir avant de commencer ? » : DoR.

Formulation du cours, d'après le test de Cohn pour séparer la DoD des critères.
