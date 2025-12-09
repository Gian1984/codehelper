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
            CodeHelper is your <strong class="text-white">complete developer toolkit</strong> —
            100+ privacy-first tools, 800+ curated resources, and 400+ public APIs.
            Everything runs <strong class="text-white">entirely in your browser</strong>, fast and sustainable.
          </p>
        </div>
      </div>

      <!-- Stats -->
      <div class="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
        <dl class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div v-for="(stat, statIdx) in stats" :key="statIdx" class="rounded-lg bg-gray-800 border border-gray-700 p-6 text-center  hover:shadow-lg transition">
            <dt class="text-sm text-gray-400 mb-2">{{ stat.label }}</dt>
            <dd class="text-3xl font-bold" :class="stat.color">{{ stat.value }}</dd>
          </div>
        </dl>
      </div>

      <!-- Mission Section -->
      <div class="mx-auto mt-24 max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-8">
            Our Mission
          </h2>
          <div class="grid gap-8 lg:grid-cols-2">
            <!-- CodeHelper Tools -->
            <div class="rounded-lg bg-gradient-to-br from-indigo-900/20 to-indigo-800/10 border border-indigo-500/30 p-8  hover:shadow-lg transition">
              <h3 class="text-xl font-semibold text-white mb-4">Privacy-First Tools</h3>
              <p class="text-gray-300 mb-4">
                CodeHelper was created to remove friction from everyday development. Instead of cloud services,
                our <strong class="text-white">client-side utilities</strong> help you format JSON, minify assets,
                test regex, and more—in seconds.
              </p>
              <p class="text-gray-300">
                Because everything runs locally, your data stays with you. <strong class="text-white">Zero server uploads</strong>,
                better for privacy and the planet.
              </p>
            </div>

            <!-- Resources & APIs -->
            <div class="rounded-lg bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 p-8  hover:shadow-lg transition">
              <h3 class="text-xl font-semibold text-white mb-4">Curated Knowledge Base</h3>
              <p class="text-gray-300 mb-4">
                Beyond tools, CodeHelper is a <strong class="text-white">comprehensive directory</strong> of
                developer resources. Discover hand-picked UI libraries, color tools, icon sets, and public APIs.
              </p>
              <p class="text-gray-300">
                Everything organized by category, making it <strong class="text-white">easy to find</strong> exactly
                what you need for your project.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Values section -->
      <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 mb-12">
          <h2 class="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
            Guiding Principles
          </h2>
          <p class="mt-6 text-lg/8 text-gray-300">
            CodeHelper is guided by simple rules: <strong class="text-white">ship small, respect privacy</strong>,
            and make tools anyone can use and learn from.
          </p>
        </div>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="value in values" :key="value.name" class="rounded-lg bg-gray-800 border border-gray-700 p-6  hover:shadow-lg transition">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <component :is="value.icon" class="w-5 h-5 text-white" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-2">{{ value.name }}</h3>
                <p class="text-gray-300 text-sm">{{ value.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- What Makes Us Different -->
      <div class="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 mb-12">
          <h2 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            What Makes Us Different
          </h2>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-lg bg-gray-800 border border-gray-700 p-6  hover:shadow-lg transition">
            <h3 class="text-lg font-semibold text-white mb-3">100% Client-Side</h3>
            <ul class="space-y-2 text-sm text-gray-300">
              <li class="flex items-start gap-2">
                <span class="text-indigo-400 mt-1">•</span>
                <span>No data sent to servers</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-indigo-400 mt-1">•</span>
                <span>Works offline</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-indigo-400 mt-1">•</span>
                <span>Instant results</span>
              </li>
            </ul>
          </div>

          <div class="rounded-lg bg-gray-800 border border-gray-700 p-6  hover:shadow-lg transition">
            <h3 class="text-lg font-semibold text-white mb-3">Open Source</h3>
            <ul class="space-y-2 text-sm text-gray-300">
              <li class="flex items-start gap-2">
                <span class="text-purple-400 mt-1">•</span>
                <span>Transparent codebase</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-purple-400 mt-1">•</span>
                <span>Community contributions welcome</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-purple-400 mt-1">•</span>
                <span>Free forever</span>
              </li>
            </ul>
          </div>

          <div class="rounded-lg bg-gray-800 border border-gray-700 p-6  hover:shadow-lg transition">
            <h3 class="text-lg font-semibold text-white mb-3">Comprehensive</h3>
            <ul class="space-y-2 text-sm text-gray-300">
              <li class="flex items-start gap-2">
                <span class="text-pink-400 mt-1">•</span>
                <span>Tools + Resources + APIs</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-pink-400 mt-1">•</span>
                <span>All in one place</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-pink-400 mt-1">•</span>
                <span>Constantly growing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- About Gianluca section -->
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div class="mx-auto max-w-4xl">
          <div class="rounded-2xl bg-gray-800 border border-gray-700 p-8 lg:p-12  hover:shadow-lg transition">
            <div class="lg:grid lg:grid-cols-3 lg:gap-8">
              <div class="lg:col-span-1">
                <NuxtImg
                  class="aspect-square w-full rounded-2xl object-cover"
                  src="/images/codehelper_logo_500_500_no_bg.webp"
                  alt="Gianluca Tiengo - CodeHelper Creator"
                  width="500"
                  height="500"
                  loading="lazy"
                  format="webp"
                />
              </div>
              <div class="mt-8 lg:mt-0 lg:col-span-2">
                <h2 class="text-3xl font-semibold text-white mb-4">About the Creator</h2>
                <p class="text-gray-300 mb-4">
                  I'm <strong class="text-white">Gianluca Tiengo</strong>, a web developer who enjoys crafting
                  <strong class="text-white">small, fast, and useful</strong> tools.
                </p>
                <p class="text-gray-300 mb-4">
                  CodeHelper started as a personal collection of utilities I built for my own workflow.
                  It grew into a comprehensive toolkit because I believe developers deserve
                  <strong class="text-white">privacy-respecting, free tools</strong> that just work.
                </p>
                <p class="text-gray-300 mb-6">
                  Every tool, every resource, every API listing is carefully curated to help you ship faster
                  without compromising on privacy or quality.
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://gianlucatiengo.com/"
                    target="_blank"
                    rel="noopener"
                    class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition font-medium text-center"
                  >
                    Visit My Website
                  </a>
                  <a
                    href="https://github.com/Gian1984/codehelper"
                    target="_blank"
                    rel="noopener"
                    class="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition font-medium text-center"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  RocketLaunchIcon,
  HandRaisedIcon,
  UserGroupIcon,
  AcademicCapIcon,
  SparklesIcon,
  SunIcon
} from '@heroicons/vue/20/solid'
import { useSeoMeta, useHead } from '#imports'
import { tools } from '~/utils/toolRegistry'
import { getTotalResourcesCount } from '~/utils/externalRegistry'
import { getTotalAPIsCount } from '~/utils/apiRegistry'
import { articles } from '~/utils/articlesRegistry'

useSeoMeta({
  title: 'About CodeHelper — Privacy-First Developer Tools, Resources & APIs',
  description: 'Learn about CodeHelper: 100+ privacy-first tools, 800+ curated resources, 400+ public APIs. Open-source, client-side, and built for developers.',
  ogTitle: 'About CodeHelper & Gianluca Tiengo',
  ogDescription: 'The story, principles, and mission behind CodeHelper—your complete developer toolkit.',
  ogImage: '/images/codehelper_OGIMAGE.webp',
  ogType: 'profile',
  ogUrl: 'https://codehelper.me/about',
  twitterCard: 'summary_large_image',
  twitterTitle: 'About CodeHelper & Gianluca Tiengo',
  twitterDescription: 'Open-source, privacy-first toolkit for developers—learn the why behind CodeHelper.',
  twitterImage: '/images/codehelper_OGIMAGE.webp',
  robots: 'index,follow',
  keywords: 'about codehelper, gianluca tiengo, open source developer tools, client-side tools, privacy-first, web development utilities'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://codehelper.me/about' }
  ],
  script: [
    {
      type: 'application/ld+json',
      key: 'aboutpage',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About CodeHelper',
        url: 'https://codehelper.me/about',
        description: 'About CodeHelper and Gianluca Tiengo - open-source, privacy-first tools for developers.'
      })
    },
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

// Real stats from registries
const stats = computed(() => [
  {
    label: 'Developer Tools',
    value: `${Object.keys(tools).length}+`,
    color: 'text-indigo-400'
  },
  {
    label: 'External Resources',
    value: `${getTotalResourcesCount()}+`,
    color: 'text-purple-400'
  },
  {
    label: 'Public APIs',
    value: `${getTotalAPIsCount()}+`,
    color: 'text-pink-400'
  },
  {
    label: 'Articles & Guides',
    value: `${Object.keys(articles).length}+`,
    color: 'text-indigo-400'
  }
])

const values = [
  {
    name: 'Ship Small & Fast',
    description: 'Each tool is focused, fast, and dependency-light, so you get results in seconds.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Respect Privacy',
    description: 'Everything runs client-side. Your data never leaves the browser.',
    icon: HandRaisedIcon,
  },
  {
    name: 'Help Each Other',
    description: 'Clear code, clear docs, and friendly issues to welcome contributors.',
    icon: UserGroupIcon,
  },
  {
    name: 'Learn Constantly',
    description: 'Keep iterating. Favor clarity over cleverness and polish over bloat.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Share Knowledge',
    description: 'Publish what you build: articles, examples, and transparent roadmaps.',
    icon: SparklesIcon,
  },
  {
    name: 'Sustainable Craft',
    description: 'Prefer sustainable tools and UX that respect users and their time.',
    icon: SunIcon,
  },
]
</script>
