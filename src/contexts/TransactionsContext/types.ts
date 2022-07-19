export type TransactionType = 'income' | 'outcome'

export type TransactionModel = {
  id: number
  amount: number
  description: string
  category: string
  date: string
  type: TransactionType
}

export type AddTransactionModel = Omit<TransactionModel, 'id'>

export type TransactionsContextData = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  transactionList: TransactionModel[]
  setTransactionList: (list: TransactionModel[]) => void
  addTransaction: (transaction: AddTransactionModel) => void
  updateTransaction: (transaction: TransactionModel) => void
  removeTransaction: (transaction: TransactionModel) => void
}
