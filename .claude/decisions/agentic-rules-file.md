---
date: 2026-11-06
issue: 654
status: accepted
area: agentic
---

Without this, a contributor who finds how a file of the agentic layer must be written would put it in the skill where it was found, or in a decision of its own, so the next issue author and the fresh-agent reviewer, who read neither, would let the same writing through again: #627's Done when dictated the wording of an instruction of a skill with its developed ground, the review of PR #650 passed it, and the maintainer had it shortened.

The agentic rules of the files of the agentic layer (its skills, project subagents, references, agent workflows' prompts, `CLAUDE.md`), live in one YAML file, `.claude/reference/agentic-rules.yaml`, one entry per agentic rule: its id, what it applies to, its method (`review`, judged by the reviewer, or `script`, with the check that runs it), its text, its why and its origin. A script, `check-agentic-rules`, checks the file's form, so no entry lacks its why or its origin. The file is read only when the work touches the agentic layer: by the author of a work item, through the rules of a Done when, and by the fresh-agent reviewer, whose brief holds a diff touching `.claude/` or `CLAUDE.md` to each agentic rule it applies to, a breach a non-blocking finding unless the agentic rule says otherwise; the fixer follows that brief. The why of an agentic rule lives in its entry, not in a decision of its own. Adding an agentic rule is adding an entry, by a story, with its origin; one judged by review that a script can hold moves to `script`.

## Options ruled out

- A Markdown file of agentic rules: nothing would check that each has its why and its origin.
- A decision per agentic rule: they scatter among the decisions, and the reviewer cannot load them all.
- Each agentic rule in the skill or file where it was found: the issue author and the reviewer of another file never read it.

## Consequences

- The form follows the rule file of a spec (an entry per rule, its method, its check, its why, a check of the file's form), not that file: a rule of a spec binds a product, an agentic rule binds what feyn writes in its agentic layer.
