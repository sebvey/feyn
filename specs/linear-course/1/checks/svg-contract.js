'use strict';
// Every diagram against the drawing contract (COURSE.md section 6.1); declared and present
// diagrams match (section 3.1).
const fs = require('fs');
const path = require('path');
const xml = require('./lib/xml');
const yaml = require('./lib/yaml');
const { fail } = require('./lib/course');

const CLASSES = new Set(['primary', 'secondary', 'muted']);
const GENERIC = new Set(['system-ui', 'sans-serif', 'serif', 'monospace']);
const COLOR_ATTRS = ['color', 'stop-color', 'flood-color', 'lighting-color'];
const STEM = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ELEMENT_ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function checkFile(ctx, concept, rel, decl, ids, out) {
  const stem = path.basename(rel, '.svg');
  const here = (line, msg) => out.push(fail(rel, line, msg));
  if (!STEM.test(stem)) here(1, `file name "${path.basename(rel)}" must be lowercase ASCII words joined by hyphens`);
  const size = fs.statSync(ctx.abs(rel)).size;
  if (size > 32 * 1024) here(1, `file is ${size} bytes, over the 32 KB limit`);
  let root;
  try {
    root = xml.parse(ctx.read(rel));
  } catch (e) {
    here(e.line || 1, `not well-formed XML: ${e.message}`);
    return;
  }
  if (root.name !== 'svg') { here(root.line, `root element is <${root.name}>, not <svg>`); return; }
  const a = root.attrs;
  if (a.xmlns !== 'http://www.w3.org/2000/svg') here(root.line, 'the root <svg> needs xmlns="http://www.w3.org/2000/svg"');
  if (!a.viewBox) here(root.line, 'the root <svg> needs a viewBox');
  for (const k of ['width', 'height']) if (k in a) here(root.line, `the root <svg> must not have a ${k} attribute`);
  if (a.fill !== 'currentColor') here(root.line, 'the root <svg> needs fill="currentColor"');
  if (a.role !== 'img') here(root.line, 'the root <svg> needs role="img"');

  const seenIds = new Map();
  let texts = 0;
  xml.walk(root, (n) => {
    const l = n.line;
    const at = n.attrs;
    if (n.name === 'script') here(l, 'forbidden element <script>');
    if (n.name === 'style') here(l, 'forbidden element <style>');
    if (n.name === 'image') here(l, 'forbidden element <image>');
    if (n.name === 'foreignObject') here(l, 'forbidden element <foreignObject>');
    if (n.name === 'text') texts++;
    for (const k of Object.keys(at)) {
      const v = at[k];
      const al = (n.attrLines && n.attrLines[k]) || l;
      if (/^on/i.test(k)) here(al, `forbidden attribute ${k}`);
      if (k === 'style') here(al, 'forbidden attribute style');
      if ((k === 'fill' || k === 'stroke') && v !== 'currentColor' && v !== 'none') here(al, `${k}="${v}": only currentColor or none`);
      if (COLOR_ATTRS.includes(k)) here(al, `forbidden colour attribute ${k}`);
      if ((k === 'href' || k === 'xlink:href') && !v.startsWith('#')) here(al, `${k}="${v}": only references starting with # are allowed`);
      if (/url\(\s*['"]?(?!#)/.test(v) || /(https?:)?\/\/[\w.-]+\.\w/.test(v) && k !== 'xmlns' && !k.startsWith('xmlns:')) here(al, `attribute ${k} points outside the file`);
      if (k === 'class') for (const c of v.split(/\s+/).filter(Boolean)) if (!CLASSES.has(c)) here(al, `class "${c}": only primary, secondary and muted are allowed`);
      if (k === 'font-family') for (const f of v.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''))) if (!GENERIC.has(f.toLowerCase())) here(al, `font-family "${f}": only generic families (${[...GENERIC].join(', ')})`);
      if (k === 'id') {
        if (seenIds.has(v)) here(al, `id "${v}" is used twice in the file`);
        seenIds.set(v, n);
        if (ids.has(v) && ids.get(v) !== rel) here(al, `id "${v}" is also used in ${ids.get(v)}: ids are unique across the concept`);
        ids.set(v, rel);
        if (concept.subs.some((s) => s.id === v)) here(al, `id "${v}" is a bare sub-concept id, which is the reader-text anchor`);
      }
    }
  });
  if (texts === 0) here(root.line, 'the diagram has no <text>');

  // accessibility
  const kids = xml.elements(root);
  const title = kids[0];
  if (!title || title.name !== 'title') here(root.line, '<title> must be the first child of the root');
  else {
    const t = xml.textOf(title).replace(/\s+/g, ' ').trim();
    if (!title.attrs.id) here(title.line, '<title> needs an id');
    else if (!title.attrs.id.startsWith(stem)) here(title.line, `<title> id "${title.attrs.id}" must start with the stem "${stem}"`);
    if (decl && t !== String(decl.title).replace(/\s+/g, ' ').trim()) here(title.line, `<title> "${t}" must equal the declared title "${decl.title}"`);
    const desc = kids.find((k) => k.name === 'desc');
    if (desc && (!desc.attrs.id || !desc.attrs.id.startsWith(stem))) here(desc.line, `<desc> needs an id starting with the stem "${stem}"`);
    const lb = (a['aria-labelledby'] || '').split(/\s+/).filter(Boolean);
    if (!lb.length) here(root.line, 'the root <svg> needs aria-labelledby naming its <title>');
    else {
      if (title.attrs.id && !lb.includes(title.attrs.id)) here(root.line, `aria-labelledby does not name the <title> id "${title.attrs.id}"`);
      if (desc && desc.attrs.id && !lb.includes(desc.attrs.id)) here(root.line, `aria-labelledby does not name the <desc> id "${desc.attrs.id}"`);
      for (const id of lb) if (!seenIds.has(id)) here(root.line, `aria-labelledby names "${id}", which does not exist`);
    }
  }
  // groups
  for (const k of kids) {
    // <defs> is not drawn: it may sit at the root, and its content follows the contract (walk above)
    if (k.name === 'title' || k.name === 'desc' || k.name === 'defs') continue;
    if (k.name !== 'g') { here(k.line, `every drawn child of the root is a <g>, found <${k.name}>`); continue; }
    const id = k.attrs.id;
    if (!id) { here(k.line, 'a top-level <g> needs an id: <sub-concept>-<element>'); continue; }
    const ok = concept.subs.some((s) => id.startsWith(s.id + '-') && ELEMENT_ID.test(id.slice(s.id.length + 1)));
    if (!ok) here(k.line, `group id "${id}" must be <sub-concept>-<element>, a sub-concept id of the concept then lowercase ASCII words joined by hyphens`);
  }
  // nested groups with an id follow the same form
  xml.walk(root, (n) => {
    if (n.name === 'g' && n.attrs.id && n.parent && n.parent !== root) {
      const id = n.attrs.id;
      if (!concept.subs.some((s) => id.startsWith(s.id + '-') && ELEMENT_ID.test(id.slice(s.id.length + 1)))) here(n.line, `group id "${id}" must be <sub-concept>-<element>`);
    }
  });
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  const out = [];
  for (const c of ctx.selected()) {
    if (!c.dir || !ctx.isDir(c.dir)) continue;
    const md = ctx.md(c.dir + '/concept.md');
    const declared = md && md.data && Array.isArray(md.data.diagrams) ? md.data.diagrams : [];
    const ids = new Map();
    const files = ctx.list(c.dir).filter((e) => e.isFile() && e.name.endsWith('.svg')).map((e) => e.name).sort();
    declared.forEach((d, i) => {
      const line = yaml.lineOf(md.data.diagrams, i, 1);
      if (!d || typeof d.file !== 'string') return;
      if (!files.includes(d.file)) out.push(fail(c.dir + '/concept.md', line, `declared diagram ${d.file} does not exist in ${c.dir}`));
      if (d.subconcept !== undefined && !c.subs.some((s) => s.id === normStr(d.subconcept))) out.push(fail(c.dir + '/concept.md', line, `diagram ${d.file}: subconcept "${d.subconcept}" is not a sub-concept of the concept`));
    });
    for (const f of files) {
      const rel = c.dir + '/' + f;
      const decl = declared.find((d) => d && d.file === f);
      if (!decl) out.push(fail(rel, 1, `diagram ${f} is not declared in the diagrams of concept.md`));
      checkFile(ctx, c, rel, decl, ids, out);
    }
  }
  return out;
}
const normStr = (v) => String(v);

module.exports = { id: 'svg-contract', run };
