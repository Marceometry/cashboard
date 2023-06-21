import { Link, useLocation } from 'react-router-dom'
import { Flex, Heading, List, ListItem, Text } from '@chakra-ui/react'
import { Drawer } from '@/components'
import { LogoIcon } from '@/assets'
import { dashboardRoutes } from '@/router'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const header = (
  <Flex align='center' gap='1'>
    <LogoIcon size={28} />
    <Heading size='lg'>Cashboard</Heading>
  </Flex>
)

export const MobileSidebar = ({ isOpen, onClose }: Props) => {
  const location = useLocation()

  return (
    <Drawer isOpen={isOpen} onClose={onClose} header={header} placement='left'>
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
                transition='color 0.2s'
                _hover={{ color: 'green.400' }}
                color={location.pathname === route.path ? 'green.400' : ''}
              >
                {route.icon}
                {isOpen ? route.label : ''}
              </Text>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
