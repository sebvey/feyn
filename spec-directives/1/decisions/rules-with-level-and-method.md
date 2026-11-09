---
date: 2026-10-31
issue: 322
status: accepted
area: spec-directives
---

Without this, an agent would define a rule's obligation by the check that verifies it ("Mandatory means an element's absence fails the check named"), and find no way to write a recommendation verified by review.

The unit of every spec is the rule, of the course or of a product, held as data in a rule file apart from the prose that describes it, in one model common to every rule file. A rule has an id (a slug, decision `rules-named-by-slug`), a text in the third person, an optional why, a method, then at most one of the check that implements the method and the criterion a judge or a reader applies; a group may declare the method once, which a rule may override. The method is one of the closed list of ISO/IEC/IEEE 29148:2018, stated even before its check exists. Whatever else classes a rule is a classification its spec declares for that rule file (a level, a category), which the rule or its group carries; the rules a check implements share each value. Method and classifications are kept apart from the severity of a check's failure, which a spec derives from them, in place of "Mandatory" and "Optional" defined by the check.

## Options ruled out

- A rule as a sentence of prose, with no identity: 29148 makes the requirement the unit, with an identifier and attributes that a test references.
- "taught-check" as a method: it is the name of a check of the repository, not a method.
- The protocol kept apart: joining cost nothing before any build; apart, two models of a rule.

## Consequences

- Amended 2026-11-02 (#465): the decision moves to the spec directives and binds every spec that follows them; the categories and the families stay each spec's. Without this, a contributor writing a second spec would copy the rule model of the first, two copies that drift.
- Amended 2026-11-05 (#552): the `origin` of a rule of the protocol is optional, present where a feyn issue or decision is its source. Without this, every rule of the protocol needs one, and a rule with no feyn source gets one that names a course (decision `spec-names-no-course`).
- Amended 2026-11-05 (#565): the `origin` leaves the rules and the rule files: it tied a rule to a course, in three forms, no program read it, and git keeps the issue that wrote each rule. Without this, a contributor fills a field nothing reads, taken for the link to a decision.
- Amended 2026-11-05 (#547): "progression" for the category pedagogy, and "must" for a requirement, leave this decision for the glossary (decision `word-choices-in-the-glossary`).
- Amended 2026-11-09 (#765): the model is cut to what every rule file shares and the tools of the directives read (decision `directives-hold-what-the-tools-read`): the level and the category are no longer fields of the model but classifications a spec declares in its manifest, which the level and the category of the rules of a course are in `linear-fr`; a rule may carry a criterion in place of a check; the text is in the third person. Without this, the spec of a product would inherit a level and a category it has no use for, and a contributor would read the severity of a check as the directives'.
