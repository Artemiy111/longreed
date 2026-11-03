<script setup lang="ts">
import { sources, type SourceCategory } from '@/entities/source'

const categories: [key: SourceCategory, title: string][] = [
  ['research', 'Исследования и аналитика'],
  ['expert', 'Экспертные материалы'],
  ['case', 'Практические кейсы'],
]

const groups = categories.map(([key, title]) => ({
  key,
  title,
  items: sources.filter((s) => s.category === key),
}))
</script>

<template>
  <section id="sources" class="sources-section">
    <p class="eyebrow">ПРОВЕРИТЬ И ПРОДОЛЖИТЬ</p>
    <h2>Источники.</h2>
    <p class="source-intro">
      Проверка материалов: 29 октября 2026 года. Нормативные документы, первичные исследования и публикации разработчиков. Даты отдельных кейсов и оценок указаны отдельно.
    </p>
    <div class="source-groups">
      <details v-for="group in groups" :key="group.key" :open="group.key === 'case'">
        <summary>{{ group.title }} <span>{{ String(group.items.length).padStart(2, '0') }}</span></summary>
        <ol>
          <li v-for="source in group.items" :key="source.key">
            <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.title }} ↗</a>
            <p>{{ source.author }}<template v-if="source.year"> · {{ source.year }}</template> · Обращение: {{ source.accessed }}</p>
          </li>
        </ol>
      </details>
    </div>
  </section>
</template>
