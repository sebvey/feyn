'use strict';
// Every key of SPEC.md section 9 and every key PROTOCOL.md uses exists in the course language's pack.
const fs = require('fs');
const path = require('path');
const yaml = require('./lib/yaml');
const { fail } = require('./lib/course');

const KEYS = {
  headings: ['objective', 'essentials', 'stances', 'pitfalls', 'quick_test', 'instructions', 'storyline_facts', 'bank', 'drawing',
    'claims', 'references', 'unverified', 'problem', 'concept_thread', 'from_to', 'crossing_case', 'audience', 'onboarding', 'avoid', 'unreleased'],
  case_fields: ['usage', 'explanation', 'reserve', 'situation', 'question', 'expected_answer', 'common_mistakes', 'what_works'],
  markers: ['storyline', 'consensus', 'school', 'course'],
  references: ['concept', 'concepts', 'and'],
  source_types: ['primary', 'secondary', 'marketing'],
};
const LISTS = { typography: 'banned' };
// checks.anaphora is optional (SPEC.md section 9): a pack without it is consumable;
// domain-first-sentence-standalone, a quality check, reports its absence.


// The keys PROTOCOL.md uses: a row of its "Keys and parameters" tables (`| `group.key` | ...`; a value
// cell that opens on "list" is a list) or a `{group.key}` in a rule. Section 9's keys come first.
const PROTOCOL = path.join(__dirname, '..', 'PROTOCOL.md');
const NOT_PACK = new Set(['course', 'classroom', 'group']); // parameters, and the notation's own example

function protocolKeys() {
  const text = fs.readFileSync(PROTOCOL, 'utf8');
  const keys = new Map();
  for (const line of text.split('\n')) {
    const row = /^\| `([a-z_]+)\.([a-z_]+)` \| ([^|]*)\|/.exec(line);
    if (row && !NOT_PACK.has(row[1])) keys.set(row[1] + '.' + row[2], /^list\b/.test(row[3].trim()) ? 'list' : 'string');
  }
  for (const m of text.matchAll(/\{([a-z_]+)\.([a-z_]+)\}/g)) {
    if (!NOT_PACK.has(m[1]) && !keys.has(m[1] + '.' + m[2])) keys.set(m[1] + '.' + m[2], 'string');
  }
  return keys;
}

// group -> Map(key -> 'string' | 'list')
function required() {
  const need = new Map();
  const add = (group, key, kind) => {
    if (!need.has(group)) need.set(group, new Map());
    if (!need.get(group).has(key)) need.get(group).set(key, kind);
  };
  for (const [group, keys] of Object.entries(KEYS)) for (const k of keys) add(group, k, 'string');
  for (const [group, key] of Object.entries(LISTS)) add(group, key, 'list');
  for (const [full, kind] of protocolKeys()) {
    const [group, key] = full.split('.');
    add(group, key, LISTS[group] === key ? 'list' : kind);
  }
  return need;
}

function run(ctx) {
  if (!ctx.cy) return [fail('course.yaml', ctx.cyError.line, 'course.yaml is unusable: see course-yaml')];
  if (typeof ctx.cy.language !== 'string') return [fail('course.yaml', 1, 'no "language" field: the language pack cannot be found')];
  if (!ctx.packOk) return [fail(ctx.packFile, ctx.packError ? ctx.packError.line : 1, ctx.packError ? ctx.packError.message : 'language pack is not a map')];
  const f = ctx.packFile;
  const out = [];
  const pack = ctx.pack;
  for (const [group, keys] of required()) {
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

module.exports = { id: 'language-pack-keys', run, KEYS, protocolKeys };
