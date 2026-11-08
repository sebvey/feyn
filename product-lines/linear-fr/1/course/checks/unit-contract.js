'use strict';
// The contract of a unit (course/README.md section 3.3), from the form of course/form.yaml: a
// section with units holds them and nothing else; each unit is its #### blocks (`unit.blocks`),
// « Leçon », « Cas du fil rouge », then « Consigne au professeur » when it has one, each titled
// by its word alone, the mandatory ones present, none twice, in the order of the form, and no
// line outside a block; « Leçon » and « Cas du fil rouge » hold their labelled fields (labels of
// the lexicon's `unit_fields`, nothing between a label and its colon), no line outside a field;
// « Leçon » holds « Matière », then « Idées fausses », its misconceptions, one at least, each
// named, its name unique in its unit, with its belief in « », then « Racine » and « Correction »,
// each once, in that order, none empty, nothing else under it; « Cas du fil rouge » is a list of
// cases, one at least, each under its heading `##### Cas : <title>` and holding its fields once,
// in order, « Idées fausses en jeu » last; every case's title unique in the concept; each case
// names in « Idées fausses en jeu » one misconception of its unit at least, and only names of
// misconceptions of its unit; each misconception of a unit is named by one of its cases at least
// (whether the unit's case's are named by a supplementary case too is `case-coverage`'s, which
// reports); « Consigne au professeur » is prose. The parts of concept.md and its tree are `concept-file`'s, a `structure` check; the
// length of a teacher message is `teacher-message-length`'s.
const directives = require('./directives');
const { fail } = directives.lib('common');

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

// the cases of « Cas du fil rouge »: each with its fields, those of the form, once, in order, all
// mandatory; « Idées fausses en jeu » names one misconception at least, each a misconception of its
// unit (a name of another unit's said so); each misconception of the unit named by a case at least
function checkCases(ctx, b, blk, u, others, where, file, out) {
  const fw = (k) => ctx.word('unit_fields', k) || k;
  const ip = (b.cases.in_play || {}).field;
  const head = `##### ${ctx.word('block_kinds', b.cases.kind) || b.cases.kind}${ctx.word('block_kinds', ctx.form.concept_file.separator) || ' : '}<title>`;
  if (!blk.cases.length) { out.push(fail(file, blk.line, `${where}: the block holds its cases, one at least, each under its heading "${head}", found none`)); return; }
  const mis = new Map(misconceptionsOf(ctx, u).map((m) => [m.name, m]));
  const named = new Set();
  for (const cs of blk.cases) {
    const cw = `${where}, case "${cs.title}"`;
    checkFields(cs.fields, b.fields.filter((k) => k !== ip).map((k) => ({ field: k, presence: 'mandatory' })).concat(ip ? [{ field: ip, presence: 'optional' }] : []).sort((x, y) => b.fields.indexOf(x.field) - b.fields.indexOf(y.field)), cw, file, out, ctx.word, cs.line);
    if (!ip) continue;
    if (!cs.inPlay || !cs.inPlay.length) {
      out.push(fail(file, cs.line, `${cw}: names no misconception: « ${fw(ip)} » names the misconceptions of its unit its situation makes tempting, one at least, "- **${fw(ip)}** : <name> ; <name>"`));
      continue;
    }
    const f = cs.fields.find((x) => x.key === ip);
    for (const n of cs.inPlay) {
      if (mis.has(n)) { named.add(n); continue; }
      const elsewhere = others.find((o) => o.names.includes(n));
      out.push(fail(file, f ? f.line : cs.line, elsewhere
        ? `${cw}: « ${fw(ip)} » names "${n}", a misconception of unit ${elsewhere.unit}, not of its unit: a case names only the misconceptions of its unit`
        : `${cw}: « ${fw(ip)} » names "${n}", which is no misconception of its unit (${[...mis.keys()].map((x) => `"${x}"`).join(', ') || 'none'})`));
    }
  }
  if (!ip) return;
  for (const [name, m] of mis) {
    if (!named.has(name)) out.push(fail(file, m.line, `${where.replace(/, « [^»]* »$/, '')}: misconception "${name}" is named by no case: each misconception of a unit is named in « ${fw(ip)} » of one of its cases at least`));
  }
}

// the misconceptions of a unit, its lesson's, those with a name
function misconceptionsOf(ctx, u) {
  const lesson = ctx.form.unit.blocks.find((b) => b.misconceptions);
  if (!lesson) return [];
  return u.fields.filter((f) => f.key === lesson.misconceptions.field).flatMap((f) => f.items).filter((m) => m.name !== '');
}

// the misconceptions of a field (« Idées fausses »): one at least; each with its name, unique in
// its unit, and its belief (a form the parser could not read is its problem, listed already); its
// parts, those of `spec.parts`, each once, in that order, none empty, nothing before a colon
function checkMisconceptions(ctx, f, spec, where, file, out) {
  const fw = (k) => ctx.word('unit_fields', k) || k;
  const parts = spec.parts || [];
  if (f.text === '' && f.lines.length === 1) return; // an empty field: checkFields reports it
  if (!f.items.length) { out.push(fail(file, f.line, `${where}: « ${f.label} » holds at least one misconception, "  - **<name>** : « <belief> »", then ${parts.map((k) => `« ${fw(k)} »`).join(' and ')}`)); return; }
  const names = new Map();
  for (const m of f.items) {
    const mw = `${where}, misconception "${m.name}"`;
    if (m.name !== '') {
      if (names.has(m.name)) out.push(fail(file, m.line, `${where}: misconception name "${m.name}" is used twice (line ${names.get(m.name)}): the name of a misconception is unique in its unit`));
      else names.set(m.name, m.line);
    }
    const seen = new Set();
    let last = -1;
    for (const p of m.parts) {
      if (p.qualifier !== '') out.push(fail(file, p.line, `${mw}: « ${p.label} » carries words before its colon ("${p.qualifier}"): a label stands alone before its colon`));
      if (seen.has(p.key)) out.push(fail(file, p.line, `${mw}: « ${p.label} » appears twice`));
      else if (parts.indexOf(p.key) < last) out.push(fail(file, p.line, `${mw}: « ${p.label} » must come before « ${fw(parts[last])} » (the order of course/form.yaml)`));
      seen.add(p.key);
      last = Math.max(last, parts.indexOf(p.key));
      if (p.body === '') out.push(fail(file, p.line, `${mw}: « ${p.label} » is empty`));
    }
    for (const k of parts) if (!seen.has(k)) out.push(fail(file, m.line, `${mw}: its « ${fw(k)} » is missing: a misconception holds ${parts.map((x) => `« ${fw(x)} »`).join(' and ')}, in that order`));
  }
}

// the blocks of a unit: each of the form, the mandatory ones present, none twice, in the order of
// the form; then the content of each
function checkBlocks(ctx, u, others, file, out) {
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
    if (b.cases) checkCases(ctx, b, blk, u, others, bw, file, out);
    else if (b.labelled) {
      if (!blk.fields.length) out.push(fail(file, blk.line, `${bw}: the block holds its fields, ${b.fields.map((k) => `« ${ctx.word('unit_fields', k) || k} »`).join(', ')}, found none`));
      else checkFields(blk.fields, b.fields.map((k) => ({ field: k, presence: 'mandatory' })), bw, file, out, ctx.word, blk.line);
      if (b.misconceptions) for (const f of blk.fields.filter((x) => x.key === b.misconceptions.field)) checkMisconceptions(ctx, f, b.misconceptions, bw, file, out);
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
  // the misconceptions of every unit of the concept, to name the unit of a name a case gives
  const others = parts.units.map((u) => ({ unit: u.sub.id, names: misconceptionsOf(ctx, u).map((m) => m.name) }));
  // the title of every case, the unit's case and the supplementary ones, unique in the concept
  const titles = new Map();
  for (const u of parts.units) {
    if (!u.blocks.length) { out.push(fail(file, u.line, `unit ${u.sub.id}: a unit holds its #### blocks (course/form.yaml), found none`)); continue; }
    checkBlocks(ctx, u, others.filter((o) => o.unit !== u.sub.id), file, out);
    for (const cs of u.cases) {
      if (cs.title === '') continue; // a heading with no title: the parser reports it
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

// the roles of the spec it reads, by their key in spec.yaml (spec-directives/1/README.md section 8),
// the course through the parser
const reads = ['course.form', 'course.lexicon', 'course.parser'];

module.exports = { id: 'unit-contract', run, reads };
