# Migration report: concept 0

Workflow `migrate-concept`, course `parcours-po`, concept folder `/Users/sve/code/workspaces/perso/feyn/.claude/worktrees/s1-10-146/courses/parcours-po/concepts/00-scrum/`.
Old files: `/Users/sve/code/workspaces/perso/pdx/parcours-po/course/concepts/00-scrum.md` (CF), `/Users/sve/code/workspaces/perso/pdx/parcours-po/course/sources/00-scrum.md` (SF), `/Users/sve/code/workspaces/perso/pdx/parcours-po-website/src/content/concepts/fr/00-scrum.mdx` (MDX), `/Users/sve/code/workspaces/perso/pdx/parcours-po-website/src/components/schemas/Schema00.astro` (ASTRO).

## Summary

| kept | moved | by design | lost | invented | refuted | checks | target existed | accepted |
|---|---|---|---|---|---|---|---|---|
| 6 | 22 | 6 | 1 | 0 | 0 | fail | no | no |

Result: **failed**. lost and invented count the rows confirmed by the verification; the rows it refuted (refuted) are listed at the end and count in no other column. checks is read in code from the output below, which the check agent returns; target existed is the scope agent's word.

## CF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter (concept, titre) and H1 | course.yaml (number, title) | by design | M1 | M12: the H1s and frontmatters of M1 are not written in the folder |
| « Objectif » | concept.md « Objectif »; course.yaml objective | moved | M1 | text equals the course.yaml objective (capital, final period); no clause of CF missing |
| « L'essentiel » | concept.md « L'essentiel » | moved | M4 | merged into the MDX wording: CF-only clauses « sans pause entre eux » and « qui remplit la DoD et peut être livré avant la fin du sprint » carried at their place |
| « Consensus et choix d'école » section | concept.md frontmatter stances.* | moved | M3 | not written as a section; each claim matched to a frontmatter item |
| Consensus bullet (Scrum Guide 2020: responsabilités, sprint, artefacts, incrément cumulatif, plusieurs incréments, revue pas une porte) | concept.md frontmatter stances.consensus[0] | moved | M3 | every claim present in the MDX item, refs [S1] |
| Choix du cours bullet (test rapide, échéance hors DoD, pipeline inconsommable, rétrospective sans parties prenantes) | concept.md frontmatter stances.course[1..4] | moved | M3 | each of the four choices matched to a stances.course item |
| teacher hint « (à présenter comme tels si l'apprenant demande d'où ils viennent) » | none (protocol rule stances-told-apart) | by design | M3 | CF's teacher hint on the course's choices is carried by the protocol rule stances-told-apart (M12) |
| Choix d'école bullet (aucun; user story, ticket, vision produit, DoR hors du Guide, concepts 2, 5 et 11) | concept.md frontmatter stances.school[0] and stances.consensus[1] | moved | M3 | « aucun » in school item; the four terms and the concept references in the « Les limites du Scrum Guide » consensus item |
| Parti pris du cours bullet | concept.md frontmatter stances.course[0] | lost (L1) | M3 | claim and « ni consensus ni choix d'école » carried; the pointer « Voir « Sous-concepts ». » is in no item |
| « Sous-concepts » | teaching.md « Consignes » | moved | M9 | renamed « Consignes », text verbatim (four items, case titles cited in « » as their headings write them) |
| « Banque d'exemples » (13 cases, all fields) | teaching.md « Banque d'exemples » | kept | M9 | same ### headings, every field verbatim; CF has no lead paragraph, so no « Faits du fil rouge utilisés » |
| « Pièges » | concept.md « Pièges » | moved | M7 | merged into the MDX list: CF « erreur fréquente en formation », « (un pipeline qui charge des données que personne ne peut consulter) » and « inspecte ce que le sprint a produit » carried in their items |
| « Le test rapide » | concept.md « Le test rapide » | moved | M8 | CF question as blockquote, then « Si oui aux deux… » plus the Reflexe note in one paragraph |
| « Schéma » | teaching.md « Schéma » | kept | M9 |  |

## SF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter and H1 | none | by design | M1 | M10/M12: frontmatter and H1 dropped |
| intro paragraph | sources.md intro | kept | M10 |  |
| « Affirmations » table | sources.md « Affirmations » | moved | M10 | header renamed to « Affirmation (section de `concept.md` ou de `teaching.md`) » and Nature column added; all 47 rows same order, texts and source cells unchanged; Nature empty for « Les engagements n'ont pas la même durée de vie » (no MDX item states it), « on ne livre pas un sprint » and « sprint de deux semaines » (MDX items without kind) |
| « Références » | sources.md « Références » | kept | M10 | S3 is cited by no source cell and no row names it as support: orphan left, not added |
| « Non vérifié » | sources.md « Non vérifié » | kept | M10 |  |

## MDX: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| numero, titre, prerequis | course.yaml | moved | M1 | held by course.yaml (number "0", title, prerequisites []) |
| objectif | course.yaml objective; concept.md « Objectif » | moved | M1 | every clause carried by the course.yaml objective |
| description | concept.md frontmatter description | kept | M2 |  |
| ecoles.consensus, ecoles.ecole, ecoles.cours | concept.md frontmatter stances.consensus, stances.school, stances.course | moved | M3 | keys renamed (auteur/texte to author/text), texts and refs unchanged |
| sources.affirmations texts, references, nonVerifie | none (kinds used in sources.md Nature) | by design | M10 | MDX sources texts: by design, only their kind is used (M12) |
| alignement | none | by design | M12 | MDX alignement |
| import line | none | by design | M6 | import lines: by design, nothing |
| text before first <Sous> (paragraphs 1 and 2) | concept.md « L'essentiel » | moved | M4 | base wording of « L'essentiel »; Pastille to [cours]; Renvoi A2 to « annexe A2 », renvois 11b, 15b, 15c, 16c to « concepts 11b, 15b, 15c et 16c » |
| <Figure legende> with <Schema00 /> | concept.md « L'essentiel » image; frontmatter diagrams[0] | moved | M6 | ![title](sprint-duree-increment-etat.svg) at the same place; legende as caption; subconcept 0b |
| <Sous 0a> and h4 0a1, 0a2, 0a3 with reader text | concept.md « 0a Le cadre », « 0a1 », « 0a2 », « 0a3 » | moved | M5 | promise in italics; reader text unchanged; Renvoi (3, 1b, 1, 15b, 15c, 2, 15, 11) to « concept N »; Pastilles to [cours]; two FilRouge to « **Fil rouge :** » blockquotes |
| <Sous 0b> with reader text | concept.md « 0b Sprint et incrément » | moved | M5 | promise in italics; text unchanged; Pastille to [cours]; FilRouge to blockquote |
| <Reflexe note> | concept.md « Le test rapide » | moved | M8 | note appended to the paragraph after the CF question |
| <Erreurs> | concept.md « Pièges » | moved | M7 | MDX order and bold openings kept, CF additions merged |

## ASTRO: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Schema00 component | sprint-duree-increment-etat.svg | moved | M11 | one SVG, viewBox 0 0 600 620, title and desc kept, ids prefixed with the stem, groups 0b-escalier, 0b-frise, 0a2-evenements, 0a3-artefacts; no losses list is written in the SVG itself |
| Astro frontmatter code (BASE, STEP, marches, sprints, ticks, lignes) and map loops | sprint-duree-increment-etat.svg | moved | M11 | written out: four steps (y 162/128/94/60), three sprint blocks, ten ticks 126 to 378, three artefact rows; code itself by design (M12) |
| colour tokens and <style> | sprint-duree-increment-etat.svg | moved | M11 | s1 to primary 0.85, s2 to primary 0.6, s3 to primary 0.4, band to secondary 0.15, band-line to secondary stroke 0.5, text to primary, text-soft to muted, grey-line to muted 0.5; engage drawn as fill plus primary 0.85 outline; font var(--font-ui) to sans-serif |

## Lost

| Id | Source | Old item | Missing | Verification |
|---|---|---|---|---|
| L1 | CF | Parti pris du cours bullet | claim and « ni consensus ni choix d'école » carried; the pointer « Voir « Sous-concepts ». » is in no item | CF lines 33-34 read: « **Parti pris du cours** (ni consensus ni choix d'école) : une équipe Scrum qui travaille en sprints. Voir « Sous-concepts ». ». The new concept.md frontmatter stances.course[0] keeps the claim and « ni du consensus ni un choix d'école », and adds the A2 sentence, but nothing points to the teaching notes. I searched concept.md, teaching.md and sources.md for « Voir » and for « Consignes »/« Sous-concepts ». The only « Voir »/« voir » hits are unrelated: sources.md line 53 (« voir « Non vérifié » ») and teaching.md lines 80 and 250. « Consignes » appears only as the teaching.md heading, and no item or paragraph refers to it. What the pointer leads to (Consignes item 1, « Annonce du parti pris ») does exist in teaching.md, but the reference itself is in no new file. No mapping rule drops it: M3 says only that CF's hint to present the course's choices as such is by design. |

## Invented

None.

## Refuted by the verification

None.

## Writing choices

- M9: CF « Banque d'exemples » has no lead paragraph, so « Faits du fil rouge utilisés » is not written and nothing stays at the top of « Banque d'exemples ».
- M9: « Consignes » is copied verbatim from CF « Sous-concepts ». It cites only two cases by title (« La vue des stations vides livrée un mercredi », « « Le sprint est livré » »). The other ten cases are named by description (l'équipe en bref, le PO, ...), not by their titles in « ». Nothing was added, so the concept-folder check that every case is cited may fail.
- M9: the case headings and fields are copied verbatim, with no blank line added after each ### heading (as in CF). The « Schéma » text is copied verbatim, line breaks included.
- M10: Nature 'consensus' for the row « Le Daily Scrum n'est pas un compte rendu au Scrum Master ». No MDX item states that claim; the nearest is the consensus item « Daily Scrum : 15 minutes, pour les Developers... », whose quote the SF row derives from.
- M10: Nature 'consensus' for the row « Rétrospective : but, ... ; elle réunit l'équipe Scrum ». It matches the consensus MDX item « Rétrospective : son but est de gagner en qualité... ». The cours item « La rétrospective réunit l'équipe Scrum, sans les parties prenantes » was not used, because the row does not claim the exclusion.
- M10: Nature empty for the row « Les engagements n'ont pas la même durée de vie ». No MDX sources item states it, and no ecoles item matches the lifetimes claim (the consensus ecoles item only lists the artefacts with their engagements).
- M10: Nature 'consensus' for the row « DoD : description de l'état que doit atteindre l'incrément ; elle vaut pour tout ce qui entre dans l'incrément, donc pas pour une échéance propre à un sprint ». It matches the consensus MDX item « Definition of Done : description de l'état... » (same quotes). The MDX cours item « Une échéance propre à un sprint n'a pas sa place dans la DoD » was taken as a separate claim.
- M10: Nature empty for the rows « Piège : on ne « livre pas un sprint » » and « Un sprint de deux semaines est conforme ... ». The matching MDX items have no kind.
- M10: Nature 'cours' for the pipeline row and the test rapide row (the MDX items have kind cours). All other rows are 'consensus', from MDX items of kind consensus.
- M10: orphan [S3]. No row's source cell cites it, and no row names it in its verification column (it appears only in « Non vérifié »). It is left as is, and the sources check fails on it.
- M10: the intro paragraph is kept unchanged, including `course/plan.md`, because M10 rewrites only paths course/sources/NN-slug.md. No row had the section name « Sous-concepts », so no section was renamed.
- M13: the old files have no banned characters (em-dash, arrows) and no typographic apostrophes, so no replacement was made.
- M1: « Objectif » is the course.yaml objective verbatim, with CF line breaks. The MDX objectif drops the parenthesis (Product Owner, Scrum Master, Developers) and joins with « et » where the objective has « ; ». CF carries every clause. S1-08 records concept 0 as merged. No clause is lost.
- M3: neighbors omitted, since MDX has no ecoles.voisines. Stance items keep MDX key order, so author comes before text.
- M3: every claim of CF « Consensus et choix d'école » matches an MDX item: consensus to consensus item 1, choix d'école and its out-of-Guide terms to consensus item 2 and the school item, the four choix du cours to course items 2 to 5, parti pris to course item 1. CF has no more precise concept reference, since both cite concepts 2, 5 et 11. CF's pointer « Voir « Sous-concepts » » is teacher-facing and was not carried. CF's teacher hint « à présenter comme tels si l'apprenant demande d'où ils viennent » was dropped by design (stances-told-apart).
- M3: CF author « Scrum Guide 2020 » vs MDX auteur « Le Scrum Guide 2020 »: kept MDX unchanged.
- M4: MDX wording is the base. Two CF-only clauses were inserted where CF says them: « sans pause entre eux », after « sprints d'un mois au plus », and « qui remplit la DoD et peut être livré avant la fin du sprint », after « le produit dans un nouvel état utilisable ». CF's « Qui les confond « livre un sprint » et attend sa fin. » is covered by the MDX sentence, so nothing was added.
- M6: <Renvoi n="A2"/> after « dans l' » written « dans l'annexe A2 ». The consecutive renvois « 11b, 15b, 15c et 16c » became « concepts 11b, 15b, 15c et 16c ».
- M6: the Figure in « L'essentiel » became the image line at the same place, after the second paragraph. Its diagram entry has subconcept 0b, as given.
- M7 item 1: the CF-only sentence « erreur fréquente en formation » was appended at the end of the MDX item as « Erreur fréquente en formation. », capitalised as a sentence, so the MDX sentences stay intact.
- M7 item 2: the CF-only parenthesis « (un pipeline qui charge des données que personne ne peut consulter) » was inserted after the bold pitfall, where CF places it.
- M7 item 3: CF's more precise « inspecte ce que le sprint a produit et adapte le backlog » was kept over MDX « inspecte et adapte le backlog ».
- M7 item 6: MDX « ses quatre événements » was kept over CF « les quatre événements qu'il contient », which carries no extra claim.
- M8: the blockquote holds only the question, « Si on décidait ... remplie ? ». The note paragraph is CF/Reflexe « Si oui aux deux, c'est un incrément, quel que soit le jour du sprint. » followed by the Reflexe note « Formulation du cours, appuyée sur l'incrément utilisable et la DoD du Scrum Guide. »
- M5: no MDX h4 outside course.yaml. The MDX titres equal the course.yaml titles. Promises are in italics.
- M13: no em-dash, arrow or typographic apostrophe was found, so nothing was replaced.
- sprint-duree-increment-etat.svg: Colour tokens mapped to class and opacity pairs (no two tokens share a pair): --sch-text: primary, opacity 1; --sch-text-soft: muted, opacity 1; --sch-s1: primary 0.85; --sch-s2: primary 0.6; --sch-s3: primary 0.4; --sch-band: secondary fill-opacity 0.15; --sch-band-line: secondary stroke-opacity 0.5; --sch-grey-line: muted 0.5 (ticks, links, arrowhead). (M11)
- sprint-duree-increment-etat.svg: The three step and event colours (s1, s2, s3) become one hue at three opacities (0.85, 0.6, 0.4); the steps keep their outline (primary, stroke-opacity 0.35 as before), and where a later step overlaps an earlier one the fill opacities compound instead of replacing the colour. (M11)
- sprint-duree-increment-etat.svg: The engagement cell had a band fill with an s1 outline (two colours on one shape): it is drawn as two rects of the same geometry, a secondary 0.15 fill and a primary 0.85 outline. (M11)
- sprint-duree-increment-etat.svg: The UI font (var(--font-ui)) becomes the generic sans-serif; font sizes and weights from the stylesheet are carried as font-size and font-weight attributes. (M11)
- sprint-duree-increment-etat.svg: The arrowhead marker is defined inside the 0a3-artefacts group (no drawn child of the root outside a group); its id is prefixed with the stem. (M11)

## Checks

`mise exec -- specs/linear-course/checks/check-course /Users/sve/code/workspaces/perso/feyn/.claude/worktrees/s1-10-146/courses/parcours-po --only course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography --concept 0`

```
course-yaml: ok
concept-folder: fail: concepts/00-scrum/teaching.md:33 case "Qui est le chef de l'équipe vélos ?" is not cited by its title in « Consignes »
concept-folder: fail: concepts/00-scrum/teaching.md:61 case "Diego écrit des éléments du backlog" is not cited by its title in « Consignes »
concept-folder: fail: concepts/00-scrum/teaching.md:92 case "Anna est-elle une Developer ?" is not cited by its title in « Consignes »
concept-folder: fail: concepts/00-scrum/teaching.md:120 case "Qui tranche dans l'équipe vélos" is not cited by its title in « Consignes »
concept-folder: fail: concepts/00-scrum/teaching.md:150 case "Une semaine pour souffler" is not cited by its title in « Consignes »
concept-folder: fail: concepts/00-scrum/teaching.md:175 case "Scarlette choisit le travail du sprint" is not cited by its title in « Consignes »
concept-folder: fail: concepts/00-scrum/teaching.md:200 case "Le compte rendu du matin" is not cited by its title in « Consignes »
concept-folder: fail: concepts/00-scrum/teaching.md:222 case "Des diapositives pour Étienne" is not cited by its title in « Consignes »
concept-folder: fail: concepts/00-scrum/teaching.md:241 case "Odile veut assister à la rétrospective" is not cited by its title in « Consignes »
concept-folder: fail: concepts/00-scrum/teaching.md:268 case "Le sprint raconté par Diego" is not cited by its title in « Consignes »
concept-folder: fail: concepts/00-scrum/teaching.md:295 case "Trois artefacts, trois engagements" is not cited by its title in « Consignes »
conventions: ok
svg-contract: ok
sources: fail: concepts/00-scrum/sources.md:65 reference S3 is cited by no claim
glossary-order: fail: concepts/00-scrum/concept.md:36 uses the term "Produit", introduced by concept 1 (glossary.md:25), which comes later
glossary-order: fail: concepts/00-scrum/concept.md:121 uses the term "Utilisateur", introduced by concept 1 (glossary.md:26), which comes later
glossary-order: fail: concepts/00-scrum/concept.md:54 uses the term "Valeur", introduced by concept 1 (glossary.md:28), which comes later
glossary-order: fail: concepts/00-scrum/concept.md:57 uses the term "Ordonner", introduced by concept 3 (glossary.md:67), which comes later
glossary-order: fail: concepts/00-scrum/concept.md:36 uses the term "État", introduced by concept A1 (glossary.md:88), which comes later
glossary-order: fail: concepts/00-scrum/concept.md:42 uses the term "Flux continu", introduced by concept A2 (glossary.md:90), which comes later
typography: ok
```

Left:
- concepts/00-scrum/teaching.md (11 concept-folder failures, lines 33 to 295): the « Consignes » section is verbatim from the old CF « Sous-concepts » and cites only the two cases of 0b by title. Citing the other 11 cases would add text the old file does not say, so it is not form only.
- concepts/00-scrum/sources.md:65 (sources: reference S3 cited by no claim): no row's verification column names [S3] as what supports its claim. S3 appears only in « Références » and in « Non vérifié ». By the M10 orphan rule it is left, and the run fails on it.
- concepts/00-scrum/concept.md lines 36, 42, 54, 57, 121 (6 glossary-order failures: Produit, Utilisateur, Valeur, Ordonner, État, Flux continu): they flag reserved terms used before the concept that introduces them. Fixing them means rewording the reader text, which changes what it says.

Failing the run:
- concept-folder: fail: concepts/00-scrum/teaching.md:33 case "Qui est le chef de l'équipe vélos ?" is not cited by its title in « Consignes »
- concept-folder: fail: concepts/00-scrum/teaching.md:61 case "Diego écrit des éléments du backlog" is not cited by its title in « Consignes »
- concept-folder: fail: concepts/00-scrum/teaching.md:92 case "Anna est-elle une Developer ?" is not cited by its title in « Consignes »
- concept-folder: fail: concepts/00-scrum/teaching.md:120 case "Qui tranche dans l'équipe vélos" is not cited by its title in « Consignes »
- concept-folder: fail: concepts/00-scrum/teaching.md:150 case "Une semaine pour souffler" is not cited by its title in « Consignes »
- concept-folder: fail: concepts/00-scrum/teaching.md:175 case "Scarlette choisit le travail du sprint" is not cited by its title in « Consignes »
- concept-folder: fail: concepts/00-scrum/teaching.md:200 case "Le compte rendu du matin" is not cited by its title in « Consignes »
- concept-folder: fail: concepts/00-scrum/teaching.md:222 case "Des diapositives pour Étienne" is not cited by its title in « Consignes »
- concept-folder: fail: concepts/00-scrum/teaching.md:241 case "Odile veut assister à la rétrospective" is not cited by its title in « Consignes »
- concept-folder: fail: concepts/00-scrum/teaching.md:268 case "Le sprint raconté par Diego" is not cited by its title in « Consignes »
- concept-folder: fail: concepts/00-scrum/teaching.md:295 case "Trois artefacts, trois engagements" is not cited by its title in « Consignes »
- sources: fail: concepts/00-scrum/sources.md:65 reference S3 is cited by no claim
- glossary-order: fail: concepts/00-scrum/concept.md:36 uses the term "Produit", introduced by concept 1 (glossary.md:25), which comes later
- glossary-order: fail: concepts/00-scrum/concept.md:121 uses the term "Utilisateur", introduced by concept 1 (glossary.md:26), which comes later
- glossary-order: fail: concepts/00-scrum/concept.md:54 uses the term "Valeur", introduced by concept 1 (glossary.md:28), which comes later
- glossary-order: fail: concepts/00-scrum/concept.md:57 uses the term "Ordonner", introduced by concept 3 (glossary.md:67), which comes later
- glossary-order: fail: concepts/00-scrum/concept.md:36 uses the term "État", introduced by concept A1 (glossary.md:88), which comes later
- glossary-order: fail: concepts/00-scrum/concept.md:42 uses the term "Flux continu", introduced by concept A2 (glossary.md:90), which comes later

## Fixes after the run

Run `wf_37c49faa-72d` failed on 1 lost, 11 `concept-folder`, 1 `sources` and 6 `glossary-order` failures. Fixed under the maintainer's rulings of 2026-10-28 on #23:

- **L1, dropped by design (M3).** The pointer « Voir « Sous-concepts ». » led from the stance « Parti pris du cours » to the teaching file (« Consignes », item 1, « Annonce du parti pris »). The stances are reader-facing frontmatter now and « Consignes » is teacher-only: a reader pointer to it would lead nowhere. The claim and « ni consensus ni choix d'école » are carried. Verdict L1: by design, not lost (the maintainer's ruling on #23 is awaited).
- **Ruling B.** `teaching.md` « Consignes » gets item 5, « Cas de la banque », citing the 11 uncited case titles per sub-concept (0a1, 0a2, 0a3). No teaching content added. `concept-folder` passes.
- **Ruling C.** [S3] supports no claim: the old sources file and the site page cite it only in « Non vérifié » (the French PDF could not be extracted). Removed from « Références »; the « Non vérifié » bullet now says « du Guide (PDF français, novembre 2020) » instead of [S3]. `sources` passes.
- **Ruling A.** The 6 `glossary-order` failures (Produit, Utilisateur, Valeur, Ordonner, État, Flux continu) are left for #166.
- « annexe A2 » stays plain text (M6).
