<script setup lang="ts">
defineProps<{ text: string; attribution: string }>()
</script>

<template>
  <aside class="pullquote">
    <span class="quote-symbol">“</span>
    <blockquote>{{ text }}</blockquote>
    <p>{{ attribution }}</p>
  </aside>
</template>
