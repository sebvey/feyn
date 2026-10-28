---
description: "Livrable et résultat, objectif produit selon le Scrum Guide, vision produit comme choix d'école, et comment choisir une mesure de résultat pour un produit data."
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "Le PO répond de la valeur, sans méthode imposée pour la mesurer. L'objectif produit est un état futur du produit qui sert de cible à l'équipe, son objectif à long terme. Il est l'engagement du backlog produit et figure dans ce backlog ; l'équipe l'atteint ou l'abandonne avant d'en prendre un autre. Le développer et le communiquer est la première des tâches de gestion du backlog que le Guide confie au PO. Chaque incrément est un pas vers lui ; le Sprint Planning y rattache les éléments choisis, la revue de sprint discute du progrès vers lui. Le Guide n'impose ni format ni horizon. Sa version 2020 a introduit l'objectif produit."
      refs: ["S1", "S3", "S5"]
    - author: "Pratique établie, hors du Scrum Guide"
      text: "Distinguer livrable (*output*) et résultat (*outcome*), et mesurer le résultat. Les objectifs d'apprentissage du PO de Scrum Alliance le demandent ; Scrum.org, Teresa Torres et Josh Seiden partagent la distinction. Le Scrum Guide n'emploie pas ces mots en ce sens."
      refs: ["S2", "S4", "S6", "S11"]
  school:
    - author: "Josh Seiden : le résultat comme changement de comportement"
      text: "Le résultat est un changement de comportement de l'utilisateur, qui produit la valeur (*Outcomes Over Output*, 2019). Le cours attribue à Seiden l'idée, pas une citation."
      refs: ["S11", "S12"]
    - author: "Scrum.org, Scrum Alliance : la vision produit"
      text: "Le Scrum Guide 2020 ne contient plus le mot « vision » (la version 2017 l'employait). Scrum.org et Scrum Alliance la gardent : pour Scrum.org, l'objectif produit est un pas concret et mesurable vers une vision souvent aspirationnelle. Un format de vision : le Product Vision Board de Roman Pichler (2011)."
      refs: ["S1", "S3", "S2", "S5", "S8", "S9"]
    - author: "Scrum.org : critères d'un bon objectif produit"
      text: "Aligné sur la vision, clair et concis, orienté résultat, mesurable, transparent. Et l'objectif produit vu comme une hypothèse (ce qu'on tient pour vrai sans l'avoir vérifié, concept 17) : on peut le reformuler quand on apprend, sans que ce soit un échec."
      refs: ["S5", "S6"]
    - author: "Rodden, Hutchinson et Fu (Google) : Goals-Signals-Metrics et HEART"
      text: "Choisir une mesure en partant du but, puis du signal qui montre le succès, puis de la mesure. Cinq catégories de mesures centrées utilisateur : Happiness, Engagement, Adoption, Retention, Task success. Une mesure seule ne suffit pas : on la croise avec d'autres sources."
      refs: ["S10"]
    - author: "Eric Ries : les mesures de vanité"
      text: "Se méfier des chiffres flatteurs qui ne disent pas quoi faire ; garder les mesures qui aident à décider."
      refs: ["S15"]
    - author: "Cités sans être enseignés"
      text: "Evidence-Based Management (Scrum.org, quatre domaines de valeur) ; une mesure de succès par version (Jeff Patton, concept 16) ; les mesures d'un produit de données selon Zhamak Dehghani : qualité des données (le respect de règles mesurables, comme la complétude ou la fraîcheur, concept 12), délai pour les consommer, satisfaction des consommateurs."
      refs: ["S16", "S17", "S18"]
  course:
    - text: "Le test qui sépare livrable et résultat : si l'équipe peut le faire seule, sans que personne ne change sa façon de travailler, c'est un livrable. Tiré de l'idée de Seiden, pas une citation."
      refs: ["S11", "S12", "S13"]
    - text: "Un indicateur que la plateforme calcule pour ses utilisateurs est un livrable, même quand on s'en sert pour juger le produit : on parle alors de mesure de résultat. Même chiffre, deux rôles."
      refs: ["S13"]
    - text: "Un objectif produit qui décrit une caractéristique du livrable ou un moyen ne convient pas : il ne dit pas ce qui change pour qui."
      refs: ["S1", "S6", "S13"]
diagrams:
  - file: livrable-au-resultat.svg
    title: "Du livrable au résultat : ce que l'équipe produit, ce qui change chez l'utilisateur"
    caption: "De gauche à droite : le livrable (ce que l'équipe maîtrise), l'usage (un signal, pas une preuve), puis le résultat, qui comprend le changement de comportement et l'effet visé. L'objectif produit vise l'effet visé (consensus) ; la vision, plus haut, est un choix d'école. La jauge est la mesure de résultat."
    subconcept: 2a
---

## Objectif

Distinguer un livrable (ce que l'équipe produit) d'un résultat (ce qui change chez
l'utilisateur) ; formuler un objectif produit qui vise un résultat ; choisir la mesure qui dit si
on s'approche de ce résultat.

## L'essentiel

Le PO répond de la valeur du produit, et le Scrum Guide n'impose aucune méthode pour la mesurer. Le cours sépare donc trois choses. Un **livrable** (*output* : une vue, un indicateur, un pipeline) est ce que l'équipe produit ; il ne prouve pas la valeur. Le **résultat** (*outcome*) est ce qui change chez l'utilisateur grâce au livrable ; il la montre. L'**objectif produit** est la cible à long terme de l'équipe : un état futur du produit, un seul à la fois. Une **mesure de résultat** dit si on s'en approche, sinon elle ne sert à rien.

![Du livrable au résultat : ce que l'équipe produit, ce qui change chez l'utilisateur](livrable-au-resultat.svg)

## 2a Livrable et résultat

*Livrer rend la valeur possible ; seul le résultat dit si elle est là.*

Le **livrable** est ce que l'équipe produit. Le **résultat** est ce qui change chez l'utilisateur grâce à lui. Un livrable terminé rend la valeur possible, il ne la prouve pas. Cette distinction est une pratique établie, absente du Scrum Guide [consensus] ; pour Josh Seiden, le résultat est un changement de comportement de l'utilisateur [école]. La satisfaction d'un utilisateur est une perception, utile en complément : elle ne dit pas seule si le résultat est obtenu.

Un test simple [cours] : si l'équipe peut le faire seule, sans que personne ne change sa façon de travailler, c'est un livrable. Pour un produit data, un **indicateur** que la plateforme calcule est un livrable, même quand on s'en sert ensuite pour juger le produit : c'est le même chiffre, avec deux rôles.

> **Fil rouge :** Maud fixe chaque semaine le nombre de techniciens en tournée et demande le nombre de vélos en panne par semaine ; le calculer est un livrable, et si Maud ajuste ses tournées à partir de ce chiffre, c'est un changement de comportement, le début du résultat.

## 2b L'objectif produit

*Un état futur visé, un seul à la fois, formulé comme un résultat.*

Selon le Scrum Guide, l'objectif produit est un état futur du produit qui sert de cible à l'équipe, son objectif à long terme [consensus]. Il figure dans le backlog produit, dont il est l'engagement. L'équipe l'atteint ou l'abandonne avant d'en prendre un autre : **un seul à la fois**. Accoler un second objectif au premier disperse l'équipe et rend l'ordre du backlog impossible à argumenter. Le PO le développe et le communique, c'est la première de ses tâches sur le backlog. Chaque incrément est un pas vers lui ; le Sprint Planning y rattache les éléments choisis, la revue de sprint discute du progrès. Le Guide n'impose ni format ni horizon, et c'est avec la version 2020 qu'il a introduit l'objectif produit.

Un bon objectif vise un **résultat**. Il n'est donc ni une liste de livrables ou une feuille de route datée (on peut tout livrer sans que rien ne change), ni une caractéristique du livrable ou un moyen (adopter telle technique ne dit pas ce qui change pour qui), ni une aspiration si vaste qu'aucune mesure ne dirait si l'équipe s'en approche [cours]. Sans cible chiffrée, un objectif est une direction : une mesure dit si on s'en approche, pas qu'il est atteint. Scrum.org propose des critères : aligné sur la vision, clair et concis, orienté résultat, mesurable, transparent. Pour Scrum.org aussi, l'objectif est une **hypothèse** (concept 17) : on peut le reformuler quand on apprend, sans que ce soit un échec [école].

La **vision produit**, plus lointaine et souvent aspirationnelle, est un choix d'école [école]. Le Scrum Guide 2020 ne contient plus le mot (la version 2017 l'employait) ; Scrum.org et Scrum Alliance la gardent, et pour Scrum.org l'objectif produit en est un pas concret et mesurable.

## 2c Choisir une mesure de résultat

*Partir du but, chercher le signal, puis construire la mesure.*

Une mesure n'est utile que si elle se rattache à un but. La démarche **Goals-Signals-Metrics** (Rodden, Hutchinson et Fu, chez Google) [école] : partir du but, chercher le signal qui montre le succès, puis construire la mesure. Un bon signal ne bouge que si le résultat s'améliore ou se dégrade, pas pour une autre raison. Les mêmes auteurs proposent cinq catégories de mesures centrées utilisateur (HEART), à choisir selon le but.

Le tri se fait avec une question : cette mesure peut-elle monter alors que le résultat ne bouge pas ? On écarte ainsi :

- **la mesure du livrable** (ce que l'équipe a produit ou livré) ;
- **l'usage seul** (consultations, connexions) : un signal utile, pas une preuve, car on peut consulter un livrable sans changer ce que l'on fait ;
- **le comptage brut qui monte avec la taille du réseau ou du nombre d'abonnés** : il faut le ramener à une base avant de le lire. Eric Ries parle de mesures de vanité : flatteuses, inutiles pour décider [école].

Une mesure seule ne suffit pas à conclure : on la croise avec d'autres sources (entretiens, observation) [école]. L'exploration rigoureuse d'une hypothèse vient au concept 17. Enfin, la façon de définir un indicateur se travaille au concept 12, car une mesure mal définie trompe sans que personne le veuille.

## Pièges

- **Juger son travail à ce qui tourne en production** : « c'est livré » ne veut pas dire « ça a marché ». Le piège est probable pour un développeur ou un profil data devenu PO. Le repérer quand il dit « c'est livré » pour « ça a marché ».
- **Un objectif produit qui est une liste de livrables ou une feuille de route datée** : on peut tout livrer sans l'atteindre.
- **Un objectif qui décrit le livrable ou un moyen**, ou qui est si vaste (une vision) qu'aucune mesure ne dit si l'équipe s'en approche. Le premier ne dit pas ce qui change pour qui. Le besoin d'un utilisateur est un fait à lui demander ; la technique revient aux Developers.
- **Deux objectifs à la fois**, souvent sous la forme « X et Y » : un seul à la fois.
- **Prendre l'usage du livrable pour le résultat** (consultations, connexions), ou se contenter d'un comptage brut sans le ramener à une base (par utilisateur, par période). L'usage est utile comme signal, insuffisant comme preuve ; un comptage brut monte avec la taille de la base d'utilisateurs (cas inventé : le nombre total de visites d'un site).
- **Oublier qu'une mesure qui devient la cible cesse d'être une bonne mesure** (loi de Goodhart) : un service d'assistance jugé sur le nombre de tickets ouverts (exemple inventé) pourrait le faire baisser en décourageant les demandes, sans qu'un client soit mieux aidé. Une mesure mal définie trompe aussi, sans que personne le veuille (cas inventé : « client actif » compté avec ou sans achat récent). La façon de définir un indicateur se travaille au concept 12. Croiser la mesure avec d'autres sources.
- **Inventer la cible chiffrée ou la définition des heures de pointe** à la place des parties prenantes.
- **Croire l'objectif produit gravé** : pour Scrum.org, c'est une hypothèse qu'on reformule quand on apprend (choix d'école).

## Le test rapide

> « Si on livre tout ce qui est prévu et que rien ne change pour l'utilisateur, l'objectif est-il atteint ? » Si oui, c'est une liste de livrables, pas un objectif produit.
>
> « Ma mesure peut-elle monter alors que le résultat ne bouge pas ? » Si oui, ce n'est pas une mesure de résultat.

Formulation du cours, appuyée sur la distinction livrable et résultat et sur Goals-Signals-Metrics.
