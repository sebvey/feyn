# linear-course: the test scenarios of the teacher

| Reader | Comes for | Opens |
|---|---|---|
| verifier | the scenarios the fresh tests run, their form, the rules they exercise and those they leave | this file, [`scenario.schema.yaml`](scenario.schema.yaml), the scenarios |
| spec writer | how a scenario is written, and which rules have none | "The format", "The rules covered" |
| builder | nothing here: the harness that runs a scenario is the classroom build's | [`classroom-builder/README.md`](../../../../../classroom-builder/README.md), "The fresh tests" |

The readers are defined in [`spec-directives/README.md`](../../../../../spec-directives/README.md#the-readers).

A **test scenario** is a fixed run of a teaching session: the learner memory it starts from, the learner's messages in order, the acts the teacher's replies are expected to show and the rules of the protocol (`../rules.yaml`) they exercise. A **fresh test** runs one: `mise exec -- classroom-builder/fresh-test <course-dir> <scenario id>` builds a disposable classroom from the course, runs the teacher in it turn by turn, and judges the transcript, a script for the form rules and a fresh agent for the others, slug by slug (`classroom-builder/README.md`, "The fresh tests"). It is the implementation of the method demonstration of the protocol's rules (`spec-directives/1/README.md` section 4). The scenarios live here, in the spec MAJOR, since they name its rules; the harness lives at the root, the same cut as the classroom build (`../build/`).

The scenarios are written for the spec's sample course `cafe` (`../../course/samples/cafe/`: its concepts, its actors, its cases); a second course gets its own when it is tested.

## The format

One YAML file per scenario in this folder, named after its `id`; [`scenario.schema.yaml`](scenario.schema.yaml) fixes the form, and `check-spec` (`scenarios`, `spec-directives/1/README.md` section 8) validates every scenario against it and checks that every slug it names is a rule of the protocol.

| Key | Holds |
|---|---|
| `id` | the scenario's id, its file name without `.yaml` |
| `title` | what the scenario runs, in a few words |
| `learner` | `new` (the learner templates, as the build writes them), or a map from a file of `learner/` (`apprenant.md`, `parcours.md`, `observations.md`) to its content, written in the classroom and committed before the first turn; a file it does not name keeps its template |
| `turns` | the learner's messages, in order, each one call of the teacher in one conversation: `message` (in French), an optional `if`, an optional `expect` |
| `turns[].if` | a branch, since the learner is fixed and the teacher is not: `next-line` sends the message only when the teacher's previous reply ends on the next line (it holds `phrases.continue_prompt`), `question` only when it asks a question (it holds `phrases.question_lead`); otherwise the turn is skipped |
| `turns[].expect` | the observable acts of the teacher's reply, each `act` (worded as an act the fresh tests observe) and `rules` (the slugs it exercises) |
| `rules` | every slug the scenario exercises: each is judged observed or not observed, and the scenario passes when every one is observed |

An act the teacher may do at one turn or the next (a reply that fits in one message or ends on the next line) is put on the later turn, « at this turn or the one before »: the judge reads the whole transcript.

## The scenarios

| Scenario | Starts from | Runs |
|---|---|---|
| [`onboarding`](onboarding.yaml) | a new learner | the onboarding: the first message with no tool call, the onboarding questions in order, the profile written and committed, the ready message, the first message of concept 0 |
| [`concept-0`](concept-0.yaml) | a learner just onboarded | the loop on concept 0: one sub-concept and one question per message, a wrong answer, a partial one and a right one with their follow-ups, the storyline's actors |
| [`stop`](stop.yaml) | a learner in concept 0 | « on continue », a two-part question, then « on s'arrête » : the save, the next step written with the pending question, the commit, the two-line reply |
| [`resume`](resume.yaml) | a returning learner with a pending question | the resume: the opening sentence, the recap from memory, the reply to a greeting, then the pending question taught again |
| [`concept-1`](concept-1.yaml) | a learner at the last sub-concept of concept 0 | concept 0 validated (its save point and commit), the transition to concept 1, its first sub-concept and a follow-up |
| [`retrieval-at-resume`](retrieval-at-resume.yaml) | a returning learner who validated concept 0 in an earlier session, next step concept 1 | the two tests of decision `retrieval-at-resume`: a supplementary case of concept 0 the journal does not name, posed for practice and corrected before concept 1, then its title in the journal at the stop |
| [`declared-diagram`](declared-diagram.yaml) | a learner at sub-concept 0b of concept 0, which declares a diagram | the two tests of decision `diagram-shown-at-its-subconcept`: the message of 0b shows its diagram and says its caption, though the learner never asks |

## The rules covered

The rules of the families 1, 3, 4, 5, 8 and 9 that a session of `cafe` exercises on the path of the first five scenarios (a new learner, concept 0, a stop, a resume, concept 1) are each named by at least one scenario. The two scenarios of a teacher behaviour decision (`retrieval-at-resume`, `declared-diagram`) name only the rules of their decision, so that their exit code says whether the decision's rule holds, whatever the other rules do; the families 2 (the domain presentation), 6 (stances and sources) and 7 (practice, skips, asides) are left to the scenarios that will ask for them. The rules of those six families no scenario names, and why:

| Rule | Why no scenario names it |
|---|---|
| `what-counts-as-one-question` | a definition, applied by the script's count of `one-question-per-message`, not an act of its own |
| `multi-part-answer-shared` | needs both parts of a two-part question answered; `stop` stops after the first |
| `missing-nuance-not-partial` | needs an answer that misses only a nuance, a judgement the fixed messages cannot steer |
| `two-failed-follow-ups` | needs two failed follow-ups in a row, three more turns no scenario spends |
| `elliptic-answer-clarified` | needs an elliptic answer; the fixed answers are full sentences |
| `periodic-mini-recap` | comes every 3 or 4 validated concepts; `cafe` has three and two annexes, and the path validates only concept 0 |
| `adapt-to-pace-requests` | no learner message asks « plus vite », « plus lent », « exemple » or « exercice » |
| `classroom-exchanges-exempt` | no learner message is about the classroom itself |
| `concept-reference-form` | a conditional rule: it acts only when the teacher refers to another concept, which no fixed message makes it do, so a scenario naming it would be judged on an act that may not come |
| `site-pages-not-files` | no learner message asks where to review |
| `requested-diagram-shown` | the moment `diagram` on request: no learner message asks for a diagram |
| `diagram-not-displayable` | the classroom of a fresh test cannot show a diagram, so `declared-diagram` exercises it, but names only the rule of its decision, `declared-diagram-shown`, whose text cites it (the judge reads it for context) |
| `cut-loses-unsaved-state` | needs a cut between two save points |
| `save-announced-ideas` | no idea is announced for a later concept on the path (the instruction of unit 0a1 keeps for concept 1 a setting the learner names, and no fixed message names one) |
| `save-levers`, `save-vigilances`, `save-preferences` | a lever, a vigilance or a preference is the teacher's judgement of the learner, not a fixed act |
| `line-only-if-it-matters`, `contradicted-observation-fixed`, `untaught-notion-not-vigilance`, `productions-not-kept` | judgements on what learner memory keeps, with no act a fixed message triggers |
| `git-failure-told-once` | git works in the classroom |
| `hurried-departure` | no learner message leaves in a hurry (« je dois filer ») |
