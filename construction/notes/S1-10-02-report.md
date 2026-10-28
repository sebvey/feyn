# Migration report: concept 2

Workflow `migrate-concept`, course `parcours-po`, concept folder `concepts/02-objectif-produit-resultat/`. Paths in the course folder are relative to it; the old files are named from their repository folder (`parcours-po`, `parcours-po-website`).
Old files: `parcours-po/course/concepts/02-objectif-produit-resultat.md` (CF), `parcours-po/course/sources/02-objectif-produit-resultat.md` (SF), `parcours-po-website/src/content/concepts/fr/02-objectif-produit-resultat.mdx` (MDX), `parcours-po-website/src/components/schemas/Schema02.astro` (ASTRO).

## Summary

| kept | moved | by design | lost | invented | refuted | checks | target existed | accepted |
|---|---|---|---|---|---|---|---|---|
| 8 | 36 | 6 | 3 | 3 | 0 | fail | no | no |

Result: **failed**. lost and invented count the rows confirmed by the verification; the rows it refuted (refuted) are listed at the end and count in no other column. checks is read in code from the output below, which the check agent returns; target existed is read in code from the listing below, which the scope agent returns.

## Target before the run

`ls -ld concepts/02-objectif-produit-resultat; ls -la concepts/02-objectif-produit-resultat`, as the scope agent returned it: no such folder.

```
ls: concepts/02-objectif-produit-resultat: No such file or directory
ls: concepts/02-objectif-produit-resultat: No such file or directory
```

## CF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter (concept, titre) and H1 | course.yaml (number, title) | moved | M1 | identity carried to course.yaml; no H1 in the three files |
| « Objectif » | course.yaml objective; concept.md « Objectif » | kept | M1 | verbatim, same text as the course.yaml objective |
| « L'essentiel » | concept.md « L'essentiel » | moved | M4 | merged with the MDX intro, MDX wording as base; CF adds nothing the MDX text lacks (Scrum Guide attribution, output examples, one at a time all present) |
| « Consensus et choix d'école » | concept.md frontmatter stances.consensus, stances.school | moved | M3 | every claim matched to an MDX item (Scrum Guide 2020; pratique établie; Seiden; vision with Pichler; Scrum.org criteria and hypothesis, concept 17; Goals-Signals-Metrics and HEART; Ries; cités sans être enseignés with concept 16 and concept 12); CF carries no claim or reference beyond them; no teacher hint in this concept |
| « Sous-concepts » | teaching.md « Consignes » | moved | M9 | renamed, the three items verbatim; a line « Poser … » citing the cases by title added to each item |
| « Banque d'exemples » lead paragraph (fil rouge facts fixed, other wordings invented) | teaching.md « Faits du fil rouge utilisés » | moved | M9 | lead paragraph moved verbatim (no lead words to drop) |
| « Banque d'exemples » cases (six cases, all fields) | teaching.md « Banque d'exemples » | kept | M9 | same ### headings, every field verbatim (checked by text comparison) |
| « Pièges » | concept.md « Pièges » | moved | M7 | merged with MDX <Erreurs>, MDX order and sentences; CF sentences added: the need and Developers sentence, (consultations, connexions), signal not proof, (par utilisateur, par période), cas inventé markers, concept 12, (choix d'école) |
| Pièges item « Juger son travail à ce qui tourne en production » | concept.md « Pièges » item 1 | lost (L1) | M7 | MDX wording kept but the CF sentence « Le repérer quand il dit « c'est livré » pour « ça a marché » » (the instruction to spot the confusion) and the superlative « la confusion la plus probable » (MDX: « Le piège est probable ») are in no new file |
| Pièges item « Un objectif produit si vaste (une vision) qu'aucune mesure ne dit si l'équipe s'en approche » | concept.md « Pièges » item 3 (merged into MDX item) | lost (L2) | M7 | merged into the MDX item « ou qui est si vaste qu'aucune mesure ne dit si l'équipe s'en approche »; the CF precision « (une vision) » is missing |
| Pièges items comptage brut and mesure mal définie | concept.md « Pièges » items 5 and 6 | moved | M7 | separate CF items merged into the MDX items that hold them, CF precisions (cas inventé, nombre total de visites, concept 12) carried |
| « Le test rapide » | concept.md « Le test rapide » | moved | M8 | CF question as one blockquote (same text as the <Reflexe> slot), then the <Reflexe> note as one paragraph |
| « Schéma » | teaching.md « Schéma » | kept | M9 | verbatim |

## SF: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| frontmatter and H1 | none | by design | M1 | M10: frontmatter and H1 dropped (M1) |
| intro: « Le concept n'avait pas de fichier avant T-018b » | sources.md intro | moved | M10 | pointer dropped (task id): old « n'avait pas de fichier avant T-018b : », new « n'avait pas de fichier : » |
| intro: « `course/plan.md` » | sources.md intro | moved | M10 | old path rewritten: old « `course/plan.md` », new « `plan.md` » |
| intro, rest | sources.md intro | kept | M10 |  |
| « Affirmations » with three tables under ### 2a / 2b / 2c | sources.md « Affirmations » | moved | M10 | 45 rows, same order, texts and source cells unchanged; three tables merged into one (SPEC 4.4 one table), the sub-concept subheadings dropped; new header with a fourth column Nature |
| Affirmations: Nature column | sources.md « Affirmations » column 4 | moved | M10 | kinds from the MDX items (ecole written école); empty for the rows whose MDX item has no kind (livrer un indicateur, sortie à l'heure, consultations, Goodhart, direction); Qualité des données and Hypothèse glosses take école from the matching ecoles items |
| row « Livrer un indicateur … (Sous-concepts 2a, Pièges) » | sources.md « Affirmations » | moved | M10 | section renamed Sous-concepts to Consignes |
| row « Un indicateur calculé par la plateforme … (Sous-concepts, Banque d'exemples) » | sources.md « Affirmations » | moved | M10 | section renamed Sous-concepts to Consignes |
| row « Pour Scrum.org, l'objectif produit est un pas concret … (Sous-concepts 2b, …) » | sources.md « Affirmations » | moved | M10 | section renamed Sous-concepts to Consignes |
| row « L'objectif produit retenu est une direction … (Sous-concepts 2b ; …) » | sources.md « Affirmations » | moved | M10 | section renamed Sous-concepts to Consignes |
| « Références » | sources.md « Références » | kept | M10 | identical rows; no orphan reference (every id cited by a row) |
| « Non vérifié » item « Guide EBM » | sources.md « Non vérifié » | moved | M10 | pointer dropped (task id): old « viennent de la page EBM de Scrum.org (cadrage T-018a). », new « viennent de la page EBM de Scrum.org. » |
| « Non vérifié », other items | sources.md « Non vérifié » | kept | M10 |  |

## MDX: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| numero, titre, prerequis | course.yaml | moved | M1 |  |
| objectif | course.yaml objective | moved | M1 | same clauses as the CF objective (« s'en approche » / « s'approche de ce résultat »); no clause lost |
| description | concept.md frontmatter description | kept | M2 |  |
| ecoles.consensus, ecoles.ecole, ecoles.cours | concept.md frontmatter stances.consensus, stances.school, stances.course | moved | M3 | keys renamed, texts and refs unchanged; no voisines |
| sources (affirmations texts, references, nonVerifie) | none (kinds in sources.md Nature) | by design | M12 | M10: the MDX sources texts, by design only their kind is used |
| alignement | none | by design | M12 | MDX alignement |
| import line | none | by design | M12 | import lines |
| intro text before the first <Sous> | concept.md « L'essentiel » | moved | M4 | verbatim, the base of « L'essentiel » |
| <Figure legende> with <Schema02 /> | concept.md « L'essentiel » image; frontmatter diagrams (caption, subconcept 2a) | moved | M6 | image ![<title>](livrable-au-resultat.svg) at the same place; legende is the frontmatter caption verbatim |
| <Sous id="2a"> | concept.md « 2a Livrable et résultat » | moved | M5 | heading and italic promise; reader text verbatim; pastilles to [consensus], [école], [cours]; <FilRouge> to a « **Fil rouge :** » blockquote |
| <Sous id="2b"> | concept.md « 2b L'objectif produit » | moved | M5 | reader text verbatim; <Renvoi n="17"/> to « concept 17 »; pastilles converted |
| <Sous id="2c"> | concept.md « 2c Choisir une mesure de résultat » | moved | M5 | reader text and list verbatim; renvois to « concept 17 », « concept 12 »; pastilles converted |
| <Reflexe note> | concept.md « Le test rapide » | moved | M8 | slot as blockquote (two questions), note as one paragraph |
| <Erreurs> | concept.md « Pièges » | moved | M7 | eight items, MDX order and sentences kept, merged with CF |

## ASTRO: old to new

| Old item | Where it is now | Verdict | Rule | Detail |
|---|---|---|---|---|
| Astro frontmatter comments | none | by design | M12 | Astro frontmatter code |
| Schema02 component (svg root, viewBox, geometry) | livrable-au-resultat.svg | moved | M11 | stem from the title (Du livrable au résultat); viewBox 0 0 600 460 and all coordinates unchanged; fill=currentColor, font-family sans-serif; groups 2a-*, 2b-*, 2c-* |
| <title>, <desc> | livrable-au-resultat.svg | kept | M11 | texts unchanged, ids g2-t/g2-d to livrable-au-resultat-titre/-desc; title equals frontmatter title |
| marker g2-arr and arrow-head | livrable-au-resultat.svg group 2a-defs | moved | M11 | id livrable-au-resultat-fleche; --sch-grey-line to muted 0.6 |
| <style> and colour tokens | livrable-au-resultat.svg attributes | moved | M11 | tokens mapped per the concept mapping (s1 primary 1, s2 secondary 0.85, text muted 1, text-soft muted 0.75, grey-line muted 0.6, band-line muted 0.45, grey muted 0.2, band muted 0.1) |
| vision horizon and label | group 2b-vision | moved | M11 | dashed line muted 0.6, italic soft text muted 0.75 |
| flag rect (.flag fill --sch-s1) and flag text (.flag-text --sch-s-ink) | group 2b-objectif | lost (L3) | M11 | the filled flag (fill var(--sch-s1), pair primary fill 1) is drawn as an unfilled outline (fill none, stroke primary 1, stroke-width 2.5 added); the --sch-s-ink text is drawn in ink with no class instead of a gap; no rule allows turning a fill into an outline |
| frame and « Résultat » head | group 2a-resultat | moved | M11 | stroke secondary 0.85; head text muted 1 |
| box.strong Livrable and Effet visé, box Changement de comportement | groups 2a-livrable, 2b-effet-vise, 2a-changement | moved | M11 | band fill muted 0.1; strong outline as a second rect primary 1; plain box outline muted 0.45 |
| Usage box with hatch pattern g2-hatch and dashed .usage outline | group 2c-usage | moved | M11 | hatch to muted 0.2 fill under the dashed outline muted 0.6; hatch-line opacity 0.55 kept as opacity on the dashed outline |
| .halo on the Usage texts | none | by design | M11 | the losses (a second colour, a hatch, a halo) recorded |
| chain arrows, braces and brace labels | groups 2a-chaine, 2a-accolades | moved | M11 | muted 0.6 strokes, soft texts muted 0.75 |
| dotted link, jauge, jauge-fill and labels | group 2c-mesure | moved | M11 | dotted muted 0.6; jauge muted 0.1 fill and 0.45 stroke; jauge-fill secondary 0.85; label muted 1, soft muted 0.75 |

## Lost

| Id | Source | Old item | Missing | Verification |
|---|---|---|---|---|
| L1 | CF | Pièges item « Juger son travail à ce qui tourne en production » | MDX wording kept but the CF sentence « Le repérer quand il dit « c'est livré » pour « ça a marché » » (the instruction to spot the confusion) and the superlative « la confusion la plus probable » (MDX: « Le piège est probable ») are in no new file | The new concept.md « Pièges » item 1 is the MDX sentence word for word: « c'est livré » ne veut pas dire « ça a marché ». Le piège est probable pour un développeur ou un profil data devenu PO. Two pieces of CF item 1 are missing. The first is the instruction « Le repérer quand il dit « c'est livré » pour « ça a marché » ». The second is the superlative « la confusion la plus probable ». I grepped concept.md, teaching.md and sources.md for « repérer » and « plus probable » and found neither. |
| L2 | CF | Pièges item « Un objectif produit si vaste (une vision) qu'aucune mesure ne dit si l'équipe s'en approche » | merged into the MDX item « ou qui est si vaste qu'aucune mesure ne dit si l'équipe s'en approche »; the CF precision « (une vision) » is missing | The new « Pièges » item 3 reads « ou qui est si vaste qu'aucune mesure ne dit si l'équipe s'en approche », with no « (une vision) ». CF has a separate item: « Un objectif produit si vaste (une vision) qu'aucune mesure ne dit si l'équipe s'en approche. » I grepped the new files for « vision ». The hits are a frontmatter stance, a teaching.md case field about option C, sources.md row 32 and a « Non vérifié » line. None of them belongs to this pitfall, and none says that an objective this vast is a vision. |
| L3 | ASTRO | flag rect (.flag fill --sch-s1) and flag text (.flag-text --sch-s-ink) | the filled flag (fill var(--sch-s1), pair primary fill 1) is drawn as an unfilled outline (fill none, stroke primary 1, stroke-width 2.5 added); the --sch-s-ink text is drawn in ink with no class instead of a gap; no rule allows turning a fill into an outline | In Schema02.astro, line 33 is the rect class="flag" and line 108 sets .flag to fill var(--sch-s1). Line 109 sets .flag-text to fill var(--sch-s-ink). In livrable-au-resultat.svg, group 2b-objectif (line 27) draws that rect with class primary, fill none, a stroke and stroke-width 2.5. The filled primary shape has become an outline. The text at line 28 is drawn in ink with no class, where the mapping gives --sch-s-ink class none, drawn as a gap. No rule of M11 turns a fill into an outline. |

## Invented

| Id | File | Section | New text | Why | Verification |
|---|---|---|---|---|---|
| I1 | teaching.md | Consignes, item 1 (2a) | Poser « « Vue livrée, objectif atteint » », puis « Livrable ou résultat ? ». | CF « Sous-concepts » item 2a ends at « ...c'est un changement de comportement, le début du résultat. » with no instruction to pose any case. M9 requires « Consignes » verbatim; this sentence (which case to pose, and in which order via « puis ») is carried by no old file. The case citation the SPEC check wants is not produced by an M-rule as a new teaching instruction: the order « X, puis Y » is an invented precision. | CF « Sous-concepts » 2a ends at « ...le début du résultat. ». No old file (CF, SF, MDX) contains « Poser » or a sentence that orders « « Vue livrée, objectif atteint » » before « Livrable ou résultat ? ». M9 requires « Consignes » verbatim. Ruling B (S1-10-00-report.md line 176) allows a line that cites uncited cases per sub-concept, but adds that no teaching content may be added. « Poser X, puis Y » adds teaching content: a posing instruction and an order. Only the bare citation would be covered. |
| I2 | teaching.md | Consignes, item 2 (2b) | Poser « Trois objectifs produits à juger », puis « Deux objectifs à la fois ? ». | CF « Sous-concepts » item 2b ends at « ...est un choix d'école : le dire. » with no case to pose. The instruction and the order between the two cases are carried by no old file (M9: verbatim). | CF « Sous-concepts » 2b ends at « ...est un choix d'école : le dire. ». No old file contains this posing instruction or the order « Trois objectifs produits à juger » then « Deux objectifs à la fois ? ». Ruling B covers a bare case citation only and says no teaching content is added. The added instruction and order go beyond that ruling and beyond the verbatim copy that M9 requires. |
| I3 | teaching.md | Consignes, item 3 (2c) | Poser « Quelle mesure pour l'objectif ? », puis « La mesure baisse : victoire ? ». | CF « Sous-concepts » item 2c ends at « ...croiser la mesure avec d'autres sources avant de conclure. » with no case to pose. The instruction and the order between the two cases are carried by no old file (M9: verbatim). | CF « Sous-concepts » 2c ends at « ...avant de conclure. ». No old file contains « Poser » or the order « Quelle mesure pour l'objectif ? » then « La mesure baisse : victoire ? ». Ruling B (S1-10-00-report.md) allows citing the cases but adds no teaching content, so the posing instruction and the order are invented. M9 requires the text verbatim. |

## Refuted by the verification

None.

## Colour mapping (M11)

One pair of class and opacity per old colour token, decided once for all the diagrams of the concept.

| Token | Class | Opacity | Draws | Diagrams |
|---|---|---|---|---|
| `--sch-s1` | primary | 1 | Schema02: .flag fill (Objectif produit flag), .box.strong stroke (Livrable and Effet visé boxes) | livrable-au-resultat.svg |
| `--sch-s2` | secondary | 0.85 | Schema02: .frame stroke (Résultat frame), .jauge-fill fill (filled part of the measure gauge) | livrable-au-resultat.svg |
| `--sch-text` | muted | 1 | Schema02: .head, .label, .line text fill (Résultat heading, box labels and lines, gauge label) | livrable-au-resultat.svg |
| `--sch-text-soft` | muted | 0.75 | Schema02: .soft text fill (vision line label, consensus note, brace captions, gauge captions) | livrable-au-resultat.svg |
| `--sch-grey-line` | muted | 0.6 | Schema02: .usage dashed stroke, .hatch-line, .link chain arrows, .arrow-head marker, .horizon vision line, .brace, .dotted gauge connector | livrable-au-resultat.svg |
| `--sch-band-line` | muted | 0.45 | Schema02: .box stroke (Changement de comportement box), .jauge outline | livrable-au-resultat.svg |
| `--sch-grey` | muted | 0.2 | Schema02: .hatch-bg fill of the Usage box hatch (becomes the muted fill under the dashed outline), .halo stroke behind Usage texts (halo lost) | livrable-au-resultat.svg |
| `--sch-band` | muted | 0.1 | Schema02: .box fill (the three plain boxes), .jauge empty gauge fill | livrable-au-resultat.svg |
| `--sch-s-ink` | none | none (a gap) | Schema02: .flag-text, the 'Objectif produit' label drawn over the flag (contrast ink, becomes a gap) | livrable-au-resultat.svg |

## Writing choices

- M9: CF « Sous-concepts » cites no case, but rule M9 and SPEC 4.3 say every case must be cited by its title in « ». I added one line at the end of each numbered item (moved/added, not reworded): item 2a gets « Poser « « Vue livrée, objectif atteint » », puis « Livrable ou résultat ? ». » (the inner « » are kept as the heading writes them), item 2b gets « Poser « Trois objectifs produits à juger », puis « Deux objectifs à la fois ? ». », item 2c gets « Poser « Quelle mesure pour l'objectif ? », puis « La mesure baisse : victoire ? ». »
- M9: the lead paragraph of CF « Banque d'exemples » (« L'objectif produit et la mesure de résultat de la plateforme sont fixés dans le fil rouge … elles ne deviennent pas des faits du fil rouge. ») moved whole to « Faits du fil rouge utilisés ». It has no lead words to drop, and « Banque d'exemples » keeps no lead text.
- M9: the case fields, headings and « Schéma » text are verbatim. I added blank lines after the section headings and before « ## Schéma » (form only).
- M10: the three SF claim tables (### 2a, ### 2b, ### 2c, each with its own header) became one table (SPEC 4.4 says one table). The ### sub-headings and the two extra header and separator lines are dropped, and the 45 rows keep their order.
- M10: old header « Affirmation (section du fichier du concept) | Source | Ce qui a été vérifié » became « Affirmation (section de `concept.md` ou de `teaching.md`) | Source | Ce qui a été vérifié | Nature »
- M10: section name « Sous-concepts » became « Consignes » in 4 rows: « (Sous-concepts 2a, Pièges) », « (Sous-concepts, Banque d'exemples) », « (Sous-concepts 2b, Banque d'exemples « Trois objectifs produits à juger ») », « (Sous-concepts 2b ; Banque d'exemples, Réponse attendue ; hors L'essentiel) ». The name « Consensus » (short for « Consensus et choix d'école ») is left as written.
- M10 old path (intro, moved): « `course/plan.md` » became « `plan.md` »
- M10 pointer dropped (intro, task id, moved): « Le concept n'avait pas de fichier avant T-018b : aucune affirmation antérieure à vérifier. » became « Le concept n'avait pas de fichier : aucune affirmation antérieure à vérifier. »
- M10 pointer dropped (Non vérifié, task id, moved): « viennent de la page EBM de Scrum.org (cadrage T-018a). » became « viennent de la page EBM de Scrum.org. »
- M10: the « cadrage T-018a » pointers in the verification cells (claim rows on « vision », EBM, Patton, Dehghani) and in the Références consulted-on cells (S4, S8, S17, S18) stay as they are. Rule M10 drops a pointer only in the intro and « Non vérifié ».
- M10: no orphan reference. S1 to S13 and S15 to S19 are all cited in a source cell (no S14 exists), so no id was added.
- M10 Nature (from the MDX sources item that states the same claim): « Seiden est l'auteur de l'idée » was matched to the MDX Seiden item and gets école
- M10 Nature: « Livrer un indicateur n'est pas obtenir le résultat » and « Une sortie à l'heure ou un incrément terminé ne prouve pas la valeur » were both matched to the MDX item « Livrer un indicateur n'est pas obtenir le résultat ; un livrable terminé ne prouve pas la valeur. », which has no kind, so Nature is empty
- M10 Nature: SF rows « Distinguer livrable et résultat… objectifs d'apprentissage » and « La distinction… partagée par plusieurs auteurs » were both matched to the one merged MDX item, so both get consensus
- M10 Nature: « Pour Scrum.org, l'objectif produit est un pas concret, mesurable… » was matched to the MDX vision item, which contains that clause, so it gets école
- M10 Nature: « Choisir un signal sensible et spécifique » was matched to the MDX item « Une mesure n'est utile que si… ; un bon signal est sensible et spécifique », so it gets école
- M10 Nature: « Le nombre de consultations d'une vue mesure l'usage » was matched to the MDX item « L'usage d'un livrable… signal utile, pas la preuve », which has no kind, so Nature is empty
- M10 Nature: the EBM, Patton and Dehghani rows were each matched to the combined MDX item « … cités sans être enseignés », so each gets école
- M10 Nature: « Goodhart » and « L'objectif produit retenu est une direction » were matched to MDX items with no kind, so Nature is empty
- M10 Nature (no MDX sources item states the claim, so the ecoles stance was used): « Qualité des données : respect de règles mesurables… (glose) » was matched to the ecoles.ecole item « Cités sans être enseignés » (Dehghani's qualité des données gloss), so it gets école
- M10 Nature (no MDX sources item states the claim, so the ecoles stance was used): « Hypothèse : ce qu'on tient pour vrai sans l'avoir vérifié (glose) » was matched to the ecoles.ecole item « Scrum.org : critères d'un bon objectif produit » (which glosses hypothèse), so it gets école
- M10 Nature totals: 14 consensus, 20 école, 6 cours, 5 empty (45 rows)
- M13: neither file needed a change. Neither old file has a typographic apostrophe, an em-dash or an arrow.
- M1: « Objectif » is the course.yaml objective word for word, with the line breaks of CF « Objectif » (the CF text is the same as the objective, final period included).
- M3: the frontmatter keys come in the order author, text, refs, as auteur/texte/refs were ordered in MDX. Each CF « Consensus et choix d'école » claim matched an MDX item that says the same thing: nothing was carried. CF « gestion du backlog produit que le Scrum Guide confie » against MDX « gestion du backlog que le Guide confie » is wording, not a claim. The concept references (concept 17, 16, 12) are the same in CF and MDX. CF has no teacher hint on the course's choices. MDX has no ecoles.voisines, so neighbors is omitted.
- M4: CF « L'essentiel » adds no claim beyond the MDX text (its « (Scrum Guide) » attribution is already in MDX), so the MDX wording is kept alone. The Figure becomes the image after that paragraph.
- M6: MDX writes « concept <Renvoi n="17" /> » and « au concept <Renvoi n="12" /> ». The renvoi became « concept 17 » / « concept 12 » once, without doubling the word that was already there (« (concept 17) », « au concept 17 », « au concept 12 »).
- M6: the pastilles became [consensus], [école], [cours] where they stood, keeping the MDX spacing (« Scrum Guide [consensus] ; »).
- M7 item 3: the MDX item covers CF items 3 and 4. The CF-only sentences of item 3 were appended after the MDX sentence, with « Il ne dit pas » changed to « Le premier ne dit pas ce qui change pour qui. » so the reference stays clear, then « Le besoin d'un utilisateur est un fait à lui demander ; la technique revient aux Developers. » word for word.
- M7 item 5: the MDX item covers CF items « usage » and « comptage brut ». The CF-only parts were added: « (consultations, connexions) » after the bold, « (par utilisateur, par période) » after « base », then « L'usage est utile comme signal, insuffisant comme preuve ; un comptage brut monte avec la taille de la base d'utilisateurs (cas inventé : le nombre total de visites d'un site). »
- M7 item 6: the CF-only parts were added at their CF places: « (exemple inventé) » after the tickets example, « cas inventé : » inside the « client actif » parenthesis, and the CF sentence « La définition d'un indicateur se travaille au concept 12. » before « Croiser la mesure avec d'autres sources. » This keeps CF's concept reference.
- M7 item 7: the MDX wording « la cible chiffrée ou la définition des heures de pointe » is kept. It is more precise than CF « une cible chiffrée ou une définition »; nothing was carried.
- M7 item 8: CF's « (choix d'école) » was appended at the end, as plain text in CF's words, not as an [école] marker.
- M7 item 1: CF « Le repérer quand il dit « c'est livré » pour « ça a marché » » was judged to be already carried by the MDX sentence « « c'est livré » ne veut pas dire « ça a marché » »; nothing was added.
- M8: the two CF/Reflexe questions are one blockquote of two paragraphs, separated by a '>' blank line where MDX had <br />. The note is the Reflexe note word for word; CF adds nothing to it.
- M13: there was no banned character and no typographic apostrophe to replace.
- livrable-au-resultat.svg: element opacity 0.55 kept on .hatch-line (lines of the usage hatch, pattern g2-hatch), carried by the dashed outline rect of the usage box, second rect of group 2c-usage (M11)
- livrable-au-resultat.svg: Usage hatch (pattern g2-hatch: diagonal --sch-grey-line lines over a --sch-grey background): drawn as a muted fill (0.2) under the box's dashed outline; the diagonal lines are gone. (M11)
- livrable-au-resultat.svg: Halo on the usage box labels (.halo: a --sch-grey 4px stroke painted behind the text): dropped, the labels sit directly on the muted fill. (M11)
- livrable-au-resultat.svg: Flag label 'Objectif produit' in contrast ink (--sch-s-ink) over the --sch-s1 flag: drawn as a gap, the flag being a primary flood (filter livrable-au-resultat-evide, feFlood class primary) with the text glyphs knocked out and clipped to the flag's rounded rect; there is no separate flag rect. (M11)
- livrable-au-resultat.svg: Two-colour boxes (.box.strong: --sch-band fill, --sch-s1 stroke) are drawn as two superposed rects, a muted fill and a primary outline, in groups 2a-livrable and 2b-effet-vise. (M11)
- livrable-au-resultat.svg: UI font (var(--font-ui)): replaced by the generic font-family sans-serif on the root. (M11)

## Checks

`mise exec -- specs/linear-course/checks/check-course courses/parcours-po --only course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography --concept 2`

```
course-yaml: ok
concept-folder: ok
conventions: ok
svg-contract: ok
sources: fail: concepts/02-objectif-produit-resultat/sources.md:69 reference S8: type "primaire, marketing pour la certification" must be one or more of primaire, secondaire, marketing, separated by commas
sources: fail: concepts/02-objectif-produit-resultat/sources.md:74 reference S13: type "interne (raisonnement, pas une source externe)" must be one or more of primaire, secondaire, marketing, separated by commas
glossary-order: fail: concepts/02-objectif-produit-resultat/concept.md:88 uses the term "Définition d'un indicateur", introduced by concept 12 (glossary.md:60), which comes later
glossary-order: fail: concepts/02-objectif-produit-resultat/concept.md:52 uses the term "État", introduced by concept A1 (glossary.md:88), which comes later
typography: ok
```

Form fixes:
- concepts/02-objectif-produit-resultat/livrable-au-resultat.svg: removed the feFlood/filter (forbidden flood-color) and the clipPath, which drew the 'Objectif produit' flag as knocked-out text; the flag is now a primary-class outline rect (stroke currentColor, opacity 1) with the text in currentColor. Loss to record: the knockout (hollow text in a filled flag) is gone. Failure: svg-contract forbidden colour attribute flood-color.
- concepts/02-objectif-produit-resultat/livrable-au-resultat.svg: wrapped the <defs> (marker) in <g id="2a-defs">. Failure: svg-contract every drawn child of the root is a <g>, found <defs>.

Left:
- sources.md:69 S8 type "primaire, marketing pour la certification": rewording the Type cell to a bare list of primaire/marketing would drop the qualifier text of the old source file; this changes what the text says (M10: texts unchanged).
- sources.md:74 S13 type "interne (raisonnement, pas une source externe)": 'interne' is not an allowed type; fixing it would change what the text says (the course's own reasoning, not an external source).
- concept.md:88 uses the term "Définition d'un indicateur" (introduced by concept 12) before its concept: fixing means rewording the reader text, not form.
- concept.md:52 uses the term "État" (introduced by concept A1) before its concept: fixing means rewording the reader text, not form.

Failing the run:
- sources: fail: concepts/02-objectif-produit-resultat/sources.md:69 reference S8: type "primaire, marketing pour la certification" must be one or more of primaire, secondaire, marketing, separated by commas
- sources: fail: concepts/02-objectif-produit-resultat/sources.md:74 reference S13: type "interne (raisonnement, pas une source externe)" must be one or more of primaire, secondaire, marketing, separated by commas
- glossary-order: fail: concepts/02-objectif-produit-resultat/concept.md:88 uses the term "Définition d'un indicateur", introduced by concept 12 (glossary.md:60), which comes later
- glossary-order: fail: concepts/02-objectif-produit-resultat/concept.md:52 uses the term "État", introduced by concept A1 (glossary.md:88), which comes later

## Fixes after the run

Made in the output only, under the rulings of #23 (2026-10-27, 2026-10-28 A, B, C). The summary table above is the run's, unchanged.

- L1 (concept.md « Pièges » item 1): the CF sentence « Le repérer quand il dit « c'est livré » pour « ça a marché ». » added after the site's sentences (M7). The site's « Le piège est probable » is kept, not CF's « la confusion la plus probable ».
- L2 (concept.md « Pièges » item 3): the CF precision added in the site's sentence: « ou qui est si vaste (une vision) qu'aucune mesure ne dit si l'équipe s'en approche ».
- I1, I2, I3 (teaching.md « Consignes »): the three « Poser … , puis … » sentences removed (an order the old « Sous-concepts » does not carry, M9). `concept-folder` needs every case cited, so one citation line (ruling B) follows the list: « Cas de la banque : pour 2a, « « Vue livrée, objectif atteint » » et « Livrable ou résultat ? » ; pour 2b, … ; pour 2c, … ». No teaching content, no order. The doubled quotes are the case title itself (its heading is « Vue livrée, objectif atteint »).
- L3 (livrable-au-resultat.svg, group 2b-objectif): the flag is drawn filled with the pair of `--sch-s1` (primary, fill-opacity 1), as the old `.flag` (fill only, no outline). The contrast ink `--sch-s-ink` (class none) is a gap per M11: a text cannot be knocked out of a fill under the drawing contract (no colour for a mask, no filter), so the filled shape is a path with a rectangular window (evenodd) at the text's place, and the text is drawn in plain ink inside the window. Loss: the flag is a filled frame around the label, not a solid flag with hollow text.
- sources S8: type « primaire, marketing (pour la certification) » (the remark in parentheses).
- sources S13: type « primaire (interne : raisonnement, pas une source externe) ». S13 is the course's own reasoning; its claims are `cours` under decision `where-a-claim-goes`, and the sources pass (#140) handles them.
- ruling A: `glossary-order` not fixed: concept.md:88 « Définition d'un indicateur » (concept 12) and concept.md:52 « État » (concept A1). Left to the last sub-issue of #23 (#166).

Checks after the fixes (`--only course-yaml,concept-folder,conventions,svg-contract,sources,glossary-order,typography --concept 2`): all ok except `glossary-order`, with the two failures above.
- Superseded: the CF row for « Sous-concepts » (« a line « Poser … » citing the cases by title added to each item ») and the first M9 writing choice above describe the « Poser … » lines that were removed (I1 to I3); the citation line above replaces them.
