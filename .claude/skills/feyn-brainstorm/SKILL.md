---
name: feyn-brainstorm
description: "Run a brainstorm with the maintainer on feyn (a spec, a product, the process), subject by subject, and end it in a plan of work items posed through the skills of the cycle: a working folder `tmp/<slug>/`, an inventory of the real object, the subjects decided one by one, a review on a support, a pass on what was missed, the output and its posing (options created, the option it opened from reworked or replaced, neighbours commented) and an optional review by a fresh agent. It opens from an option whose refinement found its basis changed, an idea (it is then that idea's triage) or the maintainer's subject. Use for \"on brainstorme sur la structure du cours\", \"brainstorm option 475\", \"brainstorm idea 12\", \"let's brainstorm the skills\", \"on passe à l'output\", \"/feyn-brainstorm\"."
argument-hint: "[subject | idea number | option number]"
---

# /feyn-brainstorm

One job: run a brainstorm with the maintainer, subject by subject, and end it in a **plan of
work items posed through the skills of the cycle** (decision `brainstorm-ends-in-options`):
options created (`/feyn-issue`), the option it opened from reworked or replaced, a neighbour
commented. What survives is in those issues: the
working folder is not versioned, and what the issues do not carry is lost. The maintainer
decides every subject; the work session frames, measures, proposes, objects and writes.

What it calls, and nothing else: `/feyn-issue` (a story, an epic, an idea), the rework of an
option as `/feyn-refine-option` step 4 does it, a comment on an issue
(`mise exec -- gh issue comment <n> --body-file <file>`), the close of the idea it opened from,
and the reviewer `feyn-brainstorm-reviewer` (step 4). It writes nothing in the repository: no
branch, no commit, no edit of a tracked file, no decision (the work items write their decisions
when delivered). It writes in `tmp/`, which git ignores.

A brainstorm of small scope runs the same five steps, with two or three subjects.

## 0. The opening

Read [vision.md](../../../docs/vision.md) first: the purpose, the yardstick and the lessons are
what each subject is weighed against.

The argument is one of three things:
- **an option** (an epic or a story in Status Option) whose option refinement found that what
  it builds on has changed (a product delivered, a file removed, a decision replaced:
  `/feyn-refine-option` step 3): read it (`/feyn-issue <n>`) and the refinement's findings;
  it is the starting point, and the output says what becomes of it;
- **an idea** (Status Idea): read it (`/feyn-issue <n>`); its finding is the question, and the
  brainstorm is its triage (step 4 closes it);
- **the maintainer's subject**, in a few words.

A brainstorm on the process (a skill, a workflow, a policy, the glossary, `contributing.md`)
opens from an idea that names the problem observed and where it was seen (decision
`process-change-from-an-observed-problem`). Given a subject on the process with no such idea,
ask which problem was observed, and where. Named: create the idea (`/feyn-issue idea
<finding>`) and open from it. None: no brainstorm; the wish waits for an observed problem.

Then create the working folder `tmp/<slug>/` at the repository root (slug: two or three words of
the subject) with its `README.md`, and send its frame as the first message: the goal, the
constraints, the process (the five steps), the first list of subjects. The maintainer
corrects it before the inventory starts. The folder is written in the language of the
conversation.

The skeleton of `README.md`:

```markdown
# <the subject, as a title>

<one paragraph: what it opened from (option #n, idea #n, or the maintainer's subject), the
date, "not versioned".>

## The goal

<what the brainstorm must produce, and the criteria a solution is judged by.>

## The constraints

<what holds whatever is decided: a product, a policy, a decision not reopened.>

## The process

<the five steps, the subjects in the table's order, the output last.>

## The subjects

| # | Subject | File | State |
|---|---|---|---|
| 1 | <inventory of <the real object>> | `01-<slug>.md` | <open, in progress, decided> |

## For the very end

<what is kept for the output or for the maintainer, one line each.>

## Decisions (summary)

- <date>: <the decision in one line> (subject <n>).
```

## 1. The inventory

The first subject is the real object, read and measured, never the spec or the process read in
the abstract: on 2026-11-04, the abstract reading of the spec alone recommended a rework, where
concept 0 of `po-essai` measured (its 12 « Explication » repeating `concept.md` word for word at
37 to 91 %, 11 units for 4 leaves) showed the course had to be rethought. Pick the smallest
real instance that carries the question (a concept, a skill, a run's transcript), list what it
holds, for whom, with counts, and write it as a support the maintainer reads line by line
(`01-<slug>.md`). What the inventory finds reorders or adds subjects.

## 2. The subjects

The subjects are treated in the order of the README's table, each in its file `<nn>-<slug>.md`,
and put to the maintainer in the form `CLAUDE.md`, "Working with the maintainer", gives a
decision. What the brainstorm adds to that form: the subject's frame answers four questions,
what the thing is; what it holds today (measured where it can be); who reads it (a program, an
agent, the teacher, the site, the maintainer: checked in the code, not assumed); what the
earlier subjects already changed there.

The maintainer decides. The decision is written in the subject's file before the next subject
opens (decided, why, rejected), its state set to decided in the README's table, and one line
added to the README's summary. A subject left open stays open in the table, with what it waits
on.

A gap found during a subject enters the README's table as the maintainer's rules say a gap
enters a plan (`CLAUDE.md`, "Working with the maintainer": their "Plans and working
files"). The output is always the last subject.

The skeleton of a subject file:

```markdown
# <n>. <the subject>

State: <open | in progress | decided (<date>)>

## The frame

<what the thing is; what it holds today; who reads it; what the earlier subjects changed.>

## The options

| Option | What it says | Consequence |
|---|---|---|
| A. <name> | <what it says> | <what follows> |

## Recommendation

<one option, and why.>

## Decisions

- <decided>. Why: <the reason>. Rejected: <the alternative weighed>, because <why>.

## Learnings

<what this subject taught about the object, one line each; none: the section is dropped.>
```

A decision of the project that a subject touches is weighed as the maintainer's rules say
(`CLAUDE.md`, "Working with the maintainer": their "Plans and working files"; on 2026-11-04,
`reader-facing-and-teacher-only-files`, `spec-files-by-product` and
`versioned-objects-and-spec-layout` were decided to be replaced, by #475 and #522); its
replacement or amendment is a decision to write, carried by a work item (step 4).

## 3. The review on a support

Before the output, the maintainer reviews the whole on a support written in the folder: the
object as it is, then as it will be, each line marked by the work item that changes it (on
2026-11-04, the tree of the spec, `arbre-spec.md`). What the review finds opens subjects,
inserted as step 2 says.

## 4. The loups, then the output

**The loups** (« les loups », what was missed): a pass before the output. The work session
lists what no subject treated (a consumer forgotten, a product not yet built that a decision
assumes, a file that refers to what changes, a neighbour), and the maintainer decides each one,
one by one, as a subject; they are written in the output subject's file, section "Loups".

**The output** is the last subject, its file `<nn>-output.md`, presented and decided like the
others:
- **the blocks of work**, in a table: block, the subjects it carries, what it changes, its form
  (a story without an epic, an epic and its stories in order, a rework of an existing option);
- **what becomes the option it opened from**, if any: reworked in place, split, or replaced,
  and why;
- **the decisions to write**, in a table: the decision, its counterfactual, what it replaces or
  amends, the block that writes it;
- **the order with the neighbours**, in a table: each open issue the plan touches, its Status,
  its relation (replaced, before, after, cited), its place in the order;
- **the loups**, each decided with its why and what was rejected;
- **the execution**: the list of what is posed, in order, through which skill.

When several work items share one frame, the output can add **the target in one page**, written
in English: it opens the Material of the first epic, and the others point to it.

**The posing**, once the maintainer decided the output, in the execution's order; it can be
delegated, its brief the folder and the output subject. Each body is written from the
templates of its kind ([story-body.md](../../reference/story-body.md),
[epic-body.md](../../reference/epic-body.md)), in English, and shown to the maintainer before
it is posed; it is self-sufficient: what the folder decided for it (each decision with its why
and what was rejected, in an epic's Material or a story's Context), and at most one sentence
naming the folder.
- A work item: `/feyn-issue story <what>`, `/feyn-issue story #<epic> <what>` (only the next
  story of an open epic) or `/feyn-issue epic <objective>`, with its parameters:
  `--status Option`, a work item a brainstorm creates being born Option (decision
  `idea-and-option-before-ready`); `--origin`, the idea it opened from, otherwise the
  brainstorm with the maintainer and its date, in the form of its template;
  `--opened-from #<n>`, the idea or the option it opened from, if any, left out of the twin
  search. The links the order decided, as `/feyn-issue` sets them.
- The option it opened from: reworked or split as `/feyn-refine-option` step 4 does it, its
  body ending with the marker `Refined <YYYY-MM-DD> (brainstorm)`, the label `stale` removed by
  the rework; or closed as completed, its comment naming the work items that replace it.
- A neighbour: a comment naming what the plan changes for it, the work item that changes it, and
  what its own refinement should correct; it is refined later at its own option refinement.
- Work of an open epic that is not its next story: no option; what the folder decided for it
  goes into that epic's Material while the epic is an option (reworked as
  `/feyn-refine-option` step 4 does it), otherwise into an idea naming that epic
  (`/feyn-issue idea <finding>`; [contributing](../../../docs/contributing.md), Policies).
- A finding the brainstorm did not decide: an idea (`/feyn-issue idea <finding>`).
- The idea it opened from, if any, closed as completed, being its triage:
  `mise exec -- gh issue close <n> --reason completed --comment "Brainstormed <YYYY-MM-DD>: <the work items, each #<m>>."`;
  an idea whose decisions all went into an open epic is closed the same way, folded into that
  epic, as at a triage (`/feyn-triage`, step 4): `--comment "Brainstormed <YYYY-MM-DD>: folded
  into epic #<e>."`, naming the idea created for it, if any.

A brainstorm that decided nothing poses nothing: it says so, and the idea or the option it
opened from stays as it is.

**The review**, optional, offered once the posing is done; the maintainer decides. A new
`Agent` with `subagent_type: "feyn-brainstorm-reviewer"` ([its
file](../../agents/feyn-brainstorm-reviewer.md): the brief, no Edit or Write tool), never
resumed from this work session, its prompt naming the folder by its absolute path and each
issue posed, reworked or commented. It changes nothing. On its report, the work session fixes
the bodies of the issues it posed for the blocking findings
(`mise exec -- gh issue edit <n> --body-file <file>`), says what it fixed, and puts the rest to
the maintainer.

The folder stays where it is: the maintainer removes it once the plan no longer needs it.

## The reply

The reply that ends the brainstorm: each issue posed, reworked, commented or closed, with its
link and Status, in the order the output decided; the review's result, if it ran. What the
maintainer does next: commit the first work item of that order at its option refinement
(`/feyn-refine-option <n>`); once committed, the order of the Ready column holds the order of
the plan, and no file outside GitHub keeps it.
