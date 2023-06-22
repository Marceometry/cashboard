import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button as ChakraButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react'
import { Download, FileArrowDown, Gear, SignOut } from 'phosphor-react'
import { FileImportModal, SettingsModal, ThemeIcon } from '@/components'
import { useAuth, useTransactions } from '@/contexts'
import { useFileDownload } from '@/hooks'
import { sortByDate } from '@/utils'

export const UserMenu = () => {
  const showName = useBreakpointValue({ base: false, sm: true })
  const { toggleColorMode } = useColorMode()
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isImportFileModalOpen, setIsImportFileModalOpen] = useState(false)
  const downloadFile = useFileDownload()
  const { transactionList } = useTransactions()
  const { user, signOut } = useAuth()

  if (!user) return null

  const localBackup = () => {
    const username = user.name.toUpperCase().replaceAll(' ', '-')
    const date = new Date().toISOString().split('T')[0]
    const fileName = `cashboard-backup-${username}-${date}`
    downloadFile(fileName, sortByDate(transactionList, true), 'json')
  }

  const openImportFileModal = () => setIsImportFileModalOpen(true)
  const closeImportFileModal = () => setIsImportFileModalOpen(false)

  return (
    <>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={ChakraButton}
              px='2'
              borderRadius='999'
              leftIcon={
                <Avatar size='sm' name={user.name} src={user.photoUrl} />
              }
              rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            >
              {showName && user.name}
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
    </>
  )
}
