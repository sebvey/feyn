---
date: 2026-11-05
issue: 568
status: accepted
area: agentic
---

Without this, an agent writing or changing a skill would list in its description the skills,
project subagents and agent workflows that call it, and the list would go stale with each new
caller (three incomplete, two false on `1494eec`), so the agent that loads the skill from its
description would read callers that do not call it and miss those that do.

A skill's description says what the skill does, then when to use it, ending on its "Use for …"
triggers; it names no caller. Claude Code reads the description to decide when to load the
skill, which a list of callers does not help; the caller is held by the calling file, which
names the skill it calls. A description may still name another skill as the place a case goes
to ("an idea goes to `/feyn-triage`"), since that is when not to use it. It replaces the
"Tooling of the work cycle, called by …" opening of the work-cycle tooling's descriptions.

## Options ruled out

- Complete the lists of callers: they would go stale again with the next caller.
- Remove the lists skill by skill, in the later work that touches each: the skills no later work
  touches would keep theirs.

## Consequences

- The descriptions of the project subagents and the agent workflows (`Spawned by …`,
  `Run by …`) are outside this decision.
