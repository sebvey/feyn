---
date: 2026-10-30
issue: 252
status: accepted
area: agentic
---

Without this, an agent would put a template, a reference or a decision in the folder of the skill that first used it, and the next skill would link into another skill's folder.

`.claude/` has five folders. `skills/` holds one folder per skill, with its `SKILL.md` and the briefs written for one spawn. `workflows/` holds the agent workflows. `agents/` holds the project subagents (Claude Code's custom subagents): one file per agent whose brief is reused from run to run, its frontmatter (`name`, `description`, an explicit `tools` list, `model`) and the brief as its system prompt, spawned by name (`subagent_type` of `Agent`, `agentType` of a workflow's `agent()`); its `tools` list enforces what the brief only asked, a read-only agent gets no Edit or Write (`feyn-pr-reviewer`). A session sees an agent file added to `agents/` during it, with no restart (Claude Code, observed 2026-10-31, #373). `reference/` holds the body templates (`story-body.md`, `idea-body.md`, `pr-body.md`, …), the Project reference `project.md`, the rules of an agent in a worktree (`worktree-agent.md`), the rules of a Done when (`done-when.md`). `decisions/` holds the decisions that bind the agentic layer (decision `decision-format`). A procedure run on its own (by name, as one act) is a skill; a procedure only ever a step of other skills goes to `reference/`, cited by them (decision `one-moment-one-file`); how the agents of a workflow or a project subagent proceed stays in its file; a file that says what a thing is goes to `reference/`; a skill links another skill's folder for nothing but its `SKILL.md`. It writes down the layout that #240 and #251 put in place, and replaces the criterion of proposal #239 (point 12), a file in `reference/` because no skill owns it.

## Options ruled out

- The body templates next to the skill that uses them: the next skill that needs one links into another skill's folder.
- `reference/` for the orphans only: it asks an ownership judgement per file, and `proposal-body.md` got two reader skills in one day.
- Every decision taken during agentic work in `.claude/decisions/`: a decision such as the Project's Status binds the maintainer first, and a reader of contributing looks for it under `docs/`.
- Each step of other skills a skill of its own: its description loads in every work session.

## Consequences

- Amended 2026-11-05 (#576): a procedure only ever a step of other skills goes to `reference/`, which the criterion gave to a skill, else each step epic #570 writes once would become a skill; the maintainer's work on what a skill and a file of `reference/` are for may revisit it.
