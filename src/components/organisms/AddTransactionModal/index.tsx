import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Grid, GridItem, Center, Button } from '@chakra-ui/react'
import { format } from 'date-fns'
import { Modal, Input, Radio } from '@/components'
// import { AddTransactionModel, useTransactions } from '@/contexts'

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
  // const { addTransaction } = useTransactions()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues })
  const [keepModalOpen, setKeepModalOpen] = useState(false)

  const onSubmit = (data: any) => {
    // addTransaction(state)
    // setState(makeEmptyState())
    console.log(data)

    if (keepModalOpen) {
      setKeepModalOpen(false)
      reset()
    } else {
      onClose()
    }
  }

  useEffect(() => {
    reset()
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit(onSubmit)}
      title='Adicionar transação'
      customButton={
        <Button onClick={() => setKeepModalOpen(true)} type='submit' size='lg'>
          Adicionar novo
        </Button>
      }
    >
      <Grid templateColumns='1fr 1fr' gap='4'>
        <GridItem>
          <Input
            label='Descrição'
            name='description'
            error={errors.description}
            register={register}
            required
          />
        </GridItem>
        <GridItem>
          <Input
            label='Valor'
            name='amount'
            type='number'
            error={errors.amount}
            register={register}
            required
          />
        </GridItem>
        <GridItem>
          <Input
            label='Categoria'
            name='category'
            error={errors.category}
            register={register}
            required
          />
        </GridItem>
        <GridItem>
          <Input
            label='Data'
            name='date'
            type='date'
            error={errors.date}
            register={register}
            required
          />
        </GridItem>
      </Grid>
      <Center mt='6'>
        <Radio
          name='type'
          control={control}
          defaultValue={control._defaultValues.type}
          options={[
            { label: 'Entrada', value: 'income' },
            { label: 'Saída', value: 'outcome' },
          ]}
        />
      </Center>
    </Modal>
  )
}
