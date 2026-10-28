---
date: 2026-10-28
issue: 125
status: accepted
area: spec:linear-course
---

Without this, an agent would cite rules by a range "X à Y" whose content changes silently when a rule is moved or inserted, and no check could tell.

A set of rules of `PROTOCOL.md` is cited by a named group, never by a range of slugs. A group
is a `###` heading inside a family, its title then its slug in code between parentheses
(« ### Accueil (`onboarding`) »); its rules are the ones under the heading, up to the next
heading, and keep their own slugs, with no prefix. A group's slug has the form of a rule's slug
(decision `rules-named-by-slug`), except that one word is enough, and shares their namespace:
no group and no rule have the same slug. A group is cited in code after « groupe » or « group »;
the check `rule-slugs` verifies that every cited group exists and that no slug is defined twice.
This replaces the two ranges of the rule `new-or-returning-learner` (« règles
`first-message-without-tools` à `first-concept-next-message` », « la reprise,
`resume-opening-sentence` à `pending-question-retaught` »), which became groups `onboarding` and
`resume` over the same rules. A structure decision, accepted by the maintainer on 2026-10-28 (PR
#133): it changes how rules are cited, not how the teacher teaches. Neighbour: decision
`rules-named-by-slug`, distinct (it names one rule; this names a set of rules).

## Options ruled out

- Ranges of slugs « X à Y »: their content depends on the order, which `rules-named-by-slug`
  leaves free.
- Listing every slug of the set: the citing rule grows with the set and misses a rule added to it.
- A prefix on the rules of a group (`onboarding-…`): a rule that moves would change its slug.

## Consequences

- Moving a rule under another heading changes its group; a test that cites a group follows it.
- A rule inserted under a heading joins its group, as a move does; the diff shows it under the
  heading.
