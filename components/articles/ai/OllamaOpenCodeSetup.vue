<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-8">
    <h2 class="text-3xl font-bold text-white">Local AI Coding Setup: Ollama + OpenCode (macOS Terminal)</h2>

    <p class="text-gray-300 text-base leading-relaxed">
      Want a <strong class="text-white">fully local AI coding agent</strong> running in your terminal with zero cloud dependencies?
      This guide walks you through setting up <strong class="text-white">Ollama</strong> (local LLM runner) and <strong class="text-white">OpenCode</strong> (open-source AI coding agent)
      on macOS with Apple Silicon. The result: agentic coding capabilities, tool use, multi-model support, all running on your machine.
    </p>

    <div class="bg-indigo-900/30 border border-indigo-600/50 rounded-lg p-4">
      <p class="text-sm text-gray-300">
        <strong class="text-indigo-400">Previously on CodeHelper:</strong> We covered
        <a href="https://codehelper.me/articles/mlx-terminal-code/" class="text-indigo-400 hover:underline" target="_blank" rel="noopener">MLX-CODE</a>,
        a Python-based local AI coding assistant using Apple's MLX framework directly. This guide takes a different approach, using <strong class="text-white">Ollama</strong> as the model server
        and <strong class="text-white">OpenCode</strong> as the agentic coding interface. Both are 100% local and free, but they differ in architecture, model management, and capabilities.
      </p>
    </div>

    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <p class="text-sm text-gray-400 mb-2">What You Get:</p>
      <ul class="text-sm font-mono text-green-400 space-y-1">
        <li>&#x2705; Fully local AI: No data sent to external servers</li>
        <li>&#x2705; Agentic coding: Tool use, file editing, plan/build modes</li>
        <li>&#x2705; Multi-model support: Switch between models instantly</li>
        <li>&#x2705; Terminal-only workflow: No GUI, no Electron, no bloat</li>
        <li>&#x2705; Open source: Both Ollama and OpenCode are free and open</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">MLX-CODE vs Ollama + OpenCode</h2>
    <p class="text-gray-300 text-sm">
      If you read our
      <a href="https://codehelper.me/articles/mlx-terminal-code/" class="text-indigo-400 hover:underline" target="_blank" rel="noopener">MLX-CODE article</a>,
      you might wonder how this setup compares. Here's a quick breakdown:
    </p>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-gray-300 border border-gray-700">
        <thead class="bg-gray-900">
          <tr>
            <th class="p-3 text-left border-b border-gray-700">Feature</th>
            <th class="p-3 text-left border-b border-gray-700">MLX-CODE</th>
            <th class="p-3 text-left border-b border-gray-700">Ollama + OpenCode</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-700">
            <td class="p-3">Runtime</td>
            <td class="p-3">Python + MLX Framework</td>
            <td class="p-3">Ollama server + Node.js CLI</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">GPU Acceleration</td>
            <td class="p-3">Apple Metal (MLX native)</td>
            <td class="p-3">Apple Metal (via llama.cpp)</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">Agentic Features</td>
            <td class="p-3">Templates, file context</td>
            <td class="p-3">Tool use, plan/build modes, undo/redo</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">Model Management</td>
            <td class="p-3">Manual HuggingFace download</td>
            <td class="p-3">One-command pull via Ollama</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">Context Window</td>
            <td class="p-3">Model-dependent</td>
            <td class="p-3">Configurable per model (up to 32K+)</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">IDE Integration</td>
            <td class="p-3">Terminal only</td>
            <td class="p-3">Terminal + IDE extensions</td>
          </tr>
          <tr>
            <td class="p-3">Best For</td>
            <td class="p-3">Quick local inference, MLX experimentation</td>
            <td class="p-3">Agentic workflows, multi-model setups</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-gray-400 text-sm mt-2">
      Both approaches are valid. MLX-CODE is lighter and more self-contained; Ollama + OpenCode is more feature-rich for agentic coding workflows.
    </p>

    <h2 class="text-xl font-semibold text-white">System Requirements</h2>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <ul class="text-sm text-gray-300 space-y-2">
        <li>&#x2705; <strong class="text-white">macOS</strong> (tested on Ventura+)</li>
        <li>&#x2705; <strong class="text-white">Apple Silicon</strong> (M1, M2, M3, M4)</li>
        <li>&#x2705; <strong class="text-white">Homebrew</strong> installed</li>
        <li>&#x2705; <strong class="text-white">Node.js / npm</strong> installed</li>
        <li>&#x2705; <strong class="text-white">8GB RAM minimum</strong> (16GB+ recommended for 7B models)</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">Step 1. Install Ollama</h2>
    <p class="text-gray-300 text-sm">Ollama is a local LLM runner that manages model downloads, serves an OpenAI-compatible API, and handles GPU acceleration automatically.</p>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap"># Install via Homebrew
brew install ollama

# Verify installation
ollama --version

# Start the server (keep running in a terminal tab)
ollama serve</pre>
    </div>
    <p class="text-gray-400 text-sm mt-2">Keep <code class="text-green-400">ollama serve</code> running, OpenCode connects to it via the local API.</p>

    <h2 class="text-xl font-semibold text-white">Step 2. Download Coding Models</h2>
    <p class="text-gray-300 text-sm">Pull one or more models optimized for code generation:</p>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap"># Recommended, best quality/speed balance
ollama pull qwen2.5-coder:7b

# Alternatives
ollama pull deepseek-coder:6.7b
ollama pull codellama:7b

# List installed models
ollama list

# Remove a model
ollama rm model-name</pre>
    </div>

    <h2 class="text-xl font-semibold text-white">Step 3. Verify the Ollama API</h2>
    <p class="text-gray-300 text-sm">Ollama exposes two endpoints. OpenCode uses the OpenAI-compatible one:</p>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap"># Check Ollama native API
curl http://localhost:11434/api/tags

# Check OpenAI-compatible endpoint (used by OpenCode)
curl http://localhost:11434/v1/models</pre>
    </div>
    <div class="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-3 mt-3">
      <p class="text-sm text-yellow-300"><strong>Important:</strong> OpenCode requires the <code class="text-yellow-200">/v1</code> endpoint (<code class="text-yellow-200">http://localhost:11434/v1</code>), not the native Ollama API. It uses the <code class="text-yellow-200">@ai-sdk/openai-compatible</code> package internally.</p>
    </div>

    <h2 class="text-xl font-semibold text-white">Step 4. Configure Model Context Window</h2>
    <p class="text-gray-300 text-sm">Ollama defaults to a 4K context window, which is too small for agentic coding. You need at least 16K:</p>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap"># Create a 16K context variant
ollama run qwen2.5-coder:7b
/set parameter num_ctx 16384
/save qwen2.5-coder:7b-16k
/bye

# For even better results (if you have 16GB+ RAM)
ollama run qwen2.5-coder:7b
/set parameter num_ctx 32768
/save qwen2.5-coder:7b-32k
/bye</pre>
    </div>
    <p class="text-gray-400 text-sm mt-2">This creates new model variants with the increased context. Use these names in your OpenCode config.</p>

    <h2 class="text-xl font-semibold text-white">Step 5. Test the Model</h2>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap"># Interactive chat to verify it works
ollama run qwen2.5-coder:7b-16k

# Try a coding prompt
&gt; write a debounce function in typescript

# Exit
/bye</pre>
    </div>

    <h2 class="text-xl font-semibold text-white">Step 6. Install OpenCode</h2>
    <p class="text-gray-300 text-sm">
      <a href="https://opencode.ai/docs/" class="text-indigo-400 hover:underline" target="_blank" rel="noopener">OpenCode</a>
      is an open-source AI coding agent with a terminal TUI, plan/build modes, tool use, and undo/redo. Install globally via npm:
    </p>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap"># Install globally
npm install -g opencode-ai

# Verify
opencode --help</pre>
    </div>
    <p class="text-gray-400 text-sm mt-2">Other install methods: Homebrew (<code class="text-green-400">brew install opencode</code>), Bun, pnpm, Yarn, or Docker.</p>

    <h2 class="text-xl font-semibold text-white">Step 7. Connect OpenCode to Ollama</h2>
    <p class="text-gray-300 text-sm mb-3">Create the configuration file to connect OpenCode to your local Ollama instance:</p>

    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap"># Create config directory
mkdir -p ~/.config/opencode

# Create config file
nano ~/.config/opencode/opencode.json</pre>
    </div>

    <p class="text-gray-300 text-sm mt-4 mb-2">Paste this configuration:</p>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap">{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama",
      "options": {
        "baseURL": "http://localhost:11434/v1"
      },
      "models": {
        "qwen2.5-coder:7b-16k": {
          "tools": true
        }
      }
    }
  },
  "model": "ollama/qwen2.5-coder:7b-16k"
}</pre>
    </div>

    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
      <p class="text-sm text-gray-400 mb-2">Key configuration notes:</p>
      <ul class="text-sm text-gray-300 space-y-1">
        <li><strong class="text-white">Config path:</strong> <code class="text-green-400">~/.config/opencode/opencode.json</code> (not ~/.opencode/)</li>
        <li><strong class="text-white">npm package:</strong> Uses <code class="text-green-400">@ai-sdk/openai-compatible</code> to talk to Ollama</li>
        <li><strong class="text-white">baseURL:</strong> Must include <code class="text-green-400">/v1</code>, this is required</li>
        <li><strong class="text-white">"tools": true</strong> enables function calling for agentic features (file editing, commands)</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">Step 8. Use OpenCode</h2>
    <p class="text-gray-300 text-sm">Navigate to any project and launch:</p>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap">cd /path/to/your/project
opencode .</pre>
    </div>

    <h2 class="text-xl font-semibold text-white">OpenCode Key Features</h2>
    <ul class="grid md:grid-cols-2 gap-4 text-gray-300">
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Plan Mode</p>
        <p class="text-sm mt-1">Press <code class="text-green-400">Tab</code> to toggle. Generates implementation strategies without modifying code. Great for reasoning through complex tasks first.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Build Mode</p>
        <p class="text-sm mt-1">The default mode. OpenCode reads, writes, and modifies files in your project with tool use capabilities.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Undo / Redo</p>
        <p class="text-sm mt-1">Use <code class="text-green-400">/undo</code> and <code class="text-green-400">/redo</code> to revert or restore changes. Safe experimentation.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">File References</p>
        <p class="text-sm mt-1">Press <code class="text-green-400">@</code> to fuzzy-search and attach project files to your prompt. Context-aware conversations.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">AGENTS.md</p>
        <p class="text-sm mt-1">Run <code class="text-green-400">/init</code> to generate an AGENTS.md file. OpenCode learns your project patterns and conventions.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Share Conversations</p>
        <p class="text-sm mt-1">Use <code class="text-green-400">/share</code> to create a shareable link of your conversation for team collaboration.</p>
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">Multi-Model Configuration</h2>
    <p class="text-gray-300 text-sm">Add multiple models and switch between them with <code class="text-green-400">Ctrl+A</code>:</p>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap">{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama",
      "options": {
        "baseURL": "http://localhost:11434/v1"
      },
      "models": {
        "qwen2.5-coder:7b-16k": {
          "tools": true
        },
        "deepseek-coder:6.7b": {
          "tools": true
        },
        "codellama:7b": {
          "tools": true
        }
      }
    }
  },
  "model": "ollama/qwen2.5-coder:7b-16k",
  "small_model": "ollama/codellama:7b"
}</pre>
    </div>
    <p class="text-gray-400 text-sm mt-2">The <code class="text-green-400">small_model</code> is used for lightweight tasks like generating titles or summaries.</p>

    <h2 class="text-xl font-semibold text-white">Recommended Models by Task</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-gray-300 border border-gray-700">
        <thead class="bg-gray-900">
          <tr>
            <th class="p-3 text-left border-b border-gray-700">Task</th>
            <th class="p-3 text-left border-b border-gray-700">Model</th>
            <th class="p-3 text-left border-b border-gray-700">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-700 bg-indigo-900/20">
            <td class="p-3"><strong class="text-indigo-400">General coding</strong></td>
            <td class="p-3">qwen2.5-coder:7b</td>
            <td class="p-3">Best quality/speed balance</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">WordPress / PHP</td>
            <td class="p-3">deepseek-coder:6.7b</td>
            <td class="p-3">Strong PHP performance</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3">Low RAM / Fast</td>
            <td class="p-3">codellama:7b</td>
            <td class="p-3">Lighter model, 8GB OK</td>
          </tr>
          <tr>
            <td class="p-3">Heavy quality</td>
            <td class="p-3">qwen2.5-coder:32b</td>
            <td class="p-3">Needs 32GB+ RAM</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-gray-400 text-sm mt-2">Remember to create 16K+ context variants for each model you use with agentic workflows.</p>

    <h2 class="text-xl font-semibold text-white">Troubleshooting</h2>
    <div class="space-y-4">
      <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
        <p class="text-sm font-semibold text-white mb-2">OpenCode doesn't find models</p>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>&#x2022; Make sure <code class="text-green-400">ollama serve</code> is running</li>
          <li>&#x2022; Check baseURL is <code class="text-green-400">http://localhost:11434/v1</code></li>
          <li>&#x2022; Verify model name matches exactly: <code class="text-green-400">ollama list</code></li>
        </ul>
      </div>
      <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
        <p class="text-sm font-semibold text-white mb-2">Tool calls not working</p>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>&#x2022; Context window too small, increase <code class="text-green-400">num_ctx</code> to 16K+</li>
          <li>&#x2022; Model doesn't support tools well, try <code class="text-green-400">qwen2.5-coder</code></li>
        </ul>
      </div>
      <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
        <p class="text-sm font-semibold text-white mb-2">Config errors</p>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>&#x2022; Check JSON syntax (no trailing commas)</li>
          <li>&#x2022; Use the <code class="text-green-400">$schema</code> for validation</li>
          <li>&#x2022; Test Ollama: <code class="text-green-400">curl http://localhost:11434/api/tags</code></li>
        </ul>
      </div>
    </div>

    <h2 class="text-xl font-semibold text-white">Quick Reference Commands</h2>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap"># Ollama
ollama serve                          # Start server
ollama list                           # List models
ollama pull qwen2.5-coder:7b          # Download model
ollama rm model-name                  # Remove model
curl http://localhost:11434/api/tags   # Check status
curl http://localhost:11434/v1/models  # OpenAI-compatible check

# OpenCode
opencode .                            # Launch in current project
/init                                 # Generate AGENTS.md
/undo                                 # Undo last change
/redo                                 # Redo last change
/share                                # Share conversation
/help                                 # List all commands
Tab                                   # Toggle plan/build mode
Ctrl+A                                # Switch models
@                                     # Fuzzy-search project files</pre>
    </div>

    <h2 class="text-xl font-semibold text-white">Conclusion</h2>
    <p class="text-gray-300">
      With Ollama and OpenCode you get a <strong class="text-white">fully local, privacy-first AI coding agent</strong> with agentic capabilities
      that rival cloud-based tools. No API keys, no subscriptions, no data leaving your machine.
    </p>
    <p class="text-gray-300 mt-3">
      If you're already using
      <a href="https://codehelper.me/articles/mlx-terminal-code/" class="text-indigo-400 hover:underline" target="_blank" rel="noopener">MLX-CODE</a>
      for quick local inference, consider adding Ollama + OpenCode to your toolkit for more complex agentic workflows.
      Both tools complement each other: MLX-CODE for lightweight, GPU-native inference and OpenCode for full-featured coding agent capabilities.
    </p>

    <h2 class="text-xl font-semibold text-white">Resources</h2>
    <ul class="grid md:grid-cols-2 gap-4 text-gray-300">
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white"><a class="text-indigo-400 hover:underline" href="https://opencode.ai/docs/" target="_blank" rel="noopener">OpenCode Documentation</a></p>
        <p class="text-sm mt-1">Official docs for installation, configuration, providers, and commands.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white"><a class="text-indigo-400 hover:underline" href="https://docs.ollama.com/" target="_blank" rel="noopener">Ollama Documentation</a></p>
        <p class="text-sm mt-1">Model library, API reference, and advanced configuration.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white"><a class="text-indigo-400 hover:underline" href="https://github.com/p-lemonish/ollama-x-opencode" target="_blank" rel="noopener">Ollama x OpenCode Guide</a></p>
        <p class="text-sm mt-1">Community guide for connecting Ollama with OpenCode.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white"><a class="text-indigo-400 hover:underline" href="https://github.com/Gian1984/ai-terminal-coding" target="_blank" rel="noopener">AI Terminal Coding (GitHub)</a></p>
        <p class="text-sm mt-1">Full setup instructions and configuration files for the Ollama + OpenCode workflow covered in this article.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white"><a class="text-indigo-400 hover:underline" href="https://github.com/Gian1984/MLX-Terminal-Code" target="_blank" rel="noopener">MLX-Terminal-Code (GitHub)</a></p>
        <p class="text-sm mt-1">Source code and setup for MLX-CODE, the local AI coding assistant covered in our <a class="text-indigo-400 hover:underline" href="https://codehelper.me/articles/mlx-terminal-code/" target="_blank" rel="noopener">previous article</a>.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white"><a class="text-indigo-400 hover:underline" href="https://codehelper.me/articles/mlx-terminal-code/" target="_blank" rel="noopener">MLX-CODE on CodeHelper</a></p>
        <p class="text-sm mt-1">Our previous article on local AI coding with Apple's MLX framework.</p>
      </li>
    </ul>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
// Purely presentational
</script>

<style scoped>
/* No custom styles needed */
</style>
