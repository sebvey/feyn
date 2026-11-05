**Where:** <!-- The area (agentic, repo, site, teacher, a spec, a course), then at most three
     words on what is touched, in parentheses. It comes first: it situates the rest. -->

**What:** <!-- What the story delivers, in one sentence. -->

**Why:** <!-- Why it matters now, in one sentence. The head (these three lines, each its own
     paragraph) is what the maintainer reads to choose among the Ready stories; it summarises
     nothing and replaces no section below. -->

### Done when

<!-- Statements a reviewer can verify by reading a file or running a command, one per bullet,
     each command's baseline on the line under it: the rules of a Done when are
     `.claude/reference/done-when.md`. -->

### Context

<!-- What the work needs to know, restated so that the contributor works from the story alone,
     without reading its origin: first line, what is wrong or missing, and where (path, line);
     then the other facts, one short bullet each; what was settled, with its why and the
     alternative rejected, when a brainstorm settled it. Facts and decisions, no To do.
     A story that removes, moves or renames content (a file, a section, a rule) lists every
     file that refers to it, found as `.claude/reference/done-when.md` says; the To do has an
     item that treats each of them.
     The last line names the issue the story comes from: "From idea #<n>." or "Story of epic
     #<n>.", or, for a story a brainstorm created with no epic and from no idea, "From a
     brainstorm with the maintainer, <date>.", or, for a story the maintainer asked for
     directly with no epic and no idea, "Asked by the maintainer, <date>." -->

### To do

<!-- One line per item, the what (the file and the change); the how, when needed, in
     sub-bullets (commands, secondary paths, what to check on the way). Numbered when the
     order matters. A direct story (one edit with no behaviour, named `direct` at its
     creation) opens this section with the plain line `Direct delivery`, alone, before the
     first item. -->

### Reads

<!-- Design files, specs and sources the work needs, one per line. Delete the section when the
     files named in the Context are enough. -->
