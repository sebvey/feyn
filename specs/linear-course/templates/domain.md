<!--
Template of courses/<id>/domains/<N>-<slug>.md (SPEC.md section 5).
Reader-facing: the site builds it, the teacher reads it. It teaches no concept and makes no
claim that a concept of the domain does not make: it has no sources file.
How to use: copy to domains/<number>-<slug>.md as named in course.yaml, replace every
<placeholder>, delete this comment (from the opening to the closing mark, marks included).
- No H1. Frontmatter: `description` only; number, title, objective and duration are in
  course.yaml.
- Four ## sections, all mandatory, in this order.
- « Le fil des concepts »: one paragraph per concept of the domain, in order, opening with
  `**<number>. <concept title>.**` (title as in course.yaml). A domain of one concept has one
  paragraph for the concept, then one per first-level sub-concept, opening with
  `**<id>. <title>.**`. The first sentence after the lead stands alone: it ends with . ? or !
  within 300 characters and does not open with a word of the pack's `checks.anaphora` list
  (French: Il, Elle, Ce, Cette, Puis...).
-->
---
description: "<one sentence for the site>"
---

## Le problème

<the difficulty met without the domain's concepts: what is done wrong, what it costs>

## Le fil des concepts

**<n>. <concept title>.** <what the concept brings and why it comes at this place>

**<n>a. <title of a>.** <what the sub-concept brings (only in a domain of one concept: delete this paragraph otherwise)>

## D'où l'on vient, où l'on va

<what the previous domain gives this one, and what this one gives the next>

## Un cas qui traverse le domaine

<a storyline situation where each concept of the domain serves, in order, without giving the answer>
