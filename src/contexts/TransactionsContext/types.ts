import { Option } from '@/components'
import { Optional } from '@/utils'
import {
  AddTransactionModel,
  CategoryModel,
  DateParam,
  TagModel,
  TransactionModel,
} from '@/types'

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
  ) => Promise<TransactionModel>
  removeTransaction: (transaction: TransactionModel) => void
  updateTransactionList: (list: TransactionModel[]) => void
  uploadTransactionList: (list: string) => void
  getAvailableYearList: () => Option[]
  getFilteredMostRepeatedTransactions: (text: string) => TransactionModel[]
  dateParam: DateParam
  setDateParam: (param: DateParam) => void
}
