import { useMemo, useState } from 'react'
import { MainTemplate, Table } from '@/components'
import { useDialog, useTransactions } from '@/contexts'
import { useLocalStorage } from '@/hooks'
import { DateParam, TransactionModel } from '@/types'
import { currency } from '@/utils'
import { AddTransactionOverlay, ModalFilters, TableCaption } from './components'
import {
  chartBars,
  generateChartData,
  getButtons,
  getColumns,
  getIncomeAndOutcome,
  getMobileCard,
} from './constants'
import { filterData } from './utils'
import {
  filterTransactionsFormDefaultValues,
  FilterTransactionsFormInputs,
} from './validation'

export const Transactions = () => {
  const storage = useLocalStorage()
  const storagedFilterValues = storage.get('transactions-table-filters')
  const { openDialog } = useDialog()
  const { transactionList, removeTransaction, dateParam, isLoadingCache } =
    useTransactions()

  const [isModalTransactionOpen, setIsModalTransactionOpen] = useState(false)
  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false)
  const [selectedTransactionId, setSelectedTransactionId] = useState(
    '' as string | undefined
  )
  const [tableFilters, setTableFilters] =
    useState<FilterTransactionsFormInputs>(
      () => storagedFilterValues || filterTransactionsFormDefaultValues
    )
  const [incomeAndOutcome, setIncomeAndOutcome] = useState<[number, number]>([
    0, 0,
  ])

  const tableData = useMemo(
    () => filterData(transactionList, tableFilters, dateParam),
    [transactionList, tableFilters, dateParam]
  )

  const handleSetFilters = (filters: FilterTransactionsFormInputs) => {
    setTableFilters(filters)
    storage.set('transactions-table-filters', filters)
  }

  const handleOpenTransactionModal = (selectedId?: string) => {
    setIsModalTransactionOpen(true)
    setSelectedTransactionId(selectedId)
  }

  const handleOpenDeleteDialog = (row: TransactionModel) => {
    openDialog({
      title: `${row.description} | ${currency.valueToMoney(row.amount)}`,
      body: 'Deseja realmente excluir esta transação? Essa ação não pode ser desfeita.',
      onConfirm: () => removeTransaction(row),
    })
  }

  const handleSearch = (text: string, result: TransactionModel[]) => {
    setIncomeAndOutcome(getIncomeAndOutcome(result))
  }

  const caption = (
    <TableCaption filters={tableFilters} values={incomeAndOutcome} />
  )
  const mobileCard = (data: TransactionModel, dateParam: DateParam) => {
    return getMobileCard(
      data,
      dateParam,
      handleOpenDeleteDialog,
      handleOpenTransactionModal
    )
  }
  const buttons = getButtons(
    () => handleOpenTransactionModal(),
    () => setIsModalFiltersOpen(true)
  )
  const columns = getColumns(
    handleOpenDeleteDialog,
    handleOpenTransactionModal,
    dateParam
  )
  const chartData = generateChartData(tableData, dateParam)

  return (
    <MainTemplate>
      <Table
        data={tableData}
        columns={columns}
        buttons={buttons}
        caption={caption}
        onSearch={handleSearch}
        isLoading={isLoadingCache}
        mobileCard={mobileCard}
        charts={[
          {
            type: 'bar',
            labelType: 'day',
            sections: chartBars,
            data: chartData,
          },
        ]}
      />

      <AddTransactionOverlay
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
