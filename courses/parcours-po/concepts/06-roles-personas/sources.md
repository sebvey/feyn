## Affirmations

| Affirmation | Section | Source | Vérifié | Nature |
|---|---|---|---|---|
| Le Scrum Guide ne parle ni de rôle utilisateur, ni de persona, ni d'acteur | 6a, 6b, Pièges | [S1] | « persona », « user role », « actor » absents du texte (recherche du 2026-10-22) | consensus |
| Un rôle est une catégorie d'utilisateurs aux besoins communs | L'essentiel, 6a | cours | Formulation du cours ; la définition de Cohn dans son livre n'a pas été lue. | cours |
| Écrire les stories pour des rôles précis, pas pour un seul « utilisateur » : supposer un seul type d'utilisateur fait manquer des stories | 6a, Pièges | [S2] | « is a fallacy and can lead a team to miss stories for users who do not fit the general mold » (chapitre 3, premier paragraphe) | école |
| « En tant qu'utilisateur » suffit quand tous ont besoin du même comportement pour la même raison ; une seule story ne couvre deux rôles que dans ce cas | 6a, Pièges | [S3] | « Sometimes "user" is specific enough. If everyone who uses the product needs the same behavior for the same reason, a more detailed role may not add much. » (page) | école |
| L'acteur est celui qui agit et y gagne ; le critère réunit deux repères de Cohn, qui écrit pourtant parfois une story pour un rôle qui gagne sans agir | L'essentiel, 6a, Le test rapide | [S3], [S5] | « names the person or role who benefits » (page) ; « initiator of the action » ; « As the company owner, I want ads on the site so that I make money » (page) | cours |
| Celui qui construit n'est pas l'acteur : pas de story « en tant que développeur » | 6a, Pièges, Le test rapide | [S5] | « I don't necessarily mean we want a bunch of "programmer stories." Those are generally best avoided. » (page) | cours |
| Un consommateur de données reste un utilisateur | 6a, Pièges | [S9] | « the consumers of that data should be treated as customers » (article) | cours |
| Le « afin de » porte le gain de l'acteur de la story, pas celui d'un autre rôle | 6a, Pièges, Le test rapide | [S3] | « the person or role who benefits » ; « a reason » (page) | cours |
| Le PO ne devine pas l'acteur : il le vérifie auprès des utilisateurs | L'essentiel, 6a, Pièges, Le test rapide | cours | Choix du cours, sans source externe. | cours |
| Un mauvais acteur donne une mauvaise raison, donc un mauvais ordre | L'essentiel | cours | Suit du rôle du « afin de », qui aide le PO à ordonner (concept 5). | cours |
| Celui qui demande n'est pas toujours l'acteur ; l'acteur est désigné par son rôle, pas par le prénom d'une personne | 6a, Pièges | cours | Choix du cours ; aucune source consultée ne traite une story écrite au nom d'une personne réelle. | cours |
| Un « je veux » par story | 6a | cours | Test du cours enseigné au concept 4 (compter les « je veux »). | cours |
| Un rôle plus précis quand il change la conversation : règles, données, moment ou résultat différents | 6a | [S3] | « ask whether the role changes the conversation. Would this user care about different rules, different data, different timing, different permissions, or a different outcome? If so, name the more specific role. » (page) | école |
| Le persona est un choix d'école, d'Alan Cooper, venu du design d'interaction | 6b, Pièges | [S6], [S2] | « you've probably been introduced to the idea of "personas", hypothetical archetypes, as a practical interaction design tool. Whether you hate or love this idea as a development tool, you can thank me. » (extrait) ; « interaction design (Cooper 1999) » (chapitre 3, premier paragraphe) | école |
| Un persona est un portrait fictif et réaliste d'un rôle | L'essentiel, 6b | [S6], [S7] | « hypothetical archetypes » (extrait) ; « a semi-fictional characterization or representation of a typical customer segment or end user » ; « a representation of the goals and behavior of a hypothesized group of users » (page) | école |
| Le persona a des objectifs et des comportements | L'essentiel, 6b | [S7] | « goals and behavior » ; « professional goals » (page) | école |
| Les personas ne sont pas obligatoires | 6b, Pièges | [S1], [S6] | « persona » absent du texte (recherche du 2026-10-22) ; « Whether you hate or love this idea as a development tool, you can thank me. » (extrait) | école |
| Un persona est fictif par son prénom, pas par ses traits : chaque trait doit pouvoir dire d'où il vient ; un portrait tiré des seules hypothèses de l'équipe n'en est pas un | 6b, Pièges | cours | Suit de la définition du persona, portrait construit à partir d'utilisateurs réels. | cours |
| La story garde le rôle (« en tant qu'abonné ») même quand l'équipe a un persona | 6b | cours | Choix du cours : le persona aide à se représenter le rôle sans le remplacer dans la phrase. | cours |

## Références

| Réf. | Source (auteur, titre, date) | Lien | Type | Consultée le |
|---|---|---|---|---|
| S1 | Schwaber, Sutherland, *The Scrum Guide*, novembre 2020 | https://scrumguides.org/scrum-guide.html | primaire | 2026-10-22 |
| S2 | Cohn, *User Stories Applied*, Addison-Wesley, mars 2004, chapitre 3 « User Role Modeling » (aperçu de l'éditeur : premier paragraphe seulement) | https://www.oreilly.com/library/view/user-stories-applied/0321205685/ch03.html | primaire (extrait) | 2026-10-22 |
| S3 | Cohn, « Writing User Stories », Mountain Goat Software (date non affichée) | https://www.mountaingoatsoftware.com/agile/user-stories/writing-user-stories | primaire (site de l'auteur, qui vend aussi ses formations) | 2026-10-22 |
| S5 | Cohn, « Selecting the Right User Role », Mountain Goat Software (date non affichée) | https://www.mountaingoatsoftware.com/agile/selecting-the-right-user-role | primaire (site de l'auteur) | 2026-10-22 |
| S6 | Cooper, « The Long Road to Inventing Design Personas », OneZero (Medium) (date non affichée ; extrait seulement) | https://onezero.medium.com/in-1983-i-created-secret-weapons-for-interactive-design-d154eb8cfd58 | primaire (extrait) | 2026-10-22 |
| S7 | Wikipédia, « Persona (user experience) » | https://en.wikipedia.org/wiki/Persona_(user_experience) | secondaire | 2026-10-22 |
| S9 | Dehghani, « Data Mesh Principles and Logical Architecture », martinfowler.com, 3 décembre 2020 | https://martinfowler.com/articles/data-mesh-principles.html | primaire | 2026-10-22 |

## Non vérifié

- 6b, Consensus et choix d'école : la date des premiers personas (1983) et le récit de
  « Kathy », premier persona du nom d'une personne interrogée, et des entretiens avec sept ou
  huit utilisateurs probables : rapportés par Wikipédia et des sources secondaires (Rysen,
  « How to create user personas »,
  https://www.rysen.com.au/user-experience/how-to-create-user-personas-with-examples ;
  whichframework.org, « User Personas: Cooper's Method »,
  https://whichframework.org/frameworks/user-personas.html), sans citation relevée, d'après
  l'essai de Cooper « The Origin of Personas » (Cooper Journal, vers 2008), qui n'a pas pu être
  lu ; l'adresse de l'article de Cooper sur Medium contient « in-1983 », mais l'extrait lu ne
  donne pas la date. Une source secondaire dit 1985. Ne pas dater les premiers personas dans le
  fichier du concept.
- 6b, Consensus et choix d'école : l'année de *The Inmates Are Running the Asylum* : 1998 selon
  Cooper [S6], 1999 selon Cohn [S2] et Wikipédia [S7]. Une page secondaire explique l'écart par
  une réimpression, sans preuve. Écrire « Alan Cooper, à la fin des années 1990 » ou ne pas
  dater.
- 6b, Consensus et choix d'école : la priorité de Cooper. Un billet de 2003
  (noisebetweenstations.com) attribue une technique voisine à Tognazzini (1992) et à Vertelney
  (1989) ; non vérifié. Attribuer les personas à Cooper, comme Cohn et Wikipédia, sans dire
  qu'il les a inventés seul.
- 6b, Pièges, Consensus et choix d'école : le persona construit à partir d'utilisateurs réels
  interrogés, et le proto-persona, fait des hypothèses de l'équipe et souvent confondu avec un
  persona : Wikipédia [S7] le dit (données d'entretiens ou d'enquêtes), sans citation relevée ;
  le récit de Cooper n'a pas pu être lu.
- 6b, Consensus et choix d'école : les critiques des personas (lien flou avec les données,
  risque de stéréotype, preuves surtout anecdotiques) : Wikipédia [S7], section « Criticism »,
  sans citation relevée. Source secondaire.
- L'essentiel, 6b : le prénom comme composant du persona : rapporté par les reprises du récit de
  « Kathy » (entrée ci-dessus), sans citation relevée ; Wikipédia et Cooper parlent d'objectifs
  et de comportements.
- L'essentiel, 6a, Consensus et choix d'école : la définition du rôle utilisateur chez Cohn ou
  chez Constantine et Lockwood. Le chapitre 3 de *User Stories Applied* n'a été lu que dans son
  premier paragraphe ; la définition et la démarche (lister, regrouper, affiner les rôles, carte
  des rôles) ne sont pas vérifiées. Le glossaire du cours (« catégorie d'utilisateurs aux
  besoins communs ») est sa propre formulation.
- L'essentiel, 6b : « frustrations » comme composant d'un persona (absent de la fiche) : aucune
  source consultée ne le cite ; Wikipédia et Cooper parlent d'objectifs (« goals ») et de
  comportements. Préférer « objectifs ».
- 6b, Consensus et choix d'école : écrire une story au nom d'un persona (« En tant
  qu'Abba… ») : pratique répandue, que Cohn décrirait dans son livre ; non vérifiée. La fiche
  l'évoque comme possibilité, sans attribution.
- 6a, Consensus et choix d'école : « quasi consensuel » (absent de la fiche, rôles précis plutôt
  qu'« utilisateur ») : aucune source ne permet de parler de consensus (Scrum Guide muet) ; Cohn
  le recommande et admet qu'« utilisateur » suffit parfois [S3]. À présenter comme
  recommandation de Cohn, sans l'appeler consensus ni pratique établie.
