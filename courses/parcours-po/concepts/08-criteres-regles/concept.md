---
description: "Ce qu'est un critère d'acceptation, en quoi il diffère d'une règle métier, comment l'écrire en Given/When/Then avec une variable à la fois, et que faire d'une règle non fixée."
stances:
  consensus:
    - text: "Ne parle ni de critère d'acceptation, ni de règle métier, ni de story. Rien de ce concept n'est donc du consensus Scrum."
      author: "Le Scrum Guide 2020"
      refs: ["S1"]
    - text: "Chaque story porte des critères d'acceptation. C'est la confirmation des 3C de Ron Jeffries (XP, concept 5) et le T d'INVEST de Bill Wake (concept 7). Mike Cohn parle de conditions de satisfaction, presque synonymes, et en confie l'écriture d'abord au PO ; le cours y ajoute la conversation avec l'utilisateur et l'équipe."
      author: "Pratique établie, hors du Scrum Guide"
      refs: ["S2", "S3", "S4"]
  school:
    - text: "Forme créée par North et Matts, dans les années 2000, pour écrire les critères d'une story en scénarios ; elle vient du BDD (behaviour-driven development) de Dan North, décrite dans un article de 2006. Cucumber et son langage Gherkin rendent ces scénarios exécutables ; la forme s'emploie aussi sans outil, comme simple heuristique."
      author: "Dan North et Chris Matts : Given/When/Then"
      refs: ["S5", "S6", "S10"]
    - text: "Décrire les exigences par des exemples, popularisé par le livre d'Adzic (2011). L'expression est plus ancienne : Martin Fowler la mentionne dès 2004."
      author: "Gojko Adzic : Specification by Example"
      refs: ["S8", "S9"]
    - text: "Poser les règles à part et les illustrer par des exemples : règles sur des cartes bleues, exemples sur des cartes vertes, questions sans réponse sur des cartes rouges. Chez Wynne, règles et critères d'acceptation vont sur la même carte. Gherkin a un mot-clé Rule qui regroupe les exemples d'une règle."
      author: "Matt Wynne : Example Mapping"
      refs: ["S7", "S6"]
  course:
    - text: "Séparer critère et règle métier par le test « est-ce encore vrai si cette story n'existe pas ? ». Aucune source ne sépare les deux de cette façon : chez Wynne, règles et critères vont sur la même carte."
      refs: ["S7"]
    - text: "Ne changer qu'une variable d'un exemple à l'autre. Heuristique du cours, sans source externe ; Gherkin recommande seulement de limiter chaque exemple à quelques étapes."
      refs: ["S5", "S6"]
    - text: "Une contrainte d'usage s'écrit dans un critère, dans le contexte de départ (Given), sans nommer de solution (concept 7)."
      refs: ["S3"]
    - text: "Le Then vérifie un résultat observable par l'utilisateur, pas un moyen choisi par l'équipe."
      refs: ["S6", "S3"]
    - text: "Une règle non fixée n'est ni inventée ni tranchée par le PO seul : il la fait fixer par l'utilisateur concerné avant que la story parte (concept 7a2)."
      refs: ["S7"]
    - text: "Given/When/Then n'est pas obligatoire : un critère écrit autrement convient s'il reste tranchable."
      refs: ["S10"]
diagrams:
  - file: regle-exemples-question.svg
    title: "Une règle métier, deux exemples où un seul fait change, une règle non fixée"
    caption: "Une règle, deux exemples, une question. Les exemples en Given/When/Then illustrent la règle ; d'un exemple à l'autre, un seul fait change (souligné). Une règle non fixée reste une question, sans exemple dessous. Cas d'illustration inventé pour la page."
    subconcept: 8a
---

## Objectif

Écrire des critères d'acceptation qu'un testeur tranche sans poser de question, en Given/When/Then, avec une variable à la fois ; les séparer des règles métier qu'ils illustrent ; repérer une règle non fixée et la faire fixer au lieu de l'inventer.

## L'essentiel

Un **critère d'acceptation**, propre à une story, dit quand elle est faite : un testeur tranche OK ou KO sans poser de question (le T d'INVEST, concept 7). Une **règle métier** est vraie hors de la story, et d'autres stories s'en servent. Les critères sont souvent des exemples qui illustrent une règle, écrits en **Given/When/Then** (contexte, événement, résultat observable), **une variable à la fois**. Un critère ne fixe pas une règle restée ouverte (concept 8a2).

![Une règle métier, deux exemples où un seul fait change, une règle non fixée](regle-exemples-question.svg)

## 8a Critère ou règle métier

*Le critère est propre à la story et se tranche ; la règle vaut au-delà et se fixe avant.*

### 8a1 Critère ou règle

Un critère d'acceptation est **propre à une story** et se tranche OK ou KO. Une règle métier est une vérité du domaine : elle reste vraie sans cette story, et d'autres stories s'en servent. Les critères illustrent souvent une règle par un cas précis.

Deux questions permettent de les séparer : pour une règle, « est-ce encore vrai si cette story n'existe pas ? » ; pour un critère, « un testeur peut-il dire OK ou KO sans me poser de question ? ». Cette séparation est un choix du cours [cours] : chez Matt Wynne, règles et critères vont sur la même carte, et aucune source consultée ne les distingue ainsi. Elle sert à ne pas recopier une règle dans chaque story, ni à prendre un cas précis pour une règle générale.

Une **contrainte d'usage** (par exemple, l'utilisateur ne dispose que d'un moyen d'accès précis) va dans un critère (concept 7b), dans son contexte de départ, le Given (concept 8b1) : c'est ainsi que le testeur la vérifie [cours]. Ce qui vaut pour toutes les vues de l'équipe, lui, ne se répète pas dans chaque story : c'est la Definition of Done (concept 11).

> **Fil rouge :** La DoR de l'équipe vélos (sa Definition of Ready : les conditions qu'elle écrit pour qu'un élément soit prêt à être choisi, concept 11) demande des règles métier fixées avant qu'une story entre dans un sprint.

### 8a2 La règle non fixée

Un critère qui s'appuie sur une règle non fixée **la fixe en douce** : le cas qu'il choisit tranche la règle, sans que personne l'ait décidée. Exemple inventé pour l'illustration : « Then la location de plus de 24 heures est signalée » décide qu'une location est trop longue au-delà de 24 heures, alors que la durée maximale n'est fixée par personne.

Pour le repérer, on se demande, critère par critère : **quelle règle ce cas suppose-t-il, et est-elle fixée ?** Si elle ne l'est pas, le PO ne l'invente pas et ne la tranche pas à la place de l'utilisateur concerné : il la fait fixer, et la story attend (concept 7a2). Dans l'Example Mapping, cette règle est une question sans réponse, sur une carte rouge, sans exemple dessous ; elle ne devient règle métier qu'une fois fixée, et les critères l'illustrent alors.

## 8b Given/When/Then, une variable à la fois

*Une forme simple pour écrire un critère, et une discipline pour qu'il reste lisible.*

### 8b1 La forme

**Given** décrit le contexte de départ, **When** l'événement ou l'action, **Then** le résultat attendu, observable : ce que le testeur vérifie. En français : étant donné, quand, alors. C'est un choix d'école [école] de Dan North et Chris Matts, issu du BDD ; Cucumber et son langage Gherkin l'outillent, mais la forme s'écrit sans outil. Elle n'est pas obligatoire : un critère écrit autrement convient s'il reste tranchable.

Un critère devient vite flou par quatre défauts. Un **When absent** : on ne sait pas quel événement déclenche le résultat. Un **Then vague** (« l'utilisateur est informé ») : on ne sait pas quoi vérifier ; on écrit ce que le testeur regarde, un nombre, un âge. Un **mot flou** (« récent », « rapidement ») : le testeur doit encore poser une question ; on écrit la valeur fixée (cas inventé : « chargée en moins de 3 secondes »). Et **le moyen au lieu du résultat** : le Then vérifie ce que l'utilisateur obtient ou observe, pas un choix de l'équipe qu'elle pouvait changer [cours]. « La page est servie depuis un cache » est un moyen ; « la page se charge en moins de 3 secondes » est un résultat (exemple inventé). Un Then qui nomme une solution fige ce que l'équipe pouvait négocier (concept 7b).

### 8b2 Une variable à la fois

D'un exemple à l'autre, **ne changer qu'un fait du Given** [cours] : si le Then change, on sait quelle règle joue ; si un test échoue, on sait quoi corriger. Deux exemples qui diffèrent par deux faits à la fois ne disent plus lequel est en cause. Sur le schéma, les deux exemples ne diffèrent que par la location en cours.

Il faut aussi que chaque Then reste fidèle aux règles fixées : un Then qui exclut un cas que la règle admet invente une règle en douce. Exemple inventé : « l'abonné suspendu ne peut pas louer », alors qu'aucune règle ne le dit. On relit donc chaque Then contre les règles du domaine, comme on le fait pour un critère qui s'appuie sur une règle non fixée.

## Pièges

- **Confondre règle et critère** : recopier la même règle (cas inventé : « un abonné loue un seul vélo à la fois ») dans les critères de chaque story, ou ériger un cas précis en règle. Le test rapide les sépare.
- **Fixer une règle non fixée dans un critère** (cas inventé : une durée maximale de location, non fixée) : le critère décide en douce. Le PO ne l'invente pas et ne la tranche pas à la place de l'utilisateur concerné ; il la fait fixer avant que la story parte (concept 7a2 ; DoR, concept 11).
- **Inventer une règle dans le Then** (cas inventé : « l'abonné suspendu ne peut pas louer », si aucune règle ne le dit) : relire chaque Then contre les règles fixées.
- **Un mot flou** (« récent », « rapidement ») : le testeur doit encore poser une question. Écrire la valeur fixée (cas inventé : « chargée en moins de 3 secondes »). Un mot dont la règle n'est pas fixée (« location trop longue ») relève du piège précédent.
- **Un Then vague ou un When absent ou mal placé** : sans événement ni résultat observable, on ne sait pas quoi vérifier ni quand. Un Then vague (« l'utilisateur est informé ») : écrire ce que le testeur vérifie (un nombre, son âge).
- **Le moyen au lieu du résultat** (« la page est servie depuis un cache ») : le Then vérifie l'âge des données que l'utilisateur lit, pas la fréquence de rafraîchissement.
- **La solution dans le critère** (« il reçoit un export CSV ») : on fige ce que l'équipe pouvait négocier (concept 7b).
- **Reformuler une contrainte plus large qu'elle n'est** (« hors ligne » pour « sans réseau pendant le trajet », exemple inventé) : la reprendre telle qu'elle est posée.
- **Changer plusieurs variables à la fois** : on ne sait plus quelle règle on teste.
- **Répéter dans chaque story ce qui vaut pour toutes** (le même bandeau de version dans chaque vue) : c'est la DoD (concept 11).
- **Croire Given/When/Then obligatoire ou lié à un outil** : c'est un choix d'école ; un critère écrit autrement convient s'il reste tranchable.

## Le test rapide

> Règle : « est-ce encore vrai si cette story n'existe pas ? ». Critère : « un testeur peut-il dire OK ou KO sans me poser de question ? ». Et d'un exemple à l'autre, un seul fait change.

Formulation du cours, sans source externe.
