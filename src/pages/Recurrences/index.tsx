import { useState } from 'react'
import { MainTemplate, Table } from '@/components'
import {
  RecurrentTransaction,
  useDialog,
  useRecurrences,
  useTransactions,
} from '@/contexts'
import { currency } from '@/utils'
import { AddRecurrenceModal } from './components'
import { deleteModalText, getButtons, getColumns } from './constants'

export const Recurrences = () => {
  const { openDialog } = useDialog()
  const { recurrenceList, removeRecurrence } = useRecurrences()
  const { isLoading } = useTransactions()
  const [selectedRecurrence, setSelectedRecurrence] = useState('')
  const [isRecurrenceModalOpen, setIsRecurrenceModalOpen] = useState(false)

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
      body: deleteModalText,
      onConfirm: () => removeRecurrence(row.id),
    })
  }

  const buttons = getButtons(() => setIsRecurrenceModalOpen(true))
  const columns = getColumns(handleEditRecurrence, handleOpenDeleteDialog)

  return (
    <MainTemplate>
      <Table
        columns={columns}
        data={recurrenceList}
        buttons={buttons}
        isLoading={isLoading}
      />

      <AddRecurrenceModal
        isOpen={isRecurrenceModalOpen}
        onClose={handleCloseModal}
        selectedId={selectedRecurrence}
      />
    </MainTemplate>
  )
}
