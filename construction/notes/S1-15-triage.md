# S1-15 triage: the decisions (2026-10-29)

Journal of the triage of the S1-15 review (#28), taken point by point by the maintainer with
the orchestrator on 2026-10-29, then reviewed cold by a fresh agent (its findings and their
settlement are the R-* entries at the end). Kept here until stage 4; the decisions it names
enter the repository through issues #215, #216, #214, #217, #218 (stage-1), #212 and #213.
Finding ids (B01, X09...) refer to `S1-15-review.md`.

---

## T01. Version policy: what costs a MAJOR, and how long a MAJOR lives

**Findings:** B03 (the version table cannot classify a change to a check); the maintainer's
questions of 2026-10-29 on the course life cycle.
**Status:** decided 2026-10-29 (the new-check nuance settled the same day).

### Context

`specs/linear-course/SPEC.md` section 8 has a version table. MAJOR: the structure changes (a
file, a field or a mandatory section added, removed, renamed). MINOR: an optional section or
field added, a protocol rule added or changed. PATCH: wording only. A course declares only the
spec MAJOR it follows (`spec: linear-course@1` in `course.yaml`, SPEC lines 60 and 405); the
checks of the spec folder verify a course against that MAJOR. The table says nothing about a
check made stricter or looser, a new check, a language-pack key added or renamed, an optional
field made mandatory. Already pending: relax `glossary-order` (closed PR #207), apply decision
`where-a-claim-goes` (B02, would make `sources` stricter and fail 69 rows of the course).

Scenario that decided it: two courses (PO and SE) on spec 1.2.1, each with its own maintainer. A
check is added in 1.3.0. PO adapts at once; SE needs ten days. Under "a stricter check is a
MINOR", SE's check run is red for ten days although its maintainer broke nothing, a MINOR then
breaks the promise "no course moves", and a red run cannot tell "behind the spec" from "broke
something".

### Options

- A. A stricter check that every course of the repository already passes is a MINOR.
- B. Any stricter check is a MAJOR; old MAJORs stay alive so a course not yet migrated stays
  green on its own MAJOR.
- C. The course also declares its MINOR (`linear-course@1.2`) and each check carries the version
  it appeared in. (Not retained: changes the `spec` field, one version per check to maintain.)

### Decision

B. Rules:

1. A check made stricter, or an optional field made mandatory, is a **MAJOR**.
2. A check made looser is a MINOR. A **new** check is a MAJOR, like a stricter one, with no
   exception and no condition: "every course of the repository already passes it" is not
   retained (see Why).
3. A language-pack key added or renamed, with every pack of the repository updated in the same
   change, is a MINOR. A protocol rule renamed (the old slug is burnt) is a MINOR.
   *Amended by T12 (2026-10-29): rows 1 and 2 hold for conformity checks; a quality check added
   or made stricter is a MINOR, since it blocks nothing.*
4. **Every MAJOR stays alive, with no time limit.** Tooling (teacher, site, classroom build)
   reads every MAJOR. A MAJOR may be archived, later and automatically, when no published
   version of any course still declares it (a tagged `parcours-po/v0.3` declaring `@1` counts).
5. **An old MAJOR receives bug fixes** (a check that is wrong, a mistake in the protocol), as
   PATCH. It receives no new rule and no stricter check: those go to the current MAJOR.

### Why

Running every check on every course of the repository costs almost nothing (measured
2026-10-29: `check-course` on `parcours-po`, 20 concepts, 1.4 MB, 0.15 s; the spec fixtures
1.7 s; deterministic Node scripts, no agent). Cost is not the objection. The objection is that
"every course of the repository" is not the population the rule protects: a published tagged
course version (`parcours-po/v0.3` declaring `@1`), or a course outside the repository, is not
tested by it, and a course edited after the merge can fail later. A rule with no condition has
nothing to verify at merge time: a course declares a MAJOR, and that MAJOR fixes exactly the
checks that apply to it.

A MAJOR is the only number that tells a course maintainer "your course is unaffected until you
choose to move". Keeping old MAJORs alive turns a stricter check into a scheduled migration,
instead of a surprise red run.

### Implications

- Amends decision `docs/decisions/two-versioned-objects.md`, which says tooling reads "every
  spec MAJOR still in use (one or two)". A new or amended decision is needed (counterfactual: an
  agent dropping `@1` support when `@2` appears and breaking a course that has not migrated).
- Tooling cost grows with each MAJOR: stage 2 and 3 must dispatch on the declared `spec:`.
- A MAJOR copies the whole spec tree (see T02), so stricter or new checks will be batched into
  one MAJOR rather than one MAJOR per check. This rests on a projection with no basis yet (spec
  changes arrive in batches); the first real 1.x batch tests it. About ten of the 42 "1.x"
  findings of the review are new or stricter checks (X01 to X03, X05, X11, X14, X20 to X22,
  X27) and would form one MAJOR 2. If changes instead arrive one at a time, reconsider option C
  (the course also declares its MINOR).
- Archiving criterion is "no published course version declares it", not "no course of the
  repository".

### Changes (after the triage)

- `SPEC.md` section 8 (or its replacement, see T03): new rows.
- Decision `two-versioned-objects` amended or superseded (`/decide`).
- `SUPPORTED_MAJORS = [1]` hard-coded in `checks/lib/course.js:8` stops being a list of what one
  runner knows (see T02).

---

## T02. Layout: one folder per MAJOR

**Findings:** raised by the maintainer on 2026-10-29 (not in the review).
**Status:** decided 2026-10-29.

### Context

Today `specs/linear-course/` holds directly `SPEC.md`, `PROTOCOL.md`, `checks/`, `lang/`,
`decisions/`, `templates/`: one state of the spec exists in `main`. T01 requires several MAJORs
alive at once and read by tooling at run time; fetching old ones through git tags does not give
that. `checks/lib/course.js:8` hard-codes `SUPPORTED_MAJORS = [1]` and `course-yaml.js` refuses
an unknown MAJOR. 85 non-note references to `specs/linear-course` exist (skills,
`.claude/settings.json`, check scripts, a course CHANGELOG, construction plans).

### Proposal

`specs/linear-course/<MAJOR>/` holds `SPEC.md`, `PROTOCOL.md`, `checks/`, `lang/`, `decisions/`,
`templates/`. The check runner reads the declared `spec: linear-course@N` and runs
`specs/linear-course/N/checks`; the hard-coded list disappears. Folder name `1/` (not `v1/`),
because the declaration already writes `@1`. Moving is cheap now (v1.0.0 not tagged, one MAJOR)
and expensive after.

### Decision

`specs/linear-course/1/` holds directly `SPEC.md`, `PROTOCOL.md`, `README.md`, `checks/`,
`decisions/`, `lang/`, `templates/`. Folder name `1/`, not `v1/`; no extra level between the
MAJOR and the files (the spec name is already in the path). The check runner reads the declared
`spec: linear-course@N` and runs `specs/linear-course/N/checks`; the hard-coded list goes away.
A new MAJOR copies the tree of the previous one; an old MAJOR receives bug fixes only (T01).

### Changes (after the triage)

- Move the tree (`git mv`), update the references: `.claude/settings.json` (two permission
  lines on `check-course`), the migration variant of the reviewer brief in
  `.claude/skills/orchestrate/SKILL.md`, `courses/parcours-po/CHANGELOG.md`, check scripts and
  fixtures, construction plans, `specs/README.md`, `specs/linear-course/README.md`.
- Check runner: resolve the checks directory from the declared MAJOR.
- Must land before the tag `linear-course/v1.0.0` (a path move after the tag breaks consumers).

## T03. Written rules about what a spec is

**Findings:** raised by the maintainer on 2026-10-29; B03 becomes one of its parts.
**Status:** decided 2026-10-29.

### Context

`specs/README.md` has three lines ("each folder holds one spec..."). Nothing says what a spec
must contain, how a MAJOR is laid out, what changes in an existing MAJOR, how a MAJOR lives and
ends. The only such rule is the version table, and it sits inside the spec of one course kind.

### Proposal

One document on specs (`specs/README.md`, or a decision of area `repo`), valid for every spec:
what a spec contains; the folder-per-MAJOR layout (T02); what may change inside an existing MAJOR
(bug fixes only, T01); the version table, moved up from `linear-course` (T01); the life of a
MAJOR (never removed while a published course version declares it, T01).

### Decision

Both. A decision of area `repo` (slug to choose at `/decide`, for example
`spec-versioning-and-layout`) carries the rules, their reason and the counterfactual; `specs/README.md`
carries a summary of the **current** rules only, in the present tense, no history, opening with:
"Summary of decision `<slug>`; if they differ, the decision wins". `CLAUDE.md` map row `specs/`
points to `specs/README.md`. Content: what a spec contains; folder per MAJOR (T02); what may
change inside an existing MAJOR (bug fixes only, T01); the version table, moved up from
`linear-course` `SPEC.md` section 8, which keeps a pointer (T01); the life of a MAJOR (T01).

**Amend rather than supersede.** `two-versioned-objects` continues (two versioned objects, a
course and a spec): it is amended in place, "one or two MAJOR" becoming "every MAJOR still
declared by a published course version". A decision is marked `superseded-by` only when the new
one contradicts the substance of the old; otherwise it is amended, so the folder holds no dead
file and git keeps the history.

### Why

An agent entering `specs/` reads the README and meets no rule that no longer holds; the
decisions folder, which also holds superseded decisions (1 of 26 today), is consulted for the
reason, not to work. The decision gives the counterfactual the repository requires
(`decision-format.md`): without it an agent would drop support for an old MAJOR, or open a MAJOR
for a bug fix.

### Observation outside the scope of #28

`/decide` step 4 lists and greps every decision for neighbours, so a `superseded-by` decision
comes back as noise. Minor (1 of 26): a 1.x-class tooling issue, not for the tag.

### Changes (after the triage)

One `stage-1` issue (with T02, or separate): write the decision, amend `two-versioned-objects`,
write `specs/README.md`, move the table of `SPEC.md` section 8, point `CLAUDE.md` to the README.

---

## T04. Where a claim goes: apply the accepted decision before the tag

**Findings:** B02 (Q1-F2, Q3-F2, Q4-2, Q5-B7); X13 (the « interne » reference type) is settled by it.
**Status:** decided 2026-10-29.

### Context

Decision `specs/linear-course/decisions/where-a-claim-goes.md` (accepted 2026-10-28, issue #99)
says: a claim the course makes by its own choice has nature `cours` and cites no reference, its
source cell holding the `markers.course` word (« cours »); any other claim without a reference
fails; free text (« aucune », « fil rouge ») is not a source; a storyline fact leaves
`sources.md`; « Non vérifié » holds what must not be asserted, as an instruction. It says
`SPEC.md` 4.4 and the `sources` check change "with the course pass (#140, then #141)". Both
issues were closed not planned (2026-10-28). `SPEC.md` 4.4 says only "every claim has a source
and a verification", and « Non vérifié » is "the claims no consulted source confirms, and why".
`checks/sources.js:46-47` accepts any non-empty cell and `checks/README.md:52-54` lists « fil
rouge » and « aucune » as valid. Course: 69 claim rows cite neither a reference id nor a path
(« aucune » 21, « fil rouge » 16, `storyline.md` 21, `plan.md` 6, `decisions/team-in-sprints.md` 4,
« glossaire » 3; « cours » 0), and 10 reference rows are typed « primaire (interne : ...) ». In
the course « Non vérifié » holds both unconfirmed claims ("Le texte de Beck: non consulté") and
instructions ("Écrire « on la trouve chez Wake »").

### Options

- A. Defer: amend the decision to what the check does, strict rule in a later MAJOR.
- B. Apply the decision in `SPEC.md` 4.4 and the `sources` check before the tag.

### Decision

B. The maintainer's aim is a stable, complete `linear-course` spec; the course's quality work
comes later, "à froid".

1. `SPEC.md` 4.4 and the `sources` check carry the rule of the decision: a claim's source cell
   holds a reference id, a path to another concept's `sources.md`, or the `markers.course` word;
   nothing else. Fixtures cover each failure.
2. A storyline fact is not a row of `sources.md`.
3. « Non vérifié » has one definition: what no consulted source confirms and why, with, when
   useful, the instruction that follows (« écrire X, pas Y »). It is never built for the site.
4. No type `interne` in the language pack: an internal-evidence claim becomes a `cours` claim
   with no reference (X13 closed).
5. `parcours-po` fails `sources` at the tag, as it fails `glossary-order`; no course pass now.
   Documented in the course CHANGELOG. The Done when of #29 ("checks except `glossary-order`")
   becomes "except `glossary-order` and `sources`": to be amended by the maintainer.

### Why

Asymmetry created by T01: a strict rule frozen in v1 and found too hard is loosened in a MINOR;
a lax rule frozen in v1 and tightened later is a MAJOR plus a course migration. The rule has real
counterexamples behind it (concept 9; the 69 rows). `parcours-po` is `v0.1.0`, "complete but
still beta" (decision `two-versioned-objects`), so a known non-conformity at the tag is tolerable.

### Implications

- CI (S3-06, #44) must tolerate two known-failing checks on `parcours-po`.
- A new or stricter check is a MAJOR (T01): the "1.x" class of the review has to be redone for
  the items that are checks (X01 to X03, X05, X11, X14, X20 to X22, X27, and the check part of
  B01): include in v1.0.0, or accept as the first batch of MAJOR 2. See T05.

### Changes (after the triage)

One `stage-1` issue: rewrite `SPEC.md` 4.4, `checks/sources.js` and its README, add fixtures,
amend decision `where-a-claim-goes` (remove the "not before" sentence, since the rule now lands),
update the course CHANGELOG and the Done when of #29.

---

## T05. Sources trace the concepts only; « Approfondissement »; the case contract

**Findings:** B01 (the claim parenthesis of `sources.md`), X09 (what the learner receives, the
source of the explanation), X10 (case fields with no rule), X11 (qualifiers), X13 (« interne »),
and the maintainer's questions of 2026-10-29 on why the teacher would need sources of its own.
**Status:** decided 2026-10-29.

### Framing note from the maintainer (applies to the whole triage from here on)

The spec is worked on to produce better, maintainable, testable courses; `parcours-po` as it
stands is evidence to improve the spec, and will be rewritten against the established spec.
**No reasoning about backward compatibility of `parcours-po`**: the only cost that counts is the
cost of a change after the tag (T01). The spec must also read as instructions for a course
creator (human or agent): see T06.

### Context

`sources.md` traces "every verifiable claim of the concept folder" (SPEC 4.4). In the old
repository a concept was one file (reader text and example bank together) and ADR-016 traced
every claim of that file, so cases were sourced with the rest; the migration copied `sources.md`
faithfully (rule M10). Classification of the 720 claim rows of `parcours-po` by what their
parenthesis names (script run 2026-10-29): about 600 name `concept.md` sections or the stances
only, about 75 mix `concept.md` and `teaching.md` items (bank, case title, Consignes, Schéma),
about 50 name `teaching.md` only. The 50 are storyline facts (« Régis conduit la camionnette
(Consignes) »), production notes (« les libellés du schéma sont inventés (Schéma) »), course
deductions carried by a case (nature `cours`, no reference), or claims the reader text already
states but whose parenthesis points to the case that illustrates them. The concept 9 triage
(`construction/notes/99-sources-triage.md`): 39 rows, 20 mis-sectioned but stated by the reader
text, 1 storyline fact, 0 gap, 1 genuinely teacher-only row, a « Réserve, sur demande ». The two
reserves of the course: concept 5 (Maud's answers in a role-play, storyline material already in
`storyline.md:111`) and concept 9 (other SPIDR letters, Lawrence patterns: sourced knowledge the
reader does not have).

### Decision

1. **Only the concepts are sourced.** A row of « Affirmations » names a section of `concept.md`
   (a heading or a sub-concept id) or the stances (`headings.stances`), nothing of `teaching.md`.
   The storyline has facts, no sources. A claim only `teaching.md` states is a gap (it enters
   `concept.md`) or is not a claim to source (a storyline fact, a teaching device).
2. **`sources.md` is entirely reader-facing. No filter inside a file, anywhere.** The site builds
   every « Affirmations » row and the « Références » they cite; « Non vérifié » is not built. The
   "one filter" of decision `reader-facing-and-teacher-only-files` becomes none. The parenthesis
   is a locator (which section carries the claim), no longer a visibility boundary: B01 loses its
   gravity; its form is still to fix (see "Open").
3. **A new optional section of `concept.md`, « Approfondissement »** (`headings.deepening`),
   after « Le test rapide »: topics the teacher may deepen on the learner's request, with their
   sources in `sources.md` like any claim. Rendered by the site like the rest (no filter;
   grouping or folding is a stage 3 presentation choice). Protocol rule at stage 2: deepening is
   given on request only, never in the main loop; not counted as taught by taught-check.
4. **The case field « Réserve, sur demande » is removed**, with its pack key
   `case_fields.reserve`. Sourced deepening goes to « Approfondissement »; role-play material is
   the teacher's, improvised from `storyline.md` (rule `storyline-facts-then-improvised`); an
   answer indispensable to a case goes in « Situation ». The old ADR-027 context (a teacher that
   dared not name a source) no longer applies.
5. **Storyline facts live once, in `storyline.md`.** A case holds the unfolding (who says what,
   when), never a new fact; « Faits du fil rouge utilisés » of `teaching.md` lists the storyline
   facts the concept's cases use and is the link to reread when the storyline changes.
6. **The purpose of a case is written at the head of SPEC 4.3.** A case is the prepared question
   of the loop: it gives coverage (every leaf has one, checked), the course's own position (the
   expected answer is the course's consensus or school), experience (common mistakes come from
   real learners), anchoring (it lives in the storyline), testability (fresh tests cite it). When
   to create one: one per leaf (mandatory), a fallback when the first fails, a dig for the learner
   who wants more, an aside for a frequent off-thread question; never for something the reader
   text does not state (that is a gap of the concept). The case is the unit of `course-batch`,
   taught-check and fresh tests; what the learner receives is its « Explication » and
   « Situation » (X09).
7. **The case contract** in SPEC 4.3: for each field, what it may contain, who reads it, when the
   teacher uses it. Usage (when to pose, for fallbacks and asides; kept), Explication (what the
   teacher says before the case; the source of the learner's explanation, the leaf's reader text
   as fallback), Situation (actors and storyline facts posed up front), Question, Réponse
   attendue, Erreurs fréquentes, Ce qui marche (optional, last: what a teacher saw work, for the
   next teacher; empty in an initial course; fed from the teacher's observations via the
   maintainer, a course maintenance rule). A qualifier carries a protocol meaning only when it
   equals a `qualifiers.*` value (X11); a fallback case stands alone.
8. **No `interne` reference type** (X13, already in T04): internal evidence is a `cours` claim.

### Why

The teacher-only rows of `parcours-po` are an inheritance of the one-file format, not a need:
the concept 9 triage found no claim a case teaches that `concept.md` does not state. A case
applies a concept whose claims are sourced; `origin-from-sources-file` answers from them. One
rule ("the site builds everything in a reader-facing file") removes the leak that a malformed
parenthesis could cause, and the maintenance path for storyline material is one fact in one
place.

### Implications

- T04 applies decision `where-a-claim-goes` as amended by this entry: test 3 shortened (gap, or
  not a claim), no teacher-only rows, reserve gone. Its substance (« cours » as the only
  no-reference source word, free text refused, « Non vérifié » merged) is unchanged.
- Decision `reader-facing-and-teacher-only-files` amended: zero filter inside a file.
- SPEC 4.2 (new section), 4.3 (purpose, contract, field removed), 4.4 (every row built; the
  parenthesis names `concept.md` or the stances only); pack: `headings.deepening` added,
  `case_fields.reserve` removed; `concept-folder` (section order, field list), `sources`.
- Protocol (stage 2, two tests each): deepening on request; Usage; Explication as the source of
  the explanation. The protocol rules that read « Réserve » (none today) are not needed.
- Glossary rows: case vs example (the heading « Banque d'exemples » holds cases: X41), deepening.

### Open (next entries)

- B01's remaining part: the form of the parenthesis as a locator (comma-separated headings or
  sub-concept ids of `concept.md`, or the stances), checked by `sources`; whether to move it to a
  fifth column is now free of course cost. To settle after T06.
- T06: the spec written purpose-first, so that it reads as a creator's instructions.

---

## T06. The spec is written purpose-first and reads as a creator's instructions

**Findings:** none of the review's; the maintainer's framing note of 2026-10-29 (see T05).
**Status:** decided 2026-10-29.

### Context

`SPEC.md` is written for a verifier: per element, what it holds, whether it is mandatory, which
check enforces it. It almost never says what the element is for; only section 1 (five lines)
states a purpose. `course-batch` hands its writers "SPEC.md sections 4 to 6, the templates,
PROTOCOL.md" in bulk and then compensates with hand-written purposes inside the workflow script
("the reader text respects the overlap rule", "never did you understand"): purposes of the spec
that live in a script and drift from it unseen (#107 applied to writers). Asking "what is a
reserve for?" is what removed the field in T05: a spec that carries each element's purpose can
be triaged the same way.

### Decision

1. **A fixed micro-structure per element** (file, section, field, rule): **Purpose** (for whom
   and why: the course, the teacher, the learner, the maintainer), then **Holds**, then **Rules**
   with their check. The purpose paragraph opens with a fixed marker (`**Purpose.**`) so a script
   or an agent can extract it.
2. **Section 1 becomes the creator's overview**: the big lines in the order a course is created
   (domains, concepts, sub-concepts; the storyline and what it is for; `teaching.md` as the
   teacher's support; when to create a case), one page, pointing to the sections.
3. **No separate guide.** The spec is the single source; briefs are derived from it:
   `course-batch` builds its brief by extracting the Purpose paragraphs of the sections it needs
   instead of rewording them. Templates keep their header (which file, which SPEC section) and may
   quote the Purpose in one line, never reword it.
4. **`check-spec` verifies that every element has its Purpose paragraph.**

Rejected: purposes written in the templates only (puts the "why" where the creator looks, but
apart from the rules, and covers neither the protocol nor the versions).

### Why

A creator (human or agent) must read the spec as "constraints, but above all a well-explained
frame for a quality course". One source for rule and purpose keeps briefs from drifting (#107).
Writing the purpose first is also the working order for the stage-1 rewrite: the purpose says
whether the element stays, before its rules are touched.

### Implications

- Wording only by the version table (PATCH), but it is the frame of the pre-tag rewrite of
  `SPEC.md`: 4.3 is written once, purpose-first.
- `SPEC.md` grows (it already says it nears 400 lines without the protocol); splitting it
  (structure, diagrams, checks in separate files) is a form choice, not settled here.
- `course-batch` (#142 area) later reads the Purpose paragraphs instead of carrying its own.
- `check-spec`: one new rule.

---

## T07. Sources, purpose-first

**Findings:** B01 (remaining part: the locator), B02/T04, X13, X14 (link column), and the
maintainer's request of 2026-10-29 for a general review of the sources structure.
**Status:** decided 2026-10-29 (nine points).

### Method

Apply T06 to `sources.md` itself: the readers and their needs first, then each element of the
current structure against those needs. Measured on `parcours-po` (2026-10-29): 700 claim rows
(nature: consensus 200, cours 181, école 164, empty 155, the empty value defined nowhere);
verification cell 229 chars median, 445 at p90, 852 max; about 1,750 lines for 20 concepts;
199 reference rows for 146 distinct links (the Scrum Guide described 18 times, 7 sources cited
in 3 concepts or more); 145 « Non vérifié » entries; 219 `refs` in the concept frontmatters;
about 150 claim rows restating frontmatter stances with the section « Consensus et choix
d'école »; 19 of 20 files have the optional introduction.

### Point 1, decided: the readers of the sources and what each needs

| Reader | Needs | When |
|---|---|---|
| the reader of the site | to know the course is grounded; where to read further; which claim is consensus, school or the course's choice | reading a concept |
| the teacher | to answer « d'où ça vient ? » with the source as described, and say what is not verified (`origin-from-sources-file`, `unverified-part-told`) | on the learner's request |
| the creator (human or `course-batch`) | what to source and what not to; where to put what could not be confirmed | writing the concept |
| the reviewer (substance review, fresh review) | that a claim is backed by what it cites: the quotation, the place | reviewing |
| the maintainer | when a source changes or a section is rewritten, what to re-verify; when it was consulted | months later |

Founding principle (ADR-016 of the old repository): sources documented and traced, without
weighing on the teaching. Traceability is worth its re-verification, not its volume.

**Note from the maintainer:** this readers-and-needs table is what every building block of the
spec should have. It becomes the form of the **Purpose** paragraph of T06: for each element, a
readers/needs/when table (or its one-line form when there is one reader).

### Points to settle, in order (each against the table above)

2. **Decided 2026-10-29: a stance is sourced in its own item.** Each frontmatter stance item
   carries `refs` (as today) and `verified` (the quotation and its place; optional for a
   `course` stance, which no source states). No « Affirmations » row restates a stance: the table
   covers the body of `concept.md` only. Why: against the readers table, the row added only the
   verification, at the cost of the stance text written twice with no checkable join; the proof
   now sits beside what it proves. The nature of a stance is its list (consensus, school,
   course); the « nature » column of « Affirmations » serves body claims only. Check: every id in
   `refs` exists in « Références ». Rejected: the row as the only source with the frontmatter
   losing `refs` (needs an id per stance, moves the source away from what the reader reads).
3. **Decided 2026-10-29: the « Affirmations » table.** (a) Scope: every verifiable claim of the
   body of `concept.md` (definition, date, figure, quotation, what a guide says or not); the
   Purpose lists what is not a claim to source: a storyline fact, a teaching device, a stance
   (sourced in its item), a wording of the course. (b) A separate **Section** column after the
   claim: sub-concept ids (`4b`, `9a1`) and fixed sections by their pack name (« L'essentiel »,
   « Pièges », « Le test rapide », « Approfondissement »), several separated by commas, never a
   heading text; `sources` checks each exists in `concept.md`. This closes B01. (c) The table
   stays in a reader-facing file, no filter (T05); the site's presentation (folded, after
   « Références », or linked) is a stage 3 choice; the Purpose says « Références » serves the
   reader first and « Affirmations » serves the audit (reviewer, maintainer, teacher on request).
   Table shape: five columns, claim, section, source, verified, nature (a MAJOR to change after
   the tag: now).
4. **Decided 2026-10-29: the « vérifié » column holds, per reference cited in the source
   cell and in the same order, the shortest quotation that settles the claim, between « », then
   its place in parentheses (section, page, heading).** Three cases: an absence (« absent de »
   plus the place searched); a `cours` claim (one line saying what it follows from, or nothing);
   a verification done in another concept (the id of that row; form settled by point 6). No
   reasoning, no pointer to « Non vérifié » (what cannot be quoted goes there). Review rule, not
   a check; the Purpose carries it. Why: the reviewer and the maintainer need the quotation and
   the place, nothing else; a fixed short form also makes the `course-batch` sources step
   predictable. Measured today: 229 chars median, 852 max, with reasoning and cross-pointers.
5. **Decided 2026-10-29: nature is mandatory, four values: `consensus`, `école`, `cours`,
   `fait`** (new pack key `markers.fact`, « fait »: what the source says, with no stance: a
   tool's default, a date, a figure), checked by `sources`. Review rule: a body claim's nature is
   the stance marker its reader text carries, when it carries one. Why: an explicit value is
   what the reader (status), the teacher (how to frame the origin) and the reviewer (a `cours`
   claim citing a source, an `école` without author, are suspect) need; an empty cell cannot be
   told from an omission. Making the column mandatory is a MAJOR after the tag: now. Measured:
   155 empty of 700, most of them storyline or device rows that T04/T05 remove, the rest plain
   facts. Rejected: dropping nature for body claims (a body claim marked « école » in the text
   must keep its standing in its sources).
6. **Decided 2026-10-29: references stay per concept, each concept self-contained, and the
   source cell no longer cites the `sources.md` of another concept** (the 46 cross-concept
   paths go: a concept cites its own references and quotes, point 4). Why: a course-level
   `references.md` wins only on repeated descriptions (the Scrum Guide 18 times) and loses for
   four readers (the site joins, the teacher reads two files, parallel `course-batch` agents
   write one shared file, the reviewer leaves the folder); a per-concept consulted-on date says
   when that use was verified; and "each concept is one source" (SPEC 1) stays true. Repeating
   a description identically is a review rule (the Purpose: copy it from a concept that cites
   it). The path form and its check are removed.
7. **Decided 2026-10-29: « Références » keeps its five columns, each with its purpose**: id;
   source (author, title, date: how the teacher names it); link (where to read: **one URL or
   empty**, checked by `sources`, X14 closed; a second place is a second reference `S5b` or a
   remark in the source column; no path to a repository file, since internal evidence is a
   `cours` claim with no reference, T04); type (how much to trust and how to name it: primary
   the text itself, secondary someone reporting it, marketing a vendor's or a training's page);
   consulted on (when this reference was read for this concept: what to re-verify and in which
   order). Measured: primary 156, secondary 31, marketing 7, both 5; link cells « (aucun) »,
   « (dépôt) » six times, URLs joined by « ; ».
8. **Decided 2026-10-29: each « Non vérifié » entry opens with its section**, in the same form
   as the Section column (a sub-concept id or a fixed section name), checked by `sources`;
   content as T04 (what no consulted source confirms, why, the instruction when useful). Why:
   `unverified-part-told` makes the teacher say what « Non vérifié » holds *for the claim asked
   about*; without an anchor the teacher guesses the match among 145 entries, a fresh test
   cannot say which entry was due, and the maintainer rewriting a section cannot see what
   stays unverified there.
9. **Decided 2026-10-29: the optional introduction is removed**; `sources.md` opens on
   « Affirmations ». Why: it serves no reader of the table (19 of 20 files have it, nobody reads
   it with a purpose); removing an optional section after the tag is a MAJOR.

### Status

All nine points decided on 2026-10-29. T07 is complete.

### Changes (after the triage)

One `stage-1` issue, with T04: rewrite SPEC 4.4 purpose-first (readers table), the `sources.md`
template, `checks/sources.js` and its fixtures (five columns, Section ids, nature mandatory with
`fait`, link form, no cross-concept path, « Non vérifié » anchors, no introduction); frontmatter
stance items gain `verified`; pack: `markers.fact` added; `course-batch` sources step follows
(#142 area).

---

## T08. The `messages` field of `course.yaml` is removed

**Findings:** X04 (Q1-F3, Q2-F13, Q4-11, Q5-M4).
**Status:** decided 2026-10-29.

### Context

`SPEC.md:106-109`: a leaf may carry `messages: N` (2 or more), "the number of teacher messages
the leaf takes". Used twice in `parcours-po` (`0a1: 4`, `0a2: 5`). No protocol rule reads it;
`one-sub-concept-per-message` says one leaf per message; `follow-concept-instructions` takes the
split into messages from « Consignes », where concept 0 already describes it in words; the
repository glossary says a leaf is one message with one question. The split has two owners.

### Decision

Remove `messages` (a MAJOR after the tag). « Consignes » is the only owner of the split. The
Purpose of a leaf says: a leaf fits one message; one that needs several is either split into
sub-concepts, or its « Consignes » say the split. Rejected: keep the field and add a rule that
reads it (two owners reconciled by one more rule).

### Why

The number serves no reader: the teacher follows « Consignes », the site and the maintainer
ignore it, and for the creator it hides the real signal (a leaf too big is split, or described).

---

## T09. Seven rule slugs and two pack keys renamed before the tag

**Findings:** X38 (Q5-B8 to B14), X22 (Q5-B1, Q5-B11).
**Status:** decided 2026-10-29.

### Context

A rule is named by its slug, cited everywhere, and "a removed rule's slug is never reused"
(`PROTOCOL.md:28-34`). Seven slugs and two pack keys use words the repository glossary bans or
reserves for something else. Q5 classed them "blocks the tag" (a burnt slug), the merge agent
"1.x" (a rule rename is a MINOR; no course file cites a slug). Both hold on their ground: after
the tag, nine burnt slugs and updated citations (a MINOR); now, a text replacement with nothing
burnt and no stage 2 test citing them yet. S2-09 (#38) will translate the rules' text, not their
slugs, which are already English.

### Decision

Rename the nine before the tag, in the same issue as the purpose-first rewrite of the protocol
(every rule is reread there). Proposed names, to settle at writing time:
`domain-presented-from-sheet` → `domain-presented-from-file`; `validated-concept-exercises` →
`validated-concept-dug-by-cases`; `diagram-fallback` → `diagram-not-displayable`;
`never-ask-banned-check` → `never-ask-if-understood`; `fresh-agent-reread` →
`reread-as-next-teacher`; `framework-exchanges-exempt` → `classroom-exchanges-exempt`;
`back-to-thread-after-aside` → `back-to-course-path-after-aside` (plus a glossary row for
« le fil », the course path); pack group `references` (concept references) → `concept_refs`;
`phrases.banned_check` → `phrases.banned_question`.

### Why

A spec that contradicts its own glossary in nine names is not finished; the rename costs
nothing now and a burnt slug each later.

---

## T10. Diagrams: the SVG is complete; consumers preserve one rendering property

**Findings:** X19 (Q4-1).
**Status:** decided 2026-10-29.

### Context

SPEC 7 says "the site shows it (inline or as an image)" while 7.1 makes every colour
`currentColor` (no hard colour, no `<style>`; shades by opacity and form; three optional
classes `primary`, `secondary`, `muted` that a stylesheet may tint) and 7.2 requires "readable in
one colour". The SVG is therefore complete on its own: black on white in any viewer, the
panel's text colour in the Claude Code desktop panel (tested 2026-10-26, design 04), the caption
and the site link in the terminal. In an `<img>`, a browser does not let `currentColor` follow
the page's text colour: it is black, so on the site's dark theme the drawing is unreadable. The
stage 3 plan left "inline or `<img>`: decide here" open, the one path by which a rendering
choice could force a MAJOR of the drawing contract (allow `<style>` or fixed colours).

### Decision

Section 7 states a **property every consumer preserves**, not a technique: "a consumer renders
the SVG so that `currentColor` follows the colour of the text around it; it may tint the three
classes, never must". The phrase "inline or as an image" is removed. The site derives the inline
rendering from it at stage 3; the spec names no technique. Section 7 is written purpose-first
(readers: learner on the site at both themes, in the desktop panel, in the terminal; the
creator with the contract and `svg-contract`; the reviewer with the style).

### Why

The SVG of the course is the single source and already serves every use; the spec's job is to
say what a renderer must keep true, so that no consumer can ask the contract to change for a
rendering choice. Wording only (PATCH), but written before the tag.

---

## T11. The course glossary: the « Concept » column, the term cell, the order rule

**Findings:** X18 (Q5-B2, Q5-B3), X17 (Q1-F7, Q2-F15, Q3-F7, Q4-4; #166, #203, #206, #207).
**Status:** decided 2026-10-29 (a and b as proposed; c reopened and settled with T12).

### Context

`glossary.md`: one table, term, English, definition, concepts ("those that use it; the first
introduces it"); the site shows it as is; `glossary-order` fails when a `concept.md` uses a term
introduced by a later concept. 26 failures today, knowingly, after the ruling of 2026-10-29
(#166: the course may cite a notion taught later when the sentence says so). "Introduces" is
defined nowhere; the course glossary's intro adds a scope (« un fichier de concept ») and an
exception (« sans le définir »); taught-check reads the column as "taught". The check strips
every parenthesis (« État (d'un élément) » matched as « État »: the #166 homonym) and matches
multi-term cells (« Epic, feature, story, tâche ») as one string. The 26 failures by kind: 3
homonym (État), 7 ordinary words that are also terms (Rôle, Acteur, Utilisateur, Valeur,
Produit), 11 forward mentions naming their concept (#207's count), about 5 real uses before the
definition (MoSCoW, Temps de cycle, Story map, Dépendance).

### Decision

- **(a) The first number of « Concept » is the concept whose reader text defines the term**;
  the others are the concepts that use it. Scope: the reader text, `concept.md` body and
  frontmatter (stances, captions); not `teaching.md`. The course glossary's intro, the check
  message and the taught-check prompt are aligned on this wording.
- **(b) The term cell: variants separated by commas** (« Product Owner, PO »; « User story,
  story »), each matched whole-word; **a parenthesis is a sense qualifier** (« État (d'un
  élément) », « Rôle (d'utilisateur) »), and a row that carries one is excluded from the order
  check: no script tells the senses of a homonym apart; review does.
- **(c) The order rule stays as a reader-text convention**: a glossary term is used after its
  definition; before it, only when the sentence carries a concept reference to the concept that
  defines it (the mechanical form of #207), or defines it in passing (review). The check reads
  every use (not the first per term) and the frontmatter, silences references and qualified
  rows, and is a **quality check** (T12): it reports, it does not block. The ruling of
  2026-10-29 was right on substance (the strict check demanded the impossible and made the
  course vaguer, #203); what was missing is that it never was a conformity failure.

### Why

Purpose of the rule: the linear readability of the reader text on the site, and a signal to the
creator; the learner in the classroom receives what the teacher says, not the reader text
(T05), and no consumer breaks on a forward mention. A rule that mostly flags homonyms and
ordinary words is wrong as a blocking failure. The cell form and the order rule are what the
check reads: a MAJOR after the tag.

---

## T12. Two families of checks: conformity (machine, blocking) and quality (on demand, triaged)

**Findings:** the maintainer's reflection of 2026-10-29 on #166/#203/#206 and the known-failing
`glossary-order`; X17, X20, X02; the Done when of #29 ("checks except `glossary-order`").
**Status:** decided 2026-10-29.

### Decision

| | Conformity | Quality |
|---|---|---|
| Question | is the course consumable: the site builds, the teacher teaches, ids resolve | is the course good: term order, captions, lengths |
| Who runs it | the machine: `/finish` before the PR, CI on the PR, the builds (site, classroom), which refuse a non-conforming course | the maintainer, when they want to know what to improve; a writing tool at writing time, so that writers fix at once |
| When | on every change, always | on demand, by campaign |
| Result | `ok` or `fail`; a `fail` blocks | a report of findings to triage (as #208 did for taught-check); nothing blocks |
| Then | fixed before the merge | course issues, planned |

Both are **checks** (glossary: a deterministic script that validates a course), qualified:
conformity check, quality check. taught-check belongs to the quality family (done by agents, same
cycle: run, triage, issues). No `warn` level: two runs, each `ok`/`fail`; a quality `fail` is a
finding. Two commands (`check-course <course>` and a quality mode; names at writing time).

Classification of today's checks by purpose (does a consumer break without it?):
conformity: `course-yaml`, `course-files`, `concept-folder`, `conventions` (the Markdown the
site maps), `svg-contract`, `sources` (columns, ids, cell forms: T04, T07), `language-pack-keys`,
`rule-slugs` (check-spec); quality: `glossary-order` (T11), `typography` (an em-dash breaks
nothing: house style), `domain-first-sentence` (a 300-char first sentence shows, ugly not
broken). The quality checks to come (one-sentence caption, font size, X20, X02) are born in that
family.

### Implications

- **T01 amended**: its rows hold for conformity checks (a stricter one is a MAJOR: the SE
  scenario). A quality check added or made stricter blocks nothing: **MINOR**. One more row, not
  an exception.
- **Done when of #29**: "zero conformity `fail`" replaces "checks except `glossary-order`". With
  T04, `sources` on `parcours-po` is either rewritten before the tag or a known conformity
  failure: the maintainer's call at the final triage.
- Written in the specs document (T03) for every spec; the list and the family of each check,
  with its Purpose, in `linear-course` section 10; the runner gets the two modes.
- **Tools, maintainer's ruling 2026-10-29**: `course-batch` is not maintained ("done in a
  hurry, to be rethought; its substance may be extracted, zero maintenance now"); `taught-check`
  is more finished, to be assessed. The "writing tool at writing time" row above binds no
  current tool.

---

## T13. The protocol before the tag: structure, called-for rules marked untested, purpose per group; French kept

**Findings:** X07, X28, X29, X30 to X37, X39 (protocol testability), the language exception
(`SPEC.md` lines 8-11), and the maintainer's framing of 2026-10-29.
**Status:** decided 2026-10-29.

### Framing (maintainer, 2026-10-29)

Every Ready issue was written in one shot at the start of the migration: they are drafts. The
aim now is a finished spec. After it, in broad lines: (1) run the course as it stands through
an agentic process that takes it as input and produces a course that passes the conformity
checks, zero quality work; (2) revisit the Ready issues as drafts and redefine the objective (an
English protocol is not a given priority).

### Purpose of the protocol

Readers: the teacher in the classroom (rules applied at every message, in the language it
teaches in); the creator (how the teacher will use `teaching.md`, to write what serves it);
fresh tests (a rule cited by slug with an observable behaviour); the spec maintainer (which
rules are proven, which are not). What the tag freezes at a cost: the structure (slugs, groups,
pack keys read, memory files named, the save-point table). The wording is the cheapest part of
the contract (a rule change is a MINOR, no course migration). A behaviour rule is finished only
when tested on a teacher, and there is no teacher before stage 2: a rule rewritten now is a
conjecture the first fresh test undoes.

### Decision

Before the tag, the protocol receives:
1. **A right structure**: T09's nine renames; removal of what no longer exists (« Réserve »);
   the pack keys T05 and T07 touch; X29 (the "Inherited" section cites a construction note
   removed at stage 4, and lacks the eight `save-*` rows).
2. **The rules the spec calls for**, else it is incoherent: deepening given on request only
   (T05); the explanation comes from the case's « Explication », else the leaf's reader text
   (T05); Usage; a diagram declared on a parent sub-concept is shown for its leaves (X07).
   Added **marked untested**. A status per rule: *proven* (inherited from `parcours-po`, tested
   on the old teacher) or *untested*.
3. **A Purpose per group of rules** (readers table form, T06); each rule keeps its « Pourquoi ».
4. **The rules untestable as written** (X28, X30 to X37) are listed in the note as the **input
   of stage 2**, each with the missing test, not rewritten now.

**Language.** The protocol text of v1 stays French. The language exception is reworded: "the v1
protocol text is French; a teacher of another language needs its translation, a MINOR". S2-09
(#38) is demoted to a backlog user story, judged when it serves. X39 goes with it.

### Implications

- The agentic conformity process of the next phase needs from the spec at the tag: complete,
  mechanical conformity checks (T12) and Purpose paragraphs readable as instructions (T06);
  not a polished protocol.
- S1-15's Done when ("each blocks-the-tag finding has its stage-1 issue blocking #29"): issues
  are created from the T decisions, grouped, not one per finding; #29 and the stage Done when
  are to be rewritten; #30 to #38 are drafts to revisit after the tag. Final triage item.

---

## T14. Classification of the remaining findings, and the issues to create

**Status:** decided 2026-10-29 (classification and the six issues confirmed by the maintainer).

### Settled by a decision

X04 (T08); X09, X10, X11, X13 (T05); X14 (T07); X17, X18 (T11); X19 (T10); X22, X38 (T09);
X26 (T12: no taught-check gate in the spec, a quality check run on demand); X07, X28, X29,
X30 to X37, X39 (T13).

### Before the tag, inside the purpose-first rewrite (a conformity change after the tag is a MAJOR)

X01 (the definition of "mandatory", rules naming a check that does not enforce them); X03
(an unlisted concept folder or domain file fails `course-yaml`); X05 (four checks aligned on
their SPEC sentence); X08 (where the diagram image sits: the sentence; its check is quality,
later); X12 (`teaching.md` never overrides a protocol rule; « Schéma » says what to draw, not
when); X15 (annex references: `concept_refs.annex` in the convention and `conventions`); X16
(what the domain page shows); X21 (`<defs>` at the SVG root accepted); X25 (section 10 lists
`check-spec` and `rule-slugs`, true output format); X40 (a decision cites a site decision that
does not exist); X41 (repository glossary rows: annex, deepening, case vs example, course path,
status, nature, learner templates...); X20 in part (decision `one-diagram-style`'s consequence
on #180, closed).

### Later: one `linear-course 1.x` backlog issue

Quality checks (MINOR by T12) and tooling: X02 (typography scans SVG text), X06 (identifiers
and slugs compared with the last tag, a CI step), X20 (one-sentence caption, font size,
gradients), X23 (`site` pack keys with S3-04), X24 (learner templates per language, a
`check-spec` rule), X27 (a broken fixture per failure message, #107 option 2), X42 (check ids
`course-files`, `svg-contract`), S2-09 and X39 (translation, when it serves).

### Dismissed

D01 to D12 as the merged note says, plus the "blocks the tag" of B01 as a visibility boundary
(T05 removed the filter; its form is settled by T07 point 3).

### Issues to create (stage-1, blocking #29), in order; each runs through /orchestrate

1. **Specs framework and layout** (T01, T02, T03, T12 rules): decision `repo`
   (spec versioning, folder per MAJOR, two check families), `two-versioned-objects` amended,
   `specs/README.md`, the tree moved to `specs/linear-course/1/`, the runner reads the declared
   MAJOR and has the two modes, references updated.
2. **`SPEC.md` purpose-first, sections 1 to 3 and 5 to 10** (T06, T08, T10, T11 a-b, T12
   list, the "before the tag" items above): section 1 as the creator's overview, Purpose per
   element, `messages` removed, section 7 property, glossary rules, check families, version
   table as a pointer.
3. **Section 4: the concept folder** (T05): purpose of a case, the case contract, « Réserve »
   removed, « Approfondissement », qualifiers, annex references, templates and `concept-folder`.
4. **Section 4.4: sources** (T04, T07): rewrite, five columns, `sources` check and fixtures,
   template, `where-a-claim-goes` and `reader-facing-and-teacher-only-files` amended, course
   CHANGELOG line.
5. **The protocol** (T09, T13): nine renames, « Réserve » gone, called-for rules marked
   untested, Purpose per group, Inherited fixed, language exception reworded, the untestable
   list in the note.
6. **`linear-course 1.x`**: the backlog issue above.
Then: #29 rewritten by the maintainer (Done when: zero conformity `fail`, `sources` on
`parcours-po` a known failure or fixed; the tag); #30 to #38 marked drafts.

---

# Cold review of 2026-10-29: amendments

A fresh opus agent reviewed T01 to T14 against the files (brief: `REVIEWER-BRIEF.md`). Six
blocking findings (B1 to B6), a dozen reservations. Each is settled below, one entry per
finding, in the order discussed with the maintainer.

## R-B2. The tag certifies the spec, not the course

**Finding (verified):** "zero conformity `fail`" at the tag cannot hold: after T08 `course-yaml`
refuses the two `messages` fields (`course-yaml.js:110`, unknown field); after T05
`concept-folder` refuses the two « Réserve » fields (`concept-folder.js:178`); after T07 and T04
`sources` fails every file (columns, nature, link, introduction, free-text sources, 165 rows
with a cross-concept path, not 46). T04 point 5 and T14's Done when were inconsistent.
**Decided 2026-10-29.**

- **The Done when of #29 (the tag)**: the spec fixtures are green, `check-spec` passes, every
  conformity check has its broken fixtures; the conformity failures of `parcours-po` are
  recorded (below); the course is not built until its conformity pass. The taught-check, a
  quality check (T12), leaves the Done when of the tag. The stage 1 Done when
  (`construction/plan/stage-1.md:8-11`) is out of date on this too: the maintainer restates it
  in a comment on #29.
- Rejected: each spec issue applying its mechanical changes to the course (compatibility work,
  excluded by the framing; part of it is not mechanical, so it would smuggle the course pass
  into the spec issues without the rule written first).
- **The list of conformity failures is the check runner**, not a hand-kept list: after the tag,
  `check-course courses/parcours-po` in conformity mode prints, file and line, what the pass must
  fix, and reprints it after each fix.
- **One issue « parcours-po conformity pass »** (`type:course`, `area:course:parcours-po`),
  created now, blocked by #29, blocking nothing: input, the course as it stands; output, a
  course for which the conformity run prints zero `fail`; zero quality work (quality checks are
  not run); the spec decisions that justify each change (T04 to T08, T11), so that the agentic
  process knows what to produce; the judgment cases the checks will not express (« aucune »
  becomes `cours` or a gap of `concept.md`; claims that pointed at the bank become a concept
  row or go). At the tag, the runner's output is posted as a comment on that issue, with the
  count per check: the starting picture. The course CHANGELOG gets one line: « 0.1.0 : non
  conforme à `linear-course` 1.0.0, voir #N ».
- T04 point 5 and T14 are amended accordingly; T14's issue list gains this seventh issue.

## R-B4. The protocol is a base; what changes in it before the tag, and nothing else

**Finding (verified):** T13.2 added untested behaviour rules against the two-tests rule
(`CLAUDE.md`, `decision-format.md:25-27`) and against T05's own implication; "proven" for
inherited rules had no test record (X28: `resume-opening-sentence`, `diagram-fallback` are
"new" with no test cited). **Decided 2026-10-29, reframed by the maintainer:** the v1 protocol
is a base; it will be iterated by user stories; how a rule is proven (the two-tests rule) is for
later, from the teacher on. The question is only what must change for the spec to be viable.
T13 is amended as follows (its points 1 and 4 stand; 2 and 3 are replaced by this list).

Measured: 114 rules in 9 families (two `###` groups), 27 lines naming the learner memory
files, no mention of « Réserve », six pack keys read.

**Changes before the tag, seven and no more:**
1. Seven slugs and the key `banned_check` renamed (T09).
2. `requested-diagram-shown`: « le sous-concept feuille ou l'un de ses parents » (X07): as
   written the rule sends the learner to « Schéma » instead of the SVG for 8 of 32 diagrams.
3. `origin-from-sources-file` and `unverified-part-told` point at what T04 and T07 create: a
   stance's or neighbour's `verified` in its item; a « Non vérifié » entry found by its section.
4. Four base rules added, short, each with its « Pourquoi »: deepening (« Approfondissement »)
   is given on request only; the message's explanation comes from the case's « Explication »,
   else from the leaf's reader text; a case's Usage is respected; « Faits du fil rouge
   utilisés » is not said to the learner.
5. The "Inherited" section: the sentence citing a construction note goes; the eight `save-*`
   rows are added.
6. A Purpose per family (9) and per group (2), T06 form.
7. The header: "the v1 protocol is a base inherited from `parcours-po`, in French; it changes by
   user story; fresh tests come with the teacher". It replaces "S2-09 closes the exception" and
   settles B4: the two-tests rule applies from the teacher on, not to the base. `CLAUDE.md`'s
   line stays.

**Not touched:** the nine rules untestable as written (X28, X30 to X37), listed in the note as
the input of the protocol user stories, each with its missing test; the French; any rewording;
a status per rule (dropped: the "Inherited" table already says where each rule comes from).

## R-B1, R-B3, R-B5, R-B6. Wording errors of the journal, corrected (no decision needed)

- **R-B1 (verified).** T04 point 1 still allowed "a path to another concept's `sources.md`";
  T07.6 removes it; T07.4's third case pointed at a row id that does not exist. **Corrected:**
  T04.1 reads "a reference id or the `markers.course` word; nothing else"; T07.4's third case is
  deleted (each concept quotes its own reference). The cross-concept paths are 165 rows, not 46.
- **R-B3 (verified).** "No filter inside a file, anywhere" (T05.2) against "« Non vérifié » is
  not built" (T04.3). **Corrected:** one section-level exclusion, « Non vérifié », by its pack
  heading, is not built; no row-level filter anywhere. Decision
  `reader-facing-and-teacher-only-files` is amended in those words.
- **R-B5 (verified).** `docs/decisions/language-policy.md:26-29` says "the protocol switches to
  English at stage 2, once the fresh tests are green", and `SPEC.md:8-11` says S2-09 closes the
  exception. **Corrected:** issue 5 amends `language-policy` (the exception stays open until a
  teacher or a course of another language needs the translation, a MINOR) and the SPEC
  paragraph (R-B4 point 7).
- **R-B6 (verified).** The `linear-course 1.x` backlog issue was listed as `stage-1` blocking
  #29. **Corrected:** it is `type:improvement`, no milestone, blocks nothing.

## R-R1. Dig and deepening are two things; the type of a case; « creusage » renamed « entraînement »

**Finding (verified):** T05 coupled dig cases and « Approfondissement »: a dig case drawing on
the deepening would be flagged by taught-check. Reread of PROTOCOL family 7: digging a
validated concept is **more practice** on what was taught (more cases, one per message, without
re-explaining; after two successful cases the concept is dug), not more matter.
**Decided 2026-10-29.**

- **Two things, kept apart.** Practice (« entraînement », formerly « creusage »): more cases on
  the taught matter, in `teaching.md`, qualified cases, through the loop without re-explaining.
  Deepening (« Approfondissement »): more matter, sourced, in `concept.md`, read by the teacher
  in an **aside** (`asides-welcome`) when the learner asks beyond the text; conversation, never a
  question. **No case, of any type, relies on « Approfondissement »**: a case tests what the main
  text teaches. taught-check is unchanged. The concept 9 reserve matter (Lawrence's other
  patterns) goes to « Approfondissement », not to a case. T05.3 and R-B4 rule 4 ("deepening on
  request") are reworded: the teacher reads « Approfondissement » in an aside, on the learner's
  request; the rule sits in family 7 beside `asides-welcome`.
- **The type of a case is its heading qualifier**, four values: none (main thread), `rechange`,
  `entraînement`, `aparté`; nothing else in the parenthesis but the sub-concept id and at most
  one of these words. A **conformity** check (the teacher acts on it). The Purpose gives a table
  per type: when the teacher poses it, what taught-check counts. No "access to
  « Approfondissement »" clause. This closes X11 (the course writes « en rechange » 16 times).
- **Naming.** « creusage » is replaced by **« entraînement »** (the learner's own word: « je
  veux m'entraîner »), English **practice**; glossary rows: *practice* (« entraînement », Not
  "dig", "exercise" which stays banned for case) and *deepening* (« approfondissement »). Pack
  key `qualifiers.dig` → `qualifiers.practice`; the six slugs carrying dig/dug/digging renamed
  with T09 (`practice-cases-chosen`, `practice-case-closed`,
  `concept-practised-after-two-cases`, `practice-noted-in-next-step`, `practice-note-removed`,
  `domain-practised-in-order`; `validated-concept-exercises` → `validated-concept-practised`);
  family 7 titled « S'entraîner, sauter, apartés ». Rejected: « consolidation » (the teacher's
  word, not the learner's).

## R-R2. T07 point 2 completed: `verified` on every item with `refs`, its form, the anchors

**Finding (verified):** `neighbors` items carry `refs` in 14 concepts and lost any verification;
the form of `verified` was unsaid; every re-verification edits `concept.md`; decision
`stances-in-frontmatter-only` still names `headings.stances` as the section a `sources.md` claim
names; « Non vérifié » had no anchor for a stance. **Decided 2026-10-29.**

- **`verified` on every frontmatter item that has `refs`**: stances (consensus, school, course)
  and neighbours. A list parallel to `refs`, one entry per reference in the same order, each
  "the quotation and its place" (T07 point 4). An item with `refs: []` has no `verified`.
  `concept-folder` checks that `verified`, when present, has as many entries as `refs`.
- **The history of `concept.md` is assumed**: a stance and its proof are reader material
  (its `refs` are already there); what decision `reader-facing-and-teacher-only-files` kept out
  of the reader file is teacher material (the bank). A re-verification is a change for the
  reader.
- **Anchor**: « Consensus et choix d'école » (`headings.stances`) joins the admitted anchors of
  « Non vérifié » entries (T07 point 8) for an unverified stance or neighbour.
- **Decision `stances-in-frontmatter-only` is amended** in issue 4: no `sources.md` claim names
  the stances any more; a stance or neighbour is sourced in its item.
- Whether the site renders `verified` is a stage 3 presentation choice; the Purpose says it is
  audit material, like « Affirmations ».

## R-R3. `domain-first-sentence` is split into a conformity check and a quality check

**Finding (verified):** the check does two things (`domain-first-sentence.js`): a terminator
within 300 characters of the lead, which the site parses to show the first sentence on the
domain page (a consumer breaks without it: conformity), and no opening anaphora from the pack's
`checks.anaphora` list (readability: quality). **Decided 2026-10-29:** split. `domain-first-
sentence` (conformity: the terminator) and `domain-first-sentence-standalone` (quality: no
anaphora), each with its Purpose. T12's classification is amended. The `checks.anaphora` list
stays in the pack as language data; whether it is a required section 9 key is settled at
writing time (a pack without it should still pass conformity).

## Non-blocking findings of the cold review, settled

Taken as corrections to the journal and to the issues' briefs, no new decision:
- **T01**: a bug fix on an old MAJOR never tightens a check (a false positive lifted, a protocol
  mistake); a check too lax is fixed in the current MAJOR, as a MAJOR. Packs live only in
  `specs/<name>/<MAJOR>/lang/`, so rule 3 is structural. Archiving counts **served** course
  versions (site, classroom), not git tags, else nothing is ever archived. T01's projected
  "MAJOR 2" list is dropped (stale after T14). T12: moving a check from quality to conformity is
  a MAJOR, the reverse a MINOR; no conformity path (`/finish`, CI, builds) runs the quality
  mode.
- **T02**: a dispatcher outside `<MAJOR>/` (the runner that reads `spec:` cannot live inside the
  MAJOR; the "unknown MAJOR" refusal moves there); the tools that build the path
  `specs/<name>/` without citing it (`/finish` SKILL.md:25, `course-batch` SKILL.md:43 and
  workflow:127, `migrate-concept` workflow:463,512,519) are in issue 1's list; the per-MAJOR copy
  duplicates `lib/`, packs and templates, so a bug fix is ported to every live MAJOR (stated);
  where `CHANGELOG.md` lives (per MAJOR) is settled in issue 1.
- **T03**: "amend rather than supersede" is written into `decision-format.md` and `/decide`
  (issue 1); an amended decision records its amendment date in the body. The `/decide`
  superseded-noise item goes to the 1.x issue.
- **T06**: Purpose on `##`/`###` sections and protocol groups, not on table rows (fields get
  their purpose in the table); `check-spec`'s Purpose rule lands last (issue 5 or a final
  step), so that issues 2 to 4 do not fail it while written; "a writing tool" replaces
  `course-batch` in point 3.
- **T05**: the taught-check prompt changes (« Approfondissement » never required by a case;
  T11 (a) wording) are listed in issue 3; the one course-wide counterexample (« proxy PO »
  cited from the bank in concept 1) confirms the routing rule (a gap enters `concept.md`).
- **T07**: about 136 rows name both a stance and a body section: the conformity pass splits
  them (issue 7's judgment cases); `markers.fact` is placed in a sources-only group, not among
  the reader-text stance markers `conventions` checks (group name at writing time).
- **T11**: the four "real uses" I listed carry a concept reference and pass under (c); the real
  ones are Ordonner (`00:57`, `01:71`), « Critère d'acceptation » in concept 7's « Objectif »
  (`07:38`, which is `course.yaml`'s objective verbatim: the scope wording says so), « User
  Story » as an Azure DevOps label (`04:74`). (b): a variant shared by two rows (« story » in
  « User story, story » and in « Epic, feature, story, tâche ») needs a rule: a variant belongs to
  one row; multi-term rows are several terms, not variants, and are split (one term per row,
  one definition each). (c) depends on X15 (annex references), so issue 2's glossary-order
  rewrite lands after issue 3, or the annex word is added in issue 2.
- **T12**: `/finish` SKILL.md:29 "a failing check is fixed before the PR" becomes "a failing
  conformity check"; SPEC 10's "taught-check mandatory before the merge" (SPEC:450-452) is
  removed (X26); glossary rows for conformity check, quality check (and taught-check as a quality
  check done by agents) enter with issue 1, under `reserved-vocabulary`.
- **T14**: every issue after issue 1 is blocked by it; issues 2, 3, 4 touch `SPEC.md` and run
  in sequence; section 1 (the creator's overview) is written last, in issue 5 or a final step;
  the `references` → `concept_refs` rename is done once (issue 3), issue 5 only cites it; glossary
  rows enter in the PR that first uses the term. X06 (a CI step failing a course on identifier
  changes) is a new blocking check: MAJOR by T01, so it is classed "before the tag or never in
  1.x"; decided: 1.x as a non-blocking report, not a check. X24's template move is a MINOR
  (templates are spec-owned files, not course structure); T01 gets no row for check ids
  (tooling).
- **T04**: the category counts overlap (71 for 69 rows): harmless, noted.
