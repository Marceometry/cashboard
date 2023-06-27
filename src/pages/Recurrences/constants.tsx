import { Badge, Center, Flex, GridItem, Text } from '@chakra-ui/react'
import { ColumnProps, Currency, IconButton, Switch } from '@/components'
import { PaymentMethods, RecurrentTransaction } from '@/types'

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
      <Currency type={type} amount={amount} />
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
        green
      />
    ),
  },
  {
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

export const getMobileCard = (
  item: RecurrentTransaction,
  handleDeleteTransaction: (row: RecurrentTransaction) => void,
  handleEditTransaction: (id: string) => void,
  toggleActivity: (id: string, isActive: boolean) => void
) => {
  const {
    id,
    amount,
    category,
    description,
    installments,
    isActive,
    paymentMethod,
    startDate,
    transactions,
    type,
  } = item

  return (
    <>
      <GridItem display='flex' flexDir='column' justifyContent='space-between'>
        <Text>{description}</Text>
        <Currency fontSize='sm' type={type} amount={amount} />
        <Text fontSize='sm'>{PaymentMethods[paymentMethod]}</Text>
      </GridItem>
      <GridItem
        display='flex'
        flexDir='column'
        justifyContent='space-between'
        justifySelf='end'
        textAlign='right'
      >
        <Flex mb='1' gap='2' alignItems='center' justifyContent='flex-end'>
          <Switch
            isDisabled={installments === transactions.length}
            isChecked={isActive}
            onChange={() => toggleActivity(id, !isActive)}
            green
          />
          <IconButton
            aria-label='Editar transação'
            icon='edit'
            size='xs'
            onClick={() => handleEditTransaction(id)}
          />
          <IconButton
            aria-label='Excluir transação'
            icon='delete'
            size='xs'
            onClick={() => handleDeleteTransaction(item)}
          />
        </Flex>
        <Text fontSize='sm'>{new Date(startDate).toLocaleDateString()}</Text>
        <Text fontSize='sm'>{category}</Text>
        <Text fontSize='sm'>
          Parcelas:{' '}
          <Badge fontFamily='monospace' px='1'>
            {!installments
              ? String(transactions.length)
              : `${transactions.length}/${installments}`}
          </Badge>
        </Text>
      </GridItem>
    </>
  )
}
