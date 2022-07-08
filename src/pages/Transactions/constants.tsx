import { Center, StatArrow } from '@chakra-ui/react'
import { ButtonProps, ColumnProps, IconButton } from '@/components'
import { TransactionModel } from '@/contexts'
import { masks } from '@/utils'

type ButtonsProps = {
  handleNewTransaction: () => void
}

export const getButtons = ({
  handleNewTransaction,
}: ButtonsProps): ButtonProps[] => [
  {
    children: 'Nova Transação',
    onClick: handleNewTransaction,
  },
]

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
