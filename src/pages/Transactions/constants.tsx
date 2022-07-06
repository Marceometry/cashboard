import { Center, StatArrow } from '@chakra-ui/react'
import { ButtonProps, ColumnProps, IconButton } from '@/components'
import { TransactionModel } from '@/contexts'

type ButtonsProps = {
  handleClick: () => void
}

export const getButtons = ({ handleClick }: ButtonsProps): ButtonProps[] => [
  {
    children: 'Nova Transação',
    onClick: handleClick,
  },
]

type ColumnsProps = {
  handleDelete: (row: TransactionModel) => void
}

export const getColumns = ({
  handleDelete,
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
    customRender: ({ amount }) => {
      return `R$ ${amount.toLocaleString()}`
    },
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
      <IconButton
        icon='delete'
        aria-label='Excluir transação'
        onClick={() => handleDelete(row)}
      />
    ),
  },
]
