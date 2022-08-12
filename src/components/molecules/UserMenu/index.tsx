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
import { Download, SignOut } from 'phosphor-react'
import { useAuth, useTransactions } from '@/contexts'
import { ThemeIcon } from '@/components'
import { useDownload } from '@/hooks'
import { sortByDate } from '@/utils'

export const UserMenu = () => {
  const showName = useBreakpointValue({ base: false, sm: true })
  const download = useDownload()
  const { user, signOut } = useAuth()
  const { transactionList } = useTransactions()
  const { toggleColorMode } = useColorMode()

  if (!user) return null

  const localBackup = () => {
    const username = user.name.toUpperCase().replaceAll(' ', '-')
    const fileName = `cashboard-backup-${username}`
    download(fileName, sortByDate(transactionList, true), 'json')
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
