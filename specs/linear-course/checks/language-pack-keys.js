'use strict';
// Every key of SPEC.md section 9 exists in the course language's pack.
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
const LISTS = { typography: 'banned', checks: 'anaphora' };

function run(ctx) {
  if (!ctx.cy) return [fail('course.yaml', ctx.cyError.line, 'course.yaml is unusable: see course-yaml')];
  if (typeof ctx.cy.language !== 'string') return [fail('course.yaml', 1, 'no "language" field: the language pack cannot be found')];
  if (!ctx.packOk) return [fail(ctx.packFile, ctx.packError ? ctx.packError.line : 1, ctx.packError ? ctx.packError.message : 'language pack is not a map')];
  const f = ctx.packFile;
  const out = [];
  const pack = ctx.pack;
  for (const [group, keys] of Object.entries(KEYS)) {
    const g = pack[group];
    if (!g || typeof g !== 'object' || Array.isArray(g)) {
      out.push(fail(f, 1, `group "${group}" is missing or is not a map`));
      continue;
    }
    for (const k of keys) {
      if (typeof g[k] !== 'string' || g[k].trim() === '') {
        out.push(fail(f, yaml.lineOf(g, k, yaml.lineOf(pack, group)), `missing key ${group}.${k} (a non-empty string)`));
      }
    }
  }
  for (const [group, key] of Object.entries(LISTS)) {
    const g = pack[group];
    const v = g && typeof g === 'object' ? g[key] : undefined;
    if (!Array.isArray(v) || v.length === 0 || v.some((x) => typeof x !== 'string' || x === '')) {
      out.push(fail(f, yaml.lineOf(g, key, yaml.lineOf(pack, group)), `missing key ${group}.${key} (a non-empty list of strings)`));
    }
  }
  return out;
}

module.exports = { id: 'language-pack-keys', run, KEYS };
