import { isValid } from 'date-fns'
import { v4 as uuid } from 'uuid'
import { CategoryModel, TagModel } from '@/contexts'
import { TransactionModel } from './types'

const error = () => {
  throw new Error()
}

export const formatTransaction = (
  payload: TransactionModel
): TransactionModel => {
  let date = new Date().toDateString()
  const payloadDate = new Date(payload.date)

  if (isValid(payloadDate)) {
    date = payloadDate.toISOString()
  }

  return {
    id: payload.id,
    type: payload.type,
    description: payload.description,
    amount: Number(payload.amount),
    category: payload.category || 'Outros',
    tags: payload.tags || [],
    date,
  }
}

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

export const getYearList = (transactionList: TransactionModel[]) => {
  const yearList = transactionList.reduce((array, item) => {
    const year = new Date(item.date).getFullYear()
    if (array.includes(year)) return array
    return [...array, year]
  }, [] as number[])

  return yearList
    .sort((a, b) => b - a)
    .map((year) => ({ label: year, value: year }))
}

export const generateCategories = (
  transactions: TransactionModel[]
): CategoryModel[] => {
  const categories = transactions.reduce((acc, transaction) => {
    const { category, amount, type } = transaction
    const isIncome = type === 'income'
    const currentCategory = acc.find((c) => c.name === category)
    if (!currentCategory) {
      const newCategory = {
        name: category,
        income: isIncome ? amount : 0,
        outcome: !isIncome ? amount : 0,
        balance: isIncome ? amount : -amount,
      }
      return [...acc, newCategory]
    }
    const newCategoryList = acc.map((c) => {
      if (c.name !== category) return c
      return {
        ...c,
        income: isIncome ? c.income + amount : c.income,
        outcome: !isIncome ? c.outcome + amount : c.outcome,
        balance: isIncome ? c.balance + amount : c.balance - amount,
      }
    })
    return newCategoryList
  }, [] as CategoryModel[])
  return categories
}

export const generateTags = (transactions: TransactionModel[]): TagModel[] => {
  const newTagList = transactions.reduce((acc: TagModel[], transaction) => {
    const { type, amount, tags = [] } = transaction
    const isIncome = type === 'income'

    tags.forEach((tag) => {
      const tagIndex = acc.findIndex((item) => item.name === tag)

      if (tagIndex < 0) {
        return acc.push({
          name: tag,
          income: isIncome ? amount : 0,
          outcome: !isIncome ? amount : 0,
          balance: isIncome ? amount : -amount,
        })
      }

      const { name, income, outcome, balance } = acc[tagIndex]
      acc[tagIndex] = {
        name,
        income: isIncome ? income + amount : income,
        outcome: !isIncome ? outcome + amount : outcome,
        balance: isIncome ? balance + amount : balance - amount,
      }
    })

    return acc
  }, [] as TagModel[])
  return newTagList
}
