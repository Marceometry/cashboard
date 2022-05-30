import { useState } from 'react'
import { Grid, GridItem, Select } from '@chakra-ui/react'
import { Modal, Input } from '..'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const AddTransactionModal = ({ isOpen, onClose }: Props) => {
  const [state, setState] = useState({
    description: '',
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Adicionar transação'>
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
        <GridItem>{/* <Input /> */}</GridItem>
      </Grid>
    </Modal>
  )
}
