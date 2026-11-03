<script setup lang="ts">
import type { Figure } from '../model/types'

defineProps<{ figure: Figure }>()
</script>

<template>
  <figure class="figure-block">
    <img
      :src="figure.src"
      :alt="figure.title + '. ' + figure.description"
      loading="lazy"
      decoding="async"
      width="960"
      height="480"
    />
    <figcaption>
      <span>РИС. {{ figure.id }}</span>
      <div>
        <b>{{ figure.title }}</b>
        <p>{{ figure.description }}</p>
        <small>{{ figure.license }}</small>
      </div>
    </figcaption>
  </figure>
</template>
