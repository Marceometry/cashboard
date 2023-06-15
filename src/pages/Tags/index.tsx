import { useState } from 'react'
import { MainTemplate, Modal, Table } from '@/components'
import { useTags, useTransactions } from '@/contexts'
import { TransactionModel } from '@/types'
import { getColumns, getTransactionsColumns } from './constants'

export const Tags = () => {
  const { deleteTag, transactionsByTag, removeTagFromTransaction } = useTags()
  const { tagList, dateParam, isLoadingCache } = useTransactions()
  const [selectedTag, setSelectedTag] = useState('')
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false)

  const transactions: TransactionModel[] = transactionsByTag(selectedTag)

  const handleOpenTransactionsModal = (name: string) => {
    setSelectedTag(name)
    setIsTransactionsModalOpen(true)
  }

  const handleRemoveTagFromTransaction = (id: string) => {
    removeTagFromTransaction(id, selectedTag, transactions)
  }

  const columns = getColumns(handleOpenTransactionsModal, deleteTag)
  const transactionsColumns = getTransactionsColumns(
    handleRemoveTagFromTransaction,
    dateParam
  )

  return (
    <MainTemplate>
      <Table
        data={tagList}
        columns={columns}
        isLoading={isLoadingCache}
        noSearch
      />

      <Modal
        isOpen={isTransactionsModalOpen}
        onClose={() => setIsTransactionsModalOpen(false)}
        title={`${selectedTag} | Transações`}
      >
        <Table
          columns={transactionsColumns}
          data={transactions}
          size='sm'
          noSearch
        />
      </Modal>
    </MainTemplate>
  )
}
