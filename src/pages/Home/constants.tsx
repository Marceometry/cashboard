import { TransactionModel, TransactionType } from '@/contexts'
import {
  getFormattedDayAndMonth,
  getFormattedMonthAndYear,
  sortByDate,
} from '@/utils'
import { TabsContent } from './components'

export const getTabs = (
  incomeItems: TransactionModel[],
  outcomeItems: TransactionModel[]
) => {
  const getContent = (month?: number) => (
    <TabsContent
      incomeItems={incomeItems}
      outcomeItems={outcomeItems}
      month={month}
    />
  )

  return [
    {
      key: 1,
      label: 'Total',
      content: getContent(),
    },
    {
      key: 2,
      label: 'Este mês',
      content: getContent(new Date().getMonth()),
    },
    {
      key: 3,
      label: 'Mês passado',
      content: getContent(new Date().getMonth() - 1),
    },
  ]
}

type ChartDataResponse = Array<{
  name: string
  value: number
}>

export const getChartData = (
  list: TransactionModel[],
  chartType: TransactionType,
  month: number | null
) => {
  return sortByDate(list, true).reduce(
    (acc: ChartDataResponse, item: TransactionModel) => {
      const { amount, type } = item
      const date = new Date(item.date)
      if (month && date.getMonth() !== month) return [...acc]

      const name = month
        ? getFormattedDayAndMonth(date)
        : getFormattedMonthAndYear(date)
      const itemIndex = acc.findIndex((accItem) => accItem.name === name)

      if (acc[itemIndex]) {
        const value =
          type === chartType
            ? acc[itemIndex].value + amount
            : acc[itemIndex].value

        acc[itemIndex] = { name, value }
        return [...acc]
      }

      return [...acc, { name, value: type === chartType ? amount : 0 }]
    },
    []
  )
}

export const generateChartData = (
  list: TransactionModel[],
  month: number | null
) => {
  const incomeData = getChartData(list, 'income', month)
  const outcomeData = getChartData(list, 'outcome', month)
  return { incomeData, outcomeData }
}
