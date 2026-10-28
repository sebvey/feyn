## Consignes

Annexe hors de l'ordre des concepts : chaque sous-concept se donne seul, quand l'apprenant en a
besoin, dans la boucle du cours (explication, exemple, question). Pas de rechange obligatoire.

1. **A1a les niveaux dans l'outil** (après 4a3, de soi-même ou quand l'apprenant demande comment
   régler ses niveaux ; avant 4a3, répondre en aparté et renvoyer au concept 4) : les niveaux par défaut de Jira et d'Azure DevOps ; l'équipe en choisit peu ; le
   niveau de trop se règle dans l'outil, sans le retirer forcément (« Coincés avec le niveau
   Feature ? »).
2. **A1b les liens de dépendance** (après 10b2) : le lien note une dépendance entre deux
   éléments, aussi entre les backlogs de deux équipes (rappel du cas de 10b2 : la story d'Abba,
   abonnée sans l'appli, comme un tiers des abonnés, dépend de l'équipe appli, dont Pia est la
   PO : la disponibilité par station vient de la plateforme, le canal relève de cette équipe) ;
   il ne remplace pas la conversation
   avec l'autre PO (« Dana a tracé le canal d'Abba »).
3. **A1c les états** (après 11, de soi-même ou quand l'équipe règle son tableau ;
   avant 11, répondre en aparté et renvoyer au concept 11) : choix d'équipe,
   modifiables ; « fait » veut dire DoD remplie ; un état « prêt » reste un repère, pas une
   barrière (« Le tableau proposé par Diego »).

Déjà enseigné, à rappeler sans le réenseigner, selon le point où se propose le sous-concept :
le PO ordonne seul, qui veut changer l'ordre le convainc (1b) ; les niveaux, qu'aucun guide
n'impose, et le niveau de trop (4a2, 4a3), dès A1a ; la dépendance envers l'équipe appli et l'accord avec l'autre PO (10b2), dès A1b ; DoD et DoR (11a, 11b), pour A1c. Nommés avec renvoi, sans
les enseigner : l'escalade (14c) ; la vie d'une story (refinement, Sprint Planning, revue :
concept 15) ; le travail sans sprint (annexe A2).

## Faits du fil rouge utilisés

Les vues d'Étienne ; la story d'Abba, dont la disponibilité par station vient de la plateforme
et le canal relève de l'équipe appli, dont Pia est la PO ; un tiers des abonnés n'a qu'un
téléphone basique ; la DoD de l'équipe vélos (heure de la dernière mise à jour sur chaque vue,
définition écrite de chaque indicateur publié) ; sa DoR (critères d'acceptation écrits, règles
métier fixées, dépendances identifiées, accès aux données obtenu). Les répliques de Dana et de
Diego, la répartition des features et le tableau proposé sont des propositions d'exercice.

## Banque d'exemples

Le fil rouge ne dit pas quel outil emploie l'équipe vélos : chaque exemple pose l'outil en
situation d'exercice (« dans cet exercice, … »), sans le fixer.

### Coincés avec le niveau Feature ? (A1a)
- **Explication** : les niveaux viennent de l'outil, pas de Scrum (concept 4a2). Jira a par
  défaut Epic > Story > Subtask ; Azure DevOps, en processus Agile, Epic > Feature >
  User Story > Task. Un niveau de trop (4a3) ne se retire pas toujours : dans Azure DevOps, un niveau
  hérité ne se supprime pas, mais chaque équipe choisit les niveaux qu'elle affiche, et le type
  peut être désactivé (réglage du processus, qui touche tous les projets qui l'emploient). Dans
  Jira, un niveau entre Epic et Story (Feature, par exemple) a été ajouté ou renommé chez
  l'équipe ; la hiérarchie se règle pour tous les espaces gérés par l'entreprise du site, et la
  changer casse les liens parent et enfant existants. Dans les deux outils, le PO dit ce qu'il
  veut et pourquoi, l'équipe choisit ses niveaux, l'administrateur de l'outil fait le réglage.
  Si l'apprenant est dans Jira, poser la situation dans Jira avec ces deux faits.
- **Situation** : dans cet exercice, l'équipe vélos travaille dans Azure DevOps, en processus
  Agile. Après quelques sprints, quatre des cinq features des vues d'Étienne ne contiennent
  qu'une story. Diego : « Azure ne permet pas de supprimer le niveau Feature : on doit
  continuer à créer une feature au-dessus de chaque story. »
- **Question** : que proposes-tu à l'équipe ?
- **Réponse attendue** : Diego a raison sur l'outil (un niveau hérité ne se supprime pas), pas
  sur la conclusion. Le signal du niveau de trop est là (4a3) : après avoir vérifié que ces
  features ne sont pas des stories mal classées, le PO propose que l'équipe n'affiche plus le
  niveau Feature et cesse d'en créer. Désactiver le type est un réglage du processus : il touche
  les autres projets qui l'emploient, il se voit avec l'administrateur. Le PO dit ce qu'il veut
  et pourquoi (deux éléments à écrire et à tenir pour un seul besoin), pas où cliquer ; l'équipe
  décide de ses niveaux. Nuance : on y revient si des features à plusieurs stories reviennent.
- **Erreurs fréquentes** :
  - donner raison à Diego (« c'est l'outil qui l'impose ») : demander « l'outil interdit-il de
    ne pas l'employer, ou le propose-t-il par défaut ? » ;
  - retirer le niveau User Story et garder les features : ce sont les stories qui entrent dans
    les sprints (4a1) ;
  - décider seul du réglage (« je le supprime moi-même »), ou le décrire clic par clic : donner
    le fait de l'outil (le réglage touche d'autres projets ou espaces), puis demander « qui
    décide de ne plus employer le niveau, et qui fait le réglage ? » ; le PO propose, l'équipe
    choisit, l'administrateur règle ;
  - réenseigner 4a3 : une ligne sur la vérification suffit.
- **Ce qui marche** : les trois sources de règles du concept 4a2 (le Scrum Guide : aucun
  niveau ; l'outil : des niveaux par défaut ; l'équipe : son choix), puis « ce que l'outil ne
  retire pas, l'équipe peut-elle cesser de l'employer ? ».

### Dana a tracé le canal d'Abba (A1b)
- **Explication** : une dépendance (concept 10b) se note par un lien entre deux éléments. Aucun
  des outils vérifiés n'a de lien « dépend de » : Jira dit « blocks / is blocked by », Azure
  DevOps « Predecessor / Successor », Linear « blocked / blocking ». Le lien peut relier des
  éléments de deux équipes, même dans deux espaces (Jira) ou deux projets (Azure DevOps)
  différents. Il rend la dépendance visible des deux équipes ; il ne remplace pas la
  conversation avec l'autre PO (choix du cours).
- **Situation** : dans cet exercice, les deux équipes travaillent dans le même Jira, chacune
  dans son espace. Pour la story d'Abba (concept 10b2), Dana crée elle-même, dans l'espace de
  l'équipe appli, un élément « canal pour les abonnés sans l'appli », le relie à la story de
  Abba par « is blocked by », et conclut : « C'est tracé, Pia le verra. »
- **Question** : que fais-tu de ce que Dana a tracé ?
- **Réponse attendue** : le lien se garde : il rend la dépendance visible des deux équipes, et
  dans le bon sens (la story d'Abba est bloquée par le canal). Mais l'élément créé dans le
  backlog de l'équipe appli n'est pas à Dana : c'est Pia qui inscrit le canal et lui donne sa
  place (10b2), on lui soumet l'élément, on ne le lui impose pas. Et un lien n'est pas un
  accord : le PO va voir Pia, lui présente le besoin (un tiers des abonnés n'a qu'un téléphone
  basique, sans l'appli) et s'accorde avec elle sur l'ordre ; le lien relie ensuite la story de
  Abba à l'élément que Pia garde. Si l'accord ne se fait pas : escalade (14c), sans
  l'enseigner ici.
- **Erreurs fréquentes** :
  - « c'est tracé, rien à faire » : demander « Pia sait-elle pourquoi ce besoin compte, et qui
    décide de sa place ? » ; si la réponse s'arrête là, « et alors, qui va voir qui ? » ;
  - supprimer le lien « puisqu'on va parler » : il sert, après l'accord, à suivre la
    dépendance ;
  - chercher un type de lien « dépend de », ou en faire créer un : « blocks / is blocked by »
    dit la même chose ;
  - exiger une date à Pia, ou escalader d'emblée : on la convainc d'abord (10b2, 14c).
- **Ce qui marche** : suivre le lien des deux côtés : « dans le backlog de Pia, qui a écrit cet
  élément, et qui l'a placé ? ».

### Le tableau proposé par Diego (A1c)
- **Explication** : les états d'un élément (Jira dit « statuts ») disent où il en est : à
  faire, en cours, fait, par exemple. Le Scrum Guide n'en parle pas ; chaque outil en propose
  par défaut, et l'équipe les change. Atlassian conseille d'en garder peu (conseil d'éditeur).
  Deux règles du cours : « fait » veut dire DoD remplie (11a) ; un état « prêt » reste un
  repère, pas une barrière (11b). Comme pour les niveaux, le PO dit ce qu'il veut et pourquoi,
  l'équipe choisit, l'administrateur de l'outil fait le réglage.
- **Situation** : la DoD de l'équipe vélos exige l'heure de la dernière mise à jour sur chaque
  vue et la définition écrite de chaque indicateur publié (sa règle de calcul, détaillée au
  concept 12). Dans cet exercice, Diego propose à
  l'équipe vélos quatre états : À faire, Prêt, En cours, Fait. « Une story passe en Prêt quand
  toutes ses questions sont réglées, et en Fait quand son code est fusionné. »
- **Question** : que proposes-tu de changer dans la proposition de Diego, et pourquoi ?
- **Réponse attendue** : les quatre états peuvent rester, c'est le choix de l'équipe et ils sont
  peu nombreux. « Fait » se change : une story est faite quand elle remplit la DoD (l'heure de
  la dernière mise à jour affichée, la définition de l'indicateur écrite), pas quand son code
  est fusionné ; sinon le tableau dit « fait » de ce qui n'entre pas dans l'incrément, et
  l'outil ne connaît pas la DoD (un tableau Scrum de Jira tient pour terminé ce qui est dans sa
  colonne la plus à droite). « Prêt » se change aussi : « toutes les questions réglées » en fait
  une barrière, la conversation continue pendant le sprint (les 3C, concept 5). Il suit la DoR
  de l'équipe (critères écrits, règles fixées, dépendances identifiées, accès obtenu), comme
  repère. Le PO propose ; l'équipe décide (en rétrospective, par exemple) ; l'administrateur
  règle.
- **Erreurs fréquentes** :
  - garder « Fait » au code fusionné, « la DoD se vérifie à part » : demander « à la revue, que
    dit le tableau d'une story fusionnée sans définition de l'indicateur ? » ;
  - ajouter un état par étape (en recette, validé par Étienne…) : chaque état se tient à jour, et
    les états ne racontent pas la vie d'une story (comment elle se précise, entre au sprint et
    passe en revue : concept 15) ;
  - supprimer « Prêt » parce que la DoR n'est pas dans le Scrum Guide : c'est un choix d'école,
    utile s'il reste un repère ;
  - ne corriger qu'un des deux états : demander « et l'autre ? ».
- **Ce qui marche** : lire chaque état comme une promesse à quelqu'un : « quand Étienne voit
  "Fait", que peut-il en attendre ? ».

## Schéma

Un schéma par sous-concept, tous dessinés sur un écran d'outil inventé pour l'illustration, à
montrer seulement à la demande de l'apprenant.

**A1a, les niveaux (ecran-niveaux.svg).** Un écran d'outil stylisé : une bande « Niveaux », puis
l'arbre Epic, Feature, User Story, Task, chaque ligne sous la précédente et plus étroite. La
ligne Epic, seule marquée, est légendée « le niveau de trop » (exemple inventé).

**A1b, les liens (ecran-liens.svg).** Deux backlogs côte à côte, « Une équipe » et « L'autre
équipe ». Une story du premier, en pointillé parce que bloquée, est reliée à un élément de
l'autre par une flèche « is blocked by ». Au-dessus, entre les deux, une bulle discrète :
« accord des deux PO ».

**A1c, les états (ecran-etats.svg).** Quatre cases de tableau (cas inventé), de gauche à
droite : Idée, Cadrée, Réalisation, Terminée. « Cadrée », au trait plein discret, est légendée
« repère : la DoR ». « Terminée », seule marquée, est légendée « DoD remplie ».
