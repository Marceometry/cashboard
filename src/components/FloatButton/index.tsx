import { useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { AddTransactionModal } from '..'

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
        bottom='10'
        right='10'
      />

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
