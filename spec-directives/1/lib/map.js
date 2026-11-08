'use strict';
// The map of a spec MAJOR (README.md section 8, "The map"): section 2 of its README.md, generated
// from its manifest, spec.yaml, by generate-map, and held to it by the test `map` of check-spec.
// One table per owner (the spec itself, the course, each product the manifest declares), a row
// per role:
//   File        its path, linked
//   Holds       `holds` of its entry in `map:`
//   Kind        from its path: `folder`, `data` (.yaml, .yml, .json), `prose` (.md), `script`
//   Readers     `readers` of its entry in `map:`, among the four of spec-directives/README.md
//   Tested by   the tests of check-spec and the checks of a course that read the role, as each
//               says by its export `reads` (the roles it reads, by their dotted key), never a list
//               written apart: the tests of tests/, the checks that course/rules.yaml names and
//               that check-course runs, in the folder the manifest declares as `course.checks`; a
//               test that checks nothing unless the manifest declares one of the roles of its
//               export `needs` is listed only when the manifest declares one of them
// Under a product's table, one line saying it is built from the course by its `build`; a product
// the manifest does not declare shows as one line, `map.undeclared.<product>`.
// The views: when the manifest declares `course.views`, a script of the spec MAJOR, a factory
// given this lib (`(name) => require('./<name>')`) that returns, for each role of the course it
// writes, a function of { read, manifest, command } giving the view's text; generate-map writes
// it at the path of that role. The view of `linear-fr`'s form, course/form.md, is one.
//   render(root, m)        { section, views: [{ ref, path, text }], errors: [message] }: the text
//                          of section 2 below its heading, and each view
//   command(root)          the command that writes them, as the section and each view name it
//   splice(readme, section)  the README.md's text with its section 2 replaced, null when it has
//                            no `## 2. ` heading
//   at(readme)             the line of that heading, null when none
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..', '..');
const TESTS = path.join(__dirname, '..', 'tests');
const OWNERS = { spec: 'The spec', course: 'The course' };

const command = (root) => `mise exec -- spec-directives/generate-map ${path.relative(REPO, root) || '.'}`;

// a path that does not exist yet (a view generate-map is about to write) takes its kind from its
// extension, a folder from the disk; the test map fails a path declared and missing
function kind(root, p) {
  let st = null;
  try { st = fs.statSync(path.join(root, p)); } catch (e) { /* missing */ }
  if (st && st.isDirectory()) return 'folder';
  if (/\.(ya?ml|json)$/.test(p)) return 'data';
  if (/\.md$/.test(p)) return 'prose';
  return st || /\.[a-z]+$/.test(p) ? 'script' : 'missing';
}

// ref -> ['check-spec', id] and ['check-course', id], in the order of the tests then the checks
function testedBy(root, m, errors) {
  const by = new Map();
  const add = (runner, id, reads) => {
    for (const ref of Array.isArray(reads) ? reads : []) {
      if (!by.has(ref)) by.set(ref, []);
      by.get(ref).push([runner, id]);
    }
  };
  // a test that checks nothing unless the manifest declares one of the roles of its `needs` tests
  // nothing here when it declares none of them
  const declared = new Set(m.roles().map((r) => r.ref));
  for (const f of fs.readdirSync(TESTS).filter((n) => n.endsWith('.js')).sort()) {
    const t = require(path.join(TESTS, f));
    if (!t || !t.id || typeof t.run !== 'function') continue;
    if (Array.isArray(t.needs) && !t.needs.some((ref) => declared.has(ref))) continue;
    add('check-spec', t.id, t.reads);
  }
  const checks = m.path('course', 'checks');
  if (checks !== null && fs.existsSync(path.join(root, checks))) {
    let rules = null;
    try { rules = require('./rules').load(path.join(root, checks)); } catch (e) { errors.push(`the checks of ${checks} cannot be listed: ${e.message}`); }
    for (const c of rules ? rules.checks.filter((x) => x.runsHere) : []) {
      try { add('check-course', c.id, require(path.join(root, checks, c.id + '.js')).reads); } catch (e) { errors.push(`${checks}/${c.id}.js cannot be loaded: ${e.message}`); }
    }
  }
  return by;
}

const cell = (s) => String(s).replace(/\|/g, '\\|');
function tested(list) {
  if (!list || !list.length) return 'none';
  const runners = [];
  for (const [runner, id] of list) {
    let r = runners.find((x) => x.runner === runner);
    if (!r) runners.push(r = { runner, ids: [] });
    if (!r.ids.includes(id)) r.ids.push(id);
  }
  return runners.map((r) => `${r.runner}: ${r.ids.map((id) => `\`${id}\``).join(', ')}`).join('; ');
}

function table(root, m, roles, by) {
  const rows = ['| File | Holds | Kind | Readers | Tested by |', '|---|---|---|---|---|'];
  for (const r of roles) {
    const k = kind(root, r.path);
    const shown = k === 'folder' ? r.path + '/' : r.path;
    const e = m.map(r.ref);
    rows.push(`| [\`${shown}\`](${shown}) | ${e ? cell(e.holds) : '(no entry in `map:`)'} | ${k || 'missing'} | ${e ? e.readers.join(', ') : ''} | ${tested(by.get(r.ref))} |`);
  }
  return rows.join('\n');
}

function render(root, m) {
  const errors = [];
  const by = testedBy(root, m, errors);
  const cmd = command(root);
  const views = [];
  const viewsPath = m.path('course', 'views');
  const renderers = {};
  if (viewsPath !== null) {
    try {
      Object.assign(renderers, require(path.join(root, viewsPath))((name) => require('./' + name)));
    } catch (e) { errors.push(`${viewsPath} cannot be loaded: ${e.message}`); }
  }
  for (const [role, fn] of Object.entries(renderers)) {
    const p = m.path('course', role);
    if (p === null) { errors.push(`${viewsPath} writes the view course.${role}, which spec.yaml does not declare`); continue; }
    const read = (rel) => { try { return fs.readFileSync(path.join(root, rel), 'utf8'); } catch (e) { return null; } };
    let text = null;
    try { text = fn({ read, manifest: m, command: cmd }); } catch (e) { errors.push(`${viewsPath} cannot render course.${role}: ${e.message}`); }
    if (text !== null) views.push({ ref: `course.${role}`, path: p, text });
    // a view is generated from the manifest: the test map holds it to what generate-map writes
    if (!by.has(`course.${role}`)) by.set(`course.${role}`, []);
    by.get(`course.${role}`).push(['check-spec', 'map']);
  }

  const all = m.roles();
  const checks = m.path('course', 'checks');
  const out = [
    `Generated from \`spec.yaml\` by \`${cmd}\`: do not edit it by hand, change the manifest (its roles and its \`map:\`) and run the command again.`,
    '',
    `The files of this MAJOR, one table per owner, a row per role the manifest declares: the file, what it holds and who reads it (\`map:\`), its kind, told from its path (\`data\` a \`.yaml\`, \`prose\` a \`.md\`, \`script\` a program, \`folder\`), and what tests it, the tests of \`check-spec\` and the checks of a course that read it, as each says. The readers are defined in \`spec-directives/README.md\`, « The readers »; the tests of \`check-spec\` in \`spec-directives/1/README.md\` section 8${checks === null ? '' : `, the checks of a course in \`${checks}/README.md\``}.`,
  ];
  for (const owner of ['spec', 'course']) {
    const roles = all.filter((r) => r.owner === owner);
    if (roles.length) out.push('', `### ${OWNERS[owner]}`, '', table(root, m, roles, by));
  }
  for (const product of m.products()) {
    const roles = all.filter((r) => r.owner === product);
    if (!roles.length) continue;
    out.push('', `### The product \`${product}\``, '', table(root, m, roles, by));
    const build = m.path(product, 'build');
    out.push('', build !== null ? `Built from the course by [\`${build}/\`](${build}/).` : 'No build declared.');
  }
  const undeclared = m.doc && m.doc.map && typeof m.doc.map.undeclared === 'object' && m.doc.map.undeclared ? m.doc.map.undeclared : {};
  for (const [product, line] of Object.entries(undeclared)) {
    out.push('', `### The product \`${product}\``, '', `[\`products/${product}/\`](products/${product}/), ${line.replace(/\.$/, '')}.`);
  }
  return { section: out.join('\n'), views, errors };
}

const HEADING = /^## 2\. /;
function bounds(lines) {
  const start = lines.findIndex((l) => HEADING.test(l));
  if (start < 0) return null;
  let end = lines.findIndex((l, i) => i > start && /^## /.test(l));
  if (end < 0) end = lines.length;
  return { start, end };
}
function splice(readme, section) {
  const lines = readme.split('\n');
  const b = bounds(lines);
  if (!b) return null;
  const tail = b.end < lines.length ? ['', ...lines.slice(b.end)] : [''];
  return [...lines.slice(0, b.start + 1), '', ...section.split('\n'), ...tail].join('\n');
}
const at = (readme) => { const b = bounds(readme.split('\n')); return b ? b.start + 1 : null; };

module.exports = { render, command, splice, at, kind };
