# Labels of the old site (issue #18)

Inventory of every visible label of the frozen site `parcours-po-website` (`src/layouts`, `src/components`, `src/pages`, with `src/i18n/ui.ts`, `src/data/domaines.ts` and `src/lib` where they hold a label), and where each goes. A label is the text of a control, a heading, a tab, an `aria-label` or `title`, a note or an empty state; the running prose of a page and the course's own text are not labels (last section). The apostrophes are straight in the pack: the site's typography pass (`typo-fr.ts`) curls them, as it did on the old site.

## In the pack: `site.*` of `specs/linear-course/lang/fr.yaml`

| Pack key | French value | Old site file |
|---|---|---|
| `site.skip_link` | Aller au contenu | layouts/Base.astro |
| `site.nav.main` | Navigation principale | layouts/Base.astro |
| `site.nav.menu` | Menu | layouts/Base.astro |
| `site.nav.domains` | Domaines | layouts/Base.astro |
| `site.nav.storyline` | Fil rouge | layouts/Base.astro |
| `site.nav.glossary` | Glossaire | layouts/Base.astro |
| `site.nav.stances` | Consensus ou école | layouts/Base.astro |
| `site.nav.sources` | Sources | layouts/Base.astro |
| `site.nav.about` | À propos | layouts/Base.astro |
| `site.nav.search` | Recherche | layouts/Base.astro |
| `site.theme.label` | Thème sombre | layouts/Base.astro |
| `site.theme.to_light` | Passer au thème clair | layouts/Base.astro |
| `site.theme.to_dark` | Passer au thème sombre | layouts/Base.astro |
| `site.footer.accompanies` | Ce site accompagne un cours donné par un agent IA | layouts/Base.astro |
| `site.footer.site` | site | layouts/Base.astro |
| `site.footer.course` | cours | layouts/Base.astro |
| `site.badges.consensus` | consensus | components/Pastille.astro |
| `site.badges.school` | choix d'école | components/Pastille.astro |
| `site.badges.course` | choix du cours | components/Pastille.astro |
| `site.duration.with_agent` | avec l'agent | components/{Bulle,Parcours}.astro, data/domaines.ts, pages/domaines/[n].astro |
| `site.duration.path` | Le parcours | components/{Bulle,Parcours}.astro, data/domaines.ts, pages/domaines/[n].astro |
| `site.duration.note` | Durée indicative de conversation avec l'agent, sans les apartés. | components/{Bulle,Parcours}.astro, data/domaines.ts, pages/domaines/[n].astro |
| `site.duration.hours` | {h} h | components/{Bulle,Parcours}.astro, data/domaines.ts, pages/domaines/[n].astro |
| `site.duration.hours_minutes` | {h} h {mm} | components/{Bulle,Parcours}.astro, data/domaines.ts, pages/domaines/[n].astro |
| `site.duration.minutes` | {m} min | components/{Bulle,Parcours}.astro, data/domaines.ts, pages/domaines/[n].astro |
| `site.duration.domain_segment` | Domaine {n} : {title}, {duration} | components/{Bulle,Parcours}.astro, data/domaines.ts, pages/domaines/[n].astro |
| `site.duration.sessions_one` | une session | components/{Bulle,Parcours}.astro, data/domaines.ts, pages/domaines/[n].astro |
| `site.duration.sessions_two` | environ deux sessions | components/{Bulle,Parcours}.astro, data/domaines.ts, pages/domaines/[n].astro |
| `site.duration.sessions_many` | environ {n} sessions | components/{Bulle,Parcours}.astro, data/domaines.ts, pages/domaines/[n].astro |
| `site.concept.label` | Concept | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.annex` | Annexe | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.count_one` | 1 concept | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.count_many` | {n} concepts | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.prerequisites` | Prérequis | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.none` | aucun | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.soon` | bientôt | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.previous` | Précédent | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.next` | Suivant | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.sections` | Sections du concept | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.adjacent_pages` | Pages voisines | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.adjacent_pages_shortcut` | Pages voisines, raccourci | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.read` | Lire le concept {n} : {title} | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.open_sources` | Ouvrir l'onglet Sources du {kind} {n} | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.section_link` | Lien vers la section {title} | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.ref_concept` | concept {n} | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.ref_annex` | annexe {n} | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.ref_sub` | concept {n}, {id} | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.see_in` | Voir dans | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.see_in_concept` | voir dans le concept | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.concept.see_in_annex` | voir dans l'annexe | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.tabs.understand` | Comprendre | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.tabs.stances` | Consensus ou école | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.tabs.sources` | Sources | components/{ConceptsDepliables,Renvoi,Position,Sous,Voisins}.astro, pages/concepts/[num].astro |
| `site.blocks.storyline` | Sur le fil rouge | components/{FilRouge,Reflexe,Erreurs}.astro |
| `site.blocks.reflex` | Le réflexe | components/{FilRouge,Reflexe,Erreurs}.astro |
| `site.blocks.pitfalls` | Les erreurs classiques | components/{FilRouge,Reflexe,Erreurs}.astro |
| `site.stances_tab.consensus_intro` | Ce que disent les textes de référence et ce que les praticiens font en général. | components/Ecoles.astro |
| `site.stances_tab.school_intro` | Des positions défendables, chacune à son auteur : on les pose côte à côte, on ne les fond pas. | components/Ecoles.astro |
| `site.stances_tab.course_intro` | Ce que ce cours décide, sans source externe : à prendre comme tel. | components/Ecoles.astro |
| `site.stances_tab.neighbors` | Notion voisine, à ne pas confondre | components/Ecoles.astro |
| `site.sources_tab.claims` | Affirmations et ce qui a été vérifié | components/Sources.astro |
| `site.sources_tab.claims_note` | Pour chaque affirmation de la page : la source qui la porte et ce que la lecture de cette source a permis de vérifier. Quand une phrase est une formulation du cours, elle est signalée comme telle. | components/Sources.astro |
| `site.sources_tab.references` | Références | components/Sources.astro |
| `site.sources_tab.consulted` | {type} · consultée le {date} | components/Sources.astro |
| `site.sources_tab.unverified` | Non vérifié | components/Sources.astro |
| `site.sources_tab.unverified_note` | Ce que les sources consultées ne permettent pas d'établir. La page n'affirme rien de plus sur ces points. | components/Sources.astro |
| `site.toc.expand_all` | Tout déplier | components/Sommaire.astro |
| `site.toc.collapse_all` | Tout replier | components/Sommaire.astro |
| `site.toc.in_page` | Dans cette page | components/Sommaire.astro |
| `site.home.start` | Par où commencer | pages/index.astro, pages/404.astro |
| `site.home.start_button` | Commencer : domaine {n} | pages/index.astro, pages/404.astro |
| `site.home.domains_button` | Voir les {count} domaines | pages/index.astro, pages/404.astro |
| `site.home.storyline_button` | Voir le fil rouge | pages/index.astro, pages/404.astro |
| `site.home.glossary_button` | Ouvrir le glossaire | pages/index.astro, pages/404.astro |
| `site.home.how_to_read` | Comment lire une page | pages/index.astro, pages/404.astro |
| `site.not_found.title` | Page introuvable | pages/index.astro, pages/404.astro |
| `site.not_found.text` | Cette page n'existe pas. | pages/index.astro, pages/404.astro |
| `site.not_found.button` | Voir les domaines | pages/index.astro, pages/404.astro |
| `site.domains_page.eyebrow` | La carte du cours | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.heading` | Domaines | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.toc_label` | Domaines | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.domain` | Domaine {n} | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.group` | Domaine {n} · {title} | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.you_will_know` | À la fin, vous savez : | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.all_domains` | tous les domaines | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.concept_range_one` | concept {n} | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.concept_range_many` | concepts {from} à {to} | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.concepts_one` | Le concept du domaine | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.concepts_many` | Les concepts du domaine | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.annexes` | Annexes | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.outside` | Hors domaines | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.domains_page.anchor_link` | Lien vers : {title} | pages/domaines/index.astro, pages/domaines/[n].astro |
| `site.stances_page.eyebrow` | Index transversal | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.heading` | Consensus ou école | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.toc_label` | Natures des positions | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.consensus` | Consensus | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.school` | Choix d'école | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.course` | Choix du cours | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.legend_school` | Une position défendable, portée par un auteur ou une école, à côté d'autres : le lecteur voit qui la défend. | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.legend_course` | Un choix que le cours fait lui-même, sans source externe qui l'impose. | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.section_title` | {title} ({n}) | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.intro_consensus` | Groupées par texte de référence ou par pratique. | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.intro_school` | Rangées par auteur ou par école, posées côte à côte. | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.intro_course` | Groupées par concept, dans l'ordre du cours. | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.section_count` | {n} positions, {intro} | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.count_one` | {n} position | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.count_many` | {n} positions | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.concept_group` | Concept {n} · {title} | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.no_single_author` | Positions sans auteur unique | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.no_author` | Sans mention | pages/ecoles.astro, components/Position.astro |
| `site.stances_page.read_more` | Lire la suite | pages/ecoles.astro, components/Position.astro |
| `site.glossary_page.eyebrow` | Les mots du cours | pages/glossaire.astro |
| `site.glossary_page.heading` | Glossaire | pages/glossaire.astro |
| `site.glossary_page.toc_label` | Lettres du glossaire | pages/glossaire.astro |
| `site.glossary_page.filter` | Filtrer le glossaire | pages/glossaire.astro |
| `site.glossary_page.search_term` | Chercher un terme | pages/glossaire.astro |
| `site.glossary_page.concept` | Concept | pages/glossaire.astro |
| `site.glossary_page.all_concepts` | Tous les concepts | pages/glossaire.astro |
| `site.glossary_page.in_english` | En anglais : | pages/glossaire.astro |
| `site.glossary_page.concept_one` | Concept | pages/glossaire.astro |
| `site.glossary_page.concept_many` | Concepts | pages/glossaire.astro |
| `site.glossary_page.empty` | Aucun terme ne correspond. Essayez un mot plus court, ou choisissez « Tous les concepts ». | pages/glossaire.astro |
| `site.glossary_page.status_none` | Aucun terme | pages/glossaire.astro |
| `site.glossary_page.status_one` | {n} terme sur {total} | pages/glossaire.astro |
| `site.glossary_page.status_many` | {n} termes sur {total} | pages/glossaire.astro |
| `site.glossary_page.avoid_note` | Des mots courants qui brouillent une notion. Le cours leur préfère un terme plus précis. | pages/glossaire.astro |
| `site.glossary_page.avoid_tag` | À éviter | pages/glossaire.astro |
| `site.glossary_page.say_instead` | Dire plutôt | pages/glossaire.astro |
| `site.glossary_page.why` | Pourquoi | pages/glossaire.astro |
| `site.sources_page.eyebrow` | Index transversal | pages/sources.astro |
| `site.sources_page.heading` | Sources | pages/sources.astro |
| `site.sources_page.lead` | {n} documents consultés, cités {total} fois. Quelques-uns portent le cours ; les autres appuient un concept précis. | pages/sources.astro |
| `site.sources_page.toc_label` | Dans cette page | pages/sources.astro |
| `site.sources_page.foundation` | Sur quoi repose le cours | pages/sources.astro |
| `site.sources_page.foundation_note` | Les sources citées par au moins {n} concepts. | pages/sources.astro |
| `site.sources_page.how_to_read` | Lire une source | pages/sources.astro |
| `site.sources_page.how_to_read_note` | Sous chaque référence, son type dit ce qu'elle vaut. | pages/sources.astro |
| `site.sources_page.primary` | Le texte de l'auteur ou de l'organisme. | pages/sources.astro |
| `site.sources_page.secondary` | Une reprise par un tiers sérieux. | pages/sources.astro |
| `site.sources_page.marketing` | La source vend aussi ce dont elle parle (outil, formation, certification). Elle est fiable pour décrire son offre ; ce qu'elle recommande est à prendre avec recul. | pages/sources.astro |
| `site.sources_page.type_note` | Une précision suit parfois le type (« primaire pour ce que fait l'outil ; marketing pour ce qu'il recommande »). Les faits du fil rouge sont inventés : ils n'ont pas de source. | pages/sources.astro |
| `site.sources_page.by_concept` | Concept par concept | pages/sources.astro |
| `site.sources_page.by_concept_note` | Déployez un concept pour voir ses références et ce qu'elles ne permettent pas d'établir. | pages/sources.astro |
| `site.sources_page.filter` | Filtrer les sources | pages/sources.astro |
| `site.sources_page.filter_placeholder` | Auteur, titre, adresse ou « concept 9 » | pages/sources.astro |
| `site.sources_page.filter_none` | Aucune source ne correspond à ce filtre. | pages/sources.astro |
| `site.sources_page.cited_by` | {n} concepts | pages/sources.astro |
| `site.sources_page.count_one` | {n} référence | pages/sources.astro |
| `site.sources_page.count_many` | {n} références | pages/sources.astro |
| `site.sources_page.sources_count` | {n} sources | pages/sources.astro |
| `site.sources_page.unverified_count` | {n} non vérifiés | pages/sources.astro |
| `site.search.label` | Rechercher dans le cours | pages/recherche.astro |
| `site.search.title` | Recherche | pages/recherche.astro |
| `site.search.heading` | Rechercher dans le cours | pages/recherche.astro |
| `site.search.needs_js` | La recherche demande JavaScript. | pages/recherche.astro |
| `site.search.unavailable` | La recherche est construite avec le site : elle est disponible après `npm run build`, puis `npm run preview`. | pages/recherche.astro |

156 labels.

## In the pack, outside `site`

Labels the old site shows that the pack holds in a group the protocol or the spec already names. The first six are counted; the last three are the same string as a `site` key (or not a label), so not counted again.

| Pack key | Label | Old site file | Counted |
|---|---|---|---|
| `headings.avoid` | « Termes à éviter » (glossary page heading and table of contents entry) | pages/glossaire.astro | 1 |
| `source_types.primary`, `.secondary`, `.marketing` | « primaire », « secondaire », « marketing » (legend of the sources page) | pages/sources.astro | 3 |
| `phrases.domain_title` | « Domaine {n} : {title} » (page titles, previous / next cards, domain links) | lib/lecture.ts, pages/domaines/[n].astro | 1 |
| `phrases.concept_title` | « Concept {n} : {title} » (concept page title) | pages/concepts/[num].astro | 1 |
| `site.stances_tab.consensus_intro` | the consensus entry of the stances page legend reuses it: same string, no key of its own | pages/ecoles.astro:69 | 0 |
| `headings.unverified` | « Non vérifié »: same as `site.sources_tab.unverified` | components/Sources.astro | 0 |
| `headings.references` | « Références »: same as `site.sources_tab.references` | components/Sources.astro | 0 |
| `headings.stances` | not a label of the old site: the tab is `site.tabs.stances` | SPEC.md 4.3 | 0 |

6 labels.

## Not in the pack: the course's own text (32 labels)

These are visible on the old site but belong to the course (its identity, its storyline, its sources) or to pages the new site does not carry. They come from `course.yaml` and the course files, not from the language.

| Label | Where | Goes to |
|---|---|---|
| « Product Owner d’un produit data » (site name, home title) | `i18n/ui.ts`, `pages/index.astro` | `course.yaml` `title` |
| « Un cours de gestion de produit, en clair et sourcé » (tagline) | `i18n/ui.ts` | `course.yaml` |
| « © Sébastien Vey, CC BY 4.0 » (footer licence) | `i18n/ui.ts` | `course.yaml` (author, licence) |
| « Un cours de gestion de produit » (home eyebrow) | `pages/index.astro` | `course.yaml` |
| Storyline page (19): eyebrow « Le cas des exemples »; title « Fil rouge : un opérateur de vélos en libre-service »; sections « L’opérateur », « La collectivité », « Le produit et l’équipe », « Les acteurs », « Les sources de données »; « Objectif produit »; « Ce que la plateforme ne fait pas »; « Rôle »; « Besoin principal »; « Central aux concepts : »; region label « Sources de données »; columns « Source », « Contenu », « Propriétaire », « Fraîcheur, défauts connus »; « Non précisée »; intro « Ce que la plateforme peut lire, à qui cela appartient, et ce qu’on sait de sa fraîcheur. » | `pages/fil-rouge.astro` | `storyline.md` |
| « Valeur, backlog, sprint… » (glossary search placeholder) | `pages/glossaire.astro` | `glossary.md` |
| « Le Scrum Guide 2020 », « Pratique établie, hors du Scrum Guide » (group names of the stances index) | `pages/ecoles.astro`, `lib/transversal.ts` | the course's stances |
| About page headings (4): « Un cours donné par un agent », « Comment ce site est fait », « Versions », « Licence » | `pages/a-propos.astro` | not carried: the page is the old site's documentation |
| « Page déplacée », « Cette page est devenue Domaines. » | `components/Redirection.astro` | not carried: redirect pages of old addresses |

Total: 162 labels in the pack (156 in `site`, 6 outside) + 32 of the course or not carried = **194 labels**.

## Left out on purpose

- Running prose of pages (the home page's lead and the four "doors" descriptions, the "Comment lire une page" paragraphs, the About page, the lead of the domains, glossary and stances pages, the page meta descriptions): page text, not labels.
- The two `noindex` developer pages `pages/dev/{composants,sommaire-compact}.astro`.
- Decorative glyphs (`←`, `→`, `≈`, `×`, `#`), all `aria-hidden`, and the licence address: not language. The site draws its arrows as icons; the pack bans them in course text only.
- The data files (`data/domaines.ts`, `data/fil-rouge.ts`, `data/glossaire.ts`): the course's own text.
