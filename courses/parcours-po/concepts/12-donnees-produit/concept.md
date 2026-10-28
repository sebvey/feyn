---
description: "Comment définir un indicateur sans ambiguïté, traduire « données de qualité » en règles mesurables, et demander un accès aux données avec une finalité, sans excès."
stances:
  consensus:
    - author: "Pratiques de la donnée : DAMA UK, reprise par le cadre de qualité des données du gouvernement britannique ; recensement de DAMA NL"
      text: "La qualité des données s'exprime en règles mesurables sur des dimensions, et le niveau de qualité exigé dépend de l'usage. Le Scrum Guide et les référentiels du PO ne disent ni comment définir un indicateur ni comment exprimer la qualité des données."
      refs: ["S3", "S4", "S5", "S11"]
    - author: "Le RGPD (texte de loi)"
      text: "Une donnée personnelle est une information sur une personne identifiée ou identifiable, y compris par un identifiant ; une donnée pseudonymisée qu'on peut rattacher à une personne reste personnelle. Les données sont collectées pour des finalités déterminées (limitation des finalités) et limitées à ce qui est nécessaire à ces finalités (minimisation)."
      refs: ["S6", "S7", "S13"]
  school:
    - author: "La liste des dimensions de qualité"
      text: "Six chez DAMA UK : exactitude, complétude, unicité, cohérence, fraîcheur, validité. D'autres listes existent ailleurs, parfois bien plus longues."
      refs: ["S3", "S4", "S5"]
    - author: "Le grain (Kimball Group)"
      text: "Terme de la modélisation dimensionnelle : ce que représente une ligne d'une table de faits. Le cours l'étend à un indicateur : ce que représente une valeur de l'indicateur (par station, par quartier)."
      refs: ["S2"]
  course:
    - text: "Le contenu d'une définition d'indicateur : ce qu'il compte et sa règle de calcul, son grain, sa période, sa source, sa fraîcheur. Aucun texte de référence ne fixe cette liste ; elle recoupe la pratique des outils d'indicateurs."
      refs: ["S2", "S8", "S9"]
    - text: "Les trois lieux d'une exigence de qualité : la DoD, un critère d'acceptation, la définition de l'indicateur."
      refs: []
    - text: "La définition vaut pour l'indicateur partout où il est publié."
      refs: []
    - text: "Le PO fait écrire, fixer ou demander ; le calcul et les tests sont le comment des Developers."
      refs: []
    - text: "« Fraîcheur » traduit *timeliness* : sens voisin mais pas identique. DAMA UK parle de données disponibles quand on en a besoin ; le cours vise l'âge maximal des données."
      refs: ["S3"]
neighbors:
  - author: "Indicateur et mesure de résultat"
    text: "L'indicateur est une valeur calculée par le produit pour ses utilisateurs (un livrable). La mesure de résultat juge si le produit atteint son objectif (concept 2). Les deux ont besoin d'une définition complète."
    refs: []
diagrams:
  - file: fiche-cinq-cases.svg
    title: "Définir un indicateur : la fiche à cinq cases (exemple inventé pour l'illustration)"
    caption: "12a : sur la fiche d'un indicateur à cinq cases, la case qu'on ne peut pas remplir reste à faire fixer."
    subconcept: 12a
  - file: recu-mal-jamais-recu.svg
    title: "Distinguer ce qui se corrige de ce qui manque"
    caption: "12b : ce que la source n'envoie jamais est une limite de la source, et non un défaut que la plateforme corrige."
    subconcept: 12b
  - file: colonnes-finalite.svg
    title: "Demander seulement ce qui sert"
    caption: "12c : on ne demande que les colonnes qui servent la finalité."
    subconcept: 12c
---

## Objectif

Faire écrire la définition d'un indicateur qui ne laisse pas deux lectures ; exprimer une exigence de qualité des données en règle mesurable et la ranger au bon endroit ; savoir quelles données demander, pour quelle finalité, quand l'accès touche des données personnelles.

## L'essentiel

Un PO data ne calcule pas l'indicateur ni n'écrit les tests : les Developers s'en chargent. Il fait **écrire et fixer** ce que l'indicateur compte (sa définition) et ce que « données de qualité » veut dire pour l'usage (des règles mesurables), et il sait **ce qu'il demande** à celui qui donne l'accès : quelles colonnes, pour quoi faire. Sans définition, deux chiffres justes se contredisent ; sans règle de qualité, « fiable » ne se teste pas ; sans finalité, l'accès ne s'obtient pas, ou s'obtient trop large.

![Définir un indicateur : la fiche à cinq cases (exemple inventé pour l'illustration)](fiche-cinq-cases.svg)

![Distinguer ce qui se corrige de ce qui manque](recu-mal-jamais-recu.svg)

![Demander seulement ce qui sert](colonnes-finalite.svg)

## 12a Définir un indicateur

*Une définition écrite pour que deux personnes qui la lisent calculent le même nombre.*

### 12a1 Les cinq cases

Un indicateur est une valeur calculée par le produit pour ses utilisateurs, comme un nombre de locations par quartier. Il se lit d'une seule façon quand sa définition dit cinq choses :

- **la règle de calcul** : ce qu'il compte, ce qu'on inclut, ce qu'on exclut ;
- **le grain** : ce que représente une valeur (par station, par quartier) ;
- **la période** : l'instant ou la durée sur laquelle on compte ;
- **la source** : le système qui produit les données, avec son propriétaire ;
- **la fraîcheur** : l'âge maximal des données quand on lit le chiffre.

Cette liste est un choix du cours [cours], qui recoupe la pratique des outils d'indicateurs ; le grain vient de la modélisation dimensionnelle de Kimball [école]. Période et fraîcheur ne se confondent pas : la première dit à quel moment le nombre est vrai, la seconde de combien ce moment peut dater quand on le lit.

La définition dit **ce qu'on compte, sur quoi, quand**, jamais comment : une requête ou une jointure est le comment des Developers. La DoD de l'équipe vélos exige que chaque indicateur publié ait sa définition écrite (concept 11a) : le PO la fait écrire et fixer, les Developers font le calcul. La DoD exige la définition, elle n'en fixe pas les règles. La mesure de résultat de l'objectif produit (concept 2c) est un indicateur comme les autres et demande la même définition.

### 12a2 Ce qui manque, et qui le fixe

Une case qu'on ne peut pas remplir signale une règle non fixée, ou une source qui manque. Pour un indicateur de nouveaux abonnés (exemple inventé pour l'illustration), un renouvellement compte-t-il ? Deux analystes répondront chacun à leur façon, et leurs deux chiffres seront justes. Ce désaccord montre la règle qui manque.

Le PO ne la tranche pas : il la fait fixer par celui qui utilise l'indicateur, ou qui montre le chiffre (concept 8a2). Il ne comble pas une case vide par une règle inventée. Et la définition s'écrit **une fois, pour l'indicateur**, non dans les critères d'une story : un critère est propre à une story [cours], alors que deux stories qui publient le même indicateur, chacune dans sa vue, doivent prendre la même définition.

## 12b La qualité des données

*Traduire « de qualité » en règles qu'on peut mesurer, et les ranger au bon endroit.*

**Des règles mesurables, par dimension.** La qualité des données s'exprime en règles mesurables sur des **dimensions** [consensus], et le niveau exigé dépend de l'usage. La liste des dimensions est un choix d'école [école] : six chez DAMA UK, reprises par le gouvernement britannique (exactitude, complétude, unicité, cohérence, fraîcheur, validité), d'autres listes ailleurs, parfois bien plus longues. Un relevé en double relève de l'unicité : on le mesure par un taux de relevés en double.

« Fiable » ou « propre » sont des mots flous (concept 7a2). Pour les rendre testables, on demande à l'utilisateur ce qui le ferait douter d'un chiffre, puis on écrit une règle par dimension. Le niveau (un taux, une date) est à faire dire par celui qui utilise le chiffre : le PO ne le fixe pas.

**Où l'écrire, et la limite de la source.** Le cours [cours] range une exigence de qualité selon sa portée : dans la **DoD** si elle vaut pour toute story (le test des relevés en double, concept 11a), dans un **critère** si elle est propre à une story (concept 8a1), dans la **définition de l'indicateur** si elle le concerne (par exemple sa fraîcheur).

Reste à distinguer ce que la plateforme reçoit mal de ce qu'elle ne reçoit jamais. Un relevé en double dans ce qu'elle reçoit se corrige. Une donnée que la source n'envoie pas est une **limite de la source** : aucun traitement ne la fera apparaître. La limite s'écrit dans la définition de l'indicateur et se montre à ceux qui lisent le chiffre, là où ils le lisent. Si leur usage exige plus, la question va au propriétaire de la source : c'est une dépendance envers une autre équipe (concept 10b2).

## 12c Accès et données personnelles

*Demander les colonnes qui servent une finalité dite, et reconnaître une donnée personnelle.*

**Une colonne, une raison.** Pour obtenir un accès, le PO dit ce qu'il demande et pourquoi. Le RGPD, texte de loi et non choix d'école [consensus], pose deux principes : des **finalités** déterminées, et la **minimisation**, c'est-à-dire seulement les données nécessaires à ces finalités. Le PO part donc de la finalité, puis demande, pour chaque colonne, à quoi elle sert, et s'il lui faut le détail ou des données agrégées. Les lignes se bornent aussi : une période utile, pas tout l'historique (application du cours [cours]). Une colonne sans raison ne se demande pas.

> **Fil rouge :** La source Abonnés, tenue par l'équipe appli, contient le nom et les coordonnées de l'abonné, son abonnement et sa station favorite. Pour compter les abonnés par station favorite (exemple inventé pour l'illustration), la colonne qui sert est la station favorite ; le nom et les coordonnées ne servent pas à compter.

Celui qui donne l'accès et demande de justifier chaque colonne applique la minimisation, selon la lecture du cours [cours] : ce n'est pas un frein, et une demande justifiée colonne par colonne avance plus vite.

**Ce qui est une donnée personnelle.** Une donnée personnelle est toute information sur une personne identifiée ou identifiable, y compris par un identifiant. Un identifiant n'est pas moins personnel qu'un nom : une donnée pseudonymisée reste personnelle pour qui peut la rattacher à une personne, par exemple parce qu'il détient le fichier qui relie les identifiants aux abonnés.

Une finalité se dit **avant** d'utiliser les données, pas après : un besoin hypothétique n'est pas une finalité. Une nouvelle finalité fait une nouvelle demande [cours]. Le PO ne fait pas le droit : il sait quoi demander et pourquoi, et le délégué à la protection des données, s'il y en a un, conseille sur la règle.

## Pièges

- **Écrire le calcul au lieu de la définition** : une requête dit comment, pas ce qu'on compte ; le PO fait écrire ce que l'indicateur compte, sur quoi, quand.
- **Combler une case vide par une règle inventée** : le PO fait fixer la règle par celui qui utilise l'indicateur (concept 8a2).
- **Mettre la définition dans les critères d'une story** : elle vaut partout où l'indicateur est publié ; deux stories qui le publient, chacune dans sa vue, doivent prendre la même.
- **Poser une exigence de qualité vague** (« fiable », « propre ») : la traduire en règles mesurables, par dimension, au niveau que dit l'utilisateur ; pour y arriver, lui demander ce qui le ferait douter d'un chiffre.
- **Prendre une limite de la source pour un défaut à corriger** : la plateforme ne crée pas ce que la source n'envoie pas ; elle écrit la limite et la montre. Si l'usage exige davantage, la question va au propriétaire de la source (dépendance envers une autre équipe, concept 10b2).
- **Tout ranger dans la DoD** : ce qui ne vaut que pour un indicateur va dans sa définition, ce qui ne vaut que pour une story dans ses critères.
- **Demander toute la table « au cas où »** : sans finalité, pas de colonne. Une finalité se dit avant d'utiliser les données, pas après ; une nouvelle finalité fait une nouvelle demande. Elle borne aussi les lignes : une période utile, pas tout l'historique.
- **Croire qu'un identifiant n'est pas une donnée personnelle** : une donnée pseudonymisée reste personnelle pour qui peut la rattacher à une personne, par exemple parce qu'il détient le fichier qui relie les identifiants aux personnes.
- **Faire le juriste** : le PO sait quoi demander et pourquoi ; la règle de droit relève du délégué à la protection des données, s'il y en a un.

## Le test rapide

> Définition : « deux analystes qui la lisent calculent-ils le même nombre ? »
> Qualité : « cette exigence vaut-elle pour toute story, pour une story, ou pour cet indicateur ? »
> Accès : « à quoi sert chaque colonne demandée, pour quelle finalité ? »

Formulation du cours.
