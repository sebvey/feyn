---
date: 2026-10-30
issue: 252
status: accepted
area: agentic
---

Without this, an agent would put a template, a reference or a decision in the folder of the skill that first used it, and the next skill would link into another skill's folder.

`.claude/` has four folders. `skills/` holds the HOW: one folder per skill, with its `SKILL.md`
and its briefs (`feyn-deliver/contributor-brief.md`). `workflows/` holds the agent workflows.
`reference/` holds the WHAT, what a thing is or looks like: the body templates
(`issue-body.md`, `pr-body.md`, …), the Project reference `project.md`, the rules of an agent
in a worktree (`worktree-agent.md`). `decisions/` holds the decisions that bind the agentic
layer (decision `decision-format`). A file that says how an actor proceeds belongs to a skill;
a file that says what a thing is goes to `reference/`; a skill links another skill's folder for
nothing but its `SKILL.md`. It writes down the layout that #240 and #251 put in place, and
replaces the criterion of proposal #239 (point 12), a file in `reference/` because no skill
owns it.

## Options ruled out

- The body templates next to the skill that uses them: the next skill that needs one links
  into another skill's folder.
- `reference/` for the orphans only: it asks an ownership judgement per file, and
  `proposal-body.md` got two reader skills in one day.
- Every decision taken during agentic work in `.claude/decisions/`: a decision such as the
  Project's Status binds the maintainer first, and a reader of contributing looks for it under
  `docs/`.
