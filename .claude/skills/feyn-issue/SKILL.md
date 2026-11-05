---
name: feyn-issue
description: "Create a GitHub issue on feyn from `idea <finding>`, `story [#<epic>] [direct] <what>` or `epic <objective>`, of the kind it is given (no kind given, it asks which and creates nothing; `direct`, for a story only, marks a direct delivery, refused when the work is more than one edit with no behaviour), each written from its body template, with its kind label, its type and area labels, its links and the Status its caller gives (`--status Option|Ready`, Option by default), its origin line (`--origin`) and the issue it is opened from (`--opened-from #<n>`, left out of the twin search), or read an existing issue and summarise it. Use for \"/feyn-issue 12\", \"/feyn-issue idea <finding>\", \"/feyn-issue story <what>\", \"/feyn-issue story direct <what>\", \"/feyn-issue story #220 <what>\", \"/feyn-issue story #220 direct <what>\", \"/feyn-issue epic <objective>\"."
argument-hint: "<issue number> | idea <finding> | story [#<epic>] [direct] <what> | epic <objective>, then [--status Option|Ready] [--origin \"<line>\"] [--opened-from #<n>]"
---

# /feyn-issue

One job: put an idea or a work item into an issue, or tell what an issue says. It does not
start the work (that is `/feyn-issue-branch`) and does not fix anything on the way. It holds the
act; the rules of writing a body are in its template, and its GitHub commands in
[project.md](../../reference/project.md), "Issues".

An issue carries an **idea** (a finding, no kind) or a **work item** of one of two kinds,
**story** or **epic** (decision `issue-carries-a-work-item-or-an-idea`;
[contributing](../../../docs/contributing.md), "How the work is organised"). Each has its own
body template: [idea-body.md](../../reference/idea-body.md),
[story-body.md](../../reference/story-body.md), [epic-body.md](../../reference/epic-body.md).

The argument decides the mode: a number (`12`, `#12`) reads; anything else creates, in one of
three forms, `idea <finding>`, `story [#<epic>] [direct] <what>`, `epic <objective>`:
- the kind is the first word when it is exactly `idea`, `story` or `epic`; any other first
  word is not a kind (a finding that starts with "stories…" names none);
- a first word that is an old kind, `slice`, `observation` or `proposal` (rejected terms
  of `docs/glossary.md`), is never read as its replacement: ask "You said <word>, did
  you mean <story or idea>?" (story for `slice` and `proposal`, idea for `observation`), in
  the language of the conversation, and create nothing until the answer (project
  `CLAUDE.md`, "Vocabulary");
- `#<epic>` follows the kind for a story attached to an epic, and only for a story; a story
  without it has no parent epic (decision `story-with-or-without-an-epic`);
- `direct` is the word right after `story` (after `#<epic>` when there is one) when it is
  exactly that word (step 3); a `<what>` whose own first word is "direct" can read the same:
  when unsure, ask the maintainer and create nothing until the answer;
- no kind: ask which of the three, and create nothing until the answer.

The caller passes its policy as parameters, after the `<what>`, each at most once; the skill
applies them and decides none of them:
- `--status Option` or `--status Ready`, on a work item: the Status it is born with. None given:
  Option. Which caller gives which is the cycle's rule
  ([contributing](../../../docs/contributing.md), "How the work is organised", "Creating and
  committing are two acts"), stated by each caller; the maintainer's word at a direct call,
  that the work item is committed, is `--status Ready`. An idea takes none: refused, saying why;
- `--origin "<line>"`, on a story or an epic: its origin, in one of the forms its template
  gives. None given: the form the template says applies, from what step 1 says back;
- `--opened-from #<n>`: the issue the caller works from (the idea triaged, the option split,
  the idea or option a brainstorm opened from), never a twin (step 2).

## Read an issue

1. Read it ([project.md](../../reference/project.md), "Issues", Read).
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
- a **story**, label `kind:story`, from [story-body.md](../../reference/story-body.md): the head
  (`**Where:**`, `**What:**`, `**Why:**`) then Done when, Context (its last line the origin),
  To do, Reads;
- an **epic**, label `kind:epic`, the five sections of
  [epic-body.md](../../reference/epic-body.md);
- a body of the **old format**, written before these three templates, read as such: the head
  then Done when, Observation, To do, Reads (a body with no head has its sections in another
  order); the plan's bullets (`- **Observation**: …`); or, created from the old issue form,
  the head under a `### Where, what, why` heading, its `**Where:**` markers possibly absent.
  It tells an Observation section with a Done when (the old format) from an idea's
  Observation, which comes with no Done when. An issue of the old format placed in Idea at the
  merge of epic #392 may carry a `type:` label: read it as such and leave the label, the triage
  setting the type on the work items it creates. An issue numbered below #424, the epic PR of
  epic #392, was written in the old format (the `issue-body.md` format), its epic's own stories
  included: read it as such, never correct it; #425, which wrote this threshold, is the one
  exception above it, written in the new form. Any other body: its sections in order.

## Create an issue

1. **Say it back.** Restate in two lines: for an idea, what was seen and where (paths, issue,
   PR, work session); for a story, what it delivers and where it comes from (an idea, its epic,
   a brainstorm with the maintainer, the maintainer's direct request: the `--origin` given, if
   any); for an epic, its objective. A finding with no place is not an idea yet: ask where it
   was seen.
2. **Look for a twin**: search the open issues on two or three key words
   ([project.md](../../reference/project.md), "Issues", Search). The issue given as
   `--opened-from` is left out: it is where the new one comes from, not a twin. Another open
   issue on the same point: add a comment to it instead
   ([project.md](../../reference/project.md), "Issues", Comment) and stop.
3. **Take the kind given**, the first word of the argument as said above. The skill writes the
   kind it is given and never chooses or changes it: which kind fits which moment is decided
   by whoever creates the issue ([contributing](../../../docs/contributing.md), "How the work
   is organised").
   - an **idea** holds a finding and no solution: no parent, no kind label, no `type:` label;
   - a **story** carries the label `kind:story`; it is attached to the epic its argument
     names right after the kind (`story #220`), or has no parent epic when none is named;
   - an **epic** carries the label `kind:epic`; it has no parent.
   - `direct`, right after `story` (`story direct`) or after the epic (`story #220 direct`),
     says the maintainer names this story a **direct delivery**: the maintainer's work session,
     or the orchestrator of its epic, makes the branch, the edit and the PR, with no
     contributor and no fresh-agent review ([contributing](../../../docs/contributing.md), "How
     the work is organised", moment 5). The skill never adds it on its own. An idea or an epic
     never takes it: `idea direct` or `epic direct` is refused, saying why, and nothing is
     created.
4. **Pick the Status, the labels and the links.**
   - Status (decision `idea-and-option-before-ready`): an **idea** stays Idea, which a Project
     workflow sets ([project.md](../../reference/project.md), "The Project workflows"). A work
     item, a story or an epic, takes the `--status` its caller gives, Option when none is
     given; it is set at step 8. No state label: the Status replaced them.
   - `type:`, on a story or an epic only: `bug` (something is broken), `course` (course files),
     `decision` (a decision to write), `improvement` (tooling, spec, process). An idea carries
     none: the triage sets the type on the work items it creates from it.
   - `area:` on every form, from the paths the finding or the work names (the tree is the
     list):

     | Path | Area label |
     |---|---|
     | `course-specs/<name>/` | `area:spec:<name>` |
     | `spec-directives/` | `area:spec-directives` |
     | `courses/<id>/` | `area:course:<id>` |
     | `classroom-builder/` | `area:teacher` |
     | `site-builder/` | `area:site` |
     | `.claude/`, `.github/` | `area:agentic` |
     | root files, `docs/` | `area:repo` |

     Paths in two areas: the area that carries the intent; if none does, propose two issues.
     A label missing on GitHub is created, since the tree says it exists
     ([project.md](../../reference/project.md), "Issues", Create a label).
   - The links, on a story or an epic: which open issues must close before this one can start
     (it is blocked by them), and which open issues cannot start before this one closes (it
     blocks them): those the work names, and those whose work it changes (a file, a key, a
     format they rely on). Ask the maintainer when unsure; none is a normal answer. Two issues
     that only edit the same file are not linked. The links go on GitHub, never as a line in
     the body. An idea is no work: it has none.
5. **Write the body** into a file made with `mktemp` (outside the repository), from the
   template of its kind, [idea-body.md](../../reference/idea-body.md),
   [story-body.md](../../reference/story-body.md) or [epic-body.md](../../reference/epic-body.md):
   its comments hold every rule of writing that kind, its reread included; follow each, then
   remove it. A story's or an epic's origin is the `--origin` given, otherwise the form its
   template says applies.
   - With `direct` (step 3): first hold the Done when to the criterion of a direct delivery,
     one edit with no behaviour, as [contributing](../../../docs/contributing.md), "How the
     work is organised", moment 5, states it. A Done when that asks more: refuse `direct`,
     saying which statement or which file goes beyond it, and create nothing. Otherwise the
     To do opens with the line its template gives.
6. **Title**, under 70 characters, no issue prefix. A story: imperative, like a commit summary
   ("Fix the caption check on nested groups"). An idea: the finding, stated, not a solution
   ("The caption check misses nested groups"). An epic: "Epic: " and the objective in a few
   words.
7. **Create** it, in the command of its kind ([project.md](../../reference/project.md),
   "Issues", Create), one issue per command. A milestone when the maintainer names one, on a
   story or on an epic that targets a release; never on an idea.
8. **The Status of a work item** (step 4). The Project workflows add the issue and
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
