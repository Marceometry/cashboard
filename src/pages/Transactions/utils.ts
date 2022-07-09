import { filterByMonth, filterByYear, masks } from '@/utils'
import { FilterModel } from './constants'

export const filterByMinAmount = (amount: string, itemAmount: number) => {
  const numberAmount = masks.unMaskMonetaryValue(amount)
  if (numberAmount === 0) return true
  return itemAmount > numberAmount
}

export const filterByMaxAmount = (amount: string, itemAmount: number) => {
  const numberAmount = masks.unMaskMonetaryValue(amount)
  if (numberAmount === 0) return true
  return itemAmount < numberAmount
}
export const filterByCategory = (categories: string[], category: string) => {
  return categories.some((item) => item === category)
}

export const filterData = (data: any[], filters: FilterModel) => {
  const {
    selectedMonth,
    selectedYear,
    selectedCategories,
    minAmount,
    maxAmount,
  } = filters

  return data.filter((item) => {
    let included = true

    if (minAmount) {
      included = filterByMinAmount(minAmount, item.amount)
      if (!included) return
    }
    if (maxAmount) {
      included = filterByMaxAmount(maxAmount, item.amount)
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
