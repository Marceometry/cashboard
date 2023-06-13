import { Option } from '@/components'

export type TransactionType = 'income' | 'outcome'

export type TransactionModel = {
  id: string
  amount: number
  description: string
  category: string
  date: string
  datePayed: string
  tags: string[]
  type: TransactionType
}

export type AddTransactionModel = Omit<TransactionModel, 'id'> & {
  datePayed?: string
}

export type TransactionsContextData = {
  isLoading: boolean
  transactionList: TransactionModel[]
  mostRepeatedTransactions: TransactionModel[]
  categoryList: CategoryModel[]
  tagList: TagModel[]
  addTransaction: (
    transaction: AddTransactionModel
  ) => Promise<TransactionModel>
  updateTransaction: (transaction: TransactionModel) => void
  removeTransaction: (transaction: TransactionModel) => void
  updateTransactionList: (list: TransactionModel[]) => void
  uploadTransactionList: (list: string) => void
  getAvailableYearList: () => Option[]
  getFilteredMostRepeatedTransactions: (text: string) => TransactionModel[]
  dateParam: DateParam
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

export type DateParam = 'datePayed' | 'date'
