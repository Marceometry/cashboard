import {
  AddRecurrentTransaction,
  RecurrenceTransactionItem,
  RecurrentTransaction,
  RemoveRecurrenceArgs,
  UpdateRecurrentTransaction,
} from '@/types'

export type RecurrencesContextData = {
  isLoadingCache: boolean
  recurrenceList: RecurrentTransaction[]
  addRecurrence: (recurrence: AddRecurrentTransaction) => void
  updateRecurrence: (recurrence: UpdateRecurrentTransaction) => void
  removeRecurrence: (args: RemoveRecurrenceArgs) => void
}

export type UpdateRecurrenceTransactionListArgs = {
  id: string
  transactions: RecurrenceTransactionItem[]
  isActive?: boolean
}
