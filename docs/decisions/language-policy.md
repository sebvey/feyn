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
spec, declared once (`language: fr` in the `spec.yaml` of its MAJOR), and so of the courses that
follow it, not of the repository. A course of another language follows another spec, not a
translation of this one (decision `lexicon-not-language-pack`).

| English | French (for a French spec) |
|---|---|
| code, skills, agent workflows, CI workflows, scripts | `concept.md`, `teaching.md`, `sources.md` |
| root `CLAUDE.md`, teacher template | course glossary, storyline, the course's `plan.md` and `CHANGELOG.md` |
| the spec directives, the spec's READMEs, repository docs, decisions, issues, labels | diagram text, the site's labels |
| file and folder names, `course.yaml` keys, the keys of the lexicons | what the teacher says, the words of the lexicons (`course/lexicon.yaml`, `teacher/lexicon.yaml`) |

An issue, a PR or a decision in English that quotes the course quotes it in French and never
translates it. French text uses no em-dashes and no arrows. What the teacher says to the
learner comes from the course and the teacher's lexicon.

A maintainer phrasing quoted in a skill description's "Use for" may be in French, as a quote
from course material is; everything else in a skill stays in English.

One bounded exception: the protocol of `linear-course` is written in French. The old teacher
was instructed and corrected in French, and its v1 is a base inherited from `parcours-po`,
changed by user story; a change of language at the same time would leave a drift with no known
cause. `linear-course` is a French spec: its protocol is not translated, and a teacher or a
course of another language follows another spec, with its own protocol and lexicons. The
phrases the learner sees are literal in the teacher's lexicon, `teacher/lexicon.yaml`.

## Consequences

- A course in another language follows a spec of that language, with its own files and
  lexicons; nothing else in the repository is translated.
- Amended 2026-10-29 (#246): a maintainer phrasing quoted in a skill description's "Use for"
  may be in French, as a quote from course material is; everything else in a skill stays in
  English.
- Amended 2026-10-30 (#218): the protocol of `linear-course` 1 does not switch to English at a
  stage: its v1 is a base inherited from `parcours-po`, in French, changed by user story, and the
  exception stays until a teacher or a course of another language needs the translation, a spec
  MINOR. Issue #38 is closed not planned; the translation is a future user story of epic #222.
- Amended 2026-11-03 (#493): the language is a property of the spec, declared once in its
  `spec.yaml`, no longer of a course in `course.yaml`, and a course of another language is
  another spec, not a translation (decision `lexicon-not-language-pack`). This supersedes the
  paragraph on the translation of the protocol as a spec MINOR, A/B-tested on two classrooms, and
  the same point of the amendment of 2026-10-30: the protocol of `linear-course` stays French. The
  language pack becomes the two lexicons of the spec (maintainer, 2026-11-03, idea #492).
