'use strict';
// The claim marks of the text of a course of this spec MAJOR (course/README.md section 3.4): a claim
// is a CommonMark inline link, `[the text claimed](nature:S2,S3 "name")`, its destination a nature
// word of the lexicon group `natures` alone or followed by `:` and source ids `S<n>` joined by `,`,
// its title the claim's name. The mark is defined here once, read through the CommonMark reader of
// the spec directives (lib/mdast.js; decision `marks-read-by-one-reader`), by the course checks
// (`sources`, `sources-coverage`) and by the site build (products/site/build/render-site), so that a
// check and the site never read a mark two ways. It holds a form of this spec, so it lives in the
// spec, beside course/refs.js; its callers give it the lib of the spec directives this MAJOR
// follows, as they give the parser.
//   const claims = require('<MAJOR>/course/claims')(lib);
//   const read = claims.reader(ctx);            // null when the lexicon lacks the nature words
//   const { marks, problems } = read(text, { line });
// A link whose destination is a nature word alone, or a nature word, `:` and a list of source ids,
// is a mark: { nature, word, sources, name, text, line, column, start, end, node }, `nature` the key
// of the group `natures` (consensus, school, fact, course), `word` its value, `sources` the ids in
// order, `name` the link title or null, `text` the plain text claimed, `line` and `column` where its
// `[` stands, `start` and `end` the offsets of the link in `text`. A destination that starts with a
// nature word followed by `:` but is no list of source ids (`consensus:X1`), and a nature word's
// destination the reader did not take as a link (a space in it, `(consensus: S1)`), are problems:
// { line, column, message }, the message in French. Any other link is no mark. A reference link
// (`[text][label]`) is no mark: lib/mdast.js returns inline links only, and a mark is always inline;
// a link reference definition whose destination is a mark's is a problem.
//   claims.ofConcept(ctx, c, read)   the marks of a concept, each in the part it stands in
//   claims.ofCourse(ctx, read)       the marks of every concept and the course's sources.yaml, once

// the keys of the group `natures`, in the order the spec names them
const NATURES = ['consensus', 'school', 'fact', 'course'];
// a source id, and a claim's name (lowercase letters, digits, hyphens)
const SOURCE_ID = /^S[1-9]\d*$/;
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// the line and column of an offset of `text`, its first line being `line`
function where(text, offset, line) {
  const before = text.slice(0, offset);
  const nl = before.lastIndexOf('\n');
  return { line: line + (before.match(/\n/g) || []).length, column: offset - nl };
}

// -> (text, { line }) => { marks, problems }, or null when the lexicon lacks the nature words
function reader(ctx, mdast) {
  const words = {};
  for (const k of NATURES) {
    const w = ctx.word('natures', k);
    if (!w) return null;
    words[w] = k;
  }
  const alt = Object.keys(words).map(esc).join('|');
  const DEST = new RegExp(`^(${alt})(?::(.*))?$`, 'u');
  // a nature word right after `](`, which a link the reader took holds in its span
  const RAW = new RegExp(`\\]\\(\\s*(?:${alt})(?=[\\s:)])`, 'gu');
  return (text, { line = 1 } = {}) => {
    const tree = mdast.parse(text, { line });
    const marks = [];
    const problems = [];
    const spans = [];
    // the spans of the links and of the code the reader found: a raw `](nature` outside them is a
    // mark the reader did not take
    const walk = (node) => {
      if (node.position && ['link', 'inlineCode', 'code', 'html'].includes(node.type)) spans.push([node.position.start.offset, node.position.end.offset]);
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
    // a link reference definition whose destination is a mark's: a mark is always an inline link
    const defs = (node) => {
      if (node.type === 'definition' && DEST.test(node.url || '') && node.position) {
        problems.push({ line: node.position.start.line, column: node.position.start.column, message: `la définition « [${node.label}]: ${node.url} » donne à un lien de référence la destination d'une marque : une marque est un lien en ligne, « [le texte affirmé](${node.url}) »` });
      }
      if (node.children) node.children.forEach(defs);
    };
    defs(tree);
    for (const l of mdast.links(tree)) {
      const m = DEST.exec(l.url);
      if (!m) continue;
      const word = m[1];
      const list = m[2];
      const start = l.node.position.start.offset;
      const end = l.node.position.end.offset;
      if (list !== undefined && (list === '' || !list.split(',').every((id) => SOURCE_ID.test(id)))) {
        problems.push({ line: l.line, column: l.column, message: `la marque « ${l.text} » a pour destination « ${l.url} » : un mot de nature seul, ou suivi de « : » et d'ids de source S<n> séparés par des virgules, sans espace (« ${word}:S1,S2 »)` });
        continue;
      }
      marks.push({ nature: words[word], word, sources: list === undefined ? [] : list.split(','), name: l.title, text: l.text, line: l.line, column: l.column, start, end, node: l.node });
    }
    RAW.lastIndex = 0;
    let r;
    while ((r = RAW.exec(text))) {
      const at = r.index;
      if (spans.some(([s, e]) => at >= s && at < e)) continue;
      const w = where(text, at, line);
      problems.push({ line: w.line, column: w.column, message: `« ${text.slice(at, at + 40).split('\n')[0]} » n'est pas lu comme une marque : la destination d'une marque n'a pas d'espace (« [le texte affirmé](consensus:S1,S2 "nom") »)` });
    }
    return { marks, problems };
  };
}

// -> the marks of a concept's concept.md, read from its body in one text so a mark keeps the line of
// the file, each placed in the part of the concept file it stands in (course/parser.js), against
// `claims` of course/form.yaml, the published fields that state claims:
// { marks: [{ ...mark, key, part }], outside: [mark], problems }, `key` `<concept number>/<name>`
// when the mark has a name, `part` the lexicon key of its heading, field or misconception part
// (`essentials`, `landmarks`, `deepening`, `matter`, `root`, `correction`); `outside` the marks that
// stand anywhere else (a case, a misconception's belief, a teacher note, a heading). Null when the
// concept has no concept.md.
function ofConcept(ctx, c, read) {
  const m = c.dir ? ctx.md(c.dir + '/concept.md') : null;
  if (!m || !m.body || !m.body.length) return null;
  const where = (ctx.form && ctx.form.claims) || {};
  const parts = ctx.parts(c);
  const place = new Map(); // line -> part key
  const put = (lines, key) => { for (const l of lines || []) place.set(l.n, key); };
  if (where.head && parts.head) put(parts.head.lines, parts.head.key);
  for (const b of (parts.foot ? parts.foot.blocks : [])) if ((where.foot_blocks || []).includes(b.key)) put(b.lines, b.key);
  for (const u of parts.units) {
    for (const f of u.fields) {
      if (f.case) continue;
      if ((where.unit_fields || []).includes(f.key)) put(f.lines, f.key);
      for (const item of f.items || []) for (const p of item.parts || []) if ((where.misconception_parts || []).includes(p.key)) put(p.lines, p.key);
    }
  }
  const { marks, problems } = read(m.body.map((l) => l.t).join('\n'), { line: m.body[0].n });
  const out = { marks: [], outside: [], problems };
  for (const k of marks) {
    const part = place.get(k.line);
    if (!part) { out.outside.push(k); continue; }
    out.marks.push({ ...k, key: k.name ? `${c.number}/${k.name}` : null, part });
  }
  return out;
}

// -> the claims of a course and its sources, once per run: { concepts: [{ c, marks, outside,
// problems }], file, text, data, error }, `data` the parsed `sources.yaml` (null when absent or
// unreadable, `error` then a { line, message } when it is unreadable), `concepts` in course order,
// those with a concept.md. `read` is reader(ctx).
function ofCourse(ctx, read) {
  if (ctx.cache.has('claims:course')) return ctx.cache.get('claims:course');
  const file = (ctx.form && ctx.form.sources_file && ctx.form.sources_file.file) || 'sources.yaml';
  const out = { concepts: [], file, text: ctx.read(file), data: null, error: null };
  if (out.text !== null) {
    try { out.data = yaml.parse(out.text); } catch (e) { out.error = { line: e.line || 1, message: e.message }; }
  }
  for (const c of ctx.concepts) {
    const r = ofConcept(ctx, c, read);
    if (r) out.concepts.push({ c, ...r });
  }
  ctx.cache.set('claims:course', out);
  return out;
}

let yaml = null;

// lib(name): the module spec-directives/<MAJOR>/lib/<name>.js of the directives this MAJOR follows
module.exports = function claims(lib) {
  const mdast = lib('mdast');
  yaml = lib('yaml-lines');
  return { reader: (ctx) => reader(ctx, mdast), ofConcept, ofCourse, NATURES, SOURCE_ID, NAME };
};
