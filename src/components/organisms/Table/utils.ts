import { masks } from '@/utils'
import { FilterModel } from './types'

export const filterByText = (data: any[], columns: any[], text: string) => {
  if (!text) return data
  return data.filter((item) => {
    return !!columns.filter((column) =>
      String(item[column.field]).toLowerCase().includes(text.toLowerCase())
    ).length
  })
}

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

export const filterByMonth = (date: string, month: number) => {
  return new Date(date).getMonth() + 1 === month
}

export const filterByYear = (date: string, year: number) => {
  return new Date(date).getFullYear() === year
}

export const filterByCategory = (categories: string[], category: string) => {
  return categories.some((item) => item === category)
}

export const filterData = (
  data: any[],
  filters: FilterModel,
  dateField: string
) => {
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
      included = filterByMonth(item[dateField], Number(selectedMonth))
      if (!included) return
    }
    if (selectedYear) {
      included = filterByYear(item[dateField], Number(selectedYear))
      if (!included) return
    }
    if (selectedCategories.length) {
      included = filterByCategory(selectedCategories, item.category)
      if (!included) return
    }

    return included
  })
}
