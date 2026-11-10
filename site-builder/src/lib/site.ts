// The document the engine lays out: the JSON render-site printed for one course, validated by
// build-site against its spec MAJOR's site.schema.yaml, then given here by its path
// (FEYN_SITE_DATA). The engine reads no course file and no spec file: every text, every word
// that names a thing of the course and every address comes from this document.
import fs from 'node:fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { ui } from '../ui';

export interface Section { key: string; heading: string; text: string }
export interface Domain {
  number: number; slug: string; title: string; objective: string; duration_min?: number;
  concepts: string[]; path: string; sections: Section[];
}
/** A misconception a case makes tempting: its name, and the id of the misconception of its unit it names. */
export interface InPlay { name: string; id?: string }
export interface Case {
  title: string; anchor?: string; question?: string;
  /** What the site shows hidden until the reader reveals it. */
  revealed?: { expected_answer?: string; misconceptions_in_play?: InPlay[] };
  supplementary: boolean;
}
export interface Misconception { id: string; name: string; belief: string; root: string; correction: string }
export interface Unit {
  id: string; title: string;
  /** Its published blocks, in the order the site renders them: the misconceptions of its lesson after its cases. */
  blocks: { lesson?: { matter?: string }; cases?: Case[]; misconceptions?: Misconception[] };
}
export interface ConceptSection { id: string; title: string; units: Unit[] }
/**
 * A claim mark of a concept's published text, as render-site read it through its spec: `url` the
 * link's destination as written, by which the engine renders the link; `nature` its key
 * (`consensus`, `school`, `fact`, `course`); `holder` who holds its stance, when its sources give one;
 * `text` the plain text claimed; `anchor` the id of its place on the page.
 */
export interface ClaimMark { url: string; nature: string; sources: string[]; name: string | null; holder?: string; text: string; anchor: string }
/** A CSL name: a person (`family`, `given`) or an organisation (`literal`). */
export interface CslName { family?: string; given?: string; literal?: string }
/** A source of the course, by its id: its CSL fields, its CSL `type`, its kind, its control and its independence. */
export interface Source {
  id: string; type?: string; title: string; author?: CslName[]; editor?: CslName[];
  'container-title'?: string; publisher?: string; volume?: string | number; issue?: string | number;
  page?: string | number; number?: string | number; version?: string | number; issued?: string | number;
  URL?: string; DOI?: string; accessed?: string;
  kind: string; control: string; independence: string;
}
export interface Diagram { file: string; title: string; caption: string; unit: string; anchor: string; svg: string }
export interface Concept {
  number: string; annex: boolean; slug: string; title: string; objective: string;
  prerequisites: string[]; duration_min?: number; domain: number | null; path: string;
  head?: Section;
  sections: ConceptSection[];
  foot?: { heading: string; blocks: Section[] };
  diagrams?: Diagram[];
  /** The claim marks of its published text, in the order of its concept file. */
  claim_marks: ClaimMark[];
}
export interface ConceptRef { text: string; targets: { id: string; concept: string; path: string; anchor: string | null }[] }
export interface Storyline {
  world?: { title: string | null; text: string; sections: { heading: string; text: string }[] };
}
export interface TableSection { key: string; heading: string; header: string[]; rows: string[][] }
export interface Glossary { table?: { header: string[]; rows: string[][] }; sections: TableSection[] }
export interface Doc {
  spec: string;
  language: string;
  course: {
    id: string; title: string; subtitle?: string; annexes: string[];
    /** The text of the course's `logo.svg`: square, one colour in `currentColor`. */
    logo: string;
    /** The course's accent colour, `#rrggbb`, whose hue the site's accent family keeps (src/lib/look.ts). */
    accent_color: string;
  };
  plan: Section[];
  domains: Domain[];
  concepts: Concept[];
  storyline: Storyline | null;
  glossary: Glossary | null;
  /** The sources of the course, in the order of their ids; absent when its spec does not publish them. */
  sources?: Source[];
  /** The latest release of the course: null while it has none, absent when its spec does not publish it. */
  release?: { version: string; date: string } | null;
  concept_refs: ConceptRef[];
  words: {
    course: {
      headings: Record<string, string>;
      block_kinds: { concept: string; annex: string; separator: string } & Record<string, string>;
    } & Record<string, Record<string, string>>;
    site: {
      nav: { domains: string; storyline: string; glossary: string };
      labels: { domain: string; objective: string } & Record<string, string>;
    } & Record<string, Record<string, string>>;
  };
  url_scheme: { pages: Record<string, string> };
}

function load(): Doc {
  const file = process.env.FEYN_SITE_DATA;
  if (!file) throw new Error('FEYN_SITE_DATA is not set: build the site with site-builder/build-site <course-dir>');
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Doc;
}

export const doc = load();
export const words = doc.words;
export const pages = doc.url_scheme.pages;

/** The base path of the site, ending with a slash. */
export const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

/** The address of a page from its address in the URL scheme (relative to the base). */
export const href = (address: string) => `${base}${address}`;

/** The address of a page of the URL scheme by its key (`domains`, `search`…). */
export const pageHref = (key: string) => href(pages[key] ?? '');

/** The text before a value: its label, then the separator of the course lexicon (« : »). */
export const labelled = (label: string) => `${label}${words.course.block_kinds.separator}`;

/** « Concept 0 », « Annexe A1 »: the kind word of the course lexicon and the number. */
export const conceptName = (c: Concept) => `${c.annex ? words.course.block_kinds.annex : words.course.block_kinds.concept} ${c.number}`;

/** « Domaine 1 »: the label of the site lexicon and the number. */
export const domainName = (d: Domain) => `${words.site.labels.domain} ${d.number}`;

export const conceptByNumber = new Map(doc.concepts.map((c) => [c.number, c]));
export const annexes = doc.concepts.filter((c) => c.annex);

/** The pages a course may lack (its storyline, its glossary): routed and linked only when the document gives them. */
export const hasPage = (key: string) =>
  key in pages && (key === 'storyline' ? !!doc.storyline : key === 'glossary' ? !!doc.glossary : true);

// ---- Markdown: CommonMark, rendered as written (no raw HTML), the concept references linked, the
// claim marks rendered
const refs = [...doc.concept_refs].sort((a, b) => b.text.length - a.text.length);
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const refPattern = refs.length
  ? new RegExp(`(?<![\\p{L}\\p{N}])(${refs.map((r) => escapeRe(r.text)).join('|')})(?![\\p{L}\\p{N}])`, 'gu')
  : null;
const refTarget = new Map(refs.map((r) => {
  const t = r.targets[0];
  return [r.text, t ? href(t.path) + (t.anchor ? `#${t.anchor}` : '') : null];
}));

interface MdNode { type: string; value?: string; url?: string; children?: MdNode[]; data?: Record<string, unknown> }

/** A remark plugin: each concept reference of a text (`concept_refs`) becomes a link to its page. */
function remarkConceptRefs() {
  return (tree: MdNode) => {
    const walk = (node: MdNode) => {
      if (!node.children || node.type === 'link') return;
      node.children = node.children.flatMap((child): MdNode[] => {
        if (child.type !== 'text' || !refPattern || !child.value) {
          walk(child);
          return [child];
        }
        const out: MdNode[] = [];
        let last = 0;
        for (const m of child.value.matchAll(refPattern)) {
          const url = refTarget.get(m[1]);
          if (!url) continue;
          if (m.index! > last) out.push({ type: 'text', value: child.value.slice(last, m.index) });
          out.push({ type: 'link', url, children: [{ type: 'text', value: m[1] }] });
          last = m.index! + m[1].length;
        }
        if (last < child.value.length) out.push({ type: 'text', value: child.value.slice(last) });
        return out;
      });
    };
    walk(tree);
  };
}

// ---- the claim marks. The engine holds no grammar of a claim mark: render-site read them through
// its spec and gives each concept's (`claim_marks`), each by its link's destination as written
// (`url`); a link whose destination is one of them is rendered as a claim mark, any other link
// stays a link.
/** The class of a badge by its nature key, the old site's names (`.pastille.ecole`). */
const badgeClass: Record<string, string> = { consensus: 'consensus', school: 'ecole', fact: 'fait', course: 'cours' };
const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The badge of a nature, by its key (`consensus`, `school`, `fact`, `course`) and the word it shows; out of the search index. */
export const badge = (key: string, word: string) =>
  `<span class="pastille ${badgeClass[key] ?? key}" data-pagefind-ignore>${escapeHtml(word)}</span>`;

/** The word of a nature by its key, the course lexicon's `natures` (`school` is « école »). */
export const natureWord = (key: string) => words.course.natures?.[key] ?? key;

/** The sources of the course by their id; a claim mark links only to those the document gives. */
export const sourceById = new Map((doc.sources ?? []).map((s) => [s.id, s]));

/** The anchor of a source in the « Sources » of a concept page, which its claim marks link to. */
export const sourceAnchor = (id: string) => `source-${id}`;

/** The claim marks of the document by their link's destination, which says their nature and their sources. */
const claimMarkByUrl = new Map(doc.concepts.flatMap((c) => c.claim_marks.map((k) => [k.url, k] as const)));

/** An element of the page written as an mdast node, which remark-rehype turns into that element. */
const element = (tagName: string, properties: Record<string, unknown>, children: MdNode[]): MdNode =>
  ({ type: 'claimMarkPart', data: { hName: tagName, hProperties: properties }, children });

/** The links of a claim mark to its sources ([S1] [S2]), each to its line of the page's « Sources »; out of the search index. */
function sourceLinks(ids: string[]): MdNode[] {
  const known = ids.filter((id) => sourceById.has(id));
  if (!known.length) return [];
  const links = known.flatMap((id, i): MdNode[] => [
    ...(i > 0 ? [{ type: 'text', value: ' ' }] : []),
    { type: 'link', url: `#${sourceAnchor(id)}`, children: [{ type: 'text', value: `[${id}]` }] },
  ]);
  return [{ type: 'text', value: ' ' }, element('span', { className: ['refs'], dataPagefindIgnore: '' }, links)];
}

/** A remark plugin: each claim mark becomes its text, the badge of its nature and its links to its sources. */
function remarkClaimMarks() {
  return (tree: MdNode) => {
    const walk = (node: MdNode) => {
      if (!node.children) return;
      node.children = node.children.map((child): MdNode => {
        const k = child.type === 'link' && child.url !== undefined ? claimMarkByUrl.get(child.url) : undefined;
        if (!k) {
          walk(child);
          return child;
        }
        const cls = badgeClass[k.nature] ?? k.nature;
        return element('span', { className: ['affirmation', cls] }, [
          ...(child.children ?? []),
          { type: 'text', value: ' ' },
          element('span', { className: ['pastille', cls], dataPagefindIgnore: '' }, [{ type: 'text', value: natureWord(k.nature) }]),
          ...sourceLinks(k.sources),
        ]);
      });
    };
    walk(tree);
  };
}

const processor = unified().use(remarkParse).use(remarkClaimMarks).use(remarkConceptRefs).use(remarkRehype).use(rehypeStringify);

/** A Markdown text of the course as HTML: its concept references linked, its claim marks rendered. */
export const md = (text: string) => String(processor.processSync(text));

/**
 * A Markdown text after its label (a case's question, its expected answer): the label goes into the
 * text's first paragraph, or before the text in its own when the text opens with a list. The text
 * keeps its first letter as written (no script capitalises course text).
 */
export function mdLabelled(label: string, text: string, cls = 'cas-label'): string {
  const html = md(text).trim();
  const tag = `<span class="${cls}">${escapeHtml(labelled(label))}</span>`;
  return html.startsWith('<p>') ? `<p>${tag}${html.slice(3)}` : `<p>${tag}</p>${html}`;
}

/** A one-line Markdown text of the course as inline HTML, without its paragraph. */
export const mdInline = (text: string) => md(text).trim().replace(/^<p>([\s\S]*)<\/p>$/, '$1');

// ---- the reading order: each domain, then its concepts; the annexes stay out of it
export interface Step { name: string; title: string; href: string }
export const readingOrder: Step[] = doc.domains.flatMap((d) => [
  { name: domainName(d), title: d.title, href: href(d.path) },
  ...d.concepts.map((n) => conceptByNumber.get(n)).filter((c): c is Concept => !!c)
    .map((c) => ({ name: conceptName(c), title: c.title, href: href(c.path) })),
]);
export function around(at: string): { prev?: Step; next?: Step } {
  const i = readingOrder.findIndex((s) => s.href === at);
  return i < 0 ? {} : { prev: readingOrder[i - 1], next: readingOrder[i + 1] };
}

/** A duration in minutes, as the old site wrote it: « 18 min », « 1 h 30 ». */
export function duration(min: number): string {
  const h = Math.floor(min / 60), m = min % 60;
  return h ? (m ? `${h} ${ui.hours} ${String(m).padStart(2, '0')}` : `${h} ${ui.hours}`) : `${m} ${ui.minutes}`;
}
