import { useState } from 'react'
import {
  Grid,
  GridItem,
  RadioGroup,
  Radio,
  Stack,
  Center,
  Button,
} from '@chakra-ui/react'
import { Modal, Input } from '..'
import { AddTransactionModel, useTransactions } from '@/contexts'

const makeEmptyState = (): AddTransactionModel => ({
  amount: 0,
  description: '',
  category: '',
  type: 'income',
})

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const AddTransactionModal = ({ isOpen, onClose }: Props) => {
  const { addTransaction } = useTransactions()
  const [state, setState] = useState<AddTransactionModel>(makeEmptyState())

  const handleRadioChange = (value: 'income' | 'outcome') => {
    setState((oldState) => ({
      ...oldState,
      type: value,
    }))
  }

  const handleSubmit = (addNew?: boolean) => {
    addTransaction(state)
    setState(makeEmptyState())
    !addNew && onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => handleSubmit(false)}
      customButton={
        <Button onClick={() => handleSubmit(true)} size='lg'>
          Adicionar novo
        </Button>
      }
      title='Adicionar transação'
    >
      <Grid templateColumns='1fr 1fr' gap='4'>
        <GridItem>
          <Input
            state={state}
            setState={setState}
            name='description'
            label='Descrição'
            required
            showError
          />
        </GridItem>
        <GridItem>
          <Input
            state={state}
            setState={setState}
            name='amount'
            label='Valor'
            type='number'
            required
            showError
          />
        </GridItem>
        <GridItem>
          <Input
            state={state}
            setState={setState}
            name='category'
            label='Categoria'
            required
            showError
          />
        </GridItem>
        <GridItem>
          <Center h='full'>
            <RadioGroup onChange={handleRadioChange} value={state.type}>
              <Stack direction='row' gap='5'>
                <Radio value='income'>Entrada</Radio>
                <Radio value='outcome'>Saída</Radio>
              </Stack>
            </RadioGroup>
          </Center>
        </GridItem>
      </Grid>
    </Modal>
  )
}
