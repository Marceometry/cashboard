import { Option } from '@/components'

export type TransactionType = 'income' | 'outcome'

export type TransactionModel = {
  id: string
  amount: number
  description: string
  category: string
  date: string
  type: TransactionType
  tags?: string[]
}

export type AddTransactionModel = Omit<TransactionModel, 'id'>

export type TransactionsContextData = {
  isLoading: boolean
  transactionList: TransactionModel[]
  setTransactionList: (list: TransactionModel[]) => void
  categoryList: CategoryModel[]
  tagList: TagModel[]
  addTransaction: (transaction: AddTransactionModel) => void
  updateTransaction: (transaction: TransactionModel) => void
  removeTransaction: (transaction: TransactionModel) => void
  updateTransactionList: (list: TransactionModel[]) => void
  uploadTransactionList: (list: string) => void
  getAvailableYearList: () => Option[]
}

export type TagModel = {
  name: string
  income: number
  outcome: number
  balance: number
  colorScheme?: string
}

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
