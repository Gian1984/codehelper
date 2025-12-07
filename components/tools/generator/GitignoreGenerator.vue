<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">📝 .gitignore Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Generate .gitignore files for your projects with pre-built templates</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">Clear All</button>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="card">
      <label class="label mb-3">🚀 Quick Start (Popular Presets)</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="preset in popularPresets"
          :key="preset.name"
          class="btn-small"
          @click="applyPreset(preset.templates)"
          :title="`Apply ${preset.name} preset`"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>

    <!-- Template Selector -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label">📚 Select Templates</label>
        <div class="flex items-center gap-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search templates..."
            class="input w-48"
          />
          <button class="btn text-xs" @click="selectAll">Select All</button>
          <button class="btn text-xs" @click="deselectAll">Deselect All</button>
        </div>
      </div>

      <!-- Categories -->
      <div class="space-y-4">
        <div v-for="category in filteredCategories" :key="category.name" class="space-y-2">
          <h3 class="text-sm font-semibold text-gray-300 uppercase tracking-wide">
            {{ category.name }} ({{ category.templates.length }})
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <label
              v-for="template in category.templates"
              :key="template.name"
              class="inline-flex items-center gap-2 cursor-pointer bg-gray-800 p-2 rounded border border-gray-700 hover:border-indigo-500 transition-colors"
              :class="{ 'border-indigo-500 bg-indigo-900/20': selectedTemplates.includes(template.name) }"
            >
              <input
                type="checkbox"
                :value="template.name"
                v-model="selectedTemplates"
              />
              <span class="text-sm">{{ template.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Rules -->
    <div class="card space-y-3">
      <label class="label">✏️ Custom Rules (Optional)</label>
      <textarea
        v-model="customRules"
        placeholder="Add your custom .gitignore rules here, one per line..."
        class="input font-mono resize-y min-h-[100px]"
        spellcheck="false"
      ></textarea>
      <p class="text-xs text-gray-400">
        Example: <code class="bg-gray-800 px-1 rounded">*.log</code>, <code class="bg-gray-800 px-1 rounded">/dist/</code>, <code class="bg-gray-800 px-1 rounded">!important.txt</code>
      </p>
    </div>

    <!-- Output -->
    <div v-if="output" class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div class="flex items-center gap-3">
          <label class="label">📄 Generated .gitignore</label>
          <span class="text-xs px-2 py-1 bg-indigo-800/30 text-indigo-400 rounded-full font-medium">
            {{ stats.patterns }} patterns • {{ stats.sections }} sections
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn" @click="copyOutput" title="Copy to clipboard">
            📋 Copy
          </button>
          <button class="btn" @click="downloadGitignore" title="Download .gitignore">
            💾 Download
          </button>
        </div>
      </div>

      <div class="relative">
        <pre class="mono-box max-h-[500px] overflow-auto text-xs">{{ output }}</pre>
      </div>

      <div class="flex items-center justify-between text-xs text-gray-400">
        <div class="flex gap-4">
          <span>{{ selectedTemplates.length }} template(s) selected</span>
          <span v-if="customRules.trim()">+ Custom rules</span>
        </div>
        <div>
          <span v-if="copied" class="text-green-400 font-medium">✓ Copied!</span>
        </div>
      </div>
    </div>

    <!-- Info -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <p class="label">💡 Tips & Info</p>
        <button class="btn-small" @click="showInfo = !showInfo">
          {{ showInfo ? '▼' : '▶' }} {{ showInfo ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showInfo" class="space-y-2 text-sm text-gray-300">
        <p><strong>What is .gitignore?</strong></p>
        <p>A .gitignore file specifies files and directories that Git should ignore. This prevents unnecessary files from being committed to your repository.</p>

        <p class="mt-3"><strong>Common patterns:</strong></p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li><code class="bg-gray-800 px-1 rounded">*.log</code> - Ignore all .log files</li>
          <li><code class="bg-gray-800 px-1 rounded">/dist/</code> - Ignore dist directory in root</li>
          <li><code class="bg-gray-800 px-1 rounded">node_modules/</code> - Ignore node_modules everywhere</li>
          <li><code class="bg-gray-800 px-1 rounded">!important.txt</code> - Negate pattern (don't ignore this file)</li>
        </ul>

        <p class="mt-3"><strong>Where to place it:</strong></p>
        <p>Place the <code class="bg-gray-800 px-1 rounded">.gitignore</code> file in the root of your Git repository.</p>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// State
const selectedTemplates = ref<string[]>([])
const customRules = ref<string>('')
const searchQuery = ref<string>('')
const copied = ref<boolean>(false)
const showInfo = ref<boolean>(false)

// Popular presets
const popularPresets = [
  { name: 'Node.js', templates: ['Node', 'npm', 'Yarn'] },
  { name: 'Python', templates: ['Python', 'JupyterNotebooks', 'virtualenv'] },
  { name: 'Java', templates: ['Java', 'Maven', 'Gradle'] },
  { name: 'React', templates: ['Node', 'npm', 'Yarn', 'VisualStudioCode'] },
  { name: 'Vue.js', templates: ['Node', 'npm', 'Yarn', 'VisualStudioCode'] },
  { name: 'Go', templates: ['Go'] },
  { name: 'Rust', templates: ['Rust'] },
  { name: 'Full Stack', templates: ['Node', 'Python', 'VisualStudioCode', 'macOS', 'Windows', 'Linux'] },
]

// Template database (most popular ones)
const templateCategories = [
  {
    name: 'Languages',
    templates: [
      {
        name: 'Node',
        content: `# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*
.npm
.eslintcache
.node_repl_history
*.tgz
.yarn-integrity
.env
.env.test
.env.production
.env.local
.cache`
      },
      {
        name: 'Python',
        content: `# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST
*.manifest
*.spec
pip-log.txt
pip-delete-this-directory.txt
htmlcov/
.tox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
.hypothesis/
.pytest_cache/
*.mo
*.pot
*.log
local_settings.py
instance/
.webassets-cache
.scrapy
docs/_build/
target/
.ipynb_checkpoints
.python-version
celerybeat-schedule
*.sage.py
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/`
      },
      {
        name: 'Java',
        content: `# Java
*.class
*.log
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar
hs_err_pid*`
      },
      {
        name: 'Go',
        content: `# Go
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out
go.work
vendor/`
      },
      {
        name: 'Rust',
        content: `# Rust
debug/
target/
Cargo.lock
**/*.rs.bk
*.pdb`
      },
      {
        name: 'PHP',
        content: `# PHP
vendor/
node_modules/
npm-debug.log
yarn-error.log
.env
.env.backup
.phpunit.result.cache
Homestead.json
Homestead.yaml
auth.json
*.cache
*.log`
      },
      {
        name: 'Ruby',
        content: `# Ruby
*.gem
*.rbc
/.config
/coverage/
/InstalledFiles
/pkg/
/spec/reports/
/spec/examples.txt
/test/tmp/
/test/version_tmp/
/tmp/
*.bundler
.bundle/
lib/bundler/man/
vendor/bundle
.rvmrc
.ruby-version
.ruby-gemset`
      },
      {
        name: 'C++',
        content: `# C++
*.o
*.ko
*.obj
*.elf
*.exe
*.out
*.app
*.i*86
*.x86_64
*.hex
*.dSYM/
*.su
*.idb
*.pdb`
      },
    ]
  },
  {
    name: 'Frameworks',
    templates: [
      {
        name: 'React',
        content: `# React
.DS_Store
node_modules
/build
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*`
      },
      {
        name: 'Vue',
        content: `# Vue
.DS_Store
node_modules
/dist
.env.local
.env.*.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*`
      },
      {
        name: 'Next.js',
        content: `# Next.js
.next
out
build
dist
.vercel
.env*.local`
      },
      {
        name: 'Django',
        content: `# Django
*.log
*.pot
*.pyc
__pycache__/
local_settings.py
db.sqlite3
db.sqlite3-journal
/media
/static
.env`
      },
      {
        name: 'Laravel',
        content: `# Laravel
/node_modules
/public/hot
/public/storage
/storage/*.key
/vendor
.env
.env.backup
.phpunit.result.cache
Homestead.json
Homestead.yaml
npm-debug.log
yarn-error.log`
      },
    ]
  },
  {
    name: 'Build Tools',
    templates: [
      {
        name: 'npm',
        content: `# npm
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.npm
.eslintcache`
      },
      {
        name: 'Yarn',
        content: `# Yarn
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
.pnp.*`
      },
      {
        name: 'Maven',
        content: `# Maven
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup
pom.xml.next
release.properties
dependency-reduced-pom.xml
buildNumber.properties
.mvn/timing.properties`
      },
      {
        name: 'Gradle',
        content: `# Gradle
.gradle
build/
!gradle/wrapper/gradle-wrapper.jar
!**/src/main/**/build/
!**/src/test/**/build/`
      },
      {
        name: 'Webpack',
        content: `# Webpack
dist/
build/
.cache/
node_modules/`
      },
      {
        name: 'Vite',
        content: `# Vite
dist
dist-ssr
*.local`
      },
    ]
  },
  {
    name: 'Operating Systems',
    templates: [
      {
        name: 'macOS',
        content: `# macOS
.DS_Store
.AppleDouble
.LSOverride
Icon
._*
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent
.AppleDB
.AppleDesktop
Network Trash Folder
Temporary Items
.apdisk`
      },
      {
        name: 'Windows',
        content: `# Windows
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db
*.stackdump
[Dd]esktop.ini
$RECYCLE.BIN/
*.cab
*.msi
*.msix
*.msm
*.msp
*.lnk`
      },
      {
        name: 'Linux',
        content: `# Linux
*~
.fuse_hidden*
.directory
.Trash-*
.nfs*`
      },
    ]
  },
  {
    name: 'IDEs & Editors',
    templates: [
      {
        name: 'VisualStudioCode',
        content: `# VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace
.history/`
      },
      {
        name: 'JetBrains',
        content: `# JetBrains
.idea/
*.iml
*.iws
*.ipr
out/
.idea_modules/
atlassian-ide-plugin.xml
com_crashlytics_export_strings.xml
crashlytics.properties
crashlytics-build.properties
fabric.properties`
      },
      {
        name: 'SublimeText',
        content: `# Sublime Text
*.tmlanguage.cache
*.tmPreferences.cache
*.stTheme.cache
*.sublime-workspace
*.sublime-project
sftp-config.json
Package Control.last-run
Package Control.ca-list
Package Control.ca-bundle
Package Control.system-ca-bundle
Package Control.cache/
Package Control.ca-certs/`
      },
      {
        name: 'Vim',
        content: `# Vim
[._]*.s[a-v][a-z]
[._]*.sw[a-p]
[._]s[a-rt-v][a-z]
[._]ss[a-gi-z]
[._]sw[a-p]
Session.vim
Sessionx.vim
.netrwhist
*~
tags
[._]*.un~`
      },
    ]
  },
  {
    name: 'Other Tools',
    templates: [
      {
        name: 'Docker',
        content: `# Docker
*.dockerignore
docker-compose.override.yml`
      },
      {
        name: 'Git',
        content: `# Git
*.orig
*.swp
*.swo`
      },
      {
        name: 'JupyterNotebooks',
        content: `# Jupyter Notebooks
.ipynb_checkpoints
*/.ipynb_checkpoints/*
profile_default/
ipython_config.py`
      },
      {
        name: 'virtualenv',
        content: `# virtualenv
.venv
venv/
ENV/
env.bak/
venv.bak/`
      },
    ]
  },
]

// Filtered categories based on search
const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return templateCategories
  }

  const query = searchQuery.value.toLowerCase()
  return templateCategories
    .map(category => ({
      ...category,
      templates: category.templates.filter(t =>
        t.name.toLowerCase().includes(query)
      )
    }))
    .filter(category => category.templates.length > 0)
})

// Generate output
const output = computed(() => {
  if (selectedTemplates.value.length === 0 && !customRules.value.trim()) {
    return ''
  }

  let result = '# Generated by CodeHelper.me - .gitignore Generator\n'
  result += `# Date: ${new Date().toISOString().split('T')[0]}\n\n`

  // Add selected templates
  selectedTemplates.value.forEach(templateName => {
    const template = templateCategories
      .flatMap(cat => cat.templates)
      .find(t => t.name === templateName)

    if (template) {
      result += template.content + '\n\n'
    }
  })

  // Add custom rules
  if (customRules.value.trim()) {
    result += '# Custom Rules\n'
    result += customRules.value.trim() + '\n'
  }

  return result.trim()
})

// Stats
const stats = computed(() => {
  const lines = output.value.split('\n').filter(line => {
    const trimmed = line.trim()
    return trimmed && !trimmed.startsWith('#')
  })

  const sections = selectedTemplates.value.length + (customRules.value.trim() ? 1 : 0)

  return {
    patterns: lines.length,
    sections: sections
  }
})

// Actions
function applyPreset(templates: string[]) {
  selectedTemplates.value = templates
}

function selectAll() {
  selectedTemplates.value = templateCategories
    .flatMap(cat => cat.templates)
    .map(t => t.name)
}

function deselectAll() {
  selectedTemplates.value = []
}

function clearAll() {
  selectedTemplates.value = []
  customRules.value = ''
  searchQuery.value = ''
}

function copyOutput() {
  if (!output.value) return
  navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function downloadGitignore() {
  if (!output.value) return

  const blob = new Blob([output.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = '.gitignore'
  a.click()
  URL.revokeObjectURL(url)
}

// Auto-generate on change
watch([selectedTemplates, customRules], () => {
  // Trigger computed update
}, { deep: true })
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300 block;
}
.input {
  @apply bg-black text-white border-2 border-gray-700 rounded-lg px-3 py-2 w-full;
  @apply focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all;
}
textarea.input {
  @apply resize-y;
}
.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg;
}
.btn-small {
  @apply bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-lg text-xs text-white transition-colors;
}
.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}
.mono-box {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto;
}
input[type="checkbox"] {
  @apply w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500;
}
code {
  @apply bg-gray-800 px-1 py-0.5 rounded text-xs;
}
</style>
