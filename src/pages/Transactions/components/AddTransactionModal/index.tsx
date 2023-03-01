import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useBreakpointValue } from '@chakra-ui/react'
import { FormModal, Radio } from '@/components'
import { useTransactions } from '@/contexts'
import { currency, formatDateToInput, formatInputToISOString } from '@/utils'
import { Form } from './Form'
import {
  addTransactionFormDefaultValues,
  AddTransactionFormInputs,
  addTransactionFormResolver,
  CategoryFormInputs,
} from './validation'

type AddTransactionModalProps = {
  isOpen: boolean
  onClose: () => void
  selectedId?: string
}

export const AddTransactionModal = ({
  isOpen,
  onClose,
  selectedId,
}: AddTransactionModalProps) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const {
    isLoading,
    categoryList,
    transactionList,
    addTransaction,
    updateTransaction,
  } = useTransactions()

  const formMethods = useForm({
    defaultValues: addTransactionFormDefaultValues,
    resolver: addTransactionFormResolver,
  })
  const categoriesFormMethods = useForm<CategoryFormInputs>()

  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false)
  const [keepModalOpen, setKeepModalOpen] = useState(false)

  const loadTransactionById = (id: string) => {
    const selectedTransaction = transactionList.find((item) => item.id === id)
    if (!selectedTransaction) return
    const newFormValues: AddTransactionFormInputs = {
      ...selectedTransaction,
      tags: selectedTransaction.tags || [],
      amount: currency.maskMonetaryValue(selectedTransaction.amount),
      date: formatDateToInput(new Date(selectedTransaction.date)),
    }
    formMethods.reset(newFormValues || addTransactionFormDefaultValues)
  }

  useEffect(() => {
    formMethods.reset(addTransactionFormDefaultValues)
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
      date: formatInputToISOString(data.date),
      amount: currency.unMaskMonetaryValue(data.amount),
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
      formMethods.setValue('type', data.type)
      formMethods.setValue('category', data.category)
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
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSubmit}
        formMethods={formMethods}
        title={`${selectedId ? 'Editar' : 'Adicionar'} transação`}
        extraButton={
          !selectedId
            ? {
                children: 'Adicionar novo',
                isLoading: isLoading && keepModalOpen,
                onClick: () => setKeepModalOpen(true),
              }
            : undefined
        }
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
