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
export interface Item { text: string; author?: string; refs: string[]; verified?: string[] }
export interface Diagram { file: string; title: string; caption: string; unit: string; anchor: string; svg: string }
export interface Table { key: string; heading: string; header: string[]; rows: string[][] }
export interface Concept {
  number: string; annex: boolean; slug: string; title: string; objective: string;
  prerequisites: string[]; duration_min?: number; domain: number | null; path: string;
  head?: Section;
  sections: ConceptSection[];
  foot?: { heading: string; blocks: Section[] };
  stances?: { heading: string; consensus: Item[]; school: Item[]; course: Item[] };
  neighbors?: Item[];
  diagrams?: Diagram[];
  sources?: Table[];
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
// stance markers as badges
const refs = [...doc.concept_refs].sort((a, b) => b.text.length - a.text.length);
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const refPattern = refs.length
  ? new RegExp(`(?<![\\p{L}\\p{N}])(${refs.map((r) => escapeRe(r.text)).join('|')})(?![\\p{L}\\p{N}])`, 'gu')
  : null;
const refTarget = new Map(refs.map((r) => {
  const t = r.targets[0];
  return [r.text, t ? href(t.path) + (t.anchor ? `#${t.anchor}` : '') : null];
}));

interface MdNode { type: string; value?: string; url?: string; children?: MdNode[] }

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

const processor = unified().use(remarkParse).use(remarkConceptRefs).use(remarkRehype).use(rehypeStringify);

// ---- the stance markers of a text (`[cours]`, the course lexicon's `markers`), as badges
/** The class of a badge by its marker key, the old site's names (`.pastille.ecole`). */
const badgeClass: Record<string, string> = { consensus: 'consensus', school: 'ecole', course: 'cours' };
const markerKey = new Map(Object.entries(words.course.markers ?? {}).map(([k, w]) => [w, k]));
const markerPattern = markerKey.size
  ? new RegExp(`\\[(${[...markerKey.keys()].map(escapeRe).join('|')})\\]`, 'gu')
  : null;
const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The badge of a stance, by its marker key (`consensus`, `school`, `course`) and the word it shows; out of the search index. */
export const badge = (key: string, word: string) =>
  `<span class="pastille ${badgeClass[key] ?? key}" data-pagefind-ignore>${escapeHtml(word)}</span>`;

/** The marker key of a word of the course lexicon's `markers` (« cours » is `course`), if it is one. */
export const markerOf = (word: string) => markerKey.get(word);

/** Each stance marker of an HTML text becomes its badge, the marker's word in it. */
const badges = (html: string) => (markerPattern ? html.replace(markerPattern, (_m, w: string) => badge(markerKey.get(w)!, w)) : html);

/** A Markdown text of the course as HTML: its concept references linked, its stance markers as badges. */
export const md = (text: string) => badges(String(processor.processSync(text)));

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
