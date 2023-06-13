import { Option } from '@/components'
import { Optional } from '@/utils'

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

export type AddTransactionModel = Omit<
  Optional<TransactionModel, 'datePayed'>,
  'id'
>

export type TransactionsContextData = {
  isLoading: boolean
  transactionList: TransactionModel[]
  mostRepeatedTransactions: TransactionModel[]
  categoryList: CategoryModel[]
  tagList: TagModel[]
  addTransaction: (
    transaction: AddTransactionModel
  ) => Promise<TransactionModel>
  updateTransaction: (
    transaction: Optional<TransactionModel, 'datePayed'>
  ) => void
  removeTransaction: (transaction: TransactionModel) => void
  updateTransactionList: (list: TransactionModel[]) => void
  uploadTransactionList: (list: string) => void
  getAvailableYearList: () => Option[]
  getFilteredMostRepeatedTransactions: (text: string) => TransactionModel[]
  dateParam: DateParam
  setDateParam: (param: DateParam) => void
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
