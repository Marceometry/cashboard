import { isValid } from 'date-fns'
import { v4 as uuid, validate } from 'uuid'
import { FirebaseDataSnapshot } from '@/hooks'
import {
  AddTransactionModel,
  CategoryModel,
  DateParam,
  PaymentMethods,
  TagModel,
  TransactionModel,
} from '@/types'
import { Optional, sortByDate } from '@/utils'

const error = () => {
  throw new Error()
}

export const formatTransaction = (
  payload: Optional<TransactionModel, 'datePayed'>
): TransactionModel => {
  if (isTransactionInvalid(payload)) throw new Error()

  return {
    id: payload.id,
    type: payload.type,
    paymentMethod: payload.paymentMethod,
    description: payload.description,
    amount: payload.amount,
    category: payload.category || 'Outros',
    tags: payload.tags || [],
    date: new Date(payload.date).toISOString(),
    datePayed: new Date(payload.datePayed || payload.date).toISOString(),
  }
}

export const isTransactionInvalid = (
  item: Optional<TransactionModel, 'datePayed'>
) => {
  try {
    if (item.id && !validate(item.id)) error()
    if (!item.description) error()
    if (typeof item.category !== 'string') error()
    if (item.type !== 'income' && item.type !== 'outcome') error()
    if (!PaymentMethods[item.paymentMethod]) error()
    if (!isValid(new Date(item.date))) error()
    if (!isValid(new Date(item.datePayed || item.date))) error()
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

export const firebaseDataSnapshotToTransactionList = (
  data: FirebaseDataSnapshot<AddTransactionModel>
) => {
  return Object.entries(data).map(([id, values]) =>
    formatTransaction({ ...values, id })
  )
}

export const getYearList = (
  transactionList: TransactionModel[],
  dateParam: DateParam
) => {
  const yearList = transactionList.reduce((array, item) => {
    const year = new Date(item[dateParam]).getFullYear()
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

type AccumulatorModel = Array<
  TransactionModel & {
    count: number
  }
>

export const generateMostRepeatedTransactions = (
  transactions: TransactionModel[]
): TransactionModel[] => {
  const sortedTransactions: TransactionModel[] = sortByDate(transactions, true)

  const mostRepeated = sortedTransactions.reduce((acc, transaction) => {
    const itemIndex = acc.findIndex(
      (item) =>
        item.description.toLowerCase() === transaction.description.toLowerCase()
    )
    if (itemIndex < 0) return [...acc, { ...transaction, count: 1 }]
    acc[itemIndex] = { ...transaction, count: acc[itemIndex].count + 1 }
    return acc
  }, [] as AccumulatorModel)

  const response = mostRepeated.sort((a, b) => b.count - a.count)

  return response
}

export const filterMostRepeatedTransactions = (
  text: string,
  transactions: TransactionModel[]
): TransactionModel[] => {
  const response = transactions.filter((item) =>
    item.description.toLowerCase().includes(text.toLowerCase())
  )

  return response.slice(0, 5)
}
