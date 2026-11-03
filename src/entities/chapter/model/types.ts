export type ChartKind = 'market' | 'structure' | 'workloads'

export type ChapterBlock =
  | { type: 'p'; text: string }
  | { type: 'figure'; figure: string }
  | { type: 'quote'; text: string; attribution: string }
  | { type: 'video'; video: number }
  | { type: 'chart'; chart: ChartKind }
  | { type: 'evolution' | 'audio' | 'stats' | 'trends' | 'cases' }

export interface Chapter {
  id: string
  number: string
  label: string
  title: string
  deck: string
  blocks: ChapterBlock[]
}

export interface Conclusion {
  title: string
  text: string
}

/** Название тренда, его задача и оценка зрелости */
export type Trend = [name: string, meaning: string, maturity: string]
