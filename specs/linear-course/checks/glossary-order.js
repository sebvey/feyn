'use strict';
// No concept.md uses a term of the glossary before the concept that introduces it, unless the
// sentence of that use names the introducing concept (a forward mention, SPEC.md section 6).
const mdlib = require('./lib/md');
const { fail } = require('./lib/course');

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const ID = '(?:A\\d+|\\d+)(?:[a-z]\\d?)?';
const normId = (s) => s.replace(/^0+(?=\d)/, '');
// the concept an id names: itself, or the concept of a sub-concept id (`14b`, `A2d`, `8a2`)
const conceptOf = (id) => normId((/^(A?\d+)[a-z]\d?$/.exec(id) || [null, id])[1]);

// The units a sentence cannot cross, as runs of body lines joined by "\n": a paragraph, one
// list item with its continuation lines, a heading, a table row. Fenced code is skipped.
function units(body) {
  const out = [];
  let cur = null;
  const close = () => { if (cur) out.push(cur); cur = null; };
  for (const l of body) {
    if (l.code || /^\s*(>\s*)*$/.test(l.t)) { close(); continue; }
    const heading = /^\s{0,3}#{1,6}\s/.test(l.t);
    const row = l.t.trim().startsWith('|');
    const item = /^\s*(>\s*)*([-*+]|\d+[.)])\s/.test(l.t);
    if (heading || row || item || (cur && cur.row)) close();
    if (!cur) cur = { text: '', starts: [], row };
    if (cur.text) cur.text += '\n';
    cur.starts.push({ n: l.n, at: cur.text.length });
    cur.text += l.t;
    if (heading || row) close();
  }
  close();
  return out;
}

// [start, end) of the sentence of `unit` around offset `at`: a sentence ends at ".", "!" or "?"
// followed by a blank or the end of the unit; in a table row, a cell boundary ends it too.
function sentenceAt(unit, at) {
  const re = unit.row ? /[.!?](?=\s|$)|(?<!\\)\|/g : /[.!?](?=\s|$)/g;
  let start = 0;
  let m;
  while ((m = re.exec(unit.text))) {
    const end = m.index + 1;
    if (end > at) return [start, end];
    start = end;
  }
  return [start, unit.text.length];
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  const g = ctx.md('glossary.md');
  if (!g) return [fail('glossary.md', 1, 'glossary.md does not exist')];
  const tab = mdlib.tables(g.body)[0];
  if (!tab) return [fail('glossary.md', 1, 'no glossary table found')];
  const terms = [];
  for (const r of tab.rows) {
    if (r.cells.length < 4) continue;
    const term = mdlib.plain(r.cells[0].replace(/\s*\([^)]*\)/g, ''));
    const first = normId(r.cells[3].split(',')[0].trim());
    const intro = ctx.conceptByNumber(first);
    if (term && intro) terms.push({ term, intro, line: r.line });
  }
  // a concept reference (SPEC.md section 4.5): the word, then one id or a list of ids
  const refWord = ctx.word('references', 'concept');
  const refWords = ctx.word('references', 'concepts');
  const andWord = ctx.word('references', 'and');
  const refRe = refWord && refWords && andWord
    ? new RegExp(`(?<![\\p{L}\\p{N}])(?:${esc(refWords)}|${esc(refWord)})\\s+(${ID}(?:(?:\\s*,\\s*|\\s+${esc(andWord)}\\s+)${ID})*)(?![\\p{L}\\p{N}])`, 'giu')
    : null;
  const named = (text) => {
    const set = new Set();
    if (!refRe) return set;
    refRe.lastIndex = 0;
    let m;
    while ((m = refRe.exec(text))) {
      for (const id of m[1].split(new RegExp(`\\s*,\\s*|\\s+${esc(andWord)}\\s+`, 'u'))) set.add(conceptOf(id));
    }
    return set;
  };

  const out = [];
  for (const c of ctx.selected()) {
    if (!c.dir) continue;
    const f = c.dir + '/concept.md';
    const m = ctx.md(f);
    if (!m) continue;
    const us = units(m.body);
    const unitOf = new Map();
    for (const u of us) for (const s of u.starts) unitOf.set(s.n, { u, at: s.at });
    for (const t of terms) {
      if (t.intro.index <= c.index) continue;
      const re = new RegExp(`(?<![\\p{L}\\p{N}])${esc(t.term)}(?![\\p{L}\\p{N}])`, 'giu');
      let bad = null;
      for (const l of m.body) {
        if (l.code) continue;
        re.lastIndex = 0;
        let hit;
        while (!bad && (hit = re.exec(l.t))) {
          const where = unitOf.get(l.n);
          if (where) {
            const [s, e] = sentenceAt(where.u, where.at + hit.index);
            if (named(where.u.text.slice(s, e)).has(t.intro.number)) continue;
          }
          bad = l;
        }
        if (bad) break;
      }
      if (bad) out.push(fail(f, bad.n, `uses the term "${t.term}", introduced by concept ${t.intro.number} (glossary.md:${t.line}), which comes later, and its sentence does not name concept ${t.intro.number}`));
    }
  }
  return out;
}

module.exports = { id: 'glossary-order', run };
