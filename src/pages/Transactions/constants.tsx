import { Center, StatArrow } from '@chakra-ui/react'

type ColumnsProps = {
  handleDelete: (row: any) => void
}

export const getColumns = ({ handleDelete }: ColumnsProps) => [
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
        <button type='button' onClick={() => handleDelete(row)}>
          Excluir
        </button>
      )
    },
  },
]
