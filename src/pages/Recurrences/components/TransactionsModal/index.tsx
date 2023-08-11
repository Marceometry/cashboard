import { useForm } from 'react-hook-form'
import { Flex } from '@chakra-ui/react'
import { Button, Form, Input, Modal, Table } from '@/components'
import {
  formatTransaction,
  useDialog,
  useRecurrences,
  useTransactions,
} from '@/contexts'
import { RecurrentTransaction, TransactionModel } from '@/types'
import { currency, formatInputToISOString } from '@/utils'
import { getTransactionsColumns } from './constants'

export type TransactionsModalItem =
  | TransactionModel
  | { id: string; date: string }

type Props = {
  isOpen: boolean
  onClose: () => void
  recurrence: RecurrentTransaction
  data: TransactionsModalItem[]
}

export const TransactionsModal = ({
  isOpen,
  onClose,
  recurrence,
  data,
}: Props) => {
  const formMethods = useForm()
  const { openDialog } = useDialog()
  const { updateRecurrence } = useRecurrences()
  const { addTransaction, dateParam, removeTransaction } = useTransactions()

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    const date = formatInputToISOString(data.date)
    const transaction = { ...recurrence, date, datePayed: date }

    const { id } = await addTransaction(transaction)
    if (!id) return

    const transactions = [...recurrence.transactions, { date, id }]
    updateRecurrence({ ...recurrence, transactions }, true)
    formMethods.reset()
  })

  const handleOpenDeleteTransactionDialog = (row: TransactionModel) => {
    openDialog({
      title: `${row.description} | ${currency.valueToMoney(row.amount)}`,
      body: 'Deseja realmente excluir esta transação? Essa ação não pode ser desfeita.',
      onConfirm: () => removeTransaction(row),
    })
  }

  const removeEmptySpace = (date: string) => {
    const transactions = data
      .filter((item) => item.id || item.date !== date)
      .map((t) => ({ id: t.id, date: t.date }))
    updateRecurrence({ ...recurrence, transactions }, true)
  }

  const addTransactionInDate = async (date: string) => {
    const transaction = formatTransaction({
      ...recurrence,
      datePayed: date,
      date,
    })
    const { id } = await addTransaction(transaction)
    const transactions = data.map((item) => {
      if (item.id || item.date !== date) return item
      return { id, date: item.date }
    })
    updateRecurrence({ ...recurrence, transactions }, true)
  }

  const columns = getTransactionsColumns(
    handleOpenDeleteTransactionDialog,
    removeEmptySpace,
    addTransactionInDate,
    dateParam
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={'Transações'}>
      <Flex mb='4' w='full' justifyContent='flex-end'>
        <Form formMethods={formMethods} onSubmit={handleSubmit}>
          <Flex gap='4'>
            <Input name='date' type='date' size='sm' />
            <Button size='sm' type='submit'>
              Adicionar nova transação
            </Button>
          </Flex>
        </Form>
      </Flex>
      <Table data={data} columns={columns} size='sm' noSearch />
    </Modal>
  )
}
