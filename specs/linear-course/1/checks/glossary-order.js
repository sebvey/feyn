'use strict';
// A term of the course glossary is used after its defining concept (SPEC.md section 6):
// every use in a concept.md, body and frontmatter, before the defining concept fails, unless its
// sentence carries a concept reference to that concept. Each comma variant of the term cell is
// matched, whole word, case ignored; a row whose term cell has a parenthesis (a sense
// qualifier) is skipped.
const mdlib = require('./lib/md');
const glossary = require('./lib/glossary');
const refs = require('./lib/refs');
const yaml = require('./lib/yaml');
const { fail } = require('./lib/course');

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// A sentence ends at « . », « ? », « ! » or « … » (optionally followed by closing quotes,
// brackets or emphasis marks) before a space or the end of its block; « : » and « ; » do not
// end it. A sentence never crosses a block: a paragraph, a blockquote, a list item, a heading,
// a table row (the last two are one line each).
const END = /[.?!…](?:\s*[»"”)\]*_]+)?(?=\s|$)/gu;
const STARTS_BLOCK = /^\s{0,3}(?:#|[-*+]\s|\d+[.)]\s|\|)/;
const ONE_LINE = /^\s{0,3}(?:#|\|)/;
const QUOTE = /^\s{0,3}>/;

// what the reader does not read as words: inline code, an image (its title is read in the
// frontmatter), a link target
const prep = (t) => mdlib.maskCode(t)
  .replace(/!\[[^\]]*\]\([^)]*\)/g, (m) => ' '.repeat(m.length))
  .replace(/\]\([^)]*\)/g, (m) => ']' + ' '.repeat(m.length - 1));

// -> [{ text, at(offset) -> line }]: the sentences of `pieces` ([{ n, t }], one block)
function sentences(pieces) {
  let text = '';
  const starts = [];
  for (const p of pieces) {
    if (text) text += ' ';
    starts.push({ off: text.length, n: p.n });
    text += p.t;
  }
  const lineAt = (off) => starts.filter((s) => s.off <= off).pop().n;
  const out = [];
  let from = 0;
  let m;
  END.lastIndex = 0;
  while ((m = END.exec(text))) {
    const to = m.index + m[0].length;
    out.push({ text: text.slice(from, to), base: from });
    from = to;
  }
  if (text.slice(from).trim()) out.push({ text: text.slice(from), base: from });
  return out.map((s) => ({ text: s.text, at: (off) => lineAt(s.base + off) }));
}

// the sentences of a concept.md body
function bodySentences(body) {
  const out = [];
  let block = [];
  let quote = false;
  const close = () => { if (block.length) out.push(...sentences(block)); block = []; };
  for (const l of body) {
    if (l.code || !l.t.trim()) { close(); quote = false; continue; }
    const q = QUOTE.test(l.t);
    if (STARTS_BLOCK.test(l.t) || q !== quote) close();
    quote = q;
    block.push({ n: l.n, t: prep(l.t) });
    if (ONE_LINE.test(l.t)) close();
  }
  close();
  return out;
}

// the sentences of the frontmatter strings the site shows: the stances' and neighbours' item
// texts, the diagrams' titles and captions
function frontSentences(data) {
  const out = [];
  if (!data || typeof data !== 'object') return out;
  const add = (item, key) => {
    if (item && typeof item === 'object' && typeof item[key] === 'string') {
      out.push(...sentences([{ n: yaml.lineOf(item, key), t: mdlib.maskCode(item[key].replace(/\s+/g, ' ')) }]));
    }
  };
  const items = (list) => (Array.isArray(list) ? list : []);
  const st = data.stances && typeof data.stances === 'object' ? data.stances : {};
  for (const k of ['consensus', 'school', 'course']) for (const it of items(st[k])) add(it, 'text');
  for (const it of items(data.neighbors)) add(it, 'text');
  for (const d of items(data.diagrams)) { add(d, 'title'); add(d, 'caption'); }
  return out;
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  const g = ctx.md('glossary.md');
  if (!g) return [fail('glossary.md', 1, 'glossary.md does not exist')];
  const tab = glossary.table(g);
  if (!tab) return [fail('glossary.md', 1, 'no glossary table found')];
  const refWord = ctx.word('concept_refs', 'concept') || 'concept';
  const annexWord = ctx.word('concept_refs', 'annex') || refWord;
  const terms = [];
  for (const r of tab.rows) {
    if (r.cells.length < 4) continue;
    const cell = glossary.termCell(r.cells[0]);
    if (cell.qualified) continue;
    const def = ctx.conceptByNumber(glossary.definingNumber(r.cells[3]));
    // the words matched: each variant without its qualifier (none here, since a qualified row
    // was skipped above; the skip is what keeps the homonym from being matched)
    const words = cell.variants.map((v) => v.replace(/\s*\([^)]*\)/g, '').trim()).filter(Boolean);
    if (!def || !words.length) continue;
    const re = new RegExp(`(?<![\\p{L}\\p{N}])(?:${words.map(esc).join('|')})(?![\\p{L}\\p{N}])`, 'giu');
    terms.push({ re, def, line: r.line, ref: `${def.annex ? annexWord : refWord} ${def.number}` });
  }
  const parse = refs.parser(ctx);
  const out = [];
  for (const c of ctx.selected()) {
    if (!c.dir) continue;
    const f = c.dir + '/concept.md';
    const m = ctx.md(f);
    if (!m) continue;
    const later = terms.filter((t) => t.def.index > c.index);
    if (!later.length) continue;
    const seen = new Set();
    for (const s of [...frontSentences(m.data), ...bodySentences(m.body)]) {
      const named = new Set(parse ? parse(s.text).flatMap((r) => r.ids.map((id) => refs.conceptOf(ctx, id, r.annex))).filter(Boolean) : []);
      for (const t of later) {
        if (named.has(t.def)) continue;
        t.re.lastIndex = 0;
        let u;
        while ((u = t.re.exec(s.text))) {
          const n = s.at(u.index);
          const key = `${n}|${t.line}`;
          if (seen.has(key)) continue;
          seen.add(key);
          out.push(fail(f, n, `uses the term "${u[0]}" before concept ${t.def.number}, which defines it (glossary.md:${t.line}): use it after, or name that concept in the sentence (« ${t.ref} »)`));
        }
      }
    }
  }
  return out;
}

module.exports = { id: 'glossary-order', run };
