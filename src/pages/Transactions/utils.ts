import { addDays, isAfter, isBefore, isFuture, subDays } from 'date-fns'
import { DateParam } from '@/contexts'
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
  filters: FilterTransactionsFormInputs,
  dateParam: DateParam
) => {
  const {
    startDate,
    endDate,
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
      included = !isFuture(new Date(item[dateParam]))
      if (!included) return
    }
    if (startDate) {
      const date = subDays(new Date(`${startDate} 00:00:00`), 1)
      included = isAfter(new Date(item[dateParam]), date)
      if (!included) return
    }
    if (endDate) {
      const date = addDays(new Date(`${endDate} 00:00:00`), 1)
      included = isBefore(new Date(item[dateParam]), date)
      if (!included) return
    }
    if (selectedMonth) {
      included = filterByMonth(item[dateParam], Number(selectedMonth))
      if (!included) return
    }
    if (selectedYear) {
      included = filterByYear(item[dateParam], Number(selectedYear))
      if (!included) return
    }
    if (selectedCategories.length) {
      included = filterByCategory(selectedCategories, item.category)
      if (!included) return
    }

    return included
  })
}
