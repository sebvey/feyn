---
date: 2026-11-04
issue: 521
status: accepted
area: repo
---

Without this, a contributor who changes `linear-course` would have to carry `parcours-po` along
or leave it failing `check-course`, since it declares the same spec MAJOR as `po-essai`; or,
finding `courses/parcours-po/` gone, would conclude that the founding course, its sources and
its cases are lost, when an issue or a decision cites one of its paths.

`courses/parcours-po/` (the founding course, 18 concepts and 2 annexes) is removed from the
tree on 2026-11-04. It is archived at the tag `parcours-po/v0-fondateur`, which points at a
commit of `main` that holds it, set before the merge:
`git show parcours-po/v0-fondateur:courses/parcours-po/<path>` prints a file, and
`git ls-tree -r --name-only parcours-po/v0-fondateur courses/parcours-po/` lists them. A path `courses/parcours-po/<path>` cited in an issue, a decision or a spec file is
read there. The archived course is the source its re-creation reads through the creation
path of the spec, concept by concept (epic #520), not a course of the tree: no check, no build
and no policy reads it. `po-essai` stays the bench course every spec change is tried on. The
precedent is decision `construction-in-history` (a folder removed, its files read in the history
at a sha); a tag replaces the sha here, since the re-creation reads the course for months.

## Options ruled out

- Migrating it at each change of the spec (epic #487): a mechanical transformation of 18
  concepts into a form the spec is replacing; maintaining it in the meantime cost as much.
- Kept frozen in the tree: it would fail `check-course` for months, and a change that makes it
  false would still have to correct it (decision `pr-corrects-what-it-makes-false`).
- Moved to a folder `archive/` in the tree: every tool that reads `courses/` would have to
  ignore it, and an archive in the tree is still read and searched as if it were current.

## Consequences

- The tag is set by the maintainer on `main` before the merge of the PR that removes the folder
  (#521).
- `course-yaml` no longer accepts a `language` key in `course.yaml`, a tolerance kept for
  `parcours-po` alone (decision `lexicon-not-language-pack`).
- Epic #520 holds the judgement calls made on `po-essai`, which #487 held
  (`docs/contributing.md`, "Policies"); when the course is re-created, this decision is amended
  in place to say so, and from which tag.
