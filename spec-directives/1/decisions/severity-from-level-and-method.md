---
date: 2026-10-31
issue: 322
status: accepted
area: spec-directives
---

Without this, an agent would write that a rule "fails" a check that blocks nothing, and let a verdict of agents (taught-check) block the CI although agents do not give the same verdict twice.

The severity of a check's failure is never declared: it follows from the rules the check verifies. A check blocks when it verifies a requirement by test; in every other case it reports. A check verifies rules of one category and one level, or it is split; its category and level follow from its rules, and the check carries only its implementation (a script or an agent). The categories are a closed list that each spec names, extended when needed; the category of a rule of the protocol is its family, with no second taxonomy without a use. Checks are selected by category, which crosses implementations: a category can run scripts and an agent workflow together.

## Options ruled out

- Renaming the two families of checks: no standard grounds new names; the families give way to the attributes of the rules.
- A check over two categories or two levels: a course author could not run the checks of one category without those of another, and a check over a "shall" and a "should" has no severity (the convention of Clippy's groups, Ruff's families, pytest's markers).
