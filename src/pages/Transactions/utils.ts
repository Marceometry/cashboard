import { isFuture } from 'date-fns'
import { currency, filterByMonth, filterByYear } from '@/utils'
import { FilterTransactionsFormInputs } from './validation'

export const filterByMinAmount = (amount: string, itemAmount: number) => {
  const numberAmount = currency.unMaskMonetaryValue(amount)
  if (numberAmount === 0) return true
  return itemAmount > numberAmount
}

export const filterByMaxAmount = (amount: string, itemAmount: number) => {
  const numberAmount = currency.unMaskMonetaryValue(amount)
  if (numberAmount === 0) return true
  return itemAmount < numberAmount
}

export const filterByCategory = (categories: string[], category: string) => {
  return categories.some((item) => item === category)
}

export const filterData = (
  data: any[],
  filters: FilterTransactionsFormInputs
) => {
  const {
    selectedMonth,
    selectedYear,
    selectedCategories,
    showFutureTransactions,
    minAmount,
    maxAmount,
    type,
  } = filters

  return data.filter((item) => {
    let included = true

    if (type && type !== 'all') {
      included = type === item.type
      if (!included) return
    }
    if (minAmount) {
      included = filterByMinAmount(minAmount, item.amount)
      if (!included) return
    }
    if (maxAmount) {
      included = filterByMaxAmount(maxAmount, item.amount)
      if (!included) return
    }
    if (!showFutureTransactions) {
      included = !isFuture(new Date(item.date))
      if (!included) return
    }
    if (selectedMonth) {
      included = filterByMonth(item.date, Number(selectedMonth))
      if (!included) return
    }
    if (selectedYear) {
      included = filterByYear(item.date, Number(selectedYear))
      if (!included) return
    }
    if (selectedCategories.length) {
      included = filterByCategory(selectedCategories, item.category)
      if (!included) return
    }

    return included
  })
}
