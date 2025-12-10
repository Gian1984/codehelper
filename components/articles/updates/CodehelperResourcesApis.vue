<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-8">
    <h2 class="text-3xl font-bold text-white">🚀 CodeHelper Expands: 800+ Resources & 400+ Public APIs Now Available</h2>

    <p class="text-gray-300 text-base leading-relaxed">
      CodeHelper has evolved beyond privacy-first tools! We're excited to announce <strong class="text-white">two major new sections</strong> that make CodeHelper your complete developer hub:
      <strong class="text-white">800+ curated external resources</strong> and <strong class="text-white">400+ public APIs</strong>—all organized, searchable, and ready to accelerate your workflow.
    </p>

    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <p class="text-sm text-gray-400 mb-2">✨ What's New in CodeHelper:</p>
      <ul class="text-sm font-mono text-green-400 space-y-1">
        <li>🎨 800+ External Resources — Colors, icons, fonts, UI libraries, design tools & more</li>
        <li>🔌 400+ Public APIs — Across 40 categories with advanced filtering</li>
        <li>🔍 Smart Search & Filtering — Find exactly what you need instantly</li>
        <li>📚 Organized by Category — 31 resource categories + 40 API categories</li>
        <li>🏷️ Quick Guide Sections — Know when to use internal vs external tools</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">🎨 External Resources Directory</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      Browse <strong class="text-white">800+ hand-picked developer resources</strong> across <strong class="text-white">31 categories</strong>.
      From color palette generators to React UI libraries, we've curated the best tools the web has to offer.
    </p>

    <div class="grid md:grid-cols-2 gap-4 text-gray-300">
      <div class="bg-gray-700 p-5 rounded shadow">
        <p class="font-semibold text-white mb-2">🎨 Design Assets</p>
        <ul class="text-sm space-y-1">
          <li>• Colors (64 tools)</li>
          <li>• Icons (52 tools)</li>
          <li>• Fonts (36 tools)</li>
          <li>• Stock photos & videos</li>
          <li>• Vectors & illustrations</li>
        </ul>
      </div>
      <div class="bg-gray-700 p-5 rounded shadow">
        <p class="font-semibold text-white mb-2">⚛️ UI Libraries</p>
        <ul class="text-sm space-y-1">
          <li>• React (61 libraries)</li>
          <li>• Vue (42 libraries)</li>
          <li>• Angular, Svelte, React Native</li>
          <li>• Chart & animation libraries</li>
          <li>• UI component collections</li>
        </ul>
      </div>
      <div class="bg-gray-700 p-5 rounded shadow">
        <p class="font-semibold text-white mb-2">🎯 CSS & Frameworks</p>
        <ul class="text-sm space-y-1">
          <li>• CSS Frameworks (60 tools)</li>
          <li>• CSS animations & effects</li>
          <li>• CSS methodologies (BEM, OOCSS)</li>
          <li>• Design systems</li>
        </ul>
      </div>
      <div class="bg-gray-700 p-5 rounded shadow">
        <p class="font-semibold text-white mb-2">🛠️ Developer Tools</p>
        <ul class="text-sm space-y-1">
          <li>• Online design tools (64)</li>
          <li>• Chrome extensions</li>
          <li>• HTML/CSS templates</li>
          <li>• Image compression & optimization</li>
        </ul>
      </div>
    </div>

    <div class="bg-indigo-900/20 border-l-4 border-indigo-500 p-4">
      <p class="text-sm text-indigo-300">
        <strong>💡 Smart Guidance:</strong> Each resource category includes a <strong>"Quick Guide"</strong> section that explains when to use CodeHelper's
        privacy-first tools vs when external tools might be better for your specific use case.
      </p>
    </div>

    <h2 class="text-xl font-semibold text-white">🔌 Public APIs Directory</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      Discover <strong class="text-white">400+ free public APIs</strong> across <strong class="text-white">40 categories</strong>—from development and finance to music and health.
      Each API is documented with authentication requirements, HTTPS support, and CORS availability.
    </p>

    <div class="grid md:grid-cols-2 gap-4 text-gray-300">
      <div class="bg-gray-700 p-5 rounded shadow">
        <p class="font-semibold text-white mb-2">💻 Development & Tech</p>
        <ul class="text-sm space-y-1">
          <li>• Development APIs (120+)</li>
          <li>• Programming & open-source</li>
          <li>• CI/CD & DevOps</li>
          <li>• Cloud services</li>
          <li>• Authentication & security</li>
        </ul>
      </div>
      <div class="bg-gray-700 p-5 rounded shadow">
        <p class="font-semibold text-white mb-2">💰 Finance & Data</p>
        <ul class="text-sm space-y-1">
          <li>• Finance & banking</li>
          <li>• Cryptocurrency & blockchain</li>
          <li>• Currency exchange rates</li>
          <li>• Open data & government</li>
          <li>• Patents & business</li>
        </ul>
      </div>
      <div class="bg-gray-700 p-5 rounded shadow">
        <p class="font-semibold text-white mb-2">🎵 Media & Entertainment</p>
        <ul class="text-sm space-y-1">
          <li>• Music APIs (33)</li>
          <li>• News & books</li>
          <li>• Games & comics</li>
          <li>• Anime & entertainment</li>
          <li>• Photography & art</li>
        </ul>
      </div>
      <div class="bg-gray-700 p-5 rounded shadow">
        <p class="font-semibold text-white mb-2">🌍 Location & Services</p>
        <ul class="text-sm space-y-1">
          <li>• Geocoding & maps</li>
          <li>• Weather & environment</li>
          <li>• Events & calendar</li>
          <li>• Food & drink</li>
          <li>• Health & science</li>
        </ul>
      </div>
    </div>

    <h2 class="text-xl font-semibold text-white">🔍 Advanced Filtering & Search</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      Finding the right API has never been easier. Our advanced filtering system lets you narrow down APIs based on your exact requirements.
    </p>

    <div class="bg-gray-900 border border-gray-700 rounded-lg p-5">
      <p class="font-semibold text-white mb-3">Filter APIs by:</p>
      <ul class="grid md:grid-cols-3 gap-3 text-sm text-gray-300">
        <li class="bg-gray-800 p-3 rounded">
          <span class="text-green-400 font-semibold">🔓 No Auth Required</span>
          <p class="text-xs mt-1">Quick integration without API keys</p>
        </li>
        <li class="bg-gray-800 p-3 rounded">
          <span class="text-blue-400 font-semibold">🔒 HTTPS Only</span>
          <p class="text-xs mt-1">Secure, encrypted connections</p>
        </li>
        <li class="bg-gray-800 p-3 rounded">
          <span class="text-purple-400 font-semibold">🌐 CORS Enabled</span>
          <p class="text-xs mt-1">Works from browser JavaScript</p>
        </li>
      </ul>
      <div class="mt-4 p-3 bg-gray-800 rounded">
        <p class="text-sm text-gray-300">
          <strong class="text-white">Smart Search:</strong> Search by API name, description, or keywords. Results update instantly as you type.
        </p>
      </div>
    </div>

    <h2 class="text-xl font-semibold text-white">📊 The Numbers</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5 text-center">
        <p class="text-3xl font-bold text-indigo-400">100+</p>
        <p class="text-sm text-gray-400 mt-1">Privacy-First Tools</p>
      </div>
      <div class="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5 text-center">
        <p class="text-3xl font-bold text-purple-400">800+</p>
        <p class="text-sm text-gray-400 mt-1">External Resources</p>
      </div>
      <div class="bg-pink-900/30 border border-pink-500/50 rounded-lg p-5 text-center">
        <p class="text-3xl font-bold text-pink-400">400+</p>
        <p class="text-sm text-gray-400 mt-1">Public APIs</p>
      </div>
      <div class="bg-green-900/30 border border-green-500/50 rounded-lg p-5 text-center">
        <p class="text-3xl font-bold text-green-400">71</p>
        <p class="text-sm text-gray-400 mt-1">Total Categories</p>
      </div>
    </div>

    <h2 class="text-xl font-semibold text-white">🎯 Why This Matters</h2>
    <div class="bg-gray-700 p-5 rounded shadow">
      <p class="text-gray-300 text-base leading-relaxed">
        CodeHelper's mission has always been to <strong class="text-white">accelerate developer workflows</strong> while <strong class="text-white">respecting your privacy</strong>.
        With these new directories, we're not just offering tools—we're providing <strong class="text-white">curated knowledge</strong> about the entire developer ecosystem.
      </p>
      <ul class="mt-4 space-y-2 text-sm text-gray-300">
        <li class="flex items-start gap-2">
          <span class="text-indigo-400 mt-1">✓</span>
          <span><strong class="text-white">Save Time:</strong> No more endless Google searches. Everything is organized and ready to use.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-400 mt-1">✓</span>
          <span><strong class="text-white">Make Better Choices:</strong> Quick guides help you pick the right tool for each situation.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-400 mt-1">✓</span>
          <span><strong class="text-white">Discover New Tools:</strong> Explore categories you didn't know existed.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-indigo-400 mt-1">✓</span>
          <span><strong class="text-white">Stay Updated:</strong> We maintain and update the directories regularly.</span>
        </li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">🚀 Getting Started</h2>
    <div class="grid md:grid-cols-3 gap-4">
      <a href="https://codehelper.me/resources" target="_blank" rel="noopener"
         class="block bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-2 border-purple-500/50 hover:border-purple-500 rounded-lg p-6 transition">
        <div class="text-2xl mb-2">🎨</div>
        <h3 class="text-lg font-semibold text-white mb-2">Browse Resources</h3>
        <p class="text-sm text-gray-300 mb-3">Explore 800+ tools across 31 categories</p>
        <span class="text-sm text-purple-400 font-medium">Go to Resources →</span>
      </a>

      <a href="https://codehelper.me/resources/apis" target="_blank" rel="noopener"
         class="block bg-gradient-to-br from-pink-900/30 to-pink-800/20 border-2 border-pink-500/50 hover:border-pink-500 rounded-lg p-6 transition">
        <div class="text-2xl mb-2">🔌</div>
        <h3 class="text-lg font-semibold text-white mb-2">Discover APIs</h3>
        <p class="text-sm text-gray-300 mb-3">Find 400+ APIs with advanced filters</p>
        <span class="text-sm text-pink-400 font-medium">Go to APIs →</span>
      </a>

      <a href="https://codehelper.me/tools" target="_blank" rel="noopener"
         class="block bg-gradient-to-br from-indigo-900/30 to-indigo-800/20 border-2 border-indigo-500/50 hover:border-indigo-500 rounded-lg p-6 transition">
        <div class="text-2xl mb-2">🛠️</div>
        <h3 class="text-lg font-semibold text-white mb-2">Use Our Tools</h3>
        <p class="text-sm text-gray-300 mb-3">100+ privacy-first utilities</p>
        <span class="text-sm text-indigo-400 font-medium">Browse Tools →</span>
      </a>
    </div>

    <div class="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-white mb-2">💬 We'd Love Your Feedback!</h3>
      <p class="text-gray-300 text-sm mb-3">
        These new features represent months of curation and development. Have suggestions? Found a broken link?
        Want to recommend a tool or API? We're all ears!
      </p>
      <a href="https://github.com/Gian1984/codehelper/issues" target="_blank" rel="noopener"
         class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg transition text-sm font-medium">
        Open an Issue on GitHub →
      </a>
    </div>

    <div class="border-t border-gray-700 pt-6">
      <p class="text-gray-400 text-sm italic">
        CodeHelper remains <strong class="text-white">100% free</strong>, <strong class="text-white">open-source</strong>, and
        committed to <strong class="text-white">privacy-first</strong> principles. Our internal tools process everything client-side,
        and our resource directories help you make informed choices without tracking or data collection.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// This component does not require any reactive state
</script>
