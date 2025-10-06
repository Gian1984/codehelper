<!-- components/DateBadge.vue -->
<template>
  <time :datetime="iso">{{ label }}</time>
</template>

<script setup lang="ts">
const props = defineProps<{ iso: string }>()
const label = useDateLabel(props.iso) // <- from composable
</script>

