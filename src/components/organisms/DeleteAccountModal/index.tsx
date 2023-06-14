import { useState } from 'react'
import { Flex, Input, Text } from '@chakra-ui/react'
import { Button, Modal } from '@/components'
import { useAuth } from '@/contexts'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const DeleteAccountModal = ({ isOpen, onClose }: Props) => {
  const { user, deleteAccount, isDeletingAccount } = useAuth()
  const [inputText, setInputText] = useState('')
  const isDisabled =
    inputText.toLocaleLowerCase() !== user?.name.toLocaleLowerCase()

  return (
    <Modal
      title='Excluir minha conta'
      maxWidth={550}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Text mb='2'>
        Você tem certeza de que deseja excluir sua conta permanentemente? Nenhum
        dado poderá ser recuperado.
      </Text>

      <Text>Para excluir sua conta, digite abaixo seu nome completo:</Text>

      <Flex justifyContent='space-between' gap='4' mt='6'>
        <Input
          variant='filled'
          placeholder={user?.name}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <Button
          colorScheme='red'
          px='8'
          isDisabled={isDisabled || isDeletingAccount}
          onClick={deleteAccount}
        >
          {isDeletingAccount ? 'Aguarde' : 'Excluir'}
        </Button>
      </Flex>
    </Modal>
  )
}
