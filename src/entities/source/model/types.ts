export type SourceCategory = 'research' | 'expert' | 'case'

export interface Source {
  id: number
  key: string
  title: string
  author: string
  year: number | null
  url: string
  category: SourceCategory
  kind: string
  notes: string
  accessed: string
  verification: string
  citation: string
}
