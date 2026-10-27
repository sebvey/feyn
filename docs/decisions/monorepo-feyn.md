---
date: 2026-10-27
issue: null
status: accepted
area: repo
---

Without this, an agent would open a new repository for a second course or a second spec,
duplicate the teacher and the site engine into each one, and keep the site rewritten by hand
from the course, as `parcours-po` and `parcours-po-website` did.

One public repository, `sebvey/feyn`, holds the specs, the courses, the teacher, the site
engine, the agentic layer and the decisions; it is the only repository we work in. The site
builds are deployed to a separate artifact repository, `sebvey/feyn-site` (branch `gh-pages`
only, never edited by hand). `feyn` was created empty: the git history of `parcours-po` does
not carry over. The two old repositories are frozen, then archived; they are read, never
written to.

The root holds two files, `CLAUDE.md` and `README.md`, plus dotfiles; `docs/` holds three
things, `decisions/`, `glossary.md` and `contributing.md`. Anything more at the root or in
`docs/` needs a decision here. A document that describes one area lives in that area's folder
(`site/docs/`, `teacher/README.md`), and there is no `CLAUDE.md` per folder: skills carry the
detail.

## Options ruled out

- Renaming `parcours-po` into `feyn`: it would carry over a history and a layout we are leaving.
- One repository per course: the spec, the teacher and the site engine would be duplicated
  or pinned across repositories, which is the coupling we are removing.
- Serving the site from `feyn`'s own Pages: see decision `public-repo-for-now`.

## Consequences

- A change that spans a spec and a course is one PR, reviewed once.
- Two courses evolve in parallel on branches touching `courses/a/` and `courses/b/`, without
  conflict.
