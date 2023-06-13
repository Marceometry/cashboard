import {
  Avatar,
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Modal } from '@/components'
import { useAuth, useTransactions } from '@/contexts'

type Props = {
  isOpen: boolean
  setIsOpen: () => void
}

export const SettingsModal = ({ isOpen, setIsOpen }: Props) => {
  const { dateParam, setDateParam } = useTransactions()
  const { user } = useAuth()

  return (
    <Modal isOpen={isOpen} onClose={setIsOpen} title='Configurações'>
      {!!user && (
        <Flex
          justifyContent='space-between'
          alignItems='flex-end'
          flexWrap='wrap'
          mb='6'
        >
          <Flex alignItems='center' gap='4'>
            <Avatar size='lg' name={user.name} src={user.photoUrl} />

            <Flex flex='1' flexDir='column' justifyContent='space-between'>
              <Text fontWeight='bold' fontSize='2xl'>
                {user.name}
              </Text>

              <Text fontSize='sm'>Conectado com sua conta Google</Text>
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
  )
}
