'use strict';
// The checks as the rule files give them (decision `rules-with-level-and-method`): each check
// named by the `check` of a rule of rules/course.yaml or rules/spec.yaml, with the category, the
// level and the methods of its rules, and the severity that follows (SPEC.md section 7): a check
// blocks when it verifies requirements by test, otherwise it reports. rules/protocol.yaml is the
// teacher's and names no check of a course.
//
// A check runs on a course (`check-course`) when its method is test, its script is in this
// folder, and it verifies rules of rules/course.yaml, or its script exports `runsOn: 'course'`
// (language-pack-keys: a rule on the spec itself, verified on the pack of each course's
// language). The other checks of rules/spec.yaml are check-spec's; a check of another method
// (taught-check, an agent workflow) is not run by a script of this folder.
const fs = require('fs');
const path = require('path');
const yaml = require('./yaml-lines');

const CHECKS = path.join(__dirname, '..');
const FILES = ['rules/course.yaml', 'rules/spec.yaml'];

class RulesError extends Error {}

// specDir: the MAJOR's folder (the folder above checks/)
function load(specDir = path.join(CHECKS, '..')) {
  const byId = new Map();
  const categories = [];
  for (const file of FILES) {
    let doc;
    try { doc = yaml.parse(fs.readFileSync(path.join(specDir, file), 'utf8')); } catch (e) {
      throw new RulesError(`cannot read ${file}${e.line ? `:${e.line}` : ''}: ${e.message} (check-spec says more)`);
    }
    for (const g of (doc && Array.isArray(doc.groups) ? doc.groups : [])) {
      for (const r of (g && Array.isArray(g.rules) ? g.rules : [])) {
        const category = r.category !== undefined ? r.category : g.category;
        const method = r.method !== undefined ? r.method : g.method;
        if (typeof category === 'string' && !categories.includes(category)) categories.push(category);
        if (typeof r.check !== 'string') continue;
        if (!byId.has(r.check)) byId.set(r.check, { id: r.check, file, category, level: r.level, methods: [], rules: [] });
        const c = byId.get(r.check);
        if (!c.methods.includes(method)) c.methods.push(method);
        c.rules.push(r.id);
      }
    }
  }
  const checks = [...byId.values()];
  for (const c of checks) {
    const byTest = c.methods.length === 1 && c.methods[0] === 'test';
    c.severity = byTest && c.level === 'requirement' ? 'blocks' : 'reports';
    const script = path.join(CHECKS, c.id + '.js');
    const exists = /^[a-z0-9-]+$/.test(c.id) && fs.existsSync(script);
    const onCourse = c.file === 'rules/course.yaml' || (exists && require(script).runsOn === 'course');
    if (byTest && exists && onCourse) c.runsHere = true;
    else {
      c.runsHere = false;
      if (byTest && exists) c.how = 'check-spec';
      else if (byTest) c.how = `no script checks/${c.id}.js`;
      else if (fs.existsSync(path.resolve(CHECKS, '..', '..', '..', '..', '.claude', 'workflows', c.id + '.js'))) c.how = `${c.methods.join(', ')}, the agent workflow .claude/workflows/${c.id}.js`;
      else c.how = c.methods.join(', ');
    }
  }
  return { checks, categories };
}

module.exports = { load, RulesError };
