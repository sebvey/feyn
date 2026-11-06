'use strict';
// course.yaml, the map of the course (domains and concepts; the tree of a concept is its
// concept.md's, checked by concept-file), from `course_map` of course/form.yaml: its fields
// against course/schemas/course.schema.yaml through Ajv2020, a failure mapped from ajv's
// instance path to its line (`lineOfError` of lib/yaml-lines.js); then what the schema does not
// say: identifiers, order, partition into domains, annexes, prerequisites, paths that exist, no
// unlisted concept folder (course/README.md section 2, spec-directives/1/README.md section 6).
// An unknown spec or MAJOR is refused by course-specs/check-course, before these checks run. A
// missing or unreadable lexicon fails here too, as a tooling error of the check, not as a rule:
// the lexicon is a file of the spec, which no course can break (decision conformity-by-product;
// lexicon-keys of check-spec tests it).
const fs = require('fs');
const path = require('path');
const directives = require('./directives');
const yaml = directives.lib('yaml-lines');
const { fail, normNumber } = directives.lib('course');

const F = 'course.yaml';
const NUMBER = /^(\d+|A\d+)$/;
const MAJOR = path.resolve(__dirname, '..', '..');
const SCHEMA = 'course/schemas/course.schema.yaml';
const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// the schema of course.yaml, the form's (course_map.schema), compiled once
let validate = null;
let schemaFile = null;
function schema(form) {
  if (!validate) {
    schemaFile = (form && form.course_map && form.course_map.schema) || SCHEMA;
    const Ajv2020 = directives.require('ajv/dist/2020').default;
    validate = new Ajv2020({ allErrors: true, logger: false }).compile(yaml.parse(fs.readFileSync(path.join(MAJOR, schemaFile), 'utf8')));
  }
  return validate;
}

function run(ctx) {
  const out = [];
  const bad = (container, key, msg, fallback) => out.push(fail(F, yaml.lineOf(container, key, fallback), msg));
  if (!ctx.cy) return [fail(F, ctx.cyError.line, ctx.cyError.message)];
  const cy = ctx.cy;
  const only = ctx.concept;

  // the lexicon of the course files, the course/lexicon.yaml of the spec MAJOR (or --lexicon):
  // a tooling error, not a rule of the course
  if (ctx.lexiconError) out.push(fail(ctx.lexiconFile || 'course/lexicon.yaml', ctx.lexiconError.line, `tooling error, not a defect of the course: the spec's lexicon is missing or unreadable (${ctx.lexiconError.message}); see course/README.md section 7`));

  // the fields, their presence and their form: the schema
  const v = schema(ctx.form);
  if (!v(cy)) {
    for (const e of v.errors) {
      // an anyOf reports each branch, then itself: its own line says it once
      if (e.schemaPath.includes('/anyOf/')) continue;
      out.push(fail(F, yaml.lineOfError(cy, e), `not valid against ${schemaFile}: ${e.instancePath || '/'} ${e.message}${e.params && e.params.additionalProperty ? ` ("${e.params.additionalProperty}")` : ''}`));
    }
  }

  // what the schema does not say, on the values whose form it accepts
  if (isStr(cy.id) && ctx.SLUG.test(cy.id) && cy.id !== path.basename(ctx.root)) bad(cy, 'id', `id "${cy.id}" must equal the course folder name "${path.basename(ctx.root)}"`);
  if (isObj(cy.site) && isStr(cy.site.icon) && !ctx.exists(cy.site.icon)) bad(cy.site, 'icon', `site.icon "${cy.site.icon}" is not a file of the course`);
  for (const k of ['storyline', 'glossary']) if (isStr(cy[k]) && !ctx.exists(cy[k])) bad(cy, k, `${cy[k]} does not exist`);
  if (!ctx.usable) return out;

  // domains: number in list order, file named by number and slug, and present
  const domainConcepts = [];
  cy.domains.forEach((d, i) => {
    if (!isObj(d)) return;
    const at = (k, m) => bad(d, k, m, yaml.lineOf(cy.domains, i));
    if (Number.isInteger(d.number) && d.number !== i + 1) at('number', `domain number must be ${i + 1} (domains are numbered 1, 2, 3... in list order)`);
    if (Number.isInteger(d.number) && isStr(d.slug) && typeof d.file === 'string') {
      const want = `domains/${d.number}-${d.slug}.md`;
      if (d.file !== want) at('file', `domain ${i + 1}: file must be "${want}"`);
      else if (!ctx.exists(want)) at('file', `domain file ${want} does not exist`);
    }
    if (Array.isArray(d.concepts)) {
      d.concepts.forEach((c, j) => {
        const n = normNumber(c);
        if (n !== null && NUMBER.test(n)) domainConcepts.push({ n, domain: i + 1, line: yaml.lineOf(d.concepts, j, yaml.lineOf(cy.domains, i)) });
      });
    }
  });

  // concepts: numbers unique, dir named by number and slug, and present
  const seen = new Set();
  cy.concepts.forEach((c, i) => {
    if (!isObj(c)) return;
    const at = (k, m) => bad(c, k, m, yaml.lineOf(cy.concepts, i));
    const number = normNumber(c.number);
    if (number === null || !NUMBER.test(number)) return;
    const label = `concept ${number}`;
    if (seen.has(number)) at('number', `${label} is listed twice`);
    seen.add(number);
    if (!isStr(c.slug) || typeof c.dir !== 'string') return;
    const nn = /^\d+$/.test(number) ? number.padStart(2, '0') : number;
    const want = `concepts/${nn}-${c.slug}`;
    if (c.dir !== want) at('dir', `${label}: dir must be "${want}"`);
    else if ((!only || only === number) && !ctx.isDir(want)) at('dir', `${label}: folder ${want} does not exist`);
  });

  // every folder of concepts/ is the dir of a concept; under --concept, only that concept's
  // folder is demanded, so the others may be missing and unlisted ones are not looked for
  if (!only) {
    const dirs = new Set(cy.concepts.map((c) => (c && typeof c.dir === 'string' ? c.dir : null)));
    for (const e of ctx.list('concepts')) {
      if (e.name.startsWith('.') || !e.isDirectory()) continue;
      if (!dirs.has('concepts/' + e.name)) out.push(fail(`concepts/${e.name}`, 1, `folder concepts/${e.name} is the dir of no concept of course.yaml: every folder of concepts/ is listed`));
    }
  }

  // order, partition, annexes, prerequisites
  const entries = ctx.concepts;
  const numbered = entries.filter((e) => !e.annex);
  let lastN = -1;
  let sawAnnex = false;
  for (const e of entries) {
    if (e.annex) { sawAnnex = true; continue; }
    const n = parseInt(e.number, 10);
    if (sawAnnex) out.push(fail(F, yaml.lineOf(cy.concepts, e.index), `concept ${e.number} comes after an annex: annexes come last`));
    else if (n <= lastN) out.push(fail(F, yaml.lineOf(cy.concepts, e.index), `concept ${e.number} is out of order: numbered concepts come by increasing number`));
    lastN = Math.max(lastN, n);
  }
  const annexNums = entries.filter((e) => e.annex).map((e) => e.number);
  if (cy.annexes === undefined) {
    if (annexNums.length) out.push(fail(F, 1, `annexes is missing but ${annexNums.join(', ')} are annex numbers`));
  } else if (!Array.isArray(cy.annexes) || cy.annexes.map(normNumber).sort().join() !== [...annexNums].sort().join()) {
    out.push(fail(F, yaml.lineOf(cy, 'annexes'), `annexes must list exactly the A numbers of the concepts (${annexNums.join(', ') || 'none'})`));
  }
  const inDomain = new Map();
  for (const d of domainConcepts) {
    if (inDomain.has(d.n)) out.push(fail(F, d.line, `concept ${d.n} belongs to several domains`));
    inDomain.set(d.n, d.domain);
    if (/^A/.test(d.n)) out.push(fail(F, d.line, `annex ${d.n} belongs to no domain`));
    else if (!numbered.some((e) => e.number === d.n)) out.push(fail(F, d.line, `domain ${d.domain} lists concept ${d.n}, which is not in concepts`));
  }
  for (const e of numbered) if (!inDomain.has(e.number)) out.push(fail(F, yaml.lineOf(cy.concepts, e.index), `concept ${e.number} belongs to no domain`));
  const flat = domainConcepts.filter((d) => !/^A/.test(d.n)).map((d) => d.n);
  const want = numbered.map((e) => e.number);
  if (flat.length === want.length && flat.join() !== want.join() && new Set(flat).size === flat.length) {
    out.push(fail(F, 1, `the domains' concepts must be consecutive and follow course order (found ${flat.join(', ')}, expected ${want.join(', ')})`));
  }
  for (const e of entries) {
    const pre = e.entry.prerequisites;
    if (!Array.isArray(pre)) continue;
    pre.forEach((p, j) => {
      const n = normNumber(p);
      const line = yaml.lineOf(pre, j, yaml.lineOf(e.entry, 'prerequisites', yaml.lineOf(cy.concepts, e.index)));
      const target = entries.find((x) => x.number === n);
      if (!target) out.push(fail(F, line, `concept ${e.number}: prerequisite ${p} does not exist`));
      else if (target.annex) out.push(fail(F, line, `concept ${e.number}: prerequisite ${p} is an annex`));
      else if (!e.annex && target.index >= e.index) out.push(fail(F, line, `concept ${e.number}: prerequisite ${p} does not come earlier`));
    });
  }
  return out;
}

module.exports = { id: 'course-yaml', run };
