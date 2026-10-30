'use strict';
// sources.md (SPEC.md section 4.4) and the frontmatter refs (4.1): no introduction; the five
// columns of « Affirmations » (section anchors that exist in concept.md, a source cell of
// reference ids or the markers.course word, a verification, a nature); « Références » (ids,
// one URL or no link, types, dates); « Non vérifié » entries anchored; every id cited exists,
// every reference is cited.
const yaml = require('./lib/yaml');
const mdlib = require('./lib/md');
const { fail } = require('./lib/course');

const REF = /^S\d+[a-z]?$/;
const CITED = /\bS\d+[a-z]?\b/g;
const IDS = /^\[S\d+[a-z]?\](\s*,\s*\[S\d+[a-z]?\])*$/;
const PATH = /(^|[\s`(])[^\s`(]*\/?sources\.md\b|concepts\/[^\s`;,\])]+/;
const URL = /^https?:\/\/\S+$/;
const FIXED = ['essentials', 'pitfalls', 'quick_test', 'deepening'];

const short = (s) => (s.length > 50 ? s.slice(0, 50) + '…' : s);

// the anchors of concept.md: the ids of its sub-concept headings, and its fixed sections by
// their pack value (« Objectif » is not one: it states what the learner will do, not a claim)
function anchorsOf(ctx, c, H) {
  const set = new Set();
  const cm = ctx.md(c.dir + '/concept.md');
  if (!cm) return null;
  const ids = new Set(c.subs.map((s) => s.id));
  const fixed = new Set(FIXED.map(H));
  for (const h of mdlib.headings(cm.body)) {
    if (h.level === 2 && fixed.has(h.text)) set.add(h.text);
    const id = (/^(\S+)/.exec(h.text) || [])[1];
    if ((h.level === 2 || h.level === 3) && ids.has(id)) set.add(id);
  }
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
  const secRefs = top.sections.find((s) => s.title === H('references'));
  const secClaims = top.sections.find((s) => s.title === H('claims'));
  const secUnv = top.sections.find((s) => s.title === H('unverified'));
  const anchors = anchorsOf(ctx, c, H);
  const fixedList = FIXED.map((k) => `« ${H(k)} »`).join(', ');
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
      const allowed = Object.values((ctx.pack && ctx.pack.source_types) || {});
      if (!words.length || words.some((w) => !allowed.includes(w))) out.push(fail(sf, r.line, `reference ${id}: type "${type}" must be one or more of ${allowed.join(', ')}, separated by commas`));
      if (!/^\d{4}-\d{2}-\d{2}/.test(on)) out.push(fail(sf, r.line, `reference ${id}: "consulted on" must start with YYYY-MM-DD, found "${on}"`));
    }
  }

  // one anchor list: a section cell, or the head of a « Non vérifié » entry
  const checkAnchors = (cell, line, what, extra) => {
    const list = cell.split(',').map((a) => a.trim());
    if (cell.trim() === '' || list.some((a) => a === '')) {
      out.push(fail(sf, line, `${what}: the section is empty (sub-concept ids or fixed sections of concept.md, separated by commas)`));
      return;
    }
    if (!anchors) return;
    for (const a of list) {
      if (anchors.has(a) || (extra && a === extra)) continue;
      if (a === H('stances')) out.push(fail(sf, line, `${what}: section « ${a} »: a stance or neighbour is sourced in its frontmatter item (refs, verified), not in « ${H('claims')} »`));
      else out.push(fail(sf, line, `${what}: unknown section "${a}": a sub-concept id or a fixed section (${fixedList}) that exists in concept.md${extra ? `, or « ${extra} » for a stance or neighbour` : ''}`));
    }
  };

  if (secClaims) {
    const t = mdlib.tables(secClaims.lines)[0];
    if (t) for (const r of t.rows) {
      if (r.cells.length !== 5) continue;
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

  // concept.md and teaching.md cite no reference
  for (const f of ['concept.md', 'teaching.md']) {
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
  if (!ctx.packOk) return [fail('course.yaml', 1, 'the language pack is unusable: see language-pack-keys')];
  const out = [];
  for (const c of ctx.selected()) checkConcept(ctx, c, out);
  return out;
}

module.exports = { id: 'sources', run };
