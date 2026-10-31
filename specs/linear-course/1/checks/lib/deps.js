'use strict';
// The dependencies of package.json (decision `checks-use-ajv-and-yaml`): an entry point calls
// need() before it requires them, and stops with one line naming the command that installs
// them when one is missing from this folder's node_modules/ (`npm ci` not run).
const fs = require('fs');
const path = require('path');

const CHECKS = path.join(__dirname, '..');

function need() {
  const deps = Object.keys(JSON.parse(fs.readFileSync(path.join(CHECKS, 'package.json'), 'utf8')).dependencies || {});
  if (deps.every((d) => fs.existsSync(path.join(CHECKS, 'node_modules', d, 'package.json')))) return;
  const dir = path.relative(process.cwd(), CHECKS) || '.';
  console.error(`checks: dependencies missing, run: (cd ${dir} && mise exec -- npm ci)`);
  process.exit(2);
}

module.exports = { need };
