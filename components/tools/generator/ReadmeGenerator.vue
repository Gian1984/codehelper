<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-gray-100">
    <!-- Header -->
    <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <div class="flex items-center justify-between gap-3 flex-wrap mb-4">
        <h2 class="text-2xl font-semibold">📝 README.md Generator</h2>
        <div class="flex items-center gap-2">
          <button class="btn" @click="resetAll">reset</button>
          <button class="btn-primary" @click="copyMd">{{ copied ? 'copied!' : 'copy' }}</button>
          <button class="btn" @click="downloadMd">download</button>
        </div>
      </div>

      <!-- Quick Templates -->
      <div>
        <p class="text-sm text-gray-400 mb-2">⚡ Quick Templates:</p>
        <div class="flex flex-wrap gap-2">
          <button class="btn-template" @click="applyTemplate('frontend')">🎨 Frontend App</button>
          <button class="btn-template" @click="applyTemplate('backend')">🔧 Backend API</button>
          <button class="btn-template" @click="applyTemplate('cli')">⌨️ CLI Tool</button>
          <button class="btn-template" @click="applyTemplate('library')">📦 Library/Package</button>
          <button class="btn-template" @click="applyTemplate('fullstack')">🚀 Full-Stack App</button>
        </div>
      </div>
    </div>

    <!-- Basic Info -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card space-y-3">
        <h3 class="font-semibold text-indigo-400 mb-2">ℹ️ Basic Info</h3>
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
        <h3 class="font-semibold text-indigo-400 mb-2">🔗 Repository & Links</h3>
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
        <h3 class="font-semibold text-indigo-400 mb-2">📋 Sections to Include</h3>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.badges" class="w-4 h-4" /><span>🏷️ badges</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.toc" class="w-4 h-4" /><span>📑 TOC</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.install" class="w-4 h-4" /><span>⬇️ install</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.usage" class="w-4 h-4" /><span>💡 usage</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.features" class="w-4 h-4" /><span>⭐ features</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.prereq" class="w-4 h-4" /><span>📦 prereq</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.env" class="w-4 h-4" /><span>🔐 env vars</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.scripts" class="w-4 h-4" /><span>⚙️ scripts</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.screens" class="w-4 h-4" /><span>📸 screens</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.roadmap" class="w-4 h-4" /><span>🗺️ roadmap</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.changelog" class="w-4 h-4" /><span>📝 changelog</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.faq" class="w-4 h-4" /><span>❓ FAQ</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="toggles.contributing" class="w-4 h-4" /><span>🤝 contrib</span></label>
        </div>
      </div>
    </div>

    <!-- Badge Builder -->
    <div v-if="toggles.badges" class="card space-y-3">
      <h3 class="font-semibold text-indigo-400">🏷️ Custom Badges</h3>
      <div class="flex flex-wrap gap-2 mb-3">
        <button class="btn-badge" @click="addBadge('stars')">⭐ Stars</button>
        <button class="btn-badge" @click="addBadge('forks')">🍴 Forks</button>
        <button class="btn-badge" @click="addBadge('issues')">🐛 Issues</button>
        <button class="btn-badge" @click="addBadge('prs')">🔀 PRs</button>
        <button class="btn-badge" @click="addBadge('downloads')">⬇️ Downloads</button>
        <button class="btn-badge" @click="addBadge('version')">📦 Version</button>
        <button class="btn-badge" @click="addBadge('build')">✅ Build</button>
        <button class="btn-badge" @click="addBadge('custom')">➕ Custom</button>
      </div>
      <div v-if="customBadges.length > 0" class="space-y-2">
        <div v-for="(badge, i) in customBadges" :key="i" class="grid grid-cols-3 gap-2">
          <input v-model="badge.label" class="input" placeholder="Label" />
          <input v-model="badge.message" class="input" placeholder="Message" />
          <div class="flex gap-2">
            <input v-model="badge.color" class="input" placeholder="Color" />
            <button class="btn" @click="customBadges.splice(i, 1)">×</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Editors -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card space-y-3">
        <h3 class="font-semibold text-indigo-400">⬇️ Installation & 💡 Usage</h3>
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
        <h3 class="font-semibold text-indigo-400">⭐ Features & 📦 Prerequisites</h3>
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
        <h3 class="font-semibold text-indigo-400">🔐 Environment & ⚙️ Scripts</h3>
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
        <h3 class="font-semibold text-indigo-400">📸 Media & 📝 Misc</h3>

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

    <!-- Output with Preview Toggle -->
    <div class="card space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-indigo-400">📄 Preview</h3>
        <div class="flex gap-2">
          <button
            class="btn-preview"
            :class="{ active: previewMode === 'rendered' }"
            @click="previewMode = 'rendered'"
          >
            👁️ Rendered
          </button>
          <button
            class="btn-preview"
            :class="{ active: previewMode === 'markdown' }"
            @click="previewMode = 'markdown'"
          >
            📝 Markdown
          </button>
        </div>
      </div>

      <!-- Rendered Preview (GitHub-styled) -->
      <div v-if="previewMode === 'rendered'"
           class="bg-black border border-gray-700 rounded-lg p-6 overflow-auto max-h-[600px] prose prose-invert prose-sm max-w-none"
           v-html="renderedMarkdown"
      ></div>

      <!-- Raw Markdown -->
      <pre v-else class="bg-black text-green-300 p-4 rounded-lg border border-gray-700 overflow-auto max-h-[600px] whitespace-pre-wrap text-sm font-mono">{{ markdown }}</pre>
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

/* -------- preview mode -------- */
const previewMode = ref<'rendered' | 'markdown'>('rendered')

/* -------- custom badges -------- */
type CustomBadge = { label: string; message: string; color: string }
const customBadges = ref<CustomBadge[]>([])

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

/* -------- Badge Builder -------- */
function addBadge(type: string) {
  const { owner, name } = repo.value
  if (type === 'stars' && owner && name) {
    customBadges.value.push({ label: 'Stars', message: '', color: 'yellow' })
    customBadges.value[customBadges.value.length - 1].message = `https://img.shields.io/github/stars/${owner}/${name}`
  } else if (type === 'forks' && owner && name) {
    customBadges.value.push({ label: 'Forks', message: `https://img.shields.io/github/forks/${owner}/${name}`, color: 'blue' })
  } else if (type === 'issues' && owner && name) {
    customBadges.value.push({ label: 'Issues', message: `https://img.shields.io/github/issues/${owner}/${name}`, color: 'red' })
  } else if (type === 'prs' && owner && name) {
    customBadges.value.push({ label: 'PRs', message: `https://img.shields.io/github/issues-pr/${owner}/${name}`, color: 'green' })
  } else if (type === 'downloads' && npmName.value) {
    customBadges.value.push({ label: 'Downloads', message: `https://img.shields.io/npm/dt/${npmName.value}`, color: 'brightgreen' })
  } else if (type === 'version' && npmName.value) {
    customBadges.value.push({ label: 'Version', message: `https://img.shields.io/npm/v/${npmName.value}`, color: 'blue' })
  } else if (type === 'build' && owner && name) {
    customBadges.value.push({ label: 'Build', message: `https://img.shields.io/github/actions/workflow/status/${owner}/${name}/ci.yml`, color: 'brightgreen' })
  } else {
    customBadges.value.push({ label: 'Custom', message: 'value', color: 'blue' })
  }
}

/* -------- Template Presets -------- */
function applyTemplate(template: string) {
  if (template === 'frontend') {
    title.value = 'My Frontend App'
    description.value = 'A modern, responsive web application built with React/Vue/Next.js'
    installCmd.value = 'npm install'
    usageSnippet.value = 'npm run dev'
    features.value = ['⚡ Fast and optimized', '🎨 Modern UI/UX', '📱 Fully responsive', '♿ Accessible (WCAG compliant)']
    prereq.value = [{ name: 'Node.js', version: '>=18' }, { name: 'npm', version: '>=9' }]
    scripts.value = [
      { name: 'dev', cmd: 'npm run dev' },
      { name: 'build', cmd: 'npm run build' },
      { name: 'preview', cmd: 'npm run preview' }
    ]
    toggles.value.features = true
    toggles.value.prereq = true
    toggles.value.scripts = true
    toggles.value.env = true
  } else if (template === 'backend') {
    title.value = 'My Backend API'
    description.value = 'A RESTful API built with Node.js, Express, and TypeScript'
    installCmd.value = 'npm install'
    usageSnippet.value = 'npm start'
    features.value = ['🔒 Secure authentication', '📊 Database integration', '⚡ Fast and scalable', '📝 API documentation']
    prereq.value = [{ name: 'Node.js', version: '>=18' }, { name: 'PostgreSQL', version: '>=14' }]
    scripts.value = [
      { name: 'dev', cmd: 'npm run dev' },
      { name: 'build', cmd: 'npm run build' },
      { name: 'start', cmd: 'npm start' },
      { name: 'test', cmd: 'npm test' }
    ]
    env.value = [
      { name: 'DATABASE_URL', required: true, default: '', desc: 'PostgreSQL connection string' },
      { name: 'JWT_SECRET', required: true, default: '', desc: 'Secret key for JWT tokens' },
      { name: 'PORT', required: false, default: '3000', desc: 'Server port' }
    ]
    toggles.value.env = true
  } else if (template === 'cli') {
    title.value = 'My CLI Tool'
    description.value = 'A command-line tool to automate common tasks'
    installCmd.value = 'npm install -g my-cli'
    usageSnippet.value = 'my-cli [command] [options]'
    features.value = ['⚡ Fast execution', '🎯 Simple commands', '📝 Helpful documentation', '🔧 Configurable']
    prereq.value = [{ name: 'Node.js', version: '>=18' }]
    scripts.value = [
      { name: 'build', cmd: 'npm run build' },
      { name: 'test', cmd: 'npm test' }
    ]
    toggles.value.install = true
    toggles.value.usage = true
  } else if (template === 'library') {
    title.value = 'My Library'
    description.value = 'A lightweight, type-safe library for JavaScript/TypeScript'
    installCmd.value = 'npm install my-library'
    usageSnippet.value = 'import { myFunction } from \'my-library\'\n\nmyFunction()'
    features.value = ['📦 Zero dependencies', '💪 Fully typed', '🪶 Lightweight', '🔧 Tree-shakeable']
    prereq.value = [{ name: 'Node.js', version: '>=18' }]
    scripts.value = [
      { name: 'build', cmd: 'npm run build' },
      { name: 'test', cmd: 'npm test' },
      { name: 'docs', cmd: 'npm run docs' }
    ]
    codeLang.value = 'ts'
  } else if (template === 'fullstack') {
    title.value = 'My Full-Stack App'
    description.value = 'A complete full-stack application with modern frontend and backend'
    installCmd.value = 'npm install'
    usageSnippet.value = 'npm run dev'
    features.value = ['🎨 Modern React/Vue frontend', '🔧 Express/FastAPI backend', '🗄️ Database integration', '🔒 Authentication & authorization']
    prereq.value = [{ name: 'Node.js', version: '>=18' }, { name: 'Docker', version: '>=20' }]
    scripts.value = [
      { name: 'dev', cmd: 'npm run dev' },
      { name: 'build', cmd: 'npm run build' },
      { name: 'start', cmd: 'npm start' },
      { name: 'docker', cmd: 'docker-compose up' }
    ]
    toggles.value.env = true
    env.value = [
      { name: 'DATABASE_URL', required: true, default: '', desc: 'Database connection string' },
      { name: 'API_URL', required: true, default: 'http://localhost:3000', desc: 'Backend API URL' }
    ]
  }
}

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
  if (toggles.value.badges) {
    const defaultBadges = [licenseBadge.value, npmBadge.value, ciBadge.value, coverageBadge.value].filter(Boolean)
    const custom = customBadges.value.map(b => {
      // If message is a URL (starts with http), use it directly
      if (b.message.startsWith('http')) {
        return `![${b.label}](${b.message})`
      }
      // Otherwise, create a static badge
      return `![${b.label}](https://img.shields.io/badge/${encodeURIComponent(b.label)}-${encodeURIComponent(b.message)}-${b.color})`
    })
    const allBadges = [...defaultBadges, ...custom].join(' ')
    if (allBadges) lines.push(allBadges)
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

/* -------- Simple Markdown Renderer -------- */
const renderedMarkdown = computed(() => {
  let html = markdown.value

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-indigo-400 hover:underline" target="_blank" rel="noopener">$1</a>')

  // Images (badges)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="inline-block" />')

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="bg-gray-950 border border-gray-700 rounded p-3 overflow-x-auto my-3"><code class="text-sm text-green-300">${code.trim()}</code></pre>`
  })

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-1.5 py-0.5 rounded text-sm text-indigo-300">$1</code>')

  // Tables
  html = html.replace(/\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g, (match) => {
    const lines = match.trim().split('\n')
    const headers = lines[0].split('|').filter(Boolean).map(h => h.trim())
    const rows = lines.slice(2).map(line => line.split('|').filter(Boolean).map(c => c.trim()))

    let table = '<table class="min-w-full border-collapse border border-gray-700 my-4">'
    table += '<thead class="bg-gray-800"><tr>'
    headers.forEach(h => table += `<th class="border border-gray-700 px-4 py-2 text-left">${h}</th>`)
    table += '</tr></thead><tbody>'
    rows.forEach(row => {
      table += '<tr>'
      row.forEach(cell => table += `<td class="border border-gray-700 px-4 py-2">${cell}</td>`)
      table += '</tr>'
    })
    table += '</tbody></table>'
    return table
  })

  // Unordered lists
  html = html.replace(/^\- (.+)$/gim, '<li class="ml-4">$1</li>')
  html = html.replace(/(<li class="ml-4">.*<\/li>)/s, '<ul class="list-disc list-inside my-2">$1</ul>')

  // Checkboxes
  html = html.replace(/- \[ \] (.+)/g, '<li class="ml-4"><input type="checkbox" disabled class="mr-2" />$1</li>')
  html = html.replace(/- \[x\] (.+)/gi, '<li class="ml-4"><input type="checkbox" checked disabled class="mr-2" />$1</li>')

  // Line breaks
  html = html.replace(/\n\n/g, '<br/><br/>')
  html = html.replace(/\n/g, '<br/>')

  return html
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
  customBadges.value = []
  previewMode.value = 'rendered'
  toggles.value = { ...toggles.value, badges: true, toc: true, install: true, usage: true, features: true, prereq: true, env: true, scripts: true, screens: false, roadmap: false, changelog: false, faq: false, contributing: true }
}
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.input {
  @apply bg-black text-white w-full px-3 py-2 rounded-md border border-gray-700;
  @apply focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none;
}
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm transition-colors; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm transition-colors; }
.btn-template {
  @apply bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm text-gray-200 border border-gray-700;
  @apply transition-all hover:border-indigo-500;
}
.btn-badge {
  @apply bg-gray-800 hover:bg-indigo-600 px-3 py-1.5 rounded text-xs text-gray-200;
  @apply transition-colors border border-gray-700 hover:border-indigo-500;
}
.btn-preview {
  @apply px-4 py-2 rounded-lg text-sm transition-all border border-gray-700;
  @apply bg-gray-800 text-gray-300 hover:bg-gray-700;
}
.btn-preview.active {
  @apply bg-indigo-600 text-white border-indigo-500 shadow-lg;
}
.card { @apply bg-gray-900 rounded-xl p-5 border border-gray-700; }
</style>
