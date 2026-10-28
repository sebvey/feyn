---
date: 2026-10-27
issue: 87
status: accepted
area: spec:linear-course
---

Without this, S1-05 would write « s'il est ou va être PO d'un produit » into `lang/fr.yaml` as
a generic phrase of the pack, and the classroom build of any other course would make the
teacher ask the learner what they know of Scrum.

The onboarding questions and the teacher's posture belong to the course, not to the protocol:
`plan.md` has a mandatory « Accueil » section (`headings.onboarding`) giving the posture in a
paragraph, then the questions as a numbered list, each `**<label>** : <question>`; the protocol
reads it (rules `teacher-posture-from-plan`, `onboarding-questions-announced`,
`onboarding-questions-order` and `onboarding-profile-written`) and keeps only what every course shares: the nickname
question, first, and no question on pace. Each answer goes to `learner/apprenant.md` as
`- <label> : <answer>`, in the learner's words. This replaces the generic wording PR #86 put in
rules `teacher-posture-from-plan` and `onboarding-questions-order`, and the two fixed memory headings « Rôle » and « Avant le parcours ».

## Options ruled out

- Generic questions in the protocol (« le rôle que vise le public cible », « le sujet du
  cours »): a course can neither ask its own question nor drop one, and the generic wording
  drifts at each teacher run.
- Fields in `course.yaml`: prose with a posture does not fit a data file the site reads.

## Consequences

- The `course-files` check requires the section; `courses/parcours-po/plan.md` gets the old
  posture and questions word for word (#87, which blocks S1-05 and S2-01).
