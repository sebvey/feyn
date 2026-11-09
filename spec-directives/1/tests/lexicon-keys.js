'use strict';
// A test of the spec's own files, run by check-spec (README.md section 4): the lexicons of a spec
// MAJOR (decision lexicon-not-language-pack of linear-fr), those the manifest, spec.yaml, declares:
// the role `lexicon` of the course (`course.lexicon`) and of each product
// (`products.<name>.lexicon`).
//   - each lexicon declared exists and is a map;
//   - the lexicon of each owner, the course or a product, holds every key `lists.lexicons.<owner>`
//     of the manifest lists, each of its kind, a non-empty string or a non-empty list of strings;
//     a list of keys for a lexicon the manifest does not declare fails;
//   - the table of the course lexicon in the course's README (`course.readme`) lists, group by
//     group, the keys `lists.lexicons.course` lists, no more and no less: the README gives each
//     key its meaning, the manifest gives it to the tests, and this holds the two copies together
//     (#750); a manifest that declares no `course.readme` leaves this part unchecked.
// A manifest that declares no lexicon checks nothing.
const yaml = require('../lib/yaml-lines');
const { fail } = require('../lib/common');

const isMap = (v) => !!v && typeof v === 'object' && !Array.isArray(v);

// The keys of the table of the course lexicon in the course's README, by group: a row whose first
// cell is a group of `lists.lexicons.course` as a code span (`| `headings` | ... |`), and in its
// second cell each code span right after the start of the cell, a comma or a semicolon, followed
// by « (its value) or by a colon (`typography`: `banned` :). The form is the table's, no word of the
// README's language is read, so it holds for a spec of any language.
// text: the README; groups: the groups of the manifest -> Map(group -> { line, keys: Map(key -> line) })
function readmeKeys(text, groups) {
  const rows = new Map();
  text.split('\n').forEach((l, i) => {
    const row = /^\|\s*`([a-z_]+)`\s*\|([^|]*)\|/.exec(l);
    if (!row || !groups.has(row[1])) return;
    const r = rows.get(row[1]) || { line: i + 1, keys: new Map() };
    for (const k of row[2].matchAll(/(?:^|[,;])\s*`([a-z_]+)`\s*(?:«|:)/g)) if (!r.keys.has(k[1])) r.keys.set(k[1], i + 1);
    rows.set(row[1], r);
  });
  return rows;
}

// the keys of the README's table against `lists.lexicons.course`, group by group
function readmeAgrees(out, f, text, need, file) {
  const want = new Map();
  for (const [group, key] of need) (want.get(group) || want.set(group, new Set()).get(group)).add(key);
  const rows = readmeKeys(text, new Set(want.keys()));
  for (const [group, keys] of want) {
    const row = rows.get(group);
    if (!row) { out.push(fail(f, 1, `group "${group}" of lists.lexicons.course (${file}) has no row in the table of the course lexicon`)); continue; }
    for (const key of keys) {
      if (!row.keys.has(key)) out.push(fail(f, row.line, `key ${group}.${key} of lists.lexicons.course (${file}) is missing from the table of the course lexicon`));
    }
    for (const [key, line] of row.keys) {
      if (!keys.has(key)) out.push(fail(f, line, `key ${group}.${key} of the table of the course lexicon is not in lists.lexicons.course (${file})`));
    }
  }
}

// a value of the kind: a non-empty string, or a non-empty list of strings; a failure or null
function value(f, lexicon, group, key, kind) {
  const g = lexicon[group];
  const v = g[key];
  const line = yaml.lineOf(g, key, yaml.lineOf(lexicon, group));
  if (kind === 'list') {
    if (!Array.isArray(v) || v.length === 0 || v.some((x) => typeof x !== 'string' || x === '')) {
      return fail(f, line, `missing key ${group}.${key} (a non-empty list of strings)`);
    }
  } else if (typeof v !== 'string' || v.trim() === '') {
    return fail(f, line, `missing key ${group}.${key} (a non-empty string)`);
  }
  return null;
}

// the keys of a lexicon against the list the manifest gives for it: [[group, key, kind], ...]
function listed(out, f, lexicon, need) {
  const missing = new Set();
  for (const [group, key, kind] of need) {
    if (!isMap(lexicon[group])) {
      if (!missing.has(group)) out.push(fail(f, 1, `group "${group}" is missing or is not a map`));
      missing.add(group);
      continue;
    }
    const v = value(f, lexicon, group, key, kind);
    if (v) out.push(v);
  }
}

// ctx: check-spec's (read and list relative to the spec folder; its manifest, read from spec.yaml)
function run(ctx) {
  const m = ctx.manifest;
  const declared = m.owned('lexicon');
  if (!declared.length) return m.nothing(`${m.ref('course', 'lexicon')} or products.<name>.lexicon`);

  const out = [];
  const files = {};
  for (const { path: f } of declared) {
    const text = ctx.read(f);
    if (text === null) { out.push(fail(f, 1, `${f} is missing: the manifest declares it`)); continue; }
    let lexicon;
    try { lexicon = yaml.parse(text); } catch (e) { out.push(fail(f, e.line || 1, e.message)); files[f] = {}; continue; }
    if (!isMap(lexicon)) { out.push(fail(f, 1, 'the lexicon is not a map')); files[f] = {}; continue; }
    files[f] = lexicon;
  }

  // the keys the manifest lists, in the lexicon of their owner
  for (const owner of m.lexiconOwners()) {
    const need = m.lexicon(owner);
    if (need === null) continue;
    const f = m.path(owner, 'lexicon');
    if (f === null) { out.push(fail(m.file, 1, `lists.lexicons.${owner} lists keys of a lexicon the manifest does not declare (${m.ref(owner, 'lexicon')})`)); continue; }
    if (files[f]) listed(out, f, files[f], need);
  }

  // the table of the course lexicon in the course's README, against the same list
  const README = m.path('course', 'readme');
  if (README !== null && m.lexicon('course') !== null) {
    const text = ctx.read(README);
    if (text === null) out.push(fail(README, 1, `${README} is missing: the manifest declares it`));
    else readmeAgrees(out, README, text, m.lexicon('course'), m.file);
  }
  return out;
}

// the roles it reads, by their key in the manifest (README.md section 4)
const reads = ['course.lexicon', 'course.readme', 'products.<name>.lexicon'];
module.exports = { id: 'lexicon-keys', run, reads };
