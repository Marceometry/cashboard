import { Grid, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Modal } from '..'
import { useState } from 'react'

export const FloatButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <IconButton
        icon={<AddIcon />}
        onClick={() => setIsModalOpen(true)}
        isRound
        size='lg'
        aria-label='Adicionar transação'
        position='fixed'
        bottom='14'
        right='14'
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Adicionar transação'
      >
        <Grid></Grid>
      </Modal>
    </>
  )
}
