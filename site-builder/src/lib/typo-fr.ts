// French typography, ported from the old site (parcours-po-website, src/lib/typo-fr.ts and
// src/middleware.ts): a no-break space before « : » and inside « », a narrow no-break space before
// « ; ? ! », the curly apostrophe. Applied once to every page's HTML by src/middleware.ts, outside
// <script>, <style>, <pre> and <code> (code stays copiable), and to the attributes a screen reader
// reads. It adds spaces and curls apostrophes only: it rewrites no word of the course. Idempotent.
const NBSP = '\u00a0';
const NNBSP = '\u202f';

export function typoFr(s: string): string {
  return s
    .replace(/[ \t]+([:»])/g, `${NBSP}$1`)
    .replace(/[ \t]+([;?!])/g, `${NNBSP}$1`)
    .replace(/(«)[ \t]+/g, `$1${NBSP}`)
    .replace(/([A-Za-zÀ-ÿ])'(?=[A-Za-zÀ-ÿ])/g, '$1’');
}

const APOSTROPHE = /([A-Za-zÀ-ÿ])(?:'|&#39;|&#x27;)(?=[A-Za-zÀ-ÿ])/g;
const ATTRIBUTE = /(\s(?:aria-label|title|alt|content)=")([^"]*)(")/g;

/** French typography over a whole HTML page: its texts and the attributes a screen reader reads. */
export function typoHtml(html: string): string {
  const parts = html.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<pre[\s>][\s\S]*?<\/pre>|<code[\s>][\s\S]*?<\/code>|<[^>]+>)/);
  // An apostrophe at the end of a text, before a tag, whose next text starts with a letter
  // (« L'<a>annexe A1</a> »): curled too (a rework of the old site, which left it straight).
  const beforeLetter = (i: number) => {
    for (let j = i + 1; j < parts.length; j++) {
      if (j % 2 === 1) {
        if (/^<(script|style|pre|code)[\s>]/.test(parts[j])) return false;
        continue;
      }
      if (parts[j] === '') continue;
      return /^[A-Za-zÀ-ÿ]/.test(parts[j]);
    }
    return false;
  };
  return parts
    .map((part, i) => {
      if (i % 2 === 0) {
        const curled = /[A-Za-zÀ-ÿ]'$/.test(part) && beforeLetter(i) ? `${part.slice(0, -1)}’` : part;
        return typoFr(curled.replace(APOSTROPHE, '$1’'));
      }
      if (/^<(script|style|pre|code)[\s>]/.test(part)) return part;
      return part.replace(ATTRIBUTE, (_m, a: string, v: string, z: string) => a + v.replace(APOSTROPHE, '$1’') + z);
    })
    .join('');
}
