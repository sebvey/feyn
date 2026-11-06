'use strict';
// Loads a course folder for the checks: course.yaml, the lexicon of the course files, concept
// index, files.
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

// a first-level sub-concept heading: `## <id> <title>`, its id a concept number and a letter
// (0a, A2a); the form and the order of the ids are checked by concept-folder
const SUB_ID = /^(?:\d+|A\d+)[a-z]$/;
const firstWord = (t) => (/^(\S+)/.exec(t) || [])[1] || '';

// The tree of a concept from the headings of its concept.md (the split file, or null): a `##`
// heading whose first word is a sub-concept id is a first-level sub-concept, each `###` heading
// inside it a second-level one; the rest of the heading is its title. Same shape for a numbered
// concept and an annex: { id, title, level, parent, leaf, children, line }.
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

  // concept index: course.yaml is the map (domains and concepts); the tree of a concept, its
  // sub-concepts, is read from the headings of its concept.md (decision
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

module.exports = { load, fail, normNumber, SLUG };
