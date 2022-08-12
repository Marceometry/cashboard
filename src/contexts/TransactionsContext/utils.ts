import { v4 as uuid } from 'uuid'
import { TransactionModel } from './types'

const error = () => { throw new Error() }

export const formatTransaction = (
  payload: TransactionModel
): TransactionModel => ({
  id: payload.id,
  type: payload.type,
  description: payload.description,
  amount: Number(payload.amount),
  category: payload.category || 'Outros',
  date: payload.date.length === 10
    ? new Date(`${payload.date} 00:00:00`).toISOString()
    : new Date(payload.date).toISOString(),
})

export const isTransactionInvalid = (item: TransactionModel) => {
  try {
    if (!item.description) error()
    if (!item.category) error()
    if (item.type !== 'income' && item.type !== 'outcome') error()
    if (!new Date(item.date).getDate()) error()
    if (isNaN(item.amount)) error()

    return false
  } catch (error) {
    return true
  }
}

export const isTransactionListInvalid = (list: TransactionModel[]) => {
  try {
    if (!list) error()

    const isSomeInvalid = list.some((item: any) => {
      return isTransactionInvalid(item)
    })
    if (isSomeInvalid) error()

    const ids = list.map((i) => i.id || uuid())
    const hasDuplicateId = new Set(ids).size !== ids.length
    if (hasDuplicateId) error()

    return false
  } catch (error) {
    return true
  }
}
