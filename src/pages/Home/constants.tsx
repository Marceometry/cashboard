import { TransactionModel, TransactionType } from '@/contexts'
import {
  getFormattedDayAndMonth,
  getFormattedMonthAndYear,
  sortByDate,
} from '@/utils'
import { isThisMonth, isThisYear } from 'date-fns'
import { TabsContent } from './components'

export type View = 'total' | 'month' | 'year'

export type DateFilter = 'month' | 'year'

export const getTabs = (
  incomeItems: TransactionModel[],
  outcomeItems: TransactionModel[]
) => {
  const getContent = (filter?: DateFilter) => (
    <TabsContent
      incomeItems={incomeItems}
      outcomeItems={outcomeItems}
      filter={filter}
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
      content: getContent('month'),
    },
    {
      key: 3,
      label: 'Este ano',
      content: getContent('year'),
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
  view: View
) => {
  return sortByDate(list, true).reduce(
    (acc: ChartDataResponse, item: TransactionModel) => {
      const { amount, type } = item
      const date = new Date(item.date)
      if (
        (view !== 'total' && !isThisYear(date)) ||
        (view === 'month' && !isThisMonth(date))
      ) {
        return [...acc]
      }

      const name =
        view === 'month'
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

export const generateChartData = (list: TransactionModel[], view: View) => {
  const incomeData = getChartData(list, 'income', view)
  const outcomeData = getChartData(list, 'outcome', view)
  return { incomeData, outcomeData }
}
