# 09. Decisions

## The problem the maintainer raised

Two agents in parallel on two independent issues assign the same ADR number: conflict. And
there are several independent groups of decisions (spec, teacher, site, course, cross-cutting).

PDSF: sequential numbering ("highest number + 1"), system ADRs at the root and per-context
ADRs in each context folder. It does not solve the conflict, it avoids it: there, ADRs are
written only in a "grilling session", one writer at a time. Worth taking from it: the entry bar
(the named counterfactual) and the decision that may fit in one paragraph.

## Decision: no number, a slug

- One file per decision, named by its slug: `classroom-as-build.md`,
  `two-versioned-objects.md`. The slug is the identifier; we cite "decision
  classroom-as-build".
- Frontmatter: `date`, `issue` (originating GitHub issue number, if any), `status`
  (`accepted` | `superseded-by: <slug>`), `scope` (the component).
- First line of the body: the **counterfactual** ("Without this, an agent would…"). Then the
  decision in one paragraph. Optional sections only when they add: options ruled out,
  consequences.
- Two agents only collide on the same slug for the same decision; the git conflict is then the
  right signal.
- No index to maintain: `ls` and the frontmatter suffice; `/health` may list.
- Alternative ruled out: the GitHub issue number as identifier (unique, free, traceable),
  because it ties a decision's identity to a tool and forces an issue for a decision taken in a
  PR.
- The term is **decision**; "ADR" is the known synonym in conversation, never in paths.

## Groups: a decision lives next to what it binds

| Folder | Decisions |
|---|---|
| `docs/decisions/` | cross-cutting: monorepo, versioned objects, channels, language, decision format |
| `specs/linear-course/decisions/` | the spec's shape, the protocol (e.g. "a domain is presented without a question") |
| `teacher/decisions/` | the teacher's harness: classroom as a build, memory in the classroom |
| `site/decisions/` | the site engine |
| `courses/parcours-po/decisions/` | the course: the bike storyline, the stance « une équipe en sprints » |

Placement rule: the most local component the decision binds; two components, the root.
Slugs make the groups independent without a prefix.

## Entry bar and the two-tests rule

- A decision is written when its counterfactual can be named and it spans several files or
  is costly to undo. Otherwise: a comment at the place concerned, or nothing.
- The **two-tests rule** (today's §4 of the maintenance skill) applies only to teacher
  behaviour decisions (`teacher/` and the spec's protocol), where it comes from: a behaviour
  rule enters the protocol only after two fresh tests show it necessary or sufficient. A site or
  architecture decision is taken on argument.
- The `/decide` skill applies all this: it refuses a decision without a counterfactual, picks
  the folder, checks for a neighbouring slug.

## The 65 current ADRs

No file carries over. Their marrow is extracted by a distillation pass (see `10-migration.md`).
The five to eight architecture decisions still valid are **rewritten** in the format above, in
`feyn`, at stage 0 and stage 1.
