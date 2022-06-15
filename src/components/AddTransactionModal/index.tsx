import { useState } from 'react'
import {
  Grid,
  GridItem,
  RadioGroup,
  Radio,
  Stack,
  Center,
} from '@chakra-ui/react'
import { Modal, Input } from '..'
import { AddTransactionModel, useTransactions } from '@/contexts'

const emptyState: AddTransactionModel = {
  amount: 0,
  description: '',
  category: '',
  type: 'income',
}

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const AddTransactionModal = ({ isOpen, onClose }: Props) => {
  const { addTransaction } = useTransactions()
  const [state, setState] = useState<AddTransactionModel>(emptyState)

  const handleRadioChange = (value: 'income' | 'outcome') => {
    setState((oldState) => ({
      ...oldState,
      type: value,
    }))
  }

  const handleSubmit = () => {
    addTransaction(state)
    setState(emptyState)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
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
              <Stack>
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
