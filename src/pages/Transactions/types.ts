import { TransactionType } from '@/contexts'

export type FilterModel = {
  type: 'all' | TransactionType
  selectedMonth: number | null
  selectedYear: number | null
  selectedCategories: string[]
  minAmount: string
  maxAmount: string
}

export const defaultFilterValues: FilterModel = {
  selectedMonth: null,
  selectedYear: null,
  selectedCategories: [],
  maxAmount: '',
  minAmount: '',
  type: 'all',
}

export const emptyFilterValues: FilterModel = {
  selectedMonth: 0,
  selectedYear: 0,
  selectedCategories: [],
  maxAmount: '',
  minAmount: '',
  type: 'all',
}
