---
description: "Les six critères INVEST pour juger une user story, le réflexe du mot flou quand plusieurs lettres restent douteuses, et la différence entre solution négociable et contrainte."
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "Ne parle ni d'INVEST ni de story. Dit qu'un élément du backlog que l'équipe peut terminer en un sprint est prêt à être choisi au Sprint Planning, et que les Developers qui feront le travail en estiment la taille."
      refs: ["S2"]
      verified:
        - "« INVEST » absent du texte, sauf dans « Investments » (biographie des auteurs) ; « story » absent du texte (recherche du 2026-10-22) ; « Product Backlog items that can be Done by the Scrum Team within one Sprint are deemed ready for selection in a Sprint Planning event » ; « The Developers who will be doing the work are responsible for the sizing. » (Product Backlog)"
    - author: "Pratique établie, hors du Scrum Guide"
      text: "INVEST est une grille de Bill Wake (2003, milieu XP), reprise par d'autres praticiens, dont Mike Cohn. Wake la présente comme un aide-mémoire, pas comme une règle. Il l'ouvre sur les 3C de Ron Jeffries (concept 5) : la carte n'est pas toute la story."
      refs: ["S1", "S3"]
      verified:
        - "« I developed the INVEST acronym, and wrote this article in April and August, 2003 » ; « The INVEST and SMART acronyms can remind teams » ; « It would be easy to mistake the story card for the \"whole story,\" but Ron Jeffries points out that stories in XP have three components: Cards […], Conversation […], and Confirmation (tests that verify them) » (article)"
        - "« a widely accepted set of criteria, or checklist, to assess the quality of a user story » (page)"
  school:
    - author: "Bill Wake : la taille d'une story (S)"
      text: "Chez Wake, une story représente au plus quelques semaines-personnes de travail. Certaines équipes visent quelques jours-personnes, et Wake le signale lui-même. Ce sont deux repères à ne pas mêler."
      refs: ["S1"]
      verified:
        - "« Stories typically represent at most a few person-weeks worth of work. » ; « (Some teams restrict them to a few person-days of work.) » (article)"
    - author: "XP : l'exploration bornée (spike)"
      text: "Venue d'XP, pour une question technique ou de conception et pour fiabiliser une estimation. L'usage varie selon les écoles : le guide de Microsoft (Visual Studio 2010) l'emploie aussi pour une question métier. Elle se traite au concept 17."
      refs: ["S1", "S4", "S6"]
      verified:
        - "« split a story into a (time-boxed) \"spike\" that will give the team enough information to make a decent estimate » (article)"
        - "« Create spike solutions to figure out answers to tough technical or design problems » ; « The goal is reducing the risk of a technical problem or increase the reliability of a user story's estimate » (page)"
        - "« understand what 'book award travel' means » (page)"
  course:
    - text: "Le repère de taille du cours : une story tient dans un sprint (concept 4). Ce sont les Developers qui en jugent."
      refs: ["S2", "S3"]
      verified:
        - "« Product Backlog items that can be Done by the Scrum Team within one Sprint are deemed ready for selection in a Sprint Planning event » ; « The Developers who will be doing the work are responsible for the sizing. » (Product Backlog)"
        - "« so as to fit within an iteration » (page)"
    - text: "Quand plusieurs lettres (E, S, T) restent douteuses ensemble, chercher le mot flou dont elles dépendent plutôt que de les cocher. Règle pratique du cours, sans source externe ; Wake lie seulement E à la compréhension, S au périmètre connu et T à la clarté."
      refs: ["S1"]
      verified:
        - "« it's hard to estimate a story we don't understand » ; « it seems to be too hard to know what's in the story's scope » ; « If a customer doesn't know how to test something, this may indicate that the story isn't clear enough » (article)"
    - text: "Le PO fait préciser le mot flou par l'utilisateur concerné, avant le sprint ; ni lui ni les Developers ne le fixent. Parti pris du cours, posé en 7a2."
      refs: ["S2"]
      verified:
        - "« breaking down and further defining Product Backlog items into smaller more precise items » (Product Backlog)"
    - text: "« Négociable » ne veut pas dire « tout est ouvert » : une contrainte réelle d'usage ne se négocie pas, et elle s'écrit dans un critère d'acceptation, sans nommer de solution. Règle pratique du cours, sans source externe."
      refs: []
    - text: "Le cours range aussi sous I le travail d'une autre équipe dont la story a besoin. Choix du cours : chez Wake, I ne vise que les autres stories."
      refs: ["S1"]
      verified:
        - "« we'd like them to not overlap in concept, and we'd like to be able to schedule and implement them in any order » (article)"
diagrams:
  - file: six-lettres-invest.svg
    title: "Les six lettres d'INVEST"
    caption: "Trois lettres douteuses à la fois (E, S, T) pointent souvent vers un seul mot non fixé dans la story ; une fois ce mot précisé par l'utilisateur concerné, avant le sprint, elles se tranchent."
    subconcept: 7a
---

## Objectif

Juger une story avec les six critères d'INVEST ; quand plusieurs lettres restent douteuses, trouver le mot flou dont elles dépendent et le faire préciser par l'utilisateur concerné ; distinguer, pour le N, la solution (négociable) de la contrainte (qui va dans un critère d'acceptation).

## L'essentiel

INVEST donne six critères pour juger une story : **I**ndependent (elle ne dépend pas d'une autre story, autant que possible ; le cours y range aussi le travail d'une autre équipe dont elle a besoin), **N**egotiable (elle porte le besoin, pas les détails de la solution), **V**aluable (elle a de la valeur pour l'utilisateur), **E**stimable (les Developers peuvent l'estimer assez pour l'ordonner et la planifier), **S**mall (elle est petite : chez Wake, au plus quelques semaines-personnes ; repère du cours : elle tient dans un sprint, concept 4), **T**estable (on saurait écrire un test qui dit si elle est faite). C'est une grille de Bill Wake (2003, milieu XP), un aide-mémoire plutôt qu'une règle de Scrum. Elle sert à juger une story, lettre par lettre. Quand E, S et T restent douteux ensemble, c'est souvent **un même mot flou** : on le fait préciser, on ne coche pas.

![Les six lettres d'INVEST](six-lettres-invest.svg)

## 7a Les six lettres et le mot flou

*Six questions pour juger une story, et un réflexe quand plusieurs réponses restent floues.*

### 7a1 Les six lettres

- **I, Independent.** La story ne chevauche pas les autres et peut se planifier dans n'importe quel ordre, autant que possible. Le cours y range aussi le travail d'une autre équipe dont elle a besoin (chez Wake, I ne vise que les autres stories). Wake reconnaît qu'on n'y arrive pas toujours : une dépendance ne condamne pas la story, elle s'écrit et se traite (concept 10).
- **N, Negotiable.** Elle porte le besoin, pas les détails de la solution (voir concept 7b).
- **V, Valuable.** Elle a de la valeur pour l'utilisateur. Wake dit « le client » ; l'utilisateur est la lecture du cours. L'Agile Alliance glose ce V par « valuable (or vertical) » : le découpage vertical s'étudie au concept 9.
- **E, Estimable.** Les Developers peuvent l'estimer assez pour que le PO l'ordonne et la planifie. Pas besoin d'une estimation exacte : on estime mal ce qu'on ne comprend pas.
- **S, Small.** Elle est petite. Trois repères, à ne pas mêler : chez Wake, au plus quelques semaines-personnes [école] ; certaines équipes visent quelques jours-personnes, et Wake le signale lui-même ; le repère du cours est qu'elle **tient dans un sprint** [cours] (concept 4). « Quelques jours » est donc la règle de certaines équipes, pas celle d'INVEST.
- **T, Testable.** On saurait écrire un test qui dit si elle est faite. Si le client ne sait pas comment la tester, la story n'est peut-être pas assez claire (ses critères s'écrivent au concept 8).

Le PO ne coche pas E et S seul : le Scrum Guide confie l'estimation de la taille aux Developers, le PO peut les aider à comprendre les compromis.

### 7a2 Le mot flou

Quand E, S et T restent douteux **ensemble**, ils dépendent souvent d'un même mot que personne n'a fixé : « rapidement », « récent », « important » (exemples inventés). Wake lie E à la compréhension (on estime mal ce qu'on ne comprend pas), S au périmètre connu et T à la clarté (si on ne sait pas tester, la story n'est pas assez claire). Un seul mot flou peut donc faire douter des trois.

Cocher « OK » ne règle rien : on **cherche le mot**, puis on le fait préciser. Ce réflexe est une règle pratique du cours [cours], pas un texte de Wake. Qui précise ? Ni le PO, qui ne l'invente pas, ni les Developers, qui estiment sans fixer le besoin : c'est **l'utilisateur concerné**, que le PO interroge avant le sprint (concept 15). En attendant, la story attend.

Une même question aide à le repérer : un testeur qui ne connaît que la story peut-il dire « fait » ou « pas fait » sans rien demander ? Si un mot l'oblige à poser une question, c'est lui.

## 7b N : le besoin, pas la solution

*La story fixe le besoin ; une contrainte réelle ne se négocie pas, et elle s'écrit dans un critère.*

N veut dire que la story n'est pas un contrat de fonctions : elle porte l'essentiel, et les détails se construisent avec l'équipe, jusque pendant la réalisation (Wake). Dans la lecture du cours, la story fixe le besoin, et ce qui relève de la **solution** (le canal, la forme, l'outil) reste ouvert à la discussion. Écrire la solution dans la story, ou dans un critère, empêche l'équipe de proposer mieux [cours].

Mais **négociable ne veut pas dire tout ouvert** [cours]. Une **contrainte** est une exigence réelle de l'usage, qui ne se négocie pas. Elle n'est pas une solution : plusieurs solutions peuvent la respecter. Elle s'écrit dans un **critère d'acceptation**, sans nommer de solution, pour que le testeur la lise (concept 8). La phrase de la story, elle, ne change pas : elle reste le besoin.

Exemple inventé pour l'illustration : un régulateur consulte une vue depuis sa camionnette, sur un petit écran. « Se lire sur un petit écran » est une contrainte, qui va dans un critère ; un tableau, une liste ou une carte sont des solutions, que l'équipe peut proposer.

## Pièges

- **Cocher E et S « OK » sans pouvoir le vérifier** : si plusieurs lettres dépendent d'un même mot flou, c'est ce mot qu'il faut creuser, puis faire préciser par l'utilisateur concerné.
- **Fixer soi-même le mot flou**, ou le laisser fixer par les Developers : l'utilisateur concerné le précise, avant le sprint. Le PO le lui fait préciser (concept 15) ; la story attend.
- **Juger E et S à la place des Developers** : ce sont eux qui estiment la taille.
- **Donner S en jours** comme si c'était la grille : chez Wake, c'est au plus quelques semaines-personnes ; quelques jours-personnes, c'est le choix de certaines équipes ; le repère du cours est le sprint.
- **Écrire la solution dans la story ou dans le critère** (« un export CSV chaque matin ») : l'équipe ne peut plus proposer mieux. Écrire le besoin ; la contrainte réelle va dans un critère.
- **Croire que négociable veut dire tout ouvert** : la contrainte d'usage ne se négocie pas (par exemple, se lire sur un petit écran, cas inventé).
- **Rejeter une story parce qu'elle dépend d'une autre équipe** : I se tient autant que possible ; la dépendance s'écrit et se traite (concept 10).
- **Prendre INVEST pour une règle de Scrum** : c'est un aide-mémoire de Wake, absent du Scrum Guide.

## Le test rapide

> Un testeur qui ne connaît que la story et ses critères peut-il dire « fait » ou « pas fait » sans poser de question ? Les Developers peuvent-ils dire si elle tient dans un sprint ? Si l'une des réponses est non, cherche le mot dont elles dépendent.

Formulation du cours, appuyée sur le T de Wake (« je pourrais écrire un test »).
