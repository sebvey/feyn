---
description: "Comment découper un besoin d'un produit data en tranches verticales qui servent seules, et pourquoi une couche entière, elle, ne sert pas seule."
stances:
  consensus:
    - text: "Ne parle ni de tranche, ni de couche, ni de story. Dit que l'incrément doit être utilisable et que les éléments du backlog se découpent en éléments plus petits et plus précis, sans dire comment."
      author: "Le Scrum Guide 2020"
      refs: [S1]
    - text: "Découper par valeur plutôt que par couche technique. Les auteurs de stories concordent : Bill Wake (on trouve chez lui, en 2003, la métaphore du gâteau en couches, sous le V d'INVEST, concept 7), Richard Lawrence (2009) et le guide qu'il publie avec Peter Green."
      author: "Pratique établie, hors du Scrum Guide"
      refs: [S2, S3, S4]
  school:
    - text: "Cinq techniques de découpage : Spike, Paths, Interfaces, Data, Rules. Cohn dit les avoir tirées des stories qu'il avait découpées. Le spike y est une technique essentielle, mais normalement pas la première à essayer."
      author: "Mike Cohn : SPIDR"
      refs: [S5]
    - text: "Publiés en 2009, publiés aujourd'hui avec Peter Green. Lawrence écrit ne pas les avoir inventés, mais observés et compilés. Pour lui, le spike est le dernier recours. Parmi les neuf : Variations in Data (traiter d'abord une sorte de données) et Simple/Complex (chercher la version la plus simple, puis sortir chaque variante dans sa story)."
      author: "Richard Lawrence : neuf patrons (2009)"
      refs: [S3, S4]
    - text: "Choisir le découpage qui permet de reporter, voire d'abandonner, une story de faible valeur. Ordonner reste l'affaire du backlog (concept 13)."
      author: "Lawrence et Green : choisir son découpage"
      refs: [S4]
    - text: "Un troisième catalogue, plus long : une vingtaine de dimensions de découpage. Pour Wake, découper sert à séparer les parties de forte valeur de celles de faible valeur."
      author: "Bill Wake : « Twenty Ways to Split Stories » (2005)"
      refs: [S6]
    - text: "Ils se recoupent en partie, sans se confondre. Le D de SPIDR et Variations in Data (Lawrence) disent la même chose. Le R de SPIDR (assouplir d'abord la règle) et Business Rule Variations (une story par variante de règle) diffèrent. Simple/Complex n'existe pas dans SPIDR. On attribue chaque patron à son catalogue, on ne les fond pas en un seul."
      author: "Entre les catalogues"
      refs: [S3, S4, S5]
  course:
    - text: "Les quatre couches d'un produit data (ingestion, transformation, données prêtes, restitution) sont un exemple, pas un découpage normé. Wake donne d'autres couches : réseau, persistance, logique, présentation."
      refs: [S2]
    - text: "« Sert seule à l'utilisateur » est l'exigence de chaque tranche. C'est proche de Wake et de Lawrence, qui demandent que chaque tranche ait de la valeur pour l'utilisateur."
      refs: [S2, S3, S4]
    - text: "Le test : « si on s'arrête après cette tranche, l'utilisateur s'en sert-il demain matin ? ». Aucune source ne le formule ainsi."
      refs: [S2, S4]
    - text: "Au niveau du sprint, une tranche est une story."
      refs: []
    - text: "Chaque story est une tranche verticale. Ce n'est pas un texte du Guide. Deux exceptions entrent aussi au backlog sans en être une : un travail technique qui porte sa propre raison (concept 3b) et une exploration bornée (concept 17b1)."
      refs: [S1]
neighbors:
  - text: "Une toute petite implémentation de bout en bout, qui relie les principaux composants de l'architecture. Elle sert l'équipe ; elle peut ne rien apporter seule à l'utilisateur. Ce n'est pas une tranche verticale au sens du cours."
    author: "Le walking skeleton (Alistair Cockburn, années 1990)"
    refs: [S8]
diagrams:
  - file: gateau.svg
    title: "Le gâteau en couches : une tranche horizontale contre trois tranches verticales"
    caption: "Le gâteau en couches. En bas, l'ingestion des données ; en haut, la restitution, ce que voit l'utilisateur. Une couche prise en entier (grisée) ne sert pas seule ; chaque part verticale traverse toutes les couches et sert seule."
    subconcept: 9a
  - file: part-recoupee.svg
    title: "Une part trop grosse recoupée en parts verticales plus fines"
    caption: "Une part trop grosse, recoupée. Les morceaux a et c sont des parts verticales ; b est une lamelle horizontale : la couche des données prêtes, seule (morceaux inventés pour l'illustration). Sous chaque morceau, le patron de découpage et son catalogue."
    subconcept: 9b1
---

## Objectif

Découper un besoin data en tranches verticales, qui traversent les couches du produit et
servent seules à l'utilisateur ; reconnaître une tranche horizontale (une couche seule) ;
découper une story trop grosse avec un patron, attribué à son catalogue.

## L'essentiel

Un produit data s'empile en couches : l'ingestion, la transformation, les données prêtes, la restitution. Une tranche **horizontale** est une couche entière : tant que les autres manquent, elle ne sert pas seule à l'utilisateur. Une tranche **verticale** traverse toutes les couches, de haut en bas, en tranche fine, comme une part de gâteau, et elle **sert seule** : si on s'arrête après elle, l'utilisateur s'en sert. Le vertical s'arrête à la story (le besoin d'un utilisateur, à la taille d'un sprint) : ses tâches, elles, sont horizontales.

![Le gâteau en couches : une tranche horizontale contre trois tranches verticales](gateau.svg)

## 9a La tranche verticale

*Une tranche se juge à ce qu'elle apporte à l'utilisateur, pas aux couches qu'elle traverse.*

### 9a1 La tranche qui sert seule

Les couches s'empilent, donc on les dessine à l'horizontale : l'ingestion en bas, la restitution en haut. De là viennent les mots. Une tranche horizontale est une couche entière. Une tranche verticale coupe toutes les couches de haut en bas, comme une part de gâteau : un peu de chaque couche, et l'utilisateur s'en sert. On trouve cette métaphore du gâteau en couches chez Bill Wake (2003), dans INVEST, au critère V.

Traverser les couches ne suffit pas : la tranche doit **servir seule**. Cette exigence est un choix du cours [cours], proche de ce que demandent Wake et Lawrence : que chaque tranche ait de la valeur pour l'utilisateur. Une tranche qui relie les couches sans rien apporter à l'utilisateur sert l'équipe, pas lui.

Découper par couches (collecter, transformer, restituer) ne donne rien à l'utilisateur avant la fin.

### 9a2 Où s'arrête le vertical

« Tranche » est une façon de découper, pas un niveau. Le principe vaut à plusieurs niveaux : un epic se découpe en stories verticales (les niveaux du backlog sont au concept 4). Au niveau du sprint, une tranche est une story [cours].

Mais le vertical s'arrête là. Quand les Developers découpent la story en tâches, au Sprint Planning (concept 15), celles-ci sont souvent une par couche : des tâches horizontales, et c'est normal. Elles sont le plan des Developers, pas ce qu'on livre : l'utilisateur ne reçoit jamais une tâche seule, et le PO juge la story sur ses critères d'acceptation, pas sur ses tâches.

## 9b Les patrons de découpage

*Quand un besoin est trop gros pour un sprint, des catalogues de patrons aident à trouver où couper.*

### 9b1 Couche ou tranche

Un besoin que les Developers estiment trop gros pour un sprint est un epic (concept 4), et il se découpe ici. Chaque morceau passe le même test qu'en 9a : sert-il seul à l'utilisateur ?

> **Fil rouge :** Étienne veut une vue des vélos en panne, qui n'existe pas encore. Les Developers la jugent trop grosse pour un sprint. Trois morceaux sont envisagés : a, b et c dans le schéma (morceaux inventés pour l'illustration).

![Une part trop grosse recoupée en parts verticales plus fines](part-recoupee.svg)

Les stations du centre-ville seulement (a) et les vélos signalés, confirmés ou non par un technicien (c), traversent les couches et livrent à Étienne une vue qu'il peut consulter. Une table des signalements prête, sans vue (b), est une couche : rien pour Étienne tant qu'elle n'est pas raccrochée à un usage. Que la liste non confirmée suffise à Étienne n'est pas tranché : c'est une hypothèse, à vérifier avant de s'engager, par une exploration bornée (un travail court, limité dans le temps, qui répond à une question sans livrer de fonction ; concept 17).

### 9b2 Les patrons et leur catalogue

Des catalogues de patrons aident à trouver où couper. Ce sont des choix d'école [école], chacun à son auteur, posés côte à côte :

- **SPIDR**, de Mike Cohn : cinq techniques. Spike (une exploration bornée : un travail limité dans le temps qui répond à une question, sans livrer de fonction ; concept 17), Paths (un chemin de l'utilisateur à la fois), Interfaces (une interface à la fois, ou une interface minimale d'abord), Data (une partie des données d'abord), Rules (assouplir d'abord une règle).
- **Richard Lawrence**, neuf patrons (2009), dont Variations in Data (une variante des données d'abord) et Simple/Complex (« quelle est la version la plus simple ? », puis les variantes en stories à part).

Les deux catalogues se recoupent en partie, sans se confondre : on attribue chaque patron à son catalogue. Sur l'exemple, le morceau a restreint les données : c'est le D de SPIDR, ou Variations in Data chez Lawrence, même idée sous deux noms. Le morceau c assouplit d'abord une règle (ne pas distinguer encore les pannes confirmées) : c'est le R de SPIDR. Lawrence a un patron voisin, Business Rule Variations (une story par variante de règle), qui diffère : on ne les confond pas. Ce rattachement est l'application du cours [cours], pas un fait de source. Le nom compte moins que la question qu'il fait poser.

## Pièges

- **Découper par couche** (collecter, transformer, restituer) : rien pour l'utilisateur avant la fin. C'est le réflexe probable d'un profil technique.
- **Croire que traverser les couches suffit** : la tranche doit servir seule. Un walking skeleton (Cockburn) sert l'équipe, pas l'utilisateur.
- **Appliquer le vertical aux tâches** : il s'arrête à la story. Les tâches sont horizontales et appartiennent aux Developers (concept 4).
- **Nommer la forme dans la tranche** (un écran, un export) : la story dit ce que l'utilisateur obtient, la forme reste aux Developers (concepts 5 et 7b). Une story qui ne nomme pas l'écran livre quand même quelque chose de visible.
- **Fixer une règle en découpant** (« presque vide », « heures de pointe ») : une règle non fixée, le PO la fait fixer (concept 8a2).
- **Trancher une hypothèse dans le découpage** (« la liste non confirmée suffira ») : on la vérifie avant (concept 17).
- **Légender une part « story »** : une tranche est une façon de découper ; elle n'est une story qu'au niveau du sprint.
- **Préparer une couche « pour plus tard »** (une source de plus, une table sans usage) : c'est une couche. Il faut la raccrocher à un usage.
- **Mélanger les catalogues** : attribuer un patron de Lawrence à SPIDR, ou l'inverse.

## Le test rapide

> « Si on s'arrête après cette tranche, l'utilisateur s'en sert-il demain matin ? »

Formulation du cours, cohérente avec la valeur pour l'utilisateur que demandent Wake et Lawrence.
