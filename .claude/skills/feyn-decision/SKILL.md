---
name: feyn-decision
description: "Tooling of the work cycle, called by the contributor of the agent workflow deliver-story.js, by `/feyn-glossary-entry` for a choice that is more than words, and directly for a one-off act: write a decision on feyn (one file by slug, counterfactual first) in the decisions/ folder of the area it binds, or change a live decision in place, or refuse a new one when no counterfactual is named, the bar of a decision is not met or the choice changes only words (sent to /feyn-glossary-entry). Use for \"/feyn-decision <the decision, in a sentence>\"."
argument-hint: "<the decision, in a sentence>"
---

# /feyn-decision

One job: write or change a decision: turn a choice into a decision file, or say why it does not
deserve one, or keep a live decision current. The format is `docs/decisions/decision-format.md`;
this skill applies it.

## 1. The counterfactual, or nothing

Ask for it if it was not given: `Without this, <who acts> would…`, naming who would act (an
agent, the common case, or a contributor, the teacher, a workflow, the maintainer…), followed
by a concrete wrong act they would do (a file written, a command run, a choice made) and what
that act breaks.

**Refuse**, and write nothing, when the answer is missing, or names no act ("without this,
things would be unclear", "it is better", a restatement of the decision). Say in one line what
is missing, and propose a counterfactual of your own for the maintainer to accept or correct;
a decision is written only on a counterfactual the maintainer gave or accepted.

## 2. The bar of a decision

A decision is written when it spans several files or is costly to undo. Otherwise refuse and
propose instead a comment where the choice applies, or nothing.

A choice that changes only words (a term chosen, renamed or rejected, a French word given to a
concept) is not a decision: refuse it and send it to `/feyn-glossary-entry`, its why going in the
entry's `why` (decision `word-choices-in-the-glossary`). A choice that changes files, a structure
or steps stays here, and names its concepts by their terms without defining them.

A decision on how the teacher teaches (`classroom-builder/`, the protocol of a spec) also needs
two fresh tests that show it necessary or sufficient. Ask for them (which fresh test, what it
showed); without them, refuse and propose the test scenario instead.

## 3. The folder

The most local area the decision binds:

| Binds | Folder |
|---|---|
| one spec | `course-specs/<name>/<MAJOR>/decisions/` of each MAJOR it binds: the current one for a new rule, every live MAJOR for a bug fix |
| the spec directives (the rule model, the conformance clause, the versions, the tooling of the checks) | `spec-directives/<MAJOR>/decisions/` |
| one course | `courses/<id>/decisions/` |
| the teacher's Claude Code realisation (a rule of the protocol binds one spec) | `classroom-builder/decisions/` |
| the site | `site-builder/decisions/` |
| the agentic layer (`.claude/`, `.github/`) | `.claude/decisions/` |
| two areas or more, the repository | `docs/decisions/` |

## 4. The slug, and its neighbours

Slug: two to five words, lowercase, hyphens, naming the choice, not the problem
(`classroom-as-build`, not `classroom-problem`). Never a number, never "adr".

Before writing, list every decision of every `decisions/` folder of the repository and grep
them for the decision's key words:
`find . -path '*/decisions/*.md' -not -path '*/node_modules/*' -not -path './.claude/worktrees/*' -not -path '*/fixtures/*'`,
then `grep -ril --include='*.md' --exclude-dir=worktrees --exclude-dir=node_modules --exclude-dir=fixtures "<key word>" . | grep /decisions/`
(quoted globs: zsh stops on a pattern that matches nothing; `.claude/worktrees/` holds the
copies of other branches; `fixtures/` holds the test decisions of the spec directives). A match whose frontmatter has `status: superseded` is history, not
a neighbour (`grep -l '^status: superseded' <matches>` lists them): skip it, and say so in one
line, naming it with its `superseded-by`, the live decision to read instead. A neighbour on the
same point, in any of the `decisions/` folders: show it, and ask whether the new one supersedes
it, changes it (step 6 instead), or is distinct (say why in one line). Same slug already
taken in any folder, by a live or a superseded decision (a superseded slug stays taken): the
same decision exists; stop. One exception: the same slug in two MAJORs
of one spec (`course-specs/<name>/1/decisions/<slug>.md`,
`course-specs/<name>/2/decisions/<slug>.md`) is one decision, copied with the tree or ported as
a bug fix (decision `versioned-objects-and-spec-layout`), not a collision; a decision written
for several MAJORs is one file in each, under one slug.

## 5. Write it

At `<folder>/<slug>.md`, from [decision-body.md](../../reference/decision-body.md): its
frontmatter and its sections are the form of decision `decision-format`, which this skill does
not restate; the counterfactual is the one accepted at step 1. Name the choice rather than its
files, skills or steps where the choice allows (a skill renamed or a file moved then leaves the
decision true). Under 40 lines.

Before writing, three checks on the whole text, an "Amended" line excepted; a line that fails is
rewritten before the file is:
- no rule id, of a rule or of a group of rules, the rule named by what it asks (decision
  `decision-format`); in a decision of a spec or of the spec directives, no course named, its
  evidence stated for any course (decision `spec-names-no-course`);
- its words: each term that names a concept of feyn is checked with `/feyn-glossary-entry`
  read mode, a rejected word replaced by the entry's term; "decision" for one decision, never
  "ADR" (nor in a path), which names the practice;
- it names its concepts by their terms and defines none: a definition, or a term the glossary
  lacks, goes to `/feyn-glossary-entry` (decision `word-choices-in-the-glossary`).

A decision it supersedes: in the same commit, change that file's `status` to `superseded` and
add `superseded-by: <slug>` on the line after it (decision `decision-format`).

Commit it on the current issue branch (`git add <file>`,
`git commit -m "decide <slug>"`); on `main`, stop and propose `/feyn-issue` first:
a decision lands through a PR like the rest. Reply with the path and the counterfactual.

## 6. Change a live decision

A live decision states what holds today; git keeps the before (decision `decision-format`):
- a mechanism of it that changes (a skill or a path renamed, a file moved, a step that now runs
  elsewhere, a tool removed): correct its body in place, with no "Amended" line;
- the scope of the choice that changes while it still holds (an exception added, a case it now
  covers or no longer covers): write it in the body too, and add one line
  `- Amended <date> (#<n>): …` under `## Consequences` (the heading added when missing), saying
  what changed and why;
- the choice no longer holds: supersede it (step 5), never amend it.

A superseded decision and a released CHANGELOG entry are history: leave them as they are. An
"Amended" line keeps its account of the change of scope; correct in place a mechanism it names
that changes, as in the body. The text written passes the three checks of step 5. Commit on the
current issue branch, as in step 5.
