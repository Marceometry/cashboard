import { Center, Text } from '@chakra-ui/react'
import { ColumnProps, IconButton, Switch } from '@/components'
import { PaymentMethods, RecurrentTransaction } from '@/types'
import { currency } from '@/utils'

export const getButtons = (handleRecurrenceModal: () => void) => ({
  textButtons: [
    { children: 'Nova recorrência', onClick: handleRecurrenceModal },
  ],
})

export const getColumns = (
  handleEdit: (id: string) => void,
  handleDelete: (row: RecurrentTransaction) => void,
  toggleActivity: (id: string, isActive: boolean) => void
): ColumnProps<RecurrentTransaction>[] => [
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
    label: 'Descrição',
    field: 'description',
  },
  {
    label: 'Categoria',
    field: 'category',
  },
  {
    label: 'Pagamento',
    field: 'paymentMethod',
    customRender: ({ paymentMethod }) => PaymentMethods[paymentMethod],
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
      !installments
        ? String(transactions.length)
        : `${transactions.length}/${installments}`,
  },
  {
    label: 'Ativo',
    field: 'isActive',
    customRender: ({ id, isActive, installments, transactions }) => (
      <Switch
        isDisabled={installments === transactions.length}
        isChecked={isActive}
        onChange={() => toggleActivity(id, !isActive)}
      />
    ),
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
