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
  addTransaction: (transaction: AddTransactionModel) => void
  updateTransaction: (transaction: TransactionModel) => void
  removeTransaction: (transaction: TransactionModel) => void
  updateTransactionList: (list: TransactionModel[]) => void
  uploadTransactionList: (list: string) => void
  getFilterableYearList: () => Option[]
}
