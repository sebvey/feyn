---
date: 2026-11-10
issue: 815
status: accepted
area: spec:linear-fr
---

Without this, an agent writing a course would write an id in a sentence (« déduit de S2 et S3 », « voir 1/eau-90-96 »), so a program could check that id only by guessing where an id starts in prose (« S1 » can be a semester), a source renumbered would leave the sentence pointing at another one, and the reader of the site would read an id meant for a program.

In a course of `linear-fr`, an id (a source's, a claim's) is written only where a program reads it without guessing: in the destination and the title of a claim mark, and in the keys and the fields of the sources file that join them (decisions `claim-marked-in-the-text`, `sources-a-course-file`). Prose names a source by what a reader understands, its author, its title, its kind, and a claim by its words. A concept reference is not such an id: it is the course's navigation, read by its own grammar, and stays plain text. A principle posed by the maintainer, a decision of the spec, the most local area it binds, not a rule of a course: it binds the writing of the spec's forms as much as a course.

## Options ruled out

- A rule of the course rules alone: it binds a course, not the writing of the spec, whose next form would put an id in prose again.
- A decision of the spec directives: they hold only what their tools read, and no tool of theirs reads a course's ids.
- A free note field where an id may be written: an id in prose by another name.
