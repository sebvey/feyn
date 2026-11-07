# The repository glossary

The repository glossary holds the reserved terms of feyn, one entry per concept. It is there for:

- one concept, one term, and one term, one concept: a reserved term means one thing in the repository's files (code, docs, skills, issues, decisions, specs), and its concept takes no other word;
- a shared definition: the maintainer, a contributor and an agent give a term the same meaning;
- the boundaries between neighbouring concepts: what a term is not, and which entry holds that;
- the correspondence between the repository's English and the French of a spec;
- a regular form that a program can read.

Why this form: decision `glossary-by-concept`; why a word choice is an entry and not a decision: decision `word-choices-in-the-glossary`.

## Reading an entry

An entry is a heading, the term, then fixed keys in this order, each on its own line:

- `means`: the definition, in English.
- `en`: the preferred English term, then, after ` · rejected: `, its rejected English terms.
- `fr`: the preferred French term, then, after ` · rejected: `, its rejected French terms; `to settle` when no French text of a spec writes the concept yet.
- `not to confuse with`: links to the entries of neighbouring concepts.
- `why`: why this term for the concept, when the choice was discussed or a confusion seen: the terms ruled out and what each would have confused.

The why of a word choice is in its entry's `why`, never in a decision (decision `word-choices-in-the-glossary`).

A key with nothing to say is left out, `means`, `en` and `fr` excepted. A rejected term is a word banned for that concept only: never use it where the concept applies. A word may be preferred for one concept and rejected for another; both entries then say so (« schéma »). A neighbouring concept is always a `not to confuse with` link; its term is also a rejected term only when it is a wrong name for this concept (**rule** rejects "requirement" and links [requirement](#requirement)). A term in bold in a meaning has its own entry.

## Which designation applies where

- `en` in the repository's English files: code, docs, skills, issues, decisions, and the English texts of a spec.
- `fr` in a French text of a spec, which speaks the language of its courses (decision `language-policy`): `course/README.md`, `course/rules.yaml`, `course/lexicon.yaml`, `teacher/README.md`, `teacher/rules.yaml` of `course-specs/linear-course/1/`. A heading or a value of a lexicon quoted in « » is a word of the course files, not the spec's word for a concept: « Non publié », the heading of a course changelog, names that section, not the property **unpublished**.
- A course glossary in its course. Each course has its own [course glossary](#course-glossary), which belongs to the course, follows the course's language and applies in that course's files. A word may be reserved in both with two meanings (**epic**); a repository text that speaks of the course's meaning says so ("epic, in the course's sense"). French course files keep their French section headings and field labels (« L'essentiel », « Matière », « Se vérifier »…); the English terms here are how we talk about them in code, docs and issues.

## Adding or changing an entry

A PR adds or changes the entry and, in the same PR, replaces the rejected words in use for that concept. The text that first writes a concept in French fills its `fr` in the same PR. An entry cites no rule id, of a rule or of a group (decision `decision-format`), and names no course. A meaning cites nothing: no decision, no document (decision `word-choices-in-the-glossary`). It names a file, a folder, a key, a command or a skill only when the concept is that thing, never to say where the concept is implemented, stored, read or written (decision `glossary-by-concept`). `/feyn-glossary-entry` reads, adds and changes an entry.

## The things we build

### feyn

- means: the monorepo and the project
- en: feyn · rejected: "the platform", "the system"
- fr: to settle

### spec

- means: the contract of a *type of course*: the shape of its courses (structure, drawing contract, checks) and the generic way to teach every course of the type, its **protocol**; versioned, one folder per MAJOR. Neither "spec" nor "specification" names anything else (an issue, a design)
- en: spec
- fr: « spec »
- not to confuse with: [spec directives](#spec-directives), [protocol](#protocol)

### spec directives

- means: what says how a spec is written and read: the rule model, levels, methods, severity, conformance clause, versions, their normative references, and the tests of a spec's files; one folder per MAJOR, versioned like a spec; a spec MAJOR declares the one it follows
- en: spec directives · rejected: "frame" (the frame of the work is Kanban), "framework", "metamodel"
- fr: « directives de spec »
- not to confuse with: [spec](#spec)

### course

- means: what one course teaches and how to teach it, in its course files and its concept files, whose **published** fields say what it teaches and whose **unpublished** fields how to teach it, identified by its **course id**
- en: course · rejected: "content" (as a noun for the course), "material", "data"
- fr: « cours »
- not to confuse with: [course id](#course-id), [sample course](#sample-course)

### course id

- means: the slug that identifies a course: the name of its folder and the first part of the tags of its course versions
- en: course id
- fr: to settle
- not to confuse with: [course](#course), [course version](#course-version)

### sample course

- means: a course that belongs to a spec MAJOR and changes only with it, written for that spec: its tests, the classroom build and the site build run on it, and a human may play it
- en: sample course · rejected: "example course"
- fr: to settle
- not to confuse with: [course](#course), [example](#example)
- why: "example" names the illustration that precedes a question in a teacher message, so "example course" would read as a course of such illustrations; "bench course" was ruled out too, the bench being a policy of the repository, not a part of the spec

### build

- means: (noun and verb) producing an output from a course: the **site build** and the **classroom build**. Builds have no version of their own
- en: build · rejected: "render" for a build, "generate", "export", "compile", "publish"
- fr: « build » (noun), « construire » (verb)
- not to confuse with: [release](#release), [site build](#site-build), [classroom build](#classroom-build)

### site build

- means: the build of the site from a course and its spec MAJOR, in two halves: the spec MAJOR's half reads the course where it is written and gives its published parts, and the repository's site builder renders them as the pages served on a channel
- en: site build
- fr: to settle
- not to confuse with: [build](#build), [classroom build](#classroom-build), [release](#release)

### classroom build

- means: the build of a classroom from a course and its spec MAJOR, made in two halves: the spec MAJOR renders the parts of the **composition** as text, and the repository's classroom builder realises them in Claude Code. Rendering the parts as text is a step of the classroom build, not a build
- en: classroom build
- fr: « build de la classe »
- not to confuse with: [build](#build), [site build](#site-build), [classroom](#classroom), [composition](#composition)

### site

- means: the published website and its engine
- en: site · rejected: "website", "web", "pages"
- fr: « site »
- not to confuse with: [site build](#site-build)

### teacher

- means: the generic Claude Code agent that teaches, with the **teacher skills** of its moments, built from the **teacher template**, the protocol and the lexicons of its spec, as the **composition** of its spec says
- en: teacher · rejected: "prof", "tutor", "coach", "agent" alone
- fr: « professeur » · rejected: « prof »
- not to confuse with: [classroom](#classroom), [composition](#composition), [protocol](#protocol), [teacher skill](#teacher-skill), [teacher template](#teacher-template), [moment](#moment)

### classroom

- means: the folder built outside the repo, by the **classroom build**, where the teacher runs: the teacher and its permissions, a copy of the course, its **course.lock**, learner memory, its own git; what it gives the teacher, part by part, is the **composition**
- en: classroom · rejected: "workspace", "instance", "environment"
- fr: « classe » (in the rules of a diagram, « classe » is an SVG class, `primary`, `secondary`, `muted`, not this concept)
- not to confuse with: [composition](#composition), [channel](#channel), [classroom build](#classroom-build), [course.lock](#courselock)

### learner

- means: the person being taught; **learner memory** is what the teacher keeps of them
- en: learner · rejected: "student", "user"
- fr: « apprenant »
- not to confuse with: [maintainer](#maintainer), [learner memory](#learner-memory)

### learner memory

- means: what the teacher keeps of a learner from one teaching session to the next: who they are, the **concept status** of each concept, what it observed of them; shaped by the **learner templates**, written and committed at each **save point**
- en: learner memory
- fr: « mémoire de l'apprenant »
- not to confuse with: [learner](#learner), [concept status](#concept-status), [save point](#save-point), [learner template](#learner-template)

### maintainer

- means: Seb: owns decisions, releases, freezes
- en: maintainer · rejected: "owner", "admin"
- fr: « mainteneur »
- not to confuse with: [contributor](#contributor)

### contributor

- means: anyone who delivers an issue by PR (course files or code)
- en: contributor · rejected: "author", "developer"
- fr: to settle
- not to confuse with: [maintainer](#maintainer)

## Inside a course

### domain

- means: an ordered group of concepts with its own page and presentation, described by its **domain file**. Course vocabulary only: never a part of the repo
- en: domain
- fr: « domaine »
- not to confuse with: [area](#area), [domain file](#domain-file)

### domain file

- means: the file `domains/<n>-<slug>.md` of a course, the entry of a domain: the problem the domain solves and a situation of the **storyline** that crosses it; the thread of its concepts is composed from the course map, not written
- en: domain file
- fr: « fichier de domaine » · rejected: « fiche »
- not to confuse with: [domain](#domain), [concept folder](#concept-folder), [progression](#progression), [concept file](#concept-file)

### progression

- means: the part of a course's plan that says the domains in course order, what each gives and how one leads to the next, once for the whole course
- en: progression · rejected: "roadmap"
- fr: « progression »
- not to confuse with: [course path](#course-path), [domain file](#domain-file), [category](#category)
- why: "roadmap" names a plan of future work, not the order a course is taught in; the word is rejected for the category pedagogy (see [category](#category))

### concept

- means: a numbered unit of the course (`0`, `1`…, `A1`, `A2`…), whose files are in its **concept folder**
- en: concept · rejected: "fiche", "lesson" (the first block of a unit), "chapter", "page"
- fr: « concept » · rejected: « fiche »
- not to confuse with: [section](#section), [unit](#unit), [numbered concept](#numbered-concept), [annex](#annex), [concept folder](#concept-folder), [lesson](#lesson)

### concept folder

- means: the folder of a concept in its course, holding its **concept file**, `sources.md` and its diagrams
- en: concept folder
- fr: « dossier de concept » · rejected: « fiche »
- not to confuse with: [concept](#concept), [concept file](#concept-file), [domain file](#domain-file)

### concept file

- means: `concept.md`, the one file in which a concept is written: its title, the one the course map gives the concept, then its **sections** and their **units**, between a head and a foot (**head and foot**), every heading opened by the kind of its block, one kind per heading level; the site renders its **published** parts, the teacher reads it whole
- en: concept file · rejected: "teaching notes", "reader text" (two files of the form before it)
- fr: « fichier de concept »
- not to confuse with: [concept folder](#concept-folder), [domain file](#domain-file)

### numbered concept

- means: a concept whose number is an integer (`0`, `1`…): it belongs to exactly one domain, and the numbered concepts come first in course order
- en: numbered concept · rejected: "regular concept", "main concept"
- fr: « concept numéroté »
- not to confuse with: [annex](#annex)

### annex

- means: a concept numbered `A1`, `A2`…: it belongs to no domain and comes after the numbered concepts; its concept file has the same form, cut into units
- en: annex · rejected: "appendix", "bonus concept"
- fr: « annexe »
- not to confuse with: [numbered concept](#numbered-concept)

### unit

- means: the teaching unit, the unit of a course's content: one teacher message, one leaf of a concept's tree (`0a1`), written once as three blocks in the order of writing, each titled by its word alone: its **lesson** (its **matter**, what is true, then its **misconceptions**), its **cases** (« Cas du fil rouge »: the unit's case, then its supplementary cases, each under its own heading), its **instruction**. A unit always has its own heading, under its **section**
- en: unit · rejected: "leaf sub-concept", "sub-concept", "leaf", "lesson" (its first block)
- fr: « unité » · rejected: « sous-concept feuille », « sous-concept », « feuille »
- not to confuse with: [section](#section), [concept](#concept), [case](#case), [head and foot](#head-and-foot), [lesson](#lesson)
- why: the leaf was the partition every file already followed without naming it, one teacher message each; "sub-concept" named a node of a tree whatever its level, and "leaf" only its place in that tree, not what it is for

### section

- means: of a concept, a group of **units** under one heading (`0a`), its id the concept number and a letter; it holds one unit at least, and is never itself a unit, even when it holds a single one. A section of a document (a heading and its text, « section 3 » of a README) keeps its everyday sense
- en: section · rejected: "sub-concept", "first-level sub-concept", "node"
- fr: « section » · rejected: « sous-concept »
- not to confuse with: [unit](#unit), [head and foot](#head-and-foot), [concept](#concept)
- why: two levels of ids, the section and its units, cut a concept once the leaf is a message; "sub-concept" named both levels

### head and foot

- means: the parts of a **concept file** around its sections, each under its own heading: the head, « L'essentiel », the one written summary of the concept, its text and no block, **published**; the foot, « Clôture », holds its landmarks (« Se vérifier »), its deepening (« Approfondissement ») and its instruction (« Consigne au professeur »), each optional, the last **unpublished**
- en: head and foot · rejected: "fixed sections"
- fr: « tête » et « pied » · rejected: « sections fixes »
- not to confuse with: [section](#section), [unit](#unit)

### objective

- means: what the learner can do after the concept, in one sentence. One term for « Objectif » and « À la fin, l'apprenant sait »
- en: objective · rejected: "goal", "outcome", "aim"
- fr: « objectif »

### prerequisites

- means: of a concept, the earlier concepts the learner must have validated before it, given by their numbers in the course map; an annex may have any numbered concept as one.
- en: prerequisites · rejected: "requirements" (a **requirement** is a level of a rule), "dependencies"
- fr: « prérequis »
- not to confuse with: [requirement](#requirement), [concept reference](#concept-reference)

### matter

- means: the field of a unit's **lesson** that says what is true, in the same words for the site reader and the teacher: the explanation the unit teaches; **published**
- en: matter · rejected: "reader text", "explanation", "body", "content", "copy"
- fr: « matière » · rejected: « texte lecteur », « explication »
- not to confuse with: [anchor](#anchor), [instruction](#instruction), [landmark](#landmark), [misconception](#misconception)
- why: the reader text and a case's explanation were two writings of the same matter, one for the site, one for the teacher; one word for the one text

### anchor

- means: the field of a **case** that places the matter in the storyline: a situation, its actors, its facts and who says what, without the answer; **published**
- en: anchor · rejected: "example", "situation", "storyline callout"
- fr: « ancrage » · rejected: « exemple », « situation », « fil rouge » (the callout)
- not to confuse with: [example](#example), [matter](#matter), [storyline](#storyline), [fixed fact](#fixed-fact)
- why: an anchor does not only illustrate, it anchors the point in the world of the course; "example" names the illustration of a teacher message

### lesson

- means: the first block of a **unit**, « Leçon »: its **matter**, labelled, in two fields, in this order: « Matière », what is true, then « Idées fausses », its **misconceptions**, what seems true and is not; **published**. What the unit teaches, written first, before its cases
- en: lesson
- fr: « leçon »
- not to confuse with: [unit](#unit), [concept](#concept), [case](#case), [misconception](#misconception)
- why: "lesson" is rejected for the unit and for the concept, which it would have named whole; it names the block that teaches, beside the cases that ask

### misconception

- means: what seems true about the matter of a unit and is not: a belief a learner who has read the **matter** could still hold, quoted, with its name, unique in its unit, its **root** and its correction, which rests on the matter; never the mere negation of a sentence of the matter, never stated on a case's situation. A unit's misconceptions are the second field of its **lesson**, « Idées fausses », after its matter, each written once, **published**. A case writes none: it names, by their names, those of its unit it makes tempting, and each misconception of a unit is named by one of its cases at least
- en: misconception · rejected: "common mistake", "pitfall", "frequent error", "wrong answer"
- fr: « idée fausse » · rejected: « erreur fréquente », « mauvaise réponse », « piège »
- not to confuse with: [matter](#matter), [root](#root), [follow-up](#follow-up), [case](#case)
- why: the pitfalls of a concept (« Pièges ») were its common mistakes written a second time; one word for what is written once. « Pièges » then named the block of a unit that held its misconceptions after its cases, written as wrong answers on a case's situation, free to only negate the matter; once the misconceptions are matter, the block goes with its word, and "wrong answer" (« mauvaise réponse ») names an answer, not the belief behind it

### root

- means: the part of a **misconception** that says why it seems true: an everyday experience, a misleading word, a neighbouring truth stretched too far; labelled « Racine », before the correction
- en: root
- fr: « racine »
- not to confuse with: [misconception](#misconception), [matter](#matter)

### landmark

- means: what the learner keeps of a whole concept to check an answer: the question to ask oneself, what serves to recognise or apply the concept; the block « Se vérifier » of the foot of the concept file, **published**. A unit has none
- en: landmark · rejected: "quick test", "lever", "cue"
- fr: « se vérifier » (the block) · rejected: « repères », « test rapide », « levier »
- not to confuse with: [matter](#matter)
- why: the quick test was one landmark among others, written three times; "lever" and "cue" name a teacher's means, not what the learner keeps; « Repères » hid that the block holds a question the learner asks themself, and named a field of a unit that no unit used

### instruction

- means: the boundary of the **matter**, for the teacher alone: what the teacher knows and does not say in this unit, or in this concept for the foot's; a sentence stays only if a competent teacher reading the matter, the cases, the misconceptions, the protocol and the course plan would otherwise act differently, and only there: what holds for every unit is a **protocol rule**, what holds for the whole course a stance of the course plan, the obvious goes; the last block of a unit, « Consigne au professeur », in prose, and a block of the foot of the concept file under the same heading, **unpublished**; a question the course asks again and again goes there; the order and the split of a concept are its sections and units, never an instruction
- en: instruction · rejected: "instructions", "teaching notes", "usage", "what works"
- fr: « consigne » · rejected: « consignes », « usage », « ce qui marche »
- not to confuse with: [protocol rule](#protocol-rule), [matter](#matter)

### published

- means: of a block or a part of a concept file, rendered by the site build: the **lesson** (its matter and its **misconceptions**, which the site shows after the cases), the **cases** (each with its anchor, its question and its expected answer, shown hidden until the reader reveals it), « L'essentiel », the landmarks, the deepening, the title and the headings of the sections and units, the **stances**, the **neighbors** and the **diagrams**; beside it, the claims and the references of its **sources**; a property the spec fixes for the block, never chosen by a course, and no heading says it. The build renders the published parts and nothing else
- en: published · rejected: "reader-facing", "public" (it describes the repository)
- fr: « publié » · rejected: « côté lecteur »
- not to confuse with: [unpublished](#unpublished)
- why: visibility was a property of a file, reader-facing or teacher-only; with one file per concept it is a property of a part of the file, which the form of the spec holds; a block of a unit no longer says its reader in its heading, a mark the site reader has no use for

### unpublished

- means: of a block or a part of a concept file, never rendered by the site, read by the teacher: the **instruction**, of a unit and of the foot; no heading says it
- en: unpublished · rejected: "teacher-only", "private" (it describes the repository)
- fr: « non publié » · rejected: « professeur seul »
- not to confuse with: [published](#published)
- why: see **published**; « Non publié », the heading of a course changelog, names that section, not this property

### case

- means: the questioning part of a unit, posed to the learner: under its own heading, its title, its id, unique in the concept, which learner memory cites; then its **anchor**, its question, its expected answer and, by their names, the **misconceptions** of its unit its situation makes tempting, one at least. The cases of a unit are its block « Cas du fil rouge »: the first, the unit's case, always posed; each other a supplementary case, the unit's stock, in which the teacher picks a case after a wrong answer (one that names the misconception the answer shows) or for practice (one not yet posed), self-contained (its own anchor and its own question). Every case is **published**; it writes no misconception, it names its unit's
- en: case · rejected: "exercise" (the former block of a unit that held its question), "example", "scenario", "example bank" (the set of cases of the form before units), "fallback case", "practice case", "aside case", "qualifier" (of a case)
- fr: « cas » · rejected: « exercice », « exemple », « banque d'exemples », « cas de rechange », « cas d'entraînement », « aparté » (for a case), « qualificatif » (of a case)
- not to confuse with: [example](#example), [unit](#unit), [lesson](#lesson), [misconception](#misconception), [test scenario](#test-scenario)
- why: « Exercice » named the block of a unit that held its question, apart from its anchor and from its supplementary cases, held in stock under headings of their own; once the anchor moved into it and the supplementary cases joined it, the block is the unit's list of cases, and "exercise" (« exercice ») one more word for a case, merged here. A supplementary case then carried a qualifier, « rechange », « entraînement » or « aparté », which gave it a kind ("fallback case", "practice case", "aside case") and said when to pose it; once a case names the misconceptions it makes tempting, the teacher picks a supplementary case by them, the qualifier goes with its three kinds, and a question often asked outside the course path has its matter in a unit of an annex: the four words name nothing of the form. Two exceptions to replacing a rejected word in use, until the teacher is thawed: « exercice », a word the learner says, in `learner_says` of the frozen teacher's lexicon; « rechange », « entraînement » and « aparté », which the frozen teacher's rules still cite, through `frozen_form` of its lexicon and its README; "qualifier" also names, in its everyday sense, the parenthesis of a term cell of a course glossary (« qualificatif de sens »)

### example

- means: in a teacher message, the illustration that precedes the question (« Exemple : »); the anchor of a unit may serve as one
- en: example
- fr: « exemple »
- not to confuse with: [anchor](#anchor), [case](#case), [sample course](#sample-course)

### follow-up

- means: the targeted re-question the teacher asks after a partial or wrong answer, on the **misconception** it answers; the teacher's own, no longer written in a concept file
- en: follow-up · rejected: "retry", "hint", "probe"
- fr: « relance »
- not to confuse with: [misconception](#misconception)

### storyline

- means: the running world the anchors and the cases live in: `storyline.md` of a course, in two parts, its **world** and its **fixed facts**, holding nothing no unit uses
- en: storyline · rejected: "red thread", "thread", "fil rouge", "narrative"
- fr: « fil rouge »
- not to confuse with: [course path](#course-path), [anchor](#anchor), [world](#world), [fixed fact](#fixed-fact)

### world

- means: the first part of the **storyline**: the setting, the actors and the sources that the anchors and the cases draw on, in free prose
- en: world · rejected: "universe"
- fr: « monde »
- not to confuse with: [storyline](#storyline), [fixed fact](#fixed-fact)

### fixed fact

- means: a fact of the **storyline** that a **unit** established, written once in the storyline's second part with the id of that unit, so that later anchors and cases hold to it
- en: fixed fact
- fr: « fait fixé »
- not to confuse with: [world](#world), [anchor](#anchor), [storyline](#storyline), [additions](#additions)

### additions

- means: of a **unit**, what writing it adds outside its **concept file**: a fact its **anchor** uses, among the **fixed facts** of the **storyline**; a term it puts in bold, in the **course glossary**; a claim of one of its **published** fields, in the **sources** of its concept, once they are written
- en: additions
- fr: « ajouts »
- not to confuse with: [fixed fact](#fixed-fact), [course glossary](#course-glossary), [sources](#sources)

### stances

- means: the standing of each claim of a concept: consensus (an established reference or practice), school (short for school of thought: a named author's or current's choice), course (this course's own choice). A stance is also any stated position of a course (« une équipe en sprints »)
- en: stances · rejected: "schools", "opinions", "positions", "status"
- fr: « positions » (« consensus », « choix d'école », « choix du cours »)
- not to confuse with: [neighbors](#neighbors), [concept status](#concept-status)

### neighbors

- means: the neighbouring notions not to confuse with the concept, declared apart from its stances
- en: neighbors · rejected: "related", "see also"
- fr: « voisins », « notions voisines »
- not to confuse with: [stances](#stances)

### sources

- means: the file `sources.md` of a concept, which traces its **published** fields that state claims, not the cases of its units: its claims (each with its section, its source, whether it was verified, and its nature: consensus, school, course, or fact, what a source states with no stance), its references, and what stays unverified. A stance or a neighbour is sourced where it is declared: its references, each with the quotation and its place
- en: sources · rejected: "bibliography", "citations"
- fr: « sources » (« affirmations », « références », « fait »)
- not to confuse with: [concept reference](#concept-reference), [additions](#additions)

### diagram

- means: an SVG of a concept under the **drawing contract**, with its **caption**
- en: diagram · rejected: "schema" (a JSON Schema), "figure", "image", "illustration"
- fr: « schéma » · rejected: « diagramme », « figure », « illustration », « croquis », « graphique »
- not to confuse with: [schema](#schema), [drawing contract](#drawing-contract), [caption](#caption), [logo](#logo)
- why: « schéma » is the courses' own word for a drawing; « diagramme » is a calque that evokes a notation or data and no course uses it; « figure », « illustration », « croquis » and « graphique » name another thing (a numbered figure, a decoration, a sketch, a chart of data); the data sense of « schéma » takes « schéma JSON » so the two never meet

### caption

- means: the text that says what a diagram shows, one idea; the diagram shows what its caption says
- en: caption
- fr: « légende »
- not to confuse with: [diagram](#diagram)

### schema

- means: a JSON Schema of a spec, a file `*.schema.yaml`, which says the fields a file holds
- en: schema
- fr: « schéma JSON » · rejected: « schéma » alone
- not to confuse with: [diagram](#diagram)
- why: « schéma » alone is the diagram, the courses' word; the JSON Schema always takes « schéma JSON », so a French text never leaves the reader to guess which one is meant

### drawing contract

- means: the SVG rules of the spec a diagram follows (viewBox, currentColor, three classes, `<text>`, named groups); the rules of a diagram's style are not part of it
- en: drawing contract · rejected: "style guide"
- fr: « contrat de dessin »
- not to confuse with: [diagram](#diagram)

### deepening

- means: the optional « Approfondissement » part of the foot of the concept file: more matter on the concept, sourced like the matter of its units, **published**, read by the teacher in an aside on the learner's request; no unit nor case relies on it
- en: deepening · rejected: "dig", "reserve"
- fr: « approfondissement »
- not to confuse with: [case](#case)

### concept reference

- means: in the text of a course, the words that name a concept, a section, a unit or an annex: « concept 4 », « concepts 5 et 7b », « annexe A2 »
- en: concept reference · rejected: "reference" alone
- fr: « renvoi » (and nothing else: a pointer to a group or a file is a « lien »)
- not to confuse with: [sources](#sources) (its references), [prerequisites](#prerequisites)

### course glossary

- means: the glossary of a course, `glossary.md` of the course, course material: its terms, each with its defining concept
- en: course glossary
- fr: « glossaire du cours »
- not to confuse with: [repository glossary](#repository-glossary), [additions](#additions)

### defining concept

- means: the concept of a course glossary row (its fourth column): the concept a learner opens to dig into the term, the one whose matter teaches it; never a concept that only uses the term or defines it in passing
- en: defining concept · rejected: "introducing concept", "first concept"
- fr: « concept de définition »

### logo

- means: the drawing that stands for a course on its site, `logo.svg` at the root of the course: square, one colour in `currentColor`, which the site paints in the course's **accent colour**; the site's header shows it, and its favicon and share image are drawn from it
- en: logo · rejected: "mark", "icon"
- fr: « logo »
- not to confuse with: [accent colour](#accent-colour), [diagram](#diagram)
- why: "icon" names the small drawings of the site's buttons, which stand for an action, not for a course; "mark" says less than "logo" and reads as a sign put on a text

### accent colour

- means: the one colour a course gives its site, a `#rrggbb`: the site keeps its hue, derives with its own lightness the accent of each theme, and paints the course's **logo** in it
- en: accent colour · rejected: "brand colour", "theme colour"
- fr: « couleur d'accent »
- not to confuse with: [logo](#logo)
- why: "brand colour" speaks of a brand, which a course is not; "theme colour" is the browser's bar colour (`theme-color`), another thing; the key is spelt `color`, as CSS spells it, and the prose says "colour"

## How the teacher works

### protocol

- means: the pedagogical protocol: the testable teaching rules of a spec, each named by a slug, set in families and **groups**. A rule of it is a **protocol rule**
- en: protocol · rejected: "the loop", "pedagogy", "rules", "behaviour"
- fr: « protocole »
- not to confuse with: [teacher](#teacher), [rule](#rule), [composition](#composition), [protocol rule](#protocol-rule), [group](#group)

### protocol rule

- means: a rule of the protocol: it binds the teacher and belongs to a family and a group
- en: protocol rule
- fr: « règle du protocole »
- not to confuse with: [rule](#rule), [protocol](#protocol), [instruction](#instruction)

### group

- means: a set of rules of a rule file, named by a slug, with its purpose: the unit a rule file is cut into, a section of the prose pointing to its group. Always of rules: the group of a lexicon is a lexicon group, not this concept
- en: group
- fr: « groupe »
- not to confuse with: [rule](#rule), [protocol](#protocol), [category](#category)

### lexicon

- means: a file of the words of a spec, written once and read by key: `course/lexicon.yaml`, the words a program recognises in a course file (headings, the kind words of the headings, the words of the blocks and the labels of the fields of a unit, markers, natures, concept references, source types, typography, the word lists of the checks), read by the checks, the classroom build and the site; `teacher/lexicon.yaml`, the words the teacher says and writes; `site/lexicon.yaml`, the words and short texts the site shows for every course of the spec and no course file holds. Not a translation file: the language is the spec's
- en: lexicon · rejected: "language pack", "i18n", "locale", "strings"
- fr: « lexique »

### teaching session

- means: always qualified: one conversation between the teacher and a learner; it opens with a **resume** for an existing learner, an **onboarding** for a new one
- en: teaching session · rejected: "session" alone, "course session"
- fr: « session » · rejected: « séance »
- not to confuse with: [work session](#work-session), [resume](#resume), [onboarding](#onboarding)

### resume

- means: the first message of a teaching session with an existing learner, read from learner memory; not Claude Code's `/resume`
- en: resume
- fr: « reprise »
- not to confuse with: [onboarding](#onboarding), [teaching session](#teaching-session), [teacher skill](#teacher-skill)

### onboarding

- means: the start of a teaching session with a new learner: its first message and the onboarding questions, before anything is written in learner memory
- en: onboarding
- fr: « accueil »
- not to confuse with: [resume](#resume), [teaching session](#teaching-session)

### course path

- means: the course as the teacher leads the learner through it, concept after concept in course order; the teacher proposes to come back to it after an aside
- en: course path · rejected: "main line", "track"
- fr: « parcours » (« dans le parcours », « hors du parcours », « revenir au parcours ») · rejected: « fil » alone
- not to confuse with: [storyline](#storyline), [progression](#progression)
- why: « fil » sat next to « fil rouge » (the storyline) and « Le fil des concepts » (then a section of a domain file), sometimes in one rule of the protocol, three « fil » a reader or a model could mix; « parcours » is the word the courses and learner memory already use; « progression » is kept for the [progression](#progression), a section of a course's plan

### concept status

- means: where a learner stands on a concept, in learner memory: validated, in progress, skipped, to review; a concept absent from the table is to do
- en: concept status · rejected: "state", "level"
- fr: « statut »
- not to confuse with: [Status](#status), the `status` key of a decision's frontmatter, [level](#level), [learner memory](#learner-memory)

### save point

- means: a moment where the teacher writes and commits learner memory
- en: save point · rejected: "checkpoint", "sync"
- fr: « point de sauvegarde »
- not to confuse with: [learner memory](#learner-memory)

### composition

- means: what a teacher is made of, beside how it behaves: five parts, each defined by when it loads and what it draws from the spec, the course, learner memory and the classroom; described by the spec with no Claude Code term: its realisation is the classroom build's
- en: composition · rejected: "architecture", "the instructions"
- fr: « composition »
- not to confuse with: [protocol](#protocol), [classroom build](#classroom-build), [teacher skill](#teacher-skill), [teacher template](#teacher-template), [moment](#moment)

### mini-recap

- means: the five-line recap every 3 or 4 validated concepts
- en: mini-recap · rejected: "summary"
- fr: « mini-récap »

### course.lock

- means: the classroom's record, the file `course.lock`: course id, ref, course sha, tooling sha, channel, site URL, date
- en: course.lock · rejected: "manifest"
- fr: to settle
- not to confuse with: [classroom](#classroom)

## Rules and checks

The **spec directives** (`spec-directives/1/README.md`) and, for the categories and the checks of a spec, the `README.md` of its MAJOR (decisions `rules-with-level-and-method`, `levels-from-iso-directives`, `severity-from-level-and-method` and `conformity-by-product`).

### rule

- means: the unit of a spec, which binds a product (a course or a teacher): one provision held as data in a rule file, apart from the prose that describes it, with an id (a slug), a **level**, a **category**, a **method**, the check that implements the method when one exists, a text and, where an observed counterfactual exists, a why; a rule of the protocol is a **protocol rule**. A rule file is cut into **groups**. The spec's own files are verified by the tests of the spec directives, which are not rules
- en: rule · rejected: "requirement" for a rule of any level, "constraint", "criterion"
- fr: « règle »
- not to confuse with: [requirement](#requirement), [check](#check), [policy](#policy), [protocol rule](#protocol-rule), [group](#group), [agentic rule](#agentic-rule)

### level

- means: how binding a rule is: **requirement**, **recommendation** or **permission** (ISO/IEC Directives Part 2, clause 7); a field of the rule, never a word parsed from its text: the verb of a rule of the spec matches it, and the field is authoritative
- en: level · rejected: "priority", "severity"
- fr: « niveau » (the level of a heading is not this concept)
- not to confuse with: [severity](#severity), [concept status](#concept-status)

### requirement

- means: a rule of the level requirement: "shall", "shall not" (« doit », « ne doit pas »); in the protocol, the imperative. A product conforms when it holds every requirement of its class; a requirement verified by test has a **blocking check**
- en: requirement · rejected: "must" (ISO keeps it for external constraints)
- fr: to settle
- not to confuse with: [rule](#rule), [blocking check](#blocking-check), [prerequisites](#prerequisites)

### recommendation

- means: a rule of the level recommendation: "should", "should not" (« il convient de », « il convient de ne pas »); outside conformance; its check reports, whatever its method
- en: recommendation · rejected: "guideline", "soft rule", "best practice"
- fr: to settle

### permission

- means: a rule of the level permission: "may", never in the negative (« peut »): an element that may be absent, or an act the teacher may do. Possibility and capability ("can", « peut ») are not a level
- en: permission · rejected: "can" for a permission
- fr: to settle

### method

- means: how one knows a rule holds, from the closed list of ISO/IEC/IEEE 29148: test (a deterministic run: the scripts of the checks), analysis (reasoning over the whole course: taught-check), inspection (a reading by a human or an agent: the review), demonstration (the system runs and is observed: the fresh tests). A rule states its method even before its check exists
- en: method · rejected: "taught-check" for a method
- fr: « méthode »
- not to confuse with: [check](#check), [taught-check](#taught-check)

### category

- means: what a rule is about, from a closed list, extended when needed: for a course, structure, pedagogy, writing, sources or diagrams; for a protocol rule, its family (the nine families of the protocol). A check's category is its rules', and checks are selected by it. The tests of the spec directives have none
- en: category · rejected: "family" for a category of a course, "kind", "progression" for the category pedagogy
- fr: « catégorie »; of a protocol rule, its « famille »
- not to confuse with: [label](#label) (its kind), [group](#group), [progression](#progression)
- why: "progression" was ruled out as the name of the category pedagogy: the contract of a case is pedagogical without being an order; « progression » stays the word of a section of a course's plan (see [progression](#progression))

### severity

- means: what a check's failure does, derived from its rules, never declared: a check blocks when it verifies a requirement by test (a **blocking check**), and reports in every other case (a **reporting check**). The weight of a review finding in the agent workflows (blocking or minor) is not a check's severity
- en: severity · rejected: "warning", "soft check", "hard check"
- fr: « sévérité »
- not to confuse with: [level](#level), [blocking check](#blocking-check), [reporting check](#reporting-check)

### blocking check

- means: a check that verifies a requirement by test: its failure fails the run of the checks of a course (exit code 1)
- en: blocking check · rejected: "hard check"
- fr: to settle
- not to confuse with: [reporting check](#reporting-check), [severity](#severity)

### reporting check

- means: a check that is not a blocking check: its failure is printed, leaves the run of the checks passing (exit code 0), and its findings are triaged into course issues
- en: reporting check · rejected: "soft check", "warning"
- fr: to settle
- not to confuse with: [blocking check](#blocking-check), [severity](#severity)

### check

- means: a verification of a course against its spec, that implements the method of rules of one category and one level: the scripts run on a course (method test) and taught-check (method analysis). Its category and level are its rules', its severity follows from them. The spec's own files are verified by the tests of the spec directives it follows, which verify no rule, carry no category and no level, and each failure of which blocks
- en: check · rejected: "test" (a method, not the check), "lint", "validation"
- fr: « check »
- not to confuse with: [method](#method), [fresh test](#fresh-test), [rule](#rule), [blocking check](#blocking-check), [reporting check](#reporting-check), [baseline](#baseline)

### taught-check

- means: the check of a pedagogy recommendation by analysis, run by agents: the agent workflow that verifies no case asks what the learner has not yet been taught, run on demand; it reports
- en: taught-check
- fr: « taught-check »
- not to confuse with: [method](#method)

### conformity

- means: the conformance clause of the spec directives: a product, the course (its diagrams included) or the teacher, conforms when it holds every requirement of its class, whatever the method that verifies each one. The blocking checks are a necessary condition, not a sufficient one: the review and taught-check do the rest, and a course tag certifies the whole. The lexicons of a spec are not products
- en: conformity · rejected: "conforming" for a course that only passes the blocking checks, "compliance"
- fr: « conformité »
- why: "conformity" is ISO's word; the section that states it is the conformance clause, after the W3C QA Framework, whose idea ISO shares

## How we work

The frame of the work is Kanban, with ADR for the decisions and GitHub flow for the branches (decision `kanban-frame-of-the-work`): what the frame says is in `docs/kanban.md`, how feyn applies it in `docs/contributing.md`. Its words below are the frame's wherever the frame has a word; the others name feyn's own mechanisms, which the frame does not name.

### area

- means: the part of the repo an issue or PR belongs to, derived from the tree: `spec:<name>`, `spec-directives`, `course:<id>`, `teacher`, `site`, `agentic`, `repo`
- en: area · rejected: "domain", "component", "module", "scope"
- fr: to settle
- not to confuse with: [domain](#domain)

### issue

- means: the GitHub object; it has no form of its own: it carries a **work item**, of one of two kinds, an **epic** or a **story**, or an **idea**, which has no kind; what it carries gives its body template and its labels
- en: issue · rejected: "ticket", "task"
- fr: to settle
- not to confuse with: [work item](#work-item), [epic](#epic), [story](#story), [idea](#idea)

### work item

- means: what an issue carries when it is work to deliver: an **epic** or a **story**, its kind, with the body of its kind and a Done when; an idea is not one
- en: work item
- fr: to settle
- not to confuse with: [issue](#issue), [idea](#idea), [epic](#epic), [story](#story)

### epic

- means: a work item: an objective delivered in several stories, which closes on a verifiable Done when (common agile and GitHub vocabulary): an issue titled "Epic: …", in five sections (Objective, Why now, Material, Done when, Out of scope), parent of its stories, split one story at a time when taken; its plan is a **plan comment** on it. No Done when, no epic
- en: epic · rejected: "theme", "subject", "initiative", "stream", "phase"
- fr: to settle
- not to confuse with: [story](#story), [milestone](#milestone), [plan comment](#plan-comment), [work item](#work-item)
- why: a word of feyn's own beside the frame's, with a table of correspondence, would give one thing two names, and the outside reference would no longer open from the word; Kanban names no type of work item, so epic and story come from the most widespread source, common agile and GitHub vocabulary

### plan comment

- means: the comment on an epic that holds its plan, in three parts: its **plan comment head**; the plan (the stories envisaged, in order; what is unknown; what was dropped), rewritten at each change; the log, only added to, which gains each delivery and, as the epic is delivered, its open questions and their answers. Whoever takes the epic writes it and keeps it current
- en: plan comment
- fr: to settle
- not to confuse with: [epic](#epic), [open question](#open-question), [plan comment head](#plan-comment-head)

### plan comment head

- means: the first part of a **plan comment**, at most ten lines: where the epic stands, what runs, what awaits the maintainer, what comes next; rewritten whole at each moment of its epic. It is not the head of an issue body, the lines that open a body template (Where, What, Why), which has no entry
- en: plan comment head
- fr: to settle
- not to confuse with: [plan comment](#plan-comment), [awaiting footer](#awaiting-footer), [progress message](#progress-message)

### story

- means: a work item: a unit of work delivered in one PR, with a verifiable Done when (common agile and GitHub vocabulary; a story need not be written as a user story), with or without a parent epic; under an epic, a sub-issue whose PR targets the epic's integration branch; without one, its PR targets `main` and the maintainer merges it
- en: story · rejected: "slice", "task", "sub-task"
- fr: to settle
- not to confuse with: [epic](#epic), [idea](#idea), [work item](#work-item)
- why: as for epic, common agile and GitHub vocabulary, Kanban naming no type of work item; "slice", feyn's own word before it, gave the story a second name

### idea

- means: what enters the upstream: an issue holding a finding and no solution, in three sections (Where, Why, Observation), with no kind, only its area label, in the Status Idea; it is never converted: the triage creates from it the work items it calls for, then closes it. Its Observation is a section, not a kind
- en: idea · rejected: "observation" for the issue, "Backlog" for its Status, "suggestion"
- fr: to settle
- not to confuse with: [option](#option), [work item](#work-item)
- why: idea and option come from Steyaert's Upstream Kanban, the most widespread source for the stages before commitment, which Kanban does not name, so the outside reference opens from the word; "observation" as a kind, feyn's own word before it, gave the idea a second name

### option

- means: a work item, epic or story, defined but not committed: it has the body of its kind, Done when included, in the Status Option, and waits for the maintainer to commit it (set Ready) or close it, one option at a time, at an **option refinement**; until Ready its kind and body may change. A work item a triage creates is born Option unless the maintainer commits it at its creation; one a brainstorm creates is always born Option; a work item the maintainer asks for directly, a story or an epic, is born Option, or Ready on their word
- en: option · rejected: "proposal", "candidate"
- fr: to settle
- not to confuse with: [idea](#idea), [option refinement](#option-refinement)
- why: as for idea, Steyaert's Upstream Kanban; "proposal", feyn's own word before it, gave the option a second name, and its label was not kept as "historical": a dead label stays in the list at every issue creation, and someone ends up setting it

### label

- means: always qualified: type (`type:bug`, `type:course`, `type:improvement`, `type:decision`), set on a work item, never on an idea; **area** (`area:<area>`); kind (`kind:epic`, `kind:story`: exactly one on a work item, none on an idea); `blocked:maintainer` (a maintainer decision is awaited; on the issue only); and `stale` (an idea or an option posed before the frame of 2026-11-03, re-read at its triage or option refinement, which removes it). No state label: where an issue stands is its **Status**
- en: label
- fr: to settle
- not to confuse with: [Status](#status), [category](#category), [area](#area)

### Project

- means: the GitHub Project "feyn" (number 4) that holds every issue with its Status: what the maintainer looks at in the web interface, through its views, and what an agent lists
- en: Project · rejected: "board" for the Project itself, "dashboard"
- fr: to settle
- not to confuse with: [Project workflow](#project-workflow)

### Status

- means: the Project's field that says where an issue stands, in this order and nothing else: Idea (an idea, to triage), Option (a work item defined, not committed), Ready (committed, free to take: the **commitment point**), In progress (a branch exists), Ready for review (the work claims done, the maintainer reviews and concludes: a story without an epic whose PR is open after the fresh-agent review, or with the line `Fresh-agent review: none, direct delivery.`, which the maintainer merges; an epic whose epic PR is handed over, whose Done when the maintainer verifies before merging it; a story of an epic never has it), Done (closed; the close reason stays on GitHub). A decision awaited is the label `blocked:maintainer`, on any Status. It replaces the state labels. Written with a capital when it names the field; the lowercase `status` key of a decision's frontmatter is a different, allowed key; an issue's `state` is GitHub's open or closed
- en: Status · rejected: "state" for where the work stands
- fr: to settle
- not to confuse with: [concept status](#concept-status), [label](#label), [blocked](#blocked), [commitment point](#commitment-point)

### commitment point

- means: where an option is taken and becomes committed work: in feyn, the Status Ready, set by the maintainer, or given at creation to a story posed by the orchestrator of a taken epic; from it the work item's form freezes and its Done when becomes the contract
- en: commitment point
- fr: to settle
- not to confuse with: [Status](#status)

### WIP limit

- means: a limit on the work in progress, the items started and not finished, per Status or for the whole workflow: a new item is pulled only when one leaves
- en: WIP limit
- fr: to settle
- not to confuse with: [draft](#draft)

### moment

- means: one of the moments of the work cycle, from an idea noted to the issues a merge frees, numbered in the cycle's order; each has one owner, which holds its procedure (a skill and its step, a reference file, a body template, the agent workflow, or the maintainer), and every other file cites that owner. A path (an epic, a story alone, a direct delivery) chains moments. Not the moments of a teacher's **composition**, which its **teacher skills** carry
- en: moment · rejected: "step" (a numbered part of a skill or of a reference file, which a moment's owner may be), "phase"
- fr: to settle
- not to confuse with: [skill](#skill), [teacher](#teacher), [teacher skill](#teacher-skill), [composition](#composition)
- why: `feyn-brainstorm` called its own parts "moments" until they became steps, as in every other skill: a step is a part of one owner, a moment a part of the cycle

### triage

- means: reading the ideas that came in and deciding what each one calls for: the work items it calls for, each citing it, the idea then closed as completed; or nothing, the idea closed as not planned, with the reason. In feyn, run with the maintainer on the ideas they name, one at a time; an option is not triaged, it goes to an **option refinement**
- en: triage · rejected: "Backlog pass", "grooming"
- fr: to settle
- not to confuse with: [option refinement](#option-refinement), [brainstorm](#brainstorm)

### option refinement

- means: the analysis of one named option against the purpose of feyn (which product consumes it) and against the repository (what changed in the files it names since it was last updated, the work items and ideas that cover or overlap it), up to a decision on it alone: commit it (set Ready), rework it, open a brainstorm from it (what it builds on has changed), merge it, split it, fold it into an epic or close it; run with the maintainer, one option at a time. It never reviews all the options nor chooses among them
- en: option refinement · rejected: "replenishment", "grooming"
- fr: to settle
- not to confuse with: [replenishment](#replenishment), [triage](#triage), [option](#option), [brainstorm](#brainstorm)

### replenishment

- means: the Kanban review of all the options against the capacity of the downstream, choosing which enter Ready. Not practised in feyn, where a commitment is decided option by option, at an **option refinement**
- en: replenishment
- fr: to settle
- not to confuse with: [option refinement](#option-refinement)

### policy

- means: what the workflow asks, written down where everyone reads it: what an item must hold to enter or leave a Status, the WIP limits, what is done first, who decides what; feyn's are its contributing guide, its decisions and its skills
- en: policy · rejected: "rule", "convention"
- fr: to settle
- not to confuse with: [rule](#rule), [agentic rule](#agentic-rule)

### agentic rule

- means: how feyn writes a file of its agentic layer (its skills, project subagents, references, the prompts of its agent workflows, its project instructions), held as one entry of a file of such entries: an id, what it applies to, its method (judged by review, or run by a script), a text that states the act, a why and an origin; it binds what feyn writes to run its work, never a product
- en: agentic rule · rejected: "rule" alone (a rule of a spec), "policy"
- fr: to settle
- not to confuse with: [rule](#rule), [policy](#policy)
- why: the agentic layer is a tool of feyn, not feyn, and may one day leave the repository; the prefix namespaces the term until then, and is dropped that day. Ruled out: "rule" alone, reserved for a rule of a spec, so that two rule files of two meanings would coexist; "policy", what the workflow asks, broader than how the agentic layer is written and bound to the Kanban frame

### draft

- means: a PR that cannot be merged until it is marked ready: opened as one when a maintainer decision is awaited (the issue, not the PR, carries `blocked:maintainer`), and, in a delivery through agents, until its review and corrections are done (marked ready at the hand-over of a story without an epic, or at the merge of a story of an epic into its integration branch)
- en: draft · rejected: "WIP" for a draft PR
- fr: to settle
- not to confuse with: [WIP limit](#wip-limit), [hand-over](#hand-over)
- why: "draft" is the term for a PR, so it left the descriptions of a spec and of the spec directives, where it named a MAJOR in preparation, which is an alpha

### blocked

- means: two senses, never mixed. "Blocked by #n": a blocked-by link between issues, lifted when the blocking issue closes. `blocked:maintainer`: a maintainer decision is awaited, on the issue only, lifted when the maintainer removes the label
- en: blocked · rejected: "on hold", "Needs Decision" (a Status removed)
- fr: to settle
- not to confuse with: [Status](#status), [open question](#open-question), [stop message](#stop-message)

### work session

- means: always qualified: one Claude Code conversation on the feyn repository: a **brainstorm**, the delivery of a story without an epic or of an epic, a triage, an option refinement, a construction task (historical). A construction task left a session note, removed on 2026-10-31 and kept in the history
- en: work session · rejected: "session" alone
- fr: to settle
- not to confuse with: [teaching session](#teaching-session), [brainstorm](#brainstorm)

### brainstorm

- means: a work session with the maintainer on feyn (a spec, a product, the process), subject by subject, ending in a plan of work items posed as options; it opens from an option whose basis changed, an idea or the maintainer's subject
- en: brainstorm
- fr: to settle
- not to confuse with: [work session](#work-session), [triage](#triage), [option refinement](#option-refinement)

### integration branch

- means: the branch an epic is delivered on: cut from `main` by the epic's orchestrator when the epic is taken, named like an issue branch after the epic (`<type>/<epic>-<slug>`); each story of the epic is a PR to it, reviewed by a fresh agent and merged by the orchestrator; `main` is merged into it, never rebased; it reaches `main` only by its **epic PR**
- en: integration branch · rejected: "epic branch", "feature branch", "develop", "staging branch"
- fr: to settle
- not to confuse with: [channel](#channel), [epic PR](#epic-pr)

### epic PR

- means: the PR from an epic's integration branch to `main`, its body starting with `Closes #<epic>`: handed over to the maintainer once the last story is merged, the whole branch reviewed by a fresh agent and no open question left; the maintainer validates the whole epic by merging it (squash), which closes the epic
- en: epic PR · rejected: "integration PR", "final PR", "release PR"
- fr: to settle
- not to confuse with: [integration branch](#integration-branch), [release](#release), [hand-over](#hand-over)

### open question

- means: a choice of a story of an epic that departs from the epic's Done when or adds structure (a new file, a category, a marker, an exception to a principle), that nothing already settles (a decision, the epic's Material, a rule, an answer of the maintainer, a story of the plan) and that is costly to undo or foundational, put to the maintainer at once as a line of the plan comment's log and a comment on the epic; the work goes on, and the epic PR is handed over only when none remains
- en: open question · rejected: "pending decision", "escalation", "blocker"
- fr: to settle
- not to confuse with: [blocked](#blocked), [plan comment](#plan-comment), [awaiting footer](#awaiting-footer)

### progress message

- means: one of the four kinds of message a delivery writes to the maintainer in the work session, the others being the **stop message**, the **hand-over** and the question: it reports one event of the delivery or of its clean-up, under a heading naming the event, in at most three named bullets (done, running, for you); it describes no choice settled without the maintainer, only their count
- en: progress message · rejected: "status message", "status update", "information message"
- fr: to settle
- not to confuse with: [stop message](#stop-message), [hand-over](#hand-over), [plan comment head](#plan-comment-head)

### stop message

- means: one of the four kinds of message a delivery writes to the maintainer: the delivery or its clean-up stops on what it cannot settle, under a heading announcing the stop, in two named bullets (cause, for you)
- en: stop message · rejected: "error report", "alert"
- fr: to settle
- not to confuse with: [progress message](#progress-message), [blocked](#blocked)

### hand-over

- means: the moment a PR goes to the maintainer to merge (the PR marked ready, its issue Ready for review) and the message that tells them, one of the four kinds of message of a delivery; the PR of a story without an epic has a hand-over of its own fixed form, the epic PR is handed over by a **progress message**; a story of an epic is never handed over, its orchestrator merges it
- en: hand-over · rejected: "notification" for its message, "handoff"
- fr: to settle
- not to confuse with: [progress message](#progress-message), [epic PR](#epic-pr), [draft](#draft)

### awaiting footer

- means: the end of every message a delivery writes to the maintainer while a question to them is open: a rule, a fixed label, then one line per open question (its number, its title, the link to the comment that holds it); it does not ask the question again. It is not the section of a PR body that holds a decision awaited, nor the plan comment head, which says the same in the same words
- en: awaiting footer · rejected: "pending questions", "postscript"
- fr: to settle
- not to confuse with: [open question](#open-question), [plan comment head](#plan-comment-head), [progress message](#progress-message)

### direct delivery

- means: a story, alone or under an epic, of one edit with no behaviour, marked direct by the maintainer at its creation, its To do opening with the line "Direct delivery": the maintainer's work session delivers it without a contributor or a fresh-agent review, and its PR says so. A delivery policy, not a form. The direct path is another thing: a PR opened outside a delivery through agents, its fresh-agent review included
- en: direct delivery · rejected: "direct path"
- fr: to settle

### milestone

- means: a release target: named after the tag that closes it (`linear-course/v1.0.0`, `<id>/vX.Y.Z`), holding the stories that must close before the tag, created when a release is in sight; an epic may target one; tooling has none
- en: milestone · rejected: "sprint", "phase", "version" for the milestone itself
- fr: to settle
- not to confuse with: [stage](#stage), [release](#release), [epic](#epic)

### stage

- means: historical: one of the five milestones of the construction plan of 2026-10-27 (stage 0 to 4), abandoned on 2026-10-29 for epics; the word stays only in the construction files, kept in the history, and in old issues
- en: stage · rejected: "lot", "phase", "sprint", "iteration"
- fr: to settle
- not to confuse with: [milestone](#milestone), [channel](#channel)

### decision

- means: a recorded choice of a structure or a process, why it is so and what was ruled out: one file by slug in a `decisions/` folder, with its counterfactual. A choice of words is a glossary entry, not a decision. "ADR" names the frame's complement, the practice of recording decisions
- en: decision · rejected: "ADR" for one decision or in file names, "RFC", "design doc"
- fr: « décision »
- not to confuse with: [repository glossary](#repository-glossary)

### counterfactual

- means: the first line of a decision, `Without this, <who acts> would…`: the wrong act that whoever it binds (an agent, the common case, a contributor, the teacher, a workflow, the maintainer) would commit without it, and what that breaks
- en: counterfactual · rejected: "rationale", "motivation"
- fr: to settle

### fresh test

- means: a run of the teacher in a disposable classroom, following a **test scenario**, judged slug by slug: it builds the classroom, runs the teacher turn by turn, and judges the transcript by a script (the form rules) and a fresh agent with no tool (the others); the implementation of the method demonstration
- en: fresh test · rejected: "e2e", "smoke test", "simulation"
- fr: « fresh test »
- not to confuse with: [check](#check), [test scenario](#test-scenario)

### test scenario

- means: one YAML file of the teacher tests of a spec MAJOR: the learner memory a fresh test starts from, the learner's messages in order, the acts expected of the teacher and the slugs of the rules they exercise
- en: test scenario · rejected: "test case", "script", "fixture"
- fr: to settle
- not to confuse with: [case](#case), [fresh test](#fresh-test)

### review

- means: a reading of a change against the spec by an agent or a human
- en: review · rejected: "audit", "QA"
- fr: « revue »

### baseline

- means: the output of the command of a Done when statement, run on the base by whoever writes the statement and written under it with the commit it ran on: the reference the start, the contributor and the review judge the work's output by, each of its lines checked against the statement's intent
- en: baseline · rejected: "expected output" (the output before the work, not the one the work must reach), "snapshot"
- fr: to settle
- not to confuse with: [check](#check)
- why: "expected output" would read as the target of the work, which is the statement's intent; the baseline is only where the work starts from

### skill

- means: a Claude Code skill of the repository, folder and name prefixed `feyn-`, invoked as `/feyn-<name>` or loaded from its description: one named by a verb, that chains the **moments** of a path (`feyn-deliver-epic`, `feyn-deliver-story-alone`) or owns a moment run with the maintainer (`feyn-triage`, `feyn-brainstorm`, `feyn-refine-option`), or the **work-cycle tooling**; "tooling" alone is the build, site and teacher code. A **teacher skill** is a skill of a classroom, not of the repository
- en: skill · rejected: "command", "prompt", "recipe"
- fr: to settle
- not to confuse with: [agent workflow](#agent-workflow), [project subagent](#project-subagent), [work-cycle tooling](#work-cycle-tooling), [teacher skill](#teacher-skill), [moment](#moment)

### work-cycle tooling

- means: the skills called by the path skills or loaded directly for a one-off act, each named by what it produces or handles: those that own a **moment** of a path (`feyn-issue`, the idea noted; `feyn-issue-branch`, the start; `feyn-pull-request`, the PR; `feyn-pr-review`, the review; `feyn-merge-cleanup`, the freed issues) and the others (`feyn-decision`, a decision; `feyn-glossary-entry`, a glossary entry)
- en: work-cycle tooling · rejected: "tooling" alone (the build, site and teacher code)
- fr: to settle
- not to confuse with: [skill](#skill)

### teacher skill

- means: a skill of a classroom, one per moment of the **composition** that has rules, named `feyn-teacher-<moment>` (`feyn-teacher-onboarding`, `feyn-teacher-stop`), made by the classroom build; apart from Claude Code's own skills (`/resume`)
- en: teacher skill
- fr: to settle
- not to confuse with: [skill](#skill), [teacher](#teacher), [composition](#composition), [resume](#resume), [moment](#moment)

### agent workflow

- means: a Claude Code multi-agent script, named `feyn-<script>-workflow`, so that the skill listing tells it from a skill
- en: agent workflow
- fr: to settle
- not to confuse with: [CI workflow](#ci-workflow), [Project workflow](#project-workflow), [skill](#skill)

### project subagent

- means: a Claude Code custom subagent, named `feyn-<role>` (`feyn-pr-reviewer`, `feyn-pr-fixer`): a reused brief as its system prompt, its tools limited by its frontmatter, spawned by name
- en: project subagent · rejected: "persona", "bot"
- fr: to settle
- not to confuse with: [skill](#skill)

### CI workflow

- means: a GitHub Actions file
- en: CI workflow · rejected: "pipeline", "action"
- fr: to settle
- not to confuse with: [agent workflow](#agent-workflow), [Project workflow](#project-workflow)

### Project workflow

- means: a built-in automation of the Project ("Auto-add to project", "Auto-add sub-issues to project", "Item added to project", "Item closed"), turned on in the web interface
- en: Project workflow · rejected: "automation", "workflow" alone
- fr: to settle
- not to confuse with: [agent workflow](#agent-workflow), [CI workflow](#ci-workflow)

### template

- means: always qualified: a model file, a **course template**, a **learner template**, a **teacher template**, a GitHub issue form or a **body template**
- en: template, always qualified · rejected: "template" alone, "boilerplate", "scaffold"
- fr: « modèle »
- not to confuse with: [course template](#course-template), [learner template](#learner-template), [teacher template](#teacher-template), [body template](#body-template)

### course template

- means: a model file of a course file, which the creator of a course starts from; part of a spec MAJOR
- en: course template
- fr: to settle
- not to confuse with: [template](#template), [learner template](#learner-template)

### learner template

- means: a model file of learner memory, part of a spec MAJOR, in French for now
- en: learner template
- fr: « modèle de l'apprenant »
- not to confuse with: [template](#template), [learner memory](#learner-memory), [course template](#course-template)

### teacher template

- means: the model of the teacher's instructions, part of the Claude Code realisation of the **composition**, filled from the parts the spec MAJOR renders
- en: teacher template
- fr: « modèle d'instructions »
- not to confuse with: [template](#template), [teacher](#teacher), [composition](#composition)

### body template

- means: the body of an epic, a story, an idea, a decision or a PR, one per form, which the work-cycle tooling fills
- en: body template
- fr: to settle
- not to confuse with: [template](#template)

### channel

- means: where a build is served from: prod (a course tag), next (`main`), preview (a PR)
- en: channel · rejected: "environment", "stage", "env"
- fr: to settle
- not to confuse with: [stage](#stage), [integration branch](#integration-branch)

### release

- means: tagging a course version (`<id>/vX.Y.Z`) and deploying prod; "publish" means a release, never a build
- en: release · rejected: "deploy" alone, "ship"
- fr: « publier », « version publiée »
- not to confuse with: [build](#build), [milestone](#milestone)

### course version

- means: one of the three versioned objects, with the spec version and the **spec directives**, its tag `<id>/vX.Y.Z`; the site and the tooling have no version, only a commit sha
- en: course version · rejected: "site version"
- fr: « version du cours »
- not to confuse with: [spec version](#spec-version), [release](#release), [course id](#course-id)

### spec version

- means: one of the three versioned objects, with the course version and the **spec directives**, its tag `<name>/vX.Y.Z`; the teacher and the tooling have no version, only a commit sha
- en: spec version · rejected: "teacher version"
- fr: to settle
- not to confuse with: [course version](#course-version)

### repository glossary

- means: this file: the glossary of the repository's files, one entry per concept: what a word means and which word names a concept
- en: repository glossary
- fr: to settle
- not to confuse with: [course glossary](#course-glossary), [decision](#decision)
