'use strict';
// A test of the spec's own files, run by check-spec, which verifies no rule (decisions
// conformity-of-the-course-and-products, spec-files-by-product): the composition of the teacher,
// products/teacher/composition.yaml, in its form, never its sense (the fresh tests judge that).
//   - products/teacher/composition.yaml exists and is a map whose key `parts` is a list of exactly five
//     parts, ids `permanent`, `on-demand`, `course-reads`, `learner-memory`, `permissions`, each once;
//   - a part has `loads`, one of the closed list below, and `draws`, a non-empty list;
//   - an entry of `draws` has `from`, one of the closed list below, `source` and `what`, non-empty
//     strings; a `from: spec` source is a file or folder the spec folder holds;
//   - the part `on-demand` has `moments`, a non-empty list; a moment has `id` and `when`, `rules` a
//     list (empty allowed) of strings, and `draws`, as a part's.
// The file is the one the manifest, spec.yaml, declares, `products.teacher.composition`
// (products/teacher/composition.yaml above): a manifest that does not declare it checks nothing. The closed
// lists are the composition model's, not one spec's: the five parts, when a part loads, where a
// source lives. A `from: spec` source is checked against the spec folder, so the test names no
// file of a spec.
const fs = require('fs');
const path = require('path');
const yaml = require('../lib/yaml-lines');
const { fail } = require('../lib/common');

let F = null; // the composition's path, from the manifest at each run
const PARTS = ['permanent', 'on-demand', 'course-reads', 'learner-memory', 'permissions'];
const LOADS = ['every-message', 'at-a-moment', 'during-the-session', 'at-start-and-save-points', 'always'];
const FROM = ['spec', 'course', 'learner', 'classroom'];

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const oneOf = (list) => list.map((v) => `"${v}"`).join(', ');

// a `from: spec` source names a file or a folder of the spec folder, inside it
function inSpec(ctx, source) {
  const p = path.resolve(ctx.root, source);
  if (p !== ctx.root && !p.startsWith(ctx.root + path.sep)) return false;
  try {
    const st = fs.statSync(p);
    return source.endsWith('/') ? st.isDirectory() : true;
  } catch (e) { return false; }
}

// the entries of a `draws` list; `owner` names the part or the moment, `at` its line
function draws(ctx, owner, list, at) {
  if (!Array.isArray(list) || !list.length) return [fail(F, at, `${owner}: draws is not a non-empty list`)];
  const out = [];
  list.forEach((d, i) => {
    const ln = yaml.lineOf(list, i, at);
    if (!isObj(d)) { out.push(fail(F, ln, `${owner}: draws entry ${i + 1} is not a map`)); return; }
    for (const k of ['from', 'source', 'what']) {
      if (!isStr(d[k])) out.push(fail(F, ln, `${owner}: draws entry ${i + 1} lacks ${k}`));
    }
    if (isStr(d.from) && !FROM.includes(d.from)) {
      out.push(fail(F, yaml.lineOf(d, 'from', ln), `${owner}: from "${d.from}" is not one of ${oneOf(FROM)}`));
    }
    if (d.from === 'spec' && isStr(d.source) && !inSpec(ctx, d.source)) {
      out.push(fail(F, yaml.lineOf(d, 'source', ln), `${owner}: spec source ${d.source} is not a file or folder of the spec folder`));
    }
  });
  return out;
}

function moments(ctx, part, at) {
  const list = part.moments;
  if (!Array.isArray(list) || !list.length) return [fail(F, at, 'part on-demand: moments is not a non-empty list')];
  const out = [];
  list.forEach((m, i) => {
    const ln = yaml.lineOf(list, i, at);
    if (!isObj(m)) { out.push(fail(F, ln, `on-demand: moment ${i + 1} is not a map`)); return; }
    const name = `moment ${isStr(m.id) ? m.id : i + 1}`;
    for (const k of ['id', 'when']) if (!isStr(m[k])) out.push(fail(F, ln, `${name} lacks ${k}`));
    if (!Array.isArray(m.rules) || !m.rules.every(isStr)) out.push(fail(F, yaml.lineOf(m, 'rules', ln), `${name}: rules is not a list of slugs`));
    out.push(...draws(ctx, name, m.draws, yaml.lineOf(m, 'draws', ln)));
  });
  return out;
}

// ctx: check-spec's (read and list relative to the spec folder)
function run(ctx) {
  const m = ctx.manifest;
  F = m.path('teacher', 'composition');
  if (F === null) return m.nothing(m.ref('teacher', 'composition'));
  const text = ctx.read(F);
  if (text === null) return [fail(F, 1, `${F} is missing: the composition of the teacher, its five parts`)];
  let doc;
  try { doc = yaml.parse(text); } catch (e) { return [fail(F, e.line || 1, e.message)]; }
  if (!isObj(doc) || !Array.isArray(doc.parts)) return [fail(F, 1, `${F} is not a map with a list parts`)];

  const out = [];
  const parts = doc.parts;
  const ids = parts.map((p) => (isObj(p) ? p.id : undefined));
  const missing = PARTS.filter((id) => !ids.includes(id));
  const extra = ids.filter((id, i) => !PARTS.includes(id) || ids.indexOf(id) !== i);
  if (parts.length !== PARTS.length || missing.length || extra.length) {
    const detail = [missing.length && `missing ${missing.join(', ')}`, extra.length && `extra or repeated ${extra.map(String).join(', ')}`].filter(Boolean).join('; ');
    out.push(fail(F, yaml.lineOf(doc, 'parts', 1), `not exactly five parts (${PARTS.join(', ')}): ${parts.length} found${detail ? '; ' + detail : ''}`));
  }
  parts.forEach((p, i) => {
    const ln = yaml.lineOf(parts, i, 1);
    if (!isObj(p)) { out.push(fail(F, ln, `part ${i + 1} is not a map`)); return; }
    const name = `part ${isStr(p.id) ? p.id : i + 1}`;
    if (!('loads' in p)) out.push(fail(F, ln, `${name} lacks loads`));
    else if (!LOADS.includes(p.loads)) out.push(fail(F, yaml.lineOf(p, 'loads', ln), `${name}: loads "${p.loads}" is not one of ${oneOf(LOADS)}`));
    if (!('draws' in p)) out.push(fail(F, ln, `${name} lacks draws`));
    else out.push(...draws(ctx, name, p.draws, yaml.lineOf(p, 'draws', ln)));
    if (p.id === 'on-demand') out.push(...moments(ctx, p, ln));
  });
  return out;
}

// the roles it reads, by their key in the manifest (README.md section 8)
const reads = ['products.teacher.composition'];
// the roles without which it checks nothing (m.nothing above)
const needs = ['products.teacher.composition'];

module.exports = { id: 'composition', run, reads, needs };
