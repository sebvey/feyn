// Run from the repository root: mise exec -- node construction/scripts/workflow-usage.mjs <run transcript dir>
// Per-agent token usage of an agent-workflow run (#184), read from its transcripts: the run's directory
// holds agent-<id>.jsonl (one line per message) and agent-<id>.meta.json (its label, its phase). Prints a
// Markdown table, one row per agent, most costly first: turns (assistant messages), input (uncached),
// cache writes, cache reads, output, and the price-weighted cost with its share of the run. Weights, in
// units of one input token: input 1, cache write 1.25, cache read 0.1, output 5 (the ratios of the
// Anthropic prices). A message streamed in several lines carries its usage on each: counted once, by id.
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const dir = process.argv[2]
if (!dir) {
  console.error('usage: workflow-usage.mjs <run transcript dir> (…/subagents/workflows/wf_<id>)')
  process.exit(2)
}
const W = { input: 1, cacheWrite: 1.25, cacheRead: 0.1, output: 5 }

const rows = []
for (const f of readdirSync(dir).filter(f => /^agent-.*\.jsonl$/.test(f)).sort()) {
  const id = f.slice('agent-'.length, -'.jsonl'.length)
  let meta = {}
  try { meta = JSON.parse(readFileSync(join(dir, `agent-${id}.meta.json`), 'utf8')) } catch {}
  const r = { agent: meta.description || id, phase: meta.workflowPhase || '', model: '', turns: 0, input: 0, cacheWrite: 0, cacheRead: 0, output: 0 }
  const seen = new Set()
  for (const line of readFileSync(join(dir, f), 'utf8').split('\n')) {
    if (!line) continue
    let e
    try { e = JSON.parse(line) } catch { continue }
    if (e.type !== 'assistant' || !e.message?.usage) continue
    const key = e.message.id || e.uuid
    if (seen.has(key)) continue
    seen.add(key)
    const u = e.message.usage
    r.turns++
    r.input += u.input_tokens || 0
    r.cacheWrite += u.cache_creation_input_tokens || 0
    r.cacheRead += u.cache_read_input_tokens || 0
    r.output += u.output_tokens || 0
    if (e.message.model && !r.model) r.model = e.message.model
  }
  r.cost = W.input * r.input + W.cacheWrite * r.cacheWrite + W.cacheRead * r.cacheRead + W.output * r.output
  rows.push(r)
}
if (!rows.length) {
  console.error(`no agent-*.jsonl in ${dir}`)
  process.exit(1)
}
rows.sort((a, b) => b.cost - a.cost)

const total = rows.reduce((t, r) => {
  for (const k of ['turns', 'input', 'cacheWrite', 'cacheRead', 'output', 'cost']) t[k] += r[k]
  return t
}, { agent: '**total**', phase: '', model: '', turns: 0, input: 0, cacheWrite: 0, cacheRead: 0, output: 0, cost: 0 })
const n = x => Math.round(x).toLocaleString('en-US')
const share = r => `${Math.round(100 * r.cost / total.cost)} %`

console.log(`${rows.length} agents, ${dir.replace(/\/$/, '').split('/').pop()}; cost = input + 1.25 cache writes + 0.1 cache reads + 5 output`)
console.log('')
console.log('| Agent | Phase | Model | Turns | Input | Cache writes | Cache reads | Output | Cost | Share |')
console.log('|---|---|---|---:|---:|---:|---:|---:|---:|---:|')
for (const r of [...rows, total]) {
  console.log(`| ${r.agent} | ${r.phase} | ${r.model.replace(/^claude-/, '')} | ${r.turns} | ${n(r.input)} | ${n(r.cacheWrite)} | ${n(r.cacheRead)} | ${n(r.output)} | ${n(r.cost)} | ${share(r)} |`)
}
