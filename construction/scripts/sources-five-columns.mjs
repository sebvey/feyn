// Run from the repository root, once (#213): mise exec -- node construction/scripts/sources-five-columns.mjs <course dir>
// then, to check the result: mise exec -- node construction/scripts/sources-five-columns.mjs <course dir> --verify <git ref>
// Puts the « Affirmations » table of every concepts/*/sources.md of a course in the five columns of SPEC 4.4
// (claim, section, source, verified, nature) and removes the file's introduction (the lines above
// « Affirmations »), changing no other byte. The section column takes, verbatim, the claim cell's last
// parenthesis when that parenthesis closes the cell and names a section: its first piece (up to the first
// « , » or « ; ») opens with a sub-concept id (0a1, A2b), « concept N », a section of concept.md or
// teaching.md (L'essentiel, Pièges, Le test rapide, Approfondissement, Objectif, Schéma, Consensus et choix
// d'école, Banque d'exemples, Consignes, Faits du fil rouge utilisés), a part of the bank (banque, Sur un
// exemple, aparté, rechange, glose, renvoi, Choix du cours) or a case title in « ». Any other row keeps its
// claim cell whole and gets an empty section; the run prints each such row with why. --verify reads the
// files at <git ref> and checks that the text removed is only the introductions and that every claim cell,
// re-joined as « claim (section) », gives back the original one (the spaces before the parenthesis aside),
// every other cell and line being unchanged.
// Run once: on a file already in five columns it changes nothing and says so.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

const [course, flag, ref] = process.argv.slice(2)
if (!course || (flag && (flag !== '--verify' || !ref))) {
  console.error('usage: sources-five-columns.mjs <course dir> [--verify <git ref>]')
  process.exit(2)
}

const HEADING = '## Affirmations'
const OLD_HEADER = '| Affirmation (section de `concept.md` ou de `teaching.md`) | Source | Ce qui a été vérifié | Nature |'
const NEW_HEADER = '| Affirmation | Section | Source | Ce qui a été vérifié | Nature |'
const OLD_SEP = '|---|---|---|---|'
const NEW_SEP = '|---|---|---|---|---|'
const SECTION_LEAD = new RegExp('^(?:(?:\\d{1,2}|A\\d)[a-z]\\d*\\b|concepts? \\d|«|' + [
  "L'essentiel", 'Pièges', 'Le test rapide', 'Approfondissement', 'Objectif', 'Schéma', 'Consensus',
  'Banque', 'banque', 'Consignes', 'Faits du fil rouge utilisés', 'Sur un exemple', 'aparté', 'rechange',
  'glose', 'renvoi', 'Choix du cours',
].join('|') + ')')

// the top-level parentheses of a cell, as [open, close] indexes
function parens(s) {
  const out = []
  let depth = 0
  let start = -1
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') { if (depth === 0) start = i; depth++ }
    else if (s[i] === ')' && depth > 0) { depth--; if (depth === 0) out.push([start, i]) }
  }
  return out
}

// a claim cell -> { claim, section } or { claim, section: '', why }
function split(cell) {
  const ps = parens(cell)
  if (!ps.length) return { claim: cell, section: '', why: 'no parenthesis' }
  const [open, close] = ps[ps.length - 1]
  const inner = cell.slice(open + 1, close)
  if (cell.slice(close + 1).trim() !== '') return { claim: cell, section: '', why: `last parenthesis "(${inner})" does not close the cell` }
  if (!SECTION_LEAD.test(inner.split(/[,;]/)[0].trim())) return { claim: cell, section: '', why: `last parenthesis "(${inner})" names no section` }
  if (cell[open - 1] !== ' ') return { claim: cell, section: '', why: `last parenthesis "(${inner})" is not preceded by a space` }
  return { claim: cell.slice(0, open).trimEnd(), section: inner }
}

// the claim cell of a row line: its text and the index of the pipe that closes it
function claimOf(line) {
  const end = line.indexOf('|', 1)
  return { cell: line.slice(1, end).trim(), end }
}

function files() {
  const dir = join(course, 'concepts')
  return readdirSync(dir).sort().map((d) => join(dir, d, 'sources.md')).filter((f) => existsSync(f))
}

function rewrite(text, f, report) {
  const lines = text.split('\n')
  const top = lines.indexOf(HEADING)
  if (top < 0) throw new Error(`${f}: no « Affirmations »`)
  const out = lines.slice(top)
  let i = out.indexOf(OLD_HEADER)
  if (i < 0) {
    if (out.includes(NEW_HEADER)) { report.push(`${f}: already in five columns, unchanged`); return text }
    throw new Error(`${f}: the « Affirmations » header is not the expected one`)
  }
  out[i] = NEW_HEADER
  if (out[i + 1] !== OLD_SEP) throw new Error(`${f}:${top + i + 2}: unexpected separator`)
  out[i + 1] = NEW_SEP
  for (let j = i + 2; j < out.length && out[j].startsWith('|'); j++) {
    const { cell, end } = claimOf(out[j])
    const r = split(cell)
    if (r.why) report.push(`${f}:${top + j + 1}: ${r.why}`)
    out[j] = `| ${r.claim} |${r.section ? ` ${r.section} ` : ' '}${out[j].slice(end)}`
  }
  return out.join('\n')
}

function verify(oldText, newText, f, problems) {
  const o = oldText.split('\n')
  const n = newText.split('\n')
  const top = o.indexOf(HEADING)
  if (n[0] !== HEADING) problems.push(`${f}: does not open on « Affirmations »`)
  if (o.length - top !== n.length) { problems.push(`${f}: ${o.length - top} lines expected after the introduction, found ${n.length}`); return 0 }
  let rows = 0
  let inTable = false
  for (let k = 0; k < n.length; k++) {
    const a = o[top + k]
    const b = n[k]
    if (a === OLD_HEADER) { inTable = true; if (b !== NEW_HEADER) problems.push(`${f}:${k + 1}: header`); continue }
    if (inTable && a === OLD_SEP) { if (b !== NEW_SEP) problems.push(`${f}:${k + 1}: separator`); continue }
    if (inTable && a.startsWith('|')) {
      const ca = a.split('|')
      const cb = b.split('|')
      const claim = cb[1].trim()
      const section = cb[2].trim()
      const was = ca[1].trim()
      // the claim, the spaces that stood before the parenthesis, then the parenthesis
      const gap = was.slice(claim.length, was.length - section.length - 2)
      const joined = section ? was.startsWith(claim) && was.endsWith(`(${section})`) && gap !== '' && gap.trim() === '' : claim === was
      if (!joined || ca.length + 1 !== cb.length || ca.slice(2).join('|') !== cb.slice(3).join('|')) problems.push(`${f}:${k + 1}: row differs`)
      rows++
      continue
    }
    inTable = false
    if (a !== b) problems.push(`${f}:${k + 1}: line differs`)
  }
  return rows
}

if (flag === '--verify') {
  const problems = []
  let rows = 0
  let intros = 0
  for (const f of files()) {
    const oldText = execFileSync('git', ['show', `${ref}:${f}`], { encoding: 'utf8' })
    const removed = oldText.split('\n').slice(0, oldText.split('\n').indexOf(HEADING))
    if (removed.some((l) => l.trim() !== '')) intros++
    rows += verify(oldText, readFileSync(f, 'utf8'), f, problems)
  }
  console.log(`${files().length} files, ${intros} introductions removed, ${rows} claim rows re-joined`)
  for (const p of problems) console.log(`problem: ${p}`)
  process.exit(problems.length ? 1 : 0)
}

const report = []
for (const f of files()) {
  const text = readFileSync(f, 'utf8')
  const next = rewrite(text, f, report)
  if (next !== text) writeFileSync(f, next)
}
for (const r of report) console.log(r)
