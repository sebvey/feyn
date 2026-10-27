# 12. Open points

## Decided on 2026-10-27

| Point | Decision |
|---|---|
| Artifact repository name | `feyn-site` |
| Merge to `main` | squash, title `<type>(<area>): <summary>`; branch commits free-form |
| Audience | full prose in `plan.md`; one `audience` sentence in `course.yaml` for the site home and previews |
| « Objectif » / « À la fin, l'apprenant sait » | one term, `objective`, in `course.yaml`, restated at the head of `concept.md`; stage 1 checks the two current wordings agree, else merges them |
| Domain « accroches » | dropped; the domain page shows the first sentence of each concept's paragraph in « Le fil des concepts » (a check verifies that sentence stands alone) |
| Teacher in the CLI | describes the diagram from its caption, says it cannot show it here, gives the site page link |
| Second course on `linear-course` | not named now; chosen after stage 4; stage 1 writes the spec knowing another course will follow |
| Glossary terms | confirmed, with `schools` replaced by `stances` + `neighbors` |
| Protocol language | French first (bounded exception to the language policy), switched to English in task S2-09 once the fresh tests are green, validated by an A/B of the scenarios on two classrooms |

## Still open, by design (decided when the build is in front of us)

- **Inline SVG or `<img>`** on the site (dark theme, Pagefind): stage 3.
- **Maximum SVG size** and the exact list of the three semantic classes: stage 1.

## Proposed by the agent, uncontested, without an explicit decision

The maintainer said "I contest nothing" or "looks great" on the rounds that held these points;
they are taken as accepted but deserve a reread:

- the textual caption coupled to the SVG, without an automatic fidelity check;
- `teaching.md` separate rather than teacher-only sections in `concept.md`;
- many short command skills rather than one monolithic skill;
- labels as the truth of state, no Project at first; areas derived from the tree;
- the sub-path per course from the first site, and the preview per PR;
- the migrated course at `0.1.0`;
- decision distillation rather than a blank page;
- stage 1's guard (the old teacher on the new course through a disposable adapter);
- the order of stages and the freeze it imposes;
- the cap on the root (two files) and on `docs/` (three things).

## Named risks

- Rewriting the protocol in English changes the teacher's behaviour (guard: stage 2).
- A public repository exposes the teacher-only files (accepted in beta; switch to private
  possible).
- The migration by agent workflow may lose nuances of the concept files: the comparison report
  and the `taught-check` are there for that, not a human reread of the 20 concepts.
- The freeze lasts for stages 0 to 3; an urgent course fix is done in the old format and
  migrated afterwards.
- A reserved vocabulary only holds if something enforces it: `/health` greps the repository
  docs, skills and issue titles for the banned generic words of `docs/glossary.md` and flags
  them (reports, does not block).
