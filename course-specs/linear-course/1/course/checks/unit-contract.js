'use strict';
// The contract of a unit (course/README.md section 3.3), from the form of course/form.yaml: a
// section with units holds them and nothing else; each unit is its #### blocks (`unit.blocks`),
// « Leçon (pour tous) », « Exercice (teacher seulement) », « Pièges (pour tous) », then « Consigne
// (teacher seulement) » when it has one, each titled by its word and its reader, the mandatory ones
// present, none twice, in the order of the form, before the supplementary cases, and no line
// outside a block; « Leçon » and « Exercice » hold their labelled fields (labels of the lexicon's
// `unit_fields`, a qualifier on « Question » only), each once, in order, and no line outside a
// field; « Pièges » holds its misconceptions, each `- « … » : …`, nothing nested under it;
// « Consigne » is prose. Each supplementary case is a #### heading `#### En stock, <qualifier>
// (teacher seulement) : <title>`, one qualifier of the closed list, a title unique in the concept,
// and its labelled fields (`supplementary_case.fields`), its « Pièges » a nested list of
// misconceptions. The parts of concept.md and its tree are `concept-file`'s, a `structure` check;
// the length of a unit is `unit-length`'s.
const directives = require('./directives');
const { fail } = directives.lib('course');

function checkFields(fields, spec, where, file, out, word) {
  const fw = (k) => word('unit_fields', k) || k;
  const allowed = spec.map((f) => f.field);
  const seen = new Map();
  for (const f of fields) {
    if (!allowed.includes(f.key)) { out.push(fail(file, f.line, `${where}: field « ${f.label} » is not a field here (${allowed.map((k) => `« ${fw(k)} »`).join(', ')})`)); continue; }
    if (f.qualifier !== '' && f.key !== 'question') out.push(fail(file, f.line, `${where}: field « ${f.label} » carries a qualifier ("${f.qualifier}"): only « ${fw('question')} » may carry one before the colon`));
    if (seen.has(f.key)) out.push(fail(file, f.line, `${where}: field « ${f.label} » appears twice`));
    seen.set(f.key, f);
    if (f.key === 'misconceptions') {
      if (f.text !== '') out.push(fail(file, f.line, `${where}: « ${f.label} » holds its misconceptions as a nested list, nothing after its colon`));
      else if (!f.items.length) out.push(fail(file, f.line, `${where}: « ${f.label} » holds at least one misconception, "- « <the misconception> » : <its correction>"`));
    } else if (f.text === '' && f.lines.length === 1) out.push(fail(file, f.line, `${where}: field « ${f.label} » is empty`));
  }
  for (const s of spec) if (s.presence === 'mandatory' && !seen.has(s.field)) out.push(fail(file, fields.length ? fields[0].line : 1, `${where}: mandatory field « ${fw(s.field)} » is missing`));
  // the order: each field after those the form puts before it
  const rank = (k) => allowed.indexOf(k);
  const present = fields.filter((f) => allowed.includes(f.key));
  for (let i = 1; i < present.length; i++) {
    if (rank(present[i].key) < rank(present[i - 1].key)) {
      out.push(fail(file, present[i].line, `${where}: « ${present[i].label} » must come before « ${present[i - 1].label} » (the order of course/form.yaml)`));
      break;
    }
  }
}

// the blocks of a unit: each of the form, titled by its word and its reader, the mandatory ones
// present, none twice, in the order of the form, before the cases; then the content of each
function checkBlocks(ctx, u, file, out) {
  const where = `unit ${u.sub.id}`;
  const forms = ctx.form.unit.blocks;
  const word = (b) => (b.labelled ? ctx.word('unit_blocks', b.block) : ctx.word('unit_fields', b.fields[0])) || b.block;
  const reader = (k) => ctx.word('readers', k) || k;
  const heading = (b) => `#### ${word(b)} (${reader(b.reader)})`;
  const order = forms.map((b) => `« ${word(b)} »`).join(', ');
  const seen = new Set();
  let last = null;
  for (const blk of u.blocks) {
    const b = forms.find((x) => x.block === blk.key);
    if (blk.reader !== reader(b.reader)) out.push(fail(file, blk.line, `${where}: block « ${word(b)} » is read « ${reader(b.reader)} », its heading "${heading(b)}", found "#### ${blk.text}"`));
    if (seen.has(b.block)) out.push(fail(file, blk.line, `${where}: block « ${word(b)} » appears twice`));
    else if (last && forms.indexOf(b) < forms.indexOf(last)) out.push(fail(file, blk.line, `${where}: block « ${word(b)} » must come before « ${word(last)} » (the order of course/form.yaml: ${order})`));
    else if (blk.afterCase) out.push(fail(file, blk.line, `${where}: block « ${word(b)} » must come before the supplementary cases`));
    seen.add(b.block);
    if (!last || forms.indexOf(b) > forms.indexOf(last)) last = b;
    const bw = `${where}, « ${word(b)} »`;
    if (b.labelled) {
      checkFields(blk.fields, b.fields.map((k) => ({ field: k, presence: 'mandatory' })), bw, file, out, ctx.word);
      if (!blk.fields.length) out.push(fail(file, blk.line, `${bw}: the block holds its fields, ${b.fields.map((k) => `« ${ctx.word('unit_fields', k) || k} »`).join(', ')}, found none`));
    } else if (b.fields[0] === 'misconceptions') {
      if (!blk.fields[0].items.length) out.push(fail(file, blk.line, `${where}: « ${word(b)} » holds at least one misconception, "- « <the misconception> » : <its correction>"`));
    } else if (!blk.fields[0].lines.length) out.push(fail(file, blk.line, `${where}: block « ${word(b)} » is empty`));
  }
  for (const b of forms) if (b.presence === 'mandatory' && !seen.has(b.block)) out.push(fail(file, u.line, `${where}: mandatory block "${heading(b)}" is missing`));
}

function checkConcept(ctx, c, out) {
  if (!c.dir || !ctx.isDir(c.dir)) return; // concept-file's failure
  const file = c.dir + '/' + ctx.form.concept_file.file;
  if (!ctx.md(file)) return;
  const parts = ctx.parts(c);
  const caseForm = ctx.form.supplementary_case;
  const caseSpec = caseForm.fields.map((k) => ({ field: k, presence: 'mandatory' }));
  const caseReader = ctx.word('readers', caseForm.reader) || caseForm.reader;
  for (const p of parts.problems) out.push(fail(file, p.line, p.message));
  for (const s of parts.sections) {
    if (s.stray.length) out.push(fail(file, s.stray[0].n, `section ${s.sub.id} has units: it holds its ### units and nothing else (found "${s.stray[0].t.trim().slice(0, 40)}")`));
  }
  const titles = new Map();
  for (const u of parts.units) {
    const where = `unit ${u.sub.id}`;
    if (!u.blocks.length && !u.cases.length) { out.push(fail(file, u.line, `${where}: a unit holds its #### blocks (course/form.yaml), found none`)); continue; }
    checkBlocks(ctx, u, file, out);
    for (const cs of u.cases) {
      if (titles.has(cs.title)) out.push(fail(file, cs.line, `case title "${cs.title}" is used twice (line ${titles.get(cs.title)}): titles are unique in the concept`));
      titles.set(cs.title, cs.line);
      if (cs.reader !== null && cs.reader !== caseReader) out.push(fail(file, cs.line, `${where}, case "${cs.title}": a supplementary case is read « ${caseReader} », found « ${cs.reader} »`));
      if (!cs.fields.length) out.push(fail(file, cs.line, `${where}, case "${cs.title}": a supplementary case holds its fields, found none`));
      else checkFields(cs.fields, caseSpec, `${where}, case "${cs.title}"`, file, out, ctx.word);
    }
  }
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.lexiconOk) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon is unusable: see course/README.md section 7')];
  if (!ctx.form) return [fail('course/form.yaml', 1, `tooling error, not a defect of the course: the spec's form is missing or unreadable (${ctx.formError})`)];
  const out = [];
  for (const c of ctx.selected()) checkConcept(ctx, c, out);
  return out;
}

module.exports = { id: 'unit-contract', run };
