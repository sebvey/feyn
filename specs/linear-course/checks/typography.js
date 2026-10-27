'use strict';
// No character the language pack bans (French: em-dash, arrows) in course text.
const { fail } = require('./lib/course');

function run(ctx) {
  if (!ctx.packOk || !ctx.pack.typography || !Array.isArray(ctx.pack.typography.banned)) {
    return [fail('course.yaml', 1, 'the language pack has no typography.banned list: see language-pack-keys')];
  }
  const banned = ctx.pack.typography.banned.filter((b) => typeof b === 'string' && b !== '');
  const out = [];
  for (const file of [...ctx.mdFiles(), 'course.yaml']) {
    const text = ctx.read(file);
    if (text === null) continue;
    text.split('\n').forEach((line, k) => {
      for (const b of banned) {
        const i = line.indexOf(b);
        if (i >= 0) {
          const cp = 'U+' + b.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
          out.push(fail(file, k + 1, `banned character "${b}" (${cp}) at column ${i + 1}`));
        }
      }
    });
  }
  return out;
}

module.exports = { id: 'typography', run };
