'use strict';
// The length of a teacher message (course/README.md section 3.3), a reporting check: the text of
// the fields that `length` of `unit` in course/form.yaml names (« Matière », « Ancrage »,
// « Question »), those of the unit's case, the first of « Cas du fil rouge », and none of a
// supplementary case's, the misconceptions left out, counted in lines of `line` characters (the
// characters of the text, label and indentation left out, divided by `line`), per unit; a unit
// above `max` is reported, a signal that it may not hold in one teacher message, not an error.
// Its fields are read as unit-contract reads them (course/parser.js); a unit whose fields are
// unreadable is unit-contract's.
const directives = require('./directives');
const { fail } = directives.lib('common');

// the characters of a field: its text after the label, then each of its following lines, trimmed
function chars(f) {
  return [f.text, ...f.lines.slice(1).map((l) => l.t.trim())].reduce((n, t) => n + [...t].length, 0);
}

// [{ unit, lines }] for each unit of a concept, lines rounded to one decimal
function lengths(ctx, c) {
  const L = ctx.form.unit.length;
  return ctx.parts(c).units.map((u) => {
    // the unit's fields outside its cases, then its case's: a supplementary case is posed apart
    const own = u.fields.filter((f) => !f.case || f.case.first);
    const n = own.filter((f) => L.fields.includes(f.key)).reduce((s, f) => s + chars(f), 0);
    return { unit: u, lines: Math.round((n / L.line) * 10) / 10 };
  });
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.lexiconOk) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon is unusable: see course/README.md section 7')];
  if (!ctx.form) return [fail('course/form.yaml', 1, `tooling error, not a defect of the course: the spec's form is missing or unreadable (${ctx.formError})`)];
  const L = ctx.form.unit.length;
  const names = L.fields.map((k) => `« ${ctx.word('unit_fields', k) || k} »`).join(', ');
  const out = [];
  for (const c of ctx.selected()) {
    if (!c.dir || !ctx.md(c.dir + '/concept.md')) continue;
    for (const { unit, lines } of lengths(ctx, c)) {
      if (lines > L.max) out.push(fail(c.dir + '/concept.md', unit.line, `unit ${unit.sub.id}: ${lines} lines of ${L.line} characters in ${names}, above ${L.max}: a unit holds in one teacher message`));
    }
  }
  return out;
}

module.exports = { id: 'teacher-message-length', run, lengths };
