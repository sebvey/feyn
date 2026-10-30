export const meta = {
  name: 'feyn-taught-check-workflow',
  description: 'Verify that no case of a course asks what the learner has not yet been taught',
  whenToUse: 'Run by the skill /feyn-taught-check, which triages its findings: after an issue that changes what a concept teaches (teaching notes, a sub-concept, an order), or when the maintainer asks. args: { course: "<course id>", from?: "<first concept reread>", to?: "<last concept reread>" }; default the whole course, annexes included. Report only: no agent modifies a file.',
  phases: [
    { title: 'Scope', detail: 'lists concepts and annexes in course order, and their entry points' },
    { title: 'Inventory', detail: 'what the learner receives, unit by unit, up to the last concept reread' },
    { title: 'Reread', detail: 'one agent per group of concepts, judged against the inventory' },
  ],
}

// Generic: nothing here belongs to one course. Everything comes from courses/<id>/.
// Report only: triage and fixes stay with the caller.

const A = args || {}
if (!A.course) throw new Error('args.course missing: the course id (courses/<id>/)')
const COURSE = `courses/${A.course}/`
const GROUP = 4

const ROLE = `You maintain a course; you are not the teacher: ignore the teaching instructions of the \
repository's CLAUDE.md files except where you are asked to apply them as a criterion. Do not use \
git. Modify no file. Read the files on disk yourself: trust no summary. Vocabulary: \
docs/glossary.md (concept folder, teaching notes, example bank, case, practice case, reader text, \
deepening, defining concept).`

const SCOUT_SCHEMA = {
  type: 'object',
  properties: {
    concepts: {
      type: 'array',
      description: 'concepts then annexes, in course order',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'number as in course.yaml (0, 12, A1)' },
          title: { type: 'string' },
          concept_file: { type: 'string', description: 'path of concept.md in the concept folder, or empty string if the folder has none' },
          teaching_file: { type: 'string', description: 'path of teaching.md in the concept folder, or empty string if none' },
          entry: { type: 'string', description: 'for an annex: after which concept the learner may open it, from the course; empty string for a concept' },
        },
        required: ['id', 'title', 'concept_file', 'teaching_file', 'entry'],
      },
    },
    glossary: { type: 'string', description: 'path of the course glossary' },
    course_yaml: { type: 'string', description: 'path of course.yaml' },
  },
  required: ['concepts', 'glossary', 'course_yaml'],
}

const FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          concept: { type: 'string' },
          case: { type: 'string', description: 'title of the case, or section of the file' },
          check: { type: 'integer', minimum: 1, maximum: 7, description: 'number of the check' },
          severity: { type: 'string', enum: ['blocking', 'minor'] },
          problem: { type: 'string', description: 'the defect, with the exact quotation' },
          evidence: { type: 'string', description: 'the inventory unit where the notion is taught, or its absence' },
          fix: { type: 'string' },
        },
        required: ['concept', 'case', 'check', 'severity', 'problem', 'evidence', 'fix'],
      },
    },
  },
  required: ['findings'],
}

const CHECKS = `The seven checks:
1. expected answer (its core, or the mistake the question makes the learner correct) that belongs to a concept or sub-concept taught later; a nuance with a cross-reference stays allowed;
2. expected answer broader than the case's explanation and the previous units;
3. answer that relies on a storyline fact, actor or rule absent from the situation and the previous units;
4. glossary term used before its defining concept, without a definition in passing;
5. follow-up or correction of the common mistakes that relies on a notion not yet seen;
6. false cross-reference ("seen in X", "recall of X", list of what is already taught) to an X that comes later, or that does not hold what is claimed;
7. the same checks for the fallback cases, the practice cases, the aside cases and the annexes, from their entry point.

What the learner has received at a point of the course: the preceding units of the inventory, the explanation and the situation of the case. They are not assumed to read the storyline, the glossary or the rest of the file, even though the site shows the first two. Out of scope: prerequisites a learner skipped at their own request.
The learner-facing material of a case is its « Explication » and « Situation »; the « Question », « Réponse attendue » and « Erreurs fréquentes » fields are the teacher's.
The « Approfondissement » section of concept.md (headings.deepening, SPEC.md 4.2) is never taught matter: the teacher reads it only in an aside, on the learner's request, never on the course path, and no case of any type relies on it. A case whose expected answer needs it asks what the learner has not been taught: it is a finding (check 2).`

// --- Scope -----------------------------------------------------------------------------

phase('Scope')
const scout = await agent(`${ROLE}

Read ${COURSE}course.yaml and list its concepts then its annexes, in course order, with the paths of concept.md and teaching.md in the concept folder (field dir), and for each annex its entry point, from course.yaml and the course plan.`,
  { label: 'scope', schema: SCOUT_SCHEMA, model: 'sonnet', effort: 'low' })

if (!scout || !scout.concepts.length) throw new Error('Empty scope: no concept found in course.yaml')
const all = scout.concepts
const index = id => {
  if (id === undefined) return -1
  const i = all.findIndex(c => c.id === String(id))
  if (i < 0) throw new Error(`Concept ${id} absent from course.yaml`)
  return i
}
const main = all.filter(c => !c.entry)
const fromI = A.from === undefined ? 0 : index(A.from)
const toI = A.to === undefined ? all.length - 1 : index(A.to)
const target = all.slice(fromI, toI + 1).filter(c => c.teaching_file)
const lastMain = [...main].reverse().find(c => all.indexOf(c) <= toI) || main[main.length - 1]
const missing = all.slice(fromI, toI + 1).filter(c => !c.teaching_file).map(c => c.id)
if (missing.length) log(`No teaching notes, not reread: ${missing.join(', ')}`)
log(`Reread: ${target.map(c => c.id).join(', ')}; inventory up to concept ${lastMain.id}`)

// --- Inventory -------------------------------------------------------------------------

phase('Inventory')
const upTo = main.slice(0, main.indexOf(lastMain) + 1)
const inventory = await agent(`${ROLE}

Build the cumulative inventory of what the learner receives following the course, from concept ${main[0].id} to concept ${lastMain.id}, in course order (${scout.course_yaml}). Files: ${upTo.flatMap(c => [c.concept_file, c.teaching_file]).filter(Boolean).join(', ')}.

One unit per message the teacher sends on the main thread, in the order they send them, following the « Consignes » of teaching.md and the sub-concept tree of course.yaml: the sub-concept, and for each the case of the example bank that serves as its example. For each unit, list what the learner receives there, taken from the explanation and the situation of the case (not the expected answer, which they do not read): notions, rules, defined terms, storyline actors with what is said of them, storyline facts. Also note the answer the correction gives them, in one line. Only main cases enter the inventory: fallback, practice and aside cases do not, nor does the « Approfondissement » section of concept.md.

Return the inventory as text, one unit per block, titled "<concept><sub-concept>: <title of the case>". No other comment.`,
  { label: 'inventory' })

if (!inventory) throw new Error('Empty inventory')

// --- Reread ----------------------------------------------------------------------------

const groups = []
for (let i = 0; i < target.length; i += GROUP) groups.push(target.slice(i, i + GROUP))

phase('Reread')
const reviews = await parallel(groups.map(g => () => agent(`${ROLE}

You reread ${g.map(c => `${c.teaching_file} (concept ${c.id}${c.entry ? `, annex opened after ${c.entry}` : ''})`).join(', ')}, and the sub-concept sections of the matching concept.md. For each case of their example bank, of the four types of SPEC.md 4.3 (main, fallback « rechange », practice « entraînement », aside « aparté »), and for the sections that describe the sub-concepts, judge whether the learner can answer with what they have received at that point. The course glossary (${scout.glossary}) says the defining concept of each term.

${CHECKS}

Inventory of what the learner receives, on the main thread:
${inventory}

"blocking": the learner cannot give the core of the expected answer, or the teacher would correct on a notion they have not received. "minor": the rest (false cross-reference, undefined term one can guess). Report only real defects, each proved by the inventory; no finding is a normal result.`,
  { label: `reread:${g.map(c => c.id).join('-')}`, phase: 'Reread', schema: FINDINGS_SCHEMA })))

const failed = groups.filter((g, i) => !reviews[i]).map(g => g.map(c => c.id).join('-'))
if (failed.length) log(`Rereads failed: ${failed.join(', ')}`)
const findings = reviews.filter(Boolean).flatMap(r => r.findings)
return {
  inventory,
  reviewed: target.map(c => c.id),
  failed,
  blocking: findings.filter(f => f.severity === 'blocking').length,
  findings,
}
