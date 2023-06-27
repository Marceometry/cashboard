import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button as ChakraButton,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { Download, FileArrowDown, Gear, SignOut, WifiX } from 'phosphor-react'
import { FileImportModal, SettingsModal, ThemeIcon } from '@/components'
import { useAuth, useFirebaseContext, useTransactions } from '@/contexts'
import { useFileDownload } from '@/hooks'
import { sortByDate } from '@/utils'

export const UserMenu = () => {
  const yellow = useColorModeValue('yellow.500', 'yellow.400')
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const { toggleColorMode } = useColorMode()
  const downloadFile = useFileDownload()
  const { isOnline } = useFirebaseContext()
  const { transactionList } = useTransactions()
  const { user, signOut } = useAuth()
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isImportFileModalOpen, setIsImportFileModalOpen] = useState(false)

  if (!user) return null

  const localBackup = () => {
    const username = user.name.toUpperCase().replaceAll(' ', '-')
    const date = new Date().toISOString().split('T')[0]
    const fileName = `cashboard-backup-${username}-${date}`
    downloadFile(fileName, sortByDate(transactionList, true), 'json')
  }

  const openImportFileModal = () => setIsImportFileModalOpen(true)
  const closeImportFileModal = () => setIsImportFileModalOpen(false)

  const avatar = <Avatar size='sm' name={user.name} src={user.photoUrl} />

  return (
    <Flex align='center' gap='2'>
      {!isOnline && (
        <Tooltip
          label='Não há conexão com a internet'
          bg={yellow}
          borderRadius='md'
          hasArrow
        >
          <Text color={yellow}>
            <WifiX size={24} />
          </Text>
        </Tooltip>
      )}
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={ChakraButton}
              borderWidth={1}
              borderColor={isOnline ? 'transparent' : yellow}
              borderRadius='999'
              px='2'
              leftIcon={isSmallScreen ? undefined : avatar}
              rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            >
              {isSmallScreen ? avatar : user.name}
            </MenuButton>

            <MenuList minWidth='200px'>
              <MenuItem
                icon={<Gear />}
                onClick={() => setIsSettingsModalOpen(true)}
              >
                Configurações
              </MenuItem>
              <MenuItem icon={<ThemeIcon />} onClick={toggleColorMode}>
                Alterar Tema
              </MenuItem>

              <MenuDivider />
              <MenuItem icon={<Download />} onClick={localBackup}>
                Backup Local
              </MenuItem>
              <MenuItem icon={<FileArrowDown />} onClick={openImportFileModal}>
                Importar arquivo
              </MenuItem>

              <MenuDivider />
              <MenuItem icon={<SignOut />} onClick={signOut}>
                Sair
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>

      <FileImportModal
        isOpen={isImportFileModalOpen}
        onClose={closeImportFileModal}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        openSettingsModal={() => setIsSettingsModalOpen(true)}
      />
    </Flex>
  )
}
