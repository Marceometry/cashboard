import { Center, Flex, Stat, StatArrow, Text } from '@chakra-ui/react'
import { ColumnProps, IconButton, TableButtons } from '@/components'
import { TransactionModel, TransactionType } from '@/contexts'
import { masks, sortByDate } from '@/utils'

export type FilterModel = {
  selectedMonth: number
  selectedYear: number
  selectedCategories: string[]
  minAmount: string
  maxAmount: string
}

export const defaultFilterValues: FilterModel = {
  selectedMonth: new Date().getMonth() + 1,
  selectedYear: new Date().getFullYear(),
  selectedCategories: [],
  maxAmount: '',
  minAmount: '',
}

export const emptyFilterValues: FilterModel = {
  selectedMonth: 0,
  selectedYear: 0,
  selectedCategories: [],
  maxAmount: '',
  minAmount: '',
}

type ButtonsProps = {
  handleNewTransaction: () => void
  handleOpenModalFilter: () => void
}

export const getButtons = ({
  handleNewTransaction,
  handleOpenModalFilter,
}: ButtonsProps): TableButtons => ({
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

export const getCaption = (filters: FilterModel, data: TransactionModel[]) => {
  const [income, outcome] = data.reduce(
    (acc, item) => {
      const index = item.type === 'income' ? 0 : 1
      const value = acc[index] + item.amount
      acc[index] = value
      return acc
    },
    [0, 0]
  )

  const Balance = () => (
    <Stat>
      <Flex alignItems='center' gap='1'>
        <StatArrow type='increase' />
        <Text fontSize='md'>{masks.valueToMoney(income)}</Text>
      </Flex>
      <Flex alignItems='center' gap='1'>
        <StatArrow type='decrease' />
        <Text fontSize='md'>{masks.valueToMoney(outcome)}</Text>
      </Flex>
    </Stat>
  )

  if (!filters) return <Balance />

  const { selectedMonth, selectedYear } = filters
  if (!selectedMonth || !selectedYear) return ''

  const month = selectedMonth > 9 ? selectedMonth : `0${selectedMonth}`
  return (
    <Flex gap='4'>
      {month}/{selectedYear}
      <Balance />
    </Flex>
  )
}

type ColumnsProps = {
  handleDeleteTransaction: (row: TransactionModel) => void
  handleEditTransaction: (id: number) => void
}

export const getColumns = ({
  handleDeleteTransaction,
  handleEditTransaction,
}: ColumnsProps): ColumnProps<TransactionModel>[] => [
  {
    label: '',
    field: 'type',
    customRender: ({ type }) => (
      <Center>
        <StatArrow type={type === 'income' ? 'increase' : 'decrease'} />
      </Center>
    ),
  },
  {
    label: 'Valor',
    field: 'amount',
    customRender: ({ amount }) => masks.valueToMoney(amount),
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
      const name = date.getDate().toString()
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
