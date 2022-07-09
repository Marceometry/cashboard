import { Center, StatArrow } from '@chakra-ui/react'
import { ColumnProps, IconButton, TableButtons } from '@/components'
import { TransactionModel } from '@/contexts'
import { masks } from '@/utils'

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

export const getCaption = (filters: FilterModel) => {
  if (!filters) return ''
  const { selectedMonth, selectedYear } = filters
  if (!selectedMonth || !selectedYear) return ''

  const month = selectedMonth > 9 ? selectedMonth : `0${selectedMonth}`
  return `${month}/${selectedYear}`
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
