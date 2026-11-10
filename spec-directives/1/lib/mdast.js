'use strict';
// Markdown read as CommonMark through `mdast-util-from-markdown` (remark's core), into an mdast tree
// (decision `claim-marks-read-by-one-reader`). No GFM extension: the site build parses with `remark-parse`
// alone, and the two must read a text the same way. The readers of the forms of a spec read inline
// Markdown here, the claim marks of a course first (`course/claims.js` of a spec MAJOR), and give
// what they read to the checks and to the site build; md.js stays the line-by-line helper of the
// blocks (frontmatter, headings, sections, tables).
//   const { body } = md.split(fileText);
//   for (const l of mdast.links(mdast.parse(body.map((b) => b.t).join('\n'), { line: body[0].n }))) …
const { fromMarkdown } = require('mdast-util-from-markdown');

// -> the mdast tree of `text`, a Markdown text with no frontmatter in it. `line` (1 by default) is the
// line of the file where `text` starts (after a frontmatter, the `n` of the first line of md.js's
// split body): every node's start and end lines are shifted by it, so a node points at the line of
// the file. Columns and offsets are left as the text gives them (a column is the same in the file; an
// offset counts from the start of `text`).
function parse(text, { line = 1 } = {}) {
  const tree = fromMarkdown(text);
  const shift = line - 1;
  if (shift) {
    const walk = (node) => {
      if (node.position) {
        node.position.start.line += shift;
        node.position.end.line += shift;
      }
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
  }
  return tree;
}

// -> the plain text of a node: the values of its text, code spans and other literals, its children
// in order (a soft line break stays the "\n" the text holds), an image by its alt.
function text(node) {
  if (typeof node.value === 'string') return node.value;
  if (node.type === 'image') return node.alt || '';
  return (node.children || []).map(text).join('');
}

// -> each inline link of the tree (`[text](url "title")`), in document order, as
// { url, title, text, line, column, node }: `title` null when it has none, `text` the plain text of
// its children, `line` and `column` where its `[` stands. A link inside a code span or a code block
// is no link (the tree holds it as code); a reference link (`[text][label]`) is a `linkReference`
// node, not returned.
function links(tree) {
  const out = [];
  const walk = (node) => {
    if (node.type === 'link') {
      const { line, column } = node.position ? node.position.start : {};
      out.push({ url: node.url, title: node.title == null ? null : node.title, text: text(node), line, column, node });
    }
    if (node.children) node.children.forEach(walk);
  };
  walk(tree);
  return out;
}

module.exports = { parse, links, text };
