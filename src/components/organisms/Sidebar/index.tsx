import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronLeftIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Divider,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useLocalStorage } from '@/hooks'
import { LogoIcon } from '@/assets'
import { dashboardRoutes } from '@/router'

export const Sidebar = () => {
  const location = useLocation()
  const storage = useLocalStorage()
  const [isOpen, setIsOpen] = useState(storage.get('sidebar-default-open'))
  const color = useColorModeValue('green.500', 'green.400')

  const toggle = () => {
    setIsOpen(!isOpen)
    storage.set('sidebar-default-open', !isOpen)
  }

  return (
    <Flex
      px='2'
      as='aside'
      direction='column'
      maxW='container.lg'
      width={isOpen ? '264px' : '68px'}
      transitionProperty='width'
      transitionDuration='500ms'
      overflow='hidden'
    >
      <Heading py='5' pl='2' size='lg'>
        <Flex alignItems='center'>
          {isOpen ? (
            <>
              <IconButton
                icon={<ChevronLeftIcon fontSize={40} />}
                onClick={toggle}
                aria-label='Fechar Sidebar'
                variant='ghost'
                mr='1'
              />
              <LogoIcon size={32} style={{ marginRight: 4 }} />
              Cashboard
            </>
          ) : (
            <IconButton
              icon={<HamburgerIcon fontSize={20} />}
              onClick={toggle}
              aria-label='Expandir Sidebar'
              variant='ghost'
            />
          )}
        </Flex>
      </Heading>

      <Divider mb='2' />

      <List width='full'>
        {dashboardRoutes.map((route) => (
          <ListItem key={route.path}>
            <Link to={route.path} aria-label={route.label}>
              <Text
                pl='4'
                py='2'
                gap='3'
                display='flex'
                alignItems='center'
                fontSize='1.25rem'
                transition='color 0.2s'
                _hover={{ color }}
                color={location.pathname === route.path ? color : ''}
              >
                {route.icon}
                {isOpen ? route.label : ''}
              </Text>
            </Link>
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}
