import { ColumnProps } from '@/components'
import { CategoryModel, TransactionType } from '@/contexts'
import { masks } from '@/utils'

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
    label: 'Custos',
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
  ].splice(0, 5)

  const total = orderedList.reduce((value, item) => {
    return value + item[type]
  }, 0)

  const data = orderedList.map((item) => ({
    name: item.name,
    income: item.income,
    outcome: item.outcome,
    fraction: Math.round((100 * item[type]) / total),
  }))

  const chartData = data.map((item) => {
    return { name: item.name, value: Number(item[type]) }
  })

  return { data, chartData }
}
