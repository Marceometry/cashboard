import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useBreakpointValue } from '@chakra-ui/react'
import { FormModal, Radio } from '@/components'
import { formatDateValue, masks } from '@/utils'
import { AddTransactionModel, useTransactions } from '@/contexts'
import { Form } from './Form'

type Props = {
  isOpen: boolean
  onClose: () => void
  selectedId?: string
}

const defaultValues = {
  amount: '' as any,
  category: '',
  description: '',
  type: 'outcome',
  tags: [] as string[],
  date: formatDateValue(new Date()),
}

export const AddTransactionModal = ({ isOpen, onClose, selectedId }: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const {
    transactionList,
    addTransaction,
    updateTransaction,
    isLoading,
    categoryList,
    tagList,
  } = useTransactions()

  const formMethods = useForm({ defaultValues })
  const categoriesFormMethods = useForm()

  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false)
  const [keepModalOpen, setKeepModalOpen] = useState(false)

  const loadTransactionById = (id: string) => {
    const selectedTransaction = transactionList.find((item) => item.id === id)
    if (!selectedTransaction) return
    const newFormValues = {
      ...selectedTransaction,
      amount: masks.monetaryValue(selectedTransaction.amount.toFixed(2)),
      date: formatDateValue(new Date(selectedTransaction.date)),
    }
    formMethods.reset(newFormValues || defaultValues)
  }

  useEffect(() => {
    formMethods.reset(defaultValues)
  }, [isOpen])

  useEffect(() => {
    if (isCategoriesModalOpen) return
    categoriesFormMethods.reset()
  }, [isCategoriesModalOpen])

  useEffect(() => {
    if (!selectedId || !isOpen) return
    loadTransactionById(selectedId)
  }, [isOpen, selectedId])

  const handleSubmit = (data: AddTransactionModel) => {
    const payload = {
      ...data,
      amount: masks.unMaskMonetaryValue(data.amount),
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

  const handleSelectCategory = ({ category }: { category: string }) => {
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
          tagList={tagList}
          categoryList={categoryList}
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
