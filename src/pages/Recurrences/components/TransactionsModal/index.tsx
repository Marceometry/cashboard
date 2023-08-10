import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Flex } from '@chakra-ui/react'
import { Button, Form, Input, Modal, Table } from '@/components'
import { useDialog, useRecurrences, useTransactions } from '@/contexts'
import { RecurrentTransaction, TransactionModel } from '@/types'
import { currency, formatInputToISOString } from '@/utils'
import { getTransactionsColumns } from './constants'

type Props = {
  isOpen: boolean
  onClose: () => void
  recurrence: RecurrentTransaction
  data: TransactionModel[]
}

export const TransactionsModal = ({
  isOpen,
  onClose,
  recurrence,
  data,
}: Props) => {
  const [transactionList, setTransactionList] = useState(data)
  const formMethods = useForm()
  const { openDialog } = useDialog()
  const { updateRecurrence } = useRecurrences()
  const { addTransaction, dateParam, removeTransaction } = useTransactions()

  useEffect(() => {
    setTransactionList(data)
  }, [data])

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    const date = formatInputToISOString(data.date)
    const transaction = { ...recurrence, date, datePayed: date }

    const { id } = await addTransaction(transaction)
    if (!id) return

    const transactions = [...recurrence.transactions, { date, id }]
    updateRecurrence({ ...recurrence, transactions }, true)
    setTransactionList((state) => [...state, { ...transaction, id }])
    formMethods.reset()
  })

  const handleOpenDeleteTransactionDialog = (row: TransactionModel) => {
    openDialog({
      title: `${row.description} | ${currency.valueToMoney(row.amount)}`,
      body: 'Deseja realmente excluir esta transação? Essa ação não pode ser desfeita.',
      onConfirm: async () => {
        await removeTransaction(row)
        setTransactionList((state) =>
          state.filter((item) => item.id !== row.id)
        )
      },
    })
  }

  const columns = getTransactionsColumns(
    handleOpenDeleteTransactionDialog,
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
      <Table data={transactionList} columns={columns} size='sm' noSearch />
    </Modal>
  )
}
