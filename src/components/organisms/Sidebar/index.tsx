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
      width={isOpen ? '260px' : '68px'}
      transitionProperty='width'
      transitionDuration='500ms'
      overflow='hidden'
    >
      <Heading py='5' pl='2' size='lg'>
        <Flex alignItems='center'>
          {isOpen ? (
            <IconButton
              icon={<ChevronLeftIcon fontSize={40} />}
              onClick={toggle}
              aria-label='Fechar Sidebar'
              variant='ghost'
            />
          ) : (
            <IconButton
              icon={<HamburgerIcon fontSize={20} />}
              onClick={toggle}
              aria-label='Expandir Sidebar'
              variant='ghost'
            />
          )}
          <LogoIcon
            size={32}
            style={{
              flexShrink: 0,
              marginLeft: 8,
              marginRight: 4,
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 150ms',
            }}
          />
          <Text
            as='strong'
            transition='opacity 150ms'
            opacity={isOpen ? 1 : 0}
            userSelect={!isOpen ? 'none' : undefined}
          >
            Cashboard
          </Text>
        </Flex>
      </Heading>

      <Divider mb='2' />

      <List width='full'>
        {dashboardRoutes.map((route) => (
          <ListItem key={route.path}>
            <Link to={route.path} aria-label={route.label} title={route.label}>
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
                sx={{ svg: { flexShrink: 0 } }}
              >
                {route.icon}
                <Text
                  as='span'
                  transition='opacity 150ms'
                  opacity={isOpen ? 1 : 0}
                  userSelect={!isOpen ? 'none' : undefined}
                  whiteSpace='nowrap'
                >
                  {route.label}
                </Text>
              </Text>
            </Link>
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}
