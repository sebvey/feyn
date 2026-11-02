'use strict';
// The dependencies of package.json (decision `checks-use-ajv-and-yaml`), the package of this
// directives MAJOR (spec-directives/<MAJOR>/, the parent of lib/): an entry point calls need()
// before it requires them, and stops with one line naming the command that installs them when
// one is missing from that folder's node_modules/ (`npm ci` not run). The command is a plain one
// (`npm ci --prefix <dir>`, no `cd` compound), so an agent in a worktree can run it.
const fs = require('fs');
const path = require('path');

const PACKAGE = path.join(__dirname, '..');

function need() {
  const deps = Object.keys(JSON.parse(fs.readFileSync(path.join(PACKAGE, 'package.json'), 'utf8')).dependencies || {});
  if (deps.every((d) => fs.existsSync(path.join(PACKAGE, 'node_modules', d, 'package.json')))) return;
  const dir = path.relative(process.cwd(), PACKAGE) || '.';
  console.error(`checks: dependencies missing, run: mise exec -- npm ci --prefix ${dir}`);
  process.exit(2);
}

module.exports = { need };
