export const meta = {
  name: 'feyn-overnight-2',
  description: 'Night 2 of the feyn construction: protocol and language pack (if the distillation table is validated), migration workflow and the 20 concept migrations in parallel, then taught-check and review (if the maintainer has read SPEC.md)',
  phases: [
    { title: 'Protocol', detail: 'S1-04 protocol, S1-05 language pack, S1-14 decisions; needs gates.distillationValidated' },
    { title: 'Migration', detail: 'S1-09 migrate-concept workflow, then S1-10: 20 concepts in parallel worktrees; needs gates.specRead' },
    { title: 'Verification', detail: 'S1-12: taught-check, two reviewers, fixes' },
    { title: 'Report', detail: 'construction/notes/night-2.md' },
  ],
}

const ROOT = '/Users/sve/code/workspaces/perso/feyn'
const date = (args && args.date) || 'unknown date'
const gates = (args && args.gates) || {}
const CONCEPTS = ['00-scrum', '01-produit-et-po', '02-objectif-produit-resultat', '03-backlog-produit',
  '04-hierarchie', '05-user-story', '06-roles-personas', '07-invest', '08-criteres-regles',
  '09-decoupage-vertical', '10-hors-perimetre-dependances', '11-dor-dod', '12-donnees-produit',
  '13-ordonner-backlog', '14-parties-prenantes', '15-vie-story', '16-story-map',
  '17-hypotheses-exploration', 'A1-outil-backlog', 'A2-sans-sprint']

const WORK = { type: 'object', properties: {
  status: { type: 'string', enum: ['done', 'blocked', 'failed'] },
  pr: { type: ['integer', 'null'] }, branch: { type: ['string', 'null'] },
  verified: { type: 'string' }, for_maintainer: { type: 'array', items: { type: 'string' } }, note: { type: 'string' } },
  required: ['status', 'pr', 'branch', 'verified', 'for_maintainer', 'note'] }
const REVIEW = { type: 'object', properties: {
  verdict: { type: 'string', enum: ['approve', 'changes'] },
  findings: { type: 'array', items: { type: 'object', properties: { file: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } }, required: ['file', 'problem', 'fix'] } },
  summary: { type: 'string' } }, required: ['verdict', 'findings', 'summary'] }
const MERGE = { type: 'object', properties: { merged: { type: 'boolean' }, sha: { type: ['string', 'null'] }, note: { type: 'string' } }, required: ['merged', 'sha', 'note'] }

const common = `You are a fresh work session in ${ROOT} (night run 2, ${date}). Read construction/README.md ("How a work session goes") and construction/overnight.md ("Overnight rules for a task agent"). Issues exist: find yours with "mise exec -- gh issue list --search" on its id, then /start and /finish. If /start refuses because a blocking issue is still open (its blocked-by links), write no file and no comment: return "blocked", naming the blocker. Run everything through "mise exec -- <command>". Never ask the maintainer anything; when something needs him, do the rest, write construction/notes/<task-id>.md and return "blocked". Open the PR, do not merge it. Return the structured result only.`

const takePrompt = (id, file, extra = '') => `Take ${id}.\n${common}\nThen read construction/plan/${file}, task ${id}, and every file its "Reads" lists, and do the task.\n${extra}`
const reviewPrompt = (id, file, w, extra = '') => `Review task ${id}, delivered as PR #${w.pr} (branch ${w.branch}) on sebvey/feyn. You are in ${ROOT}. Read construction/plan/${file}, task ${id} (its "Done when" is the contract), the design files it lists, "mise exec -- gh pr diff ${w.pr}" and "gh pr view ${w.pr}". The author reported: ${JSON.stringify(w.note)} / verified: ${JSON.stringify(w.verified)}. Judge against the Done when and the design, not taste; check vocabulary (construction/design/13-glossary.md) and the language rule. Approve when every verifiable statement holds; otherwise "changes" with concrete findings. Do not edit anything.\n${extra}`
const fixPrompt = (id, w, r) => `Fix the review findings on task ${id}, PR #${w.pr} (branch ${w.branch}) on sebvey/feyn. Findings: ${JSON.stringify(r.findings)}. The branch may be checked out in a worktree: run "mise exec -- git worktree list" in ${ROOT}; if it is, work in that worktree's path, otherwise "git fetch && git switch ${w.branch}" in ${ROOT}. Apply each fix, commit, push. Do not merge. Return the structured result.`
const mergePrompt = (id, w) => `Merge task ${id}: PR #${w.pr} on sebvey/feyn, in ${ROOT}, through "mise exec --": "gh pr view ${w.pr} --json title,mergeable,state"; if mergeable, "gh pr merge ${w.pr} --squash --delete-branch" (title must follow "<type>(<area>): <summary>"; set one with --subject if not); ignore a failure to delete the local branch (it may live in a worktree); then "git switch main && git pull --ff-only" and confirm HEAD mentions #${w.pr} or ${id}. Return the structured result.`

async function deliver(id, file, model, opts = {}) {
  const phase = opts.phase
  let work = await agent(takePrompt(id, file, opts.extra), { label: `${id} work`, phase, model, effort: model === 'opus' ? 'high' : undefined, schema: WORK, isolation: opts.worktree ? 'worktree' : undefined })
  if (!work) return { id, status: 'failed', reason: 'agent died' }
  if (work.status !== 'done') return { id, status: work.status, pr: work.pr, work }
  if (!work.pr) return { id, status: 'blocked', reason: 'done without a PR', work }
  let review = await agent(reviewPrompt(id, file, work, opts.reviewExtra), { label: `${id} review`, phase, model: 'opus', schema: REVIEW })
  if (review && review.verdict === 'changes') {
    const fixed = await agent(fixPrompt(id, work, review), { label: `${id} fix`, phase, model, schema: WORK })
    if (fixed && fixed.status === 'done') review = await agent(reviewPrompt(id, file, work, opts.reviewExtra), { label: `${id} re-review`, phase, model: 'opus', schema: REVIEW })
  }
  if (review && review.verdict === 'changes') return { id, status: 'blocked', pr: work.pr, work, review }
  return { id, status: 'reviewed', pr: work.pr, work, review }
}
async function merge(r, phase) {
  if (r.status !== 'reviewed') return r
  const m = await agent(mergePrompt(r.id, r.work), { label: `${r.id} merge`, phase, model: 'sonnet', effort: 'low', schema: MERGE })
  if (!m || !m.merged) return { ...r, status: 'blocked', merge: m }
  return { ...r, status: 'done', sha: m.sha }
}

const results = []
const done = new Set()
const record = (r) => { results.push(r); if (r.status === 'done') done.add(r.id); log(`${r.id}: ${r.status}`) }

// ---- Protocol (gate: distillation table validated) --------------------------------------
phase('Protocol')
if (!gates.distillationValidated) {
  log('Protocol phase skipped: gates.distillationValidated is not set (validate construction/notes/S1-01-distillation.md first)')
} else {
  record(await merge(await deliver('S1-04', 'stage-1.md', 'opus', { phase: 'Protocol' }), 'Protocol'))
  if (done.has('S1-04')) {
    const [p5, p14] = await parallel([
      () => deliver('S1-05', 'stage-1.md', 'sonnet', { phase: 'Protocol', worktree: true }),
      () => deliver('S1-14', 'stage-1.md', 'opus', { phase: 'Protocol', worktree: true }),
    ])
    for (const r of [p5, p14].filter(Boolean)) record(await merge(r, 'Protocol'))
  }
}

// ---- Migration (gate: SPEC.md read by the maintainer) -----------------------------------
phase('Migration')
if (!gates.specRead) {
  log('Migration phase skipped: gates.specRead is not set (read specs/linear-course/SPEC.md and the S1-02 note first)')
} else {
  record(await merge(await deliver('S1-09', 'stage-1.md', 'opus', { phase: 'Migration' }), 'Migration'))
  if (done.has('S1-09')) {
    const extra = (c) => `This is sub-task S1-10.${c.slice(0, 2)}: migrate concept ${c}. If the Workflow tool is available to you, run .claude/workflows/migrate-concept.js on it; otherwise follow its stages yourself, in order, as the file describes them (read the old concept file, sources, MDX and diagram components in ../pdx/parcours-po and ../pdx/parcours-po-website; write the concept folder; run the checks; write construction/notes/S1-10-${c.slice(0, 2)}-report.md section by section: kept, moved, lost, invented). Work on branch course/<issue>-migrate-${c}. Touch only courses/parcours-po/concepts/${c}/ and your report.`
    const reviewExtra = (c) => `This is a migration: compare old and new yourself, section by section, against ../pdx/parcours-po/course/concepts/${c}.md, ../pdx/parcours-po/course/sources/${c}.md and ../pdx/parcours-po-website/src/content/concepts/fr/${c}.mdx. Anything lost or invented is a finding. Check the SVGs against the drawing contract.`
    const migrated = await pipeline(CONCEPTS,
      (c) => deliver(`S1-10.${c.slice(0, 2)}`, 'stage-1.md', 'sonnet', { phase: 'Migration', worktree: true, extra: extra(c), reviewExtra: reviewExtra(c) }))
    for (const r of migrated.filter(Boolean)) record(await merge(r, 'Migration'))   // merges are serial: one checkout
    const cleanup = await agent(`In ${ROOT}: "mise exec -- git worktree prune"; list remaining worktrees with "git worktree list"; remove with "git worktree remove --force <path>" every worktree whose branch has been merged (check with "gh pr list --state merged --search <branch>"); leave the others; then "git switch main && git pull --ff-only". Return what you removed and what you left.`, { label: 'worktree cleanup', phase: 'Migration', model: 'sonnet', effort: 'low' })
    log(`cleanup: ${String(cleanup).slice(0, 200)}`)
    const allMigrated = CONCEPTS.every((c) => done.has(`S1-10.${c.slice(0, 2)}`))
    if (allMigrated) done.add('S1-10'); else log('S1-10: not every concept merged; S1-12 skipped')
  }
}

// ---- Verification -----------------------------------------------------------------------
phase('Verification')
if (done.has('S1-10')) {
  let taught = null
  try {
    taught = await workflow({ scriptPath: `${ROOT}/.claude/workflows/taught-check.js` }, { course: 'courses/parcours-po' })
  } catch (e) {
    log(`taught-check as a child workflow failed (${String(e).slice(0, 120)}); running it as an agent instead`)
    taught = await agent(`In ${ROOT}, run the taught-check of the ported skill (.claude/skills/taught-check) on courses/parcours-po as that skill describes, yourself, and return the list of findings (concept, case, what is asked that was not yet taught).`, { label: 'taught-check (agent)', phase: 'Verification', model: 'opus', effort: 'high' })
  }
  const extra = `Input: the taught-check findings ${JSON.stringify(taught).slice(0, 6000)}. Fix each in the migrated course (teaching notes or reader text, as the finding says), never in ../pdx/parcours-po. Then two independent reviews are run by the orchestrator; you only do the taught-check fixes in this task.`
  record(await merge(await deliver('S1-12', 'stage-1.md', 'sonnet', { phase: 'Verification', extra }), 'Verification'))
  const reviewers = await parallel([0, 1].map((i) => () => agent(`Reviewer ${i + 1} of 2, independent. In ${ROOT}, read specs/linear-course/SPEC.md and the protocol, then courses/parcours-po/ in full. Report every place the course breaks the spec or contradicts itself (file, line, problem, fix). Angle: ${i === 0 ? 'structure and conventions, check by check' : 'teaching content: cases that contradict the reader text, storyline facts that drift, stances mislabelled'}. Return findings as JSON.`, { label: `course review ${i + 1}`, phase: 'Verification', model: 'opus', effort: 'high', schema: REVIEW })))
  const findings = reviewers.filter(Boolean).flatMap((r) => r.findings)
  if (findings.length) {
    const fixes = await agent(`In ${ROOT}: these ${findings.length} review findings on courses/parcours-po must each become a fix in a PR (branch course/review-fixes-night-2, one commit per file) or an issue (type:course, milestone stage-1) when the fix needs the maintainer. Findings: ${JSON.stringify(findings).slice(0, 12000)}. Open the PR; do not merge. Return the structured result (pr, what was fixed, what became issues).`, { label: 'review fixes', phase: 'Verification', model: 'sonnet', schema: WORK })
    if (fixes && fixes.pr) record(await merge({ id: 'review-fixes', status: 'reviewed', pr: fixes.pr, work: fixes }, 'Verification'))
  } else log('course review: no finding')
} else {
  log('Verification skipped: the migration is not complete')
}

// ---- Report -----------------------------------------------------------------------------
phase('Report')
const report = await agent(`Write construction/notes/night-2.md in ${ROOT} (untracked, do not commit). Night 2, ${date}. Gates: ${JSON.stringify(gates)}. Results: ${JSON.stringify(results).slice(0, 20000)}. Structure: a table (task, status, PR, sha); "Needs the maintainer"; "Skipped and why"; "What to read first in the morning" (three items at most), and a reminder that S1-13 (the old-teacher guard) and S1-15 (the Fable review) are daytime tasks. English, no banned words. Return the path.`, { label: 'night report', phase: 'Report', model: 'sonnet', effort: 'low' })
return { results, report }
