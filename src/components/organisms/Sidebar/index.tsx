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
} from '@chakra-ui/react'
import { useLocalStorage } from '@/hooks'
import { dashboardRoutes } from '@/router'

export const Sidebar = () => {
  const location = useLocation()
  const storage = useLocalStorage()
  const [isOpen, setIsOpen] = useState(storage.get('sidebar-default-open'))

  const toggle = () => {
    setIsOpen(!isOpen)
    storage.set('sidebar-default-open', !isOpen)
  }

  return (
    <Flex
      px='2'
      as='aside'
      align='center'
      direction='column'
      maxW='container.lg'
      width={isOpen ? '237px' : '68px'}
      transitionProperty='width'
      transitionDuration='500ms'
      overflow='hidden'
    >
      <Heading py='5' size='lg'>
        {isOpen ? (
          <Flex gap='2'>
            <IconButton
              icon={<ChevronLeftIcon fontSize={24} />}
              onClick={toggle}
              aria-label='Fechar Sidebar'
              variant='ghost'
            />
            Cashboard
          </Flex>
        ) : (
          <IconButton
            icon={<HamburgerIcon />}
            onClick={toggle}
            aria-label='Expandir Sidebar'
            variant='ghost'
          />
        )}
      </Heading>

      <Divider />

      <List width='full'>
        {dashboardRoutes.map((route) => (
          <ListItem key={route.path}>
            <Link to={route.path} aria-label={route.label}>
              <Text
                px='4'
                py='2'
                gap='3'
                display='flex'
                alignItems='center'
                fontSize='1.25rem'
                transition='color 0.2s'
                _hover={{ color: '#48bb78' }}
                color={location.pathname === route.path ? '#48bb78' : ''}
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
