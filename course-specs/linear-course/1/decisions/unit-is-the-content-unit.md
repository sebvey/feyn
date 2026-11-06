---
date: 2026-11-06
issue: 630
status: accepted
area: spec:linear-course
---

Without this, an agent writing a concept would write the matter of each teaching message three times, in the file the site built, again in the explanation of each case of a file only the teacher read and a third time in the prose instructions that cut the concept into messages, so the three copies drift (an explanation repeating half or more of the text the site built, an item of « Pièges » restating a common mistake), and the site, which builds that file whole, publishes whatever the writer left there that was meant for the teacher.

The content of a course of `linear-course` is written once, by **unit**: one teacher message, one leaf of a concept's tree. A concept is one file, its **concept file** `concept.md`: a head, its **sections** and their units, a foot. A unit is one block of labelled fields (its matter, its anchor, its question, its expected answer, its misconceptions with their follow-ups, its landmarks, its instruction), followed by its supplementary cases. Each field is **published** or **unpublished**, a property the spec fixes for the field, never one a course writes. The site build is closed by default: it renders the published fields and parts only, and nothing it does not know; the check refuses a line of a unit outside a known field, so an omission publishes nothing more, it fails. What a build can compose is not written: the objective comes from the course map, « Pièges » from the misconceptions. The form of the concept file (its parts, the fields of a unit, their order, their presence, published or not, their readers, the length of a unit) is data of the spec, `course/form.yaml`, which names the words by their key in the lexicon of the course files and holds none of them; the checks read it, and the site build will. An annex is a concept file of the same form. This replaces the split of a concept into a file the site built and a file only the teacher read (decision `reader-facing-and-teacher-only-files`), whose filter was a file boundary: whatever sat in the first was built.

## Options ruled out

- Two files joined by the unit id, one published and one for the teacher: each unit written in two places, kept aligned by hand.
- One file per unit: four times the files, and a concept no longer read in one go.
- A third level of ids: two levels suffice once the leaf is a message.
- The form in prose in the spec's description: several programs read the form, and prose would write it once per reader.
- The words in `course/form.yaml`: a spec of another language would copy the structure to change the words.
- Publishing the question of a unit: the site is a secondary support, not an exercise book.

## Consequences

- A creator writes a unit in one place and in one step; a unit that misses a mandatory field, or holds a line outside a field, fails the check at once: a concept half written fails, which is wanted.
- The length of a unit is a reported signal, not an error: the check counts its matter, anchor and question in lines of 100 characters and reports a unit above twelve.
- `sources.md` traces the published fields (decision `sources-trace-the-concept`); an unpublished field states nothing the published ones do not.
- The frozen protocol still cites the words of the old form (its instructions, its bank, its drawing instruction, the fields of a case), kept apart from the lexicon of the course files until the protocol is brought back up to date (decision `teacher-frozen-until-the-protocol-brainstorm`).
