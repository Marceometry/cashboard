import { useState } from 'react'
import { Table, Card, MainTemplate } from '@/components'
import { TransactionModel, useDialog, useTransactions } from '@/contexts'
import { masks } from '@/utils'
import { getButtons, getColumns } from './constants'
import { AddTransactionModal } from './components'

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
        />
      </Card>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </MainTemplate>
  )
}
