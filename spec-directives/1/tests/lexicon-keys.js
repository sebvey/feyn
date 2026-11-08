'use strict';
// A test of the spec's own files, run by check-spec (not a rule: decision
// conformity-of-the-course-and-products, amended by #339): the lexicons of a spec MAJOR (decision
// lexicon-not-language-pack of linear-fr), those the manifest, spec.yaml, declares: the lexicon of
// the course files (`course.lexicon`, below course/lexicon.yaml), the site's
// (`products.site.lexicon`, products/site/lexicon.yaml) and the teacher's (`products.teacher.lexicon`,
// products/teacher/lexicon.yaml).
//   - each lexicon declared exists and is a map;
//   - the lexicon of the course files holds every key `lists.lexicons.course` of the manifest
//     lists, and the site's every key of `lists.lexicons.site`, each of its kind, a non-empty
//     string or a non-empty list of strings; a list of keys for a lexicon the manifest does not
//     declare fails;
//   - every key the protocol uses (below) is in the lexicon of the course files or the teacher's,
//     and a group lives in one of these two only: the teacher's part checks nothing when the
//     manifest does not declare the teacher's lexicon.
// A manifest that declares no lexicon checks nothing.
const yaml = require('../lib/yaml-lines');
const { fail } = require('../lib/common');

// The keys the protocol uses: a row of the « Clés et paramètres » tables of products/teacher/README.md
// (`products.teacher.readme`)
// (`| `group.key` | ...`; a value cell that opens on « liste » or "list" is a list), the one read of
// products/teacher/README.md left in the tests of check-spec for what the protocol holds (rule-slugs reads
// it only for the citations it makes), then a `{group.key}` in a `purpose`, a `text` or a `why` of
// products/teacher/rules.yaml. A file missing gives no key: rule-slugs reports it.
const NOT_LEXICON = new Set(['course', 'classroom', 'group']); // parameters, and the notation's own example

// readme: the text of products/teacher/README.md; texts: the purposes, texts and whys of products/teacher/rules.yaml
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

// the purposes, texts and whys of products/teacher/rules.yaml; none when it is missing or broken (rule-files
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
  const COURSE = m.path('course', 'lexicon');
  const SITE = m.path('site', 'lexicon');
  const TEACHER = m.path('teacher', 'lexicon');
  const declared = [COURSE, SITE, TEACHER].filter((f) => f !== null);
  if (!declared.length) return m.nothing(m.ref('course', 'lexicon'), m.ref('site', 'lexicon'), m.ref('teacher', 'lexicon'));

  const out = [];
  const files = {};
  for (const f of declared) {
    const text = ctx.read(f);
    if (text === null) { out.push(fail(f, 1, `${f} is missing: the manifest declares it`)); continue; }
    let lexicon;
    try { lexicon = yaml.parse(text); } catch (e) { out.push(fail(f, e.line || 1, e.message)); files[f] = {}; continue; }
    if (!isMap(lexicon)) { out.push(fail(f, 1, 'the lexicon is not a map')); files[f] = {}; continue; }
    files[f] = lexicon;
  }

  // the keys the manifest lists, in the lexicon of their owner
  const courseKeys = m.lexicon('course') || [];
  for (const [owner, f] of [['course', COURSE], ['site', SITE]]) {
    const need = m.lexicon(owner);
    if (need === null) continue;
    if (f === null) { out.push(fail(m.file, 1, `lists.lexicons.${owner} lists keys of a lexicon the manifest does not declare (${m.ref(owner, 'lexicon')})`)); continue; }
    if (files[f]) listed(out, f, files[f], need);
  }
  if (TEACHER === null) return out;

  // a group in one lexicon only, the course files' or the teacher's
  const course = COURSE === null ? null : files[COURSE];
  const teacher = files[TEACHER] || {};
  for (const group of Object.keys(teacher)) {
    if (course && group in course) out.push(fail(TEACHER, yaml.lineOf(teacher, group, 1), `group "${group}" is also in ${COURSE}: a group lives in one lexicon`));
  }

  // the keys the protocol uses, in either lexicon
  const readme = m.path('teacher', 'readme');
  const rules = m.path('teacher', 'rules');
  const kindOf = new Map(courseKeys.map(([g, k, kind]) => [`${g}.${k}`, kind]));
  const both = [TEACHER, COURSE].filter((f) => f !== null);
  for (const [full, kind0] of protocolKeys(readme === null ? null : ctx.read(readme), protocolTexts(rules === null ? null : ctx.read(rules)))) {
    const [group, key] = full.split('.');
    const kind = kindOf.get(full) || kind0;
    const f = both.find((x) => files[x] && isMap(files[x][group]));
    if (!f) {
      out.push(fail(TEACHER, 1, `group "${group}" is missing or is not a map (the protocol uses ${full}; in ${both.join(' or ')})`));
      continue;
    }
    if (f === COURSE && kindOf.has(full)) continue; // tested above
    const v = value(f, files[f], group, key, kind);
    if (v) out.push(v);
  }
  return out;
}

module.exports = { id: 'lexicon-keys', run, protocolKeys };
