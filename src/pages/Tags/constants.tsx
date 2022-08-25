import { Text } from '@chakra-ui/react'
import { Button, ColumnProps, IconButton } from '@/components'
import { TagModel, TransactionModel } from '@/contexts'
import { masks } from '@/utils'

export const getColumns = (
  handleOpenTransactions: (props: TagModel) => void,
  handleDeleteTag: (tag: string) => void
): ColumnProps<TagModel>[] => [
  {
    label: 'Tag',
    field: 'name',
  },
  {
    label: 'Entrada',
    field: 'income',
    customRender: (props) =>
      props.income ? masks.valueToMoney(props.income) : '-',
  },
  {
    label: 'Saída',
    field: 'outcome',
    customRender: (props) =>
      props.outcome ? masks.valueToMoney(props.outcome) : '-',
  },
  {
    label: 'Balanço',
    field: 'balance',
    customRender: (props) => (
      <Text color={props.balance > 0 ? '#48bb78' : '#f56565'}>
        {masks.valueToMoney(props.balance)}
      </Text>
    ),
  },
  {
    label: '',
    field: '',
    customRender: (props) => (
      <Button variant='link' onClick={() => handleOpenTransactions(props)}>
        Ver transações
      </Button>
    ),
  },
  {
    label: '',
    field: '',
    customRender: (props) => (
      <IconButton
        icon='delete'
        aria-label='Excluir tag'
        onClick={() => handleDeleteTag(props.name)}
      />
    ),
  },
]

export const getTransactionsColumns = (
  removeTagFromTransaction: (id: string) => void
): ColumnProps<TransactionModel>[] => [
  {
    label: 'Valor',
    field: 'amount',
    customRender: ({ amount, type }) => (
      <Text color={type === 'income' ? '#48bb78' : '#f56565'}>
        {masks.valueToMoney(amount)}
      </Text>
    ),
  },
  {
    label: 'Descrição',
    field: 'description',
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
    customRender: ({ id }) => (
      <IconButton
        onClick={() => removeTagFromTransaction(id)}
        aria-label='Remover tag desta transação'
        icon='close'
        hasTooltip
      />
    ),
  },
]
