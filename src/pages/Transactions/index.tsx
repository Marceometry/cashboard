import { useEffect, useState } from 'react'
import { Table, Card, MainTemplate } from '@/components'
import { TransactionModel, useDialog, useTransactions } from '@/contexts'
import { masks, sortByDate } from '@/utils'
import { useLocalStorage } from '@/hooks'
import {
  getButtons,
  getColumns,
  getCaption,
  defaultFilterValues,
  FilterModel,
  generateChartData,
  chartBars,
} from './constants'
import { AddTransactionModal, ModalFilters } from './components'
import { filterData } from './utils'

export const Transactions = () => {
  const storage = useLocalStorage()
  const { openDialog } = useDialog()
  const { transactionList, removeTransaction } = useTransactions()

  const [tableData, setTableData] = useState<TransactionModel[]>([])
  const [tableFilters, setTableFilters] = useState(
    () => storage.get('table-filters') || defaultFilterValues
  )

  const [selectedTransactionId, setSelectedTransactionId] = useState<number>()
  const [isModalTransactionOpen, setIsModalTransactionOpen] = useState(false)
  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false)

  useEffect(() => {
    const filteredData = filterData(transactionList, tableFilters)
    setTableData(filteredData)
  }, [transactionList, tableFilters])

  const handleSetFilters = (filters: FilterModel) => {
    setTableFilters(filters)
    storage.set('table-filters', filters)
  }

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
          chartBars={chartBars}
          chartData={generateChartData(tableData)}
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
        handleFilter={handleSetFilters}
      />
    </MainTemplate>
  )
}
