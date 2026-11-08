---
date: 2026-11-05
issue: 568
status: accepted
area: agentic
---

Without this, an agent writing or changing a skill would list in its description the skills, project subagents and agent workflows that call it, and the list would go stale with each new caller (three incomplete, two false on `1494eec`), so the agent that loads the skill from its description would read callers that do not call it and miss those that do.

A skill's description says in one sentence what the skill does, then its "Use for …" triggers; it names no caller, and the procedure stays in the body. Claude Code reads the description to decide when to load the skill, which a list of callers does not help; the caller is held by the calling file, which names the skill it calls. It replaces the "Tooling of the work cycle, called by …" opening of the work-cycle tooling's descriptions. A skill of the namespace `feyn-instructions-*` carries no triggers: it is preloaded, and no session loads it from its description.

## Options ruled out

- Complete the lists of callers: they would go stale again with the next caller.
- Remove the lists skill by skill, in the later work that touches each: the skills no later work touches would keep theirs.

## Consequences

- The descriptions of the project subagents and the agent workflows (`Spawned by …`, `Run by …`) are outside this decision.
- Amended 2026-11-06 (#623): the "what" of a description holds in one sentence, its triggers whole, the procedure and the routing to other skills in the body. Without this, an agent changing a skill would add its steps and its routing to the description, which every session loads, and the descriptions would grow back to the 7.8 KB of 2026-11-06.
- Amended 2026-11-08 (#753): a skill of the namespace `feyn-instructions-*` carries no "Use for" triggers, since no session loads it from its description: the project subagents preload it and the work session reads it through the `CLAUDE.md` import. Without this, an agent writing such a skill would add triggers by this decision, and a work session would load from its description instructions it already holds.
