import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Grid, GridItem, Center } from '@chakra-ui/react'
import { Modal, Input, Radio } from '@/components'
import { AddTransactionModel, useTransactions } from '@/contexts'
import { formatDateValue, masks } from '@/utils'

type Props = {
  isOpen: boolean
  onClose: () => void
  selectedId?: number
}

const defaultValues = {
  amount: '' as any,
  category: '',
  description: '',
  type: 'outcome',
  date: formatDateValue(new Date()),
}

export const AddTransactionModal = ({ isOpen, onClose, selectedId }: Props) => {
  const { transactionList, addTransaction, updateTransaction, categoryList } =
    useTransactions()

  const formMethods = useForm({ defaultValues })
  const categoriesFormMethods = useForm()

  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false)
  const [keepModalOpen, setKeepModalOpen] = useState(false)

  const handleAddNew = () => setKeepModalOpen(true)

  const loadTransactionById = (id: number) => {
    const selectedTransaction = transactionList.find((item) => item.id === id)
    if (!selectedTransaction) return
    const newFormValues = {
      ...selectedTransaction,
      amount: masks.valueToMonetaryValue(selectedTransaction.amount),
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSubmit}
        formMethods={formMethods}
        title={`${selectedId ? 'Editar' : 'Adicionar'} transação`}
        extraButton={
          !selectedId
            ? {
                children: 'Adicionar novo',
                onClick: handleAddNew,
              }
            : undefined
        }
      >
        <Grid templateColumns='1fr 1fr' gap='4'>
          <GridItem>
            <Input label='Descrição' name='description' required />
          </GridItem>
          <GridItem>
            <Input
              label='Valor'
              name='amount'
              required
              mask={masks.monetaryValue}
            />
          </GridItem>

          <GridItem>
            <Input label='Data' name='date' type='date' required />
          </GridItem>
          <GridItem>
            <Input
              label='Categoria'
              name='category'
              rightIcon={
                categoryList.length
                  ? {
                      icon: 'list',
                      hasTooltip: true,
                      'aria-label': 'Selecionar Categoria',
                      onClick: () => setIsCategoriesModalOpen(true),
                    }
                  : undefined
              }
            />
          </GridItem>
        </Grid>

        <Center mt='6'>
          <Radio
            name='type'
            options={[
              { label: 'Entrada', value: 'income' },
              { label: 'Saída', value: 'outcome' },
            ]}
          />
        </Center>
      </Modal>

      {!!categoryList.length && (
        <Modal
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
            columns={3}
            options={categoryList.map((category) => ({
              label: category.name,
              value: category.name,
            }))}
          />
        </Modal>
      )}
    </>
  )
}
