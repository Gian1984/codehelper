<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-10">
    <h1 class="text-3xl font-bold text-white">
      💾 Samsung 9100 Pro NVMe SSD PCIe 5.0 (NVMe 2.0) Up to 14.8&nbsp;GB/s
    </h1>

    <p class="text-gray-300">
      The <strong class="text-white">Samsung 9100 Pro</strong> is Samsung’s first true
      <strong class="text-white">PCIe&nbsp;5.0 / NVMe&nbsp;2.0</strong> consumer SSD, delivering sequential reads up to
      <strong class="text-white">14.8&nbsp;GB/s</strong> and writes up to <strong class="text-white">13.4&nbsp;GB/s</strong>.
      Powered by the custom <em>Presto</em> controller and 236-layer V8 V-NAND TLC, it’s a serious upgrade for
      <strong class="text-white">AI/LLM workloads, data science, and workstation creatives</strong>.
    </p>

    <h2 class="text-xl font-semibold text-white">⚡ Real-World Performance</h2>
    <p class="text-gray-300">
      Independent reviews place the 9100 Pro at the top of Gen5 drives.
      <a
          href="https://www.tomshardware.com/pc-components/ssds/samsung-bulks-the-9100-pro-up-to-8tb-for-usd999-heatsink-costs-an-extra-usd20"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tom’s Hardware coverage of Samsung 9100 Pro (opens in a new tab)"
          class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >Tom’s Hardware</a>
      highlights the 8&nbsp;TB model with endurance up to <strong class="text-white">4,800&nbsp;TBW</strong>.
      In mixed real-world tests, reads commonly land around <strong class="text-white">~12.4&nbsp;GB/s</strong>—still more than
      2× the fastest PCIe&nbsp;4.0 SSDs.
    </p>

    <h2 class="text-xl font-semibold text-white">🔍 Why It Matters for AI &amp; LLMs</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-2">
      <li><strong>GPU offloading / oversubscription:</strong> When VRAM is exhausted, model weights and KV-caches spill to disk; Gen5 bandwidth reduces stalls and keeps tensor cores busier.</li>
      <li><strong>High-throughput dataset streaming:</strong> Ingest multi-GB shards (images, parquet, text) at Gen5 speeds to minimize input bottlenecks.</li>
      <li><strong>Fast checkpointing:</strong> Save and resume multi-gigabyte training states quickly to shrink downtime between runs.</li>
      <li><strong>Concurrent I/O:</strong> Sustains parallel reads/writes while the GPU computes—useful for data loaders and multi-process training.</li>
    </ul>

    <blockquote class="border-l-4 border-indigo-500 pl-4 text-gray-200/90 italic">
      “When I moved it to a PCIe slot not shared with the GPU, speeds rose by 10–20%.”
      <span class="block mt-2 text-sm text-gray-400">— Community report (slot/lanes layout can impact Gen5 throughput)</span>
    </blockquote>

    <h2 class="text-xl font-semibold text-white">📊 Specs at a Glance</h2>
    <table class="w-full table-auto text-gray-300">
      <caption class="text-left text-sm text-gray-400 mb-2">
        Samsung 9100 Pro key specifications relevant to Gen5 NVMe and AI/LLM workflows.
      </caption>
      <thead>
      <tr class="border-b border-gray-600">
        <th scope="col" class="text-left py-2">Feature</th>
        <th scope="col" class="text-left py-2">Samsung 9100 Pro</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row" class="py-1 font-medium text-white">Interface</th>
        <td class="py-1">PCIe&nbsp;5.0 x4 / NVMe&nbsp;2.0</td>
      </tr>
      <tr>
        <th scope="row" class="py-1 font-medium text-white">Sequential Read</th>
        <td class="py-1">Up to 14.8&nbsp;GB/s</td>
      </tr>
      <tr>
        <th scope="row" class="py-1 font-medium text-white">Sequential Write</th>
        <td class="py-1">Up to 13.4&nbsp;GB/s</td>
      </tr>
      <tr>
        <th scope="row" class="py-1 font-medium text-white">Capacity</th>
        <td class="py-1">Up to 8&nbsp;TB</td>
      </tr>
      <tr>
        <th scope="row" class="py-1 font-medium text-white">Endurance</th>
        <td class="py-1">Up to 4,800&nbsp;TBW (8&nbsp;TB)</td>
      </tr>
      <tr>
        <th scope="row" class="py-1 font-medium text-white">Controller</th>
        <td class="py-1">Samsung “Presto”</td>
      </tr>
      <tr>
        <th scope="row" class="py-1 font-medium text-white">NAND</th>
        <td class="py-1">236-layer V8 TLC</td>
      </tr>
      </tbody>
    </table>

    <h2 class="text-xl font-semibold text-white">🏗 Scalability, Compatibility &amp; Limits</h2>
    <p class="text-gray-300">
      To reach peak numbers you need a motherboard with true <strong class="text-white">PCIe&nbsp;5.0 x4</strong> wired lanes,
      adequate cooling (heatsink + airflow), and a slot not sharing bandwidth with a GPU. Consoles like PS5 and many
      mid-range desktops won’t fully leverage Gen5 bandwidth yet. Thermal limits or shared lanes can pull sustained speeds
      closer to <strong class="text-white">~12&nbsp;GB/s</strong>—still class-leading.
    </p>

    <h2 class="text-xl font-semibold text-white">🎥 Benchmarks &amp; Thermals (Video)</h2>
    <p class="text-gray-300">
      Watch
      <a
          href="https://www.youtube.com/watch?v=s-BO5p_8wpc"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube review of Samsung 9100 Pro Gen5 drive (opens in a new tab)"
          class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >a detailed Gen5 review</a>
      covering sustained transfers, thermals, and real-world workloads.
    </p>

    <h2 class="text-xl font-semibold text-white">🌐 Learn More &amp; Where to Buy</h2>
    <p class="text-gray-300">
      Read more at
      <a
          href="https://www.samsung.com/semiconductor/minisite/ssd/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >Samsung Semiconductor</a>, check coverage on
      <a
          href="https://www.techradar.com/computing/computing-components/samsung-9100-pro"
          target="_blank"
          rel="noopener noreferrer"
          class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >TechRadar</a>,
      or
      <a
          href="https://amzn.to/4nqHsY1"
          target="_blank"
          rel="sponsored noopener noreferrer"
          aria-describedby="affiliate-note"
          class="underline underline-offset-2 decoration-pink-400 hover:decoration-pink-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 font-semibold"
      >buy the Samsung&nbsp;9100&nbsp;Pro on Amazon</a>.
    </p>
    <p id="affiliate-note" class="text-xs text-gray-400">
      As an Amazon Associate I may earn from qualifying purchases—at no extra cost to you.
    </p>
  </div>
</template>

<script setup lang="ts">
// Static article — no interactivity required
</script>

<style scoped>
/* Tailwind only; link styles handled with utility classes.
   We keep underlines visible and add focus-visible rings for accessibility. */
</style>

