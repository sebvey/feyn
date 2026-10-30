'use strict';
// Conformity: the first sentence of each paragraph of « Le fil des concepts » ends within 300
// characters of the lead, so that the site can show it on the domain page (SPEC.md section 5).
// The opening anaphora is the quality check domain-first-sentence-standalone.
const mdlib = require('./lib/md');
const { fail } = require('./lib/course');

// Each paragraph of « Le fil des concepts » of every domain file: { file, line, rest }, rest being
// the paragraph's text after its bold lead. Shared with domain-first-sentence-standalone.
function paragraphs(ctx) {
  const thread = ctx.word('headings', 'concept_thread');
  const out = [];
  for (const d of ctx.cy.domains) {
    if (!d || typeof d.file !== 'string') continue;
    const m = ctx.md(d.file);
    if (!m) continue;
    const sec = mdlib.sections(m.body, 2).sections.find((s) => s.title === thread);
    if (!sec) continue;
    for (const p of mdlib.blocks(sec.lines)) {
      const lm = /^\*\*[^*]+\*\*\s*/.exec(p.text);
      out.push({ file: d.file, line: p.line, rest: lm ? p.text.slice(lm[0].length) : p.text });
    }
  }
  return out;
}

function unusable(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.packOk) return [fail('course.yaml', 1, 'the language pack is unusable: see language-pack-keys')];
  return null;
}

function run(ctx) {
  const u = unusable(ctx);
  if (u) return u;
  const out = [];
  for (const p of paragraphs(ctx)) {
    if (!/[.?!](?=\s|$)/.test(p.rest.slice(0, 300))) {
      out.push(fail(p.file, p.line, `first sentence: no ".", "?" or "!" within 300 characters of the lead ("${p.rest.slice(0, 40)}...")`));
    }
  }
  return out;
}

module.exports = { id: 'domain-first-sentence', run, paragraphs, unusable };
