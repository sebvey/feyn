export const meta = {
  name: 'feyn-taught-check-workflow',
  description: 'Verify that no question of a course asks what the learner has not yet been taught',
  whenToUse: 'Run on demand by a work session, with an absolute scriptPath (course-specs/linear-course/1/README.md section 5), whose triage of its findings follows: after an issue that changes what a concept teaches (a unit, its matter, an order), or when the maintainer asks. args: { course: "<course id>", from?: "<first concept or unit reread>", to?: "<last concept or unit reread>" }; a concept by its number (0, 12, A1), a unit by its id (0a1); default the whole course, annexes included. Report only: no agent modifies a file.',
  phases: [
    { title: 'Scope', detail: 'lists concepts and annexes in course order, their units and their entry points' },
    { title: 'Inventory', detail: 'what the learner receives, unit by unit, up to the last unit reread' },
    { title: 'Reread', detail: 'one agent per group of concepts, judged against the inventory' },
  ],
}

// Generic: nothing here belongs to one course. Everything comes from courses/<id>/.
// Report only: triage and fixes stay with the caller.

const A = args || {}
if (!A.course) throw new Error('args.course missing: the course id (courses/<id>/)')
const COURSE = `courses/${A.course}/`
const SPEC = 'course-specs/linear-course/1/course/'
const GROUP = 4

const ROLE = `You maintain a course; you are not the teacher. Do not use git. Modify no file. \
Read the files on disk yourself: trust no summary. Vocabulary: \
docs/glossary.md (concept file, section, unit, matter, anchor, case, supplementary case, \
misconception, instruction, head and foot, deepening, defining concept).`

// the form of a concept file and its words: the spec's data, read by every agent, never written here
const FORM = `The form of a concept file is ${SPEC}form.yaml: every heading starts with its kind, one kind per level; \
its title (\`# Concept <n> : <title>\`, an annex \`# Annexe <id> : <title>\`), its head (a ## heading, then its text), \
its sections (\`## Section <id> : <title>\`) and their units (\`### Unité <id> : <title>\`, one at least per section), its foot \
(a ## heading, then its ### blocks); \
the #### blocks of a unit in their order, each titled by its word alone, with its fields (\`unit.blocks\`); its block of \
cases (\`cases\`) is a list of cases, each opened by its title field: the first, the unit's case, always posed; each other a \
supplementary case, with its qualifier field. The words of the file are the values of ${SPEC}lexicon.yaml at the keys form.yaml names: a \
field's label is \`unit_fields.<field>\` (a field opens with \`- **<label>** :\`; the misconceptions and the instruction of a unit \
are unlabelled, their block's word being their label), a block's word is \`unit_blocks.<block>\` or its one field's label, \
a qualifier is \`qualifiers.<key>\` (fallback, practice, aside), the head, the foot and its blocks are \`headings.<key>\`, the kind word of a heading is \`block_kinds.<key>\`. Read both files first; \
below, a field is named by its key.`

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
          units: { type: 'array', items: { type: 'string' }, description: 'the unit ids of concept.md, in the order of the file: the id of each ### unit heading' },
          entry: { type: 'string', description: 'for an annex: after which concept the learner may open it, from the course; empty string for a concept' },
        },
        required: ['id', 'title', 'concept_file', 'units', 'entry'],
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
          unit: { type: 'string', description: 'the unit id, then the title of the supplementary case when the finding is one' },
          check: { type: 'integer', minimum: 1, maximum: 7, description: 'number of the check' },
          severity: { type: 'string', enum: ['blocking', 'minor'] },
          problem: { type: 'string', description: 'the defect, with the exact quotation' },
          evidence: { type: 'string', description: 'the inventory unit where the notion is taught, or its absence' },
          fix: { type: 'string' },
        },
        required: ['concept', 'unit', 'check', 'severity', 'problem', 'evidence', 'fix'],
      },
    },
  },
  required: ['findings'],
}

const CHECKS = `The seven checks:
1. expected answer (its core, or the mistake the question makes the learner correct) that belongs to a concept or a unit taught later; a nuance with a cross-reference stays allowed;
2. expected answer broader than the unit's matter and the previous units;
3. answer that relies on a storyline fact, actor or rule absent from the anchor and the previous units;
4. glossary term used before its defining concept, without a definition in passing, and without a concept reference to the defining concept or one of its sections or units in its sentence;
5. correction of a misconception that relies on a notion not yet seen;
6. false cross-reference ("seen in X", "recall of X", list of what is already taught) to an X that comes later, or that does not hold what is claimed;
7. the same checks for the supplementary cases (fallback, practice, aside) and the annexes, from their entry point.

What the learner has received at a point of the course: the preceding units of the inventory and, for a unit, its matter, its anchor and its question; for a supplementary case, the matter of its unit and the case's own anchor and question. They are not assumed to read the storyline, the glossary or the rest of the concept file, even though the site shows the first two. Out of scope: prerequisites a learner skipped at their own request.
The expected answer, the misconceptions with their corrections, and the instruction of a unit or a case are the teacher's.
The deepening (headings.deepening, in the foot; the rules of ${SPEC}rules.yaml that course/README.md 3.2 points to) is never taught matter: the teacher reads it only in an aside, on the learner's request, never on the course path, and no unit nor supplementary case relies on it. A question whose expected answer needs it asks what the learner has not been taught: it is a finding (check 2).`

// --- Scope -----------------------------------------------------------------------------

phase('Scope')
const scout = await agent(`${ROLE}

${FORM}

Read ${COURSE}course.yaml and list its concepts then its annexes, in course order, with the path of concept.md in the concept folder (field dir) and its unit ids in the order of the file, and for each annex its entry point, from course.yaml and the course plan.`,
  { label: 'scope', schema: SCOUT_SCHEMA, model: 'sonnet', effort: 'low' })

if (!scout || !scout.concepts.length) throw new Error('Empty scope: no concept found in course.yaml')
const all = scout.concepts
// a bound of args: a concept number, or a unit id of one of its concepts -> { i, unit }
const bound = (x) => {
  if (x === undefined) return null
  const s = String(x)
  const c = all.findIndex(k => k.id === s)
  if (c >= 0) return { i: c, unit: null }
  const u = all.findIndex(k => (k.units || []).includes(s))
  if (u < 0) throw new Error(`${s} is neither a concept of course.yaml nor a unit of its concept files`)
  return { i: u, unit: s }
}
const main = all.filter(c => !c.entry)
const from = bound(A.from)
const to = bound(A.to)
const fromI = from ? from.i : 0
const toI = to ? to.i : all.length - 1
const target = all.slice(fromI, toI + 1).filter(c => c.concept_file)
const lastMain = [...main].reverse().find(c => all.indexOf(c) <= toI) || main[main.length - 1]
const missing = all.slice(fromI, toI + 1).filter(c => !c.concept_file).map(c => c.id)
if (missing.length) log(`No concept file, not reread: ${missing.join(', ')}`)
log(`Reread: ${target.map(c => c.id).join(', ')}${from && from.unit ? `, from unit ${from.unit}` : ''}${to && to.unit ? `, up to unit ${to.unit}` : ''}; inventory up to concept ${lastMain.id}`)

// the units of concept c to reread: all of them, but from and to cut the first and the last concept
const scopeOf = (c) => {
  const i = all.indexOf(c)
  const parts = []
  if (from && from.unit && i === from.i) parts.push(`from unit ${from.unit}`)
  if (to && to.unit && i === to.i) parts.push(`up to unit ${to.unit}`)
  return parts.length ? ` (${parts.join(', ')}, in the order of the file)` : ''
}

// --- Inventory -------------------------------------------------------------------------

phase('Inventory')
const upTo = main.slice(0, main.indexOf(lastMain) + 1)
const inventory = await agent(`${ROLE}

${FORM}

Build the cumulative inventory of what the learner receives following the course, from concept ${main[0].id} to concept ${lastMain.id}, in course order (${scout.course_yaml}). Files: ${upTo.map(c => c.concept_file).filter(Boolean).join(', ')}.

One block per unit, one teacher message each, in the order of the course and, inside a concept file, in the order of the file. For each unit: what its matter and its anchor give the learner (notions, rules, defined terms, storyline actors with what is said of them, storyline facts); its question, in one line; and its expected answer, in one line, which the learner hears in the correction after answering. After a unit, each of its supplementary cases, by its title and its qualifier, with its anchor, its question and its expected answer in one line each: a supplementary case is posed only when its qualifier says (a fallback when the learner fails, practice, an aside), so what it gives is never counted as received by the units after it. The head and the foot of a concept file do not enter the inventory, the deepening least of all.

Return the inventory as text, one block per unit titled "<unit id>: <unit title>", each of its supplementary cases after it titled "<unit id> / <case title> (<qualifier>)". No other comment.`,
  { label: 'inventory' })

if (!inventory) throw new Error('Empty inventory')

// --- Reread ----------------------------------------------------------------------------

const groups = []
for (let i = 0; i < target.length; i += GROUP) groups.push(target.slice(i, i + GROUP))

phase('Reread')
const reviews = await parallel(groups.map(g => () => agent(`${ROLE}

${FORM}

You reread ${g.map(c => `${c.concept_file} (concept ${c.id}${c.entry ? `, annex opened after ${c.entry}` : ''}${scopeOf(c)})`).join(', ')}. For each unit, and each of its supplementary cases, judge whether the learner can answer its question with what they have received at that point. The course glossary (${scout.glossary}) says the defining concept of each term.

${CHECKS}

Inventory of what the learner receives, on the course path:
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
