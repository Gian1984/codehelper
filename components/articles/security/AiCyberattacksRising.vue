<template>
  <article
      class="mx-auto w-full max-w-[72ch] px-5 sm:px-6 py-6 sm:py-10 bg-gray-800 rounded-2xl shadow-2xl ring-1 ring-white/5"
  >
    <!-- intro -->
    <section class="mt-6 sm:mt-8 space-y-5">
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        in 2025 we’re seeing a sharp rise in <strong class="text-white">ai-driven attacks</strong>:
        faster campaigns, more convincing social engineering, and adaptive malware that evades controls.
        this article explains why attacks are scaling, which techniques matter most, how defenses must evolve,
        and what to expect next.
      </p>
    </section>

    <!-- growth -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">📈 the growth of ai-driven cybercrime</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        the economics of cybercrime are shifting as off-the-shelf models and cheap cloud compute reduce
        the cost of personalized attacks. ibm’s <em>cost of a data breach 2025</em> pegs the global average breach
        at about <strong class="text-white">$4.4m</strong>—down year over year but still substantial—warning that an
        <em>ai oversight gap</em> raises risk where ai is adopted without governance.
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
           href="https://www.ibm.com/reports/data-breach" target="_blank" rel="noopener noreferrer">(ibm 2025)</a>
      </p>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        fresh research by mit sloan &amp; safe security finds as much as
        <strong class="text-white">80%</strong> of recent ransomware operations incorporate ai—from reconnaissance and
        target scoring to automated phishing and negotiation playbooks.
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
           href="https://mitsloan.mit.edu/ideas-made-to-matter/80-ransomware-attacks-now-use-artificial-intelligence"
           target="_blank" rel="noopener noreferrer">(mit sloan 2025)</a>
        acronis’s h1 2025 brief likewise reports a steep rise in ransomware victims (≈ <strong>+70%</strong> vs 2023-24)
        and month-over-month growth in endpoint malware detections.
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
           href="https://www.acronis.com/en/pr/2025/acronis-report-finds-ai-powered-phishing-and-social-engineering-fueling-surge-in-ransomware/"
           target="_blank" rel="noopener noreferrer">(acronis 2025)</a>
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
           href="https://www.acronis.com/en/tru/posts/acronis-cyberthreats-update-september-2025/"
           target="_blank" rel="noopener noreferrer">(acronis sep 2025)</a>
      </p>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        law enforcement sees the same trend: europol warns that organized crime now leverages ai to scale multilingual
        fraud, impersonation, and automated workflows—anticipating even more autonomous, ai-enabled criminal networks.
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
           href="https://www.reuters.com/world/europe/europol-warns-ai-driven-crime-threats-2025-03-18/"
           target="_blank" rel="noopener noreferrer">(reuters: europol 2025)</a>
      </p>
    </section>

    <!-- types -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🤖 types of ai-powered attacks</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        the modern attacker’s toolkit blends classic tactics with generative automation. four patterns dominate:
      </p>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li>
          <strong>phishing 2.0 / spear phishing at scale.</strong>
          a 2024 human-subject study found fully ai-automated spear-phishing emails matched expert human performance with
          a ~<strong>54%</strong> click-through rate (vs ~12% generic spam).
          <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
             href="https://arxiv.org/abs/2412.00586" target="_blank" rel="noopener noreferrer">(arxiv 2412.00586)</a>
        </li>
        <li>
          <strong>deepfakes &amp; voice cloning.</strong>
          deepfakes now account for ~<strong>6.5%</strong> of fraud attacks globally—a surge of &gt; <strong>2,000%</strong> since 2022;
          many enterprises plan near-term investment in detection/response.
          <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
             href="https://zerothreat.ai/blog/deepfake-and-ai-phishing-statistics" target="_blank" rel="noopener noreferrer">(zerothreat 2025)</a>
        </li>
        <li>
          <strong>adaptive / polymorphic malware.</strong>
          attackers use ai to bypass captchas, morph payloads, and tune operations to live-off-the-land—evading signature-based controls.
          <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
             href="https://mitsloan.mit.edu/ideas-made-to-matter/80-ransomware-attacks-now-use-artificial-intelligence"
             target="_blank" rel="noopener noreferrer">(mit sloan 2025)</a>
        </li>
        <li>
          <strong>biometric spoofing.</strong>
          research highlights growing risk to face/voice auth unless paired with dynamic, multi-modal checks; proposes a
          “deepfake kill chain” and countermeasures.
          <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
             href="https://arxiv.org/abs/2506.06825" target="_blank" rel="noopener noreferrer">(arxiv 2506.06825)</a>
        </li>
      </ul>
    </section>

    <!-- defenses -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🛡 defenses need to catch up</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        point solutions won’t cut it. leading guidance emphasizes a layered program: automated security hygiene (patching,
        hardening, attack-surface reduction), <strong class="text-white">autonomous detection &amp; response</strong>
        (behavioral analytics, anomaly detection, xdr), and governance with executive oversight and real-time threat intel.
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
           href="https://mitsloan.mit.edu/ideas-made-to-matter/80-ransomware-attacks-now-use-artificial-intelligence"
           target="_blank" rel="noopener noreferrer">(mit sloan 2025)</a>
      </p>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        human factors remain the largest soft spot: over half of breaches involve social engineering or error.
        invest in phishing-resistant mfa (hardware keys), least-privilege access, segmentation, red/blue-team exercises,
        and continuous training. pair that with deepfake detection in high-risk workflows (finance approvals, vendor changes, hr).
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
           href="https://zerothreat.ai/blog/phishing-attack-statistics" target="_blank" rel="noopener noreferrer">(phishing stats 2024-25)</a>
      </p>
    </section>

    <!-- global impact -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🌍 global impact</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        ai-enhanced incidents have moved beyond the screen. in september 2025, jaguar land rover extended a production
        shutdown for weeks after a cyberattack disrupted manufacturing systems—impacting tens of thousands of workers and suppliers.
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
           href="https://www.reuters.com/en/britains-jlr-extends-production-halt-after-cybersecurity-incident-2025-09-16/"
           target="_blank" rel="noopener noreferrer">(reuters: jlr 2025)</a>
      </p>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        intelligence reports also document state-aligned groups using ai to forge documents and résumés to gain footholds via
        remote jobs and supply-chain roles—blurring boundaries between cyber and fraud.
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
           href="https://www.businessinsider.com/north-korea-china-hackers-infiltrate-companies-ai-resumes-military-id-2025-9"
           target="_blank" rel="noopener noreferrer">(business insider 2025)</a>
      </p>
    </section>

    <!-- future -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🔮 the future: toward autonomous attacks</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        researchers and law-enforcement foresee <strong class="text-white">autonomous ai agents</strong> that can
        continuously scan, exploit, and exfiltrate with minimal human oversight. containment will require stronger model
        governance, auditable tooling, default-deny egress, and regulation that clarifies accountability for ai misuse.
        <a class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
           href="https://www.reuters.com/world/europe/europol-warns-ai-driven-crime-threats-2025-03-18/"
           target="_blank" rel="noopener noreferrer">(reuters: europol 2025)</a>
      </p>
    </section>

    <!-- final thoughts -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🧑‍💻 final thoughts</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        ai is a force multiplier for both attackers and defenders. treat models and agents as
        <strong class="text-white">untrusted inputs</strong> with powerful side effects.
        invest in prevention you can automate, detection you can trust, response you can rehearse,
        and governance you can prove.
      </p>
    </section>

    <!-- sources -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">📚 sources & further reading</h2>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li><a href="https://www.ibm.com/reports/data-breach" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">ibm — cost of a data breach 2025</a></li>
        <li><a href="https://mitsloan.mit.edu/ideas-made-to-matter/80-ransomware-attacks-now-use-artificial-intelligence" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">mit sloan & safe — 80% of ransomware uses ai (2025)</a></li>
        <li><a href="https://www.acronis.com/en/pr/2025/acronis-report-finds-ai-powered-phishing-and-social-engineering-fueling-surge-in-ransomware/" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">acronis — cyberthreats report h1 2025</a></li>
        <li><a href="https://www.acronis.com/en/tru/posts/acronis-cyberthreats-update-september-2025/" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">acronis — monthly threat update (sep 2025)</a></li>
        <li><a href="https://arxiv.org/abs/2412.00586" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">arxiv — automated spear phishing (2024)</a></li>
        <li><a href="https://zerothreat.ai/blog/deepfake-and-ai-phishing-statistics" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">zerothreat — deepfake & ai phishing stats (2025)</a></li>
        <li><a href="https://arxiv.org/abs/2506.06825" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">arxiv — identity deepfake threats to biometrics (2025)</a></li>
        <li><a href="https://www.reuters.com/en/britains-jlr-extends-production-halt-after-cybersecurity-incident-2025-09-16/" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">reuters — jlr production halt after cyberattack (2025)</a></li>
        <li><a href="https://www.reuters.com/world/europe/europol-warns-ai-driven-crime-threats-2025-03-18/" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">reuters — europol on ai-driven crime (2025)</a></li>
        <li><a href="https://www.businessinsider.com/north-korea-china-hackers-infiltrate-companies-ai-resumes-military-id-2025-9" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300">business insider — ai-assisted infiltration (2025)</a></li>
      </ul>
    </section>
  </article>
</template>

<style scoped>
:where(p, li){ word-break: break-word; hyphens: auto; }
</style>
