export type CategoryModel = {
  name: string
  income: number
  outcome: number
  balance: number
}

export type TransactionModel = {
  id: number
  amount: number
  description: string
  category: string
  date: Date
  type: 'income' | 'outcome'
}

export type AddTransactionModel = Omit<TransactionModel, 'id'>

export type TransactionsContextData = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  transactionList: TransactionModel[]
  setTransactionList: (list: TransactionModel[]) => void
  categoryList: CategoryModel[]
  setCategoryList: (list: CategoryModel[]) => void
  addTransaction: (transaction: AddTransactionModel) => void
  removeTransaction: (transaction: TransactionModel) => void
}
