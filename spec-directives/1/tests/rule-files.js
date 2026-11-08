'use strict';
// A test of the spec's own files, run by check-spec, which verifies no rule (decision
// conformity-of-the-course-and-products): the rule files (decisions rules-with-level-and-method,
// spec-files-by-product) and the schemas (decision field-tables-as-schemas). It reads the files
// the manifest, spec.yaml, declares: the rules of the course (`course.rules`), those of the
// protocol (`products.teacher.rules`, when the manifest declares the teacher) and the schemas of
// the course (`course.schemas`); the part of a file the manifest does not declare checks nothing,
// and the test checks nothing when it declares neither rule file.
//   - each rule file declared exists, a map whose one key `groups` is a non-empty list; a group
//     has `rules`, a non-empty list, and may declare `id` (a group slug), `title`, `purpose` (what
//     the group is for, a non-empty string), `category` and `method`; every group of either file
//     has a `purpose`;
//   - a rule has `id` (a slug of two to five words), `level`, `category`, `method` (on the rule
//     or on its group) and `text`; `check` and `why` are optional; no other key, in
//     either file;
//   - the closed lists: the levels and the methods of spec-directives/1/README.md sections 3 and 4
//     (a rule of the protocol: demonstration), common to every spec, and the lists of the manifest,
//     the categories of a course (`lists.categories`) and the families of the protocol
//     (`lists.families`);
//   - a group of the protocol has an `id` and a `category`, its family: a family is the group
//     whose id is its category, holding the rules placed directly under the family; any other group
//     belongs to the family of its category, whose group comes before it in the file (the order
//     the teacher build renders);
//   - the ids of rules and groups are unique across the two files;
//   - a check named exists, as a script or an agent workflow of the folder of the course's checks
//     (`<check>.js` in `course.checks`, or the folder that check-spec's --checks-dir names);
//   - a check verifies rules of one category and one level;
//   - each `*.schema.yaml` of the schemas folder compiles under ajv's Ajv2020 (JSON Schema
//     2020-12), and the text of exactly one rule of the course names it by its path; a schema
//     named there exists.
const fs = require('fs');
const path = require('path');
const yaml = require('../lib/yaml-lines');
const { fail } = require('../lib/common');

const LEVELS = ['requirement', 'recommendation', 'permission'];
const METHODS = ['test', 'analysis', 'inspection', 'demonstration'];
const RULE_KEYS = ['id', 'level', 'category', 'method', 'check', 'text', 'why'];
const GROUP_KEYS = ['id', 'title', 'purpose', 'category', 'method', 'rules'];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+){1,4}$/;
const GROUP_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+){0,4}$/;

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const oneOf = (list) => list.map((v) => `"${v}"`).join(', ');

function checkExists(ctx, id) {
  if (ctx.checks === null || !/^[a-z0-9-]+$/.test(id)) return false;
  return fs.existsSync(path.join(ctx.checks, id + '.js'));
}
// where a check named is looked for, as a failure says it
const checksWhere = (ctx, id) => (ctx.checks === null ? 'spec.yaml declares no course.checks' : `no ${path.relative(ctx.root, ctx.checks) || '.'}/${id}.js`);
const escape = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function run(ctx) {
  const m = ctx.manifest;
  const courseRules = m.path('course', 'rules');
  const protocolRules = m.path('teacher', 'rules');
  if (courseRules === null && protocolRules === null) return m.nothing(m.ref('course', 'rules'), m.ref('teacher', 'rules'));
  const categories = m.list('categories') || [];
  const FAMILIES = m.list('families') || [];
  // file -> what it is held to; `protocol` the rules of the teacher, `course` those of the course
  const FILES = {};
  if (courseRules !== null) FILES[courseRules] = { categories, methods: METHODS, course: true };
  if (protocolRules !== null) FILES[protocolRules] = { categories: FAMILIES, methods: ['demonstration'], protocol: true };
  const out = [];
  if (protocolRules !== null && m.list('families') === null) out.push(fail(m.file, 1, `${m.ref('teacher', 'rules')} is declared and lists.families is not: the groups of the protocol are held to the families`));
  const families = new Set(); // the families of the protocol met so far, by category
  const ids = new Map(); // id -> "file:line"
  const checks = new Map(); // check -> { category, level, at }
  const courseTexts = []; // [{ text, line }] of the rules of the course

  for (const [file, spec] of Object.entries(FILES)) {
    const raw = ctx.read(file);
    if (raw === null) { out.push(fail(file, 1, 'rule file is missing')); continue; }
    let doc;
    try { doc = yaml.parse(raw); } catch (e) { out.push(fail(file, e.line || 1, e.message)); continue; }
    if (!isObj(doc)) { out.push(fail(file, 1, 'a rule file is a map whose one key is groups')); continue; }
    for (const k of Object.keys(doc)) if (k !== 'groups') out.push(fail(file, yaml.lineOf(doc, k), `unknown key "${k}": a rule file has groups only`));
    if (!Array.isArray(doc.groups) || doc.groups.length === 0) { out.push(fail(file, yaml.lineOf(doc, 'groups'), 'groups must be a non-empty list')); continue; }

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
          // a category off the list fails below
          if (spec.protocol && FAMILIES.includes(g.category)) {
            if (g.id === g.category) families.add(g.category);
            else if (!families.has(g.category)) out.push(fail(file, yaml.lineOf(g, 'id', gl), `group ${gi + 1}: group "${g.id}" belongs to the family ${g.category}, whose group does not come before it: a family is the group whose id is its category, and its groups follow it`));
          }
        }
      } else if (spec.protocol) out.push(fail(file, gl, `group ${gi + 1}: id is mandatory in the protocol, its slug or the category of its family`));
      if (spec.protocol && g.category === undefined) out.push(fail(file, gl, `group ${gi + 1}: category is mandatory on a group of the protocol, its family`));
      if (g.purpose !== undefined && !isStr(g.purpose)) out.push(fail(file, yaml.lineOf(g, 'purpose', gl), `group ${gi + 1}: purpose must be a non-empty string`));
      else if (g.purpose === undefined) out.push(fail(file, gl, `group ${gi + 1}: purpose is mandatory in ${file}, what the group is for`));
      if (g.category !== undefined) closed(g, 'category', g.category, spec.categories, 'category', gl);
      if (g.method !== undefined) closed(g, 'method', g.method, spec.methods, 'method', gl);
      if (!Array.isArray(g.rules) || g.rules.length === 0) { out.push(fail(file, yaml.lineOf(g, 'rules', gl), `group ${gi + 1}: rules must be a non-empty list`)); return; }

      g.rules.forEach((r, ri) => {
        const rl = yaml.lineOf(g.rules, ri, gl);
        if (!isObj(r)) { out.push(fail(file, rl, `group ${gi + 1}, rule ${ri + 1} is not a map`)); return; }
        const name = typeof r.id === 'string' ? `rule ${r.id}` : `group ${gi + 1}, rule ${ri + 1}`;
        for (const k of Object.keys(r)) if (!RULE_KEYS.includes(k)) out.push(fail(file, yaml.lineOf(r, k, rl), `${name}: unknown key "${k}"`));
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
        else if (spec.course) courseTexts.push({ text: r.text, line: yaml.lineOf(r, 'text', rl) });
        if (r.why !== undefined && !isStr(r.why)) out.push(fail(file, yaml.lineOf(r, 'why', rl), `${name}: why must be a non-empty string`));
        if (r.check !== undefined) {
          const cl = yaml.lineOf(r, 'check', rl);
          // a level or a category that is missing or off the lists already failed above
          const known = LEVELS.includes(r.level) && spec.categories.includes(category);
          if (typeof r.check !== 'string' || !checkExists(ctx, r.check)) out.push(fail(file, cl, `${name}: check "${r.check}" does not exist (${checksWhere(ctx, r.check)})`));
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

  // the schemas: each compiles under Ajv2020, and one rule of the course names it
  const dir = m.path('course', 'schemas');
  if (dir === null) return out;
  const ref = new RegExp(`${escape(dir)}/[A-Za-z0-9._-]+\\.schema\\.yaml`, 'g');
  const Ajv2020 = require('ajv/dist/2020').default;
  const schemas = ctx.list(dir).filter((n) => n.endsWith('.schema.yaml')).sort();
  const at = courseRules === null ? m.file : courseRules;
  for (const n of schemas) {
    const file = `${dir}/${n}`;
    let doc;
    try { doc = yaml.parse(ctx.read(file)); } catch (e) { out.push(fail(file, e.line || 1, e.message)); continue; }
    try { new Ajv2020({ logger: false }).compile(doc); } catch (e) { out.push(fail(file, 1, `does not compile under Ajv2020 (JSON Schema 2020-12): ${e.message}`)); }
    const naming = courseTexts.filter((t) => (t.text.match(ref) || []).includes(file));
    if (naming.length === 0) out.push(fail(file, 1, `no rule of ${at} names this schema: a schema is one rule`));
    else if (naming.length > 1) out.push(fail(at, naming[1].line, `${file} is named by two rules (also line ${naming[0].line}): a schema is one rule`));
  }
  for (const t of courseTexts) {
    for (const r of t.text.match(ref) || []) {
      if (!schemas.includes(r.slice(dir.length + 1))) out.push(fail(at, t.line, `the rule names ${r}, which does not exist`));
    }
  }
  return out;
}

// the roles it reads, by their key in the manifest, which the map of a spec MAJOR shows (lib/map.js)
const reads = ['course.rules', 'products.teacher.rules', 'course.schemas', 'course.checks'];

module.exports = { id: 'rule-files', run, reads };
