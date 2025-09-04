<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-10">
    <h1 class="text-3xl font-bold text-white">📦
      Access ANY Network (remotely) with a Hacker Dropbox Raspberry Pi & Twingate
    </h1>

    <p class="text-gray-300">
      Whether you’re an ethical hacker or the unofficial IT helpdesk for your family, there’s one device you should consider building:
      <strong class="text-white">a Hacker Dropbox</strong>. Drop it into any network and get instant remote access, no VPNs required.
    </p>

    <h2 class="text-xl font-semibold text-white">🚀 What Is a Hacker Dropbox?</h2>
    <p class="text-gray-300">
      A Hacker Dropbox is a compact device — often a <strong class="text-white">Raspberry Pi</strong> — configured to automatically connect to a secure external tunnel when powered on. Once online, it grants you stealthy access to the network it's plugged into.
      This makes it perfect for:
    </p>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>Remote IT support for friends, family, or clients</li>
      <li>Pentesting engagements where physical access is limited</li>
      <li>Education and experimentation with secure networking</li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🔐 Why Not Just Use VPN?</h2>
    <p class="text-gray-300">
      Traditional VPNs require complex port forwarding and router configurations. Instead, this setup uses <strong class="text-white">ZTNA (Zero Trust Network Access)</strong>
      via <a class="text-indigo-400 underline" href="https://www.twingate.com" target="_blank">Twingate</a>. It’s:
    </p>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>More secure by default</li>
      <li>Easier to deploy</li>
      <li>Cloud-native and scalable</li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🧰 What You’ll Need</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li><a class="text-indigo-400 underline" href="https://amzn.to/3JMT9JV" target="_blank">Raspberry Pi 4</a> or <a class="text-indigo-400 underline" href="https://amzn.to/4g6u2Od" target="_blank">Raspberry Pi 5</a></li>
      <li><a class="text-indigo-400 underline" href="https://www.raspberrypi.com/software/" target="_blank">Raspberry Pi Imager</a></li>
      <li><a class="text-indigo-400 underline" href="https://www.twingate.com/docs/quick-start" target="_blank">Twingate Account</a></li>
    </ul>

    <h2 class="text-xl font-semibold text-white">📦 Setup in a Nutshell</h2>
    <ol class="list-decimal list-inside text-gray-300 space-y-1">
      <li>Flash your Raspberry Pi OS with the <a class="text-indigo-400 underline" href="https://www.raspberrypi.com/software/" target="_blank">Pi Imager</a>.</li>
      <li>Install the Twingate connector package on the Pi.</li>
      <li>Connect the Pi to your Twingate network.</li>
      <li>Ship or plug it in — it auto-connects to your remote panel.</li>
    </ol>

    <h2 class="text-xl font-semibold text-white">🧑‍💻 Use Cases</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>Instant access to your grandma’s network to fix the printer (again)</li>
      <li>Drop into a client site to monitor logs or troubleshoot live</li>
      <li>Use as a foothold in red team assessments</li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🔗 Helpful Resources</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>📝 Full Guide: <a class="text-indigo-400 underline" href="https://ntck.co/hackerdropbox" target="_blank">https://ntck.co/hackerdropbox</a></li>
      <li>📚 Twingate API Reference: <a class="text-indigo-400 underline" href="https://www.twingate.com/docs/exploring-twingate-apis" target="_blank">Explore API Docs</a></li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🔒 Ethical Hacking Reminder</h2>
    <p class="text-gray-300">
      This tool is meant for legitimate use only for security assessments and authorized support. Never deploy this without explicit permission.
    </p>

    <h2 class="text-xl font-semibold text-white">✅ Final Thoughts</h2>
    <p class="text-gray-300">
      A Hacker Dropbox can be a lifesaver for sysadmins, freelancers, and security pros alike. With tools like Twingate, what once took hours of VPN setup now takes minutes. Whether you’re helping grandma or hardening your client’s infrastructure, this project belongs in your toolkit.
    </p>
  </div>
</template>

<script setup lang="ts">
// Purely static content
</script>

<style scoped>
/* Tailwind only */
</style>
