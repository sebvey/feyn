export const meta = {
  name: 'feyn-overnight-1',
  description: 'Night 1 of the feyn construction: stage 0, then the maintainer-free tasks of stage 1, one task at a time, each reviewed then squash-merged',
  phases: [
    { title: 'Stage 0', detail: 'foundation: freeze, repository, glossary, decisions, issues, skills, feyn-site' },
    { title: 'Stage 1', detail: 'distillation table, concept 9 prototype, SPEC.md draft, templates, checks, course skeleton, ported workflows' },
    { title: 'Report', detail: 'construction/notes/night-1.md' },
  ],
}

// ---- the night's task list (serial; see construction/overnight.md) ----------------------
const TASKS = [
  { id: 'S0-01', stage: 'Stage 0', file: 'stage-0.md', model: 'sonnet', depends: [], kind: 'foreign' },
  { id: 'S0-02', stage: 'Stage 0', file: 'stage-0.md', model: 'sonnet', depends: [], kind: 'init' },
  { id: 'S0-03', stage: 'Stage 0', file: 'stage-0.md', model: 'opus', depends: ['S0-02'] },
  { id: 'S0-04', stage: 'Stage 0', file: 'stage-0.md', model: 'sonnet', depends: ['S0-02'] },
  { id: 'S0-05', stage: 'Stage 0', file: 'stage-0.md', model: 'opus', depends: ['S0-04'] },
  { id: 'S0-06', stage: 'Stage 0', file: 'stage-0.md', model: 'sonnet', depends: ['S0-02'] },
  { id: 'S0-07', stage: 'Stage 0', file: 'stage-0.md', model: 'sonnet', depends: ['S0-04', 'S0-05'] },
  { id: 'S1-01', stage: 'Stage 1', file: 'stage-1.md', model: 'sonnet', depends: ['S0-07'] },
  { id: 'S1-02', stage: 'Stage 1', file: 'stage-1.md', model: 'opus', depends: ['S0-07'] },
  { id: 'S1-03', stage: 'Stage 1', file: 'stage-1.md', model: 'opus', depends: ['S1-02'] },
  { id: 'S1-06', stage: 'Stage 1', file: 'stage-1.md', model: 'sonnet', depends: ['S1-03'] },
  { id: 'S1-07', stage: 'Stage 1', file: 'stage-1.md', model: 'sonnet', depends: ['S1-03'] },
  { id: 'S1-08', stage: 'Stage 1', file: 'stage-1.md', model: 'sonnet', depends: ['S1-03', 'S1-07'] },
  { id: 'S1-11', stage: 'Stage 1', file: 'stage-1.md', model: 'sonnet', depends: ['S1-03'] },
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
const effortFor = (m) => (m === 'opus' ? 'high' : undefined)

const takePrompt = (t) => `Take ${t.id}.
You are a fresh work session in /Users/sve/code/workspaces/perso/feyn (night run ${(args && args.night) || 1}, ${date}).
Read construction/README.md ("How a work session goes") and construction/overnight.md ("Overnight rules for a task agent"), then construction/plan/${t.file}, task ${t.id}, and every file its "Reads" lists.
Do the task. Deliver a PR on sebvey/feyn (do not merge it) unless the task says otherwise:
${t.kind === 'foreign' ? '- this task works in ../pdx/parcours-po and ../pdx/parcours-po-website through their own PR flow; there you open AND merge the two PRs yourself; return pr: null.' : ''}${t.kind === 'init' ? '- this task creates the repository; its first commit lands on main directly (there is no main to branch from before it); return pr: null.' : ''}
Run everything through "mise exec -- <command>". Never ask the maintainer anything: when something needs him, do the rest, write construction/notes/${t.id}.md, and return status "blocked".
Return the structured result only.`

const reviewPrompt = (t, w) => `Review task ${t.id} of the feyn construction, delivered ${w.pr ? `as PR #${w.pr} (branch ${w.branch}) on sebvey/feyn` : 'directly in the working tree / the repositories it names'}.
You are in /Users/sve/code/workspaces/perso/feyn. Read construction/plan/${t.file}, task ${t.id} (its "Done when" is the contract), the design files it lists, and the delivered files (${w.pr ? `"mise exec -- gh pr diff ${w.pr}" and "gh pr view ${w.pr}"` : 'git status, git log -3, the files the task names'}).
The author reported: ${JSON.stringify(w.note)} / verified: ${JSON.stringify(w.verified)}.
Judge against the Done when and the design, not against taste. Approve when every verifiable statement holds; otherwise return "changes" with concrete findings (file, problem, fix). Check the vocabulary (construction/design/13-glossary.md banned words) and the language rule. Do not edit anything.`

const fixPrompt = (t, w, r) => `Fix the review findings on task ${t.id}, PR #${w.pr} (branch ${w.branch}) on sebvey/feyn, in /Users/sve/code/workspaces/perso/feyn.
Findings: ${JSON.stringify(r.findings)}.
Check out the branch ("mise exec -- git fetch && mise exec -- git switch ${w.branch}"), apply each fix, commit, push. Do not merge. Return the structured result (status "done" if every finding is fixed).`

const mergePrompt = (t, w) => `Merge task ${t.id}: PR #${w.pr} on sebvey/feyn, in /Users/sve/code/workspaces/perso/feyn.
Steps, all through "mise exec --": "gh pr view ${w.pr} --json title,mergeable,state"; if mergeable, "gh pr merge ${w.pr} --squash --delete-branch" (keep the PR title, it follows "<type>(<area>): <summary>"; if it does not, set a title that does with --subject); then "git switch main && git pull --ff-only"; then "git log -1 --format=%H" and confirm the squash commit mentions #${w.pr} or the task id. Delete the local branch if it still exists. Return the structured result.`

// ---- the run ---------------------------------------------------------------------------
const done = new Set((args && args.accepted) || [])   // tasks the maintainer accepted as done from an earlier run
const results = []
for (const id of done) { log(`${id}: accepted by the maintainer, not run again`); results.push({ id, status: 'done', accepted: true }) }

for (const t of TASKS) {
  if (done.has(t.id)) continue
  const missing = t.depends.filter((d) => !done.has(d))
  if (missing.length) {
    log(`${t.id}: skipped, waiting on ${missing.join(', ')}`)
    results.push({ id: t.id, status: 'skipped', reason: `depends on ${missing.join(', ')}` })
    continue
  }
  log(`${t.id}: start (${t.model})`)
  let work = await agent(takePrompt(t), { label: `${t.id} work`, phase: t.stage, model: t.model, effort: effortFor(t.model), schema: WORK })
  if (!work) { results.push({ id: t.id, status: 'failed', reason: 'agent died' }); continue }

  if (work.status === 'done') {
    let review = await agent(reviewPrompt(t, work), { label: `${t.id} review`, phase: t.stage, model: 'opus', schema: REVIEW })
    if (review && review.verdict === 'changes' && work.pr) {
      log(`${t.id}: review asks for ${review.findings.length} change(s), fixing once`)
      const fixed = await agent(fixPrompt(t, work, review), { label: `${t.id} fix`, phase: t.stage, model: t.model, schema: WORK })
      if (fixed && fixed.status === 'done') {
        review = await agent(reviewPrompt(t, work), { label: `${t.id} re-review`, phase: t.stage, model: 'opus', schema: REVIEW })
      }
    }
    if (review && review.verdict === 'changes' && work.pr) {
      log(`${t.id}: still has findings after one fix; left open for the maintainer`)
      results.push({ id: t.id, status: 'blocked', pr: work.pr, review, work })
      continue
    }
    if (review && review.verdict === 'changes' && !work.pr) {
      log(`${t.id}: no PR to fix; the work is done, the review's findings go to the report`)
    }
    if (work.pr) {
      const merge = await agent(mergePrompt(t, work), { label: `${t.id} merge`, phase: t.stage, model: 'sonnet', effort: 'low', schema: MERGE })
      if (!merge || !merge.merged) {
        log(`${t.id}: merge failed (${merge ? merge.note : 'agent died'})`)
        results.push({ id: t.id, status: 'blocked', pr: work.pr, work, merge })
        continue
      }
      results.push({ id: t.id, status: 'done', pr: work.pr, sha: merge.sha, work, review })
    } else {
      results.push({ id: t.id, status: 'done', pr: null, work, review })
    }
    done.add(t.id)
    log(`${t.id}: done`)
  } else {
    log(`${t.id}: ${work.status}`)
    results.push({ id: t.id, status: work.status, pr: work.pr, work })
    if (work.status === 'blocked' && work.pr === null && t.id === 'S1-01') done.add(t.id) // the table is written; validation is the maintainer's
  }
}

phase('Report')
const report = await agent(`Write construction/notes/night-1.md in /Users/sve/code/workspaces/perso/feyn (do not commit it; leave it untracked on the main working tree).
Night ${(args && args.night) || 1}, ${date}. Results, one per task, in this order: ${JSON.stringify(results)}.
Structure: a table (task, status, PR, squash sha); then "Needs the maintainer" (every for_maintainer item and every blocked task with what unblocks it, pointing to construction/notes/<id>.md when it exists); then "Skipped and why"; then "What to read first in the morning" (three items at most). English, no banned words (construction/design/13-glossary.md). Return the path.`,
  { label: 'night report', phase: 'Report', model: 'sonnet', effort: 'low' })

return { results, report }
