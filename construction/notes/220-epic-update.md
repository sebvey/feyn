# Epic #220: update before implementation (2026-10-30)

Drafts to apply on GitHub once the maintainer agrees. Material: the two audits beside this
file, `220-audit-215.md` and `220-audit-216-to-29.md`. A fresh agent reviewed the drafts on
2026-10-30; its findings are applied below.

Rulings of the maintainer (2026-10-30):

- Split the slices as the audits propose (eleven slices).
- Rewrite only the epic, the plan comment and the next slice now; every other slice is rewritten
  when it becomes the next one, with the audits as material.
- The tag is a statement of the epic's Done when, created by the maintainer after the spec's
  release slice merges.
- Decision amendments follow `decision-format` as it stands (#252): one "Amended" line for a
  changed mechanism, the body untouched; a decision that no longer holds is superseded.
- The dispatcher is `specs/check-course`, one runner for every spec.
- `decisions/` lives in each MAJOR folder.
- `construction/` is excluded from the move until #232.
- `course-batch` and `migrate-concept` get their paths fixed in the move.

Consequences drawn here, for the maintainer to confirm:

- `two-versioned-objects` no longer holds as written ("one or two" MAJORs, "the only
  changelog"), so the new decision supersedes it and carries all its other rules.
- `decision-format` changes in its body again (the spec decisions folder, `/feyn-decision`): the
  exception #252 named (it is the rule itself, an agent reads the rule in its body) applies, and
  its Amended line names it.

## 1. Epic #220, new body

Changes: Why now narrowed; Material names the audits; the Done when drops "sub-issues closed in
order" and gains the families, the Purpose rule and the tag; Out of scope names the epics.
GitHub: milestone `linear-course/v1.0.0`; Status back to Ready (no slice started).

````markdown
### Objective

A finished `linear-course` spec, written purpose-first (every element says for whom and why, then what it holds, then its rules and check), tagged `linear-course/v1.0.0`. The tag certifies the spec: fixtures green, `check-spec` passing, the two check families in place.

### Why now

Everything else reads the spec: the course's conformity pass, the teacher, the site. A structural change after the tag costs a MAJOR.

### Material

- The S1-15 triage, `construction/notes/S1-15-triage.md` (T01 to T14 and the R-* amendments); `construction/notes/S1-15-review.md`.
- The audit of the slices against the repository of 2026-10-30: `construction/notes/220-audit-215.md`, `construction/notes/220-audit-216-to-29.md`; the maintainer's rulings: `construction/notes/220-epic-update.md`.
- The design files `construction/design/03`, `04`, `09`, as evidence only.

### Done when

- `specs/linear-course/1/` holds the spec; `specs/check-course courses/parcours-po` runs its conformity checks and runs the quality checks only in its quality mode; every conformity check has a broken fixture; `specs/linear-course/1/checks/test-fixtures` and `check-spec` pass.
- Every `##`/`###` of `SPEC.md` and every family and group of `PROTOCOL.md` opens with `**Purpose.**`, and `check-spec` fails one that does not (fixture).
- The tag `linear-course/v1.0.0` exists on the merge commit of the spec's release slice, `specs/linear-course/1/CHANGELOG.md` opens with v1.0.0, and the conformity run on `parcours-po` is posted on #213.

### Out of scope

The course's conformity (#221), the quality of the course (#224), the protocol beyond its base (#222).
````

## 2. Plan comment, new (added as the last comment of #220)

````markdown
**Plan comment** (2026-10-30, rewrites the one of 2026-10-29)

Order, eleven slices: (1) #215, the rules written (decision, folder per MAJOR, families) → (2) the move to `specs/linear-course/1/` and `specs/check-course` → (3) the two families → (4-6) #216 in three: SPEC 2, 3, 5 to 10 purpose-first; three checks aligned; the course glossary rules and `glossary-order` (after (8)) → (7-8) #214 in two: the case (4.3); `concept.md` (4.1, 4.2, 4.5) → (9) #217, the sources → (10) #218, the protocol base → (11) #29, the spec's release; then the maintainer tags. Real order: 1, 2, 3, 4, 5, 7, 8, 6, 9, 10, 11.
- (2): rulings of `construction/notes/220-epic-update.md` (`construction/` excluded, `course-batch` and `migrate-concept` paths fixed); `test-fixtures:21` breaks with the move (audit F18). Posed next, right after #215: until then the decision describes `specs/<name>/<MAJOR>/` while the tree is still flat.
- (3): quality mode, `domain-first-sentence` split, SPEC 8 pointer and section 10 list with families (#216 keeps only section 10's Purpose and the taught-check gate removal), `feyn-pull-request/SKILL.md:31`, `feyn-taught-check/SKILL.md:11-12`, SPEC:414 changelog path.
- (9) takes `verified` beside `refs` from #214; (11) takes #218's last items (SPEC section 1 overview, `check-spec` Purpose rule), the course CHANGELOG line and its pointer at `courses/parcours-po/CHANGELOG.md:5`, "draft" removed from SPEC and PROTOCOL, the conformity run posted on #213.
Each slice is rewritten or created when it becomes the next one, from the audits (`construction/notes/220-audit-*.md`); #216, #214, #217, #218, #29 wait in the Backlog until then. Each slice posed blocks the next one and #29, and carries the milestone `linear-course/v1.0.0`. No spec slice changes a file under `courses/` (R-B2), except (11).

Unknown: whether `qualifiers` is a SPEC section 9 key (7); whether the four base rules need a `decision-format` line on the two-tests exemption (10); how `rule-slugs` renames the slug cited in the body of `svg-only-diagrams.md:32` with the body untouched (10); whether `## Keys and parameters` and `## Inherited` of PROTOCOL carry a Purpose (10). The taught-check prompt changes of #216, #214, #218 go to one `area:agentic` observation once (7) merges.
Dropped: #216's `stage-3.md` item; #218 To do 8 (done in #219); the `/orchestrate` reviewer brief; CI wording (#137 carries CI).
````

## 3. #215, rewritten as the first part

Title: `Write the spec rules: versions, folder per MAJOR, check families`
Labels: `type:improvement`, `area:repo` (was `area:spec:linear-course`).

````markdown
**Where:** repo (decisions, glossary, skill)

**What:** One decision states what a spec is, how its MAJORs are laid out and live, and the two check families, and the files that summarise or apply it agree with it.

**Why:** The move to `specs/linear-course/1/` and every later slice of #220 follow these rules, and today no file carries them.

### Done when

- `docs/decisions/<slug>.md` exists, `status: accepted`, opens with its counterfactual and states: what a spec contains; `specs/<name>/<MAJOR>/` and what it holds; the dispatcher `specs/check-course`, its conformity mode (default) and quality mode; the version table; an old MAJOR receives bug fixes only, ported to every live MAJOR; a MAJOR lives while a served course version declares it; the two check families, who runs each, and that no conformity path runs the quality mode.
- `docs/decisions/two-versioned-objects.md` reads `status: superseded-by: <slug>`, and the new decision carries every rule of it, its Consequences included, except "one or two" (line 20) and "the only changelog" (lines 23-24).
- `docs/decisions/decision-format.md` names `specs/<name>/<MAJOR>/decisions/` and `/feyn-decision`, and its new "Amended 2026-…" line names the body change as the exception #252 named; ``grep -n 'The `/decide` skill' docs/decisions/decision-format.md`` prints nothing.
- `.claude/skills/feyn-decision/SKILL.md` picks the MAJOR's `decisions/` folder and accepts one slug in two MAJORs of the same spec.
- `specs/README.md` opens with "Summary of decision `<slug>`; if they differ, the decision wins." and the `CLAUDE.md` map row `specs/` names `specs/README.md`.
- `docs/glossary.md` has the rows **conformity check** and **quality check**; `grep -n "run locally and in CI" docs/glossary.md` prints nothing; the row **taught-check** calls it a quality check.
- No file under `specs/linear-course/` or `courses/` changes.

### Observation

- No file says what a spec is, how a MAJOR is laid out, what changes in one, or how long it lives: `specs/README.md` holds three lines on the folder.
- `docs/decisions/two-versioned-objects.md:20` says tooling reads "one or two" MAJORs, and lines 23-24 that the course `CHANGELOG.md` is "the only changelog"; the triage settled that every live MAJOR is read and left where the spec's `CHANGELOG.md` lives to this issue (#29's comment places it at `specs/linear-course/1/CHANGELOG.md`).
- `SPEC.md` section 8 cannot classify a change to a check, a pack key or a field's status (finding B03).
- No file names the two check families; `docs/glossary.md:87` defines a check as "a deterministic script … run locally and in CI", which taught-check, an agent workflow, is not.
- `docs/decisions/decision-format.md:24` places spec decisions in `specs/<name>/decisions/` and line 32 names `/decide`, renamed `/feyn-decision` in #247; `feyn-decision/SKILL.md` stops on a slug taken in any folder, which a second MAJOR's copy of `decisions/` would hit.
- The triage of 2026-10-29 (#28) settled these rules: T01, T02, T03, T12, R-B2, R-R3.

### To do

1. Write the decision with `/feyn-decision`, area `repo` (slug at writing time, broad enough for the course rules it carries, for instance `versioned-objects-and-spec-layout`; counterfactual: an agent drops `@1` support when `@2` appears, or opens a MAJOR for a bug fix). It holds:
   - what a spec contains; `specs/<name>/<MAJOR>/` holds `SPEC.md`, `PROTOCOL.md`, `README.md`, `checks/`, `decisions/`, `lang/`, `templates/`, `CHANGELOG.md`; `specs/check-course` reads `spec: <name>@N` and runs `specs/<name>/N/checks`, refusing an unknown spec or MAJOR;
   - the version table: MAJOR for the structure, a stricter or new conformity check, an optional field made mandatory, a quality check moved to conformity; MINOR for an optional element, a protocol rule, a protocol rule renamed (the old slug is burnt), a looser conformity check, a conformity check moved to quality, a new or stricter quality check, a pack key added or renamed with every pack updated; PATCH for wording, a false positive lifted;
   - an old MAJOR receives bug fixes only, never a tightening, and a bug fix is ported to every live MAJOR; a MAJOR lives while a served course version declares it, then is archived;
   - two check families: conformity (run by the machine, blocking: `/feyn-pull-request`, CI, the builds) and quality (run on demand, its findings triaged; taught-check is a quality check run by agents); no conformity path runs the quality mode;
   - every other rule of `two-versioned-objects`, its Consequences included.
2. Supersede `two-versioned-objects` by it (`status: superseded-by: <slug>`): its "one or two" and "only changelog" no longer hold.
3. `decision-format.md`: the spec folder becomes `specs/<name>/<MAJOR>/decisions/`, "The `/decide` skill" becomes "The `/feyn-decision` skill"; one "Amended" line that names the body change as the exception of #252 (it is the rule itself). Same folder rule and slug rule in `feyn-decision/SKILL.md`.
4. `specs/README.md`: the summary of the rules, present tense, opening with "Summary of decision `<slug>`; if they differ, the decision wins."; `CLAUDE.md` map row `specs/` points to it.
5. `docs/glossary.md`: rows **conformity check** and **quality check**; rows **check** (no "in CI", not only deterministic) and **taught-check** (a quality check run by agents) rewritten to agree.

### Reads

- `construction/notes/S1-15-triage.md`: T01, T02, T03, T12, R-B2, R-R3.
- `construction/notes/220-audit-215.md`: findings F9, F27, F29, F34, F37 and the proposed part A.
- `docs/decisions/two-versioned-objects.md`, `docs/decisions/decision-format.md`, `.claude/skills/feyn-decision/SKILL.md`, `specs/README.md`, `specs/linear-course/SPEC.md` section 8.
````

## 4. On GitHub, in order

1. Commit the audits and this note (`construction/notes/220-*.md`) through a direct delivery: `/feyn-issue observation direct …`, then `/feyn-issue-branch`, then `/feyn-pull-request` (`Closes #n`); the maintainer merges. Steps 2 to 6 wait for the merge, so that the epic's Material and #215's Reads resolve.
2. #220: body replaced, milestone `linear-course/v1.0.0`, Status Ready.
3. #220: the new plan comment added.
4. #215: title, body and area label replaced; Status stays Ready.
5. #216, #214, #217, #218, #29: Status Backlog, one comment each: "To rewrite when it becomes the next slice; see the plan comment of #220 of 2026-10-30 and `construction/notes/220-audit-*.md`."
6. The blocked-by chain stays as is (#215 → #216 → #214 → #217 → #218, all five blocking #29); when the move slice is posed, it blocks #216 and #29, and so on for each new slice. Until then, `/feyn-merge-cleanup` after #215 names #216 as free: it is in the Backlog, and the plan comment names the move as the next slice.
