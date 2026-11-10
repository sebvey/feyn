---
date: 2026-11-10
issue: 811
status: accepted
area: repo
---

Without this, a contributor writing the check of a claim mark in the text of a course and one writing its rendering on the site would each read the claim mark with a reader of their own (a pattern in the check, remark in the site), so a claim mark with an escaped bracket or a title in quotes would pass the check and show otherwise on the site (#724).

The claim marks of a course's text are read by one reader, through one module of the spec, by the checks of the course and by the site build. Three layers: a generic reader of CommonMark in the `lib/` of the spec directives, `lib/mdast.js`, on `mdast-util-from-markdown` (remark's core), which gives the tree of a text and its links with their lines in the file; the grammar of a claim mark, defined once by the spec MAJOR in a module beside its parser (as its reader of concept references), which reads the links that reader gives and is used by the checks and by the spec half of the site build; the site's engine, which renders the claim marks the spec half gives it and reads none itself. The reader reads CommonMark only, no GFM extension, as the site's own parser (`remark-parse` alone), so that the two read a text the same way.

## Options ruled out

- A reader of links added to `md.js`: a home-made reader of inline Markdown, which reads an escaped bracket or a title in quotes otherwise than the site's parser.
- Replacing all of `md.js` with the new reader in the same move (#724): its block helpers serve the checks as they are; that work stays apart.
- The reader in `site-builder`: a check of the course would then depend on a product.
- One reader per product: the grammar of a claim mark written twice, which drift.

## Consequences

- `mdast-util-from-markdown` is a dependency of the package of the spec directives (decision `checks-use-ajv-and-yaml`), its MAJOR the one of the site's lock; it is ESM only, loaded by `require` from the CommonJS of `lib/`, which Node does from 20.19 on.
- Another sign the spec puts on a link of the text, as the claim mark, adds its grammar to a module of the spec, never a pattern in a check or a parser in the site.
