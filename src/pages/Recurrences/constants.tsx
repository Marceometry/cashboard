import { Center, Text } from '@chakra-ui/react'
import { ColumnProps, IconButton } from '@/components'
import { RecurrentTransaction } from '@/contexts'
import { currency } from '@/utils'

export const getButtons = (handleRecurrenceModal: () => void) => ({
  textButtons: [
    { children: 'Nova recorrência', onClick: handleRecurrenceModal },
  ],
})

export const getColumns = (
  handleEdit: (id: string) => void,
  handleDelete: (row: RecurrentTransaction) => void
): ColumnProps<RecurrentTransaction>[] => [
  {
    label: 'Descrição',
    field: 'description',
  },
  {
    label: 'Valor',
    field: 'amount',
    customRender: ({ amount, type }) => (
      <Text color={type === 'income' ? 'green.400' : 'red.300'}>
        {currency.valueToMoney(amount)}
      </Text>
    ),
  },
  {
    label: 'Categoria',
    field: 'category',
  },
  {
    label: 'Data de início',
    field: 'startDate',
    customRender: ({ startDate }) => {
      return new Date(startDate).toLocaleDateString()
    },
  },
  {
    label: 'Parcelas',
    field: 'installments',
    customRender: ({ installments, transactions }) =>
      !installments ? '-' : `${transactions.length}/${installments}`,
  },
  {
    label: '',
    field: '',
    customRender: (row) => (
      <Center gap='4'>
        <IconButton
          icon='edit'
          aria-label='Editar recorrência'
          onClick={() => handleEdit(row.id)}
        />

        <IconButton
          icon='delete'
          aria-label='Excluir recorrência'
          onClick={() => handleDelete(row)}
        />
      </Center>
    ),
  },
]

export const deleteModalText =
  'Deseja realmente excluir esta transação recorrente? Essa ação excluirá todas as transações pertencentes à essa recorrência.'
