<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import { gsap } from '@/shared/lib'

type Stage = [num: string, title: string, text: string, unit: string]

const stages: Stage[] = [
  ['01', 'Виртуализация', 'Ресурсы физической машины становятся независимыми виртуальными средами.', 'МАШИНА'],
  ['02', 'Контейнеры', 'Приложение получает воспроизводимую упаковку вместе с зависимостями.', 'ПРОЦЕСС'],
  ['03', 'Оркестрация', 'Платформа поддерживает желаемое состояние множества приложений.', 'КЛАСТЕР'],
  ['04', 'Serverless', 'Код запускается в ответ на событие, управление серверами скрыто.', 'ФУНКЦИЯ'],
  ['05', 'Edge', 'Обработка приближается к источнику данных и месту принятия решения.', 'ЛОКАЛЬНЫЙ УЗЕЛ'],
]

const root = useTemplateRef<HTMLDivElement>('root')
const track = useTemplateRef<HTMLDivElement>('track')
let mm: gsap.MatchMedia | undefined

onMounted(() => {
  const rootEl = root.value
  const trackEl = track.value
  if (!rootEl || !trackEl) return
  mm = gsap.matchMedia()
  mm.add('(min-width: 1100px) and (prefers-reduced-motion: no-preference)', () => {
    gsap.to(trackEl, {
      x: () => -(trackEl.scrollWidth - rootEl.clientWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: rootEl,
        start: 'top 22%',
        end: () => '+=' + trackEl.scrollWidth,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
  })
})

onBeforeUnmount(() => mm?.revert())
</script>

<template>
  <div ref="root" class="evolution">
    <p class="eyebrow">ЭВОЛЮЦИЯ ОБЛАЧНЫХ ТЕХНОЛОГИЙ</p>
    <div ref="track" class="evolution-track">
      <article v-for="[n, title, text, unit] in stages" :key="n" class="evolution-card">
        <span class="evolution-num">{{ n }}</span>
        <div class="evolution-glyph" aria-hidden="true"><i></i><i></i><i></i></div>
        <small>{{ unit }}</small>
        <h3>{{ title }}</h3>
        <p>{{ text }}</p>
      </article>
    </div>
  </div>
</template>
