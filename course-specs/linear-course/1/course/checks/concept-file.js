'use strict';
// The concept file and its folder, their `structure` part (course/README.md sections 3, 3.1 and
// 3.2), from the form of course/form.yaml: the files of the folder; the frontmatter of concept.md
// against course/schemas/concept-frontmatter.schema.yaml through Ajv2020, a failure mapped from
// ajv's instance path to its line (`lineOfError` of lib/yaml-lines.js), then what the schema does
// not say (`verified` parallel to `refs`, an item's text in inline Markdown); the title of
// concept.md, its one # heading, first, `# Concept <n> : <title>` with the title of course.yaml; the
// parts of concept.md in the order of the form (head, sections, foot) and no other ## heading, no
// ### in the head, the ### blocks of the foot in their order; the tree of the concept in its headings
// (section and unit ids: form, order, uniqueness, one unit at least and nine at most per section;
// the kind word and a title around each id). The
// blocks of a unit, their fields and its cases are `unit-contract`'s, a `pedagogy` check; the form
// of sources.md is `sources`'.
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

// matches the headings of a part of a file (its ## parts, or the ### blocks of its head or foot)
// against an expected ordered list; `where` names the place of a heading, `extra` what lies outside
function headingSeq(file, secs, expected, out, where = 'section', extra = 'no other ## section exists') {
  let k = 0;
  for (const s of secs) {
    while (k < expected.length && !expected[k].match(s)) {
      if (expected[k].mandatory) {
        out.push(fail(file, s.line, `${where} "${s.title}" found where « ${expected[k].text} » is expected (the parts come in the order of course/form.yaml, and ${extra})`));
        return;
      }
      k++;
    }
    if (k >= expected.length) { out.push(fail(file, s.line, `${where} "${s.title}" is not where the form puts it, or is no part of the form: ${extra} (course/form.yaml)`)); return; }
    k++;
  }
  for (; k < expected.length; k++) if (expected[k].mandatory) { out.push(fail(file, 1, `missing ${where} « ${expected[k].text} »`)); return; }
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
        for (const e of v.errors) out.push(fail(cf, yaml.lineOfError(d, e), `frontmatter not valid against ${form.concept_file.frontmatter}: ${e.instancePath || '/'} ${e.message}${e.params && e.params.additionalProperty ? ` ("${e.params.additionalProperty}")` : ''}`));
      }
      if (isObj(d)) {
        if (isObj(d.stances)) for (const k of ['consensus', 'school', 'course']) checkItems(d.stances[k], `stances.${k}`, cf, out);
        checkItems(d.neighbors, 'neighbors', cf, out);
      }
    }
    const K = (k) => ctx.word('block_kinds', k) || k;
    const SEP = K(form.concept_file.separator);
    const HEAD = form.concept_file.head;
    const FOOT = form.concept_file.foot;
    const SECTIONS = form.concept_file.sections;

    // the title: the one # heading, the first line of the body, `# Concept <n> : <title>` (an annex
    // `# Annexe <id> : <title>`), its title the one course.yaml gives the concept
    const T = form.concept_file.title;
    const lead = `${K(c.annex ? T.annex_kind : T.kind)} ${c.number}${SEP}`;
    const want = typeof c.entry.title === 'string' ? lead + c.entry.title : null;
    const h1 = mdlib.headings(cm.body).filter((h) => h.level === 1);
    const first = cm.body.find((l) => l.t.trim() !== '');
    if (!h1.length) out.push(fail(cf, first ? first.n : 1, `${label}: concept.md opens with its title, \`# ${want || lead + '<title>'}\`, the title of course.yaml`));
    else {
      const h = h1[0];
      if (!first || first.n !== h.line) out.push(fail(cf, h.line, `${label}: the title \`# ${h.text}\` is the first line of the body, before any other`));
      if (!h.text.startsWith(lead)) out.push(fail(cf, h.line, `${label}: the title is \`# ${lead}<title>\`, found "# ${h.text}"`));
      else if (want && h.text !== want) out.push(fail(cf, h.line, `${label}: the title "${h.text.slice(lead.length)}" is not the one course.yaml gives the concept, "${c.entry.title}"`));
      for (const x of h1.slice(1)) out.push(fail(cf, x.line, `one # heading only, the title of the concept: "# ${x.text}"`));
    }

    // the parts, in the order of the form: the head, the sections, the foot
    const top = mdlib.sections(cm.body, 2).sections;
    // the stances live in the frontmatter only: the old body section is named, then left out of the order
    for (const s of top.filter((x) => x.title === H('stances'))) {
      out.push(fail(cf, s.line, `section « ${H('stances')} » is not a \`concept.md\` section: the stances and neighbours live in the frontmatter stances and neighbors only`));
    }
    const secs = top.filter((x) => x.title !== H('stances'));
    const part = (p) => ({ text: H(p.heading), mandatory: p.presence === 'mandatory', match: (s) => s.title === H(p.heading) });
    const subs1 = c.subs.filter((x) => x.level === 1);
    const exp = [part(HEAD)];
    for (const s of subs1) exp.push({ text: `${K(SECTIONS.kind)} ${s.id}${SEP}<title>`, mandatory: true, match: (x) => x.line === s.line });
    exp.push(part(FOOT));
    headingSeq(cf, secs, exp, out);

    // the head: its text, and no ### heading
    const hs = secs.find((x) => x.title === H(HEAD.heading));
    if (hs) for (const h of mdlib.headings(hs.lines).filter((x) => x.level === 3)) out.push(fail(cf, h.line, `« ${H(HEAD.heading)} » holds its text and no ### block (found "### ${h.text}")`));

    // the foot: its ### blocks, in the order of the form, and nothing else, one block at least
    for (const p of [FOOT]) {
      const s = secs.find((x) => x.title === H(p.heading));
      if (!s) continue;
      const split = mdlib.sections(s.lines, 3);
      const stray = split.pre.find((l) => l.t.trim() !== '');
      if (stray) out.push(fail(cf, stray.n, `« ${H(p.heading)} » holds its ### blocks and nothing else (found "${stray.t.trim().slice(0, 40)}")`));
      if (!split.sections.length && p.presence !== 'mandatory') out.push(fail(cf, s.line, `« ${H(p.heading)} » holds one of its blocks at least (${p.blocks.map((b) => `« ${H(b.heading)} »`).join(', ')}): without one, it has no ## heading`));
      headingSeq(cf, split.sections, p.blocks.map(part), out, `block of « ${H(p.heading)} »`, 'no other ### block exists in it');
    }

    // the tree of the concept, read from its headings (lib/course.js): at least one section; a
    // section id is the concept number and a letter from a, in order; a unit id of a section, the
    // section's and a digit from 1, in order, so nine units at most, and one at least; every id
    // unique in the course; each heading starts with its kind word and has a title after its id
    if (!subs1.length) out.push(fail(cf, 1, `${label}: concept.md has no section (\`## ${K(SECTIONS.kind)} ${c.number}a${SEP}<title>\`, the id ${c.number}a first)`));
    const seen = new Map();
    for (const x of ctx.concepts) for (const s of x.subs) seen.set(s.id, (seen.get(s.id) || 0) + 1);
    const max = SECTIONS.max_units;
    const subId = (sub, want) => {
      const kind = K(sub.level === 1 ? SECTIONS.kind : SECTIONS.unit_kind);
      const hashes = '#'.repeat(sub.level + 1);
      if (seen.get(sub.id) > 1) out.push(fail(cf, sub.line, `id "${sub.id}" is not unique in the course`));
      else if (sub.id !== want) out.push(fail(cf, sub.line, `${label}: id must be "${want}", found "${sub.id}"`));
      if (!sub.title) out.push(fail(cf, sub.line, `heading title: ${sub.id} has no title (\`${hashes} ${kind} ${sub.id}${SEP}<title>\`)`));
      else if (!sub.kind || !sub.sep) out.push(fail(cf, sub.line, `heading kind: "${hashes} ${sub.text}" starts with its kind, \`${hashes} ${kind} ${sub.id}${SEP}${sub.title}\``));
    };
    subs1.forEach((sub, a) => {
      subId(sub, c.number + String.fromCharCode(97 + a));
      if (!sub.children.length) out.push(fail(cf, sub.line, `${label}: section ${sub.id} has no unit: a section holds its units, one at least, \`### ${K(SECTIONS.unit_kind)} ${sub.id}1${SEP}<title>\`, even when it has a single one`));
      sub.children.forEach((k, b) => {
        if (b === max) out.push(fail(cf, k.line, `${label}: section ${sub.id} has ${sub.children.length} units, ${max} at most (a unit id ends in one digit)`));
        if (b < max) subId(k, sub.id + (b + 1));
      });
    });
    // ### only inside a section, the head or the foot
    for (const s of secs) {
      if (subs1.some((x) => x.line === s.line) || [HEAD, FOOT].some((p) => s.title === H(p.heading))) continue;
      for (const h of mdlib.headings(s.lines).filter((x) => x.level === 3)) out.push(fail(cf, h.line, `### "${h.text}" is only allowed inside a section, as one of its units, or inside the head or the foot, as one of their blocks`));
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
