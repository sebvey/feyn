'use strict';
// course.yaml: fields, identifiers, order, partition into domains, annexes, prerequisites,
// paths, no unlisted concept folder, spec declared, language pack present (COURSE.md section 2,
// SPEC.md section 8). An unknown spec
// or MAJOR is refused by specs/check-course, before these checks run.
const path = require('path');
const yaml = require('./lib/yaml');
const { fail, normNumber, SLUG } = require('./lib/course');

const F = 'course.yaml';
const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const isPosInt = (v) => Number.isInteger(v) && v > 0;
const NUMBER = /^(\d+|A\d+)$/;
const MAX_CHILDREN = 9;

function run(ctx) {
  const out = [];
  const bad = (container, key, msg, fallback) => out.push(fail(F, yaml.lineOf(container, key, fallback), msg));
  if (!ctx.cy) return [fail(F, ctx.cyError.line, ctx.cyError.message)];
  const cy = ctx.cy;
  const only = ctx.concept;

  const known = new Set(['id', 'spec', 'language', 'title', 'subtitle', 'audience', 'site', 'storyline', 'glossary', 'domains', 'concepts', 'annexes']);
  for (const k of Object.keys(cy)) if (!known.has(k)) bad(cy, k, `unknown field "${k}"`);

  // identity
  if (!isStr(cy.id) || !SLUG.test(cy.id)) bad(cy, 'id', 'id must be lowercase ASCII words joined by hyphens');
  else if (cy.id !== path.basename(ctx.root)) bad(cy, 'id', `id "${cy.id}" must equal the course folder name "${path.basename(ctx.root)}"`);
  if (!isStr(cy.spec)) bad(cy, 'spec', 'spec is mandatory: linear-course@<MAJOR>');
  else if (!/^linear-course@\d+$/.test(cy.spec)) bad(cy, 'spec', `spec "${cy.spec}" must be linear-course@<MAJOR>`);
  if (!isStr(cy.language) || !/^[a-z]{2}$/.test(cy.language)) bad(cy, 'language', 'language must be an ISO 639-1 code');
  else if (ctx.packError) bad(cy, 'language', ctx.packError.message);
  for (const k of ['title', 'audience']) if (!isStr(cy[k])) bad(cy, k, `${k} is mandatory`, 1);
  if (cy.subtitle !== undefined && !isStr(cy.subtitle)) bad(cy, 'subtitle', 'subtitle must be a non-empty string');
  if (cy.site !== undefined) {
    const s = cy.site;
    if (s === null || typeof s !== 'object' || Array.isArray(s)) bad(cy, 'site', 'site must be a map');
    else {
      for (const k of Object.keys(s)) if (!['icon', 'color'].includes(k)) bad(s, k, `unknown field "site.${k}"`);
      if (s.icon !== undefined && (!isStr(s.icon) || !ctx.exists(s.icon))) bad(s, 'icon', `site.icon "${s.icon}" is not a file of the course`);
      if (s.color !== undefined && !(typeof s.color === 'string' && /^#[0-9a-fA-F]{6}$/.test(s.color))) bad(s, 'color', 'site.color must be #rrggbb');
    }
  }
  for (const [k, v] of [['storyline', 'storyline.md'], ['glossary', 'glossary.md']]) {
    if (cy[k] !== v) bad(cy, k, `${k} must be "${v}"`, 1);
    else if (!ctx.exists(v)) bad(cy, k, `${v} does not exist`);
  }

  // domains
  if (!Array.isArray(cy.domains) || cy.domains.length === 0) { bad(cy, 'domains', 'domains must be a non-empty list', 1); }
  if (!Array.isArray(cy.concepts) || cy.concepts.length === 0) { bad(cy, 'concepts', 'concepts must be a non-empty list', 1); }
  if (!ctx.usable) return out;

  const domainConcepts = [];
  cy.domains.forEach((d, i) => {
    const at = (k, m) => bad(d, k, m, yaml.lineOf(cy.domains, i));
    if (!d || typeof d !== 'object') { bad(cy.domains, i, `domain ${i + 1} is not a map`); return; }
    for (const k of Object.keys(d)) if (!['number', 'slug', 'title', 'objective', 'duration_min', 'file', 'concepts'].includes(k)) at(k, `unknown field "${k}" in domain ${i + 1}`);
    if (d.number !== i + 1) at('number', `domain number must be ${i + 1} (domains are numbered 1, 2, 3... in list order)`);
    if (!isStr(d.slug) || !SLUG.test(d.slug)) at('slug', `domain ${i + 1}: slug must be lowercase ASCII words joined by hyphens`);
    for (const k of ['title', 'objective']) if (!isStr(d[k])) at(k, `domain ${i + 1}: ${k} is mandatory`);
    if (!isPosInt(d.duration_min)) at('duration_min', `domain ${i + 1}: duration_min must be a positive integer`);
    const want = `domains/${d.number}-${d.slug}.md`;
    if (d.file !== want) at('file', `domain ${i + 1}: file must be "${want}"`);
    else if (!ctx.exists(want)) at('file', `domain file ${want} does not exist`);
    if (!Array.isArray(d.concepts) || d.concepts.length === 0) at('concepts', `domain ${i + 1}: concepts must be a non-empty list of concept numbers`);
    else {
      d.concepts.forEach((c, j) => {
        const n = normNumber(c);
        if (n === null) bad(d.concepts, j, `domain ${i + 1}: bad concept number`);
        else domainConcepts.push({ n, domain: i + 1, line: yaml.lineOf(d.concepts, j, yaml.lineOf(cy.domains, i)) });
      });
    }
  });

  // concepts
  const seen = new Set();
  const subSeen = new Set();
  const annexList = [];
  cy.concepts.forEach((c, i) => {
    const entry = ctx.concepts.find((x) => x.entry === c);
    const cl = yaml.lineOf(cy.concepts, i);
    const at = (k, m) => bad(c, k, m, cl);
    if (!c || typeof c !== 'object') { bad(cy.concepts, i, `concept entry ${i + 1} is not a map`); return; }
    for (const k of Object.keys(c)) if (!['number', 'slug', 'title', 'objective', 'prerequisites', 'duration_min', 'dir', 'subconcepts'].includes(k)) at(k, `unknown field "${k}" in concept entry ${i + 1}`);
    const number = normNumber(c.number);
    if (number === null || !NUMBER.test(number)) { at('number', `concept entry ${i + 1}: number must be 0, 1... or A1, A2...`); return; }
    const label = `concept ${number}`;
    if (seen.has(number)) at('number', `${label} is listed twice`);
    seen.add(number);
    if (!isStr(c.slug) || !SLUG.test(c.slug)) at('slug', `${label}: slug must be lowercase ASCII words joined by hyphens`);
    for (const k of ['title', 'objective']) if (!isStr(c[k])) at(k, `${label}: ${k} is mandatory`);
    if (c.duration_min !== undefined && !isPosInt(c.duration_min)) at('duration_min', `${label}: duration_min must be a positive integer`);
    const nn = /^\d+$/.test(number) ? number.padStart(2, '0') : number;
    const want = `concepts/${nn}-${c.slug}`;
    if (c.dir !== want) at('dir', `${label}: dir must be "${want}"`);
    else if ((!only || only === number) && !ctx.isDir(want)) at('dir', `${label}: folder ${want} does not exist`);
    if (!Array.isArray(c.prerequisites)) at('prerequisites', `${label}: prerequisites is mandatory ([] for none)`);
    if (entry && entry.annex) annexList.push(number);

    // sub-concept tree
    if (!Array.isArray(c.subconcepts) || c.subconcepts.length === 0) { at('subconcepts', `${label}: subconcepts must be a non-empty list`); return; }
    const num = number;
    c.subconcepts.forEach((s, a) => {
      const sl = yaml.lineOf(c.subconcepts, a, cl);
      if (!s || typeof s !== 'object') { bad(c.subconcepts, a, `${label}: sub-concept ${a + 1} is not a map`); return; }
      const letter = String.fromCharCode(97 + a);
      const check = (node, want2, level, l) => {
        for (const k of Object.keys(node)) if (!['id', 'title', 'children'].includes(k)) bad(node, k, `unknown field "${k}" in sub-concept`, l);
        const id = normNumber(node.id);
        if (id !== want2) bad(node, 'id', `${label}: sub-concept id must be "${want2}", found "${node.id}"`, l);
        if (id) { if (subSeen.has(id)) bad(node, 'id', `sub-concept id "${id}" is not unique`, l); subSeen.add(id); }
        if (!isStr(node.title)) bad(node, 'title', `${label}: sub-concept ${want2} has no title`, l);
        const kids = node.children;
        if (kids !== undefined) {
          if (!Array.isArray(kids) || kids.length === 0) bad(node, 'children', `${label}: children of ${want2} must be a non-empty list`, l);
          else if (level === 2) bad(node, 'children', `${label}: the sub-concept tree has two levels at most (${want2} has children)`, l);
          else kids.forEach((k, b) => {
            if (b === MAX_CHILDREN) bad(kids, b, `${label}: ${want2} has ${kids.length} children, ${MAX_CHILDREN} at most (a child id ends in one digit)`, l);
            if (!k || typeof k !== 'object') bad(kids, b, `${label}: bad sub-concept under ${want2}`, l);
            else check(k, want2 + (b + 1), 2, yaml.lineOf(kids, b, l));
          });
        }
      };
      check(s, num + letter, 1, sl);
    });
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
