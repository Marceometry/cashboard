import {
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Download, FileArrowDown, SignOut } from 'phosphor-react'
import { useAuth, useTransactions } from '@/contexts'
import { useFileHandle } from '@/hooks'
import { ThemeIcon } from '@/components'
import { sortByDate } from '@/utils'
import { useEffect } from 'react'

export const UserMenu = () => {
  const showName = useBreakpointValue({ base: false, sm: true })
  const { toggleColorMode } = useColorMode()
  const { importFile, fileContent, downloadFile } = useFileHandle()
  const { transactionList, uploadTransactionList } = useTransactions()
  const { user, signOut } = useAuth()

  useEffect(() => {
    if (!fileContent) return
    uploadTransactionList(fileContent)
  }, [fileContent])

  if (!user) return null

  const localBackup = () => {
    const username = user.name.toUpperCase().replaceAll(' ', '-')
    const fileName = `cashboard-backup-${username}`
    downloadFile(fileName, sortByDate(transactionList, true), 'json')
  }

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            px='2'
            borderRadius='999'
            leftIcon={<Avatar size='sm' name={user.name} src={user.photoUrl} />}
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          >
            {showName && user.name}
          </MenuButton>

          <MenuList minWidth='200px'>
            <MenuItem icon={<ThemeIcon />} onClick={toggleColorMode}>
              Alterar Tema
            </MenuItem>
            <MenuItem icon={<Download />} onClick={localBackup}>
              Backup Local
            </MenuItem>
            <MenuItem icon={<FileArrowDown />} onClick={importFile}>
              Importar arquivo
            </MenuItem>
            {/* <MenuItem icon={<SettingsIcon />}>Configurações</MenuItem> */}
            <MenuDivider />
            <MenuItem icon={<SignOut />} onClick={signOut}>
              Sair
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  )
}
