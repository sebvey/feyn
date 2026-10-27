# Night 1 report, 2026-10-27

| Id | Issue | Status | PR | Squash sha |
|---|---|---|---|---|
| S0-01 | | done, accepted before the night | | |
| S0-02 | | done, accepted before the night | | |
| S0-03 | | done, accepted before the night | | |
| S0-04 | | done, accepted before the night | | |
| S0-05 | | done, accepted before the night | | |
| S0-06 | | done, accepted before the night | | |
| S0-07 | | done, accepted before the night | | |
| S1-01 | | done, accepted before the night | | |
| S1-02 | 15 | done, merged | 79 | 6b56d6f |
| S1-03 | 16 | done, merged | 80 | 6d0a8ce |
| S1-07 | 20 | done, merged | 81 | a52b97b |
| S1-06 | 19 | blocked, PR open | 82 | |
| S1-08 | 21 | done, merged | 83 | 77551d1 |
| S1-11 | 24 | blocked, PR open | 84 | |

## Needs the maintainer

### S1-06 (issue 19, PR 82): blocked on one body fix

The review asks for changes, and only one remains. The PR body still says the learner templates are ported as they were. The fix commit changed the observation line to `fait : action`, which S1-04 (PROTOCOL.md) must reuse. Unblock: edit the PR body so the "Not verified" sentence mentions that change, then merge PR 82 (GitHub web interface: PR 82, Edit, then Squash and merge). Detail: `construction/notes/S1-06.md`.

### S1-11 (issue 24, PR 84): blocked, not reviewed

The work is done but no review ran. Unblock: review PR 84, then merge it. After S1-10 merges, run taught-check on `courses/parcours-po`, confirm it produces its inventory, then close issue 24 (the PR says Refs, so it does not close it). No note file exists for this one.

### S1-02 (issue 15, PR 79)

- Read `construction/notes/S1-02-prototype.md` and rule on its 14 spec adjustments, first 6 (SVG fallback: currentColor plus opacities, classes only set color, no style element), 12 (sources.md cites bank cases and would expose them on the site; recommended option b) and 4 (stances twice in concept.md; recommended: keep only the frontmatter).
- Decide whether the two course findings in item 14 deserve an issue: the 9a2 zoom diagram that the Schéma asks for but nobody drew, and a 9b label that differs from the drawn one.
- `gh issue develop --list 15` no longer shows the branch now that the PR is open, although /start created it that way. Worth knowing for the /finish step 6 check.

### S1-03 (issue 16, PR 80)

- Decide prototype recommendation 4 (keep or drop the body section « Consensus et choix d'école », which duplicates the frontmatter stances). Do it before S1-09 writes the migration workflow, or file an issue. SPEC.md keeps both.
- Decide prototype recommendation 12 (sources.md is reader-facing but cites case titles from the bank): (a) accept, (b) move bank-only claims to teaching.md, (c) the site filters those rows. SPEC.md implements (a).
- Issue 16 shows no linked branch (`gh issue develop --list 16` prints nothing). The PR is still linked through Closes.
- Detail: `construction/notes/S1-03.md`.

### S1-07 (issue 20, PR 81)

- Decide later whether the SPEC.md wording for a claim without an outside source should change. The check reads "has a source" as "the source cell is not empty", because the prototype writes « aucune » and « fil rouge » there.
- Decide whether to add a CI workflow that runs `checks/test-fixtures`. None exists yet.

### S1-08 (issue 21, PR 83)

- Read `construction/notes/S1-08.md` before the S1-10 migrations. The site's MDX has reader sub-sections that the plan does not list as sub-concepts: 3b, 4b, 5b, 11a, 11b, 12b, 12c, 16a, 16c, 17a and 17c. course.yaml follows plan.md. Decide whether S1-10 writes them as paragraphs inside the first-level section or whether you add them as children.
- Check the three flagged objectives: 10 (two sentences joined with a semicolon), 14 (the plan says arbitrer, the old concept file does not) and A2 (learner versus team).

## Skipped and why

Nothing was skipped on purpose. S1-06 and S1-11 were not merged (see above). S1-10 (the 19 concept migrations) did not run tonight; S1-04, S1-05 and S1-09 did not run either, so PROTOCOL.md and the French language pack still do not exist and the checks run against the fixture pack.

## What to read first in the morning

1. `construction/notes/S1-02-prototype.md`: the 14 spec adjustments, with 4, 6 and 12 first.
2. `construction/notes/S1-08.md`: the sub-concept question that gates S1-10.
3. PR 82 and PR 84: the two open PRs.
