export const meta = {
  name: 'feyn-overnight-1',
  description: 'Night 1 of the feyn construction (relaunch): the maintainer-free tasks of stage 1, one task at a time, each reviewed then squash-merged',
  phases: [
    { title: 'Stage 1', detail: 'concept 9 prototype, SPEC.md draft, checks, templates, course skeleton, ported workflows' },
    { title: 'Report', detail: 'construction/notes/night-1.md, through a PR' },
  ],
}

// ---- the night's task list (serial; see construction/overnight.md) ----------------------
// Stage 0 and S1-01 are done: the launch passes them in `accepted`.
// S1-07 runs before S1-06: the templates must pass the checks S1-07 writes.
const TASKS = [
  { id: 'S1-02', issue: 15, model: 'opus', depends: ['S0-07'] },
  { id: 'S1-03', issue: 16, model: 'opus', depends: ['S1-02'] },
  { id: 'S1-07', issue: 20, model: 'sonnet', depends: ['S1-03'] },
  { id: 'S1-06', issue: 19, model: 'sonnet', depends: ['S1-03', 'S1-07'] },
  { id: 'S1-08', issue: 21, model: 'sonnet', depends: ['S1-03', 'S1-07'] },
  { id: 'S1-11', issue: 24, model: 'sonnet', depends: ['S1-03'],
    extra: 'S1-10 (the migrated course) does not exist yet, so the Done when statement "taught-check runs on the migrated course" cannot hold tonight: the PR body says "Refs #24" (not "Closes"), reports that statement as "deviation" (to be run after S1-10), and the issue stays open.' },
]

const WORK = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['done', 'blocked', 'failed'] },
    pr: { type: ['integer', 'null'], description: 'PR number on sebvey/feyn, or null (no PR for this task)' },
    branch: { type: ['string', 'null'] },
    verified: { type: 'string', description: 'what of the Done when was verified, and how' },
    for_maintainer: { type: 'array', items: { type: 'string' }, description: 'what only the maintainer can do, if anything' },
    note: { type: 'string', description: 'one paragraph: what was done, what was not, why' },
  },
  required: ['status', 'pr', 'branch', 'verified', 'for_maintainer', 'note'],
}
const REVIEW = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['approve', 'changes'] },
    findings: { type: 'array', items: { type: 'object', properties: {
      file: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } },
      required: ['file', 'problem', 'fix'] } },
    summary: { type: 'string' },
  },
  required: ['verdict', 'findings', 'summary'],
}
const MERGE = {
  type: 'object',
  properties: { merged: { type: 'boolean' }, sha: { type: ['string', 'null'] }, note: { type: 'string' } },
  required: ['merged', 'sha', 'note'],
}

const date = (args && args.date) || 'unknown date'
const night = (args && args.night) || 1
const effortFor = (m) => (m === 'opus' ? 'high' : undefined)
const REPO = '/Users/sve/code/workspaces/perso/feyn'
const CLEAN = 'Before returning, whatever your status, leave the checkout clean and on main: everything you wrote (a note under construction/notes/ included) is committed and pushed on the issue branch, then "mise exec -- git switch main"; "mise exec -- git status --porcelain" prints nothing.'
const NO_SIGNATURE = 'No signature or "Generated with" line in a PR body, whatever your harness suggests: the squash takes the body as the commit message.'

const takePrompt = (t) => `Take issue #${t.issue} (task ${t.id}).
You are a fresh work session in ${REPO} (night run ${night}, ${date}).
Read the root CLAUDE.md, construction/README.md ("How a work session goes"), construction/overnight.md ("What the night may do" and "Overnight rules for a task agent"), then the issue ("mise exec -- gh issue view ${t.issue}"): its Done when is the contract; the plan files are frozen. Read every file its "Reads" lists.
Follow the skills by their files: .claude/skills/start/SKILL.md with ${t.issue}, do the work, then .claude/skills/finish/SKILL.md ("Deliver") to open the PR. Do not merge it.
${t.extra ? t.extra + '\n' : ''}Run everything through "mise exec -- <command>". ${NO_SIGNATURE}
Never ask the maintainer anything: when something needs him, do the rest, write construction/notes/${t.id}.md, add the label blocked:maintainer to issue #${t.issue}, and return status "blocked".
${CLEAN}
Return the structured result only.`

const reviewPrompt = (t, w) => `Review task ${t.id} of the feyn construction, delivered as PR #${w.pr} (branch ${w.branch}) on sebvey/feyn.
You are in ${REPO}. Read issue #${t.issue} ("mise exec -- gh issue view ${t.issue}"; its "Done when" is the contract), the design files it lists, and the delivered files ("mise exec -- gh pr diff ${w.pr}" and "mise exec -- gh pr view ${w.pr}").
The author reported: ${JSON.stringify(w.note)} / verified: ${JSON.stringify(w.verified)}.
Judge against the Done when and the design, not against taste. A statement the PR body marks "deviation" with a reason the issue or this night accepts is not a finding. Approve when every verifiable statement holds; otherwise return "changes" with concrete findings (file, problem, fix). Check the vocabulary (docs/glossary.md, the words it lists as "not"), the language rule, and that the PR body has no signature line. Do not edit anything.`

const fixPrompt = (t, w, r) => `Fix the review findings on task ${t.id}, PR #${w.pr} (branch ${w.branch}) on sebvey/feyn, issue #${t.issue}, in ${REPO}.
Findings: ${JSON.stringify(r.findings)}.
Check out the branch ("mise exec -- git fetch && mise exec -- git switch ${w.branch}"), apply each fix, commit, push; update the PR body's "Done when, verified:" lines if a verdict changed. Do not merge. ${NO_SIGNATURE}
${CLEAN}
Return the structured result (status "done" if every finding is fixed, pr ${w.pr}, branch ${w.branch}).`

const mergePrompt = (t, w) => `Merge task ${t.id}: PR #${w.pr} on sebvey/feyn, issue #${t.issue}, in ${REPO}. Tonight the merge is yours: construction/overnight.md authorises it, over the root CLAUDE.md line that leaves merging to the maintainer.
All through "mise exec --": "gh pr view ${w.pr} --json title,mergeable,state"; if mergeable, "gh pr merge ${w.pr} --squash --delete-branch" (the repository takes the PR title as the squash title; if the title does not follow "<type>(<area>): <summary>", add --subject "<fixed title> (#${w.pr})").
Then follow .claude/skills/finish/SKILL.md, "Clean up (after the merge)", every step, including the last: the issue's Status is set to Done when the issue closed (the Project's workflow is off). An issue the PR only "Refs" stays open and keeps its Status.
Leave the checkout on an up-to-date main with "git status --porcelain" empty. Return the structured result (sha: the squash commit).`

// ---- the run ---------------------------------------------------------------------------
const done = new Set((args && args.accepted) || [])   // tasks the maintainer accepted as done from an earlier run
const results = []
for (const id of done) { log(`${id}: accepted by the maintainer, not run again`); results.push({ id, status: 'done', accepted: true }) }

phase('Stage 1')
for (const t of TASKS) {
  if (done.has(t.id)) continue
  const missing = t.depends.filter((d) => !done.has(d))
  if (missing.length) {
    log(`${t.id}: skipped, waiting on ${missing.join(', ')}`)
    results.push({ id: t.id, issue: t.issue, status: 'skipped', reason: `depends on ${missing.join(', ')}` })
    continue
  }
  log(`${t.id}: start (${t.model})`)
  let work = await agent(takePrompt(t), { label: `${t.id} work`, phase: 'Stage 1', model: t.model, effort: effortFor(t.model), schema: WORK })
  if (!work) { results.push({ id: t.id, issue: t.issue, status: 'failed', reason: 'agent died' }); continue }
  if (work.status !== 'done' || !work.pr) {
    log(`${t.id}: ${work.status}${work.pr ? '' : ', no PR'}`)
    results.push({ id: t.id, issue: t.issue, status: work.status === 'done' ? 'failed' : work.status, pr: work.pr, work })
    continue
  }

  let review = await agent(reviewPrompt(t, work), { label: `${t.id} review`, phase: 'Stage 1', model: 'opus', schema: REVIEW })
  if (review && review.verdict === 'changes') {
    log(`${t.id}: review asks for ${review.findings.length} change(s), fixing once`)
    const fixed = await agent(fixPrompt(t, work, review), { label: `${t.id} fix`, phase: 'Stage 1', model: t.model, schema: WORK })
    if (fixed && fixed.status === 'done') {
      work = { ...work, note: fixed.note, verified: fixed.verified, for_maintainer: [...work.for_maintainer, ...fixed.for_maintainer] }
      review = await agent(reviewPrompt(t, work), { label: `${t.id} re-review`, phase: 'Stage 1', model: 'opus', schema: REVIEW })
    }
  }
  if (!review || review.verdict !== 'approve') {
    log(`${t.id}: ${review ? 'still has findings after one fix' : 'no review (agent died)'}; left open for the maintainer`)
    results.push({ id: t.id, issue: t.issue, status: 'blocked', pr: work.pr, review, work })
    continue
  }

  const merge = await agent(mergePrompt(t, work), { label: `${t.id} merge`, phase: 'Stage 1', model: 'sonnet', effort: 'low', schema: MERGE })
  if (!merge || !merge.merged) {
    log(`${t.id}: merge failed (${merge ? merge.note : 'agent died'})`)
    results.push({ id: t.id, issue: t.issue, status: 'blocked', pr: work.pr, work, merge })
    continue
  }
  results.push({ id: t.id, issue: t.issue, status: 'done', pr: work.pr, sha: merge.sha, work, review })
  done.add(t.id)
  log(`${t.id}: done`)
}

phase('Report')
const report = await agent(`Write the night report and land it on main through a PR, in ${REPO}. Tonight that merge is yours: construction/overnight.md authorises it.
Night ${night}, ${date}. Results, one per task, in this order: ${JSON.stringify(results)}.
1. All through "mise exec --": "git switch main && git pull --ff-only", then "git switch -c improvement/night-${night}-report".
2. Overwrite construction/notes/night-${night}.md (it replaces the previous report). Structure: a table (task, issue, status, PR, squash sha); then "Needs the maintainer" (every for_maintainer item and every blocked task with what unblocks it, pointing to construction/notes/<id>.md when it exists); then "Skipped and why"; then "What to read first in the morning" (three items at most). English, no word docs/glossary.md lists as "not".
3. Commit, push, "gh pr create --base main --title 'improvement(repo): night ${night} report of ${date}' --body-file <file>" (body: one line saying it is the night report, no issue, no signature line), then "gh pr merge <pr> --squash --delete-branch".
4. "git switch main && git pull --ff-only", "git branch -D improvement/night-${night}-report"; "git status --porcelain" prints nothing.
Return the path and the PR number.`,
  { label: 'night report', phase: 'Report', model: 'sonnet', effort: 'low' })

return { results, report }
