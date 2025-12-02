<template>
  <article
      class="mx-auto w-full max-w-[72ch] px-5 sm:px-6 py-6 sm:py-10 bg-gray-800 rounded-2xl shadow-2xl ring-1 ring-white/5"
  >
    <!-- intro -->
    <section class="mt-6 sm:mt-8 space-y-5">
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        As <strong class="text-white">LLMs</strong> and agent frameworks power more products, the question isn’t
        “<em>can</em> they be hacked?” but <strong class="text-white">how</strong>. Veteran ethical hacker
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
            href="https://x.com/Jhaddix"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jason Haddix on X (opens in a new tab)"
        >Jason Haddix</a>
        shows that attacks go far beyond simple prompt injection, touching data access, tool abuse, and cross-system pivoting.
      </p>
    </section>

    <!-- threat landscape -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🎯 The Threat Landscape: Beyond Prompt Injection</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        Many teams fixate on input prompts, but the broader attack surface includes model I/O and the
        <strong class="text-white">tools</strong> agents can invoke. Common risks:
      </p>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li><strong>Data exfiltration:</strong> eliciting secrets via crafted queries or “role-play”.</li>
        <li><strong>Tool/function abuse:</strong> convincing the agent to call dangerous tools (webhooks, file I/O).</li>
        <li><strong>Lateral movement:</strong> pivoting across platforms (e.g., Slack → CRM) using agent credentials.</li>
      </ul>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        For a broader taxonomy, see the
        <a
            href="https://owasp.org/www-project-top-10-for-large-language-model-applications/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
        >OWASP Top 10 for LLM Applications</a>.
      </p>
    </section>

    <!-- pentest approach -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🧪 A Practical AI Pentest Approach</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        Jason's structured approach resembles a full application security review, adapted for LLMs:
      </p>
      <ol class="list-decimal pl-5 space-y-2 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li><strong>Recon:</strong> enumerate model versions, system prompts, tools, data sources, guardrails.</li>
        <li><strong>Input manipulation:</strong> jailbreaks, instruction override, content smuggling.</li>
        <li><strong>Agent analysis:</strong> tool catalog, auth scopes, output-to-tool routing.</li>
        <li><strong>Tool misuse:</strong> induce unintended calls (HTTP, filesystem, shell-like tools).</li>
        <li><strong>Data abuse:</strong> escalate context grants; scrape PII, secrets, embeddings.</li>
        <li><strong>Output inspection:</strong> poisoned links, hidden markup, SSRF-like egress patterns.</li>
      </ol>
    </section>

    <!-- training game -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🎮 Train Against Prompt Injection: Gandalf</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        Try
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
            href="https://gandalf.lakera.ai/baseline"
            target="_blank"
            rel="noopener noreferrer"
        >Lakera’s Gandalf</a>
        to experience iterative jailbreaks, a safe way to build intuition for defensive patterns.
      </p>
    </section>

    <!-- odd tricks -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🧠 Odd But Effective Tricks Attackers Use</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        Real incidents often leverage unexpected formats:
      </p>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li><strong>Emoji / homoglyph smuggling:</strong> bypass naive filters with visually similar chars.</li>
        <li><strong>Hidden hyperlinks:</strong> malicious URLs in markdown/HTML the agent can “follow”.</li>
        <li><strong>Encoded payloads:</strong> base64/hex to hide instructions inside “data”.</li>
        <li><strong>Adversarial markup:</strong> CSS/HTML that changes meaning post-render.</li>
      </ul>
    </section>

    <!-- failures -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🚨 Real-World Failures: Where Agents Go Wrong</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        In enterprise settings, “helpful” agents with broad permissions can leak customer data, create unauthorized
        tickets, or sync private notes into public systems. The human-like interface + backend keys = high blast radius.
      </p>
    </section>

    <!-- defense stack -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🛡 A Practical Defense Stack</h2>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li><strong>Classical web security still applies:</strong> validate inputs, sanitize outputs, authn/z.</li>
        <li><strong>Policy + output filters:</strong> separate system prompts; verify tool args/destinations.</li>
        <li><strong>Sandboxing:</strong> isolate tools; block egress by default; allowlist domains.</li>
        <li><strong>Least privilege:</strong> scoped API keys, per-tool perms, expirations, JIT grants.</li>
        <li><strong>Observability:</strong> full I/O logging, replay, anomaly detection, rate limits, breakers.</li>
        <li>
          <strong>Model Context Protocol (MCP):</strong> standardize capabilities. See
          <a
              href="https://modelcontextprotocol.io/"
              target="_blank"
              rel="noopener noreferrer"
              class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
          >modelcontextprotocol.io</a>.
        </li>
      </ul>
    </section>

    <!-- resources -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🧰 Tools & Frameworks Mentioned</h2>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li>
          <a
              class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
              href="https://github.com/elder-plinius"
              target="_blank"
              rel="noopener noreferrer"
          >Pliney's GitHub</a>: open-source AI testing utilities.
        </li>
        <li>Agent frameworks: LangChain, AutoGPT, etc. (audit tool catalogs and auth scopes).</li>
        <li>
          <a
              class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
              href="https://owasp.org/www-project-top-10-for-large-language-model-applications/"
              target="_blank"
              rel="noopener noreferrer"
          >OWASP LLM Top 10</a>: shared vocabulary for risks and mitigations.
        </li>
      </ul>
    </section>

    <!-- video -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">📽 Watch The Interview</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
            href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch The AI Attack Blueprint – Interview with Jason Haddix on YouTube (opens in a new tab)"
        >▶️ The AI Attack Blueprint. Interview with Jason Haddix.</a>
      </p>
    </section>

    <!-- closing -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🧑‍💻 Final Thoughts</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        AI supercharges productivity and the attack surface. Treat LLMs like powerful,
        <strong class="text-white">untrusted inputs</strong> with tool access. Invest in policies, sandboxes,
        and observability before incidents, not after.
      </p>
    </section>
  </article>
</template>

<style scoped>
:where(p, li){ word-break: break-word; hyphens: auto; }
</style>
