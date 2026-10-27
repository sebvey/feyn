# 122: one testable behaviour per protocol rule

Issue #122, study, 2026-10-28. Nothing else is edited: applying the decision is issue #125.
Ruled 2026-10-28 (part 6): rules are named by slug, not numbered (decision
`rules-named-by-slug`); where parts 3 and 4 name a split's parts by letter ("3.5a") or speak of
letters, read "two slugs".

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
parts count apart when they can fail apart and a test would report them apart:
- acts at different moments (7.4);
- a ban that spans more than the act it sits in (3.2, 5.5);
- two situations under unrelated conditions (8.7);
- a whole message sent with no tool call, beside what the message says (1.3);
- a reading that is not the source of the act beside it: a guard or a bound on the reading
  (8.9 « Relis ... juste avant d'y écrire », 1.11 « ne lis que »).

They count as one:
- several keys or items of one act (1.4's five things the learner can ask);
- the branches of one condition (3.13; 3.12, where the mistake falls; 7.11, whether the aside is
  on the subject);
- a bound written into the act (« sans réexpliquer », « Jamais de push »);
- a sentence or fixed phrase said before the first tool call, with its timing (4.9's form: 1.8,
  1.11's opening sentence, 9.1);
- a reading the rule names as the source of the act it prescribes (2.1 « lue alors »);
- not doing and not offering the same thing (4.14 « ne le propose jamais », 7.7);
- two clarifications of one checkpoint (3.6, what counts as the one question).

A clause that restates an act another rule owns is counted, cited or not (1.11's « Ne repose pas
les questions d'accueil », 8.1's « (règle 5.3) »). An order link that names the next act by its
rule is not (« puis le message de la règle 1.12 », « Puis le point de sauvegarde de l'accueil
(règle 8.5) », « puis commite (règle 8.10) », « les lectures de la règle 1.15 »), nor a form
another rule defines for this rule's own act (« finit par la ligne de suite (règle 4.11) »).
Borderline, counted one: 1.1, 1.16, 2.5, 3.9.

**How the verdict is given.** Split when the parts are reported apart, no part restates a
behaviour another rule owns, and each part stands alone without repeating more than its
trigger. Otherwise keep. A clause that restates another rule's behaviour does not justify a
split: the test cites the rule that owns the behaviour.

| Rule | Behaviours | Chain | Verdict | Reason |
|---|---|---|---|---|
| 1.1 | 1 | none | keep | one behaviour |
| 1.2 | 1 | onboarding, resume (entry) | keep | one behaviour |
| 1.3 | 2 | onboarding | split | no tool call before the first message (tool calls, its own « Pourquoi ») and the two-line presentation (text) fail apart |
| 1.4 | 1 | onboarding | keep | one behaviour |
| 1.5 | 2 | onboarding | keep | the count announced with the first question is 1.5's; « les autres viennent une par message » restates 3.5 |
| 1.6 | 1 | onboarding | keep | one behaviour |
| 1.7 | 2 | onboarding | keep | « Rien ne s'écrit dans `learner/` avant la dernière réponse d'accueil » restates 8.2 (8.2a once split) with 8.4, whose first save point is the end of onboarding |
| 1.8 | 1 | onboarding | keep | one behaviour |
| 1.9 | 2 | onboarding | keep | reading the first concept's files restates 1.16; the storyline (1.9's own) and the domain sheet (2.1's) are the source of the message, which counts them with it, unlike 8.9's reread, a guard that is not the source of what is written |
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
| 3.2 | 3 | none | split | « Ne demande jamais « {phrases.banned_check} » » is a ban on every message, not a bound of the opening correction; « il n'enseigne toujours qu'un sous-concept » restates 3.1 |
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
| 3.18 | 2 | closing | keep | « Lis d'abord les fichiers d'un nouveau concept ou d'un nouveau domaine » restates 1.16 and 2.1; the ending is 3.18's own |
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
| 5.5 | 2 | none | split | the grouping (names, then the role once) applies to actors cited together; « Le rôle entre parenthèses est celui du fil rouge, jamais le rôle qu'une question teste » holds for every mention |
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
| 9.3 | 1 | stop | keep | one behaviour |
| 9.4 | 1 | stop | keep | one behaviour |
| 9.5 | 1 | stop | keep | one behaviour |

Totals: 103 rules and the 8 rows of 8.4's table; 23 with two or more behaviours (22 rules and
row 8.4a); 11 splits proposed, 12 kept (all for a restating clause, except 8.4a).

## 3. Chains

A chain is a sequence of rules a test reads in order, where one rule triggers the next. In each,
a split with letters keeps the order (3.5a then 3.5b); what breaks a chain is a part moved out of
it, or a part that only says « Puis » with nothing before it in its own rule.

- **Onboarding**, 1.2, 1.3 to 1.10, 8.5, 8.9, 8.10: the order is the chain (first message, one
  reply per answer, closing message, save point, ready message, first concept). 1.9 stays whole:
  its readings are the source of its message, and a half opening on « Puis » or « Le message qui
  suit ces lectures » would not stand alone. 1.7's « Rien ne s'écrit » stays in its place in the
  order, as a reminder of 8.2.
- **Resume**, 1.2, 1.11 to 1.15, 1.17, then 2.1 and 2.6: phrase, limited reading, recap, then the
  branch by the learner's opening. Splitting 1.11 keeps « d'abord ... puis » only if 1.11b names
  its trigger (« Après la phrase d'ouverture de la reprise »); a half that says « puis » alone
  would break the standalone rule.
- **Domain presentation**, 2.1 to 2.6: one message described part by part; already split, no
  change.
- **One question**, 3.5a and 3.6: 3.6 says what counts as the one question of 3.5a; the split of
  3.5 keeps the two side by side.
- **Closing a validated sub-concept**, 3.17 to 3.20 with 4.11: what follows the correction, in
  order, within fifteen lines. 3.17 must stay whole: a split would separate the order from the
  line limit that governs it.
- **Follow-up**, 3.10, 3.13, 3.14, 3.15: they share the follow-up count (rank 1 or 2, reset on
  success, a clarification counts). 3.14 must stay whole: a split would cut the count from its
  reset.
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
  (rules, 7 "Used in" rows, 11 inherited rows, the citation « (règle 3.5) » in 1.5). With
  letters, every citation of a bare number stays true, since the number names the whole: 1.8's
  « (règle 8.5) », `SPEC.md` section 6, the decisions `onboarding-in-plan` and
  `svg-only-diagrams`. No version bump only if the applying issue lands before issue #29 (S1-16),
  which tags `linear-course/v1.0.0` and creates `specs/linear-course/CHANGELOG.md`; after #29,
  the split is a MINOR (`SPEC.md` section 8) with a CHANGELOG entry.
- **After S2-05, before S2-09.** The scenarios' checkpoints cite numbers and S2-05 has validated
  the French text: each split means editing scenarios and rerunning them, and S2-09 forbids rule
  changes during the translation, so the split would be a separate MINOR between the two.
- **Not at all.** Tests cite a rule and the part they check (« 3.5, first sentence »): no cost
  now, a citation that does not stand alone forever, and the same cost again in English.

## 5. Recommendation

**Writing rule**, a third bullet under "Writing rules" in the header of `PROTOCOL.md`, after
« A rule stands alone », with the date of the maintainer's decision added to the line above. Accepted on 2026-10-28
(question 1), its last sentence set by the ruling of question 2:

> - A rule says one behaviour, one a test checks on its own. Several keys, items or branches of
>   one act, a bound written into the act, a reading named as the source of the act, or a
>   sentence or fixed phrase said before the first tool call (the waiting-sentence rule's form) stay in one rule.
>   Two acts a test would report apart are two rules: at different moments, or one in the text
>   and one in the tool calls or in `learner/`; a whole message sent with no tool call is a
>   behaviour beside what the message says. A clause that recalls a behaviour another rule owns
>   may stay; tests cite the owner. A rule is named by its slug; a rule split in two gets two
>   slugs.

**Split now**, eleven rules into twenty-two, each part keeping its rule's words, plus at most the
trigger it needs to stand alone:

| Rule | Two rules, one slug each | Rows touched |
|---|---|---|
| 1.3 | first: « Le premier message d'accueil part sans appel d'outil. », with the « Pourquoi »; second: « Le premier message d'accueil présente le cours en deux lignes : ... » | Used in `course.domain_count` (second); inherited 1.3 |
| 1.11 | first: « Reprise : d'abord « {phrases.resume_opening} », sans appel d'outil. »; second: « Après la phrase d'ouverture de la reprise, ne lis que ... », the message of 1.12 and « Ne repose pas les questions d'accueil » (a reminder of 1.2) | Used in `phrases.resume_opening` (first), `memory_headings.next_step` (second); inherited 1.11 (the new sentence is the first) |
| 3.2 | first: « La correction de la réponse précédente peut ouvrir le message ; il n'enseigne toujours qu'un sous-concept. » (the second clause a reminder of 3.1); second: « Ne demande jamais « {phrases.banned_check} ». » | Used in `phrases.banned_check` (second); inherited 3.2 |
| 3.5 | first: « Une question par message, partout, accueil compris. »; second: « Plusieurs questions à poser : annonce leur nombre ... » | Used in `phrases.questions_announce` (second); « (règle 3.5) » in 1.5 cites the second slug; inherited 3.5 |
| 4.10 | first: « En session de cours, ne tiens pas de liste de tâches ... », with the « Pourquoi » and the reason; second: « En session de cours, ne finis pas un tour par un récapitulatif. » | inherited 4.10 |
| 5.5 | first: « Plusieurs acteurs de même rôle cités ensemble : leurs noms, puis le rôle une fois. »; second: « Le rôle entre parenthèses d'un acteur est celui du fil rouge, jamais le rôle qu'une question teste. » | inherited 5.5 |
| 7.4 | first: « Un cas de creusage réussi se clôt comme un sous-concept validé. »; second: « Après deux cas de creusage réussis, le concept est creusé : propose ... » | inherited 7.4 |
| 8.2 | first: « Pendant la session, garde l'état dans la conversation. N'écris dans `learner/` qu'aux points de sauvegarde. »; second: « À un point de sauvegarde, chaque fichier de `learner/` modifié s'écrit en une seule écriture. » | inherited 8.2 |
| 8.5 | first: « À la fin de l'accueil, dans les trois fichiers de `learner/`, ... », the nickname, the template comment and the journal's first line (a reminder of 8.4b); second: « À la fin de l'accueil, dans la liste de `learner/apprenant.md`, ... », the profile lines | Used in `headings.onboarding` and `memory.profile_line` (second); inherited 8.5 |
| 8.7 | first: « Une observation contredite se corrige ou se supprime. »; second: « Une notion pas encore enseignée que l'apprenant ignore n'est pas une vigilance : ... » | Used in `memory_headings.next_step` (second); inherited 8.7 |
| 8.9 | first: « Relis un fichier de `learner/` juste avant d'y écrire, si tu ne l'as pas lu dans la session. »; second: « Écris un fichier de `learner/` avec l'outil d'écriture, sans commande shell. » | inherited 8.9 (its two sources go one to each) |

Every reference then cites the slugs (decision `rules-named-by-slug`): the cross-references
inside `PROTOCOL.md`, `SPEC.md` section 6, the decisions `onboarding-in-plan` and
`svg-only-diagrams`, the two tables. `construction/notes/` is not edited.

**Kept whole.** The twelve rules or rows with two behaviours kept above (1.5, 1.7, 1.9, 3.18,
5.3, 7.3, 7.5, 7.6, 7.8, 7.14, 8.1, 8.4a): in all but 8.4a the second behaviour restates a rule
that owns it, which the test cites instead; 8.4a's pending question is the content 9.2 points
to, and a new row would part the content from its moment (question 7). The chains of part 3 stay in order;
3.14 and 3.17 must stay whole, as must 1.9 and family 9 for their « Puis ».

## 6. Questions for the maintainer

Answered by the maintainer on 2026-10-28 (comment on issue #122): « D'accord pour tout, sauf un
point : le pourquoi de la numérotation des règles ». Questions 1 and 3 to 7 as recommended;
question 2 replaced by slugs (decision `rules-named-by-slug`). Applied by issue #125.


1. **The writing rule.** (a) adopt the bullet of part 5 as worded; (b) adopt its first sentence
   only, the counting left to the editor; (c) no rule, tests cite a rule and its clause.
   Recommendation: (a), so the next editor counts as this study did. **Answered: (a).**
2. **Numbering a split.** (a) letters, the number naming the whole (as 8.4a to 8.4h);
   (b) the next free number at the end of the family (1.18), which breaks the chains' order;
   (c) renumber the families now, free of tests today but touching `SPEC.md`, two decisions and
   every table row. Recommendation: (a). **Answered: none of them.** « J'aime pas du tout
   l'idée des numérotation avec lettres pour le nouveau découpage. » « le slug, c'est
   brilliant. » Every rule gets a stable slug and loses its number; every reference cites the
   slug; order and sections become free; a removed rule's slug is never reused; a check
   verifies that every cited slug exists and none is duplicated; a split rule gets two slugs.
3. **Which rules.** (a) the eleven of part 5; (b) only the three the issue or a « Pourquoi » line
   singles out the split part of (8.5 named by the issue; 1.3 and 4.10, whose « Pourquoi » is on
   one part); (c) none. Recommendation: (a). **Answered: (a).**
4. **Restating clauses** (in the twelve rules kept, and the reminders left in 1.11b, 3.2a and
   8.5a). (a) leave them, tests cite the owner; (b) add the owner's number where the clause does
   not cite it yet; (c) remove them. Recommendation: (a): no text change before the fresh tests,
   and a reminder may help the teacher. **Answered: (a).**
5. **When.** (a) now, by an applying issue that blocks S2-04 (#33) and lands before #29 tags
   `linear-course/v1.0.0` (no version bump); (b) after S2-05, before S2-09, a MINOR with a
   CHANGELOG entry; (c) never. Recommendation: (a), the only moment where a split costs one file;
   if #29 lands first, the same applying issue adds a MINOR and its CHANGELOG entry.
   **Answered: (a):** #125 blocks #33 and #29.
6. **Rules that already break « A rule stands alone ».** 1.9, 2.3 and 9.2 open on « Puis »; 6.4
   says « cette affirmation »; 1.9 and 3.18 say « Le message » for a message another rule names.
   (a) fix them in the applying issue; (b) a separate issue; (c) leave them. Recommendation: (a),
   one pass on the same file before tests cite it. **Answered: (a).**
7. **Row 8.4a** (where we are, and at the stop only the pending question). (a) keep it whole;
   (b) add a row 8.4i for the pending question, out of the table's order; (c) reletter the
   table. Recommendation: (a): 9.2 already owns the moment, the row only the content.
   **Answered: (a).**
