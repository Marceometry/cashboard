import { TransactionModel } from './types'

export const formatTransaction = (
  payload: TransactionModel
): TransactionModel => ({
  id: payload.id,
  type: payload.type,
  description: payload.description,
  amount: Number(payload.amount),
  category: payload.category || 'Outros',
  date: new Date(`${payload.date} 00:00:00`).toISOString(),
})
