'use strict';
// The concept folder, its `structure` part (COURSE.md section 3): files, sections and their
// order, the column count of the sources.md tables, frontmatter keys (`verified` parallel to
// `refs`), one section per sub-concept, « Objectif » equals the objective. The cases of
// teaching.md (headings, fields, coverage of leaves, citation in « Consignes ») are
// `case-contract`'s, a `pedagogy` check split from this one (#329).
const yaml = require('./lib/yaml-lines');
const mdlib = require('./lib/md');
const { fail } = require('./lib/course');

const FILES = ['concept.md', 'teaching.md', 'sources.md'];
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

function checkItems(list, where, out, file, label) {
  if (!Array.isArray(list)) { out.push(fail(file, yaml.lineOf(where.c, where.k), `${label} must be a list`)); return; }
  list.forEach((it, i) => {
    const l = yaml.lineOf(list, i, yaml.lineOf(where.c, where.k));
    if (!isObj(it)) { out.push(fail(file, l, `${label}[${i}] is not a map`)); return; }
    for (const k of Object.keys(it)) if (!['text', 'author', 'refs', 'verified'].includes(k)) out.push(fail(file, yaml.lineOf(it, k, l), `${label}[${i}]: unknown key "${k}"`));
    if (typeof it.text !== 'string' || it.text.trim() === '') out.push(fail(file, l, `${label}[${i}]: text is mandatory`));
    else if (/\]\(|<\/?[A-Za-z]/.test(it.text)) out.push(fail(file, yaml.lineOf(it, 'text', l), `${label}[${i}]: text is inline Markdown, bold and italics only (no link, no HTML)`));
    if (it.author !== undefined && (typeof it.author !== 'string' || it.author.trim() === '')) out.push(fail(file, yaml.lineOf(it, 'author', l), `${label}[${i}]: author must be a non-empty string`));
    if (!Array.isArray(it.refs) || it.refs.some((r) => typeof r !== 'string')) out.push(fail(file, l, `${label}[${i}]: refs is mandatory (a list of reference ids, possibly empty)`));
    else {
      // verified: parallel to refs, one quotation and its place per reference; none without refs
      const v = it.verified;
      const n = v === undefined ? 0 : Array.isArray(v) ? v.length : -1;
      const vl = yaml.lineOf(it, 'verified', l);
      if (v !== undefined && it.refs.length === 0) out.push(fail(file, vl, `${label}[${i}]: an item with no refs has no verified`));
      else if (n === -1 || (Array.isArray(v) && v.some((x) => typeof x !== 'string' || x.trim() === ''))) out.push(fail(file, vl, `${label}[${i}]: verified is a list of non-empty strings, one per reference of refs`));
      else if (n !== it.refs.length) out.push(fail(file, vl, `${label}[${i}]: verified must have one entry per reference of refs (${it.refs.length}), found ${n}`));
    }
  });
}

// matches the ## sections of a file against an expected ordered list
function headingSeq(file, secs, expected, out) {
  let k = 0;
  for (const s of secs) {
    while (k < expected.length && !expected[k].match(s.title)) {
      if (expected[k].mandatory) {
        out.push(fail(file, s.line, `section "${s.title}" found where « ${expected[k].text} » is expected (sections come in the order of the spec, and no other ## section exists)`));
        return;
      }
      k++;
    }
    if (k >= expected.length) { out.push(fail(file, s.line, `unexpected section "${s.title}": no other ## section exists`)); return; }
    k++;
  }
  for (; k < expected.length; k++) if (expected[k].mandatory) { out.push(fail(file, 1, `missing section « ${expected[k].text} »`)); return; }
}

function checkConcept(ctx, c, out) {
  const dir = c.dir;
  const label = `concept ${c.number}`;
  if (!dir || !ctx.isDir(dir)) { out.push(fail('course.yaml', 1, `${label}: folder ${dir} does not exist`)); return; }
  const H = (k) => ctx.word('headings', k) || k;

  // files
  for (const e of ctx.list(dir)) {
    if (e.isDirectory()) out.push(fail(dir + '/' + e.name, 1, 'nothing but files sits in a concept folder'));
    else if (!FILES.includes(e.name) && !e.name.endsWith('.svg')) out.push(fail(dir + '/' + e.name, 1, `unexpected file: a concept folder holds ${FILES.join(', ')} and its .svg diagrams`));
  }
  for (const f of FILES) if (!ctx.exists(dir + '/' + f)) out.push(fail(dir + '/' + f, 1, 'mandatory file is missing'));

  // --- concept.md
  const cf = dir + '/concept.md';
  const cm = ctx.md(cf);
  if (cm) {
    if (cm.error) out.push(fail(cf, cm.error.line, cm.error.message));
    else if (!cm.data) out.push(fail(cf, 1, 'concept.md has no frontmatter'));
    else {
      const d = cm.data;
      if (!isObj(d)) out.push(fail(cf, 1, 'frontmatter is not a map'));
      else {
        for (const k of Object.keys(d)) if (!['description', 'stances', 'neighbors', 'diagrams'].includes(k)) out.push(fail(cf, yaml.lineOf(d, k), `unknown frontmatter key "${k}"`));
        if (typeof d.description !== 'string' || d.description.trim() === '') out.push(fail(cf, 2, 'frontmatter description is mandatory'));
        if (!isObj(d.stances)) out.push(fail(cf, yaml.lineOf(d, 'stances', 2), 'frontmatter stances is mandatory (consensus, school, course)'));
        else {
          for (const k of Object.keys(d.stances)) if (!['consensus', 'school', 'course'].includes(k)) out.push(fail(cf, yaml.lineOf(d.stances, k), `unknown key "stances.${k}"`));
          for (const k of ['consensus', 'school', 'course']) {
            if (!(k in d.stances) || d.stances[k] === null) out.push(fail(cf, yaml.lineOf(d, 'stances', 2), `stances.${k} is mandatory (a list, possibly empty)`));
            else checkItems(d.stances[k], { c: d.stances, k }, out, cf, `stances.${k}`);
          }
        }
        if (d.neighbors !== undefined) checkItems(d.neighbors, { c: d, k: 'neighbors' }, out, cf, 'neighbors');
        if (d.diagrams !== undefined) {
          if (!Array.isArray(d.diagrams)) out.push(fail(cf, yaml.lineOf(d, 'diagrams'), 'diagrams must be a list'));
          else d.diagrams.forEach((g, i) => {
            const l = yaml.lineOf(d.diagrams, i, yaml.lineOf(d, 'diagrams'));
            if (!isObj(g)) { out.push(fail(cf, l, `diagrams[${i}] is not a map`)); return; }
            for (const k of Object.keys(g)) if (!['file', 'title', 'caption', 'subconcept'].includes(k)) out.push(fail(cf, yaml.lineOf(g, k, l), `diagrams[${i}]: unknown key "${k}"`));
            for (const k of ['file', 'title', 'caption', 'subconcept']) if (g[k] === undefined || g[k] === null || String(g[k]).trim() === '') out.push(fail(cf, l, `diagrams[${i}]: ${k} is mandatory`));
          });
        }
      }
    }

    // body sections
    const top = mdlib.sections(cm.body, 2);
    // the stances live in the frontmatter only: the old body section is named, then left out of the order
    for (const s of top.sections.filter((x) => x.title === H('stances'))) {
      out.push(fail(cf, s.line, `section « ${H('stances')} » is not a \`concept.md\` section: the stances and neighbours live in the frontmatter stances and neighbors only`));
    }
    top.sections = top.sections.filter((x) => x.title !== H('stances'));
    const exp = [
      { text: H('objective'), mandatory: true, match: (t) => t === H('objective') },
      { text: H('essentials'), mandatory: true, match: (t) => t === H('essentials') },
    ];
    for (const s of c.subs.filter((x) => x.level === 1)) {
      exp.push({ text: `${s.id} <title>`, mandatory: true, match: (t) => t === s.id || t.startsWith(s.id + ' ') });
    }
    exp.push({ text: H('pitfalls'), mandatory: true, match: (t) => t === H('pitfalls') });
    exp.push({ text: H('quick_test'), mandatory: true, match: (t) => t === H('quick_test') });
    exp.push({ text: H('deepening'), mandatory: false, match: (t) => t === H('deepening') });
    headingSeq(cf, top.sections, exp, out);

    // « Objectif » equals the objective
    const obj = top.sections.find((s) => s.title === H('objective'));
    if (obj && typeof c.entry.objective === 'string') {
      const got = mdlib.norm(obj.lines.map((l) => l.t).join(' '));
      let want = mdlib.norm(c.entry.objective);
      want = want.charAt(0).toUpperCase() + want.slice(1);
      if (!/[.!?]$/.test(want)) want += '.';
      if (got !== want) out.push(fail(cf, obj.line, `« ${H('objective')} » must be the objective of course.yaml verbatim (capital first letter, final period): expected "${want}"`));
    }
    // ### only inside first-level sub-concept sections, one per child, in order
    for (const s of top.sections) {
      const id = (/^(\S+)/.exec(s.title) || [])[1];
      const sub = c.subs.find((x) => x.level === 1 && x.id === id);
      const h3 = mdlib.headings(s.lines).filter((h) => h.level === 3);
      if (!sub) {
        for (const h of h3) out.push(fail(cf, h.line, `### "${h.text}" is only allowed inside a sub-concept section`));
        continue;
      }
      const want = sub.children.map((k) => k.id);
      const got = h3.map((h) => (/^(\S+)/.exec(h.text) || [])[1]);
      if (want.join() !== got.join()) {
        out.push(fail(cf, h3.length ? h3[0].line : s.line, `section ${sub.id}: expected ### sections ${want.length ? want.join(', ') : '(none)'}, found ${got.length ? got.join(', ') : '(none)'}`));
      }
    }
  }

  // --- teaching.md
  const tf = dir + '/teaching.md';
  const tm = ctx.md(tf);
  if (tm) {
    if (tm.hasFront) out.push(fail(tf, 1, 'teaching.md has no frontmatter'));
    const top = mdlib.sections(tm.body, 2);
    const has = (k) => (t) => t === H(k);
    headingSeq(tf, top.sections, [
      { text: H('instructions'), mandatory: true, match: has('instructions') },
      { text: H('storyline_facts'), mandatory: false, match: has('storyline_facts') },
      { text: H('bank'), mandatory: true, match: has('bank') },
      { text: H('drawing'), mandatory: false, match: has('drawing') },
    ], out);
    for (const h of mdlib.headings(tm.body)) if (h.level === 1) out.push(fail(tf, h.line, 'no H1: the title is in course.yaml'));
  }

  // --- sources.md
  const sf = dir + '/sources.md';
  const sm = ctx.md(sf);
  if (sm) {
    if (sm.hasFront) out.push(fail(sf, 1, 'sources.md has no frontmatter'));
    for (const h of mdlib.headings(sm.body)) if (h.level === 1) out.push(fail(sf, h.line, 'no H1: the title is in course.yaml'));
    const top = mdlib.sections(sm.body, 2);
    headingSeq(sf, top.sections, [
      { text: H('claims'), mandatory: true, match: (t) => t === H('claims') },
      { text: H('references'), mandatory: true, match: (t) => t === H('references') },
      { text: H('unverified'), mandatory: true, match: (t) => t === H('unverified') },
    ], out);
    for (const [key, cols] of [['claims', 5], ['references', 5]]) {
      const s = top.sections.find((x) => x.title === H(key));
      if (!s) continue;
      const tabs = mdlib.tables(s.lines);
      if (tabs.length !== 1) out.push(fail(sf, s.line, `« ${H(key)} » holds one table, found ${tabs.length}`));
      else if (tabs[0].header.length !== cols) out.push(fail(sf, tabs[0].line, `« ${H(key)} » table has ${tabs[0].header.length} columns, expected ${cols}`));
      else for (const r of tabs[0].rows) if (r.cells.length !== cols) out.push(fail(sf, r.line, `« ${H(key)} » row has ${r.cells.length} cells, expected ${cols}`));
    }
  }
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.packOk) return [fail('course.yaml', 1, 'the language pack is unusable: see language-pack-keys')];
  const out = [];
  for (const c of ctx.selected()) checkConcept(ctx, c, out);
  return out;
}

module.exports = { id: 'concept-folder', run };
