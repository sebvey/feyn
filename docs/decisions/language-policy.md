---
date: 2026-10-27
issue: null
status: accepted
area: repo
---

Without this, an agent would translate a French quote of the course into English, write a
skill or a decision in French because the course is French, or write a course file in English
because the repository is.

English everywhere, except what touches French course files. Language is a property of a
course (`language: fr` in `course.yaml`), not of the repository.

| English | French (for a French course) |
|---|---|
| code, skills, agent workflows, CI workflows, scripts | `concept.md`, `teaching.md`, `sources.md` |
| root `CLAUDE.md`, teacher template | course glossary, storyline, the course's `plan.md` and `CHANGELOG.md` |
| `SPEC.md`, repository docs, decisions, issues, labels | diagram text, site labels (through the language pack) |
| file and folder names, `course.yaml` keys | what the teacher says, the literal phrases of the language pack |

An issue, a PR or a decision in English that quotes the course quotes it in French and never
translates it. French text uses no em-dashes and no arrows. What the teacher says to the
learner comes from the course and the language pack.

One bounded exception: the protocol of `linear-course` is written in French first. The old
teacher was instructed and corrected in French, and stages 1 and 2 already change the structure
of its instructions and its harness; a change of language at the same time would leave a drift
with no known cause. The protocol switches to English at stage 2, once the fresh tests are
green: a translation that changes no protocol rule, a spec MINOR, accepted when every test
scenario gives the same result on two classrooms built from the two branches (A/B). The phrases
the learner sees are literal in the language pack from the start, so the switch touches
instructions only.

## Consequences

- A course in another language brings its own files and a language pack; nothing else in the
  repository is translated.
- Amended 2026-10-29 (#246): a maintainer phrasing quoted in a skill description's "Use for"
  may be in French, as a quote from course material is; everything else in a skill stays in
  English.
