import { useState } from 'react'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import {
  Button,
  DeleteAccountModal,
  Editable,
  Label,
  Modal,
  RadioGroup,
} from '@/components'
import { useAuth, useTransactions } from '@/contexts'
import { DateParam } from '@/types'

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
          <Flex
            alignItems='center'
            gap={{ base: '0', sm: '4' }}
            direction={{ base: 'column', sm: 'row' }}
            mb='6'
          >
            <Avatar
              size='xl'
              name={user.name}
              src={user.photoUrl}
              borderWidth={2}
              borderColor='gray.800'
            />

            <Flex
              w='100%'
              flex='1'
              flexDir='column'
              justifyContent='space-between'
            >
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
        )}

        <Box pb='4'>
          <Label mb='2'>Classificar e ordenar transações por:</Label>

          <RadioGroup
            value={dateParam}
            onChange={(value) => setDateParam(value as DateParam)}
            options={[
              { value: 'date', label: 'Data da compra' },
              { value: 'datePayed', label: 'Data do pagamento' },
            ]}
          />
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
