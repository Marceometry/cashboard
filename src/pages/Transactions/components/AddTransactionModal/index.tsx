import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Grid, GridItem, Center } from '@chakra-ui/react'
import { format } from 'date-fns'
import { Modal, Input, Radio } from '@/components'
import { AddTransactionModel, useTransactions } from '@/contexts'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const defaultValues = {
  description: '',
  amount: '',
  category: '',
  type: 'income',
  date: format(new Date(), 'yyyy-MM-dd'),
}

export const AddTransactionModal = ({ isOpen, onClose }: Props) => {
  const { addTransaction, categoryList } = useTransactions()

  const formMethods = useForm({ defaultValues })
  const categoriesFormMethods = useForm()

  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false)
  const [keepModalOpen, setKeepModalOpen] = useState(false)

  const handleSubmit = (data: AddTransactionModel) => {
    addTransaction(data)
    if (keepModalOpen) {
      setKeepModalOpen(false)
      formMethods.setFocus('description')
      formMethods.reset()
    } else {
      onClose()
    }
  }

  const handleSelectCategory = ({ category }: { category: string }) => {
    formMethods.setValue('category', category)
    setIsCategoriesModalOpen(false)
  }

  useEffect(() => {
    formMethods.reset()
  }, [isOpen])

  useEffect(() => {
    if (isCategoriesModalOpen) return
    categoriesFormMethods.reset()
  }, [isCategoriesModalOpen])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSubmit}
        formMethods={formMethods}
        title='Adicionar transação'
        extraButton={{
          children: 'Adicionar novo',
          onClick: () => setKeepModalOpen(true),
        }}
      >
        <Grid templateColumns='1fr 1fr' gap='4'>
          <GridItem>
            <Input label='Descrição' name='description' required />
          </GridItem>
          <GridItem>
            <Input
              label='Categoria'
              name='category'
              required
              helperButton={{
                icon: 'list',
                'aria-label': 'Selecionar Categoria',
                onClick: () => setIsCategoriesModalOpen(true),
              }}
            />
          </GridItem>

          <GridItem>
            <Input label='Valor' name='amount' type='number' required />
          </GridItem>
          <GridItem>
            <Input label='Data' name='date' type='date' required />
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
    </>
  )
}
