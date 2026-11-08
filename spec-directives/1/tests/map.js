'use strict';
// A test of the spec's own files, run by check-spec, which verifies no rule (decision
// conformity-of-the-course-and-products): the map of the spec MAJOR, section 2 of its README.md,
// and the views of its course's files, held to what generate-map writes from the manifest
// (lib/map.js; README.md section 8, "The map").
//   - a manifest with no `map:` checks nothing (the part is optional);
//   - every role the manifest declares has its entry in `map:`, and its path exists; an entry of
//     `map:` names a role the manifest declares; a product of `map.undeclared` is not declared;
//   - section 2 of README.md (`spec.readme`), from its heading `## 2. ` to the next `## `, is what
//     generate-map writes; each view (`course.views`) is what it writes.
// The form of `map:` (`holds` a line, `readers` among the four) is spec-yaml's, through the schema.
const fs = require('fs');
const path = require('path');
const { fail } = require('../lib/common');
const map = require('../lib/map');

const F = 'spec.yaml';
const isMap = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

function run(ctx) {
  const m = ctx.manifest;
  if (!m.doc || !isMap(m.doc.map)) return m.nothing('map');
  const out = [];
  const lines = m.text.split('\n');
  const mapLine = lines.findIndex((l) => /^map\s*:/.test(l)) + 1;
  const declared = m.roles();

  for (const r of declared) {
    if (!m.map(r.ref)) out.push(fail(F, mapLine, `map has no entry for ${r.ref} (${r.path})`));
    if (!fs.existsSync(path.join(ctx.root, r.path))) out.push(fail(F, mapLine, `${r.ref}: ${r.path} does not exist`));
  }
  const refs = new Set(declared.map((r) => r.ref));
  const entries = (prefix, v) => (isMap(v) ? Object.keys(v).map((k) => `${prefix}.${k}`) : []);
  const doc = m.doc.map;
  const named = [...entries('spec', doc.spec), ...entries('course', doc.course)];
  for (const p of Object.keys(isMap(doc.products) ? doc.products : {})) named.push(...entries(`products.${p}`, doc.products[p]));
  for (const ref of named) if (!refs.has(ref)) out.push(fail(F, mapLine, `map.${ref} names a role the manifest does not declare`));
  for (const p of Object.keys(isMap(doc.undeclared) ? doc.undeclared : {})) {
    if (m.products().includes(p)) out.push(fail(F, mapLine, `map.undeclared.${p}: the product ${p} is declared`));
  }

  const g = map.render(ctx.root, m);
  for (const e of g.errors) out.push(fail(F, mapLine, e));
  const cmd = map.command(ctx.root);
  const readmePath = m.path('spec', 'readme') || 'README.md';
  const readme = ctx.read(readmePath);
  const next = readme === null ? null : map.splice(readme, g.section);
  if (readme === null) out.push(fail(readmePath, 1, `${readmePath} is missing`));
  else if (next === null) out.push(fail(readmePath, 1, `${readmePath} has no section 2 (a heading "## 2. "), the map`));
  else if (next !== readme) out.push(fail(readmePath, map.at(readme), `section 2, the map, is not what generate-map writes from the manifest: run ${cmd}`));
  for (const v of g.views) {
    if (ctx.read(v.path) !== v.text) out.push(fail(v.path, 1, `${v.path}, a view of ${v.ref}, is not what generate-map writes: run ${cmd}`));
  }
  return out;
}

// the roles it reads, by their key in the manifest, which the map of a spec MAJOR shows (lib/map.js)
const reads = ['spec.manifest', 'spec.readme', 'course.views'];

module.exports = { id: 'map', run, reads };
