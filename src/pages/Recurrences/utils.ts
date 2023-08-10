import { addDays, isAfter, isBefore, subDays } from 'date-fns'
import { RecurrentTransaction } from '@/types'
import { currency } from '@/utils'
import { FilterRecurrencesFormInputs } from './validation'

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

export const filterByArray = (items: string[], param: string) => {
  return items.some((item) => item === param)
}

export const filterData = (
  data: RecurrentTransaction[],
  filters: FilterRecurrencesFormInputs
) => {
  const {
    startDate,
    endDate,
    selectedCategories,
    paymentMethod,
    minAmount,
    maxAmount,
    status,
    type,
  } = filters

  return data.filter((item) => {
    let included = true

    if (type && type !== 'all') {
      included = type === item.type
      if (!included) return
    }
    if (status && status !== 'all') {
      included = status === 'active' ? !!item.isActive : !item.isActive
      if (!included) return
    }
    if (paymentMethod && paymentMethod !== 'all') {
      included = paymentMethod === item.paymentMethod
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
    if (startDate) {
      const date = subDays(new Date(`${startDate} 00:00:00`), 1)
      included = isAfter(new Date(item.startDate), date)
      if (!included) return
    }
    if (endDate) {
      const date = addDays(new Date(`${endDate} 00:00:00`), 1)
      included = isBefore(new Date(item.startDate), date)
      if (!included) return
    }
    if (selectedCategories.length) {
      included = filterByArray(selectedCategories, item.category)
      if (!included) return
    }

    return included
  })
}
