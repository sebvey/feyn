'use strict';
// The coverage of a unit's case (course/README.md section 3.3), a reporting check: each
// misconception the unit's case names in « Idées fausses en jeu » (`in_play` of the block of cases
// in course/form.yaml) is named by a supplementary case of the unit too, so that the teacher has
// another case to pose after a wrong answer that shows it; a unit that leaves one to its case alone
// is reported, a signal that its stock lacks a case, not an error. A name that matches no
// misconception of its unit, a case that names none and a misconception no case names are
// unit-contract's, which blocks; the cases are read as unit-contract reads them (course/parser.js).
const directives = require('./directives');
const { fail } = directives.lib('common');

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.lexiconOk) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon is unusable: see course/README.md section 7')];
  if (!ctx.form) return [fail('course/form.yaml', 1, `tooling error, not a defect of the course: the spec's form is missing or unreadable (${ctx.formError})`)];
  const block = (ctx.form.unit.blocks || []).find((b) => b.cases && b.cases.in_play);
  if (!block) return [];
  const label = ctx.word('unit_fields', block.cases.in_play.field) || block.cases.in_play.field;
  const lesson = (ctx.form.unit.blocks || []).find((b) => b.misconceptions);
  const out = [];
  for (const c of ctx.selected()) {
    if (!c.dir || !ctx.md(c.dir + '/concept.md')) continue;
    for (const u of ctx.parts(c).units) {
      const first = u.cases.find((x) => x.first);
      if (!first || !first.inPlay) continue;
      // the names of the unit's misconceptions: a name that matches none is unit-contract's
      const mine = new Set(u.fields.filter((f) => lesson && f.key === lesson.misconceptions.field).flatMap((f) => f.items).map((m) => m.name));
      const stock = new Set(u.cases.filter((x) => !x.first).flatMap((x) => x.inPlay || []));
      const alone = [...new Set(first.inPlay)].filter((n) => mine.has(n) && !stock.has(n));
      if (alone.length) {
        out.push(fail(c.dir + '/concept.md', first.line, `unit ${u.sub.id}: the unit's case "${first.title}" names ${alone.map((n) => `"${n}"`).join(', ')} in « ${label} », which no supplementary case of the unit names: after a wrong answer that shows ${alone.length === 1 ? 'it' : 'one of them'}, the teacher has no other case to pose`));
      }
    }
  }
  return out;
}

module.exports = { id: 'case-coverage', run };
