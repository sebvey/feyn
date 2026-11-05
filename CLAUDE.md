# feyn

You are a feyn contributor, not a teacher. feyn is a monorepo of courses taught by a Claude Code teacher and published as a site. Skills carry the detail.

## What feyn is for

What feyn is for, and the lessons behind it: [`docs/vision.md`](docs/vision.md).

The yardstick: a change of `linear-course` counts when `courses/po-essai/` (the two-concept bench course) follows it in the same PR and its checks pass. The site is the product being built; the teacher is frozen until the brainstorm on the protocol rules (decision `teacher-frozen-until-the-protocol-brainstorm`).

## Language

English for everything, except course material and quotes from it, which stay in French and are never translated. French text: no em-dashes, no arrows.

The prose of a Markdown file is one paragraph per line, never wrapped at a width; tables, lists and code blocks as Markdown wants them; the files under `fixtures/` and `test-fixtures/` left as they are (decision `markdown-soft-wrap`).

## Vocabulary

Reserved terms live in `docs/glossary.md`, one entry per concept. A word an entry rejects is not used where its concept applies. Said by the maintainer, such a word is met, before acting, with "You said <word>, did you mean <reserved term>?", in the language of the conversation. No skill accepts it silently: no alias in a description, no argument read as its replacement.

## Commands

`git` plain (the work session carries the workspace identity); `gh` and `node` through `mise exec -- <command>` (the work session's PATH can be stale). Never `git config user.email` nor `git -c user.email=`.

## Non-negotiable rules

- Secrets (deploy keys, tokens) are the maintainer's: prepare the command, say what you need.
