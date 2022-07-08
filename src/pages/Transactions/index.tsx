import { useState } from 'react'
import { Table, Card, MainTemplate } from '@/components'
import { TransactionModel, useDialog, useTransactions } from '@/contexts'
import { masks } from '@/utils'
import { getButtons, getColumns } from './constants'
import { AddTransactionModal } from './components'
import { isBefore } from 'date-fns'

export const Transactions = () => {
  const { openDialog } = useDialog()
  const { transactionList, removeTransaction } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => setIsModalOpen(true)

  const handleOpenDeleteDialog = (row: TransactionModel) => {
    openDialog({
      title: `${row.description} | R$ ${masks.monetaryValue(row.amount)}`,
      body: 'Deseja realmente excluir esta transação? Essa ação não pode ser desfeita.',
      onConfirm: () => removeTransaction(row),
    })
  }

  const columns = getColumns({ handleDelete: handleOpenDeleteDialog })
  const buttons = getButtons({ handleClick })

  return (
    <MainTemplate>
      <Card>
        <Table
          caption='Transações'
          columns={columns}
          data={transactionList}
          buttons={buttons}
          sortFunction={(a, b) => {
            const date1 = new Date(a.date)
            const date2 = new Date(b.date)
            return isBefore(date1, date2) ? 1 : isBefore(date2, date1) ? -1 : 0
          }}
        />
      </Card>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </MainTemplate>
  )
}
