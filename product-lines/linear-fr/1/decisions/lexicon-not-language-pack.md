---
date: 2026-11-03
issue: 493
status: accepted
area: spec:linear-fr
---

Without this, the next reader takes `lang/fr.yaml` for a translation file (i18n) and removes it or writes its words again in a check, the protocol or the site, which is the coupling of the founding course: a word written three times drifts.

The language is a property of the spec, declared once, `language: fr` in the `spec.yaml` of the MAJOR; a course names none, and a course of another language follows another spec, not a translation of this one. The words a program must recognise in a course file (the headings, the kind words of the headings, the case fields, the markers, the natures, the words of a concept reference, the source types, the typography, the word lists of the checks) are written once, in the lexicon of the course files, `course/lexicon.yaml`, read by key by the checks, the teacher build and the site, none of which writes them again. The words the teacher says and writes (its literal phrases, what the learner says and the teacher reacts to, the lines and headings of learner memory, the concept statuses) are the teacher's lexicon, `products/teacher/lexicon.yaml`. The words and short texts the site shows for every course of the spec and no course file holds (the words of its navigation and headings that name a thing of the course, the words that come before a value, the intro lines of its stance columns and of its claims) are the site's lexicon, `products/site/lexicon.yaml`, read by key by the site build, which takes from the lexicon of the course files the headings of the course files it shows; the words of the site's interface, which name no thing of the course, are `site-builder/`'s. The files are cut by the course and by product (decision `spec-files-by-product`). This replaces the one file of words per language code, loaded through the `language` of `course.yaml`, and its `site` group, whose labels no engine read.

## Options ruled out

- Deleting the file: its words would live in three copies, the checks, the protocol and the site.
- The name `vocabulary`: the glossary uses it for the notions a course teaches (idea #367).
- The name `labels`: a reserved term of the glossary.
- Keeping the `language` parameter as documentation: it had one value and no consumer, and a thing without a consumer is premature (`docs/vision.md`).

## Consequences

- `language-policy` is amended: the paragraph on the translation of the protocol as a spec MINOR is superseded; the protocol of `linear-fr` stays French.
- The protocol keeps its `{phrases.*}` keys, which the teacher build substitutes; the move of the groups changed no rule text.
- A `language` key in `course.yaml` fails `course-yaml` as an unknown field.
- Amended 2026-11-04 (#521): `course-yaml` no longer accepts and ignores a `language` key, a tolerance kept for `courses/parcours-po/course.yaml` until its migration; the course is archived instead (decision `parcours-po-archived`).
- Amended 2026-11-04 (#515): the `{phrases.*}` keys stay, as the maintainer answered open question 6 of epic #222 on 2026-11-03 once a classroom was built: writing the phrases in French in the protocol would rewrite every placeholder, and the spots that read worse than a key are the build's to fix. Without this, a contributor would read the question as still open and write the phrases of a new rule in French.
- Amended 2026-11-07 (#695): the site's words that name a thing of the course move into the spec, in a third lexicon, `products/site/lexicon.yaml`, where the decision left them to `site-builder/` and its engine: the reason, that no engine read the old `site` group, no longer holds once the site build of epic #598 reads the spec, and words written in the engine would leave the spec of the courses they name (epic #598, Material points 13 and 14). The lexicon of the course files stays the words recognised in a course file. Without this, the site build would write « Prérequis » or « Notions voisines » in its engine, a copy of the spec's words that drifts.
- Amended 2026-11-07 (#715): the lexicon of the course files no longer holds the three words a supplementary case carried, which gave it a kind (decision `cases-name-their-misconceptions`); the frozen teacher, whose rules still cite them, finds them in its own lexicon with their values unchanged, beside the other words of the old form it cites, and the kind word of a case's heading joins the kind words of the headings.
- Amended 2026-11-08 (#730): the language of a spec is also in its name, which ends with it (`linear-fr`, decision `product-line-vocabulary`): a course of another language follows another spec, which its name tells apart. The renaming of the spec follows in epic #729. Without this, a creator picking a spec for a course in another language would take the one whose name hides its language.
