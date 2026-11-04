---
date: 2026-11-03
issue: 493
status: accepted
area: spec:linear-course
---

Without this, the next reader takes `lang/fr.yaml` for a translation file (i18n) and removes it
or writes its words again in a check, the protocol or the site, which is the coupling of
`parcours-po`: a word written three times drifts.

The language is a property of the spec, declared once, `language: fr` in the `spec.yaml` of the
MAJOR; a course names none, and a course of another language follows another spec, not a
translation of this one. The words a program must recognise in a course file (the headings, the
case fields, the qualifiers, the markers, the natures, the words of a concept reference, the
source types, the typography, the word lists of the checks) are written once, in the lexicon of
the course files, `course/lexicon.yaml`, read by key by the checks, the classroom build and the
site, none of which writes them again. The words the teacher says and writes (its literal
phrases, what the learner says and the teacher reacts to, the lines and headings of learner
memory, the concept statuses) are the teacher's lexicon, `teacher/lexicon.yaml`. The two files
are cut by product (decision `spec-files-by-product`). This replaces the one file of words per
language code, loaded through the `language` of `course.yaml`, and its `site` group, whose
labels no engine read: the site's labels are born in `site-builder/` with its engine.

## Options ruled out

- Deleting the file: its words would live in three copies, the checks, the protocol and the site.
- The name `vocabulary`: the glossary uses it for the notions a course teaches (idea #367).
- The name `labels`: a reserved term of the glossary.
- Keeping the `language` parameter as documentation: it had one value and no consumer, and a
  thing without a consumer is premature (`docs/vision.md`).

## Consequences

- `language-policy` is amended: the paragraph on the translation of the protocol as a spec MINOR
  is superseded; the protocol of `linear-course` stays French.
- The protocol keeps its `{phrases.*}` keys, which the classroom build substitutes; the move of
  the groups changed no rule text.
- `courses/parcours-po/course.yaml` keeps its `language` key until its migration (#487);
  `course-yaml` accepts it and ignores it.
- Amended 2026-11-04 (#515): the `{phrases.*}` keys stay, as the maintainer answered open
  question 6 of epic #222 on 2026-11-03 once a classroom was built: writing the phrases in French
  in the protocol would rewrite every placeholder, and the spots that read worse than a key are
  the build's to fix. Without this, a contributor would read the question as still open and
  write the phrases of a new rule in French.
