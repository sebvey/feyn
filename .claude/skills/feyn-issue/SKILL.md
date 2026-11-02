---
name: feyn-issue
description: "Tooling of the work cycle, called by `/feyn-brainstorm`, `/feyn-triage`, `/feyn-deliver-epic` and the agents of the delivery workflow: create a GitHub issue on feyn from `idea <finding>`, `story [#<epic>] [direct] <what>` or `epic <objective>`, of the kind it is given (no kind given, it asks which and creates nothing; `direct`, for a story only, marks a direct delivery, refused when the work is more than one edit with no behaviour), each from its body template, with its kind label, its type and area labels, its links and its Status in the Project, or read an existing issue and summarise it. Use for \"/feyn-issue 12\", \"/feyn-issue idea <finding>\", \"/feyn-issue story <what>\", \"/feyn-issue story direct <what>\", \"/feyn-issue story #220 <what>\", \"/feyn-issue story #220 direct <what>\", \"/feyn-issue epic <objective>\"."
argument-hint: "<issue number> | idea <finding> | story [#<epic>] [direct] <what> | epic <objective>"
---

# /feyn-issue

One job: put an idea or a work item into an issue, or tell what an issue says. It does not
start the work (that is `/feyn-issue-branch`) and does not fix anything on the way.

An issue carries an **idea** (a finding, no kind) or a **work item** of one of two kinds,
**story** or **epic** (decision `issue-carries-a-work-item-or-an-idea`;
[contributing](../../../docs/contributing.md), "How the work is organised"). Each has its own
body template: [idea-body.md](../../reference/idea-body.md),
[story-body.md](../../reference/story-body.md), [epic-body.md](../../reference/epic-body.md).

The argument decides the mode: a number (`12`, `#12`) reads; anything else creates, in one of
three forms, `idea <finding>`, `story [#<epic>] [direct] <what>`, `epic <objective>`:
- the kind is the first word when it is exactly `idea`, `story` or `epic`; any other first
  word is not a kind (a finding that starts with "stories…" names none);
- `#<epic>` follows the kind for a story attached to an epic, and only for a story; a story
  without it has no parent epic (decision `story-with-or-without-an-epic`);
- `direct` is the word right after `story` (after `#<epic>` when there is one) when it is
  exactly that word (step 3); a `<what>` whose own first word is "direct" can read the same:
  when unsure, ask the maintainer and create nothing until the answer;
- no kind: ask which of the three, and create nothing until the answer.

## Read an issue

1. `mise exec -- gh issue view <n> --json number,title,state,labels,milestone,body,comments,closedByPullRequestsReferences,projectItems`.
2. Tell its form from its kind label and its sections (below), then answer in at most ten
   lines: the title; what it is (idea, story, epic, or a body of the old format); its head
   (Where, What, Why; Where and Why for an idea) as the first line, then the rest; for a story,
   its Context in one sentence with its origin line, its To do as a short list, naming the line
   "Direct delivery" when it opens the To do; for an idea, its Observation in one sentence; the
   Done when as written (a story, an epic, a body of the old format; an idea has none); the
   Status (from `projectItems`); the labels (kind, type, area, `blocked:maintainer`); what
   blocks it and what it blocks, open ones first
   ([project.md](../../reference/project.md), "Dependencies"); open or closed, and by which PR;
   what the comments added or changed; its epic for a story, its stories and plan comment for
   an epic ([project.md](../../reference/project.md), "Epics"). Say plainly when a section of
   its form is missing or the Done when is not verifiable.

The body is one of these forms; read each as it is, never correct it, and never take a body
of the old format for a defect:
- an **idea**, from [idea-body.md](../../reference/idea-body.md): the head (`**Where:**`,
  `**Why:**`) then Observation. Created from the GitHub issue form
  (`.github/ISSUE_TEMPLATE/idea.yml`), it carries that head under a `### Where, why` heading,
  and its `**Where:**` markers may be absent, since the form's placeholder is not inserted;
- a **story**, label `story`, from [story-body.md](../../reference/story-body.md): the head
  (`**Where:**`, `**What:**`, `**Why:**`) then Done when, Context (its last line the origin),
  To do, Reads;
- an **epic**, label `epic`, the five sections of [epic-body.md](../../reference/epic-body.md);
- a body of the **old format**, written before these three templates, read as such: the head
  then Done when, Observation, To do, Reads (a body with no head has its sections in another
  order); the plan's bullets (`- **Observation**: …`); or, created from the old issue form,
  the head under a `### Where, what, why` heading, its `**Where:**` markers possibly absent.
  It tells an Observation section with a Done when (the old format) from an idea's
  Observation, which comes with no Done when. An issue of the old format placed in Idea at the
  merge of epic #392 may carry a `type:` label: read it as such and leave the label, the triage
  setting the type on the work items it creates. Any other body: its sections in order.

## Create an issue

1. **Say it back.** Restate in two lines: for an idea, what was seen and where (paths, issue,
   PR, work session); for a story, what it delivers and where it comes from (an idea, its epic,
   a brainstorm with the maintainer); for an epic, its objective. A finding with no place is not
   an idea yet: ask where it was seen.
2. **Look for a twin.** `mise exec -- gh issue list --state open --search "<two or three key words>"`.
   An open issue on the same point: add a comment to it instead
   (`mise exec -- gh issue comment <n> --body-file <file>`) and stop.
3. **Take the kind given**, the first word of the argument as said above. The skill writes the
   kind it is given and never chooses or changes it: which kind fits which moment is decided
   by whoever creates the issue ([contributing](../../../docs/contributing.md), "How the work
   is organised").
   - an **idea** holds a finding and no solution: no parent, no kind label, no `type:` label;
   - a **story** carries the label `story`; it is attached to the epic its argument names right
     after the kind (`story #220`), or has no parent epic when none is named;
   - an **epic** carries the label `epic`; it has no parent.
   - `direct`, right after `story` (`story direct`) or after the epic (`story #220 direct`),
     says the maintainer names this story a **direct delivery**: the maintainer's work session,
     or the orchestrator of its epic, makes the branch, the edit and the PR, with no
     contributor and no fresh-agent review ([contributing](../../../docs/contributing.md), "How
     the work is organised", moment 2). The skill never adds it on its own. An idea or an epic
     never takes it: `idea direct` or `epic direct` is refused, saying why, and nothing is
     created.
4. **Pick the Status, the labels and the links.**
   - Status ([project.md](../../reference/project.md); decision `idea-and-option-before-ready`):
     an **idea** stays Idea, which a Project workflow sets. A **story** posed by the
     orchestrator of a taken epic (`/feyn-deliver-epic`) is Ready. Any other work item, a story
     or an epic, is Option, or Ready when the maintainer says it is committed; one a brainstorm
     creates (`/feyn-brainstorm`) is always Option, its commitment decided at a triage. The
     caller says which: unsure, Option. Option and Ready are set at step 8. No state label: the
     Status replaced them.
   - `type:`, on a story or an epic only: `bug` (something is broken), `course` (course files),
     `decision` (a decision to write), `improvement` (tooling, spec, process). An idea carries
     none: the triage sets the type on the work items it creates from it.
   - `area:` on every form, from the paths the finding or the work names (the tree is the
     list):

     | Path | Area label |
     |---|---|
     | `course-specs/<name>/` | `area:spec:<name>` |
     | `courses/<id>/` | `area:course:<id>` |
     | `teacher/` | `area:teacher` |
     | `site/` | `area:site` |
     | `.claude/`, `.github/` | `area:agentic` |
     | root files, `docs/` | `area:repo` |

     Paths in two areas: the area that carries the intent; if none does, propose two issues.
     A label missing on GitHub is created, since the tree says it exists:
     `mise exec -- gh label create area:<area> --color 0075ca --description "Area: <area>"`.
   - The links, on a story or an epic: which open issues must close before this one can start
     (it is blocked by them), and which open issues cannot start before this one closes (it
     blocks them): those the work names, and those whose work it changes (a file, a key, a
     format they rely on). Ask the maintainer when unsure; none is a normal answer. Two issues
     that only edit the same file are not linked. The links go on GitHub, never as a line in
     the body. An idea is no work: it has none.
5. **Write the body** into a file made with `mktemp` (outside the repository), from the
   template of its form, each comment of the template replaced.
   - An **idea**, from [idea-body.md](../../reference/idea-body.md): the head (two lines, each
     its own paragraph: Where, the area and at most three words on what is touched; Why, what
     the finding breaks or costs, in one sentence), then Observation (the fact first, with its
     place: path, line, issue, PR; then the other facts, one per line; the history last: the
     work session or PR where it was seen). Nothing else: no What, no Done when, no To do, no
     Reads. Then reread it as the maintainer at a triage: does the Observation open with the
     fact and its place; did a solution slip in? One no: fix before creating, then reread.
   - A **story**, from [story-body.md](../../reference/story-body.md): the head (three lines,
     each its own paragraph: Where, the area and at most three words on what is touched; What
     it delivers; Why it matters now), then Done when (statements a reviewer can verify by
     reading or running something), Context (what the work needs to know, restated so that the
     contributor works from the story alone: first line, what is wrong or missing and where;
     then the other facts, one short bullet each; what was settled, with its why and the
     alternative rejected, when a brainstorm settled it; no To do), To do (one line per item,
     the how in sub-bullets, numbered when the order matters), Reads only when the work needs
     other files.
     - The last line of the Context is the origin, in one of the three forms of
       [story-body.md](../../reference/story-body.md): "From idea #<n>." when the story comes
       from an idea, its epic or not; otherwise "Story of epic #<n>." for a story of an epic;
       otherwise "From a brainstorm with the maintainer, <date>.", which also serves a story
       the maintainer settles directly in a work session, with neither epic nor idea.
     - A Done when statement that searches the repository (an `rg` or a `grep` that must print
       nothing, or only some lines) excludes the history: released CHANGELOG entries, dated
       amendments and superseded decisions (by path or named as exceptions). Otherwise the
       contributor rewrites the history to meet it, as #339's `rg` made its contributor split a
       string and rewrite an amendment (a debrief rule, `/feyn-deliver-epic`). The same holds
       for an epic's Done when.
     - With `direct` (step 3): first hold the Done when to the criterion of a direct delivery,
       one edit with no behaviour, as [contributing](../../../docs/contributing.md), "How the
       work is organised", moment 2, states it. A Done when that asks more: refuse `direct`,
       saying which statement or which file goes beyond it, and create nothing. Otherwise the
       first line of the To do section is the plain line `Direct delivery`, alone, before the
       first item: `/feyn-deliver` and `/feyn-pull-request` read it there.
     - Then reread it as the maintainer of the morning, choosing among ten Ready stories: does
       the head say where, what and why in three lines; does the Context open with what is
       wrong or missing, and end with its origin; does each To do item hold in one line? One
       no: fix before creating, then reread. The body template `story-body.md` carries the
       same rules.
   - An **epic**, from [epic-body.md](../../reference/epic-body.md): Objective, Why now,
     Material (what is read when splitting it, and what was settled, each point with its why
     and the alternative rejected), Done when, Out of scope; no To do, no story posed in
     advance.
6. **Title**, under 70 characters, no issue prefix. A story: imperative, like a commit summary
   ("Fix the caption check on nested groups"). An idea: the finding, stated, not a solution
   ("The caption check misses nested groups"). An epic: "Epic: " and the objective in a few
   words.
7. **Create** it, one form per command:
   - an idea: `mise exec -- gh issue create --title "<title>" --body-file <file> --label area:<area>`;
   - a story: `mise exec -- gh issue create --title "<title>" --body-file <file> --label story --label type:<type> --label area:<area>`;
   - an epic: the same with `--label epic` in place of `--label story`.

   Add `--milestone <name>` when the maintainer names one, on a story or on an epic that
   targets a release; never on an idea. It prints the issue URL. One issue per command, never
   from a shell function: a `gh issue create` inside a function with
   `${5:+--milestone "$5"}` failed silently (Claude Code, observed 2026-10-29, #269).
8. **The Status, when step 4 says Option or Ready.** The Project workflows add the issue and
   set Idea ([project.md](../../reference/project.md)); nothing to do for an idea. Set Option
   or Ready as [project.md](../../reference/project.md), "Commands", says under "Set a Status
   on a new item": it waits for Idea first.
9. **Attach a story to its epic** when step 3 names one, and **set the links** found at step 4
   ([project.md](../../reference/project.md), "Epics" and "Dependencies"). An idea, an epic and
   a story without an epic have no parent.
10. Reply in one line with the issue number, its URL, what it is (idea, story or epic), "direct
    delivery" when its To do opens with that line, its epic for a story of an epic, its Status,
    its labels and its links.

## Vocabulary

Issues use the reserved terms of `docs/glossary.md`. Write "issue", never "ticket" or "task",
in the body.
