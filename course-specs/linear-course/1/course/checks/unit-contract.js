'use strict';
// The contract of a unit (course/README.md section 3.3), from the form of course/form.yaml: a
// section with units holds them and nothing else; each unit is a list of labelled fields (labels of
// the lexicon's `unit_fields`, a qualifier on « Question » only), the mandatory ones present, none
// twice, in the order of the form, and no line outside a field; « Idées fausses » a list of
// misconceptions, each `- « … » : …`, nothing nested under it; each supplementary case a
// #### heading with one qualifier of the closed list, a title unique in the concept, and the fields
// of a unit without those the form leaves out. The parts of concept.md and its tree are
// `concept-file`'s, a `structure` check; the length of a unit is `unit-length`'s.
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

function checkConcept(ctx, c, out) {
  if (!c.dir || !ctx.isDir(c.dir)) return; // concept-file's failure
  const file = c.dir + '/' + ctx.form.concept_file.file;
  if (!ctx.md(file)) return;
  const parts = ctx.parts(c);
  const unitSpec = ctx.form.unit.fields;
  const caseSpec = unitSpec.filter((f) => ctx.form.supplementary_case.fields.includes(f.field));
  for (const p of parts.problems) out.push(fail(file, p.line, p.message));
  for (const s of parts.sections) {
    if (s.stray.length) out.push(fail(file, s.stray[0].n, `section ${s.sub.id} has units: it holds its ### units and nothing else (found "${s.stray[0].t.trim().slice(0, 40)}")`));
  }
  const titles = new Map();
  for (const u of parts.units) {
    const where = `unit ${u.sub.id}`;
    if (!u.fields.length) { out.push(fail(file, u.line, `${where}: a unit holds its fields (course/form.yaml), found none`)); continue; }
    checkFields(u.fields, unitSpec, where, file, out, ctx.word);
    for (const cs of u.cases) {
      if (titles.has(cs.title)) out.push(fail(file, cs.line, `case title "${cs.title}" is used twice (line ${titles.get(cs.title)}): titles are unique in the concept`));
      titles.set(cs.title, cs.line);
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
