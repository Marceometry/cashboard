import { TransactionModel } from '@/types'

export type RecurrenceTransactionItem = {
  id: string
  date: string
}

export type RecurrentTransaction = Omit<
  TransactionModel,
  'date' | 'datePayed'
> & {
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

export type RemoveRecurrenceArgs = {
  id: string
  deleteAllTransactions: boolean
}
