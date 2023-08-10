import { ColumnProps, Currency, IconButton } from '@/components'
import { DateParam, TransactionModel } from '@/types'

export const getTransactionsColumns = (
  deleteTransaction: (row: TransactionModel) => void,
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
    customRender: (row) => (
      <IconButton
        onClick={() => deleteTransaction(row)}
        aria-label='Remover tag desta transação'
        icon='delete'
        size='sm'
        hasTooltip
      />
    ),
  },
]
