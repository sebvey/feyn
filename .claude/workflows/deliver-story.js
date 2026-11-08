export const meta = {
  name: 'feyn-deliver-story-workflow',
  description: 'Deliver one story of feyn through agents: contributor, fresh-agent review and its corrections by the same agent, then a merge into the epic\'s integration branch (a story under an epic) or a hand-over (a story without an epic)',
  whenToUse: 'Run by the orchestrator of an epic for each story of it (epic mode: args.epic and args.base given; decision epic-on-integration-branch), or by whoever delivers a story without an epic (no-epic mode: no args.epic; the PR targets main and the maintainer merges it; decision story-with-or-without-an-epic). args: { issue: <n>, issueBody: "<the issue\'s body, verbatim>", epic?: <n>, base?: "<integration branch>", planComment?: "<the epic\'s plan comment, verbatim>", work?: "<guidance for the contributor beyond the issue>", dryRun?: true }. issueBody is read by the caller ("mise exec -- gh issue view <n> --json body --jq .body"), planComment in epic mode (the body of the plan comment, .claude/reference/project.md, "Epics"): the script cannot run gh, and the contributor gets them in its prompt. dryRun spawns no agent and returns the steps of the mode the args select.',
  phases: [
    { title: 'Contribute', detail: 'a contributor agent in a worktree opens a draft PR to the base' },
    { title: 'Review', detail: 'the fixer, a fresh agent, reviews the PR against the issue\'s Done when, reports its findings, then corrects what it located and checks each fix in the diff' },
    { title: 'Review line', detail: 'the review line written into the PR body and read back' },
    { title: 'Merge', detail: 'epic mode only: squash into the integration branch, close the story, check it is Done' },
  ],
}

// Generic: nothing here belongs to one epic, one story or one machine. The repository's main
// checkout is found by the agents themselves (the first path "git worktree list" prints); the
// rules cite the decision epic-on-integration-branch, not a date.
// Briefs: the contributor is the project subagent feyn-contributor (.claude/agents/feyn-contributor.md,
// its agentType), which runs /feyn-issue-branch and /feyn-pull-request with their parameters
// (base, worktree; base, draft) and rewrites none of their steps (decision one-moment-one-file);
// this workflow's prompt gives it the run's parameters, its delivery rules and its start material
// (the issue's body, the epic's plan comment), which the caller passes in args since a workflow
// script runs no shell. Every project subagent preloads the instructions skills
// (feyn-instructions-project, feyn-instructions-worktree) and no CLAUDE.md.
// The review and its corrections are the project subagent feyn-pr-fixer
// (.claude/agents/feyn-pr-fixer.md, its agentType: the reviewer brief of feyn-pr-reviewer as its
// review step, then its correction step), with this workflow's additions in its prompt: the agent
// that located a defect corrects it, and checks each fix in the diff (decision
// fresh-agent-review-before-maintainer). The steps 2 and 3 of /feyn-pr-review (spawn, return) are
// folded in here, since the workflow spawns the agent itself.

const A = args || {}
if (!A.issue) throw new Error('args.issue missing: args are { issue, issueBody, epic?, base?, planComment?, work?, dryRun? }')
if (!A.dryRun && !A.issueBody) throw new Error('args.issueBody missing: the caller reads the issue\'s body ("mise exec -- gh issue view <n> --json body --jq .body") and passes it')
if (!A.dryRun && A.epic && !A.planComment) throw new Error('args.planComment missing: epic mode needs the body of the epic\'s plan comment')
if (A.epic && !A.base) throw new Error('args.base missing: epic mode needs the integration branch of the epic')
if (A.base && !A.epic) throw new Error('args.epic missing: a base other than main is the integration branch of an epic')

// No epic: a story without an epic, its PR to main, handed over to the maintainer who merges (no
// Merge phase).
const ALONE = !A.epic
const BASE = ALONE ? 'main' : A.base
const MODE = ALONE ? 'no-epic' : 'epic'
const SCOPE = ALONE ? 'a story without an epic' : `a story of epic #${A.epic}`
const DW = ALONE ? "the issue's Done when" : "the epic's Done when"
const WORK = A.work || "The issue's To do is the plan."
// A maintainer's request reaches the agents only through args.work (feyn-deliver-story-alone
// step 2.1): the contributor records it in "Delivery notes", and the fixer gets work as given, to
// check a choice the PR says the maintainer asked.
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
  `review and fix: the fixer (feyn-pr-fixer, a fresh agent) reviews the PR against the Done when of #${A.issue} and reports its findings, then corrects on the PR's branch the blocking ones it located and the non-blocking ones worth fixing, and checks each fix in the diff; a blocking finding left: status needs-orchestrator`,
  'review line: the "Fresh-agent review:" line written into the PR\'s Checks and read back; not there: status failed, stage review-line',
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
const DEVIATIONS = `A choice that departs from ${DW} or from a principle of its decisions, or adds structure (a new file, a category, a marker, an exception to a principle), you make it, go on, and report it in "deviations" with the options ruled out and the cost of going back: ${ALONE ? 'name each one costly to undo or foundational (vocabulary, the structure of a file of reference, the teacher\'s behaviour) in the PR\'s "Review first" (one bullet can name several), its detail in "Delivery notes"; one that is neither stays in "Delivery notes": the orchestrator checks it is there' : 'the orchestrator sorts each (".claude/reference/sort.md") and turns into an open question to the maintainer only what nothing settles'}.`

const RULES = ALONE
  ? `Delivery rules of a story without an epic (decision epic-on-integration-branch: "A story without an epic stays one PR to main, merged by the maintainer"): the PR targets main (--base main) and the maintainer merges it; you never merge. The maintainer is not asked during the run: a choice the issue does not settle, you make it and list it with its options ruled out in the Choices section of the PR comment "Delivery notes"; only one that needs the maintainer's judgment also goes up into the PR's "Review first", within its 1 to 3 bullets; a counterfactual missing from the material is proposed by the contributor, listed in Choices, and goes up into "Review first" (the maintainer accepts it). ${DEVIATIONS} ${DONE_WHEN} ${MADE_FALSE} ${DECISIONS_AND_WORDS} ${CHECKOUT} Never merge, never force-push, never delete a remote branch. Commands: git plain; gh and node through "mise exec --".`
  : `Delivery rules of epic #${A.epic} (decision epic-on-integration-branch): its stories do NOT go to main. They land on the integration branch "${A.base}" (on origin), which the skills take as their --base. The maintainer is not asked during a story: a choice the issue does not settle, you make it and list it with its options ruled out in the Choices section of the PR comment "Delivery notes"; only one that needs the maintainer's judgment also goes up into the PR's "Review first", within its 1 to 3 bullets; a counterfactual missing from the material is proposed by the contributor, listed in Choices, and goes up into "Review first" (the maintainer accepts it); the maintainer validates everything by merging the epic's PR into main. ${DEVIATIONS} ${DONE_WHEN} ${MADE_FALSE} ${DECISIONS_AND_WORDS} ${CHECKOUT} Never merge, never force-push, never delete a remote branch. Commands: git plain; gh and node through "mise exec --".`

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

const FIXER_SCHEMA = {
  type: 'object',
  properties: {
    head: { type: 'string', description: 'the full 40-character sha of the PR head commit you reviewed (its headRefOid), never a short sha' },
    verdicts: { type: 'array', items: { type: 'object', properties: { statement: { type: 'string' }, verdict: { type: 'string', enum: ['met', 'not met', 'deviation'] }, proof: { type: 'string' } }, required: ['statement', 'verdict', 'proof'] } },
    blocking: { type: 'array', items: FINDING, description: 'the blocking findings of your review, as found, before any fix' },
    nonBlocking: { type: 'array', items: FINDING, description: 'the non-blocking findings of your review, as found, before any fix' },
    couldNotCheck: { type: 'string' },
    newHead: { type: 'string', description: 'the full 40-character sha of the PR head after your push (its headRefOid), never a short sha; the reviewed head when you pushed nothing' },
    fixed: { type: 'array', items: { type: 'string' }, description: 'each finding fixed, and how its fix was checked in the diff' },
    left: { type: 'array', items: { type: 'object', properties: { finding: { type: 'string' }, blocking: { type: 'boolean' }, reason: { type: 'string' } }, required: ['finding', 'blocking', 'reason'] }, description: 'each finding not fixed, blocking or not, with its reason' },
  },
  required: ['head', 'verdicts', 'blocking', 'nonBlocking', 'couldNotCheck', 'newHead', 'fixed', 'left'],
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
const contrib = await agent(`You are the contributor of this workflow (follow your brief) on issue #${A.issue}, ${SCOPE}: base ${BASE}; the workflow's stage after your PR: ${ALONE ? 'the hand-over' : 'the merge'}.

${RULES}

## The issue #${A.issue}: its body, as the caller read it
<issue>
${A.issueBody}
</issue>${ALONE ? '' : `

## The plan comment of epic #${A.epic}, as the caller read it
<plan-comment>
${A.planComment}
</plan-comment>`}

## The work
${WORK}${RECORD}`,
  { label: `contributor #${A.issue}`, phase: 'Contribute', schema: CONTRIB_SCHEMA, isolation: 'worktree', agentType: 'feyn-contributor', model: 'opus' })

if (!contrib) return { status: 'failed', stage: 'contribute' }
if (contrib.status === 'blocked' || !contrib.pr) return { status: 'blocked', contrib, deviations: contrib.deviations }
log(`PR #${contrib.pr} opened on ${contrib.branch}`)

// ---------- Review
phase('Review')
// The project subagent of .claude/agents/ (decision claude-folder-layout): it reviews as
// feyn-pr-reviewer does, then corrects what it located. No rounds: what it cannot correct within
// the issue's scope ends the run in needs-orchestrator.
const FIXER = 'feyn-pr-fixer'
const fixer = await agent(`You review PR #${contrib.pr} (branch ${contrib.branch}, base ${BASE}) on feyn, which claims to deliver issue #${A.issue}, ${SCOPE}, then you correct what your review located. You are the fixer of this workflow: follow your brief (PR #${contrib.pr}, branch ${contrib.branch}, base ${BASE}, issue #${A.issue}, checks to rerun: those the PR diff touches, agent-workflow run: none), not the steps of ".claude/skills/feyn-pr-review/SKILL.md", which this workflow runs.${ALONE ? '' : ` Read also the epic and its plan comment ("mise exec -- gh issue view ${A.epic} --comments"); the base is ${A.base} wherever the brief or a skill says main.`} You are in your own worktree: "git fetch" then "git switch --detach origin/${contrib.branch}" (the branch is checked out elsewhere); you commit there and push with "git push origin HEAD:${contrib.branch}". ${CHECKOUT} Never force-push.

${RULES}
The PR is a draft until ${ALONE ? 'its hand-over' : 'it is merged'}: not a finding. Under these rules, a choice the contributor made and listed in "Delivery notes" or "Review first", a counterfactual it proposed, and a decision the maintainer has not accepted yet are acceptable when sound: judge them on their merit, never block only because the maintainer has not seen them. Check also the consistency with ${ALONE ? 'the decisions the issue names' : "the epic's Done when and plan comment"}.
${WORK_FOR_REVIEW}

A blocking finding means the PR must not be ${ALONE ? 'handed over' : 'merged'} as is. In the PR body, the "Fresh-agent review:" line of its Checks is left to the workflow, which writes it after you: leave room for it within the limits of /feyn-pull-request step 5.

Return the head sha you reviewed, a verdict per Done when statement with your own proof, the blocking and the non-blocking findings as your review found them (before any fix), what you could not check and why, the new head sha after your push (the reviewed head when you pushed nothing), what you fixed and how you checked it in the diff, and each finding you left, blocking or not, with its reason.`,
  { label: `fixer PR #${contrib.pr}`, phase: 'Review', schema: FIXER_SCHEMA, isolation: 'worktree', agentType: FIXER, model: 'opus' })

if (!fixer) return { status: 'failed', stage: 'review', contrib, deviations: contrib.deviations }
const head = fixer.newHead || fixer.head
const blockingLeft = fixer.left.filter(l => l.blocking)
log(`review: ${fixer.blocking.length} blocking, ${fixer.nonBlocking.length} non-blocking; fixed ${fixer.fixed.length}, left ${fixer.left.length} (${blockingLeft.length} blocking)`)
const firstReview = { blocking: fixer.blocking, nonBlocking: fixer.nonBlocking, couldNotCheck: fixer.couldNotCheck }
if (blockingLeft.length) return { status: 'needs-orchestrator', reason: 'blocking findings the fixer left', contrib, verdicts: fixer.verdicts, firstReview, head, fixed: fixer.fixed, left: fixer.left, deviations: contrib.deviations }

// ---------- Review line
phase('Review line')
// The "Fresh-agent review:" line in /feyn-pull-request's wording (its step 5); <N> counts the
// blocking findings of the review, all fixed (none left, checked above).
const line = fixer.blocking.length ? `Fresh-agent review: ${fixer.blocking.length} blocking findings, fixed.` : 'Fresh-agent review: no blocking finding.'

// The review line, written here by the workflow itself, before the Merge stage and before
// ready-for-handover: when the review finds nothing, the fixer changes nothing, and no
// orchestrator adds it after (issue #586). The write is read back (.claude/reference/project.md,
// "GitHub writes") and checked here.
const LINE_SCHEMA = {
  type: 'object',
  properties: {
    lineReadBack: { type: 'string', description: 'the line of the PR body, read back after the edit, that starts with "- Fresh-agent review:", without its "- ", exactly as read; "" when none' },
    problems: { type: 'array', items: { type: 'string' }, description: 'every problem met; an empty array if none' },
  },
  required: ['lineReadBack', 'problems'],
}
const written = await agent(`You write one line into the body of PR #${contrib.pr} of feyn. Use only gh commands (through "mise exec --"); run no git command and no cd: your working directory is the work session's and must not change.
1. "mise exec -- gh pr view ${contrib.pr} --json body --jq .body" into a file of your scratchpad.
2. In its "## Checks" section, the line "- ${line}": it replaces the line that starts with "- Fresh-agent review:" when there is one, otherwise it goes as the last bullet of Checks, before "- Not verified:" when that bullet exists. Change nothing else in the body.
3. "mise exec -- gh pr edit ${contrib.pr} --body-file <that file>", then read the body again ("mise exec -- gh pr view ${contrib.pr} --json body --jq .body").
Return the line of the body read back that starts with "- Fresh-agent review:" (without its "- "), exactly as read, "" when there is none, and every problem met.`,
  { label: `review line PR #${contrib.pr}`, phase: 'Review line', schema: LINE_SCHEMA, model: 'sonnet', effort: 'low' })
if (!written || written.lineReadBack.trim() !== line) return { status: 'failed', stage: 'review-line', reviewLine: line, written, contrib, verdicts: fixer.verdicts, firstReview, head, fixed: fixer.fixed, left: fixer.left, deviations: contrib.deviations }
log(`review line written: ${line}`)

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
  verdicts: fixer.verdicts,
  firstReview,
  // Written into the PR's Checks and read back above.
  reviewLine: line,
  // The fixer's corrections: what it fixed, and what it left with its reason (no blocking one).
  fixed: fixer.fixed,
  left: fixer.left,
}
if (ALONE) return { status: 'ready-for-handover', ...report }

// ---------- Merge
phase('Merge')
const merge = await agent(`You merge PR #${contrib.pr} of feyn into the integration branch ${A.base} and close its story #${A.issue}. Use only gh commands (through "mise exec --"); run no git command and no cd: your working directory is the work session's and must not change.
1. "mise exec -- gh pr view ${contrib.pr} --json baseRefName,headRefOid,state,isDraft": the base must be ${A.base} and the head (headRefOid, the full 40-character sha) must start with ${head}; otherwise stop and report the problem, merging nothing.
2. "mise exec -- gh pr ready ${contrib.pr}", then "mise exec -- gh pr merge ${contrib.pr} --squash --match-head-commit <headRefOid>", with the full headRefOid read at step 1, never a short sha (no --delete-branch: it would touch the local checkout). Read "mise exec -- gh pr view ${contrib.pr} --json state,mergeCommit": state MERGED, note the merge commit sha.
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
