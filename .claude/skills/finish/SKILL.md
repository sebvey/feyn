---
name: finish
description: 'Deliver the current issue branch on feyn - run the checks that exist, push, open the PR to main with "Closes #n" and the title <type>(<area>): <summary>, ask for review; after the merge, confirm the change landed and delete the local branch. Use for "/finish", "open the PR", "it is merged, clean up".'
argument-hint: "[after-merge]"
---

# /finish

Two moments, never in the same turn: **deliver** (open the PR), then, once the PR is merged,
**clean up**. It never merges: the merge belongs to the reviewer.

The branch is `<type>/<n>-<slug>` (made by `/start`); `<n>` is the issue. On `main`, or on a
branch without an issue number: stop and say so.

## Deliver

1. **Done when.** Reread the issue's Done when
   (`mise exec -- gh issue view <n> --json title,labels,body`) and check each statement against
   the branch. One that does not hold: fix it, or say in the PR which one and why. The Done
   when is not edited after `/start`; a change to it amends the open PR's body as well.
2. **Checks.** Run the ones that exist for what the branch touches
   (`mise exec -- git diff --name-only main...HEAD`):
   - a course `courses/<id>/`: the check runner of the spec it declares
     (`specs/<name>/checks/check-course courses/<id>`);
   - `site/` or a course: `astro check` and the site build, from `site/`;
   - anything else: the checks its area documents, if any.

   No check exists yet for the area: say so in the PR. A failing check is fixed before the PR
   opens; one that cannot be fixed here is named in the PR, at the top.
3. **Commit and push.** Nothing left uncommitted that belongs to the issue
   (`mise exec -- git status --porcelain`), then
   `mise exec -- git push -u origin <branch>`.
4. **Title**: `<type>(<area>): <summary>`, which becomes the squash commit on `main`.
   `<type>` is the `type:` label, `<area>` the `area:` label, both without their prefix
   (`course(course:parcours-po): write the cases of concept 9`). Summary: imperative,
   lowercase, no final period, under 72 characters for the whole title.
5. **Body**, short (it will be read, keep it under 30 lines, the awaiting section excluded):
   - when the branch leaves a decision to the maintainer, an `Awaiting the maintainer`
     section first, before `Closes #<n>`: the question, the options, the recommendation;
   - `Closes #<n>` is the first line after that section (the first line of the body when there
     is none);
   - what changes, as bullets, describing the diff and nothing else;
   - a `Done when, verified:` section, one line per statement of the issue's Done when, that
     starts with a verdict word, `met`, `not met` or `deviation`, then the statement and the
     proof (command run, file read):

     ```
     Done when, verified:
     - met: `finish/SKILL.md` step 5 names the three verdict words (file read).
     - not met: the issue lists the PR (`closedByPullRequestsReferences` is empty).
     - deviation: a test issue shows the PR (none made; `gh issue develop --help` read).
     ```
   - what is not verified, and the checks that do not exist yet;
   - decisions written (`/decide`), issues opened on the way.
   - no signature or generated-by line: the squash takes the body as the commit message
     on `main`; the `Co-Authored-By` trailer on the commits is enough.
6. **Open it**:
   - a `Refs #<n>` PR first unlinks the branch
     ([below](#a-refs-pr-and-the-development-link)); a `Closes #<n>` PR skips that;
   - `mise exec -- gh pr create --base main --title "<title>" --body-file <file>`; with a
     decision awaited, add `--draft --label blocked:maintainer` and put the same label on
     the issue (`mise exec -- gh issue edit <n> --add-label blocked:maintainer`), so the PR
     cannot be merged by mistake;
   - check the issue shows it: `mise exec -- gh issue view <n> --json closedByPullRequestsReferences`
     lists the PR when it says `Closes #<n>` (a `Refs` PR: it lists nothing). The branch is
     not checked: GitHub drops the issue's linked branch once a PR from it opens
     (GitHub, inferred 2026-10-27, #108). GitHub can take a few seconds to list the PR:
     rerun once. PR still missing on a `Closes` PR: fix the body (`mise exec -- gh pr edit <pr> --body-file <file>`).
7. **Ask for review**: reply with the PR URL, the title, one line on what the reviewer should
   look at first, and the merge command, which names the subject (on a one-commit PR, GitHub
   takes the commit message, not the PR title):
   `gh pr merge <pr> --squash --delete-branch --subject "<title> (#<pr>)"`
   (GitHub, observed 2026-10-27, #115). Stop there.
   A draft PR: name the question instead of the merge command. The maintainer answers with a
   comment and removes `blocked:maintainer` (on the issue and the PR). Then apply the answer,
   remove the section from the body, `mise exec -- gh pr ready <pr>`, and ask for review
   again. Never remove the labels yourself; if the label is still on, the answer is not
   given: stop.

### A Refs PR and the Development link

The link `/start` makes (`gh issue develop`) ties the branch to the issue, and GitHub treats a
PR opened from a linked branch as closing that issue, whatever its body says: issue #24 closed
at the merge of PR #84, which said `Refs #24` (GitHub, observed 2026-10-27, #24).
So when the body starts with `Refs #<n>`, remove the link **before** opening the PR
(`gh issue develop` has no unlink):

1. Get the link's id:
   `mise exec -- gh api graphql -f query='query{repository(owner:"sebvey",name:"feyn"){issue(number:<n>){linkedBranches(first:10){nodes{id ref{name}}}}}}'`
   and take the node whose `ref.name` is the branch.
2. Remove it (this deletes the link, not the branch):
   `mise exec -- gh api graphql -f query='mutation{deleteLinkedBranch(input:{linkedBranchId:"<id>"}){clientMutationId}}'`
   (GitHub, tested 2026-10-27, #109).
3. Open the PR, then check `mise exec -- gh issue view <n> --json closedByPullRequestsReferences`
   lists nothing (GitHub, tested 2026-10-27, #109). If it lists the PR, the link survived: the maintainer removes it in the
   web interface (PR page, Development in the sidebar, the issue's entry, unlink), or the
   body is edited to `Closes #<n>` if it is in fact the last step. Say so in the reply, and
   that Clean up will reopen the issue otherwise.

The issue's Development section then shows neither the branch nor the PR; the PR's `Refs`
line and the issue's timeline are the trace. The check of step 3 is what catches a failed
unlink, and Clean up reopens the issue.

## Clean up (after the merge)

Squash makes a new commit on `main`, so git does not see the branch as merged and
`git branch -d` refuses it. Two separate moves: confirm, then delete.

1. `mise exec -- gh pr view <branch> --json state,mergedAt,title` shows `MERGED`; otherwise
   stop: nothing to clean.
2. `mise exec -- git switch main`, `mise exec -- git pull --ff-only`.
3. **Confirm** that `main` holds the branch's version of every file it touched (`main` may
   have moved on with other merges, so compare those files only):
   `mise exec -- git diff main <branch> -- $(mise exec -- git diff --name-only $(mise exec -- git merge-base main <branch>) <branch>)`
   must print nothing. Read the result before going on; anything printed: stop and show it.
4. **Delete**: `mise exec -- git branch -D <branch>` (already gone if the merge ran in this
   checkout: nothing to do). The remote branch goes with the merge
   (`gh pr merge --squash --delete-branch`); if it is still there
   (`mise exec -- git ls-remote --heads origin <branch>`), tell the maintainer. Never delete a
   remote branch yourself.
5. Check the squash commit carries the PR title
   (`mise exec -- git log main -1 --format=%s --grep "(#<pr>)"`); if not, tell the
   maintainer (`main` is never rewritten).
6. Check the issue with the PR (`mise exec -- gh issue view <n> --json url,state,projectItems`).
   - `Closes` PR: the issue must be closed; if not, say so (the PR body lost its
     `Closes #<n>`). Then check its Status is Done: the Project's workflow sets it when it is
     on; if it did not, set it ([project.md](../ticket/project.md)):
     `mise exec -- gh project item-edit 4 --owner sebvey --url <issue url> --field Status --value Done`.
   - `Refs` PR: the issue must still be open, Status unchanged (In progress). If it closed
     anyway (the link survived), reopen it
     (`mise exec -- gh issue reopen <n> --comment "Reopened: PR #<pr> only referenced it (Refs), the Development link closed it at the merge."`),
     set its Status back to In progress, and tell the maintainer which step of "Deliver"
     missed it.
   - Either way, if the issue or the PR still carries `blocked:maintainer`, tell the
     maintainer.
