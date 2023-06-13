import { Text } from '@chakra-ui/react'
import { Button, ColumnProps, IconButton } from '@/components'
import { DateParam, TagModel, TransactionModel } from '@/contexts'
import { currency } from '@/utils'

export const getColumns = (
  handleOpenTransactions: (name: string) => void,
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
      props.income ? currency.valueToMoney(props.income) : '-',
  },
  {
    label: 'Saída',
    field: 'outcome',
    customRender: (props) =>
      props.outcome ? currency.valueToMoney(props.outcome) : '-',
  },
  {
    label: 'Balanço',
    field: 'balance',
    customRender: (props) => (
      <Text color={props.balance > 0 ? 'green.400' : 'red.300'}>
        {currency.valueToMoney(props.balance)}
      </Text>
    ),
  },
  {
    label: '',
    field: '',
    customRender: ({ name }) => (
      <Button variant='link' onClick={() => handleOpenTransactions(name)}>
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
  removeTagFromTransaction: (id: string) => void,
  dateParam: DateParam
): ColumnProps<TransactionModel>[] => [
  {
    label: 'Valor',
    field: 'amount',
    customRender: ({ amount, type }) => (
      <Text color={type === 'income' ? '#48bb78' : '#f56565'}>
        {currency.valueToMoney(amount)}
      </Text>
    ),
  },
  {
    label: 'Descrição',
    field: 'description',
  },
  {
    label: 'Data',
    field: dateParam,
    customRender: (props) => {
      return new Date(props[dateParam]).toLocaleDateString()
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
