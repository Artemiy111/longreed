<script setup lang="ts">
import { ref, defineAsyncComponent, useTemplateRef } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import type { ChartKind } from '@/entities/chapter'

defineProps<{ chart: ChartKind }>()

const DataChart = defineAsyncComponent(() => import('./DataChart.vue'))

const root = useTemplateRef<HTMLDivElement>('root')
const seen = ref(false)

useIntersectionObserver(
  root,
  ([entry]) => {
    if (entry?.isIntersecting) seen.value = true
  },
  { rootMargin: '350px' },
)
</script>

<template>
  <div ref="root" class="chart-lazy">
    <DataChart v-if="seen" :chart="chart" />
    <p v-else class="chart-loading">График загружается при приближении к экрану.</p>
  </div>
</template>
