import { markRaw } from 'vue'

export type DataTableColumn = {
  name: string
  field: string
  sortable?: boolean
  bodyClass?: string
  type: 'component' | 'boolean' | 'instantEditor' | 'options' | 'text' | 'pre' | 'html' | 'badge' | 'image' | 'currency'
  component?: ReturnType<typeof markRaw>
  search?: boolean
  searchType?: 'input' | 'dropdown'
  searchMode?: 'contains' | 'equals'
  filterEqualsOptions?: any[]
  badge_class?: string
  badge_text?: string
  dimension?: string
  maxWidth?: string | number
  minWidth?: string | number
  isObj?: boolean | null
  options?: {
    edit?: boolean
    delete?: boolean
    view?: boolean
  }
}
