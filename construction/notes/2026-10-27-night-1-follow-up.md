# Session note, 2026-10-27: night 1 follow-up

Afternoon session with the maintainer after the night 1 relaunch (issue #92): the night's two
blocked tasks, S1-04 in the daytime, the maintainer's reading of the protocol, the dependencies
between issues. Reread cold through `docs/contributing.md` (what is in place) and
`docs/decisions/` (why). This note is the trail; it dies with `construction/`.

| Question asked | Answer | Where it went |
|---|---|---|
| Where are we, what runs next? | Four of six night tasks merged; S1-04 is the critical path (S1-05 and S1-14 wait for it), S1-09 can run beside it | `construction/notes/night-1.md`; S1-04 done in the daytime, PR #86 |
| Are the decisions for after the unblocking? | Yes, except adjustments 4 and 12 before S1-09, and the MDX sub-sections before S1-10 | comments and `blocked:maintainer` on #22 and #23 |
| What to reread in the protocol? | What changed from the old teacher (1.1, 1.6, 3.17, 4.12, 4.13, 4.15, 4.16, 6.1, the qualifiers), families 3 and 4, the « Pourquoi » lines, table 8.4, the key values | nowhere; the reading gave #87 and #88 |
| Merge #86 before reading it? | It was merged already; a reading of a merged PR becomes one issue per reading | issue #88 |
| Where is the content of `{typography.rules}` and `{typography.banned}`? | In `lang/fr.yaml`, which S1-05 writes; today only reference values in `PROTOCOL.md` and the check fixtures' pack | comment on #18 |
| Onboarding questions in the protocol? | They belong to the course: a mandatory « Accueil » section of `plan.md`, posture included; the nickname question stays in the protocol | decision `onboarding-in-plan`; issue #87 (blocks #18 and #30) |
| Is rule 4.15 well written? | No: « il en demande un » points at 4.14; a rule stands alone, since tests cite it by number | issue #88 |
| « Le prof » in the « Pourquoi » lines? | The rules say « tu »; the lines do too | issue #88 |
| Dependencies between issues are posed nowhere? | GitHub blocked-by links, the single source; `/ticket` sets them, `/start` refuses an open blocker; 47 links set, « Depends on: » lines removed | decision `blocked-by-links-for-dependencies`; issue #89, PR #90 |
| Is #91 ready, any dependency? | None either way: the plans are frozen and no open issue runs `plan-to-issues` | #91 set to Ready |
| Night scripts and the links? | They hold no list; `/start`'s refusal is the check; `overnight-2.js` predates all this | issue #93 |
| A `Refs` PR closed its issue at the merge? | The Development link `/start` creates closes it; #24 reopened by hand | issue #94 |

Also opened: #93 (fit `overnight-2.js`), #94 (`Refs` issue closed by the linked branch), #95
(concept 9 findings, blocked by #23); comments on #18 (S1-05 additions), #22 and #23 (what
waits on the maintainer, `blocked:maintainer`), #44 (CI runs `test-fixtures` and `smoke-test`).
Decisions: `blocked-by-links-for-dependencies` (PR #90) and `onboarding-in-plan` (#87); the
protocol's writing rules apply to one file, so they go in `PROTOCOL.md`'s header through #88.
