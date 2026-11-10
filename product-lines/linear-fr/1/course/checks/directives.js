'use strict';
// The spec directives this spec MAJOR follows: spec.yaml, at the MAJOR's root, declares their
// MAJOR (`directives: <MAJOR>`), and the checks load lib/ and the packages (yaml, ajv,
// mdast-util-from-markdown) of spec-directives/<MAJOR>/ through a createRequire on its
// package.json (decision `checks-use-ajv-and-yaml`), so an archived spec MAJOR keeps the lib of its
// directives.
// spec.yaml is read by a line scan, since the YAML reader is the directives' own package (as
// product-lines/check-course reads course.yaml). A missing spec.yaml, no `directives` line, a
// directives MAJOR with no folder or its dependencies not installed stop the run: exit 2, one line.
//   const directives = require('./directives');
//   const mdlib = directives.lib('md');                      // spec-directives/<MAJOR>/lib/md.js
//   const Ajv2020 = directives.require('ajv/dist/2020').default; // from its node_modules/
const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

// here is product-lines/<name>/<MAJOR>/course/checks
const MAJOR = path.resolve(__dirname, '..', '..');
const REPO = path.resolve(MAJOR, '..', '..', '..');
const rel = (p) => path.relative(process.cwd(), p) || '.';

function stop(message) {
  console.error(`checks: ${message}`);
  process.exit(2);
}

const file = path.join(MAJOR, 'spec.yaml');
let text;
try { text = fs.readFileSync(file, 'utf8'); } catch (e) { stop(`cannot read ${rel(file)}`); }
const line = text.split('\n').find((l) => /^directives\s*:/.test(l));
const major = line && line.replace(/^directives\s*:\s*/, '').replace(/\s+#.*$/, '').trim().replace(/^(['"])(.*)\1$/, '$2');
if (!line || !/^\d+$/.test(major)) stop(`${rel(file)} declares no directives MAJOR (directives: <MAJOR>)`);
const dir = path.join(REPO, 'spec-directives', major);
if (!fs.existsSync(path.join(dir, 'package.json'))) stop(`${rel(file)} declares directives ${major}, which has no folder ${rel(dir)}`);

const req = createRequire(path.join(dir, 'package.json'));
req('./lib/deps').need();

module.exports = {
  dir,
  require: req,
  lib: (name) => req('./lib/' + name),
};
