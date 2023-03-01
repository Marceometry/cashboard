import { getYear } from 'date-fns'
import { TransactionModel } from '@/contexts'
import { getFormattedMonthAndYear, sortByDate } from '@/utils'
import { TabsContent } from './components'

export type View = 'month' | 'year'

export type ChartData = Array<{
  name: string
  income: number
  outcome: number
  balance: number
}>

export const getTabs = (data: ChartData) => {
  const getContent = () => <TabsContent data={data} />

  return [
    {
      key: 1,
      label: 'Por mês',
      content: getContent(),
    },
    {
      key: 2,
      label: 'Por ano',
      content: getContent(),
    },
  ]
}

export const getChartData = (list: TransactionModel[], view: View) => {
  return sortByDate(list, true).reduce(
    (acc: ChartData, item: TransactionModel) => {
      const { amount, type } = item
      const date = new Date(item.date)

      const name =
        view === 'year' ? String(getYear(date)) : getFormattedMonthAndYear(date)
      const itemIndex = acc.findIndex((accItem) => accItem.name === name)
      const isIncome = type === 'income'

      if (acc[itemIndex]) {
        const balance = isIncome
          ? acc[itemIndex]?.balance + amount
          : acc[itemIndex]?.balance - amount
        const income = isIncome
          ? acc[itemIndex].income + amount
          : acc[itemIndex].income
        const outcome = !isIncome
          ? acc[itemIndex].outcome + amount
          : acc[itemIndex].outcome

        acc[itemIndex] = { name, balance, income, outcome }
        return [...acc]
      }

      const currentBalance = acc[acc.length - 1]?.balance || 0
      const balance = isIncome
        ? currentBalance + amount
        : currentBalance - amount

      const income = isIncome ? amount : 0
      const outcome = !isIncome ? amount : 0

      return [...acc, { name, balance, income, outcome }]
    },
    []
  )
}

export const getChartSections = (view: View) => {
  const balance = {
    label: 'Total economizado',
    color: '#3984e7',
    dataKey: 'balance',
  }
  const income = {
    label: 'Entrada',
    color: '#48bb78',
    dataKey: 'income',
  }
  const outcome = {
    label: 'Saída',
    color: '#f56565',
    dataKey: 'outcome',
  }

  return view === 'month'
    ? [balance, income, outcome]
    : [income, outcome, balance]
}
