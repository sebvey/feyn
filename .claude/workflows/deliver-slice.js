export const meta = {
  name: 'feyn-deliver-slice-workflow',
  description: 'Deliver one issue of feyn through agents: contributor, fresh-agent review, corrections, then a merge into the epic\'s integration branch (a slice) or a hand-over (an observation)',
  whenToUse: 'Run by the orchestrator of an epic for each slice (epic mode: args.epic and args.base given; decision epic-on-integration-branch), or by whoever delivers an observation (observation mode: no args.epic; the PR targets main and the maintainer merges it). args: { issue: <n>, epic?: <n>, base?: "<integration branch>", type: "<type label without type:>", area: "<area label without area:>", work?: "<guidance for the contributor beyond the issue>", dryRun?: true }. dryRun spawns no agent and returns the steps of the mode the args select.',
  phases: [
    { title: 'Contribute', detail: 'a contributor agent in a worktree opens a draft PR to the base' },
    { title: 'Review', detail: 'a fresh agent reviews the PR against the issue\'s Done when' },
    { title: 'Correct', detail: 'corrections, each round verified by a fresh agent, at most two rounds' },
    { title: 'Merge', detail: 'epic mode only: squash into the integration branch, close the slice, check it is Done' },
  ],
}

// Generic: nothing here belongs to one epic, one issue or one machine. The repository's main
// checkout is found by the agents themselves (the first path "git worktree list" prints); the
// rules cite the decision epic-on-integration-branch, not a date.
// Briefs: the contributor follows /feyn-issue-branch and /feyn-pull-request, adapted to the base
// (the skills stay the one source of their steps). The reviewer follows the "Reviewer brief" of
// /feyn-pr-review, with this workflow's additions; its steps 2 to 4 (spawn, return, resume) are
// folded in here, since the workflow spawns the agents itself and cannot resume one.

const A = args || {}
for (const k of ['issue', 'type', 'area']) if (!A[k]) throw new Error(`args.${k} missing: args are { issue, epic?, base?, type, area, work?, dryRun? }`)
if (A.epic && !A.base) throw new Error('args.base missing: epic mode needs the integration branch of the epic')
if (A.base && !A.epic) throw new Error('args.epic missing: a base other than main is the integration branch of an epic')

// No epic: an observation, its PR to main, handed over to the maintainer who merges (no Merge phase).
const OBS = !A.epic
const BASE = OBS ? 'main' : A.base
const MODE = OBS ? 'observation' : 'epic'
const SCOPE = OBS ? 'an observation (no epic)' : `a slice of epic #${A.epic}`
const READ_EPIC = OBS ? '' : `, then the epic and its plan comment ("mise exec -- gh issue view ${A.epic} --comments")`
const DW = OBS ? "the issue's Done when" : "the epic's Done when"
const WORK = A.work || "The issue's To do is the plan."

// --- Dry run: no agent, the steps the real run would take ----------------------------------

const STEPS = [
  `contribute: a contributor agent in a worktree takes #${A.issue} on its branch from origin/${BASE}, does the work, opens a draft PR to ${BASE}`,
  `review: a fresh agent reviews the PR against the Done when of #${A.issue}`,
  'correct 1 (if any finding): corrections, then a fresh agent verifies them',
  'correct 2 (if the verification of round 1 is not conform): corrections, then a fresh agent verifies them; still not conform: status needs-orchestrator',
  ...(OBS
    ? ['hand over: no merge; status ready-for-handover, the maintainer merges the PR into main']
    : [`merge: squash the PR into ${A.base}, close #${A.issue}, read its Status; not Done: a problem in the result; the slice's remote branch stays (remote branches are the maintainer's)`]),
]

if (A.dryRun) {
  log(`Dry run, ${MODE} mode, issue #${A.issue}, base ${BASE}: ${STEPS.length} steps, no agent spawned`)
  STEPS.forEach(s => log(s))
  return { dryRun: true, mode: MODE, issue: A.issue, epic: A.epic || null, base: BASE, steps: STEPS }
}

const CHECKOUT = 'Never touch the main checkout (the first path "git worktree list" prints): no cd into it, no git switch there; you work only in your own worktree.'
const DEVIATIONS = `A choice that departs from ${DW} or from a principle of its decisions, or adds structure (a new file, a category, a marker, an exception to a principle), you make it, go on, and report it in "deviations" with the options ruled out and the cost of going back: ${OBS ? 'the hand-over names each one to the maintainer' : 'the orchestrator turns each into an open question to the maintainer'}.`

const RULES = OBS
  ? `Delivery rules of an observation (decision epic-on-integration-branch: "An observation stays one PR to main, merged by the maintainer"): the PR targets main (--base main) and the maintainer merges it; you never merge. The maintainer is not asked during the run: a choice the issue does not settle, you make it and list it in the PR's "Review first" with the options ruled out; a counterfactual missing from the material is proposed by the contributor and listed there too. ${DEVIATIONS} ${CHECKOUT} Never merge, never force-push, never delete a remote branch. Commands: git plain; gh and node through "mise exec --".`
  : `Delivery rules of epic #${A.epic} (decision epic-on-integration-branch): the slices do NOT go to main. They land on the integration branch "${A.base}" (on origin). Wherever a skill says main or origin/main as the base, use origin/${A.base}; every PR targets that branch (--base ${A.base}). The maintainer is not asked during a slice: a choice the issue does not settle, you make it and list it in the PR's "Review first" with the options ruled out; a counterfactual missing from the material is proposed by the contributor and listed there too; the maintainer validates everything by merging the epic's PR into main. ${DEVIATIONS} ${CHECKOUT} Never merge, never force-push, never delete a remote branch. Commands: git plain; gh and node through "mise exec --".`

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
- Set the issue's Status to In progress as /feyn-issue-branch says${OBS ? '' : " (and the epic's)"}.
Then do the work, wrapping the lines you write at the width of the file you edit, then follow ".claude/skills/feyn-pull-request/SKILL.md" to push and open the PR as a draft: add --draft and --base ${BASE} to its gh pr create (step 6). Title "${A.type}(${A.area}): <summary>"; body starts with "Closes #${A.issue}"${OBS ? '' : ' (it will not auto-close on a non-default branch: expected; if its check that the issue lists the PR fails for that reason, go on)'}. Skip its step 7 (the review runs next) and its step 8 (leave the Status In progress). No signature or generated-by line in the PR body. You have no Workflow tool: a Done when that needs an agent-workflow run, make it runnable and name the exact script and args in "unsure".

## The work
${WORK}

Run the checks that exist for what you touch (as /feyn-pull-request says). Return: status "done" with the branch, the PR number, files changed, checks and results, the choices you made the issue did not settle (and every counterfactual you proposed rather than derived), what you were unsure of, the deviations, question "". Or status "blocked" only when the work cannot go on without the maintainer (a choice that leaves ${DW} impossible to meet), with the question, the options and your recommendation (open the draft PR first with what does not depend on it).`,
  { label: `contributor #${A.issue}`, phase: 'Contribute', schema: CONTRIB_SCHEMA, isolation: 'worktree', model: 'opus' })

if (!contrib) return { status: 'failed', stage: 'contribute' }
if (contrib.status === 'blocked' || !contrib.pr) return { status: 'blocked', contrib, deviations: contrib.deviations }
log(`PR #${contrib.pr} opened on ${contrib.branch}`)

// ---------- Review
phase('Review')
const REVIEW_BASE = `You review PR #${contrib.pr} (branch ${contrib.branch}, base ${BASE}) on feyn, which claims to deliver issue #${A.issue}, ${SCOPE}. You are the fresh agent of ".claude/skills/feyn-pr-review/SKILL.md": read it and follow its section "Reviewer brief" (PR #${contrib.pr}, branch ${contrib.branch}, issue #${A.issue}, agent-workflow run: none), not its steps, which this workflow runs.${OBS ? '' : ` Read also the epic and its plan comment ("mise exec -- gh issue view ${A.epic} --comments"); the base is ${A.base} wherever the brief or a skill says main.`} You are in your own worktree: read ".claude/reference/worktree-agent.md" first; "git fetch" then "git switch --detach origin/${contrib.branch}" (the branch is checked out elsewhere). Change nothing, push nothing, comment nothing. ${CHECKOUT}

${RULES}
The PR is a draft until ${OBS ? 'its hand-over' : 'it is merged'}: not a finding. Under these rules, a choice the contributor made and listed in "Review first", a counterfactual it proposed, and a decision the maintainer has not accepted yet are acceptable when sound: judge them on their merit, never block only because the maintainer has not seen them. Check also the consistency with ${OBS ? 'the decisions the issue names' : "the epic's Done when and plan comment"}.`

const review = await agent(`${REVIEW_BASE}

Return the head sha you reviewed, a verdict per Done when statement with your own proof, the blocking findings (the PR must not be ${OBS ? 'handed over' : 'merged'} as is), the non-blocking findings, and what you could not check and why.`,
  { label: `review PR #${contrib.pr}`, phase: 'Review', schema: REVIEW_SCHEMA, isolation: 'worktree', model: 'opus' })

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
Non-blocking (fix each one worth fixing within the issue's scope; leave one only with a reason): ${JSON.stringify(nonBlocking)}

Run the checks the change touches. Then update the PR body (mise exec -- gh pr edit ${contrib.pr} --body-file <file>): in its Checks section, the line "${reviewLine()}" (replace the "Fresh-agent review:" line if one exists; the non-blocking findings you left go in "Review first", each with its reason), and keep the rest of the body coherent with the change. Return the new head sha, what you fixed, and what you left with its reason.`,
    { label: `corrections ${round} PR #${contrib.pr}`, phase: 'Correct', schema: FIX_SCHEMA, isolation: 'worktree', model: 'opus' })
  if (!fix) return { status: 'failed', stage: `correct-${round}`, contrib, review, rounds, deviations: contrib.deviations }
  const verify = await agent(`${REVIEW_BASE}

You verify corrections, as step 4 of /feyn-pr-review says, as a new agent. The reviewed head was ${head}; the corrections are in ${head}..${fix.head}. The findings raised were: blocking ${JSON.stringify(blocking)}; non-blocking ${JSON.stringify(nonBlocking)}. The corrector says it fixed ${JSON.stringify(fix.fixed)} and left ${JSON.stringify(fix.left)}. Recheck each finding against the diff, rerun the Done when statements and checks the corrections touch, read everything in the correction diff beyond the findings. Return conform true when no blocking finding remains and every left non-blocking finding has an acceptable reason; the head you verified; the blocking and non-blocking findings still open or new; notes.`,
    { label: `verify ${round} PR #${contrib.pr}`, phase: 'Correct', schema: VERIFY_SCHEMA, isolation: 'worktree', model: 'opus' })
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
  // The orchestrator checks this line is in the PR's Checks at the hand-over (observation) or
  // at the merge (epic): when the first review found nothing, no corrector wrote it.
  reviewLine: reviewLine(),
  rounds: rounds.map(r => ({ round: r.round, fixed: r.fix.fixed, left: r.fix.left, conform: r.verify.conform, notes: r.verify.notes })),
}
if (OBS) return { status: 'ready-for-handover', ...report }

// ---------- Merge
phase('Merge')
const merge = await agent(`You merge PR #${contrib.pr} of feyn into the integration branch ${A.base} and close its slice #${A.issue}. Use only gh commands (through "mise exec --"); run no git command and no cd: your working directory is the repository's main checkout and must not change.
1. "mise exec -- gh pr view ${contrib.pr} --json baseRefName,headRefOid,state,isDraft": the base must be ${A.base} and the head ${head}; otherwise stop and report the problem, merging nothing.
2. "mise exec -- gh pr ready ${contrib.pr}", then "mise exec -- gh pr merge ${contrib.pr} --squash --match-head-commit ${head}" (no --delete-branch: it would touch the local checkout). Read "mise exec -- gh pr view ${contrib.pr} --json state,mergeCommit": state MERGED, note the merge commit sha.
   Leave the slice's remote branch: remote branches are the maintainer's, and decision epic-on-integration-branch grants the merge and the close, not a deletion.
3. Close the issue: "mise exec -- gh issue close ${A.issue} --reason completed --comment 'Delivered by PR #${contrib.pr}, merged into the integration branch ${A.base} of epic #${A.epic}.'".
4. Read the Status: "mise exec -- gh issue view ${A.issue} --json state,projectItems". The Project workflow "Item closed" sets Done within seconds; read again once after a few seconds if not. Still not Done and the item is listed: set it as ".claude/reference/project.md", "Commands", says ("Set" the Status, by name, to Done), then read it again.
Return merged, the merge commit sha, issueClosed, the Status read last exactly as read ("archived" when the item is archived, "none" when no item is listed), and every problem (an empty list if none).`,
  { label: `merge PR #${contrib.pr}`, phase: 'Merge', schema: MERGE_SCHEMA, model: 'sonnet', effort: 'low' })

// A slice not closed or not Done is a problem for the orchestrator, never a note.
const problems = []
if (!merge) problems.push('the merge agent returned nothing')
else {
  if (!merge.merged) problems.push(`PR #${contrib.pr} not merged into ${A.base}`)
  if (!merge.issueClosed) problems.push(`slice #${A.issue} not closed`)
  if (merge.status !== 'Done') problems.push(`slice #${A.issue} Status is "${merge.status}", not Done`)
  // Drop empty items and "none"-like answers: they are not problems.
  const met = (Array.isArray(merge.problems) ? merge.problems : [merge.problems])
    .map(p => String(p || '').trim()).filter(p => p && !/^(none|no problems?|n\/a|-)\.?$/i.test(p))
  problems.push(...met)
}
const status = !merge || !merge.merged ? 'merge-failed' : problems.length ? 'merged-with-problems' : 'merged'
return { status, problems, ...report, merge }
