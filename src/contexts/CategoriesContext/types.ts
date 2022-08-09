import { TransactionType } from '@/contexts'

export type CategoriesFilterModel = {
  month: number
  year: number
  maxAmount: number
  minAmount: number
}

export type CategoryModel = {
  name: string
  income: number
  outcome: number
  balance: number
}

export type CategoriesContextData = {
  categoryList: CategoryModel[]
  setCategoryList: (list: CategoryModel[]) => void
  generateFilteredCategories: (filters: CategoriesFilterModel, type: TransactionType) => CategoryModel[]
  generateCategoriesHistory: (filters: CategoriesFilterModel, type: TransactionType) => any[]
}
