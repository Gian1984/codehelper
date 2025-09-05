<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-gray-100">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">README.md Generator</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="resetAll">reset</button>
        <button class="btn-primary" @click="copyMd">copy</button>
        <button class="btn" @click="downloadMd">download</button>
        <span v-if="copied" class="text-xs text-green-400">copied!</span>
      </div>
    </div>

    <!-- basic -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card space-y-3">
        <label class="block">
          <span class="label">project title</span>
          <input v-model="title" placeholder="My Project" class="input" />
        </label>
        <label class="block">
          <span class="label">short description</span>
          <textarea v-model="description" rows="3" class="input"></textarea>
        </label>
        <div class="grid grid-cols-2 gap-2">
          <label class="block">
            <span class="label">author / org</span>
            <input v-model="author" placeholder="acme inc." class="input" />
          </label>
          <label class="block">
            <span class="label">year</span>
            <input v-model.number="year" type="number" class="input" />
          </label>
        </div>
      </div>

      <div class="card space-y-3">
        <div class="grid grid-cols-2 gap-2">
          <label class="block">
            <span class="label">repo owner</span>
            <input v-model="repo.owner" placeholder="acme" class="input" />
          </label>
          <label class="block">
            <span class="label">repo name</span>
            <input v-model="repo.name" placeholder="my-project" class="input" />
          </label>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <label class="block">
            <span class="label">homepage / demo url</span>
            <input v-model="homepage" placeholder="https://example.com" class="input" />
          </label>
          <label class="block">
            <span class="label">npm package</span>
            <input v-model="npmName" placeholder="my-package" class="input" />
          </label>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <label class="block">
            <span class="label">license</span>
            <select v-model="license.key" class="input">
              <option v-for="l in licenses" :key="l.key" :value="l.key">{{ l.key }}</option>
            </select>
          </label>
          <label class="block">
            <span class="label">code block lang</span>
            <select v-model="codeLang" class="input">
              <option>bash</option><option>sh</option><option>zsh</option><option>powershell</option><option>js</option><option>ts</option><option>py</option>
            </select>
          </label>
        </div>
      </div>

      <div class="card space-y-2">
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.badges" class="w-4 h-4" /><span class="text-sm">include badges</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.toc" class="w-4 h-4" /><span class="text-sm">table of contents</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.install" class="w-4 h-4" /><span class="text-sm">installation</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.usage" class="w-4 h-4" /><span class="text-sm">usage</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.features" class="w-4 h-4" /><span class="text-sm">features</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.prereq" class="w-4 h-4" /><span class="text-sm">prerequisites</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.env" class="w-4 h-4" /><span class="text-sm">env variables</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.scripts" class="w-4 h-4" /><span class="text-sm">npm scripts</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.screens" class="w-4 h-4" /><span class="text-sm">screenshots</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.roadmap" class="w-4 h-4" /><span class="text-sm">roadmap</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.changelog" class="w-4 h-4" /><span class="text-sm">changelog</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.faq" class="w-4 h-4" /><span class="text-sm">faq</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="toggles.contributing" class="w-4 h-4" /><span class="text-sm">contributing</span></label>
      </div>
    </div>

    <!-- content editors -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card space-y-3">
        <h3 class="font-semibold">installation & usage</h3>
        <label v-if="toggles.install" class="block">
          <span class="label">install command</span>
          <input v-model="installCmd" placeholder="npm i my-package" class="input" />
        </label>
        <label v-if="toggles.usage" class="block">
          <span class="label">usage snippet</span>
          <textarea v-model="usageSnippet" rows="4" class="input" placeholder="npm run dev"></textarea>
        </label>
      </div>

      <div class="card space-y-3">
        <h3 class="font-semibold">lists</h3>
        <!-- features -->
        <div v-if="toggles.features">
          <div class="flex items-center justify-between mb-3">
            <span class="label">features</span>
            <button class="btn" @click="features.push('New feature')">+ add</button>
          </div>
          <ul class="space-y-2">
            <li v-for="(f,i) in features" :key="i" class="flex items-center gap-2">
              <input v-model="features[i]" class="input" />
              <button class="btn" @click="features.splice(i,1)">remove</button>
            </li>
          </ul>
        </div>

        <!-- prerequisites -->
        <div v-if="toggles.prereq">
          <div class="flex items-center justify-between mt-2 mb-3">
            <span class="label">prerequisites</span>
            <button class="btn" @click="prereq.push({name:'Node.js',version:'>=18'})">+ add</button>
          </div>
          <div class="space-y-2">
            <div v-for="(p,i) in prereq" :key="i" class="grid grid-cols-2 gap-2">
              <input v-model="p.name" class="input" placeholder="Tool" />
              <input v-model="p.version" class="input" placeholder=">= X.Y" />
            </div>
          </div>
        </div>
      </div>

      <!-- env + scripts -->
      <div class="card space-y-3">
        <h3 class="font-semibold">environment & scripts</h3>
        <div v-if="toggles.env">
          <div class="flex items-center justify-between">
            <span class="label">env variables</span>
            <button class="btn" @click="env.push({name:'API_URL',required:true,default:'',desc:''})">+ add</button>
          </div>
          <div class="space-y-2">
            <div v-for="(e,i) in env" :key="i" class="grid grid-cols-4 gap-2">
              <input v-model="e.name" class="input" placeholder="NAME" />
              <input v-model="e.default" class="input" placeholder="default" />
              <select v-model="e.required" class="input"><option :value="true">required</option><option :value="false">optional</option></select>
              <input v-model="e.desc" class="input" placeholder="description" />
            </div>
          </div>
        </div>

        <div v-if="toggles.scripts">
          <div class="flex items-center justify-between mt-2 mb-3">
            <span class="label">npm scripts</span>
            <button class="btn" @click="scripts.push({name:'dev',cmd:'nuxt dev'})">+ add</button>
          </div>
          <div class="space-y-2">
            <div v-for="(s,i) in scripts" :key="i" class="grid grid-cols-2 gap-2">
              <input v-model="s.name" class="input" placeholder="script" />
              <input v-model="s.cmd" class="input" placeholder="command" />
            </div>
          </div>
        </div>
      </div>

      <!-- media + misc -->
      <div class="card space-y-3">
        <h3 class="font-semibold">media & misc</h3>

        <div v-if="toggles.screens">
          <div class="flex items-center justify-between">
            <span class="label">screenshots</span>
            <button class="btn" @click="screens.push({url:'https://via.placeholder.com/1200x600',caption:'Screenshot'})">+ add</button>
          </div>
          <div class="space-y-2">
            <div v-for="(s,i) in screens" :key="i" class="grid grid-cols-2 gap-2">
              <input v-model="s.url" class="input" placeholder="https://…" />
              <input v-model="s.caption" class="input" placeholder="caption" />
            </div>
          </div>
        </div>

        <label v-if="toggles.roadmap" class="block">
          <span class="label">roadmap</span>
          <textarea v-model="roadmap" rows="3" class="input" placeholder="- [ ] item"></textarea>
        </label>
        <label v-if="toggles.changelog" class="block">
          <span class="label">changelog</span>
          <textarea v-model="changelog" rows="3" class="input" placeholder="YYYY-MM-DD - Changed…"></textarea>
        </label>
        <label v-if="toggles.faq" class="block">
          <span class="label">faq (Q/A pairs)</span>
          <textarea v-model="faq" rows="3" class="input" placeholder="**Q:** …\n**A:** …"></textarea>
        </label>
        <label v-if="toggles.contributing" class="block">
          <span class="label">contributing</span>
          <textarea v-model="contributing" rows="3" class="input" placeholder="PRs welcome. See CONTRIBUTING.md."></textarea>
        </label>
      </div>
    </div>

    <!-- output -->
    <div>
      <label class="label mb-2 block">generated README.md</label>
      <pre class="bg-gray-950 text-green-300 p-4 rounded border border-gray-800 overflow-auto whitespace-pre-wrap text-sm">{{ markdown }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/* -------- state -------- */
const title = ref('Project Title')
const description = ref('A short description of your project.')
const author = ref('Your Name')
const year = ref<number>(new Date().getFullYear())
const repo = ref({ owner: 'acme', name: 'my-project' })
const homepage = ref('')
const npmName = ref('')

const toggles = ref({
  badges: true,
  toc: true,
  install: true,
  usage: true,
  features: true,
  prereq: true,
  env: true,
  scripts: true,
  screens: false,
  roadmap: false,
  changelog: false,
  faq: false,
  contributing: true,
})

const installCmd = ref('npm i')
const usageSnippet = ref('npm run dev')
const codeLang = ref<'bash'|'sh'|'zsh'|'powershell'|'js'|'ts'|'py'>('bash')

type Feature = string
type Prereq = { name: string; version: string }
type EnvVar = { name: string; required: boolean; default: string; desc: string }
type ScriptRow = { name: string; cmd: string }
type Screenshot = { url: string; caption: string }

const features = ref<Feature[]>([
  'Fast, typed, and delightful',
  'Zero config to get started',
])
const prereq = ref<Prereq[]>([{ name: 'Node.js', version: '>=18' }])
const env = ref<EnvVar[]>([])
const scripts = ref<ScriptRow[]>([{ name: 'dev', cmd: 'nuxt dev' }, { name: 'build', cmd: 'nuxt build' }])
const screens = ref<Screenshot[]>([])

const roadmap = ref<string>('')
const changelog = ref<string>('')
const faq = ref<string>('')
const contributing = ref<string>('PRs are welcome! For major changes, please open an issue first to discuss what you would like to change.')

/* -------- license -------- */
type LicenseKey = 'MIT' | 'Apache-2.0' | 'GPL-3.0' | 'ISC'
const licenses: Array<{ key: LicenseKey }> = [{ key: 'MIT' }, { key: 'Apache-2.0' }, { key: 'GPL-3.0' }, { key: 'ISC' }]
const license = ref<{ key: LicenseKey }>({ key: 'MIT' })

/* -------- helpers -------- */
const repoUrl = computed(() => {
  if (!repo.value.owner || !repo.value.name) return ''
  return `https://github.com/${repo.value.owner}/${repo.value.name}`
})
const issuesUrl = computed(() => (repoUrl.value ? `${repoUrl.value}/issues` : ''))
const licenseBadge = computed(() =>
    repoUrl.value ? `![License](https://img.shields.io/github/license/${repo.value.owner}/${repo.value.name})` : `![License: ${license.value.key}](https://img.shields.io/badge/license-${encodeURIComponent(license.value.key)}-blue.svg)`
)
const npmBadge = computed(() =>
    npmName.value ? `![npm](https://img.shields.io/npm/v/${npmName.value})` : ''
)
const ciBadge = computed(() =>
    repoUrl.value ? `![CI](https://img.shields.io/github/actions/workflow/status/${repo.value.owner}/${repo.value.name}/ci.yml?label=CI)` : ''
)
const coverageBadge = computed(() =>
    repoUrl.value ? `![coverage](https://img.shields.io/codecov/c/github/${repo.value.owner}/${repo.value.name})` : ''
)

function mdSection(title: string, body: string) {
  return body.trim() ? `\n\n## ${title}\n${body.trim()}` : ''
}
function mdList(items: string[]) {
  return items.length ? items.map((x) => `- ${x}`).join('\n') : ''
}
function mdTable(headers: string[], rows: string[][]) {
  if (!rows.length) return ''
  const head = `| ${headers.join(' | ')} |`
  const sep = `| ${headers.map(() => '---').join(' | ')} |`
  const body = rows.map((r) => `| ${r.join(' | ')} |`).join('\n')
  return [head, sep, body].join('\n')
}
function anchorOf(h: string) {
  return h.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')
}
const headings = computed(() => {
  const list: string[] = []
  if (toggles.install) list.push('Installation')
  if (toggles.usage) list.push('Usage')
  if (toggles.features) list.push('Features')
  if (toggles.prereq) list.push('Prerequisites')
  if (toggles.env && env.value.length) list.push('Environment Variables')
  if (toggles.scripts && scripts.value.length) list.push('Scripts')
  if (toggles.screens && screens.value.length) list.push('Screenshots')
  if (homepage.value) list.push('Demo')
  if (toggles.roadmap && roadmap.value) list.push('Roadmap')
  if (toggles.changelog && changelog.value) list.push('Changelog')
  if (toggles.faq && faq.value) list.push('FAQ')
  list.push('Contributing')
  list.push('License')
  return list
})

/* -------- Markdown composer -------- */
const markdown = computed(() => {
  const lines: string[] = []

  // Title + badges
  lines.push(`# ${title.value || 'Project Title'}`)
  if (toggles.badges) {
    const badges = [licenseBadge.value, npmBadge.value, ciBadge.value, coverageBadge.value].filter(Boolean).join(' ')
    if (badges) lines.push(badges)
  }

  // Description + links
  lines.push('')
  lines.push(description.value || 'Project description.')
  if (homepage.value) lines.push(`\n**Demo:** ${homepage.value}`)
  if (repoUrl.value) lines.push(`\n**Repository:** ${repoUrl.value}`)

  // TOC
  if (toggles.toc) {
    lines.push('\n## Table of Contents')
    lines.push(headings.value.map((h) => `- [${h}](#${anchorOf(h)})`).join('\n'))
  }

  // Installation
  if (toggles.install) {
    lines.push(mdSection('Installation', `\`\`\`${codeLang.value}\n${installCmd.value || 'npm i'}\n\`\`\``))
  }

  // Usage
  if (toggles.usage) {
    lines.push(mdSection('Usage', `\`\`\`${codeLang.value}\n${usageSnippet.value || 'npm run dev'}\n\`\`\``))
  }

  // Features
  if (toggles.features) {
    lines.push(mdSection('Features', mdList(features.value)))
  }

  // Prerequisites
  if (toggles.prereq) {
    const rows = prereq.value.map((p) => [p.name || '', p.version || ''])
    const table = mdTable(['Tool', 'Version'], rows)
    lines.push(mdSection('Prerequisites', table))
  }

  // Environment Variables
  if (toggles.env && env.value.length) {
    const rows = env.value.map((e) => [e.name || '', e.required ? 'required' : 'optional', e.default || '', e.desc || ''])
    const table = mdTable(['Name', 'Required', 'Default', 'Description'], rows)
    lines.push(mdSection('Environment Variables', table))
  }

  // Scripts
  if (toggles.scripts && scripts.value.length) {
    const rows = scripts.value.map((s) => ['`' + (s.name || '') + '`', '`' + (s.cmd || '') + '`'])
    const table = mdTable(['Script', 'Command'], rows)
    lines.push(mdSection('Scripts', table))
  }

  // Screenshots
  if (toggles.screens && screens.value.length) {
    const body = screens.value.map((s) => `![${s.caption || 'screenshot'}](${s.url})\n<sub>${s.caption || ''}</sub>`).join('\n\n')
    lines.push(mdSection('Screenshots', body))
  }

  // Demo (simple)
  if (homepage.value) {
    lines.push(mdSection('Demo', `[${homepage.value}](${homepage.value})`))
  }

  // Roadmap / Changelog / FAQ
  if (toggles.roadmap && roadmap.value) lines.push(mdSection('Roadmap', roadmap.value))
  if (toggles.changelog && changelog.value) lines.push(mdSection('Changelog', changelog.value))
  if (toggles.faq && faq.value) lines.push(mdSection('FAQ', faq.value))

  // Contributing
  const contribBody = contributing.value || 'Contributions are welcome! Please open an issue first to discuss what you would like to change.'
  lines.push(mdSection('Contributing', `${contribBody}${issuesUrl.value ? `\n\nIssues: ${issuesUrl.value}` : ''}`))

  // License
  lines.push(mdSection('License', licenseBlock(license.value.key, author.value, year.value)))

  return lines.join('\n').trim() + '\n'
})

/* -------- license blocks (short) -------- */
function licenseBlock(key: LicenseKey, holder: string, yr: number) {
  if (key === 'MIT') {
    return `MIT License © ${yr} ${holder}\n\nSee \`LICENSE\` for details.`
  }
  if (key === 'Apache-2.0') {
    return `Apache License 2.0 © ${yr} ${holder}\n\nYou may not use this file except in compliance with the License. See \`LICENSE\`.`
  }
  if (key === 'GPL-3.0') {
    return `GNU GPLv3 © ${yr} ${holder}\n\nThis program is free software: you can redistribute it and/or modify it under the terms of the GPLv3. See \`LICENSE\`.`
  }
  // ISC
  return `ISC License © ${yr} ${holder}\n\nSee \`LICENSE\` for details.`
}

/* -------- actions -------- */
const copied = ref(false)
async function copyMd() {
  await navigator.clipboard.writeText(markdown.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}
function downloadMd() {
  const blob = new Blob([markdown.value], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'README.md'
  a.click()
  URL.revokeObjectURL(url)
}
function resetAll() {
  title.value = 'Project Title'
  description.value = 'A short description of your project.'
  author.value = 'Your Name'
  year.value = new Date().getFullYear()
  repo.value = { owner: 'acme', name: 'my-project' }
  homepage.value = ''
  npmName.value = ''
  installCmd.value = 'npm i'
  usageSnippet.value = 'npm run dev'
  features.value = ['Fast, typed, and delightful', 'Zero config to get started']
  prereq.value = [{ name: 'Node.js', version: '>=18' }]
  env.value = []
  scripts.value = [{ name: 'dev', cmd: 'nuxt dev' }, { name: 'build', cmd: 'nuxt build' }]
  screens.value = []
  roadmap.value = ''
  changelog.value = ''
  faq.value = ''
  contributing.value = 'PRs are welcome! For major changes, please open an issue first to discuss what you would like to change.'
  license.value = { key: 'MIT' }
  toggles.value = { ...toggles.value, badges: true, toc: true, install: true, usage: true, features: true, prereq: true, env: true, scripts: true, screens: false, roadmap: false, changelog: false, faq: false, contributing: true }
}
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.input { @apply text-black w-full px-3 py-2 rounded-md border border-gray-300; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
</style>
