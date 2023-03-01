import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useBreakpointValue } from '@chakra-ui/react'
import { FormModal, Radio } from '@/components'
import {
  AddRecurrentTransaction,
  useRecurrences,
  useTransactions,
} from '@/contexts'
import { currency, formatDateToInput, formatInputToISOString } from '@/utils'
import { Form } from './Form'
import {
  addRecurrenceFormDefaultValues,
  AddRecurrenceFormInputs,
  addRecurrenceFormResolver,
  CategoryFormInputs,
} from './validation'

type AddRecurrenceModalProps = {
  isOpen: boolean
  onClose: () => void
  selectedId?: string
}

export const AddRecurrenceModal = ({
  isOpen,
  onClose,
  selectedId,
}: AddRecurrenceModalProps) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const { recurrenceList, addRecurrence, updateRecurrence } = useRecurrences()
  const { categoryList } = useTransactions()

  const formMethods = useForm({
    defaultValues: addRecurrenceFormDefaultValues,
    resolver: addRecurrenceFormResolver,
  })
  const categoriesFormMethods = useForm<CategoryFormInputs>()

  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false)

  const loadRecurrenceById = (id: string) => {
    const selectedRecurrence = recurrenceList.find((item) => item.id === id)
    if (!selectedRecurrence) return
    const newFormValues: AddRecurrenceFormInputs = {
      ...selectedRecurrence,
      startDate: formatDateToInput(selectedRecurrence.startDate),
      installments: String(selectedRecurrence.installments),
      amount: currency.maskMonetaryValue(selectedRecurrence.amount),
      tags: selectedRecurrence.tags || [],
    }
    formMethods.reset(newFormValues || addRecurrenceFormDefaultValues)
  }

  useEffect(() => {
    formMethods.reset(addRecurrenceFormDefaultValues)
  }, [isOpen])

  useEffect(() => {
    if (isCategoriesModalOpen) return
    categoriesFormMethods.reset()
  }, [isCategoriesModalOpen])

  useEffect(() => {
    if (!selectedId || !isOpen) return
    loadRecurrenceById(selectedId)
  }, [isOpen, selectedId])

  const handleSubmit = (data: AddRecurrenceFormInputs) => {
    const payload: AddRecurrentTransaction = {
      ...data,
      startDate: formatInputToISOString(data.startDate),
      installments: Number(data.installments) || null,
      amount: currency.unMaskMonetaryValue(data.amount),
    }
    if (selectedId) {
      updateRecurrence({
        ...payload,
        id: selectedId,
      })
    } else {
      addRecurrence(payload)
    }
    onClose()
  }

  const handleSelectCategory = ({ category }: CategoryFormInputs) => {
    formMethods.setValue('category', category)
    setIsCategoriesModalOpen(false)
  }

  return (
    <>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSubmit}
        formMethods={formMethods}
        title={`${selectedId ? 'Editar' : 'Adicionar'} recorrência`}
      >
        <Form
          isEditingTransaction={!!selectedId}
          handleOpenCategoriesModal={() => setIsCategoriesModalOpen(true)}
        />
      </FormModal>

      {!!categoryList.length && (
        <FormModal
          title='Selecionar Categoria'
          isOpen={isCategoriesModalOpen}
          onClose={() => setIsCategoriesModalOpen(false)}
          onConfirm={handleSelectCategory}
          formMethods={categoriesFormMethods}
          maxWidth={400}
        >
          <Radio
            required
            name='category'
            columns={isSmallScreen ? 2 : 3}
            options={categoryList.map((category) => ({
              label: category.name,
              value: category.name,
            }))}
          />
        </FormModal>
      )}
    </>
  )
}
