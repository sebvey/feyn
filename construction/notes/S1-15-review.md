# S1-15 Stage 1 review (#28)

Read-only review of the contract that `linear-course/v1.0.0` freezes (SPEC, PROTOCOL, checks,
language pack, decisions), on five questions, one `opus` agent each, merged and deduplicated by
one `fable` agent that re-verified every "blocks the tag" finding in the files. Start: the
counterexamples already broken (migration reviews #167 to #202, #166/#203/#206, #107, the
taught-check run `wf_96866b3b-e19` in #208). Out of scope: course text, sources and diagram
quality; the French wording of protocol rules.

Questions: Q1 contradictions, Q2 testability of protocol rules, Q3 mandatory without a check,
Q4 what design 03/04/09 say that the spec dropped, Q5 vocabulary drift.

**Triaged by the maintainer on 2026-10-29**, point by point with the orchestrator, then reviewed
cold by a fresh agent. The reasoning and every decision are in `S1-15-triage.md` beside this
note (fourteen decisions T01 to T14, the cold review's amendments R-*). The outcome per finding
is in the "Maintainer triage" section at the end; the merged findings below are kept as the
input, unchanged.

---

**Criterion.** A finding **blocks the tag** when the cheapest fix available after v1.0.0 is a spec MAJOR under SPEC 8 (a mandatory file, field, section or column whose presence or form changes) or a course migration (a change that makes `parcours-po` rows or files that conform today fail), or when it is the version table itself, which classifies every later bump. Everything else is **1.x**: a rule added, changed or renamed (SPEC 8 and PROTOCOL.md:4-5 say a protocol rule change is a MINOR, and PROTOCOL.md:33-34 make a rename "a removed rule plus a new one", costing a burnt slug and updated citations, never a course change: no course file, learner template or `teacher/` file cites a slug), a check loosened or a check every live course passes, a pack key added or renamed (packs are spec-owned, `specs/linear-course/lang/`, versioned with the spec: renaming a key edits one file in the same PR, no course changes), prose, a comment. Under this criterion, Q5's nine slug and pack-key renames are 1.x; the three findings that survive as blocking are the two SPEC 4.4 ones and the version table.

---

## Blocks the tag

**S1-15-B01. The claim-section parenthesis of `sources.md` has no grammar, and the site's only in-file filter keys on it**
- Sources: Q1-F1, Q3-F1, Q5-B5.
- `specs/linear-course/SPEC.md:222-224`, `:231-233`; `decisions/where-a-claim-goes.md:23`; `checks/sources.js:43`.
- SPEC:222-223: "The site builds only the « Affirmations » rows whose section is in `concept.md` or is `headings.stances`". SPEC:231-233: "the claim in a few words with the section it lives in, in parentheses (a section of `concept.md` or of `teaching.md`)". Decision:23: "A row's parenthesis names sections of one file only". The check: `if (claim === '') out.push(...)`, nothing else on column 1.
- Course, recounted: 700 claim rows; 5 with no parenthesis (`08-criteres-regles/sources.md:18`); 19 whose parenthesis opens on « Consensus » alone (not the pack's « Consensus et choix d'école »); the reports' finer counts (83 naming no section, 38 to 52 naming both files) use parses I did not reproduce, but the shape holds: case titles, « glossaire », « Banque, streaming » appear as "sections".
- Fix: SPEC 4.4 defines the parenthesis: a comma-separated list where each item is a `##`/`###` heading text or a sub-concept id of one file, or the `headings.stances` value; a row naming both files fails. The `sources` check and the course pass can follow in 1.x (as `glossary-order` does today), but the grammar is in v1.0.0.
- **Blocks the tag.** It fixes the form of a mandatory column that the site parses; written after the tag it fails about a third of a course that conforms today, a course migration, and no SPEC 8 row names that bump.
- Verified: yes.

**S1-15-B02. An accepted decision in the frozen folder announces a stricter source rule than SPEC 4.4 and the `sources` check implement**
- Sources: Q1-F2, Q3-F2, Q4-2, Q5-B7 (and the « Non vérifié » half of Q1-F2 and Q4-2).
- `decisions/where-a-claim-goes.md:4` (`status: accepted`), `:13`, `:26-32`; `SPEC.md:241-242`, `:244-246`; `checks/README.md:52-54`; `checks/sources.js:46-47`.
- Decision:28-31: "A `cours` claim may cite no reference, its source cell then holding the `markers.course` word (« cours »); any other claim without a reference fails, and free text (« aucune », « fil rouge ») is not a source." Decision:13: "(1) a storyline fact leaves `sources.md`". Decision:32: "`SPEC.md` 4.4 and the `sources` check change with the course pass (#140, then #141), not before." README:52-54: a claim has a source when the cell holds "a word that says there is none (« fil rouge », « aucune »)". SPEC:244-245: "every claim has a source and a verification". On « Non vérifié »: SPEC:241-242 "the claims no consulted source confirms, and why" against decision:26-28 "what must not be asserted and why, as an instruction".
- #140 and #141: both CLOSED, NOT_PLANNED, 2026-10-28; the decision stayed `accepted`.
- Course, recounted: 69 claim rows cite neither a reference id nor a path: « aucune » 21 (18 plus 3 « aucune ici »), « fil rouge » 16, `storyline.md` 21, `plan.md` 6, `decisions/team-in-sprints.md` 4 (SPEC:46: "no build reads it"), « glossaire » 3; « cours » 0.
- Fix, one of two, before the tag: (a) amend the decision (status `superseded` or a one-line consequence "deferred: v1 accepts a word saying there is none") and add one sentence to SPEC 4.4 saying so, plus one definition of « Non vérifié » shared by both texts; or (b) carry the decision into 4.4 and the check and accept a second known-failing check at the tag.
- **Blocks the tag.** Choosing (b) after the tag is a stricter check failing 69 rows of a conforming course, a course migration; choosing (a) is prose, but the choice itself must be made before the frozen folder ships a contradiction with `status: accepted`.
- Verified: yes.

**S1-15-B03. The SPEC 8 version table cannot classify a change to a check, to a pack key, or to a field's status**
- Sources: Q2-F16, Q3-F3, Q4-3.
- `SPEC.md:399-403`.
- MAJOR: "the structure changes: a file, a field or a mandatory section added, removed or renamed; builds and checks must follow". MINOR: "an optional section or field added, a protocol rule added or changed". PATCH: "the contract's wording, with no change to what is checked or taught". No row for: a check made stricter (B02 option b), a check made looser (#207), a new check, a pack key added, renamed or made required, an optional field made mandatory, a slug renamed.
- Fix: add rows. Stricter check, or optional made mandatory: MAJOR, unless every live course already passes it (then MINOR). Looser check, new check every live course passes, pack key added or renamed with every pack of the repo updated in the same PR, rule renamed (old slug burnt): MINOR.
- **Blocks the tag.** Every 1.x class in this report rests on those rows; a row written after the tag cannot govern the bumps made before it, and a MINOR cannot redefine what MINOR means.
- Verified: yes.

---

## 1.x

**S1-15-X01. "Mandatory" is defined as "a check fails without it", but several rules name a check that does not enforce their form**
- Sources: Q3-F4.
- `SPEC.md:14-16`; `:50`, `:310-312`, `:64`/`:93`/`:142`, `:199`, `:435`; `checks/course-files.js:68`.
- SPEC:14-16: "'Mandatory' means a check fails without it … Every rule names the check that enforces it". `course-files.js:68` checks only that glossary concept numbers exist; "one sentence" (`:64`, `:93`, `:142`) is unchecked; `:435` "locally and in CI" while `.github/workflows/` holds only `.gitkeep`.
- Recount of the glossary claim: of the 4 rows cited, 3 hold (`glossary.md:49` Fraîcheur, first concept 1, 0 uses in `01-…/concept.md`; `:63`; `:86`); `:83` « Story points » is used twice in `16-…/concept.md`.
- Fix: PATCH wording: "an element's absence fails the check named; its form is checked where that check says so, reviewed otherwise".
- 1.x. Verified: yes.

**S1-15-X02. `typography` does not scan SVG text**
- Sources: Q1-F10, Q3-F6.
- `SPEC.md:50-51`; `checks/typography.js:11`.
- SPEC: "Course text follows the typography of the language pack; its banned characters … fail the check (`typography`)". The check: `for (const file of [...ctx.mdFiles(), 'course.yaml'])`.
- Fix: scan `<text>`, `<tspan>`, `<title>`, `<desc>` of the SVGs. The 32 SVGs pass today.
- 1.x. Verified: yes.

**S1-15-X03. An unlisted concept folder or domain file fails nothing**
- Sources: Q3-F12.
- `SPEC.md:44-45` ("one domain file per domain", "one concept folder per concept and annex"); `course-yaml` checks listed entries only.
- Fix: `course-yaml` fails on an unlisted `concepts/*` folder or `domains/*.md`. None exists today.
- 1.x. Verified: no (check behaviour not traced).

**S1-15-X04. `messages` is read by no protocol rule, and the split into messages has two owners**
- Sources: Q1-F3, Q2-F13, Q4-11, Q5-M4. Q1 said blocks the tag (removing a field is a MAJOR); Q2, Q4, Q5 said 1.x. Decided 1.x: the field is optional, and the cheap fix (a rule that reads it) is a MINOR; removal is only needed if the maintainer wants it gone.
- `SPEC.md:106`, `:108-109`; `PROTOCOL.md:170`, `:179`; `docs/glossary.md:33`; `courses/parcours-po/course.yaml:72`, `:75`.
- SPEC:106: "leaf only: the number of teacher messages the leaf takes, 2 or more; absent means 1"; `:108-109`: "one teacher message with one question (or `messages` of them)". PROTOCOL:170: « Un message enseigne un seul sous-concept feuille »; `:179`: « découpage en messages » from « Consignes ». `PROTOCOL.md` never names the field. Glossary:33: "a leaf sub-concept is one teacher message with one question". Course: `0a1: messages: 4`, `0a2: messages: 5`; nothing in `teacher/` or `site/` reads it.
- Fix: a rule `leaf-messages-from-course-yaml` (one question per message, `messages` of them, « Consignes » saying the split), glossary row "(or `messages` of them)". Or drop the field before the tag.
- 1.x. Verified: yes.

**S1-15-X05. Four checks are laxer or stricter than their SPEC sentence**
- Sources: Q1-F12.
- `checks/concept-folder.js:175` vs `SPEC.md:208`; `concept-folder.js:116-120` vs `SPEC.md:167-168`; `checks/course-yaml.js:121` and `checks/conventions.js:9` vs `SPEC.md:103`; `checks/course-files.js:19` vs `SPEC.md:300`.
- Line 175's regex `^- \*\*([^*]+)\*\*([^:]*?)\s*:` accepts a qualifier on any label; SPEC:208 allows it on « Question » only. Lines 116-120 build `want` with a capital and a period and compare `got !== want`, so the body must carry both; SPEC:167-168 says "give or take". `course-yaml.js:121` forms `want2 + (b + 1)`, so a tenth child is `9a10`; `conventions.js:9` `ID = '(?:A\d+|\d+)(?:[a-z]\d?)?'` reads one digit. `course-files.js:19` accepts several paragraphs before the list; SPEC:300 says "a paragraph".
- Fix: align each (cap children at 9 per node, qualifier on « Question » only, or reword the sentences). No course file trips any.
- 1.x. Verified: yes.

**S1-15-X06. Two rules that need history have no check**
- Sources: Q3-F13.
- `SPEC.md:120-122` ("Changing one is a course MAJOR"); `PROTOCOL.md:34` ("a removed rule's slug is never reused").
- Fix: a CI step comparing identifiers and slugs with the last `<id>/v*` and `linear-course/v*` tag.
- 1.x. Verified: yes.

**S1-15-X07. `requested-diagram-shown` looks on the leaf only, and falls back to an optional section**
- Sources: Q1-F5, Q3-F9, Q4-8.
- `PROTOCOL.md:306-308`; `SPEC.md:158-160`, `:189`.
- Rule: « si le sous-concept en déclare un (`diagrams` de `concept.md`), montre-le et dis sa légende ; sinon, pars de « {headings.drawing} » ». SPEC:160: `subconcept` is "the id of the sub-concept it illustrates", any level; SPEC:189: « Schéma » is "optional".
- Course, recounted: 8 of 32 diagrams are declared on a parent that has children (3a, 4a, 5a, 7a, 8a, 9a, 10a, 10b); the teacher is always on a leaf, so the rule as written sends a learner on 9a1 to « Schéma » instead of `gateau.svg`. Every concept has a « Schéma » section today (20 of 20), so the optional-section branch has no live case.
- Fix: « le sous-concept feuille ou l'un de ses parents »; add « sans « Schéma », dis que le concept n'en a pas ».
- 1.x. Verified: yes.

**S1-15-X08. Where the diagram image sits is enforced by review but unwritten**
- Sources: Q3-F8.
- `SPEC.md:262`: "`![<title>](<file>)` alone in its paragraph … each declared diagram appears once in the body"; nothing says where. Reviews of #196 and #201 moved images into their sub-concept's section.
- Fix: 4.5: "in the section of its `subconcept`, or « L'essentiel »"; `conventions` checks it. No image is misplaced today.
- 1.x. Verified: no (PR reviews not reread).

**S1-15-X09. The contract never says what the learner receives, and the source of the teacher's explanation is undefined**
- Sources: Q1-F6, Q2-F1, Q4-9 (and #208 findings 1-4, 12). Q2 said blocks the tag (make « Explication » mandatory: a MAJOR); Q1 and Q4 said 1.x. Decided 1.x: a protocol rule naming the source is a MINOR and migrates nothing; making the field mandatory is one option, not the only one, and is listed under the maintainer's decisions.
- `SPEC.md:173`, `:205`, `:450-452`; `PROTOCOL.md:170-172`, `:101-103`, `:153-155`; `.claude/workflows/taught-check.js:81-82`.
- SPEC:205: « Explication », optional, "what the teacher says before the case". SPEC:173: the reader text is "the explanation as a site reader reads it". PROTOCOL:171: « une explication courte, un exemple concret, puis une question », no source named. taught-check:81-82: "They read neither the storyline, nor the glossary, nor the rest of the file. The learner-facing material of a case is its « Explication » and « Situation »". PROTOCOL:102-103 and :153-155 give the learner the storyline and the domain sheet; the inventory excludes both.
- Course, recounted: 7 cases with no « Explication » and no `creusage`/`aparté` qualifier (`01-produit-et-po/teaching.md:78`, `:123`, `:149`, `:169`; `04-hierarchie/teaching.md:144`, `:164`; `14-parties-prenantes/teaching.md:222`).
- Fix: a SPEC 4.3 paragraph "what the learner receives" cited by the taught-check premise; a rule: the explanation is the case's « Explication », else the leaf's reader text; « Réserve » on request only; the storyline lines and the domain presentation enter the inventory; a review rule that a fallback case stands alone. Two fresh tests per rule.
- 1.x. Verified: yes.

**S1-15-X10. The case fields that change what the learner receives have no protocol rule**
- Sources: Q2-F2.
- `SPEC.md:204` (« Usage »), `:206` (« Réserve, sur demande »: "what the teacher gives only if the learner asks"), `:186-187` (« Faits du fil rouge utilisés »); `PROTOCOL.md` names none, and its key tables (`:511-576`) use no `case_fields` key.
- Fix: rules `reserve-on-request`, `case-usage-respected`, `storyline-facts-section-not-said`, each with two tests.
- 1.x. Verified: yes.

**S1-15-X11. The qualifiers the protocol reacts to are written differently in the course, and nothing matches them**
- Sources: Q1-F4, Q3-F10.
- `SPEC.md:194-195`; `PROTOCOL.md:180`, `:376`, `:409`; `lang/fr.yaml:84-86`.
- SPEC: "The qualifier is free text; the protocol gives meaning to some". PROTOCOL: « qualifiés « {qualifiers.fallback} » », « {qualifiers.dig} », « {qualifiers.aside} ».
- Course, recounted: 20 headings carry `rechange`, 16 of them as « en rechange »; one « exercice ou creusage » (`00-scrum/teaching.md:365`). All pass `concept-folder`.
- Fix: SPEC 4.3: a qualifier carries a protocol meaning only when it equals a `qualifiers.*` value; `concept-folder` warns on a qualifier that contains a pack word without equalling it; fix the 17 headings (the qualifier is not part of the case title, so a course PATCH).
- 1.x. Verified: yes.

**S1-15-X12. Nothing says whether « Consignes » / « Schéma » or a protocol rule wins**
- Sources: Q1-F8, Q2-F12.
- `PROTOCOL.md:179-181` (« Suis les « {headings.instructions} » du concept »), `:303-304` (« Ne montre un schéma que si l'apprenant en demande un … ne le propose jamais »); `SPEC.md:189-190`.
- Reviews of #194, #195 and #202 found « Schéma » sections telling the teacher to show the diagram unasked.
- Fix: one SPEC 4.3 sentence ("`teaching.md` never overrides a protocol rule; « Schéma » says what to draw, not when") and a course-batch review criterion.
- 1.x. Verified: yes (rules), no (the PR reviews).

**S1-15-X13. `source_types` has no word for the course's own reasoning**
- Sources: Q1-F9, Q5-B6, Q4-2 (part). Q5 said blocks the tag (a pack key every pack must carry); decided 1.x: adding an allowed value is a loosening, and the pack is spec-owned.
- `SPEC.md:238-240`; `lang/fr.yaml:93-96`; course.
- SPEC: "type: one or more of `primary`, `secondary`, `marketing`". Course, recounted: 10 reference rows typed « primaire (interne : …) » in 8 concepts (the reports' 16 counted every line containing "interne", 6 of which are claims or notes), a wave-2 stopgap "until #140 and #141", both closed not planned.
- Fix: settle it with B02: either those claims carry no reference and nature `cours`, or add `source_types.internal` and retype the 10 rows.
- 1.x. Verified: yes (count corrected).

**S1-15-X14. The « Références » link column has a form the check never reads**
- Sources: Q3-F11.
- `SPEC.md:238` ("link (a URL, or empty)"); `checks/sources.js:26` `const [id, source, , type, on]` skips it.
- Course: cells like « (aucun) », « (dépôt) », several URLs joined by « ; ».
- Fix: decide the form (allowing « ; »-separated URLs is a loosening) and check it.
- 1.x. Verified: yes (check), no (the 39 cells).

**S1-15-X15. Annex references are plain text: no convention, no rule, no entry point**
- Sources: Q2-F14, Q4-10, Q5-B4, #207's follow-up note. Q5 said blocks the tag (a new pack key or a reader-text migration); decided 1.x: adding `references.annex` is additive (existing « annexe A2 » stays valid and becomes linked), and the pack is spec-owned.
- `SPEC.md:259`; `lang/fr.yaml:88-91`, `:196` (`ref_annex: "annexe {n}"`); `PROTOCOL.md` has no rule on annexes; `taught-check.js:38`, `:89` expect an `entry` per annex that no SPEC field gives.
- SPEC:259: "the word (`references.concept`, plural `references.concepts` …) then concept numbers or sub-concept ids … A bare id with no such word … is plain text".
- Course, recounted: 15 « annexe A… » in `concept.md` (concepts 0, 4, 10, 11, 15, 16), 16 in `teaching.md`, 3 in course-level files; 0 « concept A… ».
- Fix: `references.annex` « annexe » in the convention (SPEC 4.5, section 9) and in `conventions`; an optional `entry` on annex entries of `course.yaml` plus a rule `annex-offered-at-entry`. Alternative: rule « concept A2 » and reword 34 mentions.
- 1.x. Verified: yes (counts corrected).

**S1-15-X16. Which domain sections the site shows is not said**
- Sources: Q4-7.
- `SPEC.md:272-274`: the whole file is "Reader-facing: the site builds it". Design 03:150-153: "The site builds the reader-facing sections; the teacher reads all". The old page showed three of the four.
- Fix: say what the domain page shows and that the file holds no teacher-only text.
- 1.x. Verified: yes (SPEC, design), no (old site page).

**S1-15-X17. `glossary-order` says what the maintainer ruled against, and reports less than its rule**
- Sources: Q1-F7, Q2-F15, Q3-F7, Q4-4, #166, #203, #206, #207.
- `SPEC.md:315-317`; `checks/glossary-order.js:31`; #166 closing comment (2026-10-28T23:54Z).
- SPEC: "the `concept.md` of a concept does not use a term … introduced by a concept that comes later in course order". Ruling: "the course may cite a notion taught later when the sentence says so; forcing a rewording makes the course use vaguer or wrong terms". The check: `m.body.find(...)` reports the first use per term only and reads the body, not the frontmatter (#208 finding 7 sat in a stance). 26 failures today (recounted), 11 of them forward mentions naming their concept (#207's list).
- Fix: land #207's rule (`forward-mention-names-its-concept`) and its per-use reporting together, so the course's failure count drops, not grows; note in `CHANGELOG.md` that v1.0.0 is tagged with the 26 known.
- 1.x (a loosening, once B03 gives it a row). Verified: yes.

**S1-15-X18. The glossary « Concept » column and the term cell have no written form**
- Sources: Q5-B2, Q5-B3. Q5 said blocks the tag (re-auditing the column, rewriting cells: a course migration); decided 1.x: SPEC:311-312 and the course intro already agree that the first number introduces the term, glossary terms are not identifiers (SPEC:120-122), and a cell form that lists variants is a loosening the course glossary already fits.
- `SPEC.md:311-312`, `:315-316`; `courses/parcours-po/glossary.md:4-5`, `:36`, `:37`, `:39`, `:43`, `:83`, `:86`, `:88`; `checks/glossary-order.js:17`; `taught-check.js:132`.
- SPEC: "the concepts that use it (numbers separated by commas; the first one introduces it)", "the term cell, without its parenthesis, whole word". Course intro: « La colonne « Concept » donne le concept qui l'introduit : un fichier de concept n'emploie pas un terme introduit plus loin sans le définir » (scope "un fichier", exception « sans le définir »). The check strips every parenthesis (`replace(/\s*\([^)]*\)/g, '')`), so « État (d'un élément) » loses the qualifier that avoids the homonym; cells like « Epic, feature, story, tâche » and « Story points, vélocité » are matched as one string and never found.
- Fix: SPEC 6 defines "introduces" (teaches), the scope (`concept.md` only), and the cell: one term, or variants separated by commas each matched, a parenthesis being a variant (`(PO)`, `(spike)`) or a sense qualifier; align the course intro and the taught-check prompt.
- 1.x. Verified: yes.

**S1-15-X19. The colour rule works only if the site inlines the SVG, and SPEC 7 still allows an image**
- Sources: Q4-1. Q4 said blocks the tag; decided 1.x: `<img>` is already incompatible with 7.1 as written (a stylesheet cannot reach `currentColor` or the classes inside an `<img>`), so writing "the site inlines the SVG" is a PATCH at any time; the risk is a stage-3 agent choosing `<img>` and asking for the contract to change, which a one-line decision prevents.
- `SPEC.md:328-329` ("the site shows it (inline or as an image)") against `:339-344` ("the site's stylesheet sets their `color` (and the dark theme's), which re-tints `currentColor`", "no `<style>` element"); design 04:56-57; `construction/plan/stage-3.md:56-57` ("inline SVG (or `<img>`: decide here").
- Fix: SPEC 7: "the site inlines the SVG"; drop "or as an image".
- 1.x. Verified: yes.

**S1-15-X20. The mechanical parts of the 7.2 style are unchecked, and the decision that promised the redraw is stale**
- Sources: Q1-F14, Q3-F5.
- `SPEC.md:366` ("No script checks it: a review does") against `:372-373` ("a caption that needs two sentences means two diagrams"), `:390` ("never under 14 units"), `:393` ("No … gradient"); `decisions/one-diagram-style.md:35`.
- Course, recounted: 8 captions of 2 to 5 sentences, exactly the eight listed (concepts 0, 1, 2, 3, 4, 5, 9 twice). Decision:35: the wave-1 diagrams "are redrawn under the style (#180)"; #180 is CLOSED, NOT_PLANNED.
- Fix: font-size and gradient into `svg-contract` now (the course passes); the caption-sentence count once the eight are redrawn or split; update the decision's consequence.
- 1.x. Verified: yes.

**S1-15-X21. `svg-contract` rejects a root `<defs>` that SPEC does not forbid**
- Sources: Q1-F11.
- `checks/svg-contract.js:91`: `every drawn child of the root is a <g>` skips only `<title>` and `<desc>`; `SPEC.md:352`: "every *drawn* child of the root is a `<g>` with an `id`", and `:356-357` allow `href="#…"`, which implies `<defs>`/`<marker>`.
- Course: `<defs>` sits inside a `<g>` in 4 SVGs (`02-…/livrable-au-resultat.svg:14` under `<g id="2a-defs">`).
- Fix: allow `<defs>` at the root, or write "`<defs>` sits inside a group".
- 1.x. Verified: yes.

**S1-15-X22. Pack keys named with reserved or clashing words: `references`, `phrases.banned_check`**
- Sources: Q5-B1, Q5-B11 (key part). Q5 said blocks the tag; decided 1.x (spec-owned pack, renamed in the same PR as its only user).
- `SPEC.md:225-226` ("references live in the frontmatter `refs` and here") and `:259` (`references.concept`); `lang/fr.yaml:88-91` against `:52` (`headings.references`); `docs/glossary.md:45` reserves **references** for `sources.md`. `fr.yaml:21` `banned_check` against glossary:78 (**check** = a script).
- Fix: `references` → `concept_refs`; `phrases.banned_check` → `phrases.banned_question`; glossary row **concept reference** (« renvoi »).
- 1.x. Verified: yes.

**S1-15-X23. Site labels: in the pack by SPEC 1, outside section 9, and named differently from the spec**
- Sources: Q3-F16, Q5-M15.
- `SPEC.md:25` ("site labels") against section 9 (no `site` group) and `checks/README.md:50` ("(`site`) … not checked here"); `fr.yaml:208` `blocks.reflex` « Le réflexe » for the quick test; `:149`, `:203`, `:260` « Consensus ou école » against `headings.stances` « Consensus et choix d'école »; `:158`, `:168` « agent IA », « avec l'agent » for the teacher.
- Fix: list the `site` keys in section 9 with S3-04; one French label for the stances; `blocks.quick_test`.
- 1.x. Verified: yes.

**S1-15-X24. Learner templates have no language in their path, and nothing checks they match the pack**
- Sources: Q3-F15, Q4-5, Q5-M10.
- `PROTOCOL.md:24-25` ("the three files of `templates/learner/`"), `:578-579` ("a pack and the learner templates of its language change together"); design 03:197-198 ("an English course would need `en.yaml`, nothing else"); `docs/glossary.md:86` (template kinds, none for learner memory); `templates/learner/` holds one French set, and the rules name `learner/apprenant.md`, `learner/parcours.md`, `learner/observations.md` by their French names.
- Fix: `templates/learner/<code>/`, a `memory_files.*` group or an exception stated in SPEC 1, a `check-spec` check that `memory_headings`/`status` match the templates, a glossary row **learner templates**.
- 1.x. Verified: yes (texts), no (that headings match today).

**S1-15-X25. SPEC 10 lists neither `check-spec` nor `rule-slugs`, and misstates `check-course`'s output**
- Sources: Q1-F13, Q4-13, Q1-F15.
- `SPEC.md:14-16`, `:431-448`; `PROTOCOL.md:28-40`; `checks/README.md:56-69`; `SPEC.md:434` ("one line per check, `ok` or `fail: <file>:<line> <message>`") against README:18-19 (`<id>: ok`, `<id>: fail: …`, one line per failure).
- Fix: a row for `check-spec`/`rule-slugs`, cited from the PROTOCOL notation; reword `:434`. PATCH.
- 1.x. Verified: yes.

**S1-15-X26. The `taught-check` gate is a process rule inside the contract, enforced by nothing**
- Sources: Q3-F17.
- `SPEC.md:450-452`: "It is mandatory after any change to what is taught …, before the merge". No check, no CI (#137, #44 open).
- Fix: move it to `docs/contributing.md`, require the `taught-check:` line in `/finish`, or gate it in CI.
- 1.x. Verified: yes (SPEC), no (issue states).

**S1-15-X27. Most failure branches have no broken fixture**
- Sources: Q3-F18 (#107 option 2).
- `checks/README.md:96-100`: one `EXPECT` per broken fixture; one or a few fixtures per check. README:102 ("come with S1-08") is stale.
- Fix: a coverage test giving each failure message at least one broken fixture.
- 1.x. Verified: no (branch list not retraced).

**S1-15-X28. "Each rule is testable" is asserted; no two-test gate, no table of a rule's tests**
- Sources: Q2-F17, Q4-6.
- `PROTOCOL.md:4-5`, `:26`, `:42-55`; design 09:48-50 ("a behaviour rule enters the protocol only after two fresh tests show it necessary or sufficient"); `:619` (`resume-opening-sentence`) and `:672` (`diagram-fallback`) marked "new", no test cited.
- Fix: one header line (a rule added or changed after v1.0.0 cites its two fresh tests); a tests column in the "Inherited" table, filled at stage 2.
- 1.x. Verified: yes.

**S1-15-X29. The "Inherited" section cites a construction note and lacks the eight `save-*` rows**
- Sources: Q3-F14.
- `PROTOCOL.md:603-604`: "Every ADR classified `protocol rule` in the S1-01 distillation is cited by at least one rule" (the note is removed at stage 4); the table (`:606-721`) has `save-points` and none of `save-next-step` … `save-preferences`.
- Fix: move the sentence to a construction note; add the rows or "inherit from `save-points`". PATCH.
- 1.x. Verified: yes.

**S1-15-X30. `teacher-posture-from-plan` bundles three behaviours, two untestable**
- Sources: Q2-F9.
- `PROTOCOL.md:59-61` (posture; « le public cible … guide la profondeur » ; « ses partis pris valent partout, lis-les au besoin ») against the writing rule `:46` (one behaviour per rule).
- Fix: split; `plan-stances-applied` with two tests on « Parti pris : une équipe en sprints » (A2 offered at 16c to a learner without sprints, not at 9a); posture to the teacher template.
- 1.x. Verified: yes.

**S1-15-X31. `two-failed-follow-ups` points at another rule and has no exit**
- Sources: Q2-F4.
- `PROTOCOL.md:219-220`: « réexplique de même » (the "de même" is `wrong-answer-follow-up`, `:216-217`; writing rule `:44-45` "A rule stands alone"); with `wait-for-understanding` (`:202`) a third failure loops.
- Fix: write the re-explanation out; add the exit (give the answer, a vigilance, « à revoir », continue).
- 1.x. Verified: yes.

**S1-15-X32. `adapt-to-pace-requests` names no observable effect**
- Sources: Q2-F5.
- `PROTOCOL.md:243-244`: « adapte-toi » for four requests; « plus vite » against `:170` (one leaf per message); « exercice » against `:372`.
- Fix: state each effect inside `one-sub-concept-per-message` and `short-messages`.
- 1.x. Verified: yes.

**S1-15-X33. `short-messages` has no unit of measure**
- Sources: Q2-F6.
- `PROTOCOL.md:248-251`: « une quinzaine de lignes au plus », its Pourquoi: « des lignes de 120 à 170 caractères »; reused at `:121`, `:166`, `:229`.
- Fix: a measure (rendered lines at N columns, or a character budget).
- 1.x. Verified: yes.

**S1-15-X34. Two rules disagree on switching business domain**
- Sources: Q2-F7.
- `PROTOCOL.md:319-320`: « Un autre domaine métier seulement si le concept s'y prête mal ou si l'apprenant le demande »; `:411-412`: « improviser un exemple dans un autre domaine métier, pour appuyer une conversation ».
- Fix: one condition in one rule.
- 1.x. Verified: yes.

**S1-15-X35. Three rules only permit, so no test can fail them**
- Sources: Q2-F8.
- `PROTOCOL.md:183-184` (« improvise un autre exemple quand l'échange le demande »), `:407-409` (first sentence of `asides-welcome`), `:411-412` (« Tu peux revenir… »).
- Fix: « quand <déclencheur>, fais X », or posture in the teacher template; keep « recentre en une phrase ».
- 1.x. Verified: yes.

**S1-15-X36. Two concept statuses have no rule that sets them**
- Sources: Q2-F3.
- `PROTOCOL.md:443` lists `{status.in_progress}` and `{status.to_review}`; `templates/learner/parcours.md:8-9` declares them; the save points (`:435`) are validated, skipped, dug, stop.
- Fix: a rule per status, or drop « à revoir ».
- 1.x. Verified: yes.

**S1-15-X37. The stop rules cannot be asserted: `hurried-departure`, `fresh-agent-reread`**
- Sources: Q2-F10, Q2-F11.
- `PROTOCOL.md:502` (« mêmes étapes, sans les commenter »: does `:489-490` or `:499-500` still apply?); `:495-497` (« corrige ce qui est absent ou ambigu »: a test cannot force a faulty first write).
- Fix: list the steps; restate the reread as post-conditions on `learner/parcours.md`.
- 1.x. Verified: yes.

**S1-15-X38. Seven rule slugs use banned or ambiguous words**
- Sources: Q5-B8 to Q5-B14. Q5 said blocks the tag (a slug is never reused); decided 1.x: a rename is a rule removed and a rule added, a MINOR by PROTOCOL.md:4-5, costing a burnt slug and updated citations; nothing outside `specs/linear-course/` and the tests cites a slug.
- `PROTOCOL.md:146` `domain-presented-from-sheet` ("sheet" against SPEC 5 "Domain files"); `:372` `validated-concept-exercises` (glossary:39: case, not "exercise"); `:310` `diagram-fallback` against `qualifiers.fallback` « rechange » (`:564`); `:177` `never-ask-banned-check` (glossary:78); `:495` `fresh-agent-reread` (glossary:21 "agent" alone banned; :80 "fresh" reserved); `:253` `framework-exchanges-exempt` (course glossary:10: « Scrum | Cadre de travail »); `:414` `back-to-thread-after-aside` (glossary:42: not "thread"), with « le fil » defined nowhere.
- Fix: `domain-presented-from-file`, `validated-concept-dug-by-cases`, `diagram-not-displayable`, `never-ask-if-understood`, `reread-as-next-teacher`, `classroom-exchanges-exempt`, `back-to-course-path-after-aside`; a glossary row for « le fil ». Cheapest before the tag (no burnt slug), but not a MAJOR after.
- 1.x. Verified: yes.

**S1-15-X39. Words the S2-09 translation has no reserved term for**
- Sources: Q5-M12, Q5-M13, Q5-M14.
- `PROTOCOL.md:27`, `:32`, `:44` ("tests" for fresh tests); `:57`, `:288` (« session » alone); `:319-320`, `:411-412` (« domaine métier »).
- Fix: "fresh tests"; a S2-09 brief note ("teaching session", "line of business").
- 1.x. Verified: yes.

**S1-15-X40. A decision cites a site decision that does not exist**
- Sources: Q4-14.
- `decisions/markdown-conventions-not-mdx.md:20`: "the site's decision `markdown-conventions-mapped-by-plugins`"; `site/decisions/` is empty.
- Fix: "(to be written at S3)". PATCH.
- 1.x. Verified: yes.

**S1-15-X41. Repository glossary rows to add or align**
- Sources: Q5-M1, M2, M3, M5, M6, M7, M8, M9, M11; Q4-12.
- `docs/glossary.md:34` vs `SPEC.md:81` (objective: "after the concept" vs "at the end of the domain"); `:37` vs `SPEC.md:129` ("teaching notes and example bank"); `:32` vs `SPEC.md:114`, `:117` ("numbered concept", annex undefined); `:60` vs `PROTOCOL.md:594-597` (`course.lock` lacks `domains_url`, `domain_url`, `concept_url`); `:70` vs SPEC column header "Status" (`:57`, `:76`, `:88`, `:101`, `:140`, `:202`) and the pack group `status`; `SPEC.md:235` and `checks/sources.js:57` "nature" for a stance; `SPEC.md:150` "renders", `:160` "legend"; `PROTOCOL.md:303-310` « schéma » (glossary:46 bans it) beside `headings.drawing` « Schéma »; no English rows for dig, aside, skip, vigilance, lever, journal.
- Fix: rows and PATCH rewordings ("Presence" header, "stance" in the check message, "builds", "under the diagram").
- 1.x. Verified: yes.

**S1-15-X42. Check ids reuse reserved words**
- Sources: Q5-M16.
- `course-files` (`SPEC.md:444`, domain files included) against "course files" (`:441`, glossary:36, every file of a course); `svg-contract` against **drawing contract** (glossary:47).
- Fix: title SPEC 6 "Course-level files"; note the ids in the glossary rows.
- 1.x. Verified: yes.

---

## Dismiss

**S1-15-D01.** `specs/linear-course/CHANGELOG.md` absent (Q1-F16). Reason: S1-16 (#29) creates it at the tag. Verified: yes.

**S1-15-D02.** Design 03:130-131 lists a « Relances » field the spec lacks (Q4-15). Reason: follow-ups are inline in « Erreurs fréquentes » (SPEC:210), as the old template already did; « Réexplication » (#197) was folded the same way. Verified: yes (SPEC), no (old template).

**S1-15-D03.** SPEC:345-346 requires a `<text>` in every diagram where design 04:42-44 said "if the diagram carries words" (Q4-16). Reason: stricter, consistent with 7.2.6, every diagram passes; loosening later is a MINOR. Verified: yes.

**S1-15-D04.** The design's "one or two lines" bound on saying a caption is gone from `requested-diagram-shown` (Q4-17). Reason: 7.2.1 limits a caption to one sentence. Verified: yes.

**S1-15-D05.** The reason for group ids was dropped, and they are not identifiers (Q4-18). Reason: nothing reads them; listing them as identifiers later binds only future renames. Verified: yes.

**S1-15-D06.** No decision file for the protocol decisions design 09:36 mentions (Q4-19). Reason: distilled into rules; the "Inherited" table cites each ADR. Verified: yes.

**S1-15-D07.** Q5's own dismiss list ("body", `examples-from-bank`, `headings.concept_thread`, `learner_says.exercise`, "recap", `site-pages-not-files`, "rules"/"behaviour" in PROTOCOL, "agent" in decisions, `neighbors`, `checks.anaphora`, `minirecap_entry`, `cut-loses-unsaved-state`, `contradicted-observation-fixed`, « Le prof », « État »). Reason: no reserved term clashes, or French course material. Verified: spot-checked (`concept_thread`, `exercise`, "body").

**S1-15-D08.** Q2's dismissed rules (`correct-frankly`, `wait-for-understanding`, `line-only-if-it-matters`, `periodic-mini-recap`, `cut-loses-unsaved-state`, `first-concept-next-message`). Reason: two tests exist for each (extreme fixtures, a bound, a resume outcome). Verified: yes.

**S1-15-D09.** Counterexamples that are course quality, not contract: lost passages (#167, #200, #201), SVG subject/contrast/one-idea (#186, #188, #189, #194, #195, #202), « Nature » cells and « exemple inventé » (#167, #186, #188), task ids `T-018a` (#193, #197), missing cross-concept source paths (#186, #193), the « Voir « Sous-concepts » » pointer (#168, ruled 2026-10-28), the reader sub-headings turned into bold paragraphs (#23 ruling; a course decision file is owed in `courses/parcours-po/decisions/`, a course matter). Reason: out of scope (course text, sources and diagram quality, decision of 2026-10-29). Verified: no (PR reviews not reread).

**S1-15-D10.** #208 findings 6, 8, 9 (ordering and storyline facts inside the course, fixed by #209) and 10, 11 (false cross-references: `conventions` checks existence as SPEC 4.5 says; truth is taught-check check 6). Reason: course defects or by design. Verified: yes (SPEC 4.5, taught-check:78).

**S1-15-D11.** `<qui>` placeholders flagged as HTML (#176), « Cas de la banque » line (#177), « Réexplication » field (#197). Reason: the checks held as specified. Verified: no.

**S1-15-D12.** #107 as a finding (Q1, Q3, Q4, Q5 all mapped it). Reason: it is the process gap behind X01, X05, X25, X27; those carry it. Verified: yes.

---

## Summary

| Class | Count |
|---|---|
| Blocks the tag | 3 |
| 1.x | 42 |
| Dismiss | 12 |

Blocks the tag:
- **S1-15-B01** `sources.md` claim parenthesis has no grammar; the site filter keys on it (SPEC 4.4).
- **S1-15-B02** decision `where-a-claim-goes` (accepted) contradicts SPEC 4.4 and the `sources` check; « Non vérifié » has two definitions (SPEC 4.4, decisions).
- **S1-15-B03** the SPEC 8 version table cannot classify a check, pack-key or field-status change (SPEC 8).

Counts corrected on the way: « interne » references are 10, not 16 (X13); « annexe A… » mentions are 15 in `concept.md`, 34 in all, not 41 (X15); diagrams on a parent are 8 of 32 (X07); cases without « Explication » are 7 (X09); « Consensus »-alone parentheses are 19 by my parse, not 27 (B01); glossary row 83 does not support Q3-F4 (X01). Every cited line number I reopened was right.

## Decisions the maintainer must make (close calls)

1. **B02, which way**: defer the decision (prose now, the strict rule a MAJOR later) or apply it before the tag (69 rows, 10 « interne » references, a second known-failing check). X13's `internal` type depends on it.
2. **X09**: keep « Explication » optional with a rule naming the fallback (1.x, my call), or make it mandatory, which is a MAJOR and must land before the tag (7 cases to write).
3. **X04**: keep `messages` and add a rule (1.x), or remove it, a MAJOR after the tag (0a1 and 0a2 then carry the split in « Consignes »).
4. **X38 and X22**: the seven slug renames and two pack-key renames are 1.x by my criterion but cost nothing now and a burnt slug per rule later; bundling them before the tag is cheap if the maintainer accepts touching the French rules' slugs before S2-09.
5. **X19**: "the site inlines the SVG" is one PATCH sentence; writing it now removes the only path by which stage 3 could force a drawing-contract MAJOR.
6. **X18**: I classed the glossary cell form 1.x on the ground that glossary terms are not identifiers; if the maintainer considers the glossary table a parsed form the site freezes (SPEC:314 "reads the first table as is"), it joins B01.
7. **B03's rows**: whether a stricter check that every live course already passes is a MINOR (my proposal) or always a MAJOR; this sets the class of X02, X20 and X21.

---

## Maintainer triage (2026-10-29)

The maintainer read the note and reframed the review before classing anything: the aim is a
finished spec; `parcours-po` as it stands is evidence and will be rewritten against the
established spec, so no backward compatibility of the course was weighed; the spec must read
as a creator's instructions (purpose first). Under that frame the cost classes were redone:
**a stricter or new conformity check after the tag is a MAJOR; a quality check is a MINOR**
(T01, T12); a slug or pack-key rename is a MINOR but costs nothing before the tag (T09).

### Classes overturned

- **B01** (the claim parenthesis as a visibility boundary): overturned. The filter it guarded
  no longer exists (T05: only the concepts are sourced, `sources.md` is entirely reader-facing);
  its form is settled as a separate Section column (T07.3), before the tag.
- **B02**: held, decided as "apply the decision before the tag" (T04); the tag certifies the
  spec, not the course (R-B2).
- **B03**: held (T01), with the rows the version table lacked, and the two check families.
- **Raised to "before the tag"** from 1.x: X01, X03, X04, X05, X07, X08, X09, X10, X11, X12,
  X13, X14, X15, X16, X18, X19, X21, X22, X25, X26, X29, X38, X40, X41, and X20's decision
  update. Reason: a conformity change after the tag is a MAJOR; a wording change is cheap now and
  part of the purpose-first rewrite.
- **Kept 1.x**: X02, X06 (as a non-blocking report, not a check), X20 (the quality checks), X23,
  X24, X27, X39, X42. One backlog issue, #212.
- **Settled otherwise**: X17 (the order rule stays, as a quality check with the forward-mention
  form; T11), X28 and X30 to X37 (not rewritten before the tag: the protocol is a base, see
  below; T13, R-B4).
- **Dismissed**: D01 to D12 as classed by the merge agent. Added: the "proven" status for
  inherited rules (no test record), the `interne` reference type (T04), the course-level
  references file (T07.6), a `warn` level in the runner (T12).

### Decisions beyond the findings

Raised by the maintainer during the triage, not by the review: the folder per MAJOR (T02), the
written rules about specs (T03), sources trace the concepts only and « Approfondissement »
(T05), the spec written purpose-first (T06), the sources structure purpose-first (T07),
`messages` removed (T08), the drawing property (T10), the two check families (T12), the
protocol as a base (T13, R-B4), dig renamed practice (R-R1).

### Issues created

`stage-1`, blocking #29, in order (each blocked by the previous): #215 the spec framework and
the folder per MAJOR; #216 `SPEC.md` purpose-first, sections 1 to 3 and 5 to 10; #214 section
4, the case contract and « Approfondissement »; #217 section 4.4, the sources; #218 the protocol
base. Blocked by #29, blocking nothing: #212 `linear-course 1.x` (the backlog), #213 the
`parcours-po` conformity pass. #29's Done when is to be restated by the maintainer: the tag
certifies the spec (fixtures green, `check-spec`), the course's conformity failures are recorded
on #213 (R-B2).

### Input of the protocol user stories: rules untestable as written

Listed for later, with the missing test; not rewritten before the tag (T13, R-B4). Line numbers
at commit 8860490.

| Rule | Line | What cannot be tested | Missing test |
|---|---|---|---|
| `teacher-posture-from-plan` | 59-61 | three behaviours in one rule; "posture" and « au besoin » | two tests on « Parti pris : une équipe en sprints » (A2 offered at 16c, not at 9a) |
| `two-failed-follow-ups` | 219-220 | « réexplique de même » points at another rule; no exit after a third failure | the third failure on the same question |
| `adapt-to-pace-requests` | 243-244 | « adapte-toi » names no observable effect; « plus vite » against one leaf per message | an assertion per request |
| `short-messages` | 248-251 | « une quinzaine de lignes » has no unit (lines of 120 to 170 chars) | a 15-line message of long lines, passed or failed |
| `change-situation-not-business` vs `past-concepts-revisited` | 319-320, 411-412 | two conditions for switching business domain | "the conversation needs support, the concept fits, the learner did not ask" |
| `examples-from-bank` (2nd clause), `asides-welcome` (1st sentence), `past-concepts-revisited` | 183-184, 407-409, 411-412 | they only permit; a teacher that never does them complies | an obligation with a trigger |
| `save-concept-statuses` | 443 | « en cours » and « à revoir » have no rule that sets them | "after X, `parcours.md` shows `à revoir`" |
| `hurried-departure` | 502 | « mêmes étapes, sans les commenter »: which steps | the expected output of a hurried stop |
| `fresh-agent-reread` (`reread-as-next-teacher`) | 495-497 | « corrige ce qui est absent »: a test cannot force a faulty first write | post-conditions on `learner/parcours.md` after a stop |
| the "two tests" gate, "Each rule is testable" | 4-5, 26, 42-55 | no table of a rule's tests; rules marked new without tests | a tests column, filled with the teacher |
