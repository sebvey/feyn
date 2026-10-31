'use strict';
// The rule files and the schemas of the spec (rules/spec.yaml, group "The rule files and the
// schemas"; decisions rules-with-level-and-method, spec-files-and-alpha-version):
//   - rules/course.yaml, rules/protocol.yaml and rules/spec.yaml exist, each a map whose one key
//     `groups` is a non-empty list; a group has `rules`, a non-empty list, and may declare `id`
//     (a group slug), `title`, `category` and `method`;
//   - a rule has `id` (a slug of two to five words), `level`, `category`, `method` (on the rule
//     or on its group) and `text`; `check` and `why` are optional; a rule of the protocol also has
//     `origin`; no other key;
//   - the closed lists of SPEC.md sections 4 to 6: the levels, the methods (a rule of the
//     protocol: demonstration), the categories of a course, the families of the protocol, `spec`
//     for the rules on the spec itself;
//   - the ids of rules and groups are unique across the three files;
//   - a check named exists, as a script of this folder (`<check>.js`) or an agent workflow of
//     the repository (`.claude/workflows/<check>.js`);
//   - a check verifies rules of one category and one level;
//   - each schemas/*.schema.yaml compiles under ajv's Ajv2020 (JSON Schema 2020-12), and the
//     text of exactly one rule of rules/course.yaml names it; a schema named there exists.
const fs = require('fs');
const path = require('path');
const yaml = require('./lib/yaml-lines');
const { fail } = require('./lib/course');

const LEVELS = ['requirement', 'recommendation', 'permission'];
const METHODS = ['test', 'analysis', 'inspection', 'demonstration'];
const COURSE_CATEGORIES = ['structure', 'pedagogy', 'writing', 'sources', 'diagrams'];
// the nine families of PROTOCOL.md, in its order (## 1. to ## 9.)
const FAMILIES = ['session-start', 'domain-presentation', 'loop', 'message-form', 'storyline',
  'stances-and-sources', 'practice-skip-asides', 'learner-memory', 'stop'];
const FILES = {
  'rules/course.yaml': { categories: COURSE_CATEGORIES, methods: METHODS, extra: [] },
  'rules/protocol.yaml': { categories: FAMILIES, methods: ['demonstration'], extra: ['origin'] },
  'rules/spec.yaml': { categories: ['spec'], methods: METHODS, extra: [] },
};
const RULE_KEYS = ['id', 'level', 'category', 'method', 'check', 'text', 'why'];
const GROUP_KEYS = ['id', 'title', 'category', 'method', 'rules'];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+){1,4}$/;
const GROUP_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+){0,4}$/;
const SCHEMA_REF = /schemas\/[A-Za-z0-9._-]+\.schema\.yaml/g;
// here is specs/<name>/<MAJOR>/checks
const WORKFLOWS = path.resolve(__dirname, '..', '..', '..', '..', '.claude', 'workflows');

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const oneOf = (list) => list.map((v) => `"${v}"`).join(', ');

function checkExists(id) {
  if (!/^[a-z0-9-]+$/.test(id)) return false;
  return fs.existsSync(path.join(__dirname, id + '.js')) || fs.existsSync(path.join(WORKFLOWS, id + '.js'));
}

function run(ctx) {
  const out = [];
  const ids = new Map(); // id -> "file:line"
  const checks = new Map(); // check -> { category, level, at }
  const courseTexts = []; // [{ text, file, line }] of rules/course.yaml

  for (const [file, spec] of Object.entries(FILES)) {
    const raw = ctx.read(file);
    if (raw === null) { out.push(fail(file, 1, 'rule file is missing')); continue; }
    let doc;
    try { doc = yaml.parse(raw); } catch (e) { out.push(fail(file, e.line || 1, e.message)); continue; }
    if (!isObj(doc)) { out.push(fail(file, 1, 'a rule file is a map whose one key is groups')); continue; }
    for (const k of Object.keys(doc)) if (k !== 'groups') out.push(fail(file, yaml.lineOf(doc, k), `unknown key "${k}": a rule file has groups only`));
    if (!Array.isArray(doc.groups) || doc.groups.length === 0) { out.push(fail(file, yaml.lineOf(doc, 'groups'), 'groups must be a non-empty list')); continue; }
    const keys = [...RULE_KEYS, ...spec.extra];

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
        else unique(g.id, yaml.lineOf(g, 'id', gl), 'group');
      }
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
        else if (file === 'rules/course.yaml') courseTexts.push({ text: r.text, line: yaml.lineOf(r, 'text', rl) });
        if (r.why !== undefined && !isStr(r.why)) out.push(fail(file, yaml.lineOf(r, 'why', rl), `${name}: why must be a non-empty string`));
        for (const k of spec.extra) if (!isStr(r[k])) out.push(fail(file, yaml.lineOf(r, k, rl), `${name}: ${k} is mandatory`));
        if (r.check !== undefined) {
          const cl = yaml.lineOf(r, 'check', rl);
          // a level or a category that is missing or off the lists already failed above
          const known = LEVELS.includes(r.level) && spec.categories.includes(category);
          if (typeof r.check !== 'string' || !checkExists(r.check)) out.push(fail(file, cl, `${name}: check "${r.check}" does not exist (no checks/${r.check}.js, no .claude/workflows/${r.check}.js)`));
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

  // the schemas: each compiles under Ajv2020, and one rule of rules/course.yaml names it
  const Ajv2020 = require('ajv/dist/2020').default;
  const schemas = ctx.list('schemas').filter((n) => n.endsWith('.schema.yaml')).sort();
  for (const n of schemas) {
    const file = `schemas/${n}`;
    let doc;
    try { doc = yaml.parse(ctx.read(file)); } catch (e) { out.push(fail(file, e.line || 1, e.message)); continue; }
    try { new Ajv2020({ logger: false }).compile(doc); } catch (e) { out.push(fail(file, 1, `does not compile under Ajv2020 (JSON Schema 2020-12): ${e.message}`)); }
    const naming = courseTexts.filter((t) => (t.text.match(SCHEMA_REF) || []).includes(file));
    if (naming.length === 0) out.push(fail(file, 1, 'no rule of rules/course.yaml names this schema: a schema is one rule'));
    else if (naming.length > 1) out.push(fail('rules/course.yaml', naming[1].line, `${file} is named by two rules (also line ${naming[0].line}): a schema is one rule`));
  }
  for (const t of courseTexts) {
    for (const ref of t.text.match(SCHEMA_REF) || []) {
      if (!schemas.includes(ref.slice('schemas/'.length))) out.push(fail('rules/course.yaml', t.line, `the rule names ${ref}, which does not exist`));
    }
  }
  return out;
}

module.exports = { id: 'rule-files', run };
