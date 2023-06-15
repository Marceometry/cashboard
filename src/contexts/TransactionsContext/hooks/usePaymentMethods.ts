import { useTransactions } from '@/contexts'
import {
  PaymentMethodModel,
  PaymentMethods,
  paymentMethods,
  PaymentMethodsFilterModel,
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
    const { paymentMethod, amount, type } = transaction
    const isIncome = type === 'income'
    const currentPaymentMethod = acc.find(
      (c) => c.name === PaymentMethods[paymentMethod]
    )
    if (!currentPaymentMethod) {
      const newPaymentMethod = {
        name: PaymentMethods[paymentMethod],
        income: isIncome ? amount : 0,
        outcome: !isIncome ? amount : 0,
        balance: isIncome ? amount : -amount,
      }
      return [...acc, newPaymentMethod]
    }
    const newPaymentMethodList = acc.map((c) => {
      if (c.name !== PaymentMethods[paymentMethod]) return c
      return {
        ...c,
        income: isIncome ? c.income + amount : c.income,
        outcome: !isIncome ? c.outcome + amount : c.outcome,
        balance: isIncome ? c.balance + amount : c.balance - amount,
      }
    })
    return newPaymentMethodList
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

    const paymentMethodsHistory = orderedList.reduce(
      (acc: any[], item: TransactionModel) => {
        if (item.type !== type) return acc
        if (minAmount && item.amount < minAmount) return acc
        if (maxAmount && item.amount > maxAmount) return acc
        if (month && !filterByMonth(item[dateParam], month)) return acc
        if (year && !filterByYear(item[dateParam], year)) return acc

        const { amount, paymentMethod } = item
        const date = new Date(item[dateParam])

        const name = getFormattedMonthAndYear(date)
        const itemIndex = acc.findIndex((accItem) => accItem.name === name)

        if (acc[itemIndex]) {
          const value = acc[itemIndex][PaymentMethods[paymentMethod]]
            ? acc[itemIndex][PaymentMethods[paymentMethod]] + amount
            : amount

          acc[itemIndex] = {
            ...acc[itemIndex],
            name,
            [PaymentMethods[paymentMethod]]: value,
          }
          return [...acc]
        }

        return [...acc, { name, [PaymentMethods[paymentMethod]]: amount ?? 0 }]
      },
      []
    )

    const paymentMethodsObject = paymentMethods.reduce((acc, item) => {
      return { ...acc, [item[1]]: 0 }
    }, {})

    return paymentMethodsHistory.map((item) => ({
      ...paymentMethodsObject,
      ...item,
    }))
  }

  return {
    generateFilteredPaymentMethods,
    generatePaymentMethodsHistory,
  }
}
