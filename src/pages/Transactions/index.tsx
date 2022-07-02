import { useState } from 'react'
import {
  Table,
  FloatButton,
  Card,
  AddTransactionModal,
  MainTemplate,
} from '@/components'
import { useTransactions } from '@/contexts'
import { getColumns } from './constants'

export const Transactions = () => {
  const { transactionList, removeTransaction } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const columns = getColumns({ handleDelete: removeTransaction })

  return (
    <MainTemplate>
      <Card>
        <Table caption='Transações' columns={columns} data={transactionList} />
      </Card>

      <FloatButton onClick={() => setIsModalOpen(true)} />
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </MainTemplate>
  )
}
