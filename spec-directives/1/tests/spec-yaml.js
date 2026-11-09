'use strict';
// A test of the spec's own files, run by check-spec (README.md section 4; decision
// alpha-version-until-tag): the manifest of the spec MAJOR, spec.yaml, held to its schema and to
// its CHANGELOG.md.
//   - spec.yaml exists and is valid against spec-directives/1/spec.schema.yaml (through
//     lib/manifest.js, under ajv's Ajv2020): its identity (`name` a slug, `major` and `directives`
//     positive integers, `version` `MAJOR.MINOR.PATCH` with an optional `-alpha`, `language` an
//     ISO 639-1 code), `spec:` (its own files, at their fixed paths), `course:` (each role one of
//     the schema's, mapped to a path), `products:` (each product by its name, its roles its own,
//     each mapped to a path), `lists:` (the optional `classifications` and `lexicons`, by owner),
//     `files:` (each entry its `holds` and its `readers`), no other key; each failure names the
//     key at fault;
//   - then what the schema cannot say: `major` and `directives` are written as integers (not
//     `1.0`), on a line of their own at the top level for `directives` and `language`, which the
//     builds read by a line pattern; the MAJOR of `version` is `major`;
//   - `name` ends with its language, `-<language>` (`linear-fr`), checked once `name` is a slug and
//     `language` a code: a course of another language follows another spec, whose name says so;
//   - `version` agrees with the first `## ` section of CHANGELOG.md: during the alpha (`version` is
//     `<MAJOR>.0.0-alpha`) that section is « Unreleased »; otherwise it names `version`
//     (`## 1.0.0`, a date after the version allowed); an `-alpha` on another version fails.
//   - when the manifest has a `files:` (it is optional): every role it declares has its entry there
//     and its path exists; an entry of `files:` names a role the manifest declares; a product of
//     `files.undeclared` is not declared.
// Each failure names spec.yaml and the line of the key at fault. The test names no list of one
// spec: it verifies the model of a spec MAJOR, common to every spec.
const fs = require('fs');
const path = require('path');
const yaml = require('../lib/yaml-lines');
const { fail, SLUG } = require('../lib/common');
const { FILE: F } = require('../lib/manifest');

const LANGUAGE = /^[a-z]{2}$/;
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

// `files:` against the roles the manifest declares; `at` is the line of `files:` in spec.yaml
function files(ctx, m, at) {
  const out = [];
  const declared = m.roles();
  for (const r of declared) {
    if (!m.entry(r.ref)) out.push(fail(F, at, `files has no entry for ${r.ref} (${r.path})`));
    if (!fs.existsSync(path.join(ctx.root, r.path))) out.push(fail(F, at, `${r.ref}: ${r.path} does not exist`));
  }
  const refs = new Set(declared.map((r) => r.ref));
  const isMap = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
  const entries = (prefix, v) => (isMap(v) ? Object.keys(v).map((k) => `${prefix}.${k}`) : []);
  const doc = m.doc.files;
  const named = [...entries('spec', doc.spec), ...entries('course', doc.course)];
  for (const p of Object.keys(isMap(doc.products) ? doc.products : {})) named.push(...entries(`products.${p}`, doc.products[p]));
  for (const ref of named) if (!refs.has(ref)) out.push(fail(F, at, `files.${ref} names a role the manifest does not declare`));
  for (const p of Object.keys(isMap(doc.undeclared) ? doc.undeclared : {})) {
    if (m.products().includes(p)) out.push(fail(F, at, `files.undeclared.${p}: the product ${p} is declared`));
  }
  return out;
}

// ctx: check-spec's (read and list relative to the spec folder; its manifest, read from spec.yaml)
function run(ctx) {
  const m = ctx.manifest;
  if (!m.doc) {
    if (m.text === null) return [fail(F, 1, 'spec.yaml is missing: a spec MAJOR declares its identity, its course, its products and its lists')];
    return [fail(F, m.error.line, m.error.message)];
  }
  const spec = m.doc;
  const out = m.validate().map((e) => fail(F, e.line, e.message));
  const at = (k) => yaml.lineOf(spec, k, 1);
  for (const k of ['major', 'directives']) {
    if (Number.isInteger(spec[k]) && spec[k] > 0 && !positive(spec, k)) out.push(fail(F, at(k), `${k} ${yaml.sourceOf(spec, k)} is not written as a positive integer`));
  }
  // the line the builds read: `<key>: <value>` at the top level, the value on the key's line
  for (const k of ['directives', 'language']) {
    if (k in spec && !new RegExp(`^${k}\\s*:\\s*['"]?[^\\s#'"]`).test(m.line(k))) {
      out.push(fail(F, at(k), `${k} is not written on its own line, "${k}: <value>": the builds read it by that line`));
    }
  }
  // the language test: a name or a language the schema refuses is not held to it
  const slug = typeof spec.name === 'string' && SLUG.test(spec.name);
  const code = typeof spec.language === 'string' && LANGUAGE.test(spec.language);
  if (slug && code && !spec.name.endsWith(`-${spec.language}`)) {
    out.push(fail(F, at('name'), `name ${spec.name} does not end with its language: -${spec.language} (language ${spec.language})`));
  }
  if (spec.files !== null && typeof spec.files === 'object' && !Array.isArray(spec.files)) out.push(...files(ctx, m, at('files')));
  if (!('version' in spec)) return out;
  const version = spec.version;
  const v = typeof version === 'string' ? VERSION.exec(version) : null;
  if (!v) return out; // the schema's failure
  if (positive(spec, 'major') && Number(v[1]) !== spec.major) {
    out.push(fail(F, at('version'), `the MAJOR of version ${version} is ${v[1]}, not major ${spec.major}`));
  }
  out.push(...changelog(ctx, version, v, at('version')));
  return out;
}

// the roles it reads, by their key in the manifest (README.md section 4)
const reads = ['spec.manifest', 'spec.changelog'];

module.exports = { id: 'spec-yaml', run, reads };
