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
          <h1 class="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Empowering Developers Everywhere</h1>
          <p class="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Open source isn't just code—it's a movement. By sharing knowledge and making tools freely accessible, we enable developers to build, learn, and grow together.
          </p>
        </div>
      </div>

      <!-- Content section -->
      <div class="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div class="grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-300 lg:max-w-none lg:grid-cols-2">
            <div>
              <p>
                Open source software fuels innovation. It gives developers the freedom to study, modify, and build upon the work of others—creating a cycle of continuous improvement. It’s how great ideas grow beyond borders and benefit everyone.
              </p>
              <p class="mt-8">
                When we share our tools and knowledge freely, we lower the barriers for learning and unlock potential in communities across the world. Open ecosystems aren’t just about software—they’re about empowering people.
              </p>
            </div>
            <div>
              <p>
                From the smallest script to the largest framework, open source plays a critical role in today’s technology. Most of the web is built on it. Most of what we use every day depends on it. It's not just a resource—it's a foundation.
              </p>
              <p class="mt-8">
                By contributing to open source or even just using it mindfully, you’re part of something bigger. You’re helping make the developer world more inclusive, more collaborative, and more accessible for all.
              </p>
            </div>
          </div>
          <dl class="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
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
          <h2 class="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">My values</h2>
          <p class="mt-6 text-lg/8 text-gray-300">
            I'm building CodeHelper with the belief that knowledge should be shared, tools should be accessible, and even one developer can make a big impact.
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
          <h2 class="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl mx-auto">About me</h2>
          <p class="mt-6 text-lg/8 text-gray-300">
            I'm Gianluca Tiengo, a passionate web developer who enjoys building everything from small tools to full interactive web apps. CodeHelper is my way to give back — open source, accessible, and built with love.
          </p>
        </div>

        <div class="mx-auto mt-16 max-w-sm text-center">
          <img
              class="aspect-square w-full rounded-2xl"
              src="/images/codehelper_logo_500_500_no_bg.webp"
              alt="Gianluca Tiengo"
          />
          <h3 class="mt-10 text-lg font-semibold tracking-tight text-white">Gianluca Tiengo</h3>
          <p class="text-base text-gray-300">Web Developer</p>
          <p class="text-sm text-gray-500">Based in Europe, coding with ❤️</p>
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
  title: 'About CodeHelper — Gianluca Tiengo',
  description: 'Learn more about Gianluca Tiengo, the creator of CodeHelper. Discover the values, vision, and mission behind this open-source-driven project.',
  ogTitle: 'About CodeHelper — Gianluca Tiengo',
  ogDescription: 'CodeHelper is built with love and dedication to open source. Learn about the developer behind the tools and why this project exists.',
  ogImage: '/images/codehelper_OGIMAGE.webp',
  ogUrl: 'https://codehelper.me/about',
  twitterCard: 'summary_large_image',
  twitterTitle: 'About CodeHelper — Gianluca Tiengo',
  twitterDescription: 'Meet the developer behind CodeHelper. Explore the mission and values of this open-source project.',
  twitterImage: '/images/codehelper_OGIMAGE.webp'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Gianluca Tiengo',
        url: 'https://codehelper.me/about',
        image: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
        sameAs: [
          'https://github.com/gianlucatiengo',
          'https://codehelper.me'
        ],
        jobTitle: 'Web Developer',
        worksFor: {
          '@type': 'Organization',
          name: 'CodeHelper'
        }
      })
    }
  ]
})

const stats = [
  { label: 'Open source projects on GitHub', value: '400M+' },
  { label: 'Developers contributing worldwide', value: '94M+' },
  { label: 'Lines of open code shared daily', value: '1B+' },
  { label: 'Countries participating', value: '180+' },
]

const values = [
  {
    name: 'Be world-class.',
    description: 'Strive for excellence in everything you build. CodeHelper aims to empower developers with the best tools, freely available to all.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Take responsibility.',
    description: 'Open source thrives on trust. Be accountable for the code you share and the impact it has on others using CodeHelper tools.',
    icon: HandRaisedIcon,
  },
  {
    name: 'Be supportive.',
    description: 'Help other developers grow. Whether it’s a GitHub issue or a community forum, your support strengthens the ecosystem.',
    icon: UserGroupIcon,
  },
  {
    name: 'Always learning.',
    description: 'Tech evolves fast. CodeHelper is built with curiosity and continuous learning in mind — stay sharp and keep exploring.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Share everything you know.',
    description: 'Knowledge should be open. Document, blog, or just push code — everything you share helps someone build better.',
    icon: SparklesIcon,
  },
  {
    name: 'Enjoy downtime.',
    description: 'Great ideas are born during rest. I believe balance fuels creativity — step back, recharge, and come back stronger.',
    icon: SunIcon,
  },
]
</script>

