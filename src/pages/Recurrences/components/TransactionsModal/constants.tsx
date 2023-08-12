import { Flex } from '@chakra-ui/react'
import { isFuture, isThisMonth } from 'date-fns'
import { ColumnProps, Currency, IconButton } from '@/components'
import { DateParam, TransactionModel } from '@/types'

export const getTransactionsColumns = (
  deleteTransaction: (row: TransactionModel) => void,
  removeEmptySpace: (date: string) => void,
  addTransaction: (date: string) => void,
  dateParam: DateParam
): ColumnProps<TransactionModel>[] => [
  {
    label: 'Valor',
    field: 'amount',
    customRender: ({ amount, type }) =>
      amount ? <Currency type={type} amount={amount} /> : '-',
  },
  {
    label: 'Descrição',
    field: 'description',
    customRender: ({ description }) => description || 'Vazio',
  },
  {
    label: 'Data',
    field: dateParam,
    customRender: (props) => {
      return new Date(props[dateParam]).toLocaleDateString()
    },
  },
  {
    customRender: (row) =>
      row.id ? (
        <IconButton
          onClick={() => deleteTransaction(row)}
          aria-label='Excluir transação'
          icon='delete'
          size='sm'
          hasTooltip
        />
      ) : (
        <Flex gap='2'>
          {isFuture(new Date(row.date)) && !isThisMonth(new Date(row.date)) && (
            <IconButton
              onClick={() => removeEmptySpace(row.date)}
              aria-label='Remover espaço vazio'
              icon='delete'
              size='sm'
              hasTooltip
            />
          )}
          <IconButton
            onClick={() => addTransaction(row.date)}
            aria-label='Adicionar transação nesta data'
            icon='add'
            size='sm'
            hasTooltip
          />
        </Flex>
      ),
  },
]
