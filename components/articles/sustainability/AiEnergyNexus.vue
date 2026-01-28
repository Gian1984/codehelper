<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-8">
    <h2 class="text-3xl font-bold text-white">The AI Energy Nexus: Are We Building the Future or Burning It?</h2>

    <p class="text-gray-300 text-base leading-relaxed">
      Global AI spending is projected to reach $1.5 trillion in 2025 and exceed $2 trillion by 2026.
      Behind these numbers lies an uncomfortable truth: AI is becoming one of the most resource-intensive technologies ever deployed.
      The so-called "AI-energy nexus" describes the growing tension between AI's hunger for electricity, water and critical minerals, and the ecosystems that provide them.
    </p>

    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <p class="text-sm text-gray-400 mb-2">The Numbers:</p>
      <ul class="text-sm font-mono text-red-400 space-y-1">
        <li>Data centers projected to consume 945 TWh by 2030 (more than Germany + France combined)</li>
        <li>AI alone may account for 20%+ of total electricity demand growth through 2030</li>
        <li>Data center water use: 450 million gallons/day by 2030 (equivalent to 5 million people)</li>
        <li>Two-thirds of US data centers sit in high water-stress regions</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">Four Pressure Points</h2>

    <ul class="space-y-4">
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">1. Energy</p>
        <p class="text-sm text-gray-300 mt-1">
          Data centers will consume over double their 2024 electricity by 2030. Fossil fuels still supply roughly 40% of new demand.
          The infrastructure buildout is happening faster than renewable capacity can scale.
        </p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">2. Water</p>
        <p class="text-sm text-gray-300 mt-1">
          Cooling systems require enormous water volumes. At scale, AI's water footprint competes directly with agriculture and municipal needs.
          This is not a theoretical concern: it is already happening.
        </p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">3. Critical Minerals</p>
        <p class="text-sm text-gray-300 mt-1">
          AI hardware depends on lithium, cobalt, nickel, copper and rare earths. 70% of cobalt comes from the Democratic Republic of Congo.
          China controls 90% of rare earth refining. Demand is expected to triple by 2030.
        </p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">4. Communities and Nature</p>
        <p class="text-sm text-gray-300 mt-1">
          Over 1,200 mining sites overlap with biodiversity hotspots. Nearly 800 disputes since 2005 have caused delays and reputational damage.
          In Chile, legal action forced lithium producers to halve extraction rates.
        </p>
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">A Developer's Perspective</h2>

    <div class="bg-blue-900/30 border border-blue-600/50 rounded-lg p-4">
      <p class="text-gray-300 text-base leading-relaxed">
        As developers, we rarely think about the physical cost of our code. We optimize for latency, throughput and user experience.
        But every API call to a large language model, every image generation request, every inference operation consumes real resources.
        The abstraction layers that make AI accessible also hide its environmental footprint.
      </p>
    </div>

    <p class="text-gray-300 text-base leading-relaxed mt-4">
      This raises uncomfortable questions about how we use these tools. Training a single large language model can emit as much carbon as five cars over their entire lifetimes.
      Running inference at scale multiplies that impact by millions of requests per day.
    </p>

    <h2 class="text-xl font-semibold text-white">The Elephant in the Server Room</h2>

    <p class="text-gray-300 text-base leading-relaxed">
      Let's be honest about what a significant portion of AI compute is actually doing right now.
    </p>

    <p class="text-gray-300 text-base leading-relaxed mt-2">
      Scroll through any social media feed and you will find AI-generated images everywhere: portraits with extra fingers, fantasy landscapes, "artistic" renders of celebrities, memes created in seconds.
      Each of those images consumed electricity, water and infrastructure capacity. The same infrastructure that could power medical research, climate modeling or scientific computing is generating disposable content that gets viewed for three seconds and forgotten.
    </p>

    <div class="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 mt-4">
      <p class="text-sm text-yellow-300 mb-2"><strong class="text-white">The Real Cost:</strong></p>
      <p class="text-sm text-gray-300">
        When someone generates 50 variations of "a cat wearing sunglasses in cyberpunk style" to find one worth posting, that is not innovation.
        That is consumption masquerading as creativity. We are burning through finite resources to produce infinite noise.
      </p>
    </div>

    <p class="text-gray-300 text-base leading-relaxed mt-4">
      This is not an argument against AI image generation as a technology. It has legitimate applications in design, prototyping, accessibility and art.
      The problem is scale without purpose. The democratization of powerful tools without any awareness of their cost.
    </p>

    <h2 class="text-xl font-semibold text-white">Code Has Consequences</h2>

    <p class="text-gray-300 text-base leading-relaxed">
      As developers integrating AI into applications, we have choices that matter:
    </p>

    <ul class="space-y-4 mt-4">
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Model Selection</p>
        <p class="text-sm text-gray-300 mt-1">
          Do you need GPT-4 for that task, or would a smaller model suffice? Running a 7B parameter model locally consumes a fraction of what a 175B+ API call requires.
          Choosing the right tool for the job is now an environmental decision.
        </p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Caching and Batching</p>
        <p class="text-sm text-gray-300 mt-1">
          How many redundant inference calls does your application make? Caching responses, batching requests and implementing rate limits are not just cost optimizations.
          They reduce load on infrastructure that runs 24/7.
        </p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">Feature Justification</p>
        <p class="text-sm text-gray-300 mt-1">
          Does your product actually need AI, or is it a checkbox feature for marketing? Adding AI capabilities because competitors have them, without clear user value, is waste with environmental consequences.
        </p>
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">Industry Recommendations</h2>

    <p class="text-gray-300 text-base leading-relaxed">
      The World Economic Forum outlines several approaches for stakeholders across the AI supply chain:
    </p>

    <div class="overflow-x-auto mt-4">
      <table class="w-full text-sm text-gray-300 border border-gray-700">
        <thead class="bg-gray-900">
          <tr>
            <th class="p-3 text-left border-b border-gray-700">Area</th>
            <th class="p-3 text-left border-b border-gray-700">Key Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">Data Centers</td>
            <td class="p-3">Site selection based on low-carbon grids and water availability; PUE targets below 1.2; renewable power agreements</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">Resource Extraction</td>
            <td class="p-3">Prioritize efficiency and circularity; invest in recycling and closed-loop mineral recovery</td>
          </tr>
          <tr class="border-b border-gray-700">
            <td class="p-3 font-semibold text-white">AI Software</td>
            <td class="p-3">Optimize training and inference efficiency; embed resource metrics into performance tracking</td>
          </tr>
          <tr>
            <td class="p-3 font-semibold text-white">Investment</td>
            <td class="p-3">Assess portfolio exposure to energy and water risks; prioritize companies with credible sustainability frameworks</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-xl font-semibold text-white">Key Takeaways</h2>
    <div class="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-600/50 rounded-lg p-6">
      <ul class="text-gray-300 space-y-2">
        <li><strong class="text-white">Resource interdependence</strong> means solving energy alone will not fix water or mineral constraints</li>
        <li><strong class="text-white">Infrastructure growth</strong> is outpacing renewable energy deployment in most regions</li>
        <li><strong class="text-white">Developer choices</strong> about model selection, caching and feature necessity have real environmental impact</li>
        <li><strong class="text-white">Frivolous usage</strong> of AI for disposable content represents a misallocation of scarce resources</li>
        <li><strong class="text-white">Integrated strategies</strong> across energy, water, materials and biodiversity are essential for sustainable AI growth</li>
      </ul>
    </div>

    <h2 class="text-xl font-semibold text-white">Conclusion</h2>
    <p class="text-gray-300 text-base leading-relaxed">
      AI has genuine potential to accelerate scientific discovery, improve healthcare, optimize energy systems and solve complex problems.
      But that potential is being diluted by an ocean of trivial applications that treat compute as infinite and free.
    </p>
    <p class="text-gray-300 text-base leading-relaxed mt-2">
      The developers building AI applications today will shape how these resources are allocated tomorrow.
      We can choose to build tools that matter, or we can generate another million images of cats in sunglasses while the planet warms.
      The infrastructure does not care which one we pick. The consequences will be the same either way.
    </p>

    <h2 class="text-xl font-semibold text-white">Resources</h2>
    <ul class="grid md:grid-cols-2 gap-4 text-gray-300">
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">1. <a class="text-indigo-400 hover:underline" href="https://www.weforum.org/" target="_blank" rel="noopener">World Economic Forum</a></p>
        <p class="text-sm mt-1">Original source for AI-energy nexus analysis.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">2. <a class="text-indigo-400 hover:underline" href="https://www.iea.org/" target="_blank" rel="noopener">International Energy Agency</a></p>
        <p class="text-sm mt-1">Data center energy consumption projections.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">3. <a class="text-indigo-400 hover:underline" href="https://mlco2.github.io/impact/" target="_blank" rel="noopener">ML CO2 Impact</a></p>
        <p class="text-sm mt-1">Calculator for estimating carbon emissions from ML training.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">4. <a class="text-indigo-400 hover:underline" href="https://www.nature.com/articles/s41558-022-01377-7" target="_blank" rel="noopener">Nature Climate Change</a></p>
        <p class="text-sm mt-1">Research on AI's environmental footprint.</p>
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
