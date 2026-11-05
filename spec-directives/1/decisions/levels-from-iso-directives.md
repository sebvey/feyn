---
date: 2026-10-31
issue: 322
status: accepted
area: spec-directives
---

Without this, an agent would take the levels of a rule from the IETF keywords (RFC 2119), which
have no French form, and give the protocol, written in French, levels of its own to keep
aligned with those of the English rules.

The level of a rule is one of the three of ISO/IEC Directives Part 2, 9th edition (2021), clause
7, the one source with official English and French forms: requirement, recommendation,
permission, each with its verbal forms. The level is a field of the rule, never a word parsed
from its text: the verb of a rule of the spec matches it, and the field is authoritative. "must"
is never used for a requirement, which ISO keeps for external constraints (7.6); possibility
and capability ("can", « peut ») are not a level. A rule of the protocol is a prompt to the
teacher, in « tu », at the imperative: its level is the field alone, the imperative counting as
a requirement and « peut » as a permission. The French version of clause 7 grounds it: there the
infinitive, sometimes the imperative, expresses a requirement in procedures and test methods,
and « pouvoir » serves both permission (table 5) and possibility (table 6) (read on 2026-10-30).

## Options ruled out

- The IETF keywords (RFC 2119, RFC 8174) or the W3C alone: they have no French form, and name
  keywords, not the kinds of provision a classification needs.
- IETF for the English rules and ISO for the French protocol: two sources to keep aligned.
- A level read from the verb of the text: a field can be selected and checked, a verb cannot.

## Consequences

- The bump table of a spec is written in levels: a recommendation of `course/rules.yaml` made a
  requirement is a MAJOR (decision `versioned-objects-and-spec-layout`).
