'use strict';
// The course glossary's table (SPEC.md section 6), read by `course-files` and `glossary-order`.
const mdlib = require('./md');

// The term cell: one term or its variants, separated by commas (a comma inside a parenthesis
// does not separate); a parenthesis is a sense qualifier.
// -> { variants: [plain text, qualifier included], qualified }
function termCell(cell) {
  const variants = [];
  let cur = '';
  let depth = 0;
  for (const ch of mdlib.plain(cell)) {
    if (ch === '(') depth++;
    if (ch === ')') depth = Math.max(0, depth - 1);
    if (ch === ',' && depth === 0) { variants.push(cur.trim()); cur = ''; }
    else cur += ch;
  }
  variants.push(cur.trim());
  return { variants: variants.filter(Boolean), qualified: /\(/.test(cell) };
}

// the defining concept cell: one concept number; -> the number, leading zeros dropped
const definingNumber = (cell) => cell.trim().replace(/^0+(?=\d)/, '');

// the first table of glossary.md, before any ## section; null when there is none
function table(g) {
  return mdlib.tables(mdlib.sections(g.body, 2).pre)[0] || null;
}

module.exports = { termCell, definingNumber, table };
