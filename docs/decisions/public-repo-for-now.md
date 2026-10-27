---
date: 2026-10-27
issue: null
status: accepted
area: repo
---

Without this, an agent would make `feyn` private to hide the teacher-only files, losing GitHub
Pages, rulesets and unlimited Actions minutes on the Free plan, or would serve the site from
`feyn`'s own Pages, an address that a later switch to private would break.

`feyn` is public for now. Its teacher-only files (expected answers, common mistakes,
follow-ups) can be read by anyone: accepted for a beta with trusted testers, and said at the top
of `README.md`. Even public, the site is deployed to the artifact repository `feyn-site`, never
from `feyn`, so the site address survives a change of visibility.

The day unknown learners arrive, `feyn` switches to private: one click. It then loses rulesets
and `main` protection, which the discipline of the command skills replaces, and keeps an
Actions quota (2000 minutes a month) that is plenty for the checks. Issues and unlimited
collaborators stay on both sides.

## Consequences

- No secret, key or learner memory is ever committed to `feyn`; the classroom, with learner
  memory, is built outside the repository.
- A learner who wants to learn from the course is told not to read `teaching.md`.
