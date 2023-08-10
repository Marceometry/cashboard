import { Badge, Center, Flex, GridItem, Text } from '@chakra-ui/react'
import {
  Button,
  ColumnProps,
  Currency,
  IconButton,
  Switch,
  TableButtons,
} from '@/components'
import { PaymentMethods, RecurrentTransaction } from '@/types'

export const getButtons = (
  handleRecurrenceModal: () => void,
  handleModalFilters: () => void
): TableButtons => ({
  textButtons: [
    { children: 'Nova recorrência', onClick: handleRecurrenceModal },
  ],
  iconButtons: [
    {
      icon: 'filter',
      'aria-label': 'Selecionar Filtros',
      onClick: handleModalFilters,
    },
  ],
})

export const getColumns = (
  handleEdit: (row: RecurrentTransaction) => void,
  handleDelete: (row: RecurrentTransaction) => void,
  toggleActivity: (id: string, isActive: boolean) => void,
  handleOpenTransactions: (recurrence: RecurrentTransaction) => void
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
    customRender: ({ installments, ...item }) => {
      const transactions = item.transactions.filter((t) => !!t.id)
      return !installments
        ? String(transactions.length)
        : `${transactions.length}/${installments}`
    },
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
    customRender: (recurrence) => (
      <Button
        variant='link'
        fontWeight='normal'
        onClick={() => handleOpenTransactions(recurrence)}
      >
        Transações
      </Button>
    ),
  },
  {
    customRender: (row) => (
      <Center gap='4'>
        <IconButton
          icon='edit'
          aria-label='Editar recorrência'
          onClick={() => handleEdit(row)}
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
  handleEditTransaction: (item: RecurrentTransaction) => void,
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
            onClick={() => handleEditTransaction(item)}
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
