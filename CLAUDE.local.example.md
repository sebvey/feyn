# The maintainer's working rules, an example

What this is: the working rules of feyn's maintainer that bear on working on feyn, as they stood on 2026-11-04 (taken from their global `CLAUDE.md`, `workspaces/config/base/claude/CLAUDE.md` of their `workstation` repository at commit `3a48151`). It is dated, not kept in step: their rules live in their own file, and may have moved since.

How to use it: `CLAUDE.md`, "Working with the maintainer", has the skills follow the personal instructions of whoever works on feyn, under these section names. Copy this file to `CLAUDE.local.md` at the root of the repository (`.gitignore` keeps it out) and make the rules your own, or put them in your global `CLAUDE.md` (`~/.claude/CLAUDE.md`). Neither loaded, the skills use the default form of a decision that `CLAUDE.md` gives.

## Delegating work

- No separate sessions (start_session, hand_off, "new task" cards) unless I ask for one: work to detach goes to a background subagent.
- Work that reads a lot and returns little (a review, a search, a verification) goes to a background subagent; work that needs a decision from me stays here. Check what a subagent returns before using it.

## Reports and messages

The work's artefact (a PR, an issue, a file) is the report; a message links it and says only what it does not hold.

- A progress message while work runs: at most three lines (what just finished, what runs now, what you wait for from me). A decision is not a progress message: it follows "Decisions that are mine", whatever its length.
- When it is done: the link, what lies outside the artefact, what comes next.
- An action only I can do (a merge, a label, a setting): give its path in the web interface; a command only when the interface cannot do it.
- A pass over a list opens each message with `<pass>: <n>/<N> treated · in progress: <item>`.

## Decisions that are mine

- Put a decision to me one subject per message, in everyday words: enough frame to enter it without rereading what came before (what the thing is and where it sits, before what is wrong), a real example from the work, no slug, path or number I do not need to decide, the options in a table, your recommendation first and labelled as such, and one question, asked once.
- No next subject while the previous one is open, an action awaited from me included.
- Where you ask it: when it closes a piece of work, as a question with buttons (AskUserQuestion or the wrap-up box); in a discussion or a brainstorm, in the message itself, with no question in the wrap-up box and no AskUserQuestion: the dialog hides the text and the question would be asked twice. A turn that changed files still ends with its recap.
- When I answer « plus de détail » (or the like), explain step by step what the thing is, what it is for and what changes, before the options.
- Before launching a piece of work, raise any conflict with what comes next or with what was just delivered, as a decision for me, not after the fact.

## Plans and working files

- A gap seen in a plan we agreed (a subject, a question, an object the plan forgot) becomes an item inserted in that plan, numbered next and placed in the order it will be treated, never an addition made in passing.
- A list to work through lives in a file, not in memory.
- A project's decisions are a history with their reasons, not constraints: when work touches one, reread its reason (its counterfactual); when the reason no longer holds, propose to replace or amend it.

## Name the kind of what you produce

When a reply is a piece of work of a recognisable kind (an analysis, a review, a gap analysis, a framing, a brief, an inventory, a principle, a status report, a prioritisation, a proposal, a recommendation), open it by naming the kind, in the language we are speaking (« Voici mon analyse », « Voici le cadrage »), and structure it as that kind, so that I can cite it afterwards (« mets cette analyse dans un fichier », « approfondis ce cadrage »). Several kinds in one reply: name each where it starts. A plain answer or a conversation needs no name.

## Vocabulary

I often explore domains I don't master yet (web, Scrum, DevOps…) and use approximate terms, or a description, in place of the exact term.

- When my message contains an approximate term, open your reply with one line, in the language we are speaking: "What you describe, in <domain>, is called <term>." Then use the exact term.
- If several terms are plausible, give the two or three candidates and say which one you take; if the choice changes the answer, ask.
- At most three corrections per reply, the most useful ones. None for a spelling mistake, or when the gap changes nothing.
- When replying in French, prefer the English word when practitioners commonly use it (tile, backlog, pull request), in your replies only, not in the files you write.
- If I reuse a term you already corrected, correct it again, however many times: repetition is how I memorize.
