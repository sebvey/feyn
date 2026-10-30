'use strict';
// Quality: the first sentence of each paragraph of « Le fil des concepts » does not open with a
// word of the language pack's checks.anaphora list, so that it stands alone (SPEC.md section 5).
// The terminator is the conformity check domain-first-sentence.
const { fail } = require('./lib/course');
const { paragraphs, unusable } = require('./domain-first-sentence');

function run(ctx) {
  const u = unusable(ctx);
  if (u) return u;
  const list = ctx.pack.checks && ctx.pack.checks.anaphora;
  if (!Array.isArray(list) || list.length === 0 || list.some((w) => typeof w !== 'string' || w === '')) {
    return [fail(ctx.packFile, 1, 'no checks.anaphora in the language pack (a non-empty list of strings): the opening anaphora cannot be checked')];
  }
  const ana = list.map((w) => w.toLowerCase());
  const out = [];
  for (const p of paragraphs(ctx)) {
    const w = (/^[\p{L}]+/u.exec(p.rest) || [''])[0].toLowerCase();
    const wa = (/^[\p{L}]+['’]/u.exec(p.rest) || [''])[0].toLowerCase();
    if (ana.includes(w) || (wa && ana.includes(wa))) {
      out.push(fail(p.file, p.line, `first sentence opens with "${(wa && ana.includes(wa)) ? wa : w}", an anaphora: it must stand alone`));
    }
  }
  return out;
}

module.exports = { id: 'domain-first-sentence-standalone', run };
