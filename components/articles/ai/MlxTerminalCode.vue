<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-8">
    <h2 class="text-3xl font-bold text-white">🤖 MLX-CODE: 100% Local AI Coding Assistant for macOS</h2>

    <p class="text-gray-300 text-base leading-relaxed">
      MLX-CODE is a <strong class="text-white">privacy-focused local AI coding assistant</strong> that runs entirely on your Mac using Apple's MLX framework.
      Think of it as a self-hosted alternative to GitHub Copilot or Claude Code, but with <strong class="text-white">full project context awareness</strong> and intelligent file handling—completely offline and free.
    </p>

    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <p class="text-sm text-gray-400 mb-2">🔒 What Makes MLX-CODE Special:</p>
      <ul class="text-sm font-mono text-green-400 space-y-1">
        <li>✅ 100% Local & Private — No data sent to external servers</li>
        <li>✅ Intelligent Context — Automatically loads project files</li>
        <li>✅ GPU Accelerated — Uses Apple Silicon GPU for fast inference</li>
        <li>✅ Auto-Backup — Every file modification is backed up automatically</li>
        <li>✅ 20+ AI Models — Qwen, DeepSeek, Llama 3, CodeLlama, Mistral</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">⚡ Key Features</h2>
    <ul class="grid md:grid-cols-2 gap-4 text-gray-300">
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">🧠 Intelligent File Reading (V2)</p>
        <p class="text-sm mt-1">Automatically loads files when you mention them in conversation. Just say "check main.py" and it reads it for you.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">📁 Project Awareness</p>
        <p class="text-sm mt-1">Understands your codebase structure, detects project type (Python, Node.js, Rust), and loads relevant config files.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">💾 Automatic Backups</p>
        <p class="text-sm mt-1">Every file modification creates a timestamped backup. Restore anytime with simple commands.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">🎨 Beautiful Diff Previews</p>
        <p class="text-sm mt-1">See exactly what will change before applying with color-coded diffs (additions, deletions, context).</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">📋 Smart Templates</p>
        <p class="text-sm mt-1">Quick workflows for testing, documentation, refactoring, code reviews, and optimization.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">⌨️ Advanced Terminal Input</p>
        <p class="text-sm mt-1">Command history with arrow keys, tab completion, multi-line paste support, and smart Ctrl+C handling.</p>
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🔧 Technology Stack</h2>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <ul class="text-sm text-gray-300 space-y-2">
        <li><strong class="text-white">MLX Framework</strong> (Apple) → Metal GPU acceleration optimized for M-series chips</li>
        <li><strong class="text-white">MLX-LM</strong> → High-performance LLM inference library</li>
        <li><strong class="text-white">Qwen2.5 Coder</strong> → State-of-the-art coding models (1.5B/3B/7B/14B/32B variants)</li>
        <li><strong class="text-white">DeepSeek-V2-Lite</strong> → Excellent code quality with 9GB model optimized for 16GB+ RAM</li>
        <li><strong class="text-white">Python 3.12</strong> → Latest stable Python with performance improvements</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">🤖 Available AI Models</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-gray-300 border border-gray-700">
        <thead class="bg-gray-900">
          <tr>
            <th class="p-3 text-left border-b border-gray-700">Model</th>
            <th class="p-3 text-left border-b border-gray-700">Size</th>
            <th class="p-3 text-left border-b border-gray-700">Quality</th>
            <th class="p-3 text-left border-b border-gray-700">RAM</th>
            <th class="p-3 text-left border-b border-gray-700">Recommended For</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-700">
            <td class="p-3">Qwen 1.5B</td>
            <td class="p-3">~1GB</td>
            <td class="p-3">⭐⭐</td>
            <td class="p-3">4GB</td>
            <td class="p-3">Demo/testing only</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">Qwen 3B</td>
            <td class="p-3">~1.9GB</td>
            <td class="p-3">⭐⭐⭐</td>
            <td class="p-3">6GB</td>
            <td class="p-3">Light coding</td>
          </tr>
          <tr class="border-b border-gray-700 bg-indigo-900/20">
            <td class="p-3"><strong class="text-indigo-400">Qwen 7B ⭐</strong></td>
            <td class="p-3">~4.3GB</td>
            <td class="p-3">⭐⭐⭐⭐</td>
            <td class="p-3">8GB</td>
            <td class="p-3"><strong>Daily development (recommended)</strong></td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">Qwen 14B</td>
            <td class="p-3">~8.5GB</td>
            <td class="p-3">⭐⭐⭐⭐⭐</td>
            <td class="p-3">16GB</td>
            <td class="p-3">Advanced projects</td>
          </tr>
          <tr class="bg-indigo-900/20">
            <td class="p-3"><strong class="text-indigo-400">DeepSeek-V2 ⭐⭐⭐</strong></td>
            <td class="p-3">~9GB</td>
            <td class="p-3">⭐⭐⭐⭐⭐</td>
            <td class="p-3">16GB</td>
            <td class="p-3"><strong>Best code quality (M1/M2/M3 16GB+)</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-xl font-semibold text-white">📦 System Requirements</h2>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <ul class="text-sm text-gray-300 space-y-2">
        <li>✅ <strong class="text-white">macOS 13.0 (Ventura)</strong> or later</li>
        <li>✅ <strong class="text-white">Apple Silicon</strong> (M1, M2, M3, or M4 chip)</li>
        <li>✅ <strong class="text-white">Python 3.12</strong> or later</li>
        <li>✅ <strong class="text-white">8GB RAM minimum</strong> (16GB+ recommended for 7B model)</li>
        <li>✅ <strong class="text-white">10GB free disk space</strong> (for models and cache)</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">🚀 Quick Installation</h2>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap"># Install Python 3.12
brew install python@3.12

# Create virtual environment
python3.12 -m venv ~/.mlx-env
source ~/.mlx-env/bin/activate

# Install dependencies
pip install mlx-lm prompt-toolkit pillow

# Create workspace
mkdir -p ~/Projects

# Download and setup MLX-CODE
# (Copy the mlx-code script to ~/mlx-code)
chmod +x ~/mlx-code

# Launch!
cd ~/Projects/your-project
~/mlx-code</pre>
    </div>

    <h2 class="text-xl font-semibold text-white">💡 Use Cases</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li><strong class="text-white">Code Generation:</strong> Create complete files, functions, classes from natural language descriptions</li>
      <li><strong class="text-white">Refactoring:</strong> Modernize legacy code, apply design patterns, improve structure</li>
      <li><strong class="text-white">Debugging:</strong> Intelligent error detection and fix suggestions with full context</li>
      <li><strong class="text-white">Documentation:</strong> Auto-generate docstrings, comments, and README files</li>
      <li><strong class="text-white">Testing:</strong> Create comprehensive unit tests with templates</li>
      <li><strong class="text-white">Code Review:</strong> Get architectural feedback and best practice recommendations</li>
    </ul>

    <h2 class="text-xl font-semibold text-white">⚡ Performance Insights</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <div class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white mb-2">M1/M2/M3 (16GB RAM)</p>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>✅ DeepSeek V2: ~1.8s response time</li>
          <li>✅ Qwen 7B: ~1.5s response time</li>
          <li>✅ Qwen 3B: ~0.8s response time</li>
          <li>⚠️ Qwen 14B: Close other apps</li>
        </ul>
      </div>
      <div class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white mb-2">M4 Pro (24GB RAM)</p>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>✅ 30-40% faster than M1/M2</li>
          <li>✅ Better memory bandwidth</li>
          <li>✅ More efficient power usage</li>
          <li>✅ DeepSeek V2: Excellent stability</li>
        </ul>
      </div>
    </div>

    <h2 class="text-xl font-semibold text-white">🔒 Privacy & Security</h2>
    <p class="text-gray-300">
      Unlike cloud-based AI coding assistants, <strong class="text-white">MLX-CODE processes everything locally</strong>:
    </p>
    <ul class="list-disc list-inside text-gray-300 space-y-1 mt-2">
      <li>No code sent to external servers</li>
      <li>No API keys or subscriptions required</li>
      <li>Works completely offline after model download</li>
      <li>Sandboxed to ~/Projects directory for safety</li>
      <li>All backups stored locally with timestamp</li>
    </ul>

    <h2 class="text-xl font-semibold text-white">💡 Tips & Best Practices</h2>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <ul class="text-sm text-gray-300 space-y-2">
        <li><strong class="text-white">Model Selection:</strong> Start with Qwen 7B for best quality/speed balance. Try DeepSeek V2 if you have 16GB+ RAM.</li>
        <li><strong class="text-white">Context Management:</strong> Mention files by name for auto-loading. Use /context commands to manage loaded files.</li>
        <li><strong class="text-white">Templates:</strong> Use /template test before writing tests, /template review for code reviews, /template doc for documentation.</li>
        <li><strong class="text-white">Download Speed:</strong> Install git-lfs for 3-5x faster model downloads: <code class="text-green-400">brew install git-lfs && git lfs install</code></li>
        <li><strong class="text-white">Keyboard Shortcuts:</strong> Install prompt-toolkit for arrow key history, tab completion, and better paste support.</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">🔄 Version Comparison</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-gray-300 border border-gray-700">
        <thead class="bg-gray-900">
          <tr>
            <th class="p-3 text-left border-b border-gray-700">Feature</th>
            <th class="p-3 text-left border-b border-gray-700">Version 1</th>
            <th class="p-3 text-left border-b border-gray-700">Version 2</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-700">
            <td class="p-3">Write/Edit Files</td>
            <td class="p-3">✅ Yes</td>
            <td class="p-3">✅ Yes</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">Auto-load Files</td>
            <td class="p-3">❌ No</td>
            <td class="p-3">✅ Yes (intelligent detection)</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">Project Context</td>
            <td class="p-3">❌ No</td>
            <td class="p-3">✅ Yes (README, package.json, etc.)</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">Image Support</td>
            <td class="p-3">❌ No</td>
            <td class="p-3">✅ Yes (with Pillow)</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">Templates</td>
            <td class="p-3">6 templates</td>
            <td class="p-3">8 templates</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">Command History</td>
            <td class="p-3">❌ No</td>
            <td class="p-3">✅ Yes (with prompt-toolkit)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-xl font-semibold text-white">🌟 Competitive Advantages</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <div class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white mb-2">vs GitHub Copilot</p>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>✅ 100% local & private</li>
          <li>✅ No subscription ($10/month saved)</li>
          <li>✅ Full project context awareness</li>
          <li>✅ Automatic backups</li>
        </ul>
      </div>
      <div class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white mb-2">vs Claude Code</p>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>✅ Works offline</li>
          <li>✅ No API costs</li>
          <li>✅ Template system</li>
          <li>✅ Colored diff preview</li>
        </ul>
      </div>
    </div>

    <h2 class="text-xl font-semibold text-white">📥 Download & Contribute</h2>
    <div class="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-600/50 rounded-lg p-6">
      <p class="text-gray-300 mb-4">
        MLX-CODE is <strong class="text-white">open source and free</strong>. Download it, try it, and help make it better!
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <a
          href="https://github.com/Gian1984/MLX-Terminal-Code"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
        <a
          href="https://github.com/Gian1984/MLX-Terminal-Code/issues"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          Report Issues / Suggest Features
        </a>
      </div>
      <p class="text-sm text-gray-400 mt-4">
        ⭐ Star the repository if you find it useful! Contributions, bug reports, and feature requests are welcome.
      </p>
    </div>

    <h2 class="text-xl font-semibold text-white">🔗 Resources & Links</h2>
    <ul class="grid md:grid-cols-2 gap-4 text-gray-300">
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">1. <a class="text-indigo-400 hover:underline" href="https://ml-explore.github.io/mlx/" target="_blank" rel="noopener">Apple MLX Documentation</a></p>
        <p class="text-sm mt-1">Official MLX framework documentation and API reference.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">2. <a class="text-indigo-400 hover:underline" href="https://github.com/ml-explore/mlx-lm" target="_blank" rel="noopener">MLX-LM GitHub</a></p>
        <p class="text-sm mt-1">High-performance LLM inference library for Apple Silicon.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">3. <a class="text-indigo-400 hover:underline" href="https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct" target="_blank" rel="noopener">Qwen2.5 Coder Models</a></p>
        <p class="text-sm mt-1">Model cards and technical details for Qwen coding models.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">4. <a class="text-indigo-400 hover:underline" href="https://docs.python.org/3.12/whatsnew/3.12.html" target="_blank" rel="noopener">Python 3.12 Features</a></p>
        <p class="text-sm mt-1">What's new in Python 3.12 with performance improvements.</p>
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">✅ Conclusion</h2>
    <p class="text-gray-300">
      MLX-CODE represents a <strong class="text-white">privacy-first approach</strong> to AI-assisted coding. By running entirely on Apple Silicon with the MLX framework,
      it delivers <strong class="text-white">fast, local inference</strong> without sacrificing code quality or compromising your data.
      Whether you're a professional developer or learning to code, MLX-CODE offers a <strong class="text-white">powerful, free alternative</strong> to cloud-based AI coding assistants.
    </p>
    <p class="text-gray-300 mt-4">
      With support for 20+ models, intelligent file context awareness, automatic backups, and a robust template system,
      MLX-CODE is the <strong class="text-white">complete local AI coding companion</strong> for macOS developers.
    </p>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
// Purely presentational
</script>

<style scoped>
/* No custom styles needed — Tailwind all the way */
</style>
