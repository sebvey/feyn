---
description: "Les trois temps de la vie d'une story dans Scrum : le refinement, le Sprint Planning avec son objectif de sprint, puis la revue de sprint."
stances:
  consensus:
    - author: "Le Scrum Guide 2020 : le refinement"
      text: "Découper les éléments du backlog et les préciser (description, ordre, taille). C'est une activité continue, pas un événement : le Guide ne lui fixe ni moment ni durée. Il se fait en général avant le Sprint Planning, et l'équipe peut encore préciser un élément pendant. Les Developers qui feront le travail répondent de la taille."
      refs: ["S1", "S2"]
    - author: "Le Scrum Guide 2020 : le Sprint Planning"
      text: "Trois sujets. **Pourquoi** : le PO propose comment le produit peut gagner en valeur, toute l'équipe Scrum fixe l'objectif de sprint avant la fin du Sprint Planning. **Quoi** : les Developers choisissent les éléments en discutant avec le PO. **Comment** : les Developers planifient le travail, à leur seule discrétion. Le « pourquoi » est l'ajout de 2020."
      refs: ["S1", "S3"]
    - author: "Le Scrum Guide 2020 : l'objectif de sprint"
      text: "L'objectif unique du sprint et l'engagement du backlog de sprint (concept 0a3). Il donne cohérence et focus. Les Developers s'y engagent, mais il laisse de la souplesse sur le travail exact : si le travail diffère de ce qu'ils attendaient, ils renégocient la portée avec le PO sans toucher à l'objectif. Si l'objectif devient obsolète, seul le PO peut annuler le sprint."
      refs: ["S1"]
    - author: "Le Scrum Guide 2020 : la revue de sprint"
      text: "On inspecte ce que le sprint a produit et ce qui a changé ; les participants décident ensemble de la suite et le backlog peut être ajusté. C'est une séance de travail, pas une simple présentation, ni une porte de mise en production. Une story qui ne remplit pas la DoD n'y est pas présentée (concept 0b)."
      refs: ["S1"]
    - author: "Pratique établie, hors du Scrum Guide (Scrum.org)"
      text: "La revue n'est ni une démonstration à sens unique, ni une séance où le PO « accepte » le travail des Developers."
      refs: ["S6"]
  school:
    - author: "Christiaan Verwijs et Barry Overeem : le refinement en conversations"
      text: "Ce n'est pas forcément une réunion de toute l'équipe : c'est une suite de conversations, parfois avec les parties prenantes."
      refs: ["S4"]
    - author: "Mike Cohn : l'objectif de sprint"
      text: "« Finir les sept stories » n'est pas un bon objectif de sprint (cohérent avec le Scrum Guide) : il doit être d'un niveau plus haut. Cohn tient pourtant l'objectif de sprint pour facultatif, contre le Scrum Guide, qui en fait un engagement."
      refs: ["S5"]
  course:
    - text: "Un mot flou se fait préciser par l'utilisateur concerné de chaque story. Le sens peut différer d'une story à l'autre, sous un nom distinct ; un chiffre partagé garde une seule définition (concept 7a2)."
      refs: ["S4"]
    - text: "Une story « définir X » dont une autre dépend n'apporte rien seule : X se précise au refinement, et on livre d'abord ce dont les règles sont connues. Aucune source externe ne traite ce cas."
      refs: []
    - text: "Le mot « recette » nomme, dans le cours, l'erreur qui fait de la revue une validation avant livraison."
      refs: ["S6", "S1"]
neighbors:
  - author: "Les états d'un élément dans l'outil"
    text: "« À faire », « en cours », « fait » : un workflow choisi et configurable par l'équipe, propre à l'outil. Le Scrum Guide n'en fixe aucun, et « fait » ne dit rien s'il ne veut pas dire que la Definition of Done est remplie (annexe A1)."
    refs: ["S7", "S8", "S1"]
diagrams:
  - file: sprint-planning-trois-questions.svg
    title: "Les trois questions du Sprint Planning"
    caption: "Le Sprint Planning pose trois questions dans l'ordre, pourquoi, quoi, comment, et la première donne l'objectif de sprint."
    subconcept: 15b
---

## Objectif

Préparer une story au refinement en faisant préciser ses mots flous par l'utilisateur concerné ; la faire choisir au Sprint Planning avec un objectif de sprint qui dit pourquoi le sprint a de la valeur ; la faire inspecter en revue de sprint et adapter le backlog à ce qu'on y apprend.

## L'essentiel

Une story vit en trois temps. Le **refinement**, activité continue, la précise et la découpe : un mot flou s'y fait préciser par l'utilisateur concerné, pas par une story « définir X ». Au **Sprint Planning** (pourquoi, quoi, comment), l'objectif de sprint dit pourquoi le sprint a de la valeur, et non quelles stories finir. La **revue de sprint**, séance de travail, inspecte l'incrément et adapte le backlog. Les états d'un outil ne racontent pas cette vie (annexe A1).

## 15a Le refinement

*Préparer une story avant qu'elle soit choisie, sans réunion imposée.*

### 15a1 Le mot flou se précise avec l'utilisateur concerné

Le refinement découpe les éléments du haut du backlog et les précise (description, ordre, taille) [consensus]. Le Scrum Guide en fait une **activité continue**, pas un événement : ni moment ni durée imposés. Il se fait en général avant le Sprint Planning, et l'équipe peut encore préciser un élément pendant. Les Developers répondent de la taille. Le repère des « 10 % de la capacité » figurait dans le Guide de 2017 et a été retiré en 2020.

Ce n'est pas forcément une réunion de toute l'équipe : Christiaan Verwijs et Barry Overeem y voient une suite de conversations, parfois avec les parties prenantes [école].

Un **mot flou** (un mot dont le sens n'est pas fixé, concept 7a2) se fait préciser par l'utilisateur concerné de chaque story, au refinement, avant que la story soit choisie [cours]. Ni le PO ni les Developers ne le fixent seuls ; tant que le sens manque, la story attend. Le sens s'écrit dans la règle ou les critères d'acceptation de la story (concept 8). Le sens peut différer d'une story à l'autre, chacune dit le sien sous un nom qui ne prête pas à confusion. Mais un chiffre partagé par plusieurs utilisateurs, ou qui mesure l'objectif produit, garde une seule définition (concept 12a).

> **Fil rouge :** Rappel de concept 7a2 : les mots que le fil rouge laisse non fixés, comme « heures de pointe », se précisent de même, avec ceux qui s'en servent, pas à leur place.

### 15a2 Pas de story « définir X »

Un mot ou une règle à préciser n'est pas une story : quand c'est fait, rien n'a changé pour l'utilisateur. Une story « définir X » dont une autre dépend n'apporte donc rien seule (c'est la valeur et l'indépendance d'INVEST, concept 7). Le cours en tire que X se précise au refinement, avec l'utilisateur concerné, comme une règle non fixée que le PO fait fixer (concept 8a2), et qu'on livre d'abord ce dont les règles sont connues [cours]. La Definition of Ready de l'équipe veut d'ailleurs des règles métier fixées avant le sprint (concept 11b). Si l'utilisateur a besoin de données pour trancher, une exploration bornée peut l'éclairer (concept 17) : elle livre une réponse, pas la règle, que l'utilisateur fixe.

## 15b Sprint Planning et objectif de sprint

*Choisir le travail d'un sprint pour un pourquoi.*

Le Sprint Planning traite trois sujets [consensus] :

- **pourquoi** : le PO propose comment le produit peut gagner en valeur, et toute l'équipe Scrum fixe l'**objectif de sprint**, avant la fin du Sprint Planning. C'est l'ajout de 2020 ;
- **quoi** : les Developers choisissent les éléments en discutant avec le PO, d'après leurs résultats passés, leur capacité et la DoD. Un élément qui ne remplit pas la DoR de l'équipe (un choix d'école) ne se choisit pas (concept 11b) ;
- **comment** : les Developers planifient le travail, à leur seule discrétion (leurs tâches, concept 9).

![Les trois questions du Sprint Planning](sprint-planning-trois-questions.svg)

L'objectif de sprint est l'objectif unique du sprint et l'engagement du backlog de sprint (concept 0a3). Il dit **pourquoi** le sprint a de la valeur, par exemple « que les vues d'Étienne n'affichent plus de nombre de vélos faussé par des relevés en double » (exemple inventé pour l'illustration, que l'équipe vélos peut atteindre seule). Une liste de stories à finir n'en est pas un : elle dit quoi, pas pourquoi, et ne donne aucune cohérence, chacun finissant « sa » story. Mike Cohn dit de même que « finir les sept stories » n'est pas un bon objectif.

Un bon objectif laisse de la souplesse sur le travail exact. Si une story ne passe pas, les Developers et le PO renégocient la portée du backlog de sprint, sans toucher à l'objectif ; la story sortie revient au backlog produit, où le PO l'ordonne. On n'annule le sprint que si l'objectif devient obsolète, et seul le PO le peut. Mike Cohn tient pourtant l'objectif de sprint pour facultatif [école] : le Scrum Guide, lui, en fait un engagement.

Le PO propose, l'équipe fixe l'objectif, les Developers choisissent avec le PO : le PO ne choisit pas les stories ni leur nombre à leur place, et il ne fait pas leur plan. Le Sprint Planning suppose des sprints : pour une équipe qui travaille sans sprint, voir annexe A2.

## 15c La revue de sprint

*Inspecter l'incrément avec les parties prenantes, puis adapter le backlog.*

La revue inspecte ce que le sprint a produit et ce qui a changé [consensus] ; l'équipe et les parties prenantes décident ensemble de la suite, et le backlog peut être ajusté. C'est une séance de travail, pas une simple présentation ni une porte de mise en production : un incrément peut être livré avant la revue. La revue n'est ni une démonstration à sens unique, ni une séance où le PO « accepte » le travail (Scrum.org, pratique établie).

Le cours en tire que ce n'est pas non plus une **recette** où une partie prenante valide [cours] : ce n'est pas la signature d'une partie prenante qui rend une story faite, c'est la DoD, avant la revue. Une story qui ne la remplit pas n'est pas présentée : elle retourne au backlog, où le PO l'ordonne (concept 0b).

Ce que la revue fait apparaître, une demande nouvelle par exemple, entre au backlog comme un nouvel élément ; le PO l'ordonne face au reste (concept 13) et les Developers choisiront au Sprint Planning suivant. On ne la promet pas en séance, et on ne la refuse pas non plus. Si un mot flou ressort de la revue, on le reprécise au refinement avec l'utilisateur concerné.

Enfin, les **états de l'outil** (à faire, en cours, fait) ne racontent pas cette vie : ils sont un choix de l'équipe, configurable, que le Scrum Guide ne fixe pas. « Fait » ne dit rien tant qu'il ne veut pas dire que la DoD est remplie (annexe A1). La revue suppose elle aussi des sprints : sans sprint, voir annexe A2.

## Pièges

- **Un refinement en réunion d'équipe, sans l'utilisateur concerné** : personne dans la pièce ne sait ce que le mot veut dire pour lui.
- **Le PO qui tranche le mot flou lui-même**, ou qui impose d'office un sens à toutes les stories sans demander à chaque utilisateur : chaque utilisateur précise le sens pour sa story, et un chiffre partagé (plusieurs utilisateurs, mesure de l'objectif produit) garde une seule définition sous son nom (concept 7a2).
- **Une story « définir X »** dont une autre dépend : elle n'apporte rien seule ; X se précise au refinement, et on livre d'abord ce dont les règles sont connues.
- **Prendre le refinement pour un événement** à heure fixe, ou citer les 10 % de capacité : activité continue, repère retiré en 2020. Le repère des 10 % figurait encore dans le Scrum Guide 2017.
- **Un objectif de sprint en liste de stories** (« finir X, Y, Z ») : il dit quoi, pas pourquoi. **Le PO qui le fixe seul** ou qui choisit les stories : il propose, l'équipe fixe, les Developers choisissent.
- **Changer l'objectif quand une story ne passe pas** : la portée se renégocie, l'objectif reste.
- **La revue en recette, en validation ou en démonstration à sens unique** : séance de travail, qui adapte le backlog. **Promettre en séance** une demande née de la revue, ou **présenter** une story qui ne remplit pas la DoD : l'une entre au backlog et s'ordonne, l'autre y retourne.
- **Prendre les états de l'outil pour la vie d'une story** : « Fait » ne dit rien s'il ne veut pas dire DoD remplie (annexe A1).

## Le test rapide

> Refinement : « qui précise ce mot, pour quelle story ? » Sprint Planning : « pourquoi ce sprint a-t-il de la valeur ? » (si la réponse est une liste, ce n'est pas un objectif). Revue : « qu'est-ce qui change dans le backlog après la séance ? »

Formulation du cours : un test par temps de la vie d'une story.
