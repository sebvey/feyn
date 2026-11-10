---
date: 2026-11-10
issue: 815
status: accepted
area: spec:linear-fr
---

Without this, an agent describing a source would type it primary or secondary and write its description as one free string, so the type, which depends on the claim the source supports, turns wrong for the next claim that cites it, a weak source cannot be told from a strong one, and no program can format, read or deduplicate the description.

A source of a course of `linear-fr` is described by three closed lists, words of the lexicon of the course files: its kind, the form of the document (study, literature review, standard, survey, article, post, guide, dictionary, sales page); its control, the review it went through before publication (peers, editorial, none); and its independence from what it says (independent, interested). Primary, secondary and tertiary are not stored. The literature on classifying a source, reviewed in epic #810, holds primary and secondary as relative to the claim a source supports (Wikipedia's policy on primary, secondary and tertiary sources: « Whether a source is primary or secondary depends on context »), and the form, the control and the independence as intrinsic to the source (the item types of the Citation Style Language, Wikipedia's reliable and independent sources, SIFT). Its description is CSL fields written in YAML as Pandoc writes them (`title`, `author`, `container-title`, `issued`, `URL`, `accessed`, and the rest), in place of a free string, a link and a consultation date: a standard that Zotero and the DOI registries export, that the site formats, that the check reads and that deduplicates. Only `title`, and `URL` or `author`, are required, since a description hard to fill is filled badly (decision `form-serves-the-writer`); the CSL item type is optional, derived from the kind when absent, a mapping of the form of the course files. This replaces the type of a source, one or more of primary, secondary and marketing, and its free description.

## Options ruled out

- The three lists plus the CSL type, required: a field deduced from another.
- Primary, secondary or tertiary plus independence (settled 2026-10-30 in epic #451, never written): it stores a property of the use in the source, and cannot say that a source is weak.
- One genre mixing the form and the publisher: two properties in one word, neither checkable.
- The free string: unreadable by a program, and uneven from one source to the next.
- Home-made fields: no tool exports them, and the site would format them by hand.
