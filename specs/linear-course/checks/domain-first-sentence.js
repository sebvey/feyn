'use strict';
// The first sentence of each paragraph of « Le fil des concepts » stands alone (SPEC.md section 5).
const mdlib = require('./lib/md');
const { fail } = require('./lib/course');

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.packOk) return [fail('course.yaml', 1, 'the language pack is unusable: see language-pack-keys')];
  const thread = ctx.word('headings', 'concept_thread');
  const ana = ctx.pack.checks && Array.isArray(ctx.pack.checks.anaphora) ? ctx.pack.checks.anaphora.map((w) => String(w).toLowerCase()) : [];
  const out = [];
  for (const d of ctx.cy.domains) {
    if (!d || typeof d.file !== 'string') continue;
    const m = ctx.md(d.file);
    if (!m) continue;
    const sec = mdlib.sections(m.body, 2).sections.find((s) => s.title === thread);
    if (!sec) continue;
    for (const p of mdlib.blocks(sec.lines)) {
      const lm = /^\*\*[^*]+\*\*\s*/.exec(p.text);
      const rest = lm ? p.text.slice(lm[0].length) : p.text;
      const first = rest.slice(0, 300);
      if (!/[.?!](?=\s|$)/.test(first)) {
        out.push(fail(d.file, p.line, `first sentence: no ".", "?" or "!" within 300 characters of the lead ("${rest.slice(0, 40)}...")`));
        continue;
      }
      const w = (/^[\p{L}]+/u.exec(rest) || [''])[0].toLowerCase();
      const wa = (/^[\p{L}]+['’]/u.exec(rest) || [''])[0].toLowerCase();
      if (ana.includes(w) || (wa && ana.includes(wa))) {
        out.push(fail(d.file, p.line, `first sentence opens with "${(wa && ana.includes(wa)) ? wa : w}", an anaphora: it must stand alone`));
      }
    }
  }
  return out;
}

module.exports = { id: 'domain-first-sentence', run };
