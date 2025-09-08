<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-10">
    <h1 class="text-3xl font-bold text-white">
      🤖 Can AI Be Hacked? Real-World Risks, Tactics & Defenses with Jason Haddix
    </h1>

    <p class="text-gray-300">
      As <strong class="text-white">LLMs</strong> and agent frameworks power more products, the question isn’t
      “<em>can</em> they be hacked?” but <strong class="text-white">how</strong>. Veteran ethical hacker
      <a
          class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400"
          href="https://x.com/Jhaddix"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Jason Haddix on X (opens in a new tab)"
      >Jason Haddix</a>
      shows that attacks go far beyond simple prompt injection—touching data access, tool abuse, and cross-system pivoting.
    </p>

    <h2 class="text-xl font-semibold text-white">🎯 The Threat Landscape: Beyond Prompt Injection</h2>
    <p class="text-gray-300">
      Many teams fixate on input prompts, but the broader attack surface includes model I/O and the
      <strong class="text-white">tools</strong> agents can invoke. Common risks:
    </p>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li><strong>Data exfiltration:</strong> eliciting secrets via cleverly crafted queries or “role-play”.</li>
      <li><strong>Tool/function abuse:</strong> convincing the agent to call dangerous tools (e.g., webhooks, file I/O).</li>
      <li><strong>Lateral movement:</strong> pivoting across platforms (e.g., Slack → CRM) using the agent’s credentials.</li>
    </ul>
    <p class="text-gray-300">
      For a broader taxonomy, see the
      <a
          href="https://owasp.org/www-project-top-10-for-large-language-model-applications/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
      >OWASP Top 10 for LLM Applications</a>.
    </p>

    <h2 class="text-xl font-semibold text-white">🧪 A Practical AI Pentest Approach</h2>
    <p class="text-gray-300">
      Jason’s structured approach resembles a full application security review—just adapted for LLMs:
    </p>
    <ol class="list-decimal list-inside text-gray-300 space-y-1">
      <li><strong>Recon:</strong> enumerate model versions, system prompts, tools, data sources, guardrails.</li>
      <li><strong>Input manipulation:</strong> jailbreaks, instruction override, content smuggling.</li>
      <li><strong>Agent analysis:</strong> tool catalog, auth scopes, output-to-tool routing.</li>
      <li><strong>Tool misuse:</strong> induce unintended calls (HTTP, filesystem, shell-like tools).</li>
      <li><strong>Data abuse:</strong> escalate context grants; scrape PII, secrets, embeddings.</li>
      <li><strong>Output inspection:</strong> poisoned links, hidden markup, SSRF-like egress patterns.</li>
    </ol>

    <h2 class="text-xl font-semibold text-white">🎮 Train Against Prompt Injection: Gandalf</h2>
    <p class="text-gray-300">
      Try
      <a
          class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
          href="https://gandalf.lakera.ai/baseline"
          target="_blank"
          rel="noopener noreferrer"
      >Lakera’s Gandalf</a>
      to experience iterative jailbreaks. It’s a safe way to build intuition for defensive patterns.
    </p>

    <h2 class="text-xl font-semibold text-white">🧠 Odd but Effective Tricks Attackers Use</h2>
    <p class="text-gray-300">
      Real incidents often leverage unexpected formats:
    </p>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li><strong>Emoji / homoglyph smuggling:</strong> bypass naive filters with visually similar characters.</li>
      <li><strong>Hidden hyperlinks:</strong> malicious URLs in markdown/HTML the agent can “follow”.</li>
      <li><strong>Encoded payloads:</strong> base64 / hex to hide instructions inside “data”.</li>
      <li><strong>Adversarial markup:</strong> CSS/HTML that changes meaning post-render.</li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🚨 Real-World Failures: Where Agents Go Wrong</h2>
    <p class="text-gray-300">
      In enterprise settings, “helpful” agents with broad permissions can leak customer data, create unauthorized tickets,
      or sync private notes into public systems. The human-like interface + backend keys = high blast radius.
    </p>

    <h2 class="text-xl font-semibold text-white">🛡 A Practical Defense Stack</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li><strong>Classical web security still applies:</strong> validate inputs, sanitize outputs, authenticate, authorize.</li>
      <li><strong>Policy + output filters:</strong> separate system prompts from user content; verify tool arguments and destinations.</li>
      <li><strong>Sandboxing:</strong> run tools in isolated environments; block egress by default, allowlist domains.</li>
      <li><strong>Least privilege:</strong> scoped API keys, per-tool permissions, expirations, and just-in-time grants.</li>
      <li><strong>Observability:</strong> full I/O logging, replay, anomaly detection, rate limits, and circuit breakers.</li>
      <li><strong>Model Context Protocol (MCP):</strong> standardize tool/data access with explicit, reviewable capabilities —
        see
        <a
            href="https://modelcontextprotocol.io/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
        >modelcontextprotocol.io</a>.
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🧰 Tools &amp; Frameworks Mentioned</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
            href="https://github.com/elder-plinius"
            target="_blank"
            rel="noopener noreferrer"
        >Pliney’s GitHub</a> — open-source AI testing utilities.
      </li>
      <li>Agent frameworks: LangChain, AutoGPT, etc. (audit tool catalogs and auth scopes).</li>
      <li>
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
            href="https://owasp.org/www-project-top-10-for-large-language-model-applications/"
            target="_blank"
            rel="noopener noreferrer"
        >OWASP LLM Top 10</a> — shared vocabulary for risks and mitigations.
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">📽 Watch the Interview</h2>
    <p class="text-gray-300">
      <a
          class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
          href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch The AI Attack Blueprint – Interview with Jason Haddix on YouTube (opens in a new tab)"
      >▶️ The AI Attack Blueprint – Interview with Jason Haddix</a>
    </p>

    <h2 class="text-xl font-semibold text-white">📚 Go Deeper</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
            href="https://www.arcanum-sec.com/training/ai-hacking"
            target="_blank"
            rel="noopener noreferrer"
        >Jason’s AI Hacking Course</a>
      </li>
      <li>
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
            href="https://www.arcanum-sec.com/training/career"
            target="_blank"
            rel="noopener noreferrer"
        >Hack Your Career</a>
      </li>
      <li>
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
            href="https://www.arcanum-sec.com"
            target="_blank"
            rel="noopener noreferrer"
        >All Courses at Arcanum Security</a>
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🧑‍💻 Final Thoughts</h2>
    <p class="text-gray-300">
      AI supercharges productivity—and the attack surface. Treat LLMs like powerful,
      <strong class="text-white">untrusted inputs</strong> with tool access. Invest in policies, sandboxes, and
      observability before incidents, not after.
    </p>
  </div>
</template>

<script setup lang="ts">
// Static article — no interactivity required
</script>

<style scoped>
/* Tailwind only; links are underlined with high-contrast hover states and focus-visible rings for accessibility */
</style>
