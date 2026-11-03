<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
} from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'
import { usePreferredReducedMotion } from '@vueuse/core'
import type { ChartKind } from '@/entities/chapter'

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale, ArcElement)

interface ChartInfo {
  title: string
  subtitle: string
  labels: string[]
  values: number[]
  type: 'bar' | 'doughnut'
  source: string
  note: string
  url?: string
}

const props = defineProps<{ chart: ChartKind }>()

const publicCount = ref(3)
const reduced = usePreferredReducedMotion()

const marketUrl = 'https://www.survey.iksconsulting.ru/page94048076.html'
const marketTotal2025 = 416.5

const info = computed<ChartInfo>(() => {
  switch (props.chart) {
    case 'market':
      return {
        title: 'Российский рынок облачных сервисов',
        subtitle: 'IaaS + PaaS + SaaS · млрд рублей',
        labels: ['2023', '2024', '2025*'],
        values: [242.7, 322.3, marketTotal2025],
        type: 'bar',
        source: 'iKS-Consulting · обзор от 11.11.2025',
        note: '* 2025 — предварительная оценка. Все точки взяты из одной версии обзора.',
        url: marketUrl,
      }
    case 'structure':
      return {
        title: 'Из чего складывается рынок',
        subtitle: 'Структура оценки за 2025 год · млрд рублей',
        labels: ['IaaS', 'PaaS', 'SaaS'],
        values: [183.1, 42.7, 190.7],
        type: 'doughnut',
        source: 'iKS-Consulting · обзор от 11.11.2025',
        note: 'Предварительная оценка 2025 года. Проценты в подсказках рассчитаны от суммы 416,5 млрд руб.',
        url: marketUrl,
      }
    case 'workloads':
      return {
        title: 'Где разместить десять условных задач',
        subtitle: 'Учебный сценарий · не статистика банков',
        labels: ['Частная среда', 'Публичная среда'],
        values: [10 - publicCount.value, publicCount.value],
        type: 'doughnut',
        source: 'Авторская интерактивная модель',
        note: 'Единица — одна условная задача, а не сервер или объём данных. Распределение произвольное; правомерность размещения требует отдельной оценки.',
      }
  }
})

function tooltipLabel<T extends 'bar' | 'doughnut'>(c: TooltipItem<T>) {
  const value = Number(c.raw)
  const suffix =
    props.chart === 'structure'
      ? ` млрд руб. · ${((value / marketTotal2025) * 100).toFixed(1)}%`
      : props.chart === 'market'
        ? ' млрд руб.'
        : ' задач'
  return `${c.label}: ${value.toLocaleString('ru-RU')}${suffix}`
}

const isBar = computed(() => info.value.type === 'bar')

const data = computed(() => ({
  labels: info.value.labels,
  datasets: [
    {
      label: info.value.subtitle,
      data: info.value.values,
      backgroundColor: ['#c8ff3d', '#22d3ee', '#ff6b4a'],
      borderColor: '#111619',
      borderWidth: isBar.value ? 0 : 8,
      borderRadius: isBar.value ? 5 : 0,
      maxBarThickness: 100,
    },
  ],
}))

const baseOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: reduced.value === 'reduce' ? (false as const) : { duration: 900 },
  plugins: {
    legend: {
      display: !isBar.value,
      position: 'bottom' as const,
      labels: { color: '#dfe5df', font: { family: 'Manrope', size: 13 }, padding: 20 },
    },
    tooltip: {
      backgroundColor: '#f1f2e9',
      titleColor: '#10150a',
      bodyColor: '#10150a',
      padding: 14,
      callbacks: { label: tooltipLabel },
    },
  },
}))

const barOptions = computed<ChartOptions<'bar'>>(() => ({
  ...baseOptions.value,
  scales: {
    x: { grid: { display: false }, ticks: { color: '#c2cbc4', font: { size: 14 } } },
    y: { beginAtZero: true, grid: { color: '#ffffff0d' }, ticks: { color: '#9ca9a0' } },
  },
}))

const doughnutOptions = computed<ChartOptions<'doughnut'>>(() => ({ ...baseOptions.value, cutout: '68%' }))
</script>

<template>
  <figure class="chart-block">
    <p class="eyebrow">ДАННЫЕ / ИНТЕРАКТИВ</p>
    <h3>{{ info.title }}</h3>
    <p class="chart-subtitle">{{ info.subtitle }}</p>
    <label v-if="chart === 'workloads'" class="scenario-control">
      Задач в публичной среде: <b>{{ publicCount }} из 10</b>
      <input v-model.number="publicCount" type="range" min="0" max="10" step="1" />
    </label>
    <div class="chart-canvas">
      <Bar v-if="isBar" :data="data as ChartData<'bar'>" :options="barOptions" :aria-label="info.title" />
      <Doughnut v-else :data="data as ChartData<'doughnut'>" :options="doughnutOptions" :aria-label="info.title" />
    </div>
    <dl class="chart-values">
      <div v-for="(label, i) in info.labels" :key="label">
        <dt>{{ label }}</dt>
        <dd>{{ info.values[i]?.toLocaleString('ru-RU') }}</dd>
      </div>
    </dl>
    <figcaption>
      <p>{{ info.note }}</p>
      <a v-if="info.url" :href="info.url" target="_blank" rel="noopener noreferrer">{{ info.source }} ↗</a>
      <span v-else>{{ info.source }}</span>
    </figcaption>
  </figure>
</template>
