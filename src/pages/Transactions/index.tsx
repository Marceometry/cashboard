import { useState } from 'react'
import { Table, Card, AddTransactionModal, MainTemplate } from '@/components'
import { useTransactions } from '@/contexts'
import { getButtons, getColumns } from './constants'

export const Transactions = () => {
  const { transactionList, removeTransaction } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => setIsModalOpen(true)

  const columns = getColumns({ handleDelete: removeTransaction })
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
