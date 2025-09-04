<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-10">
    <h1 class="text-3xl font-bold text-white">🤖 Can AI Be Hacked? Exploring the Risks with Jason Haddix</h1>

    <p class="text-gray-300">
      In a world increasingly reliant on large language models and agent frameworks, a fundamental question arises:
      <strong class="text-white">can artificial intelligence be hacked?</strong> According to elite ethical hacker <a class="text-indigo-400 underline" href="https://x.com/Jhaddix" target="_blank">Jason Haddix</a>, the answer is a resounding yes — and it's already happening.
    </p>

    <h2 class="text-xl font-semibold text-white">🎯 The Threat Landscape: Beyond Prompt Injection</h2>
    <p class="text-gray-300">
      Many developers think the only danger lies in <em>prompt injection</em>. But Haddix's recent research paints a broader and more urgent picture. AI apps are vulnerable not only to manipulated inputs, but also to:
    </p>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>Data exfiltration through user queries</li>
      <li>Abuse of tool/function calls inside agents</li>
      <li>Unauthorized lateral movement across platforms (e.g., Slack to Salesforce)</li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🧪 The Six-Part AI Pentest Project</h2>
    <p class="text-gray-300">
      Jason developed a structured penetration testing approach for AI systems. This includes reconnaissance, input manipulation, agent analysis, tool misuse, data abuse, and output inspection.
      Think of it as a full-blown AI security audit — from model behaviors to the broader API ecosystem.
    </p>

    <h2 class="text-xl font-semibold text-white">🎮 Prompt Injection Practice: The Gandalf Game</h2>
    <p class="text-gray-300">
      Want to experience prompt injection firsthand? Try <a class="text-indigo-400 underline" href="https://gandalf.lakera.ai/baseline" target="_blank">Gandalf</a>, an educational game where your goal is to bypass increasingly complex guardrails.
      It’s fun, addictive, and scarily realistic.
    </p>

    <h2 class="text-xl font-semibold text-white">🧠 Weird Tricks: Emoji Smuggling, Link Injections & More</h2>
    <p class="text-gray-300">
      Some of the most fascinating exploits involve unexpected formats: emoji, markdown, hidden hyperlinks, or even encoded payloads inside harmless-looking messages.
      These are real-world attack vectors, seen in tools like Slack bots or customer support AIs.
    </p>

    <h2 class="text-xl font-semibold text-white">🚨 Real Incidents: Slack Salesbots & Salesforce Leaks</h2>
    <p class="text-gray-300">
      Jason shares examples where AI agents in corporate environments accidentally leaked sensitive data or performed unauthorized actions.
      The combination of human-like interfaces and backend permissions makes this especially dangerous.
    </p>

    <h2 class="text-xl font-semibold text-white">🛡 Defending Against AI Attacks</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>Web security best practices still apply: validate, sanitize, authenticate</li>
      <li>Output filtering and sandboxing to contain model hallucinations</li>
      <li>Least privilege access for all data and API integrations</li>
      <li>Implement an I/O-level "AI Firewall" to monitor behaviors</li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🧰 Tools & Frameworks Mentioned</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li><a class="text-indigo-400 underline" href="https://github.com/elder-plinius" target="_blank">Pliney’s GitHub</a> open-source tools for AI testing</li>
      <li>MCP (Model Context Protocol) – defines how models interact with data/tools</li>
      <li>Agent frameworks – LangChain, AutoGPT, etc.</li>
    </ul>

    <h2 class="text-xl font-semibold text-white">📽 Watch the Full Interview</h2>
    <p class="text-gray-300">
      <a class="text-indigo-400 underline" href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE" target="_blank">
        ▶️ The AI Attack Blueprint – Interview with Jason Haddix
      </a>
    </p>

    <h2 class="text-xl font-semibold text-white">📚 Want to Go Deeper?</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li><a class="text-indigo-400 underline" href="https://www.arcanum-sec.com/training/ai-hacking" target="_blank">Jason’s AI Hacking Course</a></li>
      <li><a class="text-indigo-400 underline" href="https://www.arcanum-sec.com/training/career" target="_blank">Hack Your Career</a></li>
      <li><a class="text-indigo-400 underline" href="https://www.arcanum-sec.com" target="_blank">All Courses at Arcanum Security</a></li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🧑‍💻 Final Thoughts</h2>
    <p class="text-gray-300">
      AI offers incredible capabilities, but also new attack surfaces. If you’re building with LLMs in 2025, make sure security is part of your stack. Stay informed, stay ethical, and stay prepared.
    </p>
  </div>
</template>

<script setup lang="ts">
// Static article, no interactivity required
</script>

<style scoped>
/* Tailwind only */
</style>
