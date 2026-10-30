'use strict';
// Every rule and every group of rules of PROTOCOL.md is named by a slug, defined once in one
// namespace, and every rule or group cited in PROTOCOL.md, SPEC.md and decisions/ is cited by a
// slug that is defined (decisions rules-named-by-slug, rule-groups-replace-ranges).
//
// Defined, in a rule family ("## <n>. ..."): a rule by a line that opens on `**<slug>** `, or by a
// table row whose first cell is `**<slug>**`; a group by a heading `### <title> (`<slug>`)`.
// Cited:
//   - in a rule family, every code span shaped like a rule slug;
//   - in a table of PROTOCOL.md, every code span of a "Used in" or "Rule" column;
//   - outside the rule families (PROTOCOL.md's other sections, SPEC.md, decisions/*.md), the code
//     spans that follow « rule », « rules », « règle » or « règles », joined by commas, « and »,
//     « to », « et », « à »: each must be a rule;
//   - everywhere, the code spans that follow « group », « groups », « groupe » or « groupes »: each
//     must be a group.
//   - in a rule family too, the code spans after « règle(s) » must be rules.
// A rule named or cited by its old number (`**1.2**`, « règle 1.2 », « rules 1.1, 1.5 ») fails too,
// and so does a range, « `a` à `b` » or « `a` to `b` », in PROTOCOL.md or SPEC.md (decision
// rule-groups-replace-ranges). decisions/ are not read for ranges: they record history and quote
// the ranges they replaced.
const mdlib = require('./lib/md');
const { fail } = require('./lib/course');

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+){1,4}$/;
const GROUP_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+){0,4}$/;
const NUMBER = /^\d+\.\d+[a-z]?$/;
const RULE_WORD = /\b(?:[Rr]ules?|[Rr]ègles?)/;
const GROUP_WORD = /\b(?:[Gg]roups?|[Gg]roupes?)/;
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

// citations led by a word: [{ items, line }]
function keywordCitations(lines, word) {
  const out = [];
  const lead = new RegExp(word.source + '(\\s+`[^`]+`(?:(?:\\s*,\\s*|\\s+(?:and|or|to|et|ou|à)\\s+)`[^`]+`)*)', 'g');
  for (const p of paragraphs(lines)) {
    for (const m of p.text.matchAll(lead)) out.push({ items: codeSpans(m[1]), line: p.lineAt(m.index) });
  }
  return out;
}

// « règle 1.2 », « rules 1.1, 1.5 »: a rule cited by number, code spans masked
function numberCitations(lines) {
  const out = [];
  for (const p of paragraphs(lines)) {
    for (const m of mdlib.maskCode(p.text).matchAll(new RegExp(RULE_WORD.source + '\\s+(\\d+\\.\\d+[a-z]?)', 'g'))) {
      out.push({ number: m[1], line: p.lineAt(m.index) });
    }
  }
  return out;
}

// « `a` à `b` », « `a` to `b` »: a set of rules cited by a range
function rangeCitations(lines) {
  const out = [];
  for (const p of paragraphs(lines)) {
    for (const m of p.text.matchAll(/`([^`]+)`\s+(?:à|to)\s+`([^`]+)`/g)) {
      if (GROUP_SLUG.test(m[1]) && GROUP_SLUG.test(m[2])) out.push({ text: m[0], line: p.lineAt(m.index) });
    }
  }
  return out;
}

function run(ctx) {
  const text = ctx.read(PROTOCOL);
  if (text === null) return [fail(PROTOCOL, 1, 'PROTOCOL.md is missing')];
  const out = [];
  const defs = new Map(); // slug -> { line, kind: 'rule' | 'group' }
  const cites = []; // { file, slug, line, kind: 'rule' | 'group' | 'any' }
  const body = mdlib.split(text).body;
  const { pre, sections } = mdlib.sections(body, 2);
  const family = (s) => /^\d+\.\s/.test(s.title);

  const define = (name, line, kind) => {
    if (NUMBER.test(name)) out.push(fail(PROTOCOL, line, `rule named by its number "${name}": a rule is named by a slug`));
    else if (kind === 'rule' && !SLUG.test(name)) out.push(fail(PROTOCOL, line, `"${name}" is not a slug (two to five lowercase words joined by hyphens)`));
    else if (kind === 'group' && !GROUP_SLUG.test(name)) out.push(fail(PROTOCOL, line, `group "${name}" is not a slug (one to five lowercase words joined by hyphens)`));
    else if (defs.has(name)) out.push(fail(PROTOCOL, line, `slug "${name}" is defined twice (first at line ${defs.get(name).line})`));
    else defs.set(name, { line, kind });
  };

  for (const s of sections.filter(family)) {
    for (const l of s.lines) {
      if (l.code) continue;
      if (/^###\s/.test(l.t)) {
        const g = /^###\s+.+?\s+\(`([^`]+)`\)\s*$/.exec(l.t);
        if (g) define(g[1], l.n, 'group');
        else out.push(fail(PROTOCOL, l.n, 'a group heading ends with its slug in code between parentheses: "### <title> (`<slug>`)"'));
        continue;
      }
      const head = /^\*\*([^*]+)\*\*(?:\s|$)/.exec(l.t);
      if (head) define(head[1], l.n, 'rule');
      for (const c of codeSpans(l.t)) if (SLUG.test(c)) cites.push({ file: PROTOCOL, slug: c, line: l.n, kind: 'any' });
    }
    for (const tb of mdlib.tables(s.lines)) {
      for (const r of tb.rows) {
        const cell = /^\*\*([^*]+)\*\*$/.exec(r.cells[0] || '');
        if (cell) define(cell[1], r.line, 'rule');
      }
    }
    for (const k of keywordCitations(s.lines, RULE_WORD)) for (const c of k.items) cites.push({ file: PROTOCOL, slug: c, line: k.line, kind: 'rule' });
    for (const k of keywordCitations(s.lines, GROUP_WORD)) for (const c of k.items) cites.push({ file: PROTOCOL, slug: c, line: k.line, kind: 'group' });
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
          for (const c of spans) cites.push({ file: PROTOCOL, slug: c, line: r.line, kind: 'any' });
        }
      }
    }
  }

  // prose outside the rule families, SPEC.md, decisions/*.md: citations led by a word
  const prose = [{ file: PROTOCOL, lines: [...pre, ...others.flatMap((s) => s.lines)] }];
  const spec = ctx.read('SPEC.md');
  if (spec === null) out.push(fail('SPEC.md', 1, 'SPEC.md is missing'));
  else prose.push({ file: 'SPEC.md', lines: mdlib.split(spec).body });
  for (const name of ctx.list('decisions').filter((n) => n.endsWith('.md')).sort()) {
    prose.push({ file: 'decisions/' + name, lines: mdlib.split(ctx.read('decisions/' + name) || '').body });
  }
  for (const p of prose) {
    for (const k of keywordCitations(p.lines, RULE_WORD)) for (const c of k.items) cites.push({ file: p.file, slug: c, line: k.line, kind: 'rule' });
    for (const k of keywordCitations(p.lines, GROUP_WORD)) for (const c of k.items) cites.push({ file: p.file, slug: c, line: k.line, kind: 'group' });
    for (const n of numberCitations(p.lines)) out.push(fail(p.file, n.line, `rule cited by its number "${n.number}": cite its slug`));
  }

  // one verdict per citation: a group or rule citation wins over a bare code span on the same line
  const seen = new Map();
  for (const c of cites) {
    const k = `${c.file}:${c.line}:${c.slug}`;
    if (!seen.has(k) || seen.get(k).kind === 'any') seen.set(k, c);
  }
  for (const c of seen.values()) {
    const d = defs.get(c.slug);
    if (c.kind === 'group') {
      if (!d) out.push(fail(c.file, c.line, `cites group "${c.slug}", which PROTOCOL.md does not define`));
      else if (d.kind !== 'group') out.push(fail(c.file, c.line, `cites group "${c.slug}", which is a rule`));
    } else if (d && d.kind === 'group' && c.kind === 'rule') out.push(fail(c.file, c.line, `cites rule "${c.slug}", which is a group: cite it after « groupe » or « group »`));
    else if (NUMBER.test(c.slug)) out.push(fail(c.file, c.line, `rule cited by its number "${c.slug}": cite its slug`));
    else if (!SLUG.test(c.slug)) out.push(fail(c.file, c.line, `rule cited as "${c.slug}", which is not a slug`));
    else if (!d) out.push(fail(c.file, c.line, `cites rule "${c.slug}", which PROTOCOL.md does not define`));
  }

  // ranges, in PROTOCOL.md and SPEC.md
  const ranged = [{ file: PROTOCOL, lines: body }];
  if (spec !== null) ranged.push({ file: 'SPEC.md', lines: mdlib.split(spec).body });
  for (const r of ranged) {
    for (const g of rangeCitations(r.lines)) out.push(fail(r.file, g.line, `cites a range "${g.text}": cite the rules one by one, or the group that holds them`));
  }
  return out;
}

module.exports = { id: 'rule-slugs', run };
