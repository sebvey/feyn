<!-- The body of a story: every rule of its writing is in this template's comments, followed and then removed (each comment replaced by what it asks), whoever writes or rewrites it. -->

**Where:** <!-- The area (agentic, repo, site, teacher, a spec, a course), then at most three words on what is touched, in parentheses. It comes first: it situates the rest. -->

**What:** <!-- What the story delivers, in one sentence. -->

**Why:** <!-- Why it matters now, in one sentence. The head (these three lines, each its own paragraph) is what the maintainer reads to choose among the Ready stories; it summarises nothing and replaces no section below. -->

### Done when

<!-- Statements a reviewer can verify by reading a file or running a command, one per bullet, each command run on the base when it is written, its baseline on the line under it and checked against the statement's intent, a search leaving the history out: the rules of a Done when are `.claude/reference/done-when.md`. -->

### Context

<!-- What the work needs to know, restated so that the contributor works from the story alone, without reading its origin: first line, what is wrong or missing, and where (path, line); then the other facts, one short bullet each; what was settled, with its why and the alternative rejected, when a brainstorm settled it. Facts and decisions, no To do. A story that removes, moves or renames content (a file, a section, a rule) lists every file that refers to it, found as `.claude/reference/done-when.md` says; the To do has an item that treats each of them. The last line is the origin, in one of four forms, the one its author is given, otherwise the first that applies: "From idea #<n>." for a story that comes from an idea, its epic or not; "Story of epic #<n>." for a story of an epic; "From a brainstorm with the maintainer, <date>." for a story a brainstorm created; "Asked by the maintainer, <date>." for a story the maintainer asked for directly, in a work session, with neither epic nor idea. -->

### To do

<!-- One line per item, the what (the file and the change); the how, when needed, in sub-bullets (commands, secondary paths, what to check on the way). Numbered when the order matters. A direct story (one edit with no behaviour, named `direct` at its creation) opens this section with the plain line `Direct delivery`, alone, before the first item: `/feyn-issue`, `/feyn-deliver-epic`, `/feyn-deliver-story-alone` and `/feyn-pull-request` read it there. -->

### Reads

<!-- Design files, specs and sources the work needs, one per line. Delete the section when the files named in the Context are enough. -->

<!-- Once written, reread it as the maintainer of the morning, choosing among ten Ready stories: does the head say where, what and why in three lines; does each command of the Done when carry its baseline; does the Context open with what is wrong or missing, and end with its origin; does it list the files that refer to content the story removes, moves or renames; does each To do item hold in one line? One no: fix it before the issue is created or saved, then reread. -->
