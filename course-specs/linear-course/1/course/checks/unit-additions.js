'use strict';
// The additions of a unit (course/README.md section 3.6), what a program can tell of them: in the
// fields of a unit and of its supplementary cases that the learner reads or hears (course/form.yaml,
// readers: every field but the instruction, the follow-ups included), each passage in bold
// (`**…**`), the labels left out, is a term of glossary.md or one of its comma variants, its sense
// qualifier in parentheses left out, case ignored (rule bold-term-in-glossary): in a unit, bold marks
// a glossary term. That a fact an anchor uses is in storyline.md and that a claim of a published
// field has its row in sources.md are rules by inspection of the same group; that a fixed fact or a
// claim names a unit that exists is course-files' and sources'. Its fields are read as unit-contract
// reads them (lib/course.js); a unit whose fields are unreadable is unit-contract's.
const directives = require('./directives');
const mdlib = directives.lib('md');
const glossary = directives.lib('glossary');
const { fail } = directives.lib('course');

// a field's label, `- **<label>**<qualifier> :`, on its first line or on a follow-up bullet
const LABEL = /^(\s*)- \*\*[^*]+\*\*[^:]*?\s*:/;
const BOLD = /\*\*([^*]+?)\*\*/g;

const key = (t) => mdlib.plain(t).replace(/\s*\([^)]*\)/g, '').trim().toLocaleLowerCase('fr');

// the terms of glossary.md: every comma variant of every term cell, its qualifier left out; null
// when the file or its table is missing
function termsOf(ctx) {
  const g = ctx.md('glossary.md');
  const tab = g && glossary.table(g);
  if (!tab) return null;
  const set = new Set();
  for (const r of tab.rows) if (r.cells.length) for (const v of glossary.termCell(r.cells[0]).variants) set.add(key(v));
  set.delete('');
  return set;
}

// [{ line, text }]: the bold passages of the lines of a field, its labels left out
function bolds(f) {
  const out = [];
  f.lines.forEach((l, i) => {
    if (l.code) return;
    let t = mdlib.maskCode(l.t);
    // the field's own label on its first line; a follow-up's label on its bullet
    if (i === 0 || (f.key === 'misconceptions' && /^ {4}- \*\*/.test(t))) t = t.replace(LABEL, (m) => ' '.repeat(m.length));
    let m;
    BOLD.lastIndex = 0;
    while ((m = BOLD.exec(t))) out.push({ line: l.n, text: m[1] });
  });
  return out;
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.lexiconOk) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon is unusable: see course/README.md section 7')];
  if (!ctx.form || !ctx.form.unit || !ctx.form.supplementary_case) return [fail('course/form.yaml', 1, `tooling error, not a defect of the course: the spec's form is missing or unreadable (${ctx.formError || 'no unit or supplementary_case'})`)];
  const learner = (readers) => !Array.isArray(readers) || readers.includes('learner');
  const heard = new Set(ctx.form.unit.fields.filter((f) => learner(f.readers)).map((f) => f.field));
  const caseHeard = learner(ctx.form.supplementary_case.readers);
  const terms = termsOf(ctx);
  const out = [];
  for (const c of ctx.selected()) {
    if (!c.dir || !ctx.md(c.dir + '/concept.md')) continue;
    const file = c.dir + '/concept.md';
    for (const u of ctx.parts(c).units) {
      const fields = [
        ...u.fields.map((f) => ({ f, where: `unit ${u.sub.id}` })),
        ...(caseHeard ? u.cases.flatMap((k) => k.fields.map((f) => ({ f, where: `unit ${u.sub.id}, case "${k.title}"` }))) : []),
      ];
      for (const { f, where } of fields) {
        if (!heard.has(f.key)) continue;
        const label = ctx.word('unit_fields', f.key) || f.key;
        for (const b of bolds(f)) {
          if (terms && terms.has(key(b.text))) continue;
          out.push(fail(file, b.line, terms
            ? `${where}: « ${label} » puts "${mdlib.plain(b.text)}" in bold, which is no term of glossary.md: in a unit, bold marks a glossary term; add the term to glossary.md, or drop the bold`
            : `${where}: « ${label} » puts "${mdlib.plain(b.text)}" in bold, but glossary.md has no table of terms: in a unit, bold marks a glossary term`));
        }
      }
    }
  }
  return out;
}

module.exports = { id: 'unit-additions', run };
