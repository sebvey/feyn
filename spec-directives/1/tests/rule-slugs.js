'use strict';
// Every rule and every group of rules of the protocol is named by a slug, defined once in one
// namespace, and every rule or group cited in the rules of the protocol, the description of the
// protocol, README.md, the description of the course and decisions/ (where a decision cites none:
// decision decision-format) is cited by a slug that is defined (decisions rules-named-by-slug,
// rule-groups-replace-ranges). The files are those the manifest, spec.yaml, declares:
// `products.teacher.rules` (below, teacher/rules.yaml), `products.teacher.readme`
// (teacher/README.md) and `course.readme` (course/README.md), beside the spec MAJOR's README.md and
// decisions/. The slugs are defined by the rules of the protocol only: a manifest that does not
// declare them checks nothing.
//
// Defined, in teacher/rules.yaml: a rule by its `id`, a group by its `id` (a family is a group whose
// id is its category); each id once, across rules and groups.
// Cited:
//   - in the `text` and `why` of a rule of teacher/rules.yaml, every code span shaped like a rule
//     slug, and those that follow « règle(s) » must be rules;
//   - in a table of teacher/README.md, every code span of a "Used in" or "Rule" column;
//   - in teacher/README.md, README.md, course/README.md and decisions/*.md, the code spans that
//     follow « rule », « rules », « règle » or « règles », joined by commas, « and », « to », « et »,
//     « à »: each must be a rule;
//   - everywhere, the code spans that follow « group », « groups », « groupe » or « groupes »: each
//     must be a group.
// A rule named or cited by its old number (« règle 1.2 », « rules 1.1, 1.5 ») fails too, and so does
// a range, « `a` à `b` » or « `a` to `b` », in teacher/rules.yaml, teacher/README.md, README.md or
// course/README.md (decision rule-groups-replace-ranges). decisions/ are not read for ranges: a
// decision cites no rule id (decision decision-format), so a citation there is a slip to catch.
const yaml = require('../lib/yaml-lines');
const mdlib = require('../lib/md');
const { fail } = require('../lib/course');

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+){1,4}$/;
const GROUP_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+){0,4}$/;
const NUMBER = /^\d+\.\d+[a-z]?$/;
const RULE_WORD = /\b(?:[Rr]ules?|[Rr]ègles?)/;
const GROUP_WORD = /\b(?:[Gg]roups?|[Gg]roupes?)/;
// the spec MAJOR's README, read beside the description of the course (course.readme)
const README = 'README.md';

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
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
// a text of teacher/rules.yaml as one paragraph, all at the line of its key
const yamlParagraph = (text, line) => [{ text: text.replace(/\s+/g, ' ').trim(), lineAt: () => line }];

// citations led by a word: [{ items, line }]
function keywordCitations(paras, word) {
  const out = [];
  const lead = new RegExp(word.source + '(\\s+`[^`]+`(?:(?:\\s*,\\s*|\\s+(?:and|or|to|et|ou|à)\\s+)`[^`]+`)*)', 'g');
  for (const p of paras) {
    for (const m of p.text.matchAll(lead)) out.push({ items: codeSpans(m[1]), line: p.lineAt(m.index) });
  }
  return out;
}

// « règle 1.2 », « rules 1.1, 1.5 »: a rule cited by number, code spans masked
function numberCitations(paras) {
  const out = [];
  for (const p of paras) {
    for (const m of mdlib.maskCode(p.text).matchAll(new RegExp(RULE_WORD.source + '\\s+(\\d+\\.\\d+[a-z]?)', 'g'))) {
      out.push({ number: m[1], line: p.lineAt(m.index) });
    }
  }
  return out;
}

// « `a` à `b` », « `a` to `b` »: a set of rules cited by a range
function rangeCitations(paras) {
  const out = [];
  for (const p of paras) {
    for (const m of p.text.matchAll(/`([^`]+)`\s+(?:à|to)\s+`([^`]+)`/g)) {
      if (GROUP_SLUG.test(m[1]) && GROUP_SLUG.test(m[2])) out.push({ text: m[0], line: p.lineAt(m.index) });
    }
  }
  return out;
}

function run(ctx) {
  const m = ctx.manifest;
  const RULES = m.path('teacher', 'rules');
  if (RULES === null) return m.nothing(m.ref('teacher', 'rules'));
  // read for the citations it makes only, as the descriptions are: no slug is defined there
  const PROTOCOL = m.path('teacher', 'readme');
  // the descriptions read beside the protocol: the spec MAJOR's README, and what a course is
  const DESCRIPTIONS = [README, m.path('course', 'readme')].filter((f) => f !== null);
  const raw = ctx.read(RULES);
  if (raw === null) return [fail(RULES, 1, `${RULES} is missing`)];
  let doc;
  try { doc = yaml.parse(raw); } catch (e) { return [fail(RULES, e.line || 1, e.message)]; }
  const out = [];
  const defs = new Map(); // slug -> { line, kind: 'rule' | 'group' }
  const cites = []; // { file, slug, line, kind: 'rule' | 'group' | 'any' }
  // the paragraphs read for citations led by a word, numbers and ranges: { file, paras, ranges }
  const prose = [];

  const define = (name, line, kind) => {
    if (typeof name !== 'string') return; // rule-files' failure
    if (NUMBER.test(name)) out.push(fail(RULES, line, `rule named by its number "${name}": a rule is named by a slug`));
    else if (kind === 'rule' && !SLUG.test(name)) out.push(fail(RULES, line, `"${name}" is not a slug (two to five lowercase words joined by hyphens)`));
    else if (kind === 'group' && !GROUP_SLUG.test(name)) out.push(fail(RULES, line, `group "${name}" is not a slug (one to five lowercase words joined by hyphens)`));
    else if (defs.has(name)) out.push(fail(RULES, line, `slug "${name}" is defined twice (first at line ${defs.get(name).line})`));
    else defs.set(name, { line, kind });
  };

  // the definitions, and the texts and whys of the rules
  const groups = isObj(doc) && Array.isArray(doc.groups) ? doc.groups : [];
  const texts = [];
  groups.forEach((g, gi) => {
    if (!isObj(g)) return;
    const gl = yaml.lineOf(groups, gi, 1);
    define(g.id, yaml.lineOf(g, 'id', gl), 'group');
    (Array.isArray(g.rules) ? g.rules : []).forEach((r, ri) => {
      if (!isObj(r)) return;
      const rl = yaml.lineOf(g.rules, ri, gl);
      define(r.id, yaml.lineOf(r, 'id', rl), 'rule');
      for (const k of ['text', 'why']) {
        if (typeof r[k] !== 'string') continue;
        const line = yaml.lineOf(r, k, rl);
        texts.push(...yamlParagraph(r[k], line));
        for (const c of codeSpans(r[k])) if (SLUG.test(c)) cites.push({ file: RULES, slug: c, line, kind: 'any' });
      }
    });
  });
  prose.push({ file: RULES, paras: texts, ranges: true });

  // teacher/README.md: its tables' "Used in" and "Rule" columns, and its prose
  const readme = PROTOCOL === null ? '' : ctx.read(PROTOCOL);
  if (PROTOCOL === null) { /* not declared: nothing to read */ } else if (readme === null) out.push(fail(PROTOCOL, 1, `${PROTOCOL} is missing`));
  else {
    const body = mdlib.split(readme).body;
    for (const tb of mdlib.tables(body)) {
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
    prose.push({ file: PROTOCOL, paras: paragraphs(body), ranges: true });
  }

  // README.md, course/README.md, decisions/*.md
  for (const name of DESCRIPTIONS) {
    const t = ctx.read(name);
    if (t === null) out.push(fail(name, 1, `${name} is missing`));
    else prose.push({ file: name, paras: paragraphs(mdlib.split(t).body), ranges: true });
  }
  for (const name of ctx.list('decisions').filter((n) => n.endsWith('.md')).sort()) {
    prose.push({ file: 'decisions/' + name, paras: paragraphs(mdlib.split(ctx.read('decisions/' + name) || '').body), ranges: false });
  }
  for (const p of prose) {
    for (const k of keywordCitations(p.paras, RULE_WORD)) for (const c of k.items) cites.push({ file: p.file, slug: c, line: k.line, kind: 'rule' });
    for (const k of keywordCitations(p.paras, GROUP_WORD)) for (const c of k.items) cites.push({ file: p.file, slug: c, line: k.line, kind: 'group' });
    for (const n of numberCitations(p.paras)) out.push(fail(p.file, n.line, `rule cited by its number "${n.number}": cite its slug`));
    if (p.ranges) {
      for (const g of rangeCitations(p.paras)) out.push(fail(p.file, g.line, `cites a range "${g.text}": cite the rules one by one, or the group that holds them`));
    }
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
      if (!d) out.push(fail(c.file, c.line, `cites group "${c.slug}", which ${RULES} does not define`));
      else if (d.kind !== 'group') out.push(fail(c.file, c.line, `cites group "${c.slug}", which is a rule`));
    } else if (d && d.kind === 'group' && c.kind === 'rule') out.push(fail(c.file, c.line, `cites rule "${c.slug}", which is a group: cite it after « groupe » or « group »`));
    else if (NUMBER.test(c.slug)) out.push(fail(c.file, c.line, `rule cited by its number "${c.slug}": cite its slug`));
    else if (!SLUG.test(c.slug)) out.push(fail(c.file, c.line, `rule cited as "${c.slug}", which is not a slug`));
    else if (!d) out.push(fail(c.file, c.line, `cites rule "${c.slug}", which ${RULES} does not define`));
  }
  return out;
}

module.exports = { id: 'rule-slugs', run };
