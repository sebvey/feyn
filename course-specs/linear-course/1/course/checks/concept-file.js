'use strict';
// The concept file and its folder, their `structure` part (course/README.md sections 3, 3.1 and
// 3.2), from the form of course/form.yaml: the files of the folder; the frontmatter of concept.md
// against course/schemas/concept-frontmatter.schema.yaml through Ajv2020, a failure mapped from
// ajv's instance path to its line (lib/yaml-lines.js), then what the schema does not say (`verified`
// parallel to `refs`, an item's text in inline Markdown); the parts of concept.md in the order of
// the form (head, sections, foot) and no other ## heading; the tree of the concept in its headings
// (section and unit ids: form, order, uniqueness, nine units at most; a title after each id); the
// sections of sources.md and the column count of its tables. The fields of a unit and its
// supplementary cases are `unit-contract`'s, a `pedagogy` check.
const fs = require('fs');
const path = require('path');
const directives = require('./directives');
const yaml = directives.lib('yaml-lines');
const mdlib = directives.lib('md');
const { fail } = directives.lib('course');

const MAJOR = path.resolve(__dirname, '..', '..');
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// the frontmatter schema, compiled once; its path is the form's
let validate = null;
function schema(form) {
  if (!validate) {
    const Ajv2020 = directives.require('ajv/dist/2020').default;
    const file = path.join(MAJOR, form.concept_file.frontmatter);
    validate = new Ajv2020({ allErrors: true, logger: false }).compile(yaml.parse(fs.readFileSync(file, 'utf8')));
  }
  return validate;
}

// the line of an ajv error: the deepest container of its instance path that has a line, or the
// line of the key it names (an unknown key, a missing one)
function lineOfError(data, e) {
  let node = data;
  let line = 1;
  for (const p of e.instancePath.split('/').slice(1).map((s) => s.replace(/~1/g, '/').replace(/~0/g, '~'))) {
    if (node === null || typeof node !== 'object') break;
    const key = Array.isArray(node) ? Number(p) : p;
    line = yaml.lineOf(node, key, line);
    node = node[key];
  }
  if (e.params && e.params.additionalProperty && isObj(node)) line = yaml.lineOf(node, e.params.additionalProperty, line);
  return line;
}

// what the schema does not say of an item: its text in inline Markdown, `verified` parallel to `refs`
function checkItems(list, label, file, out) {
  if (!Array.isArray(list)) return;
  list.forEach((it, i) => {
    if (!isObj(it)) return;
    const l = yaml.lineOf(list, i, 1);
    if (typeof it.text === 'string' && /\]\(|<\/?[A-Za-z]/.test(it.text)) out.push(fail(file, yaml.lineOf(it, 'text', l), `${label}[${i}]: text is inline Markdown, bold and italics only (no link, no HTML)`));
    if (!Array.isArray(it.refs)) return;
    const v = it.verified;
    const vl = yaml.lineOf(it, 'verified', l);
    if (v !== undefined && it.refs.length === 0) out.push(fail(file, vl, `${label}[${i}]: an item with no refs has no verified`));
    else if (Array.isArray(v) && v.length !== it.refs.length) out.push(fail(file, vl, `${label}[${i}]: verified must have one entry per reference of refs (${it.refs.length}), found ${v.length}`));
    else if (v === undefined && it.refs.length) out.push(fail(file, l, `${label}[${i}]: verified must have one entry per reference of refs (${it.refs.length}), found 0`));
  });
}

// matches the ## parts of a file against an expected ordered list
function headingSeq(file, secs, expected, out) {
  let k = 0;
  for (const s of secs) {
    while (k < expected.length && !expected[k].match(s.title)) {
      if (expected[k].mandatory) {
        out.push(fail(file, s.line, `section "${s.title}" found where « ${expected[k].text} » is expected (the parts come in the order of course/form.yaml, and no other ## section exists)`));
        return;
      }
      k++;
    }
    if (k >= expected.length) { out.push(fail(file, s.line, `section "${s.title}" is not where the form puts it, or is no part of the form: no other ## section exists (course/form.yaml)`)); return; }
    k++;
  }
  for (; k < expected.length; k++) if (expected[k].mandatory) { out.push(fail(file, 1, `missing section « ${expected[k].text} »`)); return; }
}

function checkConcept(ctx, c, out) {
  const dir = c.dir;
  const label = `concept ${c.number}`;
  if (!dir || !ctx.isDir(dir)) { out.push(fail('course.yaml', 1, `${label}: folder ${dir} does not exist`)); return; }
  const form = ctx.form;
  const H = (k) => ctx.word('headings', k) || k;
  const FILES = form.folder.files;

  // files
  for (const e of ctx.list(dir)) {
    if (e.isDirectory()) out.push(fail(dir + '/' + e.name, 1, 'nothing but files sits in a concept folder'));
    else if (!FILES.includes(e.name) && !e.name.endsWith('.svg')) out.push(fail(dir + '/' + e.name, 1, `unexpected file: a concept folder holds ${FILES.join(', ')} and its .svg diagrams`));
  }
  for (const f of FILES) if (!ctx.exists(dir + '/' + f)) out.push(fail(dir + '/' + f, 1, 'mandatory file is missing'));

  // --- concept.md
  const cf = dir + '/' + form.concept_file.file;
  const cm = ctx.md(cf);
  if (cm) {
    if (cm.error) out.push(fail(cf, cm.error.line, cm.error.message));
    else if (!cm.hasFront) out.push(fail(cf, 1, 'concept.md has no frontmatter'));
    else {
      const d = cm.data;
      const v = schema(form);
      if (!v(d)) {
        for (const e of v.errors) out.push(fail(cf, lineOfError(d, e), `frontmatter not valid against ${form.concept_file.frontmatter}: ${e.instancePath || '/'} ${e.message}${e.params && e.params.additionalProperty ? ` ("${e.params.additionalProperty}")` : ''}`));
      }
      if (isObj(d)) {
        if (isObj(d.stances)) for (const k of ['consensus', 'school', 'course']) checkItems(d.stances[k], `stances.${k}`, cf, out);
        checkItems(d.neighbors, 'neighbors', cf, out);
      }
    }
    for (const h of mdlib.headings(cm.body)) if (h.level === 1) out.push(fail(cf, h.line, 'no H1: the title is in course.yaml'));

    // the parts, in the order of the form: head, sections, foot
    const top = mdlib.sections(cm.body, 2).sections;
    // the stances live in the frontmatter only: the old body section is named, then left out of the order
    for (const s of top.filter((x) => x.title === H('stances'))) {
      out.push(fail(cf, s.line, `section « ${H('stances')} » is not a \`concept.md\` section: the stances and neighbours live in the frontmatter stances and neighbors only`));
    }
    const secs = top.filter((x) => x.title !== H('stances'));
    const part = (p) => ({ text: H(p.heading), mandatory: p.presence === 'mandatory', match: (t) => t === H(p.heading) });
    const exp = [...form.concept_file.head.map(part)];
    const subs1 = c.subs.filter((x) => x.level === 1);
    for (const s of subs1) exp.push({ text: `${s.id} <title>`, mandatory: true, match: (t) => t === s.id || t.startsWith(s.id + ' ') });
    exp.push(...form.concept_file.foot.map(part));
    headingSeq(cf, secs, exp, out);

    // the tree of the concept, read from its headings (lib/course.js): at least one section; a
    // section id is the concept number and a letter from a, in order; a unit id of a section, the
    // section's and a digit from 1, in order, so nine units at most; every id unique in the
    // course; each heading has a title after its id
    if (!subs1.length) out.push(fail(cf, 1, `${label}: concept.md has no section (\`## <id> <title>\`, the id ${c.number}a first)`));
    const seen = new Map();
    for (const x of ctx.concepts) for (const s of x.subs) seen.set(s.id, (seen.get(s.id) || 0) + 1);
    const max = form.concept_file.sections.max_units;
    const subId = (sub, want) => {
      if (seen.get(sub.id) > 1) out.push(fail(cf, sub.line, `id "${sub.id}" is not unique in the course`));
      else if (sub.id !== want) out.push(fail(cf, sub.line, `${label}: id must be "${want}", found "${sub.id}"`));
      if (!sub.title) out.push(fail(cf, sub.line, `heading title: ${sub.id} has no title (\`${'#'.repeat(sub.level + 1)} <id> <title>\`)`));
    };
    subs1.forEach((sub, a) => {
      subId(sub, c.number + String.fromCharCode(97 + a));
      sub.children.forEach((k, b) => {
        if (b === max) out.push(fail(cf, k.line, `${label}: section ${sub.id} has ${sub.children.length} units, ${max} at most (a unit id ends in one digit)`));
        if (b < max) subId(k, sub.id + (b + 1));
      });
    });
    // ### only inside a section
    for (const s of secs) {
      if (subs1.some((x) => x.line === s.line)) continue;
      for (const h of mdlib.headings(s.lines).filter((x) => x.level === 3)) out.push(fail(cf, h.line, `### "${h.text}" is only allowed inside a section, as one of its units`));
    }
  }

  // --- sources.md
  const sf = dir + '/sources.md';
  const sm = ctx.md(sf);
  if (sm) {
    if (sm.hasFront) out.push(fail(sf, 1, 'sources.md has no frontmatter'));
    for (const h of mdlib.headings(sm.body)) if (h.level === 1) out.push(fail(sf, h.line, 'no H1: the title is in course.yaml'));
    const top = mdlib.sections(sm.body, 2);
    headingSeq(sf, top.sections, ['claims', 'references', 'unverified'].map((k) => ({ text: H(k), mandatory: true, match: (t) => t === H(k) })), out);
    for (const [key, cols] of [['claims', 5], ['references', 5]]) {
      const s = top.sections.find((x) => x.title === H(key));
      if (!s) continue;
      const tabs = mdlib.tables(s.lines);
      if (tabs.length !== 1) out.push(fail(sf, s.line, `« ${H(key)} » holds one table, found ${tabs.length}`));
      else if (tabs[0].header.length !== cols) out.push(fail(sf, tabs[0].line, `« ${H(key)} » table has ${tabs[0].header.length} columns, expected ${cols}`));
      else for (const r of tabs[0].rows) if (r.cells.length !== cols) out.push(fail(sf, r.line, `« ${H(key)} » row has ${r.cells.length} cells, expected ${cols}`));
    }
  }
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.lexiconOk) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon is unusable: see course/README.md section 7')];
  if (!ctx.form) return [fail('course/form.yaml', 1, `tooling error, not a defect of the course: the spec's form is missing or unreadable (${ctx.formError})`)];
  const out = [];
  for (const c of ctx.selected()) checkConcept(ctx, c, out);
  return out;
}

module.exports = { id: 'concept-file', run };
