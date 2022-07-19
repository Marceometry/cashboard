import {
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { SignOut } from 'phosphor-react'
import { ThemeIcon } from '@/components'
import { useAuth } from '@/contexts'

export const UserMenu = () => {
  const { user, signOut } = useAuth()
  const { toggleColorMode } = useColorMode()

  if (!user) return null

  return (
    <Menu>
      <MenuButton
        as={Button}
        px='2'
        borderRadius='999'
        leftIcon={<Avatar size='sm' name={user.name} src={user.photoUrl} />}
        rightIcon={<ChevronDownIcon />}
      >
        {user.name}
      </MenuButton>

      <MenuList minWidth='200px'>
        <MenuItem icon={<ThemeIcon />} onClick={toggleColorMode}>
          Alterar Tema
        </MenuItem>
        {/* <MenuItem icon={<SettingsIcon />}>Configurações</MenuItem> */}
        <MenuDivider />
        <MenuItem icon={<SignOut />} onClick={signOut}>
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
