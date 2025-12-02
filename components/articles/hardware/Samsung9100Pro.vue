<template>
  <article
      class="mx-auto w-full max-w-[72ch] px-5 sm:px-6 py-6 sm:py-10 bg-gray-800 rounded-2xl shadow-2xl ring-1 ring-white/5"
  >
    <!-- intro -->
    <section class="mt-6 sm:mt-8 space-y-5">
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        the <strong class="text-white">samsung 9100 pro</strong> is samsung’s first true
        <strong class="text-white">pcie&nbsp;5.0 / nvme&nbsp;2.0</strong> consumer ssd, delivering sequential reads up to
        <strong class="text-white">14.8&nbsp;gb/s</strong> and writes up to <strong class="text-white">13.4&nbsp;gb/s</strong>.
        powered by the custom <em>presto</em> controller and 236-layer v8 v-nand tlc, it’s a serious upgrade for
        <strong class="text-white">ai/llm workloads, data science, and workstation creatives</strong>.
      </p>
    </section>

    <!-- real-world performance -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">⚡ Real-World Performance</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        independent reviews place the 9100 pro at the top of gen5 drives.
        <a
            href="https://www.tomshardware.com/pc-components/ssds/samsung-bulks-the-9100-pro-up-to-8tb-for-usd999-heatsink-costs-an-extra-usd20"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="tom’s hardware coverage of samsung 9100 pro (opens in a new tab)"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
        >tom’s hardware</a>
        highlights the 8&nbsp;tb model with endurance up to <strong class="text-white">4,800&nbsp;tbw</strong>.
        in mixed real-world tests, reads commonly land around <strong class="text-white">~12.4&nbsp;gb/s</strong>, still more than
        2× the fastest pcie&nbsp;4.0 ssds.
      </p>
    </section>

    <!-- why it matters for ai/llms -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🔍 Why It Matters For AI & LLMs</h2>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li><strong>gpu offloading / oversubscription:</strong> when vram is exhausted, model weights and kv caches spill to disk; gen5 bandwidth reduces stalls and keeps tensor cores busier.</li>
        <li><strong>high-throughput dataset streaming:</strong> ingest multi-gb shards (images, parquet, text) at gen5 speeds to minimize input bottlenecks.</li>
        <li><strong>fast checkpointing:</strong> save/resume multi-gigabyte training states quickly to shrink downtime between runs.</li>
        <li><strong>concurrent i/o:</strong> sustains parallel reads/writes while the gpu computes. Useful for data loaders and multi-process training.</li>
      </ul>
    </section>

    <!-- quote -->
    <section class="mt-7 sm:mt-9">
      <blockquote
          class="border-l-4 border-indigo-500/70 pl-4 sm:pl-5 py-1 text-gray-100/90 italic text-[15.5px] sm:text-base leading-7"
      >
        “when i moved it to a pcie slot not shared with the gpu, speeds rose by 10–20%.”
        <span class="block mt-2 text-sm text-gray-400 not-italic">Community report: slot/lanes layout can impact gen5 throughput</span>
      </blockquote>
    </section>

    <!-- specs table (responsive) -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">📊 Specs At A Glance</h2>
      <div class="overflow-x-auto -mx-5 sm:mx-0">
        <table class="min-w-full table-auto text-[15px] sm:text-base text-gray-200">
          <caption class="text-left text-sm text-gray-400 mb-2">
            Samsung 9100 Pro: key specifications relevant to gen5 nvme and ai/llm workflows.
          </caption>
          <thead>
          <tr class="border-b border-gray-600/60">
            <th scope="col" class="text-left py-2 pr-4">feature</th>
            <th scope="col" class="text-left py-2">samsung 9100 pro</th>
          </tr>
          </thead>
          <tbody class="[&_th]:font-medium [&&_th]:text-white [&_td]:align-top [&_td]:py-2">
          <tr><th class="pr-4" scope="row">interface</th><td>pcie&nbsp;5.0 x4 / nvme&nbsp;2.0</td></tr>
          <tr><th class="pr-4" scope="row">sequential read</th><td>up to 14.8&nbsp;gb/s</td></tr>
          <tr><th class="pr-4" scope="row">sequential write</th><td>up to 13.4&nbsp;gb/s</td></tr>
          <tr><th class="pr-4" scope="row">capacity</th><td>up to 8&nbsp;tb</td></tr>
          <tr><th class="pr-4" scope="row">endurance</th><td>up to 4,800&nbsp;tbw (8&nbsp;tb)</td></tr>
          <tr><th class="pr-4" scope="row">controller</th><td>samsung “presto”</td></tr>
          <tr><th class="pr-4" scope="row">nand</th><td>236-layer v8 tlc</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- scalability & limits -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🏗 Scalability, Compatibility & Limits</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        to reach peak numbers you need a motherboard with true <strong class="text-white">pcie&nbsp;5.0 x4</strong> wired lanes,
        adequate cooling (heatsink + airflow), and a slot not sharing bandwidth with a gpu. consoles like ps5 and many
        mid-range desktops won’t fully leverage gen5 bandwidth yet. thermal limits or shared lanes can pull sustained speeds
        closer to <strong class="text-white">~12&nbsp;gb/s</strong>, still class-leading.
      </p>
    </section>

    <!-- video -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🎥 Benchmarks & Thermals (Video)</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        watch
        <a
            href="https://www.youtube.com/watch?v=s-BO5p_8wpc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="youtube review of samsung 9100 pro gen5 drive (opens in a new tab)"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
        >a detailed gen5 review</a>
        covering sustained transfers, thermals, and real-world workloads.
      </p>
    </section>

    <!-- learn more / buy -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🌐 Learn More & Where To Buy</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        read more at
        <a
            href="https://www.samsung.com/semiconductor/minisite/ssd/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
        >samsung semiconductor</a>, check coverage on
        <a
            href="https://www.techradar.com/computing/computing-components/samsung-9100-pro"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
        >techradar</a>,
        or
        <a
            href="https://amzn.to/4nqHsY1"
            target="_blank"
            rel="sponsored noopener noreferrer"
            aria-describedby="affiliate-note"
            class="underline underline-offset-2 decoration-pink-400 hover:decoration-pink-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 font-semibold rounded"
        >buy the samsung&nbsp;9100&nbsp;pro on amazon</a>.
      </p>
      <p id="affiliate-note" class="text-xs text-gray-400">
        As an Amazon Associate I may earn from qualifying purchases at no extra cost to you.
      </p>
    </section>
  </article>
</template>

<style scoped>
:where(p, li){ word-break: break-word; hyphens: auto; }
</style>


