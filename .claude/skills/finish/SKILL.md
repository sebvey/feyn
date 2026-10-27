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
5. **Body**, short (it will be read, keep it under 30 lines):
   - `Closes #<n>` on the first line;
   - what changes, as bullets, describing the diff and nothing else;
   - a `Done when, verified:` section, one line per statement of the issue's Done when, that
     starts with a verdict word, `met`, `not met` or `deviation`, then the statement and the
     proof (command run, file read):

     ```
     Done when, verified:
     - met: `finish/SKILL.md` step 5 names the three verdict words (file read).
     - not met: the issue lists the branch (`gh issue develop --list 12` prints nothing).
     - deviation: a test issue shows the PR (none made; `gh issue develop --help` read).
     ```
   - what is not verified, and the checks that do not exist yet;
   - decisions written (`/decide`), issues opened on the way.
   - no signature or generated-by line: the squash takes the body as the commit message
     on `main`; the `Co-Authored-By` trailer on the commits is enough.
6. **Open it**: `mise exec -- gh pr create --base main --title "<title>" --body-file <file>`.
   Then check the issue shows it: `mise exec -- gh issue view <n> --json closedByPullRequestsReferences`
   lists the PR when it says `Closes #<n>`, and `mise exec -- gh issue develop --list <n>`
   lists the branch. GitHub can take a few seconds to list the PR: rerun once. PR still missing
   on a `Closes` PR: fix the body
   (`mise exec -- gh pr edit <pr> --body-file <file>`); branch missing (not made by `/start`):
   say so in the reply, the issue's Development section will not show it.
7. **Ask for review**: reply with the PR URL, the title, one line on what the reviewer should
   look at first, and the merge command, which names the subject (on a one-commit PR, GitHub
   takes the commit message, not the PR title):
   `gh pr merge <pr> --squash --delete-branch --subject "<title> (#<pr>)"`. Stop there.

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
6. Check the issue closed with the PR (`mise exec -- gh issue view <n> --json url,state,projectItems`);
   if not, say so (the PR body lost its `Closes #<n>`). Then check its Status is Done: the
   Project's workflow sets it when it is on; if it did not, set it
   ([project.md](../ticket/project.md)):
   `mise exec -- gh project item-edit 4 --owner sebvey --url <issue url> --field Status --value Done`.
