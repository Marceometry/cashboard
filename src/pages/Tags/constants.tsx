import { Button, ColumnProps, Currency, IconButton } from '@/components'
import { DateParam, TagModel, TransactionModel } from '@/types'
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
    customRender: ({ balance }) => (
      <Currency type={balance > 0 ? 'income' : 'outcome'} amount={balance} />
    ),
  },
  {
    customRender: ({ name }) => (
      <Button
        variant='link'
        fontWeight='normal'
        onClick={() => handleOpenTransactions(name)}
      >
        Transações
      </Button>
    ),
  },
  {
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
      <Currency type={type} amount={amount} />
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
    customRender: ({ id }) => (
      <IconButton
        onClick={() => removeTagFromTransaction(id)}
        aria-label='Remover tag desta transação'
        icon='close'
        size='sm'
        hasTooltip
      />
    ),
  },
]
