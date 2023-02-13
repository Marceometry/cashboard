export type FilterModel = {
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
}

export const emptyFilterValues: FilterModel = {
  selectedMonth: 0,
  selectedYear: 0,
  selectedCategories: [],
  maxAmount: '',
  minAmount: '',
}
