---
date: 2026-10-31
issue: 322
status: accepted
area: spec:linear-fr
---

Without this, an agent would write that a rule "fails" a check that blocks nothing, and let a verdict of agents (taught-check) block the CI although agents do not give the same verdict twice.

The severity of a check's failure is never declared: it follows from the rules the check verifies. A check blocks when it verifies a requirement by test; in every other case it reports. A check verifies rules of one category and one level, or it is split; its category and level follow from its rules, and the check carries only its implementation (a script or an agent). The categories are a closed list this spec names, extended when needed, declared with the levels as the classifications of the rules of a course in its manifest; the checks of a course derive the severity of each check from them. Checks are selected by category, which crosses implementations: a category can run scripts and an agent workflow together.

## Options ruled out

- Renaming the two families of checks: no standard grounds new names; the families give way to the attributes of the rules.
- A check over two categories or two levels: a course author could not run the checks of one category without those of another, and a check over a "shall" and a "should" has no severity (the convention of Clippy's groups, Ruff's families, pytest's markers).

## Consequences

- Amended 2026-11-09 (#765): the decision moves from the spec directives to this spec (`decisions/` of `linear-fr`, MAJOR 1), which holds it now: the directives keep only what their tools read (decision `directives-hold-what-the-tools-read`), and the code that derives the severity of a check from its rules moves with it, from the lib of the directives to the checks of the course of this spec. Without this, a contributor would look for which checks of a course block in the directives, which no longer know the levels, or write a second severity there for another spec.
