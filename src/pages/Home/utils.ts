import { differenceInCalendarMonths } from 'date-fns'
import { RecurrentTransaction, TransactionModel } from '@/contexts'

export const getMonthSummary = (
  recurrences: RecurrentTransaction[]
): [number, number, number] => {
  return recurrences.reduce(
    (acc, item) => {
      if (!item.isActive) return acc
      if (item.type === 'income' && !item.installments) {
        acc[0] = acc[0] + item.amount
        return acc
      }
      if (item.type === 'outcome' && !item.installments) {
        acc[1] = acc[1] + item.amount
        return acc
      }
      if (item.type === 'outcome' && item.installments) {
        acc[2] = acc[2] + item.amount
        return acc
      }
      return acc
    },
    [0, 0, 0]
  )
}

type Categories = Array<{
  name: string
  value: number
  average: number
}>

const monthsAgo = (quantity: number, date: string) => {
  const difference = differenceInCalendarMonths(new Date(), new Date(date))
  return difference <= quantity && difference > 0
}

export const generateCategories = (
  transactions: TransactionModel[],
  monthCount: number
) => {
  const categories: Categories = transactions.reduce((acc: any[], item) => {
    const { category, amount, type } = item
    if (type !== 'outcome' || !monthsAgo(monthCount, item.date)) {
      return acc
    }

    const currentCategory = acc.find((c) => c.name === category)
    if (!currentCategory) {
      const newCategory = {
        name: category,
        value: amount,
        average: amount / monthCount,
      }
      return [...acc, newCategory]
    }

    const newCategoryList = acc.map((c) => {
      if (c.name !== category) return c
      const value = c.value + amount
      return { ...c, value, average: value / monthCount }
    })
    return newCategoryList
  }, [])

  return categories.sort((a, b) => b.average - a.average)
}
