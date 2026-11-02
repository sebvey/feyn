'use strict';
// A small well-formedness-checking XML reader: elements, attributes, text, comments, CDATA,
// processing instructions. No DTD, no external entities. Throws XmlError with a line.

class XmlError extends Error {
  constructor(message, line) { super(message); this.line = line; }
}

const NAME = /^[A-Za-z_][\w.\-:]*/;

function parse(src) {
  let i = 0;
  let line = 1;
  const root = { name: '#document', attrs: {}, children: [], line: 1, parent: null };
  let cur = root;
  const stack = [];
  const adv = (n) => {
    for (let k = 0; k < n; k++) if (src[i + k] === '\n') line++;
    i += n;
  };
  const checkEntities = (s, ln) => {
    const re = /&([^;\s&<]*);?/g;
    let m;
    while ((m = re.exec(s))) {
      const ent = m[0];
      if (!/^&(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);$/.test(ent)) throw new XmlError(`undefined or malformed entity "${ent}"`, ln);
    }
  };
  if (src.charCodeAt(0) === 0xfeff) i = 1;
  while (i < src.length) {
    if (src[i] !== '<') {
      const j = src.indexOf('<', i);
      const end = j < 0 ? src.length : j;
      const text = src.slice(i, end);
      if (text.includes(']]>')) throw new XmlError('"]]>" in text', line);
      checkEntities(text, line);
      if (cur === root && text.trim() !== '') throw new XmlError('text outside the root element', line);
      cur.children.push({ text, line });
      adv(end - i);
      continue;
    }
    if (src.startsWith('<!--', i)) {
      const j = src.indexOf('-->', i + 4);
      if (j < 0) throw new XmlError('unterminated comment', line);
      adv(j + 3 - i);
    } else if (src.startsWith('<![CDATA[', i)) {
      const j = src.indexOf(']]>', i);
      if (j < 0) throw new XmlError('unterminated CDATA section', line);
      cur.children.push({ text: src.slice(i + 9, j), line, cdata: true });
      adv(j + 3 - i);
    } else if (src.startsWith('<?', i)) {
      const j = src.indexOf('?>', i);
      if (j < 0) throw new XmlError('unterminated processing instruction', line);
      adv(j + 2 - i);
    } else if (src.startsWith('<!', i)) {
      throw new XmlError('DOCTYPE and other declarations are not allowed', line);
    } else if (src.startsWith('</', i)) {
      const m = /^<\/([^\s>]+)\s*>/.exec(src.slice(i, i + 300));
      if (!m) throw new XmlError('malformed closing tag', line);
      if (cur === root || cur.name !== m[1]) throw new XmlError(`closing tag </${m[1]}> does not match ${cur === root ? 'any open element' : '<' + cur.name + '>'}`, line);
      adv(m[0].length);
      cur = stack.pop();
    } else {
      const startLine = line;
      adv(1);
      const nm = NAME.exec(src.slice(i, i + 200));
      if (!nm) throw new XmlError('malformed tag', line);
      const el = { name: nm[0], attrs: {}, attrLines: {}, children: [], line: startLine, parent: cur === root ? null : cur };
      adv(nm[0].length);
      let selfClose = false;
      for (;;) {
        const ws = /^\s*/.exec(src.slice(i, i + 200))[0];
        adv(ws.length);
        if (src[i] === '>') { adv(1); break; }
        if (src.startsWith('/>', i)) { adv(2); selfClose = true; break; }
        if (i >= src.length) throw new XmlError(`unterminated tag <${el.name}>`, startLine);
        if (!ws && !/^\s/.test(src[i - 1] || '')) throw new XmlError('missing space between attributes', line);
        const an = NAME.exec(src.slice(i, i + 200));
        if (!an) throw new XmlError(`malformed attribute in <${el.name}>`, line);
        adv(an[0].length);
        const eq = /^\s*=\s*/.exec(src.slice(i, i + 50));
        if (!eq) throw new XmlError(`attribute "${an[0]}" has no value`, line);
        adv(eq[0].length);
        const q = src[i];
        if (q !== '"' && q !== "'") throw new XmlError(`attribute "${an[0]}" value is not quoted`, line);
        const j = src.indexOf(q, i + 1);
        if (j < 0) throw new XmlError(`unterminated value of attribute "${an[0]}"`, line);
        const val = src.slice(i + 1, j);
        if (val.includes('<')) throw new XmlError(`"<" in the value of attribute "${an[0]}"`, line);
        checkEntities(val, line);
        if (Object.prototype.hasOwnProperty.call(el.attrs, an[0])) throw new XmlError(`duplicate attribute "${an[0]}"`, line);
        el.attrs[an[0]] = val;
        el.attrLines[an[0]] = line;
        adv(j + 1 - i);
      }
      if (cur === root && root.children.some((c) => c.name)) throw new XmlError('more than one root element', startLine);
      cur.children.push(el);
      if (!selfClose) { stack.push(cur); cur = el; }
    }
  }
  if (cur !== root) throw new XmlError(`element <${cur.name}> is not closed`, cur.line);
  const el = root.children.find((c) => c.name);
  if (!el) throw new XmlError('no root element', 1);
  return el;
}

const elements = (n) => n.children.filter((c) => c.name);
function textOf(n) {
  return n.children.map((c) => (c.name ? textOf(c) : c.text)).join('');
}
function walk(n, fn) {
  fn(n);
  for (const c of elements(n)) walk(c, fn);
}

module.exports = { parse, XmlError, elements, textOf, walk };
