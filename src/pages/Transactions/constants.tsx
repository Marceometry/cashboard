import { Center, Flex, GridItem, Text } from '@chakra-ui/react'
import { ColumnProps, Currency, IconButton, TableButtons } from '@/components'
import { DateParam, PaymentMethods, TransactionModel } from '@/types'
import { sortByDate } from '@/utils'

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
  handleEditTransaction: (id: string) => void,
  dateParam: DateParam
): ColumnProps<TransactionModel>[] => {
  const columns: ColumnProps<TransactionModel>[] = [
    {
      label: 'Valor',
      field: 'amount',
      customRender: ({ amount, type }) => (
        <Currency type={type} amount={amount} />
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
      label: 'Pagamento',
      field: 'paymentMethod',
      customRender: ({ paymentMethod }) => PaymentMethods[paymentMethod],
    },
    {
      label: 'Data',
      field: dateParam,
      customRender: (props) => {
        return new Date(props[dateParam]).toLocaleDateString()
      },
    },
    {
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

export const getMobileCard = (
  item: TransactionModel,
  dateParam: DateParam,
  handleDeleteTransaction: (row: TransactionModel) => void,
  handleEditTransaction: (id: string) => void
) => {
  const { id, amount, category, description, paymentMethod, type } = item

  return (
    <>
      <GridItem display='flex' flexDir='column' justifyContent='space-between'>
        <Text>{description}</Text>
        <Currency fontSize='sm' type={type} amount={amount} />
        <Text fontSize='sm'>{PaymentMethods[paymentMethod]}</Text>
      </GridItem>
      <GridItem
        display='flex'
        flexDir='column'
        justifyContent='space-between'
        justifySelf='end'
        textAlign='right'
      >
        <Flex mb='1' gap='2' justifyContent='flex-end'>
          <IconButton
            aria-label='Editar transação'
            icon='edit'
            size='xs'
            onClick={() => handleEditTransaction(id)}
          />
          <IconButton
            aria-label='Excluir transação'
            icon='delete'
            size='xs'
            onClick={() => handleDeleteTransaction(item)}
          />
        </Flex>
        <Text fontSize='sm'>
          {new Date(item[dateParam]).toLocaleDateString()}
        </Text>
        <Text fontSize='sm'>{category}</Text>
      </GridItem>
    </>
  )
}

type ChartDataResponse = Array<{
  name: string
  income: number
  outcome: number
}>

export const generateChartData = (
  list: TransactionModel[],
  dateParam: DateParam
) => {
  return sortByDate(list, true, dateParam).reduce(
    (acc: ChartDataResponse, item) => {
      const { amount, type } = item
      const isIncome = type === 'income'
      const date = new Date(item[dateParam])
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
