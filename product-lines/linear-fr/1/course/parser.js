'use strict';
// The parser of a course of this spec MAJOR, read by the course checks (course/checks/check-course,
// course-files) and the site build (products/site/build/render-site): it loads a course folder,
// course.yaml, the lexicon of the course files, the form of the concept file (course/form.yaml),
// the concept index and the parts of each concept file, files. It holds the forms of this spec
// (the heading `## Section <id> : <titre>`, the ids `0a` and `A2a`, the annexes `A<n>`, the fixed
// facts of storyline.md), so it lives in the spec, not in the directives. It reads with the lib of
// the spec directives this MAJOR follows (spec.yaml, `directives: <MAJOR>`), which its caller has
// loaded and gives it: `lib(name)` returns spec-directives/<MAJOR>/lib/<name>.js (yaml-lines, md,
// common), so the spec MAJOR follows its directives, never the reverse.
//   const { load, fixedFacts } = require('<MAJOR>/course/parser')(lib);
const fs = require('fs');
const path = require('path');

// the directives' lib, bound by the caller (module.exports, at the end)
let yaml = null;
let md = null;
let SLUG = null;
let normNumber = null;

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
// spec's form): what concept-file, unit-contract, case-coverage, teacher-message-length, unit-additions and the text checks read. It finds
// the parts, the blocks of each unit, their fields and its cases; it judges nothing but what a
// heading's or a field's form makes unreadable, which it lists in `problems` ({ line, message })
// for unit-contract.
//   head: { key, line, lines, pre, blocks: [] } or null
//                                               the ## heading of the form's head, `key` its
//                                               lexicon key, and its lines (pre: all of them;
//                                               it has no ### block)
//   foot: { line, lines, pre, blocks: [{ key, title, line, lines }] } or null
//                                               the ## heading of the form's foot, the lines
//                                               before its first ### (pre) and its ### blocks,
//                                               `key` the form's block of that lexicon word (null
//                                               for a ### the form does not name)
//   others: [{ title, line, lines }]            the ## headings that are neither the head, the foot nor a section
//   sections: [{ sub, line, lines, stray }]     stray: the lines of a section with units outside them
//   units: [{ sub, line, blocks, fields, cases }]
//                                               blocks: [{ key, text, line, fields, cases }],
//                                               the #### blocks of the form in the unit's order,
//                                               `cases` the cases of the block of cases, else null
//                                               fields: the fields of its blocks, in order,
//                                               [{ key, label, labelled, qualifier, line, text, lines, items, case }];
//                                               `qualifier` the words between a label and its
//                                               colon (unit-contract refuses any), `case` the
//                                               case a field belongs to (null outside the block
//                                               of cases); an unlabelled field (the
//                                               instruction) takes its block's word as its label;
//                                               the field of misconceptions in play (`in_play` of
//                                               the block of cases in the form) lists in `names`
//                                               the names it gives, [{ name, line }]
//                                               `body` the whole text of a labelled field
//                                               (its lines after the label, unindented); the
//                                               field of misconceptions (`misconceptions` of
//                                               its block in the form) lists in `items` each
//                                               misconception, { line, name, belief, parts,
//                                               <part>: its body }, `parts` [{ key, label,
//                                               qualifier, line, text, lines, body }] in the
//                                               order written
//                                               cases: the cases of its block of cases, in order,
//                                               [{ title, line, fields, first, inPlay }], each
//                                               under its heading `##### <kind word><separator>
//                                               <title>` (`cases` of the block in the form),
//                                               `first` for the unit's case, `inPlay` the names
//                                               of its field of misconceptions in play (null
//                                               without that field); a line before the first
//                                               case's heading belongs to no case (a problem)
//   heard: the body, the lines no learner reads (form readers without `learner`) blanked
function conceptParts(m, subs, word, form) {
  const out = { head: null, foot: null, others: [], sections: [], units: [], problems: [], heard: [] };
  if (!m) return out;
  const unitForm = (form && form.unit) || {};
  const blockForms = Array.isArray(unitForm.blocks) ? unitForm.blocks : [];
  const cf = (form && form.concept_file) || {};
  const blockOf = (part, title) => ((part && part.blocks) || []).find((p) => word('headings', p.heading) === title);
  const fieldKeys = [...new Set(blockForms.flatMap((b) => b.fields || []))];
  const labelOf = (k) => word('unit_fields', k);
  const keyOfLabel = (l) => fieldKeys.find((k) => k && labelOf(k) === l);
  // the word of a unit's block: `unit_blocks.<block>` for labelled fields, else its one field's label
  const blockWord = (b) => (b.labelled ? word('unit_blocks', b.block) : labelOf((b.fields || [])[0]));
  const unheard = new Set();
  const notHeard = (readers) => Array.isArray(readers) && !readers.includes('learner');
  const problem = (line, message) => out.problems.push({ line, message });
  const short = (l) => l.t.trim().slice(0, 40);
  const indentOf = (l) => /^ */.exec(l.t)[0].length;
  const dedent = (l) => l.t.replace(/^ {2}/, '');

  // the labelled fields of a block of lines (« Leçon », « Cas du fil rouge »): `qualifier` holds
  // what stands between a label and its colon, which unit-contract refuses
  const FIELD = /^- \*\*([^*]+)\*\*([^:]*?)\s*:(?:\s+(.*))?$/;
  function fields(lines, where) {
    const list = [];
    let cur = null;
    for (const l of lines) {
      if (l.t.trim() === '') continue;
      if (indentOf(l) === 0) {
        const fm = l.code ? null : FIELD.exec(l.t);
        const key = fm && keyOfLabel(fm[1].trim());
        if (!fm) { problem(l.n, `${where}: line outside a field ("${short(l)}"): a field opens with "- **<label>** :", its following lines indented two spaces`); cur = null; continue; }
        if (!key) { problem(l.n, `${where}: unknown field "${fm[1].trim()}"`); cur = null; continue; }
        cur = { key, label: fm[1].trim(), labelled: true, qualifier: fm[2].replace(/^\s*,/, '').trim(), line: l.n, text: (fm[3] || '').trim(), lines: [l], items: [], case: null };
        list.push(cur);
        continue;
      }
      if (!cur) { problem(l.n, `${where}: line outside a field ("${short(l)}")`); continue; }
      cur.lines.push(l);
    }
    // `body`: the field's whole text, its first line's after the label and its following lines
    // with their two spaces of indentation removed (Markdown, as the site build gives it)
    for (const f of list) f.body = [f.text, ...f.lines.slice(1).map(dedent)].join('\n').trim();
    return list;
  }

  // the cases of a block of cases (« Cas du fil rouge »), from its lines, headings included: each
  // case under its heading, `##### <kind word><separator><title>` (`heading_level`, the kind word
  // `block_kinds.<kind>`, the separator the concept file's), then its labelled fields; a line
  // before the first heading belongs to no case. The field `in_play.field` lists in `names` the
  // names it gives, split at `in_play.separator`. The fields' presence and order, and what the
  // names name, are unit-contract's
  function cases(raw, spec, where) {
    const level = spec.heading_level || 5;
    const lead = `${word('block_kinds', spec.kind) || ''}${word('block_kinds', cf.separator) || ''}`;
    const heads = md.headings(raw).filter((h) => h.level === level);
    const cs = [];
    const fs = [];
    const pre = raw.slice(0, heads.length ? heads[0].idx : raw.length).find((l) => l.t.trim() !== '');
    if (pre) {
      const fm = pre.code ? null : FIELD.exec(pre.t);
      problem(pre.n, `${where}: a case opens with its heading "${'#'.repeat(level)} ${lead}<title>", its fields under it; found ${fm ? `« ${fm[1].trim()} »` : `"${short(pre)}"`} before it`);
    }
    heads.forEach((h, k) => {
      const ok = h.text.startsWith(lead);
      const title = (ok ? h.text.slice(lead.length) : h.text).trim();
      if (!ok) problem(h.line, `${where}: case heading "${'#'.repeat(level)} ${h.text}": a case's heading is "${'#'.repeat(level)} ${lead}<title>"`);
      else if (!title) problem(h.line, `${where}: case heading "${'#'.repeat(level)} ${h.text}" has no title: "${'#'.repeat(level)} ${lead}<title>"`);
      const c = { title, line: h.line, fields: [], first: k === 0, inPlay: null };
      cs.push(c);
      const body = raw.slice(h.idx + 1, k + 1 < heads.length ? heads[k + 1].idx : raw.length).filter((l) => !md.headings([l]).length);
      for (const f of fields(body, `${where}, case "${title}"`)) {
        f.case = c;
        c.fields.push(f);
        fs.push(f);
        if (spec.in_play && f.key === spec.in_play.field) {
          const sep = spec.in_play.separator || ';';
          f.names = [f.text, ...f.lines.slice(1).map((l) => l.t.trim())].join(' ').split(sep).map((x) => x.trim()).filter(Boolean).map((name) => ({ name, line: f.line }));
          c.inPlay = f.names.map((x) => x.name);
        }
      }
    });
    return { fs, cs };
  }

  // the misconceptions of a field of labelled fields (« Idées fausses » of « Leçon »), on the lines
  // below its label: each `  - **<name>** : « <belief> »`, then its parts, `    - **<label>** :
  // <text>`, a part's following lines indented six spaces; nothing else. The parts' presence, their
  // order and the names' uniqueness are unit-contract's
  const MISCONCEPTION = /^ {2}- \*\*([^*]+)\*\*\s*:(?:\s+(.*))?$/;
  const BELIEF = /^«\s*(.+?)\s*»$/;
  const PART = /^ {4}- \*\*([^*]+)\*\*([^:]*?)\s*:(?:\s+(.*))?$/;
  function misconceptions(f, spec, where) {
    const parts = (spec && Array.isArray(spec.parts)) ? spec.parts : [];
    const form = `"  - **<name>** : « <belief> »", then ${parts.map((k) => `"    - **${labelOf(k) || k}** : <text>"`).join(', ')}`;
    if (f.text !== '') problem(f.line, `${where}: « ${f.label} » holds its misconceptions on the lines below its label, nothing after its colon (found "${f.text.slice(0, 40)}")`);
    let mis = null;
    let part = null;
    for (const l of f.lines.slice(1)) {
      if (l.t.trim() === '') continue;
      const indent = indentOf(l);
      if (indent === 2 && /^ {2}- /.test(l.t)) {
        const m = MISCONCEPTION.exec(l.t);
        const b = m && BELIEF.exec((m[2] || '').trim());
        mis = { line: l.n, name: m ? m[1].trim() : '', belief: b ? b[1] : '', parts: [] };
        f.items.push(mis);
        part = null;
        if (!m || !b) problem(l.n, `${where}: a misconception is ${form}, found "${short(l)}"`);
      } else if (indent === 4 && /^ {4}- /.test(l.t) && mis) {
        const pm = PART.exec(l.t);
        const key = pm && parts.find((k) => labelOf(k) === pm[1].trim());
        part = null;
        if (!pm) { problem(l.n, `${where}, misconception "${mis.name}": a part is ${parts.map((k) => `"- **${labelOf(k) || k}** : <text>"`).join(' or ')}, found "${short(l)}"`); continue; }
        if (!key) { problem(l.n, `${where}, misconception "${mis.name}": unknown part "${pm[1].trim()}": a misconception holds ${parts.map((k) => `« ${labelOf(k) || k} »`).join(' and ')}, and nothing else`); continue; }
        part = { key, label: pm[1].trim(), qualifier: pm[2].replace(/^\s*,/, '').trim(), line: l.n, text: (pm[3] || '').trim(), lines: [l] };
        mis.parts.push(part);
      } else if (indent >= 6 && part) part.lines.push(l);
      else {
        problem(l.n, `${where}: « ${f.label} » holds its misconceptions, each ${form}, found "${short(l)}"`);
        part = null;
      }
    }
    // each part's whole text, its following lines unindented; the item's `<part>`, the first written
    for (const m of f.items) {
      for (const p of m.parts) {
        p.body = [p.text, ...p.lines.slice(1).map((l) => l.t.replace(/^ {6}/, ''))].join('\n').trim();
        if (!(p.key in m)) m[p.key] = p.body;
      }
    }
    return f;
  }

  // a block of prose (the unit's « Consigne au professeur »): its lines, unlabelled
  function prose(key, label, line, lines) {
    const ls = lines.filter((l) => l.t.trim() !== '');
    return { key, label, labelled: false, qualifier: '', line: ls.length ? ls[0].n : line, text: ls.length ? ls[0].t.trim() : '', lines: ls, items: [], case: null };
  }

  // a unit: its #### blocks, each titled by its word alone
  function unit(sub, line, lines) {
    const hs = md.headings(lines).filter((h) => h.level >= 4);
    const where = `unit ${sub.id}`;
    const u = { sub, line, blocks: [], fields: [], cases: [] };
    // a ##### heading is a case, in the block of cases (cases() reads it); none is deeper
    const caseLevel = Math.max(0, ...blockForms.map((b) => (b.cases ? b.cases.heading_level || 5 : 0)));
    for (const h of hs) if (h.level > Math.max(4, caseLevel)) problem(h.line, `${where}: heading "${h.text}" deeper than ${'#'.repeat(Math.max(4, caseLevel))}`);
    const h4 = hs.filter((h) => h.level === 4);
    const stray = lines.slice(0, h4.length ? h4[0].idx : lines.length).find((l) => l.t.trim() !== '');
    const names = blockForms.map((b) => `"#### ${blockWord(b)}"`).join(', ');
    if (stray) problem(stray.n, `${where}: line outside a block ("${short(stray)}"): a unit holds its #### blocks, ${names}`);
    h4.forEach((h, k) => {
      const raw = lines.slice(h.idx + 1, k + 1 < h4.length ? h4[k + 1].idx : lines.length);
      const body = raw.filter((l) => !md.headings([l]).length);
      let name = h.text.trim();
      let b = blockForms.find((x) => blockWord(x) === name);
      // a heading that carries more than its word, a mark in parentheses: named, then read as its block
      if (!b) {
        const bm = /^(.*?)\s*\(([^()]*)\)\s*$/.exec(name);
        const marked = bm && blockForms.find((x) => blockWord(x) === bm[1].trim());
        if (marked) {
          problem(h.line, `${where}: block "#### ${h.text}" carries a mark: a block's heading is its word alone, "#### ${blockWord(marked)}"`);
          b = marked;
          name = bm[1].trim();
        }
      }
      if (!b) { problem(h.line, `${where}: unknown block "${h.text}": a unit holds its #### blocks, ${names}`); return; }
      const field = b.labelled ? null : (b.fields || [])[0];
      const bw = `${where}, « ${name} »`;
      // a case heading outside the block of cases
      if (!b.cases) for (const x of md.headings(raw).filter((y) => y.level === caseLevel)) problem(x.line, `${bw}: heading "${'#'.repeat(caseLevel)} ${x.text}": a ${'#'.repeat(caseLevel)} heading is a case, in the block of cases`);
      let fs;
      let cs = null;
      if (b.cases) ({ fs, cs } = cases(raw, b.cases, bw));
      else fs = b.labelled ? fields(body, bw) : [prose(field, name, h.line, body)];
      if (b.labelled && b.misconceptions) for (const f of fs.filter((x) => x.key === b.misconceptions.field)) misconceptions(f, b.misconceptions, bw);
      u.blocks.push({ key: b.block, text: h.text, line: h.line, fields: fs, cases: cs });
      u.fields.push(...fs);
      if (cs) u.cases.push(...cs);
      if (notHeard(b.readers)) { unheard.add(h.line); for (const l of body) unheard.add(l.n); }
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
    // the head: its ## heading, then its text; the foot: its ## heading, then its ### blocks
    const head = cf.head && word('headings', cf.head.heading) === s.title;
    if (head && !out.head) {
      out.head = { key: cf.head.heading, line: s.line, lines: s.lines, pre: s.lines, blocks: [] };
      if (notHeard(cf.head.readers)) { unheard.add(s.line); for (const l of s.lines) unheard.add(l.n); }
      continue;
    }
    const foot = cf.foot && word('headings', cf.foot.heading) === s.title;
    if (!foot || out.foot) { out.others.push({ title: s.title, line: s.line, lines: s.lines }); continue; }
    const split = md.sections(s.lines, 3);
    const part = { line: s.line, lines: s.lines, pre: split.pre, blocks: [] };
    out.foot = part;
    for (const b of split.sections) {
      const f = blockOf(cf.foot, b.title);
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
  // (opts.specLexicon, which its caller passes), or the file --lexicon names (opts.lexicon).
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

// The fixed facts of storyline.md, the lines of its section `headings.fixed_facts`: one bullet per
// fact, its following lines indented, each ending with the id of the unit that fixed it in
// parentheses, a final period allowed after it, `(0d1)`. Read by course-files (the site does not
// publish them):
// { facts: [{ line, text, unit }], stray: [lines] }, `unit` null when the fact ends with no id,
// `stray` a line that is no bullet nor the continuation of one.
const FACT_UNIT = /\(([^()\s]+)\)\.?$/;
function fixedFacts(lines) {
  const facts = [];
  const stray = [];
  for (const l of lines) {
    if (!l.t.trim()) continue;
    if (!l.code && /^- /.test(l.t)) facts.push({ line: l.n, text: l.t.slice(2).trim() });
    else if (!l.code && /^\s/.test(l.t) && facts.length) facts[facts.length - 1].text += ' ' + l.t.trim();
    else stray.push(l);
  }
  for (const f of facts) {
    const m = FACT_UNIT.exec(f.text);
    f.unit = m ? m[1] : null;
  }
  return { facts, stray };
}

// lib(name): the module spec-directives/<MAJOR>/lib/<name>.js of the directives this MAJOR follows
module.exports = function parser(lib) {
  yaml = lib('yaml-lines');
  md = lib('md');
  ({ SLUG, normNumber } = lib('common'));
  return { load, tree, conceptParts, idHeading, fixedFacts };
};
