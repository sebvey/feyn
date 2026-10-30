## Affirmations

| Affirmation | Section | Source | Vérifié | Nature |
|---|---|---|---|---|
| Un critère d'acceptation est une condition vérifiable, propre à une story, qui dit quand elle est faite | L'essentiel, 8a1 | [S4] | « specific to a given product backlog item » ; « what needs to be true in order for you to consider this particular story done? » (page) | cours |
| Les critères rendent la story testable, le T d'INVEST | L'essentiel | [S3] | « I understand what I want well enough that I could write a test for it » ; « If a customer doesn't know how to test something, this may indicate that the story isn't clear enough » (T) | école |
| Une règle métier est une vérité du domaine, valable hors de la story, dont d'autres stories se servent | L'essentiel, 8a1 | cours | Définition du cours, sans source externe. | cours |
| Les critères sont souvent des exemples qui illustrent une règle | L'essentiel, 8a1 | [S7] | « For each rule, we may need one or more examples to illustrate it » (page) | école |
| Test rapide : « est-ce encore vrai si cette story n'existe pas ? » : règle | 8a1, Le test rapide | cours | Heuristique du cours, sans source. | cours |
| Test rapide : « un testeur peut-il dire OK ou KO sans me poser de question ? » : critère | 8a1, Le test rapide | [S3] | « I understand what I want well enough that I could write a test for it » (T) | cours |
| Une contrainte d'usage s'écrit dans un critère, dans le contexte de départ (Given), sans nommer de solution | 8a1 | cours | Choix du cours, posé au concept 7b. | cours |
| Ce qui vaut pour toutes les stories ne se répète pas dans leurs critères : c'est la Definition of Done | 8a1, Pièges | [S4] | « Think of the definition of done as a special set of acceptance criteria that are added to every user story » (page) | cours |
| Une règle non fixée : le PO ne l'invente pas et ne la tranche pas seul ; il la fait fixer par l'utilisateur concerné, et la story attend | L'essentiel, 8a2, Pièges | [S1] | « breaking down and further defining Product Backlog items into smaller more precise items » (Product Backlog) | cours |
| Dans l'Example Mapping, une règle non fixée reste une question, notée sans exemple dessous | 8a2 | [S7] | « simply capture the question and move on » (page) | école |
| Given/When/Then : forme de Dan North et Chris Matts pour écrire les critères d'une story en scénarios, issue du BDD | 8b1 | [S5] | « Matts and I » ; « to capture a story's acceptance criteria » ; « Given some initial context (the givens), When an event occurs, Then ensure some outcomes » ; « I started to refer to TDD as BDD, or behaviour-driven development » (article) | école |
| Given : le contexte de départ ; When : l'événement ou l'action ; Then : le résultat attendu, observable | 8b1 | [S5], [S6], [S10] | « Given some initial context […] When an event occurs, Then ensure some outcomes » (article) ; « describe the initial context » ; « describe an event, or an action » ; « describe an expected outcome » ; « An outcome should be on an observable output » (page) ; « a particular set of observable consequences » (page) | école |
| Cucumber et son langage Gherkin, à mots-clés, rendent les scénarios exécutables | 8b1 | [S6] | « Gherkin uses a set of special keywords to give structure and meaning to executable specifications » (page) | école |
| Given/When/Then s'emploie aussi sans outil | 8b1, Pièges | [S10] | « can also be used purely as a heuristic irrespective of any tool » (page) | école |
| Given/When/Then n'est pas obligatoire : un critère écrit autrement convient s'il reste tranchable | 8b1, Pièges | [S10] | « can also be used purely as a heuristic irrespective of any tool » (page) | cours |
| Un Then vague ne se teste pas : le Then dit ce que le testeur vérifie | 8b1, Pièges | [S6] | « An outcome should be on an observable output » (page) | cours |
| Un critère sans When : on ne sait pas quel événement déclenche le résultat | 8b1, Pièges | [S5], [S6] | « When an event occurs » (article) ; « describe an event, or an action » (page) | cours |
| Un mot flou dans un critère oblige le testeur à poser une question | 8b1, Pièges | cours | Suit du T de Wake (pouvoir écrire un test) ; formulation du cours. | cours |
| Le Then vérifie un résultat observable par l'utilisateur, pas un moyen choisi par l'équipe | 8b1, Pièges | [S6], [S3] | « An outcome should be on an observable output » (page) ; « details will be co-created by the customer and programmer » (N) | cours |
| Nommer la solution dans le Then ou le critère fige ce que l'équipe pouvait négocier | 8b1, Pièges | [S3] | « It is not an explicit contract for features; rather, details will be co-created by the customer and programmer » ; « A good story captures the essence, not the details » (N) | cours |
| Changer une seule variable d'un exemple à l'autre, pour savoir quelle règle on teste | L'essentiel, 8b2, Pièges, Le test rapide | cours | Heuristique du cours, observée en session sur un apprenant. | cours |

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
| S8 | Adzic, *Specification by Example*, Manning, juin 2011 (fiches de l'éditeur et de l'auteur) | https://www.manning.com/books/specification-by-example | primaire (fiches de l'auteur et de l'éditeur ; livre non lu) | 2026-10-22 |
| S10 | Agile Alliance, glossaire : « Given-When-Then » et « BDD » | https://www.agilealliance.org/glossary/gwt/ | secondaire | 2026-10-22 |

## Non vérifié

- 8b1, Consensus et choix d'école : la date de naissance de Given/When/Then. [S5] ne date pas
  le travail avec Chris Matts ; seul l'article (mars 2006) est daté. D'autres sources avancent
  2004, non consultées. Écrire « Dan North et Chris Matts, dans les années 2000 » ou « décrit
  par Dan North en 2006 », sans année de création.
- 8b1, Consensus et choix d'école : le créateur de Gherkin et de Cucumber (Aslak Hellesøy,
  d'après des sources non consultées) : non vérifié ; ne nommer que l'outil.
- Consensus et choix d'école : le contenu du livre d'Adzic (les sept patrons, les cas étudiés) :
  seules les fiches de l'éditeur et de l'auteur ont été lues. Ne rien affirmer au-delà du titre,
  de l'auteur, de l'année et de la définition générale.
- Consensus et choix d'école : l'expression « Specification by Example » chez Martin Fowler
  (bliki « Specification By Example », 18 mars 2004,
  https://martinfowler.com/bliki/SpecificationByExample.html) : l'expression l'aurait frappé à
  un atelier XP/Agile Universe en 2002 ; aucune citation n'en a été relevée. Adzic n'a donc
  sans doute pas inventé le terme : ne lui attribuer que le livre.
- 8a1, Consensus et choix d'école : la séparation critère / règle métier comme pratique
  répandue. Aucune source ne sépare les deux comme le cours. Wynne [S7] met « acceptance
  criteria, or rules » sur la même carte, et les exemples dessous ; Cohn [S4] range les règles
  parmi les formes de détail d'une story (extrait d'une autre page, non lue en entier). La
  distinction « vraie hors de la story » est un choix du cours, à présenter comme tel.
- 8a1 : le mot-clé Rule de Gherkin [S6] (« one business rule that should be implemented »,
  depuis Gherkin v6) ne dit pas qu'une règle reste vraie hors de la story : la définition de la
  règle métier est celle du cours.
- 8a2, Consensus et choix d'école : les couleurs des cartes de l'Example Mapping (règles en
  bleu, exemples en vert, questions en rouge) : Wynne [S7], sans citation relevée.
- 8b2, Consensus et choix d'école : « une variable à la fois » : heuristique du cours
  (observations de session, un apprenant, base faible), aucune source externe trouvée.
  L'exemple du distributeur de North [S5] fait varier l'état du compte entre deux scénarios,
  sans en faire une règle ; aucune citation n'en a été relevée.
- Consensus et choix d'école : « une story porte des critères d'acceptation » étiqueté
  « Consensus » : non confirmé par le Scrum Guide [S1] ; pratique établie (XP, Wake, Cohn). La
  fiche l'étiquette « pratique établie, hors du Scrum Guide ».
- Consensus et choix d'école : Cohn, *User Stories Applied* (2004) : livre non lu ; rien du
  fichier du concept ne doit s'y appuyer.
