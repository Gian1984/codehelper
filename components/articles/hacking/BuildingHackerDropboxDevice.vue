<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-10">
    <h1 class="text-3xl font-bold text-white">
      📦 Hacker Dropbox with Raspberry Pi &amp; Twingate — Remote Network Access Made Easy
    </h1>

    <p class="text-gray-300">
      Whether you’re an <strong class="text-white">ethical hacker</strong>, sysadmin, or the unofficial IT support for your family,
      there’s one project that can save you time:
      <strong class="text-white">the Hacker Dropbox</strong>. Drop a Raspberry Pi into any network and gain secure,
      instant remote access — <strong class="text-white">without traditional VPN headaches</strong>.
    </p>

    <h2 class="text-xl font-semibold text-white">🚀 What Is a Hacker Dropbox?</h2>
    <p class="text-gray-300">
      A Hacker Dropbox is a small <strong class="text-white">Raspberry Pi device</strong> pre-configured to automatically connect to
      a secure external tunnel at boot. Once powered, it grants you seamless access to the network it’s plugged into.
      Common use cases include:
    </p>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>Remote IT support for friends, family, or clients</li>
      <li>Pentesting engagements where physical access is limited</li>
      <li>Educational projects exploring <strong class="text-white">Zero Trust networking</strong></li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🔐 Why Not Just Use a VPN?</h2>
    <p class="text-gray-300">
      VPNs often require complex port forwarding and router tweaks. Instead, this setup uses
      <strong class="text-white">ZTNA (Zero Trust Network Access)</strong> via
      <a
          href="https://www.twingate.com"
          target="_blank"
          rel="noopener noreferrer"
          class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          aria-label="Visit Twingate official website (opens in new tab)"
      >Twingate</a>, which is:
    </p>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>More secure by default</li>
      <li>Simpler to deploy</li>
      <li>Cloud-native and scalable</li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🧰 What You’ll Need</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>
        <a
            href="https://amzn.to/3JMT9JV"
            target="_blank"
            rel="sponsored noopener noreferrer"
            class="underline underline-offset-2 decoration-pink-400 hover:decoration-pink-300 focus-visible:ring-2 focus-visible:ring-pink-400 font-semibold"
        >Raspberry Pi 4</a> or
        <a
            href="https://amzn.to/4g6u2Od"
            target="_blank"
            rel="sponsored noopener noreferrer"
            class="underline underline-offset-2 decoration-pink-400 hover:decoration-pink-300 focus-visible:ring-2 focus-visible:ring-pink-400 font-semibold"
        >Raspberry Pi 5</a>
      </li>
      <li>
        <a
            href="https://www.raspberrypi.com/software/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400"
        >Raspberry Pi Imager</a>
      </li>
      <li>
        <a
            href="https://www.twingate.com/docs/quick-start"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400"
        >Twingate Account (Quick Start Guide)</a>
      </li>
    </ul>
    <p class="text-xs text-gray-400" id="affiliate-note">
      As an Amazon Associate I may earn from qualifying purchases — at no extra cost to you.
    </p>

    <h2 class="text-xl font-semibold text-white">⚙️ Setup in a Nutshell</h2>
    <ol class="list-decimal list-inside text-gray-300 space-y-1">
      <li>
        Flash Raspberry Pi OS with the
        <a
            href="https://www.raspberrypi.com/software/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
        >Pi Imager</a>.
      </li>
      <li>Install the Twingate connector package on the Pi.</li>
      <li>Authenticate and connect the Pi to your Twingate network.</li>
      <li>Ship it or plug it in — it auto-connects every time it boots.</li>
    </ol>

    <h2 class="text-xl font-semibold text-white">🧑‍💻 Practical Use Cases</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>Remote troubleshooting (e.g. fixing grandma’s printer… again)</li>
      <li>Drop into a client’s site to monitor logs or troubleshoot securely</li>
      <li>Red team foothold in authorized security assessments</li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🔗 Helpful Resources</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>
        📝 Full Guide:
        <a
            href="https://ntck.co/hackerdropbox"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
        >Hacker Dropbox Walkthrough</a>
      </li>
      <li>
        📚 Twingate API Reference:
        <a
            href="https://www.twingate.com/docs/exploring-twingate-apis"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300"
        >Explore API Docs</a>
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🔒 Ethical Hacking Reminder</h2>
    <p class="text-gray-300">
      This project is for <strong class="text-white">legitimate and authorized use only</strong>.
      Always get explicit permission before deploying, especially in corporate or client environments.
    </p>

    <h2 class="text-xl font-semibold text-white">✅ Final Thoughts</h2>
    <p class="text-gray-300">
      A <strong class="text-white">Hacker Dropbox</strong> is a game-changer for sysadmins, freelancers, and security professionals.
      With <strong class="text-white">Twingate ZTNA</strong>, setup time drops from hours to minutes.
      From helping grandma to conducting pentests, this project belongs in your toolkit.
    </p>
  </div>
</template>

<script setup lang="ts">
// Static article — no interactivity required
</script>

<style scoped>
/* Tailwind only; links have underlines, high-contrast colors, and focus-visible rings for accessibility */
</style>
