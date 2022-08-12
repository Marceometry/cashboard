import { Link, useLocation } from 'react-router-dom'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  Text,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'
import { Button } from '@/components'
import { dashboardRoutes } from '@/router'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const MobileSidebar = ({ isOpen, onClose }: Props) => {
  const location = useLocation()

  const bg = useColorModeValue('gray.300', 'gray.600')
  const activeBg = useColorModeValue('gray.400', 'gray.700')
  const linkHover = useColorModeValue('gray.400', 'gray.700')

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
      <DrawerOverlay />
      <DrawerContent bg={bg}>
        <DrawerCloseButton top={4} left={4} />
        <DrawerHeader ml={10}>Cashboard</DrawerHeader>
        <Divider />

        <DrawerBody px={0}>
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
        </DrawerBody>

        <DrawerFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
