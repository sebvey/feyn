'use strict';
// The conventions of the text of concept.md (course/README.md section 3.5), read in the parts the
// learner reads (course/form.yaml, readers; course/parser.js), the teacher note left out: concept
// references, read in the text of a claim mark as in the rest of the sentence; no image in
// concept.md (the build places a diagram at its unit). Plain Markdown in every course file
// (section 1), a concept file's headings no deeper than #####, a case's. A claim mark, its form,
// where it stands and its sources are `sources`' (course/claims.js).
const directives = require('./directives');
const mdlib = directives.lib('md');
const { fail } = directives.lib('common');
// the concept references are read by the reader of this MAJOR (course/refs.js), given the directives' lib
const { parser: refParser } = require('../refs')(directives.lib);

function plainMarkdown(ctx, file, out, opts = {}) {
  const m = ctx.md(file);
  if (!m) return;
  m.body.forEach((l) => {
    if (l.code) return;
    const t = mdlib.maskCode(l.t);
    if (/<\/?[A-Za-z][^>]*>|<!--/.test(t)) out.push(fail(file, l.n, `plain Markdown: no HTML tag (found "${/<\/?[A-Za-z][^>]*>|<!--/.exec(t)[0]}")`));
    if (/^\s*(import|export)\s/.test(l.t)) out.push(fail(file, l.n, 'plain Markdown: no MDX import or export'));
    if (/^\s*:::/.test(l.t)) out.push(fail(file, l.n, 'plain Markdown: no ::: directive'));
    if (opts.depth) {
      const h = /^(#{1,6})\s/.exec(l.t);
      if (h && h[1].length >= 6) out.push(fail(file, l.n, 'plain Markdown: no heading deeper than ##### in a concept file'));
    }
  });
}

function checkConcept(ctx, c, out) {
  const dir = c.dir;
  if (!dir || !ctx.isDir(dir)) return;
  const cf = dir + '/concept.md';
  const cm = ctx.md(cf);
  plainMarkdown(ctx, cf, out, { depth: true });
  if (!cm) return;
  const parts = ctx.parts(c);
  // what the learner reads (course/form.yaml, readers): the teacher note is left out
  const heard = parts.heard;

  // a #### heading is a block of a unit, inside a unit; a ##### heading a case, inside a unit (where
  // in the unit is unit-contract's)
  const inSection = (n) => parts.sections.some((s) => n > s.line && n <= (s.lines.length ? s.lines[s.lines.length - 1].n : s.line));
  for (const h of mdlib.headings(cm.body)) {
    if (h.level === 4 && !inSection(h.line)) out.push(fail(cf, h.line, `plain Markdown: a #### heading is a block of a unit, inside a unit ("${h.text}")`));
    if (h.level === 5 && !inSection(h.line)) out.push(fail(cf, h.line, `plain Markdown: a ##### heading is a case, in the block of cases of a unit ("${h.text}")`));
  }

  // concept references (course/refs.js): to a concept, a section or a unit with the concept words, to
  // an annex or a section or unit of one with the annex word
  const refs = refParser(ctx);
  if (refs) {
    const known = ctx.allNumbers();
    const subs = ctx.allSubIds();
    const annexIds = new Set(ctx.concepts.filter((x) => x.annex).flatMap((x) => [x.number, ...x.subs.map((s) => s.id)]));
    const found = [];
    heard.forEach((l) => {
      if (!l.code) for (const r of refs(mdlib.maskCode(l.t))) found.push({ n: l.n, r });
    });
    for (const { n, r } of found.filter((x) => !x.r.annex)) {
      for (const id of r.ids) {
        const norm = /^\d/.test(id) ? id.replace(/^0+(?=\d)/, '') : id;
        const asSub = /^(A?\d+)([a-z])(\d)?$/.test(id);
        if (!(asSub ? subs.has(id) : known.has(norm))) out.push(fail(cf, n, `concept reference "${r.word} ${r.list}": ${id} names no concept, section or unit of the course`));
      }
    }
    for (const { n, r } of found.filter((x) => x.r.annex)) {
      if (!annexIds.has(r.list)) out.push(fail(cf, n, `concept reference "${r.word} ${r.list}": ${r.list} names no annex of the course, nor a section or unit of one`));
    }
  }

  // no image: the build places each declared diagram at its unit, from the frontmatter
  cm.body.forEach((l) => {
    if (l.code) return;
    const m = /!\[[^\]]*\]\([^)]*\)/.exec(mdlib.maskCode(l.t));
    if (m) out.push(fail(cf, l.n, `no image in concept.md ("${m[0].slice(0, 40)}"): the build places a diagram at its unit, from \`diagrams\` of the frontmatter`));
  });
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.lexiconOk) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon is unusable: see course/README.md section 7')];
  const out = [];
  for (const c of ctx.selected()) checkConcept(ctx, c, out);
  // the other course files: plain Markdown (concept folders are checked above)
  for (const f of ctx.mdFiles()) if (!f.startsWith('concepts/')) plainMarkdown(ctx, f, out);
  return out;
}

// the roles of the spec it reads, by their key in spec.yaml (spec-directives/1/README.md section 1),
// the course through the parser
const reads = ['course.form', 'course.lexicon', 'course.parser', 'course.refs'];

module.exports = { id: 'conventions', run, reads };
