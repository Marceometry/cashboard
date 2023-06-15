import { useTransactions } from '@/contexts'
import {
  PaymentMethodModel,
  PaymentMethodsFilterModel,
  paymentTypes,
  PaymentTypes,
  TransactionModel,
  TransactionType,
} from '@/types'
import {
  filterByMonth,
  filterByYear,
  getFormattedMonthAndYear,
  sortByDate,
} from '@/utils'

const generatePaymentMethods = (
  transactions: TransactionModel[]
): PaymentMethodModel[] => {
  const paymentMethods = transactions.reduce((acc, transaction) => {
    const { paymentType, amount, type } = transaction
    const isIncome = type === 'income'
    const currentPaymentType = acc.find(
      (c) => c.name === PaymentTypes[paymentType]
    )
    if (!currentPaymentType) {
      const newPaymentType = {
        name: PaymentTypes[paymentType],
        income: isIncome ? amount : 0,
        outcome: !isIncome ? amount : 0,
        balance: isIncome ? amount : -amount,
      }
      return [...acc, newPaymentType]
    }
    const newPaymentTypeList = acc.map((c) => {
      if (c.name !== PaymentTypes[paymentType]) return c
      return {
        ...c,
        income: isIncome ? c.income + amount : c.income,
        outcome: !isIncome ? c.outcome + amount : c.outcome,
        balance: isIncome ? c.balance + amount : c.balance - amount,
      }
    })
    return newPaymentTypeList
  }, [] as PaymentMethodModel[])
  return paymentMethods
}

export const usePaymentMethods = () => {
  const { transactionList, dateParam } = useTransactions()

  const generateFilteredPaymentMethods = (
    filters: PaymentMethodsFilterModel,
    type: TransactionType
  ) => {
    const { month, year, minAmount, maxAmount } = filters

    const transactions = sortByDate(transactionList, true).filter(
      (item: TransactionModel) => {
        if (month && !filterByMonth(item[dateParam], month)) return false
        if (year && !filterByYear(item[dateParam], year)) return false
        return true
      }
    )

    return generatePaymentMethods(transactions).filter((item) => {
      if (minAmount && item[type] < minAmount) return false
      if (maxAmount && item[type] > maxAmount) return false
      return true
    })
  }

  const generatePaymentMethodsHistory = (
    filters: PaymentMethodsFilterModel,
    type: TransactionType
  ) => {
    const { month, year, minAmount, maxAmount } = filters
    const orderedList: TransactionModel[] = sortByDate(transactionList, true)

    const paymentTypesHistory = orderedList.reduce(
      (acc: any[], item: TransactionModel) => {
        if (item.type !== type) return acc
        if (minAmount && item.amount < minAmount) return acc
        if (maxAmount && item.amount > maxAmount) return acc
        if (month && !filterByMonth(item[dateParam], month)) return acc
        if (year && !filterByYear(item[dateParam], year)) return acc

        const { amount, paymentType } = item
        const date = new Date(item[dateParam])

        const name = getFormattedMonthAndYear(date)
        const itemIndex = acc.findIndex((accItem) => accItem.name === name)

        if (acc[itemIndex]) {
          const value = acc[itemIndex][PaymentTypes[paymentType]]
            ? acc[itemIndex][PaymentTypes[paymentType]] + amount
            : amount

          acc[itemIndex] = {
            ...acc[itemIndex],
            name,
            [PaymentTypes[paymentType]]: value,
          }
          return [...acc]
        }

        return [...acc, { name, [PaymentTypes[paymentType]]: amount ?? 0 }]
      },
      []
    )

    const paymentTypesObject = paymentTypes.reduce((acc, item) => {
      return { ...acc, [item[1]]: 0 }
    }, {})

    return paymentTypesHistory.map((item) => ({
      ...paymentTypesObject,
      ...item,
    }))
  }

  return {
    generateFilteredPaymentMethods,
    generatePaymentMethodsHistory,
  }
}
