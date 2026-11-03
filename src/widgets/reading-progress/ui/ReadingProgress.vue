<script setup lang="ts">
defineProps<{ progress: number }>()
</script>

<template>
  <div class="reading-progress" aria-hidden="true">
    <div :style="{ transform: `scaleX(${progress})` }"></div>
  </div>
</template>
