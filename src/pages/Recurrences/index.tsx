import { useEffect, useMemo, useState } from 'react'
import { MainTemplate, Table } from '@/components'
import { useDialog, useRecurrences, useTransactions } from '@/contexts'
import { useLocalStorage } from '@/hooks'
import { RecurrentTransaction } from '@/types'
import { currency } from '@/utils'
import {
  AddRecurrenceOverlay,
  ModalFilters,
  TransactionsModal,
  TransactionsModalItem,
} from './components'
import { getButtons, getColumns, getMobileCard } from './constants'
import { filterData } from './utils'
import {
  filterRecurrencesFormDefaultValues,
  FilterRecurrencesFormInputs,
} from './validation'

export const Recurrences = () => {
  const storage = useLocalStorage()
  const storagedFilterValues = storage.get('recurrences-table-filters')

  const { openDialog } = useDialog()
  const { transactionList } = useTransactions()
  const { recurrenceList, updateRecurrence, removeRecurrence, isLoadingCache } =
    useRecurrences()
  const [selectedRecurrence, setSelectedRecurrence] =
    useState<RecurrentTransaction | null>(null)
  const [selectedRecurrenceId, setSelectedRecurrenceId] = useState('')
  const [recurrenceTransactions, setRecurrenceTransactions] = useState<
    TransactionsModalItem[]
  >([])
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false)
  const [isRecurrenceModalOpen, setIsRecurrenceModalOpen] = useState(false)
  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false)
  const [tableFilters, setTableFilters] = useState<FilterRecurrencesFormInputs>(
    () => storagedFilterValues || filterRecurrencesFormDefaultValues
  )

  const tableData = useMemo(
    () => filterData(recurrenceList, tableFilters),
    [recurrenceList, tableFilters]
  )

  const handleSetFilters = (filters: FilterRecurrencesFormInputs) => {
    setTableFilters(filters)
    storage.set('recurrences-table-filters', filters)
  }

  const toggleActivity = (id: string, isActive: boolean) => {
    const date = new Date().toISOString()
    const payload = { id, isActive }
    const activityDate = isActive
      ? { lastTimeActive: date }
      : { lastTimeInactive: date }

    Object.assign(payload, activityDate)
    updateRecurrence(payload)
  }

  const handleOpenTransactions = (recurrence: RecurrentTransaction) => {
    setSelectedRecurrenceId(recurrence.id)
    setIsTransactionsModalOpen(true)
  }

  useEffect(() => {
    if (!selectedRecurrenceId) return
    const recurrence = recurrenceList.find((r) => r.id === selectedRecurrenceId)
    if (!recurrence) return
    setSelectedRecurrence(recurrence)
    setRecurrenceTransactions(
      recurrence.transactions.map(
        (item) => transactionList.find((i) => i.id === item.id) || item
      )
    )
  }, [selectedRecurrenceId, recurrenceList, transactionList])

  const handleEditRecurrence = (recurrence: RecurrentTransaction) => {
    setSelectedRecurrence(recurrence)
    setIsRecurrenceModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedRecurrence(null)
    setIsRecurrenceModalOpen(false)
  }

  const handleOpenDeleteDialog = (row: RecurrentTransaction) => {
    openDialog({
      title: `${row.description} | ${currency.valueToMoney(row.amount)}`,
      body: 'Deseja realmente excluir esta transação recorrente? Essa ação não pode ser desfeita.',
      checkbox: {
        id: 'deleteAllTransactions',
        label: 'Excluir todas as transações vinculadas à essa recorrência',
      },
      onConfirm: (data) => {
        removeRecurrence(row.id, data.deleteAllTransactions)
      },
    })
  }

  const mobileCard = (data: RecurrentTransaction) => {
    return getMobileCard(
      data,
      handleOpenDeleteDialog,
      handleEditRecurrence,
      toggleActivity
    )
  }
  const buttons = getButtons(
    () => setIsRecurrenceModalOpen(true),
    () => setIsModalFiltersOpen(true)
  )
  const columns = getColumns(
    handleEditRecurrence,
    handleOpenDeleteDialog,
    toggleActivity,
    handleOpenTransactions
  )

  return (
    <MainTemplate>
      <Table
        columns={columns}
        data={tableData}
        buttons={buttons}
        isLoading={isLoadingCache}
        mobileCard={mobileCard}
        sortBy='startDate'
      />

      <AddRecurrenceOverlay
        isOpen={isRecurrenceModalOpen}
        onClose={handleCloseModal}
        selectedRecurrence={selectedRecurrence}
      />

      <ModalFilters
        isOpen={isModalFiltersOpen}
        onClose={() => setIsModalFiltersOpen(false)}
        handleFilter={handleSetFilters}
      />

      <TransactionsModal
        isOpen={isTransactionsModalOpen}
        onClose={() => setIsTransactionsModalOpen(false)}
        recurrence={selectedRecurrence!}
        data={recurrenceTransactions}
      />
    </MainTemplate>
  )
}
