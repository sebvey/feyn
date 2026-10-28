Le Scrum Guide 2020 [S1] ne parle ni de critère d'acceptation, ni de règle métier, ni de user
story : rien de ce concept ne relève du consensus Scrum. Que chaque story porte des critères
d'acceptation est une pratique établie (XP : la « confirmation » de Jeffries [S2] ; Wake [S3] ;
Cohn [S4]). La forme Given/When/Then est un choix d'école : Dan North et Chris Matts [S5], dans
le cadre du BDD ; Gherkin [S6] en est le langage outillé (Cucumber). « Specification by
Example » est un terme employé par Fowler dès 2004 [S9], popularisé par le livre de Gojko Adzic
(2011) [S8]. Séparer règles et exemples suit l'Example Mapping de Matt Wynne [S7]. Les faits du
fil rouge (Abba, Étienne, vélo disponible, station favorite, fraîcheur de moins de
15 minutes, rafraîchissement toutes les 5 minutes, seuil « presque vide ») sont inventés : ils
n'ont pas de source. Les sections entre parenthèses sont celles du fichier du concept.

## Affirmations

| Affirmation (section de `concept.md` ou de `teaching.md`) | Source | Ce qui a été vérifié | Nature |
|---|---|---|---|
| Le Scrum Guide ne parle pas de critère d'acceptation, de règle métier ni de story (Consensus et choix d'école) | [S1] | Texte web téléchargé et cherché le 2026-10-22 : « acceptance », « criteri », « business rule », « testable », « example » : 0 occurrence ; « story » : 0 (sources 05). Ce que le guide dit d'un élément prêt : « Product Backlog items that can be Done by the Scrum Team within one Sprint are deemed ready for selection in a Sprint Planning event » (renvoi aux concepts 4 et 11) | consensus |
| Une story porte des critères d'acceptation : pratique établie, pas un texte de consensus Scrum (Consensus et choix d'école) | [S2], [S3], [S4] | Jeffries : la confirmation, « This component is the acceptance test » (sources 05) ; Wake : « I understand what I want well enough that I could write a test for it » ; Cohn : les conditions de satisfaction sont « specific to a given product backlog item » | consensus |
| Critère d'acceptation et condition de satisfaction : presque synonymes | [S4] | « Acceptance criteria and conditions of satisfaction (CoS) are two terms that mean almost the same thing » | école |
| C'est le PO qui écrit les critères d'acceptation, ou qui en est le premier responsable | [S4] | « product owners are the people primarily responsible for creating conditions of satisfaction » ; avis de Cohn, pas du Scrum Guide. Le cours y ajoute la conversation avec l'équipe (3C, concept 5) | école |
| Given/When/Then : forme créée par Dan North et Chris Matts pour écrire les critères d'acceptation d'une story en scénarios (Consensus et choix d'école) | [S5] | « Matts and I » créent un modèle « to capture a story's acceptance criteria » : « Given some initial context (the givens), When an event occurs, Then ensure some outcomes ». Article paru dans *Better Software* en mars 2006 (colophon), en ligne daté du 20 septembre 2006 | école |
| Le BDD (behaviour-driven development) vient de Dan North (Consensus et choix d'école) | [S5], [S10] | North : « I started to refer to TDD as BDD, or behaviour-driven development ». Agile Alliance : « BDD is a practice where members of the team discuss the expected behavior of a system » | école |
| Given/When/Then reste utilisable sans outil (Consensus et choix d'école) | [S10] | Agile Alliance : modèle pour écrire les tests d'acceptation d'une story ; outils JBehave, RSpec, Cucumber ; « can also be used purely as a heuristic irrespective of any tool » | école |
| Gherkin : le langage à mots-clés (Given, When, Then) de l'outil Cucumber, qui rend les spécifications exécutables (Consensus et choix d'école) | [S6] | « Gherkin uses a set of special keywords to give structure and meaning to executable specifications ». Gherkin est un langage, Cucumber l'outil : écrire « outillé par Cucumber et son langage Gherkin » plutôt que « outillé par Gherkin » | école |
| Specification by Example : décrire les exigences par des exemples, popularisé par Gojko Adzic (Consensus et choix d'école ; le fichier du concept ne cite ni le livre, ni Fowler, ni les dates) | [S8], [S9] | Adzic, *Specification by Example*, Manning, juin 2011 : « a collaborative method for specifying requirements and tests ». Fowler, bliki du 18 mars 2004 : l'expression l'a frappé à un atelier XP/Agile Universe en 2002. Adzic n'a donc pas inventé le terme : ne lui attribuer que le livre | école |
| Un critère d'acceptation est une condition vérifiable, propre à une story, qui dit quand elle est faite (L'essentiel) | [S4], [S11] | Cohn : « specific to a given product backlog item » ; « what needs to be true in order for you to consider this particular story done? ». Définition du glossaire du cours [S11] | cours |
| Les critères rendent la story testable, le T d'INVEST (L'essentiel) | [S3] | Wake, T : « I understand what I want well enough that I could write a test for it » ; « If a customer doesn't know how to test something, this may indicate that the story isn't clear enough ». INVEST est enseigné au concept 7 | école |
| Une règle métier est une vérité du domaine, valable hors de la story et réutilisable (L'essentiel, 8a) | [S11] ; appui partiel [S6], [S7] | Définition du glossaire du cours, sans source externe. Gherkin : le mot-clé Rule représente « one business rule that should be implemented » (depuis Gherkin v6). « Valable hors de la story » est la formulation du cours | cours |
| Les critères sont souvent des exemples qui illustrent une règle (L'essentiel, Schéma) | [S7], [S6] | Wynne : règles sur cartes bleues, exemples sur cartes vertes, « For each rule, we may need one or more examples to illustrate it ». Gherkin : Rule regroupe des Example (« Scenario is a synonym of the keyword Example »). Chez Wynne, « rules » et « acceptance criteria » vont sur la même carte bleue : il ne sépare pas critère et règle comme le cours (voir « Non vérifié ») | école |
| Test rapide : « est-ce encore vrai si cette story n'existe pas ? » : règle (Le test rapide) | aucune | Heuristique du cours, sans source | cours |
| Le cas du schéma (un abonné loue un seul vélo à la fois, une location en cours, une durée maximale de location non fixée) est inventé pour l'illustration (L'essentiel, Schéma) | aucune | Cas d'illustration inventé, sans source | cours |
| Example Mapping : règles en bleu, exemples en vert, questions en rouge (Schéma) | [S7] | Wynne : cartes bleues pour les règles, vertes pour les exemples ; une question sans réponse va sur une carte rouge | école |
| Test rapide : « un testeur peut-il dire OK ou KO sans me poser de question ? » : critère (Le test rapide) | [S3] en partie | Découle du T de Wake (pouvoir écrire un test) ; la formulation est celle du cours | cours |
| Une contrainte d'usage (téléphone basique) s'écrit dans un critère ; l'équipe choisit la solution, le N d'INVEST (8a, banque) | [S3] | Wake, N : « It is not an explicit contract for features; rather, details will be co-created by the customer and programmer » ; « A good story captures the essence, not the details ». Mettre la contrainte dans le critère est la lecture du cours (concept 7b ; amélioration de session (`07-invest.md`, historique git)) | cours |
| Une règle non fixée (banque : seuil « presque vide » ; Pièges : cas inventé, durée maximale) : le PO ne l'invente pas ni ne la tranche seul, il la fait fixer par l'utilisateur concerné avant que la story parte ; renvoi à 7a2, DoR au concept 11 (Pièges, banque) | [S7] en partie | Choix du cours (posé en 7a2). Wynne : une question sans réponse va sur une carte rouge, « simply capture the question and move on » ; quelqu'un manque peut-être à la conversation. La DoR de l'équipe vélos (« règles métier fixées ») est un fait du fil rouge | cours |
| Given : le contexte de départ ; When : l'événement ou l'action ; Then : le résultat attendu, observable (8b) | [S5], [S6], [S10] | North : « Given some initial context […] When an event occurs, Then ensure some outcomes ». Gherkin : Given « describe the initial context », When « describe an event, or an action », Then « describe an expected outcome » ; « An outcome should be on an observable output ». Agile Alliance : « a particular set of observable consequences » | école |
| Un Then vague (Pièges : « l'utilisateur est informé » ; banque : « elle peut savoir ») ne se teste pas : le Then dit ce que le testeur vérifie (Pièges, banque « critère d'Abba ») | [S6] ; [S12] | Gherkin : le résultat doit être observable. L'erreur vient d'une session (observation d'une session, un apprenant, [c8] : premier Given/When/Then avec un Then vague, « she can know ») | cours |
| Un critère sans When : le Then n'a pas d'événement qui le déclenche (banque « critère d'Abba ») | [S5], [S6] | La forme de North et de Gherkin a trois parties ; l'erreur vient d'une session [S12] | cours |
| Changer une seule variable d'un exemple à l'autre, pour savoir quelle règle on teste (8b, Pièges) | [S12] | Heuristique du cours, sans source externe trouvée ; réussie 3/3 en session (observation d'une session, un apprenant, [c8]). L'exemple du distributeur de North [S5] fait varier l'état du compte entre deux scénarios, sans en faire une règle. Gherkin recommande seulement « 3-5 steps per example » | cours |
| Le Then d'un critère de fraîcheur vérifie l'âge des données (moins de 15 minutes), pas la fréquence de rafraîchissement de la plateforme (toutes les 5 minutes, ce qui permet de tenir la fraîcheur) (banque ; Pièges : cas inventé, cache) | aucune | Raisonnement du cours sur des faits du fil rouge : vérifier un résultat observable [S6], pas un moyen choisi par l'équipe [S3] (N). Sans source externe. « Seul, le rafraîchissement ne garantit pas la fraîcheur (un rafraîchissement qui échoue) » : raisonnement du cours (banque « Fraîcheur : que vérifie le Then ? ») | cours |
| Un mot flou dans un critère oblige le testeur à poser une question (Pièges) | [S3] en partie | Découle du T de Wake ; formulation du cours | cours |
| Nommer la solution dans le Then (Pièges : « il reçoit un export CSV », cas inventé ; banque : SMS) fige ce que l'équipe pouvait négocier | [S3] | Wake, N (voir plus haut) ; renvoi au concept 7b | cours |
| Un Then qui exclut le vélo signalé en panne invente une règle : d'après le fil rouge, ce vélo reste louable, donc disponible (banque « Les vélos disponibles d'Étienne » ; Pièges : même piège sur un autre cas inventé) | aucune | Raisonnement sur deux faits fixés du fil rouge (vélo disponible = à quai et louable ; un vélo signalé en panne reste louable), inventés, sans source | |
| « Pas de smartphone » est trop large pour « téléphone basique, sans l'appli » ; « quand elle quitte son domicile » arrive trop tard pour le When (banque « Le critère d'Abba à corriger ») | [S12] | Critique de la v1 en session (observation d'une session, un apprenant : sa première version d'un critère pour l'abonné sans appli) | |
| Given/When/Then n'est pas obligatoire : un critère écrit autrement convient s'il reste tranchable (Pièges) | [S10] en partie ; [S2], [S3] | Agile Alliance : la forme est une heuristique ; Jeffries et Wake demandent un test d'acceptation, sans imposer de forme. « S'il reste tranchable » : formulation du cours | cours |
| La story attend tant qu'une règle n'est pas fixée ; le PO la fait fixer (renvoi à 7a2) | `concepts/07-invest/sources.md` | Choix du cours, posé en 7a2 (ligne du mot flou) | cours |
| Les 3C : la confirmation est le critère d'acceptation (renvoi au concept 5) | `concepts/05-user-story/sources.md` | Déjà vérifié au concept 5. Le concept 5 renvoie au concept 8 pour « un chiffre précis va dans les critères » : pratique du cours, appuyée ici par le T de Wake [S3] et le Then observable [S6] | consensus |
| Ce qui vaut pour toutes les vues (banque : l'heure de la dernière mise à jour ; Pièges : cas inventé) relève de la DoD de l'équipe, pas des critères de chaque story ; la DoR de l'équipe vélos demande des règles métier fixées (renvoi au concept 11 ; banque, Pièges) | `storyline.md` ; `concepts/11-dor-dod/sources.md` | Faits du fil rouge (DoD et DoR de l'équipe vélos), inventés ; DoD et DoR s'enseignent et se sourcent au concept 11 | cours |
| Dépendances (10) et DoR (11) : nommés avec renvoi (banque « Les vélos disponibles d'Étienne » ; Pièges) | `plan.md` | Sources dans les fichiers de ces concepts | |

## Références

| Réf. | Source (auteur, titre, date) | Lien | Type | Consultée le |
|---|---|---|---|---|
| S1 | Schwaber, Sutherland, *The Scrum Guide*, novembre 2020 | https://scrumguides.org/scrum-guide.html | primaire | 2026-10-22 |
| S2 | Jeffries, « Essential XP: Card, Conversation, Confirmation », 30 août 2001 | https://ronjeffries.com/xprog/articles/expcardconversationconfirmation/ | primaire | 2026-10-22 (sources 05, non relu ici) |
| S3 | Wake, « INVEST in Good Stories, and SMART Tasks », 17 août 2003 | https://xp123.com/invest-in-good-stories-and-smart-tasks/ | primaire | 2026-10-22 (paragraphes N et T relus) |
| S4 | Mountain Goat Software (Cohn), « Relationship between Definition of Done and Conditions of Satisfaction », mise à jour du 24 juin 2024 (sans signature ; site et voix de Cohn) | https://www.mountaingoatsoftware.com/blog/clarifying-the-relationship-between-definition-of-done-and-conditions-of-sa | primaire (site de l'auteur, qui vend aussi ses formations) | 2026-10-22 |
| S5 | North, « Introducing BDD », paru dans *Better Software*, mars 2006 ; en ligne daté du 20 septembre 2006 | https://dannorth.net/blog/introducing-bdd/ | primaire | 2026-10-22 |
| S6 | Cucumber, « Gherkin Reference » (documentation) | https://cucumber.io/docs/gherkin/reference/ | primaire (documentation de l'outil ; Cucumber appartient à un éditeur) | 2026-10-22 |
| S7 | Wynne, « Introducing Example Mapping », Cucumber, 8 décembre 2015 | https://cucumber.io/blog/bdd/example-mapping-introduction/ | primaire (blog de l'outil, part marketing) | 2026-10-22 |
| S8 | Adzic, *Specification by Example*, Manning, juin 2011 (fiches de l'éditeur et de l'auteur) | https://www.manning.com/books/specification-by-example ; https://gojko.net/books/specification-by-example/ | primaire (fiches de l'auteur et de l'éditeur ; livre non lu) | 2026-10-22 |
| S9 | Fowler, « Specification By Example », bliki, 18 mars 2004 | https://martinfowler.com/bliki/SpecificationByExample.html | primaire | 2026-10-22 |
| S10 | Agile Alliance, glossaire : « Given-When-Then » et « BDD » | https://www.agilealliance.org/glossary/gwt/ ; https://www.agilealliance.org/glossary/bdd/ | secondaire | 2026-10-22 |
| S11 | Glossaire du cours | `glossary.md` | primaire (interne : définition du cours, pas une source externe) | 2026-10-22 |
| S12 | Observations d'une session, un apprenant ([c8] : premier Given/When/Then sans When et avec un Then vague, une seule variable par exemple réussie 3/3, critique de sa première version d'un critère pour l'abonné sans appli ; [c15] : story « définir X » dont une autre dépend) ; amélioration de session (`07-invest.md`, historique git) | (dépôt) | primaire (interne : observation de session, un seul apprenant : base faible) | 2026-10-22 |

## Non vérifié

- **Date de naissance de Given/When/Then** : [S5] ne date pas le travail avec Chris Matts ; seul
  l'article (mars 2006) est daté. D'autres sources avancent 2004, non consultées. Écrire « Dan
  North et Chris Matts, dans les années 2000 » ou « décrit par Dan North en 2006 », sans année
  de création.
- **Créateur de Gherkin et de Cucumber** (Aslak Hellesøy, d'après des sources non consultées) :
  non vérifié ; ne nommer que l'outil.
- **Contenu du livre d'Adzic** (les sept patrons, les cas étudiés) : seules les fiches de
  l'éditeur et de l'auteur ont été lues. Ne rien affirmer au-delà du titre, de l'auteur, de
  l'année et de la définition générale.
- **Séparation critère / règle métier comme pratique répandue** : aucune source ne sépare les
  deux comme le cours. Wynne [S7] met « acceptance criteria, or rules » sur la même carte, et les
  exemples dessous ; Cohn [S4] range les règles parmi les formes de détail d'une story (extrait
  d'une autre page, non lue en entier). La distinction « vraie hors de la story » est un choix du
  cours, à présenter comme tel.
- **« Une variable à la fois »** : heuristique du cours (observations de session), aucune source
  externe trouvée.
- **« Une story porte des critères d'acceptation » étiqueté « Consensus »** : non confirmé par
  le Scrum Guide [S1] ; pratique établie (XP, Wake, Cohn). La fiche l'étiquette « pratique
  établie, hors du Scrum Guide ».
- **SPIDR (Cohn) et patrons de Richard Lawrence** : cités au cadrage pour l'ancien concept 7,
  relèvent du découpage (concept 9) ; non cherchés ici, à vérifier au lot du concept 9. Le
  fichier du concept 8 ne doit pas les nommer.
- **Cohn, *User Stories Applied* (2004)** : livre non lu ; rien du fichier du concept ne doit
  s'y appuyer.
