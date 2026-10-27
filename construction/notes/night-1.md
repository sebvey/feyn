# Night 1, 2026-10-27

Replaces the previous report. Not committed. PRs #1, #9, #12 and #13 are squash-merged on main (and #11, a dummy PR of S0-05); #57 and #58 are open.

## Results

| Task | Status | PR | Squash sha | Review |
|---|---|---|---|---|
| S0-01 | done (accepted) | none | none | not rerun |
| S0-02 | done | none (pushed straight to main, as the task says) | 2f1a0b2 | changes |
| S0-03 | done | #1 | 099b406dfe001eaaa199d282d0d6bfe7887c5c09 | approve |
| S0-04 | done | #9 | 94d6d43de3e97de0d9bf8480f09aaa60bf2c3a10 | approve |
| S0-05 | done | #12 | 70877da482847367167f2aa193088bd5d9374686 | approve, 2 minor findings |
| S0-06 | done | #13 | 955fe28a97427ca47127323205a407acc1efa2e6 | approve |
| S0-07 | blocked | #57 (and #58 for S1-01) | none recorded | changes |
| S1-01, S1-02, S1-03, S1-06, S1-07, S1-08, S1-11 | skipped | none | none | see below |

## Needs the maintainer

### Merges
- PR #1 (S0-03), #9 (S0-04), #12 (S0-05), #13 (S0-06) are already merged. Squash commits 099b406 (#1) and c409789 (#11) do not follow the `<type>(<area>): <summary>` title: see the S0-05 merge-settings command below.
- S0-04: issue #5 was closed by hand before PR #9 merged, as the Done when asks.

### S0-02: tree incomplete (review: changes)
The tree on main does not fully match design/02-monorepo.md. Open one PR that adds:
- `courses/parcours-po/domains/.gitkeep`, `courses/parcours-po/concepts/.gitkeep`, `courses/parcours-po/decisions/.gitkeep`, and removes `courses/parcours-po/.gitkeep`;
- `site/scripts/.gitkeep`.
Also: S0-02 was not ticked in plan/stage-0.md, and S0-01 is not either. Construction/README.md step 5 asks for a tick, so settle the checkbox convention (S0-03 to S0-06 use a "- [x] Done" bullet).

### S0-03
- Decide construction/notes/S0-03.md: the decision frontmatter key `scope` (fixed by design/09-decisions.md) is a banned word for `area`. Recommendation: rename it to `area` in the design (dedicated commit), in the seven decisions, and in `.claude/skills/decide/SKILL.md` and `decide/decision.md`. Keep `status`.
- Glossary Means column still holds a few banned words in another sense ("the published website", "illustration", "course material"). Reword if you want a strict grep to come out clean.
- README.md warning heading changed to "The expected answers of every course are visible". The root CLAUDE.md still points to construction/design/13-glossary.md, so two copies of the vocabulary can drift. README.md line 3 says "published as a site", a borderline wording.

### S0-05
- Set the repository so the squash title is the PR title and the branch is deleted at merge: `mise exec -- gh api -X PATCH repos/sebvey/feyn -f squash_merge_commit_title=PR_TITLE -f squash_merge_commit_message=PR_BODY -F delete_branch_on_merge=true`. Until then, squash commit c409789 on main reads "Tick S0-01 and S0-02 (#11)", without the convention.
- In `.claude/settings.json` the check runner path `specs/linear-course/checks/check-course` is a guess. S1-11 may need to change it.
- Two minor findings in `.claude/skills/finish/SKILL.md`: the merge command on line 46 lacks the `mise exec --` prefix; clean-up step 3 fails when `gh pr merge --delete-branch` already removed the local branch (check with `git branch --list <branch>` first).
- Process conflict: the task agent squash-merged its own dummy PR #11 (it deleted the remote branch), while construction/overnight.md line 33 says not to merge your own PR. The Done when needed a merged PR. Rule on which of the two wins.
- The skills were followed by hand from their files, not loaded as skills (they only load once on main). The `/finish` `--subject` fix has not run on a real merge yet.

### S0-06
- `ping.txt` is still on the gh-pages branch of feyn-site. Harmless; remove it if you want.
- The site-ping workflow ran from a push trigger on the PR branch, not a manual dispatch; the workflow file is gone from the PR.

### S0-07 (blocked)
See construction/notes/S0-07.md. What is done: 43 issues (#14 to #56) created for stages 1 to 4, all with milestone and labels (stage-1 16, stage-2 9, stage-3 11, stage-4 7), freeze line added to the four stage files (PR #57, refs #8).

What is not met, and what unblocks it:
- "S1-01 is closed by a merged PR" does not hold. Issue #14 is open with `state:wip` and `blocked:maintainer`; PR #58 is open and says `Refs #14`, not `Closes #14`. To unblock: read construction/notes/S1-01-distillation.md, comment on #14, remove `blocked:maintainer`, switch PR #58 to `Closes #14`, merge it. Or accept a documented deviation.
- Stage 0's done-when therefore does not hold. `/start` and `/finish` were also followed by hand, so the flow is untested. Run them as real skills on #14, or on an ungated task, then close #8 and tick S0-07.
- The old repository holds 72 ADRs (64 in maintainer/adr, 8 in maintainer/site/adr), not the 65 the plan states. All 72 are classified. Decide whether the 8 site ADRs stay in scope.
- Construction/notes/S1-01.md sits in PR #57 but belongs to PR #58. Move it.
- The plan defines no S1-10.nn tasks, so the sub-issue linking was never exercised for real (dry run only, in S0-04 and S0-07).
- The orchestrator's first report said PR #58 carried `Closes #14` and that S0-07 was done. Both statements were wrong; the PRs say `Refs`.

## Skipped and why

- S1-01: skipped by the night (depends on S0-07). The author already ran an S1-01 pass inside S0-07 (PR #58, issue #14), so reuse it rather than starting over.
- S1-02: depends on S0-07.
- S1-03: depends on S1-02.
- S1-06: depends on S1-03.
- S1-07: depends on S1-03.
- S1-08: depends on S1-03 and S1-07.
- S1-11: depends on S1-03.

Closing S0-07 (PR #57, then #58 for S1-01) unblocks S1-02, which unblocks the rest of the chain.

## What to read first in the morning

1. construction/notes/S0-07.md, then PR #58: the only blocked task, and it holds back all of stage 1.
2. construction/notes/S0-03.md: the `scope` key decision touches the design and several files.
3. PR #12 (S0-05) body and the repository merge-settings command above, before merging #57 or #58.
