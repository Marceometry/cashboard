import { generateCategories, useTransactions } from '@/contexts'
import {
  CategoriesFilterModel,
  TransactionModel,
  TransactionType,
} from '@/types'
import {
  filterByMonth,
  filterByYear,
  getFormattedMonthAndYear,
  sortByDate,
} from '@/utils'

export const useCategories = () => {
  const { transactionList, categoryList, dateParam } = useTransactions()

  const generateFilteredCategories = (
    filters: CategoriesFilterModel,
    type: TransactionType
  ) => {
    const { month, year, minAmount, maxAmount, selectedCategories } = filters

    const transactions = sortByDate(transactionList, true).filter(
      (item: TransactionModel) => {
        if (month && !filterByMonth(item[dateParam], month)) return false
        if (year && !filterByYear(item[dateParam], year)) return false
        if (
          selectedCategories.length &&
          !selectedCategories.includes(item.category)
        ) {
          return false
        }
        return true
      }
    )

    return generateCategories(transactions).filter((item) => {
      if (minAmount && item[type] < minAmount) return false
      if (maxAmount && item[type] > maxAmount) return false
      return true
    })
  }

  const generateCategoriesHistory = (
    filters: CategoriesFilterModel,
    type: TransactionType
  ) => {
    const { month, year, minAmount, maxAmount, selectedCategories } = filters
    const orderedList: TransactionModel[] = sortByDate(transactionList, true)

    const categoriesHistory = orderedList.reduce(
      (acc: any[], item: TransactionModel) => {
        if (item.type !== type) return acc
        if (minAmount && item.amount < minAmount) return acc
        if (maxAmount && item.amount > maxAmount) return acc
        if (month && !filterByMonth(item[dateParam], month)) return acc
        if (year && !filterByYear(item[dateParam], year)) return acc
        if (
          selectedCategories.length &&
          !selectedCategories.includes(item.category)
        ) {
          return acc
        }

        const { amount, category } = item
        const date = new Date(item[dateParam])

        const name = getFormattedMonthAndYear(date)
        const itemIndex = acc.findIndex((accItem) => accItem.name === name)

        if (acc[itemIndex]) {
          const value = acc[itemIndex][category]
            ? acc[itemIndex][category] + amount
            : amount

          acc[itemIndex] = { ...acc[itemIndex], name, [category]: value }
          return [...acc]
        }

        return [...acc, { name, [category]: amount ?? 0 }]
      },
      []
    )
    const categoryNamesObject = categoryList.reduce((acc, value) => {
      return { ...acc, [value.name]: 0 }
    }, {})

    return categoriesHistory.map((item) => ({
      ...categoryNamesObject,
      ...item,
    }))
  }

  return { generateFilteredCategories, generateCategoriesHistory }
}
