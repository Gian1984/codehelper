<template>
  <article
      class="mx-auto w-full max-w-[72ch] px-5 sm:px-6 py-6 sm:py-10 bg-gray-800 rounded-2xl shadow-2xl ring-1 ring-white/5"
  >

    <!-- intro -->
    <section class="mt-6 sm:mt-8 space-y-5">
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        whether you’re an <strong class="text-white">ethical hacker</strong>, sysadmin, or the unofficial it support
        for your family, there’s one project that can save you time:
        <strong class="text-white">the hacker dropbox</strong>. drop a raspberry pi into any network and gain secure,
        instant remote access without traditional VPN headaches.
      </p>
    </section>

    <!-- what is it -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🚀 What Is A Hacker Dropbox?</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        a hacker dropbox is a small <strong class="text-white">raspberry pi device</strong> pre-configured to
        automatically connect to a secure external tunnel at boot. once powered, it grants you seamless access to the
        network it’s plugged into. common uses:
      </p>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li>remote it support for friends, family, or clients</li>
        <li>pentesting engagements where physical access is limited</li>
        <li>educational projects exploring <strong class="text-white">zero trust networking</strong></li>
      </ul>
    </section>

    <!-- why not vpn -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🔐 Why Not Just Use A VPN?</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        vpns often require port forwarding and router tweaks. instead, this setup uses
        <strong class="text-white">ztna (zero trust network access)</strong> via
        <a
            href="https://www.twingate.com"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
            aria-label="visit twingate official website (opens in new tab)"
        >twingate</a>, which is:
      </p>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li>more secure by default</li>
        <li>simpler to deploy</li>
        <li>cloud-native and scalable</li>
      </ul>
    </section>

    <!-- what you'll need -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🧰 What You'll Need</h2>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li>
          <a
              href="https://amzn.to/3JMT9JV"
              target="_blank"
              rel="sponsored noopener noreferrer"
              class="underline underline-offset-2 decoration-pink-400 hover:decoration-pink-300 focus-visible:ring-2 focus-visible:ring-pink-400 font-semibold rounded"
          >raspberry pi 4</a>
          or
          <a
              href="https://amzn.to/4g6u2Od"
              target="_blank"
              rel="sponsored noopener noreferrer"
              class="underline underline-offset-2 decoration-pink-400 hover:decoration-pink-300 focus-visible:ring-2 focus-visible:ring-pink-400 font-semibold rounded"
          >raspberry pi 5</a>
        </li>
        <li>
          <a
              href="https://www.raspberrypi.com/software/"
              target="_blank"
              rel="noopener noreferrer"
              class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
          >raspberry pi imager</a>
        </li>
        <li>
          <a
              href="https://www.twingate.com/docs/quick-start"
              target="_blank"
              rel="noopener noreferrer"
              class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
          >twingate account (quick start)</a>
        </li>
      </ul>
      <p class="text-xs text-gray-400" id="affiliate-note">
        As an Amazon Associate I may earn from qualifying purchases at no extra cost to you.
      </p>
    </section>

    <!-- setup -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">⚙️ Setup In A Nutshell</h2>
      <ol class="list-decimal pl-5 space-y-2 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li>
          flash raspberry pi os with the
          <a
              href="https://www.raspberrypi.com/software/"
              target="_blank"
              rel="noopener noreferrer"
              class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
          >pi imager</a>.
        </li>
        <li>install the twingate connector package on the pi.</li>
        <li>authenticate and connect the pi to your twingate network.</li>
        <li>ship it or plug it in. It auto-connects every boot.</li>
      </ol>
    </section>

    <!-- use cases -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🧑‍💻 Practical Use Cases</h2>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li>remote troubleshooting (e.g., fixing grandma’s printer… again)</li>
        <li>drop into a client’s site to monitor logs or troubleshoot securely</li>
        <li>red-team foothold in authorized security assessments</li>
      </ul>
    </section>

    <!-- resources -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🔗 Helpful Resources</h2>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li>
          📝 full guide:
          <a
              href="https://ntck.co/hackerdropbox"
              target="_blank"
              rel="noopener noreferrer"
              class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
          >hacker dropbox walkthrough</a>
        </li>
        <li>
          📚 twingate api reference:
          <a
              href="https://www.twingate.com/docs/exploring-twingate-apis"
              target="_blank"
              rel="noopener noreferrer"
              class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
          >explore api docs</a>
        </li>
      </ul>
    </section>

    <!-- ethics -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🔒 Ethical Hacking Reminder</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        this project is for <strong class="text-white">legitimate and authorized use only</strong>.
        always get explicit permission before deploying, especially in corporate or client environments.
      </p>
    </section>

    <!-- closing -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">✅ Final Thoughts</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        a <strong class="text-white">hacker dropbox</strong> is a game-changer for sysadmins, freelancers, and security pros.
        with <strong class="text-white">twingate ztna</strong>, setup time drops from hours to minutes. from helping grandma
        to conducting pentests, this project belongs in your toolkit.
      </p>
    </section>
  </article>
</template>

<style scoped>
:where(p, li){ word-break: break-word; hyphens: auto; }
</style>
