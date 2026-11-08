'use strict';
// A test of the spec's own files, run by check-spec (not a rule: decision
// conformity-of-the-course-and-products, amended by #339): the course and teacher lexicons of a spec MAJOR (decision
// lexicon-not-language-pack of linear-fr). course/lexicon.yaml, the lexicon of the course
// files, holds every key of course/README.md section 7; every key the protocol uses is in one of
// the two lexicons, course/lexicon.yaml or teacher/lexicon.yaml; a group lives in one of
// them only. A spec folder with neither lexicon has none to test.
// The keys of section 7 below are those of linear-fr, a named debt: idea #485.
const yaml = require('../lib/yaml-lines');
const { fail } = require('../lib/course');

const COURSE = 'course/lexicon.yaml';
const TEACHER = 'teacher/lexicon.yaml';

const KEYS = {
  headings: ['essentials', 'stances', 'deepening', 'landmarks', 'instruction', 'foot',
    'claims', 'references', 'unverified', 'problem', 'crossing_case', 'audience', 'onboarding', 'progression', 'fixed_facts', 'avoid', 'unreleased'],
  block_kinds: ['concept', 'annex', 'section', 'unit', 'case', 'separator'],
  unit_fields: ['matter', 'misconceptions', 'root', 'correction', 'anchor', 'question', 'expected_answer', 'misconceptions_in_play', 'instruction'],
  unit_blocks: ['lesson', 'cases'],
  markers: ['consensus', 'school', 'course'],
  natures: ['fact'],
  concept_refs: ['concept', 'concepts', 'and', 'annex'],
  source_types: ['primary', 'secondary', 'marketing'],
};
const LISTS = { typography: 'banned' };

// The keys the protocol uses: a row of the « Clés et paramètres » tables of teacher/README.md
// (`| `group.key` | ...`; a value cell that opens on « liste » or "list" is a list), the one read of
// teacher/README.md left in the tests of check-spec for what the protocol holds (rule-slugs reads
// it only for the citations it makes), then a `{group.key}` in a `purpose`, a `text` or a `why` of
// teacher/rules.yaml. A file missing gives no key: rule-slugs reports it.
const NOT_LEXICON = new Set(['course', 'classroom', 'group']); // parameters, and the notation's own example

// readme: the text of teacher/README.md; texts: the purposes, texts and whys of teacher/rules.yaml
function protocolKeys(readme, texts) {
  const keys = new Map();
  for (const line of (readme || '').split('\n')) {
    const row = /^\| `([a-z_]+)\.([a-z_]+)` \| ([^|]*)\|/.exec(line);
    if (row && !NOT_LEXICON.has(row[1])) keys.set(row[1] + '.' + row[2], /^liste?\b/.test(row[3].trim()) ? 'list' : 'string');
  }
  for (const t of texts || []) {
    for (const m of t.matchAll(/\{([a-z_]+)\.([a-z_]+)\}/g)) {
      if (!NOT_LEXICON.has(m[1]) && !keys.has(m[1] + '.' + m[2])) keys.set(m[1] + '.' + m[2], 'string');
    }
  }
  return keys;
}

// the purposes, texts and whys of teacher/rules.yaml; none when it is missing or broken (rule-files
// and rule-slugs report it)
function protocolTexts(raw) {
  if (raw === null) return [];
  let doc;
  try { doc = yaml.parse(raw); } catch (e) { return []; }
  const texts = [];
  for (const g of (isMap(doc) && Array.isArray(doc.groups) ? doc.groups : [])) {
    if (!isMap(g)) continue;
    if (typeof g.purpose === 'string') texts.push(g.purpose);
    for (const r of (Array.isArray(g.rules) ? g.rules : [])) {
      if (!isMap(r)) continue;
      for (const k of ['text', 'why']) if (typeof r[k] === 'string') texts.push(r[k]);
    }
  }
  return texts;
}

const isMap = (v) => !!v && typeof v === 'object' && !Array.isArray(v);

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

// ctx: check-spec's (read and list relative to the spec folder)
function run(ctx) {
  const out = [];
  const files = {};
  for (const f of [COURSE, TEACHER]) {
    const text = ctx.read(f);
    if (text === null) continue;
    let lexicon;
    try { lexicon = yaml.parse(text); } catch (e) { out.push(fail(f, e.line || 1, e.message)); files[f] = {}; continue; }
    if (!isMap(lexicon)) { out.push(fail(f, 1, 'the lexicon is not a map')); files[f] = {}; continue; }
    files[f] = lexicon;
  }
  if (!Object.keys(files).length) return out;

  // the keys of course/README.md section 7, in the lexicon of the course files
  const course = files[COURSE];
  if (!course) out.push(fail(COURSE, 1, `${COURSE} is missing: it holds the keys of course/README.md section 7`));
  else {
    const need = [...Object.entries(KEYS).flatMap(([g, ks]) => ks.map((k) => [g, k, 'string'])), ...Object.entries(LISTS).map(([g, k]) => [g, k, 'list'])];
    const missing = new Set();
    for (const [group, key, kind] of need) {
      if (!isMap(course[group])) {
        if (!missing.has(group)) out.push(fail(COURSE, 1, `group "${group}" is missing or is not a map`));
        missing.add(group);
        continue;
      }
      const f = value(COURSE, course, group, key, kind);
      if (f) out.push(f);
    }
  }

  // a group in one lexicon only
  const teacher = files[TEACHER] || {};
  for (const group of Object.keys(teacher)) {
    if (course && group in course) out.push(fail(TEACHER, yaml.lineOf(teacher, group, 1), `group "${group}" is also in ${COURSE}: a group lives in one lexicon`));
  }

  // the keys the protocol uses, in either lexicon
  for (const [full, kind0] of protocolKeys(ctx.read('teacher/README.md'), protocolTexts(ctx.read('teacher/rules.yaml')))) {
    const [group, key] = full.split('.');
    const kind = LISTS[group] === key ? 'list' : kind0;
    const f = [TEACHER, COURSE].find((x) => files[x] && isMap(files[x][group]));
    if (!f) {
      out.push(fail(TEACHER, 1, `group "${group}" is missing or is not a map (the protocol uses ${full}; in ${TEACHER} or ${COURSE})`));
      continue;
    }
    if (f === COURSE && ((KEYS[group] || []).includes(key) || LISTS[group] === key)) continue; // tested above
    const v = value(f, files[f], group, key, kind);
    if (v) out.push(v);
  }
  return out;
}

module.exports = { id: 'lexicon-keys', run, KEYS, protocolKeys };
