# Migration report: concept 4

Workflow `migrate-concept`, course `parcours-po`, concept folder `concepts/04-hierarchie/`. Paths in the course folder are relative to it; the old files are named from their repository folder (`parcours-po`, `parcours-po-website`).
Old files: `parcours-po/course/concepts/04-hierarchie.md` (CF), `parcours-po/course/sources/04-hierarchie.md` (SF), `parcours-po-website/src/content/concepts/fr/04-hierarchie.mdx` (MDX), `parcours-po-website/src/components/schemas/Schema04.astro` (ASTRO).

## Summary

| kept | moved | by design | lost | invented | refuted | checks | target existed | accepted |
|---|---|---|---|---|---|---|---|---|
| 7 | 46 | 8 | 0 | 0 | 0 | fail | no | no |

Result: **failed**. lost and invented count the rows confirmed by the verification; the rows it refuted (refuted) are listed at the end and count in no other column. checks is read in code from the output below, which the check agent returns; target existed is read in code from the listing below, which the scope agent returns.

## Target before the run

`ls -ld concepts/04-hierarchie; ls -la concepts/04-hierarchie`, as the scope agent returned it: no such folder.

```
ls: cannot access 'concepts/04-hierarchie': No such file or directory
ls: cannot access 'concepts/04-hierarchie': No such file or directory
```

## CF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter (concept, titre) and H1 | course.yaml (number, title) | by design | M1 | M12: the H1s and frontmatters of M1 |
| Objectif | course.yaml objective; concept.md « Objectif » (course.yaml objective verbatim) | moved | M1 | CF text identical to the course.yaml objective; no clause lost |
| L'essentiel | concept.md « L'essentiel » | moved | M4 | merged into MDX base: CF-only « dans le backlog de sprint », « trois ou quatre niveaux » and « une feature peut prendre plusieurs sprints ; la taille ne tranche qu'entre story et epic, pour un seul « je veux » » carried at their CF place |
| Consensus et choix d'école (section) | concept.md frontmatter stances / neighbors | moved | M3 | not written as a section; each claim matched to a frontmatter item |
| Consensus (Scrum Guide 2020) bullet | frontmatter stances.consensus[0]; stances.course[2] (« le cours en déduit que la tâche est à eux ») | moved | M3 | all claims present in MDX items; « concept 15 » same reference |
| Choix d'outil et d'équipe (Jira, Azure DevOps, SAFe, thème) | frontmatter stances.school (Jira, Azure DevOps, SAFe items); neighbors (Le thème) | moved | M3 | lead « chacun se modifie » carried by the Jira item (« modifiables ») and concept.md 4a2; not in the Azure DevOps item itself |
| Choix d'école (Cohn) | frontmatter stances.school[0] (Mike Cohn) | moved | M3 |  |
| Choix du cours bullet | frontmatter stances.course[0], stances.course[1] | moved | M3 | all rules (compter, juger ce qu'il reste, un seul « je veux » trop gros, compte l'emporte, niveau de trop, vérifier avant de retirer) present |
| teacher hint « sans source externe, à présenter comme telles » | none (protocol stances-told-apart) | by design | M3 | CF teacher hint on the course's choices carried by the protocol rule |
| Sous-concepts | teaching.md « Consignes » | moved | M9 | renamed, text verbatim |
| Sous-concepts 4a2 case citation | teaching.md « Consignes » item 4a2 | moved | M9 | (« Scrum impose trois niveaux ») becomes (« « Scrum impose trois niveaux » »): case cited by its heading title inside « » |
| Sous-concepts item 4b | teaching.md « Consignes » item 4b | moved | M9 | case titles added: (« Un seul « je veux » ? », « Vélos en panne et locations du jour : feature ou story ? », « Les stations presque vides : ce qu'il reste à livrer »); rest verbatim |
| Banque d'exemples lead paragraph | teaching.md « Faits du fil rouge utilisés » | moved | M9 | lead words « Les faits viennent du fil rouge : » dropped; first sentence (formulations are exercise proposals, not storyline facts) kept in the same paragraph |
| Banque d'exemples: six cases (Classer l'arbre d'Étienne, « Scrum impose trois niveaux », Un niveau de trop ?, Un seul « je veux » ?, Vélos en panne et locations du jour, Les stations presque vides) | teaching.md « Banque d'exemples » | kept | M9 | same ### headings, every field verbatim |
| Pièges | concept.md « Pièges » | moved | M7 | merged with MDX <Erreurs>, MDX order and sentences, bold openings |
| Pièges: Le niveau de trop | concept.md « Pièges » item « Garder un niveau de trop » | moved | M7 | CF sentence « Le régler dans l'outil : annexe A1. » kept in the item |
| Pièges: Juger le niveau dans l'absolu | concept.md « Pièges » item « Juger le niveau dans l'absolu » | moved | M7 | CF sentence « Ce qui existe déjà ne compte plus, et le travail technique n'est pas un « je veux » de plus pour l'utilisateur. » kept in the item |
| Le test rapide | concept.md « Le test rapide » blockquote | moved | M8 | CF question as one blockquote, text identical |
| Schéma | teaching.md « Schéma » | kept | M9 | verbatim |

## SF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter and H1 | none | by design | M1 | M12: the H1s and frontmatters of M1 |
| intro paragraph | sources.md intro | kept | M10 | no old path or pointer in it; pointer to « Non vérifié » kept |
| Affirmations table header | sources.md « Affirmations » | moved | M10 | header « Affirmation (section de `concept.md` ou de `teaching.md`) \| Source \| Ce qui a été vérifié \| Nature » |
| Affirmations rows (27 rows) | sources.md « Affirmations » | moved | M10 | same rows, same order, texts and source cells unchanged; Nature column added from MDX kinds (empty for story besoin, chaque équipe choisit, fil rouge, libellés du schéma: MDX items without kind) |
| row « La tâche est dans le plan des Developers… » | sources.md « Affirmations » row 4 | moved | M10 | old path: `course/sources/00-scrum.md`, `course/sources/03-backlog-produit.md` becomes `concepts/00-scrum/sources.md`, `concepts/03-backlog-produit/sources.md`; Nature cours |
| row « Chaque équipe choisit ses niveaux… » | sources.md « Affirmations » row 14 | moved | M10 | old path: (`course/plan.md`, ligne du concept 4) becomes (`plan.md`, ligne du concept 4); Nature empty |
| row « Un travail qui ne sert qu'à réaliser une story… » | sources.md « Affirmations » row 23 | moved | M10 | old path: `course/sources/01-produit-et-po.md`, `course/sources/03-backlog-produit.md` becomes `concepts/01-produit-et-po/sources.md`, `concepts/03-backlog-produit/sources.md`; Nature cours |
| row « SAFe vise plusieurs équipes… » | sources.md « Affirmations » row 25 | moved | M10 | Nature école, from the MDX item « SAFe ajoute des niveaux… ; il vise plusieurs équipes » (kind ecole) |
| rows citing `04-hierarchie.md`, `off-course.md`, historique git (verification column) | sources.md « Affirmations » rows 17, 18 | kept | M10 | not intro nor « Non vérifié »: pointers stay as they are |
| Références | sources.md « Références » | kept | M10 | S1-S8 all cited, no orphan; S7 « (cadrage T-018a, §8) » stays. Remark: S5 type « primaire, marketing pour la formation SAFe » written « primaire, marketing (pour la formation SAFe) », parentheses added that no rule names (same meaning) |
| Non vérifié | sources.md « Non vérifié » | kept | M10 | unchanged; no old path or pointer |

## MDX: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| numero, titre, prerequis | course.yaml | by design | M1 | M12: frontmatters of M1; course.yaml holds them |
| objectif | course.yaml objective | moved | M1 | same clauses as the course.yaml objective; nothing lost |
| description | concept.md frontmatter description | kept | M2 |  |
| ecoles.consensus | concept.md frontmatter stances.consensus | moved | M3 | keys auteur/texte to author/text, texts and refs unchanged |
| ecoles.ecole | concept.md frontmatter stances.school | moved | M3 | keys renamed, four items, texts and refs unchanged |
| ecoles.cours | concept.md frontmatter stances.course | moved | M3 | key renamed, five items, texts and refs unchanged |
| ecoles.voisines | concept.md frontmatter neighbors | moved | M3 | texts and refs unchanged |
| sources.affirmations kinds | sources.md « Affirmations » column Nature | moved | M10 | ecole written école |
| sources texts (affirmation, verifie, references, nonVerifie) | none | by design | M10 | M12: the MDX sources texts of M10 |
| alignement | none | by design | M12 | MDX alignement |
| import Schema04 | none | by design | M12 | import lines |
| text before first <Sous> | concept.md « L'essentiel » | moved | M4 | MDX wording as base, merged with CF-only clauses |
| <Figure legende> with <Schema04/> | concept.md « L'essentiel » image ![…](arbre-niveaux-backlog.svg); frontmatter diagrams (title, caption, subconcept 4a) | moved | M6 | legende is the frontmatter caption, verbatim |
| <Sous id=4a> titre and promesse | concept.md « ## 4a Les niveaux, qu'aucun guide n'impose » + italic promise | moved | M5 |  |
| <h4> 4a1, 4a2, 4a3 and reader text | concept.md « ### 4a1 / 4a2 / 4a3 » | moved | M5 | reader text unchanged, incl. « Trois sources de règles… » and « Régler les niveaux dans l'outil : annexe A1. » |
| <Pastille kind=cours/ecole> | concept.md 4a1, 4a2, 4a3, 4b | moved | M6 | written [cours], [école] in place |
| <Renvoi n=5, 3, 9, A1> | concept.md 4a1, 4a3, 4b, Pièges | moved | M6 | « concept 5 », « concept 3 », « concept 9 », « annexe A1 » |
| <Sous id=4b> titre and promesse | concept.md « ## 4b Feature ou story : compter les « je veux » » + italic promise | moved | M5 |  |
| <h4> 4b1 Le test du compte, 4b2 Ce que le compte ne regarde pas | concept.md 4b, paragraphs led by **Le test du compte.** and **Ce que le compte ne regarde pas.** | moved | M5 | ids not in course.yaml: bold-led paragraphs of leaf 4b |
| <FilRouge> | concept.md 4b blockquote « **Fil rouge :** » | moved | M6 |  |
| <Reflexe note> | concept.md « Le test rapide » | moved | M8 | slot same text as CF question (blockquote); note « Règle pratique du cours, sans source externe. » as one paragraph |
| <Erreurs> | concept.md « Pièges » | moved | M7 | seven items, MDX order and sentences, merged with CF |

## ASTRO: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Astro frontmatter (comments, rows array) and rows.map loop | arbre-niveaux-backlog.svg group 4b-compte | by design | M12 | Astro frontmatter code once written out: four rows written out, y values c-12, c+7, c+26 correct (51/70/89, 149/168/187, 249/268/287, 356/375/394) |
| svg root, <title>, <desc> | arbre-niveaux-backlog.svg | moved | M11 | stem from title (numbered component); viewBox 0 0 760 500 kept; ids g4-t/g4-d become arbre-niveaux-backlog-titre/-desc; title and desc text unchanged |
| head text and separator | group 4b-entete | moved | M11 | text-soft muted 0.85; band-line muted 0.4 |
| links (.link path) and task links | groups 4a1-liens, 4a1-liens-taches | moved | M11 | text-soft muted 0.85; grey-line muted 0.6, dasharray 5 4 kept |
| epic, feature, story nodes and texts | groups 4a1-epic, 4a1-features, 4a1-stories | moved | M11 | band fill muted 0.12 drawn as separate rect; strokes s1 primary 0.85, s2 secondary 0.6, s3 secondary 0.4; node/story text primary 1; geometry unchanged |
| task nodes, task texts, note | group 4a1-taches | moved | M11 | grey-line muted 0.6 dashed 6 4, no fill; text-soft muted 0.85; italic kept |
| level labels (.lvl) | group 4b-compte | moved | M11 | EPIC s1 primary 0.85; FEATURE s2 secondary 0.6; STORY text primary 1; TÂCHE text-soft muted 0.85; counts primary 1 |
| banner | group 4a1-bandeau | moved | M11 | band muted 0.12 fill, band-line muted 0.4 stroke; tspan.strong becomes font-weight 700. Remark: banner's « choix d'équipe » could be assigned 4a2 |
| <style> block, colour tokens | attributes on elements (currentColor, classes, opacities) | moved | M11 | mapping applied as decided; font-family var(--font-ui) becomes sans-serif; loss: hue distinction of s1/s2/s3 levels kept only as opacity; no element-level opacity in the old component |

## Lost

None.

## Invented

None.

## Refuted by the verification

None.

## Colour mapping (M11)

One pair of class and opacity per old colour token, decided once for all the diagrams of the concept.

| Token | Class | Opacity | Draws | Diagrams |
|---|---|---|---|---|
| `--sch-text` | primary | 1 | Schema04 (arbre-des-niveaux): node and story labels, count lines, STORY level label, banner text | arbre-niveaux-backlog.svg |
| `--sch-s1` | primary | 0.85 | Schema04: epic node outline and EPIC level label | arbre-niveaux-backlog.svg |
| `--sch-s2` | secondary | 0.6 | Schema04: feature node outlines and FEATURE level label | arbre-niveaux-backlog.svg |
| `--sch-s3` | secondary | 0.4 | Schema04: story node outlines | arbre-niveaux-backlog.svg |
| `--sch-text-soft` | muted | 0.85 | Schema04: column head, tree links, task labels, italic note, TÂCHE level label | arbre-niveaux-backlog.svg |
| `--sch-grey-line` | muted | 0.6 | Schema04: dashed task outlines and dashed task links | arbre-niveaux-backlog.svg |
| `--sch-band-line` | muted | 0.4 | Schema04: vertical separator and banner outline | arbre-niveaux-backlog.svg |
| `--sch-band` | muted | 0.12 | Schema04: fill of epic, feature and story nodes and of the banner | arbre-niveaux-backlog.svg |

## Writing choices

- M9: Consignes 4a2 citation: old `(« Scrum impose trois niveaux »)`, new `(« « Scrum impose trois niveaux » »)`. The case heading's title already has the quotes, so the case is cited exactly as the heading writes it, inside « ».
- M9: Consignes 4b cited no case. Inserted after the bold lead `**4b feature ou story : compter les « je veux »**`: `(« Un seul « je veux » ? », « Vélos en panne et locations du jour : feature ou story ? », « Les stations presque vides : ce qu'il reste à livrer »)`. This puts every bank case in Consignes, following the 4a1-4a3 pattern. Counted moved.
- M9: the whole lead paragraph of « Banque d'exemples » became « Faits du fil rouge utilisés », including its first sentence (the bank's wordings are exercise proposals, not storyline facts: what is not fixed). Lead words dropped: old `Les faits viennent du fil rouge : Étienne veut suivre`, new `Étienne veut suivre`. No other lead text was left, so « Banque d'exemples » opens directly on its first case.
- M10: old path in a source cell (row « La tâche est dans le plan des Developers »): `course/sources/00-scrum.md` became `concepts/00-scrum/sources.md`. Counted moved.
- M10: old path in a source cell (rows « La tâche est dans le plan des Developers » and « Un travail qui ne sert qu'à réaliser une story »): `course/sources/03-backlog-produit.md` became `concepts/03-backlog-produit/sources.md`. Counted moved.
- M10: old path in a source cell (row « Un travail qui ne sert qu'à réaliser une story »): `course/sources/01-produit-et-po.md` became `concepts/01-produit-et-po/sources.md`. Counted moved.
- M10: old path in the verification column (row « Chaque équipe choisit ses niveaux »): `course/plan.md` became `plan.md`. Counted moved.
- M10: the git-history and off-course.md pointers (« (`04-hierarchie.md`, historique git) », « (`off-course.md`, historique git) », « cadrage T-018a ») are in verification cells and « Références », not in the intro or « Non vérifié ». They are kept as they are. The intro and « Non vérifié » held no old path and no pointer to drop.
- M10 Nature: row « SAFe vise plusieurs équipes ; une équipe seule n'a pas besoin de ses niveaux » gets école. The MDX merged this claim into its SAFe item (kind ecole). That item is also the matching ecoles.ecole item (« Le cours juge qu'une équipe seule n'en a pas besoin »), so both readings give école.
- M10 Nature: three rows get an empty Nature because the matching MDX affirmation has no kind (the site's choice): « Une story est un besoin d'utilisateur », « Chaque équipe choisit ses niveaux », and « Exemple du fil rouge : la journée d'Étienne ». Row « Les libellés de l'arbre du Schéma » is also empty for the same reason.
- M10 Nature: row « La tâche : les Developers planifient… » is consensus (MDX item 3). Row « La tâche est dans le plan des Developers… pas au backlog produit » is cours (MDX item 4, « Le PO n'écrit pas la tâche ; elle est dans le plan des Developers »).
- M10: no orphan reference. S1 to S8 are each cited in a source cell, so no id was added. Source cell « aucune » is kept. The decisions/ folder holds only team-in-sprints.md, and SF names no old decision number.
- M13: neither file contains a banned character (em-dash, arrow) or a typographic apostrophe, so nothing was replaced. The `>` in tool hierarchies (Epic > Story > Subtask) is kept as it is, not counted as an arrow.
- M1: Objectif written from the course.yaml objective, capital C and final period added. CF Objectif matches it word for word. The MDX objectif (commas, 'et choisir') is the same content with different punctuation: no clause lost.
- M3: frontmatter item key order kept as in MDX (author, text, refs). refs kept as quoted strings, as in MDX.
- M3: every CF « Consensus et choix d'école » claim matched to an MDX item: consensus to consensus/Scrum Guide; Jira, Azure DevOps and SAFe to their school items; thème to neighbors 'Le thème'; Cohn to school/Mike Cohn; course choices to course items 1-3. CF's 'concept 15' equals MDX's 'vu au concept 15', so no reference was made more precise. Nothing carried over.
- M3: CF's general claim 'les niveaux par défaut changent d'un outil à l'autre, et chacun se modifie' matched to the Jira item, which already says 'modifiables'. It was not added to the Azure DevOps item, because the body (4a2) carries it and it would need rewording. Borderline call.
- M3: the CF teacher hint 'sans source externe, à présenter comme telles' was dropped by design (protocol rule stances-told-apart).
- M4: CF-only 'dans le backlog de sprint' added inside the tâche parenthesis: 'pour réaliser une story, dans le backlog de sprint'.
- M4: CF-only 'trois ou quatre niveaux' merged into the MDX sentence as an apposition: 'les outils ont leurs réglages par défaut, trois ou quatre niveaux, l'équipe choisit les siens'.
- M4: CF-only 'une feature peut prendre plusieurs sprints ; la taille ne tranche qu'entre story et epic, pour un seul « je veux »' appended to 'Le compte l'emporte sur la taille' (colon replaces the period).
- M4/M6: the Figure became the image line right after the L'essentiel paragraph, at the same place as in MDX.
- M5: the MDX h4 headings 4b1 'Le test du compte' and 4b2 'Ce que le compte ne regarde pas' are not in course.yaml. Each became the lead of the first paragraph of 4b's reader text, title in bold followed by a period inside the bold ('**Le test du compte.** ...'). Counted as moved.
- M6: Renvoi n='A1' written as 'annexe A1' (plain text). 'au <Renvoi n=5/>' written as 'au concept 5'.
- M6: FilRouge written as '> **Fil rouge :** La journée d'Étienne ...', capital L kept from the MDX text.
- M7: CF-only sentence 'Le régler dans l'outil : annexe A1.' kept in the item 'Garder un niveau de trop'.
- M7: CF-only sentence 'Ce qui existe déjà ne compte plus, et le travail technique n'est pas un « je veux » de plus pour l'utilisateur.' kept in the item 'Juger le niveau dans l'absolu'.
- M7: MDX wording kept wherever CF differed only in wording ('Déplier' vs CF 'Le repérer en dépliant'; comma vs CF semicolon in the last item). CF has no more precise references here and no item that MDX lacks.
- M8: the CF question equals the Reflexe slot apart from line breaks; written as one blockquote. Note: the Reflexe note verbatim; CF adds nothing.
- M13: no em-dash, arrow or typographic apostrophe found; the '>' in 'Epic > Story' is ASCII and was kept.
- arbre-niveaux-backlog.svg: The UI font (var(--font-ui)) becomes the generic family sans-serif on the root. (M11)
- arbre-niveaux-backlog.svg: Each node (.node.epic/.feat/.story) filled with --sch-band and stroked with a level colour is drawn as two superposed rects of the same geometry (a muted fill rect without stroke, then an outline rect of the stroke token's class), since one element carries one class; no visual element is lost. (M11)

## Checks

`mise exec -- specs/linear-course/checks/check-course courses/parcours-po --only course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography --concept 4`

```
course-yaml: ok
concept-folder: ok
conventions: ok
svg-contract: ok
sources: fail: concepts/04-hierarchie/sources.md:52 reference S8: type "interne (observation de session, pas une source externe)" must be one or more of primaire, secondaire, marketing, separated by commas
glossary-order: fail: concepts/04-hierarchie/concept.md:74 uses the term "User story", introduced by concept 5 (glossary.md:37), which comes later
typography: ok
```

Form fixes:
- concepts/04-hierarchie/sources.md: Références, S5 type column 'primaire, marketing pour la formation SAFe' became 'primaire, marketing (pour la formation SAFe)' (parenthesised the qualifier, as S2 to S4 do); fixed the sources type-list failure for S5

Left:
- sources.md:52 reference S8: type 'interne (observation de session, pas une source externe)' is not primaire, secondaire or marketing; fixing it would change what the text says (the source kind) or require a classification decision, and M10 says Références stays unchanged.
- concept.md:74 uses the term 'User story' (introduced by concept 5) in concept 4's reader text in the tools list; fixing would mean rewording the text or reordering the glossary/course, which changes what the text says.

Failing the run:
- sources: fail: concepts/04-hierarchie/sources.md:52 reference S8: type "interne (observation de session, pas une source externe)" must be one or more of primaire, secondaire, marketing, separated by commas
- glossary-order: fail: concepts/04-hierarchie/concept.md:74 uses the term "User story", introduced by concept 5 (glossary.md:37), which comes later

## Fixes after the run

Contributor pass on issue #150, under the rulings of #23 (2026-10-27, 2026-10-28).

- `concepts/04-hierarchie/sources.md`, Références, S8 type: « interne (observation de session, pas une source externe) » became « primaire (interne : observation de session, pas une source externe) ». S8 is cited by seven claims (and once in « Non vérifié »), so it is a reference; it is first-hand (the course's own session observation), so the closest allowed type is `primaire`, with the old wording as the parenthesised remark (SPEC.md 4.4). To judge: whether an internal observation should be typed `primaire` at all.
- S5 type « primaire, marketing (pour la formation SAFe) »: already in the SPEC.md 4.4 form (types, then an optional remark in parentheses); nothing changed.
- Ruling B: the run's writer already cited the three 4b case titles inline in « Consignes » item 2 (see "Writing choices"), as 4a1 to 4a3 do; no teaching content added; `concept-folder` is ok.
- Ruling C: no orphan reference (S1 to S8 all cited).
- Ruling A: the `glossary-order` failure is not fixed (see below).
- « annexe A2 » is not in the concept; the reader sub-heading 4b stays a bold-led paragraph.

Checks after the fixes (same command as above): course-yaml, concept-folder, conventions, svg-contract, sources, typography ok; `glossary-order` fail, left under ruling A:

- concepts/04-hierarchie/concept.md:74 uses the term "User story", introduced by concept 5 (glossary.md:37), which comes later
