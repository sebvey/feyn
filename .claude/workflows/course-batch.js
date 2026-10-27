export const meta = {
  name: 'course-batch',
  description: 'Write a batch of concepts of a course: sources, writing, two reviews, fixes, checks',
  whenToUse: 'The maintainer asks to run course-batch on a batch issue or on a list of concepts. args: { course: "<course id>", concepts?: ["9", "10"], issue?: <n>, work?: "<dir for intermediate products>", dryRun?: true }. dryRun needs args.concepts, spawns no agent and returns the steps.',
  phases: [
    { title: 'Scope', detail: 'reads the issue and the course, lists the batch concepts' },
    { title: 'Sources', detail: 'one agent per concept, writes sources.md' },
    { title: 'Writing', detail: 'one agent per concept, writes concept.md and teaching.md' },
    { title: 'Reviews', detail: 'substance and form, in parallel' },
    { title: 'Fixes', detail: 'triage of the findings and corrections, then the checks' },
    { title: 'Second round', detail: 'only for the reviews that had a blocking finding' },
  ],
}

// Generic: nothing here belongs to one course. Everything comes from courses/<id>/, the spec
// the course declares (course.yaml, field spec) and the issue.

const A = args || {}
if (!A.course) throw new Error('args.course missing: the course id (courses/<id>/)')
const COURSE = `courses/${A.course}/`
const WORK = (A.work || 'batch-work/').replace(/\/?$/, '/')
const STEPS = ['sources', 'writing', 'review:substance', 'review:form', 'fixes+checks', 'second round (if blocking)']

// --- Dry run: no agent, the steps the real run would take ----------------------------

if (A.dryRun) {
  if (!Array.isArray(A.concepts) || !A.concepts.length) throw new Error('dryRun needs args.concepts: the list of concept numbers of the fake batch')
  const steps = A.concepts.flatMap(id => STEPS.map(s => `concept ${id}: ${s}`))
  log(`Dry run, course ${A.course}, batch ${A.concepts.join(', ')}: ${steps.length} steps, no agent spawned`)
  steps.forEach(s => log(s))
  return { dryRun: true, course: A.course, folder: COURSE, work_dir: WORK, concepts: A.concepts, steps }
}

const ROLE = `You maintain a course; you are not the teacher: ignore the teaching instructions of the \
repository's CLAUDE.md files except where you are asked to apply them as a criterion. Do not use \
git. Write only the files you are named. Read the files on disk yourself: trust no summary. \
Vocabulary: docs/glossary.md (concept folder, teaching notes, example bank, case, reader text, \
batch, check). Course files stay in the course language.`

const SCOUT_SCHEMA = {
  type: 'object',
  properties: {
    spec_dir: { type: 'string', description: 'specs/<name>/ of the spec that course.yaml declares, ends with /' },
    shared_files: { type: 'array', items: { type: 'string' }, description: 'files every agent of the batch reads: course.yaml, plan.md, storyline.md, glossary.md, SPEC.md sections 4 to 6, the course templates, PROTOCOL.md if it exists, the issue' },
    batch_instructions: { type: 'string', description: 'instructions of the issue for the whole batch, copied word for word' },
    concepts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'concept number as in course.yaml (0, 12, A1)' },
          title: { type: 'string' },
          dir: { type: 'string', description: 'concept folder, relative to the course folder, as course.yaml dir writes it' },
          existing: { type: 'boolean', description: 'the concept folder already holds files to start from' },
          course_entry: { type: 'string', description: 'the concept entry of course.yaml: objective, prerequisites, sub-concept tree, copied' },
          inputs: { type: 'array', items: { type: 'string' }, description: 'inputs of this concept: files and sections (observations, improvements, sources already verified)' },
          instructions: { type: 'string', description: 'instructions of the issue for this concept, copied word for word' },
        },
        required: ['id', 'title', 'dir', 'existing', 'course_entry', 'inputs', 'instructions'],
      },
    },
  },
  required: ['spec_dir', 'shared_files', 'batch_instructions', 'concepts'],
}

const FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'short id, e.g. F1, P3' },
          severity: { type: 'string', enum: ['blocking', 'minor'] },
          section: { type: 'string' },
          problem: { type: 'string', description: 'the defect, with the exact quotation' },
          evidence: { type: 'string', description: 'what proves it: source, spec rule, storyline fact, glossary term' },
          fix: { type: 'string' },
        },
        required: ['id', 'severity', 'section', 'problem', 'evidence', 'fix'],
      },
    },
  },
  required: ['findings'],
}

const FIX_SCHEMA = {
  type: 'object',
  properties: {
    applied: { type: 'array', items: { type: 'string' }, description: 'ids of the findings fixed' },
    rejected: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, reason: { type: 'string' } }, required: ['id', 'reason'] }, description: 'findings dismissed as false positives, with the reason' },
    open: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, question: { type: 'string' } }, required: ['id', 'question'] }, description: 'findings you cannot settle alone (storyline fact, glossary term, coordinator choice)' },
    checks: { type: 'string', description: 'output of the course checks for this concept after the fixes' },
  },
  required: ['applied', 'rejected', 'open', 'checks'],
}

const WRITE_SCHEMA = {
  type: 'object',
  properties: {
    needs: { type: 'array', items: { type: 'string' }, description: 'new storyline facts or glossary terms the files need (also written in the needs file)' },
    notes: { type: 'string', description: 'writing choices to report to the coordinator' },
  },
  required: ['needs', 'notes'],
}

// --- Scope -----------------------------------------------------------------------------

phase('Scope')
const scout = await agent(`${ROLE}

Read ${COURSE}course.yaml (it names the spec: field spec) and the spec's SPEC.md and templates.\
${A.issue ? ` Read issue #${A.issue} ("gh issue view ${A.issue}") and its parent.` : ''}\
${A.concepts ? ` The batch is the concepts ${A.concepts.join(', ')}.` : ' The batch is the concepts the issue asks to write.'}

Return the scope of the batch: its concepts in course order, with for each its concept folder, \
its course.yaml entry, its own inputs and the instructions of the issue about it, copied word \
for word. A concept folder holds concept.md, teaching.md, sources.md (SPEC.md section 4).`,
  { label: 'scope', schema: SCOUT_SCHEMA, model: 'sonnet', effort: 'low' })

if (!scout || !scout.concepts.length) throw new Error('Empty scope: no concept found for the batch')
// the prompts glue c.dir onto COURSE: relative to the course folder, ending with /
for (const c of scout.concepts) c.dir = c.dir.replace(/^courses\/[^/]+\//, '').replace(/\/?$/, '/')
log(`Batch: ${scout.concepts.map(c => c.id).join(', ')}; intermediate products in ${WORK}`)

const CHECK_CMD = id => `${scout.spec_dir}checks/check-course ${COURSE.replace(/\/$/, '')} --concept ${id}`

const context = c => `Context of the batch (read these files on disk):
${scout.shared_files.map(f => `- ${f}`).join('\n')}
Instructions for the batch: ${scout.batch_instructions}

Concept ${c.id}: ${c.title}
Concept folder: ${COURSE}${c.dir} (${c.existing ? 'holds files to start from' : 'empty or absent'})
course.yaml entry: ${c.course_entry}
Own inputs:
${c.inputs.map(f => `- ${f}`).join('\n')}
Own instructions: ${c.instructions || '(none)'}`

const reviewPrompt = (c, kind, round, previous) => {
  const scope = kind === 'substance'
    ? `the SUBSTANCE:
- accuracy: every verifiable claim of concept.md and teaching.md has its row in sources.md (or in « Non vérifié »), and the source says what the files claim; reopen a source online if a row looks doubtful; consensus and school correctly labelled and attributed;
- consistency: facts and actors match the storyline (no unflagged new fact), terms match the course glossary (no term used before the concept that introduces it), cross-references are right, no duplicate of another concept folder.`
    : `the FORM:
- teaching: each sub-concept fits one teacher message under the protocol and the course writing rules; each question tests understanding, never "did you understand?"; a question that tests several points is written in parts, as the template of teaching.md shows; expected answers right and nuanced; common mistakes realistic for the audience of plan.md; conformity to the course templates and SPEC.md section 4;
- overlap: no section that explains uses the situation of a case of the example bank or states its verdict (reader text principles stay general);
- style: the course writing rules of plan.md and the typography of the language pack.`
  return `${ROLE}

${context(c)}

You reread the concept folder ${COURSE}${c.dir}, independently, for ${scope}

${round === 2 ? `Second round. Findings of the first round and how they were treated: ${JSON.stringify(previous)}. Check the corrected ones are really corrected, and report only the blocking defects that remain or that the fix created.` : ''}
Modify no file. "blocking": the teacher would teach something false, ambiguous or unusable, or a spec rule is broken. "minor": the rest. Report only real defects, each proved; no finding is a normal result.`
}

const fixPrompt = (c, findings) => `${ROLE}

${context(c)}

You are the writer of the concept folder ${COURSE}${c.dir}. ${findings.length ? `The reviewers' findings:
${JSON.stringify(findings, null, 1)}

For each finding: check it against the files (real defect or false positive). Fix the real defects in concept.md, teaching.md and, if needed, sources.md. Dismiss false positives and say why. A finding that needs a new storyline fact, a new glossary term or a coordinator choice: do not settle it, put it in "open" and add it to ${WORK}${c.id}-needs.md. Then run` : 'The reviewers found nothing. Run'} "${CHECK_CMD(c.id)}" and return its output; fix what it reports about the files you wrote.`

// --- Pipeline per concept --------------------------------------------------------------

const results = await pipeline(
  scout.concepts,

  c => agent(`${ROLE}

${context(c)}

Sources step. Write ${COURSE}${c.dir}sources.md following SPEC.md section 4.4 and the course template. Start from the sources the inputs already verified (do not redo them) and search online only for what is missing. Cover what the concept folder will claim: definitions, consensus with its reference text, schools with their author, dates, figures, quotations, and every claim of the existing files, verified one by one. Tell primary from secondary and marketing sources; put in « Non vérifié » what you could not confirm. Errors found in the existing files go in ${WORK}${c.id}-errors.md (create it only if there are some). Return a three-line summary: what is verified, what is not, the errors found.`,
    { label: `sources:${c.id}`, phase: 'Sources' }),

  (sourcesSummary, c) => agent(`${ROLE}

${context(c)}

Writing step. sources.md of ${COURSE}${c.dir} has just been written (summary: ${sourcesSummary}). Write concept.md and teaching.md there, following SPEC.md section 4, the course templates and the course writing rules of plan.md, for the audience of plan.md, from the course.yaml entry (the sub-concept tree is the structure), the sources, the storyline, the glossary, the inputs and the existing files (keep what is right and proven). Follow the protocol for the example bank. The reader text respects the overlap rule: principles in general terms, neither the situation nor the verdict of a case. The files cite no reference: each claim you add has its row in sources.md; add it, or put it in « Non vérifié ». Edit neither the storyline nor the glossary: a new fact or term you need goes in ${WORK}${c.id}-needs.md (create it only if needed) and your text stays consistent with what exists meanwhile.`,
    { label: `writing:${c.id}`, phase: 'Writing', schema: WRITE_SCHEMA }),

  async (written, c) => {
    const [substance, form] = await parallel([
      () => agent(reviewPrompt(c, 'substance', 1), { label: `substance:${c.id}`, phase: 'Reviews', schema: FINDINGS_SCHEMA }),
      () => agent(reviewPrompt(c, 'form', 1), { label: `form:${c.id}`, phase: 'Reviews', schema: FINDINGS_SCHEMA, model: 'sonnet' }),
    ])
    return { written, round1: { substance: substance?.findings ?? null, form: form?.findings ?? null } }
  },

  async (state, c) => {
    // runs even without findings: the fix agent runs the checks
    const all = [...(state.round1.substance || []), ...(state.round1.form || [])]
    const fix1 = await agent(fixPrompt(c, all), { label: `fixes:${c.id}`, phase: 'Fixes', schema: FIX_SCHEMA })
    return { ...state, fix1 }
  },

  async (state, c) => {
    const kinds = ['substance', 'form'].filter(k => (state.round1[k] || []).some(f => f.severity === 'blocking'))
    if (!kinds.length) return { ...state, round2: null, fix2: null }
    const round2 = {}
    const found = await parallel(kinds.map(k => () =>
      agent(reviewPrompt(c, k, 2, { findings: state.round1[k], treatment: state.fix1 }),
        { label: `${k}-2:${c.id}`, phase: 'Second round', schema: FINDINGS_SCHEMA, ...(k === 'form' ? { model: 'sonnet' } : {}) })))
    kinds.forEach((k, i) => { round2[k] = found[i]?.findings ?? null })
    const left = kinds.flatMap(k => (round2[k] || []).filter(f => f.severity === 'blocking'))
    if (!left.length) return { ...state, round2, fix2: null }
    const fix2 = await agent(fixPrompt(c, left), { label: `fixes-2:${c.id}`, phase: 'Second round', schema: FIX_SCHEMA })
    return { ...state, round2, fix2 }
  },
)

// --- Report ----------------------------------------------------------------------------

const report = scout.concepts.map((c, i) => {
  const r = results[i]
  if (!r) return { id: c.id, status: 'failed: a step failed, see the workflow log' }
  const count = (list, sev) => (list || []).filter(f => f.severity === sev).length
  const r1 = [...(r.round1.substance || []), ...(r.round1.form || [])]
  return {
    id: c.id,
    folder: `${COURSE}${c.dir}`,
    needs: r.written?.needs ?? [],
    writer_notes: r.written?.notes ?? '',
    round1: { blocking: count(r1, 'blocking'), minor: count(r1, 'minor'), reviews_missing: ['substance', 'form'].filter(k => r.round1[k] === null) },
    fix1: r.fix1,
    round2: r.round2,
    fix2: r.fix2,
    open: [...(r.fix1?.open || []), ...(r.fix2?.open || [])],
  }
})
return { work_dir: WORK, report }
