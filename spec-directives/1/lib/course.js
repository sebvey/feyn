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

// a section heading: `## Section <id> : <title>`, its id a concept number and a letter (0a, A2a);
// the form of the heading and the order of the ids are checked by concept-file
const SUB_ID = /^(?:\d+|A\d+)[a-z]$/;
const firstWord = (t) => (/^(\S+)/.exec(t) || [])[1] || '';

// A heading that carries an id, `<kind word> <id><separator><title>`, read leniently so that a
// heading short of its kind word or its separator still names its block: { id, title, kind, sep },
// `kind` and `sep` saying whether the kind word and the separator are there (concept-file reports
// them).
function idHeading(text, kindWord, separator) {
  let t = text;
  let kind = false;
  if (kindWord && (t === kindWord || t.startsWith(kindWord + ' '))) { t = t.slice(kindWord.length).trimStart(); kind = true; }
  const raw = firstWord(t);
  const id = raw.replace(/:$/, '');
  const rest = t.slice(raw.length);
  const sep = !!separator && raw === id && rest.startsWith(separator);
  const title = (sep ? rest.slice(separator.length) : rest.replace(/^\s*:?/, '')).trim();
  return { id, title, kind, sep };
}

// The tree of a concept from the headings of its concept.md (the split file, or null; word the
// lexicon's word(group, key); form the spec's form): a `##` heading whose id, after the kind word
// `block_kinds.section`, is a section id is a section (level 1), each `###` heading inside it a unit
// of that section (level 2, a leaf), its kind word `block_kinds.unit`. A section is never a unit,
// even with no `###` (concept-file reports it). The rest of the heading is its title. Same shape for
// a numbered concept and an annex: { id, title, level, parent, leaf, children, line, text, kind, sep }.
function tree(m, word, form) {
  const subs = [];
  if (!m) return subs;
  const cf = (form && form.concept_file) || {};
  const sections = cf.sections || {};
  const kw = (k) => (word && k ? word('block_kinds', k) : null);
  const separator = kw(cf.separator);
  for (const s of md.sections(m.body, 2).sections) {
    const h = idHeading(s.title, kw(sections.kind), separator);
    if (!SUB_ID.test(h.id)) continue;
    const sub = { ...h, level: 1, parent: null, leaf: false, children: [], line: s.line, text: s.title };
    subs.push(sub);
    for (const x of md.headings(s.lines).filter((y) => y.level === 3)) {
      const child = { ...idHeading(x.text, kw(sections.unit_kind), separator), level: 2, parent: sub, leaf: true, children: [], line: x.line, text: x.text };
      sub.children.push(child);
      subs.push(child);
    }
  }
  return subs;
}

// The parts of a concept file (concept.md split, its tree, the lexicon's word(group, key), the
// spec's form): what concept-file, unit-contract, unit-length, unit-additions and the text checks read. It finds
// the parts, the blocks of each unit and their fields; it judges nothing but what a heading's or a
// field's form makes unreadable, which it lists in `problems` ({ line, message }) for unit-contract.
//   head, foot: { line, lines, pre, blocks: [{ key, title, line, lines }] } or null
//                                               the ## heading of the form's head or foot, the
//                                               lines before its first ### (pre) and its ###
//                                               blocks, `key` the form's block of that lexicon word
//                                               (null for a ### the form does not name)
//   others: [{ title, line, lines }]            the ## headings that are neither the head, the foot nor a section
//   sections: [{ sub, line, lines, stray }]     stray: the lines of a section with units outside them
//   units: [{ sub, line, blocks, fields, cases }]
//                                               blocks: [{ key, text, reader, line, afterCase, fields }],
//                                               the #### blocks of the form in the unit's order,
//                                               `reader` the word in the parentheses of the heading
//                                               (null when it has none), `afterCase` true for a
//                                               block after a supplementary case
//                                               fields: the fields of its blocks, in order,
//                                               [{ key, label, labelled, qualifier, line, text, lines, items }];
//                                               an unlabelled field (the misconceptions, the
//                                               instruction) takes its block's word as its label
//                                               cases: [{ title, qualifier, reader, line, fields }]
//   heard: the body, the lines no learner reads (form readers without `learner`) blanked
function conceptParts(m, subs, word, form) {
  const out = { head: null, foot: null, others: [], sections: [], units: [], problems: [], heard: [] };
  if (!m) return out;
  const unitForm = (form && form.unit) || {};
  const blockForms = Array.isArray(unitForm.blocks) ? unitForm.blocks : [];
  const caseForm = (form && form.supplementary_case) || {};
  const cf = (form && form.concept_file) || {};
  const blockOf = (part, title) => ((part && part.blocks) || []).find((p) => word('headings', p.heading) === title);
  const fieldKeys = [...new Set([...blockForms.flatMap((b) => b.fields || []), ...(caseForm.fields || [])])];
  const labelOf = (k) => word('unit_fields', k);
  const keyOfLabel = (l) => fieldKeys.find((k) => k && labelOf(k) === l);
  // the word of a unit's block: `unit_blocks.<block>` for labelled fields, else its one field's label
  const blockWord = (b) => (b.labelled ? word('unit_blocks', b.block) : labelOf((b.fields || [])[0]));
  const readerWord = (k) => word('readers', k);
  const stock = word('block_kinds', caseForm.kind);
  const separator = word('block_kinds', cf.separator) || ' : ';
  const caseHeading = `#### ${stock}, <qualifier> (${readerWord(caseForm.reader)})${separator}<title>`;
  const quals = (caseForm.qualifiers || []).map((k) => word('qualifiers', k)).filter(Boolean);
  const unheard = new Set();
  const notHeard = (readers) => Array.isArray(readers) && !readers.includes('learner');
  const problem = (line, message) => out.problems.push({ line, message });
  const short = (l) => l.t.trim().slice(0, 40);
  const indentOf = (l) => /^ */.exec(l.t)[0].length;
  const MISCONCEPTION = /^- «.+» :(\s|$)/;

  // the labelled fields of a block of lines (« Leçon », « Exercice », a supplementary case)
  const FIELD = /^- \*\*([^*]+)\*\*([^:]*?)\s*:(?:\s+(.*))?$/;
  function fields(lines, where) {
    const list = [];
    let cur = null;
    let mis = null; // the current misconception of a labelled « misconceptions »
    for (const l of lines) {
      if (l.t.trim() === '') continue;
      const indent = indentOf(l);
      if (indent === 0) {
        const fm = l.code ? null : FIELD.exec(l.t);
        const key = fm && keyOfLabel(fm[1].trim());
        if (!fm) { problem(l.n, `${where}: line outside a field ("${short(l)}"): a field opens with "- **<label>** :", its following lines indented two spaces`); cur = null; continue; }
        if (!key) { problem(l.n, `${where}: unknown field "${fm[1].trim()}"`); cur = null; continue; }
        cur = { key, label: fm[1].trim(), labelled: true, qualifier: fm[2].replace(/^\s*,/, '').trim(), line: l.n, text: (fm[3] || '').trim(), lines: [l], items: [] };
        mis = null;
        list.push(cur);
        continue;
      }
      if (!cur) { problem(l.n, `${where}: line outside a field ("${short(l)}")`); continue; }
      cur.lines.push(l);
      if (cur.key !== 'misconceptions') continue;
      // a misconception: `  - « <misconception> » : <correction>`; a line indented deeper goes on
      // its correction, but a bullet nested under it is an error (no field nests under a misconception)
      if (indent < 4) {
        if (indent === 2 && /^- /.test(l.t.slice(2))) {
          mis = { line: l.n };
          cur.items.push(mis);
          if (!MISCONCEPTION.test(l.t.slice(2))) problem(l.n, `${where}: a misconception is "- « <the misconception> » : <its correction>", found "${short(l)}"`);
        } else problem(l.n, `${where}: « ${cur.label} » holds a list of misconceptions, found "${short(l)}"`);
      } else if (indent === 4 && /^- /.test(l.t.slice(4)) && mis) {
        problem(l.n, `${where}: a misconception holds its correction and nothing nested under it, found the bullet "${short(l)}"`);
      } else if (!mis) problem(l.n, `${where}: « ${cur.label} » holds a list of misconceptions, found "${short(l)}"`);
    }
    return list;
  }

  // the misconceptions of the unit's « Pièges », unlabelled: `- « <misconception> » : <correction>`,
  // its following lines indented two spaces, nothing nested under it
  function misconceptions(key, label, line, lines, where) {
    const f = { key, label, labelled: false, qualifier: '', line, text: '', lines: [], items: [] };
    let mis = null;
    for (const l of lines) {
      if (l.t.trim() === '') continue;
      f.lines.push(l);
      const indent = indentOf(l);
      if (indent === 0 && /^- /.test(l.t)) {
        mis = { line: l.n };
        f.items.push(mis);
        if (!MISCONCEPTION.test(l.t)) problem(l.n, `${where}: a misconception is "- « <the misconception> » : <its correction>", found "${short(l)}"`);
      } else if (indent === 2 && /^- /.test(l.t.slice(2)) && mis) {
        problem(l.n, `${where}: a misconception holds its correction and nothing nested under it, found the bullet "${short(l)}"`);
      } else if (indent === 0 || !mis) {
        problem(l.n, `${where}: « ${label} » holds its misconceptions, each "- « <the misconception> » : <its correction>", found "${short(l)}"`);
        mis = null;
      }
    }
    return f;
  }

  // a block of prose (the unit's « Consigne »): its lines, unlabelled
  function prose(key, label, line, lines) {
    const ls = lines.filter((l) => l.t.trim() !== '');
    return { key, label, labelled: false, qualifier: '', line: ls.length ? ls[0].n : line, text: ls.length ? ls[0].t.trim() : '', lines: ls, items: [] };
  }

  // a supplementary case: `#### <stock>, <qualifier> (<reader>)<separator><title>`, then its labelled fields
  function supplementaryCase(h, body, where) {
    const cm = /^,\s*([^()]*?)\s*\(([^()]*)\)(.*)$/.exec(h.text.slice(stock.length));
    const title = cm && cm[3].startsWith(separator) ? cm[3].slice(separator.length).trim() : '';
    const c = { title: title || h.text, qualifier: cm ? cm[1].trim() : null, reader: cm ? cm[2].trim() : null, line: h.line, fields: [] };
    if (!title) problem(h.line, `${where}: a supplementary case is "${caseHeading}", found "${h.text}"`);
    else if (!quals.includes(c.qualifier)) {
      const inside = quals.find((q) => c.qualifier.split(/[\s,]+/).includes(q));
      if (inside) problem(h.line, `${where}, case "${title}": "${c.qualifier}" holds a word besides the qualifier « ${inside} »: the qualifier stands alone between « ${stock}, » and its reader`);
      else problem(h.line, `${where}, case "${title}": unknown qualifier "${c.qualifier}": a qualifier is one of ${quals.map((q) => `« ${q} »`).join(', ')}, and nothing else stands between « ${stock}, » and its reader`);
    }
    c.fields = fields(body, `${where}, case "${c.title}"`);
    return c;
  }

  // a unit: its #### blocks, then its supplementary cases (#### headings opened by `block_kinds.stock`)
  function unit(sub, line, lines) {
    const hs = md.headings(lines).filter((h) => h.level >= 4);
    const where = `unit ${sub.id}`;
    const u = { sub, line, blocks: [], fields: [], cases: [] };
    for (const h of hs) if (h.level > 4) problem(h.line, `${where}: heading "${h.text}" deeper than ####`);
    const h4 = hs.filter((h) => h.level === 4);
    const stray = lines.slice(0, h4.length ? h4[0].idx : lines.length).find((l) => l.t.trim() !== '');
    const names = blockForms.map((b) => `"#### ${blockWord(b)} (${readerWord(b.reader)})"`).join(', ');
    if (stray) problem(stray.n, `${where}: line outside a block ("${short(stray)}"): a unit holds its #### blocks, ${names}, then its supplementary cases`);
    h4.forEach((h, k) => {
      const body = lines.slice(h.idx + 1, k + 1 < h4.length ? h4[k + 1].idx : lines.length).filter((l) => !md.headings([l]).length);
      const hide = (readers) => { if (notHeard(readers)) { unheard.add(h.line); for (const l of body) unheard.add(l.n); } };
      if (stock && (h.text === stock || h.text.startsWith(stock + ',') || h.text.startsWith(stock + ' '))) {
        u.cases.push(supplementaryCase(h, body, where));
        hide(caseForm.readers);
        return;
      }
      const bm = /^(.*?)\s*\(([^()]*)\)\s*$/.exec(h.text);
      const name = bm ? bm[1].trim() : h.text.trim();
      const b = blockForms.find((x) => blockWord(x) === name);
      if (!b) {
        // a case in the old form, `#### <title> (<qualifier>)`: named, then read as a case
        if (bm && quals.includes(bm[2].trim())) {
          problem(h.line, `${where}: a supplementary case is "${caseHeading}", found "${h.text}"`);
          u.cases.push({ title: name, qualifier: bm[2].trim(), reader: null, line: h.line, fields: fields(body, `${where}, case "${name}"`) });
          hide(caseForm.readers);
        } else problem(h.line, `${where}: unknown block "${h.text}": a unit holds its blocks, ${names}, then its supplementary cases, "${caseHeading}"`);
        return;
      }
      const field = b.labelled ? null : (b.fields || [])[0];
      const fs = b.labelled ? fields(body, `${where}, « ${name} »`)
        : field === 'misconceptions' ? [misconceptions(field, name, h.line, body, `${where}, « ${name} »`)]
          : [prose(field, name, h.line, body)];
      u.blocks.push({ key: b.block, text: h.text, reader: bm ? bm[2].trim() : null, line: h.line, afterCase: u.cases.length > 0, fields: fs });
      u.fields.push(...fs);
      hide(b.readers);
    });
    out.units.push(u);
    return u;
  }

  for (const s of md.sections(m.body, 2).sections) {
    const sub = subs.find((x) => x.level === 1 && x.line === s.line);
    if (sub) {
      const sec = { sub, line: s.line, lines: s.lines, stray: [] };
      out.sections.push(sec);
      // a section that holds no unit heading has no unit: concept-file reports it, and its lines are no unit's
      const h3 = md.headings(s.lines).filter((h) => h.level === 3);
      if (!h3.length) continue;
      sec.stray = s.lines.slice(0, h3[0].idx).filter((l) => l.t.trim() !== '');
      h3.forEach((h, k) => {
        const kid = sub.children.find((x) => x.line === h.line);
        unit(kid, h.line, s.lines.slice(h.idx + 1, k + 1 < h3.length ? h3[k + 1].idx : s.lines.length));
      });
      continue;
    }
    // the head and the foot: their ## heading, then their ### blocks
    const which = [['head', cf.head], ['foot', cf.foot]].find(([, p]) => p && word('headings', p.heading) === s.title);
    if (!which || out[which[0]]) { out.others.push({ title: s.title, line: s.line, lines: s.lines }); continue; }
    const [name, p] = which;
    const split = md.sections(s.lines, 3);
    const part = { line: s.line, lines: s.lines, pre: split.pre, blocks: [] };
    out[name] = part;
    for (const b of split.sections) {
      const f = blockOf(p, b.title);
      part.blocks.push({ key: f ? f.heading : null, title: b.title, line: b.line, lines: b.lines });
      if (f && notHeard(f.readers)) { unheard.add(b.line); for (const l of b.lines) unheard.add(l.n); }
    }
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
      ctx.concepts.push({ entry: c, index, number, annex: /^A\d+$/.test(number || ''), dir, subs: dir ? tree(ctx.md(dir + '/concept.md'), ctx.word, ctx.form) : [] });
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

module.exports = { load, fail, normNumber, SLUG, conceptParts, idHeading };
