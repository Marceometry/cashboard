import { Optional } from '@/utils'

export enum PaymentTypes {
  pix = 'Pix',
  cash = 'Dinheiro',
  credit = 'Crédito',
  debit = 'Débito',
  other = 'Outro',
}

export const paymentTypes = Object.entries(PaymentTypes)

export type PaymentType = keyof typeof PaymentTypes

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
  paymentType: PaymentType
}

export type AddTransactionModel = Omit<
  Optional<TransactionModel, 'datePayed'>,
  'id'
>
