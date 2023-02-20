import { TransactionModel } from '@/contexts'

export type RecurrenceTransactionItem = {
  id: string
  date: string
}

export type RecurrentTransaction = Omit<TransactionModel, 'date'> & {
  installments: number | null
  startDate: string
  transactions: RecurrenceTransactionItem[]
  isActive?: boolean
}

export type AddRecurrentTransaction = Omit<
  RecurrentTransaction,
  'id' | 'transactions'
>

export type UpdateRecurrentTransaction = Partial<RecurrentTransaction>

export type RecurrencesContextData = {
  recurrenceList: RecurrentTransaction[]
  addRecurrence: (recurrence: AddRecurrentTransaction) => void
  updateRecurrence: (recurrence: UpdateRecurrentTransaction) => void
  removeRecurrence: (id: string) => void
}

export type UpdateRecurrenceTransactionListArgs = {
  id: string
  transactions: RecurrenceTransactionItem[]
  isActive?: boolean
}
