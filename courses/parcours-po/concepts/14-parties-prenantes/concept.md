---
description: "Qui sont les parties prenantes d'un produit data, comment le Product Owner arbitre et dit non entre elles, et comment escalader un obstacle sans escalader un désaccord."
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "Le PO peut représenter les besoins de nombreuses parties prenantes ; qui veut changer le backlog doit convaincre le PO, une seule personne, pas un comité (concept 1b). L'organisation entière respecte ses décisions, visibles dans le contenu et l'ordre du backlog ; le PO rend le backlog transparent."
      refs: ["S1"]
      verified:
        - "« The Product Owner may represent the needs of many stakeholders in the Product Backlog. Those wanting to change the Product Backlog can do so by trying to convince the Product Owner. » ; « The Product Owner is one person, not a committee. » ; « the entire organization must respect their decisions. These decisions are visible in the content and ordering of the Product Backlog » ; « Ensuring that the Product Backlog is transparent, visible and understood. » (Product Owner)"
    - author: "Le Scrum Guide 2020"
      text: "L'équipe Scrum présente son travail aux parties prenantes : elles ne sont pas l'équipe. Le Scrum Master fait lever les obstacles à l'avancement de l'équipe, facilite la collaboration avec les parties prenantes et lève les barrières entre elles et l'équipe."
      refs: ["S1"]
      verified:
        - "« The Scrum Team presents the results of their work to key stakeholders » (Sprint Review) ; « Causing the removal of impediments to the Scrum Team's progress » ; « Facilitating stakeholder collaboration as requested or needed » ; « Removing barriers between stakeholders and Scrum Teams » (Scrum Master)"
    - author: "Ce que le Guide ne dit pas"
      text: "Il ne dit ni comment identifier les parties prenantes, ni comment dire non, ni dans quel ordre escalader. Les mots « escalade » et « sponsor » n'y figurent pas."
      refs: ["S1"]
      verified:
        - "définition de « stakeholder » absente du texte (recherche du 2026-10-22) ; « escalat », « sponsor » absents du texte (recherche du 2026-10-30)"
  school:
    - author: "R. Edward Freeman : la définition large"
      text: "Une partie prenante est quiconque peut agir sur l'organisation ou est touché par elle, fournisseurs compris. Définition donnée en management, pour une organisation ; le cours l'applique au produit."
      refs: ["S2", "S3"]
      verified:
        - "« any group or individual who can affect or is affected by the achievement of the organization's objectives » ; « customers, suppliers, employees, financiers, and communities » (Stakeholder Legitimacy)"
        - "« any group or individual who can affect of an organization's objectives or who is affected by the achievement of an organization's objectives » ; « Suppliers » (Who counts as a stakeholder?)"
    - author: "La grille pouvoir et intérêt"
      text: "Elle classe les parties prenantes selon leur pouvoir sur le produit et leur intérêt pour lui. Souvent attribuée à Mendelow, mais Mendelow croisait le pouvoir et le dynamisme de l'environnement ; la forme pouvoir et intérêt vient de Johnson et Scholes. Attribution discordante, dite comme telle, sans date."
      refs: ["S7", "S8", "S9", "S10"]
      verified:
        - "« the dynamism of the environment and the power of the stakeholder relative to the organization » (Abstract)"
        - "« In reality, it is an adaptation of Mendelow's original Power/ Dynamism Matrix by Gerry Johnson and Kevan Scholes in their Exploring Corporate Strategy, 3rd ed. » ; « it was actually published in 1981, not 1991 » (Source)"
        - "« Johnson and Scholes adapted Mendelow's model in Exploring Corporate Strategy, replacing the dynamism axis with interest. » (page)"
        - "« Gerry Johnson and Kevan Scholes later reshaped it into the clean power-interest grid practitioners recognise today, set out in Exploring Corporate Strategy » (Origins and history)"
    - author: "Roman Pichler : dire non"
      text: "Dire non fait partie du rôle. Écouter d'abord pourquoi la demande compte, la ramener à l'objectif produit, ne pas trancher dans la précipitation, chercher un terrain commun sans couper la poire en deux. Pichler parle des « product people », pas de Scrum."
      refs: ["S4"]
      verified:
        - "« Saying no is a firm part of our job as product people » (introduction) ; « empathise with the individual before you offer an answer » (Empathise with the Stakeholder) ; « consider if the feature is aligned with the product goal » (Reframe the Conversation) ; « Don't Rush the Decision » ; « Try to Find Common Ground, but Don't Split the Difference » (titres)"
    - author: "PMI : le sponsor comme voie d'escalade"
      text: "En gestion de projet, pour ce qui dépasse le responsable du projet, le sponsor sert de voie d'escalade. Cadre de projet, pas Scrum ; le cours le transpose au PO et au produit."
      refs: ["S11"]
      verified:
        - "« For issues that are beyond the control of the project manager, the sponsor serves as an escalation path. » (page)"
  course:
    - text: "Les cinq catégories de parties prenantes d'un produit data : utilisateurs, financeur, sponsor, équipes voisines, fournisseurs de données. Un même acteur peut en cumuler plusieurs. Choix du cours, sans source externe : la définition large de Freeman ne fonde pas ce découpage."
      refs: []
    - text: "Dire non, c'est dire « pas maintenant », en montrant où est la demande et pourquoi. Ni le Guide ni Pichler ne le formulent ainsi."
      refs: ["S1", "S4"]
      verified:
        - "« Ensuring that the Product Backlog is transparent, visible and understood. » (Product Owner)"
        - "« consider if the feature is aligned with the product goal » (Reframe the Conversation)"
    - text: "Revoir l'ordre sur un fait nouveau n'est pas céder : c'est ordonner. Pichler n'en dit que l'écoute et le refus de la précipitation."
      refs: ["S4"]
      verified:
        - "« empathise with the individual before you offer an answer » (Empathise with the Stakeholder) ; « Don't Rush the Decision » (titre)"
    - text: "L'ordre des démarches pour un obstacle : d'abord la personne concernée (ce n'est pas encore une escalade), puis le Scrum Master, puis le sponsor. Aucune source consultée ne le donne."
      refs: ["S1", "S11"]
      verified:
        - "« Causing the removal of impediments to the Scrum Team's progress » (Scrum Master)"
        - "« For issues that are beyond the control of the project manager, the sponsor serves as an escalation path. » (page)"
    - text: "Le moment de passer à la marche suivante : la démarche a eu lieu et rien n'a changé à la fin du sprint en cours ; prévenir le Scrum Master sans attendre si l'obstacle empêche de livrer ce que l'équipe a prévu au sprint. Pas une règle Scrum."
      refs: []
    - text: "Un désaccord sur l'ordre de son propre backlog n'est pas un obstacle : le PO le tranche. Une dépendance bloquée dans le backlog d'une autre équipe est, elle, un obstacle pour la sienne."
      refs: ["S1"]
      verified:
        - "« The Product Owner is one person, not a committee. » ; « the entire organization must respect their decisions » (Product Owner)"
diagrams:
  - file: "parties-prenantes-cinq-familles.svg"
    title: "Le produit comme un tuyau"
    caption: "Un même acteur peut apparaître à plusieurs endroits, relié par un pointillé."
    subconcept: "14a"
  - file: "dire-non.svg"
    title: "Dire non : pas maintenant, pourquoi, où est la demande"
    caption: "Dire non à une partie prenante : sa demande reste visible dans le backlog, à sa place, et la réponse tient en trois cases : pas maintenant, pourquoi, où est la demande."
    subconcept: "14b"
  - file: "escalade-obstacle-marches.svg"
    title: "L'escalade d'un obstacle, en trois marches et un palier"
    caption: "L'escalade porte sur l'obstacle, jamais sur l'ordre : trois marches pour l'un, et pour un désaccord sur l'ordre de son propre backlog, que le PO tranche, aucune."
    subconcept: "14c"
---

## Objectif

Identifier les parties prenantes du produit, fournisseurs de données compris ; dire « pas maintenant » à l'une d'elles avec l'objectif produit et l'ordre du backlog ; escalader un obstacle au bon niveau, dans le bon ordre, et seulement un obstacle.

## L'essentiel

Une **partie prenante** est concernée par le produit : elle s'en sert, le finance, le porte, travaille à côté, ou lui fournit ses données ; ces fournisseurs, qu'on risque d'oublier, peuvent le bloquer. Le PO représente leurs besoins dans le backlog et tranche seul entre elles : dire non, c'est dire « pas maintenant », en montrant l'ordre et l'objectif produit. Un **obstacle**, que l'équipe ne lève pas seule, se traite d'abord avec la personne concernée, puis s'escalade : le Scrum Master, puis le sponsor. Un désaccord sur l'ordre de son propre backlog, lui, ne s'escalade pas : le PO le tranche. Une dépendance bloquée dans le backlog d'une autre équipe est, elle, un obstacle pour la sienne : on convainc d'abord l'autre PO, et l'escalade ne lui retire pas son ordre.

## 14a Qui sont-elles

*Cinq familles de parties prenantes, dont une qu'on risque d'oublier.*

Le Scrum Guide parle de parties prenantes connues sans les définir. Le concept 1b les définit comme toute personne ou équipe concernée par le produit. On élargit avec une définition de management [école] : quiconque peut agir sur l'organisation ou est touché par elle, fournisseurs compris (R. Edward Freeman). Le cours range celles d'un produit data en cinq catégories [cours] :

- les **utilisateurs**, les consommateurs de données en sont (concept 1a) ;
- le **financeur**, qui paie le service ;
- le **sponsor**, qui porte le budget du produit et porte plus haut les obstacles qui dépassent le PO ;
- les **équipes voisines**, qui travaillent à côté du produit et le consomment ou l'alimentent ;
- les **fournisseurs de données**, ceux dont le produit tire ses données.

Les fournisseurs sont ceux qu'on risque d'oublier (une erreur plausible, sans étude à l'appui) : ils ne demandent rien, mais peuvent bloquer ou dégrader le produit. Un même acteur peut cumuler plusieurs catégories. L'équipe Scrum elle-même (PO, Scrum Master, Developers) n'en fait pas partie : le Scrum Guide distingue l'équipe et les parties prenantes à qui elle présente son travail à la revue de sprint (concept 0a2).

![Le produit comme un tuyau](parties-prenantes-cinq-familles.svg)

La grille pouvoir et intérêt classe ensuite chacun selon son pouvoir sur le produit et son intérêt pour lui. C'est un choix d'école [école]. Elle est souvent attribuée à Mendelow, mais l'attribution est discordante : Mendelow croisait le pouvoir et le dynamisme, et la forme pouvoir et intérêt vient de Johnson et Scholes, selon des sources secondaires concordantes. On la nomme sans l'enseigner.

> **Fil rouge :** La météo (la pluie, par heure), source envisagée et pas encore collectée, viendrait d'un service externe, dont le produit dépendrait pour cette donnée sans que ce service lui demande rien.

## 14b Arbitrer et dire non avec l'objectif produit

*Dire non sans fermer la porte : pas maintenant, pourquoi, et où est la demande.*

Le PO tranche entre les parties prenantes, et l'organisation respecte ses décisions, visibles dans l'ordre du backlog qu'il rend transparent (concept 13 pour l'ordre lui-même). Comment dire non est une pratique, celle de Roman Pichler [école] : écouter d'abord pourquoi la demande compte, la ramener à l'objectif produit, ne pas trancher dans la précipitation, chercher un terrain commun sans couper la poire en deux.

Le cours résume : dire non, c'est dire **« pas maintenant »** [cours]. Une bonne réponse tient en trois cases :

- **pas maintenant**, pas « jamais » ;
- **pourquoi** : l'objectif produit, ce qui est prêt, ce qui manque ;
- **où est la demande** : au backlog, à une place que la partie prenante peut voir.

Les faits que détient une partie prenante se demandent à elle : le PO ne les fixe pas. Les Developers choisissent avec le PO ce qui entre au sprint (concept 0a2, repris au concept 15) : on ne promet pas à l'avance ce qui n'est pas décidé. Le sponsor, enfin, convainc le PO comme les autres : il porte le budget, pas l'ordre.

![Dire non : pas maintenant, pourquoi, où est la demande](dire-non.svg)

## 14c Escalader un obstacle

*Qui saisir, dans quel ordre, et quand : seulement pour un obstacle.*

Un **obstacle** bloque l'équipe et elle ne le lève pas seule. Le Scrum Master fait lever les obstacles et lève les barrières entre l'équipe et les parties prenantes (Scrum Guide). En gestion de projet, le sponsor sert de voie d'escalade pour ce qui dépasse le responsable [école] (PMI). Le Guide ne dit pas dans quel ordre saisir qui : le cours propose trois marches [cours].

1. **La personne concernée**, de vive voix. Ce n'est pas encore une escalade : il s'agit de comprendre ce qui bloque. Une relance ne dit pas ce qui bloque.
2. **Le Scrum Master**, si cela bloque encore : il réunit les personnes et rend l'obstacle visible.
3. **Le sponsor**, si cela bloque toujours : il peut porter le désaccord à l'instance où se tranchent les désaccords entre services.

On passe à la marche suivante quand la démarche a eu lieu et que rien n'a changé à la fin du sprint en cours. On prévient le Scrum Master sans attendre dès que l'obstacle empêche de livrer ce que l'équipe a prévu. Une relance par message n'est pas une démarche nouvelle. On ne contourne pas la personne concernée. Sans Scrum Master, la marche du milieu revient à qui répond du fonctionnement de l'équipe.

L'escalade porte sur l'obstacle, jamais sur l'ordre. Un **désaccord sur l'ordre de son propre backlog** n'est pas un obstacle : le PO le tranche, et le remonter au sponsor lui rendrait l'ordre. Une **dépendance bloquée dans le backlog d'une autre équipe** est, elle, un obstacle pour la sienne : on convainc d'abord l'autre PO, et l'escalade ne lui retire pas son ordre.

![L'escalade d'un obstacle, en trois marches et un palier](escalade-obstacle-marches.svg)

## Pièges

- **Oublier les fournisseurs de données** : ils ne demandent rien, mais peuvent bloquer ou dégrader le produit.
- **Confondre équipe Scrum et parties prenantes** : l'équipe fait le travail ; les parties prenantes le reçoivent ou le rendent possible.
- **Dire oui à tout**, ou couper le sprint en deux pour contenter chacun : personne n'est servi.
- **Dire non sans la suite**, ou s'abriter derrière son autorité : « non » sans pourquoi ni place de la demande ressemble à un rejet. Le PO tranche seul, mais il doit le pourquoi.
- **Laisser le sponsor ordonner le backlog** parce qu'il porte le budget : il convainc comme les autres.
- **Escalader d'emblée**, par-dessus la personne concernée : on ne sait même pas ce qui bloque. Ou **attendre sans rien dire** : un obstacle qui dure sprint après sprint sans démarche nouvelle reste invisible.
- **Escalader un désaccord sur l'ordre de son propre backlog** : ce n'est pas un obstacle, le PO le tranche. Une dépendance bloquée dans le backlog d'une autre équipe, elle, s'escalade, sans retirer son ordre à l'autre PO.
- **Trancher un fait d'une partie prenante** (la date d'une échéance, une règle, une autorisation d'accès) : cela se demande à qui le détient.

## Le test rapide

> « Quelque chose bloque-t-il l'équipe, qu'elle ne lève pas seule ? » Si oui, c'est un obstacle, y compris une dépendance bloquée dans le backlog d'un autre PO : ai-je parlé d'abord à la personne concernée, puis escaladé au Scrum Master, avant le sponsor ? Si non, c'est un désaccord sur l'ordre de mon backlog : je le tranche, et ma réponse dit « pas maintenant », pourquoi, et où est la demande.

Formulation du cours : le Scrum Guide ne donne ni test, ni ordre d'escalade.
