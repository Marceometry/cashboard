import { Center, Text } from '@chakra-ui/react'
import { ColumnProps, IconButton, TableButtons } from '@/components'
import { TransactionModel } from '@/contexts'
import { currency, sortByDate } from '@/utils'

export const getButtons = (
  handleNewTransaction: () => void,
  handleOpenModalFilter: () => void
): TableButtons => ({
  textButtons: [
    {
      children: 'Nova Transação',
      onClick: handleNewTransaction,
    },
  ],
  iconButtons: [
    {
      icon: 'filter',
      'aria-label': 'Selecionar Filtros',
      onClick: handleOpenModalFilter,
    },
  ],
})

export const getIncomeAndOutcome = (
  data: TransactionModel[]
): [number, number] => {
  return data.reduce(
    (acc, item) => {
      const index = item.type === 'income' ? 0 : 1
      const value = acc[index] + item.amount
      acc[index] = value
      return acc
    },
    [0, 0]
  )
}

export const getColumns = (
  handleDeleteTransaction: (row: TransactionModel) => void,
  handleEditTransaction: (id: string) => void
): ColumnProps<TransactionModel>[] => {
  const columns: ColumnProps<TransactionModel>[] = [
    {
      label: 'Valor',
      field: 'amount',
      customRender: ({ amount, type }) => (
        <Text color={type === 'income' ? 'green.400' : 'red.300'}>
          {currency.valueToMoney(amount)}
        </Text>
      ),
    },
    {
      label: 'Descrição',
      field: 'description',
    },
    {
      label: 'Categoria',
      field: 'category',
    },
    {
      label: 'Data',
      field: 'date',
      customRender: ({ date }) => {
        return new Date(date).toLocaleDateString()
      },
    },
    {
      label: '',
      field: '',
      customRender: (row) => (
        <Center gap='4'>
          <IconButton
            icon='edit'
            aria-label='Editar transação'
            onClick={() => handleEditTransaction(row.id)}
          />
          <IconButton
            icon='delete'
            aria-label='Excluir transação'
            onClick={() => handleDeleteTransaction(row)}
          />
        </Center>
      ),
    },
  ]

  return columns
}

type ChartDataResponse = Array<{
  name: string
  income: number
  outcome: number
}>

export const generateChartData = (list: TransactionModel[]) => {
  return sortByDate(list, true).reduce(
    (acc: ChartDataResponse, item: TransactionModel) => {
      const { amount, type } = item
      const isIncome = type === 'income'
      const date = new Date(item.date)
      const name = `${date.getDate()}/${date.getMonth() + 1}`
      const itemIndex = acc.findIndex((accItem) => accItem.name === name)

      if (acc[itemIndex]) {
        const income = isIncome
          ? acc[itemIndex].income + amount
          : acc[itemIndex].income

        const outcome = !isIncome
          ? acc[itemIndex].outcome + amount
          : acc[itemIndex].outcome

        acc[itemIndex] = { name, income, outcome }
        return [...acc]
      }

      return [
        ...acc,
        {
          name,
          income: isIncome ? amount : 0,
          outcome: !isIncome ? amount : 0,
        },
      ]
    },
    []
  )
}

export const chartBars = [
  {
    dataKey: 'income',
    label: 'Entrada',
    color: '#48bb78',
  },
  {
    dataKey: 'outcome',
    label: 'Saída',
    color: '#f56565',
  },
]
