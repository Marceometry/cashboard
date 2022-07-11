import { ColumnProps } from '@/components'
import { CategoryModel, TransactionType } from '@/contexts'
import { masks } from '@/utils'
import { Content, Label } from './components'

type DataModel = {
  outcome: number
  income: number
  name: string
  fraction: number
}

type Response = {
  data: DataModel[]
  chartData: {
    name: string
    value: number
  }[]
}

export const getColumns = (type: TransactionType): ColumnProps<DataModel>[] => [
  {
    label: 'Categoria',
    field: 'name',
  },
  {
    label: 'Quantidade',
    field: type,
    customRender: (props) => masks.valueToMoney(props[type]),
  },
  {
    label: 'Fração',
    field: 'fraction',
    customRender: ({ fraction }) => `${fraction}%`,
  },
]

export const generateData = (
  categoryList: CategoryModel[],
  type: TransactionType
): Response => {
  const orderedList = [
    ...categoryList
      .filter((item) => !!item[type])
      .sort((a, b) => b[type] - a[type]),
  ]

  const total = orderedList.reduce((value, item) => {
    return value + item[type]
  }, 0)

  const data = orderedList
    .map((item) => ({
      name: item.name,
      income: item.income,
      outcome: item.outcome,
      fraction: Math.round((100 * item[type]) / total),
    }))
    .splice(0, 10)

  const chartData = data
    .map((item) => {
      return { name: item.name, value: Number(item[type]) }
    })
    .splice(0, 5)

  return { data, chartData }
}

export const getTabs = (
  data: DataModel[],
  currentView: 'table' | 'chart',
  handleChartView: () => void
) => {
  const getContent = (type: TransactionType) => {
    return currentView === 'table' ? (
      <Content data={data} type={type} handleChartView={handleChartView} />
    ) : (
      <></>
    )
  }

  const getItem = (type: TransactionType) => ({
    key: type,
    label: <Label isSpent={type === 'outcome'} />,
    content: getContent(type),
  })

  return [getItem('outcome'), getItem('income')]
}
