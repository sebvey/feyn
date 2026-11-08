'use strict';
// A test of the spec's own files, run by check-spec, which verifies no rule (decisions
// conformity-of-the-course-and-products, spec-files-by-product): the test scenarios of the teacher,
// products/teacher/tests/, in their form, never what a run of them shows (teacher-builder/fresh-test).
//   - the folder is the one the manifest, spec.yaml, declares, `products.teacher.tests`
//     (products/teacher/tests/ here), the rules those of `products.teacher.rules` (products/teacher/rules.yaml): a
//     manifest that does not declare the folder checks nothing (a spec MAJOR may have no fresh
//     test yet); a folder declared and missing or empty fails;
//   - products/teacher/tests/scenario.schema.yaml exists and compiles under ajv's Ajv2020 (JSON Schema
//     2020-12);
//   - every other `*.yaml` of products/teacher/tests/ is a scenario: it parses, is valid against the
//     schema, and its `id` is its file name without .yaml;
//   - every slug a scenario names, in `rules` and in the `rules` of an `expect`, is a rule of the
//     protocol: the id of a rule of products/teacher/rules.yaml;
//   - every slug of an `expect` is in the scenario's `rules`.
// It names no file of a spec: the schema's name, scenario.schema.yaml, is the directives'.
const path = require('path');
const { createRequire } = require('module');
const yaml = require('../lib/yaml-lines');
const { fail } = require('../lib/common');

const SCHEMA_NAME = 'scenario.schema.yaml';

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// the rules of the protocol: the ids of the rules of products/teacher/rules.yaml
function protocolRules(ctx, file) {
  const rules = new Set();
  const raw = file === null ? null : ctx.read(file);
  if (raw !== null) {
    try {
      const doc = yaml.parse(raw);
      for (const g of (isObj(doc) && Array.isArray(doc.groups) ? doc.groups : [])) {
        for (const r of (isObj(g) && Array.isArray(g.rules) ? g.rules : [])) if (isObj(r) && typeof r.id === 'string') rules.add(r.id);
      }
    } catch (e) { /* a broken rules.yaml is rule-files' failure */ }
  }
  return rules;
}

function run(ctx) {
  const m = ctx.manifest;
  const DIR = m.path('teacher', 'tests');
  if (DIR === null) return m.nothing(m.ref('teacher', 'tests'));
  const RULES = m.path('teacher', 'rules');
  const SCHEMA = `${DIR}/${SCHEMA_NAME}`;
  const names = ctx.list(DIR);
  if (!names.length) return [fail(DIR, 1, `${DIR} is missing or empty: ${m.ref('teacher', 'tests')} declares the folder of the test scenarios`)];
  const out = [];
  const scenarios = names.filter((n) => n.endsWith('.yaml') && !n.endsWith('.schema.yaml')).sort();
  const schemaText = ctx.read(SCHEMA);
  if (schemaText === null) return [fail(SCHEMA, 1, `${SCHEMA} is missing: the form of a test scenario`)];
  let validate;
  try {
    const Ajv2020 = createRequire(path.join(__dirname, '..', 'package.json'))('ajv/dist/2020').default;
    validate = new Ajv2020({ allErrors: true, logger: false }).compile(yaml.parse(schemaText));
  } catch (e) { return [fail(SCHEMA, e.line || 1, `does not compile under Ajv2020 (JSON Schema 2020-12): ${e.message}`)]; }

  const known = protocolRules(ctx, RULES);
  const rulesName = RULES === null ? `${m.ref('teacher', 'rules')}, undeclared` : RULES;
  for (const name of scenarios) {
    const file = `${DIR}/${name}`;
    let doc;
    try { doc = yaml.parse(ctx.read(file)); } catch (e) { out.push(fail(file, e.line || 1, e.message)); continue; }
    if (!validate(doc)) {
      for (const e of validate.errors) out.push(fail(file, 1, `not valid against ${SCHEMA}: ${e.instancePath || '/'} ${e.message}`));
      continue;
    }
    const id = name.replace(/\.yaml$/, '');
    if (doc.id !== id) out.push(fail(file, yaml.lineOf(doc, 'id', 1), `id "${doc.id}" is not the file name "${id}"`));
    const listed = new Set(doc.rules);
    doc.rules.forEach((slug, i) => {
      if (!known.has(slug)) out.push(fail(file, yaml.lineOf(doc.rules, i, yaml.lineOf(doc, 'rules', 1)), `rules: "${slug}" is not a rule of the protocol (${rulesName})`));
    });
    doc.turns.forEach((t, ti) => {
      (t.expect || []).forEach((x, xi) => {
        const at = yaml.lineOf(t.expect, xi, yaml.lineOf(doc.turns, ti, 1));
        for (const slug of x.rules) {
          if (!known.has(slug)) out.push(fail(file, at, `turn ${ti + 1}: "${slug}" is not a rule of the protocol (${rulesName})`));
          else if (!listed.has(slug)) out.push(fail(file, at, `turn ${ti + 1}: "${slug}" is not in the scenario's rules, every slug it exercises`));
        }
      });
    });
  }
  return out;
}

// the roles it reads, by their key in the manifest, which the map of a spec MAJOR shows (lib/map.js)
const reads = ['products.teacher.tests', 'products.teacher.rules'];
// the roles without which it checks nothing (m.nothing above): the map lists it when one is declared
const needs = ['products.teacher.tests'];

module.exports = { id: 'scenarios', run, reads, needs };
