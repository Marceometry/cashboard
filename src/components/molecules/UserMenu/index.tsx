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

export const UserMenu = () => {
  const { toggleColorMode } = useColorMode()

  const avatar = {
    name: 'Marcelino Teixeira',
    src: 'https://github.com/marceometry.png',
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        px='2'
        borderRadius='999'
        leftIcon={<Avatar size='sm' {...avatar} />}
        rightIcon={<ChevronDownIcon />}
      >
        Marcelino
      </MenuButton>
      <MenuList minWidth='200px'>
        <MenuItem icon={<ThemeIcon />} onClick={toggleColorMode}>
          Alterar Tema
        </MenuItem>
        {/* <MenuItem icon={<SettingsIcon />}>Configurações</MenuItem> */}
        <MenuDivider />
        <MenuItem icon={<SignOut />}>Sair</MenuItem>
      </MenuList>
    </Menu>
  )
}
