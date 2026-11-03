<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useIntersectionObserver, usePreferredReducedMotion } from '@vueuse/core'
import { gsap } from '@/shared/lib'

const props = defineProps<{ value: number; label: string }>()

const el = useTemplateRef<HTMLDivElement>('el')
const display = ref(props.value)
const reduced = usePreferredReducedMotion()
let seen = false

useIntersectionObserver(el, ([entry]) => {
  if (!entry?.isIntersecting || seen) return
  seen = true
  if (reduced.value === 'reduce') return
  const state = { n: 0 }
  gsap.to(state, {
    n: props.value,
    duration: 1.2,
    ease: 'power2.out',
    onUpdate: () => {
      display.value = Math.round(state.n)
    },
  })
})
</script>

<template>
  <div ref="el" class="stat">
    <strong>{{ String(display).padStart(2, '0') }}</strong>
    <span>{{ label }}</span>
  </div>
</template>
