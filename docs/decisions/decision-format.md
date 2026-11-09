---
date: 2026-10-27
issue: null
status: accepted
area: repo
---

Without this, an agent would number decisions in sequence, so two agents on two independent issues would take the same number, and would record a choice without saying what goes wrong without it.

A decision is one Markdown file named by its slug (`two-versioned-objects.md`); the slug is its identifier, cited as "decision two-versioned-objects". Its frontmatter holds `date`, `issue` (the originating issue number, or `null`), `status` (`accepted` or `superseded`), followed, only when superseded, by `superseded-by: <slug>` (the decision that replaces it), and `area` (the area it binds). After the frontmatter, the first line is the **counterfactual**, `Without this, <who acts> would…`: it names who would act (an agent, the common case, or a contributor, the teacher, a workflow, the maintainer…), then a concrete wrong act and what it breaks; then the decision in one paragraph. Optional headings, only when they add: options ruled out, consequences. No index: `ls` and the frontmatter suffice.

A decision, in any `decisions/` folder, and `docs/glossary.md` cite no rule id: neither the id of a rule of a spec nor that of a group of rules. A rule id changes faster than they do, since rules are renamed, merged and regrouped while the decision still holds. A decision names the rule it settles by what it asks ("the protocol rule that shows a declared diagram at its unit"); the rule points to the decision, in its `why`, not the reverse. A decision of a spec or of the spec directives also names no course (decision `spec-names-no-course`).

A live decision states what holds today; git keeps the before. A mechanism of it that changes (a skill or a path renamed, a file moved, a step that now runs elsewhere, a tool removed) is corrected in place in its body, with no "Amended" line. A change of the scope of the choice while it still holds (an exception added, a case it now covers or no longer covers) is written in the body too, and gets one line `- Amended <date> (#<n>): …` under a `## Consequences` heading, added when the file has none, saying what changed and why. A decision that no longer holds is superseded (`status: superseded` and `superseded-by: <slug>`), never amended. A superseded decision and a released CHANGELOG entry are history: a later change leaves them as they are. An "Amended" line keeps its account of the change of scope; a mechanism it names that changes is corrected in place, as in the body.

A decision lives in the `decisions/` folder of the most local area it binds: `product-lines/<name>/<MAJOR>/decisions/` (a new MAJOR copies them under the same slugs); the spec directives (the manifest, the rule model, the versions, the tooling of the checks), `spec-directives/<MAJOR>/decisions/`; `courses/<id>/decisions/`, `teacher-builder/decisions/`, `site-builder/decisions/`; the agentic layer (`.claude/`, `.github/`), `.claude/decisions/`; two areas or more, `docs/decisions/`.

A decision is written when its counterfactual can be named and it spans several files or is costly to undo; otherwise a comment where it applies, or nothing. A choice that changes only words is a glossary entry, never a decision, whatever it spans (decision `word-choices-in-the-glossary`). The `/feyn-decision` skill applies this file: it refuses a decision without a counterfactual and a choice that changes only words, picks the folder, checks for a neighbouring slug, and checks that the text cites no rule id, in a spec names no course, and uses the glossary's terms without defining them.

## Options ruled out

- Sequential numbers: they collide between parallel branches. Two slugs collide only for the same decision, and the git conflict is then the right signal.
- The issue number as identifier: it ties a decision to GitHub and forces an issue for a decision taken in a PR.
- "ADR" in paths: it names the frame's complement, the practice, never one decision.
- An "Amended" line for every mechanism change, the rest of the body untouched (the rule until #370): each stale sentence stays beside its correction, and the before is already in git (decision `construction-in-history`).
- "Without this, an agent would…" as the only form (the rule until #378): it leaves out the teacher, a contributor, the maintainer or a workflow, whom a decision can bind as well.

## Consequences

- Amended 2026-11-01 (#370): an "Amended" line no longer records a mechanism change, only a change of scope; a mechanism is corrected in place in the body. Without this, an agent reads a mechanism the decision no longer has (`construction-in-history` told a new run of a removed workflow to restore its files, and only the line below said it was gone) and must reconcile the two. The mechanism-only lines of the live decisions were folded into their bodies.
- Amended 2026-11-01 (#378): the counterfactual names who acts (`Without this, <who acts> would…`), an agent being the common case, not the only one. Without this, a contributor writing a decision that binds the teacher, a workflow or the maintainer would force it into "an agent would…" or see it refused, though what the counterfactual must hold is a concrete wrong act, not its subject. The bodies of the existing decisions are left as they are.
- Amended 2026-11-04 (#528): a decision and the glossary cite no rule id, nor a group's. Without this, a decision cites rules that a later renaming or merge has removed (epic #451 renames and merges rules; story #524 had added rule ids to two decisions). The live decisions and the glossary that cited one were rewritten to name the rule by what it asks; decision `rules-named-by-slug` no longer lists the decisions among the references to a slug.
- Amended 2026-11-04 (#543): a choice that changes only words is no longer written as a decision, even when it spans several files; it is a glossary entry, its why in the entry's `why` (decision `word-choices-in-the-glossary`). Without this, a contributor reads the bar of a decision as met by a renaming across many files and records a word choice in two places.
- Amended 2026-11-06 (#599): a decision on how the teacher teaches no longer waits for two fresh tests that show it necessary or sufficient; every decision is taken on argument, on the bar above. Without this, `/feyn-decision` would refuse a decision on the teacher for lack of fresh tests the plan no longer runs: the maintainer dropped that rule on 2026-11-05, working the teacher's behaviour being later work (decision `teacher-frozen-until-the-protocol-brainstorm`).
