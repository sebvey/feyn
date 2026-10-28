# Migration report: concept 1

Workflow `migrate-concept`, course `parcours-po`, concept folder `/Users/sve/code/workspaces/perso/feyn/.claude/worktrees/s1-10-147/courses/parcours-po/concepts/01-produit-et-po/`.
Old files: `/Users/sve/code/workspaces/perso/pdx/parcours-po/course/concepts/01-produit-et-po.md` (CF), `/Users/sve/code/workspaces/perso/pdx/parcours-po/course/sources/01-produit-et-po.md` (SF), `/Users/sve/code/workspaces/perso/pdx/parcours-po-website/src/content/concepts/fr/01-produit-et-po.mdx` (MDX), `/Users/sve/code/workspaces/perso/pdx/parcours-po-website/src/components/schemas/Schema01.astro` (ASTRO).

## Summary

| kept | moved | by design | lost | invented | refuted | checks | target existed | accepted |
|---|---|---|---|---|---|---|---|---|
| 5 | 25 | 6 | 1 | 0 | 0 | fail | no | no |

Result: **failed**. lost and invented count the rows confirmed by the verification; the rows it refuted (refuted) are listed at the end and count in no other column. checks is read in code from the output below, which the check agent returns; target existed is the scope agent's word.

## CF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter (concept, titre) and H1 | course.yaml (number, title) | by design | M1 | M1/M12: CF frontmatter and H1 are not written in the folder; course.yaml holds them |
| « Objectif » | concept.md « Objectif »; course.yaml objective | moved | M1 | lead « À la fin, l'apprenant sait » dropped; text equals the course.yaml objective (capital, final period); merge recorded in S1-08 « Objective merge » (concept 1: merged); no clause lost |
| « L'essentiel » | concept.md « L'essentiel » | moved | M4 | merged with MDX lead text, MDX wording as base; CF-only « (un consommateur de données en est un) » carried at its place after « les utilisateurs qui ont ce problème » |
| « Consensus et choix d'école » (section) | concept.md frontmatter stances | moved | M3 | not written as a section; each claim matches a frontmatter item: consensus 1 to stances.consensus (le produit, le PO), consensus 2 to stances.consensus (les Developers), Pichler to stances.school[0], Dehghani to stances.school[1], choix du cours to stances.course[1]; CF says nothing those items lack; no teacher hint to drop |
| « Sous-concepts » | teaching.md « Consignes » | moved | M9 | renamed « Consignes », text verbatim (diff empty). Remark: teaching.md adds after it a line « Cas de la banque : pour 1a, ... ; pour 1b, ... » that no old file has (an addition, not a loss) |
| « Banque d'exemples » (7 cases, all fields) | teaching.md « Banque d'exemples » | kept | M9 | same ### headings and every field verbatim (diff empty); CF has no lead paragraph, so no « Faits du fil rouge utilisés » section is due |
| « Pièges » (section) | concept.md « Pièges » | moved | M7 | merged with MDX <Erreurs>: MDX order and sentences; CF sentences added in their items: « Signe : un abonné ne comprendrait pas à quoi sert la plateforme. » (technique), « Le PO ordonne le backlog ; les faits du métier, il les obtient des utilisateurs. » (fait métier), « un comité qui vote l'ordre, ou deux PO qui se le partagent » (partager le rôle; CF « la responsabilité reste à un seul PO » rendered by MDX's counterpart « pas la responsabilité ») |
| Pièges: « Oublier la valeur » | concept.md « Pièges » item 2 | lost (L1) | M7 | new item is the MDX sentence only; CF's probing cue « et alors ? » (« une phrase qui dit ce que le produit affiche ou calcule, et alors ? ») is in no new file for this pitfall |
| « Le test rapide » | concept.md « Le test rapide » | moved | M8 | CF question (with its bold and « (PO) », « (Developers) ») as one blockquote, then the <Reflexe> note as one paragraph |
| « Schéma » | teaching.md « Schéma » | kept | M9 | verbatim (diff empty) |

## SF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter and H1 | none | by design | M10 | M10/M1: frontmatter and H1 dropped |
| « Affirmations » (section, 18 rows) | sources.md « Affirmations » | moved | M10 | header replaced by « Affirmation (section de `concept.md` ou de `teaching.md`) \| Source \| Ce qui a été vérifié \| Nature », Nature column added; rows same order, columns 1 to 3 unchanged except one section rename; source cells all unchanged, no orphan (S1, S2, S5 all cited) |
| row « La valeur est ce que l'utilisateur ou l'organisation gagne ... (Sous-concepts, 1a) » | sources.md « Affirmations », same row | moved | M10 | section name « Sous-concepts » becomes « Consignes »; Nature cours (MDX item kind cours); source « glossaire du cours » unchanged |
| rows 1 to 13 and « Partie prenante » row: Nature | sources.md « Affirmations » | moved | M10 | Nature from the MDX sources.affirmations kinds: consensus for product and PO/Developers rows, école for Pichler, cours for consommateurs and partie prenante; « Le PO dit pourquoi » given consensus (matches the PO consensus item) |
| Banque rows (streaming, proxy PO, vote et deux PO, même PO, Sprint Planning): Nature | sources.md « Affirmations » | moved | M10 | Nature left empty. Remark: « Le PO répond de la valeur et de l'ordre même quand le travail est délégué ; avec un vote ou deux PO... » partly matches the MDX consensus item « Le PO est une seule personne, pas un comité ; il peut déléguer le travail mais reste responsable »; empty is defensible since the verification says the reasoning is the course's |
| « Références » | sources.md « Références » | kept | M10 |  |
| « Non vérifié » | sources.md « Non vérifié » | kept | M10 | diff empty |

## MDX: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| numero, titre, prerequis | course.yaml (number, title, prerequisites [0]) | moved | M1 | carried out of the folder to course.yaml |
| objectif | course.yaml objective; concept.md « Objectif » | moved | M1 | identical to the objective (capitalised, final period) |
| description | concept.md frontmatter description | kept | M2 |  |
| ecoles.consensus (3 items) | concept.md frontmatter stances.consensus | moved | M3 | keys renamed auteur/texte to author/text, texts and refs [S1] unchanged |
| ecoles.ecole (2 items) | concept.md frontmatter stances.school | moved | M3 | keys renamed, texts unchanged, refs [S5, S1] and [S2] unchanged |
| ecoles.cours (4 items) | concept.md frontmatter stances.course | moved | M3 | keys renamed, texts unchanged, refs [S5], [S2], [S1], [] unchanged; no voisines in MDX |
| sources (affirmations texts, references, nonVerifie) | none (only kinds used in sources.md Nature) | by design | M12 | M10/M12: the MDX sources texts are by design; only their kind is used |
| alignement | none | by design | M12 | M12: MDX alignement |
| import Schema01 | none | by design | M12 | M6/M12: import lines |
| lead text before first <Sous> | concept.md « L'essentiel » | moved | M4 | base of the merge, wording unchanged, CF clause inserted |
| <Figure legende> with <Schema01 /> | concept.md « L'essentiel » image; frontmatter diagrams[0] | moved | M6 | converted to ![<title>](produit-probleme-utilisateurs-valeur.svg) alone in its paragraph at the same place; legende is the caption verbatim; subconcept 1a (the diagram draws 1a then 1b; first one taken) |
| <Sous 1a> (title, promesse, reader text, pastilles, FilRouge) | concept.md « 1a Le produit : problème, utilisateurs, valeur » | moved | M5 | ## heading with course.yaml title (same as MDX), promise in italics, 4 paragraphs unchanged, pastilles to [consensus] [école] [cours] [école] [cours], FilRouge to a « **Fil rouge :** » blockquote |
| <Sous 1b> (title, promesse, reader text, Renvoi, pastilles, FilRouge) | concept.md « 1b Qui tranche quoi » | moved | M5 | <Renvoi n="0"/> to « concept 0 », <Renvoi n="14"/> to « concept 14 », pastilles converted, FilRouge to blockquote; reader text unchanged |
| <Reflexe note> | concept.md « Le test rapide » | moved | M8 | note as the paragraph after the CF question; the Reflexe slot (« (le PO) », « (les Developers) ») replaced by the CF question as M8 says |
| <Erreurs> list (7 items) | concept.md « Pièges » | moved | M7 | order and sentences kept, merged with CF additions |

## ASTRO: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Schema01 component (svg, viewBox 0 0 600 660) | produit-probleme-utilisateurs-valeur.svg | moved | M11 | numbered component, stem from four words of the <title>; same viewBox and geometry; colonnes.map and lignes.map written out (x 118/300/482, y 518 to 584 checked); losses (one-colour mapping) recorded outside the folder, not checked here |
| <title> and <desc> | SVG <title id=produit-probleme-utilisateurs-valeur-titre>, <desc ...-desc> | moved | M11 | texts unchanged, ids prefixed with the stem; title equals the frontmatter title |
| spokes, Produit circle, Problème, Valeur, Utilisateurs boxes, two families | SVG groups 1a-rayons, 1a-produit, 1a-probleme, 1a-valeur, 1a-utilisateurs, 1a-familles | moved | M11 | tokens mapped: grey-line muted stroke 0.75, s1 primary 0.3, s-ink primary text, band muted fill 0.12, band-line muted stroke 0.45, s2 secondary stroke 0.85, text-soft muted text, text default; box.strong drawn as muted fill plus primary outline |
| « Qui tranche quoi » title, three columns, legend lines | SVG groups 1b-titre, 1b-po, 1b-developers, 1b-parties-prenantes, 1b-legende | moved | M11 | all text lines present; col-head s1 to primary 0.3, col-title s-ink to primary, col-body band/band-line to muted 0.12/0.45 |
| Astro frontmatter code (colonnes array, comments) and <style> | none | by design | M12 | M12: Astro frontmatter code once written out; <style> replaced by currentColor and classes (M11) |

## Lost

| Id | Source | Old item | Missing | Verification |
|---|---|---|---|---|
| L1 | CF | Pièges: « Oublier la valeur » | new item is the MDX sentence only; CF's probing cue « et alors ? » (« une phrase qui dit ce que le produit affiche ou calcule, et alors ? ») is in no new file for this pitfall | CF line 227-228 pitfall: « une phrase qui dit ce que le produit affiche ou calcule, et alors ? Tant que la phrase ne dit pas ce qui change pour une personne nommée, la valeur manque. » New concept.md « Pièges » item 2 (line 78) is the MDX sentence verbatim (MDX line 172), with no « et alors ? » cue; the rest of the CF meaning (what changes for a named person) is in it. The other pitfalls got their CF-only additions (item 1 « Signe : … », items 4 and 7), but this one did not. grep « et alors » over the new folder finds it only in teaching.md: line 50, Consignes 1a, for a value given as a deliverable, and the case « Et alors ? », lines 78-92. Both are copied from other CF parts (CF lines 85 and 113-127), not from this pitfall, so the reader-facing probing cue of M7 item 2 is missing. It is a small loss. |

## Invented

None.

## Refuted by the verification

None.

## Writing choices

- M9: CF « Sous-concepts » cites no case by its title. Copying it verbatim would leave every case uncited, so I copied it as it is and added one paragraph after the list: « Cas de la banque : pour 1a, « Présenter la plateforme à un nouvel arrivant », « L'équipe appli, utilisatrice de la plateforme ? » et « « Et alors ? » » ; pour 1b, « Dana propose de passer au streaming », « Un vote pour ordonner le backlog », « Deux PO pour la plateforme ? » et « Qui choisit le travail du sprint ? ». ». This paragraph is added text; it is not in CF.
- M9: CF « Banque d'exemples » has no lead paragraph, so « Faits du fil rouge utilisés » is not written. The bank begins straight with its first ### case. The cases are copied verbatim, with the same headings and fields and no blank line after each heading, as in CF.
- M9: CF « Schéma » copied verbatim under « Schéma ».
- M10: SF has no intro paragraph, so none was written.
- M10: no orphan reference. S1, S2 and S5 are each cited in a source column, so no source cell was changed. The cell « glossaire du cours » is kept as it is.
- M10: the section name « Sous-concepts » becomes « Consignes » in the row about Valeur. The section names « Consensus », « Banque … » and « Pièges » are kept as they are.
- M10 Nature, row « Décrire un produit par problème, utilisateurs et valeur, choix d'école de Pichler »: two MDX items are close, « Décrire un produit par ses utilisateurs, les problèmes… : choix d'école de Pichler » (kind ecole) and « La grille problème, utilisateurs, valeur » (kind cours). I took école because the row names Pichler's school choice.
- M10 Nature, row « Le PO dit pourquoi (1b) »: no MDX item states this claim word for word. MDX item « Le PO répond du backlog : il développe et communique l'objectif produit… » (consensus) has folded in this row's verification quotes, including the Sprint Planning quote. I took consensus.
- M10 Nature, row « Le PO répond de la valeur et de l'ordre même quand le travail est délégué ; avec un vote ou deux PO, personne n'en répondrait »: no MDX item states it. It matches the consensus ecoles item about the PO only in part, and its verification column calls the reasoning the course's own. I left it empty.
- M10 Nature, rows « Même un travail technique passe par le backlog… », « Le Scrum Guide ne parle pas de « proxy PO » », « Plusieurs équipes sur un même produit partagent le même PO » and « Au Sprint Planning, le PO propose… »: no MDX sources item states them and no ecoles item matches them, so all four are left empty.
- M10 Nature: the rows on the four consensus points (value, backlog, one person, delegation) and the rows on represents stakeholders, Developers decide how, sizing, sprint selection and backlog says what are consensus, from the matching MDX items. Consumers of data, stakeholder and value are cours.
- M13: CF and SF have no em-dash, arrow or typographic apostrophe, so nothing was replaced.
- Observation: when I finished, an SVG I did not write was in the target folder (produit-probleme-utilisateurs-valeur.svg). It is presumably from a parallel step; I left it alone.
- M1: Objectif written as the course.yaml objective with a capital first letter and a final period; it matches the MDX objectif word for word, and the CF « Objectif » differs only by its lead « À la fin, l'apprenant sait », which the S1-08 merge records.
- M3: every CF « Consensus et choix d'école » claim matched to an MDX frontmatter item (product definition goes to consensus 1; PO, delegation and convincing go to consensus 2; how, sizing and sprint work go to consensus 3; Pichler goes to school 1; Dehghani goes to school 2; the data-consumers choice goes to course 2). Nothing CF-only was found to carry, so the MDX texts are unchanged. CF has no teacher hint on the course's choices. MDX has no ecoles.voisines, so no neighbors key.
- M4: one CF-only clause added to the MDX essentials at the place CF says it: « (un consommateur de données en est un) » after « les **utilisateurs** qui ont ce problème ». The rest of CF essentials is MDX wording in another form (« le problème » vs « le **problème** », « dit quoi faire »), so the MDX wording is kept.
- M4/M6: the <Figure> sits right after the essentials paragraph, so it became the image line there. The diagrams entry is the given one, subconcept 1a.
- M6: « Le concept <Renvoi n="0" /> a situé » became « Le concept 0 a situé », and « viennent au concept <Renvoi n="14" /> » became « viennent au concept 14 ». The word « concept » already in the MDX before the renvoi was not doubled (« concept concept 0 »).
- M7: the CF sentence « Signe : un abonné ne comprendrait pas à quoi sert la plateforme. » was added to the « Décrire le produit par sa technique » item.
- M7: the CF sentence « Le PO ordonne le backlog ; les faits du métier, il les obtient des utilisateurs. » was added to the « Trancher seul un fait métier » item.
- M7: in « Partager le rôle », the CF sentence « un comité qui vote l'ordre, ou deux PO qui se le partagent. » was put before the MDX sentence, with « Déléguer » capitalised. CF's « ; la responsabilité reste à un seul PO » was not added: it restates the MDX « pas la responsabilité ».
- M7: in « Oublier la valeur », the MDX sentence is kept alone. CF's « et alors ? Tant que la phrase ne dit pas ce qui change pour une personne nommée, la valeur manque » says the same thing as the MDX sentence, in other words.
- M8: the blockquote is the CF question, verbatim with its bold and « (PO) », « (Developers) », keeping CF's line breaks; the MDX <Reflexe> slot (« (le PO) », « (les Developers) », no bold) is not used. The note is the <Reflexe> note, and CF adds nothing to it.
- M13: no em-dash, arrow or typographic apostrophe found, so no replacement was made.
- produit-probleme-utilisateurs-valeur.svg: Colour mapping: --sch-s1 (product disc, column heads fill, Utilisateurs box outline) becomes class primary at opacity 0.3 (M11)
- produit-probleme-utilisateurs-valeur.svg: Colour mapping: --sch-s-ink (contrast ink of the Produit label and column titles over s1) becomes class primary at opacity 1; the light-on-dark contrast ink is lost, the s1 fills are lightened to 0.3 so the dark text stays readable over them (M11)
- produit-probleme-utilisateurs-valeur.svg: Colour mapping: --sch-s2 (outline of the two user-family boxes) becomes class secondary at stroke-opacity 0.85 (M11)
- produit-probleme-utilisateurs-valeur.svg: Colour mapping: --sch-band (box and column-body fills) becomes class muted at fill-opacity 0.12 (M11)
- produit-probleme-utilisateurs-valeur.svg: Colour mapping: --sch-band-line (box and column-body outlines) becomes class muted at stroke-opacity 0.45 (M11)
- produit-probleme-utilisateurs-valeur.svg: Colour mapping: --sch-grey-line (spokes and links to the families) becomes class muted at stroke-opacity 0.75 (M11)
- produit-probleme-utilisateurs-valeur.svg: Colour mapping: --sch-text (headings, labels, column lines) becomes no class (root currentColor) at opacity 1 (M11)
- produit-probleme-utilisateurs-valeur.svg: Colour mapping: --sch-text-soft (soft captions and the bottom legend) becomes class muted at opacity 1 (M11)
- produit-probleme-utilisateurs-valeur.svg: The Utilisateurs box (band fill with an s1 outline) is drawn as two rects, a muted fill and a primary outline (M11)
- produit-probleme-utilisateurs-valeur.svg: The UI font var(--font-ui) becomes the generic font-family sans-serif (M11)
- produit-probleme-utilisateurs-valeur.svg: The <style> element and CSS classes (spoke, link, produit, box, head, soft, label, fam, col-head, col-title, col-body, line) are written out as attributes; the JS loop over the three columns is written out (M11)

## Checks

`mise exec -- specs/linear-course/checks/check-course /Users/sve/code/workspaces/perso/feyn/.claude/worktrees/s1-10-147/courses/parcours-po --only course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography --concept 1`

```
course-yaml: ok
concept-folder: ok
conventions: ok
svg-contract: ok
sources: ok
glossary-order: fail: concepts/01-produit-et-po/concept.md:80 uses the term "Acteur", introduced by concept 6 (glossary.md:39), which comes later
glossary-order: fail: concepts/01-produit-et-po/concept.md:83 uses the term "Rôle", introduced by concept 6 (glossary.md:40), which comes later
glossary-order: fail: concepts/01-produit-et-po/concept.md:71 uses the term "Ordonner", introduced by concept 3 (glossary.md:67), which comes later
glossary-order: fail: concepts/01-produit-et-po/concept.md:59 uses the term "État", introduced by concept A1 (glossary.md:88), which comes later
typography: ok
```

Left:
- concept.md:80 'Acteur' (introduced by concept 6): the sentence says « il se demande à l'acteur concerné ». Avoiding the term means rewording the course text, not a form fix.
- concept.md:83 'Rôle' (introduced by concept 6): the item says « Partager le rôle ». Avoiding the term means rewording the course text, not a form fix.
- concept.md:71 'Ordonner' (introduced by concept 3): the sentence says « sans ordonner le backlog ». Avoiding the term means rewording the course text, not a form fix.
- concept.md:59 'État' (introduced by concept A1): the Fil rouge says « le point sur l'état du réseau ». Avoiding the term means rewording the course text, not a form fix.

Failing the run:
- glossary-order: fail: concepts/01-produit-et-po/concept.md:80 uses the term "Acteur", introduced by concept 6 (glossary.md:39), which comes later
- glossary-order: fail: concepts/01-produit-et-po/concept.md:83 uses the term "Rôle", introduced by concept 6 (glossary.md:40), which comes later
- glossary-order: fail: concepts/01-produit-et-po/concept.md:71 uses the term "Ordonner", introduced by concept 3 (glossary.md:67), which comes later
- glossary-order: fail: concepts/01-produit-et-po/concept.md:59 uses the term "État", introduced by concept A1 (glossary.md:88), which comes later

## Fixes after the run

- L1 (lost, « et alors ? »): `concept.md` « Pièges », « Oublier la valeur » now ends « ... sans dire ce qui change pour une personne nommée : et alors ? », the MDX sentence kept and the CF probing cue restored.
- `glossary-order` (4 failures above): not fixed, by the maintainer's ruling A of 2026-10-28 on #23; the last sub-issue of #23 fixes them.
- The « Cas de la banque » line of `teaching.md` (writing choice M9): allowed by ruling B; it cites the seven case titles of the bank exactly as their `###` headings.
