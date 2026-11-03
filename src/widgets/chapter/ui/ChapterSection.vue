<script setup lang="ts">
import { computed } from 'vue'
import { trends, type Chapter } from '@/entities/chapter'
import { bankCases, BankCaseCard } from '@/entities/bank-case'
import { figures, FigureBlock } from '@/entities/figure'
import { videos } from '@/entities/video'
import { sourceByKey, chapterSources } from '@/entities/source'
import { AudioPlayer } from '@/features/audio-player'
import { LazyDataChart } from '@/features/data-charts'
import { VideoEmbed } from '@/features/video-embed'
import { PullQuote, StatCounter } from '@/shared/ui'
import EvolutionTrack from './EvolutionTrack.vue'

const props = defineProps<{ chapter: Chapter }>()

const references = computed(() =>
  (chapterSources[props.chapter.id] ?? []).map((key) => sourceByKey[key]).filter((s) => s !== undefined),
)
</script>

<template>
  <section :id="chapter.id" class="chapter" :aria-labelledby="chapter.id + '-title'">
    <header class="chapter-header">
      <p class="eyebrow"><span>{{ chapter.number }}</span> / {{ chapter.label }}</p>
      <h2 :id="chapter.id + '-title'">{{ chapter.title }}</h2>
      <p class="chapter-deck">{{ chapter.deck }}</p>
    </header>
    <div class="chapter-content">
      <template v-for="(block, index) in chapter.blocks" :key="index">
        <p v-if="block.type === 'p'" class="body-copy">{{ block.text }}</p>
        <FigureBlock v-else-if="block.type === 'figure'" :figure="figures[block.figure]!" />
        <PullQuote v-else-if="block.type === 'quote'" :text="block.text" :attribution="block.attribution" />
        <VideoEmbed v-else-if="block.type === 'video'" :video="videos[block.video]!" />
        <LazyDataChart v-else-if="block.type === 'chart'" :chart="block.chart" />
        <EvolutionTrack v-else-if="block.type === 'evolution'" />
        <AudioPlayer v-else-if="block.type === 'audio'" />
        <div v-else-if="block.type === 'stats'" class="stats-grid">
          <StatCounter :value="5" label="характеристик облака" />
          <StatCounter :value="3" label="модели обслуживания" />
          <StatCounter :value="4" label="модели развёртывания" />
          <p>По определению NIST SP 800-145</p>
        </div>
        <div v-else-if="block.type === 'trends'" class="trends-block">
          <p class="eyebrow">КАРТА / 17 ТРЕНДОВ</p>
          <div class="trends-table-wrap">
            <table>
              <caption>Технологии Web 3.0: роль и авторская качественная оценка зрелости</caption>
              <thead>
                <tr><th>Тренд</th><th>Задача</th><th>Зрелость</th></tr>
              </thead>
              <tbody>
                <tr v-for="[name, meaning, maturity] in trends" :key="name">
                  <th>{{ name }}</th>
                  <td>{{ meaning }}</td>
                  <td>{{ maturity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else-if="block.type === 'cases'" class="cases-grid">
          <BankCaseCard v-for="c in bankCases" :key="c.key" :item="c" :href="sourceByKey[c.key]?.url" />
        </div>
      </template>
      <aside class="chapter-references">
        <span>ИСТОЧНИКИ ГЛАВЫ</span>
        <a v-for="source in references" :key="source.key" :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.author }} · {{ source.title }} ↗</a>
      </aside>
    </div>
  </section>
</template>
