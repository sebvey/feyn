---
date: 2026-10-30
issue: 252
status: accepted
area: agentic
---

Without this, an agent would put a template, a reference or a decision in the folder of the skill that first used it, and the next skill would link into another skill's folder.

`.claude/` has six folders. `skills/` holds one folder per skill, with its `SKILL.md` and the briefs written for one spawn. `workflows/` holds the agent workflows of the work cycle; an agent workflow that is the check of a rule of a spec lives with that spec's checks (`taught-check.js` in `course/checks/` of `linear-fr`). `agents/` holds the project subagents (Claude Code's custom subagents): one file per agent whose brief is reused from run to run, its frontmatter (`name`, `description`, an explicit `tools` list, `model`) and the brief as its system prompt, spawned by name (`subagent_type` of `Agent`, `agentType` of a workflow's `agent()`); its `tools` list enforces what the brief only asked, a read-only agent gets no Edit or Write (`feyn-pr-reviewer`). A session sees an agent file added to `agents/` during it, with no restart (Claude Code, observed 2026-10-31, #373). `reference/` holds the body templates (`story-body.md`, `idea-body.md`, `pr-body.md`, …), the Project reference `project.md`, the rules of an agent in a worktree (`worktree-agent.md`), the rules of a Done when (`done-when.md`), the agentic rules (`agentic-rules.yaml`, decision `agentic-rules-file`). `decisions/` holds the decisions that bind the agentic layer (decision `decision-format`). `scripts/` holds the scripts a skill and an agent both run (`check-pr-body`, `check-decisions`, `check-agentic-rules`). A procedure run on its own (by name, as one act) is a skill; a procedure only ever a step of other skills goes to `reference/`, cited by them (decision `one-moment-one-file`); how the agents of a workflow or a project subagent proceed stays in its file; a file that says what a thing is goes to `reference/`; a skill links another skill's folder for nothing but its `SKILL.md`. It writes down the layout that #240 and #251 put in place, and replaces the criterion of proposal #239 (point 12), a file in `reference/` because no skill owns it.

## Options ruled out

- The body templates next to the skill that uses them: the next skill that needs one links into another skill's folder.
- `reference/` for the orphans only: it asks an ownership judgement per file, and `proposal-body.md` got two reader skills in one day.
- Every decision taken during agentic work in `.claude/decisions/`: a decision such as the Project's Status binds the maintainer first, and a reader of contributing looks for it under `docs/`.
- Each step of other skills a skill of its own: its description loads in every work session.

## Consequences

- Amended 2026-11-05 (#576): a procedure only ever a step of other skills goes to `reference/`, which the criterion gave to a skill, else each step epic #570 writes once would become a skill; the maintainer's work on what a skill and a file of `reference/` are for may revisit it.
- Amended 2026-11-06 (#613): the agent workflow of `taught-check` moves to the checks of `linear-fr`, beside the rule it checks: it is a check of the spec, not a tool of the agentic layer, and its skill left the listing every session loads.
- Amended 2026-11-06 (#617): a sixth folder, `scripts/`, for the scripts a skill and an agent both run. Without this, a script that `/feyn-pull-request` and the reviewer both call would sit in one skill's folder, and the reviewer would read into a skill's folder, which this decision keeps for that skill.
