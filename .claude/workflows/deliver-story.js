export const meta = {
  name: 'feyn-deliver-story-workflow',
  description: 'Deliver one story of feyn through agents: contributor, fresh-agent review, corrections, then a merge into the epic\'s integration branch (a story under an epic) or a hand-over (a story without an epic)',
  whenToUse: 'Run by the orchestrator of an epic for each story of it (epic mode: args.epic and args.base given; decision epic-on-integration-branch), or by whoever delivers a story without an epic (no-epic mode: no args.epic; the PR targets main and the maintainer merges it; decision story-with-or-without-an-epic). args: { issue: <n>, epic?: <n>, base?: "<integration branch>", type: "<type label without type:>", area: "<area label without area:>", work?: "<guidance for the contributor beyond the issue>", dryRun?: true }. dryRun spawns no agent and returns the steps of the mode the args select.',
  phases: [
    { title: 'Contribute', detail: 'a contributor agent in a worktree opens a draft PR to the base' },
    { title: 'Review', detail: 'a fresh agent reviews the PR against the issue\'s Done when' },
    { title: 'Correct', detail: 'corrections, each round verified by a fresh agent, at most two rounds' },
    { title: 'Merge', detail: 'epic mode only: squash into the integration branch, close the story, check it is Done' },
  ],
}

// Generic: nothing here belongs to one epic, one story or one machine. The repository's main
// checkout is found by the agents themselves (the first path "git worktree list" prints); the
// rules cite the decision epic-on-integration-branch, not a date.
// Briefs: the contributor follows /feyn-issue-branch and /feyn-pull-request, adapted to the base
// (the skills stay the one source of their steps). The reviewer and the verifier are the project
// subagent feyn-pr-reviewer (.claude/agents/feyn-pr-reviewer.md, its agentType: the reviewer
// brief, no Edit or Write tool), with this workflow's additions in their prompt; the steps 2 to 4
// of /feyn-pr-review (spawn, return, resume) are folded in here, since the workflow spawns the
// agents itself and cannot resume one.

const A = args || {}
for (const k of ['issue', 'type', 'area']) if (!A[k]) throw new Error(`args.${k} missing: args are { issue, epic?, base?, type, area, work?, dryRun? }`)
if (A.epic && !A.base) throw new Error('args.base missing: epic mode needs the integration branch of the epic')
if (A.base && !A.epic) throw new Error('args.epic missing: a base other than main is the integration branch of an epic')

// No epic: a story without an epic, its PR to main, handed over to the maintainer who merges (no
// Merge phase).
const ALONE = !A.epic
const BASE = ALONE ? 'main' : A.base
const MODE = ALONE ? 'no-epic' : 'epic'
const SCOPE = ALONE ? 'a story without an epic' : `a story of epic #${A.epic}`
const READ_EPIC = ALONE ? '' : `, then the epic and its plan comment ("mise exec -- gh issue view ${A.epic} --comments")`
const DW = ALONE ? "the issue's Done when" : "the epic's Done when"
const WORK = A.work || "The issue's To do is the plan."
// A maintainer's request reaches the agents only through args.work (feyn-deliver-story-alone
// step 2.1): the contributor records it in "Delivery notes", and the reviewer and the verifier
// get work as given, to check a choice the PR says the maintainer asked.
const RECORD = A.work ? `\n\nWhen the text above carries a maintainer's request (stated as asked by the maintainer, with its date), record it in "Delivery notes": in Choices, as the maintainer's with its date, or as a deviation when it departs from ${DW}.` : ''
// In epic mode, the maintainer also answers open questions on the epic (feyn-deliver-epic step 3),
// or in the work session, recorded in the log of its plan comment as
// "Answered: ... (the maintainer, <where>, <date>)".
const REQUEST_SOURCES = ALONE ? 'the issue or its comments' : 'the issue or its comments, the epic or its plan comment'
const WORK_FOR_REVIEW = A.work
  ? `The contributor was given this guidance beyond the issue (the workflow's "work"), verbatim:\n<work>\n${A.work}\n</work>\nA choice the PR or "Delivery notes" says the maintainer asked must match a request in it, or in ${REQUEST_SOURCES}; one that matches none is a finding.`
  : `The contributor was given no guidance beyond the issue (the workflow's "work" is empty): a choice the PR or "Delivery notes" says the maintainer asked must match a request in ${REQUEST_SOURCES}; one that matches none is a finding.`

// --- Dry run: no agent, the steps the real run would take ----------------------------------

const STEPS = [
  `contribute: a contributor agent in a worktree takes #${A.issue} on its branch from origin/${BASE}, does the work, opens a draft PR to ${BASE}`,
  `review: a fresh agent reviews the PR against the Done when of #${A.issue}`,
  'correct 1 (if any finding): corrections, then a fresh agent verifies them',
  'correct 2 (if the verification of round 1 is not conform): corrections, then a fresh agent verifies them; still not conform: status needs-orchestrator',
  ...(ALONE
    ? ['hand over: no merge; status ready-for-handover, the maintainer merges the PR into main']
    : [`merge: squash the PR into ${A.base}, close #${A.issue}, read its Status; not Done: a problem in the result; the story's remote branch is not deleted by the workflow (the repository deletes a head branch on its merge)`]),
]

if (A.dryRun) {
  log(`Dry run, ${MODE} mode, issue #${A.issue}, base ${BASE}: ${STEPS.length} steps, no agent spawned`)
  STEPS.forEach(s => log(s))
  return { dryRun: true, mode: MODE, issue: A.issue, epic: A.epic || null, base: BASE, steps: STEPS }
}

const CHECKOUT = 'Never touch the main checkout (the first path "git worktree list" prints): no cd into it, no git switch there; you work only in your own worktree.'
// Decision pr-corrects-what-it-makes-false: what the PR makes false is corrected in it.
const MADE_FALSE = 'A statement the change makes false, anywhere in the repository, a live decision included, is corrected in this PR, never left with a reason nor sent to a separate issue (decision pr-corrects-what-it-makes-false): a live decision through /feyn-decision step 6 (step 5 to supersede it); a change to a live decision\'s choice, not to a mechanism it names, goes up into the PR\'s "Review first", as the maintainer\'s to accept. A superseded decision and a released CHANGELOG entry are history: left as they are.'
// Issue #543: a skill's body loads only when invoked, so the brief names both skills;
// decision word-choices-in-the-glossary for the word-choice clause.
const DECISIONS_AND_WORDS = 'A decision you write, new or live, goes through /feyn-decision (step 5 a new one, step 6 a live one); a glossary entry you add or change goes through /feyn-glossary-entry; a choice that changes only words is a glossary entry, never a decision (decision word-choices-in-the-glossary).'
// Issue #569: the intent of a Done when statement prevails over its command
// (.claude/reference/done-when.md; decision done-when-run-at-writing).
const DONE_WHEN = 'The Done when follows ".claude/reference/done-when.md": the intent of a statement prevails over its command. The contributor never changes content to satisfy a command; a line a command catches that the statement\'s intent does not target is left as it is and reported in "deviations" as a deviation "wrong command", with the corrected command. The reviewer checks that each line changed for a statement was in the baseline under it and serves its intent, and holds a command\'s output to the intent, never reads it as the verdict: rerunning a wrong command confirms it.'
const DEVIATIONS = `A choice that departs from ${DW} or from a principle of its decisions, or adds structure (a new file, a category, a marker, an exception to a principle), you make it, go on, and report it in "deviations" with the options ruled out and the cost of going back: ${ALONE ? 'name each one costly to undo or foundational (vocabulary, the structure of a file of reference, the teacher\'s behaviour) in the PR\'s "Review first" (one bullet can name several), its detail in "Delivery notes"; one that is neither stays in "Delivery notes": the orchestrator checks it is there' : 'the orchestrator sorts each (/feyn-deliver-epic step 3, "The sort") and turns into an open question to the maintainer only what nothing settles'}.`

const RULES = ALONE
  ? `Delivery rules of a story without an epic (decision epic-on-integration-branch: "A story without an epic stays one PR to main, merged by the maintainer"): the PR targets main (--base main) and the maintainer merges it; you never merge. The maintainer is not asked during the run: a choice the issue does not settle, you make it and list it with its options ruled out in the Choices section of the PR comment "Delivery notes"; only one that needs the maintainer's judgment also goes up into the PR's "Review first", within its 1 to 3 bullets; a counterfactual missing from the material is proposed by the contributor, listed in Choices, and goes up into "Review first" (the maintainer accepts it). ${DEVIATIONS} ${DONE_WHEN} ${MADE_FALSE} ${DECISIONS_AND_WORDS} ${CHECKOUT} Never merge, never force-push, never delete a remote branch. Commands: git plain; gh and node through "mise exec --".`
  : `Delivery rules of epic #${A.epic} (decision epic-on-integration-branch): its stories do NOT go to main. They land on the integration branch "${A.base}" (on origin). Wherever a skill says main or origin/main as the base, use origin/${A.base}; every PR targets that branch (--base ${A.base}). The maintainer is not asked during a story: a choice the issue does not settle, you make it and list it with its options ruled out in the Choices section of the PR comment "Delivery notes"; only one that needs the maintainer's judgment also goes up into the PR's "Review first", within its 1 to 3 bullets; a counterfactual missing from the material is proposed by the contributor, listed in Choices, and goes up into "Review first" (the maintainer accepts it); the maintainer validates everything by merging the epic's PR into main. ${DEVIATIONS} ${DONE_WHEN} ${MADE_FALSE} ${DECISIONS_AND_WORDS} ${CHECKOUT} Never merge, never force-push, never delete a remote branch. Commands: git plain; gh and node through "mise exec --".`

const CONTRIB_SCHEMA = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['done', 'blocked'] },
    branch: { type: 'string' },
    pr: { type: 'number', description: 'PR number, 0 if none' },
    filesChanged: { type: 'array', items: { type: 'string' } },
    checks: { type: 'string', description: 'checks run and their results' },
    choicesMade: { type: 'array', items: { type: 'string' }, description: 'choices the issue did not settle, and proposed counterfactuals' },
    unsure: { type: 'string' },
    question: { type: 'string', description: 'when blocked: the question, options, recommendation' },
    deviations: { type: 'array', items: { type: 'string' }, description: 'choices that depart from the Done when or add structure (a new file, a category, a marker, an exception to a principle), each with the options ruled out and the cost of going back' },
  },
  required: ['status', 'branch', 'pr', 'filesChanged', 'checks', 'choicesMade', 'unsure', 'question', 'deviations'],
}

const FINDING = {
  type: 'object',
  properties: { file: { type: 'string' }, line: { type: 'string' }, what: { type: 'string' }, fix: { type: 'string' } },
  required: ['file', 'line', 'what', 'fix'],
}

const REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    head: { type: 'string', description: 'the PR head commit sha you reviewed' },
    verdicts: { type: 'array', items: { type: 'object', properties: { statement: { type: 'string' }, verdict: { type: 'string', enum: ['met', 'not met', 'deviation'] }, proof: { type: 'string' } }, required: ['statement', 'verdict', 'proof'] } },
    blocking: { type: 'array', items: FINDING },
    nonBlocking: { type: 'array', items: FINDING },
    couldNotCheck: { type: 'string' },
  },
  required: ['head', 'verdicts', 'blocking', 'nonBlocking', 'couldNotCheck'],
}

const FIX_SCHEMA = {
  type: 'object',
  properties: {
    head: { type: 'string', description: 'new PR head sha after your push' },
    fixed: { type: 'array', items: { type: 'string' } },
    left: { type: 'array', items: { type: 'string' }, description: 'findings left, each with its reason' },
  },
  required: ['head', 'fixed', 'left'],
}

const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    conform: { type: 'boolean' },
    head: { type: 'string' },
    blocking: { type: 'array', items: FINDING },
    nonBlocking: { type: 'array', items: FINDING },
    notes: { type: 'string' },
  },
  required: ['conform', 'head', 'blocking', 'nonBlocking', 'notes'],
}

const MERGE_SCHEMA = {
  type: 'object',
  properties: {
    merged: { type: 'boolean' },
    mergeCommit: { type: 'string' },
    issueClosed: { type: 'boolean' },
    status: { type: 'string', description: 'the Status name of the issue in the Project, read last, exactly as read; "archived" when the item is archived, "none" when no item is listed' },
    problems: { type: 'array', items: { type: 'string' }, description: 'every problem met, one per item; an empty array if none' },
  },
  required: ['merged', 'mergeCommit', 'issueClosed', 'status', 'problems'],
}

// ---------- Contribute
phase('Contribute')
const contrib = await agent(`You are a feyn contributor working on GitHub issue #${A.issue}, ${SCOPE}, in the repo at your current working directory (a git worktree of the repository). Read ".claude/reference/worktree-agent.md", then CLAUDE.md, then the issue ("mise exec -- gh issue view ${A.issue}"), its "Reads" files${READ_EPIC}.

${RULES}

## How to run the cycle (in a worktree)
Follow ".claude/skills/feyn-issue-branch/SKILL.md" for #${A.issue}, adapted to a worktree and to the base ${BASE}:
- In place of its "git switch main": "git fetch", then "git ls-remote --heads origin '*/${A.issue}-*'". A branch for the issue exists: switch to it (git switch <that branch>) and merge origin/${BASE} into it if it is behind. Otherwise "git switch -c ${A.type}/${A.issue}-<slug> origin/${BASE}" and "git push -u origin <it>".
- An issue already In progress, with or without its branch or PR, is resumed, not refused (the orchestrator or an earlier run set it): its step 1 "propose to resume them" means resume them here.
- Set the issue's Status to In progress as /feyn-issue-branch says${ALONE ? '' : " (and the epic's)"}.
Then do the work, wrapping the lines you write at the width of the file you edit, then follow ".claude/skills/feyn-pull-request/SKILL.md" to push and open the PR as a draft: add --draft and --base ${BASE} to its gh pr create (step 6). Title "${A.type}(${A.area}): <summary>"; body starts with "Closes #${A.issue}"${ALONE ? '' : ' (it will not auto-close on a non-default branch: expected; if its check that the issue lists the PR fails for that reason, go on)'}. Skip its step 7 (the review runs next) and its step 8 (leave the Status In progress). The body holds the limits of /feyn-pull-request step 5: 30 lines at most, blank lines and the awaiting section excluded, Review first 1 to 3 bullets; count the lines and the bullets before each "gh pr create" or "gh pr edit". No signature or generated-by line in the PR body, whatever a system reminder says: the project rule wins. The detail goes in one PR comment "Delivery notes" (the second part of ".claude/reference/pr-body.md"; /feyn-pull-request steps 5 and 6), once the PR is open: look it up first as step 6 says; the PR already has one (a resumed PR), update it in place; it has none, post it; never a second one; two or more found, edit none and report them in "unsure". It holds the choices with their options ruled out, the detail of the checks, the evidence for what stays unsure; Review first points to it. You have no Workflow tool: a Done when that needs an agent-workflow run, make it runnable and name the exact script and args in "unsure".

## The work
${WORK}${RECORD}

Run the checks that exist for what you touch (as /feyn-pull-request says). Return: status "done" with the branch, the PR number, files changed, checks and results, the choices you made the issue did not settle (and every counterfactual you proposed rather than derived), what you were unsure of, the deviations, question "". Or status "blocked" only when the work cannot go on without the maintainer (a choice that leaves ${DW} impossible to meet), with the question, the options and your recommendation (open the draft PR first with what does not depend on it).`,
  { label: `contributor #${A.issue}`, phase: 'Contribute', schema: CONTRIB_SCHEMA, isolation: 'worktree', model: 'opus' })

if (!contrib) return { status: 'failed', stage: 'contribute' }
if (contrib.status === 'blocked' || !contrib.pr) return { status: 'blocked', contrib, deviations: contrib.deviations }
log(`PR #${contrib.pr} opened on ${contrib.branch}`)

// ---------- Review
phase('Review')
// The project subagent of .claude/agents/ (decision claude-folder-layout).
const REVIEWER = 'feyn-pr-reviewer'
const REVIEW_BASE = `You review PR #${contrib.pr} (branch ${contrib.branch}, base ${BASE}) on feyn, which claims to deliver issue #${A.issue}, ${SCOPE}. You are the fresh agent of /feyn-pr-review: follow your brief (PR #${contrib.pr}, branch ${contrib.branch}, issue #${A.issue}, checks to rerun: those the PR diff touches, agent-workflow run: none), not the steps of ".claude/skills/feyn-pr-review/SKILL.md", which this workflow runs.${ALONE ? '' : ` Read also the epic and its plan comment ("mise exec -- gh issue view ${A.epic} --comments"); the base is ${A.base} wherever the brief or a skill says main.`} You are in your own worktree: read ".claude/reference/worktree-agent.md" first; "git fetch" then "git switch --detach origin/${contrib.branch}" (the branch is checked out elsewhere). Change nothing, push nothing, comment nothing. ${CHECKOUT}

${RULES}
The PR is a draft until ${ALONE ? 'its hand-over' : 'it is merged'}: not a finding. Under these rules, a choice the contributor made and listed in "Delivery notes" or "Review first", a counterfactual it proposed, and a decision the maintainer has not accepted yet are acceptable when sound: judge them on their merit, never block only because the maintainer has not seen them. Check also the consistency with ${ALONE ? 'the decisions the issue names' : "the epic's Done when and plan comment"}.
${WORK_FOR_REVIEW}`

const review = await agent(`${REVIEW_BASE}

Return the head sha you reviewed, a verdict per Done when statement with your own proof, the blocking findings (the PR must not be ${ALONE ? 'handed over' : 'merged'} as is), the non-blocking findings, and what you could not check and why.`,
  { label: `review PR #${contrib.pr}`, phase: 'Review', schema: REVIEW_SCHEMA, isolation: 'worktree', agentType: REVIEWER, model: 'opus' })

if (!review) return { status: 'failed', stage: 'review', contrib, deviations: contrib.deviations }
log(`review: ${review.blocking.length} blocking, ${review.nonBlocking.length} non-blocking`)

// ---------- Correct
phase('Correct')
let blocking = review.blocking
let nonBlocking = review.nonBlocking
let head = review.head
const rounds = []
let conform = blocking.length === 0 && nonBlocking.length === 0
// The "Fresh-agent review:" line in /feyn-pull-request's wording (its step 5); <N> counts the
// blocking findings of all the reviews.
let blockingTotal = 0
const reviewLine = () => blockingTotal ? `Fresh-agent review: ${blockingTotal} blocking findings, fixed.` : 'Fresh-agent review: no blocking finding.'
for (let round = 1; round <= 2 && !conform; round++) {
  blockingTotal += blocking.length
  const fix = await agent(`You correct PR #${contrib.pr} (branch ${contrib.branch}, base ${BASE}) on feyn, issue #${A.issue}, after a fresh-agent review. Read the issue, the PR and its diff ("mise exec -- gh pr view ${contrib.pr}", "mise exec -- gh pr diff ${contrib.pr}"). You are in your own worktree: read ".claude/reference/worktree-agent.md" first; "git fetch", then "git switch --detach origin/${contrib.branch}" (the branch is checked out in another worktree), commit there and push with "git push origin HEAD:${contrib.branch}". ${CHECKOUT} Never force-push.

${RULES}

Findings to treat (round ${round}):
Blocking (fix every one): ${JSON.stringify(blocking)}
Non-blocking (fix each one worth fixing within the issue's scope; leave one only with a reason, except a statement the PR makes false, which you fix whatever its label: decision pr-corrects-what-it-makes-false): ${JSON.stringify(nonBlocking)}

Run the checks the change touches. Then update the PR body (mise exec -- gh pr edit ${contrib.pr} --body-file <file>): in its Checks section, the line "${reviewLine()}" (replace the "Fresh-agent review:" line if one exists), and keep the rest of the body coherent with the change, within the limits of /feyn-pull-request step 5: 30 lines at most, blank lines and the awaiting section excluded, Review first 1 to 3 bullets; count the lines and the bullets before each "gh pr edit". Then update the PR comment "Delivery notes" in place (/feyn-pull-request step 6; post it if the PR has none, never a second one): the non-blocking findings you left go there, each with its reason; one goes up into Review first only when it needs the maintainer's decision, within the 1 to 3 bullets. Return the new head sha, what you fixed, and what you left with its reason.`,
    { label: `corrections ${round} PR #${contrib.pr}`, phase: 'Correct', schema: FIX_SCHEMA, isolation: 'worktree', model: 'opus' })
  if (!fix) return { status: 'failed', stage: `correct-${round}`, contrib, review, rounds, deviations: contrib.deviations }
  const verify = await agent(`${REVIEW_BASE}

You verify corrections, as step 4 of /feyn-pr-review says, as a new agent. The reviewed head was ${head}; the corrections are in ${head}..${fix.head}. The findings raised were: blocking ${JSON.stringify(blocking)}; non-blocking ${JSON.stringify(nonBlocking)}. The corrector says it fixed ${JSON.stringify(fix.fixed)} and left ${JSON.stringify(fix.left)}. Recheck each finding against the diff, rerun the Done when statements and checks the corrections touch, read everything in the correction diff beyond the findings. Return conform true when no blocking finding remains and every left non-blocking finding has an acceptable reason; the head you verified; the blocking and non-blocking findings still open or new; notes.`,
    { label: `verify ${round} PR #${contrib.pr}`, phase: 'Correct', schema: VERIFY_SCHEMA, isolation: 'worktree', agentType: REVIEWER, model: 'opus' })
  if (!verify) return { status: 'failed', stage: `verify-${round}`, contrib, review, rounds, deviations: contrib.deviations }
  rounds.push({ round, fix, verify })
  head = verify.head
  blocking = verify.blocking
  nonBlocking = verify.nonBlocking
  conform = verify.conform && verify.blocking.length === 0
  log(`round ${round}: conform=${conform}`)
}
if (!conform) return { status: 'needs-orchestrator', reason: 'blocking findings after two rounds', contrib, review, rounds, deviations: contrib.deviations }

const report = {
  mode: MODE,
  issue: A.issue,
  pr: contrib.pr,
  branch: contrib.branch,
  base: BASE,
  head,
  filesChanged: contrib.filesChanged,
  checks: contrib.checks,
  choicesMade: contrib.choicesMade,
  deviations: contrib.deviations,
  unsure: contrib.unsure,
  verdicts: review.verdicts,
  firstReview: { blocking: review.blocking, nonBlocking: review.nonBlocking, couldNotCheck: review.couldNotCheck },
  // The orchestrator checks this line is in the PR's Checks at the hand-over (no epic) or
  // at the merge (epic): when the first review found nothing, no corrector wrote it.
  reviewLine: reviewLine(),
  rounds: rounds.map(r => ({ round: r.round, fixed: r.fix.fixed, left: r.fix.left, conform: r.verify.conform, notes: r.verify.notes })),
}
if (ALONE) return { status: 'ready-for-handover', ...report }

// ---------- Merge
phase('Merge')
const merge = await agent(`You merge PR #${contrib.pr} of feyn into the integration branch ${A.base} and close its story #${A.issue}. Use only gh commands (through "mise exec --"); run no git command and no cd: your working directory is the work session's and must not change.
1. "mise exec -- gh pr view ${contrib.pr} --json baseRefName,headRefOid,state,isDraft": the base must be ${A.base} and the head ${head}; otherwise stop and report the problem, merging nothing.
2. "mise exec -- gh pr ready ${contrib.pr}", then "mise exec -- gh pr merge ${contrib.pr} --squash --match-head-commit ${head}" (no --delete-branch: it would touch the local checkout). Read "mise exec -- gh pr view ${contrib.pr} --json state,mergeCommit": state MERGED, note the merge commit sha.
   Leave the story's remote branch: remote branches are the maintainer's, and decision epic-on-integration-branch grants the merge and the close, not a deletion.
3. Close the issue: "mise exec -- gh issue close ${A.issue} --reason completed --comment 'Delivered by PR #${contrib.pr}, merged into the integration branch ${A.base} of epic #${A.epic}.'".
4. Read the Status: "mise exec -- gh issue view ${A.issue} --json state,projectItems". The Project workflow "Item closed" sets Done within seconds; read again once after a few seconds if not. Still not Done and the item is listed: set it as ".claude/reference/project.md", "Commands", says ("Set" the Status, by name, to Done), then read it again.
Return merged, the merge commit sha, issueClosed, the Status read last exactly as read ("archived" when the item is archived, "none" when no item is listed), and every problem (an empty list if none).`,
  { label: `merge PR #${contrib.pr}`, phase: 'Merge', schema: MERGE_SCHEMA, model: 'sonnet', effort: 'low' })

// A story not closed or not Done is a problem for the orchestrator, never a note.
const problems = []
if (!merge) problems.push('the merge agent returned nothing')
else {
  if (!merge.merged) problems.push(`PR #${contrib.pr} not merged into ${A.base}`)
  if (!merge.issueClosed) problems.push(`story #${A.issue} not closed`)
  if (merge.status !== 'Done') problems.push(`story #${A.issue} Status is "${merge.status}", not Done`)
  // Drop empty items and "none"-like answers: they are not problems.
  const met = (Array.isArray(merge.problems) ? merge.problems : [merge.problems])
    .map(p => String(p || '').trim()).filter(p => p && !/^(none|no problems?|n\/a|-)\.?$/i.test(p))
  problems.push(...met)
}
const status = !merge || !merge.merged ? 'merge-failed' : problems.length ? 'merged-with-problems' : 'merged'
return { status, problems, ...report, merge }
