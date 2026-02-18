<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-8">
    <h2 class="text-3xl font-bold text-white">From Clawdbot to OpenClaw: The AI Agent That Broke GitHub, Got Hijacked by Crypto Scammers, and Landed Its Creator at OpenAI</h2>

    <p class="text-gray-300 text-base leading-relaxed">
      In January 2026, a single developer shipped an open-source AI assistant from his home office. Within 72 hours it had three different names, 60,000 GitHub stars, a fake crypto token worth $16 million, exposed control panels in 82 countries, and the attention of both Sam Altman and Mark Zuckerberg. This is the story of OpenClaw, and it reads like a case study on everything that can go right and wrong when autonomous AI meets the open internet.
    </p>

    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <p class="text-sm text-gray-400 mb-2">The Numbers:</p>
      <ul class="text-sm font-mono text-yellow-400 space-y-1">
        <li>193,000+ GitHub stars (21st most popular repo ever)</li>
        <li>3 names in 72 hours (Clawdbot → Moltbot → OpenClaw)</li>
        <li>$16M fake crypto token market cap before 90% crash</li>
        <li>42,900 exposed control panels across 82 countries</li>
        <li>15,200 instances vulnerable to remote code execution</li>
        <li>6,600+ commits by one developer in a single month</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">The Man Behind the Lobster</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      Peter Steinberger, known online as @steipete, is an Austrian developer who previously co-founded PSPDFKit, a PDF framework company he bootstrapped in 2011. The company grew to power apps used by nearly a billion people before Insight Partners invested 100 million euros in 2021. Steinberger sold his shares, stepped down, and started building what would become the most talked-about open-source project of early 2026.
    </p>

    <p class="text-gray-300 text-base leading-relaxed mt-2">
      His approach was unconventional. He described his coding style as "vibe coding" and made over 6,600 commits in January 2026 alone. When asked about the project's rapid growth, he said: <em>"From the commits, it might appear like it's a company. But it's not. This is one dude sitting at home having fun."</em>
    </p>

    <h2 class="text-xl font-semibold text-white">What Clawdbot Actually Was</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      Clawdbot was not another chatbot. It was an autonomous AI agent that could interact with real systems on your behalf. It connected to WhatsApp, Telegram, Signal, Discord, and Slack, and could execute actual tasks: sending and deleting emails, managing calendars, browsing the web, summarizing PDFs, writing code, and automating workflows across services.
    </p>

    <p class="text-gray-300 text-base leading-relaxed mt-2">
      The key difference from ChatGPT or Claude was that Clawdbot ran locally on your machine and had permission to act on your behalf. It was not just generating text. It was executing commands, accessing files, and interacting with APIs. This made it extraordinarily powerful and, as it turned out, extraordinarily dangerous.
    </p>

    <div class="bg-blue-900/30 border border-blue-600/50 rounded-lg p-4 mt-4">
      <p class="text-sm text-blue-300 mb-2"><strong class="text-white">Why It Went Viral:</strong></p>
      <ul class="text-sm text-gray-300 space-y-1">
        <li>- A truly autonomous AI agent, not just a chatbot</li>
        <li>- Open-source and free, running on your own hardware</li>
        <li>- Real integration with messaging platforms and productivity tools</li>
        <li>- Support for multiple LLM backends (Claude, GPT, DeepSeek)</li>
        <li>- 9,000 GitHub stars in a single day after public launch on January 25, 2026</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">Three Names in 72 Hours</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      The naming saga began on January 24, when Steinberger appeared on the "Insecure Agents" podcast and confidently stated: <em>"I looked it up. There's no trademark for this."</em> He was wrong.
    </p>

    <p class="text-gray-300 text-base leading-relaxed mt-2">
      Three days later, on January 27, Anthropic sent a formal trademark notice. The name "Clawd" was too close to their AI product "Claude." When Steinberger asked if he could simply drop the 'd' and use "Clawbot," Anthropic said no.
    </p>

    <p class="text-gray-300 text-base leading-relaxed mt-2">
      The community rallied and pitched hundreds of alternative names. The winner was <strong>Moltbot</strong>, because "molting" is how lobsters grow, keeping the project's lobster mascot theme alive. But "Moltbot" lasted only about two days. It was hard to pronounce, did not stick in conversations, and by January 29 Steinberger had rebranded again to <strong>OpenClaw</strong>, the name it carries today.
    </p>

    <div class="overflow-x-auto mt-4">
      <table class="w-full text-sm text-gray-300 border border-gray-700">
        <thead class="bg-gray-900">
          <tr>
            <th class="p-3 text-left border-b border-gray-700">Date</th>
            <th class="p-3 text-left border-b border-gray-700">Name</th>
            <th class="p-3 text-left border-b border-gray-700">What Happened</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">Jan 25-26</td>
            <td class="p-3">Clawdbot</td>
            <td class="p-3">Public launch. 9,000 stars in one day.</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">Jan 27</td>
            <td class="p-3">Moltbot</td>
            <td class="p-3">Anthropic trademark notice. Forced rebrand.</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold text-white">Jan 29</td>
            <td class="p-3">OpenClaw</td>
            <td class="p-3">Voluntary rebrand. Final name.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-xl font-semibold text-white">The Crypto Scam That Hit in 10 Seconds</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      The triple rebrand created an opening that scammers exploited almost instantly. When Steinberger released the old @clawdbot Twitter/X handle during the Moltbot transition, a crypto scammer seized it within approximately 10 seconds. The hijacked account looked legitimate and immediately began promoting a fake <strong>$CLAWD token</strong> on Solana-based meme coin platforms.
    </p>

    <p class="text-gray-300 text-base leading-relaxed mt-2">
      The fraudulent token briefly reached a <strong>$16 million market capitalization</strong> before crashing approximately 90%, constituting a classic rug pull. The scam expanded to include wallet credential phishing, drainer attacks, fake airdrops, and fabricated investment opportunities, all trading on the confusion around the rapid name changes.
    </p>

    <div class="bg-red-900/30 border border-red-600/50 rounded-lg p-4 mt-4">
      <p class="text-sm text-red-300 mb-2"><strong class="text-white">Steinberger's Public Statement:</strong></p>
      <p class="text-sm text-gray-300">
        Steinberger had to publicly clarify that he never created any cryptocurrency token, had no affiliation with $CLAWD, and that any project using the Clawdbot or Moltbot name for crypto purposes was a scam. He asked investors to stop contacting him and stated he was working with GitHub to recover affected accounts.
      </p>
    </div>

    <h2 class="text-xl font-semibold text-white">The Security Nightmare</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      As OpenClaw's popularity exploded, security researchers began probing the project and the findings were alarming. The fundamental issue was that unlike a chatbot that just generates text, OpenClaw could execute commands on your computer. When misconfigured, this turned personal devices into remotely accessible machines.
    </p>

    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
      <p class="text-sm text-gray-400 mb-2">Security Findings (Multiple Research Teams):</p>
      <ul class="text-sm font-mono text-red-400 space-y-1">
        <li>- 42,900 exposed OpenClaw control panels across 82 countries</li>
        <li>- 15,200 instances vulnerable to Remote Code Execution (RCE)</li>
        <li>- Default config binds to 0.0.0.0:18789 (all interfaces, not localhost)</li>
        <li>- ~1 in 5 available plugins contained malware</li>
        <li>- Infostealer malware targeting OpenClaw config files and tokens</li>
        <li>- APT groups (Kimsuky, APT28) found near exposed instances</li>
        <li>- 33.8% of exposed infrastructure correlated with threat actor activity</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">Prompt Injection: The AI-Specific Threat</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      Beyond traditional security holes, researchers demonstrated AI-specific attacks. Through indirect prompt injection, hidden commands embedded in emails, websites, or chat messages could manipulate OpenClaw into executing unintended actions.
    </p>

    <p class="text-gray-300 text-base leading-relaxed mt-2">
      In one proof-of-concept, researchers extracted a private SSH key by sending a specially crafted email to a linked inbox. In another, attackers created persistent scheduled tasks that survived restarts. The Dutch Data Protection Authority went so far as to issue formal warnings about OpenClaw's cybersecurity and privacy risks.
    </p>

    <ul class="space-y-4 mt-4">
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Exposed Panels</p>
        <p class="text-sm text-gray-300 mt-1">
          The default configuration bound to all network interfaces instead of localhost. Users who did not change this setting unknowingly exposed their OpenClaw control panel to the entire internet, giving anyone access to an AI agent with permission to act on their computer.
        </p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Malicious Plugins</p>
        <p class="text-sm text-gray-300 mt-1">
          Approximately one in five third-party plugins contained malicious code designed to steal login credentials and cryptocurrency wallet assets. The open plugin ecosystem, while powerful, became a distribution channel for malware.
        </p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">State-Level Interest</p>
        <p class="text-sm text-gray-300 mt-1">
          SecurityScorecard's STRIKE team found that APT groups including Kimsuky (North Korea) and APT28 (Russia) were operating near exposed OpenClaw instances. Over a third of exposed infrastructure showed correlation with known threat actor activity.
        </p>
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">From Chaos to OpenAI</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      Despite the turbulence, the project survived and kept growing. By mid-February 2026, OpenClaw had crossed 180,000 GitHub stars, making it the 21st most popular repository in GitHub's history, with over 2 million visitors in a single week.
    </p>

    <p class="text-gray-300 text-base leading-relaxed mt-2">
      On February 14, 2026, Steinberger announced that he would be joining OpenAI to lead work on "the next generation of personal agents." Sam Altman confirmed the hire the following day. Both Mark Zuckerberg and Altman had reportedly made concrete offers before Steinberger chose OpenAI. His reasoning was direct: <em>"What I want is to change the world, not build a large company, and teaming up with OpenAI is the fastest way to bring this to everyone."</em>
    </p>

    <p class="text-gray-300 text-base leading-relaxed mt-2">
      OpenClaw will continue as open-source software under a foundation supported by OpenAI. The project's evolution from a solo side project to a foundation-backed initiative happened in less than a month.
    </p>

    <div class="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-600/50 rounded-lg p-4 mt-4">
      <p class="text-sm text-indigo-300 mb-2"><strong class="text-white">The European Angle:</strong></p>
      <p class="text-sm text-gray-300">
        Steinberger's move to OpenAI reignited the debate about Europe's tech ecosystem. Austrian media reported his comment: "In Europe, I get insulted." The headline from TrendingTopics.eu read: "Europe Left Peter Steinberger With no Choice but to go to the US." Another case of a European builder leaving for Silicon Valley because the opportunity gap was too wide to bridge.
      </p>
    </div>

    <h2 class="text-xl font-semibold text-white">Why This Story Matters</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      The OpenClaw saga is not just a dramatic tech story. It is a compressed preview of the challenges that autonomous AI agents will create at scale. Every issue that surfaced in three weeks will eventually affect every AI agent product on the market.
    </p>

    <ul class="space-y-4 mt-4">
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Security Cannot Be Optional</p>
        <p class="text-sm text-gray-300 mt-1">
          When an AI agent can execute commands on real systems, the default configuration must be secure. Binding to all network interfaces out of the box is not a feature, it is a vulnerability. 42,900 exposed panels prove that most users will not change defaults.
        </p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Open Source Needs Governance</p>
        <p class="text-sm text-gray-300 mt-1">
          The plugin ecosystem became a malware distribution channel. The naming chaos enabled impersonation and fraud. Open-source power without open-source governance creates attack surfaces that scale with adoption.
        </p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Hype Creates Opportunity for Fraud</p>
        <p class="text-sm text-gray-300 mt-1">
          Scammers are faster than developers. Within seconds of a namespace being freed, it was captured and weaponized. The $16 million fake token shows how quickly bad actors can monetize confusion around a trending project.
        </p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Prompt Injection Is Not Solved</p>
        <p class="text-sm text-gray-300 mt-1">
          When AI agents process untrusted input (emails, web pages, messages) and have the ability to execute actions, prompt injection becomes a critical vulnerability. This is not a theoretical risk. Researchers demonstrated real data exfiltration.
        </p>
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">The Complete Timeline</h2>

    <div class="overflow-x-auto mt-4">
      <table class="w-full text-sm text-gray-300 border border-gray-700">
        <thead class="bg-gray-900">
          <tr>
            <th class="p-3 text-left border-b border-gray-700">Date</th>
            <th class="p-3 text-left border-b border-gray-700">Event</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">Nov 2025</td>
            <td class="p-3">Clawdbot first published as a side project</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">Jan 24, 2026</td>
            <td class="p-3">Steinberger says on podcast: "There's no trademark for this"</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">Jan 25-26</td>
            <td class="p-3">Public launch. 9,000 GitHub stars in one day.</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">Jan 27</td>
            <td class="p-3">Anthropic trademark notice. Renamed to Moltbot. Scammers seize @clawdbot handle. $CLAWD token hits $16M, crashes 90%.</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">Jan 28</td>
            <td class="p-3">Moltbook (AI agent social network) launches, powered by OpenClaw.</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">Jan 29-30</td>
            <td class="p-3">Renamed to OpenClaw. Third identity in 72 hours.</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">Early Feb</td>
            <td class="p-3">Security researchers disclose 42,900 exposed panels, prompt injection risks, malicious plugins.</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">Feb 14</td>
            <td class="p-3">Steinberger announces joining OpenAI. OpenClaw moves to foundation model.</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold text-white">Mid-Feb</td>
            <td class="p-3">193,000+ GitHub stars. 21st most popular repo ever.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-xl font-semibold text-white">Conclusion</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      OpenClaw is a preview of what happens when autonomous AI agents escape the lab and meet the real world. The technology is genuinely impressive. An open-source agent that can manage your email, browse the web, and automate workflows is something people have wanted for decades. But the gap between "technically impressive" and "safe to use" is enormous.
    </p>
    <p class="text-gray-300 text-base leading-relaxed mt-2">
      Forty-two thousand exposed control panels. State-sponsored threat actors circling vulnerable instances. A fake crypto token that extracted millions from confused investors. One in five plugins shipping malware. These are not growing pains. These are warnings about what happens when we give AI agents real power over real systems without building the security infrastructure first.
    </p>
    <p class="text-gray-300 text-base leading-relaxed mt-2">
      The question is not whether AI agents like OpenClaw will become mainstream. They will. The question is whether we will learn from this compressed disaster and build the guardrails before the next wave arrives. Steinberger is now at OpenAI working on exactly that. Whether the rest of the industry follows fast enough is the story we are all watching.
    </p>

    <h2 class="text-xl font-semibold text-white">Sources</h2>
    <ul class="grid md:grid-cols-2 gap-4 text-gray-300">
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">1. <a class="text-indigo-400 hover:underline" href="https://www.cnbc.com/2026/02/02/openclaw-open-source-ai-agent-rise-controversy-clawdbot-moltbot-moltbook.html" target="_blank" rel="noopener">CNBC</a></p>
        <p class="text-sm mt-1">From Clawdbot to Moltbot to OpenClaw: the full saga of the open-source AI agent's rise and controversy.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">2. <a class="text-indigo-400 hover:underline" href="https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/" target="_blank" rel="noopener">TechCrunch</a></p>
        <p class="text-sm mt-1">OpenClaw creator Peter Steinberger joins OpenAI to lead next-generation personal agents.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">3. <a class="text-indigo-400 hover:underline" href="https://finance.yahoo.com/news/fake-clawdbot-ai-token-hits-121840801.html" target="_blank" rel="noopener">Yahoo Finance / Decrypt</a></p>
        <p class="text-sm mt-1">Fake 'ClawdBot' AI Token hits $16M before 90% crash. The crypto scam exploiting the rebrand chaos.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">4. <a class="text-indigo-400 hover:underline" href="https://cybersecuritynews.com/openclaw-control-panels-exposed/" target="_blank" rel="noopener">Cybersecurity News</a></p>
        <p class="text-sm mt-1">15,200 OpenClaw control panels exposed to remote code execution. SecurityScorecard STRIKE team findings.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">5. <a class="text-indigo-400 hover:underline" href="https://www.kaspersky.com/blog/openclaw-vulnerabilities-exposed/55263/" target="_blank" rel="noopener">Kaspersky</a></p>
        <p class="text-sm mt-1">Analysis of OpenClaw security vulnerabilities: prompt injection, exposed panels, and malicious plugins.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">6. <a class="text-indigo-400 hover:underline" href="https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code" target="_blank" rel="noopener">The Pragmatic Engineer</a></p>
        <p class="text-sm mt-1">"The creator of Clawd: I ship code I don't read." Deep profile of Peter Steinberger and his approach.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">7. <a class="text-indigo-400 hover:underline" href="https://www.malwarebytes.com/blog/threat-intel/2026/01/clawdbots-rename-to-moltbot-sparks-impersonation-campaign" target="_blank" rel="noopener">Malwarebytes</a></p>
        <p class="text-sm mt-1">Clawdbot's rename to Moltbot sparks impersonation campaign and crypto fraud analysis.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">8. <a class="text-indigo-400 hover:underline" href="https://www.bleepingcomputer.com/news/security/infostealer-malware-found-stealing-openclaw-secrets-for-first-time/" target="_blank" rel="noopener">Bleeping Computer</a></p>
        <p class="text-sm mt-1">Infostealer malware specifically targeting OpenClaw configuration files and gateway tokens.</p>
      </li>
    </ul>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
// Purely presentational
</script>

<style scoped>
/* No custom styles needed — Tailwind all the way */
</style>
