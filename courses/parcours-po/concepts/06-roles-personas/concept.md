---
description: "Comment choisir l'acteur d'une user story, pourquoi le vérifier auprès des utilisateurs, et ce qu'un persona apporte (ou pas)."
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "Ne parle ni de rôle utilisateur, ni de persona, ni d'acteur. Dit seulement qu'un produit a des utilisateurs ou des clients bien définis. Rien de ce concept n'est donc du consensus Scrum."
      refs: ["S1"]
      verified:
        - "« persona », « user role », « actor » absents du texte (recherche du 2026-10-22) ; « known stakeholders, well-defined users or customers » (définition du produit)"
  school:
    - author: "Mike Cohn : écrire pour des rôles précis"
      text: "Recommandation de Cohn, répandue, d'après l'usage-centered design de Constantine et Lockwood : supposer un seul type d'utilisateur fait manquer des stories. Cohn admet que « utilisateur » suffit quand tous ont besoin du même comportement pour la même raison, et qu'une seule story ne couvre deux rôles que dans ce cas. Il conseille un rôle plus précis quand celui-ci change la conversation : règles, données, moment, droits ou résultat différents. Ce n'est ni le Scrum Guide ni un consensus démontré."
      refs: ["S2", "S3"]
      verified:
        - "« is a fallacy and can lead a team to miss stories for users who do not fit the general mold » ; « The disciplines of usage-centered design (Constantine and Lockwood 1999) and interaction design (Cooper 1999) teach us the benefits of identifying user roles and personas prior to writing stories. » (chapitre 3, premier paragraphe)"
        - "« Sometimes \"user\" is specific enough. If everyone who uses the product needs the same behavior for the same reason, a more detailed role may not add much. » ; « ask whether the role changes the conversation » (page)"
    - author: "Alan Cooper : les personas"
      text: "Venus du design d'interaction : un portrait fictif construit à partir d'utilisateurs réels. Pas obligatoires, discutés entre praticiens (on leur reproche des preuves surtout anecdotiques et un risque de stéréotype). Cohn les rattache à Cooper, dans le même chapitre que les rôles."
      refs: ["S2", "S6", "S7"]
      verified:
        - "« interaction design (Cooper 1999) » (chapitre 3, premier paragraphe)"
        - "« hypothetical archetypes, as a practical interaction design tool » ; « first published in 1998, introduced the use of personas » ; « Whether you hate or love this idea as a development tool, you can thank me. » (extrait)"
        - "« a semi-fictional characterization or representation of a typical customer segment or end user » (page)"
  course:
    - text: "« L'acteur agit et y gagne » : le rôle qui fait l'action du « je veux » est celui qui gagne ce que dit le « afin de ». Le critère réunit deux repères de Cohn, l'initiateur de l'action et celui qui en profite. Cohn écrit pourtant parfois une story pour un rôle qui y gagne sans agir : c'est une règle pratique, pas une règle sans exception."
      refs: ["S3", "S5"]
      verified:
        - "« names the person or role who benefits » (page)"
        - "« initiator of the action » ; « As the company owner, I want ads on the site so that I make money » (page)"
    - text: "Celui qui construit n'est pas l'acteur : pas de story « en tant que développeur ». Un consommateur de données, lui, reste un utilisateur (concept 1) : le piège vise celui qui construit, pas celui qui consomme."
      refs: ["S5"]
      verified:
        - "« I don't necessarily mean we want a bunch of \"programmer stories.\" Those are generally best avoided. » (page)"
    - text: "Le PO vérifie l'acteur auprès des utilisateurs plutôt que de le deviner."
      refs: []
    - text: "La story garde le rôle (« en tant qu'abonné ») même quand l'équipe a un persona, qui sert à la conversation et aux exemples. Certaines équipes écrivent leurs stories au nom d'un persona : c'est possible, à condition que le persona vienne d'utilisateurs réels."
      refs: []
neighbors:
  - author: "Le proto-persona"
    text: "Un portrait fait des hypothèses de l'équipe, sans entretiens. On le confond souvent avec un persona ; ce n'en est pas un au sens du portrait construit à partir d'utilisateurs réels."
    refs: []
diagrams:
  - file: acteur-story.svg
    title: "Deux flèches vers l'acteur de la story"
    caption: "Du « je veux » et du « afin de », deux flèches arrivent sur le même rôle, le régulateur, qui s'écrit dans la case « En tant que » : c'est l'acteur ; l'agent d'accueil n'en reçoit aucune."
    subconcept: 6a
---

## Objectif

Choisir l'acteur d'une story : le rôle qui fait l'action du « je veux » et y gagne lui-même ce que dit le « afin de », pas celui qui construit ni celui qui en parle ; le vérifier auprès des utilisateurs ; savoir ce qu'un persona apporte, et qu'il reste un choix d'école.

## L'essentiel

Une story a besoin d'un **acteur**, désigné par son **rôle** : une catégorie d'utilisateurs aux besoins communs (technicien de maintenance, abonné). Le bon acteur **agit et y gagne** : il fait ce que dit le « je veux » et reconnaît son propre gain dans le « afin de ». Un mauvais acteur donne une mauvaise raison, donc un mauvais ordre. Le PO ne le devine pas : il le vérifie auprès des utilisateurs. Un **persona**, portrait fictif d'un rôle (prénom, objectifs, comportements) construit à partir d'utilisateurs réels, aide à se le représenter, sans le remplacer.

![Deux flèches vers l'acteur de la story](acteur-story.svg)

## 6a L'acteur de la story

*L'acteur est un rôle, pas un prénom, et il se vérifie auprès des utilisateurs.*

Le test tient en deux questions : **qui fait l'action du « je veux » ? qui gagne ce que dit le « afin de » ?** Si les deux réponses désignent le même rôle, c'est l'acteur. Sinon, l'acteur est à revoir. C'est un choix du cours [cours], qui réunit deux repères de Mike Cohn : quand deux formulations se valent, il prend pour acteur celui qui lance l'action, et sa story nomme celui qui en profite. Cohn écrit pourtant parfois une story pour un rôle qui gagne sans agir : c'est une règle pratique, pas une règle sans exception. Le Scrum Guide, lui, ne parle ni de rôle ni d'acteur.

> **Fil rouge :** Étienne, responsable d'exploitation, envoie les régulateurs vers les stations ; Régis, régulateur, conduit la camionnette et redistribue les vélos.

Quatre confusions reviennent.

- **L'acteur technique.** Celui qui construit n'est pas l'acteur du seul fait de construire : le « afin de » doit dire le gain d'un utilisateur, pas une étape technique. En revanche, un consommateur de données reste un utilisateur légitime (concept 1) dès qu'il se sert du résultat.
- **La valeur d'un autre rôle.** Un « afin de » qui dit le gain d'un autre rôle que l'acteur est le signe d'un mauvais acteur (par exemple un responsable qui écrit « … afin que mes équipes gagnent du temps », exemple inventé) : on change d'acteur, ou on cherche la raison propre à celui qu'on a nommé (concept 5).
- **Celui qui demande.** La demande vient souvent d'un responsable, alors que le besoin est parfois celui de son équipe.
- **« Utilisateur » par défaut.** Il suffit quand tous ont besoin du même comportement pour la même raison ; une seule story ne couvre deux rôles que dans ce cas. Sinon il fait manquer des stories : Cohn conseille un rôle plus précis quand celui-ci change la conversation [école], par exemple parce que les règles, les données, le moment ou le résultat attendus ne sont pas les mêmes.

Dans la phrase, on écrit le rôle, jamais le prénom d'une personne : la story sert tous les utilisateurs de ce rôle, et la personne nommée est seulement celle qu'on interroge. C'est justement ce que fait le PO : il **vérifie l'acteur auprès des utilisateurs** (qui fait l'action, qui y gagne) au lieu de le choisir sur le papier. C'est un choix du cours [cours], sans source externe. Un « je veux » par story reste la règle (concept 4).

## 6b Le persona (choix d'école)

*Un persona aide à se représenter un rôle, à condition de venir d'utilisateurs réels.*

Un persona est un **portrait fictif et réaliste d'un rôle** : un prénom, des objectifs, des comportements. C'est un choix d'école d'Alan Cooper [école], venu du design d'interaction, absent du Scrum Guide et discuté entre praticiens (on leur reproche des preuves surtout anecdotiques et un risque de stéréotype). Aucune équipe n'est obligée d'en avoir.

Il se construit **à partir d'utilisateurs réels** interrogés, pas de l'imagination de l'équipe : le persona est fictif par son prénom, pas par ses traits. Chaque trait doit pouvoir répondre à la question « d'où vient-il ? ». Un portrait tiré des seules hypothèses de l'équipe (un proto-persona) n'en est pas un. C'est ce qui sépare un persona d'un utilisateur réel : on interroge un technicien en chair et en os ; un persona, lui, résume des utilisateurs réels.

Le persona sert à la **conversation** et aux **exemples** : il rend le rôle concret quand l'équipe en parle. Il ne remplace ni le rôle dans la phrase de la story ni les entretiens avec les utilisateurs. Dans ce cours, la story garde le rôle (« en tant qu'abonné ») [cours] ; certaines équipes écrivent leurs stories au nom d'un persona, ce qui reste possible si le persona vient d'utilisateurs réels. Les critères d'une story, eux, se rédigent au concept 8.

## Pièges

- **Un rôle qui se contente de construire** : l'acteur agit et y gagne, il ne se limite pas à fabriquer le livrable. Un consommateur de données reste un utilisateur (choix du cours, concept 1).
- **La valeur d'un autre rôle dans le « afin de »** (un responsable qui écrit « … afin que mes équipes gagnent du temps », exemple inventé) : le « afin de » dit le gain de l'acteur ; sinon, on change d'acteur ou on cherche sa propre raison (concept 5).
- **Deviner l'acteur** : le PO le vérifie auprès des utilisateurs (qui fait l'action, qui y gagne). Il ne choisit pas l'acteur sur le papier.
- **Prendre celui qui demande pour l'acteur** : la demande vient souvent d'un responsable, le besoin est parfois celui de son équipe.
- **« En tant qu'utilisateur » par défaut** : il fait manquer des stories quand les rôles ont des raisons différentes. Il suffit quand tous ont le même besoin pour la même raison.
- **Un prénom à la place du rôle** (« en tant que Julie », exemple inventé) : la story sert un rôle ; la personne nommée est celle qu'on interroge.
- **Un persona inventé** (un portrait tiré de l'imagination de l'équipe) : sans utilisateurs interrogés, il fait parler un utilisateur qui n'existe pas.
- **Croire le persona obligatoire** : c'est un choix d'école ; le Scrum Guide n'en parle pas.

## Le test rapide

> Qui fait l'action du « je veux », et qui gagne ce que dit le « afin de » ? Si ce n'est pas le même rôle, ou si c'est celui qui construit, l'acteur est probablement à revoir (choix du cours, pas règle absolue) ; dans tous les cas, le PO le vérifie auprès de l'utilisateur.

Choix du cours, pas règle absolue.
