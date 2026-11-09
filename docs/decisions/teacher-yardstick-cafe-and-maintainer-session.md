---
date: 2026-11-09
issue: 763
status: accepted
area: repo
---

Without this, a contributor who changes what is expected of the teacher would either run the fresh tests at each PR, on test scenarios written for a course form that is gone, spending 0.5 to 2 USD a scenario on a noisy verdict (#509), or land the change with no proof that the teacher still builds and teaches; and an agent reading the purpose would still refuse or set aside a work item on the teacher's behaviour, the teacher being frozen.

The teacher is back: it is kept up to date with the spec and the course, and work items work its behaviour. A change of what is expected of the teacher is proven in two places. At each PR that makes one, the teacher is built on the bench course `product-lines/linear-fr/1/course/samples/cafe/` and `teacher-builder/test-build` passes. At the PR that lands it on `main` (a story's PR, or the epic PR for a story of an epic), the maintainer plays a teaching session on the bench course and says whether it is good. The fresh tests, their test scenarios and their harness are neither run nor rewritten for now: the criteria by which a protocol rule is judged stay in the spec, and the maintainer applies them in that session. They come back when the protocol is stable or when a second teacher implementation must be compared; then the test scenarios and the criteria are in the spec, tied to the bench course, and the harness is in the teacher implementation, so that a second implementation is judged on the same scenarios, as the spec of the site fixes and tests what does not depend on its engine. The yardstick of a change of `linear-fr` stays: the bench course follows it in the same PR and its checks pass on it. This supersedes decision `teacher-frozen-until-the-protocol-brainstorm`, whose brainstorm ran with the maintainer on 2026-11-08 and 09 (epic #757), and applies to `docs/vision.md` ("The yardstick"), the project instructions and the reading of an item against the purpose. Decided by the maintainer on 2026-11-09.

## Options ruled out

- Fresh tests at each PR that changes what is expected of the teacher: they cost 0.5 to 2 USD a scenario, their verdict is noisy (#509), and their scenarios must first be rewritten for the current course form, while the spec of the teacher is still being worked.
- Fresh tests at the PR that lands on `main` only: the same rewrite of the scenarios and a restart of the harness come first.
- For the target, the whole proof in the teacher implementation: each implementation would rewrite its own scenarios, and two could not be compared.
- For the target, the proof cut as it is today between the spec and `teacher-builder/`: the proof of a behaviour would depend on Claude Code.
