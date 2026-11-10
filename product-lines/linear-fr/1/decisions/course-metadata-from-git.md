---
date: 2026-11-11
issue: 809
status: accepted
area: spec:linear-fr
---

Without this, an agent giving a course its metadata would write its creation and last-change dates in `course.yaml` by hand, so that the last-change date drifts at the first change that forgets it; or would write its licence in free text, which no check can hold; or would build the site from a clone of one commit, whose only commit seems to create every file, so that the deployed site gives the date of the last change as the course's creation while the test passes on a full clone.

What derives from nothing is written in the course, what derives from its history is computed at build. `course.yaml` names, both mandatory, the course's maintainers, `maintainers`, a list of at least one name, and its licence, `license`, one identifier of the SPDX licence list, written as the list writes it, which the checks of the course hold against the list itself, read from a package of the spec directives rather than copied into the spec. The site build computes the rest from git and the course's changelog, never from a key a human writes: the creation, the date of the first commit of `course.yaml`, followed across the moves of the course folder, so that a course moved within the repository keeps the day it was created; the last update, the date of the last commit on the course folder; both the committer's date, the day a change landed; and the version, the latest release of the changelog, or none. A date git cannot give (a folder outside git or not yet committed, a shallow clone) is no date, never the day of the build nor the oldest commit at hand; the workflows that build the site therefore check out the whole history. The site shows the four with the version on every page.

## Options ruled out

- The dates written in `course.yaml`: the last-change date would be forgotten at the first change.
- The maintainer alone, the licence and the dates later: the licence and the dates would wait for a second pass on every course.
- A licence in free text: no check can tell a licence from a typo; the SPDX list is known and closed.
- The SPDX list copied into the course schema as a closed list: seven hundred identifiers to keep in line with a list that moves, where a package already keeps it.
- The names of schema.org (`maintainer`, `dateCreated`): they serve only a JSON-LD output, which the maintainer ruled out.
- The creation as the first commit on the course folder as it is named today: a course moved within the repository would take the day of its move as its creation.
- A shallow clone's oldest commit taken as the creation: it is the clone's edge, not the course's first commit, and the test passing on a full clone would not see it.

## Consequences

- Every course writes `maintainers` and `license`; a course without them, or with a licence off the SPDX list, fails its checks and blocks.
- The spec directives carry one more package, the SPDX licence list (decision `checks-use-ajv-and-yaml`).
- A build of the site from a clone that is not whole gives a course with no dates rather than wrong ones.
