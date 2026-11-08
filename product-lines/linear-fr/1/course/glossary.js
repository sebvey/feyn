'use strict';
// The course glossary's table of a course of this spec MAJOR (course/README.md section 5): its
// terms and their variants, the number of the concept that defines each. Read by the course checks
// `course-files`, `glossary-order` and `unit-additions` and by the site build
// (products/site/build/render-site). It holds a form of this spec (the first table of glossary.md,
// its term cell), so it lives in the spec, beside course/parser.js, not in the directives. It reads
// with the lib of the spec directives this MAJOR follows, which its caller gives it, as the parser:
// `lib(name)` returns spec-directives/<MAJOR>/lib/<name>.js (md).
//   const { termCell, definingNumber, table } = require('<MAJOR>/course/glossary')(lib);

// the directives' lib, bound by the caller (module.exports, at the end)
let mdlib = null;

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

// lib(name): the module spec-directives/<MAJOR>/lib/<name>.js of the directives this MAJOR follows
module.exports = function glossary(lib) {
  mdlib = lib('md');
  return { termCell, definingNumber, table };
};
