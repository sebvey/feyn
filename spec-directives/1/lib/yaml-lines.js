'use strict';
// YAML 1.2 through the `yaml` package (decision `checks-use-ajv-and-yaml`), turned into plain
// values. `lines` maps every map / sequence to the line (1-based, shifted by `lineOffset`) of
// each of its keys / items, from the package's node ranges and its LineCounter, so checks can
// point at a line: a key's line, or for a block sequence item the line of its "-"; `lineOfError`
// gives the line of an ajv error from its instance path. `sources`
// keeps the source text of each scalar value of a map, for a check that needs the literal (YAML
// reads `1.0` as the number 1).

const YAML = require('yaml');

const lines = new WeakMap();
const sources = new WeakMap();

class YamlError extends Error {
  constructor(message, line) {
    super(message);
    this.line = line;
  }
}

function parse(text, opts = {}) {
  const offset = opts.lineOffset || 0;
  const lc = new YAML.LineCounter();
  const doc = YAML.parseDocument(text, { version: '1.2', lineCounter: lc, prettyErrors: false });
  if (doc.errors.length) {
    const e = doc.errors[0];
    throw new YamlError(e.message, lc.linePos(e.pos[0]).line + offset);
  }
  const lineAt = (pos) => lc.linePos(pos).line + offset;
  // a block sequence item starts after its "-": point at the "-" when only blanks part them
  function itemLine(node) {
    let i = node.range[0] - 1;
    while (i >= 0 && /\s/.test(text[i])) i--;
    return lineAt(text[i] === '-' ? i : node.range[0]);
  }

  function value(node) {
    if (node === null || node === undefined) return null;
    if (YAML.isAlias(node)) return value(node.resolve(doc));
    if (YAML.isMap(node)) return map(node.items);
    // a "key: value" in a flow sequence ([a: b]) is a map of one key
    if (YAML.isPair(node)) return map([node]);
    if (YAML.isSeq(node)) {
      const arr = [];
      const ln = {};
      for (const item of node.items) {
        if (item && item.range) ln[arr.length] = itemLine(item);
        arr.push(value(item));
      }
      lines.set(arr, ln);
      return arr;
    }
    return node.value;
  }
  function map(pairs) {
    const obj = {};
    const ln = {};
    const src = {};
    for (const pair of pairs) {
      const key = String(YAML.isScalar(pair.key) ? pair.key.value : pair.key);
      if (pair.key && pair.key.range) ln[key] = lineAt(pair.key.range[0]);
      if (YAML.isScalar(pair.value) && pair.value.range) src[key] = text.slice(pair.value.range[0], pair.value.range[1]);
      obj[key] = value(pair.value);
    }
    lines.set(obj, ln);
    sources.set(obj, src);
    return obj;
  }

  return value(doc.contents);
}

// line of `key` (or index) in a parsed map / sequence; `fallback` when unknown
function lineOf(container, key, fallback) {
  const m = container && typeof container === 'object' ? lines.get(container) : null;
  return (m && m[key]) || fallback || 1;
}

// line of an ajv error on a parsed value (decision `checks-use-ajv-and-yaml`): the deepest
// container of its instance path (`/concepts/3/slug`) that has a line, or the line of the key it
// names (an unknown key, through `params.additionalProperty`); `fallback`, or 1, when none has one
function lineOfError(data, error, fallback) {
  let node = data;
  let line = fallback || 1;
  for (const p of error.instancePath.split('/').slice(1).map((s) => s.replace(/~1/g, '/').replace(/~0/g, '~'))) {
    if (node === null || typeof node !== 'object') break;
    const key = Array.isArray(node) ? Number(p) : p;
    line = lineOf(node, key, line);
    node = node[key];
  }
  const extra = error.params && error.params.additionalProperty;
  if (extra && node && typeof node === 'object' && !Array.isArray(node)) line = lineOf(node, extra, line);
  return line;
}

// source text of the scalar value of `key` in a parsed map; null when it is not a scalar
function sourceOf(container, key) {
  const m = container && typeof container === 'object' ? sources.get(container) : null;
  return m && key in m ? m[key] : null;
}

module.exports = { parse, lineOf, lineOfError, sourceOf, YamlError };
