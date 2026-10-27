'use strict';
// A small YAML reader for the subset course files use: block maps and sequences, flow
// sequences and maps, plain / quoted / block scalars, comments. No anchors, tags or
// multi-document files. `lines` maps every parsed map / sequence to the line (1-based,
// shifted by `lineOffset`) of each of its keys / items, so checks can point at a line.

const lines = new WeakMap();

class YamlError extends Error {
  constructor(message, line) {
    super(message);
    this.line = line;
  }
}

function stripComment(s) {
  let q = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (q === '"' && c === '\\') i++;
      else if (c === q) {
        if (q === "'" && s[i + 1] === "'") i++;
        else q = null;
      }
    } else if (c === '"' || c === "'") {
      if (i === 0 || /[\s:,\[{-]/.test(s[i - 1])) q = c;
    } else if (c === '#' && (i === 0 || /\s/.test(s[i - 1]))) {
      return s.slice(0, i).replace(/\s+$/, '');
    }
  }
  return s.replace(/\s+$/, '');
}

function quoteOpen(s) {
  // true when s starts a quoted scalar that is not closed on this line
  const c = s[0];
  if (c !== '"' && c !== "'") return false;
  for (let i = 1; i < s.length; i++) {
    if (c === '"' && s[i] === '\\') i++;
    else if (s[i] === c) {
      if (c === "'" && s[i + 1] === "'") i++;
      else return false;
    }
  }
  return true;
}

function unquote(s, line) {
  const c = s[0];
  let out = '';
  let i = 1;
  for (; i < s.length; i++) {
    const ch = s[i];
    if (c === '"' && ch === '\\') {
      const n = s[++i];
      if (n === 'n') out += '\n';
      else if (n === 't') out += '\t';
      else if (n === 'u') { out += String.fromCharCode(parseInt(s.slice(i + 1, i + 5), 16)); i += 4; }
      else if (n === 'x') { out += String.fromCharCode(parseInt(s.slice(i + 1, i + 3), 16)); i += 2; }
      else out += n;
    } else if (ch === c) {
      if (c === "'" && s[i + 1] === "'") { out += "'"; i++; }
      else break;
    } else out += ch;
  }
  if (i >= s.length) throw new YamlError('unterminated quoted string', line);
  return { value: out, rest: s.slice(i + 1) };
}

function plainScalar(s) {
  if (s === '' || s === '~' || s === 'null') return null;
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (/^[-+]?\d+$/.test(s)) return parseInt(s, 10);
  if (/^[-+]?(\d+\.\d*|\.\d+)([eE][-+]?\d+)?$/.test(s)) return parseFloat(s);
  return s;
}

// flow collections ([a, b], {k: v}) on one logical string
function parseFlow(s, line) {
  let i = 0;
  const ws = () => { while (i < s.length && /\s/.test(s[i])) i++; };
  function value() {
    ws();
    if (s[i] === '[') {
      i++;
      const arr = [];
      const ln = {};
      for (;;) {
        ws();
        if (s[i] === ']') { i++; break; }
        ln[arr.length] = line;
        arr.push(value());
        ws();
        if (s[i] === ',') i++;
        else if (s[i] !== ']') throw new YamlError('bad flow sequence', line);
      }
      lines.set(arr, ln);
      return arr;
    }
    if (s[i] === '{') {
      i++;
      const obj = {};
      const ln = {};
      for (;;) {
        ws();
        if (s[i] === '}') { i++; break; }
        let key;
        if (s[i] === '"' || s[i] === "'") {
          const r = unquote(s.slice(i), line);
          key = r.value;
          i = s.length - r.rest.length;
        } else {
          const m = /^[^:,}]+/.exec(s.slice(i));
          if (!m) throw new YamlError('bad flow map', line);
          key = m[0].trim();
          i += m[0].length;
        }
        ws();
        if (s[i] !== ':') throw new YamlError('bad flow map', line);
        i++;
        ln[key] = line;
        obj[key] = value();
        ws();
        if (s[i] === ',') i++;
        else if (s[i] !== '}') throw new YamlError('bad flow map', line);
      }
      lines.set(obj, ln);
      return obj;
    }
    if (s[i] === '"' || s[i] === "'") {
      const r = unquote(s.slice(i), line);
      i = s.length - r.rest.length;
      return r.value;
    }
    const m = /^[^,\]}]*/.exec(s.slice(i));
    i += m[0].length;
    return plainScalar(m[0].trim());
  }
  const v = value();
  ws();
  if (i < s.length) throw new YamlError('unexpected text after flow value', line);
  return v;
}

function parse(text, opts = {}) {
  const offset = opts.lineOffset || 0;
  const raw = text.replace(/\r\n?/g, '\n').split('\n');
  const L = raw.map((t, k) => ({ t, n: k + 1 + offset }));
  let p = 0;

  const indentOf = (t) => t.length - t.trimStart().length;
  const isBlank = (t) => t.trim() === '' || t.trim().startsWith('#');
  function skipBlank() {
    while (p < L.length && isBlank(L[p].t)) p++;
  }

  // the value written after "key:" or "- " on line L[p]; consumes continuation lines
  function inlineValue(rest, indent, ln) {
    rest = rest.trim();
    if (rest[0] === '|' || rest[0] === '>') {
      const folded = rest[0] === '>';
      const block = [];
      let bi = null;
      while (p < L.length) {
        const t = L[p].t;
        if (t.trim() === '') { block.push(''); p++; continue; }
        const ind = indentOf(t);
        if (ind <= indent) break;
        if (bi === null) bi = ind;
        block.push(t.slice(Math.min(bi, ind)));
        p++;
      }
      while (block.length && block[block.length - 1] === '') block.pop();
      return folded ? block.join(' ').replace(/ {2,}/g, ' ') : block.join('\n');
    }
    if (quoteOpen(rest)) {
      let acc = rest;
      while (quoteOpen(acc)) {
        if (p >= L.length) throw new YamlError('unterminated quoted string', ln);
        acc += ' ' + L[p].t.trim();
        p++;
      }
      rest = acc;
    }
    rest = quoteOpen(rest) ? rest : stripComment(rest);
    if (rest[0] === '"' || rest[0] === "'") {
      const r = unquote(rest, ln);
      if (r.rest.trim() !== '') throw new YamlError('unexpected text after quoted string', ln);
      return r.value;
    }
    if (rest[0] === '[' || rest[0] === '{') {
      let acc = rest;
      const bal = (s) => {
        let d = 0, q = null;
        for (let i = 0; i < s.length; i++) {
          const c = s[i];
          if (q) { if (c === q) q = null; }
          else if (c === '"' || c === "'") q = c;
          else if (c === '[' || c === '{') d++;
          else if (c === ']' || c === '}') d--;
        }
        return d;
      };
      while (bal(acc) > 0 && p < L.length) { acc += ' ' + stripComment(L[p].t.trim()); p++; }
      return parseFlow(acc, ln);
    }
    // plain scalar, possibly continued on deeper-indented lines
    let acc = rest;
    while (p < L.length && !isBlank(L[p].t) && indentOf(L[p].t) > indent) {
      acc += ' ' + stripComment(L[p].t.trim());
      p++;
    }
    return plainScalar(acc);
  }

  function parseKey(s, ln) {
    if (s[0] === '"' || s[0] === "'") {
      const r = unquote(s, ln);
      const m = /^\s*:(\s+|$)/.exec(r.rest);
      if (!m) return null;
      return { key: r.value, rest: r.rest.slice(m[0].length) };
    }
    const m = /^([^\s#'"\[{][^:]*?|[^\s#'"\[{]):(\s+|$)/.exec(s);
    if (!m) return null;
    return { key: m[1].trim(), rest: s.slice(m[0].length) };
  }

  function block(indent) {
    skipBlank();
    if (p >= L.length) return null;
    const t = L[p].t.trim();
    if (t === '-' || t.startsWith('- ')) return seq(indentOf(L[p].t));
    if (parseKey(t, L[p].n)) return map(indentOf(L[p].t));
    const ln = L[p].n;
    p++;
    return inlineValue(t, indent, ln);
  }

  function seq(indent) {
    const arr = [];
    const ln = {};
    for (;;) {
      skipBlank();
      if (p >= L.length) break;
      const t = L[p].t;
      if (indentOf(t) !== indent || !/^\s*-(\s|$)/.test(t)) {
        if (indentOf(t) > indent) throw new YamlError('bad indentation', L[p].n);
        break;
      }
      const n = L[p].n;
      const after = t.slice(indent + 1);
      const rest = after.trim();
      const off = indent + 1 + (after.length - after.trimStart().length);
      ln[arr.length] = n;
      if (rest === '' || rest.startsWith('#')) {
        p++;
        skipBlank();
        if (p < L.length && indentOf(L[p].t) > indent) arr.push(block(indent));
        else arr.push(null);
      } else if (parseKey(rest, n) && rest[0] !== '[' && rest[0] !== '{') {
        // "- key: value": the map's first key sits at column `off`
        L[p] = { t: ' '.repeat(off) + rest, n };
        arr.push(map(off));
      } else {
        p++;
        arr.push(inlineValue(rest, indent, n));
      }
    }
    lines.set(arr, ln);
    return arr;
  }

  function map(indent) {
    const obj = {};
    const ln = {};
    for (;;) {
      skipBlank();
      if (p >= L.length) break;
      const t = L[p].t;
      const ind = indentOf(t);
      if (ind !== indent) {
        if (ind > indent) throw new YamlError('bad indentation', L[p].n);
        break;
      }
      const n = L[p].n;
      const kv = parseKey(t.trim(), n);
      if (!kv) {
        if (/^\s*-(\s|$)/.test(t)) break;
        throw new YamlError('expected "key: value"', n);
      }
      if (Object.prototype.hasOwnProperty.call(obj, kv.key)) throw new YamlError(`duplicate key "${kv.key}"`, n);
      ln[kv.key] = n;
      p++;
      const rest = kv.rest.trim();
      if (rest === '' || rest.startsWith('#')) {
        skipBlank();
        if (p < L.length && (indentOf(L[p].t) > indent || (indentOf(L[p].t) === indent && /^\s*-(\s|$)/.test(L[p].t)))) {
          obj[kv.key] = block(indent);
        } else obj[kv.key] = null;
      } else {
        obj[kv.key] = inlineValue(kv.rest, indent, n);
      }
    }
    lines.set(obj, ln);
    return obj;
  }

  const value = block(-1);
  skipBlank();
  if (p < L.length) throw new YamlError('unexpected content', L[p].n);
  return value;
}

// line of `key` (or index) in a parsed map / sequence; `fallback` when unknown
function lineOf(container, key, fallback) {
  const m = container && typeof container === 'object' ? lines.get(container) : null;
  return (m && m[key]) || fallback || 1;
}

module.exports = { parse, lineOf, YamlError };
