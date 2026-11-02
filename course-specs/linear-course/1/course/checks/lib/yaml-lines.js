'use strict';
// YAML 1.2 through the `yaml` package (decision `checks-use-ajv-and-yaml`), turned into plain
// values. `lines` maps every map / sequence to the line (1-based, shifted by `lineOffset`) of
// each of its keys / items, from the package's node ranges and its LineCounter, so checks can
// point at a line: a key's line, or for a block sequence item the line of its "-".

const YAML = require('yaml');

const lines = new WeakMap();

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
    for (const pair of pairs) {
      const key = String(YAML.isScalar(pair.key) ? pair.key.value : pair.key);
      if (pair.key && pair.key.range) ln[key] = lineAt(pair.key.range[0]);
      obj[key] = value(pair.value);
    }
    lines.set(obj, ln);
    return obj;
  }

  return value(doc.contents);
}

// line of `key` (or index) in a parsed map / sequence; `fallback` when unknown
function lineOf(container, key, fallback) {
  const m = container && typeof container === 'object' ? lines.get(container) : null;
  return (m && m[key]) || fallback || 1;
}

module.exports = { parse, lineOf, YamlError };
