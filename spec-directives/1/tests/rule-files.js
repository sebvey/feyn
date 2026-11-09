'use strict';
// A test of the spec's own files, run by check-spec (README.md section 4): the rule files and the
// schemas of a course. It reads the rule files the manifest, spec.yaml, declares, the role
// `rules` of the course and of each product (`course.rules`, `products.<name>.rules`), and the
// schemas of the course (`course.schemas`); it checks nothing when the manifest declares no rule
// file.
//   - each rule file declared exists and is valid against spec-directives/1/rules.schema.yaml (the
//     rule model, README.md section 2), under ajv's Ajv2020, with the classifications its owner
//     declares in `lists.classifications.<owner>` added to the model: a group and a rule may carry
//     each of them, its value one of that list's, and every rule carries each, on the rule or on its
//     group, as it carries `method`; no other key; a file whose owner declares none takes none;
//   - `lists.classifications` names the course or a product that declares a rule file;
//   - the ids of rules and groups are unique across the rule files;
//   - a check named exists, as a script or an agent workflow of the folder of the checks of the
//     file's owner (`<check>.js` in its role `checks`: `course.checks`, or the folder that
//     check-spec's --checks-dir names, for the course);
//   - the rules a check implements carry the same value of each classification, so that a spec
//     can derive from them what the check is;
//   - each `*.schema.yaml` of the schemas folder of the course compiles under Ajv2020 (JSON Schema
//     2020-12), and the text of exactly one rule of the course names it by its path; a schema
//     named there exists.
const fs = require('fs');
const path = require('path');
const yaml = require('../lib/yaml-lines');
const { fail } = require('../lib/common');

const MODEL = path.join(__dirname, '..', 'rules.schema.yaml');
// the keys of a group and of a rule in the model, which no classification takes
const MODEL_KEYS = ['id', 'title', 'purpose', 'rules', 'text', 'why', 'method', 'check', 'criterion'];

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const oneOf = (list) => list.map((v) => `"${v}"`).join(', ');
const escape = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// the rule model with the classifications of one owner: { key: [values] }
function model(classifications) {
  const schema = yaml.parse(fs.readFileSync(MODEL, 'utf8'));
  const { group, rule } = schema.$defs;
  const allOf = [];
  for (const [key, values] of Object.entries(classifications)) {
    // a classification named as a key of the model is spec-yaml's failure
    if (key in group.properties || key in rule.properties) continue;
    const p = { description: `one of ${oneOf(values)}`, enum: values };
    group.properties[key] = p;
    rule.properties[key] = p;
    allOf.push({ if: { not: { required: [key] } }, then: { properties: { rules: { items: { required: [key] } } } } });
  }
  if (allOf.length) group.allOf = allOf;
  return schema;
}

// an ajv error as a failure of the rule file: the group or the rule at fault, by its id when it has one
function describe(doc, error) {
  const parts = error.instancePath.split('/').slice(1);
  let name = '';
  if (parts[0] === 'groups' && parts.length >= 2) {
    const g = Array.isArray(doc.groups) ? doc.groups[Number(parts[1])] : null;
    name = `group ${Number(parts[1]) + 1}`;
    if (parts[2] === 'rules' && parts.length >= 4) {
      const r = isObj(g) && Array.isArray(g.rules) ? g.rules[Number(parts[3])] : null;
      name = isObj(r) && typeof r.id === 'string' ? `rule ${r.id}` : `${name}, rule ${Number(parts[3]) + 1}`;
    }
  }
  const field = [1, 3, 5].includes(parts.length) ? parts[parts.length - 1] : '';
  const at = [name, field].filter(Boolean).join(': ');
  const lead = at ? `${at}: ` : '';
  const p = error.params || {};
  if (error.keyword === 'required') {
    const k = p.missingProperty;
    const where = /^\/groups\/\d+\/rules\/\d+$/.test(error.instancePath) && !['id', 'text'].includes(k) ? ', on the rule or on its group' : '';
    return `${name || 'the file'}: ${k} is mandatory${where}`;
  }
  if (error.keyword === 'additionalProperties') return `${lead}unknown key "${p.additionalProperty}"`;
  if (error.keyword === 'not') return `${lead}check and criterion both: a rule has at most one`;
  const what = error.parentSchema && error.parentSchema.description;
  if (what && ['type', 'pattern', 'enum', 'minItems'].includes(error.keyword)) return `${at || 'the file'} ${JSON.stringify(error.data)} is not ${what}`;
  return `${lead}${error.message}`;
}

function run(ctx) {
  const m = ctx.manifest;
  const files = m.owned('rules');
  if (!files.length) return m.nothing(`${m.ref('course', 'rules')} or products.<name>.rules`);
  const out = [];
  const Ajv2020 = require('ajv/dist/2020').default;
  for (const owner of m.classified()) {
    if (!files.some((f) => f.owner === owner)) out.push(fail(m.file, 1, `lists.classifications.${owner}: ${owner} declares no rule file (${m.ref(owner, 'rules')})`));
  }
  const ids = new Map(); // id -> "file:line"
  const checks = new Map(); // check -> { values, at }
  const courseTexts = []; // [{ text, line }] of the rules of the course

  for (const { owner, path: file } of files) {
    const raw = ctx.read(file);
    if (raw === null) { out.push(fail(file, 1, 'rule file is missing')); continue; }
    let doc;
    try { doc = yaml.parse(raw); } catch (e) { out.push(fail(file, e.line || 1, e.message)); continue; }
    const classifications = m.classifications(owner) || {};
    const validate = new Ajv2020({ allErrors: true, verbose: true, logger: false }).compile(model(classifications));
    if (!validate(doc)) {
      const seen = new Set();
      for (const e of validate.errors) {
        if (['if', 'allOf'].includes(e.keyword)) continue;
        const f = fail(file, yaml.lineOfError(doc, e, 1), describe(isObj(doc) ? doc : {}, e));
        const k = `${f.line} ${f.message}`;
        if (!seen.has(k)) { seen.add(k); out.push(f); }
      }
    }
    if (!isObj(doc) || !Array.isArray(doc.groups)) continue;

    const unique = (id, line, what) => {
      if (ids.has(id)) out.push(fail(file, line, `${what} id "${id}" is not unique: also at ${ids.get(id)}`));
      else ids.set(id, `${file}:${line}`);
    };
    const folder = owner === 'course' && ctx.checks !== null ? ctx.checks : (m.path(owner, 'checks') === null ? null : path.join(ctx.root, m.path(owner, 'checks')));

    doc.groups.forEach((g, gi) => {
      if (!isObj(g)) return;
      const gl = yaml.lineOf(doc.groups, gi, yaml.lineOf(doc, 'groups'));
      if (typeof g.id === 'string') unique(g.id, yaml.lineOf(g, 'id', gl), 'group');
      (Array.isArray(g.rules) ? g.rules : []).forEach((r, ri) => {
        if (!isObj(r)) return;
        const rl = yaml.lineOf(g.rules, ri, gl);
        const name = typeof r.id === 'string' ? `rule ${r.id}` : `group ${gi + 1}, rule ${ri + 1}`;
        if (typeof r.id === 'string') unique(r.id, yaml.lineOf(r, 'id', rl), 'rule');
        if (owner === 'course' && typeof r.text === 'string') courseTexts.push({ text: r.text, line: yaml.lineOf(r, 'text', rl) });
        if (typeof r.check !== 'string') return;
        const cl = yaml.lineOf(r, 'check', rl);
        const exists = folder !== null && /^[a-z0-9-]+$/.test(r.check) && fs.existsSync(path.join(folder, r.check + '.js'));
        if (!exists) {
          const where = folder === null ? `spec.yaml declares no ${m.ref(owner, 'checks')}` : `no ${path.relative(ctx.root, folder) || '.'}/${r.check}.js`;
          out.push(fail(file, cl, `${name}: check "${r.check}" does not exist (${where})`));
          return;
        }
        // a value missing or off its list already failed above
        const values = {};
        for (const key of Object.keys(classifications).filter((k) => !MODEL_KEYS.includes(k))) values[key] = r[key] !== undefined ? r[key] : g[key];
        if (Object.entries(values).some(([k, v]) => !classifications[k].includes(v))) return;
        if (!checks.has(r.check)) { checks.set(r.check, { values, at: `${file}:${cl}` }); return; }
        const first = checks.get(r.check);
        for (const key of Object.keys(values)) {
          if (first.values[key] !== values[key]) out.push(fail(file, cl, `${name}: check ${r.check} verifies rules of two values of ${key}, "${first.values[key]}" (${first.at}) and "${values[key]}": one value of each classification per check, or split it`));
        }
      });
    });
  }

  // the schemas of the course: each compiles under Ajv2020, and one rule of the course names it
  const dir = m.path('course', 'schemas');
  if (dir === null) return out;
  const courseRules = m.path('course', 'rules');
  const ref = new RegExp(`${escape(dir)}/[A-Za-z0-9._-]+\\.schema\\.yaml`, 'g');
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

// the roles it reads, by their key in the manifest (README.md section 4): `products.<name>.rules`
// and `products.<name>.checks` for each product that declares them
const reads = ['course.rules', 'products.<name>.rules', 'course.schemas', 'course.checks', 'products.<name>.checks'];
module.exports = { id: 'rule-files', run, reads };
