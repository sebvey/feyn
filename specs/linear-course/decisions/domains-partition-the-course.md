---
date: 2026-10-27
issue: 27
status: accepted
area: spec:linear-course
---

Without this, an agent adding a concept that serves two domains would list it under both in
`course.yaml`, or group concepts that are not consecutive to follow a skill, so the site would
show the concept twice and a domain's pages would break the prerequisite order; and an agent
moving a concept to another domain would record it as a MINOR, breaking learner memory and site
addresses that cite the old domain.

The domains of a `linear-course` course partition its numbered concepts: each concept belongs
to exactly one domain, a domain's concepts are consecutive, and the domains follow course
order; annexes belong to no domain (`SPEC.md` section 3, check `course-yaml`). A domain is a
unit of reading and presentation, not of competence: a concept that relies on another domain
says so as a prerequisite, not as a membership. Domain numbers and their concepts are course
identifiers, so changing them is a course MAJOR (`SPEC.md` section 8). This replaces the
overlapping « objectifs » of `parcours-po` before its 2.0.0.

## Options ruled out

- Overlapping objectives, a concept serving several: nothing says when the course is covered,
  and the site doubled them as reading paths.
- Domains that are not consecutive (closer to competences): unrolling a domain would break the
  prerequisite order.

## Consequences

- A domain may hold a single concept; that is not a reason to merge it with a neighbour.
