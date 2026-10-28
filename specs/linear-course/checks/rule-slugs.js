'use strict';
// Every rule of PROTOCOL.md is named by a slug, defined once, and every rule cited in PROTOCOL.md,
// SPEC.md and decisions/ is cited by a slug that is defined (decision rules-named-by-slug).
//
// Defined: a line of a rule family ("## <n>. ...") that opens on `**<slug>** `, or a table row of a
// family whose first cell is `**<slug>**`.
// Cited:
//   - in a rule family, every code span shaped like a slug;
//   - in a table of PROTOCOL.md, every code span of a "Used in" or "Rule" column;
//   - elsewhere (PROTOCOL.md's other sections, SPEC.md, decisions/*.md), the code spans that follow
//     « rule », « rules », « règle » or « règles », joined by commas, « and », « to », « et », « à ».
// A rule named or cited by its old number (`**1.2**`, « règle 1.2 », « rules 1.1, 1.5 ») fails too.
const mdlib = require('./lib/md');
const { fail } = require('./lib/course');

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+){1,4}$/;
const NUMBER = /^\d+\.\d+[a-z]?$/;
const KEYWORD = /\b(?:[Rr]ules?|[Rr]ègles?)/;
const PROTOCOL = 'PROTOCOL.md';

const codeSpans = (t) => [...t.matchAll(/`([^`]+)`/g)].map((m) => m[1]);

// paragraphs as one string, with a map from an offset to its line number
function paragraphs(lines) {
  return mdlib.blocks(lines).filter((b) => !b.code && !b.lines[0].t.trim().startsWith('|')).map((b) => {
    const starts = [];
    let text = '';
    for (const l of b.lines) {
      starts.push([text.length, l.n]);
      text += (text ? ' ' : '') + l.t.trim();
    }
    const lineAt = (off) => starts.filter(([o]) => o <= off).pop()[1];
    return { text, lineAt };
  });
}

// citations led by a keyword: [{ items, line }]
function keywordCitations(lines) {
  const out = [];
  const lead = new RegExp(KEYWORD.source + '(\\s+`[^`]+`(?:(?:\\s*,\\s*|\\s+(?:and|or|to|et|ou|à)\\s+)`[^`]+`)*)', 'g');
  for (const p of paragraphs(lines)) {
    for (const m of p.text.matchAll(lead)) out.push({ items: codeSpans(m[1]), line: p.lineAt(m.index) });
  }
  return out;
}

// « règle 1.2 », « rules 1.1, 1.5 »: a rule cited by number, code spans masked
function numberCitations(lines) {
  const out = [];
  for (const p of paragraphs(lines)) {
    for (const m of mdlib.maskCode(p.text).matchAll(new RegExp(KEYWORD.source + '\\s+(\\d+\\.\\d+[a-z]?)', 'g'))) {
      out.push({ number: m[1], line: p.lineAt(m.index) });
    }
  }
  return out;
}

function run(ctx) {
  const text = ctx.read(PROTOCOL);
  if (text === null) return [fail(PROTOCOL, 1, 'PROTOCOL.md is missing')];
  const out = [];
  const defs = new Map();
  const cites = [];
  const body = mdlib.split(text).body;
  const { pre, sections } = mdlib.sections(body, 2);
  const family = (s) => /^\d+\.\s/.test(s.title);

  const define = (name, line) => {
    if (NUMBER.test(name)) out.push(fail(PROTOCOL, line, `rule named by its number "${name}": a rule is named by a slug`));
    else if (!SLUG.test(name)) out.push(fail(PROTOCOL, line, `"${name}" is not a slug (two to five lowercase words joined by hyphens)`));
    else if (defs.has(name)) out.push(fail(PROTOCOL, line, `slug "${name}" is defined twice (first at line ${defs.get(name)})`));
    else defs.set(name, line);
  };

  for (const s of sections.filter(family)) {
    for (const l of s.lines) {
      if (l.code) continue;
      const head = /^\*\*([^*]+)\*\*(?:\s|$)/.exec(l.t);
      if (head) define(head[1], l.n);
      for (const c of codeSpans(l.t)) if (SLUG.test(c)) cites.push({ file: PROTOCOL, slug: c, line: l.n });
    }
    for (const tb of mdlib.tables(s.lines)) {
      for (const r of tb.rows) {
        const cell = /^\*\*([^*]+)\*\*$/.exec(r.cells[0] || '');
        if (cell) define(cell[1], r.line);
      }
    }
    for (const n of numberCitations(s.lines)) out.push(fail(PROTOCOL, n.line, `rule cited by its number "${n.number}": cite its slug`));
  }

  // the tables of the other sections: "Used in" and "Rule" columns
  const others = sections.filter((s) => !family(s));
  for (const s of others) {
    for (const tb of mdlib.tables(s.lines)) {
      const cols = tb.header.map((h, i) => (h === 'Used in' || h === 'Rule' ? i : -1)).filter((i) => i >= 0);
      for (const r of tb.rows) {
        for (const i of cols) {
          const cell = r.cells[i] || '';
          const spans = codeSpans(cell);
          const rest = cell.replace(/`[^`]+`/g, '').replace(/[,\s]/g, '');
          if (rest || !spans.length) out.push(fail(PROTOCOL, r.line, `"${tb.header[i]}" cell "${cell}": rules are cited as code spans of their slugs, comma-separated`));
          for (const c of spans) cites.push({ file: PROTOCOL, slug: c, line: r.line });
        }
      }
    }
  }

  // prose outside the rule families, SPEC.md, decisions/*.md: citations led by a keyword
  const prose = [{ file: PROTOCOL, lines: [...pre, ...others.flatMap((s) => s.lines)] }];
  const spec = ctx.read('SPEC.md');
  if (spec === null) out.push(fail('SPEC.md', 1, 'SPEC.md is missing'));
  else prose.push({ file: 'SPEC.md', lines: mdlib.split(spec).body });
  for (const name of ctx.list('decisions').filter((n) => n.endsWith('.md')).sort()) {
    prose.push({ file: 'decisions/' + name, lines: mdlib.split(ctx.read('decisions/' + name) || '').body });
  }
  for (const p of prose) {
    for (const k of keywordCitations(p.lines)) for (const c of k.items) cites.push({ file: p.file, slug: c, line: k.line });
    for (const n of numberCitations(p.lines)) out.push(fail(p.file, n.line, `rule cited by its number "${n.number}": cite its slug`));
  }

  for (const c of cites) {
    if (NUMBER.test(c.slug)) out.push(fail(c.file, c.line, `rule cited by its number "${c.slug}": cite its slug`));
    else if (!SLUG.test(c.slug)) out.push(fail(c.file, c.line, `rule cited as "${c.slug}", which is not a slug`));
    else if (!defs.has(c.slug)) out.push(fail(c.file, c.line, `cites rule "${c.slug}", which PROTOCOL.md does not define`));
  }
  return out;
}

module.exports = { id: 'rule-slugs', run };
