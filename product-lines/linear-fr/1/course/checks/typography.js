'use strict';
// No character the lexicon bans (`typography.banned`: em-dash, arrows) in course text.
const directives = require('./directives');
const { fail } = directives.lib('common');

function run(ctx) {
  if (!ctx.lexiconOk || !ctx.lexicon.typography || !Array.isArray(ctx.lexicon.typography.banned)) {
    return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon has no typography.banned list: see course/README.md section 7')];
  }
  const banned = ctx.lexicon.typography.banned.filter((b) => typeof b === 'string' && b !== '');
  const out = [];
  for (const file of [...ctx.mdFiles(), 'course.yaml']) {
    const text = ctx.read(file);
    if (text === null) continue;
    text.split('\n').forEach((line, k) => {
      for (const b of banned) {
        const i = line.indexOf(b);
        if (i >= 0) {
          const cp = [...b].map((c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ');
          out.push(fail(file, k + 1, `banned string "${b}" (${cp}) at column ${i + 1}`));
        }
      }
    });
  }
  return out;
}

module.exports = { id: 'typography', run };
