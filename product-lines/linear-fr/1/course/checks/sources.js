'use strict';
// The claims of a course and their sources, their coherence (course/README.md section 3.4): the
// claim marks of each concept.md, read by the reader of this MAJOR (course/claims.js) in the published
// fields that state claims (`claims` of course/form.yaml); the claim marks of the other course
// Markdown files (the domain files, plan.md, storyline.md, glossary.md; not CHANGELOG.md), where
// none belongs; and `sources.yaml` at the root of the course, validated against
// course/schemas/sources.schema.yaml through Ajv2020. It fails what is incoherent: a malformed claim
// mark, a claim mark outside those fields or in a course file other than a concept file, a concept reference in the
// text of a claim mark; a consensus, school or fact claim mark with no source; a sourced claim with no name, or a name
// twice in its concept; an unknown source id; a pair (claim, source) with no quote; a quote whose
// claim cites not its source; a kind, a control or an independence off its lexicon list; a school
// claim with no holder, a fact or course claim with one, a holder for no claim. What is missing
// without being incoherent (a source never cited, what no human has checked) is sources-coverage's;
// an unmarked sentence is the review's. Its messages are French, the language of the spec.
const fs = require('fs');
const path = require('path');
const directives = require('./directives');
const yaml = directives.lib('yaml-lines');
const { fail } = directives.lib('common');
// the claim marks and the concept references are read by the readers of this MAJOR, given the directives' lib
const claims = require('../claims')(directives.lib);
const { parser: refParser } = require('../refs')(directives.lib);

const MAJOR = path.resolve(__dirname, '..', '..');
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const short = (s) => (s.length > 50 ? s.slice(0, 50) + '…' : s).replace(/\s+/g, ' ');

// the schema of sources.yaml, compiled once; its path is the form's
let validate = null;
function schema(form) {
  if (!validate) {
    const Ajv2020 = directives.require('ajv/dist/2020').default;
    const file = path.join(MAJOR, form.sources_file.schema);
    validate = new Ajv2020({ allErrors: true, logger: false }).compile(yaml.parse(fs.readFileSync(file, 'utf8')));
  }
  return validate;
}

// the closed lists of a source, by its key in sources.yaml, from the lexicon
const LISTS = { kind: 'source_kinds', control: 'source_controls', independence: 'source_independence' };

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.lexiconOk) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon is unusable: see course/README.md section 7')];
  if (!ctx.form || !ctx.form.claims || !ctx.form.sources_file) return [fail('course/form.yaml', 1, `tooling error, not a defect of the course: the spec's form is missing or unreadable (${ctx.formError || 'no claims or sources_file'})`)];
  const read = claims.reader(ctx);
  if (!read) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon has no group natures (consensus, school, fact, course): see course/README.md section 7')];
  const N = (k) => ctx.word('natures', k);
  const H = (k) => ctx.word('headings', k) || ctx.word('unit_fields', k) || k;
  const course = claims.ofCourse(ctx, read);
  const sf = course.file;
  const data = isObj(course.data) ? course.data : null;
  const sources = data && isObj(data.sources) ? data.sources : {};
  const holders = data && isObj(data.claims) ? data.claims : {};
  const selected = new Set(ctx.selected().map((c) => c.number));
  const refs = refParser(ctx);
  const out = [];
  const places = [
    ...(ctx.form.claims.head ? [ctx.form.concept_file.head.heading] : []),
    ...(ctx.form.claims.unit_fields || []),
    ...(ctx.form.claims.misconception_parts || []),
    ...(ctx.form.claims.foot_blocks || []),
  ].map((k) => `« ${H(k)} »`).join(', ');

  // sources.yaml: readable, valid against its schema, its closed values from the lexicon
  if (course.error) out.push(fail(sf, course.error.line, `${sf} n'est pas du YAML lisible : ${course.error.message}`));
  else if (course.text !== null) {
    const v = schema(ctx.form);
    if (!v(course.data)) {
      for (const e of v.errors) out.push(fail(sf, yaml.lineOfError(course.data, e), `${sf} n'est pas valide selon ${ctx.form.sources_file.schema} : ${e.instancePath || '/'} ${e.message}${e.params && e.params.additionalProperty ? ` (« ${e.params.additionalProperty} »)` : ''}`));
    }
    const seen = new Map(); // `URL <url>` or `DOI <doi>` -> source id
    for (const [id, s] of Object.entries(sources)) {
      if (!isObj(s)) continue;
      for (const key of ['URL', 'DOI']) {
        if (typeof s[key] !== 'string') continue;
        const at = `${key} ${s[key].toLowerCase()}`;
        if (seen.has(at)) out.push(fail(sf, yaml.lineOf(s, key, yaml.lineOf(sources, id, 1)), `source ${id} : même ${key} que ${seen.get(at)} ; une source est décrite une fois dans le cours`));
        else seen.set(at, id);
      }
      for (const [key, group] of Object.entries(LISTS)) {
        const allowed = Object.values((ctx.lexicon && ctx.lexicon[group]) || {});
        if (typeof s[key] === 'string' && !allowed.includes(s[key])) out.push(fail(sf, yaml.lineOf(s, key, yaml.lineOf(sources, id, 1)), `source ${id} : ${key} « ${s[key]} » n'est pas dans sa liste : ${allowed.join(', ')}`));
      }
    }
  }

  // the claim marks of each concept: where they stand, their form, their sources, their names
  const citing = new Map(); // source id -> Set of claim keys that cite it
  const named = new Map(); // claim key -> claim mark
  for (const { c, marks, outside, problems } of course.concepts) {
    const mine = selected.has(c.number);
    const cf = c.dir + '/concept.md';
    for (const k of marks) {
      if (k.key) {
        if (named.has(k.key) && mine) out.push(fail(cf, k.line, `la marque d'affirmation « ${short(k.text)} » a le nom « ${k.name} », déjà pris dans le concept à la ligne ${named.get(k.key).line} : un nom est unique dans son concept`));
        else if (!named.has(k.key)) named.set(k.key, k);
        for (const id of k.sources) {
          if (!citing.has(id)) citing.set(id, new Set());
          citing.get(id).add(k.key);
        }
      }
    }
    if (!mine) continue;
    for (const p of problems) out.push(fail(cf, p.line, p.message));
    for (const k of outside) out.push(fail(cf, k.line, `la marque d'affirmation « ${short(k.text)} » n'est pas dans un champ publié qui affirme (${places}) : un cas, la croyance d'une idée fausse ou une consigne ne marquent aucune affirmation`));
    for (const k of marks) {
      const what = `la marque d'affirmation « ${short(k.text)} »`;
      if (!k.sources.length && ['consensus', 'school', 'fact'].includes(k.nature)) out.push(fail(cf, k.line, `${what} est « ${k.word} » sans source : une affirmation « ${N('consensus')} », « ${N('school')} » ou « ${N('fact')} » cite au moins une source (« ${k.word}:S1 »)`));
      if (k.sources.length && !k.name) out.push(fail(cf, k.line, `${what} cite ${k.sources.join(', ')} sans nom : une affirmation sourcée a un nom, le titre de sa marque d'affirmation (« [${short(k.text)}](${k.word}:${k.sources.join(',')} "un-nom") »)`));
      if (k.name && !claims.NAME.test(k.name)) out.push(fail(cf, k.line, `${what} a le nom « ${k.name} » : un nom est fait de minuscules sans accent, de chiffres et de tirets (« eau-90-96 »)`));
      if (refs) for (const r of refs(k.text)) out.push(fail(cf, k.line, `${what} tient la référence de concept « ${r.word} ${r.list} » : la référence reste dans la phrase, hors de la marque d'affirmation`));
      for (const id of k.sources) {
        if (!Object.prototype.hasOwnProperty.call(sources, id)) {
          out.push(fail(cf, k.line, `${what} cite ${id}, qui n'est pas une source de ${sf}${course.text === null ? ` (le fichier n'existe pas)` : ''}`));
          continue;
        }
        const s = sources[id];
        const quotes = isObj(s) && Array.isArray(s.quotes) ? s.quotes : [];
        if (k.key && !quotes.some((q) => isObj(q) && q.claim === k.key)) out.push(fail(cf, k.line, `${what} cite ${id}, et aucun extrait de ${id} dans ${sf} ne la prouve (« claim: ${k.key} »)`));
      }
      const h = k.key && isObj(holders[k.key]) ? holders[k.key] : null;
      const hl = yaml.lineOf(holders, k.key, 1);
      if (k.nature === 'school' && !h) out.push(fail(cf, k.line, `${what} est « ${N('school')} » : qui tient cette position est son « holder », sous « claims: ${k.key || '<concept>/<nom>'} » de ${sf}`));
      if ((k.nature === 'fact' || k.nature === 'course') && h) out.push(fail(sf, hl, `l'affirmation ${k.key} est « ${k.word} » : elle n'a pas de « holder », qui ne se dit que d'une position « ${N('school')} » ou « ${N('consensus')} »`));
    }
  }

  // the course files other than a concept file (domain files, plan.md, storyline.md, glossary.md):
  // no claim mark stands there, checked on the whole course only (not with --concept)
  if (!ctx.concept) {
    for (const { file, marks } of claims.ofCourseFiles(ctx, read)) {
      for (const k of marks) out.push(fail(file, k.line, `la marque d'affirmation « ${short(k.text)} » est dans ${file}, hors d'un fichier de concept : une marque d'affirmation ne se trouve que dans les champs publiés qui affirment d'un concept.md (${places})`));
    }
  }

  // the quotes and the holders of sources.yaml: each names a claim that cites its source
  const inScope = (key) => !ctx.concept || selected.has(String(key).split('/')[0]);
  for (const [id, s] of Object.entries(sources)) {
    if (!isObj(s) || !Array.isArray(s.quotes)) continue;
    s.quotes.forEach((q, i) => {
      if (!isObj(q) || typeof q.claim !== 'string' || !inScope(q.claim)) return;
      if (!(citing.get(id) || new Set()).has(q.claim)) {
        out.push(fail(sf, yaml.lineOf(q, 'claim', yaml.lineOf(s.quotes, i, 1)), `source ${id}, extrait ${i + 1} : « claim: ${q.claim} » ne nomme aucune affirmation marquée qui cite ${id}`));
      }
    });
  }
  for (const key of Object.keys(holders)) {
    if (inScope(key) && !named.has(key)) out.push(fail(sf, yaml.lineOf(holders, key, 1), `« claims: ${key} » ne nomme aucune affirmation marquée du cours`));
  }
  return out;
}

// the roles of the spec it reads, by their key in spec.yaml (spec-directives/1/README.md section 1),
// the course through the parser
const reads = ['course.form', 'course.lexicon', 'course.schemas', 'course.parser', 'course.refs', 'course.claims'];

module.exports = { id: 'sources', run, reads };
