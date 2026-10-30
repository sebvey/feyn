'use strict';
// Concept references of the reader text (SPEC.md section 4.5): the words of the pack group
// concept_refs, then concept numbers or sub-concept ids. One grammar, read by `conventions`
// (each id exists) and `glossary-order` (a concept reference silences a forward use).

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const ID = '(?:A\\d+|\\d+)(?:[a-z]\\d?)?';

// -> (text) => [{ index, word, list, ids, annex }], or null when the pack lacks the words.
// `annex` is true for a concept reference made with concept_refs.annex.
function parser(ctx) {
  const refWord = ctx.word('concept_refs', 'concept');
  const refWords = ctx.word('concept_refs', 'concepts');
  const andWord = ctx.word('concept_refs', 'and');
  const annexWord = ctx.word('concept_refs', 'annex');
  const res = [];
  if (refWord && refWords && andWord) {
    const sep = new RegExp(`\\s*,\\s*|\\s+${esc(andWord)}\\s+`, 'u');
    res.push({
      re: new RegExp(`(?<![\\p{L}\\p{N}])(${esc(refWords)}|${esc(refWord)})\\s+(${ID}(?:(?:\\s*,\\s*|\\s+${esc(andWord)}\\s+)${ID})*)(?![\\p{L}\\p{N}])`, 'giu'),
      ids: (list) => list.split(sep),
      annex: false,
    });
  }
  if (annexWord) {
    res.push({
      re: new RegExp(`(?<![\\p{L}\\p{N}])(${esc(annexWord)})\\s+(${ID})(?![\\p{L}\\p{N}])`, 'giu'),
      ids: (list) => [list],
      annex: true,
    });
  }
  if (!res.length) return null;
  return (text) => {
    const out = [];
    for (const r of res) {
      r.re.lastIndex = 0;
      let m;
      while ((m = r.re.exec(text))) out.push({ index: m.index, word: m[1], list: m[2], ids: r.ids(m[2]), annex: r.annex });
    }
    return out;
  };
}

// the concept an id of a concept reference names: a concept number (leading zeros dropped) or
// the id of one of its sub-concepts; null when it names none, or when `annex` (the annex word
// was used) and the concept is not an annex
function conceptOf(ctx, id, annex) {
  const c = /^(A?\d+)([a-z])(\d)?$/.test(id)
    ? ctx.concepts.find((x) => x.subs.some((s) => s.id === id))
    : ctx.conceptByNumber(/^\d/.test(id) ? id.replace(/^0+(?=\d)/, '') : id);
  return c && (!annex || c.annex) ? c : null;
}

module.exports = { parser, conceptOf, ID };
