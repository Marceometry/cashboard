import { useState } from 'react'
import {
  Avatar,
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Button, DeleteAccountModal, Editable, Modal } from '@/components'
import { useAuth, useTransactions } from '@/contexts'

type Props = {
  isOpen: boolean
  onClose: () => void
  openSettingsModal: () => void
}

export const SettingsModal = ({
  isOpen,
  onClose,
  openSettingsModal,
}: Props) => {
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false)
  const { dateParam, setDateParam } = useTransactions()
  const { user, updateUser } = useAuth()

  const handleOpenDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(true)
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title='Configurações'>
        {!!user && (
          <Flex flexDir='column' justifyContent='space-between' gap='4' mb='6'>
            <Flex alignItems='center' gap='4'>
              <Avatar size='xl' name={user.name} src={user.photoUrl} />

              <Flex flex='1' flexDir='column' justifyContent='space-between'>
                <Editable defaultValue={user.name} onSubmit={updateUser} />

                <Text fontSize='sm' mt='1' mb='2'>
                  Conectado com sua conta Google
                </Text>

                <Box>
                  <Button
                    size='xs'
                    variant='outline'
                    colorScheme='red'
                    onClick={handleOpenDeleteAccountModal}
                  >
                    Excluir minha conta
                  </Button>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        )}

        <Box>
          <Text mb='2'>Classificar e ordenar transações por:</Text>

          <RadioGroup value={dateParam} onChange={setDateParam}>
            <Stack direction='row'>
              <Radio value='date'>Data da compra</Radio>
              <Radio value='datePayed'>Data do pagamento</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Modal>

      <DeleteAccountModal
        isOpen={isDeleteAccountModalOpen}
        onClose={() => {
          setIsDeleteAccountModalOpen(false)
          openSettingsModal()
        }}
      />
    </>
  )
}
