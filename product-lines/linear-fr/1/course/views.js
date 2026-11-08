'use strict';
// The views of the course's files of this spec MAJOR, which spec-directives/generate-map writes
// (spec-directives/1/lib/map.js, "The views"): a factory given the lib of the directives
// spec.yaml declares, returning for each view the role of spec.yaml it writes and its renderer.
//   form-view   course/form.md, the readable view of course/form.yaml: each file of a course with
//               its parts in order, mandatory or not, published or not, and their readers, the
//               words by their key in course/lexicon.yaml with their value beside it
// The test `map` of check-spec fails when a view differs from what its renderer gives.
module.exports = (lib) => {
  const yaml = lib('yaml-lines');

  function formView({ read, manifest, command }) {
    const formPath = manifest.path('course', 'form');
    const lexiconPath = manifest.path('course', 'lexicon');
    const form = yaml.parse(read(formPath));
    const lexicon = yaml.parse(read(lexiconPath));
    const value = (group, key) => (lexicon && lexicon[group] && typeof lexicon[group][key] === 'string' ? lexicon[group][key] : null);
    const word = (group, key) => {
      const v = value(group, key);
      return `\`${group}.${key}\`${v === null ? '' : ` « ${v.trim()} »`}`;
    };
    const presence = (p) => (p && p.presence) || '';
    const published = (p) => (p && p.published === true ? 'yes' : 'no');
    const readers = (p) => (p && Array.isArray(p.readers) ? p.readers.join(', ') : '');
    const row = (part, w, p) => `| ${part} | ${w || ''} | ${presence(p)} | ${published(p)} | ${readers(p)} |`;
    const HEAD = ['| Part | Word | Presence | Published | Readers |', '|---|---|---|---|---|'];

    const out = [
      '# The form of a course',
      '',
      `Generated from \`${formPath}\` and \`${lexiconPath}\` by \`${command}\`: do not edit it by hand, change the form or the lexicon and run the command again.`,
      '',
      `The files of a course of \`${manifest.doc.name}\`, each with its parts in their order: whether a part is mandatory, whether the site publishes it, and who reads it (\`site\` the site reader, through the build; \`teacher\`; \`learner\`, who hears it from the teacher or reads it on the site). A word is given by its key in \`${lexiconPath}\`, its value beside it. What each part holds and the rules on it are \`course/README.md\` and \`course/rules.yaml\`.`,
    ];

    // the concept folder
    const folder = form.folder || {};
    out.push('', '## A concept folder', '', `Its files: ${(folder.files || []).map((f) => `\`${f}\``).join(', ')}${folder.diagrams ? `, and its diagrams, \`${folder.diagrams}\`` : ''}; nothing else.`);

    // concept.md
    const cf = form.concept_file || {};
    const sep = cf.separator ? value('block_kinds', cf.separator) : null;
    out.push('', `## \`${cf.file || 'concept.md'}\``, '');
    if (cf.frontmatter) out.push(`Its frontmatter: its keys and their form are \`${cf.frontmatter}\`. Every heading of its body opens with its kind, one kind at one level; a heading that carries an id is \`<kind word> <id>${sep === null ? '<separator>' : sep}<title>\`.`, '');
    out.push(...HEAD);
    for (const [k, p] of Object.entries(cf.frontmatter_fields || {})) out.push(row(`frontmatter, \`${k}\``, p.heading ? word('headings', p.heading) : '', p));
    if (cf.title) out.push(row(`title, \`${'#'.repeat(cf.title.heading_level || 1)}\``, `${word('block_kinds', cf.title.kind)}, an annex ${word('block_kinds', cf.title.annex_kind)}`, cf.title));
    if (cf.head) out.push(row('head, `##`', word('headings', cf.head.heading), cf.head));
    if (cf.sections) {
      const s = cf.sections;
      out.push(row(`sections, \`${'#'.repeat(s.heading_level || 2)}\`, each holding its units, \`${'#'.repeat(s.unit_heading_level || 3)}\`, one to ${s.max_units}`, `${word('block_kinds', s.kind)}; a unit ${word('block_kinds', s.unit_kind)}`, s));
    }
    if (cf.foot) {
      out.push(row('foot, `##`', word('headings', cf.foot.heading), cf.foot));
      for (const b of cf.foot.blocks || []) out.push(row('a block of the foot, `###`', word('headings', b.heading), b));
    }

    // a unit
    const unit = form.unit || {};
    out.push('', '### A unit', '', `Its blocks, \`${'#'.repeat(unit.heading_level || 4)}\`, in this order, and nothing else; a block is of one publication, its fields have none of their own.`, '');
    out.push('| Block | Word | Presence | Published | Readers | Fields |', '|---|---|---|---|---|---|');
    for (const b of unit.blocks || []) {
      const w = b.labelled ? word('unit_blocks', b.block) : `${word('unit_fields', (b.fields || [])[0])}, unlabelled`;
      const fields = [];
      if (b.cases) {
        const c = b.cases;
        fields.push(`each case under its heading \`${'#'.repeat(c.heading_level || 5)}\` ${word('block_kinds', c.kind)}, then ${(b.fields || []).map((f) => word('unit_fields', f)).join(', ')}`);
        if (c.in_play) fields.push(`the field \`${c.in_play.field}\` names misconceptions of the unit, separated by « ${c.in_play.separator} »`);
        if (c.revealed) fields.push(`shown hidden on the site: ${c.revealed.map((f) => word('unit_fields', f)).join(', ')}`);
      } else if (b.labelled) {
        for (const f of b.fields || []) {
          if (b.misconceptions && b.misconceptions.field === f) fields.push(`${word('unit_fields', f)}, a list, each misconception with ${b.misconceptions.parts.map((x) => word('unit_fields', x)).join(', ')}`);
          else fields.push(word('unit_fields', f));
        }
      } else fields.push('its one field, prose');
      out.push(`| \`${b.block}\` | ${w} | ${presence(b)} | ${published(b)} | ${readers(b)} | ${fields.join('; ')} |`);
    }
    if (unit.length) {
      const l = unit.length;
      out.push('', `The length of a teacher message: the text of ${l.fields.map((f) => word('unit_fields', f)).join(', ')} of the unit's case, the misconceptions left out, at most ${l.max} lines of ${l.line} characters (above, \`teacher-message-length\` reports it).`);
    }

    // sources.md
    const sections = (title, file, list, kind) => {
      out.push('', `## \`${file}\``, '');
      if (title) out.push(title, '');
      out.push(...HEAD);
      for (const s of list || []) out.push(row(`${kind}, \`##\``, word('headings', s.heading), s));
    };
    if (form.sources) sections('Its sections, in this order.', form.sources.file, form.sources.sections, 'section');

    // course.yaml, logo.svg
    if (form.course_map) {
      const c = form.course_map;
      out.push('', `## \`${c.file}\``, '', `Its fields and their form are \`${c.schema}\`. Published: ${published(c)}. Readers: ${readers(c)}.`);
    }
    if (form.logo) out.push('', `## \`${form.logo.file}\``, '', `At the root of the course folder. Presence: ${presence(form.logo)}. Published: ${published(form.logo)}. Readers: ${readers(form.logo)}.`);

    // plan.md
    if (form.plan) {
      sections('Its sections, in this order, then its free sections.', form.plan.file, form.plan.sections, 'section');
      if (form.plan.free_sections) out.push(row('free sections, `##`, of free titles, after them', '', form.plan.free_sections));
    }
    // the domain file
    if (form.domain_file) {
      const d = form.domain_file;
      sections(`In \`${d.folder}/\`, \`<number>-<slug>.md\`: ${d.frontmatter === false ? 'no frontmatter, ' : ''}its sections, in this order, and nothing else.`, `${d.folder}/<number>-<slug>.md`, d.sections, 'section');
    }
    // storyline.md
    if (form.storyline) {
      const s = form.storyline;
      out.push('', `## \`${s.file}\``, '', ...HEAD);
      if (s.world) out.push(row('the world: its H1 and its sections of free titles, `##`', '', s.world));
      if (s.fixed_facts) out.push(row(`the fixed facts, \`##\`, ${s.fixed_facts.position || ''}`.trim(), word('headings', s.fixed_facts.heading), s.fixed_facts));
    }
    // glossary.md
    if (form.glossary) {
      const g = form.glossary;
      out.push('', `## \`${g.file}\``, '', ...HEAD);
      if (g.table) out.push(row('its table, one term per row, before any section', '', g.table));
      for (const s of g.sections || []) out.push(row('section, `##`', word('headings', s.heading), s));
    }
    // CHANGELOG.md
    if (form.changelog) {
      const c = form.changelog;
      out.push('', `## \`${c.file}\``, '', ...HEAD);
      if (c.latest_release) out.push(row('the latest release, its version and its date', '', c.latest_release));
    }
    return out.join('\n') + '\n';
  }

  return { 'form-view': formView };
};
