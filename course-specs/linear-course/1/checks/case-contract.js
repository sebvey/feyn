'use strict';
// The contract of a case (COURSE.md section 3.3), the `pedagogy` part of the concept folder split
// from `concept-folder` (#329): case headings (a sub-concept of the concept and at most one
// qualifier of the closed list), titles unique in the concept, fields (known labels, a qualifier
// on « Question » only, the mandatory fields once and in order), coverage of leaves, citation of
// every case in « Consignes ». The sections of `teaching.md` and their order are
// `concept-folder`'s.
const mdlib = require('./lib/md');
const { fail } = require('./lib/course');

function quotesNorm(s) {
  return s.replace(/[«»“”"]/g, '"').replace(/\s+/g, '');
}

function checkConcept(ctx, c, out) {
  const dir = c.dir;
  const label = `concept ${c.number}`;
  // a missing folder or teaching.md is `concept-folder`'s failure
  if (!dir || !ctx.isDir(dir)) return;
  const H = (k) => ctx.word('headings', k) || k;
  const subIds = new Set(c.subs.map((s) => s.id));
  const leaves = c.subs.filter((s) => s.leaf);

  const tf = dir + '/teaching.md';
  const tm = ctx.md(tf);
  if (!tm) return;
  const top = mdlib.sections(tm.body, 2);
  const bank = top.sections.find((s) => s.title === H('bank'));
  const cases = [];
  if (bank) {
    const caseSecs = mdlib.sections(bank.lines, 3).sections;
    const titles = new Map();
    const fieldLabels = Object.entries((ctx.pack && ctx.pack.case_fields) || {});
    const keyOf = (lab) => (fieldLabels.find(([, v]) => v === lab) || [])[0];
    // the qualifiers: a closed list, the pack's `qualifiers` values (COURSE.md 3.3)
    const quals = Object.values((ctx.pack && ctx.pack.qualifiers) || {}).filter((v) => typeof v === 'string');
    const qualList = quals.map((q) => `« ${q} »`).join(', ');
    for (const cs of caseSecs) {
      const m = /^(.*\S)\s*\(([^()]*)\)\s*$/.exec(cs.title);
      if (!m) { out.push(fail(tf, cs.line, `case heading "${cs.title}" must be "<title> (<sub-concept>)"`)); continue; }
      const title = m[1].trim();
      const parts = m[2].split(',').map((p) => p.trim());
      const sub = parts.find((p) => subIds.has(p));
      const rest = parts.filter((p, i) => i !== parts.indexOf(sub));
      if (parts.length > 2 || !sub) out.push(fail(tf, cs.line, `case "${title}": the parenthesis must hold a sub-concept id of ${label} (and at most one qualifier), found "${m[2]}"`));
      else {
        // a wrong qualifier fails here only: the case still counts for coverage and citation
        if (rest.length && !quals.includes(rest[0])) {
          const inside = quals.find((q) => rest[0].split(/\s+/).includes(q));
          if (inside) out.push(fail(tf, cs.line, `case "${title}": "${rest[0]}" holds a word besides the qualifier « ${inside} »: the parenthesis holds the sub-concept id and the qualifier alone`));
          else out.push(fail(tf, cs.line, `case "${title}": unknown qualifier "${rest[0]}": a qualifier is one of ${qualList}, and nothing else goes in the parenthesis`));
        }
        cases.push({ title, sub, line: cs.line });
      }
      if (titles.has(title)) out.push(fail(tf, cs.line, `case title "${title}" is used twice (line ${titles.get(title)}): titles are unique in the concept`));
      titles.set(title, cs.line);

      // fields
      const fields = [];
      for (const l of cs.lines) {
        if (l.code || !/^- /.test(l.t)) continue;
        const fm = /^- \*\*([^*]+)\*\*([^:]*?)\s*:(\s|$)/.exec(l.t);
        if (!fm) { out.push(fail(tf, l.n, `case "${title}": a field opens with "**<label>** :", found "${l.t.slice(0, 40)}"`)); continue; }
        const key = keyOf(fm[1].trim());
        if (!key) { out.push(fail(tf, l.n, `case "${title}": unknown field "${fm[1].trim()}"`)); continue; }
        if (fm[2].trim() !== '' && key !== 'question') out.push(fail(tf, l.n, `case "${title}": field « ${fm[1].trim()} » carries a qualifier ("${fm[2].replace(/^\s*,/, '').trim()}"): only « ${ctx.word('case_fields', 'question') || 'question'} » may carry one before the colon`));
        if (fields.some((f) => f.key === key)) out.push(fail(tf, l.n, `case "${title}": field « ${fm[1].trim()} » appears twice`));
        fields.push({ key, line: l.n });
      }
      const order = ['situation', 'question', 'expected_answer', 'common_mistakes'];
      const fw = (k) => ctx.word('case_fields', k) || k;
      for (const k of order) if (!fields.some((f) => f.key === k)) out.push(fail(tf, cs.line, `case "${title}": mandatory field « ${fw(k)} » is missing`));
      const idx = (k) => fields.findIndex((f) => f.key === k);
      const present = order.filter((k) => idx(k) >= 0);
      for (let i = 1; i < present.length; i++) {
        if (idx(present[i]) < idx(present[i - 1])) { out.push(fail(tf, fields[idx(present[i])].line, `case "${title}": « ${fw(present[i])} » must come after « ${fw(present[i - 1])} »`)); break; }
      }
      for (const k of ['usage', 'explanation']) {
        if (idx(k) >= 0 && idx('situation') >= 0 && idx(k) > idx('situation')) out.push(fail(tf, fields[idx(k)].line, `case "${title}": « ${fw(k)} » must come before « ${fw('situation')} »`));
      }
      if (idx('what_works') >= 0 && idx('what_works') !== fields.length - 1) out.push(fail(tf, fields[idx('what_works')].line, `case "${title}": « ${fw('what_works')} » comes last`));
    }
    for (const lf of leaves) {
      if (!cases.some((x) => x.sub === lf.id)) out.push(fail(tf, bank.line, `leaf sub-concept ${lf.id} has no case in the bank`));
    }
  }
  // every case cited in « Consignes »
  const ins = top.sections.find((s) => s.title === H('instructions'));
  if (ins) {
    const t = quotesNorm(ins.lines.map((l) => l.t).join(' '));
    for (const cs of cases) {
      if (!t.includes('"' + quotesNorm(cs.title) + '"')) out.push(fail(tf, cs.line, `case "${cs.title}" is not cited by its title in « ${H('instructions')} »`));
    }
  }
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.packOk) return [fail('course.yaml', 1, 'the language pack is unusable: see COURSE.md section 7')];
  const out = [];
  for (const c of ctx.selected()) checkConcept(ctx, c, out);
  return out;
}

module.exports = { id: 'case-contract', run };
