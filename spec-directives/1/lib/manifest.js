'use strict';
// The manifest of a spec MAJOR, its spec.yaml (README.md section 1), read once for every test of
// check-spec and for any program of the directives that needs the files or the lists of a spec:
// none of them parses spec.yaml its own way. Its form is spec.schema.yaml, beside lib/: the
// identity (name, major, directives, version, language), then `spec:` (the MAJOR's own files),
// `course:` and `products:` (each product by its name), each role mapped to one path relative to
// the spec MAJOR, then `lists:`, then `files:` (what each role holds and who reads it).
//   read(text)      the manifest of a spec.yaml's text (null when the file is missing): a reader
//                   that never throws; a manifest it cannot read declares nothing
//   m.path(owner, role)   the path of a role, `spec`, `course` or a product's name as owner; null
//                         when the manifest does not declare it
//   m.roles()             every role declared, in the manifest's order: [{ owner, role, ref, path }],
//                         `ref` its dotted key (`spec.readme`, `course.rules`, `products.site.build`)
//   m.products()          the products declared, by name, in the manifest's order
//   m.owners()            `course`, then the products: the owners of a rule file or a lexicon
//   m.owned(role)         the role of that name of each owner that declares it, in that order:
//                         [{ owner, role, ref, path }] (`rules`: the rule files)
//   m.entry(ref)          the entry of `files:` for a role's ref ({ holds, readers }), null when none
//   m.classifications(owner)  the classifications of `lists.classifications.<owner>`, the
//                         rules of that owner's rule file: { key: [values] }, null when undeclared
//   m.classified()        the owners `lists.classifications` names, in its order
//   m.lexicon(owner)      the keys of `lists.lexicons.<owner>`, [[group, key, kind], ...], null
//                         when undeclared
//   m.lexiconOwners()     the owners `lists.lexicons` names, in its order
//   m.nothing(...refs)    the result of a test that checks nothing for want of the declared roles
//                         it names (`course.rules`): check-spec prints its reason
//   m.line(key)           the source line of a top-level key, for what a line pattern reads
//   m.validate()          the failures of the manifest against spec.schema.yaml: [{ line, message }],
//                         each naming the key at fault, for spec-yaml
// The reader takes what it can from a manifest the schema refuses (a role whose value is not a
// string is undeclared); spec-yaml says what is wrong with it.
const path = require('path');
const yaml = require('./yaml-lines');

const FILE = 'spec.yaml';
const SCHEMA = path.join(__dirname, '..', 'spec.schema.yaml');

const isMap = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// a JSON pointer of an ajv error as the dotted key of the manifest (`/course/rules` -> course.rules)
const dotted = (pointer) => pointer.split('/').slice(1).map((s) => s.replace(/~1/g, '/').replace(/~0/g, '~')).join('.');

function describe(error) {
  const at = dotted(error.instancePath);
  const key = (k) => (at ? `${at}.${k}` : k);
  const p = error.params || {};
  if (error.keyword === 'required') return `missing key ${key(p.missingProperty)}`;
  if (error.keyword === 'additionalProperties') return `unknown key ${key(p.additionalProperty)}`;
  if (error.keyword === 'propertyNames') {
    const names = error.parentSchema && error.parentSchema.propertyNames;
    return `${key(p.propertyName)}: the key is not ${(names && names.description) || 'a slug'}`;
  }
  const what = error.parentSchema && error.parentSchema.description;
  if (what && ['type', 'pattern', 'minimum', 'enum', 'const', 'minItems', 'uniqueItems'].includes(error.keyword)) {
    return `${at} ${JSON.stringify(error.data)} is not ${what}`;
  }
  return `${at || 'the manifest'} ${error.message}`;
}
// an error inside propertyNames repeats the one of propertyNames itself, which names the key
const inner = (error) => /\/propertyNames\//.test(error.schemaPath);

let compiled = null;
function validator() {
  if (!compiled) {
    const Ajv2020 = require('ajv/dist/2020').default;
    const fs = require('fs');
    compiled = new Ajv2020({ allErrors: true, verbose: true, logger: false }).compile(yaml.parse(fs.readFileSync(SCHEMA, 'utf8')));
  }
  return compiled;
}

function read(text) {
  let doc = null;
  let error = null;
  if (text === null || text === undefined) error = { line: 1, message: `${FILE} is missing` };
  else {
    try { doc = yaml.parse(text); } catch (e) { error = { line: e.line || 1, message: e.message }; }
    if (!error && !isMap(doc)) { error = { line: 1, message: `${FILE} is not a map` }; doc = null; }
  }
  const section = (owner) => {
    if (!doc) return null;
    const s = owner === 'course' || owner === 'spec' ? doc[owner] : (isMap(doc.products) ? doc.products[owner] : null);
    return isMap(s) ? s : null;
  };
  // a product named course or spec, which the schema refuses, is not one
  const products = () => (doc && isMap(doc.products) ? Object.keys(doc.products).filter((p) => isMap(doc.products[p]) && p !== 'course' && p !== 'spec') : []);
  const lists = () => (doc && isMap(doc.lists) ? doc.lists : {});
  const ref = (owner, role) => (owner === 'course' || owner === 'spec' ? `${owner}.${role}` : `products.${owner}.${role}`);
  const path_ = (owner, role) => {
    const s = section(owner);
    const v = s ? s[role] : null;
    return typeof v === 'string' && v.trim() !== '' ? v.replace(/\/+$/, '') : null;
  };

  return {
    file: FILE,
    text: text === undefined ? null : text,
    doc,
    error,
    // the source line of a top-level key (its line number at), '' when it has none
    line(key) {
      if (!doc || !(key in doc)) return '';
      return text.split('\n')[yaml.lineOf(doc, key, 1) - 1] || '';
    },
    path: path_,
    roles() {
      const out = [];
      for (const owner of ['spec', 'course', ...products()]) {
        for (const role of Object.keys(section(owner) || {})) {
          const p = path_(owner, role);
          if (p !== null) out.push({ owner, role, ref: ref(owner, role), path: p });
        }
      }
      return out;
    },
    products,
    entry(r) {
      if (!doc || !isMap(doc.files)) return null;
      let v = doc.files;
      for (const k of r.split('.')) v = isMap(v) ? v[k] : null;
      return isMap(v) && typeof v.holds === 'string' && Array.isArray(v.readers) ? { holds: v.holds, readers: v.readers.slice() } : null;
    },
    owners: () => ['course', ...products()],
    owned(role) {
      return ['course', ...products()].map((owner) => ({ owner, role, ref: ref(owner, role), path: path_(owner, role) })).filter((r) => r.path !== null);
    },
    classifications(owner) {
      const all = lists().classifications;
      const keys = isMap(all) ? all[owner] : null;
      if (!isMap(keys)) return null;
      const out = {};
      for (const [key, values] of Object.entries(keys)) {
        if (Array.isArray(values) && values.every((x) => typeof x === 'string')) out[key] = values.slice();
      }
      return out;
    },
    classified() {
      const all = lists().classifications;
      return isMap(all) ? Object.keys(all) : [];
    },
    lexicon(owner) {
      const all = lists().lexicons;
      const groups = isMap(all) ? all[owner] : null;
      if (!isMap(groups)) return null;
      const keys = [];
      for (const [group, ks] of Object.entries(groups)) {
        if (!isMap(ks)) continue;
        for (const [key, kind] of Object.entries(ks)) keys.push([group, key, kind === 'list' ? 'list' : 'string']);
      }
      return keys;
    },
    lexiconOwners() {
      const all = lists().lexicons;
      return isMap(all) ? Object.keys(all) : [];
    },
    ref,
    nothing(...refs) {
      const why = doc ? `${FILE} declares no ${refs.join(', no ')}` : `${FILE} is unusable, so it declares no file (spec-yaml says why)`;
      return { nothing: why };
    },
    validate() {
      if (!doc) return [error];
      const validate = validator();
      if (validate(doc)) return [];
      const seen = new Set();
      return validate.errors.filter((e) => !inner(e)).map((e) => ({ line: yaml.lineOfError(doc, e, 1), message: describe(e) }))
        .filter((f) => !seen.has(f.line + ' ' + f.message) && seen.add(f.line + ' ' + f.message));
    },
  };
}

module.exports = { FILE, SCHEMA, read };
