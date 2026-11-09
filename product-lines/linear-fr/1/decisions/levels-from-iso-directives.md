---
date: 2026-10-31
issue: 322
status: accepted
area: spec:linear-fr
---

Without this, an agent would take the levels of a rule from the IETF keywords (RFC 2119), which have no French form, and give the protocol, written in French, levels of its own to keep aligned with those of the English rules.

The level of a rule of a course is one of the three of ISO/IEC Directives Part 2, 9th edition (2021), clause 7, the one source with official English and French forms: requirement, recommendation, permission, each with its verbal forms. The level is a field of the rule, a classification this spec declares for the rules of a course, never a word parsed from its text: the verb of a rule of the spec matches it, and the field is authoritative. Possibility and capability ("can", « peut ») are not a level. The protocol rules of the teacher have no level: written « Le professeur… », and a permission is the limit of the behaviour it relaxes, in its criterion (`products/teacher/README.md`).

## Options ruled out

- The IETF keywords (RFC 2119, RFC 8174) or the W3C alone: they have no French form, and name keywords, not the kinds of provision a classification needs.
- IETF for the English rules and ISO for the French protocol: two sources to keep aligned.
- A level read from the verb of the text: a field can be selected and checked, a verb cannot.

## Consequences

- The bump table of this spec is written in levels, in its README: a recommendation of `course/rules.yaml` made a requirement is a MAJOR (decision `versioned-objects-and-spec-layout`).
- Amended 2026-11-09 (#765): the decision moves from the spec directives to this spec (`decisions/` of `linear-fr`, MAJOR 1), which holds it now: the directives keep only what their tools read (decision `directives-hold-what-the-tools-read`), and the level is a classification this spec declares for the rules of a course (`lists.classifications.course` of its manifest), no longer a field of the directives' rule model. Without this, a contributor writing a second spec would read the levels as the directives' and give its rules a level they do not need, or read the bump of a change to the directives in words of levels that only this spec declares.
- Amended 2026-11-09 (#767): the protocol rules of the teacher no longer carry a level: written « Le professeur… », a permission becomes the limit of the behaviour it relaxes (epic #757, item 6); the levels are the course's alone.
