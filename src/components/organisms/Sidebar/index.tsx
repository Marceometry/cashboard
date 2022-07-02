import {
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const routes = [
  {
    label: 'Transações',
    path: '/transactions',
  },
  {
    label: 'Categorias',
    path: '/categories',
  },
]

export const Sidebar = () => {
  const bg = useColorModeValue('gray.300', 'gray.600')

  return (
    <Flex
      as='aside'
      align='center'
      direction='column'
      maxW='container.lg'
      minW='300px'
      shadow='lg'
      bg={bg}
    >
      <Heading p='8' pb='5'>
        <Link to='/'>Cashboard</Link>
      </Heading>

      <List width='full' borderTop='1px solid white' pt='2' mt='5'>
        {routes.map((route) => (
          <ListItem key={route.path}>
            <Link to={route.path}>
              <Text
                px='8'
                py='2'
                fontSize='1.25rem'
                transition='background 0.1s'
                _hover={{ background: 'gray.700' }}
              >
                {route.label}
              </Text>
            </Link>
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}
