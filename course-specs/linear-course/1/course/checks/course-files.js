'use strict';
// The course files, from their form in course/form.yaml (`plan`, `domain_file`, `storyline`) and
// their rules (course/README.md sections 4 and 5): plan.md (its sections in the order of the
// form, « Accueil » and its questions), the domain files (no frontmatter, no H1, the sections of
// the form, no unlisted file), storyline.md (« Faits fixés » last, each fact ending with the id of
// a unit of the course), glossary.md and CHANGELOG.md.
const directives = require('./directives');
const mdlib = directives.lib('md');
const glossary = directives.lib('glossary');
const { fail } = directives.lib('course');

const SEMVER = /^(\d+)\.(\d+)\.(\d+), \d{4}-\d{2}-\d{2}$/;
// a fixed fact ends with the id of the unit that fixed it, in parentheses, a final period allowed
const FACT_UNIT = /\(([^()\s]+)\)\.?$/;

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
  if (!ctx.lexiconOk) return [fail(ctx.lexiconFile || 'course/lexicon.yaml', 1, 'the lexicon is unusable: see course/README.md section 7')];
  if (!ctx.form || !ctx.form.plan || !ctx.form.domain_file || !ctx.form.storyline) return [fail('course/form.yaml', 1, `the form of the course files is unusable (${ctx.formError || 'no plan, domain_file or storyline'}): see course/README.md sections 4 and 5`)];
  const H = (k) => ctx.word('headings', k) || k;
  const out = [];
  const numbers = ctx.allNumbers();
  const empty = (sec) => !sec.lines.some((l) => l.t.trim());

  // plan.md: the sections of the form, the first ## first and each after the one before it;
  // « Accueil » its posture and its questions
  const PLAN = ctx.form.plan.file;
  if (!ctx.exists(PLAN)) out.push(fail(PLAN, 1, 'mandatory file is missing'));
  else {
    const secs = mdlib.sections(ctx.md(PLAN).body, 2).sections;
    const want = ctx.form.plan.sections.map((p) => H(p.heading));
    want.forEach((title, k) => {
      const i = secs.findIndex((x) => x.title === title);
      if (title === H('onboarding')) return; // onboarding() says it
      if (i < 0) out.push(fail(PLAN, k === 0 && secs.length ? secs[0].line : 1, k === 0 ? `the first ## section of ${PLAN} is « ${title} »` : `${PLAN} has no « ${title} » section: mandatory, the ## section that follows « ${want[k - 1]} »`));
      else if (i !== k) out.push(fail(PLAN, secs[i].line, k === 0 ? `the first ## section of ${PLAN} is « ${title} »` : `« ${title} » is the ## section that follows « ${want[k - 1]} » in ${PLAN}`));
      else if (empty(secs[i])) out.push(fail(PLAN, secs[i].line, `« ${title} » is empty`));
    });
    out.push(...onboarding(secs, H('onboarding')));
  }

  // storyline.md: the world, then « Faits fixés », last when present, one bullet per fact, each
  // ending with the id of a unit of the course
  const STORY = ctx.form.storyline.file;
  if (!ctx.exists(STORY)) out.push(fail(STORY, 1, 'mandatory file is missing'));
  else {
    const secs = mdlib.sections(ctx.md(STORY).body, 2).sections;
    const title = H(ctx.form.storyline.fixed_facts.heading);
    const found = secs.filter((x) => x.title === title);
    if (found.length > 1) out.push(fail(STORY, found[1].line, `« ${title} » appears twice in ${STORY}`));
    if (found.length && secs[secs.length - 1] !== found[0]) out.push(fail(STORY, found[0].line, `« ${title} » is the last ## section of ${STORY}: the world comes before it`));
    if (found.length) {
      const units = new Set(ctx.concepts.flatMap((c) => c.subs.filter((x) => x.leaf).map((x) => x.id)));
      const facts = [];
      for (const l of found[0].lines) {
        if (!l.t.trim()) continue;
        if (!l.code && /^- /.test(l.t)) facts.push({ line: l.n, text: l.t.slice(2).trim() });
        else if (!l.code && /^\s/.test(l.t) && facts.length) facts[facts.length - 1].text += ' ' + l.t.trim();
        else out.push(fail(STORY, l.n, `« ${title} » holds a bulleted list only, one fact per bullet`));
      }
      if (!facts.length) out.push(fail(STORY, found[0].line, `« ${title} » is empty`));
      for (const fact of facts) {
        const m = FACT_UNIT.exec(fact.text);
        if (!m) out.push(fail(STORY, fact.line, 'a fixed fact ends with the id of the unit that fixed it, in parentheses: « (0d) »'));
        else if (!units.has(m[1])) out.push(fail(STORY, fact.line, `fixed fact names "${m[1]}", which is no unit of the course (the id of a ### unit, or of a ## section without units)`));
      }
    }
  }

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
  const DF = ctx.form.domain_file;
  const want = DF.sections.map((p) => H(p.heading));
  ctx.cy.domains.forEach((d) => {
    if (!d || typeof d !== 'object' || typeof d.file !== 'string') return;
    const f = d.file;
    const m = ctx.md(f);
    if (!m) return;
    if (m.error) { out.push(fail(f, m.error.line, m.error.message)); return; }
    if (m.hasFront && !DF.frontmatter) out.push(fail(f, 1, 'a domain file has no frontmatter: its title and its objective are in course.yaml'));
    for (const h of mdlib.headings(m.body)) if (h.level === 1) out.push(fail(f, h.line, 'no H1 in a domain file'));
    const secs = mdlib.sections(m.body, 2).sections;
    if (secs.map((s) => s.title).join('|') !== want.join('|')) {
      out.push(fail(f, secs.length ? secs[0].line : 1, `sections must be, in order: ${want.map((w) => '« ' + w + ' »').join(', ')}, and no other; found ${secs.map((s) => '« ' + s.title + ' »').join(', ') || 'none'}`));
      return;
    }
    for (const s of secs) if (empty(s)) out.push(fail(f, s.line, `« ${s.title} » is empty`));
  });
  return out;
}

module.exports = { id: 'course-files', run };
