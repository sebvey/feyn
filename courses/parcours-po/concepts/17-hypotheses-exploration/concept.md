---
description: "Comment distinguer une hypothèse de valeur d'une hypothèse de faisabilité, borner une exploration avant de la lancer, et fixer un critère d'acceptation sur un résultat incertain."
stances:
  consensus:
    - author: "Le Scrum Guide 2020"
      text: "Scrum repose sur l'empirisme : la connaissance vient de l'expérience et on décide sur ce qu'on observe ; dans un environnement complexe, ce qui va arriver est inconnu. Le Guide ne parle ni de spike ni de découverte. Il ne nomme les hypothèses (assumptions) qu'à la rétrospective, pour celles qui ont égaré l'équipe dans sa façon de travailler, pas pour les hypothèses du produit."
      refs: ["S1"]
    - author: "Pratique établie, hors du Scrum Guide"
      text: "Repérer et valider les hypothèses du produit fait partie du travail du PO (objectifs d'apprentissage du CSPO de Scrum Alliance), et les façons de les valider se comparent par leur coût et par la qualité de ce qu'on apprend."
      refs: ["S2"]
    - author: "Pratique établie en analyse de données (CRISP-DM, guides de Google)"
      text: "La réussite d'une analyse de données se dit par un niveau atteint (une précision de prévision, par exemple), mesuré sur des données mises de côté, et distinct des critères de réussite du métier. Le seuil d'une alerte se choisit en pesant le coût d'une fausse alerte et celui d'un cas manqué, avec les utilisateurs. CRISP-DM met en garde contre les objectifs inatteignables et admet que les critères changent au fil de l'analyse. Cette pratique ne dit pas à quel moment on fixe le niveau."
      refs: ["S10", "S12", "S13", "S14"]
  school:
    - author: "Marty Cagan : les quatre grands risques"
      text: "Valeur (les utilisateurs choisiront-ils de s'en servir ?), utilisabilité (sauront-ils s'en servir ?), faisabilité (les ingénieurs peuvent-ils le construire avec le temps, les compétences et la technologie dont on dispose ?), viabilité (la solution marche-t-elle pour l'entreprise ?). Cagan veut qu'on les traite tôt, avant de construire. Il parle de product manager, pas de PO, et répartit les risques par rôle : valeur et viabilité au product manager, utilisabilité au designer, faisabilité à l'ingénieur principal."
      refs: ["S3"]
    - author: "L'exploration bornée (spike), venue d'XP"
      text: "Un travail limité dans le temps qui ne traite que la question posée, et qu'on s'attend à jeter ; d'abord pour une question technique ou de conception, que certains emploient aussi pour une question métier (concept 7). Certaines équipes la mettent au backlog produit, d'autres la gardent dans un autre élément. L'inventeur et la date ne sont pas vérifiés."
      refs: ["S4", "S5"]
    - author: "Marty Cagan : les prototypes"
      text: "Choisir la façon la plus rapide et la moins chère de tester une idée. Cagan en distingue plusieurs sortes, dont un prototype de faisabilité, écrit par les ingénieurs et qu'on peut jeter, et un prototype sur données réelles, utilisé pour de vrai par de vrais utilisateurs, pour prouver qu'une idée marche. Une maquette montrée à l'utilisateur ne prouve pas qu'il s'en servira : on dit une chose et on en fait une autre."
      refs: ["S8"]
    - author: "Teresa Torres : décider avant l'expérience"
      text: "Dire d'avance comment on jugera l'expérience et ce qu'on fera selon le résultat. Si toutes les réponses mènent à la même action, ne pas explorer. Torres fixe aussi avant le test le seuil qui dira s'il a réussi."
      refs: ["S6", "S7"]
    - author: "Teresa Torres : la découverte continue"
      text: "L'équipe qui construit le produit parle aux utilisateurs chaque semaine, par petites activités de recherche au service d'un résultat visé. Nommée ici, pas enseignée."
      refs: ["S9"]
    - author: "Eric Ries : le MVP"
      text: "La version d'un nouveau produit qui permet d'apprendre le plus sur ses clients pour le moindre effort : une manière d'apprendre parmi d'autres (concept 16b)."
      refs: ["S11"]
  course:
    - text: "Le cours retient deux des quatre risques, valeur et faisabilité, et range la donnée dans la faisabilité : existe-t-elle, est-elle assez bonne, assez fraîche ? Cagan ne parle pas de données."
      refs: ["S3", "S10"]
    - text: "Une exploration se décide avant sur trois points : la question, la durée, ce qu'on décidera selon la réponse. La question et l'action viennent de Torres, la durée du spike ; les réunir est un choix du cours."
      refs: ["S4", "S5", "S6"]
    - text: "Le PO pose la question, les Developers explorent."
      refs: ["S3", "S4", "S8"]
    - text: "Deux seuils à ne pas mêler : celui qui juge l'exploration (ce qui compte comme « oui »), fixé avant comme chez Torres, que le PO fait dire par les utilisateurs concernés sans le chiffrer (17b1) ; et le niveau qu'un critère d'acceptation exige de la fonction livrée, fixé après l'exploration, qui montre ce qu'on peut atteindre. Les guides de Google choisissent le seuil d'un modèle sur ses résultats mesurés, donc après la mesure : un appui, pas un consensus."
      refs: ["S6", "S7", "S10", "S13"]
    - text: "Un prototype se jette : il n'est pas une story livrée et ne remplit pas la DoD (17b2)."
      refs: []
neighbors:
  - author: "Deux sens du mot « prévision »"
    text: "La prévision des stations à risque est une fonction du produit pour Régis (concept 9). La prévision au sens du glossaire, ce que les Developers pensent livrer et quand, est celle du concept 16. Distinction de vocabulaire du cours."
    refs: []
diagrams:
  - file: exploration-bornee.svg
    title: "Une exploration bornée : une question, une durée, une décision"
    caption: "Dans une boîte dont la largeur est la durée fixée avant, les Developers explorent la question du PO, et la réponse mène à une décision dite d'avance."
    subconcept: 17b1
  - file: deux-seuils.svg
    title: "Deux seuils dans l'ordre du temps"
    caption: "Le seuil qui juge l'exploration est fixé avant elle, et le niveau exigé de la fonction livrée est fixé après."
    subconcept: 17c
---

## Objectif

Séparer ce qu'on sait de ce qu'on suppose, et dire si une supposition porte sur la valeur ou sur la faisabilité ; faire décider une exploration bornée avant qu'elle commence (question, durée, ce qu'on fera selon la réponse) ; accepter un résultat incertain par un critère sur un niveau atteint, que l'utilisateur concerné fixe après l'exploration.

## L'essentiel

Une **hypothèse** est ce qu'on tient pour vrai sans l'avoir vérifié. Une story peut en cacher deux sortes : sur la **valeur** (l'utilisateur s'en servira-t-il, et cela sert-il l'objectif produit ?) et sur la **faisabilité** (peut-on le construire, avec les données qu'on a ?). Avant d'investir, on vérifie ce qui pèse, au moindre coût : une **exploration bornée** répond à une question dans un temps fixé, elle ne livre pas de fonction. Le PO pose la question et dit ce qu'on décidera selon la réponse ; les Developers explorent. Une prévision n'est jamais sûre : on l'accepte sur un niveau atteint, fixé quand on sait ce qu'on peut atteindre, par l'utilisateur qui en paie les erreurs.

![Une exploration bornée : une question, une durée, une décision](exploration-bornee.svg)

![Deux seuils dans l'ordre du temps](deux-seuils.svg)

## 17a Savoir ou supposer

*Une story claire peut reposer sur des suppositions que personne n'a vérifiées.*

**Ce qu'on a vérifié, ce qu'on tient pour vrai.** Pour chaque affirmation qui soutient une story, une seule question sépare ce qu'on sait de ce qu'on suppose : qui l'a vérifié, et comment ? Si personne, c'est une hypothèse, même si tout le monde la répète. Une story peut être claire, et même prête au sens de la DoR (concept 11b), sans être vérifiée. Le Scrum Guide pose l'empirisme (on décide sur ce qu'on observe) mais ne parle pas des hypothèses du produit ; repérer et valider celles-ci fait partie du travail du PO selon les référentiels de PO, et pour Scrum.org l'objectif produit est lui-même une hypothèse, qu'on peut reformuler sans que ce soit un échec (choix d'école, concept 2).

**Valeur ou faisabilité.** Marty Cagan [école] nomme quatre grands risques : valeur, utilisabilité, faisabilité, viabilité, et veut qu'on les traite tôt, avant de construire. Le cours en retient deux [cours]. La **valeur** : l'utilisateur s'en servira-t-il, et cela sert-il l'objectif produit ? La **faisabilité** : peut-on le construire, avec des données qui existent, assez bonnes et assez fraîches ? Ce rangement des données dans la faisabilité est un choix du cours, Cagan n'en parle pas.

Pour ranger une supposition, on se demande ce qui se passe si elle est fausse : on ne sait pas le construire (faisabilité), ou on le construit pour rien (valeur). Une même phrase peut cacher les deux. Exemple inventé pour l'illustration : « on enverra un SMS de disponibilité, et les abonnés sans l'appli iront à une station où il reste des vélos » suppose d'abord que le SMS arrive avec une disponibilité assez fraîche (faisabilité), puis que ces abonnés changeront d'itinéraire (valeur). La disponibilité vient de la plateforme ; le canal relève de l'équipe appli. Le PO ne tranche pas une hypothèse, même plausible : il la fait vérifier.

> **Fil rouge :** Dans le fil rouge, la disponibilité par station vient de la plateforme (règle fixée : un vélo à quai et louable) ; la livrer à Abba par SMS, serveur vocal ou appli dépend de l'équipe appli.

## 17b Explorer à moindre coût

*Décider l'exploration avant de la lancer, puis choisir la façon d'explorer selon l'hypothèse.*

### 17b1 Décider l'exploration avant

Une exploration bornée (spike, venue d'XP) [école] répond à une question dans un temps fixé. Elle livre une réponse, pas une fonction, et ce qu'elle produit se jette souvent. Le temps fixé borne le coût ; au terme, on décide, parfois d'explorer encore. Certaines équipes la mettent au backlog produit, où elle s'ordonne comme le reste (concept 13), d'autres la gardent dans un autre élément. Mike Cohn compte d'ailleurs l'apprentissage parmi les facteurs d'ordre : ce que l'équipe apprend en faisant l'élément.

Le cours la décide avant sur trois points [cours] : la **question**, la **durée**, et ce qu'on **décidera selon la réponse**, y compris ce qui compte comme « oui ». Teresa Torres [école] en donne l'idée : si toutes les réponses mènent à la même décision, inutile d'explorer. Une exploration sans question ni décision n'a pas de fin, et rien ne change à son terme. Le PO pose la question ; les Developers explorent, et disent le temps qu'il leur faut.

Ce qui compte comme « oui » est un seuil, qui juge l'exploration : il se dit avant. Le PO ne le chiffre pas, il le fait dire par les utilisateurs concernés, comme toute règle métier (concept 8a2). Il ne se confond pas avec le niveau exigé de la fonction livrée, qui se fixe après (17c).

### 17b2 Choisir la façon d'explorer

La façon d'explorer se choisit selon l'hypothèse, en pesant ce qu'elle coûte et ce qu'elle apprend (référentiel de PO). Pour une question de **faisabilité** sur des données qu'on a déjà, une analyse d'historique répond sans rien construire [cours]. Pour la **valeur**, Cagan [école] distingue plusieurs prototypes. Une maquette montrée à l'utilisateur ne prouve pas qu'il s'en servira : on dit une chose et on en fait une autre. Un prototype sur données réelles, utilisé pour de vrai par de vrais utilisateurs, montre si l'idée marche.

Un « oui » de l'utilisateur ne vérifie pas la valeur : on observe ce qu'il fait. Le MVP de Ries (concept 16b2) est une autre manière d'apprendre au moindre coût. Un prototype se jette ; le cours en tire qu'il n'est pas une story livrée et ne remplit pas la DoD [cours]. La découverte continue de Torres, où l'équipe parle aux utilisateurs chaque semaine, est nommée ici sans être enseignée.

## 17c Accepter un résultat incertain

*Une prévision se trompe parfois : le critère porte sur un niveau atteint, fixé par celui qui en paie les erreurs.*

**Un niveau atteint, pas une prévision sûre.** Une prévision n'est jamais sûre : dans un environnement complexe, dit le Scrum Guide, ce qui va arriver est inconnu. Une story qui exige une prévision sans erreur ne se finit donc jamais. Le critère d'acceptation porte sur un **niveau atteint**, mesuré sur des données mises de côté (une part de l'historique, par exemple) : c'est une pratique établie en analyse de données [consensus], hors du Scrum Guide.

Ce niveau tient compte des deux erreurs d'une alerte : la fausse alerte, et le cas manqué. Elles ne pèsent pas forcément pareil, et ne compter qu'une sorte d'erreur laisse passer des niveaux qu'on ne voudrait pas. Pour une même précision affichée, deux réglages peuvent donc coûter très différemment à l'utilisateur.

**Qui le fixe, et quand.** Le niveau se fixe **après** l'exploration, qui montre ce qu'on peut atteindre : fixé avant, il peut être inatteignable ou trop modeste [cours]. CRISP-DM fixe ses critères au départ mais prévient contre les objectifs inatteignables et admet qu'ils changent ; les guides de Google choisissent le seuil d'un modèle sur ses résultats mesurés. Ces deux appuis ne font pas un consensus sur le moment.

Il se fait fixer par l'**utilisateur concerné**, celui qui paie les erreurs [cours]. Le PO apporte le compromis dans les mots de cet utilisateur et le fait fixer ; il ne choisit ni le chiffre ni le réglage (concept 8a2). De même, ce que montre l'historique ne fixe pas une règle métier : il l'éclaire, et l'utilisateur concerné décide de ce qu'on en fait.

Deux seuils sont donc à ne pas mêler : celui qui juge l'exploration, fixé avant, et le niveau exigé de la fonction livrée, fixé après.

## Pièges

- **Prendre une phrase répétée pour un fait** (« tout le monde sait que… ») : demander qui l'a vérifié.
- **Ne voir que la faisabilité** : un profil data vérifie volontiers que le modèle marche, plus rarement que l'utilisateur s'en servira.
- **Trancher une hypothèse soi-même**, ou mener l'exploration à la place des Developers : le PO pose la question, il ne fixe pas seul la durée. Le PO fait vérifier une hypothèse ; il ne dit pas si elle est vraie. Les Developers explorent et disent le temps qu'il leur faut.
- **Explorer sans question ni décision**, ou attendre une fonction d'une exploration : elle livre une réponse ; la fonction est une autre story. Sans question ni décision, elle n'a pas de fin, et rien ne change à son terme.
- **Croire qu'un « oui » de l'utilisateur vérifie la valeur** : on observe ce qu'il fait.
- **Fixer le niveau d'une prévision avant l'exploration**, ou le fixer soi-même : il se fixe après, par l'utilisateur concerné.
- **Exiger qu'une prévision ne se trompe pas**, ou ne compter qu'une sorte d'erreur : il faut les fausses alertes et les cas manqués.
- **Croire qu'une donnée ou une exploration fixe une règle métier**, ou mêler le seuil qui juge l'exploration et le niveau exigé de la fonction : elle l'éclaire, l'utilisateur concerné la fixe. Ce qui compte comme « oui » pour l'exploration est dit avant par l'utilisateur concerné (17b1), le niveau exigé de la fonction est fixé après (17c). Le PO ne chiffre ni l'un ni l'autre.
- **Confondre la prévision des stations à risque** (concept 9) **avec la prévision des Developers** (concept 16c).

## Le test rapide

> Pour cette story, quelle phrase tiens-tu pour vraie sans l'avoir vérifiée, et que décideras-tu si elle est fausse ?

Formulation du cours, sans équivalent dans les sources. Si l'apprenant n'en trouve aucune, ou ne sait pas ce qu'il ferait, il n'a pas séparé ce qu'il sait de ce qu'il suppose.
