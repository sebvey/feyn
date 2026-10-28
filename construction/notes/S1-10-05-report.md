# Migration report: concept 5

Workflow `migrate-concept`, course `parcours-po`, concept folder `concepts/05-user-story/`. Paths in the course folder are relative to it; the old files are named from their repository folder (`parcours-po`, `parcours-po-website`).
Old files: `parcours-po/course/concepts/05-user-story.md` (CF), `parcours-po/course/sources/05-user-story.md` (SF), `parcours-po-website/src/content/concepts/fr/05-user-story.mdx` (MDX), `parcours-po-website/src/components/schemas/Schema05.astro` (ASTRO).

## Summary

| kept | moved | by design | lost | invented | refuted | checks | target existed | accepted |
|---|---|---|---|---|---|---|---|---|
| 14 | 39 | 7 | 1 | 1 | 2 | fail | no | no |

Result: **failed**. lost and invented count the rows confirmed by the verification; the rows it refuted (refuted) are listed at the end and count in no other column. checks is read in code from the output below, which the check agent returns; target existed is read in code from the listing below, which the scope agent returns.

## Target before the run

`ls -ld concepts/05-user-story; ls -la concepts/05-user-story`, as the scope agent returned it: no such folder.

```
ls: concepts/05-user-story: No such file or directory
ls: concepts/05-user-story: No such file or directory
```

## CF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Frontmatter (concept, titre) and H1 « La user story » | course.yaml (number 5, title) | by design | M1 | M1/M12: CF frontmatter and H1 not written in the folder; course.yaml holds them |
| « Objectif » | course.yaml objective; concept.md « Objectif » | moved | M1 | CF objective is the course.yaml objective verbatim (S1-08 merge: concept 5 'merged'); concept.md « Objectif » repeats it word for word |
| « L'essentiel » | concept.md « L'essentiel » | moved | M4 | Merged with MDX intro, MDX wording as base (« vu de lui : ni son parcours entier, ni une spécification », « Elle s'écrit souvent »); CF adds nothing MDX lacks |
| « Consensus et choix d'école » | concept.md frontmatter stances.consensus / stances.school / stances.course | moved | M3 | Each claim matched to a frontmatter item: Scrum Guide (consensus 1), XP/Kent Beck/3C Jeffries 2001 (consensus 2), Connextra format with Cohn (school 1), confirmation and acceptance tests (school 2), « pourquoi ? » successifs inspired by Toyota (course 1); no claim or reference only CF carries; no section written |
| « Sous-concepts » item 5a | teaching.md « Consignes » item 1 | moved | M9 | Verbatim, but case citations rewritten to their exact headings: « La demande de Maud » to « La demande de Maud, en story », « Une semaine de Maud » to « Une semaine de Maud : story ou parcours ? » |
| « Sous-concepts » item 5b | teaching.md « Consignes » item 2 | kept | M9 | Verbatim; note an added line not in CF: « Cas : « Trois “afin de” à juger », « Remonter de la demande à la décision » et « Un « afin de » trop haut ». » (no rule names this addition) |
| « Banque d'exemples » lead paragraph | teaching.md « Banque d'exemples », top | kept | M9 | It lists no storyline facts used, so it stays as lead text; no « Faits du fil rouge utilisés » section |
| Case « La demande de Maud, en story (5a1) » | teaching.md « Banque d'exemples » | kept | M9 | All fields verbatim (<qui> escaped as \<qui>, form) |
| Case « Une semaine de Maud : story ou parcours ? (5a1) » | teaching.md « Banque d'exemples » | kept | M9 |  |
| Case « La carte suffit-elle ? (5a2) » | teaching.md « Banque d'exemples » | kept | M9 |  |
| Case « Trois « afin de » à juger (5b) » | teaching.md « Banque d'exemples » | kept | M9 |  |
| Case « Remonter de la demande à la décision (5b) », field « Réponses de Maud, à donner seulement quand l'apprenant pose la question » | teaching.md, same case, field « Réserve, sur demande » | moved | M9 | Field relabelled to the SPEC 4.3 label « Réserve, sur demande » and placed before « Situation » (SPEC order); old label kept as the field's first words, answers verbatim |
| Case « Un « afin de » trop haut (5b) » | teaching.md « Banque d'exemples » | kept | M9 |  |
| « Pièges » | concept.md « Pièges » | moved | M7 | Merged with MDX <Erreurs>, MDX order and sentences; CF « piège probable de qui n'a jamais lu de story » carried into item 1 |
| « Pièges » item « Une solution dans le « je veux » » | concept.md « Pièges » item 2 | lost (L1) | M7 | CF precision on the concept 7 reference missing: « (besoin ou solution) » |
| « Pièges » item « « Afin de » circulaire ou de confort » | concept.md « Pièges » item 3 | lost (L2, refuted) | M7 | CF examples absent from MDX not carried: « (« je veux voir les locations, afin de suivre les locations », « afin d'être bien informé ») » |
| « Pièges » item « Inventer la raison » | concept.md « Pièges » item 5 | lost (L3, refuted) | M7 | CF precision missing: « au lieu de la demander à l'utilisateur » became « au lieu de la demander » |
| « Le test rapide » | concept.md « Le test rapide » | moved | M8 | CF question as one blockquote, then the Reflexe note « Formulation du cours, sans source. » |
| « Schéma » | teaching.md « Schéma » | kept | M9 | Verbatim |

## SF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Frontmatter and H1 « Sources : La user story » | none | by design | M10 | M10/M1: frontmatter and H1 dropped |
| Intro paragraph | sources.md intro | kept | M10 | Unchanged; no old path or pointer in it |
| « Affirmations » (three tables under ### 5a, ### 5b, ### Pièges) | sources.md « Affirmations » | moved | M10 | Same 28 rows, same order, texts unchanged, merged into one table (SPEC 4.4 one table, the ### group headings dropped), new header, Nature column added; every source cell copied unchanged; no orphan (S1-S7 and S9 all cited) |
| Nature column values | sources.md « Affirmations », column 4 | moved | M10 | Checked row by row against MDX sources.affirmations: kinds match (ecole written école); empty for « besoin vu de l'utilisateur », « Exemples du fil rouge », « parcours/story map » (MDX items without kind) and « Contradiction interne » (no MDX item, no ecoles match) |
| Row « Exemples du fil rouge en 5a et 5b … (Sous-concepts) » | sources.md « Affirmations » | moved | M10 | Section name « (Sous-concepts) » became « (Consignes) » |
| Row « Une story, un seul « je veux » » verification pointer (`off-course.md`, historique git) | sources.md « Affirmations », verification column | kept | M10 | Not the intro nor « Non vérifié »: stays as it is |
| « Références » | sources.md « Références » | kept | M10 | Unchanged, S9 « (cadrage T-018a, non relu ici) » kept; note: frontmatter neighbors cite S8 (from MDX) while this table has S9 |
| « Non vérifié » | sources.md « Non vérifié » | kept | M10 | Unchanged but for the item below (<role> escaped as \<role>, form) |
| « Non vérifié » item « Cohn, User Stories Applied (2004) » | sources.md « Non vérifié » | moved | M10 | Task-id pointer dropped: « livre non lu (cadrage T-018a §8) ; rien du fichier » became « livre non lu ; rien du fichier » |

## MDX: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| numero, titre, prerequis | course.yaml | by design | M1 | M1: course.yaml holds them |
| objectif | course.yaml objective | moved | M1 | « en sachant que la phrase seule ne suffit pas » carried by the objective's « savoir que la phrase seule ne suffit pas (les 3C) » (S1-08 merged) |
| description | concept.md frontmatter description | kept | M2 |  |
| ecoles.consensus (2 items) | concept.md frontmatter stances.consensus | moved | M3 | Keys auteur/texte to author/text, texts and refs unchanged |
| ecoles.ecole (2 items) | concept.md frontmatter stances.school | moved | M3 | Keys renamed, texts and refs unchanged |
| ecoles.cours (5 items) | concept.md frontmatter stances.course | moved | M3 | Keys renamed, texts and refs unchanged (empty refs kept as []) |
| ecoles.voisines | concept.md frontmatter neighbors | moved | M3 | Keys renamed, text and refs [S8] unchanged |
| sources (affirmations texts, references, nonVerifie) | sources.md Nature column only | by design | M12 | M10/M12: the MDX sources texts are by design; only their kind is used |
| alignement | none | by design | M12 | M12: MDX alignement |
| import Schema05 | none | by design | M12 | M6/M12: import lines |
| Intro text before first <Sous> | concept.md « L'essentiel » | kept | M4 | Base wording, word for word |
| <Figure legende> with <Schema05 /> | concept.md « L'essentiel » image; frontmatter diagrams[0] | moved | M6 | ![title](phrase-trois-blocs-pourquoi.svg) at the same place; legende as caption (’ to ', form); subconcept 5a |
| <Sous id=5a> titre and promesse | concept.md « 5a Les trois parties et les 3C » | moved | M5 | ## heading, promise as one italic paragraph |
| <h4 5a1> Les trois parties and reader text | concept.md « 5a1 Les trois parties » | moved | M5 | ### heading; text unchanged; Renvoi 6, 4, 16 to « concept 6/4/16 »; Pastille ecole to [école]; FilRouge Régis to blockquote « **Fil rouge :** » |
| <h4 5a2> Les 3C and reader text | concept.md « 5a2 Les 3C » | moved | M5 | ### heading; text unchanged; Pastilles to [consensus], [école]; Renvoi 8 to concept 8; FilRouge Abba to blockquote |
| <Sous id=5b> titre and promesse | concept.md « 5b Le « afin de » et les « pourquoi ? » successifs » | moved | M5 | ## heading, promise in italics |
| <h4 5b1> Un « afin de » qui sert | concept.md « 5b », paragraph led by **Un « afin de » qui sert.** | moved | M5 | 5b1 not a course.yaml leaf: paragraph led by its title in bold; text unchanged, Pastilles [école], [cours] |
| <h4 5b2> Remonter par les « pourquoi ? » | concept.md « 5b », paragraph led by **Remonter par les « pourquoi ? ».** | moved | M5 | 5b2 not a course.yaml leaf: bold-led paragraph; Renvoi 2 to concept 2; FilRouge Étienne to blockquote |
| <Reflexe note> | concept.md « Le test rapide » | moved | M8 | Question blockquote, note paragraph |
| <Erreurs> list (9 items) | concept.md « Pièges » | moved | M7 | MDX order and sentences; Renvoi 16, 7, 1, 6, 8 converted; ’ to ' (form) |

## ASTRO: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Astro frontmatter comment | none | by design | M12 | M12: Astro frontmatter code |
| Schema05 component as a whole | phrase-trois-blocs-pourquoi.svg | moved | M11 | Same viewBox 0 0 600 470 and geometry; <title> and <desc> kept (’ to '); ids prefixed with stem; colour mapping: --sch-s1 primary 0.85, --sch-s2 secondary 0.6, --sch-text secondary 1, --sch-text-soft muted 0.85, --sch-band muted 0.15, --sch-band-line muted 0.5, --sch-grey-line muted 0.35, --sch-s-ink none (gap) |
| <style> block and CSS classes | phrase-trois-blocs-pourquoi.svg attributes | moved | M11 | Written out as currentColor with fill/stroke-opacity and classes per the mapping; font var(--font-ui) to system-ui |
| Marker g5-arr (.arrow-head) | defs, phrase-trois-blocs-pourquoi-fleche | moved | M11 | muted 0.85 |
| Card (.kcard, .card-title, .card-sub, .card-line) | group 5a2-carte | moved | M11 | band/band-line muted 0.15/0.5; title secondary 1; sub muted 0.85 |
| Bubble (.bubble rect and tail, .bubble-text) | group 5a2-conversation | moved | M11 | Fill band muted 0.15 and stroke s2 secondary 0.6 drawn as two elements; loss: the second hue of --sch-s2 |
| Check (.check-bg circle, .check path in --sch-s-ink), « Confirmation » label | group 5a2-confirmation | moved | M11 | Circle primary 0.85; the s-ink check becomes a gap cut by a mask; loss: contrast ink |
| « les 3C (Jeffries, XP) » | group 5a2-les-3c | moved | M11 | muted 0.85 |
| Rung .rung.high (dashed, grey) and texts | group 5b-barreau-trop-haut | moved | M11 | Stroke muted 0.35 dashed 7 5, no fill; texts muted 0.85, tag italic |
| Three « pourquoi ? » arrows and labels | groups 5b-pourquoi-1/2/3 | moved | M11 | muted 0.85, weight 600 |
| Rung .rung.stop and .tag-stop texts | group 5b-barreau-decision | moved | M11 | Fill muted 0.15 plus primary 0.85 stroke width 4; bold texts secondary 1 |
| Rung « savoir combien de vélos sont sortis » | group 5b-barreau-intermediaire | moved | M11 | textLength kept |
| Rung .rung.weak (opacity 0.85), .strike (opacity 0.85), tag | group 5b-barreau-circulaire | moved | M11 | Element opacity 0.85 kept on the rect and on the strike path, on top of their token pairs |
| Three blocks (.block, .block.main, .main-text, .main-hint) | groups 5a1-blocs and 5a1-afin-de | moved | M11 | Blocks muted 0.15/0.5; main block primary 0.85 fill and stroke; s-ink texts « afin de » / « pourquoi » become gaps through a mask; loss: contrast ink |
| Footer « exemple inventé pour l'illustration » | group 5b-exemple | moved | M11 | muted 0.85 |

## Lost

| Id | Source | Old item | Missing | Verification |
|---|---|---|---|---|
| L1 | CF | « Pièges » item « Une solution dans le « je veux » » | CF precision on the concept 7 reference missing: « (besoin ou solution) » | The new concept.md Pièges item 2 (line 98) ends « (le concept 7 y revient). » with no « besoin ou solution ». The only place the phrase appears in the new folder is sources.md line 36, in the verification column copied from SF line 54. That text belongs to the sources file, not to the concept. No reader or teaching text in concept.md or teaching.md says what concept 7 covers, so CF's precision (CF lines 222-224) is lost. |

## Invented

| Id | File | Section | New text | Why | Verification |
|---|---|---|---|---|---|
| I1 | teaching.md | Consignes | Cas : « Trois “afin de” à juger », « Remonter de la demande à la décision » et « Un « afin de » trop haut ». | No old text carries this sentence: CF « Sous-concepts » item 2 (5b) ends at « c'est un bon point d'arrêt. » and names no case. M9 says « Consignes » is CF « Sous-concepts » verbatim, so this is an added sentence, not a copied one. It was probably added to pass the SPEC.md 4.3 check that every case is cited in « Consignes ». The information it carries, that these three cases belong to 5b, is already in the old bank headings « (5b) ». It adds no new claim, but it is a new teaching instruction in the copied text: the maintainer should decide whether this line is allowed as moved or must be recorded. | In CF « Sous-concepts » (pdx/parcours-po/course/concepts/05-user-story.md line 62), item 2 ends at « c'est un bon point d'arrêt. », followed by a blank line and then « ## Banque d'exemples » at line 64. No « Cas : » line follows it. Searches of CF, SF and MDX found no sentence listing these three cases. Only the bank headings with « (5b) » (CF lines 171 and 195) and the lead paragraph (CF lines 67-68) name them, and none of those is this sentence. M9 requires « Consignes » to be verbatim, and no rule produces this line, so it is added text in teaching.md lines 27-28. |

## Refuted by the verification

| Id | Flagged | Found |
|---|---|---|
| L2 | « Pièges » item « « Afin de » circulaire ou de confort » | Both CF examples appear in the new concept.md, in the 5b reader text. Line 84 has « je veux voir les locations, afin de suivre les locations » as the circular « afin de ». Line 85 has « afin d'être bien informé » as the comfort one. teaching.md line 20 and the SVG text (« suivre les locations ») carry them too. The meaning is in the new files, only not inside the Pièges item. |
| L3 | « Pièges » item « Inventer la raison » | The precision that the reason is asked of the user appears several times in the new concept.md. Line 87 reads « Le PO n'invente pas la raison : il la demande à l'utilisateur [cours]. » Line 23 is the stances.course item with the same sentence, line 80 is the 5b promise « La raison se demande à l'utilisateur… », and line 99 is the previous pitfall. So the meaning of « au lieu de la demander à l'utilisateur » is carried, even though line 101 itself shortens it to MDX's wording. |

## Colour mapping (M11)

One pair of class and opacity per old colour token, decided once for all the diagrams of the concept.

| Token | Class | Opacity | Draws | Diagrams |
|---|---|---|---|---|
| `--sch-s1` | primary | 0.85 | Schema05: highlight ink: fill of the check disc (.check-bg), thick outline of the stop rung (.rung.stop), fill and outline of the « afin de » block (.block.main) | phrase-trois-blocs-pourquoi.svg |
| `--sch-s2` | secondary | 0.6 | Schema05: outline of the Conversation bubble and its tail (.bubble stroke) | phrase-trois-blocs-pourquoi.svg |
| `--sch-text` | secondary | 1 | Schema05: main text (card-title, bubble-text, label, rung-text, tag-stop, block-text) and the strike line across « suivre les locations » (.strike) | phrase-trois-blocs-pourquoi.svg |
| `--sch-text-soft` | muted | 0.85 | Schema05: arrows of the ladder (.line, .arrow-head marker), soft texts (card-sub, soft, rung soft-text, tag, why, block-hint) | phrase-trois-blocs-pourquoi.svg |
| `--sch-band` | muted | 0.15 | Schema05: light fill of the card (.kcard), the bubble, the rungs (.rung) and the plain blocks (.block) | phrase-trois-blocs-pourquoi.svg |
| `--sch-band-line` | muted | 0.5 | Schema05: outlines of the card, rungs and plain blocks, and the card's written lines (.card-line) | phrase-trois-blocs-pourquoi.svg |
| `--sch-grey-line` | muted | 0.35 | Schema05: dashed outline of the « trop haut » rung (.rung.high, fill none) | phrase-trois-blocs-pourquoi.svg |
| `--sch-s-ink` | none | none (a gap) | Schema05: contrast ink drawn over --sch-s1 shapes: the tick over the check disc (.check) and the « afin de » / « pourquoi » texts over the main block (.main-text, .main-hint); become gaps (knock-outs) in the shape | phrase-trois-blocs-pourquoi.svg |

## Writing choices

- M9: the case citations in « Consignes » were rewritten to match the headings exactly. « La demande de Maud » became « La demande de Maud, en story », and « Une semaine de Maud » became « Une semaine de Maud : story ou parcours ? ».
- M9: the old « Sous-concepts » cited none of the three 5b cases. A line was added at the end of item 2 so that every case is cited in « Consignes »: "Cas : « Trois “afin de” à juger », « Remonter de la demande à la décision » et « Un « afin de » trop haut »." The cases are listed in bank order. The order constraint stays in the bank's lead paragraph.
- M9: there is no « Faits du fil rouge utilisés » section. The lead paragraph of CF « Banque d'exemples » says how the teacher plays Maud, which case comes after which, and that the drafts are invented. It does not list the storyline facts used, so all of it stays at the top of « Banque d'exemples ».
- M9: in the case « Remonter de la demande à la décision », the field '**Réponses de Maud, à donner seulement quand l'apprenant pose la question** :' is not a SPEC 4.3 label. It became '**Réserve, sur demande** : réponses de Maud, à donner seulement quand l'apprenant pose la question : …', with the old label kept as the first words of the text. It was moved before « Situation », as SPEC 4.3 orders it. The text is otherwise verbatim.
- M13: in teaching.md, the placeholders <qui>, <quoi> and <pourquoi> (case « La demande de Maud, en story », Explication) were escaped as \<qui>, \<quoi> and \<pourquoi>, so that CommonMark does not read them as HTML tags. They render the same.
- M13: in sources.md « Non vérifié », <role>, <action>, <value>, <capability> and <receive benefit> were escaped with a leading backslash for the same reason. They render the same.
- M10: SF had three « Affirmations » tables under ### subheadings (« 5a : les trois parties et les 3C », « 5b : le « afin de » et les « pourquoi ? » successifs », « Pièges »). They were merged into one table, as SPEC 4.4 requires: the subheadings were dropped, and the rows keep the same order and texts.
- M10: one row's section was renamed. The « Exemples du fil rouge en 5a et 5b » row, '(Sous-concepts)', became '(Consignes)'. Counted moved.
- M10, intro: no old path and no dropped pointer. « F12 » and « modèle de fichier de concept » are not paths, so they were kept.
- M10, « Non vérifié »: the task-id pointer was dropped. Old text: 'livre non lu (cadrage T-018a §8) ; rien du fichier'. New text: 'livre non lu ; rien du fichier'. Counted moved.
- M10: other T-018a pointers were kept as they are, because they are not in the intro or « Non vérifié ». One is in a verification cell (row « Le format … vient de Rachel Davies », '(cadrage T-018a §2.4)') and one in « Références » (S9, '2026-10-22 (cadrage T-018a, non relu ici)').
- M10: off-course.md and the git history are named in the verification cell of the row « Une story, un seul « je veux » », not in a source cell or the prose. They were kept as they are.
- M10: no orphan reference. S1 to S7 and S9 are all cited in source cells, and none of the source cells was changed.
- M10 Nature, consensus: the rows on the Scrum Guide and story, the Scrum Guide and format, XP and Kent Beck, the 3C and Jeffries, the card, and the conversation. Each comes from an MDX item of kind consensus.
- M10 Nature, école: the rows on the Connextra format, the format as a school choice, the three parts, « afin de » helping to order, « afin de » leaving the solution open, the confirmation, and Cohn recommending the template. Each comes from an MDX item of kind ecole.
- M10 Nature, cours: the rows on « La phrase seule ne suffit pas », « Une story, un seul « je veux » », « La carte reste courte » (matched to the MDX item « La phrase seule ne suffit pas ; elle reste courte… »), the successive « pourquoi ? », circular or comfort « afin de », the quick test, where to stop, « Le PO n'invente pas », no solution in « je veux », the technical actor, and the precise number. Each comes from an MDX item of kind cours.
- M10 Nature, left empty by the site's choice: three rows match an MDX item that has no kind. « Une story exprime un besoin vu de l'utilisateur, pas une spécification », « Exemples du fil rouge en 5a et 5b » (MDX item 'Les exemples du fil rouge … sont des faits inventés'), and « Une story exprime un besoin, pas le parcours entier » (Pièges).
- M10 Nature, left empty with no match: « Contradiction interne dans la phrase » matches no MDX sources item and no MDX ecoles item.
- M13: no typographic apostrophe, em-dash or arrow was found in the copied text of either file, so nothing was replaced.
- M1: course.yaml objective is word for word the same as CF « Objectif », so I wrote it with CF's line breaks. The MDX objectif is a shorter form of it (S1-08 lists concept 5 as merged), so no clause is lost.
- M3: I matched every claim of CF « Consensus et choix d'école » to an MDX frontmatter item: Scrum Guide goes to consensus 1, XP/Beck/Jeffries to consensus 2, the Davies/Connextra format to school 1, confirmation as acceptance criteria to school 2, and the five whys to course 1. CF has nothing that only it says and no more precise concept reference, so the items are copied from MDX unchanged. Inside each item I put the keys in the order author, text, refs.
- M3: neighbors take the MDX ecoles.voisines item with auteur written as author (« Le parcours de l'utilisateur »).
- M4: « L'essentiel » uses the MDX wording. CF's « pas son parcours entier ni une spécification » and « la conversation précise la story » say the same as MDX, so I added nothing from CF. The Figure became its image at the same place, after the paragraph.
- M5: 5b has no children in course.yaml. I wrote its MDX h4s 5b1 « Un « afin de » qui sert » and 5b2 « Remonter par les « pourquoi ? » » as paragraphs led by their title in bold, with a final period added inside the bold to separate the title from the text (« **Un « afin de » qui sert.** Le « afin de »… », « **Remonter par les « pourquoi ? ».** Quand… »). This is counted moved.
- M6: the FilRouge of 5b starts with « Autre cas, sur le fil rouge : ». I kept it unchanged after the « **Fil rouge :** » lead, so « fil rouge » now appears twice in that blockquote.
- M7, item 1: CF's sentence « piège probable de qui n'a jamais lu de story. » is missing from MDX. I kept it at its CF place, right after the bold. MDX's next sentence then starts with a capital: « Une story est un besoin ».
- M7, item 2: I did not carry CF's parenthesis « (besoin ou solution) » after « le concept 7 y revient ». It is neither a sentence nor a more precise reference, so the MDX wording stays.
- M7, item 3: I did not carry CF's example parenthesis (« je veux voir les locations, afin de suivre les locations », « afin d'être bien informé »). It is not a sentence, and both examples are already in the 5b reader text.
- M7, item 5: I did not carry CF's ending « à l'utilisateur » (« au lieu de la demander à l'utilisateur »). It is a fragment, not a sentence, so the MDX sentence stays.
- M7: where CF and MDX word a bold lead differently (« Contradiction interne » / « Une contradiction dans la phrase », and others), I kept the MDX sentences and order.
- M8: the CF question and the Reflexe slot are word for word the same. The note « Formulation du cours, sans source. » is the one paragraph, and CF adds nothing to it.
- M13: I replaced the typographic apostrophes in the MDX body (5b1 list, pitfalls items 1, 2, 6 and 9) and in the caption with ' (form, not counted). The file has no em-dash and no arrow, so nothing was replaced for those.
- phrase-trois-blocs-pourquoi.svg: element opacity 0.85 kept on .rung.weak (opacity 0.85), the rect of the « suivre les locations » rung, in group 5b-barreau-circulaire (M11)
- phrase-trois-blocs-pourquoi.svg: element opacity 0.85 kept on .strike (opacity 0.85), the strike-through path M380 334 H510, in group 5b-barreau-circulaire (M11)
- phrase-trois-blocs-pourquoi.svg: --sch-s-ink contrast ink of the check mark (.check) is now a gap: the check is cut out of the primary circle by an alpha mask built from the same stroke (filter feComponentTransfer inverting alpha), so its own ink colour is lost (M11)
- phrase-trois-blocs-pourquoi.svg: --sch-s-ink contrast ink of « afin de » and « pourquoi » (.main-text, .main-hint) is now a gap: the words are cut out of the primary block by an alpha mask (the words stay as <text> inside the mask in <defs>), so their own ink colour is lost (M11)
- phrase-trois-blocs-pourquoi.svg: Elements that combined two tokens on one shape (.bubble: band fill with s2 outline; .rung.stop: band fill with s1 outline) are drawn as two superposed shapes, a muted fill and an outline of the other class; geometry unchanged (M11)
- phrase-trois-blocs-pourquoi.svg: font-family var(--font-ui) replaced by the generic families system-ui, sans-serif (M11)

## Checks

`mise exec -- specs/linear-course/checks/check-course courses/parcours-po --only course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography --concept 5`

```
course-yaml: ok
concept-folder: ok
conventions: fail: concepts/05-user-story/teaching.md:40 plain Markdown: no HTML tag (found "<qui>")
conventions: fail: concepts/05-user-story/sources.md:60 plain Markdown: no HTML tag (found "<role>")
conventions: fail: concepts/05-user-story/sources.md:61 plain Markdown: no HTML tag (found "<receive benefit>")
svg-contract: ok
sources: fail: concepts/05-user-story/concept.md:32 neighbors[0] cites S8, which is not in « Références » of sources.md
glossary-order: fail: concepts/05-user-story/concept.md:58 uses the term "Acteur", introduced by concept 6 (glossary.md:39), which comes later
glossary-order: fail: concepts/05-user-story/concept.md:58 uses the term "Rôle", introduced by concept 6 (glossary.md:40), which comes later
glossary-order: fail: concepts/05-user-story/concept.md:103 uses the term "Critère d'acceptation", introduced by concept 8 (glossary.md:46), which comes later
glossary-order: fail: concepts/05-user-story/concept.md:60 uses the term "Story map", introduced by concept 16 (glossary.md:78), which comes later
typography: ok
```

Form fixes:
- concepts/05-user-story/phrase-trois-blocs-pourquoi.svg: wrapped the top-level <defs> (lines 13 and 38) in <g id="5a1-definitions">, so every drawn child of the root is a <g> with a <sub-concept>-<element> id; fixes the svg-contract failure 'every drawn child of the root is a <g>, found <defs>'. No visual change.

Left:
- conventions teaching.md:40 ("<qui>"), sources.md:60 ("<role>") and sources.md:61 ("<receive benefit>"): these are the quoted wording of the story template, written as \<qui> etc. in verbatim text (M9, M10). Making the checker accept them would mean changing the quoted wording (code spans, rewording), so it is not a form-only fix.
- sources concept.md:32: neighbors[0] cites S8, which is not in « Références » of sources.md. The fix is a source-side content change (add a reference or drop the ref), not a form fix, and M10 says Références stay unchanged; not an orphan case either.
- glossary-order concept.md:58 ("Acteur", "Rôle"), concept.md:103 ("Critère d'acceptation"), concept.md:60 ("Story map"): the concept text uses terms the glossary introduces in later concepts (6, 8, 16). Fixing it would reword the text, which the rules forbid (reader text copied unchanged).

Failing the run:
- conventions: fail: concepts/05-user-story/teaching.md:40 plain Markdown: no HTML tag (found "<qui>")
- conventions: fail: concepts/05-user-story/sources.md:60 plain Markdown: no HTML tag (found "<role>")
- conventions: fail: concepts/05-user-story/sources.md:61 plain Markdown: no HTML tag (found "<receive benefit>")
- sources: fail: concepts/05-user-story/concept.md:32 neighbors[0] cites S8, which is not in « Références » of sources.md
- glossary-order: fail: concepts/05-user-story/concept.md:58 uses the term "Acteur", introduced by concept 6 (glossary.md:39), which comes later
- glossary-order: fail: concepts/05-user-story/concept.md:58 uses the term "Rôle", introduced by concept 6 (glossary.md:40), which comes later
- glossary-order: fail: concepts/05-user-story/concept.md:103 uses the term "Critère d'acceptation", introduced by concept 8 (glossary.md:46), which comes later
- glossary-order: fail: concepts/05-user-story/concept.md:60 uses the term "Story map", introduced by concept 16 (glossary.md:78), which comes later

## Fixes after the run

- L1: concept.md, Pièges item 2, « (le concept 7 y revient). » became « (le concept 7 y revient : besoin ou solution). », as in the old concept file.
- conventions (3 failures): the story-template placeholders are wrapped in backticks, the same way everywhere: teaching.md:40 (`<qui>`, `<quoi>`, `<pourquoi>`) and sources.md:60-61 (`<role>`, `<action>`, `<value>`, `<capability>`, `<receive benefit>`). The check masks code spans before looking for tags.
- sources (1 failure): concept.md:32 neighbors[0] cited [S8], absent from « Références ». The old site's S8 is Patton, « Story Map Concepts » (story_mapping.pdf); the new « Références » holds the same URL as S9. The ref is now [S9].
- I1 (the « Cas : « … » … » line in « Consignes »): kept, covered by ruling B on #23.

Left, by ruling A (#166): the 4 glossary-order failures (concept.md:58 "Acteur" and "Rôle", concept 6; concept.md:103 "Critère d'acceptation", concept 8; concept.md:60 "Story map", concept 16).

Rerun (`--only course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography --concept 5`): all ok except glossary-order.
- I1, after the independent review: the line is aligned to the form of the other concepts, `Cas de la banque : pour 5b, « … », « … » et « … ».` (titles exact).
