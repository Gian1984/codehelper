<!-- error.vue -->
<template>
  <div class="min-h-screen grid place-items-center bg-gray-900 text-gray-200 px-6 py-16">
    <div class="w-full max-w-2xl text-center space-y-8">
      <NuxtImg
        src="/images/codehelper_logo_500_500_no_bg.webp"
        alt="CodeHelper logo"
        width="500"
        height="500"
        loading="eager"
        format="webp"
        class="mx-auto h-32 w-32 object-contain opacity-90"
      />

      <p class="text-3xl lg:text-5xl tracking-wide text-gray-400">
        {{ is404 ? '404 Page not found' : `error ${error.statusCode || ''}` }}
      </p>

      <h1 class="text-3xl sm:text-4xl font-bold text-white">
        {{ is404 ? 'this page doesn’t exist' : (error.statusMessage || 'something went wrong') }}
      </h1>

      <p class="text-gray-300">
        {{ is404
          ? 'the link may be broken or the page was removed.'
          : 'try again or go back to the homepage.' }}
      </p>

      <div class="flex items-center justify-center gap-3">
        <NuxtLink
            to="/"
            class="inline-flex items-center rounded-xl px-4 py-2 bg-indigo-600 hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-400"
            @click.prevent="clearError({ redirect: '/' })"
        >
          Go home
        </NuxtLink>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { clearError, useSeoMeta } from '#imports'

const props = defineProps<{ error: NuxtError }>()
const is404 = props.error?.statusCode === 404

useSeoMeta({
  title: is404 ? '404 – page not found' : `error ${props.error?.statusCode || ''}`,
  description: is404
      ? 'the page you’re looking for was not found.'
      : 'an error occurred.',
  robots: 'noindex, nofollow'
})
</script>
