export const meta = {
  name: 'feyn-overnight-2',
  description: 'Night 2 of the feyn construction: the language pack and the migrate-concept workflow, the 20 concept migrations in parallel worktrees, taught-check on the migrated course, then the full review of the course; each PR reviewed then squash-merged',
  phases: [
    { title: 'Wave 3', detail: 'S1-05 language pack (#18), S1-09 migrate-concept workflow (#22), one at a time' },
    { title: 'Migration', detail: 'S1-10 (#23): 20 sub-issues, one per concept, worked in parallel worktrees, merged one at a time' },
    { title: 'Taught-check', detail: 'S1-11 (#24): taught-check run on the migrated course' },
    { title: 'Review', detail: 'S1-12 (#25): two reviewers, fixes, second taught-check' },
    { title: 'Report', detail: 'construction/notes/night-2.md, through a PR' },
  ],
}

// ---- the night's task list (see construction/overnight.md, "Night 2 scope") --------------
// No gate, no list of dependencies: the blocked-by links on GitHub are the only source
// (decision blocked-by-links-for-dependencies). /start refuses an issue with an open blocker;
// the task then returns "blocked" and the night goes on with the next one that can run.
const SERIAL = {
  'Wave 3': [
    { id: 'S1-05', issue: 18, model: 'sonnet' },
    { id: 'S1-09', issue: 22, model: 'opus' },
  ],
}
const UMBRELLA = { id: 'S1-10', issue: 23 }        // sub-issues, one per concept
const TAUGHT = { id: 'S1-11', issue: 24 }          // closed by the run on the migrated course
const REVIEWED = { id: 'S1-12', issue: 25, model: 'sonnet' }
const WORKFLOW_ISSUE = 22                         // S1-09, blocks every sub-issue
const LANG_ISSUE = 18                             // S1-05, lang/fr.yaml: the migration needs it
const BLOCKER_OF_A2 = 100                        // the A2 objective: must be merged before A2 migrates

// concept folder names (courses/parcours-po/concepts/<dir>), old files share the name
const CONCEPTS = ['00-scrum', '01-produit-et-po', '02-objectif-produit-resultat', '03-backlog-produit',
  '04-hierarchie', '05-user-story', '06-roles-personas', '07-invest', '08-criteres-regles',
  '09-decoupage-vertical', '10-hors-perimetre-dependances', '11-dor-dod', '12-donnees-produit',
  '13-ordonner-backlog', '14-parties-prenantes', '15-vie-story', '16-story-map',
  '17-hypotheses-exploration', 'A1-outil-backlog', 'A2-sans-sprint']
const nn = (c) => c.slice(0, 2)                   // '00', '09', 'A1'
const subId = (c) => `S1-10.${nn(c)}`

const WORK = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['done', 'blocked', 'failed'] },
    pr: { type: ['integer', 'null'], description: 'PR number on sebvey/feyn, or null (no PR for this task)' },
    branch: { type: ['string', 'null'] },
    verified: { type: 'string', description: 'what of the Done when was verified, and how' },
    for_maintainer: { type: 'array', items: { type: 'string' }, description: 'what only the maintainer can do, if anything' },
    note: { type: 'string', description: 'one paragraph: what was done, what was not, why' },
    worktree_path: { type: ['string', 'null'], description: 'a fix agent in a worktree: the absolute path of the worktree it worked in (pwd); null otherwise' },
    already_closed: { type: 'boolean', description: 'true when /start refused because the issue was already closed: nothing to do' },
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
const RESTORE = {
  type: 'object',
  properties: { clean: { type: 'boolean' }, note: { type: 'string' } },
  required: ['clean', 'note'],
}
const SUBS = {
  type: 'object',
  properties: {
    blocked: { type: 'boolean', description: 'true when an issue that blocks the umbrella is still open' },
    note: { type: 'string' },
    subissues: { type: 'array', items: { type: 'object', properties: {
      concept: { type: 'string', description: 'the concept folder name, as in the list given' },
      issue: { type: 'integer' },
      state: { type: 'string', enum: ['OPEN', 'CLOSED'] } }, required: ['concept', 'issue', 'state'] } },
  },
  required: ['blocked', 'note', 'subissues'],
}
const CLOSE = {
  type: 'object',
  properties: { closed: { type: 'boolean' }, note: { type: 'string' } },
  required: ['closed', 'note'],
}
const FINDINGS = {
  type: 'object',
  properties: {
    findings: { type: 'array', items: { type: 'object', properties: {
      where: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } },
      required: ['where', 'problem', 'fix'] } },
    summary: { type: 'string' },
  },
  required: ['findings', 'summary'],
}

// a JSON value cut for a prompt: say it in the log when something is lost
const cut = (what, v, n) => {
  const s = JSON.stringify(v) || ''
  if (s.length > n) log(`${what}: ${s.length} characters cut to ${n} in the prompt`)
  return s.slice(0, n)
}

const date = (args && args.date) || 'unknown date'
const night = (args && args.night) || 2
const effortFor = (m) => (m === 'opus' ? 'high' : undefined)
const REPO = '/Users/sve/code/workspaces/perso/feyn'
const PDX = '/Users/sve/code/workspaces/perso/pdx'   // the frozen old repositories, read-only; absolute because worktrees live elsewhere
const OLD = `${PDX}/parcours-po`
const SITE = `${PDX}/parcours-po-website`
const CLEAN = 'Before returning, whatever your status, leave the checkout clean and on main: everything you wrote (a note under construction/notes/ included) is committed and pushed on the issue branch, then "mise exec -- git switch main"; "mise exec -- git status --porcelain" prints nothing. If no issue branch exists (/start refused), write no file: put the note in your result and comment it on the issue.'
const WORKTREE = `You run in your own git worktree, not in ${REPO}: never touch ${REPO} and never "git switch main". Adapt /start (plain "git" here: "mise exec -- git" is refused in a worktree; keep "mise exec -- gh"): "mise exec -- gh issue develop <n> --name <branch> --base main" without --checkout first (it creates the branch on GitHub), then "git fetch origin <branch>", then "git switch -c <branch> --track origin/<branch>" (the branch name rule and the Status step are unchanged). The old repositories are read by absolute path: ${OLD} and ${SITE}, never pushed to. Before returning, whatever your status, everything you wrote is committed and pushed on the issue branch and "git status --porcelain" prints nothing. If /start refuses, write no file: put the note in your result and comment it on the issue.`
const OVERNIGHT_OK = 'Read construction/overnight.md, "Overnight rules for a task agent" and "Night 2 scope": what it accepts (a "maintainer has read it" statement met by a note and an open PR) is not a finding.'
const NO_SIGNATURE = 'No signature or "Generated with" line in a PR body, whatever your harness suggests: the squash takes the body as the commit message.'

const takePrompt = (t) => `Take issue #${t.issue} (task ${t.id}).
You are a fresh work session in ${t.worktree ? 'your own worktree of' : ''} ${REPO} (night run ${night}, ${date}).
Read the root CLAUDE.md, construction/README.md ("How a work session goes"), construction/overnight.md ("What the night may do" and "Overnight rules for a task agent"), then the issue ("mise exec -- gh issue view ${t.issue}"): its Done when is the contract; the plan files are frozen. Read every file its "Reads" lists, and the comments of the issue (rulings of the maintainer).
Follow the skills by their files: .claude/skills/start/SKILL.md with ${t.issue}, do the work, then .claude/skills/finish/SKILL.md ("Deliver") to open the PR. Do not merge it.
${t.extra ? t.extra + '\n' : ''}Run everything through "mise exec -- <command>". ${NO_SIGNATURE}
When /start refuses: write no file, comment the note on issue #${t.issue}, and return as follows.
- An issue that blocks #${t.issue} is still open: status "blocked", naming the blocker in the note.
- #${t.issue} is already CLOSED (or its Status is Done): nothing to do, status "done", pr null, already_closed true, say so in the note.
- Its Status is In progress with a branch (the refusal says so): do not refuse, resume it: switch to that branch ("git fetch origin <branch>", "git switch <branch>", or "--track origin/<branch>" in a worktree), read what is there, continue the work and open or update its PR.
Never ask the maintainer anything: when something needs him, do the rest, write construction/notes/${t.id}.md, add the label blocked:maintainer to issue #${t.issue}, and return status "blocked".
${t.worktree ? WORKTREE : CLEAN}
Return the structured result only.`

const reviewPrompt = (t, w) => `Review task ${t.id} of the feyn construction, delivered as PR #${w.pr} (branch ${w.branch}) on sebvey/feyn.
You are in ${REPO}; read only. Read issue #${t.issue} ("mise exec -- gh issue view ${t.issue} --comments"; its "Done when" is the contract, the comments carry the maintainer's rulings), the files it lists, and the delivered files ("mise exec -- gh pr diff ${w.pr}" and "mise exec -- gh pr view ${w.pr}").
The author reported: ${JSON.stringify(w.note)} / verified: ${JSON.stringify(w.verified)}.
${t.reviewExtra ? t.reviewExtra + '\n' : ''}${OVERNIGHT_OK}
Judge against the Done when, not against taste. A statement the PR body marks "deviation" with a reason the issue or this night accepts is not a finding. Approve when every verifiable statement holds; otherwise return "changes" with concrete findings (file, problem, fix). Check the vocabulary (docs/glossary.md, the words it lists as "not"), the language rule, and that the PR body has no signature line. Do not edit anything.`

const fixPrompt = (t, w, r) => `Fix the review findings on task ${t.id}, PR #${w.pr} (branch ${w.branch}) on sebvey/feyn, issue #${t.issue}.
Findings: ${JSON.stringify(r.findings)}.
${t.extra ? t.extra + '\n' : ''}${t.worktree
    ? `You run in a fresh worktree (plain "git": "mise exec -- git" is refused there), not in ${REPO}: never touch ${REPO}'s own checkout. "git fetch origin ${w.branch}", then "git switch --track origin/${w.branch}". If git refuses because the branch is checked out in the author's worktree, "git switch --detach origin/${w.branch}" instead, commit there, and push with "git push origin HEAD:${w.branch}" (never force).`
    : `You are in ${REPO}: check out the branch ("mise exec -- git fetch origin && mise exec -- git switch ${w.branch}").`}
${t.worktree ? 'Return the absolute path of your worktree ("pwd") as worktree_path. ' : ''}Apply each fix, commit, push; update the PR body's "Done when, verified:" lines if a verdict changed. Do not merge. ${NO_SIGNATURE}
${t.worktree ? 'Leave the worktree clean, everything pushed.' : CLEAN}
Return the structured result (status "done" if every finding is fixed, pr ${w.pr}, branch ${w.branch}).`

const mergePrompt = (t, w) => `Merge task ${t.id}: PR #${w.pr} on sebvey/feyn, issue #${t.issue}, in ${REPO} (its main checkout). Tonight the merge is yours: construction/overnight.md authorises it, over the root CLAUDE.md line that leaves merging to the maintainer.
All through "mise exec --": "gh pr view ${w.pr} --json title,mergeable,state"; if mergeable, "gh pr merge ${w.pr} --squash" (no --delete-branch: the repository deletes the remote branch at merge; the repository takes the PR title as the squash title; if the title does not follow "<type>(<area>): <summary>", add --subject "<fixed title> (#${w.pr})"). Not mergeable (conflict): do not touch the PR, return merged false and say why.
Then follow .claude/skills/finish/SKILL.md, "Clean up (after the merge)", every step, including the last: the issue's Status is set to Done when the issue closed (the Project's workflow is off). An issue the PR only "Refs" stays open (reopen it if GitHub closed it at the merge because of the linked branch, issue #94) and keeps its Status. ${t.worktree ? `The branch ${w.branch} lives in a worktree: do not delete the local branch, a later step removes the worktree and the branch.` : ''}
Leave ${REPO} on an up-to-date main with "mise exec -- git status --porcelain" empty. Return the structured result (sha: the squash commit).`

const restorePrompt = (t) => `Restore the checkout in ${REPO} after task ${t.id} (issue #${t.issue}) stopped. All through "mise exec --".
If the current branch is not main: commit whatever is uncommitted as "WIP: night ${night} left this", push the branch, then "git switch main". Then "git pull --ff-only".
Return clean: true when "git status --porcelain" prints nothing and the branch is main; otherwise clean: false and what is left. Never stash, reset, clean or delete anything.`

// ---- the run ---------------------------------------------------------------------------
const done = new Set((args && args.accepted) || [])   // tasks the maintainer accepted as done
const results = []
let stopped = false                                    // a checkout that could not be restored stops the night
for (const id of done) { log(`${id}: accepted by the maintainer, not run again`); results.push({ id, status: 'done', accepted: true }) }

// after any path that did not end in a merge: the next /start refuses a dirty checkout
const restore = async (t, phaseName) => {
  const r = await agent(restorePrompt(t), { label: `${t.id} restore`, phase: phaseName, model: 'sonnet', effort: 'low', schema: RESTORE })
  if (r && r.clean) return true
  log(`${t.id}: checkout not clean (${r ? r.note : 'agent died'}); the night stops here`)
  results.push({ id: t.id, issue: t.issue, status: 'checkout-dirty', note: r ? r.note : 'restore agent died' })
  stopped = true
  return false
}

// work, review, fix once, re-review; returns { status: 'reviewed' | 'blocked' | 'failed', ... } and never merges
async function deliver(t, phaseName) {
  const work0 = await agent(takePrompt(t), { label: `${t.id} work`, phase: phaseName, model: t.model, effort: effortFor(t.model), schema: WORK, isolation: t.worktree ? 'worktree' : undefined })
  if (!work0) return { id: t.id, issue: t.issue, status: 'failed', reason: 'agent died' }
  if (work0.status === 'done' && !work0.pr && work0.already_closed) {
    return { id: t.id, issue: t.issue, status: 'done', pr: null, work: work0, reason: 'issue already closed' }
  }
  if (work0.status !== 'done' || !work0.pr) {
    return { id: t.id, issue: t.issue, status: work0.status === 'done' ? 'failed' : work0.status, pr: work0.pr, work: work0, reason: work0.pr ? undefined : 'no PR' }
  }
  let work = work0
  let review = await agent(reviewPrompt(t, work), { label: `${t.id} review`, phase: phaseName, model: 'opus', schema: REVIEW })
  if (review && review.verdict === 'changes') {
    log(`${t.id}: review asks for ${review.findings.length} change(s), fixing once`)
    const fixed = await agent(fixPrompt(t, work, review), { label: `${t.id} fix`, phase: phaseName, model: t.model, schema: WORK, isolation: t.worktree ? 'worktree' : undefined })
    if (fixed && fixed.status === 'done') {
      work = { ...work, note: fixed.note, verified: fixed.verified, for_maintainer: [...work.for_maintainer, ...fixed.for_maintainer], fix_worktree: fixed.worktree_path || undefined }
      review = await agent(reviewPrompt(t, work), { label: `${t.id} re-review`, phase: phaseName, model: 'opus', schema: REVIEW })
    }
  }
  if (!review || review.verdict !== 'approve') {
    log(`${t.id}: ${review ? 'still has findings after one fix' : 'no review (agent died)'}; left open for the maintainer`)
    return { id: t.id, issue: t.issue, status: 'blocked', pr: work.pr, work, review }
  }
  return { id: t.id, issue: t.issue, status: 'reviewed', pr: work.pr, work, review, t }
}

async function mergeReviewed(r, phaseName) {
  if (r.status !== 'reviewed') return r
  const m = await agent(mergePrompt(r.t, r.work), { label: `${r.id} merge`, phase: phaseName, model: 'sonnet', effort: 'low', schema: MERGE })
  if (!m || !m.merged) {
    log(`${r.id}: merge failed (${m ? m.note : 'agent died'})`)
    return { ...r, status: 'blocked', merge: m }
  }
  return { ...r, status: 'done', sha: m.sha }
}

const record = (r) => {
  const { t, ...rest } = r
  results.push(rest)
  if (r.status === 'done') done.add(r.id)
  log(`${r.id}: ${r.status}`)
}

// one task in the main checkout, one at a time; false when the night must stop
async function runSerial(t, phaseName) {
  if (done.has(t.id)) return true
  log(`${t.id}: start (${t.model})`)
  const r = await mergeReviewed(await deliver(t, phaseName), phaseName)
  record(r)
  if (r.status !== 'done') return await restore(t, phaseName)
  return true
}

// merge a reviewed delivery in the main checkout and record it; a failed merge restores the checkout.
// false when the night must stop
async function mergeAndRecord(r, phaseName) {
  const m = await mergeReviewed(r, phaseName)
  record(m)
  if (r.status === 'reviewed' && m.status !== 'done') return await restore({ id: r.id, issue: r.issue }, phaseName)
  return true
}

// ---- Wave 3 ----------------------------------------------------------------------------
phase('Wave 3')
for (const t of SERIAL['Wave 3']) {
  if (stopped) break
  await runSerial(t, 'Wave 3')
}

// ---- Migration: S1-10, one sub-issue per concept ---------------------------------------
phase('Migration')
let subissues = []
if (stopped) {
  log('Migration skipped: the checkout could not be restored')
} else if (done.has(UMBRELLA.id)) {
  log('S1-10: accepted by the maintainer, not run again')
} else {
  const prep = await agent(`Prepare the migration of the 20 concepts in ${REPO} (night run ${night}, ${date}). Every command through "mise exec --". Read the root CLAUDE.md, .claude/skills/ticket/SKILL.md and .claude/skills/ticket/project.md.
1. Read umbrella issue #${UMBRELLA.issue} ("gh issue view ${UMBRELLA.issue} --comments", and its blockers: "gh api repos/sebvey/feyn/issues/${UMBRELLA.issue}/dependencies/blocked_by"). If a blocker is still open, create nothing and return blocked true, naming it.
2. List the sub-issues it already has ("gh api repos/sebvey/feyn/issues/${UMBRELLA.issue}/sub_issues"). Create the missing ones, one per concept of this list, in this order: ${JSON.stringify(CONCEPTS)}; never create a second one for a concept. Each is created as /ticket creates an issue (title "S1-10.<nn> Migrate concept <folder name>", labels type:course and area:course:parcours-po, milestone stage-1, added to the Project with Status Ready), linked as a sub-issue of #${UMBRELLA.issue} (POST repos/sebvey/feyn/issues/${UMBRELLA.issue}/sub_issues with sub_issue_id = the database id of the new issue), and linked blocked-by #${WORKFLOW_ISSUE} (the migrate-concept workflow) and #${LANG_ISSUE} (the language pack, lang/fr.yaml) through the blocked-by link of project.md; the sub-issue of A2-sans-sprint is also blocked by #${BLOCKER_OF_A2} (its objective). Only the sub-issue of A2 is blocked by #${BLOCKER_OF_A2}: never add or remove a link on the umbrella or on an existing issue, and never change a label.
3. Body of each sub-issue (sections "### Reads", "### Observation", "### To do", "### Done when"):
   - Reads: the umbrella #${UMBRELLA.issue} and its comments, .claude/workflows/migrate-concept.js (read its header first), specs/linear-course/SPEC.md, courses/parcours-po/course.yaml (the concept's entry), construction/notes/S1-02-prototype.md, construction/notes/S1-08.md; the old files ${OLD}/course/concepts/<folder>.md, ${OLD}/course/sources/<folder>.md (as they exist) and ${SITE}/src/content/concepts/fr/<folder>.mdx, and the Astro diagram components the MDX uses.
   - Observation: the concept <folder> exists only in the old layout (the old concept file, its sources and the site's MDX); the folder courses/parcours-po/concepts/<folder>/ must hold the same course in the new layout.
   - To do: run the migrate-concept workflow on this concept (args { course: "parcours-po", concept, from, site }, as its header says; if the Workflow tool is not available to you, follow its stages yourself, in order); read the report construction/notes/S1-10-<nn>-report.md (<nn> is the concept's number or annex letter), fix what it flags in the output, never in the old files; apply the maintainer's ruling of the umbrella: each reader sub-heading of the site that course.yaml does not list becomes a paragraph of the leaf's reader text, led by its title in bold, and the report lists it as "moved", not "lost"; touch only this concept's folder and its report. Concept 09-decoupage-vertical already exists from the S1-02 prototype: the workflow's output replaces it if they differ, and the PR says what differed.
   - Done when: courses/parcours-po/concepts/<folder>/ holds the concept folder as SPEC.md defines it; the concept checks of check-course pass on it; the report exists and has no "lost" or "invented" entry (or each one is listed in the PR with its reason); the site's sub-headings are reported as "moved"; no file outside the folder and the report changed.
4. Return the list of sub-issues (concept folder name, issue number, state OPEN or CLOSED) for all 20, those that existed included.`,
    { label: 'S1-10 sub-issues', phase: 'Migration', model: 'sonnet', schema: SUBS })
  if (!prep || prep.blocked || prep.subissues.length < CONCEPTS.length) {
    log(`S1-10: ${prep ? (prep.blocked ? 'blocked' : 'sub-issues incomplete') : 'agent died'}: ${prep ? prep.note : ''}`)
    results.push({ id: UMBRELLA.id, issue: UMBRELLA.issue, status: prep && prep.blocked ? 'blocked' : 'failed', note: prep ? prep.note : 'prep agent died' })
  } else {
    subissues = prep.subissues
    const byConcept = Object.fromEntries(subissues.map((s) => [s.concept, s.issue]))
    const task = (c) => ({
      id: subId(c), issue: byConcept[c], model: 'sonnet', worktree: true,
      extra: `This is sub-issue ${subId(c)}: migrate concept ${c}. Branch name: course/${byConcept[c]}-migrate-${c.slice(3)}-concept (type course; shorten the slug as /start says). Old files by absolute path: ${OLD}/course/concepts/${c}.md, ${OLD}/course/sources/${c}.md (as they exist), ${SITE}/src/content/concepts/fr/${c}.mdx. Touch only courses/parcours-po/concepts/${c}/ and construction/notes/S1-10-${nn(c)}-report.md.`,
      reviewExtra: `This is a migration: compare old and new yourself, section by section, against ${OLD}/course/concepts/${c}.md, ${OLD}/course/sources/${c}.md (as it exists) and ${SITE}/src/content/concepts/fr/${c}.mdx. Anything lost or invented is a finding; a site sub-heading that course.yaml does not list must be a paragraph led by its title in bold (maintainer's ruling, comment on #${UMBRELLA.issue}). Check the SVGs against the drawing contract, and that only the concept's folder and its report changed.`,
    })
    // sub-issues already closed (or accepted by the maintainer) are done; the others are delivered
    for (const s of subissues) {
      const c = s.concept
      if (s.state === 'CLOSED' && !done.has(subId(c))) {
        log(`${subId(c)}: issue #${s.issue} already closed, counted as done`)
        results.push({ id: subId(c), issue: s.issue, status: 'done', note: 'issue already closed' })
        done.add(subId(c))
      }
    }
    // the 19 others in parallel worktrees, then A2: its sub-issue alone is blocked by BLOCKER_OF_A2
    // (the umbrella is not), so /start refuses A2 until that issue is merged; A2 goes last to give it time
    const first = CONCEPTS.filter((c) => !c.startsWith('A2') && !done.has(subId(c)))
    const delivered = await pipeline(first, (c) => deliver(task(c), 'Migration'))
    const toMerge = delivered.filter(Boolean)
    for (let i = 0; i < toMerge.length; i++) {
      if (await mergeAndRecord(toMerge[i], 'Migration')) continue   // merges are serial: one checkout
      // the checkout could not be restored: the PRs not merged yet are listed, not lost
      for (const r of toMerge.slice(i + 1)) {
        results.push({ id: r.id, issue: r.issue, status: 'skipped', pr: r.pr || null, reason: r.status === 'reviewed' ? 'reviewed but not merged: the night stopped on a dirty checkout' : `${r.status}; the night stopped on a dirty checkout` })
      }
      break
    }
    const a2 = CONCEPTS.find((c) => c.startsWith('A2'))
    if (!stopped && !done.has(subId(a2))) await mergeAndRecord(await deliver(task(a2), 'Migration'), 'Migration')
    const nightRuns = results.filter((r) => r.id.startsWith('S1-10.') && r.work && r.work.branch)
    const nightBranches = nightRuns.map((r) => r.work.branch)
    const fixPaths = nightRuns.map((r) => r.work.fix_worktree).filter(Boolean)   // worktrees of fix agents (possibly detached HEAD)
    const cleanup = stopped ? 'skipped: dirty checkout' : await agent(`In ${REPO}, every command through "mise exec --": "git worktree prune"; list the worktrees with "git worktree list". Only these branches, made tonight, are concerned: ${JSON.stringify(nightBranches)}; and these worktrees of fix agents, which may sit on a detached HEAD: ${JSON.stringify(fixPaths)}. For each branch that has a merged PR ("gh pr list --state merged --head <branch>") and a worktree, and for each listed fix worktree whose branch has a merged PR: if "git -C <path> status --porcelain" prints nothing, "git worktree remove <path>" (never --force), and "git branch -D <branch>" once none of its worktrees is left; if it prints anything, leave the worktree and say so. Touch no other worktree. Then "git switch main && git pull --ff-only". Return what you removed and what you left.`,
      { label: 'worktree cleanup', phase: 'Migration', model: 'sonnet', effort: 'low' })
    log(`cleanup: ${String(cleanup).slice(0, 200)}`)
    const merged = CONCEPTS.filter((c) => done.has(subId(c)))
    const close = stopped ? null : await agent(`Close umbrella issue #${UMBRELLA.issue} (S1-10) if it holds, in ${REPO} on an up-to-date main ("mise exec -- git switch main && git pull --ff-only"). Every command through "mise exec --".
Its Done when: 20 PRs merged; check-course passes on the whole course; every report is empty of "lost" and "invented", or the exceptions are listed in the umbrella issue.
Done tonight or before: ${merged.length} of ${CONCEPTS.length} (${JSON.stringify(merged.map(subId))}). Not done: ${JSON.stringify(CONCEPTS.filter((c) => !done.has(subId(c))).map(subId))}.
Run "specs/linear-course/checks/check-course courses/parcours-po" on main (read the script's usage), read the 20 reports construction/notes/S1-10-<nn>-report.md, and list the "lost" and "invented" entries with their reason. Comment the verdict on #${UMBRELLA.issue}.
If 20 are done, the check passes and every entry is explained: deliver the closing through a PR, as .claude/skills/start/SKILL.md and .claude/skills/finish/SKILL.md ("Deliver") say for #${UMBRELLA.issue} (branch from main, Status In progress): add one line to the « Non publié » section of courses/parcours-po/CHANGELOG.md, in the file's format (« - CATÉGORIE, concept ou fichier : ce qui change », French, no em-dash, no arrow), saying that the 20 concepts are migrated to the new layout; PR body starting "Closes #${UMBRELLA.issue}", no signature line; then merge it (squash) and follow "Clean up (after the merge)"; the Status is Done. Tonight that merge is yours (construction/overnight.md). Otherwise change nothing, leave the issue open and say what is missing. Return closed (true only once merged and the issue closed) and one paragraph.`,
      { label: 'S1-10 close', phase: 'Migration', model: 'sonnet', schema: CLOSE })
    results.push({ id: UMBRELLA.id, issue: UMBRELLA.issue, status: close && close.closed ? 'done' : 'blocked', note: close ? close.note : (stopped ? 'the night stopped on a dirty checkout before the close step' : 'close agent died') })
    if (close && close.closed) done.add(UMBRELLA.id)
    else log('S1-10: not complete; taught-check and the review are skipped')
  }
}

// taught-check as a child workflow, or as an agent when the child cannot run
const runTaughtCheck = async (label, phaseName) => {
  try {
    return await workflow({ scriptPath: `${REPO}/.claude/workflows/taught-check.js` }, { course: 'parcours-po' })
  } catch (e) {
    log(`${label}: taught-check as a child workflow failed (${String(e).slice(0, 120)}); running it as an agent instead`)
    return await agent(`In ${REPO} (up to date main), run the taught-check of the ported skill (.claude/skills/taught-check/SKILL.md) on parcours-po as it describes, yourself, modifying no file, and return the inventory (unit by unit) and the list of findings (concept, case, what is asked that was not yet taught).`,
      { label: `${label} (agent)`, phase: phaseName, model: 'opus', effort: 'high' })
  }
}

// ---- Taught-check: S1-11 closes on the run on the migrated course ----------------------
phase('Taught-check')
let taught = null
if (done.has(TAUGHT.id)) {
  log('S1-11: done already (accepted or closed), not run again; S1-12 starts without the first run\'s findings')
} else if (stopped || !done.has(UMBRELLA.id)) {
  log('Taught-check skipped: the migration is not complete')
} else {
  taught = await runTaughtCheck('S1-11 taught-check', 'Taught-check')
  const text = cut('S1-11 taught-check', taught, 6000)
  const close = await agent(`Close issue #${TAUGHT.issue} (S1-11) in ${REPO}, every command through "mise exec --". Its Done when: "taught-check runs on the migrated course (after S1-10) and produces its inventory". The workflow ran just now on courses/parcours-po and returned: ${text}.
If that result holds an inventory (a non-empty list of what the learner receives, unit by unit), comment on #${TAUGHT.issue} that the run happened on the migrated course, with the number of inventory units and of findings, then close it ("gh issue close ${TAUGHT.issue}") and set its Status to Done (.claude/skills/ticket/project.md). If there is no inventory, comment that and leave the issue open. The findings are not triaged here: S1-12 handles them. Return closed and one paragraph.`,
    { label: 'S1-11 close', phase: 'Taught-check', model: 'sonnet', effort: 'low', schema: CLOSE })
  results.push({ id: TAUGHT.id, issue: TAUGHT.issue, status: close && close.closed ? 'done' : 'blocked', note: close ? close.note : 'close agent died' })
  if (close && close.closed) done.add(TAUGHT.id)
}

// ---- Review: S1-12 ---------------------------------------------------------------------
phase('Review')
if (done.has(REVIEWED.id)) {
  log('S1-12: done already (accepted or closed), not run again')
} else if (stopped || !done.has(UMBRELLA.id) || !done.has(TAUGHT.id)) {
  log('Review skipped: the migration or the taught-check run is not complete')
} else {
  const reviewers = await parallel([0, 1].map((i) => () => agent(`Reviewer ${i + 1} of 2, independent: you do not see the other. In ${REPO} (up to date main), read specs/linear-course/SPEC.md and the protocol, then courses/parcours-po/ in full. Report every place the course breaks the spec or contradicts itself (where: file and line, problem, fix). Angle: ${i === 0 ? 'structure and conventions, check by check, and the match between course.yaml, plan.md and the concept folders' : 'teaching content: cases that contradict the reader text, storyline facts that drift, stances mislabelled, things lost from the old course'}. Modify nothing. Return the findings.`,
    { label: `course review ${i + 1}`, phase: 'Review', model: 'opus', effort: 'high', schema: FINDINGS })))
  const merged = await agent(`Third reviewer: merge two independent reviews of courses/parcours-po in ${REPO}. Read only. Reviews: ${cut('course reviews', reviewers.filter(Boolean), 14000)}. Verify each finding against the files (drop one that does not hold, say so in the summary), merge duplicates, keep the concrete fix of each. Return the merged findings.`,
    { label: 'course review merge', phase: 'Review', model: 'opus', effort: 'high', schema: FINDINGS })
  const reviewFindings = merged ? merged.findings : reviewers.filter(Boolean).flatMap((r) => r.findings)
  const taughtFindings = taught && Array.isArray(taught.findings) ? taught.findings
    : (typeof taught === 'string' ? [taught.slice(0, 6000)] : [])
  log(`review: ${reviewFindings.length} finding(s); first taught-check: ${taughtFindings.length} finding(s)`)

  if (reviewFindings.length || taughtFindings.length) {
    const t = {
      ...REVIEWED,
      extra: `Inputs of this task, produced by the night: the taught-check findings ${cut('taught-check findings', taughtFindings, 8000)}; the merged findings of two independent reviews ${cut('review findings', reviewFindings, 8000)}. Each finding becomes a fix in the PR (a finding that does not change what a concept teaches, as .claude/skills/taught-check/SKILL.md says) or an issue (type:course, milestone stage-1, through /ticket) when the fix changes what is taught or needs the maintainer; never a silent edit; never an edit in ${OLD} or ${SITE}. The PR lists each finding as fixed or filed (with the issue number).`,
      reviewExtra: 'Each finding of the inputs (in the PR body) must be fixed in the diff or filed as an issue; a finding left unmentioned is a finding of yours.',
    }
    await runSerial(t, 'Review')
  } else {
    log('S1-12: no finding, no PR')
  }
  // the second run judges the fixes: it needs S1-12's PR merged, or no PR at all (no finding)
  const had = reviewFindings.length > 0 || taughtFindings.length > 0
  if (!stopped && (!had || done.has(REVIEWED.id))) {
    const second = await runTaughtCheck('S1-12 second taught-check', 'Review')
    const text = cut('S1-12 second taught-check', second, 6000)
    const close = await agent(`Close issue #${REVIEWED.issue} (S1-12) in ${REPO} on an up-to-date main ("mise exec -- git switch main && git pull --ff-only"), every command through "mise exec --". Its Done when: "taught-check reports no finding (or every finding is fixed and a second run is clean); the review's findings are all fixed or filed."
Tonight: the first taught-check had ${taughtFindings.length} finding(s); the two-reviewer review had ${reviewFindings.length} finding(s); the S1-12 PR status: ${cut('S1-12 status', results.find((r) => r.id === REVIEWED.id) || 'no PR (no finding)', 3000)}. The second taught-check returned: ${text}.
If the second run holds no finding, and every review finding is fixed in a merged PR or filed as an issue (check the PR body and "gh issue list --search"), comment the verdict on #${REVIEWED.issue}, make sure it is closed ("gh issue close ${REVIEWED.issue}") and its Status is Done (.claude/skills/ticket/project.md). Otherwise comment what remains, and leave it open: if GitHub closed it at the merge of a PR because of the linked branch (issue #94), reopen it ("gh issue reopen ${REVIEWED.issue}") and set its Status back to In progress. Return closed and one paragraph.`,
      { label: 'S1-12 close', phase: 'Review', model: 'sonnet', schema: CLOSE })
    const prior = results.find((r) => r.id === REVIEWED.id)
    if (prior) {
      prior.close = close
      if (!(close && close.closed)) {   // the close agent reopened #25 (or it died): the merged PR does not make S1-12 done
        prior.status = 'blocked'
        prior.note = close ? close.note : 'close agent died'
        done.delete(REVIEWED.id)
      }
    } else results.push({ id: REVIEWED.id, issue: REVIEWED.issue, status: close && close.closed ? 'done' : 'blocked', note: close ? close.note : 'close agent died' })
  }
}

for (const id of [...SERIAL['Wave 3'].map((t) => t.id), UMBRELLA.id, ...CONCEPTS.map(subId), TAUGHT.id, REVIEWED.id]) {
  if (!results.some((r) => r.id === id)) results.push({ id, status: 'skipped', reason: stopped ? 'the night stopped on a dirty checkout' : 'a task it follows did not complete' })
}

// ---- Report ----------------------------------------------------------------------------
phase('Report')
const report = await agent(`Write the night report and land it on main through a PR, in ${REPO}. Tonight that merge is yours: construction/overnight.md authorises it.
Night ${night}, ${date}. Results, one per task, in this order: ${cut('results', results, 30000)}.
Every command through "mise exec --".
1. "git switch main && git pull --ff-only", then "git switch -c improvement/night-${night}-report".
2. Create construction/notes/night-${night}.md. Structure: a table (task, issue, status, PR, squash sha), the 20 concept migrations as one line each; then "Needs the maintainer" (every for_maintainer item and every blocked task with what unblocks it, pointing to construction/notes/<id>.md when it exists); then "Skipped and why"; then "What to read first in the morning" (three items at most), and a reminder that S1-13 (the old-teacher guard) and S1-15 (the Fable review) are daytime tasks. English, no word docs/glossary.md lists as "not".
3. Commit, push, "gh pr create --base main --title 'improvement(repo): night ${night} report of ${date}' --body-file <file>" (body: one line saying it is the night report, no issue, no signature line), then "gh pr merge <pr> --squash".
4. "git switch main && git pull --ff-only", "git branch -D improvement/night-${night}-report"; "git status --porcelain" prints nothing.
Return the path and the PR number.`,
  { label: 'night report', phase: 'Report', model: 'sonnet', effort: 'low' })

return { results, report }
