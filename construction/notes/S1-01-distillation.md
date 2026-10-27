# S1-01: distillation of the parcours-po ADRs

Source: `parcours-po` at `course-v2.5.0-3-g851a602`, folders `maintainer/adr/` (64 files, plus the
template) and `maintainer/site/adr/` (8 files). Columns: `protocol rule`, `process rule`,
`architecture decision`, `POC`. Target: a rule family of the protocol (families of
`design/03-spec-linear-course.md`), a skill or workflow, or a decision slug with its folder.
Status of the pass: validated by the maintainer; the `architecture decision` rows were settled by
PR #112 (#27).

## Summary

- **72 ADRs exist, not 65.** The plan and the design say 65; the folders hold 72 numbered files
  (ADR-001 to ADR-078, with 002, 006, 007, 022, 063 and 071 deleted by later ADRs). All 72 are in
  the table, so the "65 rows" of the task's Done when is exceeded by 7: the 8 site ADRs (041 to
  043, 045 to 047, 049, 050) are probably the gap. The maintainer says whether the site ADRs stay in
  scope (they are classified below either way).
- Counts per column: protocol rule 35, process rule 16, architecture decision 7, POC 14
  (total 72, counted with `awk` on the table; the first pass found 15 POC, the challenge below
  moved one, ADR-025, to process rule).
- The majority is protocol rules, as the design expected: fixes decided after a fresh test.
- Architecture decisions to rewrite in English as `feyn` decisions (6 distinct slugs, from 7 rows):
  1. `team-in-sprints` (course): the course assumes a Scrum team in sprints; A2 for the others;
     elsewhere the sprint is a landmark the teacher transposes (ADR-018, ADR-033).
  2. `learner-memory-separate-from-course` (teacher): course shared and read-only for the
     teacher, learner follow-up separate, the teacher writes nothing outside it (ADR-010).
  3. `two-versioned-objects` (cross-cutting): course semver, site follows the MAJOR (ADR-038);
     already named in `09-decisions.md`.
  4. `domains-partition-the-course` (spec): seven contiguous domains, each concept in exactly one,
     changing a domain's concepts is a MAJOR (ADR-039).
  5. `classroom-as-build` (teacher): the startup context comes from imports, with no shell hook
     on the learner side, for OS independence (ADR-072).
  6. `learner-progress-versioned` (teacher): learner progress committed at save points, never
     pushed (ADR-076). To re-decide in the classroom context; may die with the move to a classroom.
- Outcome (S1-14, #27): 1 and 4 are decision files; 3 already existed; 2 and 6 are covered by
  `learner-memory-in-classroom` and 5 by `classroom-as-build`, both written by S2-06 (#35). The
  table's Target column says, for each row, the decision file or "covered by <slug>".
- Hidden teacher behaviours found by the challenge of POC rows (all kept POC because the course
  files carry them, but to check at migration): ADR-031 (the annex A2 question validates the
  sub-concept, A2 `teaching.md`), ADR-062 (concept 0 roles and events one per message).

## Table

| ADR | Title | Gist | Column | Target |
|---|---|---|---|---|
| 001 | Improvements are tickets, one file each, three state folders | Backlog of markdown tickets in state folders | POC | none: GitHub issues and labels replace it |
| 003 | No framework journal; closed tickets say what, ADRs say why | Remove the journal, keep ADRs for the why | POC | none: `09-decisions.md` already fixes the decision format |
| 004 | Maintenance skill reachable only through the maintainer's local file | Hidden skill, loaded by `CLAUDE.local.md` | POC | none: the monolithic maintenance skill is gone |
| 005 | First message of a session stops at the recap | Resume message recaps, then waits | protocol rule | session start |
| 008 | A pending question on resume replays its whole sub-concept | Recap names the question; next message re-teaches from the start | protocol rule | session start |
| 009 | The storyline has a fixed product, team and cast; the learner is the PO | Storyline file frames product and actors; teacher starts from them | protocol rule | storyline |
| 010 | Course, learner follow-up and improvements are separated | Course shared and teacher-read-only; learner follow-up separate | architecture decision | covered by `learner-memory-in-classroom` (#35) |
| 011 | Memory written in the same answer as the fact | Event-time writes; stop rereads "Prochaine étape" as a fresh agent | protocol rule | stop (the reread; the rest superseded by 067) |
| 012 | The teacher never edits the storyline | Improvise without contradicting; never write to it | protocol rule | storyline |
| 013 | A partial answer gets a follow-up | Say what is right, ask a targeted follow-up; resume replays with what is acquired | protocol rule | the loop |
| 014 | The ADR rule aims at stability across agents | Two questions decide whether a decision gets an ADR | process rule | `/decide` |
| 015 | A big ticket splits into vertical lettered sub-tickets | Sub-tickets with parent and single dependency | process rule | `/ticket` (sub-issues) |
| 016 | Sources are traced in files; the teacher does not cite | One sources file per concept; teacher answers from it on request | protocol rule | consensus, school, sources |
| 017 | Logical order for a new learner, 18 concepts | The curriculum content and its order | POC | none: course content, carried by `course.yaml` and the migration |
| 018 | The course assumes a Scrum team in sprints; annex A2 for the others | Stance of the course, with an annex for flow teams | architecture decision | decision file `courses/parcours-po/decisions/team-in-sprints.md` (#27) |
| 019 | A ticket is done on its branch and validated by a PR | State folders including wip, branch per ticket, squash PR | process rule | `/start`, `/finish` |
| 020 | A course batch gets two reviews and one fix round | `course-lot` workflow: sources, writer, two independent reviewers | process rule | `quality-review` workflow and `migrate-concept` (S1-09, S4-02) |
| 021 | A new learner starts from an empty learner folder with onboarding | Onboarding questions, files created, then concept 0 | protocol rule | session start |
| 023 | The concept 0 control question closes once answered; an unseen notion is not a vigilance | Control question closed on any answer; no vigilance for a notion not yet taught | protocol rule | learner memory (the vigilance rule; the control question is superseded by 061) |
| 024 | An unsourced term origin is given from memory, flagged unverified | Say it is unverified; offer a search only if a tool exists | protocol rule | consensus, school, sources |
| 025 | The maintainer agent enriches the glossary on its own | Add a term, clarify a definition without validation, report in the PR | process rule | `/finish` (glossary changes listed in the PR) |
| 026 | Learner productions are not kept | The teacher judges a production in the exchange only | protocol rule | learner memory |
| 027 | On request, the teacher gives the source as the sources file describes it | Author, title, date, legal article, link, and what is "not verified" | protocol rule | consensus, school, sources |
| 028 | The length limit is stated by intent | A message is read at a glance, about fifteen lines; split, never cram | protocol rule | the shape of a message |
| 029 | The maintenance agent decides alone; the maintainer validates by reading the PR | The PR is the single checkpoint; findings triaged critically | process rule | `/finish`, `/triage` (S4-03) |
| 030 | A change to the teacher's behaviour is proposed before it is applied | Content autonomous; behaviour waits for the maintainer | process rule | `/decide` (teacher behaviour decisions) |
| 031 | For a learner without sprints, the annex A2 question validates the sub-concept | A2 replaces the bank question and validates | POC | none: course content (A2 `teaching.md`); check at migration of A2; and `team-in-sprints` |
| 032 | The teacher no longer writes to the maintainer folder | Improvise or say a source is missing, write nothing outside learner memory | protocol rule | learner memory |
| 033 | Outside the four A2 sub-concepts the sprint is a landmark the teacher transposes | Use the team's own cycle as the landmark | architecture decision | covered by `team-in-sprints` |
| 034 | The first message leaves without a tool call (welcome) or after one read (resume) | Fast first message; only the progress file is read first | protocol rule | session start |
| 035 | One sentence for the learner precedes tool calls; no task list | Short waiting line; no task list or end-of-turn recap in a course session | protocol rule | the shape of a message |
| 036 | The welcome no longer asks for the rhythm | Three onboarding questions; rhythm adapts as the session goes | protocol rule | session start |
| 037 | Explaining sections do not reuse an exercise's case or verdict | Principles in general terms; generic or invented examples | process rule | concept template and `quality-review` workflow (S1-06, S4-02) |
| 038 | The course is versioned and the site follows its MAJOR | Course semver with tags; site shares the MAJOR | architecture decision | covered by `two-versioned-objects` |
| 039 | Seven contiguous domains partition the course | Each concept in one domain; changing a domain's concepts is a MAJOR | architecture decision | decision file `specs/linear-course/decisions/domains-partition-the-course.md` (#27) |
| 040 | The resume message offers to continue or to dig into a domain or concept | List of domains; dig means new exercises on a validated concept | protocol rule | session start; dig, skip, prerequisites |
| 041 | The site has one domains entry, no separate reading paths | A single Domains page | POC | none: site UI, rebuilt at stage 3 from the design |
| 042 | The Domains page expands each concept into its sub-concepts | Table of contents generated at build | POC | none: site UI |
| 043 | The Domains page has an "expand all" button | One button in the sticky summary | POC | none: site UI |
| 044 | What belongs to the site lives in `maintainer/site/` | Folder for site plan, procedure, ADRs | POC | none: the site gets its own folder in `feyn` (design 02) |
| 045 | The site is verified by `npm run verify` | Build, links, screenshots in four sizes, no horizontal scroll | process rule | site-verify workflow (S3-07, S4-02) |
| 046 | The site header fits on one line with two round buttons | Search and theme buttons | POC | none: site UI |
| 047 | Site icons are stroke SVG files imported as components | 24 px frame, 2 px stroke, `currentColor` | POC | none: site UI |
| 048 | Each domain has its own presentation file | Domain files in the course; membership stays in the plan | POC | none: already in `design/03-spec-linear-course.md` (domains folder) |
| 049 | One page per domain in the reading order | Domain pages inserted before their concepts | POC | none: site UI, in S3-02 |
| 050 | A public text specific to the site is written first, judged on the preview in the PR | No prior validation of site texts | process rule | `/finish` (texts listed in the PR) |
| 051 | The test sub-agent runs on Sonnet | A weaker model exposes unclear instructions | process rule | `/fresh-test` |
| 052 | The teacher presents a domain in a message of its own | Name, problem, thread of concepts, no question | protocol rule | presenting a domain |
| 053 | The teacher points to site pages instead of course files | Page of the validated concept, domains map, domain page | protocol rule | the shape of a message (site page on validation) |
| 054 | A bank error on the tested point is not a nuance; a successful follow-up resets the count | Wrong or partial; two failed follow-ups then re-explain | protocol rule | the loop |
| 055 | Maintenance writes start from a clean main; a course test lives on a `test_` branch | Purge test branches, prepare a test run | process rule | `/start`, `/fresh-test` |
| 056 | The welcome message gives the site root link | Learner learns about the site at once | protocol rule | session start |
| 057 | Site links are Markdown links with a descriptive text | Never a bare address | protocol rule | the shape of a message |
| 058 | A bank question testing several points is asked in several steps | Announce, ask and correct one part at a time | protocol rule | the loop |
| 059 | A validated concept ends by announcing what comes next | One line naming the next step, no stop offer (superseded in form by 070) | protocol rule | the loop |
| 060 | The teacher names each actor with the role in parentheses | In domain 1 every mention, then at first mention per concept | protocol rule | storyline |
| 061 | The concept 0 question assesses level and skips nothing; only the learner asks to skip | Level question; skipped status; a skipped prerequisite stated in one line | protocol rule | dig, skip, prerequisites |
| 062 | Concept 0 presents roles then events in brief, then each in its own message | Course content for concept 0 | POC | none: course content, carried by the migration (check `teaching.md` of concept 0) |
| 064 | A separate workflow checks over the whole course that no case asks what is not yet taught | Cumulative inventory, batches, seven checks, read-only | process rule | `taught-check` workflow (S1-11) |
| 065 | One question per message, welcome included | Several questions are announced and asked one by one | protocol rule | the loop |
| 066 | A multi-point bank question is written in parts in the concept file | Template field, numbered expected answers, review criterion | process rule | concept template and checks (S1-06, S1-07) |
| 067 | Learner memory is written only at save points | End of welcome; concept validated, skipped or dug; stop | protocol rule | learner memory |
| 068 | The course chains what comes instead of waiting for an empty relay | Next step follows in the same message while it fits in about fifteen lines | protocol rule | the loop; session start |
| 069 | No concept number in the domain presentation | Names in order, numbers only when the concept is taught | protocol rule | presenting a domain |
| 070 | The "next" line ends with a continue prompt | Literal phrase, a language pack key | protocol rule | the shape of a message (language pack key `continue_prompt`) |
| 072 | Startup context comes from `CLAUDE.md` imports, no hook or script on the learner side | OS independence; file import at start | architecture decision | covered by `classroom-as-build` (#35) |
| 073 | The teacher flags a prerequisite not yet validated, when digging as when skipping | One line; offer to teach a notion on which an answer stumbles | protocol rule | dig, skip, prerequisites |
| 074 | No test sub-agent for a trivial change | A change that adds, removes or reorders no step | process rule | `/fresh-test` |
| 075 | The teacher makes a diagram only on the learner's request | Start from the concept's diagram section; never propose one | protocol rule | the shape of a message (diagrams, `04-diagrams.md`) |
| 076 | The learner has a `learner/<nickname>` branch committed at save points | Progress versioned, never pushed | architecture decision | covered by `learner-memory-in-classroom` (#35): the classroom is its own repository, committed at save points |
| 077 | At welcome the teacher reacts to each answer | One reacting sentence, then the next question or the setup | protocol rule | session start |
| 078 | Taught-check findings are fixed on the ticket branch in at most two rounds | Fix if the content taught does not change; relaunch from the first corrected concept | process rule | `taught-check` workflow (S1-11) |

## Challenge of the POC rows

Each POC row was re-read asking whether a teacher behaviour hides there.

| ADR | Verdict |
|---|---|
| 001, 003, 004, 044 | confirmed POC (tooling of the old framework) |
| 017 | confirmed (content; the control-question behaviour is in 061) |
| 025 | **moved to process rule**: "glossary additions need no validation" is a contributor rule |
| 031 | kept POC, flagged: a teacher behaviour (annex validates) that lives in A2's `teaching.md`; check in the A2 migration report |
| 041, 042, 043, 046, 047, 049 | confirmed (site UI, rebuilt from the design) |
| 048 | confirmed (already in the spec design) |
| 062 | kept POC, flagged: concept 0 structure, in `teaching.md` |
