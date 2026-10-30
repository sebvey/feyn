---
date: 2026-10-31
issue: 322
status: accepted
area: spec:linear-course
---

Without this, an agent would define a rule's obligation by the check that verifies it, as
`SPEC.md:15-18` does ("Mandatory means an element's absence fails the check named"), so it
would write that a rule "fails" a check that blocks nothing (`typography`, `SPEC.md:61-62`),
find no way to write a recommendation verified by review, let a verdict of agents
(taught-check) block the CI although agents do not give the same verdict twice, and call a
course conforming because it passes the blocking checks (working notes D1, D14).

The unit of `linear-course` is the **rule**, held as data apart from the prose that describes
it. A rule has an `id` (a slug, decision `rules-named-by-slug`), a `level`, a `category`, a
`method`, a `check` (optional: the check that implements the method, when one exists), a `why`
(optional, on any rule: what a competent model does without the rule, as observed in a test
or a teaching session) and a `text`; a rule of the protocol also has an `origin` and its group
and order. `category` and `method` can be declared once for a group of rules and overridden
by a rule. The level is a field, never a word parsed from the text: the verb of the text
matches it, and the field is authoritative. Three attributes are kept apart, which the spec
fused: the **level** of a rule (how binding), its **method** (how one knows it holds), and the
**severity** of a check's failure, which is not declared but derived. This replaces the
definition of "Mandatory" and "Optional" by the check (`SPEC.md:15-18`) and the undefined
intermediate levels ("as a rule" `SPEC.md:129`, "expected" 178, "usually" 452, "by default"
581). The protocol enters the same model (D8), its slugs as ids. The D numbers cite the
maintainer's working notes on the frame (2026-10-30, outside the repository), transcribed here
by #322 with their reasons, options ruled out and source checks.

**Levels**, from ISO/IEC Directives Part 2 (2021), clause 7, the one source with official
English and French forms:

| Level | English | French |
|---|---|---|
| requirement | "shall", "shall not" | « doit », « ne doit pas » |
| recommendation | "should", "should not" | « il convient de », « il convient de ne pas » |
| permission | "may" (never in the negative) | « peut » |

"must" is never used for a requirement: ISO keeps it for external constraints (7.6).
Possibility and capability ("can", « peut ») are not a level. A rule of the protocol is a
prompt to the teacher, in « tu », at the imperative: there the level is the field alone, the
imperative counts as a requirement and « peut » as a permission; "the verb matches the level"
holds for the rules of the spec only (D10).

**Methods**, the closed list of ISO/IEC/IEEE 29148:2018 (D3). A rule always states its method,
even before its check exists; a rule that no method could verify is rewritten or removed.

| Method | What it does | What implements it in feyn |
|---|---|---|
| test | a deterministic run says yes or no | the scripts of `checks/` |
| analysis | reasoning over the whole course | taught-check (an agent workflow) |
| inspection | a reading, by a human or an agent | the review |
| demonstration | the system runs and is observed | the fresh tests of the teacher |

**Severity** (D1, D5). A check blocks when it verifies a requirement by test; in every other
case it reports. A check verifies rules of one category and one level, or it is split; its
category and level follow from its rules, and the check itself carries only its
implementation (a script or an agent).

**Categories** (D12), a closed list, extended when needed. For a course:

| Category | The question it asks |
|---|---|
| `structure` | can the builds read the course? (files, fields, identifiers that resolve) |
| `pedagogy` | what is taught, in what order, what is asked of the learner? |
| `writing` | does the text follow its conventions? |
| `sources` | does every claim trace back to a source? |
| `diagrams` | do the drawings follow their contract? |

For a rule of the protocol, the category is its family (the nine families): no second
taxonomy without a use.

**Conformance clause** (D14). Two classes of products: the **course**, its diagrams included,
and the **teacher**. The language pack is not a product: it lives in the spec's folder, written
by the spec's authors, and its consistency is the spec's own (`check-spec`,
`language-pack-keys`): a rule on the pack sits with the spec's own rules, never in
`rules/course.yaml`, and counts toward no course's conformance. A course conforms when it holds every requirement of
`rules/course.yaml`, whatever its method; the blocking checks are a necessary condition, not a
sufficient one; the review and taught-check do the rest, and a course tag certifies the whole.
A teacher conforms when it holds every requirement of `rules/protocol.yaml`; the method of a
rule of the protocol is demonstration, by the fresh tests (D8). Recommendations are outside conformance (the ISO sense of "should"). The word
"conformity" (ISO) stays; "conformance clause" names the section, after the W3C QA Framework,
whose idea ISO shares.

**Normative references** of the frame, a dated list limited to the standards a rule depends
on: ISO/IEC Directives Part 2, 9th edition (2021); ISO/IEC/IEEE 29148:2018; SemVer 2.0.0;
YAML 1.2.2; JSON Schema 2020-12. #318 adds the others as it extracts the rules (CommonMark and
GFM tables, SVG, WCAG 2.2, CLDR, ISO 639-1, ISO 8601).

## Options ruled out

- The IETF keywords (RFC 2119, RFC 8174) or the W3C alone: they have no French form, and name
  keywords, not the kinds of provision a classification needs (D2).
- IETF for the English spec and ISO for the French protocol: two sources to keep aligned (D2).
- Renaming the two check families: the second standards run found no normative ground; the
  families give way to the attributes instead (D1).
- "taught-check" as a method: it is the name of a check of the repository, not a method (D3).
- A rule as a sentence of prose, with no identity: 29148 makes the requirement the unit, with
  an identifier and attributes that a test references; the protocol already works so (decision
  `rules-named-by-slug`, check `rule-slugs`) (D4).
- The protocol kept apart from this model: no build exists yet, so joining costs nothing, and
  apart it would leave two models of a rule (D8).
- A level read from the verb of the text: a field can be selected and checked, a verb cannot
  (D4).
- A check over two categories or two levels: a course author could not run the `pedagogy`
  checks without the `writing` ones, and a check over a "shall" and a "should" has no severity
  (D5; the convention of Clippy's groups, Ruff's families, pytest's markers).
- `progression` for `pedagogy`: the contract of a case is pedagogical without being an order
  (D12).
- JSON Schema draft-07, ajv's default: 2020-12 is retained, read by `Ajv2020` (D14).

## Sources checked

- ISO/IEC Directives Part 2, 9th edition (2021), French version published by the IEC, clause 7,
  tables 3 to 6, read on 2026-10-30. The infinitive, sometimes the imperative, expresses
  requirements in French in procedures and test methods, which grounds the imperative of the
  protocol as a requirement. French uses « pouvoir » for both permission (table 5) and
  possibility (table 6).
- ISO/IEC/IEEE 29148:2018 is in force (BSI); its text is paid and was not read. The list of
  methods and their definitions agree across several secondary sources (INCOSE, the SysML
  profile, practitioners' guides), enough for this decision.
- ajv applies draft-07 by default; 2020-12 needs the class `Ajv2020` (`ajv/dist/2020`), and one
  Ajv object does not mix the two (2026-10-30).

## Consequences

- `concept-folder` is split: its structure part stays, its cases part becomes a `pedagogy`
  check (D12). Selecting a category crosses implementations: `pedagogy` runs `glossary-order`
  and taught-check.
- `check-spec` verifies the rule files: required fields, closed lists, one category and one
  level per check.
- The bump table of the spec is written in levels: a recommendation of `rules/course.yaml`
  made a requirement is a MAJOR (decision `versioned-objects-and-spec-layout`, amended).
- No teacher conforms today, since no fresh test exists: that is the target of #222.
- In French, « schéma » means a drawing or a JSON Schema; the repository, in English, says
  `diagram` and `schema`.
