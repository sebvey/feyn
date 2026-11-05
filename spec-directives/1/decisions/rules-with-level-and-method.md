---
date: 2026-10-31
issue: 322
status: accepted
area: spec-directives
---

Without this, an agent would define a rule's obligation by the check that verifies it ("Mandatory
means an element's absence fails the check named"), and find no way to write a recommendation
verified by review.

The unit of every spec is the rule, the protocol's included, held as data in a rule file apart
from the prose that describes it. A rule has an id (a slug, decision `rules-named-by-slug`), a
level (decision `levels-from-iso-directives`), a category, a method, the check that implements
the method when one exists, a text and an optional why; a group may declare a category and a
method once, which a rule may override. The method is one of the closed list of ISO/IEC/IEEE
29148:2018, stated even before its check exists. Level, method and the severity of a check's
failure are kept apart, the severity derived from the other two (decision
`severity-from-level-and-method`), in place of "Mandatory" and "Optional" defined by the check.

## Options ruled out

- A rule as a sentence of prose, with no identity: 29148 makes the requirement the unit, with
  an identifier and attributes that a test references.
- "taught-check" as a method: it is the name of a check of the repository, not a method.
- The protocol kept apart from this model: no build existed yet, so joining cost nothing, and
  apart it would leave two models of a rule.

## Consequences

- Amended 2026-11-02 (#465): the decision moves to the spec directives (epic #454, Material
  point 15): the rule model, the conformance clause and the tests of a spec's own files bind
  every spec that follows the directives; the categories and the families stay each spec's.
  Without this, a second spec would copy the rule model of the first, two copies that drift.
- Amended 2026-11-05 (#552): the `origin` of a rule of the protocol is optional, present where a
  feyn issue or decision is its source. Without this, every rule of the protocol needs one, and a
  rule with no feyn source gets one that names a course (decision `spec-names-no-course`).
- Amended 2026-11-05 (#565): the `origin` leaves the rules and the rule files: it tied a rule to
  a course, in three forms, no program read it, and git keeps the issue that wrote each rule.
  Without this, a contributor fills a field nothing reads, taken for the link to a decision.
