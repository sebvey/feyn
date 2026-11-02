---
date: 2026-11-02
issue: 436
status: accepted
area: repo
---

Without this, a contributor would leave in the repository a statement its PR makes false, a
live decision included, with a reason ("a live decision changes through `/feyn-decision`") or
with a separate issue to open, and the reviewer would hold it non-blocking, so the merge lands
a repository that contradicts itself and the next agent acts on the false statement (PR #433,
two live decisions it made false, handed over first with them).

A change corrects in its own PR every statement it makes false, anywhere in the repository: a
skill, a reference, a doc, a comment in a script, a live decision. It is never left with a
reason, never sent to a separate issue. A live decision is corrected through `/feyn-decision`
step 6 (a mechanism in place, a change of scope with its "Amended" line) or superseded through
its step 5 when its choice no longer holds; the contributor of a delivery does it, being one of
that skill's callers. A change to a live decision's choice, not to a mechanism it names, goes
up into the PR's Review first, as the maintainer's to accept. History is not a statement to
correct: a superseded decision and a released CHANGELOG entry stay as they are (decision
`decision-format`). A statement made false and left in the repository is a blocking finding of
the fresh-agent review; a run whose result leaves one is rerun, not handed over.

## Options ruled out

- A separate issue for each statement made false: between the merge and that issue's
  delivery, `main` holds the false statement, and an agent reads it as true (a decision is read
  as what holds today); that issue also costs a cycle for a correction the PR's author is
  best placed to make, having just changed what the statement describes.
- A statement left with a reason, as a non-blocking finding: the reason does not travel with
  the statement, and the reader of the file sees only the false text.
