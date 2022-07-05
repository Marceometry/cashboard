import { Center, StatArrow } from '@chakra-ui/react'
import { ButtonProps, ColumnProps, IconButton } from '@/components'

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
  handleDelete: (row: any) => void
}

export const getColumns = ({ handleDelete }: ColumnsProps): ColumnProps[] => [
  {
    label: '',
    field: 'type',
    customRender: ({ type }: any) => (
      <Center>
        <StatArrow type={type === 'income' ? 'increase' : 'decrease'} />
      </Center>
    ),
  },
  {
    label: 'Valor',
    field: 'amount',
    customRender: ({ amount }: any) => {
      return `R$ ${amount.toLocaleString()}`
    },
  },
  {
    label: 'Descrição',
    field: 'description',
  },
  {
    label: 'Data',
    field: 'date',
    customRender: ({ date }: any) => {
      return new Date(date).toLocaleDateString()
    },
  },
  {
    label: '',
    field: '',
    customRender: (row: any) => {
      return (
        <IconButton
          icon='delete'
          aria-label='Excluir transação'
          onClick={() => handleDelete(row)}
        />
      )
    },
  },
]
