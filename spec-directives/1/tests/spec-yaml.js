'use strict';
// A test of the spec's own files, run by check-spec, which verifies no rule (decisions
// rules-with-level-and-method, alpha-version-until-tag): the declaration of the spec MAJOR,
// spec.yaml, held to its CHANGELOG.md.
//   - spec.yaml exists and is a map of exactly four keys: `name`, `major`, `directives`, `version`;
//   - `name` is a slug, `major` and `directives` are positive integers written as such (not `1.0`),
//     `version` is `MAJOR.MINOR.PATCH` with an optional `-alpha`, and the MAJOR of `version` is
//     `major`;
//   - `version` agrees with the first `## ` section of CHANGELOG.md: during the alpha (`version` is
//     `<MAJOR>.0.0-alpha`) that section is « Unreleased »; otherwise it names `version`
//     (`## 1.0.0`, a date after the version allowed); an `-alpha` on another version fails.
// Each failure names spec.yaml and the line of the key at fault. The test names no list of one
// spec: it verifies the model of a spec MAJOR, common to every spec.
const yaml = require('../lib/yaml-lines');
const { fail, SLUG } = require('../lib/course');

const F = 'spec.yaml';
const KEYS = ['name', 'major', 'directives', 'version'];
// SemVer 2.0.0 numbers (no leading zero), with the one prerelease the alpha allows
const VERSION = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-alpha)?$/;
const UNRELEASED = 'Unreleased';

// a positive integer written as one: YAML reads `1.0` as the number 1, so the literal is checked too
const positive = (spec, k) => Number.isInteger(spec[k]) && spec[k] > 0 && /^[1-9]\d*$/.test(yaml.sourceOf(spec, k) || '');

// the first `## ` heading of CHANGELOG.md outside a fenced block: { title, line } or null
function firstSection(text) {
  let fenced = false;
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) fenced = !fenced;
    else if (!fenced && /^## /.test(lines[i])) return { title: lines[i].slice(3).trim(), line: i + 1 };
  }
  return null;
}

// version against the changelog's first section; `at` is the line of `version` in spec.yaml
function changelog(ctx, version, m, at) {
  const text = ctx.read('CHANGELOG.md');
  if (text === null) return [fail(F, at, `version ${version}: CHANGELOG.md is missing, so nothing records it`)];
  const first = firstSection(text);
  if (!first) return [fail(F, at, `version ${version}: CHANGELOG.md has no "## " section`)];
  const where = `the first section of CHANGELOG.md (line ${first.line})`;
  if (version === `${m[1]}.0.0-alpha`) {
    return first.title === UNRELEASED ? []
      : [fail(F, at, `version ${version} is an alpha: ${where} must be « ${UNRELEASED} », not "${first.title}"`)];
  }
  if (m[4]) {
    return [fail(F, at, `version ${version}: an alpha is <MAJOR>.0.0-alpha only (${m[1]}.0.0-alpha)`)];
  }
  if (first.title === UNRELEASED) {
    return [fail(F, at, `version ${version} is not an alpha (${m[1]}.0.0-alpha): ${where} must name it, not « ${UNRELEASED} »`)];
  }
  const named = /^(\d+\.\d+\.\d+)(?:\s|$)/.exec(first.title);
  if (named && named[1] === version) return [];
  return [fail(F, at, `version ${version} differs from the version ${where} names: "${first.title}"`)];
}

// ctx: check-spec's (read and list relative to the spec folder)
function run(ctx) {
  const text = ctx.read(F);
  if (text === null) return [fail(F, 1, 'spec.yaml is missing: a spec MAJOR declares name, major, directives and version')];
  let spec;
  try { spec = yaml.parse(text); } catch (e) { return [fail(F, e.line || 1, e.message)]; }
  if (!spec || typeof spec !== 'object' || Array.isArray(spec)) return [fail(F, 1, 'spec.yaml is not a map')];

  const out = [];
  const at = (k) => yaml.lineOf(spec, k, 1);
  for (const k of KEYS) if (!(k in spec)) out.push(fail(F, 1, `missing key ${k}`));
  for (const k of Object.keys(spec)) {
    if (!KEYS.includes(k)) out.push(fail(F, at(k), `unknown key ${k} (the keys: ${KEYS.join(', ')})`));
  }
  if ('name' in spec && (typeof spec.name !== 'string' || !SLUG.test(spec.name))) {
    out.push(fail(F, at('name'), `name ${JSON.stringify(spec.name)} is not a slug (lowercase words joined by hyphens)`));
  }
  for (const k of ['major', 'directives']) {
    if (k in spec && !positive(spec, k)) out.push(fail(F, at(k), `${k} ${yaml.sourceOf(spec, k) || JSON.stringify(spec[k])} is not a positive integer`));
  }
  if (!('version' in spec)) return out;
  const version = spec.version;
  const m = typeof version === 'string' ? VERSION.exec(version) : null;
  if (!m) {
    out.push(fail(F, at('version'), `version ${JSON.stringify(version)} is not MAJOR.MINOR.PATCH with an optional -alpha`));
    return out;
  }
  if (positive(spec, 'major') && Number(m[1]) !== spec.major) {
    out.push(fail(F, at('version'), `the MAJOR of version ${version} is ${m[1]}, not major ${spec.major}`));
  }
  out.push(...changelog(ctx, version, m, at('version')));
  return out;
}

module.exports = { id: 'spec-yaml', run };
