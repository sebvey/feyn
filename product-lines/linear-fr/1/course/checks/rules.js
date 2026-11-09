'use strict';
// The checks of a course as course/rules.yaml gives them (decision `severity-from-level-and-method`):
// each check named by the `check` of a rule of course/rules.yaml, with the category, the level and
// the methods of its rules, and the severity that follows (README.md section 3 of this MAJOR): a
// check blocks when it verifies requirements by test, otherwise it reports. The level and the
// category are classifications this spec declares for the rules of a course (`spec.yaml`,
// `lists.classifications.course`); the tests of the spec's own files are check-spec's and verify
// no rule.
//
// A check runs on a course (`check-course`) when its method is test and its script is in this
// folder, course/checks/; a check of another method (taught-check, an agent workflow) may keep its
// course/checks/<id>.js here too, which check-course does not run. The YAML reader is the one of
// the spec directives this MAJOR declares (./directives.js).
const fs = require('fs');
const path = require('path');
const yaml = require('./directives').lib('yaml-lines');

const FILE = 'course/rules.yaml';

class RulesError extends Error {}

// CHECKS: the course/checks/ folder of the spec MAJOR whose rules are read (the MAJOR's folder is
// two above it)
function load(CHECKS) {
  const specDir = path.join(CHECKS, '..', '..');
  const byId = new Map();
  const categories = [];
  let doc;
  try { doc = yaml.parse(fs.readFileSync(path.join(specDir, FILE), 'utf8')); } catch (e) {
    throw new RulesError(`cannot read ${FILE}${e.line ? `:${e.line}` : ''}: ${e.message} (check-spec says more)`);
  }
  for (const g of (doc && Array.isArray(doc.groups) ? doc.groups : [])) {
    for (const r of (g && Array.isArray(g.rules) ? g.rules : [])) {
      const category = r.category !== undefined ? r.category : g.category;
      const method = r.method !== undefined ? r.method : g.method;
      if (typeof category === 'string' && !categories.includes(category)) categories.push(category);
      if (typeof r.check !== 'string') continue;
      if (!byId.has(r.check)) byId.set(r.check, { id: r.check, category, level: r.level, methods: [], rules: [] });
      const c = byId.get(r.check);
      if (!c.methods.includes(method)) c.methods.push(method);
      c.rules.push(r.id);
    }
  }
  const checks = [...byId.values()];
  for (const c of checks) {
    const byTest = c.methods.length === 1 && c.methods[0] === 'test';
    c.severity = byTest && c.level === 'requirement' ? 'blocks' : 'reports';
    const exists = /^[a-z0-9-]+$/.test(c.id) && fs.existsSync(path.join(CHECKS, c.id + '.js'));
    if (byTest && exists) c.runsHere = true;
    else {
      c.runsHere = false;
      if (byTest) c.how = `no script course/checks/${c.id}.js`;
      else if (exists) c.how = `${c.methods.join(', ')}, the agent workflow course/checks/${c.id}.js`;
      else c.how = c.methods.join(', ');
    }
  }
  return { checks, categories };
}

module.exports = { load, RulesError };
