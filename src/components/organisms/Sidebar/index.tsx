import { useEffect, useRef, useState } from 'react'
import {
  Divider,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Text,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { dashboardRoutes } from '@/router'
import { ChevronLeftIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useLocalStorage } from '@/hooks'

export const Sidebar = () => {
  const location = useLocation()
  const storage = useLocalStorage()
  const [isOpen, setIsOpen] = useState(storage.get('sidebar-default-open'))

  const bg = useColorModeValue('gray.300', 'gray.600')
  const activeBg = useColorModeValue('gray.400', 'gray.700')
  const linkHover = useColorModeValue('gray.400', 'gray.700')

  const [isLargerThan1080] = useMediaQuery('(min-width: 1080px)')

  const toggle = () => {
    setIsOpen(!isOpen)
    storage.set('sidebar-default-open', !isOpen)
  }

  return (
    <Flex
      as='aside'
      align='center'
      direction='column'
      maxW='container.lg'
      shadow='lg'
      width={isOpen ? '237px' : '68px'}
      transitionProperty='width'
      transitionDuration='500ms'
      overflow='hidden'
      bg={bg}
    >
      <Heading py='4' size='lg' px={isLargerThan1080 && isOpen ? '5' : '5'}>
        {isOpen ? (
          <Flex gap='2'>
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={toggle}
              aria-label='Fechar Sidebar'
            />
            Cashboard
          </Flex>
        ) : (
          <IconButton
            icon={<HamburgerIcon />}
            onClick={toggle}
            aria-label='Expandir Sidebar'
          />
        )}
      </Heading>

      <Divider />

      <List width='full'>
        {dashboardRoutes.map((route) => (
          <ListItem key={route.path}>
            <Link to={route.path}>
              <Text
                px='6'
                py='2'
                gap='3'
                display='flex'
                alignItems='center'
                fontSize='1.25rem'
                transition='background 0.1s'
                _hover={{ background: linkHover }}
                backgroundColor={
                  location.pathname === route.path ? activeBg : ''
                }
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
