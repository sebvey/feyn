---
name: feyn-glossary-entry
description: "Read, add or change an entry of the glossary of feyn. Use for \"/feyn-glossary-entry <word>\", \"add a glossary entry for …\", \"rename the term …\"."
argument-hint: "<word> | add <concept> | rename <term> <new term> | merge <term> <term> | remove <term>"
---

# /feyn-glossary-entry

One job: read, add or change an entry of `docs/glossary.md`. What an entry is (its keys, their order, what a meaning may name, where each designation applies) is the glossary's header; why the glossary has this form, holds the word choices and qualifies a generic word at once is decisions `glossary-by-concept`, `word-choices-in-the-glossary` and `generic-word-always-qualified`. This skill says how; it restates none of them, so read the header before writing.

A choice that changes files, a structure or steps (a file renamed with its term, a section added, a moment of the work cycle or a step of a skill changed) is not a word choice: send it to `/feyn-decision`, and write here only the words it uses.

## Read `<word>`

1. Look the word up in the headings and the designations, case-insensitive: `grep -n -i -E '^(### |- en: |- fr: ).*<word>' docs/glossary.md`. A line `### <word>`, or the preferred term of an `en` or `fr` line, is the word's entry; the word after ` · rejected: ` of a line is rejected by that entry. A word quoted in a meaning only is not a designation: say so.
2. Reply with the entry (its heading and keys as written) and, for each `not to confuse with` link, the neighbour's term and its `means` in one line. A word that is preferred in one entry and rejected in another: show both.
3. A word rejected for the concept meant (the maintainer's or the caller's): answer first « You said <word>, did you mean <term>? », in the language of the conversation (the project instructions, `feyn-instructions-project`, "Vocabulary"), and act on nothing until it is settled.
4. No entry: say so; the word is free, or calls for an entry (below).

## Add `<concept>`

1. **The entry bar**, the glossary's (a decision has its own, the bar of a decision of `/feyn-decision` step 2). A concept enters when both hold:
   - other files name it on their own: a term used, not defined in passing, in at least two files of the repository besides the glossary (`grep -rli --include='*.md' --include='*.js' --include='*.yaml' --exclude-dir=node_modules --exclude-dir=worktrees "<term>" . | grep -v docs/glossary.md`); list them;
   - a confusion with another word or concept was seen (name where: an issue, a PR, a review) or is plausible (name the word or the concept it would be confused with). Either fails: refuse, write nothing, and say in one line which one fails and why. A value of a closed list (a Status value, a method) stays in its parent entry, unbolded.
2. **Its twin, the designations taken and the bare word's other uses.** Run the read mode on the term, on each word you would reject, and on the French word. An entry for the same concept under another term: stop, it is a rename or a merge (below). A designation preferred by another entry is taken: choose another, or say why both entries share it (each then says so, as the header asks). Then the generic word (decision `generic-word-always-qualified`): take the bare word of the term (its head noun, « mark » for « claim mark ») and search its uses in the whole repository, `git grep -n -i -w "<bare word>" -- . ':!docs/glossary.md'` (and its French word); for each use, say whether it means this concept or another. Judge whether the word is generic enough to collide: too general, likely used in other domains, or used here in another sense. A collision, or a likely one, is named in your reply with the uses that show it, and:
   - the new concept takes a qualified term (`<qualifier> <bare word>`), the bare word rejected in its `en` (and in its `fr` for the French word), never the bare word alone;
   - the bare word already an entry's term, or used in another sense with no entry: that sense gets its own qualified term in the same PR, through « Rename » (below) for an entry, through this mode for a sense with none that passes the entry bar; both entries reject the bare word with the same reason, « too generic, names several concepts », and each lists the other in `not to confuse with`;
   - the qualified terms are chosen from the words the files already use for each sense (« form mark »), never invented silently: name each in your reply with the uses it comes from.
3. **Write the entry** in the section of the glossary where its concept belongs, keys in the header's order:
   - `means`: what the concept is, from what the files that name it say. It cites nothing: no decision, no document, no rule id, no course; it names no path, key, command or skill where the concept is implemented, stored or read, a file only when the concept is that file. A term in bold has its own entry;
   - `en` and `fr`: the preferred term, then ` · rejected: ` and the rejected terms; `fr: to settle` when no French text of a spec writes the concept yet;
   - `not to confuse with`: the neighbouring concepts, and the same link added to each neighbour's entry, so it is written both ways;
   - `why`: only when the choice of the term was discussed or a confusion seen: the terms ruled out and what each would have confused. Never a decision for it. A term qualified at step 2 always has one: the bare word rejected because it is too generic and names several concepts, the other qualified entry named, so that no later change simplifies the term back to the bare word; and each flat identifier left with the bare word (step 4).
4. **Replace the rejected words in use** for that concept, in the same PR: `grep -rn -i --exclude-dir=node_modules --exclude-dir=worktrees "<rejected>" .`; a use where the word means another concept, a quote of course material, a superseded decision, a released CHANGELOG entry and a course's own files stay as they are. A bare word rejected at step 2 is replaced in each of its senses by that sense's qualified term:
   - in prose (what an agent reads: READMEs, decisions, rule texts, check messages, skills), always;
   - in an identifier (a name in code, a key, a file, a fixture): one whose parent (file, module, key, folder) carries the qualifier counts as qualified and stays (`mark` in a module of claims reads « claim mark »); a flat one is renamed in the same PR when cheap; when costly or breaking (an identifier of a course, whose change is a MAJOR), it stays, the entry's `why` says so, and a story for its renaming is posed at once (`/feyn-issue`), its number in the `why`.

## Change

- **Rename** `<term>` to `<new term>`: the read mode on the new term first (step 2 of Add). The heading and the preferred designation take the new term; the old one becomes rejected in the same line; the `why` says why, when the change was discussed. Replace the old term's uses in the same PR, as in step 4 of Add, and every link `](#<old anchor>)` of the glossary. A rename because of a collision (step 2 of Add: the entry's term is a bare word a new concept also needs) gives the entry its own qualified term, in the PR that adds the other entry; its `why` and its `rejected` take the bare word with the same reason as the other entry's, each citing the other; the bare word's uses in this sense are replaced, prose and identifiers, as step 4 of Add says.
- **Merge** two entries that hold one concept: keep the entry whose term the files use most; fold the other's meaning into it, its preferred terms becoming rejected ones unless both are kept; repoint every link to the removed heading; replace the uses of the rejected term.
- **Remove** an entry whose concept is gone from the files (the grep of step 1 of Add finds no use outside history): remove its heading and keys, its links in the neighbours' `not to confuse with`, and the bold of its term in other meanings. A concept still used whose entry fails the entry bar is not removed here: list it to the maintainer.

## Check and commit

Before committing: every entry has `means`, `en` and `fr`, its keys in the header's order; no heading twice; every `](#…)` link of the glossary resolves to a heading. Commit on the current issue branch (`git add docs/glossary.md` and the files whose words were replaced); on `main`, stop and propose `/feyn-issue` first: the glossary changes through a PR like the rest. Reply with the entry as written and the files where words were replaced.
