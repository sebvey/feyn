'use strict';
// plan.md, glossary.md, CHANGELOG.md and the domain files: presence, frontmatter, sections,
// leads, no unlisted domain file (SPEC.md sections 5 and 6); « Accueil » of plan.md and its
// questions.
const yaml = require('./lib/yaml');
const mdlib = require('./lib/md');
const glossary = require('./lib/glossary');
const { fail } = require('./lib/course');

const SEMVER = /^(\d+)\.(\d+)\.(\d+), \d{4}-\d{2}-\d{2}$/;

// « Accueil »: a posture paragraph, then a numbered list of questions "<n>. **<question label>** : <question>"
function onboarding(secs, title) {
  const found = secs.filter((s) => s.title === title);
  if (!found.length) return [fail('plan.md', 1, `plan.md has no « ${title} » section: mandatory (the teacher's posture, then the onboarding questions)`)];
  if (found.length > 1) return [fail('plan.md', found[1].line, `« ${title} » appears twice in plan.md`)];
  const s = found[0];
  const out = [];
  const lines = s.lines.filter((l) => !l.code);
  const first = lines.findIndex((l) => /^\d+\. /.test(l.t));
  const posture = mdlib.blocks(first < 0 ? lines : lines.slice(0, first));
  if (!posture.length) out.push(fail('plan.md', s.line, `« ${title} » opens with a paragraph giving the teacher's posture`));
  else if (posture.length > 1) out.push(fail('plan.md', posture[1].line, `« ${title} » opens with one paragraph giving the teacher's posture, found ${posture.length} before the list`));
  if (first < 0) { out.push(fail('plan.md', s.line, `« ${title} » has no numbered list of onboarding questions`)); return out; }
  const labels = new Set();
  let blank = false;
  for (const l of lines.slice(first)) {
    if (!l.t.trim()) { blank = true; continue; }
    const m = /^\d+\. \*\*([^*]+)\*\* : \S/.exec(l.t);
    if (m) {
      if (labels.has(m[1])) out.push(fail('plan.md', l.n, `question label « ${m[1]} » is used twice: question labels are distinct`));
      labels.add(m[1]);
      blank = false;
    } else if (/^\d+\. /.test(l.t)) out.push(fail('plan.md', l.n, 'an onboarding question is "<n>. **<question label>** : <question>"'));
    else if (blank || !/^\s/.test(l.t)) out.push(fail('plan.md', l.n, `the numbered list of questions ends « ${title} »: nothing after it`));
  }
  return out;
}

function run(ctx) {
  if (!ctx.usable) return [fail('course.yaml', ctx.cyError ? ctx.cyError.line : 1, 'course.yaml is unusable: see course-yaml')];
  if (!ctx.packOk) return [fail('course.yaml', 1, 'the language pack is unusable: see language-pack-keys')];
  const H = (k) => ctx.word('headings', k) || k;
  const out = [];
  const numbers = ctx.allNumbers();

  // plan.md
  if (!ctx.exists('plan.md')) out.push(fail('plan.md', 1, 'mandatory file is missing'));
  else {
    const secs = mdlib.sections(ctx.md('plan.md').body, 2).sections;
    if (!secs.length || secs[0].title !== H('audience')) out.push(fail('plan.md', secs.length ? secs[0].line : 1, `the first ## section of plan.md is « ${H('audience')} »`));
    else if (!secs[0].lines.some((l) => l.t.trim())) out.push(fail('plan.md', secs[0].line, `« ${H('audience')} » is empty`));
    out.push(...onboarding(secs, H('onboarding')));
  }
  if (!ctx.exists('storyline.md')) out.push(fail('storyline.md', 1, 'mandatory file is missing'));

  // glossary.md
  if (!ctx.exists('glossary.md')) out.push(fail('glossary.md', 1, 'mandatory file is missing'));
  else {
    const g = ctx.md('glossary.md');
    const secs = mdlib.sections(g.body, 2);
    const tabs = mdlib.tables(secs.pre);
    if (tabs.length !== 1) out.push(fail('glossary.md', 1, `the glossary holds one table before any ## section, found ${tabs.length}`));
    else {
      const t = tabs[0];
      if (t.header.length !== 4) out.push(fail('glossary.md', t.line, `the glossary table has ${t.header.length} columns, expected 4 (term, English term, definition, defining concept)`));
      else {
        const seen = new Map();
        for (const r of t.rows) {
          if (r.cells.length !== 4) { out.push(fail('glossary.md', r.line, `row has ${r.cells.length} cells, expected 4`)); continue; }
          if (!r.cells[0]) out.push(fail('glossary.md', r.line, 'a row has no term'));
          if (!numbers.has(glossary.definingNumber(r.cells[3]))) out.push(fail('glossary.md', r.line, `defining concept "${r.cells[3]}": one concept number of course.yaml, the concept that teaches the term`));
          for (const v of glossary.termCell(r.cells[0]).variants) {
            const k = v.toLowerCase();
            if (seen.has(k)) out.push(fail('glossary.md', r.line, `variant "${v}" is also in the row at glossary.md:${seen.get(k)}: a variant belongs to one row`));
            else seen.set(k, r.line);
          }
        }
      }
    }
    for (const s of secs.sections) {
      if (s.title !== H('avoid')) { out.push(fail('glossary.md', s.line, `unexpected section "${s.title}": the only section is « ${H('avoid')} »`)); continue; }
      const t = mdlib.tables(s.lines);
      if (t.length !== 1 || t[0].header.length !== 3) out.push(fail('glossary.md', s.line, `« ${H('avoid')} » holds one table of three columns`));
    }
  }

  // CHANGELOG.md
  if (!ctx.exists('CHANGELOG.md')) out.push(fail('CHANGELOG.md', 1, 'mandatory file is missing'));
  else {
    const secs = mdlib.sections(ctx.md('CHANGELOG.md').body, 2).sections;
    if (!secs.length || secs[0].title !== H('unreleased')) out.push(fail('CHANGELOG.md', secs.length ? secs[0].line : 1, `the first ## section of CHANGELOG.md is « ${H('unreleased')} »`));
    let prev = null;
    secs.forEach((s, i) => {
      if (i > 0) {
        const m = SEMVER.exec(s.title);
        if (!m) out.push(fail('CHANGELOG.md', s.line, `release section "${s.title}" must be "X.Y.Z, YYYY-MM-DD"`));
        else {
          const v = [1, 2, 3].map((k) => parseInt(m[k], 10));
          if (prev && (v[0] - prev[0] || v[1] - prev[1] || v[2] - prev[2]) >= 0) out.push(fail('CHANGELOG.md', s.line, `release ${s.title.split(',')[0]} is not older than the one above it: newest first`));
          prev = v;
        }
      }
      for (const l of s.lines) {
        if (l.code || !/^- /.test(l.t)) continue;
        if (!/^- (MAJOR|MINOR|PATCH), .+ : .+/.test(l.t)) out.push(fail('CHANGELOG.md', l.n, 'an entry is "- MAJOR|MINOR|PATCH, <where> : <what>"'));
      }
    });
  }

  // domain files: every file of domains/ is the file of a domain of course.yaml
  const listed = new Set(ctx.cy.domains.map((d) => (d && typeof d.file === 'string' ? d.file : null)));
  for (const e of ctx.list('domains')) {
    if (e.name.startsWith('.')) continue;
    if (!listed.has('domains/' + e.name)) out.push(fail(`domains/${e.name}`, 1, `domains/${e.name} is the file of no domain of course.yaml: every file of domains/ is listed`));
  }
  ctx.cy.domains.forEach((d, i) => {
    if (!d || typeof d !== 'object' || typeof d.file !== 'string') return;
    const f = d.file;
    const m = ctx.md(f);
    if (!m) return;
    if (m.error) { out.push(fail(f, m.error.line, m.error.message)); return; }
    if (!m.data || typeof m.data !== 'object') out.push(fail(f, 1, 'domain file needs a frontmatter with description'));
    else {
      for (const k of Object.keys(m.data)) if (k !== 'description') out.push(fail(f, yaml.lineOf(m.data, k), `frontmatter key "${k}": a domain file has only description (the rest is in course.yaml)`));
      if (typeof m.data.description !== 'string' || !m.data.description.trim()) out.push(fail(f, 2, 'frontmatter description is mandatory'));
    }
    for (const h of mdlib.headings(m.body)) if (h.level === 1) out.push(fail(f, h.line, 'no H1 in a domain file'));
    const secs = mdlib.sections(m.body, 2).sections;
    const want = ['problem', 'concept_thread', 'from_to', 'crossing_case'].map(H);
    if (secs.map((s) => s.title).join('|') !== want.join('|')) {
      out.push(fail(f, secs.length ? secs[0].line : 1, `sections must be, in order: ${want.map((w) => '« ' + w + ' »').join(', ')}; found ${secs.map((s) => '« ' + s.title + ' »').join(', ') || 'none'}`));
      return;
    }
    for (const s of secs) if (!s.lines.some((l) => l.t.trim())) out.push(fail(f, s.line, `« ${s.title} » is empty`));
    // concept thread
    const thread = secs[1];
    const paras = mdlib.blocks(thread.lines);
    const leads = [];
    const nums = Array.isArray(d.concepts) ? d.concepts.map((c) => String(c)) : [];
    if (nums.length === 1) {
      const c = ctx.conceptByNumber(nums[0]);
      if (c) {
        leads.push(`**${c.number}. ${c.entry.title}.**`);
        for (const s of c.subs.filter((x) => x.level === 1)) leads.push(`**${s.id}. ${s.title}.**`);
      }
    } else {
      for (const n of nums) {
        const c = ctx.conceptByNumber(n);
        if (c) leads.push(`**${c.number}. ${c.entry.title}.**`);
      }
    }
    if (paras.length !== leads.length) out.push(fail(f, thread.line, `« ${thread.title} » has ${paras.length} paragraphs, expected ${leads.length} (one per ${nums.length === 1 ? 'concept, then one per first-level sub-concept' : 'concept'})`));
    leads.forEach((lead, k) => {
      if (paras[k] && !paras[k].text.startsWith(lead)) out.push(fail(f, paras[k].line, `paragraph ${k + 1} must open with ${lead}`));
    });
  });
  return out;
}

module.exports = { id: 'course-files', run };
