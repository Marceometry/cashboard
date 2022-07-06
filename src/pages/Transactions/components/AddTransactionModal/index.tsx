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
  const { addTransaction } = useTransactions()
  const formMethods = useForm({ defaultValues })
  const [keepModalOpen, setKeepModalOpen] = useState(false)

  const onSubmit = (data: AddTransactionModel) => {
    addTransaction(data)
    if (keepModalOpen) {
      setKeepModalOpen(false)
      formMethods.setFocus('description')
      formMethods.reset()
    } else {
      onClose()
    }
  }

  useEffect(() => {
    formMethods.reset()
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onSubmit}
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
          <Input label='Valor' name='amount' type='number' required />
        </GridItem>
        <GridItem>
          <Input label='Categoria' name='category' required />
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
  )
}
