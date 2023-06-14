import { Optional } from '@/utils'

export type DateParam = 'datePayed' | 'date'

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
