---
date: 2026-10-28
issue: 125
status: accepted
area: spec:linear-course
---

Without this, an agent would cite rules by a range "X à Y" whose content changes silently when a rule is moved or inserted, and no check could tell.

A set of rules of the protocol is cited by a named group, never by a range of slugs. A group's rules keep their own slugs, with no prefix. A group's slug has the form of a rule's slug (decision `rules-named-by-slug`), except that one word is enough, and shares their namespace: no group and no rule have the same slug. A group is cited in code after « groupe » or « group »; the check `rule-slugs` verifies that every cited group exists and that no slug is defined twice. Since the protocol's rules are in `teacher/rules.yaml` (extracted by epic #450, decision `spec-files-by-product`), a group is data in that file, its slug as its `id`, its rules and their order included, what it is for in its `purpose` field; a family is the group whose `id` is its category, and `teacher/README.md` holds no group. A group may declare the category and method of its rules once (decision `rules-with-level-and-method`). This replaces the two ranges of slugs that the protocol's rule telling a new learner from a returning one cited, one over the rules of the onboarding and one over those of the resume, which became two groups over the same rules. A structure decision, accepted by the maintainer on 2026-10-28 (PR #133): it changes how rules are cited, not how the teacher teaches. Neighbour: decision `rules-named-by-slug`, distinct (it names one rule; this names a set of rules).

## Options ruled out

- Ranges of slugs « X à Y »: their content depends on the order, which `rules-named-by-slug` leaves free.
- Listing every slug of the set: the citing rule grows with the set and misses a rule added to it.
- A prefix on the rules of a group (`onboarding-…`): a rule that moves would change its slug.

## Consequences

- Moving a rule to another group changes its group; a test that cites a group follows it.
- A rule inserted in a group joins it, as a move does; the diff shows it in that group.
- Amended 2026-11-05 (#554): the protocol's groups and families are data in `teacher/rules.yaml` only, where a group was a `###` heading of `teacher/README.md` and a family a `##` section; `teacher/README.md` describes how a group is written and holds none (epic #450).
