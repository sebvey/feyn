# 122: one testable behaviour per protocol rule

Issue #122, study, 2026-10-28. Nothing else is edited: applying the decision is a separate issue.

## 1. Context

`PROTOCOL.md` says each rule is testable and stands alone, but sets no rule on scope: a rule may
carry several behaviours, and a fresh test (S2-05, issue #34) then cites one number for two
checkpoints. Splitting has costs: rule numbers are cited by tests and by S2-09 (issue #38,
translation "rule by rule, same numbers, same keys"); "a removed rule leaves its number unused";
the "Used in" column of "Keys and parameters" names rules; the "Inherited from parcours-po" table
has one row per rule. Outside `PROTOCOL.md`, `SPEC.md` (section 6, `plan.md`) and the decision
`onboarding-in-plan` cite rules 1.1, 1.5, 1.6, 8.5, and `svg-only-diagrams` cites 4.14 to 4.16.
No test cites a rule yet: the scenarios (S2-04, issue #33) are not written.

## 2. Inventory

**How behaviours are counted.** A behaviour is one checkpoint a test reports pass or fail. Two
parts count apart when they can fail apart and a test would report them apart: acts at different
moments, a ban that spans more than the act it sits in, or a timing checked on the tool calls
against a content checked on the text. They count as one: several keys or items of one act (rule
1.4's five things the learner can ask), the branches of one condition (3.13), a bound written
into the act (« sans réexpliquer », « Jamais de push »), a reading the rule names as the source
of the act it prescribes (2.1 « lue alors »). Borderline, counted one: 2.5, 3.9, 4.14, 5.5.

**How the verdict is given.** Split when the parts are reported apart, no part restates a
behaviour another rule owns, and each part stands alone without repeating more than its
trigger. Otherwise keep. A clause that restates another rule's behaviour is counted (it is in
the text) but does not justify a split: the test cites the rule that owns the behaviour.

| Rule | Behaviours | Chain | Verdict | Reason |
|---|---|---|---|---|
| 1.1 | 1 | none | keep | one behaviour |
| 1.2 | 1 | onboarding, resume (entry) | keep | one behaviour |
| 1.3 | 2 | onboarding | split | no tool call before the first message (tool calls, its own « Pourquoi ») and the two-line presentation (text) fail apart |
| 1.4 | 1 | onboarding | keep | one behaviour |
| 1.5 | 2 | onboarding | keep | the count announced with the first question is 1.5's; « les autres viennent une par message » restates 3.5 |
| 1.6 | 1 | onboarding | keep | one behaviour |
| 1.7 | 2 | onboarding | split | the reply to each answer (text) and « Rien ne s'écrit dans `learner/` avant la dernière réponse d'accueil » (writes, spans the whole onboarding) |
| 1.8 | 2 | onboarding | keep | the timing « avant tout appel d'outil » is 4.9 applied (the message is the waiting sentence); the save point is 8.5's, only pointed to |
| 1.9 | 2 | onboarding | keep | reading the first concept's files restates 1.16; the rest is one message on the files it names |
| 1.10 | 1 | onboarding | keep | one behaviour |
| 1.11 | 3 | resume | split | the opening sentence before any tool call (text, timing) and « ne lis que `learner/parcours.md` » (tool calls) fail apart; « Ne repose pas les questions d'accueil » restates the routing of 1.2 |
| 1.12 | 1 | resume | keep | one behaviour |
| 1.13 | 1 | resume | keep | one behaviour |
| 1.14 | 1 | resume | keep | one behaviour |
| 1.15 | 1 | resume | keep | one behaviour |
| 1.16 | 1 | none | keep | one behaviour |
| 1.17 | 1 | resume | keep | one behaviour |
| 2.1 | 1 | domain presentation | keep | one behaviour |
| 2.2 | 1 | domain presentation | keep | one behaviour |
| 2.3 | 1 | domain presentation | keep | one behaviour |
| 2.4 | 1 | domain presentation | keep | one behaviour |
| 2.5 | 1 | domain presentation | keep | one behaviour |
| 2.6 | 1 | domain presentation | keep | one behaviour |
| 3.1 | 1 | none | keep | one behaviour |
| 3.2 | 2 | none | split | « Ne demande jamais « {phrases.banned_check} » » is a ban on every message, not a bound of the opening correction; « il n'enseigne toujours qu'un sous-concept » restates 3.1 |
| 3.3 | 1 | none | keep | one behaviour |
| 3.4 | 1 | none | keep | one behaviour |
| 3.5 | 2 | none | split | one question per message (every message) and the announcement when several are due (count, phrase, no rank recalled) fail apart; 1.5 cites only the second |
| 3.6 | 1 | none | keep | one behaviour |
| 3.7 | 1 | multi-part question | keep | one behaviour |
| 3.8 | 1 | multi-part question | keep | one behaviour |
| 3.9 | 1 | none | keep | one behaviour |
| 3.10 | 1 | follow-up | keep | one behaviour |
| 3.11 | 1 | none | keep | one behaviour |
| 3.12 | 1 | none | keep | one behaviour |
| 3.13 | 1 | follow-up | keep | one behaviour |
| 3.14 | 1 | follow-up | keep | one behaviour |
| 3.15 | 1 | follow-up | keep | one behaviour |
| 3.16 | 1 | none | keep | one behaviour |
| 3.17 | 1 | closing | keep | one behaviour |
| 3.18 | 1 | closing | keep | one behaviour |
| 3.19 | 1 | closing | keep | one behaviour |
| 3.20 | 1 | closing | keep | one behaviour |
| 3.21 | 1 | none | keep | one behaviour |
| 4.1 | 1 | none | keep | one behaviour |
| 4.2 | 1 | none | keep | one behaviour |
| 4.3 | 1 | none | keep | one behaviour |
| 4.4 | 1 | none | keep | one behaviour |
| 4.5 | 1 | none | keep | one behaviour |
| 4.6 | 1 | none | keep | one behaviour |
| 4.7 | 1 | none | keep | one behaviour |
| 4.8 | 1 | none | keep | one behaviour |
| 4.9 | 1 | none | keep | one behaviour |
| 4.10 | 2 | none | split | no task list (a tool, its own « Pourquoi ») and no end-of-turn recap (text) are two bans that fail apart |
| 4.11 | 1 | none | keep | one behaviour |
| 4.12 | 1 | none | keep | one behaviour |
| 4.13 | 1 | none | keep | one behaviour |
| 4.14 | 1 | diagrams | keep | one behaviour |
| 4.15 | 1 | diagrams | keep | one behaviour |
| 4.16 | 1 | diagrams | keep | one behaviour |
| 5.1 | 1 | none | keep | one behaviour |
| 5.2 | 1 | none | keep | one behaviour |
| 5.3 | 2 | none | keep | « tu ne le modifies jamais » restates 8.1 (no write outside `learner/`) |
| 5.4 | 1 | none | keep | one behaviour |
| 5.5 | 1 | none | keep | one behaviour |
| 5.6 | 1 | none | keep | one behaviour |
| 6.1 | 1 | none | keep | one behaviour |
| 6.2 | 1 | none | keep | one behaviour |
| 6.3 | 1 | origin asked | keep | one behaviour |
| 6.4 | 1 | origin asked | keep | one behaviour |
| 6.5 | 1 | verification | keep | one behaviour |
| 6.6 | 1 | verification | keep | one behaviour |
| 7.1 | 1 | digging | keep | one behaviour |
| 7.2 | 1 | digging | keep | one behaviour |
| 7.3 | 2 | digging | keep | the journal note of the cases' titles restates row 8.4b |
| 7.4 | 2 | digging | split | closing one successful case and, after two, declaring the concept dug and proposing what follows are two moments |
| 7.5 | 2 | digging | keep | « le rappel de reprise le nomme » restates 1.12; the note is the one row 8.4a points to |
| 7.6 | 2 | digging | keep | removing the note restates row 8.4a (« Retire ce qui est fait ») |
| 7.7 | 1 | none | keep | one behaviour |
| 7.8 | 2 | none | keep | noting `{status.skipped}` restates row 8.4c |
| 7.9 | 1 | none | keep | one behaviour |
| 7.10 | 1 | none | keep | one behaviour |
| 7.11 | 1 | aside | keep | one behaviour |
| 7.12 | 1 | none | keep | one behaviour |
| 7.13 | 1 | aside | keep | one behaviour |
| 7.14 | 2 | none | keep | the note in « {memory_headings.preferences} » restates row 8.4h |
| 8.1 | 2 | none | keep | « improvise-le sans le noter (règle 5.3) » restates 5.3, and says so |
| 8.2 | 2 | save point | split | writing only at save points (all the session) and one write per modified file (at a save point) fail apart in the tool calls |
| 8.3 | 1 | none | keep | one behaviour |
| 8.4 | 1 | save point | keep | one behaviour |
| 8.4a | 2 | save point, stop | keep | the pending question, written at the stop only, is the content 9.2 points to; a row of its own would need a letter out of order or a relettered table |
| 8.4b | 1 | save point | keep | one behaviour |
| 8.4c | 1 | save point | keep | one behaviour |
| 8.4d | 1 | save point | keep | one behaviour |
| 8.4e | 1 | save point | keep | one behaviour |
| 8.4f | 1 | save point | keep | one behaviour |
| 8.4g | 1 | save point | keep | one behaviour |
| 8.4h | 1 | save point | keep | one behaviour |
| 8.5 | 3 | onboarding, save point | split | the nickname and template comment in the three files, and the profile lines of `learner/apprenant.md` fail apart; « le journal, sa première ligne » restates row 8.4b |
| 8.6 | 1 | none | keep | one behaviour |
| 8.7 | 2 | none | split | correcting a contradicted observation and not noting an untaught notion as a vigilance are two situations, met in different scenarios |
| 8.8 | 1 | none | keep | one behaviour |
| 8.9 | 2 | save point | split | rereading before writing (a read) and writing with the write tool, not the shell (a write) fail apart |
| 8.10 | 1 | save point | keep | one behaviour |
| 8.11 | 1 | save point | keep | one behaviour |
| 8.12 | 1 | none | keep | one behaviour |
| 9.1 | 1 | stop | keep | one behaviour |
| 9.2 | 1 | stop | keep | one behaviour |
| 9.3 | 2 | stop | keep | « puis commite (règle 8.10) » restates 8.10, and says so |
| 9.4 | 1 | stop | keep | one behaviour |
| 9.5 | 1 | stop | keep | one behaviour |

Totals: 103 rules and the 8 rows of 8.4's table; 23 with two or more behaviours (22 rules and
row 8.4a); 11 splits proposed, 12 kept (all for a restating clause, except 8.4a).

## 3. Chains

A chain is a sequence of rules a test reads in order, where one rule triggers the next. In each,
a split with letters keeps the order (1.7a then 1.7b); what breaks a chain is a part moved out of
it, or a part that only says « Puis » with nothing before it in its own rule.

- **Onboarding**, 1.2, 1.3 to 1.10, 8.5, 8.10: the order is the chain (first message, one reply
  per answer, closing message, save point, ready message, first concept). 1.8 and 1.9 already
  start or end on « Puis »; a split of 1.9 would leave a half that starts with « Puis » after its
  sibling, so 1.9 stays whole. Moving 1.7b's ban to family 8 would take it out of the order a
  test reads.
- **Resume**, 1.2, 1.11 to 1.15, 1.17, then 2.1 and 2.6: phrase, limited reading, recap, then the
  branch by the learner's opening. Splitting 1.11 keeps « d'abord ... puis » only if 1.11b names
  its trigger (« Après la phrase d'ouverture de la reprise »); a half that says « puis » alone
  would break the standalone rule.
- **Domain presentation**, 2.1 to 2.6: one message described part by part; already split, no
  change.
- **Closing a validated sub-concept**, 3.17 to 3.20 with 4.11: what follows the correction, in
  order, within fifteen lines; splitting 3.17 would separate the order from the line limit that
  governs it.
- **Follow-up**, 3.10, 3.13, 3.14, 3.15: they share the follow-up count (rank 1 or 2, reset on
  success, a clarification counts); splitting 3.14 would cut the count from its reset.
- **Multi-part question**, 3.7 and 3.8: 3.8 only means something for the question 3.7 splits.
- **Digging**, 7.1 to 7.6 with rows 8.4a and 8.4b: cases chosen, closed, counted to two, noted,
  removed. Splitting 7.4 keeps the count of two with the conclusion it triggers (7.4b).
- **Origin asked**, 6.3 and 6.4 (« Dis aussi »); **verification**, 6.5 and 6.6; **aside**, 7.11
  and 7.13; **diagrams**, 4.14 to 4.16: short pairs or triples, no split proposed.
- **Save point**, 8.2, 8.4 and its table, 8.9, 8.10, 8.11: when, what, reread, write, commit.
  Splitting 8.2 and 8.9 keeps that order.
- **Stop**, 9.1 to 9.5: 9.2 starts on « Puis », and 9.5 (« mêmes étapes ») means 9.1 to 9.4 as a
  whole: no split inside, or 9.5 changes what it covers.

## 4. Timing

- **Now, before S2-04 writes the scenarios and S2-05 runs them.** Cost: `PROTOCOL.md` only
  (rules, 7 "Used in" rows, 11 inherited rows, one citation in 1.5). With letters, every
  citation of a number outside the file stays true, since the number names the whole. The spec
  is still a draft, untagged (`linear-course/v1.0.0` does not exist), so no version bump.
- **After S2-05, before S2-09.** The scenarios' checkpoints cite numbers and S2-05 has validated
  the French text: each split means editing scenarios and rerunning them, and S2-09 forbids rule
  changes during the translation, so the split would be a separate MINOR between the two.
- **Not at all.** Tests cite a rule and the part they check (« 1.7, second sentence »): no cost
  now, a citation that does not stand alone forever, and the same cost again in English.

## 5. Recommendation

**Writing rule**, a third bullet under "Writing rules" in the header of `PROTOCOL.md`, after
« A rule stands alone », with the date of the maintainer's decision added to the line above:

> - A rule says one behaviour, one a test checks on its own. Several keys, items or branches of
>   one act, or a bound written into the act, stay in one rule; two acts a test would report
>   apart (at different moments, or one in the text and one in the tool calls or in `learner/`)
>   are two rules. A clause that recalls a behaviour another rule owns may stay; tests cite the
>   owner. A rule split in two keeps its number with a letter (`1.7a`, `1.7b`): the number
>   still names the whole.

**Split now**, eleven rules into twenty-two, each part keeping its rule's words, plus at most the
trigger it needs to stand alone:

| Rule | New rules | Rows touched |
|---|---|---|
| 1.3 | 1.3a the first message without tool call, with the « Pourquoi »; 1.3b the two-line presentation | Used in `course.domain_count` 1.3b; inherited 1.3 |
| 1.7 | 1.7a the reply to each answer, with the « Pourquoi »; 1.7b « Rien ne s'écrit dans `learner/` avant la dernière réponse d'accueil. » | inherited 1.7 |
| 1.11 | 1.11a the opening sentence, without tool call; 1.11b, from « Après la phrase d'ouverture de la reprise », the limited reading, the message of 1.12 and « Ne repose pas les questions d'accueil » (a reminder of 1.2) | Used in `phrases.resume_opening` 1.11a, `memory_headings.next_step` 1.11b; inherited 1.11 (the new sentence is 1.11a) |
| 3.2 | 3.2a the correction may open the message; 3.2b « Ne demande jamais « {phrases.banned_check} ». » | Used in `phrases.banned_check` 3.2b; inherited 3.2 |
| 3.5 | 3.5a « Une question par message, partout, accueil compris. »; 3.5b the announcement when several are due | Used in `phrases.questions_announce` 3.5b; « (règle 3.5) » in 1.5 becomes 3.5b; inherited 3.5 |
| 4.10 | 4.10a no task list, with the « Pourquoi » and the reason; 4.10b no end-of-turn recap | inherited 4.10 |
| 7.4 | 7.4a a successful case closes like a validated sub-concept; 7.4b after two, the concept is dug, the proposal | inherited 7.4 |
| 8.2 | 8.2a state in the conversation, writes only at save points; 8.2b one write per modified file | inherited 8.2 |
| 8.5 | 8.5a, « À la fin de l'accueil », the nickname and template comment in the three files, and the journal's first line (a reminder of 8.4b); 8.5b, « À la fin de l'accueil », the profile lines of `learner/apprenant.md` | Used in `headings.onboarding` and `memory.profile_line` 8.5b; inherited 8.5 |
| 8.7 | 8.7a a contradicted observation; 8.7b an untaught notion is no vigilance | Used in `memory_headings.next_step` 8.7b; inherited 8.7 |
| 8.9 | 8.9a reread before writing; 8.9b the write tool, no shell | inherited 8.9 (its two sources go one to each) |

Optional, since the number still names the whole: `SPEC.md` section 6 and the decision
`onboarding-in-plan` may cite 8.5b instead of 8.5. `construction/notes/` is not edited.

**Kept whole.** The twelve rules or rows with two behaviours kept above (1.5, 1.8, 1.9, 5.3, 7.3,
7.5, 7.6, 7.8, 7.14, 8.1, 8.4a, 9.3): in all but 8.4a the second behaviour restates a rule that
owns it, which the test cites instead; 8.4a's pending question is the content 9.2 points to, and
a new row would reletter the table. The chains of part 3 stay in order; 1.9 and family 9 stay
whole for their « Puis ».

## 6. Questions for the maintainer

1. **The writing rule.** (a) adopt the bullet of part 5 as worded; (b) adopt its first sentence
   only, the counting left to the editor; (c) no rule, tests cite a rule and its clause.
   Recommendation: (a), so the next editor counts as this study did.
2. **Numbering a split.** (a) letters, the number naming the whole (as 8.4a to 8.4h);
   (b) the next free number at the end of the family (1.18), which breaks the chains' order;
   (c) renumber the families now, free of tests today but touching `SPEC.md`, two decisions and
   every table row. Recommendation: (a).
3. **Which rules.** (a) the eleven of part 5; (b) only the three the issue or a « Pourquoi » line
   points at (1.3, 1.7, 8.5); (c) none. Recommendation: (a).
4. **Restating clauses** (in the twelve rules kept, and the reminders left in 1.11b and 8.5a).
   (a) leave them, tests cite the owner; (b) add the owner's number where the clause does not
   cite it yet; (c) remove them. Recommendation: (a): no text change before the fresh tests,
   and a reminder may help the teacher.
5. **When.** (a) now, by an applying issue that blocks S2-04 (#33); (b) after S2-05, before
   S2-09; (c) never. Recommendation: (a), the only moment where a split costs one file.
