import { Flex, Heading } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { ToggleColorMode } from '@/components'
import { routes } from '@/router'

export const Header = () => {
  const location = useLocation()

  const currentPage = routes.find(
    (route) => route.path === location.pathname
  )?.label

  return (
    <Flex as='header' align='center' justify='space-between' gap='8'>
      <Heading>{currentPage}</Heading>

      <ToggleColorMode />
    </Flex>
  )
}
