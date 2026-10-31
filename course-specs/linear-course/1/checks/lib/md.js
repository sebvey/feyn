'use strict';
// Markdown helpers: frontmatter, headings, sections, tables, paragraphs. CommonMark only
// as far as the course conventions need; fenced code is skipped.
const yaml = require('./yaml-lines');

// -> { data, error, body (array of {n, t, code}), bodyLine }
function split(text) {
  const all = text.replace(/\r\n?/g, '\n').split('\n');
  let front = null;
  let start = 0;
  let data = null;
  let error = null;
  if (all[0] === '---') {
    const end = all.indexOf('---', 1);
    if (end > 0) {
      front = all.slice(1, end).join('\n');
      start = end + 1;
      try {
        data = yaml.parse(front, { lineOffset: 1 });
      } catch (e) {
        error = { line: e.line || 2, message: `frontmatter: ${e.message}` };
      }
    } else error = { line: 1, message: 'frontmatter is not closed by a "---" line' };
  }
  const body = [];
  let fence = null;
  for (let i = start; i < all.length; i++) {
    const t = all[i];
    const m = /^\s{0,3}(`{3,}|~{3,})/.exec(t);
    let code = fence !== null;
    if (m) {
      if (fence === null) { fence = m[1][0]; code = true; }
      else if (m[1][0] === fence) { fence = null; code = true; }
    }
    body.push({ n: i + 1, t, code });
  }
  return { front, data, error, body, hasFront: front !== null };
}

function headings(lines) {
  const out = [];
  lines.forEach((l, idx) => {
    if (l.code) return;
    const m = /^(#{1,6})\s+(.*?)(?:\s+#+)?\s*$/.exec(l.t);
    if (m) out.push({ level: m[1].length, text: m[2].trim(), line: l.n, idx });
  });
  return out;
}

// Splits `lines` at headings of `level`: returns { pre: lines before the first, sections: [{ title, line, lines }] }
function sections(lines, level) {
  const hs = headings(lines).filter((h) => h.level === level);
  const pre = lines.slice(0, hs.length ? hs[0].idx : lines.length);
  const secs = hs.map((h, k) => ({
    title: h.text,
    line: h.line,
    lines: lines.slice(h.idx + 1, k + 1 < hs.length ? hs[k + 1].idx : lines.length),
  }));
  return { pre, sections: secs };
}

// blank-line separated blocks of non-code lines: [{ line, lines: [{n,t}], text }]
function blocks(lines) {
  const out = [];
  let cur = null;
  for (const l of lines) {
    if (l.code) { if (cur) { out.push(cur); cur = null; } out.push({ line: l.n, lines: [l], text: l.t, code: true }); continue; }
    if (l.t.trim() === '') { if (cur) { out.push(cur); cur = null; } continue; }
    if (!cur) cur = { line: l.n, lines: [] };
    cur.lines.push(l);
  }
  if (cur) out.push(cur);
  for (const b of out) if (!b.code) b.text = b.lines.map((l) => l.t.trim()).join(' ');
  return out;
}

function splitRow(t) {
  let s = t.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|') && !s.endsWith('\\|')) s = s.slice(0, -1);
  const cells = [];
  let cur = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\' && s[i + 1] === '|') { cur += '|'; i++; }
    else if (s[i] === '|') { cells.push(cur.trim()); cur = ''; }
    else cur += s[i];
  }
  cells.push(cur.trim());
  return cells;
}

// pipe tables: [{ line, header: [cells], rows: [{ line, cells }] }]
function tables(lines) {
  const out = [];
  for (let i = 0; i + 1 < lines.length; i++) {
    const a = lines[i];
    const b = lines[i + 1];
    if (a.code || b.code || !a.t.trim().startsWith('|')) continue;
    if (!/^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(b.t)) continue;
    const tb = { line: a.n, header: splitRow(a.t), rows: [] };
    let j = i + 2;
    while (j < lines.length && lines[j].t.trim().startsWith('|')) {
      tb.rows.push({ line: lines[j].n, cells: splitRow(lines[j].t) });
      j++;
    }
    out.push(tb);
    i = j - 1;
  }
  return out;
}

// replaces inline code spans by blanks of the same length
function maskCode(t) {
  return t.replace(/(`+)(.+?)\1/g, (m) => ' '.repeat(m.length));
}

// one-line text of a Markdown inline run: drops emphasis and code marks
function plain(t) {
  return t.replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim();
}

function norm(t) {
  return t.replace(/\s+/g, ' ').trim();
}

module.exports = { split, headings, sections, blocks, tables, maskCode, plain, norm, splitRow };
