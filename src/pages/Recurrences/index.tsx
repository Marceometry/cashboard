import { useMemo, useState } from 'react'
import { MainTemplate, Table } from '@/components'
import { useDialog, useRecurrences } from '@/contexts'
import { useLocalStorage } from '@/hooks'
import { RecurrentTransaction } from '@/types'
import { currency } from '@/utils'
import { AddRecurrenceOverlay, ModalFilters } from './components'
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
  const { recurrenceList, updateRecurrence, removeRecurrence, isLoadingCache } =
    useRecurrences()
  const [selectedRecurrence, setSelectedRecurrence] = useState('')
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

  const handleEditRecurrence = (id: string) => {
    setSelectedRecurrence(id)
    setIsRecurrenceModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedRecurrence('')
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
        removeRecurrence({
          id: row.id,
          deleteAllTransactions: data.deleteAllTransactions,
        })
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
    toggleActivity
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
        selectedId={selectedRecurrence}
      />

      <ModalFilters
        isOpen={isModalFiltersOpen}
        onClose={() => setIsModalFiltersOpen(false)}
        handleFilter={handleSetFilters}
      />
    </MainTemplate>
  )
}
