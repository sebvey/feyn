'use strict';
// A test of the spec's own files, run by check-spec (not a rule: decision
// rules-with-level-and-method, amended by #339): every language pack of lang/ holds every key of
// COURSE.md section 7 and every key PROTOCOL.md uses. A spec folder with no pack has none to test.
const yaml = require('./lib/yaml-lines');
const { fail } = require('./lib/course');

const KEYS = {
  headings: ['objective', 'essentials', 'stances', 'pitfalls', 'quick_test', 'deepening', 'instructions', 'storyline_facts', 'bank', 'drawing',
    'claims', 'references', 'unverified', 'problem', 'concept_thread', 'from_to', 'crossing_case', 'audience', 'onboarding', 'avoid', 'unreleased'],
  case_fields: ['usage', 'explanation', 'situation', 'question', 'expected_answer', 'common_mistakes', 'what_works'],
  qualifiers: ['fallback', 'practice', 'aside'],
  markers: ['storyline', 'consensus', 'school', 'course'],
  natures: ['fact'],
  concept_refs: ['concept', 'concepts', 'and', 'annex'],
  source_types: ['primary', 'secondary', 'marketing'],
};
const LISTS = { typography: 'banned' };
// checks.anaphora is optional (COURSE.md section 7): a pack without it is consumable;
// domain-first-sentence-standalone, a reporting check of a course, reports its absence.


// The keys PROTOCOL.md uses: a row of its "Keys and parameters" tables (`| `group.key` | ...`; a value
// cell that opens on "list" is a list) or a `{group.key}` in a rule. Section 9's keys come first.
// PROTOCOL.md missing gives no key: that is rule-slugs' failure.
const NOT_PACK = new Set(['course', 'classroom', 'group']); // parameters, and the notation's own example

function protocolKeys(text) {
  const keys = new Map();
  for (const line of (text || '').split('\n')) {
    const row = /^\| `([a-z_]+)\.([a-z_]+)` \| ([^|]*)\|/.exec(line);
    if (row && !NOT_PACK.has(row[1])) keys.set(row[1] + '.' + row[2], /^list\b/.test(row[3].trim()) ? 'list' : 'string');
  }
  for (const m of (text || '').matchAll(/\{([a-z_]+)\.([a-z_]+)\}/g)) {
    if (!NOT_PACK.has(m[1]) && !keys.has(m[1] + '.' + m[2])) keys.set(m[1] + '.' + m[2], 'string');
  }
  return keys;
}

// group -> Map(key -> 'string' | 'list')
function required(protocol) {
  const need = new Map();
  const add = (group, key, kind) => {
    if (!need.has(group)) need.set(group, new Map());
    if (!need.get(group).has(key)) need.get(group).set(key, kind);
  };
  for (const [group, keys] of Object.entries(KEYS)) for (const k of keys) add(group, k, 'string');
  for (const [group, key] of Object.entries(LISTS)) add(group, key, 'list');
  for (const [full, kind] of protocolKeys(protocol)) {
    const [group, key] = full.split('.');
    add(group, key, LISTS[group] === key ? 'list' : kind);
  }
  return need;
}

function checkPack(f, pack, need) {
  const out = [];
  for (const [group, keys] of need) {
    const g = pack[group];
    if (!g || typeof g !== 'object' || Array.isArray(g)) {
      out.push(fail(f, 1, `group "${group}" is missing or is not a map`));
      continue;
    }
    for (const [k, kind] of keys) {
      const v = g[k];
      const line = yaml.lineOf(g, k, yaml.lineOf(pack, group));
      if (kind === 'list') {
        if (!Array.isArray(v) || v.length === 0 || v.some((x) => typeof x !== 'string' || x === '')) {
          out.push(fail(f, line, `missing key ${group}.${k} (a non-empty list of strings)`));
        }
      } else if (typeof v !== 'string' || v.trim() === '') {
        out.push(fail(f, line, `missing key ${group}.${k} (a non-empty string)`));
      }
    }
  }
  return out;
}

// ctx: check-spec's (read and list relative to the spec folder)
function run(ctx) {
  const need = required(ctx.read('PROTOCOL.md'));
  const out = [];
  for (const name of ctx.list('lang').filter((n) => n.endsWith('.yaml')).sort()) {
    const f = `lang/${name}`;
    let pack;
    try { pack = yaml.parse(ctx.read(f)); } catch (e) { out.push(fail(f, e.line || 1, e.message)); continue; }
    if (!pack || typeof pack !== 'object' || Array.isArray(pack)) { out.push(fail(f, 1, 'language pack is not a map')); continue; }
    out.push(...checkPack(f, pack, need));
  }
  return out;
}

module.exports = { id: 'language-pack-keys', run, KEYS, protocolKeys };
