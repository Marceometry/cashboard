import { Link, useLocation } from 'react-router-dom'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  IconButton,
  MenuButton,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react'
import { Menu } from '@/components'
import { dashboardRoutes } from '@/router'

export const MobileLinkMenu = () => {
  const color = useColorModeValue('green.500', 'green.400')
  const location = useLocation()

  return (
    <Menu
      trigger={
        <MenuButton
          as={IconButton}
          icon={<HamburgerIcon />}
          aria-label='Expandir Sidebar'
        />
      }
    >
      {dashboardRoutes.map((route) => (
        <MenuItem
          as={Link}
          to={route.path}
          key={route.path}
          gap='2'
          display='flex'
          alignItems='center'
          transition='color 0.2s'
          _hover={{ color }}
          color={location.pathname === route.path ? color : ''}
        >
          {route.icon}
          {route.label}
        </MenuItem>
      ))}
    </Menu>
  )
}
