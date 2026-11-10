'use strict';
// What the sources of a course leave to do, without being incoherent (course/README.md section
// 3.4): per concept, one line with its count of claims marked, sourced and checked by a human,
// when one of its sourced claims is not checked; and one line per source of `sources.yaml` that no
// mark cites. A sourced claim is checked when each of its sources and each quote that proves it
// carries `checked`, the date a human verified it. The marks are read by the reader of this MAJOR
// (course/claims.js), as `sources` reads them; what is incoherent is `sources`'. A reporting check:
// a course may leave claims unchecked (sourcing is optional, coherence is not). Its messages are
// French, the language of the spec.
const directives = require('./directives');
const yaml = directives.lib('yaml-lines');
const { fail } = directives.lib('common');
const claims = require('../claims')(directives.lib);

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const plural = (n, one, many) => `${n} ${n > 1 ? many : one}`;

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.lexiconOk) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon is unusable: see course/README.md section 7')];
  if (!ctx.form || !ctx.form.claims) return [fail('course/form.yaml', 1, `tooling error, not a defect of the course: the spec's form is missing or unreadable (${ctx.formError || 'no claims'})`)];
  const read = claims.reader(ctx);
  if (!read) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon has no group natures (consensus, school, fact, course): see course/README.md section 7')];
  const course = claims.ofCourse(ctx, read);
  const data = isObj(course.data) ? course.data : null;
  const sources = data && isObj(data.sources) ? data.sources : {};
  const selected = new Set(ctx.selected().map((c) => c.number));
  const out = [];
  const cited = new Set();
  const checkedQuote = (s, key) => isObj(s) && Array.isArray(s.quotes) && s.quotes.some((q) => isObj(q) && q.claim === key && typeof q.checked === 'string');
  for (const { c, marks } of course.concepts) {
    for (const k of marks) for (const id of k.sources) cited.add(id);
    if (!selected.has(c.number)) continue;
    // a sourced claim that `sources` fails (no name, an unknown source, a source with no quote
    // that proves it) is left out of the count: it is incoherent before it is unchecked
    const coherent = (k) => k.key && k.sources.every((id) => isObj(sources[id]) && Array.isArray(sources[id].quotes) && sources[id].quotes.some((q) => isObj(q) && q.claim === k.key));
    const sourced = marks.filter((k) => k.sources.length && coherent(k));
    const checked = sourced.filter((k) => k.sources.every((id) => typeof sources[id].checked === 'string' && checkedQuote(sources[id], k.key)));
    if (checked.length < sourced.length) {
      const label = `${ctx.word('concept_refs', c.annex ? 'annex' : 'concept') || 'concept'} ${c.number}`;
      out.push(fail(c.dir + '/concept.md', 1, `${label} : ${plural(marks.length, 'affirmation marquée', 'affirmations marquées')}, ${plural(sourced.length, 'sourcée', 'sourcées')}, ${plural(checked.length, 'vérifiée', 'vérifiées')} par un humain (« checked » de chaque source et de chaque extrait qui la prouve)`));
    }
  }
  // a source never cited: the marks of every concept are read, under --concept too
  for (const id of Object.keys(sources)) {
    if (!cited.has(id)) out.push(fail(course.file, yaml.lineOf(sources, id, 1), `source ${id} : aucune marque ne la cite ; une source qu'aucune affirmation ne cite est retirée, ou citée là où elle prouve`));
  }
  return out;
}

// the roles of the spec it reads, by their key in spec.yaml (spec-directives/1/README.md section 1),
// the course through the parser
const reads = ['course.form', 'course.lexicon', 'course.parser', 'course.claims'];

module.exports = { id: 'sources-coverage', run, reads };
