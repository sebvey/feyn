'use strict';
// The additions of a unit (course/README.md section 3.6), what a program can tell of them: in the
// fields of a unit, those of its cases among them, that the learner reads or hears (course/form.yaml,
// the readers of their block: every block but « Consigne au professeur »), each passage in bold
// (`**…**`), the labels left out (a misconception's name and the labels of its parts among them), is a term of glossary.md or one of its comma variants, its sense
// qualifier in parentheses left out, case ignored (rule bold-term-in-glossary, a recommendation: bold
// for emphasis stays possible, and a bold that is no term is reported in case the term is missing
// from the glossary); a passage in bold inside the text of a claim's mark is read as any other.
// That a fact an anchor uses is in storyline.md and that a claim of a published field is marked
// are rules by inspection of the same group; that a fixed fact names a unit that exists is
// course-files', and that a mark is coherent with sources.yaml is sources'. Its fields are read as unit-contract
// reads them (course/parser.js); a unit whose fields are unreadable is unit-contract's.
const directives = require('./directives');
const mdlib = directives.lib('md');
// the glossary's table is read by the reader of this MAJOR (course/glossary.js), given the directives' lib
const glossary = require('../glossary')(directives.lib);
const { fail } = directives.lib('common');

// a field's label, `- **<label>** :` (what stands before its colon, which unit-contract refuses,
// included), on its first line
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
  // the lines that open a misconception (its name) or one of its parts (its label)
  const labelled = new Set((f.items || []).flatMap((m) => [m.line, ...(m.parts || []).map((p) => p.line)]));
  f.lines.forEach((l, i) => {
    if (l.code) return;
    let t = mdlib.maskCode(l.t);
    // the field's own label on its first line (an unlabelled field has none), and those of its misconceptions
    if ((i === 0 && f.labelled) || labelled.has(l.n)) t = t.replace(LABEL, (m) => ' '.repeat(m.length));
    let m;
    BOLD.lastIndex = 0;
    while ((m = BOLD.exec(t))) out.push({ line: l.n, text: m[1] });
  });
  return out;
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.lexiconOk) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon is unusable: see course/README.md section 7')];
  if (!ctx.form || !ctx.form.unit) return [fail('course/form.yaml', 1, `tooling error, not a defect of the course: the spec's form is missing or unreadable (${ctx.formError || 'no unit'})`)];
  const learner = (readers) => !Array.isArray(readers) || readers.includes('learner');
  const heard = new Set(ctx.form.unit.blocks.filter((b) => learner(b.readers)).flatMap((b) => b.fields));
  const terms = termsOf(ctx);
  const out = [];
  for (const c of ctx.selected()) {
    if (!c.dir || !ctx.md(c.dir + '/concept.md')) continue;
    const file = c.dir + '/concept.md';
    for (const u of ctx.parts(c).units) {
      for (const f of u.fields) {
        if (!heard.has(f.key)) continue;
        const where = f.case ? `unit ${u.sub.id}, case "${f.case.title}"` : `unit ${u.sub.id}`;
        const label = ctx.word('unit_fields', f.key) || f.key;
        for (const b of bolds(f)) {
          if (terms && terms.has(key(b.text))) continue;
          out.push(fail(file, b.line, terms
            ? `${where}: « ${label} » puts "${mdlib.plain(b.text)}" in bold, which is no term of glossary.md: if it is a term, add it to glossary.md; if it is emphasis, leave it`
            : `${where}: « ${label} » puts "${mdlib.plain(b.text)}" in bold, but glossary.md has no table of terms: if it is a term, add it to glossary.md; if it is emphasis, leave it`));
        }
      }
    }
  }
  return out;
}

// the roles of the spec it reads, by their key in spec.yaml (spec-directives/1/README.md section 1),
// the course through the parser
const reads = ['course.form', 'course.lexicon', 'course.parser', 'course.glossary'];

module.exports = { id: 'unit-additions', run, reads };
