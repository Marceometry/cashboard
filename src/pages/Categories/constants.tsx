import { masks } from '@/utils'
import { ChartProps, ColumnProps, TableButtons } from '@/components'
import { CHART_COLORS } from '@/constants'
import { CategoryModel, TransactionType } from '@/contexts'
import { Caption, CaptionProps } from './components'
import { ChartType, DataModel, Response } from './types'

export const getCaption = (props: CaptionProps) => <Caption {...props} />

export const getButtons = (handleClick: () => void): TableButtons => ({
  iconButtons: [
    {
      icon: 'filter',
      'aria-label': 'Selecionar Filtros',
      onClick: handleClick,
    },
  ],
})

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

  const data = orderedList.map((item) => ({
    name: item.name,
    income: item.income,
    outcome: item.outcome,
    fraction: Math.round((100 * item[type]) / total),
  }))

  const chartData = data
    .map((item) => {
      return { name: item.name, value: Number(item[type]) }
    })
    .splice(0, 5)

  return { data, chartData }
}

export const getCharts = (
  chartData: ChartType[],
  areaChartData: CategoryModel[]
): ChartProps[] => [
  {
    type: 'pie',
    data: chartData,
  },
  {
    type: 'area',
    isMonth: true,
    data: areaChartData,
    sections: chartData.map((item, index) => ({
      label: item.name,
      dataKey: item.name,
      color: CHART_COLORS[index % CHART_COLORS.length],
    })),
  },
]
