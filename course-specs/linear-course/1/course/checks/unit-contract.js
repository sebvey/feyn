'use strict';
// The contract of a unit (course/README.md section 3.3), from the form of course/form.yaml: a
// section with units holds them and nothing else; each unit is its #### blocks (`unit.blocks`),
// « Leçon », « Cas du fil rouge », « Pièges », then « Consigne au professeur » when it has one,
// each titled by its word alone, the mandatory ones present, none twice, in the order of the
// form, and no line outside a block; « Leçon » and « Cas du fil rouge » hold their labelled
// fields (labels of the lexicon's `unit_fields`, nothing between a label and its colon), no line
// outside a field; « Cas du fil rouge » is a list of cases, each opened by its « Titre » and
// holding its fields once, in order: the first, the unit's case, without « Qualificatif »; each
// other, a supplementary case, with it, one qualifier of the closed list; every case's title
// unique in the concept; « Pièges » holds its misconceptions, each `- « … » : …`, nothing nested
// under it; « Consigne au professeur » is prose. The parts of concept.md and its tree are
// `concept-file`'s, a `structure` check; the length of a unit is `unit-length`'s.
const directives = require('./directives');
const { fail } = directives.lib('course');

// the labelled fields of a list (« Leçon », or one case): known here, nothing before the colon, each once,
// none empty, the mandatory ones present, in the order of `spec`
function checkFields(fields, spec, where, file, out, word, line) {
  const fw = (k) => word('unit_fields', k) || k;
  const allowed = spec.map((f) => f.field);
  const seen = new Map();
  for (const f of fields) {
    if (!allowed.includes(f.key)) { out.push(fail(file, f.line, `${where}: field « ${f.label} » is not a field here (${allowed.map((k) => `« ${fw(k)} »`).join(', ')})`)); continue; }
    if (f.qualifier !== '') out.push(fail(file, f.line, `${where}: field « ${f.label} » carries words before its colon ("${f.qualifier}"): a label stands alone before its colon, "- **${f.label}** : <text>", and the text may start with it`));
    if (seen.has(f.key)) out.push(fail(file, f.line, `${where}: field « ${f.label} » appears twice`));
    seen.set(f.key, f);
    if (f.text === '' && f.lines.length === 1) out.push(fail(file, f.line, `${where}: field « ${f.label} » is empty`));
  }
  for (const s of spec) if (s.presence === 'mandatory' && !seen.has(s.field)) out.push(fail(file, fields.length ? fields[0].line : line, `${where}: mandatory field « ${fw(s.field)} » is missing`));
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

// the cases of « Cas du fil rouge »: the first, the unit's case, its fields without those of
// `supplementary_only`; each other, a supplementary case, with them, its qualifier one of the list
function checkCases(ctx, b, blk, where, file, out) {
  const fw = (k) => ctx.word('unit_fields', k) || k;
  const only = b.cases.supplementary_only || [];
  const quals = (b.cases.qualifiers || []).map((k) => ctx.word('qualifiers', k)).filter(Boolean);
  if (!blk.cases.length) { out.push(fail(file, blk.line, `${where}: the block holds its cases, one at least, each opened by « ${fw(b.cases.opens)} », found none`)); return; }
  for (const cs of blk.cases) {
    const cw = `${where}, case "${cs.title}"`;
    if (cs.first) {
      for (const f of cs.fields.filter((x) => only.includes(x.key))) out.push(fail(file, f.line, `${cw}: the first case is the unit's case, always posed: it has no « ${f.label} » (a supplementary case comes after it)`));
      const fields = cs.fields.filter((x) => !only.includes(x.key));
      checkFields(fields, b.fields.filter((k) => !only.includes(k)).map((k) => ({ field: k, presence: 'mandatory' })), cw, file, out, ctx.word, cs.line);
      continue;
    }
    checkFields(cs.fields, b.fields.map((k) => ({ field: k, presence: 'mandatory' })), cw, file, out, ctx.word, cs.line);
    for (const f of cs.fields.filter((x) => x.key === 'qualifier' && x.text !== '')) {
      const q = [f.text, ...f.lines.slice(1).map((l) => l.t.trim())].join(' ').trim();
      if (quals.includes(q)) continue;
      const inside = quals.find((x) => q.split(/[\s,]+/).includes(x));
      if (inside) out.push(fail(file, f.line, `${cw}: "${q}" holds a word besides the qualifier « ${inside} »: « ${f.label} » holds the qualifier alone`));
      else out.push(fail(file, f.line, `${cw}: unknown qualifier "${q}": a qualifier is one of ${quals.map((x) => `« ${x} »`).join(', ')}, and nothing else`));
    }
  }
}

// the blocks of a unit: each of the form, the mandatory ones present, none twice, in the order of
// the form; then the content of each
function checkBlocks(ctx, u, file, out) {
  const where = `unit ${u.sub.id}`;
  const forms = ctx.form.unit.blocks;
  const word = (b) => (b.labelled ? ctx.word('unit_blocks', b.block) : ctx.word('unit_fields', b.fields[0])) || b.block;
  const order = forms.map((b) => `« ${word(b)} »`).join(', ');
  const seen = new Set();
  let last = null;
  for (const blk of u.blocks) {
    const b = forms.find((x) => x.block === blk.key);
    if (seen.has(b.block)) out.push(fail(file, blk.line, `${where}: block « ${word(b)} » appears twice`));
    else if (last && forms.indexOf(b) < forms.indexOf(last)) out.push(fail(file, blk.line, `${where}: block « ${word(b)} » must come before « ${word(last)} » (the order of course/form.yaml: ${order})`));
    seen.add(b.block);
    if (!last || forms.indexOf(b) > forms.indexOf(last)) last = b;
    const bw = `${where}, « ${word(b)} »`;
    if (b.cases) checkCases(ctx, b, blk, bw, file, out);
    else if (b.labelled) {
      if (!blk.fields.length) out.push(fail(file, blk.line, `${bw}: the block holds its fields, ${b.fields.map((k) => `« ${ctx.word('unit_fields', k) || k} »`).join(', ')}, found none`));
      else checkFields(blk.fields, b.fields.map((k) => ({ field: k, presence: 'mandatory' })), bw, file, out, ctx.word, blk.line);
    } else if (b.fields[0] === 'misconceptions') {
      if (!blk.fields[0].items.length) out.push(fail(file, blk.line, `${where}: « ${word(b)} » holds at least one misconception, "- « <the misconception> » : <its correction>"`));
    } else if (!blk.fields[0].lines.length) out.push(fail(file, blk.line, `${where}: block « ${word(b)} » is empty`));
  }
  for (const b of forms) if (b.presence === 'mandatory' && !seen.has(b.block)) out.push(fail(file, u.line, `${where}: mandatory block "#### ${word(b)}" is missing`));
}

function checkConcept(ctx, c, out) {
  if (!c.dir || !ctx.isDir(c.dir)) return; // concept-file's failure
  const file = c.dir + '/' + ctx.form.concept_file.file;
  if (!ctx.md(file)) return;
  const parts = ctx.parts(c);
  for (const p of parts.problems) out.push(fail(file, p.line, p.message));
  for (const s of parts.sections) {
    if (s.stray.length) out.push(fail(file, s.stray[0].n, `section ${s.sub.id} has units: it holds its ### units and nothing else (found "${s.stray[0].t.trim().slice(0, 40)}")`));
  }
  // the title of every case, the unit's case and the supplementary ones, unique in the concept
  const titles = new Map();
  for (const u of parts.units) {
    if (!u.blocks.length) { out.push(fail(file, u.line, `unit ${u.sub.id}: a unit holds its #### blocks (course/form.yaml), found none`)); continue; }
    checkBlocks(ctx, u, file, out);
    for (const cs of u.cases) {
      if (cs.title === '') continue; // an empty « Titre »: checkFields reports it
      if (titles.has(cs.title)) out.push(fail(file, cs.line, `case title "${cs.title}" is used twice (line ${titles.get(cs.title)}): the title of every case is unique in the concept`));
      else titles.set(cs.title, cs.line);
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
