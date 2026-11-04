'use strict';
// A test of the spec's own files, run by check-spec, which verifies no rule (decisions
// rules-with-level-and-method, spec-files-by-product): the rule files and the schemas.
//   - course/rules.yaml and teacher/rules.yaml exist, each a map whose one key
//     `groups` is a non-empty list; a group has `rules`, a non-empty list, and may declare `id`
//     (a group slug), `title`, `purpose` (what the group is for, a non-empty string), `category`
//     and `method`; every group of either file has a `purpose`;
//   - a rule has `id` (a slug of two to five words), `level`, `category`, `method` (on the rule
//     or on its group) and `text`; `check` and `why` are optional; a rule of the protocol may also
//     have `origin`, a non-empty string; no other key;
//   - the closed lists of spec-directives/1/README.md sections 3 and 4 and of the spec MAJOR's
//     README.md section 3: the levels, the methods (a rule of the
//     protocol: demonstration), the categories of a course, the families of the protocol;
//   - a group of teacher/rules.yaml has an `id`: the slug of a group of teacher/README.md (a
//     heading "### <title> (`<slug>`)" of a rule family "## <n>. ...", as rule-slugs reads it), or
//     the category of a family, the group of the rules placed directly under that family;
//   - the ids of rules and groups are unique across the two files;
//   - a check named exists, as a script of the spec MAJOR's course/checks/ (`<check>.js`; the
//     folder that check-spec's --checks-dir names, when given) or an agent workflow of the
//     repository (`.claude/workflows/<check>.js`);
//   - a check verifies rules of one category and one level;
//   - each course/schemas/*.schema.yaml compiles under ajv's Ajv2020 (JSON Schema 2020-12), and the
//     text of exactly one rule of course/rules.yaml names it; a schema named there exists.
// The categories and the families below are those of linear-course, a named debt: idea #485
// (course-specs/linear-course/1/teacher/build/render-parts holds the families too).
const fs = require('fs');
const path = require('path');
const yaml = require('../lib/yaml-lines');
const mdlib = require('../lib/md');
const { fail } = require('../lib/course');

const LEVELS = ['requirement', 'recommendation', 'permission'];
const METHODS = ['test', 'analysis', 'inspection', 'demonstration'];
const COURSE_CATEGORIES = ['structure', 'pedagogy', 'writing', 'sources', 'diagrams'];
// the nine families of teacher/README.md, in its order (## 1. to ## 9.)
const FAMILIES = ['session-start', 'domain-presentation', 'loop', 'message-form', 'storyline',
  'stances-and-sources', 'practice-skip-asides', 'learner-memory', 'stop'];
// optional: the keys a rule of the file may add, each a non-empty string when present
const FILES = {
  'course/rules.yaml': { categories: COURSE_CATEGORIES, methods: METHODS, optional: [] },
  'teacher/rules.yaml': { categories: FAMILIES, methods: ['demonstration'], optional: ['origin'] },
};
const RULE_KEYS = ['id', 'level', 'category', 'method', 'check', 'text', 'why'];
const GROUP_KEYS = ['id', 'title', 'purpose', 'category', 'method', 'rules'];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+){1,4}$/;
const GROUP_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+){0,4}$/;
const SCHEMA_REF = /course\/schemas\/[A-Za-z0-9._-]+\.schema\.yaml/g;
// here is spec-directives/<MAJOR>/tests
const WORKFLOWS = path.resolve(__dirname, '..', '..', '..', '.claude', 'workflows');

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const oneOf = (list) => list.map((v) => `"${v}"`).join(', ');

function checkExists(ctx, id) {
  if (!/^[a-z0-9-]+$/.test(id)) return false;
  return fs.existsSync(path.join(ctx.checks, id + '.js')) || fs.existsSync(path.join(WORKFLOWS, id + '.js'));
}

// the group slugs teacher/README.md defines, in its rule families; null when teacher/README.md is
// missing
function protocolGroups(ctx) {
  const text = ctx.read('teacher/README.md');
  if (text === null) return null;
  const { sections } = mdlib.sections(mdlib.split(text).body, 2);
  const groups = new Set();
  for (const s of sections.filter((x) => /^\d+\.\s/.test(x.title))) {
    for (const l of s.lines) {
      const g = !l.code && /^###\s+.+?\s+\(`([^`]+)`\)\s*$/.exec(l.t);
      if (g) groups.add(g[1]);
    }
  }
  return groups;
}

function run(ctx) {
  const out = [];
  const pgroups = protocolGroups(ctx);
  const ids = new Map(); // id -> "file:line"
  const checks = new Map(); // check -> { category, level, at }
  const courseTexts = []; // [{ text, file, line }] of course/rules.yaml

  for (const [file, spec] of Object.entries(FILES)) {
    const raw = ctx.read(file);
    if (raw === null) { out.push(fail(file, 1, 'rule file is missing')); continue; }
    let doc;
    try { doc = yaml.parse(raw); } catch (e) { out.push(fail(file, e.line || 1, e.message)); continue; }
    if (!isObj(doc)) { out.push(fail(file, 1, 'a rule file is a map whose one key is groups')); continue; }
    for (const k of Object.keys(doc)) if (k !== 'groups') out.push(fail(file, yaml.lineOf(doc, k), `unknown key "${k}": a rule file has groups only`));
    if (!Array.isArray(doc.groups) || doc.groups.length === 0) { out.push(fail(file, yaml.lineOf(doc, 'groups'), 'groups must be a non-empty list')); continue; }
    const keys = [...RULE_KEYS, ...spec.optional];

    const unique = (id, line, what) => {
      if (ids.has(id)) out.push(fail(file, line, `${what} id "${id}" is not unique: also at ${ids.get(id)}`));
      else ids.set(id, `${file}:${line}`);
    };
    const closed = (container, key, value, list, what, line) => {
      if (!list.includes(value)) out.push(fail(file, yaml.lineOf(container, key, line), `${what} "${value}" is not one of ${oneOf(list)}`));
    };

    doc.groups.forEach((g, gi) => {
      const gl = yaml.lineOf(doc.groups, gi, yaml.lineOf(doc, 'groups'));
      if (!isObj(g)) { out.push(fail(file, gl, `group ${gi + 1} is not a map`)); return; }
      for (const k of Object.keys(g)) if (!GROUP_KEYS.includes(k)) out.push(fail(file, yaml.lineOf(g, k, gl), `group ${gi + 1}: unknown key "${k}"`));
      if (g.id !== undefined) {
        if (typeof g.id !== 'string' || !GROUP_SLUG.test(g.id)) out.push(fail(file, yaml.lineOf(g, 'id', gl), `group ${gi + 1}: id must be a slug, one to five lowercase words joined by hyphens`));
        else {
          unique(g.id, yaml.lineOf(g, 'id', gl), 'group');
          // teacher/README.md missing is rule-slugs' failure, not this one's
          if (file === 'teacher/rules.yaml' && pgroups && !pgroups.has(g.id) && !FAMILIES.includes(g.id)) out.push(fail(file, yaml.lineOf(g, 'id', gl), `group ${gi + 1}: id "${g.id}" is neither a group of teacher/README.md nor the category of a family: a group of the protocol is a group of teacher/README.md, its slug as its id, or the rules placed directly under a family, its category as its id`));
        }
      } else if (file === 'teacher/rules.yaml') out.push(fail(file, gl, `group ${gi + 1}: id is mandatory in the protocol, the slug of its group of teacher/README.md or the category of its family`));
      if (g.purpose !== undefined && !isStr(g.purpose)) out.push(fail(file, yaml.lineOf(g, 'purpose', gl), `group ${gi + 1}: purpose must be a non-empty string`));
      else if (g.purpose === undefined) out.push(fail(file, gl, `group ${gi + 1}: purpose is mandatory in ${file}, what the group is for`));
      if (g.category !== undefined) closed(g, 'category', g.category, spec.categories, 'category', gl);
      if (g.method !== undefined) closed(g, 'method', g.method, spec.methods, 'method', gl);
      if (!Array.isArray(g.rules) || g.rules.length === 0) { out.push(fail(file, yaml.lineOf(g, 'rules', gl), `group ${gi + 1}: rules must be a non-empty list`)); return; }

      g.rules.forEach((r, ri) => {
        const rl = yaml.lineOf(g.rules, ri, gl);
        if (!isObj(r)) { out.push(fail(file, rl, `group ${gi + 1}, rule ${ri + 1} is not a map`)); return; }
        const name = typeof r.id === 'string' ? `rule ${r.id}` : `group ${gi + 1}, rule ${ri + 1}`;
        for (const k of Object.keys(r)) if (!keys.includes(k)) out.push(fail(file, yaml.lineOf(r, k, rl), `${name}: unknown key "${k}"`));
        if (r.id === undefined) out.push(fail(file, rl, `${name}: id is mandatory`));
        else if (typeof r.id !== 'string' || !SLUG.test(r.id)) out.push(fail(file, yaml.lineOf(r, 'id', rl), `${name}: id must be a slug, two to five lowercase words joined by hyphens`));
        else unique(r.id, yaml.lineOf(r, 'id', rl), 'rule');
        const category = r.category !== undefined ? r.category : g.category;
        const method = r.method !== undefined ? r.method : g.method;
        if (r.level === undefined) out.push(fail(file, rl, `${name}: level is mandatory`));
        else closed(r, 'level', r.level, LEVELS, `${name}: level`, rl);
        if (category === undefined) out.push(fail(file, rl, `${name}: category is mandatory, on the rule or on its group`));
        else if (r.category !== undefined) closed(r, 'category', r.category, spec.categories, `${name}: category`, rl);
        if (method === undefined) out.push(fail(file, rl, `${name}: method is mandatory, on the rule or on its group`));
        else if (r.method !== undefined) closed(r, 'method', r.method, spec.methods, `${name}: method`, rl);
        if (!isStr(r.text)) out.push(fail(file, yaml.lineOf(r, 'text', rl), `${name}: text is mandatory`));
        else if (file === 'course/rules.yaml') courseTexts.push({ text: r.text, line: yaml.lineOf(r, 'text', rl) });
        if (r.why !== undefined && !isStr(r.why)) out.push(fail(file, yaml.lineOf(r, 'why', rl), `${name}: why must be a non-empty string`));
        for (const k of spec.optional) if (r[k] !== undefined && !isStr(r[k])) out.push(fail(file, yaml.lineOf(r, k, rl), `${name}: ${k} must be a non-empty string`));
        if (r.check !== undefined) {
          const cl = yaml.lineOf(r, 'check', rl);
          // a level or a category that is missing or off the lists already failed above
          const known = LEVELS.includes(r.level) && spec.categories.includes(category);
          if (typeof r.check !== 'string' || !checkExists(ctx, r.check)) out.push(fail(file, cl, `${name}: check "${r.check}" does not exist (no course/checks/${r.check}.js, no .claude/workflows/${r.check}.js)`));
          else if (!known) { /* nothing to compare */ }
          else if (!checks.has(r.check)) checks.set(r.check, { category, level: r.level, at: `${file}:${cl}` });
          else {
            const first = checks.get(r.check);
            if (first.category !== category) out.push(fail(file, cl, `${name}: check ${r.check} verifies rules of two categories, "${first.category}" (${first.at}) and "${category}": one category per check, or split it`));
            if (first.level !== r.level) out.push(fail(file, cl, `${name}: check ${r.check} verifies rules of two levels, "${first.level}" (${first.at}) and "${r.level}": one level per check, or split it`));
          }
        }
      });
    });
  }

  // the schemas: each compiles under Ajv2020, and one rule of course/rules.yaml names it
  const Ajv2020 = require('ajv/dist/2020').default;
  const schemas = ctx.list('course/schemas').filter((n) => n.endsWith('.schema.yaml')).sort();
  for (const n of schemas) {
    const file = `course/schemas/${n}`;
    let doc;
    try { doc = yaml.parse(ctx.read(file)); } catch (e) { out.push(fail(file, e.line || 1, e.message)); continue; }
    try { new Ajv2020({ logger: false }).compile(doc); } catch (e) { out.push(fail(file, 1, `does not compile under Ajv2020 (JSON Schema 2020-12): ${e.message}`)); }
    const naming = courseTexts.filter((t) => (t.text.match(SCHEMA_REF) || []).includes(file));
    if (naming.length === 0) out.push(fail(file, 1, 'no rule of course/rules.yaml names this schema: a schema is one rule'));
    else if (naming.length > 1) out.push(fail('course/rules.yaml', naming[1].line, `${file} is named by two rules (also line ${naming[0].line}): a schema is one rule`));
  }
  for (const t of courseTexts) {
    for (const ref of t.text.match(SCHEMA_REF) || []) {
      if (!schemas.includes(ref.slice('course/schemas/'.length))) out.push(fail('course/rules.yaml', t.line, `the rule names ${ref}, which does not exist`));
    }
  }
  return out;
}

module.exports = { id: 'rule-files', run };
