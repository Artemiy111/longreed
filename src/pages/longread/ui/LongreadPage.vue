<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useWindowSize, usePreferredReducedMotion } from '@vueuse/core'
import { chapters } from '@/entities/chapter'
import { ScrollTrigger } from '@/shared/lib'
import { HeroSection } from '@/widgets/hero'
import { ReadingProgress } from '@/widgets/reading-progress'
import { TableOfContents } from '@/widgets/table-of-contents'
import { ChapterSection } from '@/widgets/chapter'
import { ConclusionsBlock } from '@/widgets/conclusions'
import { SourcesList } from '@/widgets/sources'
import { SiteFooter } from '@/widgets/site-footer'
import { useSmoothScroll } from '../model/useSmoothScroll'
import { useReadingState } from '../model/useReadingState'
import { useScrollAnimations } from '../model/useScrollAnimations'

const { width } = useWindowSize()
const reduced = usePreferredReducedMotion()
const smoothScroll = useSmoothScroll()
const animations = useScrollAnimations()
const { active, progress, observe } = useReadingState('why')

function navigate(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  history.replaceState(null, '', '#' + id)
  if (!smoothScroll.scrollTo(el)) el.scrollIntoView({ behavior: reduced.value === 'reduce' ? 'instant' : 'smooth' })
  active.value = id
}

onMounted(async () => {
  await nextTick()
  const animate = reduced.value !== 'reduce'
  if (animate && width.value > 768) smoothScroll.enable()
  observe('.chapter,#conclusions')
  if (animate) animations.enable()
  document.fonts.ready.then(() => ScrollTrigger.refresh())
})
</script>

<template>
  <a class="skip-link" href="#why">Перейти к тексту</a>
  <ReadingProgress :progress="progress" />
  <HeroSection @start="navigate" />
  <div class="reading-layout">
    <aside class="toc-column">
      <TableOfContents :chapters="chapters" :active="active" :progress="progress" @navigate="navigate" />
    </aside>
    <main id="main">
      <ChapterSection v-for="chapter in chapters" :key="chapter.id" :chapter="chapter" />
      <section class="thesis" aria-label="Приоритет технологий">
        <p class="eyebrow">ОТ ИНФРАСТРУКТУРЫ К ДОВЕРИЮ</p>
        <p class="thesis-line">Облака <span>дают основу.</span></p>
        <p class="thesis-line">ИИ <span>усиливает решения.</span></p>
        <p class="thesis-line">Реестры <span>фиксируют права.</span></p>
      </section>
      <ConclusionsBlock />
    </main>
  </div>
  <SourcesList />
  <SiteFooter />
</template>
