<template>
  <div class="bg-gray-900">
    <div class="relative isolate">
      <!-- Background -->
      <div class="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
        <div class="aspect-1108/632 w-[69.25rem] flex-none bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-25" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" />
      </div>

      <!-- Header section -->
      <div class="px-6 pt-14 lg:px-8">
        <div class="mx-auto max-w-4xl pt-6 text-center sm:pt-24">
          <h1 class="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            About CodeHelper
          </h1>
          <p class="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            CodeHelper is a <strong class="text-white">privacy-first, open-source</strong> toolbox for developers.
            Every tool runs <strong class="text-white">entirely in your browser</strong> fast, lightweight, and sustainable, so you can format, convert, and prototype without sending data anywhere.
          </p>
        </div>
      </div>

      <!-- Content section -->
      <div class="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div class="grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-300 lg:max-w-none lg:grid-cols-2">
            <div>
              <p>
                CodeHelper was created to remove friction from everyday development. Instead of spinning up heavy stacks
                or cloud services, these <strong class="text-white">single-purpose, client-side utilities</strong> help you format JSON, minify assets, test regex, convert units, and more in second, no sign-ups, no tracking, no noise.
              </p>
              <p class="mt-8">
                Because everything runs locally, your data stays with you. That means <strong class="text-white">zero server uploads</strong> and less energy use compared to remote tools or AI pipelines, better for privacy and the planet.
              </p>
            </div>
            <div>
              <p>
                Open source is how CodeHelper grows. Clear code, small dependencies, and pragmatic UX make each tool easy to
                understand and easy to improve. Contributions new tools, bug fixes, docs are always welcome.
              </p>
              <p class="mt-8">
                If you’re a designer, dev, or student, CodeHelper aims to be the <strong class="text-white">fastest way from idea to output</strong>.
                Less setup. Fewer tabs. Cleaner results.
              </p>
            </div>
          </div>

          <!-- Stats -->
          <dl class="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
            <!-- Update these values with real numbers when available -->
            <div v-for="(stat, statIdx) in stats" :key="statIdx" class="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6">
              <dt class="text-base/7 text-gray-300">{{ stat.label }}</dt>
              <dd class="text-3xl font-semibold tracking-tight text-white">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Values section -->
      <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Principles I build by</h2>
          <p class="mt-6 text-lg/8 text-gray-300">
            CodeHelper is guided by simple rules: <strong class="text-white">ship small, respect privacy,</strong> and make tools anyone can use, and learn from.
          </p>
        </div>
        <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16">
          <div v-for="value in values" :key="value.name" class="relative pl-9">
            <dt class="inline font-semibold text-white">
              <component :is="value.icon" class="absolute top-1 left-1 size-5 text-indigo-500" aria-hidden="true" />
              {{ value.name }}
            </dt>
            {{ ' ' }}
            <dd class="inline">{{ value.description }}</dd>
          </div>
        </dl>
      </div>

      <!-- About Me section -->
      <div class="mx-auto max-w-2xl py-24 text-center sm:py-40">
        <div class="mx-auto max-w-2xl lg:mx-0 text-center">
          <h2 class="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl mx-auto">About Gianluca</h2>
          <p class="mt-6 text-lg/8 text-gray-300">
            I’m <strong class="text-white">Gianluca Tiengo</strong>, a web developer who enjoys crafting <strong class="text-white">small, fast, and useful</strong> tools.
            CodeHelper is my way to give back to the developer community fully open source, transparent, and focused on real world workflows.
          </p>
        </div>

        <div class="mx-auto mt-16 max-w-sm text-center">
          <NuxtImg
            class="aspect-square w-full rounded-2xl"
            src="/images/codehelper_logo_500_500_no_bg.webp"
            alt="Logo placeholder for CodeHelper by Gianluca Tiengo"
            width="500"
            height="500"
            loading="lazy"
            format="webp"
          />
          <h3 class="mt-10 text-lg font-semibold tracking-tight text-white">
            <a href="https://gianlucatiengo.com/" target="_blank" rel="noopener" class="hover:text-indigo-400">
              Gianluca Tiengo
            </a>
          </h3>
          <p class="text-base text-gray-300">Web Developer &amp; Open-Source Maker</p>
          <p class="text-sm text-gray-500">Based in Europe</p>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import {
  AcademicCapIcon,
  HandRaisedIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon
} from '@heroicons/vue/20/solid'
import { useSeoMeta, useHead } from '#imports'

useSeoMeta({
  title: 'About CodeHelper & Gianluca Tiengo — Open-Source, Privacy-First Developer Tools',
  description: 'Learn about CodeHelper’s mission, values, and the maker behind it. Open-source, privacy-first, and fully client-side tools for developers.',
  ogTitle: 'About CodeHelper & Gianluca Tiengo',
  ogDescription: 'The story, principles, and mission behind CodeHelper—lightweight, client-side tools that respect privacy.',
  ogImage: '/images/codehelper_OGIMAGE.webp',
  ogType: 'profile', // about a person & project
  ogUrl: 'https://codehelper.me/about',
  twitterCard: 'summary_large_image',
  twitterTitle: 'About CodeHelper & Gianluca Tiengo',
  twitterDescription: 'Open-source, privacy-first tools for developers—learn the why behind CodeHelper.',
  twitterImage: '/images/codehelper_OGIMAGE.webp',
  robots: 'index,follow',
  // Helpful extra metas
  keywords: 'about codehelper, gianluca tiengo, open source developer tools, client-side tools, privacy-first, web development utilities'
})

// Add Organization + AboutPage + BreadcrumbList schema
useHead({
  link: [
    { rel: 'canonical', href: 'https://codehelper.me/about' }
  ],
  script: [
    // AboutPage
    {
      type: 'application/ld+json',
      key: 'aboutpage',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About CodeHelper',
        url: 'https://codehelper.me/about',
        description: 'About CodeHelper and Gianluca Tiengo open-source, privacy-first tools for developers.'
      })
    },
    // Person
    {
      type: 'application/ld+json',
      key: 'person',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Gianluca Tiengo',
        url: 'https://codehelper.me/about',
        image: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
        jobTitle: 'Web Developer',
        sameAs: [
          'https://github.com/gianlucatiengo',
          'https://codehelper.me'
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'CodeHelper',
          url: 'https://codehelper.me'
        }
      })
    },
    // Organization
    {
      type: 'application/ld+json',
      key: 'org',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CodeHelper',
        url: 'https://codehelper.me',
        logo: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
        sameAs: ['https://github.com/Gian1984/codehelper']
      })
    },
    // Breadcrumbs
    {
      type: 'application/ld+json',
      key: 'breadcrumbs',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://codehelper.me' },
          { '@type': 'ListItem', position: 2, name: 'About', item: 'https://codehelper.me/about' }
        ]
      })
    }
  ]
})

// ---- Content data (update counts with real values) ----
const stats = [
  { label: 'Open-source tools', value: '20+' },        // ← update
  { label: 'Lines of code shipped', value: '50k+' },   // ← update or remove
  { label: 'GitHub stars', value: '100+' },            // ← update
  { label: 'Community contributors', value: '10+' }    // ← update
]

const values = [
  {
    name: 'Ship small & fast.',
    description: 'Each tool is focused, fast, and dependency light, so you get results in seconds.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Respect privacy.',
    description: 'Everything runs client-side. Your data never leaves the browser.',
    icon: HandRaisedIcon,
  },
  {
    name: 'Help each other grow.',
    description: 'Clear code, clear docs, and friendly issues to welcome contributors.',
    icon: UserGroupIcon,
  },
  {
    name: 'Learn constantly.',
    description: 'Keep iterating. Favor clarity over cleverness and polish over bloat.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Share knowledge.',
    description: 'Publish what you build: articles, examples, and transparent roadmaps.',
    icon: SparklesIcon,
  },
  {
    name: 'Protect the craft.',
    description: 'Prefer sustainable tools and UX that respect users and their time.',
    icon: SunIcon,
  },
]
</script>



