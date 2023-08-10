import {
  AddRecurrentTransaction,
  RecurrenceTransactionItem,
  RecurrentTransaction,
  UpdateRecurrentTransaction,
} from '@/types'

export type RecurrencesContextData = {
  isLoadingCache: boolean
  recurrenceList: RecurrentTransaction[]
  addRecurrence: (recurrence: AddRecurrentTransaction) => void
  updateRecurrence: (
    recurrence: UpdateRecurrentTransaction,
    noToast?: boolean
  ) => void
  removeRecurrence: (id: string, deleteAllTransactions: boolean) => void
}

export type UpdateRecurrenceTransactionListArgs = {
  id: string
  transactions: RecurrenceTransactionItem[]
  isActive?: boolean
}
