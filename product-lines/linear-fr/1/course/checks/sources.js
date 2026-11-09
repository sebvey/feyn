'use strict';
// sources.md (course/README.md section 3.4) and the frontmatter refs (3.1): its form (no
// frontmatter, no H1, its three sections in order, a table of five columns in « Affirmations » and
// « Références »); no introduction; the five columns of « Affirmations » (section anchors that exist in concept.md among its published
// parts, a source cell of reference ids or the markers.course word, a verification, a nature);
// « Références » (ids, one URL or no link, types, dates); « Non vérifié » entries anchored; every id
// cited exists, every reference is cited; concept.md cites no reference.
const directives = require('./directives');
const yaml = directives.lib('yaml-lines');
const mdlib = directives.lib('md');
const { fail } = directives.lib('common');

const REF = /^S\d+[a-z]?$/;
const CITED = /\bS\d+[a-z]?\b/g;
const IDS = /^\[S\d+[a-z]?\](\s*,\s*\[S\d+[a-z]?\])*$/;
const PATH = /(^|[\s`(])[^\s`(]*\/?sources\.md\b|concepts\/[^\s`;,\])]+/;
const URL = /^https?:\/\/\S+$/;

const short = (s) => (s.length > 50 ? s.slice(0, 50) + '…' : s);

// the published parts of the head and the foot of the form (course/form.yaml), by their key: the
// head itself, the foot's blocks
const fixedKeys = (form) => (form ? [form.concept_file.head, ...form.concept_file.foot.blocks].filter((p) => p.published).map((p) => p.heading) : []);

// the anchors of concept.md: the ids of its section and unit headings (its tree, course/parser.js),
// and its published head and blocks of the foot by their lexicon value (the instruction is not
// one: it is not published)
function anchorsOf(ctx, c, H) {
  const cm = ctx.md(c.dir + '/concept.md');
  if (!cm) return null;
  const set = new Set(c.subs.map((s) => s.id));
  const parts = ctx.parts(c);
  const fixed = new Set(fixedKeys(ctx.form));
  if (parts.head && fixed.has(parts.head.key)) set.add(H(parts.head.key));
  for (const b of (parts.foot ? parts.foot.blocks : [])) if (fixed.has(b.key)) set.add(H(b.key));
  return set;
}

function checkConcept(ctx, c, out) {
  const dir = c.dir;
  if (!dir || !ctx.isDir(dir)) return;
  const H = (k) => ctx.word('headings', k) || k;
  const sf = dir + '/sources.md';
  const sm = ctx.md(sf);
  if (!sm) return;
  const top = mdlib.sections(sm.body, 2);

  // the form of the file: no frontmatter, no H1, « Affirmations », « Références », « Non vérifié »,
  // in this order, all present and no other ## section; one table of five columns in each of the
  // first two
  if (sm.hasFront) out.push(fail(sf, 1, 'sources.md has no frontmatter'));
  for (const h of mdlib.headings(sm.body)) if (h.level === 1) out.push(fail(sf, h.line, 'no H1: the title is in course.yaml'));
  const order = ['claims', 'references', 'unverified'].map(H);
  let k = 0;
  for (const s of top.sections) {
    if (k < order.length && s.title === order[k]) { k++; continue; }
    out.push(fail(sf, s.line, k < order.length
      ? `section "${s.title}" found where « ${order[k]} » is expected (« ${order.join(' », « ')} », in this order, and no other ## section)`
      : `section "${s.title}" is no section of sources.md: « ${order.join(' », « ')} » only`));
    k = -1;
    break;
  }
  if (k >= 0 && k < order.length) out.push(fail(sf, 1, `missing section « ${order[k]} »`));
  for (const [key, cols] of [['claims', 5], ['references', 5]]) {
    const s = top.sections.find((x) => x.title === H(key));
    if (!s) continue;
    const tabs = mdlib.tables(s.lines);
    if (tabs.length !== 1) out.push(fail(sf, s.line, `« ${H(key)} » holds one table, found ${tabs.length}`));
    else if (tabs[0].header.length !== cols) out.push(fail(sf, tabs[0].line, `« ${H(key)} » table has ${tabs[0].header.length} columns, expected ${cols}`));
    else for (const r of tabs[0].rows) if (r.cells.length !== cols) out.push(fail(sf, r.line, `« ${H(key)} » row has ${r.cells.length} cells, expected ${cols}`));
  }

  const secRefs = top.sections.find((s) => s.title === H('references'));
  const secClaims = top.sections.find((s) => s.title === H('claims'));
  const secUnv = top.sections.find((s) => s.title === H('unverified'));
  const anchors = anchorsOf(ctx, c, H);
  const fixedList = fixedKeys(ctx.form).map((k) => `« ${H(k)} »`).join(', ');
  const courseWord = ctx.word('markers', 'course');
  const natureWords = [...['consensus', 'school', 'course'].map((k) => ctx.word('markers', k)), ctx.word('natures', 'fact')].filter(Boolean);
  const refs = new Map(); // id -> line
  const cited = new Set();

  // no introduction: the file opens on « Affirmations »
  const intro = top.pre.find((l) => !l.code && l.t.trim() !== '');
  if (intro) out.push(fail(sf, intro.n, `sources.md has no introduction: it opens on « ${H('claims')} »`));

  if (secRefs) {
    const t = mdlib.tables(secRefs.lines)[0];
    if (t) for (const r of t.rows) {
      if (r.cells.length !== 5) continue;
      const [id, source, link, type, on] = r.cells;
      if (!REF.test(id)) out.push(fail(sf, r.line, `reference id "${id}" must be S<n>, optionally followed by a lowercase letter`));
      else if (refs.has(id)) out.push(fail(sf, r.line, `reference id ${id} is used twice (line ${refs.get(id)})`));
      else refs.set(id, r.line);
      if (source === '') out.push(fail(sf, r.line, `reference ${id}: the source column is empty`));
      if (link !== '' && !URL.test(link)) out.push(fail(sf, r.line, `reference ${id}: the link "${short(link)}" must be one URL (http or https) or empty; a second place is a second reference`));
      const words = type.replace(/\(.*$/, '').split(',').map((w) => w.trim()).filter(Boolean);
      const allowed = Object.values((ctx.lexicon && ctx.lexicon.source_types) || {});
      if (!words.length || words.some((w) => !allowed.includes(w))) out.push(fail(sf, r.line, `reference ${id}: type "${type}" must be one or more of ${allowed.join(', ')}, separated by commas`));
      if (!/^\d{4}-\d{2}-\d{2}/.test(on)) out.push(fail(sf, r.line, `reference ${id}: "consulted on" must start with YYYY-MM-DD, found "${on}"`));
    }
  }

  // one anchor list: a section cell, or the head of a « Non vérifié » entry
  const checkAnchors = (cell, line, what, extra) => {
    const list = cell.split(',').map((a) => a.trim());
    if (cell.trim() === '' || list.some((a) => a === '')) {
      out.push(fail(sf, line, `${what}: the section is empty (section or unit ids or published parts of concept.md, separated by commas)`));
      return;
    }
    if (!anchors) return;
    // one failure per cell or entry, naming its unknown pieces
    const bad = list.filter((a) => !anchors.has(a) && !(extra && a === extra));
    if (!bad.length) return;
    if (!extra && bad.includes(H('stances'))) out.push(fail(sf, line, `${what}: section « ${H('stances')} »: a stance or neighbour is sourced in its frontmatter item (refs, verified), not in « ${H('claims')} »`));
    const unknown = bad.filter((a) => extra || a !== H('stances'));
    if (unknown.length) out.push(fail(sf, line, `${what}: unknown section ${unknown.map((a) => `"${a}"`).join(', ')}: a section or unit id or a published part (${fixedList}) that exists in concept.md${extra ? `, or « ${extra} » for a stance or neighbour` : ''}`));
  };

  if (secClaims) {
    const t = mdlib.tables(secClaims.lines)[0];
    if (t) for (const r of t.rows) {
      // a row not in five cells (concept-file fails it) still cites its ids
      if (r.cells.length !== 5) {
        for (const id of r.cells.join(' ').match(CITED) || []) cited.add(id);
        continue;
      }
      const [claim, section, source, verified, nature] = r.cells;
      const what = `claim "${short(claim)}"`;
      if (claim === '') out.push(fail(sf, r.line, 'a claim row has no claim'));
      checkAnchors(section, r.line, what, null);
      const isCourse = courseWord && source === courseWord;
      if (source === '') out.push(fail(sf, r.line, `${what}: the source cell is empty (reference ids [S1], or « ${courseWord} »)`));
      else if (PATH.test(source)) out.push(fail(sf, r.line, `${what}: the source cell names a path to another concept ("${short(source)}"): a concept cites its own references`));
      else if (!isCourse && !IDS.test(source)) out.push(fail(sf, r.line, `${what}: free-text source cell "${short(source)}": reference ids [S1] separated by commas, or « ${courseWord} », nothing else`));
      if (!isCourse) for (const id of source.match(CITED) || []) {
        cited.add(id);
        if (!refs.has(id)) out.push(fail(sf, r.line, `claim cites ${id}, which is not in « ${H('references')} »`));
      }
      if (verified === '' && !isCourse) out.push(fail(sf, r.line, `${what}: nothing says what was verified`));
      if (nature === '') out.push(fail(sf, r.line, `${what}: the nature is empty: one of ${natureWords.join(', ')}`));
      else if (!natureWords.includes(nature)) out.push(fail(sf, r.line, `${what}: unknown nature "${nature}": one of ${natureWords.join(', ')}`));
    }
  }

  // « Non vérifié »: a list, possibly empty; each entry opens with its section, then « : »
  if (secUnv) {
    for (const l of secUnv.lines) {
      if (l.code || l.t.trim() === '' || /^\s/.test(l.t)) continue;
      const m = /^[-*+]\s+(.*)$/.exec(l.t);
      const head = m && m[1].indexOf(':') > 0 ? m[1].slice(0, m[1].indexOf(':')) : null;
      if (head === null) {
        out.push(fail(sf, l.n, `« ${H('unverified')} » entry "${short(l.t.trim())}" does not open with its section: a list item "<sections> : <what and why>"`));
        continue;
      }
      checkAnchors(head, l.n, `« ${H('unverified')} » entry`, H('stances'));
    }
  }

  // frontmatter refs
  const cm = ctx.md(dir + '/concept.md');
  if (cm && cm.data && typeof cm.data === 'object') {
    const lists = [];
    const st = cm.data.stances;
    if (st && typeof st === 'object') for (const k of ['consensus', 'school', 'course']) if (Array.isArray(st[k])) lists.push([st[k], `stances.${k}`]);
    if (Array.isArray(cm.data.neighbors)) lists.push([cm.data.neighbors, 'neighbors']);
    for (const [list, name] of lists) {
      list.forEach((it, i) => {
        if (!it || !Array.isArray(it.refs)) return;
        it.refs.forEach((r, j) => {
          cited.add(r);
          const line = yaml.lineOf(it.refs, j, yaml.lineOf(list, i));
          if (!refs.has(r)) out.push(fail(dir + '/concept.md', line, `${name}[${i}] cites ${r}, which is not in « ${H('references')} » of sources.md`));
        });
      });
    }
  }
  for (const [id, line] of refs) if (!cited.has(id)) out.push(fail(sf, line, `reference ${id} is cited by no claim and no frontmatter item`));

  // concept.md cites no reference
  for (const f of ['concept.md']) {
    const m = ctx.md(dir + '/' + f);
    if (!m) continue;
    m.body.forEach((l) => {
      if (l.code) return;
      const re = /\[(S\d+[a-z]?)\](?!\()/g;
      let x;
      while ((x = re.exec(l.t))) out.push(fail(dir + '/' + f, l.n, `${f} cites no reference: "${x[0]}" belongs in the frontmatter refs or in sources.md`));
    });
  }
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.lexiconOk) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon is unusable: see course/README.md section 7')];
  const out = [];
  for (const c of ctx.selected()) checkConcept(ctx, c, out);
  return out;
}

// the roles of the spec it reads, by their key in spec.yaml (spec-directives/1/README.md section 1),
// the course through the parser
const reads = ['course.form', 'course.lexicon', 'course.parser'];

module.exports = { id: 'sources', run, reads };
