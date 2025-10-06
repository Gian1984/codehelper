<template>
  <article
      class="mx-auto w-full max-w-[72ch] px-5 sm:px-6 py-6 sm:py-10 bg-gray-800 rounded-2xl shadow-2xl ring-1 ring-white/5"
  >

    <!-- intro -->
    <section class="mt-6 sm:mt-8 space-y-5">
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        The <strong class="text-white">CO₂ Battery</strong> is a breakthrough
        <strong class="text-white">closed thermo-mechanical energy storage system</strong>
        developed by
        <a
            href="https://energydome.eu/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
            aria-label="Energy Dome official website (opens in a new tab)"
        >Energy Dome</a>.
        It stores electricity by cycling carbon dioxide between high-pressure liquid and gaseous
        phases, then converts expansion into electricity—without emissions, cryogenics, or rare materials.
      </p>
    </section>

    <!-- how it works -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🔄 how it works (charge & discharge)</h2>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li><strong>Charging:</strong> CO₂ is compressed into liquid form and stored in a dome-style gasholder at ambient temperature.</li>
        <li><strong>Discharging:</strong> Liquid CO₂ evaporates and expands, driving a turbine to generate electricity, then returns to the dome.</li>
      </ul>
    </section>

    <!-- storage characteristics -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">⏳ storage characteristics</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        Designed for <strong class="text-white">long-duration energy storage</strong>, the CO₂ Battery performs
        best between <strong class="text-white">8–24 hours</strong>, ideal for renewable integration, peak shaving,
        and grid stabilization.
      </p>
    </section>

    <!-- carbon neutral & cost -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🌱 carbon-neutral & cost-efficient</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        During operation, <strong class="text-white">no CO₂ is released</strong> into the atmosphere.
        Unlike compressed air storage or lithium-ion batteries, it works at ambient temperature,
        avoiding cryogenic cooling and critical minerals. It uses only
        <strong class="text-white">water, steel, and CO₂</strong>—readily available from Tier-1 suppliers.
      </p>
    </section>

    <!-- comparison table (responsive) -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🏆 CO₂ vs. lithium-ion batteries</h2>
      <div class="overflow-x-auto -mx-5 sm:mx-0">
        <table class="min-w-full table-auto text-[15px] sm:text-base text-gray-200">
          <thead>
          <tr class="border-b border-gray-600/60">
            <th class="text-left py-2 pr-4">Feature</th>
            <th class="text-left py-2 pr-4">CO₂ Battery</th>
            <th class="text-left py-2">Lithium-Ion</th>
          </tr>
          </thead>
          <tbody class="[&_td]:py-2 [&_td]:align-top">
          <tr><td class="pr-4">Round-trip efficiency</td><td class="pr-4">~75% (no degradation)</td><td>~85% (degrades over time)</td></tr>
          <tr><td class="pr-4">Lifetime</td><td class="pr-4">30+ years</td><td>&lt;12 years</td></tr>
          <tr><td class="pr-4">CAPEX</td><td class="pr-4">1× (baseline)</td><td>~1.7× higher</td></tr>
          <tr><td class="pr-4">Depth of discharge</td><td class="pr-4">100%</td><td>&lt;80%</td></tr>
          <tr><td class="pr-4">Components</td><td class="pr-4">Standard, globally available</td><td>Depends on critical minerals</td></tr>
          <tr><td class="pr-4">Installation time</td><td class="pr-4">&lt; 2 years</td><td>&lt; 2 years</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- grid services -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🔧 scalable & grid-compatible</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        Built from <strong class="text-white">standard industrial components</strong>, the CO₂ Battery is modular,
        scalable, and deployable worldwide. It supports grid services such as:
      </p>
      <ul class="list-disc pl-5 grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li>⏱ Time-shifting renewable energy</li>
        <li>⚡ Frequency containment & restoration reserves (FCR, aFRR, mFRR)</li>
        <li>🔌 Millisecond-level voltage regulation</li>
      </ul>
    </section>

    <!-- learn more -->
    <section class="mt-7 sm:mt-9">
      <h2 class="sr-only">learn more</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        Discover how the
        <a
            href="https://energydome.eu/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
        >CO₂ Battery from Energy Dome</a>
        is pioneering the future of
        <strong class="text-white">long-duration energy storage</strong> and
        <strong class="text-white">accelerating the energy transition</strong>.
      </p>
    </section>
  </article>
</template>

<style scoped>
:where(p, li){ word-break: break-word; hyphens: auto; }
</style>

