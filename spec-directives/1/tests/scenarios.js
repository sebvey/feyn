'use strict';
// A test of the spec's own files, run by check-spec, which verifies no rule (decisions
// conformity-of-the-course-and-products, spec-files-by-product): the test scenarios of the teacher,
// teacher/tests/, in their form, never what a run of them shows (classroom-builder/fresh-test).
//   - no teacher/tests/ folder: nothing to verify (a spec MAJOR may have no fresh test yet);
//   - teacher/tests/scenario.schema.yaml exists and compiles under ajv's Ajv2020 (JSON Schema
//     2020-12);
//   - every other `*.yaml` of teacher/tests/ is a scenario: it parses, is valid against the
//     schema, and its `id` is its file name without .yaml;
//   - every slug a scenario names, in `rules` and in the `rules` of an `expect`, is a rule of the
//     protocol: the id of a rule of teacher/rules.yaml;
//   - every slug of an `expect` is in the scenario's `rules`.
// It names no file of a spec beyond those its readers name (teacher/rules.yaml, teacher/tests/);
// the debt of idea #485 stays as it is, none added.
const path = require('path');
const { createRequire } = require('module');
const yaml = require('../lib/yaml-lines');
const { fail } = require('../lib/course');

const DIR = 'teacher/tests';
const SCHEMA = `${DIR}/scenario.schema.yaml`;

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// the rules of the protocol: the ids of the rules of teacher/rules.yaml
function protocolRules(ctx) {
  const rules = new Set();
  const raw = ctx.read('teacher/rules.yaml');
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
  const names = ctx.list(DIR);
  if (!names.length) return [];
  const out = [];
  const scenarios = names.filter((n) => n.endsWith('.yaml') && !n.endsWith('.schema.yaml')).sort();
  const schemaText = ctx.read(SCHEMA);
  if (schemaText === null) return [fail(SCHEMA, 1, `${SCHEMA} is missing: the form of a test scenario`)];
  let validate;
  try {
    const Ajv2020 = createRequire(path.join(__dirname, '..', 'package.json'))('ajv/dist/2020').default;
    validate = new Ajv2020({ allErrors: true, logger: false }).compile(yaml.parse(schemaText));
  } catch (e) { return [fail(SCHEMA, e.line || 1, `does not compile under Ajv2020 (JSON Schema 2020-12): ${e.message}`)]; }

  const known = protocolRules(ctx);
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
      if (!known.has(slug)) out.push(fail(file, yaml.lineOf(doc.rules, i, yaml.lineOf(doc, 'rules', 1)), `rules: "${slug}" is not a rule of the protocol (teacher/rules.yaml)`));
    });
    doc.turns.forEach((t, ti) => {
      (t.expect || []).forEach((x, xi) => {
        const at = yaml.lineOf(t.expect, xi, yaml.lineOf(doc.turns, ti, 1));
        for (const slug of x.rules) {
          if (!known.has(slug)) out.push(fail(file, at, `turn ${ti + 1}: "${slug}" is not a rule of the protocol (teacher/rules.yaml)`));
          else if (!listed.has(slug)) out.push(fail(file, at, `turn ${ti + 1}: "${slug}" is not in the scenario's rules, every slug it exercises`));
        }
      });
    });
  }
  return out;
}

module.exports = { id: 'scenarios', run };
