import { useMemo, useState } from 'react'
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
  getIncomeAndOutcome,
} from './constants'
import { AddTransactionModal, ModalFilters } from './components'
import { filterData } from './utils'

export const Transactions = () => {
  const storage = useLocalStorage()
  const { openDialog } = useDialog()
  const { transactionList, removeTransaction, isLoading } = useTransactions()

  const [isModalTransactionOpen, setIsModalTransactionOpen] = useState(false)
  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false)
  const [selectedTransactionId, setSelectedTransactionId] = useState(
    '' as string | undefined
  )
  const [tableFilters, setTableFilters] = useState(
    () => storage.get('transactions-table-filters') || defaultFilterValues
  )
  const [incomeAndOutcome, setIncomeAndOutcome] = useState<[number, number]>([
    0, 0,
  ])

  const tableData = useMemo(() => {
    const filteredData = filterData(transactionList, tableFilters)
    return filteredData
  }, [transactionList, tableFilters])

  const handleSetFilters = (filters: FilterModel) => {
    setTableFilters(filters)
    storage.set('transactions-table-filters', filters)
  }

  const handleOpenTransactionModal = (selectedId?: string) => {
    setIsModalTransactionOpen(true)
    setSelectedTransactionId(selectedId)
  }

  const handleOpenDeleteDialog = (row: TransactionModel) => {
    openDialog({
      title: `${row.description} | ${masks.valueToMoney(row.amount)}`,
      body: 'Deseja realmente excluir esta transação? Essa ação não pode ser desfeita.',
      onConfirm: () => removeTransaction(row),
    })
  }

  const handleSearch = (text: string, result: TransactionModel[]) => {
    setIncomeAndOutcome(getIncomeAndOutcome(result))
  }

  const caption = getCaption(tableFilters, incomeAndOutcome)
  const buttons = getButtons({
    handleNewTransaction: () => handleOpenTransactionModal(),
    handleOpenModalFilter: () => setIsModalFiltersOpen(true),
  })
  const columns = getColumns({
    handleDeleteTransaction: handleOpenDeleteDialog,
    handleEditTransaction: (id: string) => handleOpenTransactionModal(id),
  })

  return (
    <MainTemplate>
      <Card>
        <Table
          data={tableData}
          columns={columns}
          buttons={buttons}
          caption={caption}
          onSearch={handleSearch}
          sortFunction={sortByDate}
          isLoading={isLoading}
          charts={[
            {
              type: 'bar',
              labelType: 'day',
              sections: chartBars,
              data: generateChartData(tableData),
            },
          ]}
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
