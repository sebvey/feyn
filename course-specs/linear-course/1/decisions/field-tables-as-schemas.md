---
date: 2026-10-31
issue: 322
status: accepted
area: spec:linear-course
---

Without this, an agent would write a table of fields of a course (`course.yaml`, the
`concept.md` frontmatter) as one rule per field, dozens of entries such as "`id` is
mandatory" in `course/rules.yaml`, which no editor validates as the author types.

The tables of fields of a course are schemas in `course/schemas/*.schema.yaml`, JSON Schema
2020-12 written in YAML, each schema counting as one rule of `course/rules.yaml` ("`course.yaml`
is valid against its schema"); the rule file keeps what a schema cannot say (the order of the
glossary, the contract of a case, the sources). JSON Schema is the standard for a table of
fields, and the YAML language server of the editors reads a schema written in YAML, 2020-12
included (the README of `redhat-developer/yaml-language-server`, read on 2026-10-30), so the
author gets validation and completion.

## Options ruled out

- One rule per row of a table of fields: dozens of entries, no validation nor completion in
  the editor.
