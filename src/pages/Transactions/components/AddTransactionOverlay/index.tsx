import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useBreakpointValue } from '@chakra-ui/react'
import { isSameDay } from 'date-fns'
import { FormOverlay, RadioGroup } from '@/components'
import { useTransactions } from '@/contexts'
import { currency, formatDateToInput, formatInputToISOString } from '@/utils'
import { Form } from './Form'
import {
  addTransactionFormDefaultValues,
  AddTransactionFormInputs,
  addTransactionFormResolver,
  CategoryFormInputs,
} from './validation'
import { FormModal } from '@/components/molecules/FormModal'

type AddTransactionOverlayProps = {
  isOpen: boolean
  onClose: () => void
  selectedId?: string
}

export const AddTransactionOverlay = ({
  isOpen,
  onClose,
  selectedId,
}: AddTransactionOverlayProps) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const { categoryList, transactionList, addTransaction, updateTransaction } =
    useTransactions()

  const formMethods = useForm({
    defaultValues: addTransactionFormDefaultValues,
    resolver: addTransactionFormResolver,
  })
  const categoriesFormMethods = useForm<CategoryFormInputs>()

  const [differentPaymentDate, setDifferentPaymentDate] = useState(false)
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false)
  const [keepModalOpen, setKeepModalOpen] = useState(false)

  const loadTransactionById = (id: string) => {
    const selectedTransaction = transactionList.find((item) => item.id === id)
    if (!selectedTransaction) return

    const isDifferent = !isSameDay(
      new Date(selectedTransaction.datePayed),
      new Date(selectedTransaction.date)
    )
    setDifferentPaymentDate(isDifferent)

    const newFormValues: AddTransactionFormInputs = {
      ...selectedTransaction,
      tags: selectedTransaction.tags || [],
      amount: currency.maskMonetaryValue(selectedTransaction.amount),
      date: formatDateToInput(new Date(selectedTransaction.date)),
      datePayed: formatDateToInput(new Date(selectedTransaction.datePayed)),
    }
    formMethods.reset(newFormValues || addTransactionFormDefaultValues)
  }

  useEffect(() => {
    formMethods.reset(addTransactionFormDefaultValues)
    setDifferentPaymentDate(false)
  }, [isOpen])

  useEffect(() => {
    if (isCategoriesModalOpen) return
    categoriesFormMethods.reset()
  }, [isCategoriesModalOpen])

  useEffect(() => {
    if (!selectedId || !isOpen) return
    loadTransactionById(selectedId)
  }, [isOpen, selectedId])

  const handleSubmit = (data: AddTransactionFormInputs) => {
    const payload = {
      ...data,
      amount: currency.unMaskMonetaryValue(data.amount),
      date: formatInputToISOString(data.date),
      datePayed:
        differentPaymentDate && data.datePayed
          ? formatInputToISOString(data.datePayed)
          : undefined,
    }
    if (selectedId) {
      updateTransaction({
        ...payload,
        id: selectedId,
      })
    } else {
      addTransaction(payload)
    }

    if (keepModalOpen) {
      setKeepModalOpen(false)
      formMethods.setFocus('description')
      formMethods.reset()
      formMethods.setValue('date', data.date)
      formMethods.setValue('datePayed', data.datePayed)
      formMethods.setValue('category', data.category)
      formMethods.setValue('type', data.type)
      formMethods.setValue('paymentMethod', data.paymentMethod)
    } else {
      onClose()
    }
  }

  const handleSelectCategory = ({ category }: CategoryFormInputs) => {
    formMethods.setValue('category', category)
    setIsCategoriesModalOpen(false)
  }

  return (
    <>
      <FormOverlay
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSubmit}
        formMethods={formMethods}
        title={`${selectedId ? 'Editar' : 'Adicionar'} transação`}
        extraButton={
          !selectedId
            ? {
                children: 'Adicionar novo',
                onClick: () => setKeepModalOpen(true),
              }
            : undefined
        }
      >
        <Form
          isEditingTransaction={!!selectedId}
          handleOpenCategoriesModal={() => setIsCategoriesModalOpen(true)}
          differentPaymentDate={differentPaymentDate}
          setDifferentPaymentDate={setDifferentPaymentDate}
        />
      </FormOverlay>

      {!!categoryList.length && (
        <FormModal
          title='Selecionar Categoria'
          isOpen={isCategoriesModalOpen}
          onClose={() => setIsCategoriesModalOpen(false)}
          onConfirm={handleSelectCategory}
          formMethods={categoriesFormMethods}
          maxWidth={500}
        >
          <RadioGroup
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
