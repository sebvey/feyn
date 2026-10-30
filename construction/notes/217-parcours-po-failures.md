# #217: the new conformity failures of `parcours-po`

The worklist of the sources pass of #221. `mise exec -- specs/check-course courses/parcours-po`
on the branch of #217 (`main` at `0fa961d` exits 0): 492 failures, two checks, every line below
as the dispatcher prints it, grouped by check and kind. `--quality` is unchanged (87
`glossary-order` failures, as on `main`).

| Check | Kind | Count |
|---|---|---|
| `concept-folder` | `verified` not parallel to `refs` (an item with `refs` and no `verified`) | 194 |
| `concept-folder` | « Affirmations » not in five columns | 20 |
| `sources` | « Non vérifié » entry with an unknown section (122 open with a bold topic) | 172 |
| `sources` | link not one URL (URLs joined by « ; », a URL and text, « (aucun) », « (dépôt) », a path) | 39 |
| `sources` | reference cited by nothing | 30 |
| `sources` | introduction | 19 |
| `sources` | « Non vérifié » entry with no section (no « : » in the item) | 18 |

**Masked failures.** `sources` reads only the rows of five cells, so while « Affirmations » has
four columns its row-level rules do not run, and the 30 "cited by nothing" are mostly references
cited only by claim rows. An estimate, on a scratch copy where each claim's last parenthesis was
moved to a section column and nothing else changed: 1,448 failures, adding 406 unknown section
anchors (`teaching.md` sections, case titles, « Consensus et choix d'école » mixed with body
sections), 155 empty natures, 155 free-text source cells (« aucune », « fil rouge », « en
partie »...), 152 stance rows, 133 paths to another concept, 5 empty sections, and no "cited by
nothing". The dispatcher reprints the real list after each step of the pass.

## `concept-folder`: `verified` not parallel to `refs` (194)

```
concept-folder: fail: concepts/00-scrum/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/00-scrum/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/00-scrum/concept.md:17 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/00-scrum/concept.md:19 stances.course[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/00-scrum/concept.md:21 stances.course[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/00-scrum/concept.md:23 stances.course[4]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/01-produit-et-po/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/01-produit-et-po/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/01-produit-et-po/concept.md:11 stances.consensus[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/01-produit-et-po/concept.md:15 stances.school[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/01-produit-et-po/concept.md:18 stances.school[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/01-produit-et-po/concept.md:22 stances.course[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/01-produit-et-po/concept.md:24 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/01-produit-et-po/concept.md:26 stances.course[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/02-objectif-produit-resultat/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/02-objectif-produit-resultat/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (4), found 0
concept-folder: fail: concepts/02-objectif-produit-resultat/concept.md:12 stances.school[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/02-objectif-produit-resultat/concept.md:15 stances.school[1]: verified must have one entry per reference of refs (6), found 0
concept-folder: fail: concepts/02-objectif-produit-resultat/concept.md:18 stances.school[2]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/02-objectif-produit-resultat/concept.md:21 stances.school[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/02-objectif-produit-resultat/concept.md:24 stances.school[4]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/02-objectif-produit-resultat/concept.md:27 stances.school[5]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/02-objectif-produit-resultat/concept.md:31 stances.course[0]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/02-objectif-produit-resultat/concept.md:33 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/02-objectif-produit-resultat/concept.md:35 stances.course[2]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/03-backlog-produit/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/03-backlog-produit/concept.md:9 stances.school[0]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/03-backlog-produit/concept.md:12 stances.school[1]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/03-backlog-produit/concept.md:15 stances.school[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/03-backlog-produit/concept.md:19 stances.course[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/03-backlog-produit/concept.md:21 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/03-backlog-produit/concept.md:23 stances.course[2]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/03-backlog-produit/concept.md:25 stances.course[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/03-backlog-produit/concept.md:27 stances.course[4]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/03-backlog-produit/concept.md:30 neighbors[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/04-hierarchie/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/04-hierarchie/concept.md:9 stances.school[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/04-hierarchie/concept.md:12 stances.school[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/04-hierarchie/concept.md:15 stances.school[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/04-hierarchie/concept.md:18 stances.school[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/04-hierarchie/concept.md:24 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/04-hierarchie/concept.md:26 stances.course[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/04-hierarchie/concept.md:28 stances.course[3]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/04-hierarchie/concept.md:33 neighbors[0]: verified must have one entry per reference of refs (4), found 0
concept-folder: fail: concepts/05-user-story/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/05-user-story/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/05-user-story/concept.md:12 stances.school[0]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/05-user-story/concept.md:15 stances.school[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/05-user-story/concept.md:19 stances.course[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/05-user-story/concept.md:21 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/05-user-story/concept.md:23 stances.course[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/05-user-story/concept.md:30 neighbors[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/06-roles-personas/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/06-roles-personas/concept.md:9 stances.school[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/06-roles-personas/concept.md:12 stances.school[1]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/06-roles-personas/concept.md:16 stances.course[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/06-roles-personas/concept.md:18 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/06-roles-personas/concept.md:25 neighbors[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/07-invest/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/07-invest/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/07-invest/concept.md:12 stances.school[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/07-invest/concept.md:15 stances.school[1]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/07-invest/concept.md:19 stances.course[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/07-invest/concept.md:21 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/07-invest/concept.md:23 stances.course[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/07-invest/concept.md:25 stances.course[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/07-invest/concept.md:27 stances.course[4]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/08-criteres-regles/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/08-criteres-regles/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/08-criteres-regles/concept.md:12 stances.school[0]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/08-criteres-regles/concept.md:15 stances.school[1]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/08-criteres-regles/concept.md:18 stances.school[2]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/08-criteres-regles/concept.md:22 stances.course[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/08-criteres-regles/concept.md:24 stances.course[1]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/08-criteres-regles/concept.md:26 stances.course[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/08-criteres-regles/concept.md:28 stances.course[3]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/08-criteres-regles/concept.md:30 stances.course[4]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/08-criteres-regles/concept.md:32 stances.course[5]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/09-decoupage-vertical/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/09-decoupage-vertical/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/09-decoupage-vertical/concept.md:12 stances.school[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/09-decoupage-vertical/concept.md:15 stances.school[1]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/09-decoupage-vertical/concept.md:18 stances.school[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/09-decoupage-vertical/concept.md:21 stances.school[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/09-decoupage-vertical/concept.md:24 stances.school[4]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/09-decoupage-vertical/concept.md:28 stances.course[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/09-decoupage-vertical/concept.md:30 stances.course[1]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/09-decoupage-vertical/concept.md:32 stances.course[2]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/09-decoupage-vertical/concept.md:36 stances.course[4]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/09-decoupage-vertical/concept.md:39 neighbors[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/10-hors-perimetre-dependances/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/10-hors-perimetre-dependances/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (4), found 0
concept-folder: fail: concepts/10-hors-perimetre-dependances/concept.md:12 stances.school[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/10-hors-perimetre-dependances/concept.md:15 stances.school[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/10-hors-perimetre-dependances/concept.md:18 stances.school[2]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/10-hors-perimetre-dependances/concept.md:22 stances.course[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/10-hors-perimetre-dependances/concept.md:24 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/10-hors-perimetre-dependances/concept.md:26 stances.course[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/10-hors-perimetre-dependances/concept.md:28 stances.course[3]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/10-hors-perimetre-dependances/concept.md:31 neighbors[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/11-dor-dod/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/11-dor-dod/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/11-dor-dod/concept.md:11 stances.consensus[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/11-dor-dod/concept.md:15 stances.school[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/11-dor-dod/concept.md:18 stances.school[1]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/11-dor-dod/concept.md:21 stances.school[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/11-dor-dod/concept.md:24 stances.school[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/11-dor-dod/concept.md:28 stances.course[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/11-dor-dod/concept.md:30 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/11-dor-dod/concept.md:34 stances.course[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/11-dor-dod/concept.md:36 stances.course[4]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/11-dor-dod/concept.md:39 neighbors[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/12-donnees-produit/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (4), found 0
concept-folder: fail: concepts/12-donnees-produit/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/12-donnees-produit/concept.md:12 stances.school[0]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/12-donnees-produit/concept.md:15 stances.school[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/12-donnees-produit/concept.md:19 stances.course[0]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/12-donnees-produit/concept.md:27 stances.course[4]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/13-ordonner-backlog/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/13-ordonner-backlog/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/13-ordonner-backlog/concept.md:11 stances.consensus[2]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/13-ordonner-backlog/concept.md:15 stances.school[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/13-ordonner-backlog/concept.md:18 stances.school[1]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/13-ordonner-backlog/concept.md:21 stances.school[2]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/13-ordonner-backlog/concept.md:24 stances.school[3]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/13-ordonner-backlog/concept.md:28 stances.course[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/13-ordonner-backlog/concept.md:30 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/13-ordonner-backlog/concept.md:32 stances.course[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/13-ordonner-backlog/concept.md:34 stances.course[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/13-ordonner-backlog/concept.md:36 stances.course[4]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/14-parties-prenantes/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/14-parties-prenantes/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/14-parties-prenantes/concept.md:11 stances.consensus[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/14-parties-prenantes/concept.md:15 stances.school[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/14-parties-prenantes/concept.md:18 stances.school[1]: verified must have one entry per reference of refs (4), found 0
concept-folder: fail: concepts/14-parties-prenantes/concept.md:21 stances.school[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/14-parties-prenantes/concept.md:24 stances.school[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/14-parties-prenantes/concept.md:30 stances.course[1]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/14-parties-prenantes/concept.md:32 stances.course[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/14-parties-prenantes/concept.md:34 stances.course[3]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/14-parties-prenantes/concept.md:38 stances.course[5]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/15-vie-story/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/15-vie-story/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/15-vie-story/concept.md:11 stances.consensus[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/15-vie-story/concept.md:14 stances.consensus[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/15-vie-story/concept.md:17 stances.consensus[4]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/15-vie-story/concept.md:21 stances.school[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/15-vie-story/concept.md:24 stances.school[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/15-vie-story/concept.md:28 stances.course[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/15-vie-story/concept.md:32 stances.course[2]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/15-vie-story/concept.md:35 neighbors[0]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/16-story-map/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/16-story-map/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/16-story-map/concept.md:11 stances.consensus[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/16-story-map/concept.md:15 stances.school[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/16-story-map/concept.md:18 stances.school[1]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/16-story-map/concept.md:21 stances.school[2]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/16-story-map/concept.md:24 stances.school[3]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/16-story-map/concept.md:28 stances.course[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/16-story-map/concept.md:30 stances.course[1]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/16-story-map/concept.md:34 stances.course[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/16-story-map/concept.md:36 stances.course[4]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/16-story-map/concept.md:39 neighbors[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:11 stances.consensus[2]: verified must have one entry per reference of refs (4), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:15 stances.school[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:18 stances.school[1]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:21 stances.school[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:24 stances.school[3]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:27 stances.school[4]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:30 stances.school[5]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:34 stances.course[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:36 stances.course[1]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:38 stances.course[2]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/17-hypotheses-exploration/concept.md:40 stances.course[3]: verified must have one entry per reference of refs (4), found 0
concept-folder: fail: concepts/A1-outil-backlog/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/A1-outil-backlog/concept.md:8 stances.consensus[1]: verified must have one entry per reference of refs (8), found 0
concept-folder: fail: concepts/A1-outil-backlog/concept.md:12 stances.school[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/A1-outil-backlog/concept.md:15 stances.school[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/A1-outil-backlog/concept.md:21 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/A1-outil-backlog/concept.md:23 stances.course[2]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/A1-outil-backlog/concept.md:25 stances.course[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/A1-outil-backlog/concept.md:30 neighbors[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/A2-sans-sprint/concept.md:5 stances.consensus[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/A2-sans-sprint/concept.md:9 stances.school[0]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/A2-sans-sprint/concept.md:12 stances.school[1]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/A2-sans-sprint/concept.md:16 stances.course[0]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/A2-sans-sprint/concept.md:18 stances.course[1]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/A2-sans-sprint/concept.md:20 stances.course[2]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/A2-sans-sprint/concept.md:22 stances.course[3]: verified must have one entry per reference of refs (1), found 0
concept-folder: fail: concepts/A2-sans-sprint/concept.md:24 stances.course[4]: verified must have one entry per reference of refs (3), found 0
concept-folder: fail: concepts/A2-sans-sprint/concept.md:26 stances.course[5]: verified must have one entry per reference of refs (2), found 0
concept-folder: fail: concepts/A2-sans-sprint/concept.md:29 neighbors[0]: verified must have one entry per reference of refs (1), found 0
```

## `sources`: « Non vérifié » entry with an unknown section (172)

```
sources: fail: concepts/00-scrum/sources.md:73 « Non vérifié » entry: unknown section "La fréquence de la confusion « on livre un sprint »": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/01-produit-et-po/sources.md:37 « Non vérifié » entry: unknown section "**Le gabarit PDF du Product Vision Board** (questions de la section « Needs »)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/01-produit-et-po/sources.md:39 « Non vérifié » entry: unknown section "**Décrire le produit par sa technique est un piège** (Pièges)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/01-produit-et-po/sources.md:48 « Non vérifié » entry: unknown section "**Le PO tient compte du coût pour ordonner** (Banque": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/01-produit-et-po/sources.md:48 « Non vérifié » entry: unknown section "streaming)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/01-produit-et-po/sources.md:52 « Non vérifié » entry: unknown section "**Un désaccord qui dépasse le PO se porte au sponsor** (Banque": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/01-produit-et-po/sources.md:52 « Non vérifié » entry: unknown section "vote)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/01-produit-et-po/sources.md:54 « Non vérifié » entry: unknown section "**Partie prenante qui inclut les utilisateurs** (Banque": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/01-produit-et-po/sources.md:54 « Non vérifié » entry: unknown section "équipe appli et vote)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/01-produit-et-po/sources.md:56 « Non vérifié » entry: unknown section "**Cible de fraîcheur de moins de 15 minutes** (Banque": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/01-produit-et-po/sources.md:56 « Non vérifié » entry: unknown section "streaming)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/02-objectif-produit-resultat/sources.md:83 « Non vérifié » entry: unknown section "**Définition exacte de Seiden**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/02-objectif-produit-resultat/sources.md:87 « Non vérifié » entry: unknown section "**Phrase de positionnement de Geoffrey Moore**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/02-objectif-produit-resultat/sources.md:90 « Non vérifié » entry: unknown section "**Effet de la pluie**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/02-objectif-produit-resultat/sources.md:93 « Non vérifié » entry: unknown section "**Patton et la distinction livrable et résultat**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/02-objectif-produit-resultat/sources.md:95 « Non vérifié » entry: unknown section "**Loi de Goodhart**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/02-objectif-produit-resultat/sources.md:100 « Non vérifié » entry: unknown section "**Guide EBM**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/02-objectif-produit-resultat/sources.md:103 « Non vérifié » entry: unknown section "**Billet de Dave West (S7)**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/02-objectif-produit-resultat/sources.md:105 « Non vérifié » entry: unknown section "**Indicateur avancé et indicateur retardé** (leading": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/02-objectif-produit-resultat/sources.md:105 « Non vérifié » entry: unknown section "lagging)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/03-backlog-produit/sources.md:60 « Non vérifié » entry: unknown section "**« Le backlog garde son sens sans sprints » comme consensus**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/03-backlog-produit/sources.md:67 « Non vérifié » entry: unknown section "**Origine de l'image de l'iceberg du backlog**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/03-backlog-produit/sources.md:69 « Non vérifié » entry: unknown section "**Date de DEEP**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/03-backlog-produit/sources.md:71 « Non vérifié » entry: unknown section "**Termes français de la traduction officielle du SG 2020** (« Backlog Produit »": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/03-backlog-produit/sources.md:71 « Non vérifié » entry: unknown section "« émergent »)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/03-backlog-produit/sources.md:73 « Non vérifié » entry: unknown section "**Kanban Guide for Scrum Teams [S7]**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/04-hierarchie/sources.md:56 « Non vérifié » entry: unknown section "Le texte de Beck": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/04-hierarchie/sources.md:56 « Non vérifié » entry: unknown section "*Extreme Programming Explained* (1999)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/04-hierarchie/sources.md:58 « Non vérifié » entry: unknown section "La signature de [S2]": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/04-hierarchie/sources.md:65 « Non vérifié » entry: unknown section "Le sens de « thème » dans Jira (regroupement transversal)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/04-hierarchie/sources.md:67 « Non vérifié » entry: unknown section "« Quelques jours » comme pratique courante pour la taille d'une story": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:56 « Non vérifié » entry: unknown section "**Date de Connextra**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:59 « Non vérifié » entry: unknown section "**Libellé exact du modèle d'origine**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:63 « Non vérifié » entry: unknown section "**Kent Beck": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:63 « Non vérifié » entry: unknown section "1997": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:63 « Non vérifié » entry: unknown section "projet C3": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:63 « Non vérifié » entry: unknown section "et *Extreme Programming Explained* (1999)**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:66 « Non vérifié » entry: unknown section "**« A user story is a promise for a conversation » (Alistair Cockburn": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:66 « Non vérifié » entry: unknown section "1998)**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:68 « Non vérifié » entry: unknown section "**Rachel Davies": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:68 « Non vérifié » entry: unknown section "« inventrice » de la user story**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:71 « Non vérifié » entry: unknown section "**Les cinq pourquoi**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:74 « Non vérifié » entry: unknown section "**Cohn": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/05-user-story/sources.md:74 « Non vérifié » entry: unknown section "*User Stories Applied* (2004)**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/06-roles-personas/sources.md:54 « Non vérifié » entry: unknown section "**Date des premiers personas (1983) et récit de « Kathy »**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/06-roles-personas/sources.md:59 « Non vérifié » entry: unknown section "**Année de *The Inmates Are Running the Asylum***": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/06-roles-personas/sources.md:62 « Non vérifié » entry: unknown section "**Priorité de Cooper**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/06-roles-personas/sources.md:65 « Non vérifié » entry: unknown section "**Définition du rôle utilisateur chez Cohn ou chez Constantine et Lockwood**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/06-roles-personas/sources.md:70 « Non vérifié » entry: unknown section "**« Frustrations » comme composant d'un persona** (absent de la fiche)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/06-roles-personas/sources.md:73 « Non vérifié » entry: unknown section "**Écrire une story au nom d'un persona** (« En tant qu'Abba… »)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/06-roles-personas/sources.md:76 « Non vérifié » entry: unknown section "**« Quasi consensuel »** (absent de la fiche": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/06-roles-personas/sources.md:76 « Non vérifié » entry: unknown section "rôles précis plutôt qu'« utilisateur »)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/07-invest/sources.md:61 « Non vérifié » entry: unknown section "**« Quelques jours » comme pratique « courante »**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/07-invest/sources.md:64 « Non vérifié » entry: unknown section "**Cohn": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/07-invest/sources.md:64 « Non vérifié » entry: unknown section "*User Stories Applied* (2004)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/07-invest/sources.md:64 « Non vérifié » entry: unknown section "chapitre 2 sur INVEST**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/07-invest/sources.md:66 « Non vérifié » entry: unknown section "**Origine XP du spike au-delà de Wells**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/08-criteres-regles/sources.md:69 « Non vérifié » entry: unknown section "**Date de naissance de Given/When/Then**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/08-criteres-regles/sources.md:73 « Non vérifié » entry: unknown section "**Créateur de Gherkin et de Cucumber** (Aslak Hellesøy": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/08-criteres-regles/sources.md:73 « Non vérifié » entry: unknown section "d'après des sources non consultées)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/08-criteres-regles/sources.md:75 « Non vérifié » entry: unknown section "**Contenu du livre d'Adzic** (les sept patrons": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/08-criteres-regles/sources.md:75 « Non vérifié » entry: unknown section "les cas étudiés)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/08-criteres-regles/sources.md:78 « Non vérifié » entry: unknown section "**Séparation critère / règle métier comme pratique répandue**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/08-criteres-regles/sources.md:83 « Non vérifié » entry: unknown section "**« Une variable à la fois »**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/08-criteres-regles/sources.md:85 « Non vérifié » entry: unknown section "**« Une story porte des critères d'acceptation » étiqueté « Consensus »**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/08-criteres-regles/sources.md:88 « Non vérifié » entry: unknown section "**SPIDR (Cohn) et patrons de Richard Lawrence**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/08-criteres-regles/sources.md:91 « Non vérifié » entry: unknown section "**Cohn": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/08-criteres-regles/sources.md:91 « Non vérifié » entry: unknown section "*User Stories Applied* (2004)**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:74 « Non vérifié » entry: unknown section "**Origine de la métaphore du gâteau**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:77 « Non vérifié » entry: unknown section "**Origine du terme « vertical slice »**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:79 « Non vérifié » entry: unknown section "**Date d'origine de SPIDR**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:81 « Non vérifié » entry: unknown section "**Signature de [S5]": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:81 « Non vérifié » entry: unknown section "[S7]": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:81 « Non vérifié » entry: unknown section "[S9]**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:83 « Non vérifié » entry: unknown section "**Signature de [S4]**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:85 « Non vérifié » entry: unknown section "**Date du walking skeleton**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:88 « Non vérifié » entry: unknown section "**Le découpage par couches serait « l'erreur la plus courante »** [S7]": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:90 « Non vérifié » entry: unknown section "**Couches d'un produit data** (ingestion": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:90 « Non vérifié » entry: unknown section "transformation": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:90 « Non vérifié » entry: unknown section "données prêtes": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:90 « Non vérifié » entry: unknown section "restitution)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:92 « Non vérifié » entry: unknown section "**« Qualité de service différée (5 minutes avant temps réel) »**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:98 « Non vérifié » entry: unknown section "**« Elephant carpaccio »** (Cockburn": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/09-decoupage-vertical/sources.md:98 « Non vérifié » entry: unknown section "exercice de découpage très fin)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/10-hors-perimetre-dependances/sources.md:57 « Non vérifié » entry: unknown section "**« Pratique de rédaction répandue »** pour une rubrique « Hors périmètre » dans une story": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/10-hors-perimetre-dependances/sources.md:61 « Non vérifié » entry: unknown section "**Cohn": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/10-hors-perimetre-dependances/sources.md:61 « Non vérifié » entry: unknown section "*User Stories Applied***": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/10-hors-perimetre-dependances/sources.md:65 « Non vérifié » entry: unknown section "**Accord entre deux PO de produits distincts sur l'ordre dans leurs backlogs**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/10-hors-perimetre-dependances/sources.md:68 « Non vérifié » entry: unknown section "**Lien « dépend de » dans les outils autres que Jira**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/10-hors-perimetre-dependances/sources.md:69 « Non vérifié » entry: unknown section "**Date et auteur de [S6]**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/11-dor-dod/sources.md:75 « Non vérifié » entry: unknown section "**Premier auteur de la DoR**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/11-dor-dod/sources.md:85 « Non vérifié » entry: unknown section "**« Mini cahier des charges »**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/11-dor-dod/sources.md:87 « Non vérifié » entry: unknown section "**Livres non lus**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/12-donnees-produit/sources.md:87 « Non vérifié » entry: unknown section "**Contenu d'une définition d'indicateur**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/12-donnees-produit/sources.md:91 « Non vérifié » entry: unknown section "**Pseudonymisation": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/12-donnees-produit/sources.md:91 « Non vérifié » entry: unknown section "arrêt de 2025**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/12-donnees-produit/sources.md:98 « Non vérifié » entry: unknown section "**« Fraîcheur » pour timeliness**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/12-donnees-produit/sources.md:101 « Non vérifié » entry: unknown section "**DAMA UK**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/12-donnees-produit/sources.md:104 « Non vérifié » entry: unknown section "**Obligation de désigner un délégué à la protection des données (art. 37)**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/13-ordonner-backlog/sources.md:63 « Non vérifié » entry: unknown section "**Que MoSCoW vienne du livre de Clegg et Barker (1994)**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/13-ordonner-backlog/sources.md:67 « Non vérifié » entry: unknown section "**La date d'adoption par DSDM** (« from 2002 »": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/13-ordonner-backlog/sources.md:67 « Non vérifié » entry: unknown section "Wikipédia)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/13-ordonner-backlog/sources.md:70 « Non vérifié » entry: unknown section "**Que Black Swan Farming soit le site de Joshua Arnold**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/13-ordonner-backlog/sources.md:74 « Non vérifié » entry: unknown section "**Le Scrum Guide de 2010**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/13-ordonner-backlog/sources.md:82 « Non vérifié » entry: unknown section "**Que « ce qui est prêt » pèse sur l'ordre**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/13-ordonner-backlog/sources.md:85 « Non vérifié » entry: unknown section "**Les quatre critères comme liste**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/14-parties-prenantes/sources.md:67 « Non vérifié » entry: unknown section "**Une équipe sans Scrum Master** (nuance de 14c)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/14-parties-prenantes/sources.md:69 « Non vérifié » entry: unknown section "**Les pièges « escalader d'emblée » et « attendre sans rien dire »**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/14-parties-prenantes/sources.md:71 « Non vérifié » entry: unknown section "**« Dire non": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/14-parties-prenantes/sources.md:71 « Non vérifié » entry: unknown section "c'est dire pas maintenant »**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/14-parties-prenantes/sources.md:73 « Non vérifié » entry: unknown section "**Oublier les fournisseurs de données est un piège fréquent**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/14-parties-prenantes/sources.md:76 « Non vérifié » entry: unknown section "**La grille pouvoir et intérêt**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/14-parties-prenantes/sources.md:81 « Non vérifié » entry: unknown section "**La définition de Freeman**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/14-parties-prenantes/sources.md:83 « Non vérifié » entry: unknown section "**Le PMBOK**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/14-parties-prenantes/sources.md:85 « Non vérifié » entry: unknown section "**Le PSPO** (domaine « Stakeholders & Customers »)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/14-parties-prenantes/sources.md:92 « Non vérifié » entry: unknown section "**L'usage de la grille pouvoir et intérêt**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/15-vie-story/sources.md:85 « Non vérifié » entry: unknown section "**Dates de [S4]": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/15-vie-story/sources.md:85 « Non vérifié » entry: unknown section "[S5] et [S6]**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/15-vie-story/sources.md:88 « Non vérifié » entry: unknown section "**Préciser un terme avec l'utilisateur concerné au refinement**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/15-vie-story/sources.md:93 « Non vérifié » entry: unknown section "**« Une story "définir X" n'apporte rien seule »**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/15-vie-story/sources.md:98 « Non vérifié » entry: unknown section "**États par défaut des autres outils que Jira** (Azure DevOps": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/15-vie-story/sources.md:98 « Non vérifié » entry: unknown section "etc.)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/15-vie-story/sources.md:101 « Non vérifié » entry: unknown section "**Termes français officiels** (« objectif de sprint »": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/15-vie-story/sources.md:101 « Non vérifié » entry: unknown section "« revue de sprint »)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:73 « Non vérifié » entry: unknown section "**Première tranche limitée à une activité (« première version": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:81 « Non vérifié » entry: unknown section "**« La carte complète le backlog": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:81 « Non vérifié » entry: unknown section "elle ne le remplace pas »**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:85 « Non vérifié » entry: unknown section "**Qui fait la prévision d'une version**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:92 « Non vérifié » entry: unknown section "**La prévision en fourchette**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:97 « Non vérifié » entry: unknown section "**L'auteur de l'article de Scrum.org sur « forecast »** [S10]": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:99 « Non vérifié » entry: unknown section "**L'inventeur des story points**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:101 « Non vérifié » entry: unknown section "**Frank Robinson (2001) et la popularisation par Blank et Ries**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:104 « Non vérifié » entry: unknown section "**Le livre *User Story Mapping*** [S4]": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:106 « Non vérifié » entry: unknown section "**« Date fixe": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:106 « Non vérifié » entry: unknown section "contenu variable »** (banque « Il me faut une date »)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:109 « Non vérifié » entry: unknown section "**Le livre *The Lean Startup*** (Ries": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/16-story-map/sources.md:109 « Non vérifié » entry: unknown section "2011)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:76 « Non vérifié » entry: unknown section "**Niveau fixé après l'exploration": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:76 « Non vérifié » entry: unknown section "pas avant**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:87 « Non vérifié » entry: unknown section "**La donnée dans la faisabilité**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:91 « Non vérifié » entry: unknown section "**Origine XP du spike**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:96 « Non vérifié » entry: unknown section "**Décider avant la question": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:96 « Non vérifié » entry: unknown section "la durée et ce qu'on décidera**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:99 « Non vérifié » entry: unknown section "**Le PO pose la question": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:99 « Non vérifié » entry: unknown section "les Developers explorent**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:101 « Non vérifié » entry: unknown section "**Découverte continue**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:104 « Non vérifié » entry: unknown section "**Origine du terme MVP**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:105 « Non vérifié » entry: unknown section "**Le livre *The Lean Startup* (Ries": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:105 « Non vérifié » entry: unknown section "2011)**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/17-hypotheses-exploration/sources.md:107 « Non vérifié » entry: unknown section "**Analyse d'historique comme technique d'exploration**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:69 « Non vérifié » entry: unknown section "**Retirer le niveau Epic par défaut de Jira**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:72 « Non vérifié » entry: unknown section "**Niveaux et réglages des espaces gérés par l'équipe dans Jira** (« team-managed »)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:74 « Non vérifié » entry: unknown section "**Types de liens par défaut de Jira Cloud**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:78 « Non vérifié » entry: unknown section "**Lien entre deux équipes dans Linear**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:80 « Non vérifié » entry: unknown section "**« Outil courant »** pour Linear": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:80 « Non vérifié » entry: unknown section "ou classement des outils par usage": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:83 « Non vérifié » entry: unknown section "**Lien « dépend de » des autres outils** (Trello": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:83 « Non vérifié » entry: unknown section "GitHub Projects": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:83 « Non vérifié » entry: unknown section "Monday…)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:84 « Non vérifié » entry: unknown section "**Statuts par défaut d'un espace Scrum ou Kanban de Jira**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:90 « Non vérifié » entry: unknown section "**Dates des pages Atlassian et Linear**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:93 « Non vérifié » entry: unknown section "**« Le lien ne remplace pas la conversation »**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:96 « Non vérifié » entry: unknown section "**Le PO propose": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:96 « Non vérifié » entry: unknown section "l'administrateur règle**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A1-outil-backlog/sources.md:98 « Non vérifié » entry: unknown section "**Le niveau de trop**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A2-sans-sprint/sources.md:78 « Non vérifié » entry: unknown section "**Première version du *Kanban Guide for Scrum Teams***": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A2-sans-sprint/sources.md:80 « Non vérifié » entry: unknown section "**Mot « limite » dans les versions 2020 du *Kanban Guide***": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A2-sans-sprint/sources.md:83 « Non vérifié » entry: unknown section "**Ce que mesure la revue de la livraison du service** (délais": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A2-sans-sprint/sources.md:83 « Non vérifié » entry: unknown section "attentes du client)": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A2-sans-sprint/sources.md:88 « Non vérifié » entry: unknown section "**Part des équipes data qui travaillent en flux**": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A2-sans-sprint/sources.md:91 « Non vérifié » entry: unknown section "**Dates des pages de Kanban University** [S4]": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
sources: fail: concepts/A2-sans-sprint/sources.md:91 « Non vérifié » entry: unknown section "[S5]": a sub-concept id or a fixed section (« L'essentiel », « Pièges », « Le test rapide », « Approfondissement ») that exists in concept.md, or « Consensus et choix d'école » for a stance or neighbour
```

## `sources`: link not one URL (39)

```
sources: fail: concepts/00-scrum/sources.md:63 reference S1: the link "https://scrumguides.org/scrum-guide.html ; https:/…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/02-objectif-produit-resultat/sources.md:70 reference S9: the link "https://www.romanpichler.com/blog/the-product-visi…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/02-objectif-produit-resultat/sources.md:72 reference S11: the link "https://books.google.com/books/about/Outcomes_Over…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/02-objectif-produit-resultat/sources.md:73 reference S12: the link "https://medium.com/the-pm-library/book-sips-9-outc…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/02-objectif-produit-resultat/sources.md:74 reference S13: the link "(aucun)" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/02-objectif-produit-resultat/sources.md:76 reference S16: the link "https://www.scrum.org/resources/evidence-based-man…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/03-backlog-produit/sources.md:52 reference S5: the link "https://innolution.com/essential-scrum/table-of-co…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/04-hierarchie/sources.md:52 reference S8: the link "(dépôt)" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/06-roles-personas/sources.md:50 reference S8: the link "https://www.rysen.com.au/user-experience/how-to-cr…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/07-invest/sources.md:57 reference S7: the link "(résultats de recherche)" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/08-criteres-regles/sources.md:61 reference S8: the link "https://www.manning.com/books/specification-by-exa…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/08-criteres-regles/sources.md:63 reference S10: the link "https://www.agilealliance.org/glossary/gwt/ ; http…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/08-criteres-regles/sources.md:64 reference S11: the link "`glossary.md`" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/08-criteres-regles/sources.md:65 reference S12: the link "(dépôt)" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/10-hors-perimetre-dependances/sources.md:45 reference S2: the link "https://www.atlassian.com/agile/product-management…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/10-hors-perimetre-dependances/sources.md:47 reference S4: the link "https://athena.ecs.csus.edu/~buckley/CSc191/User-S…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/10-hors-perimetre-dependances/sources.md:53 reference S10: the link "https://confluence.atlassian.com/spaces/ADMINJIRAS…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/11-dor-dod/sources.md:69 reference S8: the link "(dépôt)" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/11-dor-dod/sources.md:71 reference S10: the link "`glossary.md`" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/12-donnees-produit/sources.md:73 reference S6: the link "https://www.cnil.fr/fr/reglement-europeen-protecti…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/12-donnees-produit/sources.md:74 reference S7: the link "https://www.cnil.fr/fr/reglement-europeen-protecti…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/12-donnees-produit/sources.md:78 reference S11: the link "https://www.scrumalliance.org/media/certifications…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/13-ordonner-backlog/sources.md:46 reference S4: the link "https://scrumguides.org/docs/scrumguide/v1/Scrum-G…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/13-ordonner-backlog/sources.md:49 reference S7: the link "https://www.mountaingoatsoftware.com/agile/product…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/13-ordonner-backlog/sources.md:52 reference S10: the link "(dépôt)" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/13-ordonner-backlog/sources.md:53 reference S11: the link "http://lpd2.com/wp-content/uploads/2013/06/Reinert…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/13-ordonner-backlog/sources.md:54 reference S12: the link "https://blackswanfarming.com/cost-of-delay/ ; http…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/13-ordonner-backlog/sources.md:55 reference S13: the link "https://agile2013.sched.com/event/14o4ZPP ; https:…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/13-ordonner-backlog/sources.md:58 reference S18: the link "https://en.wikipedia.org/wiki/MoSCoW_method ; http…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/15-vie-story/sources.md:78 reference S7: the link "https://support.atlassian.com/jira-cloud-administr…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/15-vie-story/sources.md:80 reference S9: the link "(dépôt)" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/15-vie-story/sources.md:81 reference S10: the link "(dépôt)" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/16-story-map/sources.md:59 reference S2: the link "https://jpattonassociates.com/the-new-backlog/ (lu…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/16-story-map/sources.md:67 reference S10: the link "https://www.scrum.org/resources/commitment-vs-fore…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/A1-outil-backlog/sources.md:58 reference S6: the link "https://confluence.atlassian.com/spaces/ADMINJIRAS…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/A1-outil-backlog/sources.md:60 reference S8: the link "https://support.atlassian.com/jira-cloud-administr…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/A1-outil-backlog/sources.md:62 reference S10: the link "https://learn.microsoft.com/en-us/azure/devops/boa…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/A1-outil-backlog/sources.md:64 reference S12: the link "https://linear.app/docs/issue-relations ; https://…" must be one URL (http or https) or empty; a second place is a second reference
sources: fail: concepts/A2-sans-sprint/sources.md:64 reference S6: the link "https://getnave.com/blog/kanban-meetings ; https:/…" must be one URL (http or https) or empty; a second place is a second reference
```

## `sources`: reference cited by nothing (30)

```
sources: fail: concepts/00-scrum/sources.md:64 reference S2 is cited by no claim and no frontmatter item
sources: fail: concepts/02-objectif-produit-resultat/sources.md:68 reference S7 is cited by no claim and no frontmatter item
sources: fail: concepts/02-objectif-produit-resultat/sources.md:79 reference S19 is cited by no claim and no frontmatter item
sources: fail: concepts/04-hierarchie/sources.md:51 reference S7 is cited by no claim and no frontmatter item
sources: fail: concepts/04-hierarchie/sources.md:52 reference S8 is cited by no claim and no frontmatter item
sources: fail: concepts/06-roles-personas/sources.md:46 reference S4 is cited by no claim and no frontmatter item
sources: fail: concepts/06-roles-personas/sources.md:50 reference S8 is cited by no claim and no frontmatter item
sources: fail: concepts/07-invest/sources.md:57 reference S7 is cited by no claim and no frontmatter item
sources: fail: concepts/08-criteres-regles/sources.md:64 reference S11 is cited by no claim and no frontmatter item
sources: fail: concepts/08-criteres-regles/sources.md:65 reference S12 is cited by no claim and no frontmatter item
sources: fail: concepts/09-decoupage-vertical/sources.md:66 reference S5b is cited by no claim and no frontmatter item
sources: fail: concepts/09-decoupage-vertical/sources.md:68 reference S7 is cited by no claim and no frontmatter item
sources: fail: concepts/09-decoupage-vertical/sources.md:70 reference S9 is cited by no claim and no frontmatter item
sources: fail: concepts/10-hors-perimetre-dependances/sources.md:49 reference S6 is cited by no claim and no frontmatter item
sources: fail: concepts/11-dor-dod/sources.md:69 reference S8 is cited by no claim and no frontmatter item
sources: fail: concepts/11-dor-dod/sources.md:71 reference S10 is cited by no claim and no frontmatter item
sources: fail: concepts/12-donnees-produit/sources.md:77 reference S10 is cited by no claim and no frontmatter item
sources: fail: concepts/12-donnees-produit/sources.md:79 reference S12 is cited by no claim and no frontmatter item
sources: fail: concepts/13-ordonner-backlog/sources.md:45 reference S3 is cited by no claim and no frontmatter item
sources: fail: concepts/13-ordonner-backlog/sources.md:47 reference S5 is cited by no claim and no frontmatter item
sources: fail: concepts/13-ordonner-backlog/sources.md:49 reference S7 is cited by no claim and no frontmatter item
sources: fail: concepts/13-ordonner-backlog/sources.md:50 reference S8 is cited by no claim and no frontmatter item
sources: fail: concepts/13-ordonner-backlog/sources.md:52 reference S10 is cited by no claim and no frontmatter item
sources: fail: concepts/15-vie-story/sources.md:80 reference S9 is cited by no claim and no frontmatter item
sources: fail: concepts/15-vie-story/sources.md:81 reference S10 is cited by no claim and no frontmatter item
sources: fail: concepts/16-story-map/sources.md:61 reference S4 is cited by no claim and no frontmatter item
sources: fail: concepts/16-story-map/sources.md:65 reference S8 is cited by no claim and no frontmatter item
sources: fail: concepts/A1-outil-backlog/sources.md:57 reference S5 is cited by no claim and no frontmatter item
sources: fail: concepts/A2-sans-sprint/sources.md:64 reference S6 is cited by no claim and no frontmatter item
sources: fail: concepts/A2-sans-sprint/sources.md:66 reference S8 is cited by no claim and no frontmatter item
```

## `concept-folder`: « Affirmations » not in five columns (20)

```
concept-folder: fail: concepts/00-scrum/sources.md:9 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/01-produit-et-po/sources.md:2 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/02-objectif-produit-resultat/sources.md:10 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/03-backlog-produit/sources.md:12 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/04-hierarchie/sources.md:11 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/05-user-story/sources.md:10 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/06-roles-personas/sources.md:11 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/07-invest/sources.md:11 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/08-criteres-regles/sources.md:14 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/09-decoupage-vertical/sources.md:14 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/10-hors-perimetre-dependances/sources.md:10 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/11-dor-dod/sources.md:15 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/12-donnees-produit/sources.md:14 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/13-ordonner-backlog/sources.md:7 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/14-parties-prenantes/sources.md:12 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/15-vie-story/sources.md:15 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/16-story-map/sources.md:13 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/17-hypotheses-exploration/sources.md:14 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/A1-outil-backlog/sources.md:12 « Affirmations » table has 4 columns, expected 5
concept-folder: fail: concepts/A2-sans-sprint/sources.md:23 « Affirmations » table has 4 columns, expected 5
```

## `sources`: introduction (19)

```
sources: fail: concepts/00-scrum/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/02-objectif-produit-resultat/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/03-backlog-produit/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/04-hierarchie/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/05-user-story/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/06-roles-personas/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/07-invest/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/08-criteres-regles/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/09-decoupage-vertical/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/10-hors-perimetre-dependances/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/11-dor-dod/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/12-donnees-produit/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/13-ordonner-backlog/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/14-parties-prenantes/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/15-vie-story/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/16-story-map/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/17-hypotheses-exploration/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/A1-outil-backlog/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
sources: fail: concepts/A2-sans-sprint/sources.md:1 sources.md has no introduction: it opens on « Affirmations »
```

## `sources`: « Non vérifié » entry with no section (18)

```
sources: fail: concepts/00-scrum/sources.md:68 « Non vérifié » entry "- Les termes français de la traduction officielle …" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/01-produit-et-po/sources.md:33 « Non vérifié » entry "- **Le Lean Canvas de Maurya (2010)**, qui part au…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/01-produit-et-po/sources.md:43 « Non vérifié » entry "- **« Le PO fixe l'exigence, les Developers en don…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/01-produit-et-po/sources.md:50 « Non vérifié » entry "- **Le PO obtient les faits du métier des utilisat…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/04-hierarchie/sources.md:60 « Non vérifié » entry "- Le sens « capacité qui sert seule » de la featur…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/04-hierarchie/sources.md:62 « Non vérifié » entry "- Les noms de niveaux de Jira Server ou Data Cente…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/04-hierarchie/sources.md:69 « Non vérifié » entry "- Les trois tests du cours (compter les « je veux …" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/07-invest/sources.md:69 « Non vérifié » entry "- **Mot flou dont dépendent plusieurs lettres** et…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/11-dor-dod/sources.md:80 « Non vérifié » entry "- **« En data, la DoD contient souvent des tests d…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/13-ordonner-backlog/sources.md:77 « Non vérifié » entry "- **Qu'un risque de sécurité puisse passer devant …" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/14-parties-prenantes/sources.md:62 « Non vérifié » entry "- **L'ordre des démarches** (d'abord la personne c…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/14-parties-prenantes/sources.md:86 « Non vérifié » entry "- **Quand passer à la démarche suivante** (la déma…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/14-parties-prenantes/sources.md:90 « Non vérifié » entry "- **Dire ce qui ferait monter la demande, et revoi…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/15-vie-story/sources.md:95 « Non vérifié » entry "- **Fréquence des pièges** (refinement en réunion …" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/A2-sans-sprint/sources.md:69 « Non vérifié » entry "- **Fréquences des cadences** (réapprovisionnement…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/A2-sans-sprint/sources.md:72 « Non vérifié » entry "- **Qui participe au réapprovisionnement** (le PO,…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/A2-sans-sprint/sources.md:75 « Non vérifié » entry "- **Liste des pratiques de la méthode Kanban** (vi…" does not open with its section: a list item "<sections> : <what and why>"
sources: fail: concepts/A2-sans-sprint/sources.md:86 « Non vérifié » entry "- **Prévision du nombre d'éléments livrés à une da…" does not open with its section: a list item "<sections> : <what and why>"
```
