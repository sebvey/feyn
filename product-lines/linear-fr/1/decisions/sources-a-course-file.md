---
date: 2026-11-10
issue: 815
status: accepted
area: spec:linear-fr
---

Without this, an agent writing a course would describe a source again in each concept that cites it, cite a source with no quote that proves the claim, and write a verification date it never checked, so a source is described and verified as many times as it is cited (a course of five concepts held 33 entries for 22 distinct sources), a claim passes with no proof behind its badge, and no reader can tell what a human has checked from what an agent posed.

The **sources** of a course of `linear-fr` are one YAML file at the root of the course, validated by a schema, since it holds only data that point to each other by ids. Each source is described once, under the key `sources`, by its id `S<n>`, unique in the course. Under a source, its **quotes** each name the claim they prove (`<concept>/<name>`, decision `claim-marked-in-the-text`), with the phrase quoted word for word and its place in the source. A source and a quote each carry, optionally, the date a human verified it, **checked**; absent, it was posed by an agent and not verified by a human; it is written by that human only, never by an agent nor by a migration, and an edit of the source or of the quote removes it, since a check verifies the form, not the truth of a quote, and courses will be written and maintained by agents. Sourcing is optional, coherence is not: marking a claim is recommended, while what is written must not lie, and a source cited without the quote that proves its claim is of no use to creation or maintenance and lets an agent cite without proof. The check fails what is incoherent (an unknown source, a sourced claim without a name or a name twice, a pair of a claim and a source without a quote, a quote naming no claim that cites its source, a value off its list, a fact, consensus or school with no source, a school with no holder, a fact or course claim with one, a source described twice) and reports, without failing, a source never cited and, per concept, its count of claims marked, sourced and checked. A course migrated to this form leaves with no source nor quote checked, and its count says so. What no source confirms is not written apart: a claim the course concludes from its sources is a course claim, those sources in its claim mark; a weak source is said by its description (decision `source-described-by-kind-control-independence`); what was read is the quote's place; a text known through another source is cited through it; a source not read is not a source; a guardrail goes in the teacher note when a competent teacher would otherwise act differently. Agents writing concepts in parallel do not write the sources file: each keeps a local file of its changes, and a reconciling agent applies them, deduplicating the sources by URL or DOI and assigning the ids, since a plain git merge of one file would collide on the ids; that reconciliation is the creator's matter, not the course form. This replaces one sources file per concept, its tables and its list of what stayed unverified.

## Options ruled out

- Markdown tables: data cut cell by cell, which no schema validates.
- Two files, the sources in YAML and what stayed unverified apart: no gain, and the second named ids in prose (decision `no-id-in-prose`).
- One file per concept: the reason of the decision it replaced, that the site and a reviewer stay in the concept folder, no longer holds once the site and the check are programs and an agent reads one more file at no cost.
- The descriptions at course level and the quotes per concept: two files for the same gain.
- A `status` field written on everything, or the verification on the source only: a field filled everywhere is filled badly, and a source and its quotes are verified separately.
- Everything optional, coherence included: a fact badge with nothing behind it. Everything required: the research blocks the writing (decision `form-serves-the-writer`).
- A free note on a source or a claim, or a published « non vérifié » badge: an id in prose no program checks, and a badge that says less than the truth.
- An id `R<n>` under `references`: it would read as a concept reference.
- The maintainer checking every source and quote during the migration, or `checked` set to the migration's date: a manual task added to a delivery, and a date that would lie.
