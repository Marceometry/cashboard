import {
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { dashboardRoutes } from '@/router'

export const Sidebar = () => {
  const location = useLocation()

  const bg = useColorModeValue('gray.300', 'gray.600')
  const activeBg = useColorModeValue('gray.400', 'gray.700')
  const linkHover = useColorModeValue('gray.400', 'gray.700')

  return (
    <Flex
      as='aside'
      align='center'
      direction='column'
      maxW='container.lg'
      shadow='lg'
      bg={bg}
    >
      <Heading p='8'>
        <Link to='/'>Cashboard</Link>
      </Heading>

      <List width='full' borderTop='1px solid white' pt='2'>
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
                {route.label}
              </Text>
            </Link>
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}
