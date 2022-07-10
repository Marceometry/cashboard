import { useEffect, useState } from 'react'
import { Table, Card, MainTemplate } from '@/components'
import { TransactionModel, useDialog, useTransactions } from '@/contexts'
import { masks, sortByDate } from '@/utils'
import {
  getButtons,
  getColumns,
  getCaption,
  defaultFilterValues,
} from './constants'
import { AddTransactionModal, ModalFilters } from './components'
import { filterData } from './utils'

export const Transactions = () => {
  const { openDialog } = useDialog()
  const { transactionList, removeTransaction } = useTransactions()
  const [tableData, setTableData] = useState<TransactionModel[]>([])
  const [tableFilters, setTableFilters] = useState(defaultFilterValues)
  const [selectedTransactionId, setSelectedTransactionId] = useState<number>()
  const [isModalTransactionOpen, setIsModalTransactionOpen] = useState(false)
  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false)

  useEffect(() => {
    const filteredData = filterData(transactionList, tableFilters)
    setTableData(filteredData)
  }, [transactionList, tableFilters])

  const handleOpenTransactionModal = (selectedId?: number) => {
    setIsModalTransactionOpen(true)
    setSelectedTransactionId(selectedId)
  }

  const handleOpenDeleteDialog = (row: TransactionModel) => {
    openDialog({
      title: `${row.description} | R$ ${masks.monetaryValue(row.amount)}`,
      body: 'Deseja realmente excluir esta transação? Essa ação não pode ser desfeita.',
      onConfirm: () => removeTransaction(row),
    })
  }

  const caption = getCaption(tableFilters, tableData)
  const buttons = getButtons({
    handleNewTransaction: () => handleOpenTransactionModal(),
    handleOpenModalFilter: () => setIsModalFiltersOpen(true),
  })
  const columns = getColumns({
    handleDeleteTransaction: handleOpenDeleteDialog,
    handleEditTransaction: (id: number) => handleOpenTransactionModal(id),
  })

  return (
    <MainTemplate>
      <Card>
        <Table
          data={tableData}
          columns={columns}
          buttons={buttons}
          caption={caption}
          sortFunction={sortByDate}
        />
      </Card>

      <AddTransactionModal
        isOpen={isModalTransactionOpen}
        onClose={() => setIsModalTransactionOpen(false)}
        selectedId={selectedTransactionId}
      />

      <ModalFilters
        isOpen={isModalFiltersOpen}
        onClose={() => setIsModalFiltersOpen(false)}
        handleFilter={setTableFilters}
      />
    </MainTemplate>
  )
}
