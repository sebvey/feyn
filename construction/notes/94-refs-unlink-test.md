# Note #94: live test of the Refs unlink

The live test asked by issue #94 (Done when 2), run on 2026-10-27 with the commands of PR #103's
`/finish` section "A Refs PR and the Development link".

1. Test issue #109, branch `improvement/109-refs-unlink-test` created with `gh issue develop`
   (linked in the issue's Development section).
2. This note committed on the branch, then the link removed with the GraphQL
   `deleteLinkedBranch` mutation, before the PR opened.
3. A PR whose body says `Refs #109`, squash merged.

Expected: #109 stays open after the merge. The result is recorded on PR #103; this note is the
trail and dies with `construction/`.
