'use strict';
// No concept.md uses a term of the glossary before the concept that introduces it.
const mdlib = require('./lib/md');
const { fail } = require('./lib/course');

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  const g = ctx.md('glossary.md');
  if (!g) return [fail('glossary.md', 1, 'glossary.md does not exist')];
  const tab = mdlib.tables(g.body)[0];
  if (!tab) return [fail('glossary.md', 1, 'no glossary table found')];
  const terms = [];
  for (const r of tab.rows) {
    if (r.cells.length < 4) continue;
    const term = mdlib.plain(r.cells[0].replace(/\s*\([^)]*\)/g, ''));
    const first = r.cells[3].split(',')[0].trim().replace(/^0+(?=\d)/, '');
    const intro = ctx.conceptByNumber(first);
    if (term && intro) terms.push({ term, intro, line: r.line });
  }
  const out = [];
  for (const c of ctx.selected()) {
    if (!c.dir) continue;
    const f = c.dir + '/concept.md';
    const m = ctx.md(f);
    if (!m) continue;
    for (const t of terms) {
      if (t.intro.index <= c.index) continue;
      const re = new RegExp(`(?<![\\p{L}\\p{N}])${esc(t.term)}(?![\\p{L}\\p{N}])`, 'iu');
      const l = m.body.find((x) => !x.code && re.test(x.t));
      if (l) out.push(fail(f, l.n, `uses the term "${t.term}", introduced by concept ${t.intro.number} (glossary.md:${t.line}), which comes later`));
    }
  }
  return out;
}

module.exports = { id: 'glossary-order', run };
