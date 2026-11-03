<script setup lang="ts">
import { usePreferredReducedMotion } from '@vueuse/core'
import type { BankCase } from '../model/types'

defineProps<{ item: BankCase; href?: string }>()

const reducedMotion = usePreferredReducedMotion()
</script>

<template>
  <article
    class="case-card"
    v-motion
    :initial="{ opacity: 1 }"
    :visibleOnce="{ opacity: 1, transition: { duration: 500 } }"
    :hovered="reducedMotion === 'reduce' ? {} : { y: -4, transition: { duration: 400 } }"
  >
    <p class="eyebrow">{{ item.name }}</p>
    <h3>{{ item.title }}</h3>
    <p>{{ item.text }}</p>
    <a :href="href" target="_blank" rel="noopener noreferrer">Разобрать кейс ↗</a>
  </article>
</template>
