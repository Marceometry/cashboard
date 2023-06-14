export type CategoryModel = {
  name: string
  income: number
  outcome: number
  balance: number
}

export type CategoriesFilterModel = {
  month: number
  year: number
  maxAmount: number
  minAmount: number
  selectedCategories: string[]
}
