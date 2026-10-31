'use strict';
// The reader-text conventions of concept.md (COURSE.md section 3.5); plain Markdown in every
// course file (section 1).
const yaml = require('./lib/yaml-lines');
const mdlib = require('./lib/md');
const { fail } = require('./lib/course');
const { parser: refParser } = require('./lib/refs');

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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
      if (h && h[1].length === 1) out.push(fail(file, l.n, 'plain Markdown: no H1 in a concept file (the title is in course.yaml)'));
      if (h && h[1].length >= 4) out.push(fail(file, l.n, 'plain Markdown: no heading deeper than ###'));
    }
  });
}

function checkConcept(ctx, c, out, all) {
  const dir = c.dir;
  if (!dir || !ctx.isDir(dir)) return;
  const cf = dir + '/concept.md';
  const cm = ctx.md(cf);
  const H = (k) => ctx.word('headings', k) || k;
  for (const f of ['concept.md', 'teaching.md', 'sources.md']) plainMarkdown(ctx, dir + '/' + f, out, { depth: f === 'concept.md' });
  if (!cm) return;
  const top = mdlib.sections(cm.body, 2).sections;
  const diagrams = cm.data && Array.isArray(cm.data.diagrams) ? cm.data.diagrams.filter((d) => d && typeof d === 'object') : [];
  const markers = {
    storyline: ctx.word('markers', 'storyline'),
    list: ['consensus', 'school', 'course'].map((k) => ctx.word('markers', k)).filter(Boolean),
  };

  // sub-concept sections
  for (const s of top) {
    const id = (/^(\S+)/.exec(s.title) || [])[1];
    const sub = c.subs.find((x) => x.level === 1 && x.id === id);
    if (!sub) continue;
    const bl = mdlib.blocks(s.lines);
    const title = s.title.slice(id.length).trim();
    if (title !== sub.title) out.push(fail(cf, s.line, `heading title: "${title}" must equal the title of course.yaml "${sub.title}"`));
    const first = bl[0];
    if (!first || first.code || !/^\*[^*].*[^*]\*$|^\*[^*]\*$/.test(first.text) || /^#|^>|^[-*] /.test(first.text)) {
      out.push(fail(cf, first ? first.line : s.line, `sub-concept section ${id}: the first paragraph is the promise, entirely in italics`));
    }
    const h3s = mdlib.headings(s.lines).filter((h) => h.level === 3);
    if (sub.children.length) {
      const firstH3 = h3s.length ? h3s[0].line : Infinity;
      const stray = bl.slice(1).find((b) => b.line < firstH3);
      if (stray) out.push(fail(cf, stray.line, `sub-concept section ${id} has children: it holds the promise and nothing else before its ### sections`));
      for (const h of h3s) {
        const hid = (/^(\S+)/.exec(h.text) || [])[1];
        const k = sub.children.find((x) => x.id === hid);
        if (!k) continue;
        const t = h.text.slice(hid.length).trim();
        if (t !== k.title) out.push(fail(cf, h.line, `heading title: "${t}" must equal the title of course.yaml "${k.title}"`));
      }
      // each leaf has reader text
      const hs = mdlib.sections(s.lines, 3).sections;
      for (const h of hs) if (!h.lines.some((l) => l.t.trim())) out.push(fail(cf, h.line, `leaf ${h.title}: no reader text`));
    } else if (!bl.slice(1).length) {
      out.push(fail(cf, s.line, `leaf sub-concept ${id} has no reader text after its promise`));
    }
  }

  // body-wide conventions
  const bodyLines = cm.body;
  const subRanges = top.filter((s) => c.subs.some((x) => x.level === 1 && (s.title === x.id || s.title.startsWith(x.id + ' '))));
  const inSubSection = (n) => subRanges.some((s) => n > s.line && n <= (s.lines.length ? s.lines[s.lines.length - 1].n : s.line));

  // concept references (lib/refs.js): to a concept or sub-concept with the concept words, to an
  // annex or a sub-concept of one with the annex word
  const refs = refParser(ctx);
  if (refs) {
    const known = ctx.allNumbers();
    const subs = ctx.allSubIds();
    const annexIds = new Set(ctx.concepts.filter((x) => x.annex).flatMap((x) => [x.number, ...x.subs.map((s) => s.id)]));
    const found = [];
    bodyLines.forEach((l) => {
      if (!l.code) for (const r of refs(mdlib.maskCode(l.t))) found.push({ n: l.n, r });
    });
    for (const { n, r } of found.filter((x) => !x.r.annex)) {
      for (const id of r.ids) {
        const norm = /^\d/.test(id) ? id.replace(/^0+(?=\d)/, '') : id;
        const asSub = /^(A?\d+)([a-z])(\d)?$/.test(id);
        if (!(asSub ? subs.has(id) : known.has(norm))) out.push(fail(cf, n, `concept reference "${r.word} ${r.list}": ${id} names no concept or sub-concept of the course`));
      }
    }
    for (const { n, r } of found.filter((x) => x.r.annex)) {
      if (!annexIds.has(r.list)) out.push(fail(cf, n, `concept reference "${r.word} ${r.list}": ${r.list} names no annex of the course, nor a sub-concept of one`));
    }
  }

  // stance markers
  const defs = new RegExp(`^\\s{0,3}\\[(${markers.list.map(esc).join('|')})\\]:`, 'iu');
  const linked = new RegExp(`\\[(${markers.list.map(esc).join('|')})\\](\\(|\\[)`, 'u');
  bodyLines.forEach((l) => {
    if (l.code || !markers.list.length) return;
    if (defs.test(l.t)) out.push(fail(cf, l.n, `stance marker: no link reference definition may carry the label of a marker ("${l.t.trim().slice(0, 30)}")`));
    else if (linked.test(mdlib.maskCode(l.t))) out.push(fail(cf, l.n, 'stance marker: a marker is plain text, it is not a link'));
  });

  // blockquotes in sub-concept sections
  const lead = markers.storyline ? `**${markers.storyline} :**` : null;
  for (const s of subRanges) {
    const bq = [];
    let prevQ = false;
    for (const l of s.lines) {
      const q = !l.code && /^\s{0,3}>/.test(l.t);
      if (q && !prevQ) bq.push({ line: l.n, text: l.t.replace(/^\s{0,3}>\s?/, '') });
      prevQ = q;
    }
    for (const q of bq) if (lead && !q.text.startsWith(lead)) out.push(fail(cf, q.line, `storyline blockquote: a blockquote in a sub-concept section starts with ${lead}`));
  }

  // diagram images
  const images = [];
  bodyLines.forEach((l) => {
    if (l.code) return;
    const t = mdlib.maskCode(l.t);
    const re = /!\[([^\]]*)\]\(([^)]*)\)/g;
    let m;
    while ((m = re.exec(t))) images.push({ line: l.n, alt: m[1], file: m[2], whole: t.trim() === m[0] });
  });
  for (const im of images) {
    if (!im.whole) out.push(fail(cf, im.line, `diagram image: ![..](${im.file}) stands alone in its paragraph`));
    const d = diagrams.find((x) => x.file === im.file);
    if (!d) out.push(fail(cf, im.line, `diagram image: ${im.file} is not a declared diagram`));
    else if (im.alt !== String(d.title)) out.push(fail(cf, im.line, `diagram image: alt text "${im.alt}" must equal the declared title "${d.title}"`));
  }
  const blk = mdlib.blocks(bodyLines.filter((l) => !l.code));
  for (const im of images) {
    const b = blk.find((x) => x.line <= im.line && im.line <= x.lines[x.lines.length - 1].n);
    if (im.whole && b && b.lines.length > 1) out.push(fail(cf, im.line, `diagram image: ![..](${im.file}) stands alone in its paragraph`));
  }
  for (const d of diagrams) {
    const n = images.filter((im) => im.file === d.file).length;
    if (n !== 1) out.push(fail(cf, 1, `diagram image: declared diagram ${d.file} appears ${n} times in the body, expected once`));
  }

  // pitfalls
  const pit = top.find((s) => s.title === H('pitfalls'));
  if (pit) {
    const bl = mdlib.blocks(pit.lines);
    if (!bl.length) out.push(fail(cf, pit.line, 'pitfalls: one bulleted list expected, the section is empty'));
    for (const b of bl) {
      const t0 = b.lines[0].t;
      if (b.code || !/^- /.test(t0)) out.push(fail(cf, b.line, 'pitfalls: the section is one bulleted list ("- **pitfall** ...")'));
      else for (const l of b.lines) {
        if (/^- /.test(l.t) && !/^- \*\*[^*]/.test(l.t)) out.push(fail(cf, l.n, 'pitfalls: each item opens with the pitfall in bold'));
      }
    }
  }
  // quick test
  const qt = top.find((s) => s.title === H('quick_test'));
  if (qt) {
    const bl = mdlib.blocks(qt.lines);
    const isQ = (b) => !b.code && b.lines.every((l) => /^\s{0,3}>/.test(l.t));
    if (!bl.length || !isQ(bl[0])) out.push(fail(cf, bl.length ? bl[0].line : qt.line, 'quick test: a blockquote (the question) comes first'));
    else {
      if (bl.length > 2) out.push(fail(cf, bl[2].line, 'quick test: one blockquote, then at most one paragraph'));
      else if (bl.length === 2 && (isQ(bl[1]) || /^(#|[-*] |\d+\. |\|)/.test(bl[1].lines[0].t))) out.push(fail(cf, bl[1].line, 'quick test: after the blockquote, at most one paragraph (the note)'));
    }
  }
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.packOk) return [fail('course.yaml', 1, 'the language pack is unusable: see COURSE.md section 7')];
  const out = [];
  for (const c of ctx.selected()) checkConcept(ctx, c, out);
  // the other course files: plain Markdown (concept folders are checked above)
  for (const f of ctx.mdFiles()) if (!f.startsWith('concepts/')) plainMarkdown(ctx, f, out);
  return out;
}

module.exports = { id: 'conventions', run };
