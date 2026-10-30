'use strict';
// Loads a course folder for the checks: course.yaml, language pack, concept index, files.
const fs = require('fs');
const path = require('path');
const yaml = require('./yaml');
const md = require('./md');

const SUPPORTED_MAJORS = [1];
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function normNumber(n) {
  if (typeof n === 'number') return String(n);
  if (typeof n === 'string') return /^\d+$/.test(n) ? String(parseInt(n, 10)) : n;
  return null;
}

function load(dir, opts = {}) {
  const root = path.resolve(dir);
  const ctx = {
    root,
    opts,
    cache: new Map(),
    SUPPORTED_MAJORS,
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

  // language pack
  ctx.pack = null;
  ctx.packFile = null;
  ctx.packError = null;
  const lang = ctx.cy && typeof ctx.cy.language === 'string' ? ctx.cy.language : null;
  if (lang) {
    const dirs = [opts.langDir, process.env.LINEAR_COURSE_LANG_DIR, path.join(__dirname, '..', '..', 'lang')].filter(Boolean);
    const d = dirs[0];
    const file = path.join(d, lang + '.yaml');
    ctx.packFile = opts.langDir || process.env.LINEAR_COURSE_LANG_DIR ? file : 'lang/' + lang + '.yaml';
    if (!fs.existsSync(file)) ctx.packError = { line: 1, message: `language pack ${ctx.packFile} does not exist` };
    else {
      try {
        ctx.pack = yaml.parse(fs.readFileSync(file, 'utf8'));
      } catch (e) {
        ctx.packError = { line: e.line || 1, message: e.message };
      }
    }
  }
  ctx.packOk = !!(ctx.pack && typeof ctx.pack === 'object');
  ctx.word = (group, key) => {
    const g = ctx.pack && ctx.pack[group];
    return g && typeof g[key] === 'string' ? g[key] : null;
  };

  // concept index
  ctx.concepts = [];
  if (ctx.usable) {
    ctx.cy.concepts.forEach((c, index) => {
      if (!c || typeof c !== 'object') return;
      const number = normNumber(c.number);
      const subs = [];
      const walk = (nodes, level, parent) => {
        if (!Array.isArray(nodes)) return;
        nodes.forEach((n) => {
          if (!n || typeof n !== 'object') return;
          const kids = Array.isArray(n.children) ? n.children : [];
          const sub = { id: normNumber(n.id), title: n.title, level, parent, leaf: kids.length === 0, node: n, children: [] };
          subs.push(sub);
          if (parent) parent.children.push(sub);
          if (level === 1) walk(kids, 2, sub);
        });
      };
      walk(c.subconcepts, 1, null);
      ctx.concepts.push({ entry: c, index, number, annex: /^A\d+$/.test(number || ''), dir: typeof c.dir === 'string' ? c.dir : null, subs });
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

module.exports = { load, fail, normNumber, SLUG, SUPPORTED_MAJORS };
