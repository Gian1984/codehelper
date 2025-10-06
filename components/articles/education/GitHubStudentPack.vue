<template>
  <article
      class="mx-auto w-full max-w-[72ch] px-5 sm:px-6 py-6 sm:py-10 bg-gray-800 rounded-2xl shadow-2xl ring-1 ring-white/5"
  >

    <!-- intro -->
    <section class="mt-6 sm:mt-8 space-y-5">
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        The <strong class="text-white">GitHub Student Developer Pack</strong> unlocks
        <em>professional grade developer tools</em> for verified students completely free.
        From <strong class="text-white">Copilot Pro</strong> to
        <strong class="text-white">JetBrains IDEs</strong>, cloud credits, domains, and
        learning platforms, it helps you learn and ship software like a pro.
      </p>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        Even if many schools don’t promote it, applying is worth it—the opportunities inside
        the Pack are <strong class="text-white">enormous</strong> and can move your projects,
        skills, and career forward.
      </p>
    </section>

    <!-- key benefits -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">🚀 key benefits</h2>
      <ul class="grid gap-2.5 text-[15.5px] sm:text-base leading-7 text-gray-200 list-disc pl-5">
        <li><strong>Copilot Pro:</strong> AI pair programming (free while you’re a student).</li>
        <li><strong>JetBrains IDEs:</strong> IntelliJ IDEA, PyCharm, WebStorm, and more.</li>
        <li><strong>Cloud credits:</strong> $200 DigitalOcean, $100 Microsoft Azure.</li>
        <li><strong>Domains &amp; SSL:</strong> free .me/.tech domains and SSL certificates.</li>
        <li><strong>Learning platforms:</strong> Educative, DataCamp, FrontendMasters, Scrimba…</li>
      </ul>
    </section>

    <!-- experiences -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">📚 experiences</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        Curated “Experiences” bundle tools and tutorials into paths like
        <strong class="text-white">Intro to GitHub</strong>,
        <strong class="text-white">Markdown</strong>, and
        <strong class="text-white">Open Source</strong>—great for guided, practical projects.
      </p>
    </section>

    <!-- how to apply -->
    <section class="mt-7 sm:mt-9 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">✅ how to apply</h2>
      <ol class="list-decimal pl-5 space-y-2 text-[15.5px] sm:text-base leading-7 text-gray-200">
        <li>Have a GitHub account (13+).</li>
        <li>Verify enrollment via school email or official document.</li>
        <li>Open GitHub Education settings and submit your application.</li>
        <li>Once approved, unlock benefits in the Education portal.</li>
      </ol>
    </section>

    <!-- quote -->
    <blockquote
        class="mt-7 sm:mt-9 border-l-4 border-indigo-500/70 pl-4 sm:pl-5 py-1 text-gray-100/90 italic text-[15.5px] sm:text-base leading-7"
    >
      “with just a school email, i got copilot pro, jetbrains, and $200 in cloud credits—enough to build and deploy real projects without spending a dime.”
    </blockquote>

    <!-- link -->
    <section class="mt-7 sm:mt-9">
      <h2 class="sr-only">learn more</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        explore the full list of offers on
        <a
            href="https://education.github.com/pack"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
        >GitHub Education</a>.
      </p>
    </section>
  </article>
</template>

<style scoped>
/* small readability tweaks */
:where(p, li){ word-break: break-word; hyphens: auto; }
</style>


