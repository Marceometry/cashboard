import { CategoriesFilterModel } from '@/contexts'

export type ChartType = {
  name: string
  value: number
}

export type DataModel = {
  outcome: number
  income: number
  name: string
  fraction: number
}

export type Response = {
  data: DataModel[]
  chartData: {
    name: string
    value: number
  }[]
}

export type FilterModel = {
  month: number | null
  year: number | null
  maxAmount: string
  minAmount: string
  selectedCategories: string[]
}

export const defaultEmptyFilterValues: FilterModel = {
  month: null,
  year: null,
  maxAmount: '',
  minAmount: '',
  selectedCategories: [],
}

export const defaultFilterValues: CategoriesFilterModel = {
  month: 0,
  year: 0,
  maxAmount: 0,
  minAmount: 0,
  selectedCategories: [],
}
