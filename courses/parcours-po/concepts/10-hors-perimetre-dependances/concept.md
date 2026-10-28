---
description: "Comment écrire ce qu'une story ne fait pas, que faire de la demande qui en sort, et comment traiter une dépendance entre deux stories ou envers une autre équipe."
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "Ne parle ni de hors périmètre ni de dépendance entre éléments du backlog. Dit qu'un élément choisi au Sprint Planning a en général été précisé avant, que le contenu du sprint peut encore se clarifier pendant le sprint avec le PO, et que la revue de sprint peut adapter le backlog, que le PO ordonne (concepts 0, 1 et 3)."
      refs: ["S1"]
    - author: "Pratique établie, hors du Scrum Guide"
      text: "Réduire les dépendances et rendre visibles celles qui restent. Bill Wake (le I d'INVEST), Mike Cohn et Scrum.org (le Nexus Guide, pour plusieurs équipes sur un même produit) concordent. Cohn donne deux façons de lever une dépendance entre deux stories : les fusionner, si la story fusionnée reste petite, ou les découper autrement. Il compte aussi les dépendances parmi ce qui pèse pour ordonner un backlog (concept 13)."
      refs: ["S3", "S4", "S5", "S7"]
  school:
    - author: "Une rubrique « Hors périmètre » dans la story"
      text: "Certaines équipes l'ajoutent, sans auteur attitré. Le Scrum Guide n'impose aucune forme aux éléments du backlog. Atlassian recommande une section voisine, « ce qu'on ne fait pas », dans un document d'exigences, pas dans une story."
      refs: ["S1", "S2"]
    - author: "La façon de noter une dépendance"
      text: "Un lien entre deux éléments dans l'outil (dans Jira, « blocks / is blocked by » ; détail à l'annexe A1)."
      refs: ["S10"]
    - author: "SAFe : l'ART Planning Board"
      text: "Ce cadre de passage à l'échelle affiche sur un tableau les dépendances entre les features de plusieurs équipes d'un même train. Hors de ce cours."
      refs: ["S8", "S9"]
  course:
    - text: "Ne mettre hors périmètre que les demandes plausibles : celles qu'un utilisateur ou une partie prenante pourrait croire incluses. Une évidence que personne n'attend n'a pas sa place dans la liste."
      refs: ["S2"]
    - text: "Écrit avant le sprint, le hors périmètre aligne les attentes : à la revue, personne ne découvre un manque convenu."
      refs: ["S2"]
    - text: "Quand la story dont l'autre dépend a une valeur seule, garder les deux et les ordonner plutôt que les fusionner. Quand aucune des deux n'en a, redécouper en tranches verticales."
      refs: ["S4"]
    - text: "Entre deux produits, chacun avec son PO, s'accorder entre PO sur l'ordre dans les deux backlogs. Le Scrum Guide ne traite pas ce cas."
      refs: ["S1", "S7"]
neighbors:
  - author: "Plusieurs équipes sur un même produit"
    text: "Elles partagent le même PO et le même backlog (Scrum Guide, Nexus Guide). Ce n'est pas le cas traité ici : deux produits, chacun avec son PO et son backlog."
    refs: ["S1", "S7"]
diagrams:
  - file: "hors-perimetre.svg"
    title: "Le hors périmètre d'une story"
    caption: "Le hors périmètre : au bord de la story, ce qu'on pourrait croire inclus ; chaque ligne devient une demande au backlog (cas inventé pour l'illustration)."
    subconcept: "10a"
  - file: "dependances.svg"
    title: "Les dépendances dans une équipe et entre deux équipes"
    caption: "Les dépendances : dans une équipe, le PO ordonne ; entre deux équipes, chaque PO ordonne le sien et les deux s'accordent sur l'ordre, et on ne va plus haut que si cela bloque (cas inventés pour l'illustration)."
    subconcept: "10b"
---

## Objectif

Écrire le hors périmètre d'une story et dire ce que devient la demande qui en sort ; traiter une dépendance, entre deux stories de l'équipe ou envers une autre équipe : l'écrire, puis ordonner, ou s'accorder avec le PO de l'autre équipe.

## L'essentiel

Une story dit ce qu'elle fait ; son **hors périmètre** dit ce qu'elle ne fait pas alors qu'on pourrait s'y attendre. Écrit avant le sprint, il évite qu'un manque convenu passe pour un bug à la revue. Chaque ligne reste une demande : elle entre au backlog, où le PO l'ordonne. Une **dépendance** lie deux stories : l'une ne peut pas être livrée, ou n'a pas de sens, avant l'autre. Entre deux stories de l'équipe, le PO ordonne. Envers une autre équipe, il s'accorde avec le PO de cette équipe sur l'ordre.

![Le hors périmètre d'une story](hors-perimetre.svg)

![Les dépendances dans une équipe et entre deux équipes](dependances.svg)

## 10a Le hors périmètre

*Dire à l'avance ce qu'une story ne fait pas, et savoir où va chaque demande qui en sort.*

### 10a1 L'écrire

Le hors périmètre liste ce que la story ne fait pas alors qu'un utilisateur ou une partie prenante pourrait s'y attendre. On l'écrit quand on précise la story avant le sprint (concept 15). Une story qui affiche un indicateur sur un tableau de bord peut ainsi préciser : « Hors périmètre : l'export en fichier ; l'envoi par courriel » (exemple inventé pour l'illustration). Le lecteur sait alors ce qu'il n'aura pas, et ne l'apprend pas à la revue.

On n'y met que les demandes **plausibles**, celles qu'on pourrait croire incluses. « Hors périmètre : réécrire les systèmes sources » (autre exemple inventé) n'apprend rien à personne : une évidence n'a pas sa place dans la liste, pas plus qu'une tâche des Developers (concept 4). Cette règle est un choix du cours [cours]. Une ligne vague (« le reste ») est aussi à éviter : on ne sait plus ce qui est exclu.

La rubrique elle-même est un choix d'école [école] : le Scrum Guide n'en parle pas et n'impose aucune forme aux éléments du backlog. Certaines équipes l'ajoutent.

### 10a2 La retrouver à la revue

Quand une partie prenante réclame à la revue de sprint ce qui était écrit hors périmètre, la story n'a pas de défaut : elle fait ce qui était convenu. Le PO peut montrer la ligne écrite, et la demande, elle, va au backlog comme une nouvelle story. La revue sert justement à adapter le backlog [consensus].

Le PO ordonne ensuite cette demande face aux autres (concept 13). « Hors périmètre » n'est pas un refus : la demande reste une demande, ordonnée comme les autres. Si elle touche une règle qui n'est pas fixée, le PO la fait fixer plutôt que de la trancher en revue (concept 8a2).

## 10b Les dépendances

*Écrire la dépendance, puis ordonner ou s'accorder, selon qu'elle reste dans l'équipe ou non.*

### 10b1 Dans l'équipe : fusionner ou ordonner

Une story dépend d'une autre quand elle ne peut pas être livrée, ou n'a pas de sens, avant elle. On réduit les dépendances autant que possible (le I d'INVEST, concept 7), sans toujours y arriver. Pour en lever une, Mike Cohn donne deux voies [consensus] : fusionner les deux stories, si la story fusionnée reste petite, ou les découper autrement. Ce sont les Developers qui estiment la taille.

Une dépendance qui reste s'écrit, et le PO ordonne : l'élément dont l'autre dépend passe avant. Le cours [cours] ajoute un critère : si la première story a une valeur seule, on garde les deux et on les ordonne. Fusionner grossirait la story et retarderait la valeur de la première jusqu'à ce que la seconde soit prête. Si aucune des deux n'a de valeur seule (par exemple « préparer les relevés », puis « afficher les relevés », exemple inventé pour l'illustration), ce sont souvent des tranches horizontales : on les redécoupe en tranches verticales (concept 9).

### 10b2 Envers une autre équipe

Une dépendance envers une autre équipe ne se règle pas dans son seul backlog. Livrer sa part et tenir la story pour faite ne suffit pas, si l'utilisateur n'est pas servi. Le PO écrit la dépendance dans son backlog, demande à l'autre PO de l'écrire dans le sien, et s'accorde avec lui sur l'ordre dans les deux backlogs, pour que les deux parts arrivent à temps. Chaque PO ordonne seul son backlog : pour changer la place d'un élément chez l'autre, on le convainc.

Le Scrum Guide ne traite pas deux produits qui ont chacun leur PO : plusieurs équipes sur un même produit partagent le PO et le backlog. S'accorder entre PO est donc un choix du cours [cours]. Si l'accord ne se fait pas, ou si la dépendance bloque, on va plus haut, au niveau qui peut lever ce qui bloque (concept 14), après avoir parlé à l'autre PO. Dans l'outil, la dépendance se note souvent par un lien entre les deux éléments (annexe A1), ce qui est un choix d'école [école].

## Pièges

- **Ne rien écrire hors périmètre** : chacun comble les silences avec ses attentes, et la revue tourne au « c'est un bug ».
- **Lister des évidences ou des tâches** : le hors périmètre ne sert qu'aux demandes plausibles. Cas inventé : « Hors périmètre : réécrire les systèmes sources » n'apprend rien à personne ; une ligne vague (« le reste ») est aussi à éviter : on ne sait plus ce qui est exclu.
- **Prendre le hors périmètre pour un refus**, ou **traiter aussitôt** la demande qui en sort : elle entre au backlog et le PO l'ordonne comme les autres (concept 13). Une règle qu'elle soulève se fait fixer, pas trancher en revue (concept 8a2).
- **Fusionner deux stories pour supprimer une dépendance saine** : on retarde la valeur de la première. La fusion se défend si la story fusionnée reste petite.
- **Accepter deux stories dont aucune n'a de valeur seule** : ce sont souvent des tranches horizontales, à redécouper en tranches verticales (concept 9). Cas inventé : « préparer les relevés », puis « afficher les relevés ».
- **Livrer sa part d'une dépendance envers une autre équipe et s'arrêter là** : l'utilisateur n'est pas servi ; s'accorder avec le PO de l'autre équipe.
- **Ordonner le backlog d'une autre équipe à sa place**, ou aller plus haut avant de lui parler : on convainc son PO ; on ne va plus haut qu'ensuite (concept 14).
- **Croire que le Scrum Guide prescrit une rubrique « Hors périmètre » ou un outil de suivi des dépendances** : il n'en parle pas ; ce sont des choix d'école.

## Le test rapide

> Hors périmètre : « un utilisateur ou une partie prenante pourrait-il croire que c'est inclus ? »
> Si oui et que ce n'est pas le cas, la ligne s'écrit. Dépendance : « la story dont l'autre
> dépend a-t-elle une valeur seule ? » Si oui, garder les deux et ordonner ; si aucune n'en a,
> redécouper (concept 9). Envers une autre équipe :
> « son PO sait-il, et l'ordre est-il convenu entre nous ? »

Formulation du cours.
