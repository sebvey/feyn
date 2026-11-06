'use strict';
// Loads a course folder for the checks: course.yaml, the lexicon of the course files, the form of
// the concept file (course/form.yaml), the concept index and the parts of each concept file, files.
const fs = require('fs');
const path = require('path');
const yaml = require('./yaml-lines');
const md = require('./md');

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function normNumber(n) {
  if (typeof n === 'number') return String(n);
  if (typeof n === 'string') return /^\d+$/.test(n) ? String(parseInt(n, 10)) : n;
  return null;
}

// a section heading: `## <id> <title>`, its id a concept number and a letter (0a, A2a); the form
// and the order of the ids are checked by concept-file
const SUB_ID = /^(?:\d+|A\d+)[a-z]$/;
const firstWord = (t) => (/^(\S+)/.exec(t) || [])[1] || '';

// The tree of a concept from the headings of its concept.md (the split file, or null): a `##`
// heading whose first word is a section id is a section (level 1), each `###` heading inside it a
// unit of that section (level 2); a section without `###` is a section of one unit, itself a unit
// (leaf). The rest of the heading is its title. Same shape for a numbered concept and an annex:
// { id, title, level, parent, leaf, children, line }; `leaf` marks the units.
function tree(m) {
  const subs = [];
  if (!m) return subs;
  for (const s of md.sections(m.body, 2).sections) {
    const id = firstWord(s.title);
    if (!SUB_ID.test(id)) continue;
    const sub = { id, title: s.title.slice(id.length).trim(), level: 1, parent: null, leaf: true, children: [], line: s.line };
    subs.push(sub);
    for (const h of md.headings(s.lines).filter((x) => x.level === 3)) {
      const kid = firstWord(h.text);
      const child = { id: kid, title: h.text.slice(kid.length).trim(), level: 2, parent: sub, leaf: true, children: [], line: h.line };
      sub.children.push(child);
      subs.push(child);
    }
    sub.leaf = sub.children.length === 0;
  }
  return subs;
}

// The parts of a concept file (concept.md split, its tree, the lexicon's word(group, key), the
// spec's form): what concept-file, unit-contract, unit-length and the text checks read. It finds
// the parts and the fields; it judges nothing but what a field's form makes unreadable, which it
// lists in `problems` ({ line, message }) for unit-contract.
//   head, foot: [{ key, title, line, lines }]   the ## parts the form names, by their lexicon word
//   others: [{ title, line, lines }]            the ## headings that are neither a part nor a section
//   sections: [{ sub, line, lines, stray }]     stray: the lines of a section with units outside them
//   units: [{ sub, line, fields, cases }]       fields: [{ key, label, qualifier, line, text, lines }]
//                                               cases: [{ title, qualifier, line, fields }]
//   heard: the body, the lines no learner reads (form readers without `learner`) blanked
function conceptParts(m, subs, word, form) {
  const out = { head: [], foot: [], others: [], sections: [], units: [], problems: [], heard: [] };
  if (!m) return out;
  const unitForm = (form && form.unit) || {};
  const caseForm = (form && form.supplementary_case) || {};
  const cf = (form && form.concept_file) || {};
  const partKey = (list, title) => (list || []).find((p) => word('headings', p.heading) === title);
  const fieldKeys = (unitForm.fields || []).map((f) => f.field);
  const followKey = ((unitForm.fields || []).find((f) => f.items && f.items.follow_up) || { items: { follow_up: {} } }).items.follow_up.field;
  const labelOf = (k) => word('unit_fields', k);
  const keyOfLabel = (l) => [...fieldKeys, followKey].find((k) => k && labelOf(k) === l);
  const quals = (caseForm.qualifiers || []).map((k) => word('qualifiers', k)).filter(Boolean);
  const unheard = new Set();
  const notHeard = (readers) => Array.isArray(readers) && !readers.includes('learner');
  const problem = (line, message) => out.problems.push({ line, message });

  // the fields of a block of lines (a unit or a supplementary case)
  const FIELD = /^- \*\*([^*]+)\*\*([^:]*?)\s*:(?:\s+(.*))?$/;
  function fields(lines, where) {
    const list = [];
    let cur = null;
    let mis = null; // the current misconception of « misconceptions »
    for (const l of lines) {
      if (l.t.trim() === '') continue;
      const indent = /^ */.exec(l.t)[0].length;
      if (indent === 0) {
        const fm = l.code ? null : FIELD.exec(l.t);
        const key = fm && keyOfLabel(fm[1].trim());
        if (!fm) { problem(l.n, `${where}: line outside a field ("${l.t.trim().slice(0, 40)}"): a field opens with "- **<label>** :", its following lines indented two spaces`); cur = null; continue; }
        if (!key || key === followKey) { problem(l.n, `${where}: unknown field "${fm[1].trim()}"`); cur = null; continue; }
        cur = { key, label: fm[1].trim(), qualifier: fm[2].replace(/^\s*,/, '').trim(), line: l.n, text: (fm[3] || '').trim(), lines: [l], items: [] };
        mis = null;
        list.push(cur);
        continue;
      }
      if (!cur) { problem(l.n, `${where}: line outside a field ("${l.t.trim().slice(0, 40)}")`); continue; }
      cur.lines.push(l);
      if (cur.key !== 'misconceptions') continue;
      // a misconception: `  - « <misconception> » : <correction>`; its follow-ups nested under
      // it, `    - **<follow_up>** : <text>`; anything else indented deeper goes on its line
      if (indent < 4) {
        if (indent === 2 && /^- /.test(l.t.slice(2))) {
          mis = { line: l.n, followUps: [] };
          cur.items.push(mis);
          if (!/^- «.+» :(\s|$)/.test(l.t.slice(2))) problem(l.n, `${where}: a misconception is "- « <the misconception> » : <its correction>", found "${l.t.trim().slice(0, 40)}"`);
        } else problem(l.n, `${where}: « ${cur.label} » holds a list of misconceptions, found "${l.t.trim().slice(0, 40)}"`);
      } else if (indent === 4 && /^- /.test(l.t.slice(4)) && mis) {
        const fm = FIELD.exec(l.t.slice(4));
        if (!fm || keyOfLabel(fm[1].trim()) !== followKey) problem(l.n, `${where}: a bullet nested under a misconception is a follow-up, "- **${labelOf(followKey)}** : <text>", found "${l.t.trim().slice(0, 40)}"`);
        else mis.followUps.push(l.n);
      } else if (!mis) problem(l.n, `${where}: « ${cur.label} » holds a list of misconceptions, found "${l.t.trim().slice(0, 40)}"`);
    }
    return list;
  }

  // a unit's block: its fields, then its supplementary cases (#### headings)
  function unit(sub, line, lines) {
    const hs = md.headings(lines).filter((h) => h.level >= 4);
    const firstCase = hs.length ? hs[0].idx : lines.length;
    const where = `unit ${sub.id}`;
    const u = { sub, line, fields: fields(lines.slice(0, firstCase), where), cases: [] };
    for (const h of hs) if (h.level > 4) problem(h.line, `${where}: heading "${h.text}" deeper than ####`);
    const caseHs = hs.filter((h) => h.level === 4);
    caseHs.forEach((h, k) => {
      const body = lines.slice(h.idx + 1, k + 1 < caseHs.length ? caseHs[k + 1].idx : lines.length);
      const cm = /^(.*\S)\s*\(([^()]*)\)\s*$/.exec(h.text);
      const title = cm ? cm[1].trim() : h.text;
      const c = { title, qualifier: cm ? cm[2].trim() : null, line: h.line, fields: fields(body.filter((l) => !md.headings([l]).length), `${where}, case "${title}"`) };
      if (!cm) problem(h.line, `${where}: a supplementary case is "#### <title> (<qualifier>)", found "${h.text}"`);
      else if (!quals.includes(c.qualifier)) {
        const inside = quals.find((q) => c.qualifier.split(/[\s,]+/).includes(q));
        if (inside) problem(h.line, `${where}, case "${title}": "${c.qualifier}" holds a word besides the qualifier « ${inside} »: the parenthesis holds the qualifier alone`);
        else problem(h.line, `${where}, case "${title}": unknown qualifier "${c.qualifier}": a qualifier is one of ${quals.map((q) => `« ${q} »`).join(', ')}, and nothing else goes in the parenthesis`);
      }
      u.cases.push(c);
      if (notHeard(caseForm.readers)) for (const l of body) unheard.add(l.n);
    });
    // the lines of the fields no learner reads (the instruction): blanked in `heard`
    for (const f of u.fields) {
      const ff = (unitForm.fields || []).find((x) => x.field === f.key);
      if (ff && notHeard(ff.readers)) for (const l of f.lines) unheard.add(l.n);
    }
    out.units.push(u);
    return u;
  }

  for (const s of md.sections(m.body, 2).sections) {
    const sub = subs.find((x) => x.level === 1 && x.line === s.line);
    if (sub) {
      const sec = { sub, line: s.line, lines: s.lines, stray: [] };
      out.sections.push(sec);
      if (sub.leaf) unit(sub, s.line, s.lines);
      else {
        const h3 = md.headings(s.lines).filter((h) => h.level === 3);
        sec.stray = s.lines.slice(0, h3[0].idx).filter((l) => l.t.trim() !== '');
        h3.forEach((h, k) => {
          const kid = sub.children.find((x) => x.line === h.line);
          unit(kid, h.line, s.lines.slice(h.idx + 1, k + 1 < h3.length ? h3[k + 1].idx : s.lines.length));
        });
      }
      continue;
    }
    const part = { title: s.title, line: s.line, lines: s.lines };
    const h = partKey(cf.head, s.title);
    const f = partKey(cf.foot, s.title);
    if (h) out.head.push({ key: h.heading, ...part });
    else if (f) {
      out.foot.push({ key: f.heading, ...part });
      if (notHeard(f.readers)) { unheard.add(s.line); for (const l of s.lines) unheard.add(l.n); }
    } else out.others.push(part);
  }
  out.heard = m.body.map((l) => (unheard.has(l.n) ? { n: l.n, t: '', code: false } : l));
  return out;
}

function load(dir, opts = {}) {
  const root = path.resolve(dir);
  const ctx = {
    root,
    opts,
    cache: new Map(),
    SLUG,
    rel: (abs) => path.relative(root, abs).split(path.sep).join('/'),
    abs: (rel) => path.join(root, rel),
    exists: (rel) => fs.existsSync(path.join(root, rel)),
    isDir: (rel) => {
      try { return fs.statSync(path.join(root, rel)).isDirectory(); } catch (e) { return false; }
    },
    read(rel) {
      if (!ctx.cache.has(rel)) {
        let t = null;
        try { t = fs.readFileSync(path.join(root, rel), 'utf8'); } catch (e) { t = null; }
        ctx.cache.set(rel, t);
      }
      return ctx.cache.get(rel);
    },
    // Markdown file split into frontmatter and body; null when unreadable
    md(rel) {
      const k = 'md:' + rel;
      if (!ctx.cache.has(k)) {
        const t = ctx.read(rel);
        ctx.cache.set(k, t === null ? null : md.split(t));
      }
      return ctx.cache.get(k);
    },
    list(rel) {
      try { return fs.readdirSync(path.join(root, rel), { withFileTypes: true }); } catch (e) { return []; }
    },
    mdFiles() {
      const out = [];
      const walk = (rel) => {
        for (const e of ctx.list(rel).sort((a, b) => (a.name < b.name ? -1 : 1))) {
          if (e.name.startsWith('.')) continue;
          const r = rel ? rel + '/' + e.name : e.name;
          if (e.isDirectory()) { if (r !== 'decisions') walk(r); }
          else if (e.name.endsWith('.md')) out.push(r);
        }
      };
      walk('');
      return out;
    },
  };

  // course.yaml
  ctx.cy = null;
  ctx.cyError = null;
  const raw = ctx.read('course.yaml');
  if (raw === null) ctx.cyError = { line: 1, message: 'course.yaml does not exist' };
  else {
    try {
      ctx.cy = yaml.parse(raw);
      if (ctx.cy === null || typeof ctx.cy !== 'object' || Array.isArray(ctx.cy)) {
        ctx.cyError = { line: 1, message: 'course.yaml is not a map' };
        ctx.cy = null;
      }
    } catch (e) {
      ctx.cyError = { line: e.line || 1, message: `course.yaml: ${e.message}` };
    }
  }
  ctx.usable = !!(ctx.cy && Array.isArray(ctx.cy.concepts) && Array.isArray(ctx.cy.domains));

  // the lexicon of the course files: the course/lexicon.yaml of the spec MAJOR whose checks run
  // (opts.specLexicon; this lib is the directives'), or the file --lexicon names (opts.lexicon).
  // The course names no language: the language is the spec's (spec.yaml).
  ctx.lexicon = null;
  ctx.lexiconFile = null;
  ctx.lexiconError = null;
  const file = opts.lexicon || opts.specLexicon;
  if (!file) ctx.lexiconError = { line: 1, message: 'no lexicon given (check-course passes course/lexicon.yaml of its spec MAJOR)' };
  else {
    ctx.lexiconFile = opts.lexicon ? file : 'course/lexicon.yaml';
    if (!fs.existsSync(file)) ctx.lexiconError = { line: 1, message: `the lexicon ${ctx.lexiconFile} does not exist` };
    else {
      try {
        ctx.lexicon = yaml.parse(fs.readFileSync(file, 'utf8'));
        if (!ctx.lexicon || typeof ctx.lexicon !== 'object' || Array.isArray(ctx.lexicon)) {
          ctx.lexiconError = { line: 1, message: `the lexicon ${ctx.lexiconFile} is not a map` };
          ctx.lexicon = null;
        }
      } catch (e) {
        ctx.lexiconError = { line: e.line || 1, message: `the lexicon ${ctx.lexiconFile}: ${e.message}` };
      }
    }
  }
  ctx.lexiconOk = !!ctx.lexicon;
  ctx.word = (group, key) => {
    const g = ctx.lexicon && ctx.lexicon[group];
    return g && typeof g[key] === 'string' ? g[key] : null;
  };

  // the form of the concept file: the course/form.yaml of the spec MAJOR whose checks run
  // (opts.specForm), as the lexicon; a file of the spec, which no course can break
  ctx.form = null;
  ctx.formError = null;
  if (opts.specForm) {
    try {
      ctx.form = yaml.parse(fs.readFileSync(opts.specForm, 'utf8'));
      if (!ctx.form || typeof ctx.form !== 'object' || Array.isArray(ctx.form)) { ctx.form = null; ctx.formError = 'course/form.yaml is not a map'; }
    } catch (e) {
      ctx.formError = `course/form.yaml: ${e.code === 'ENOENT' ? 'does not exist' : e.message}`;
    }
  } else ctx.formError = 'no form given (check-course passes course/form.yaml of its spec MAJOR)';
  // the parts of a concept's concept.md (conceptParts above), once per concept
  ctx.parts = (c) => {
    const k = 'parts:' + c.dir;
    if (!ctx.cache.has(k)) ctx.cache.set(k, conceptParts(c.dir ? ctx.md(c.dir + '/concept.md') : null, c.subs, ctx.word, ctx.form));
    return ctx.cache.get(k);
  };

  // concept index: course.yaml is the map (domains and concepts); the tree of a concept, its
  // sections and units, is read from the headings of its concept.md (decision
  // course-map-and-concept-tree)
  ctx.concepts = [];
  if (ctx.usable) {
    ctx.cy.concepts.forEach((c, index) => {
      if (!c || typeof c !== 'object') return;
      const number = normNumber(c.number);
      const dir = typeof c.dir === 'string' ? c.dir : null;
      ctx.concepts.push({ entry: c, index, number, annex: /^A\d+$/.test(number || ''), dir, subs: dir ? tree(ctx.md(dir + '/concept.md')) : [] });
    });
  }
  const sel = opts.concept ? normNumber(opts.concept) : null;
  ctx.selected = () => ctx.concepts.filter((c) => !sel || c.number === sel);
  ctx.concept = sel;
  ctx.conceptByNumber = (n) => ctx.concepts.find((c) => c.number === n);
  ctx.allSubIds = () => new Set(ctx.concepts.flatMap((c) => c.subs.map((s) => s.id)));
  ctx.allNumbers = () => new Set(ctx.concepts.map((c) => c.number));
  return ctx;
}

const fail = (file, line, message) => ({ file, line: line || 1, message });

module.exports = { load, fail, normNumber, SLUG, conceptParts };
