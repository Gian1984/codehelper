<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-10">
    <h2 class="text-3xl font-bold text-white">
      🔥 AI powered cyberattacks: how artificial intelligence is fueling a new wave of hacking
    </h2>

    <p class="text-gray-300">
      <strong class="text-white">Artificial Intelligence</strong> is transforming industries and supercharging cybercrime.
      In 2025 we are seeing a sharp rise in <strong class="text-white">AI-driven attacks</strong>: faster campaigns, more convincing
      social engineering, and adaptive malware that evades controls. This article explains why attacks are scaling,
      which techniques matter most, how defenses must evolve, and what to expect next.
    </p>

    <h2 class="text-xl font-semibold text-white">📈 The growth of ai‑driven cybercrime</h2>
    <p class="text-gray-300">
      The economics of cybercrime are shifting as off‑the‑shelf models and cheap cloud compute reduce the cost of
      personalized attacks. IBM’s <em>Cost of a Data Breach 2025</em> pegs the global average breach at about
      <strong class="text-white">$4.4M</strong> down year over year but still substantial, with IBM warning that an
      <em>AI oversight gap</em> is raising risk where AI is adopted without governance.
      <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://www.ibm.com/reports/data-breach" target="_blank" rel="noopener noreferrer">(IBM 2025)</a>
    </p>
    <p class="text-gray-300">
      Fresh research by MIT Sloan &amp; SAFE Security finds that as much as <strong class="text-white">80%</strong> of
      recent ransomware operations incorporate AI from reconnaissance and target scoring to automated phishing and
      negotiation playbooks.
      <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://mitsloan.mit.edu/ideas-made-to-matter/80-ransomware-attacks-now-use-artificial-intelligence" target="_blank" rel="noopener noreferrer">( MIT Sloan 2025 )</a>
      Acronis’s H1 2025 threat brief likewise reports a steep rise in ransomware victims ( ≈<strong>+70%</strong> vs 2023‑24 )
      and month over month growth in endpoint malware detections.
      <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://www.acronis.com/en/pr/2025/acronis-report-finds-ai-powered-phishing-and-social-engineering-fueling-surge-in-ransomware/" target="_blank" rel="noopener noreferrer">( Acronis 2025 )</a>
      <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://www.acronis.com/en/tru/posts/acronis-cyberthreats-update-september-2025/" target="_blank" rel="noopener noreferrer">( Acronis Sep 2025 )</a>
    </p>
    <p class="text-gray-300">
      Law enforcement sees the same trend: Europol warns that organized crime now leverages AI to scale multilingual
      fraud, impersonation and automated workflows anticipating even more autonomous, AI enabled criminal networks.
      <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://www.reuters.com/world/europe/europol-warns-ai-driven-crime-threats-2025-03-18/" target="_blank" rel="noopener noreferrer">( Reuters: Europol 2025 )</a>
    </p>

    <h2 class="text-xl font-semibold text-white">🤖 Types of ai‑powered attacks</h2>
    <p class="text-gray-300">
      The modern attacker’s toolkit blends classic tactics with generative automation. Four patterns dominate:
    </p>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>
        <strong>phishing 2.0 / spear phishing at scale.</strong> A 2024 human subject study found fully AI automated spear phishing
        emails matched expert human performance with a ~<strong>54%</strong> click through rate, far above generic spam ( 12% ).
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://arxiv.org/abs/2412.00586" target="_blank" rel="noopener noreferrer">(arXiv 2412.00586)</a>
      </li>
      <li>
        <strong>deepfakes &amp; voice cloning.</strong> Deepfakes now account for about <strong>6.5%</strong> of fraud attacks
        globally, a surge of over <strong>2,000%</strong> since 2022; many enterprises plan near‑term investment in deepfake
        detection and response.
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://zerothreat.ai/blog/deepfake-and-ai-phishing-statistics" target="_blank" rel="noopener noreferrer">( Zerothreat 2025 )</a>
      </li>
      <li>
        <strong>adaptive / polymorphic malware.</strong> Attackers use AI to bypass CAPTCHAs, morph payloads and tune
        operations to live off the land, evading signature based controls.
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://mitsloan.mit.edu/ideas-made-to-matter/80-ransomware-attacks-now-use-artificial-intelligence" target="_blank" rel="noopener noreferrer">( MIT Sloan 2025 )</a>
      </li>
      <li>
        <strong>biometric spoofing.</strong> Research highlights growing risk to face/voice authentication unless paired with
        dynamic signals and multi‑modal checks; the paper proposes a “deepfake kill chain” and countermeasures.
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://arxiv.org/abs/2506.06825" target="_blank" rel="noopener noreferrer">( arXiv 2506.06825 )</a>
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🛡 Defenses need to catch up</h2>
    <p class="text-gray-300">
      Point solutions won’t cut it. Leading guidance emphasizes a layered program: automated security hygiene ( patching,
      hardening, attack‑surface reduction ), <strong class="text-white">autonomous detection &amp; response</strong> ( behavioral analytics,
      anomaly detection, XDR ), and governance with executive oversight and real‑time threat intelligence.
      <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://mitsloan.mit.edu/ideas-made-to-matter/80-ransomware-attacks-now-use-artificial-intelligence" target="_blank" rel="noopener noreferrer">( MIT Sloan 2025 )</a>
    </p>
    <p class="text-gray-300">
      Human factors remain the largest soft spot: over half of breaches involve social engineering or error. Invest in
      phishing‑resistant MFA ( hardware keys ), least‑privilege access, network segmentation, red/blue‑team exercises, and
      continuous training. Pair that with deepfake detection in high‑risk workflows ( finance approvals, vendor changes, HR ).
      <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://zerothreat.ai/blog/phishing-attack-statistics" target="_blank" rel="noopener noreferrer">( Phishing stats 2024‑25 )</a>
    </p>

    <h2 class="text-xl font-semibold text-white">🌍 Global impact</h2>
    <p class="text-gray-300">
      AI‑enhanced incidents have moved beyond the screen. In September 2025, Jaguar Land Rover extended a production
      shutdown for weeks following a cyberattack that disrupted manufacturing systems, impacting tens of thousands of
      workers and suppliers, a reminder that digital compromise can trigger physical‑world losses.
      <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://www.reuters.com/en/britains-jlr-extends-production-halt-after-cybersecurity-incident-2025-09-16/" target="_blank" rel="noopener noreferrer">( Reuters JLR 2025 )</a>
    </p>
    <p class="text-gray-300">
      Intelligence reports also document state aligned groups using AI to generate forged documents and résumés to gain
      network footholds via remote jobs and supply‑chain roles, blurring traditional boundaries between cyber and fraud.
      <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://www.businessinsider.com/north-korea-china-hackers-infiltrate-companies-ai-resumes-military-id-2025-9" target="_blank" rel="noopener noreferrer">( Business Insider 2025 )</a>
    </p>

    <h2 class="text-xl font-semibold text-white">🔮 The future: toward autonomous attacks</h2>
    <p class="text-gray-300">
      Researchers and law‑enforcement foresee <strong class="text-white">autonomous AI agents</strong> that can continuously scan,
      exploit and exfiltrate with minimal human oversight. Containment will require stronger model governance, auditable
      tooling, default deny egress, and regulation that clarifies accountability for AI misuse.
      <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300" href="https://www.reuters.com/world/europe/europol-warns-ai-driven-crime-threats-2025-03-18/" target="_blank" rel="noopener noreferrer">( Reuters: Europol 2025 )</a>
    </p>

    <h2 class="text-xl font-semibold text-white">🧑‍💻 Final thoughts</h2>
    <p class="text-gray-300">
      AI is a force multiplier for both attackers and defenders. Treat models and agents as <strong class="text-white">untrusted inputs</strong>
      with powerful side effects. Invest in prevention you can automate, detection you can trust, response you can rehearse,
      and governance you can prove.
    </p>

    <h2 class="text-xl font-semibold text-white">📚 Sources & further reading</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li><a href="https://www.ibm.com/reports/data-breach" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">IBM — Cost of a Data Breach 2025</a></li>
      <li><a href="https://mitsloan.mit.edu/ideas-made-to-matter/80-ransomware-attacks-now-use-artificial-intelligence" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">MIT Sloan & SAFE — 80% of ransomware uses AI ( 2025 )</a></li>
      <li><a href="https://www.acronis.com/en/pr/2025/acronis-report-finds-ai-powered-phishing-and-social-engineering-fueling-surge-in-ransomware/" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">Acronis — Cyberthreats Report H1 2025</a></li>
      <li><a href="https://www.acronis.com/en/tru/posts/acronis-cyberthreats-update-september-2025/" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">Acronis — Monthly Threat Update ( Sep 2025 )</a></li>
      <li><a href="https://arxiv.org/abs/2412.00586" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">arXiv — Automated spear phishing ( 2024 )</a></li>
      <li><a href="https://zerothreat.ai/blog/deepfake-and-ai-phishing-statistics" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">Zerothreat — Deepfake & AI phishing stats ( 2025 )</a></li>
      <li><a href="https://arxiv.org/abs/2506.06825" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">arXiv — Identity deepfake threats to biometrics ( 2025 )</a></li>
      <li><a href="https://www.reuters.com/en/britains-jlr-extends-production-halt-after-cybersecurity-incident-2025-09-16/" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">Reuters — JLR production halt after cyberattack ( 2025 )</a></li>
      <li><a href="https://www.reuters.com/world/europe/europol-warns-ai-driven-crime-threats-2025-03-18/" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">Reuters — Europol on AI‑driven crime ( 2025 )</a></li>
      <li><a href="https://www.businessinsider.com/north-korea-china-hackers-infiltrate-companies-ai-resumes-military-id-2025-9" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">Business Insider — AI‑assisted infiltration ( 2025 )</a></li>
    </ul>
  </div>
</template>

<style scoped>
/* Tailwind only; links are underlined with high-contrast hover states and focus-visible rings */
</style>
<script setup lang="ts">
</script>