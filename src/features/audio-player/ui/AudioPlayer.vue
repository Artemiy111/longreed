<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import commentaryUrl from '../assets/commentary.mp3'
import commentaryText from '../assets/transcript.txt?raw'

const { src = commentaryUrl, transcript = commentaryText } = defineProps<{ src?: string; transcript?: string }>()

const audio = useTemplateRef<HTMLAudioElement>('audio')
const playing = ref(false)
const time = ref(0)
const duration = ref(0)
const error = ref(false)

const format = (n: number) =>
  Number.isFinite(n) ? `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, '0')}` : '0:00'

async function toggle() {
  if (!audio.value) return
  if (playing.value) {
    audio.value.pause()
    return
  }
  try {
    await audio.value.play()
  } catch {
    error.value = true
  }
}

function seek(e: Event) {
  if (audio.value) audio.value.currentTime = Number((e.target as HTMLInputElement).value)
}
</script>

<template>
  <section class="audio-block" aria-label="Аудиокомментарий">
    <p class="eyebrow">ПОСЛУШАТЬ ГЛАВНОЕ</p>
    <h3>Инфраструктура доверия</h3>
    <p class="audio-credit">Авторский текст, синтезированная озвучка · русский язык</p>
    <audio
      ref="audio"
      :src="src"
      preload="none"
      @loadedmetadata="duration = audio?.duration ?? 0"
      @timeupdate="time = audio?.currentTime ?? 0"
      @play="playing = true"
      @pause="playing = false"
      @ended="playing = false"
      @error="error = true"
    ></audio>
    <div class="audio-controls">
      <button @click="toggle" :aria-label="playing ? 'Приостановить аудио' : 'Воспроизвести аудио'">{{ playing ? 'Ⅱ' : '▶' }}</button>
      <label class="audio-seek">
        <span class="sr-only">Позиция воспроизведения</span>
        <input type="range" min="0" :max="duration || 1" step="0.1" :value="time" @input="seek" />
      </label>
      <span>{{ format(time) }} / {{ format(duration) }}</span>
    </div>
    <p v-if="error" role="status">Воспроизведение недоступно в этой среде. Ниже доступна полная расшифровка.</p>
    <details>
      <summary>Текст аудиокомментария</summary>
      <p>{{ transcript }}</p>
    </details>
  </section>
</template>
