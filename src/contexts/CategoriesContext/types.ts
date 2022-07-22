export type CategoryModel = {
  name: string
  income: number
  outcome: number
  balance: number
}

export type CategoriesContextData = {
  categoryList: CategoryModel[]
  setCategoryList: (list: CategoryModel[]) => void
  generateCategoriesByDate: (month: number, year: number) => CategoryModel[]
  generateCategoriesHistory: (year?: number) => CategoryModel[]
}
