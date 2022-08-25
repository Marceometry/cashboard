import { useState } from 'react'
import { MainTemplate, Modal, Table } from '@/components'
import {
  TagModel,
  TransactionModel,
  useTags,
  useTransactions,
} from '@/contexts'
import { sortByDate } from '@/utils'
import { getColumns, getTransactionsColumns } from './constants'

export const Tags = () => {
  const { transactionList, updateTransaction } = useTransactions()
  const { tagList, deleteTag, isLoading } = useTags()
  const [selectedTag, setSelectedTag] = useState('')
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false)

  const transactions: TransactionModel[] = sortByDate(transactionList).filter(
    (item) => item.tags?.find((tag: string) => tag === selectedTag)
  )

  const handleOpenTransactions = (props: TagModel) => {
    setSelectedTag(props.name)
    setIsTransactionsModalOpen(true)
  }

  const removeTagFromTransaction = (id: string) => {
    const transaction = transactions.find((item) => item.id === id)
    if (!transaction) return
    updateTransaction({
      ...transaction,
      tags: transaction?.tags?.filter((tag) => tag !== selectedTag),
    })
  }

  const columns = getColumns(handleOpenTransactions, deleteTag)
  const transactionsColumns = getTransactionsColumns(removeTagFromTransaction)

  return (
    <MainTemplate>
      <Table columns={columns} data={tagList} isLoading={isLoading} noSearch />

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
