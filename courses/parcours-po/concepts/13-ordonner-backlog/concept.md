---
description: "Comment un Product Owner ordonne un backlog : valeur, coût, risque, dépendances et ce qui est prêt, puis le coût du retard et MoSCoW pour une échéance."
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "Le PO répond de l'ordre du backlog ; qui veut le changer le convainc (concept 1b). Il peut porter dans le backlog les besoins de nombreuses parties prenantes. Les Developers qui feront le travail en estiment la taille ; le PO peut les aider à comprendre les compromis. Le Guide ne dit pas comment ordonner."
      refs: ["S1"]
    - author: "Le Scrum Guide d'octobre 2011"
      text: "Il disait que le backlog est « souvent » ordonné par valeur, risque, priorité et nécessité. La phrase a disparu dès la version de 2013."
      refs: ["S2", "S4"]
    - author: "Pratique établie, hors du Scrum Guide"
      text: "Ordonner selon la valeur, le coût, le risque et les dépendances. Mike Cohn donne cinq facteurs : ces quatre et l'apprentissage (ce que l'équipe apprend en faisant l'élément, concept 17). Roman Pichler pèse aussi valeur, risque et dépendances. Aucun texte n'impose cette liste. Le risque y est celui qui pèse sur la réussite du produit ; le risque pour les utilisateurs (sécurité) en est un autre sens."
      refs: ["S6", "S19"]
  school:
    - author: "Don Reinertsen (2009) : le coût du retard"
      text: "En fait la mesure économique à quantifier : sans lui, les files d'attente paraissent gratuites. Le terme vient du développement de produit, pas du Scrum."
      refs: ["S11"]
    - author: "Joshua Arnold : commencer sans chiffres"
      text: "Propose de commencer par des bandes qualitatives de valeur et d'urgence, et décrit des profils d'urgence, dont l'échéance externe. Il chiffre ensuite lui-même (CD3, le coût du retard divisé par la durée, proche de WSJF)."
      refs: ["S12", "S13"]
    - author: "SAFe : WSJF"
      text: "Le coût du retard relatif divisé par la durée relative du travail. À nommer, pas à enseigner : un score de plus parmi d'autres (proche du CD3 d'Arnold), possible si l'organisation l'emploie. Le score ne remplace pas le pourquoi de chaque place."
      refs: ["S14", "S12"]
    - author: "DSDM : MoSCoW (attribué à Dai Clegg, 1994)"
      text: "Must, Should, Could, Won't, pour un délai fixé. DSDM recommande de ne pas dépasser environ 60 % de l'effort en Must. Chez DSDM, c'est le représentant de l'activité concernée qui dit ce qui est Must."
      refs: ["S9", "S17", "S18"]
  course:
    - text: "La liste « valeur, coût, risque, dépendances » est le choix du cours, appuyé sur Cohn et, pour valeur, risque et dépendances, sur Pichler. À prendre comme une pratique établie, pas comme une liste canonique."
      refs: ["S6", "S19"]
    - text: "Ce qui est prêt pèse sur l'ordre : ce qui ne l'est pas ne peut pas être fait ensuite, et l'ordre fait alors remonter ce qui le rend prêt. Un élément est prêt à être choisi quand l'équipe peut le finir en un sprint (Scrum Guide) ; la Definition of Ready est un choix d'école (concept 11b)."
      refs: ["S1"]
    - text: "Le risque a deux sens : pour le produit (Cohn, Pichler), et pour les utilisateurs (sécurité). Un risque de sécurité peut passer devant l'objectif produit, mais sa gravité se fait qualifier par ceux qui en répondent, pas par le PO seul. Aucune source ne le dit pour un backlog Scrum. DSDM range en Must ce sans quoi la livraison ne serait pas sûre : appui indirect, dans un autre cadre."
      refs: ["S9"]
    - text: "Le sponsor ou le financeur convainc le PO comme les autres : on pèse la demande, pas son auteur. Transposé de Cohn et du Scrum Guide, pas écrit tel quel."
      refs: ["S1"]
    - text: "MoSCoW classe pour une échéance ; il ne remplace pas l'ordre du backlog, qui reste une liste ordonnée sans ex aequo."
      refs: ["S1", "S9"]
neighbors:
  - author: "Les priorités (« haute », « moyenne », « basse »)"
    text: "Une priorité laisse des ex aequo ; un ordre donne à chaque demande une place unique. Dans le cours, « priorité » ne s'emploie que pour MoSCoW."
    refs: []
diagrams:
  - file: ordonner-une-place.svg
    title: "Quatre demandes en colonne, dont une pas prête"
    caption: "Quatre demandes en colonne, une place chacune : celle qui n'est pas prête est en pointillé."
    subconcept: 13a2
  - file: formes-cout-retard.svg
    title: "Deux formes de coût du retard dans le temps"
    caption: "Le coût du retard dans le temps, sans graduation : un coût qui grandit dès aujourd'hui, face à un coût lié à une échéance, presque nul tant qu'elle est loin, qui monte à son approche puis retombe après elle."
    subconcept: 13b
  - file: moscow-echeance-backlog-ordonne.svg
    title: "MoSCoW pour une échéance, et le backlog qui reste ordonné"
    caption: "MoSCoW classe en quatre bacs ce qui doit figurer dans une échéance, à côté du backlog, qui reste une colonne ordonnée."
    subconcept: 13c
---

## Objectif

Ordonner des demandes concurrentes en pesant valeur, coût, risque et dépendances, rapportés à l'objectif produit, et argumenter l'ordre ; raisonner en coût du retard quand le temps compte ; classer avec MoSCoW pour une échéance, sans le confondre avec l'ordre du backlog.

## L'essentiel

Ordonner, c'est décider : chaque demande a une place unique, et le PO dit **pourquoi**. Ce qui pèse : la valeur (ce que la demande apporte, rapporté à l'objectif produit), le coût (l'effort, que les Developers estiment), le risque et les dépendances, toujours face à l'objectif produit ; ce qui n'est pas prêt ne peut pas être fait ensuite, donc l'ordre fait remonter ce qui le rend prêt. Quand le moment compte, on raisonne en coût du retard (ce qu'on perd à livrer plus tard). Pour une échéance, MoSCoW dit ce qui doit y être, mais il ne remplace pas l'ordre.

## 13a Ordonner, c'est décider

*Une place par demande, un pourquoi par place.*

### 13a1 Les quatre critères

Le Scrum Guide confie l'ordre du backlog au PO : qui veut le changer le convainc, il n'y a pas de vote (concept 1b). Il ne dit pas comment ordonner. Une pratique établie, hors du Scrum Guide [consensus], pèse quatre critères :

- la **valeur** : ce que la demande apporte, rapporté à l'objectif produit ;
- le **coût** : surtout l'effort de l'équipe, que les Developers estiment, pas le PO ;
- le **risque** : ce qui est risqué et nécessaire se fait tôt. Le mot a deux sens : le risque pour le produit, et le risque pour les utilisateurs (sécurité), dont la gravité se fait qualifier par ceux qui en répondent, pas par le PO seul [cours] ;
- les **dépendances** : ce dont une autre demande a besoin remonte (concept 10b).

Mike Cohn en donne cinq (avec l'apprentissage, concept 17), Roman Pichler pèse valeur, risque et dépendances : la liste est une pratique, aucun texte ne l'impose. L'ordre d'arrivée n'en fait pas partie, ni la personne qui insiste ou qui finance : on pèse la demande, pas son auteur.

> **Fil rouge :** La valeur se mesure face à l'objectif produit : que les stations du centre-ville restent le moins longtemps possible vides aux heures de pointe.

### 13a2 Ce qui est prêt

Un élément est prêt à être choisi quand l'équipe peut le finir en un sprint (concept 3). Une règle métier non fixée, un accès aux données non obtenu, le travail d'une autre équipe sans lequel on ne finit pas : rien de tout cela n'entre au sprint, quel que soit son rang. Le PO lance alors ce qui rend l'élément prêt : faire fixer la règle (concept 8a2), s'accorder avec l'autre équipe, obtenir l'accès, et si cela bloque, escalader (concept 14). Ce pesage de « ce qui est prêt » est un choix du cours [cours], appuyé sur le Scrum Guide ; la Definition of Ready est un choix d'école (concept 11b).

![Quatre demandes en colonne, dont une pas prête](ordonner-une-place.svg)

Une demande qui en suppose une autre passe après elle. Mettre tout en tête n'ordonne rien : on a une liste de priorités ex aequo, pas un backlog ordonné (concept 3).

> **Fil rouge :** La DoR de l'équipe vélos (concept 11b) : critères d'acceptation écrits, règles métier fixées, dépendances identifiées, accès aux données obtenu.

## 13b Valeur et coût du retard

*La valeur d'une demande dépend aussi du moment où elle arrive.*

C'est un choix d'école [école]. Le **coût du retard** est ce qu'on perd à livrer plus tard. Don Reinertsen (2009) en fait la mesure économique à quantifier. Joshua Arnold propose de commencer sans chiffres, par des bandes qualitatives de valeur et d'urgence, et décrit des profils d'urgence, c'est-à-dire la **forme** du coût dans le temps, dont l'échéance externe. Lui-même chiffre ensuite (CD3, le coût du retard divisé par la durée). Le cours [cours] retient deux formes pour commencer :

- un coût qui grandit **dès aujourd'hui**, chaque jour de retard s'ajoutant aux autres ;
- un coût lié à une **échéance** : presque nul au début, il monte à l'approche ; après l'échéance, la valeur est perdue jusqu'à la suivante.

Une échéance fait **monter** la demande qui y est liée, sans la mettre en tête d'office : les autres critères pèsent toujours. Ce sont les Developers qui disent le temps qu'il faut, et la date d'une échéance se demande à qui la détient.

![Deux formes de coût du retard dans le temps](formes-cout-retard.svg)

SAFe en tire **WSJF** : le coût du retard divisé par la durée du travail, proche du CD3 d'Arnold. On le nomme sans l'enseigner : c'est un score possible si l'organisation l'emploie, qui ne remplace pas le pourquoi de chaque place. Ici, on ne chiffre rien. Le coût du retard (ce qui se perd en attendant) n'est pas le coût de la demande (ce qui se dépense en la faisant).

## 13c MoSCoW pour une échéance

*Classer ce qui doit être là à une date, sans toucher à l'ordre du backlog.*

C'est un choix d'école [école], celui de DSDM, attribué à Dai Clegg (1994). MoSCoW classe ce qui doit figurer dans une échéance :

- **Must** : le minimum utilisable que la livraison garantit ;
- **Should** : important, pas vital ;
- **Could** : souhaitable, la première réserve qu'on lâche si l'échéance est menacée ;
- **Won't** : pas cette fois, pas « jamais ».

DSDM recommande de ne pas dépasser environ 60 % de l'effort en Must : au-delà, l'échéance devient risquée, et si tout est Must, on n'a rien classé. Chez DSDM, c'est le représentant de l'activité concernée qui dit ce qui est Must. Le cours en tire que le PO aide à classer, mais que la réponse revient à celui qui sait ce que l'échéance exige [cours].

![MoSCoW pour une échéance, et le backlog qui reste ordonné](moscow-echeance-backlog-ordonne.svg)

MoSCoW ne remplace pas l'ordre : quatre catégories laissent des ex aequo, alors que chaque élément du backlog a besoin d'une place unique. Un Must n'a de sens que face à une échéance. Pour le reste du backlog, il faut toujours un ordre.

## Pièges

- **Ordonner par l'ordre d'arrivée** ou **par la personne** (celle qui insiste) : la demande s'ordonne face au reste. On pèse la demande, pas son auteur ; qui veut changer l'ordre convainc le PO.
- **Tout placer en tête** : on n'a rien ordonné.
- **Estimer à la place des Developers** (le coût vient d'eux), ou **trancher un fait métier** (la gravité d'un risque, une règle, la date d'une échéance) : cela se demande à qui le détient.
- **Mettre en tête une demande qui n'est pas prête** sans rien faire pour la rendre prête (l'équipe ne peut pas la prendre), ou **placer une demande avant celle qu'elle suppose** (on ne peut pas la finir sans l'autre).
- **Croire que le Scrum Guide donne les critères** : il confie l'ordre au PO sans dire comment ; les critères sont une pratique établie.
- **Chiffrer le coût du retard avec des nombres inventés** : raisonner sur sa forme dans le temps.
- **Tout classer en Must**, ou **croire que MoSCoW remplace l'ordre** : il vaut pour une échéance et laisse des ex aequo.

## Le test rapide

> « Pour chaque demande, sais-tu dire pourquoi elle est à cette place plutôt qu'une au-dessus, en nommant valeur, coût, risque ou dépendance, et si elle est prête ? »

Formulation du cours : le Scrum Guide ne donne pas de critère pour ordonner. Si la réponse est « elle est arrivée avant » ou « c'est X qui la demande », l'ordre n'est pas argumenté.
