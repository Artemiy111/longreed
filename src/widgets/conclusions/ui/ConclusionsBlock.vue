<script setup lang="ts">
import { conclusions } from '@/entities/chapter'
</script>

<template>
  <section id="conclusions" class="conclusions" aria-labelledby="conclusions-title">
    <p class="eyebrow">09 / ЧТО ОСТАЁТСЯ ПОСЛЕ ШУМА</p>
    <h2 id="conclusions-title">Пять решений.<br /><em>Одна логика.</em></h2>
    <article v-for="(item, i) in conclusions" :key="item.title" class="conclusion">
      <span>0{{ i + 1 }}</span>
      <div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </div>
    </article>
  </section>
</template>
