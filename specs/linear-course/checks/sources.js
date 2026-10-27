'use strict';
// Reference ids, citations, claims, paths (SPEC.md sections 4.1 and 4.4).
const yaml = require('./lib/yaml');
const mdlib = require('./lib/md');
const { fail } = require('./lib/course');

const REF = /^S\d+[a-z]?$/;
const CITED = /\bS\d+[a-z]?\b/g;

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
  const refs = new Map(); // id -> line
  const cited = new Set();
  if (secRefs) {
    const t = mdlib.tables(secRefs.lines)[0];
    if (t) for (const r of t.rows) {
      if (r.cells.length !== 5) continue;
      const [id, source, , type, on] = r.cells;
      if (!REF.test(id)) out.push(fail(sf, r.line, `reference id "${id}" must be S<n>, optionally followed by a lowercase letter`));
      else if (refs.has(id)) out.push(fail(sf, r.line, `reference id ${id} is used twice (line ${refs.get(id)})`));
      else refs.set(id, r.line);
      if (source === '') out.push(fail(sf, r.line, `reference ${id}: the source column is empty`));
      const words = type.replace(/\(.*$/, '').split(',').map((w) => w.trim()).filter(Boolean);
      const allowed = Object.values((ctx.pack && ctx.pack.source_types) || {});
      if (!words.length || words.some((w) => !allowed.includes(w))) out.push(fail(sf, r.line, `reference ${id}: type "${type}" must be one or more of ${allowed.join(', ')}, separated by commas`));
      if (!/^\d{4}-\d{2}-\d{2}/.test(on)) out.push(fail(sf, r.line, `reference ${id}: "consulted on" must start with YYYY-MM-DD, found "${on}"`));
    }
  }
  const natureWords = ['consensus', 'school', 'course'].map((k) => ctx.word('markers', k)).filter(Boolean);
  if (secClaims) {
    const t = mdlib.tables(secClaims.lines)[0];
    if (t) for (const r of t.rows) {
      if (r.cells.length !== 4) continue;
      const [claim, source, verified, nature] = r.cells;
      if (claim === '') out.push(fail(sf, r.line, 'a claim row has no claim'));
      const ids = source.match(CITED) || [];
      const paths = source.match(/concepts\/[^\s`;,\])]+\/sources\.md/g) || [];
      // a claim with no outside source (a course choice, a storyline fact) says so in the cell; an empty cell is a missing source
      if (source === '') out.push(fail(sf, r.line, `claim "${claim.slice(0, 50)}": the source cell is empty (a reference id [S1], a sources.md path, or a word saying there is none)`));
      for (const id of ids) {
        cited.add(id);
        if (!refs.has(id)) out.push(fail(sf, r.line, `claim cites ${id}, which is not in « ${H('references')} »`));
      }
      for (const p of paths) {
        const d = p.replace(/^concepts\//, '').replace(/\/sources\.md$/, '');
        if (!ctx.concepts.some((x) => x.dir === 'concepts/' + d)) out.push(fail(sf, r.line, `path ${p} does not name a concept dir of course.yaml`));
      }
      if (verified === '') out.push(fail(sf, r.line, `claim "${claim.slice(0, 50)}": nothing says what was verified`));
      if (nature !== '' && !natureWords.includes(nature)) out.push(fail(sf, r.line, `claim "${claim.slice(0, 50)}": nature "${nature}" must be a stance marker word (${natureWords.join(', ')}) or empty`));
    }
  }
  for (const [id, line] of refs) if (!cited.has(id)) out.push(fail(sf, line, `reference ${id} is cited by no claim`));

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
          const line = yaml.lineOf(it.refs, j, yaml.lineOf(list, i));
          if (!refs.has(r)) out.push(fail(dir + '/concept.md', line, `${name}[${i}] cites ${r}, which is not in « ${H('references')} » of sources.md`));
        });
      });
    }
  }
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
